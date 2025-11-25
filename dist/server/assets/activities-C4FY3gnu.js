import { j as jsxRuntimeExports, O as Outlet } from "./worker-entry-3e4I1JDA.js";
import { u as useNavSettings } from "./router-Mm-DgQcJ.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
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
const MenuBarGrounds = () => {
  const { navSettingsStore, dispatchNavSettingsStore } = useNavSettings();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core_flexRow justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "menu menu-vertical gap-1 lg:menu-horizontal md:px-1 md:gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1 justify-center bg-[#FFF440]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "flex h-13 w-40 justify-center font-semibold text-[#3A3E40]", href: "/grounds/yard", children: "Local Restaurants" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1 justify-center bg-[#F000D0]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        className: "flex h-13 w-40 justify-center font-semibold text-white",
        href: "/grounds/ranch",
        children: "Hiking"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1 justify-center bg-[#A8E200]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "flex h-13 w-40 justify-center font-semibold text-[#3A3E40]", href: "/grounds/ranch", children: "Hike to La Poza" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1 justify-center bg-[#4C76B7]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        className: "flex h-13 w-40 justify-center text-center font-semibold text-white",
        href: "/grounds/ranch",
        children: "Hike to Bijagual Waterfall"
      }
    ) })
  ] }) });
};
function RouteComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "core_wrapper", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MenuBarGrounds, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] });
}
export {
  RouteComponent as component
};
