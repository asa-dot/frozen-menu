import { Suspense } from "react";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { FlavorList } from "./features/flavor-list/FlavorList";

function App() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="min-h-screen w-full overflow-x-hidden">
        {/* Encabezado del menú */}
        <section id="menu" className="relative w-full pt-16">
          <div className="max-w-5xl mx-auto px-4">
            <h1 className="font-display text-3xl md:text-4xl mb-6 tracking-tight text-center">
              Menú de Sabores
            </h1>
            <div className="rounded-2xl overflow-hidden shadow-md ring-1 ring-neutral-200/70 dark:ring-neutral-800/70">
              <img
                src="/images/menu-helados.png"
                alt="Menú de Helados Gourmet Leal"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
            <p className="mt-10 text-center text-xl md:text-lg font-medium text-neutral-800/90 dark:text-neutral-200 mx-auto leading-snug">
              Selecciona el sabor de helado que quieras ver.
            </p>
          </div>
        </section>
        <FlavorList />
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
