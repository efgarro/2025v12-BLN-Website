import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { useGetImageMixOptions } from "~/apiFns/apiFns";
import { ImageCluster } from "~/components/ImageCluster";

export const Route = createFileRoute("/_grounds/yard")({
  head: () => ({
    meta: [
      {
        title: "Across the Yard",
      },
      {
        name: "description",
        content:
          "It includes a photo gallery on the yard's flowering plants and walking green spaces",
      },
    ],
  }),
  loader: ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(useGetImageMixOptions("yard"));
  },
  component: Yard,
});

function Yard() {
  return (
    <div>
      <Suspense fallback="Loading Middleman...">
        <ClientOnly>
          <ImageCluster image_mix_name={"yard"} />
        </ClientOnly>
      </Suspense>
      <div className="mb-12"></div>
    </div>
  );
}
