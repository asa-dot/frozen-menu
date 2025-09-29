# Helados Gourmet SPA ("frozen-menu")

Single Page Application cinematográfica para una marca de helados gourmet. Construida con Vite + React + TypeScript, Three.js vía React Three Fiber, animaciones UI con Framer Motion y efectos de scroll 3D progresivos.

## Objetivo
Impacto visual alto (3D + microinteracciones) con foco en rendimiento, accesibilidad AA y narrativa scroll-driven que explica: qué vendemos, por qué es premium y cómo comprar/visitar.

## Stack
- Vite + React 18 + TypeScript (strict)
- @react-three/fiber + @react-three/drei (Three.js abstractions)
- Framer Motion (micro-animaciones / transiciones)
- TailwindCSS (design tokens + velocity)
- Zustand (estado ligero: sabor activo, tema, flags UI)
- Netlify (deploy / redirects SPA / headers cache)

## Estructura propuesta
```
src/
	assets/              # imágenes, modelos .glb/.gltf, texturas
	components/          # UI reutilizable (Header, Footer, etc.)
	features/
		hero/
		flavors/
		process/
		story/
		locations/
		contact/
		three/             # Canvas3D, escenas, loaders, hooks
	hooks/
	styles/
	utils/
	App.tsx
	main.tsx
```

## Secciones (roadmap inicial)
1. Hero (cono/scoop 3D ligero + claim + CTA)
2. Sabores Destacados (grid interactivo + spotlight 3D / cambio de acento)
3. Showcase Scroll 3D (ScrollControls pages≈3: transición materiales, toppings, exploded view)
4. Ingredientes & Proceso (texto + iconografía + motion)
5. Historia (timeline breve)
6. Ubicaciones / Cómo comprar
7. Testimonios (opcional)
8. CTA final (Sabor de la semana)
9. Footer

## Experiencia Scroll 3D
ScrollControls (drei) divide narrativa en "capítulos":
1. Scoop flotando rotando (vainilla → fresa → pistacho)
2. Toppings cayendo (easing elástico controlado)
3. Exploded view del cono (labels breves)

Fallback en mobile / prefers-reduced-motion: frames estáticos o video ligero.

## Accesibilidad
- Focus visible, skip link, alt en imágenes
- prefers-reduced-motion respetado
- Contraste mínimo AA (paleta pastel + acentos contrastantes)

## Rendimiento
- LCP < 2.5s (modelo hero optimizado, lazy del canvas avanzado)
- dpr={[1,1.5]} + Suspense + preload de modelos críticos
- Modelos Draco / Meshopt (pendiente)
- Limitar luces (1–2 direccionales + ambient suave)

## Estado Global (Zustand)
```ts
interface FlavorState {
	activeFlavor: string | null; // 'vainilla' | 'fresa' | ...
	setActiveFlavor: (id: string) => void;
}
```
Extensiones futuras: theme, uiFlags, weeklyFlavor.

## Scripts
```
npm run dev       # desarrollo
npm run build     # producción
npm run preview   # vista previa local de build
npm run lint      # eslint
```

## Deploy Netlify
- `netlify.toml` con redirects SPA (`/* -> /index.html 200`)
- Cache agresivo para assets fingerprinted, revalidación para index.html

## Roadmap Próximo
- [ ] Añadir sección Ingredientes & Proceso
- [ ] Preload modelos (useGLTF + suspend)
- [ ] Fallback motion-reduced
- [ ] Botón tema claro/oscuro
- [ ] Lighthouse tuning (imágenes WebP/AVIF)
- [ ] Sitemap + robots

## Licencia
MIT

---
WIP: Este README evolucionará conforme se implementen capítulos 3D adicionales y optimizaciones de performance.
