import React, { useState } from 'react';

// Simulated chat messages for demo
const mockMessages = [
  { role: 'user', content: 'list churned customers and include reason for churn' },
  { role: 'assistant', content: 'I\'ll query the database to find churned customers along with their churn reasons. Let me analyze the data for you.' },
  { role: 'user', content: 'Can you also show their last activity date?' },
  { role: 'assistant', content: 'Of course. I\'ve updated the query to include the last activity date for each churned customer.' },
];

// Mock table data
const mockTableData = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  customer: `Customer ${1000 + i}`,
  reason: ['Price', 'Competitor', 'No longer needed', 'Poor support', 'Missing features'][i % 5],
  lastActivity: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
  revenue: `$${(Math.random() * 10000).toFixed(2)}`,
}));

// Mock chat history
const mockHistory = [
  { id: 1, title: 'Churn analysis query', date: 'Today' },
  { id: 2, title: 'Revenue by segment', date: 'Yesterday' },
  { id: 3, title: 'Customer lifetime value', date: 'Jan 3' },
];

// Layout selector component
const LayoutSelector = ({ currentLayout, onLayoutChange }) => (
  <div style={{
    position: 'fixed',
    top: 20,
    right: 20,
    zIndex: 1000,
    display: 'flex',
    gap: 8,
    background: 'rgba(30, 32, 36, 0.95)',
    padding: '8px 12px',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.08)',
    backdropFilter: 'blur(12px)',
  }}>
    {['chat', 'tabs', 'split'].map((layout) => (
      <button
        key={layout}
        onClick={() => onLayoutChange(layout)}
        style={{
          background: currentLayout === layout ? 'rgba(255,255,255,0.12)' : 'transparent',
          border: 'none',
          color: currentLayout === layout ? '#fff' : 'rgba(255,255,255,0.5)',
          padding: '8px 16px',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 13,
          fontWeight: 500,
          fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
          transition: 'all 0.2s ease',
          textTransform: 'capitalize',
        }}
      >
        {layout === 'split' ? 'Split Screen' : layout}
      </button>
    ))}
  </div>
);

// Sidebar component
const Sidebar = ({ isOpen, onToggle }) => (
  <div style={{
    width: isOpen ? 260 : 0,
    minWidth: isOpen ? 260 : 0,
    height: '100%',
    background: '#1a1b1e',
    borderRight: isOpen ? '1px solid rgba(255,255,255,0.06)' : 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  }}>
    {/* Header */}
    <div style={{
      padding: '16px 16px 12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{
        width: 24,
        height: 24,
        borderRadius: 6,
        background: 'rgba(255,255,255,0.08)',
      }} />
      <div style={{
        width: 80,
        height: 8,
        borderRadius: 4,
        background: 'rgba(255,255,255,0.15)',
      }} />
      <button
        onClick={onToggle}
        style={{
          width: 24,
          height: 24,
          borderRadius: 6,
          background: 'rgba(255,255,255,0.06)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.4)',
        }}
      >
        ‹
      </button>
    </div>

    {/* New Chat Button */}
    <div style={{ padding: '0 12px 16px' }}>
      <button style={{
        width: '100%',
        padding: '10px 16px',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 8,
        color: 'rgba(255,255,255,0.7)',
        fontSize: 13,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontFamily: "'SF Pro Display', -apple-system, sans-serif",
      }}>
        <span style={{ fontSize: 16 }}>+</span>
        New chat
      </button>
    </div>

    {/* Chat History */}
    <div style={{ flex: 1, padding: '0 8px', overflow: 'auto' }}>
      {mockHistory.map((chat) => (
        <div
          key={chat.id}
          style={{
            padding: '12px',
            borderRadius: 8,
            background: chat.id === 1 ? 'rgba(255,255,255,0.06)' : 'transparent',
            marginBottom: 4,
            cursor: 'pointer',
            transition: 'background 0.15s ease',
          }}
        >
          <div style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: 13,
            fontWeight: 500,
            marginBottom: 4,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {chat.title}
          </div>
          <div style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: 11,
          }}>
            {chat.date}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Collapsed sidebar toggle
const SidebarToggle = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: 'absolute',
      left: 16,
      top: 16,
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.08)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255,255,255,0.5)',
      zIndex: 100,
    }}
  >
    ☰
  </button>
);

