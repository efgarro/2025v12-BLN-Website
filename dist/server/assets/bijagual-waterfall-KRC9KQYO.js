import { p as jsxRuntimeExports } from "./worker-entry-5NGvoT4L.js";
import { b as Route } from "./router-D6hqw19b.js";
import { M as Markdown, r as remarkGfm, a as rehypeRaw } from "./index-3XPvuq7g.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
import "./index-Dm0glo5v.js";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "article_wrapper mt-8 mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-lg prose-pre:bg-amber-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { rehypePlugins: [rehypeRaw], remarkPlugins: [remarkGfm], children: data }) }) }) });
}
export {
  RouteComponent as component
};
