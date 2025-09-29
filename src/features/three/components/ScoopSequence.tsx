import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { ConeScoopModel } from '../models/ConeScoopModel';

const baseMaterials = [
  new THREE.MeshStandardMaterial({ color: '#F5E6C8' }), // vainilla
  new THREE.MeshStandardMaterial({ color: '#FAD1D8' }), // fresa
  new THREE.MeshStandardMaterial({ color: '#CDE3C1' }), // pistacho
];

// Simple instanced toppings (sprinkles) placeholder
function Toppings({ progress }: { progress: number }) {
  const instRef = useRef<THREE.InstancedMesh>(null!);
  const count = 60;
  const r = 1.4;
  const up = THREE.MathUtils.clamp((progress - 0.33) / 0.2, 0, 1); // appear after first third
  const tmp = new THREE.Object3D();
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = r * (0.3 + Math.random() * 0.7);
    tmp.position.set(Math.cos(angle) * radius, 0.6 + Math.random() * 0.8, Math.sin(angle) * radius);
    const fall = THREE.MathUtils.lerp(1.5, 0, up); // they fall in
    tmp.position.y += fall;
    tmp.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    const s = 0.02 + Math.random() * 0.025;
    tmp.scale.setScalar(s);
    tmp.updateMatrix();
    instRef.current?.setMatrixAt(i, tmp.matrix);
  }
  instRef.current && (instRef.current.instanceMatrix.needsUpdate = true);
  return (
    <instancedMesh ref={instRef} args={[undefined as any, undefined as any, count]}>
      <boxGeometry args={[1, 6, 1]} />
      <meshStandardMaterial color="#FF6B6B" transparent opacity={up} />
    </instancedMesh>
  );
}

// Exploded view placeholder (cone pieces) appearing in last third
function ExplodedView({ progress }: { progress: number }) {
  const show = THREE.MathUtils.clamp((progress - 0.66) / 0.25, 0, 1);
  return (
    <group visible={show > 0}>      
      <mesh position={[0, -1 - show * 0.5, 0]}>
        <coneGeometry args={[0.9, 1.6, 32]} />
        <meshStandardMaterial color="#D6B28C" />
      </mesh>
      <mesh position={[0, show * 0.8, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#F5E6C8" />
      </mesh>
      <mesh position={[0, 0.9 + show * 1.1, 0]}>
        <torusGeometry args={[0.85, 0.07, 16, 64]} />
        <meshStandardMaterial color="#FF6B6B" />
      </mesh>
    </group>
  );
}

export function ScoopSequence() {
  const mesh = useRef<THREE.Mesh>(null!);
  const scroll = useScroll();

  useFrame(() => {
    const t = scroll.offset; // 0..1
    if (mesh.current) {
      mesh.current.rotation.y = t * Math.PI * 2;
      // material morph (three segments)
      const idx = Math.min(baseMaterials.length - 1, Math.floor(t * baseMaterials.length));
      mesh.current.material = baseMaterials[idx];
      const rise = THREE.MathUtils.smoothstep(t, 0, 0.33);
      mesh.current.position.y = THREE.MathUtils.lerp(0, 1.1, rise);
      mesh.current.scale.setScalar(THREE.MathUtils.lerp(1, 0.85, THREE.MathUtils.clamp((t - 0.66) / 0.34, 0, 1)));
      mesh.current.visible = t < 0.66; // hide when exploded view takes over
    }
  });

  const progress = scroll.offset;
  return (
    <group>
      {/* Hide original procedural sphere when model loaded; keep as fallback if needed */}
      <group visible={false}>
        <mesh ref={mesh} castShadow position={[0,0,0]}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshStandardMaterial color="#F5E6C8" />
        </mesh>
      </group>
      <ConeScoopModel progress={progress} showExploded={progress > 0.66} />
      <Toppings progress={progress} />
      <ExplodedView progress={progress} />
    </group>
  );
}
