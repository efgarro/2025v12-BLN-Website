import { d as createServerRpc, c as createServerFn, j as jsxRuntimeExports } from "./worker-entry-CNtAIndy.js";
import { d as axios, c as createFileRoute } from "./index-rLUVFJqL.js";
import { M as Markdown, r as remarkGfm } from "./index-Cxcmnmw_.js";
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
  const response = await axios.get("https://raw.githubusercontent.com/efgarro/2024v10-SCR-CMApp/refs/heads/main/README.md");
  return response.data;
});
const Route = createFileRoute("/about")({
  component: RouteComponent,
  loader: async () => await getMdfile()
});
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-lg prose-pre:bg-amber-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { remarkPlugins: [remarkGfm], children: data }) })
    ] })
  ] });
}
export {
  getMdfile_createServerFn_handler
};
