import { useState } from 'react';

interface TaskStep {
  id: string;
  tool: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  output?: string;
  duration?: number;
}

interface TaskExecutionProps {
  query: string;
  onClose: () => void;
}

export function TaskExecutionPanel({ query, onClose }: TaskExecutionProps) {
  const [steps] = useState<TaskStep[]>([
    {
      id: '1',
      tool: 'QueryParser',
      description: 'Parse natural language query and extract intent',
      status: 'completed',
      output: 'Intent: retrieve_failed_payments, Timeframe: this_week, Entity: customers',
      duration: 120,
    },
    {
      id: '2',
      tool: 'DatabaseConnector',
      description: 'Connect to customer payment database',
      status: 'completed',
      output: 'Connected to payments_db (PostgreSQL)',
      duration: 350,
    },
    {
      id: '3',
      tool: 'SQLGenerator',
      description: 'Generate SQL query for failed payments',
      status: 'completed',
      output: `SELECT c.customer_id, c.name, c.email, p.amount, p.failure_reason, p.attempted_at
FROM customers c
JOIN payments p ON c.customer_id = p.customer_id
WHERE p.status = 'failed'
  AND p.attempted_at >= DATE_TRUNC('week', CURRENT_DATE)
ORDER BY p.attempted_at DESC`,
      duration: 450,
    },
    {
      id: '4',
      tool: 'QueryExecutor',
      description: 'Execute query and retrieve results',
      status: 'completed',
      output: 'Retrieved 23 rows in 145ms',
      duration: 145,
    },
    {
      id: '5',
      tool: 'DataFormatter',
      description: 'Format results for display',
      status: 'completed',
      output: 'Formatted 23 records with customer details and failure reasons',
      duration: 80,
    },
    {
      id: '6',
      tool: 'VisualizationGenerator',
      description: 'Generate table artifact',
      status: 'running',
      duration: 0,
    },
  ]);

  const getStatusColor = (status: TaskStep['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'running':
        return 'text-blue-600 bg-blue-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: TaskStep['status']) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'running':
        return '⟳';
      case 'failed':
        return '✗';
      default:
        return '○';
    }
  };

  const totalDuration = steps.reduce((sum, step) => sum + (step.duration || 0), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Task Execution Process</h2>
            <p className="text-sm text-gray-500 mt-1">Query: "{query}"</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Timeline */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex gap-4">
                {/* Timeline connector */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${getStatusColor(
                      step.status
                    )}`}
                  >
                    {getStatusIcon(step.status)}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.tool}</h3>
                      <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                    </div>
                    {step.duration !== undefined && step.duration > 0 && (
                      <span className="text-xs text-gray-500">{step.duration}ms</span>
                    )}
                  </div>

                  {step.output && (
                    <div className="mt-3 bg-gray-50 rounded border border-gray-200 p-3">
                      <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                        {step.output}
                      </pre>
                    </div>
                  )}

                  {step.status === 'running' && (
                    <div className="mt-3">
                      <div className="animate-pulse text-sm text-blue-600">
                        Processing...
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-600">
              <span className="font-medium">{steps.filter((s) => s.status === 'completed').length}</span>
              {' / '}
              <span>{steps.length}</span> steps completed
            </div>
            <div className="text-gray-600">
              Total execution time: <span className="font-medium">{totalDuration}ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
