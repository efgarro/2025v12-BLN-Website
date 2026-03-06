import { p as jsxRuntimeExports } from "./worker-entry-o1n2AQkn.js";
import { R as Route } from "./router-CMSoW5Y8.js";
import { M as Markdown, r as remarkGfm, a as rehypeRaw } from "./index-763YZEUO.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
import "./index-CazyvIUG.js";
import "util";
import "stream";
import "path";
import "http";
import "https";
import "url";
import "crypto";
import "http2";
import "assert";
import "zlib";
import "events";
function RouteComponent() {
  const data = Route.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "article_wrapper mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-lg prose-pre:bg-amber-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { rehypePlugins: [rehypeRaw], remarkPlugins: [remarkGfm], children: data }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen" })
  ] });
}
export {
  RouteComponent as component
};
