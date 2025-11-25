import { j as jsxRuntimeExports } from "./worker-entry-3e4I1JDA.js";
import { B as BasicLayout, M as Markdown, r as remarkGfm } from "./01-Basic-CVMcD0KN.js";
import { R as Route } from "./router-Mm-DgQcJ.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
import "./index-B2VwB5g2.js";
import "./index-8RRKODQW.js";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif", children: 'Hello "/about"!' }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "core_wrapper", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-neutral", children: "Neutral" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary", children: "Primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-secondary", children: "Secondary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-accent", children: "Accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-info", children: "Info" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-success", children: "Success" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-warning", children: "Warning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-error", children: "Error" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { className: "textarea my-3", placeholder: "Bio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BasicLayout, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-lg prose-pre:bg-amber-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { remarkPlugins: [remarkGfm], children: data }) })
    ] })
  ] });
}
export {
  RouteComponent as component
};
