import {
  ClientOnly,
  createFileRoute,
  RouterProvider,
} from "@tanstack/react-router";

import { FetchPics } from "~/components/FetchPics";
import { Suspense } from "react";
import { useScreenWidth } from "~/hooks/useScreenWidth";
import { getRouter } from "~/router";
import { useGetImageMixOptions } from "~/apiFns/apiFns";
import { ImageCluster } from "~/components/ImageCluster";
import CardGrounds from "~/components/CardGrounds";
import CardHabitat from "~/components/CardHabitat";
import CardEatdo from "~/components/CardEatdo";
import CardRooms from "~/components/CardRooms";
import Footer from "~/components/Footer";
import SocialLinks from "~/components/SocialLinks";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(useGetImageMixOptions("home"));
  },
  component: Home,
  //   loader: async () => await getTodo(),
});

function Home() {
  return (
    <>
      <div className="core_wrapper">
        <Suspense fallback="Loading Middleman...">
          <ClientOnly>
            <ImageCluster image_mix_name={"home"} />
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
                Hidden away, and scarcely a five-minute drive from the center of
                town, BijaLapa Natural offers rooms with a view where the
                grounds and the scenery set the stage for peaceful
                contemplation. When weather conditions permit, the
                starry...starry nights are spectacular.
              </p>
            </div>
          </div>
          <p className="text-center text-4xl bln-rojo">ᴥ</p>
          <p className="text-center text-4xl bln-verde">ᴥ</p>
          <p className="text-center text-4xl bln-amarillo">ᴥ</p>
          <p className="text-center text-4xl mb-14 bln-lila">ᴥ</p>
          <CardRooms />
          <CardGrounds />
          <CardHabitat />
          <CardEatdo />
        </div>
      </div>
    </>
  );
}
