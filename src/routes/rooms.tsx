import { ClientOnly, createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { useGetImageStackOptions } from "~/apiFns/apiFns";
import MenuBarViewRooms from "~/components/MenuBarRooms";
import { ImageCluster } from "../components/ImageCluster";

export const Route = createFileRoute("/rooms")({
  loader: ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(
      useGetImageStackOptions("019a939c-e590-779a-aaa6-66085d69ccae")
    );
  },
  component: Rooms,
});

function Rooms() {
  return (
    <div className="core_wrapper">
      <MenuBarViewRooms />
      <Suspense fallback="Loading Middleman...">
        <ClientOnly>
          <ImageCluster
            image_cluster_id={"019a939c-e590-779a-aaa6-66085d69ccae"}
          />
        </ClientOnly>
      </Suspense>
      <Outlet />
    </div>
  );
}
