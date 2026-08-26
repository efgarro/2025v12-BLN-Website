import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { useGetImageMixOptions } from "~/apiFns/apiFns";
import { ImageCluster } from "~/components/ImageCluster";

export const Route = createFileRoute("/_habitat/trees")({
  head: () => ({
    meta: [
      {
        title: "One Hundred Trees per Year and Counting",
      },
      {
        name: "description",
        content:
          "It includes a description and a photo gallery of the effort made by BijaLapa Natural to plant one hundred trees per year or more",
      },
    ],
  }),
  loader: ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(useGetImageMixOptions("trees"));
  },
  component: Trees,
});

function Trees() {
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
