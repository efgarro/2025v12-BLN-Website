import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { useGetImageStackOptions } from "~/apiFns/apiFns";
import { ImageCluster } from "~/components/ImageCluster";

export const Route = createFileRoute("/grounds/yard")({
  loader: ({ context }) => {
      // Kick off loading as early as possible!
      context.queryClient.prefetchQuery(
        useGetImageStackOptions("019a8f35-70f2-74f4-a53b-01917b4d47e7")
      );
    },
  component: Yard,
});

function Yard() {
  return (
    <div>
      <Suspense fallback="Loading Middleman...">
        <ClientOnly>
          <ImageCluster />
        </ClientOnly>
      </Suspense>
    </div>
  );
}
