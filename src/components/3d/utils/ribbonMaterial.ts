import * as THREE from 'three';
import { SAFE_ZONE_GLSL, safeZoneUniforms } from './safeZones';
import type { RibbonSpec } from '../types';

export interface RibbonUniforms {
  uTime: { value: number };
  uAmp: { value: THREE.Vector3 };
  uFreq: { value: THREE.Vector3 };
  uSpeed: { value: THREE.Vector3 };
  uPhase: { value: number };
  uLength: { value: number };
  uWidth: { value: number };
  uPointer: { value: THREE.Vector3 };
  uPointerStrength: { value: number };
  uColorA: { value: THREE.Color };
  uColorB: { value: THREE.Color };
  uOpacity: { value: number };
  /** How hard the gradient is re-imposed on top of the lighting result. */
  uChroma: { value: number };
  /** Drawing-buffer size, for the screen-space readability mask. */
  uResolution: { value: THREE.Vector2 };
  uZoneA: { value: THREE.Vector4 };
  uZoneB: { value: THREE.Vector4 };
  uZoneC: { value: THREE.Vector4 };
  uZoneDims: { value: THREE.Vector4 };
  uZoneFeather: { value: number };
}

export interface RibbonMaterial extends THREE.MeshPhysicalMaterial {
  userData: { uniforms: RibbonUniforms };
}

/**
 * Shared GLSL: the displacement field and its analytic derivatives.
 *
 * Displacing a surface without fixing its normals gives you flat, plastic
 * looking motion -- the highlight stays put while the geometry moves under it.
 * Because the displacement here is a closed-form sum of sines, its slope along
 * the spine and across the strip can be differentiated exactly, and the shading
 * normal rebuilt from that slope. That is what keeps the specular band sliding
 * along the ribbon as it bends.
 */
const RIBBON_CHUNK = /* glsl */ `
const float RIBBON_PI = 3.141592653589793;

float ribbonEnvelope(float p) {
  // Ends taper to zero so ribbons never look severed at their extremities.
  return sin(p * RIBBON_PI);
}

float ribbonWave(float p, float s) {
  return uAmp.x * sin(p * uFreq.x + uTime * uSpeed.x + uPhase)
       + uAmp.y * sin(p * uFreq.y - uTime * uSpeed.y + uPhase * 1.7 + s * 0.6);
}

float ribbonNormalDisp(float p, float s) {
  return ribbonEnvelope(p) * ribbonWave(p, s);
}

/** d(ribbonNormalDisp)/dp -- product rule over the envelope and the wave. */
float ribbonNormalDispDp(float p, float s) {
  float e = ribbonEnvelope(p);
  float de = RIBBON_PI * cos(p * RIBBON_PI);
  float dw = uAmp.x * uFreq.x * cos(p * uFreq.x + uTime * uSpeed.x + uPhase)
           - uAmp.y * uFreq.y * cos(p * uFreq.y - uTime * uSpeed.y + uPhase * 1.7 + s * 0.6);
  return de * ribbonWave(p, s) + e * dw;
}

/** d(ribbonNormalDisp)/ds -- only the second wave varies across the strip. */
float ribbonNormalDispDs(float p, float s) {
  return ribbonEnvelope(p) * uAmp.y * 0.6
       * cos(p * uFreq.y - uTime * uSpeed.y + uPhase * 1.7 + s * 0.6);
}

/**
 * Sideways sweep. Moving the strip along its own binormal keeps the surface
 * perpendicular to it, so this term needs no normal correction at all.
 */
float ribbonLateralDisp(float p) {
  return ribbonEnvelope(p) * uAmp.z * sin(p * uFreq.z + uTime * uSpeed.z + uPhase * 0.5);
}
`;

const VERTEX_DECLARATIONS = /* glsl */ `
attribute vec3 aTangent;
attribute vec3 aBinormal;
attribute float aProgress;
attribute float aSide;

uniform float uTime;
uniform vec3 uAmp;
uniform vec3 uFreq;
uniform vec3 uSpeed;
uniform float uPhase;
uniform float uLength;
uniform float uWidth;
uniform vec3 uPointer;
uniform float uPointerStrength;

varying float vProgress;
varying float vSide;
varying float vEnvelope;
`;

const FRAGMENT_DECLARATIONS = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uOpacity;
uniform float uChroma;

varying float vProgress;
varying float vSide;
varying float vEnvelope;

