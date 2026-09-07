import * as THREE from 'three';

export interface RibbonGeometryOptions {
  /** Divisions along the spine. Higher = smoother waves. */
  segments: number;
  /** Divisions across the width. 2-3 is plenty for a flat strip. */
  crossSegments: number;
  width: number;
  /** Width multiplier at parameter t, used to taper the ends to nothing. */
  taper?: (t: number) => number;
}

/**
 * Builds a flat ribbon that follows a spline, carrying the extra attributes the
 * ribbon shader needs to deform it on the GPU.
 *
 * The strip is generated once and never rebuilt: all the motion lives in the
 * vertex shader, so animating five large ribbons costs no CPU time at all.
 * Rebuilding `TubeGeometry` per frame -- the obvious approach -- would stall the
 * main thread and defeat the whole point.
 *
 * Attributes emitted alongside position/normal/uv:
 *  - `aTangent`   frame tangent, the direction the spine travels
 *  - `aBinormal`  frame binormal, the direction the strip is wide in
 *  - `aProgress`  0..1 along the spine
 *  - `aSide`      -1..1 across the strip
 */
export function createRibbonGeometry(
  curve: THREE.Curve<THREE.Vector3>,
  { segments, crossSegments, width, taper }: RibbonGeometryOptions,
): THREE.BufferGeometry {
  const frames = curve.computeFrenetFrames(segments, false);
  const vertexCount = (segments + 1) * (crossSegments + 1);

  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const tangents = new Float32Array(vertexCount * 3);
  const binormals = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  const progress = new Float32Array(vertexCount);
  const sides = new Float32Array(vertexCount);

  const point = new THREE.Vector3();
  // A low exponent keeps the strip near full width for most of its length
  // and narrows only close to the tips.
  const taperFn = taper ?? ((t: number) => Math.sin(Math.PI * t) ** 0.28);

  let v = 0;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    curve.getPoint(t, point);
    const tangent = frames.tangents[i];
    const normal = frames.normals[i];
    const binormal = frames.binormals[i];
    const halfWidth = (width * 0.5) * taperFn(t);

    for (let j = 0; j <= crossSegments; j++) {
      const s = (j / crossSegments) * 2 - 1;
      const o = v * 3;

      positions[o] = point.x + binormal.x * s * halfWidth;
      positions[o + 1] = point.y + binormal.y * s * halfWidth;
      positions[o + 2] = point.z + binormal.z * s * halfWidth;

      normals[o] = normal.x;
      normals[o + 1] = normal.y;
      normals[o + 2] = normal.z;

      tangents[o] = tangent.x;
      tangents[o + 1] = tangent.y;
      tangents[o + 2] = tangent.z;

      binormals[o] = binormal.x;
      binormals[o + 1] = binormal.y;
      binormals[o + 2] = binormal.z;

      uvs[v * 2] = t;
      uvs[v * 2 + 1] = j / crossSegments;
      progress[v] = t;
      sides[v] = s;
      v++;
    }
  }

  const indices: number[] = [];
  const stride = crossSegments + 1;
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < crossSegments; j++) {
      const a = i * stride + j;
      const b = a + 1;
      const c = a + stride;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geometry.setAttribute('aTangent', new THREE.BufferAttribute(tangents, 3));
  geometry.setAttribute('aBinormal', new THREE.BufferAttribute(binormals, 3));
  geometry.setAttribute('aProgress', new THREE.BufferAttribute(progress, 1));
  geometry.setAttribute('aSide', new THREE.BufferAttribute(sides, 1));
  geometry.setIndex(indices);

  // The shader displaces vertices well outside the rest pose, so the bounding
  // sphere is padded by hand -- otherwise ribbons pop out of existence when
  // their undeformed bounds leave the frustum.
  geometry.computeBoundingSphere();
  if (geometry.boundingSphere) geometry.boundingSphere.radius *= 1.6;

  return geometry;
}
