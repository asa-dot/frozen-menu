import { useEffect, useMemo, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFlavorStore } from '../../../hooks/useFlavorStore';

// Actual detected model path (adjusted after directory inspection)
// If you rename the file, update here or extract to configuration.
const MODEL_PATH = '/models/fresas-con-crema.glb';

// Basic flavor color mapping (can refine to full PBR later)
const FLAVOR_COLORS: Record<string, string> = {
  vainilla: '#F5E6C8',
  fresa: '#FAD1D8',
  pistacho: '#CDE3C1',
  chocolate: '#5A3E36',
  matcha: '#A3C686'
};

// We will preload dynamically only after confirming the asset exists to avoid noisy errors.
// useGLTF.preload(MODEL_PATH);

interface ConeScoopModelProps {
  progress: number; // scroll 0..1 for subtle animation
  showExploded?: boolean;
}

// Internal component that actually loads & renders the GLTF once availability confirmed
function LoadedModel({ activeFlavor, progress, showExploded }: { activeFlavor: string; progress: number; showExploded?: boolean }) {
  const { scene } = useGLTF(MODEL_PATH) as any;

  // Clone once to avoid mutating original gltf scene on re-renders
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useMemo(() => {
    const color = new THREE.Color(FLAVOR_COLORS[activeFlavor] || FLAVOR_COLORS.vainilla);
    cloned.traverse((obj: any) => {
      if (obj.isMesh) {
        if (/scoop/i.test(obj.name)) {
          if (obj.material && obj.material.color) {
            obj.material = obj.material.clone();
            obj.material.color.copy(color);
            obj.material.needsUpdate = true;
          }
        }
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [cloned, activeFlavor]);

  const y = THREE.MathUtils.lerp(0, 0.9, Math.min(progress, 0.35) / 0.35);
  const rotY = progress * Math.PI * 1.5;

  return (
    <group position={[0, y, 0]} rotation={[0, rotY, 0]} scale={1}>
      <primitive object={cloned} />
      {showExploded && <group />}
    </group>
  );
}

export function ConeScoopModel({ progress, showExploded }: ConeScoopModelProps) {
  const activeFlavor = useFlavorStore(s => s.activeFlavor) || 'vainilla';
  const [available, setAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(MODEL_PATH, { method: 'HEAD' });
        if (!cancelled) {
          if (res.ok) {
            // Only preload when we know it's there
            try { useGLTF.preload(MODEL_PATH); } catch {/* ignore */}
            setAvailable(true);
          } else {
            setAvailable(false);
          }
        }
      } catch {
        if (!cancelled) setAvailable(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // While checking availability, render nothing to avoid layout shift inside Canvas
  if (available === null) return null;

  if (available === false) {
    // Fallback primitive sphere (legacy placeholder)
    const y = THREE.MathUtils.lerp(0, 0.9, Math.min(progress, 0.35) / 0.35);
    const rotY = progress * Math.PI * 1.5;
    return (
      <group position={[0, y, 0]} rotation={[0, rotY, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1, 48, 48]} />
          <meshStandardMaterial color={FLAVOR_COLORS[activeFlavor]} />
        </mesh>
      </group>
    );
  }

  return <LoadedModel activeFlavor={activeFlavor} progress={progress} showExploded={showExploded} />;
}

export default ConeScoopModel;