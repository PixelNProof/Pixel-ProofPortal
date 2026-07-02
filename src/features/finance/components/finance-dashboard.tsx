"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, TrendingUp, DollarSign, CreditCard, MoreHorizontal, Trash2, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react"
import { mockRevenue } from "../data/mock-finance"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { toast } from "sonner"
import { useInvoices } from "@/hooks/use-invoices"
import { useDeleteInvoice } from "../api/finance-mutations"
import { AddInvoiceDialog } from "./add-invoice-dialog"

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function FinanceDashboard() {
  const { data: invoices = [], isLoading } = useInvoices()
  const { mutate: deleteInvoice } = useDeleteInvoice()

  // Calculate dynamic metrics
  const totalRevenue = invoices.filter(inv => inv.status === "Paid").reduce((acc, curr) => acc + curr.amount, 0)
  const outstandingBalance = invoices.filter(inv => inv.status === "Pending").reduce((acc, curr) => acc + curr.amount, 0)
  const overdueBalance = invoices.filter(inv => inv.status === "Overdue").reduce((acc, curr) => acc + curr.amount, 0)
  const pendingCount = invoices.filter(inv => inv.status === "Pending").length
  
  // Example dummy previous month data to show "trend" UI
  const previousRevenue = 45000; 
  const revenueTrend = totalRevenue >= previousRevenue 
    ? { value: (((totalRevenue - previousRevenue) / previousRevenue) * 100).toFixed(1), positive: true }
    : { value: (((previousRevenue - totalRevenue) / previousRevenue) * 100).toFixed(1), positive: false }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Finance</h2>
          <p className="text-muted-foreground mt-1">Manage your agency's revenue and invoicing.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => toast.success("Exporting data to CSV...")} className="shadow-sm">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <AddInvoiceDialog />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Metric 0: MRR */}
        <Card className="relative overflow-hidden border-muted/30 shadow-md transition-all hover:shadow-lg hover:border-blue-500/20 group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Monthly Recurring (MRR)</CardTitle>
            <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{formatCurrency(totalRevenue * 0.4)}</div>
            <div className="flex items-center mt-2 space-x-2">
              <Badge variant="outline" className="border-blue-500/20 text-blue-500 bg-blue-500/10">
                +12%
              </Badge>
              <span className="text-xs text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
        {/* Metric 1: Total Revenue */}
        <Card className="relative overflow-hidden border-muted/30 shadow-md transition-all hover:shadow-lg hover:border-primary/20 group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Total Revenue</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{formatCurrency(totalRevenue)}</div>
            <div className="flex items-center mt-2 space-x-2">
              <Badge variant="outline" className={`border-transparent bg-background/50 ${revenueTrend.positive ? 'text-emerald-500' : 'text-rose-500'}`}>
                {revenueTrend.positive ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                {revenueTrend.value}%
              </Badge>
              <span className="text-xs text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2: Outstanding */}
        <Card className="relative overflow-hidden border-muted/30 shadow-md transition-all hover:shadow-lg hover:border-amber-500/20 group">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Outstanding Balance</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">{formatCurrency(outstandingBalance)}</div>
            <div className="flex items-center mt-2 space-x-2">
              <Badge variant="outline" className="border-amber-500/20 text-amber-500 bg-amber-500/10">
                <Clock className="mr-1 h-3 w-3" /> {pendingCount} Pending
              </Badge>
              <span className="text-xs text-muted-foreground">awaiting payment</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3: Overdue */}
        <Card className="relative overflow-hidden border-muted/30 shadow-md transition-all hover:shadow-lg hover:border-destructive/20 group">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Overdue Amount</CardTitle>
            <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-destructive rotate-180" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight text-destructive">{formatCurrency(overdueBalance)}</div>
            <p className="text-xs text-muted-foreground mt-2 font-medium">Requires immediate attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7 mt-4">
        {/* Chart Section */}
        <Card className="col-span-4 border-muted/30 shadow-md">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly breakdown of revenue vs expenses.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <BarChart accessibilityLayer data={mockRevenue}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.5} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {/* Invoices List Section */}
        <Card className="col-span-3 border-muted/30 shadow-md flex flex-col">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>Manage and track billing status.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto pr-2">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="text-sm text-muted-foreground">Loading invoices...</p>
              </div>
            ) : invoices.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mb-3">
                  <CreditCard className="h-6 w-6 text-muted-foreground/50" />
                </div>
                <p className="font-medium">No invoices found</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-[200px]">Create an invoice to start tracking revenue.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="group flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 border border-transparent hover:border-border transition-all">
                    
                    <div className="flex items-center space-x-4">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0
                        ${invoice.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 
                          invoice.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 
                          'bg-rose-500/10 text-rose-500'}`}>
                        {invoice.client?.name ? invoice.client.name.charAt(0) : '?'}
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm truncate max-w-[120px]">{invoice.client?.name || "Unknown Client"}</span>
                        <span className="text-[10px] text-muted-foreground font-mono">Due: {new Date(invoice.due_date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-sm">{formatCurrency(invoice.amount)}</span>
                        <Badge variant="outline" className={`mt-1 text-[9px] h-4 px-1.5 border-transparent uppercase font-bold
                          ${invoice.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 
                            invoice.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 
                            'bg-rose-500/10 text-rose-500'}`}>
                          {invoice.status}
                        </Badge>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger 
                          render={
                            <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          } 
                        />
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => toast.info("Send reminder (coming soon)")}>
                            Send Reminder
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive focus:bg-destructive/10 focus:text-destructive font-medium"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this invoice?")) {
                                deleteInvoice(invoice.id)
                              }
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
