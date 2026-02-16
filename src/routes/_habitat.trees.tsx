import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { useGetImageMixOptions } from "~/apiFns/apiFns";
import { ImageCluster } from "~/components/ImageCluster";

export const Route = createFileRoute("/_habitat/trees")({
  loader: ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(useGetImageMixOptions("trees"));
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Suspense fallback="Loading Middleman...">
        <ClientOnly>
          <ImageCluster image_mix_name={"trees"} />
        </ClientOnly>
      </Suspense>
      <div className="mb-12"></div>
    </div>
  );
}
