import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getDoctor } from "./_actions";
import DoctorsList from "@/components/modules/Consultion/DoctorsList";

export default async function ConsultionPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["doctor"],
    queryFn: getDoctor,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorsList />
    </HydrationBoundary>
  )
}