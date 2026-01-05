# Financial Performance Console

An AI-powered web application for understanding and taking action on financial business performance. This prototype explores IDE-like interaction models with a multi-pane layout featuring a conversational prompt interface and tabbed artifact viewing.

## Features

- **Multi-Pane Layout**: Resizable split-pane interface mimicking IDE applications
- **Conversational Interface**: Chat-based prompt and thread for querying business metrics
- **Artifacts Panel**: Tabbed interface for viewing charts, tables, and documents
- **Responsive Design**: Built with Tailwind CSS for rapid prototyping and iteration
- **TypeScript**: Type-safe development for better DX and fewer bugs

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first styling
- **Vercel** - Deployment platform (ready to deploy)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Building

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
console/
├── src/
│   ├── components/
│   │   ├── PromptThread.tsx    # Chat interface component
│   │   └── ArtifactsPanel.tsx  # Tabbed artifacts viewer
│   ├── App.tsx                  # Main layout with split panes
│   ├── index.css                # Tailwind imports and global styles
│   └── main.tsx                 # App entry point
├── public/                      # Static assets
├── vercel.json                  # Deployment configuration
└── package.json                 # Dependencies and scripts
```

## Deployment

### Deploy to Vercel

This project is configured for one-click deployment to Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy (no configuration needed - uses `vercel.json`)

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
# Build command
npm run build

# Publish directory
dist
```

## Interaction Model

The prototype explores a dual-pane interaction pattern:

- **Left Pane**: Conversational interface where users ask questions about their business performance
- **Right Pane**: Dynamic artifact display showing visualizations, tables, and reports generated from the conversation
- **Resizable**: Users can adjust pane sizes by dragging the center divider

## Next Steps

This is a low-fidelity prototype. Future iterations might include:

- [ ] Real AI integration for business performance analysis
- [ ] Dynamic chart generation (e.g., Chart.js, Recharts)
- [ ] Data table components with sorting/filtering
- [ ] Export functionality for artifacts
- [ ] User authentication and saved sessions
- [ ] Real-time collaboration features
- [ ] Mobile-responsive layout adaptations

## Contributing

This is a prototype for exploration and feedback. Feel free to experiment with different interaction patterns!

## License

MIT
