export interface Invoice {
  id: string;
  client: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  dueDate: string;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
}
