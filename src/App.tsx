import { Suspense } from "react";
import { LazyCanvas } from "./features/three/LazyCanvas";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";

function App() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="min-h-screen w-full overflow-x-hidden">
        {/* Imagen superior del menú / branding */}
        <section
          id="top-image"
          className="relative w-full bg-white dark:bg-neutral-950 pt-20"
        >
          <div className="max-w-5xl mx-auto px-4 pb-10">
            <div className="rounded-2xl overflow-hidden shadow-md ring-1 ring-neutral-200/70 dark:ring-neutral-800/70">
              <img
                src="/images/menu-helados.png"
                alt="Menú de Helados Gourmet Leal"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          </div>
        </section>
        {/* Descripción breve */}
        <section
          id="descripcion"
          className="relative w-full bg-neutral-50 dark:bg-neutral-900 py-10"
        >
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="font-display text-3xl md:text-4xl mb-4 tracking-tight">
              Helados Artesanales con Identidad
            </h1>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto text-base md:text-lg">
              Sabores cuidados, ingredientes reales y texturas balanceadas.
              Desliza para explorar el modelo 3D y pronto una experiencia
              narrativa donde cada capa contará su origen y proceso.
            </p>
          </div>
        </section>
        {/* Canvas 3D */}
        <section
          id="showcase"
          className="relative w-full h-[200vh] bg-neutral-100 dark:bg-neutral-950"
        >
          <LazyCanvas />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
