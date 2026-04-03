# UX Architecture for AI-Powered Financial Console

## The Core Question

> How do we build a customizable AI console experience for financial analysis that grows with the user?

---

## 1. Methods for Adding Context & Increasing Accuracy

### 📁 Static Context (Persists Across Sessions)

| Method | What It Is | Financial Use Case |
|--------|-----------|-------------------|
| **CLAUDE.md / Project Memory** | Project-level instructions that load automatically | "Always use GAAP accounting standards", "Our fiscal year starts April 1" |
| **Rules / Policies** | Guardrails and constraints | "Flag any transaction > $10k", "Never expose PII in outputs" |
| **Skills / Playbooks** | Reusable task patterns | "Monthly close checklist", "Churn analysis workflow" |
| **User Preferences** | Personal settings | "I prefer tables over charts", "Show amounts in EUR" |
| **Schema Definitions** | Data structure knowledge | Customer schema, payment fields, risk score definitions |

### 🔄 Dynamic Context (Real-Time / Session)

| Method | What It Is | Financial Use Case |
|--------|-----------|-------------------|
| **MCP Servers** | Live data connections | Stripe API, database queries, real-time metrics |
| **Conversation History** | Chat context | "Earlier you asked about Q3 revenue..." |
| **Active File/View Context** | What user is looking at | Current customer record, selected date range |
| **Tool Results** | Data from function calls | Query results, API responses, calculations |
| **RAG / Knowledge Base** | Retrieved documents | Company policies, past reports, definitions |

### 🤖 Agentic Context (Specialized Intelligence)

| Method | What It Is | Financial Use Case |
|--------|-----------|-------------------|
| **Agents** | Purpose-built AI instances | "Risk Analyst", "Revenue Forecaster", "Customer Insights" |
| **Sub-agents** | Delegated specialized tasks | Main agent calls "Tax Calculator" sub-agent |
| **Workflows** | Multi-step orchestrated tasks | "End of month reconciliation" = 5 agents in sequence |
| **Memory / Learning** | Patterns learned over time | "You usually check disputes on Mondays" |

---

## 2. How the Pieces Work Together (System Architecture)

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │  Command Input  │  │   Chat/Query    │  │  Visualizations │ │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘ │
└───────────┼─────────────────────┼─────────────────────┼─────────┘
            │                     │                     │
            ▼                     ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                      CONTEXT ASSEMBLY LAYER                     │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ CLAUDE.md│ │  Rules   │ │  Prefs   │ │  Schema  │ ← Static │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │   MCP    │ │  Chat    │ │  Files   │ │   RAG    │ ← Dynamic│
│  │ Servers  │ │ History  │ │ Context  │ │  Search  │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└─────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        AGENT ORCHESTRATION                      │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    PRIMARY AGENT                         │   │
│  │         (Understands your business context)             │   │
│  └─────────────────────────┬───────────────────────────────┘   │
│                            │                                    │
│            ┌───────────────┼───────────────┐                   │
│            ▼               ▼               ▼                   │
│     ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│     │   Risk     │  │  Revenue   │  │  Customer  │            │
│     │  Analyst   │  │ Forecaster │  │  Insights  │            │
│     └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                              │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │  Stripe  │ │ Database │ │  APIs    │ │  Files   │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### Context Priority / Resolution Order

```
1. System Defaults (base behavior)
      ↓
2. CLAUDE.md / Project Rules (business-specific)
      ↓
3. User Preferences (personal settings)
      ↓
4. Session Context (current conversation)
      ↓
5. Active Query/Task (immediate need)
      ↓
6. Tool Results (real-time data)
```

Later layers can override earlier ones.

---

## 3. User Evolution Journey

### Stage 1: Explorer (Day 1-7)
**Goal**: Get value immediately with zero configuration

| They Do | System Provides |
|---------|-----------------|
| Ask natural language questions | Pre-built queries, smart defaults |
| "Show me revenue this month" | Auto-detects data sources, formats output |
| Click suggested actions | Guided workflows, templates |

**Customization**: None required
**Context Used**: Defaults + MCP data connections

---

### Stage 2: Configurer (Week 2-4)
**Goal**: Tailor the experience to their workflow

| They Do | System Provides |
|---------|-----------------|
| Save favorite queries | Quick-access command palette |
| Set preferences | "Always show in EUR", "Default to last 30 days" |
| Create simple rules | "Alert me when churn > 5%" |
| Adjust visualizations | Chart types, color schemes, layouts |

