import { j as jsxRuntimeExports, O as Outlet } from "./worker-entry-C05JoE1H.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
const MenuBarGrounds = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core_flexRow justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "menu menu-vertical md:menu-horizontal px-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "flex w-36 justify-center", href: "/grounds/yard", children: "The Yard" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "flex w-36 justify-center", href: "/grounds/ranch", children: "Ranch Area" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "flex w-36 justify-center", children: "Meet Organic" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "flex w-36 justify-center", children: "Rural Work" }) })
  ] }) });
};
function Grounds() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "core_wrapper", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MenuBarGrounds, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] });
}
export {
  Grounds as component
};
