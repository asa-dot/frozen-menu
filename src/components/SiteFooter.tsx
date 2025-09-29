export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 py-4 text-sm bg-white/60 dark:bg-neutral-900/50 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="text-neutral-500 text-[11px]">
          © {new Date().getFullYear()} Helados Gourmet Leal. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
