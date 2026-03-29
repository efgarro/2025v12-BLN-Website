import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { useGetImageMixOptions } from "~/apiFns/apiFns";
import { ImageCluster } from "~/components/ImageCluster";

export const Route = createFileRoute("/_grounds/organic")({
  head: () => ({
    meta: [
      {
        title: "Sustainable Organic Practices",
      },
      {
        name: "description",
        content:
          "It includes information on the sustainable organic practices adopted for the grounds from day one",
      },
    ],
  }),
  loader: ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(useGetImageMixOptions("organic"));
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Suspense fallback="Loading Middleman...">
        <ClientOnly>
          <ImageCluster image_mix_name={"organic"} />
        </ClientOnly>
      </Suspense>
      <div className="h-12 mb-12"></div>
    </div>
  );
}
