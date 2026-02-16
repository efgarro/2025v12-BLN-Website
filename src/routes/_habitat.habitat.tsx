import { ClientOnly, createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { useGetImageMixOptions } from "~/apiFns/apiFns";
import CardEatdo from "~/components/CardEatdo";
import CardGrounds from "~/components/CardGrounds";
import CardHabitat from "~/components/CardHabitat";
import CardRooms from "~/components/CardRooms";
import { ImageCluster } from "~/components/ImageCluster";
import MenuBarHabitat from "~/components/MenuBarHabitat";

export const Route = createFileRoute("/_habitat/habitat")({
  loader: async ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(useGetImageMixOptions("habitat"));
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Suspense fallback="Loading Middleman...">
        <ClientOnly>
          <ImageCluster image_mix_name={"habitat"} />
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
              The pride and joy of BijaLapa Natural is the Scarlet Macaw Habitat
              Project which has a simple premise;{" "}
              <strong>
                <i>plant trees and wildlife will come</i>
              </strong>
              . So, for ten years straight, one hundred trees (or more) per year
              have been planted, and not only the majestic Scarlet Macaw has
              come to reap the benefits, but many other forms of wildlife too.
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
        <CardGrounds />
        <CardEatdo />
      </div>
    </div>
  );
}
