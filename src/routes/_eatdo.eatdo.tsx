import { ClientOnly, createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";
import { useGetImageMixOptions } from "~/apiFns/apiFns";
import CardGrounds from "~/components/CardGrounds";
import CardHabitat from "~/components/CardHabitat";
import CardRooms from "~/components/CardRooms";
import { ImageCluster } from "~/components/ImageCluster";
import MenuBarActivities from "~/components/MenuBarEatDo";

export const Route = createFileRoute("/_eatdo/eatdo")({
  loader: async ({ context }) => {
    // Kick off loading as early as possible!
    context.queryClient.prefetchQuery(useGetImageMixOptions("eatdo"));
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Suspense fallback="Loading Middleman...">
        <ClientOnly>
          <ImageCluster image_mix_name={"eatdo"} />
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
              Although there is no food service currently available on the
              premises, around Bijagual you can find several nearby restaurants with a warm and
              attentive atmosphere. When it comes to activities, the town of
              Bijagual offers two different hiking trails to the waterfall, as
              well as a waterhole suitable for swimming. Also, when ocean
              conditions allow, Jacó beach offers great surfing lessons for all
              levels.
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
        <CardHabitat />
      </div>
    </div>
  );
}
