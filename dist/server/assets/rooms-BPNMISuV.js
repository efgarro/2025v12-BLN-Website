import { d as createServerRpc, c as createServerFn, j as jsxRuntimeExports, r as reactExports, C as ClientOnly, O as Outlet } from "./worker-entry-Bo-hniRQ.js";
import { w as axios, c as createFileRoute, v as useGetImageMixOptions } from "./apiFns-DLX3UpCN.js";
import { M as MenuBarViewRooms } from "./MenuBarRooms-h9QfJVhH.js";
import { I as ImageCluster } from "./ImageCluster-Ba8Gk8C8.js";
import { M as Markdown, r as remarkGfm } from "./index-nq1Y46h5.js";
import { r as rehypeRaw } from "./index-thV5bKLF.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
import "util";
import "stream";
import "path";
import "http";
import "https";
import "url";
import "crypto";
import "assert";
import "zlib";
import "events";
const getMdfile_createServerFn_handler = createServerRpc("eb92070e90c7639f7c49f63da9a2c375371e7065a8d39d268b3d83c4d9c03c84", (opts, signal) => {
  return getMdfile.__executeServer(opts, signal);
});
const getMdfile = createServerFn().handler(getMdfile_createServerFn_handler, async () => {
  const response = await axios.get("https://r2storage.bijalapa.com/prose/rooms-1.md");
  return response.data;
});
const Route = createFileRoute("/rooms")({
  loader: async ({
    context
  }) => {
    context.queryClient.prefetchQuery(useGetImageMixOptions("home"));
    return await getMdfile();
  },
  component: Rooms
});
function Rooms() {
  const data = Route.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "core_wrapper", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MenuBarViewRooms, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: "Loading Middleman...", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClientOnly, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageCluster, { image_mix_name: "home" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "article_wrapper mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-lg prose-pre:bg-amber-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { rehypePlugins: [rehypeRaw], remarkPlugins: [remarkGfm], children: data }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] });
}
export {
  getMdfile_createServerFn_handler
};
