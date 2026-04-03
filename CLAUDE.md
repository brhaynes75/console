# CLAUDE.md

## Project

Rapid UI prototypes for Console — an AI-powered IDE-like interface with a chat sidebar, conversation panel, and artifact canvas. The goal is to explore interaction models, layouts, and transitions at high speed. These are design deliverables, not production code.

## Tech approach

- Zero-build HTML files using Tailwind CSS via CDN
- Each prototype is a self-contained folder in `prototypes/` with an `index.html`
- No frameworks, no build step — edit and refresh
- Deployed to Vercel as static files

## Design tokens

All prototypes use this shared color system in the Tailwind config:

```
surface-0: #171719  (deepest background)
surface-1: #1E1E21  (panels)
surface-2: #252528  (elevated surfaces)
surface-3: #1E1E21  (hover states, active items)
border:    #1E1E21  (default borders)
border-hover: #3a3a3a  (hover borders)
text-primary:   #D3D3D3
text-secondary: #A0A0AA
text-muted:     #6D6D77
accent:         #3b82f6
```

Font: system font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`)

## Animation conventions

- Layout transitions: `0.3s cubic-bezier(0.4, 0, 0.2, 1)` for width/transform
- Opacity transitions: `0.2s ease`
- Prioritize 60fps — use `transform` and `opacity` over layout-triggering properties
- Scrollbars: 6px wide, transparent track, `rgba(255,255,255,0.1)` thumb

## PrototypeOptions panel pattern

Each prototype should include a small configuration panel anchored to the bottom-right of the viewport. This panel lets viewers toggle between prototype variations without editing code. Style it to feel like Figma's configuration panels — compact, dense, dark surface.

Example structure:
```html
<div style="position: fixed; bottom: 16px; right: 16px; z-index: 9999;"
     class="bg-surface-1 border border-border rounded-lg p-3 text-xs">
    <div class="text-text-muted font-medium mb-2">Options</div>
    <!-- Toggle buttons, selects, sliders here -->
</div>
```

## Adding a new prototype

1. Create `prototypes/my-feature/index.html`
2. Include the Tailwind CDN script + color config (copy from any existing prototype)
3. Include the PrototypeOptions panel for variations
4. Add a link entry in `prototypes/index.html`

## File structure

```
prototypes/           All UI prototypes (this is what Vercel serves)
  index.html          Hub page linking to all prototypes
  layout/             3-panel IDE layout exploration
  nav/                Navigation collapse/expand patterns
docs/                 Strategic design documents
reference/            Backend + simple-frontend (not deployed, for later use)
```

## What NOT to do

- Don't add build tools (Vite, Webpack, etc.) — the zero-build approach is intentional
- Don't refactor existing prototypes unless asked — they are design artifacts
- Don't create React/Vue/Svelte components — raw HTML + Tailwind is the workflow
- Don't modify docs/ unless asked — those are strategic planning documents
