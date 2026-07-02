import { ClientDetail } from "@/features/clients/components/client-detail"

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  return <ClientDetail id={resolvedParams.id} />
}