// Chat input component
const ChatInput = ({ fullWidth = false }) => (
  <div style={{
    padding: fullWidth ? '16px' : '16px 0',
    width: '100%',
    maxWidth: fullWidth ? '100%' : 600,
    margin: fullWidth ? 0 : '0 auto',
  }}>
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 12,
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        width: 2,
        height: 20,
        background: 'rgba(255,255,255,0.5)',
        animation: 'blink 1s infinite',
      }} />
      <style>{`@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }`}</style>
    </div>
  </div>
);

// Chat messages component
const ChatMessages = ({ messages, centered = true }) => (
  <div style={{
    flex: 1,
    overflow: 'auto',
    padding: centered ? '40px 20px' : '20px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: centered ? 'center' : 'stretch',
  }}>
    <div style={{ width: '100%', maxWidth: centered ? 600 : '100%' }}>
      {messages.map((msg, i) => (
        <div
          key={i}
          style={{
            marginBottom: 16,
            padding: '16px 20px',
            background: msg.role === 'assistant' ? 'rgba(255,255,255,0.04)' : 'transparent',
            borderRadius: 12,
          }}
        >
          <div style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: 14,
            lineHeight: 1.6,
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
          }}>
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Tabbed content header
const TabsHeader = ({ tabs, activeTab, onTabChange, showAdd = true }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    padding: '12px 16px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  }}>
    {tabs.map((tab) => (
      <div
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        style={{
          padding: '8px 16px',
          paddingRight: 36,
          background: activeTab === tab.id ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
          borderRadius: 8,
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          transition: 'background 0.15s ease',
        }}
      >
        <span style={{
          color: activeTab === tab.id ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
          fontSize: 13,
          fontWeight: 500,
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
        }}>
          {tab.label}
        </span>
        <span style={{
          position: 'absolute',
          right: 10,
          color: 'rgba(255,255,255,0.3)',
          fontSize: 14,
          cursor: 'pointer',
        }}>
          ×
        </span>
      </div>
    ))}
    {showAdd && (
      <button style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        background: 'rgba(255,255,255,0.03)',
        border: 'none',
        color: 'rgba(255,255,255,0.4)',
        cursor: 'pointer',
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        +
      </button>
    )}
  </div>
);

// Table view component
const TableView = () => (
  <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 20px' }}>
    {/* Table header */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr',
      gap: 16,
      padding: '16px 0',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {['ID', 'Customer', 'Reason', 'Last Activity', 'Revenue'].map((header) => (
        <div key={header} style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: 12,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          {header}
        </div>
      ))}
    </div>
    {/* Table rows */}
    {mockTableData.map((row) => (
      <div
        key={row.id}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr',
          gap: 16,
          padding: '12px 0',
          borderBottom: '1px solid rgba(255,255,255,0.03)',
        }}
      >
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{row.id}</div>
        <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>{row.customer}</div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{row.reason}</div>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{row.lastActivity}</div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>{row.revenue}</div>
      </div>
    ))}
  </div>
);

// Right panel for tabs layout
const RightPanel = () => (
  <div style={{
    width: 240,
    borderLeft: '1px solid rgba(255,255,255,0.06)',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  }}>
    {/* Summary section */}
    <div>
      <div style={{
        color: 'rgba(255,255,255,0.4)',
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: 12,
      }}>
        Summary
      </div>
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        borderRadius: 8,
        padding: 12,
        color: 'rgba(255,255,255,0.6)',
        fontSize: 13,
      }}>
        15 rows
      </div>
    </div>

    {/* Filters section */}
    <div>
      <div style={{
        color: 'rgba(255,255,255,0.4)',
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: 12,
      }}>
        Filters
      </div>
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        borderRadius: 8,
        padding: '10px 12px',
        marginBottom: 8,
      }}>
        <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }} />
      </div>
    </div>

    {/* Export section */}
    <div>
      <div style={{
        color: 'rgba(255,255,255,0.4)',
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: 12,
      }}>
        Export
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{
          flex: 1,
          padding: '10px 16px',
          background: 'rgba(255,255,255,0.06)',
          border: 'none',
          borderRadius: 8,
          color: 'rgba(255,255,255,0.6)',
          fontSize: 12,
          cursor: 'pointer',
        }}>
          CSV
        </button>
        <button style={{
          flex: 1,
          padding: '10px 16px',
          background: 'rgba(255,255,255,0.06)',
          border: 'none',
          borderRadius: 8,
          color: 'rgba(255,255,255,0.6)',
          fontSize: 12,
          cursor: 'pointer',
        }}>
          JSON
        </button>
      </div>
    </div>

    {/* Actions */}
    <div>
      <div style={{
        color: 'rgba(255,255,255,0.4)',
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: 12,
      }}>
        Actions
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{
          flex: 1,
          padding: '10px 16px',
          background: 'rgba(255,255,255,0.06)',
          border: 'none',
          borderRadius: 8,
          color: 'rgba(255,255,255,0.6)',
          fontSize: 12,
          cursor: 'pointer',
        }}>
          Edit
        </button>
        <button style={{
          flex: 1,
          padding: '10px 16px',
          background: 'rgba(255,255,255,0.06)',
          border: 'none',
          borderRadius: 8,
          color: 'rgba(255,255,255,0.6)',
          fontSize: 12,
          cursor: 'pointer',
        }}>
          Share
        </button>
      </div>
    </div>
  </div>
);

