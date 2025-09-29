export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-white/60 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <div className="font-display text-xl tracking-wide select-none">
          Helados Gourmet Leal
        </div>
        <nav
          aria-label="Principal"
          className="hidden md:flex gap-6 text-sm font-medium"
        >
          <a href="#showcase" className="hover:text-accent transition-colors">
            Experiencia 3D
          </a>
        </nav>
      </div>
    </header>
  );
}
