import { useState } from 'react';
import { TaskExecutionPanel } from './TaskExecutionPanel';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  query?: string;
}

export function PromptThread() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome! Ask me about your business performance metrics. Try: "Show me all customers who had a failed payment this week"',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [showExecutionPanel, setShowExecutionPanel] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const queryText = input;
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: queryText,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput('');

    // Simulate AI response (placeholder for actual AI integration)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I received your query: "${queryText}". This is a placeholder response.`,
        timestamp: new Date(),
        query: queryText,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 500);
  };

  const handleViewExecution = (query: string) => {
    setSelectedQuery(query);
    setShowExecutionPanel(true);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Thread Header */}
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">Conversation</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="text-sm">{message.content}</div>
              <div
                className={`text-xs mt-2 flex items-center gap-2 ${
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                <span>{message.timestamp.toLocaleTimeString()}</span>
                {message.role === 'assistant' && message.query && (
                  <>
                    <span>•</span>
                    <button
                      onClick={() => handleViewExecution(message.query!)}
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      View execution
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your business performance..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>

      {/* Task Execution Panel */}
      {showExecutionPanel && (
        <TaskExecutionPanel
          query={selectedQuery}
          onClose={() => setShowExecutionPanel(false)}
        />
      )}
    </div>
  );
}
