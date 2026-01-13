import { j as jsxRuntimeExports, r as reactExports, C as ClientOnly } from "./worker-entry-Bo-hniRQ.js";
import { I as ImageCluster } from "./ImageCluster-Ba8Gk8C8.js";
import { b as Route } from "./router-DQbY8BHo.js";
import { M as Markdown, r as remarkGfm } from "./index-nq1Y46h5.js";
import { r as rehypeRaw } from "./index-thV5bKLF.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
import "./apiFns-DLX3UpCN.js";
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
function RouteComponent() {
  const data = Route.useLoaderData();
  console.log(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core_wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "article_wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "prose prose-lg prose-pre:bg-amber-900", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { rehypePlugins: [rehypeRaw], remarkPlugins: [remarkGfm], children: data }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: "Loading Middleman...", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClientOnly, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageCluster, { image_mix_name: "home" }) }) })
  ] }) }) }) });
}
export {
  RouteComponent as component
};
