import { useState } from 'react';

interface Artifact {
  id: string;
  title: string;
  type: 'chart' | 'table' | 'document';
  content: string;
}

export function ArtifactsPanel() {
  const [artifacts] = useState<Artifact[]>([
    {
      id: '1',
      title: 'Revenue Analysis',
      type: 'chart',
      content: 'Chart visualization would appear here',
    },
    {
      id: '2',
      title: 'Performance Metrics',
      type: 'table',
      content: 'Table data would appear here',
    },
    {
      id: '3',
      title: 'Financial Report',
      type: 'document',
      content: 'Document content would appear here',
    },
  ]);

  const [activeTab, setActiveTab] = useState(artifacts[0]?.id || '');

  const activeArtifact = artifacts.find((a) => a.id === activeTab);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Tab Bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex overflow-x-auto">
          {artifacts.map((artifact) => (
            <button
              key={artifact.id}
              onClick={() => setActiveTab(artifact.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === artifact.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs">
                  {artifact.type === 'chart' && '📊'}
                  {artifact.type === 'table' && '📋'}
                  {artifact.type === 'document' && '📄'}
                </span>
                {artifact.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeArtifact ? (
          <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {activeArtifact.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Type: {activeArtifact.type}
              </p>
            </div>
            <div className="text-gray-700 border-t border-gray-100 pt-4">
              {activeArtifact.content}
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200 text-center text-gray-400 min-h-[200px] flex items-center justify-center">
              <div>
                <div className="text-4xl mb-2">
                  {activeArtifact.type === 'chart' && '📊'}
                  {activeArtifact.type === 'table' && '📋'}
                  {activeArtifact.type === 'document' && '📄'}
                </div>
                <p>Artifact visualization placeholder</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="text-4xl mb-2">📭</div>
              <p>No artifacts yet</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
