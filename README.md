# saanvitondak.vercel.app

My personal portfolio: **[saanvitondak.vercel.app](https://saanvitondak.vercel.app)**

A single-page React + Vite site with a three.js / react-three-fiber 3D character, GSAP ScrollTrigger animations and Lenis smooth scrolling. It is fully responsive and respects `prefers-reduced-motion`.

- All copy, links and project lists live in `src/data/content.js`
- Design tokens (colours, type, spacing, motion) live in `src/styles/theme.css`

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Deployed on Vercel from `main`.

## Credits

- Layout concept inspired by [Moncy Yohannan's portfolio](https://github.com/MoncyDev/Portfolio-Website). No code or assets from that project are used here.
- 3D character: "Michelle" (Mixamo / Adobe) via the [three.js examples](https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf), repainted — see `public/models/README.md`.
