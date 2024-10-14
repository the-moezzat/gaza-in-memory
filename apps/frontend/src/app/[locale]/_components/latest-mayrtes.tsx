import { createClerkSupabaseClientSsr } from "@/lib/client";
import MartyrCard from "./martyr-card";
import MartyrCardSkeleton from "./martyr-card-skeleton";
import { Suspense } from "react";

type LatestMayrtesProps = {};

function LatestMayrtesSkeleton() {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {[...Array(4)].map((_, index) => (
        <MartyrCardSkeleton key={index} />
      ))}
    </div>
  );
}

async function LatestMayrtesContent() {
  const client = createClerkSupabaseClientSsr(false);

  const { data: martyrs, error } = await client
    .from("martyrs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error(error);
    return <div>Error loading martyrs</div>;
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {martyrs?.map((martyr) => <MartyrCard key={martyr.id} martyr={martyr} />)}
    </div>
  );
}

export default function LatestMayrtes({}: LatestMayrtesProps) {
  return (
    <Suspense fallback={<LatestMayrtesSkeleton />}>
      <LatestMayrtesContent />
    </Suspense>
  );
}
