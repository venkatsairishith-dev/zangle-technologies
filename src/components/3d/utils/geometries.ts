import * as THREE from 'three';
import type { ShapeKind } from '../types';

/**
 * A rounded cube built as a superellipsoid.
 *
 * Rather than pulling in an extra geometry library, a UV sphere is re-projected
 * onto the unit ball of the p-norm: at p = 2 it is a sphere, and as p rises the
 * silhouette squares off while the corners stay smooth. The p-norm's gradient
 * gives exact analytic normals, so the highlight wraps the corners cleanly --
 * which is the whole reason the reference's cubes read as solid glass.
 */
export function createRoundedBoxGeometry(power = 6, segments = 48): THREE.BufferGeometry {
  const geometry = new THREE.SphereGeometry(1, segments, Math.max(8, segments >> 1));
  const position = geometry.attributes.position as THREE.BufferAttribute;
  const normal = geometry.attributes.normal as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  const n = new THREE.Vector3();

  for (let i = 0; i < position.count; i++) {
    v.fromBufferAttribute(position, i).normalize();
    const norm = Math.pow(
      Math.pow(Math.abs(v.x), power) +
        Math.pow(Math.abs(v.y), power) +
        Math.pow(Math.abs(v.z), power),
      1 / power,
    );
    const inv = norm > 1e-6 ? 0.5 / norm : 0;
    position.setXYZ(i, v.x * inv, v.y * inv, v.z * inv);

    // d/dx of (|x|^p + |y|^p + |z|^p)^(1/p) is proportional to sign(x)|x|^(p-1).
    n.set(
      Math.sign(v.x) * Math.pow(Math.abs(v.x), power - 1),
      Math.sign(v.y) * Math.pow(Math.abs(v.y), power - 1),
      Math.sign(v.z) * Math.pow(Math.abs(v.z), power - 1),
    );
    if (n.lengthSq() < 1e-12) n.set(0, 1, 0);
    n.normalize();
    normal.setXYZ(i, n.x, n.y, n.z);
  }

  position.needsUpdate = true;
  normal.needsUpdate = true;
  geometry.computeBoundingSphere();
  return geometry;
}

export interface SharedGeometries {
  /** Only the hero lens gets the dense sphere -- it is the one object big
   *  enough on screen for tessellation to be visible on its silhouette. */
  heroSphere: THREE.SphereGeometry;
  sphere: THREE.SphereGeometry;
  coreSphere: THREE.SphereGeometry;
  shapes: Record<ShapeKind, THREE.BufferGeometry>;
  dispose: () => void;
}

/**
 * One geometry per shape kind for the whole scene. Thirty meshes sharing five
 * buffers is the difference between a background that costs nothing and one
 * that gets blamed for the site feeling slow.
 */
export function createSharedGeometries(detail: number): SharedGeometries {
  const seg = (base: number, min = 6) => Math.max(min, Math.round(base * detail));

  // Segment budgets are set by how large the object gets on screen, not by
  // how round it "should" be. A medium sphere never exceeds ~120px, where the
  // difference between 40 and 28 segments is under a pixel of silhouette --
  // but it is 44% of its triangles, and each of these is drawn twice (once for
  // the mesh, once for its rim shell) and again into the transmission buffer.
  const heroSphere = new THREE.SphereGeometry(1, seg(48, 24), seg(32, 16));
  const sphere = new THREE.SphereGeometry(1, seg(28, 14), seg(18, 10));
  const coreSphere = new THREE.SphereGeometry(1, seg(18, 8), seg(12, 6));
  // A low-poly crystal: an octahedron stretched along Y into a bipyramid.
  // Normals have to be rebuilt after the scale or the facets light as if the
  // shape were still round.
  const crystal = new THREE.OctahedronGeometry(0.62, 0);
  crystal.scale(0.74, 1.6, 0.74);
  crystal.computeVertexNormals();

  const shapes: Record<ShapeKind, THREE.BufferGeometry> = {
    crystal,
    dodecahedron: new THREE.DodecahedronGeometry(0.6, 0),
    icosahedron: new THREE.IcosahedronGeometry(0.66, 0),
    octahedron: new THREE.OctahedronGeometry(0.72, 0),
    tetrahedron: new THREE.TetrahedronGeometry(0.78, 0),
    // A superellipsoid squares off fastest near its corners, so it needs far
    // fewer rings than a sphere to read as a cube.
    roundedBox: createRoundedBoxGeometry(6, seg(24, 12)),
  };

  return {
    heroSphere,
    sphere,
    coreSphere,
    shapes,
    dispose: () => {
      heroSphere.dispose();
      sphere.dispose();
      coreSphere.dispose();
      Object.values(shapes).forEach((g) => g.dispose());
    },
  };
}
