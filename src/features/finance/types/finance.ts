export interface Invoice {
  id: string;
  user_id: string;
  client_id: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  due_date: string;
  created_at: string;
  
  // Joined table data
  client?: {
    name: string;
  };
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
}