/**
 * The ribbon's own colour at this fragment. The gradient is remapped into the
 * length that is actually opaque, so both ends of the blue-to-green ramp get
 * screen time instead of being spent inside the fade.
 */
vec3 ribbonGradient() {
  vec3 g = mix(uColorA, uColorB, smoothstep(0.1, 0.9, vProgress));
  // A brighter core down the middle reads as the light catching the crest of
  // the fold. Scaled, not lightened towards white -- adding white here
  // desaturates the widest and most visible part of the ribbon.
  float core = 1.0 - smoothstep(0.0, 0.55, abs(vSide));
  return g * (1.0 + core * 0.22);
}
`;

/**
 * A glossy, semi-transparent ribbon material.
 *
 * Built by patching `MeshPhysicalMaterial` rather than writing a raw
 * `ShaderMaterial`, so the ribbons keep real PBR shading, the environment
 * lighting and the clearcoat sheen that make them read as liquid glass instead
 * of coloured paper.
 */
export function createRibbonMaterial(
  spec: RibbonSpec,
  curveLength: number,
  opts: { iridescence: boolean; theme: 'light' | 'dark' },
): RibbonMaterial {
  const uniforms: RibbonUniforms = {
    uTime: { value: 0 },
    uAmp: { value: new THREE.Vector3(...spec.amplitude) },
    uFreq: { value: new THREE.Vector3(...spec.frequency) },
    uSpeed: { value: new THREE.Vector3(...spec.speed) },
    uPhase: { value: spec.phase },
    uLength: { value: Math.max(curveLength, 0.001) },
    uWidth: { value: Math.max(spec.width, 0.001) },
    uPointer: { value: new THREE.Vector3(0, 0, 0) },
    uPointerStrength: { value: 0 },
    uColorA: { value: new THREE.Color(spec.colorA) },
    uColorB: { value: new THREE.Color(spec.colorB) },
    // On a dark ground a ribbon is drawn against nothing, so the same alpha
    // that reads as a delicate sweep on white reads as a solid band. It also
    // has to clear the page copy, which is light-on-dark there.
    uOpacity: { value: spec.opacity * (opts.theme === 'light' ? 1 : 0.62) },
    // Light mode needs almost all of it: the ground is bright, so the ribbons
    // are lit hard from every side and clip constantly. Dark mode barely needs
    // any -- there the lighting is already well inside range.
    uChroma: { value: opts.theme === 'light' ? 0.82 : 0.4 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    // Shared by reference across every ribbon: ScrollController writes
    // these once a frame and all of them see it.
    ...safeZoneUniforms,
  };

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    // No clearcoat. Ribbons are the largest thing on screen by area and they
    // draw double-sided with depth writes off, so every one of their fragments
    // is shaded with no early-z rejection -- a second specular lobe across all
    // of that is the most expensive thing the frame could buy, for an effect
    // that low roughness already gives. The gloss is recovered below instead.
    // Theme-split on purpose. Light mode wants a tight, glossy specular so the
    // fold catches the light; on a dark ground the same highlight becomes a
    // chrome stripe and the sine displacement bands it into visible rings, so
    // dark mode gets a broad, soft response instead.
    roughness: opts.theme === 'light' ? 0.24 : 0.45,
    metalness: 0,
    // Dielectric specular pulled below the 1.0 default. These surfaces are
    // double-sided with depth writes off, so front and back faces composite
    // over each other and the specular term lands twice on the same pixel.
    specularIntensity: 0.55,
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide,
    depthWrite: false,
    // Deliberately well under 1. The environment is a bright studio, and a
    // ribbon is a broad surface facing it: reflect that at full strength and
    // the reflection *is* the ribbon, gradient and all replaced by the room.
    // The gloss the brief asks for comes from roughness above, which is a
    // narrow highlight, not from a wide environment wash.
    envMapIntensity: opts.theme === 'light' ? 0.45 : 0.3,
    emissive: new THREE.Color(spec.colorB),
    emissiveIntensity: 0,
    iridescence: opts.iridescence ? 0.35 : 0,
    iridescenceIOR: 1.3,
  }) as RibbonMaterial;

  material.userData.uniforms = uniforms;

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);

    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${VERTEX_DECLARATIONS}\n${RIBBON_CHUNK}`)
      .replace(
        '#include <beginnormal_vertex>',
        /* glsl */ `
        #include <beginnormal_vertex>
        {
          // Convert the parametric slopes into world-space gradients before
          // tilting the normal, or wide ribbons would shade differently to
          // narrow ones purely because of their parameterisation.
          float slopeAlong = ribbonNormalDispDp(aProgress, aSide) / uLength;
          float slopeAcross = ribbonNormalDispDs(aProgress, aSide) / uWidth;
          objectNormal = normalize(objectNormal - slopeAlong * aTangent - slopeAcross * aBinormal);
        }
        `,
      )
      .replace(
        '#include <begin_vertex>',
        /* glsl */ `
        #include <begin_vertex>
        vProgress = aProgress;
        vSide = aSide;
        vEnvelope = ribbonEnvelope(aProgress);
        {
          vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
          float pointerDist = length(worldPos.xy - uPointer.xy);
          // Gaussian falloff: the ribbon leans out of the cursor's way locally
          // and is completely unaffected a few units out.
          float pointerLift = uPointerStrength * exp(-pointerDist * pointerDist * 0.012);
          float along = ribbonNormalDisp(aProgress, aSide) + pointerLift * vEnvelope;
          float across = ribbonLateralDisp(aProgress);
          transformed += normal * along + aBinormal * across;
        }
        `,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>\n${FRAGMENT_DECLARATIONS}\nuniform vec2 uResolution;\n${SAFE_ZONE_GLSL}`,
      )
      .replace(
        '#include <opaque_fragment>',
        /* glsl */ `
        #include <opaque_fragment>
        {
          // Re-impose the gradient on the lit result.
          //
          // A ribbon is a broad, glossy, double-sided surface in a bright
          // studio. Between the diffuse term, the specular lobe and the two
          // faces compositing over each other, the outgoing radiance across
          // most of its area is above 1.0 -- and everything above 1.0 is
          // tonemapped into the same white. Authoring the albedo more
          // saturated cannot fix that, because the albedo is not what is
          // clipping. So the lighting is used for its *luminance* and the
          // ribbon's own hue is put back over the top of it, which is what
          // keeps colour in the ribbon exactly where it is brightest.
          vec3 tint = ribbonGradient();
          float lum = dot(gl_FragColor.rgb, vec3(0.2126, 0.7152, 0.0722));
          vec3 tinted = tint * (0.30 + lum * 1.25);
          // True speculars are still allowed towards white -- a highlight that
          // stays fully coloured reads as paint rather than as gloss. The
          // window is narrow and high on purpose: set it any lower and it
          // catches the broad environment reflection off the ribbon's flank,
          // which is a large area, not a highlight, and it comes back as a
          // white band down the middle of the ribbon.
          float specular = smoothstep(1.25, 2.1, lum);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, tinted, uChroma * (1.0 - specular * 0.7));
        }
        `,
      )
      .replace(
        '#include <color_fragment>',
        /* glsl */ `
        #include <color_fragment>
        {
          // The gradient is remapped into the length that is actually opaque,
          // so both ends of the blue-to-green ramp get screen time.
          diffuseColor.rgb *= ribbonGradient();
          // Opacity holds flat across the body of the ribbon and only drops in
          // the last sixth at each end. Fading it with the *displacement*
          // envelope (a full sine) instead would erase most of the gradient.
          float lengthFade = smoothstep(0.0, 0.14, vProgress) * smoothstep(1.0, 0.86, vProgress);
          // Across the strip the falloff is shallow: the borders keep most of
          // their alpha so the ribbon has an actual edge to be seen by. The
          // old 0.42 floor faded the sides out into the page, which is what
          // made these read as soft blurs rather than as surfaces.
          float edge = 1.0 - abs(vSide);
          diffuseColor.a *= uOpacity * lengthFade * (0.74 + 0.26 * edge);

          // Readability mask. Ribbons are the one thing in the scene wide
          // enough to cross the headline no matter where they are placed, so
          // instead of moving them they fade in screen space -- the sweep still
          // passes behind the copy, it just stops competing with it.
          diffuseColor.a *= 1.0 - safeZoneDim(gl_FragCoord.xy / uResolution);
        }
        `,
      );
  };

  // Forces a fresh program when the patched shader changes between tiers.
  material.customProgramCacheKey = () => `ribbon-${opts.iridescence ? 'ir' : 'plain'}-${opts.theme}`;

  return material;
}
