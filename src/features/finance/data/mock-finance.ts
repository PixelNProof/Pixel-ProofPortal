import { Invoice, RevenueData } from "../types/finance"

export const mockRevenue: RevenueData[] = [
  { month: "Jan", revenue: 12000, expenses: 4000 },
  { month: "Feb", revenue: 15000, expenses: 4200 },
  { month: "Mar", revenue: 18000, expenses: 4500 },
  { month: "Apr", revenue: 16000, expenses: 4300 },
  { month: "May", revenue: 21000, expenses: 4800 },
  { month: "Jun", revenue: 25000, expenses: 5000 },
]

export const mockInvoices: Invoice[] = [
  { id: "1", user_id: "demo", client_id: "1", client: { name: "Acme Corp" }, amount: 4500, status: "Paid", due_date: "2026-10-01", created_at: "2026-09-01" },
  { id: "2", user_id: "demo", client_id: "2", client: { name: "Lumina Fashion" }, amount: 2400, status: "Pending", due_date: "2026-10-15", created_at: "2026-09-02" },
  { id: "3", user_id: "demo", client_id: "4", client: { name: "Elevate Real Estate" }, amount: 8000, status: "Overdue", due_date: "2026-09-28", created_at: "2026-08-28" },
  { id: "4", user_id: "demo", client_id: "3", client: { name: "Zephyr Tech" }, amount: 1500, status: "Pending", due_date: "2026-10-20", created_at: "2026-09-10" },
]
