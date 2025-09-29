import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { ScoopSequence } from './components/ScoopSequence';

export function ThreeShowcase() {
  return (
    <div id="showcase" className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
      >
        <color attach="background" args={[ '#fdfaf5' ]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5,5,5]} intensity={1.2} />
        <Suspense fallback={null}>
          <ScrollControls pages={3} damping={0.18}>
            <ScoopSequence />
            <Scroll html>
              <div className="absolute top-[120vh] left-1/2 -translate-x-1/2 w-full max-w-xl px-6 text-center">
                <h3 className="font-display text-4xl mb-4">Evolución del Sabor</h3>
                <p className="text-neutral-600 dark:text-neutral-300">Transiciones de vainilla a fresa a pistacho con texturas suaves optimizadas.</p>
              </div>
            </Scroll>
          </ScrollControls>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ThreeShowcase;
