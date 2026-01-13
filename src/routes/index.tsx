import {
  ClientOnly,
  createFileRoute,
  RouterProvider,
} from "@tanstack/react-router";

import styles from "../css/footer.module.css";
import { FetchPics } from "~/components/FetchPics";
import { Suspense } from "react";
import { useScreenWidth } from "~/hooks/useScreenWidth";
import { getRouter } from "~/router";
import { useGetImageMixOptions } from "~/apiFns/apiFns";
import { ImageCluster } from "~/components/ImageCluster";

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
        {/* <Suspense fallback={<p>Loading ...</p>}> */}
        <Suspense fallback="Loading Middleman...">
          <ClientOnly>
            <ImageCluster image_mix_name={"home"} />
          </ClientOnly>
        </Suspense>
        {/* <ClientOnly>
          <FetchPics searchTerm={"costa rica"} />
        </ClientOnly> */}
        {/* </Suspense> */}
        {/* <div className="core_wrapper">
        <p className="bg-red-500 text-white p-4">Hellow</p>
        <h2>BijaLapa</h2>
      </div> */}
      </div>
      <footer className={`${styles.footer_box}`}>Footer</footer>
    </>
  );
}
