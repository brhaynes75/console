# Console Analytics Configuration

> **How to use this file:**
> - ✅ Checked items = Features you want / data you care about
> - 📝 Filled-in values = Your specific configuration
> - 🚧 This is currently a PLANNING document - it tells me (Claude) what to build
> - 🔮 Future: This could become a live config file the system reads automatically

---

## 📊 Data Sources

### What this section does:
Check the boxes for data you want to connect. This tells the system:
1. What APIs/databases to integrate
2. What terminology to use (Stripe's "charges" vs your "payments")
3. What fields are available for queries

### Primary Integrations
- [x] Stripe (Payments, Customers, Subscriptions)
- [ ] Database (PostgreSQL, MySQL, etc.)
- [ ] API endpoints
- [ ] CSV/File imports

### Stripe Data Objects I Care About
> Check the ones you want to query and visualize:

- [x] Customers → enables: `customer <lookup>`
- [x] Payments / Charges → enables: `payments <filters>`
- [x] Subscriptions → enables: `subscriptions <filters>`
- [ ] Invoices
- [x] Disputes / Chargebacks → enables: `disputes`, risk alerts
- [ ] Refunds
- [ ] Payouts
- [ ] Balance transactions

---

## 🖥️ Terminal Commands

### What this section does:
Define shortcuts and their behavior. The syntax `<param>` means "user provides this value."

### How to read the command syntax:

```
customer <email|id>
   │       │
   │       └── Parameters: what the user can type
   │           • email|id means "either email OR id works"
   │           • Add more options with | like: email|id|phone
   │
   └── Command name: what user types to invoke
```

### How to customize:

**Example 1: Add a parameter**
```yaml
# Before
customer <email|id>

# After (you want phone lookup too)
customer <email|id|phone>
```

**Example 2: Change what's returned**
```yaml
# Command definition
customer <email|id|phone>:
  returns:
    - name
    - email
    - phone           # ← add fields you want back
    - subscription_status
    - lifetime_value  # ← custom calculated field
    - risk_score
```

**Example 3: Add a new command**
```yaml
# Your custom command
whales:              # ← command name
  description: "Show high-value customers"
  filters:
    lifetime_value: "> $10,000"
  returns:
    - name
    - email
    - lifetime_value
    - last_payment_date
```

---

### My Commands (Customize These!)

```yaml
# ═══════════════════════════════════════════════════════════
# CUSTOMER COMMANDS
# ═══════════════════════════════════════════════════════════

customer <email|id|phone>:
  description: "Look up a customer"
  returns:
    - name
    - email
    - created_date
    - subscription_status
    - lifetime_value
    - risk_score
  # Add or remove fields above based on what you care about

customers:
  description: "List customers with filters"
  filters:
    --status: "active|churned|all"
    --since: "<date>"
    --min-value: "<amount>"
  # Example: customers --status active --min-value 1000

# ═══════════════════════════════════════════════════════════
# PAYMENT COMMANDS  
# ═══════════════════════════════════════════════════════════

payments:
  description: "Show recent payments"
  filters:
    --last: "24h|7d|30d|90d"
    --status: "succeeded|failed|pending"
    --min: "<amount>"
  returns:
    - date
    - customer
    - amount
    - status
  # Example: payments --last 7d --status failed

payment <id>:
  description: "Payment details"
  returns:
    - all fields

# ═══════════════════════════════════════════════════════════
# REVENUE COMMANDS
# ═══════════════════════════════════════════════════════════

revenue:
  description: "Revenue summary"
  filters:
    --period: "day|week|month|quarter|year"
    --compare: "previous"  # compare to previous period
  returns:
    - total
    - change_percent
    - breakdown_by_product

mrr:
  description: "Monthly recurring revenue"
  returns:
    - current_mrr
    - mrr_growth
    - new_mrr
    - churned_mrr
    - expansion_mrr

# ═══════════════════════════════════════════════════════════
# RISK COMMANDS
# ═══════════════════════════════════════════════════════════

risk:
  description: "Risk overview"
  returns:
    - high_risk_customers
    - recent_disputes
    - failed_payment_rate

risk <customer_id>:
  description: "Customer risk profile"
  returns:
    - risk_score
    - risk_factors
    - dispute_history
    - failed_payments

alerts:
  description: "Active alerts"
  filters:
    --type: "risk|payment|churn"
    --severity: "critical|warning|info"
```

---

## 🗣️ My Business Language

### What this section does:
Map YOUR terminology to system terminology. This helps the AI understand when you say "client" you mean "customer."

```yaml
# ═══════════════════════════════════════════════════════════
# TERMINOLOGY MAPPING
# ═══════════════════════════════════════════════════════════

my_terms:
  # What I say → What system calls it
  client: customer
  sale: payment
  subscription: subscription
  plan: product
  cancelled: churned
  
# ═══════════════════════════════════════════════════════════
# CUSTOM METRICS (calculated fields)
# ═══════════════════════════════════════════════════════════

calculated_fields:
  lifetime_value:
    formula: "sum(all payments for customer)"
    
  health_score:
    formula: "based on: payment_history, login_frequency, support_tickets"
    thresholds:
      good: "> 80"
      warning: "50-80"
      bad: "< 50"
      
  risk_score:
    formula: "based on: dispute_history, failed_payments, account_age"
    thresholds:
      low: "< 30"
      medium: "30-70"
      high: "> 70"
```

---

## ⚠️ Alerts & Thresholds

### What this section does:
Define when the system should alert you. Fill in YOUR thresholds.

```yaml
# ═══════════════════════════════════════════════════════════
# ALERT RULES
# ═══════════════════════════════════════════════════════════

alerts:
  high_value_transaction:
    trigger: "payment.amount > $5000"    # ← Your threshold
    severity: warning
    action: "highlight in terminal"
    
  failed_payment_spike:
    trigger: "failed_rate > 5% in last hour"
    severity: critical
    action: "show alert banner"
    
  dispute_filed:
    trigger: "new dispute created"
    severity: critical
    action: "immediate notification"
    
  churn_risk:
    trigger: "customer.health_score < 50"
    severity: warning
    action: "add to at-risk list"
    
  large_refund:
    trigger: "refund.amount > $1000"     # ← Your threshold
    severity: info
    action: "log for review"
```

---

## 📈 Chart Configurations

### Default Dashboard Charts

```yaml
charts:
  revenue_trend:
    type: line
    data: daily_revenue
    period: 30d
    refresh: 5min
    
  customer_growth:
    type: line  
    data: cumulative_customers
    period: 90d
    refresh: 15min
    
  payment_status:
    type: bar  # or: pie, doughnut
    data: payment_outcomes
    period: 7d
    refresh: 1min
    
  risk_distribution:
    type: bar
    data: customers_by_risk_score
    refresh: 5min
```

### Chart Style Preferences

```yaml
chart_style:
  gradients: false        # ✅ You set this!
  theme: dark
  colors:
    success: "#22c55e"    # green
    warning: "#eab308"    # yellow  
    error: "#ef4444"      # red
    primary: "#3b82f6"    # blue
    neutral: "#6b7280"    # gray
  grid_lines: subtle
  animations: minimal
```

---

## 🎨 UI Preferences

```yaml
ui:
  layout: horizontal      # horizontal | vertical
  text_area:
    padding: 20px         # ✅ You set this!
    shadow: true          # ✅ You set this!
  terminal:
    font_size: 14
    font_family: "Menlo, Monaco, monospace"
```

---

## 🔌 Connections (Fill in your credentials)

```yaml
# ⚠️ Don't commit real keys! Use environment variables.
connections:
  stripe:
    mode: test  # test | live
    # Set in environment: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
    
  database:
    type: postgresql
    # Set in environment: DATABASE_URL
```

---

## 🎯 What I Want to Build (Priority)

### Phase 1 - This Week
- [x] Basic console with terminal + chart
- [ ] Connect to Stripe API (read-only)
- [ ] `customer <email>` command
- [ ] Revenue chart

### Phase 2 - Next 2 Weeks  
- [ ] `payments` command with filters
- [ ] Risk score display
- [ ] Alert system

### Phase 3 - Future
- [ ] Custom commands
- [ ] Saved queries
- [ ] Multiple chart views

---

## 📝 Notes

*Add context that helps me understand your business:*

- 
- 
- 

---

## ❓ How This File Works With the System

| When you... | The system... |
|-------------|---------------|
| Check a data source | Knows what APIs to connect |
| Define a command | Knows what shortcut to recognize |
| Add return fields | Knows what to show in output |
| Set thresholds | Knows when to trigger alerts |
| Map terminology | Understands your language |
| Configure charts | Sets up visualizations |

**Current state:** I (Claude) read this to understand what to build for you.

**Future state:** The console could parse this YAML and auto-configure itself.

---

*Edit this file anytime. Changes inform what we build next.*
