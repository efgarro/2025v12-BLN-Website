import { d as createServerRpc, c as createServerFn, j as jsxRuntimeExports, C as ClientOnly } from "./worker-entry-Bo-hniRQ.js";
import { w as axios, c as createFileRoute, v as useGetImageMixOptions } from "./apiFns-DLX3UpCN.js";
import { I as ImageCluster } from "./ImageCluster-Ba8Gk8C8.js";
import { M as Markdown, r as remarkGfm } from "./index-nq1Y46h5.js";
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
const getMdfile_createServerFn_handler = createServerRpc("1014966f501a2775893408baaaf5de5086c60493fda381cf9a41afc9381fb330", (opts, signal) => {
  return getMdfile.__executeServer(opts, signal);
});
const getMdfile = createServerFn().handler(getMdfile_createServerFn_handler, async () => {
  const response = await axios.get("https://r2storage.bijalapa.com/prose/wildlife-1.md");
  return response.data;
});
const Route = createFileRoute("/about")({
  component: RouteComponent,
  loader: async ({
    context
  }) => {
    context.queryClient.prefetchQuery(useGetImageMixOptions("home"));
    return await getMdfile();
  }
});
function RouteComponent() {
  const data = Route.useLoaderData();
  console.log(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core_wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "article_wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-lg prose-pre:bg-amber-900", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { remarkPlugins: [remarkGfm], children: data }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ClientOnly, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageCluster, { image_mix_name: "home" }) })
  ] }) }) }) });
}
export {
  getMdfile_createServerFn_handler
};
