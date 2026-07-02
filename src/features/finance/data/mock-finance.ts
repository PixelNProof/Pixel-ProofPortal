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
  { id: "INV-001", client: "Acme Corp", amount: 4500, status: "Paid", dueDate: "Oct 1" },
  { id: "INV-002", client: "Lumina Fashion", amount: 2400, status: "Pending", dueDate: "Oct 15" },
  { id: "INV-003", client: "Elevate Real Estate", amount: 8000, status: "Overdue", dueDate: "Sep 28" },
  { id: "INV-004", client: "Zephyr Tech", amount: 1500, status: "Pending", dueDate: "Oct 20" },
]