// Layout 1: Chat
const ChatLayout = ({ sidebarOpen, setSidebarOpen }) => (
  <div style={{ display: 'flex', height: '100%', position: 'relative' }}>
    <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(false)} />
    {!sidebarOpen && <SidebarToggle onClick={() => setSidebarOpen(true)} />}
    
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: '#212226',
      position: 'relative',
    }}>
      {/* Window controls placeholder */}
      <div style={{
        position: 'absolute',
        top: 16,
        right: 80,
        display: 'flex',
        gap: 8,
      }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.2)',
          }} />
        ))}
      </div>

      {/* Empty state / Welcome */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: 280,
          height: 120,
          background: 'rgba(255,255,255,0.04)',
          borderRadius: 16,
          marginBottom: 24,
        }} />
        <div style={{
          display: 'flex',
          gap: 12,
        }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{
              width: 90,
              height: 36,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 8,
            }} />
          ))}
        </div>
      </div>

      <ChatInput />

      {/* Annotation */}
      <div style={{
        position: 'absolute',
        right: -140,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <div style={{
          width: 40,
          height: 1,
          background: 'rgba(255,255,255,0.2)',
        }} />
        <span style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: 12,
          whiteSpace: 'nowrap',
        }}>
          New session created
        </span>
      </div>
    </div>
  </div>
);

