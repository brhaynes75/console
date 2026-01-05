import { useState } from 'react';
import { PromptThread } from './components/PromptThread';
import { ArtifactsPanel } from './components/ArtifactsPanel';

function App() {
  const [leftWidth, setLeftWidth] = useState(50); // Percentage
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isResizing) return;

    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 20 && newWidth < 80) {
      setLeftWidth(newWidth);
    }
  };

  return (
    <div
      className="h-screen flex flex-col bg-gray-100"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Financial Performance Console
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              AI-powered business insights and analytics
            </p>
          </div>
          <div className="text-xs text-gray-400">
            Prototype v0.1
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane - Prompt & Thread */}
        <div
          style={{ width: `${leftWidth}%` }}
          className="border-r border-gray-200"
        >
          <PromptThread />
        </div>

        {/* Resizer */}
        <div
          className={`w-1 cursor-col-resize hover:bg-blue-500 transition-colors ${
            isResizing ? 'bg-blue-500' : 'bg-gray-200'
          }`}
          onMouseDown={handleMouseDown}
        />

        {/* Right Pane - Artifacts */}
        <div
          style={{ width: `${100 - leftWidth}%` }}
          className="flex-1"
        >
          <ArtifactsPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
