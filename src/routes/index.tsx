import { createFileRoute } from "@tanstack/react-router";

import styles from "../css/footer.module.css";
import { FetchPics } from "~/components/FetchPics";
import { Suspense } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  //   loader: async () => await getTodo(),
});

function Home() {
  return (
    <>
      {/* <Suspense fallback={<p>Loading ...</p>}> */}
      <FetchPics searchTerm={"costa rica"} />
      {/* </Suspense> */}
      {/* <div className="core_wrapper">
        <p className="bg-red-500 text-white p-4">Hellow</p>
        <h2>BijaLapa</h2>
      </div> */}
      <footer className={`${styles.footer_box}`}>Footer</footer>
    </>
  );
}
