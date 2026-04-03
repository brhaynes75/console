# Simple Frontend - No Build Required!

This is a single-file HTML application that uses CDN-hosted libraries. No npm install, no build process!

## Libraries Used (via CDN)

- **xterm.js** - Terminal emulation
- **Chart.js** - Chart visualization  
- **Socket.IO** - WebSocket client
- **TailwindCSS** - Styling

## How It Works

Everything is in `index.html`:
- HTML structure
- CSS styling (via Tailwind)
- JavaScript for terminal and charts
- WebSocket connection to backend

## Running

```bash
node server.js
```

Then open http://localhost:5173

## Customizing

Just edit `index.html` and refresh your browser. No build step needed!

### Change Chart Type

Find the Chart.js initialization and change `type`:

```javascript
chart = new Chart(ctx, {
  type: 'bar',  // or 'pie', 'doughnut', 'radar', etc.
  // ...
});
```

### Add More Charts

Duplicate the canvas element and create another Chart instance:

```html
<canvas id="chart2"></canvas>
```

```javascript
const ctx2 = document.getElementById('chart2').getContext('2d');
const chart2 = new Chart(ctx2, { /* config */ });
```

### Style Changes

Use Tailwind classes directly in the HTML or add custom CSS in the `<style>` tag.








