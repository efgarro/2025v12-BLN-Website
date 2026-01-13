import { j as jsxRuntimeExports, r as reactExports, C as ClientOnly, O as Outlet } from "./worker-entry-Bo-hniRQ.js";
import { M as MenuBarViewRooms } from "./MenuBarRooms-h9QfJVhH.js";
import { I as ImageCluster } from "./ImageCluster-Ba8Gk8C8.js";
import { R as Route } from "./router-DQbY8BHo.js";
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
  Rooms as component
};
