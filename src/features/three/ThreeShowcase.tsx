import { Canvas } from "@react-three/fiber";
import { ScrollControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { ScoopSequence } from "./components/ScoopSequence";

export function ThreeShowcase() {
  return (
    <div id="showcase" className="absolute inset-0">
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        performance={{ min: 0.4 }}
      >
        <color attach="background" args={["#fdfaf5"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <ScrollControls pages={1.5} damping={0.15}>
            <ScoopSequence />
          </ScrollControls>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default ThreeShowcase;
