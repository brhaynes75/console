# Console Prototypes

Interactive UI prototypes for the Console project. Zero-build HTML files — edit and refresh.

## Local development

```bash
cd prototypes
python3 -m http.server 3000
# → http://localhost:3000
```

## Adding a new prototype

1. Create `prototypes/my-feature/index.html`
2. Copy the Tailwind config + color tokens from an existing prototype
3. Add a link on `prototypes/index.html`
4. Push — Vercel auto-deploys

## Structure

```
prototypes/       UI prototypes (deployed to Vercel)
docs/             Strategic design docs
reference/        Backend + simple-frontend for later use
```
