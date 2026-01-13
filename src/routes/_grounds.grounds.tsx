import { ClientOnly, createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { useGetImageMixOptions } from "~/apiFns/apiFns";
import { ImageCluster } from "~/components/ImageCluster";

import MenuBarGrounds from "~/components/MenuBarGrounds";

export const Route = createFileRoute("/_grounds/grounds")({
  loader: ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(useGetImageMixOptions("grounds"));
  },
  component: Grounds,
});

function Grounds() {
  return (
    <div>
      <Suspense fallback="Loading Middleman...">
        <ClientOnly>
          <ImageCluster image_mix_name={"grounds"} />
        </ClientOnly>
      </Suspense>
    </div>
  );
}
