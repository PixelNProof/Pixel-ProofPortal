import { Paintbrush } from "lucide-react"
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form"

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col gap-6">
      <a href="/" className="flex items-center gap-2 self-center font-medium">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Paintbrush className="size-4" />
        </div>
        <span className="text-xl">Pixel & Proof HQ</span>
      </a>
      <ForgotPasswordForm />
    </div>
  )
}