**Customization**: PREFERENCES.md, saved queries, basic rules
**Context Used**: + User preferences + saved patterns

---

### Stage 3: Automator (Month 2-3)
**Goal**: Build repeatable workflows

| They Do | System Provides |
|---------|-----------------|
| Create playbooks | Multi-step workflows ("Monthly close") |
| Define complex rules | Conditional logic, thresholds |
| Set up scheduled reports | Automated delivery |
| Connect additional data sources | MCP server configuration |

**Customization**: Skills/playbooks, MCP integrations, automation rules
**Context Used**: + Skills + multiple MCP servers + scheduling

---

### Stage 4: Architect (Month 4+)
**Goal**: Build a customized analytical operating system

| They Do | System Provides |
|---------|-----------------|
| Create custom agents | Specialized AI for their domain |
| Build sub-agent workflows | Orchestrated multi-agent tasks |
| Define company-wide policies | CLAUDE.md for team |
| Integrate proprietary models | Custom tools, calculations |

**Customization**: Custom agents, team policies, advanced integrations
**Context Used**: Full stack, custom agents, team sharing

---

## 4. Key UX Architecture Questions to Answer

### A. Context Management

- [ ] **How does context persist?** Session vs permanent vs team-wide?
- [ ] **How do users see what context is active?** Can they inspect/edit it?
- [ ] **How do conflicts resolve?** User pref vs company policy?
- [ ] **What's the context window strategy?** What gets included when limit is reached?
- [ ] **How do users "reset" or "forget"?** Start fresh without losing config?

### B. Customization Discoverability

- [ ] **How do users discover what's customizable?** Progressive disclosure?
- [ ] **Where do users configure things?** In-console vs settings UI vs files?
- [ ] **How do they know customization worked?** Feedback/confirmation?
- [ ] **Can they preview before committing?** Dry-run mode?
- [ ] **How do they undo/revert?** Version history?

### C. Trust & Transparency

- [ ] **How do users know what data AI is seeing?** Context visibility
- [ ] **How do they verify accuracy?** Show sources, calculations
- [ ] **How do they correct mistakes?** Feedback loop
- [ ] **What's the audit trail?** Logs, history, accountability
- [ ] **How do they set boundaries?** "Never do X without asking"

### D. Learning Curve

- [ ] **What's the zero-config experience?** Works out of the box
- [ ] **How do we teach without overwhelming?** Progressive complexity
- [ ] **What are the "aha moments"?** Key features to introduce when
- [ ] **How do power users skip basics?** Expert mode

### E. Collaboration & Sharing

- [ ] **Can configs be shared?** Team templates
- [ ] **How do personal vs team settings interact?** Override rules
- [ ] **Can users share discoveries?** "I found this useful query"
- [ ] **How does versioning work?** Sync, conflicts

### F. Integration Architecture

- [ ] **How do MCP servers get added?** Self-service vs admin?
- [ ] **How do credentials get managed?** Security model
- [ ] **How do users know what's connected?** Integration status
- [ ] **What happens when integrations fail?** Graceful degradation

---

## 5. Design Principles for Financial Console UX

### Accuracy Over Speed
Financial data requires precision. Always show:
- Data freshness timestamps
- Calculation methodology
- Source attribution
- Confidence indicators when relevant

### Progressive Disclosure
Don't show everything at once:
- Level 1: Answer the question
- Level 2: Show the breakdown
- Level 3: Reveal the methodology
- Level 4: Access raw data

### Reversibility
Financial users are cautious:
- Preview before executing
- Undo/history for all actions
- Clear distinction between read vs write operations
- Confirmation for anything irreversible

### Context Awareness
The system should feel like it "knows" your business:
- Remember patterns ("You usually check this Monday")
- Anticipate needs ("Q4 close is coming up")
- Personalize language (your terminology, not generic)

---

## 6. Open Questions for Your Design

1. **Who is the primary user?** CFO? Analyst? Ops team?
2. **What's their current workflow?** What are we replacing/augmenting?
3. **What decisions does this enable?** What action follows insight?
4. **What's the trust model?** How much autonomy does AI have?
5. **What's the collaboration model?** Solo tool vs team platform?
6. **What's the stakes level?** Informational vs transactional?

---

## 7. Suggested Next Steps

1. **Map the user journey** for your primary persona
2. **Define the "zero config" experience** - what works on day 1?
3. **Identify the first 3 customization points** users will want
4. **Design the context visibility UI** - how do users see what AI knows?
5. **Prototype one complete workflow** end-to-end

---

*This document should evolve as you validate with users and build out features.*