// Layout 2: Tabs
const TabsLayout = ({ sidebarOpen, setSidebarOpen }) => {
  const [activeTab, setActiveTab] = useState('data');
  const tabs = [
    { id: 'reasons', label: 'Churn reasons' },
    { id: 'data', label: 'Churn data' },
    { id: 'query', label: 'Churn query' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%', position: 'relative' }}>
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(false)} />
      {!sidebarOpen && <SidebarToggle onClick={() => setSidebarOpen(true)} />}
      
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#212226',
      }}>
        {/* Tabs header */}
        <TabsHeader tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Window controls */}
        <div style={{
          position: 'absolute',
          top: 16,
          right: 300,
          display: 'flex',
          gap: 8,
        }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.2)',
            }} />
          ))}
        </div>

        {/* Content area */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <TableView />
          </div>
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

// SQL Code View component
const SqlCodeView = () => {
  const sqlCode = `SELECT 
    c.customer_id,
    c.customer_name,
    c.email,
    cr.reason AS churn_reason,
    cr.category,
    c.last_activity_date,
    c.lifetime_revenue,
    c.subscription_start,
    c.subscription_end
FROM 
    customers c
INNER JOIN 
    churn_records cr ON c.customer_id = cr.customer_id
WHERE 
    c.status = 'churned'
    AND cr.recorded_at >= DATE_SUB(NOW(), INTERVAL 90 DAY)
ORDER BY 
    c.last_activity_date DESC
LIMIT 100;`;

  const highlightSql = (code) => {
    const keywords = ['SELECT', 'FROM', 'INNER JOIN', 'WHERE', 'AND', 'ORDER BY', 'LIMIT', 'AS', 'ON', 'DESC', 'DATE_SUB', 'NOW', 'INTERVAL', 'DAY'];
    let highlighted = code;
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span style="color: #c678dd;">${keyword}</span>`);
    });
    
    // Highlight strings
    highlighted = highlighted.replace(/'([^']*)'/g, '<span style="color: #98c379;">\'$1\'</span>');
    
    // Highlight numbers
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span style="color: #d19a66;">$1</span>');
    
    // Highlight column/table references
    highlighted = highlighted.replace(/\b(c|cr)\./g, '<span style="color: #e06c75;">$1</span>.');
    
    return highlighted;
  };

  return (
    <div style={{
      flex: 1,
      overflow: 'auto',
      padding: 20,
      background: '#1a1b1e',
    }}>
      {/* Editor toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            padding: '6px 12px',
            background: 'rgba(76, 175, 80, 0.15)',
            border: '1px solid rgba(76, 175, 80, 0.3)',
            borderRadius: 6,
            color: '#81c784',
            fontSize: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            ▶ Run
          </button>
          <button style={{
            padding: '6px 12px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 6,
            color: 'rgba(255,255,255,0.6)',
            fontSize: 12,
            cursor: 'pointer',
          }}>
            Format
          </button>
        </div>
        <div style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: 11,
        }}>
          PostgreSQL
        </div>
      </div>

      {/* Code editor */}
      <div style={{
        fontFamily: "'SF Mono', 'Fira Code', 'Monaco', monospace",
        fontSize: 13,
        lineHeight: 1.7,
        background: '#16171a',
        borderRadius: 10,
        padding: 20,
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'auto',
      }}>
        {/* Line numbers + code */}
        <div style={{ display: 'flex' }}>
          <div style={{
            color: 'rgba(255,255,255,0.2)',
            textAlign: 'right',
            paddingRight: 20,
            borderRight: '1px solid rgba(255,255,255,0.06)',
            marginRight: 20,
            userSelect: 'none',
          }}>
            {sqlCode.split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          <pre style={{
            margin: 0,
            color: '#abb2bf',
            whiteSpace: 'pre-wrap',
          }} dangerouslySetInnerHTML={{ __html: highlightSql(sqlCode) }} />
        </div>
      </div>

      {/* Query stats */}
      <div style={{
        marginTop: 16,
        padding: '12px 16px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: 8,
        display: 'flex',
        gap: 24,
      }}>
        <div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Last run: </span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>2 min ago</span>
        </div>
        <div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Duration: </span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>0.24s</span>
        </div>
        <div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Rows: </span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>15</span>
        </div>
      </div>
    </div>
  );
};

// Draggable divider component
const DraggableDivider = ({ onDrag }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    
    const handleMouseMove = (e) => {
      onDrag(e.clientX);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      style={{
        width: 6,
        cursor: 'col-resize',
        background: isDragging ? 'rgba(99, 140, 255, 0.3)' : 'transparent',
        borderLeft: '1px solid rgba(255,255,255,0.06)',
        transition: isDragging ? 'none' : 'background 0.15s ease',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Hover/drag indicator */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 4,
        height: 40,
        borderRadius: 2,
        background: isDragging ? 'rgba(99, 140, 255, 0.6)' : 'rgba(255,255,255,0.1)',
        opacity: isDragging ? 1 : 0,
        transition: 'opacity 0.15s ease',
      }} />
      <style>{`
        div:hover > div { opacity: 1 !important; }
      `}</style>
    </div>
  );
};

// Layout 3: Split Screen
const SplitLayout = ({ sidebarOpen, setSidebarOpen }) => {
  const [activeTab, setActiveTab] = useState('data');
  const [leftPanelWidth, setLeftPanelWidth] = useState(40); // percentage
  const containerRef = React.useRef(null);
  
  const tabs = [
    { id: 'data', label: 'Churn data' },
    { id: 'query', label: 'Churn query' },
  ];

  const handleDrag = (clientX) => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const sidebarWidth = sidebarOpen ? 260 : 0;
    const availableWidth = containerRect.width - sidebarWidth;
    const relativeX = clientX - containerRect.left - sidebarWidth;
    
    let newWidth = (relativeX / availableWidth) * 100;
    newWidth = Math.max(25, Math.min(65, newWidth)); // Clamp between 25% and 65%
    
    setLeftPanelWidth(newWidth);
  };

  return (
    <div ref={containerRef} style={{ display: 'flex', height: '100%', position: 'relative' }}>
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(false)} />
      {!sidebarOpen && <SidebarToggle onClick={() => setSidebarOpen(true)} />}
      
      {/* Left panel - Chat */}
      <div style={{
        width: `${leftPanelWidth}%`,
        minWidth: 280,
        display: 'flex',
        flexDirection: 'column',
        background: '#1e1f22',
      }}>
        {/* Header */}
        <div style={{
          padding: '16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          {!sidebarOpen && <div style={{ width: 32 }} />}
          <div style={{
            width: 100,
            height: 10,
            background: 'rgba(255,255,255,0.12)',
            borderRadius: 5,
          }} />
        </div>

        {/* User query banner */}
        <div style={{
          padding: '12px 16px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}>
          <span style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: 13,
          }}>
            list churned customers and include reason for churn
          </span>
        </div>

        <ChatMessages messages={mockMessages} centered={false} />
        <ChatInput fullWidth />
      </div>

      {/* Draggable divider */}
      <DraggableDivider onDrag={handleDrag} />

      {/* Right panel - Tabbed canvas */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#212226',
        minWidth: 300,
      }}>
        {/* Tabs header */}
        <TabsHeader tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Window controls */}
        <div style={{
          position: 'absolute',
          top: 16,
          right: 80,
          display: 'flex',
          gap: 8,
        }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.2)',
            }} />
          ))}
        </div>

        {activeTab === 'data' ? <TableView /> : <SqlCodeView />}
      </div>
    </div>
  );
};

// Main App
export default function App() {
  const [currentLayout, setCurrentLayout] = useState('chat');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#18191b',
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      boxSizing: 'border-box',
    }}>
      <LayoutSelector currentLayout={currentLayout} onLayoutChange={setCurrentLayout} />
      
      {/* Main window frame */}
      <div style={{
        width: '100%',
        maxWidth: 1200,
        height: '100%',
        maxHeight: 700,
        background: '#212226',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        position: 'relative',
      }}>
        {currentLayout === 'chat' && (
          <ChatLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        {currentLayout === 'tabs' && (
          <TabsLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        {currentLayout === 'split' && (
          <SplitLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
      </div>

      {/* Layout label */}
      <div style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(30, 32, 36, 0.9)',
        padding: '10px 20px',
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <span style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: 12,
          letterSpacing: '0.5px',
        }}>
          {currentLayout === 'chat' && '1. Chat — Centered conversation with collapsible history sidebar'}
          {currentLayout === 'tabs' && '2. Tabs — Multi-view tabs with data tables and right panel controls'}
          {currentLayout === 'split' && '3. Split Screen — IDE-style layout with persistent chat + tabbed canvas'}
        </span>
      </div>
    </div>
  );
}
