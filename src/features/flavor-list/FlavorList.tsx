import { useFlavorStore } from "../../hooks/useFlavorStore";
import { useState, useRef } from "react";

// Raw list provided by user (normalized id + original label stored)
const FLAVORS = [
  "oreo",
  "nutella",
  "capuchino",
  "mazapan",
  "coco",
  "cajeta",
  "galleta maria",
  "bubulubu",
  "fresas con crema",
  "pay de limon",
  "vainilla",
  "chocolate",
  "queso crema",
  "triple pecado",
  "queso crema con zarzamora",
  "red velvet",
  "Angelito",
  "nuez",
  "pistache",
  "banoffee",
  "duvalin",
  "chamoy",
  "pica fresa",
  "pulparindo",
  "magnum",
  "ferrero rocher",
];

interface FlavorItem {
  id: string;
  label: string;
}

const flavorItems: FlavorItem[] = FLAVORS.map((label) => ({
  id: label
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, ""),
  label,
}));

// Categorías basadas en la estructura de carpetas creada:
//  /public/images/flavors/{leche|agua|premium}/<slug>.jpg
const AGUA = new Set<string>(["chamoy", "pica-fresa", "pulparindo"]);
const PREMIUM = new Set<string>(["ferrero-rocher", "magnum"]);

function getCategory(slug: string): "leche" | "agua" | "premium" {
  if (AGUA.has(slug)) return "agua";
  if (PREMIUM.has(slug)) return "premium";
  return "leche";
}

function buildImagePath(slug: string) {
  const cat = getCategory(slug);
  return `/images/flavors/${cat}/${slug}.jpg`;
}

export function FlavorList() {
  const active = useFlavorStore((s) => s.activeFlavor);
  const setActive = useFlavorStore((s) => s.setActiveFlavor);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [orientation, setOrientation] = useState<
    Record<string, "portrait" | "landscape" | "square">
  >({});
  const [dims, setDims] = useState<Record<string, { w: number; h: number }>>(
    {}
  );
  // Control de gesto para evitar selección accidental al hacer scroll
  const pointerData = useRef<{
    id: string;
    x: number;
    y: number;
    moved: boolean;
  } | null>(null);
  const MOVE_THRESHOLD = 10; // px

  return (
    <section id="lista-sabores" className="relative w-full py-10 -mt-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur p-4 shadow-soft">
          {/* Grid completa visible (2 columnas móvil, luego 3/4) */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3"
            role="list"
            aria-label="Lista de sabores"
          >
            {flavorItems.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  // Manejo personalizado de tap para no cambiar mientras se desplaza
                  onPointerDown={(e) => {
                    pointerData.current = {
                      id: item.id,
                      x: e.clientX,
                      y: e.clientY,
                      moved: false,
                    };
                  }}
                  onPointerMove={(e) => {
                    if (
                      !pointerData.current ||
                      pointerData.current.id !== item.id
                    )
                      return;
                    if (pointerData.current.moved) return;
                    const dx = Math.abs(e.clientX - pointerData.current.x);
                    const dy = Math.abs(e.clientY - pointerData.current.y);
                    if (dx > MOVE_THRESHOLD || dy > MOVE_THRESHOLD) {
                      pointerData.current.moved = true;
                    }
                  }}
                  onPointerUp={(e) => {
                    if (
                      !pointerData.current ||
                      pointerData.current.id !== item.id
                    )
                      return;
                    if (!pointerData.current.moved) {
                      setActive(item.id);
                    }
                    pointerData.current = null;
                  }}
                  onPointerCancel={() => {
                    pointerData.current = null;
                  }}
                  onPointerLeave={() => {
                    /* No limpiar para permitir up fuera si se arrastra levemente */
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(item.id);
                    }
                  }}
                  className={`relative rounded-full border px-3 py-1.5 text-[11px] font-medium tracking-wide select-none transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${
                    isActive
                      ? "border-accent bg-accent/15 text-accent-900 dark:text-accent-100"
                      : "border-neutral-200 dark:border-neutral-700 hover:border-accent/60 bg-white/60 dark:bg-neutral-800/40"
                  }`}
                  aria-pressed={isActive}
                  aria-current={isActive ? "true" : undefined}
                  role="listitem"
                >
                  <span className="capitalize block truncate">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-8">
            {active ? (
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/30 p-5 flex flex-col items-center justify-start transition-colors">
                <p className="mb-4 text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  {flavorItems.find((f) => f.id === active)?.label}
                </p>
                {/* Vista adaptativa: imagen mantiene proporción sin forzar cuadro adicional */}
                {(() => {
                  const MAX = 320; // límite visual
                  const data = dims[active];
                  let style: React.CSSProperties = {
                    maxWidth: MAX,
                    maxHeight: MAX,
                  };
                  if (data) {
                    const { w, h } = data;
                    const ratio = w / h;
                    if (ratio >= 1) {
                      // landscape o cuadrada
                      style.width = Math.min(w, MAX);
                      style.height = Math.min(
                        (style.width as number) / ratio,
                        MAX
                      );
                    } else {
                      // portrait
                      style.height = Math.min(h, MAX);
                      style.width = Math.min(
                        (style.height as number) * ratio,
                        MAX
                      );
                    }
                  }
                  return (
                    <div
                      className="relative flex items-center justify-center"
                      style={{ minHeight: 180 }}
                    >
                      <div className="relative" style={style}>
                        <img
                          src={buildImagePath(active)}
                          alt={`Imagen de ${
                            flavorItems.find((f) => f.id === active)?.label
                          }`}
                          className={`block w-full h-full object-contain rounded-xl shadow-sm ring-1 ring-neutral-200/70 dark:ring-neutral-700/60 bg-white/70 dark:bg-neutral-900/40 ${
                            loadedImages[active] ? "opacity-100" : "opacity-0"
                          } transition-opacity duration-300`}
                          onLoad={(e) => {
                            const img = e.currentTarget;
                            const o =
                              img.naturalWidth === img.naturalHeight
                                ? "square"
                                : img.naturalWidth > img.naturalHeight
                                ? "landscape"
                                : "portrait";
                            setOrientation((prev) => ({
                              ...prev,
                              [active]: o,
                            }));
                            setDims((prev) => ({
                              ...prev,
                              [active]: {
                                w: img.naturalWidth,
                                h: img.naturalHeight,
                              },
                            }));
                            setLoadedImages((prev) => ({
                              ...prev,
                              [active]: true,
                            }));
                          }}
                          onError={(e) => {
                            (
                              e.currentTarget as HTMLImageElement
                            ).style.display = "none";
                          }}
                          loading="lazy"
                        />
                        {!loadedImages[active] && (
                          <span className="absolute inset-0 flex items-center justify-center text-[11px] text-neutral-500 dark:text-neutral-400 px-3 text-center leading-tight">
                            (Agrega imagen en {buildImagePath(active)})
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-10 text-center text-neutral-500 dark:text-neutral-400 text-sm min-h-[160px] flex items-center justify-center">
                Selecciona un sabor para ver su imagen aquí.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FlavorList;
