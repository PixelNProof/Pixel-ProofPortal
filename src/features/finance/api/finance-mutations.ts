import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"

export function useCreateInvoice() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  return useMutation({
    mutationFn: async (newInvoice: {
      client_id: string
      amount: number
      status: "Paid" | "Pending" | "Overdue"
      due_date?: string
    }) => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const { data, error } = await supabase
        .from('invoices')
        .insert([{ ...newInvoice, user_id: user.id }])
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
      toast.success("Invoice created successfully!")
    },
    onError: (error) => {
      toast.error(`Failed to create invoice: ${error.message}`)
    }
  })
}

export function useDeleteInvoice() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  return useMutation({
    mutationFn: async (invoiceId: string) => {
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', invoiceId)
      
      if (error) throw error
      return invoiceId
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
      toast.success("Invoice deleted successfully!")
    },
    onError: (error) => {
      toast.error(`Failed to delete invoice: ${error.message}`)
    }
  })
}
