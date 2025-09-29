export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-neutral-200 dark:border-neutral-800 py-12 text-sm bg-white/70 dark:bg-neutral-900/50 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-display text-lg mb-2">Helados Gourmet</h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            Helado gourmet, sin prisas, con alma.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Navegación</h4>
          <ul className="space-y-1">
            <li>
              <a href="#sabores" className="hover:text-accent">
                Sabores
              </a>
            </li>
            <li>
              <a href="#proceso" className="hover:text-accent">
                Proceso
              </a>
            </li>
            <li>
              <a href="#ubicaciones" className="hover:text-accent">
                Ubicaciones
              </a>
            </li>
            <li>
              <a href="#contacto" className="hover:text-accent">
                Contacto
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Contacto</h4>
          <p>
            Email:{" "}
            <a
              href="mailto:hola@example.com"
              className="hover:text-accent underline"
            >
              hola@example.com
            </a>
          </p>
          <p className="mt-2 flex gap-3">
            <a href="#" aria-label="Instagram" className="hover:text-accent">
              IG
            </a>
            <a href="#" aria-label="TikTok" className="hover:text-accent">
              TT
            </a>
          </p>
        </div>
      </div>
      <div className="mt-10 text-center text-neutral-500 text-xs">
        © {new Date().getFullYear()} Helados Gourmet. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
