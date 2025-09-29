import { lazy, Suspense } from "react";
import { prefersReducedMotion } from "../../utils/a11y";

const ThreeShowcase = lazy(() => import("./ThreeShowcase"));

export function LazyCanvas() {
  if (prefersReducedMotion()) {
    return (
      <div className="h-[60vh] flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
        <p className="text-neutral-600 dark:text-neutral-300">
          Experiencia 3D simplificada por tus preferencias.
        </p>
      </div>
    );
  }
  return (
    <Suspense fallback={<p className="p-8">Cargando experiencia 3D…</p>}>
      <ThreeShowcase />
    </Suspense>
  );
}
