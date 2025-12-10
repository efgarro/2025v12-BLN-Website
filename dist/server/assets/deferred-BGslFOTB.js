import { r as reactExports, j as jsxRuntimeExports } from "./worker-entry-Qw_DylN4.js";
import { a as useGetDeferred } from "./router-DN_eVU6l.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
import "./index-nP77k5R0.js";
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
function Deferred() {
  const [count, setCount] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: "Loading Middleman...", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeferredQuery, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      "Count: ",
      count
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCount(count + 1), children: "Increment" }) })
  ] });
}
function DeferredQuery() {
  const {
    data
  } = useGetDeferred();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Deferred Query" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      "Status: ",
      data.status
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      "Message: ",
      data.message
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      "Time: ",
      data.time.toISOString()
    ] })
  ] });
}
export {
  Deferred as component
};
