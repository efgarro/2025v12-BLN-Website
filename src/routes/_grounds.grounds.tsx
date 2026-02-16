import { ClientOnly, createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { useGetImageMixOptions } from "~/apiFns/apiFns";
import CardEatdo from "~/components/CardEatdo";
import CardHabitat from "~/components/CardHabitat";
import CardRooms from "~/components/CardRooms";
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
      <div className="article_wrapper mt-6">
        <div className="card bg-base-100 w-auto shadow-sm rounded-none mb-12">
          <figure>
            <img
              src="https://r2storage.bijalapa.com/logos/2024_BIJALAPA_LOGO_750x500.png"
              alt="Logo"
            />
          </figure>
          <div className="card-body bg-bln-azul-arena">
            <p className="prose lg:prose-lg">
              Across the grounds, a mixture of blooming flowers keeps
              pollinators busy most of the year, while fruits like bananas
              attract at least two species of toucans. Embracing sustainable
              organic practices has been our shared purpose and vision from day
              one.
            </p>
          </div>
        </div>
        <p className="text-center text-4xl bln-rojo">ᴥ</p>
        <p className="text-center text-4xl bln-verde">ᴥ</p>
        <p className="text-center text-4xl bln-amarillo">ᴥ</p>
        <p className="text-center text-4xl mb-14 bln-lila">ᴥ</p>
        <p className="text-center text-lg mb-8 bg-bln-verde-arena p-2">
          Back to
        </p>
        <CardRooms />
        <CardHabitat />
        <CardEatdo />
      </div>
    </div>
  );
}
