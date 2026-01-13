import { j as jsxRuntimeExports, O as Outlet } from "./worker-entry-Bo-hniRQ.js";
import { u as useNavSettings } from "./router-DQbY8BHo.js";
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
const MenuBarGrounds = () => {
  const { navSettingsStore, dispatchNavSettingsStore } = useNavSettings();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core_flexRow justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "menu menu-vertical gap-1 lg:menu-horizontal md:px-1 md:gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1 justify-center bg-[#FFF440]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "flex h-13 w-40 justify-center font-semibold text-[#3A3E40]", href: "/activities/restaurants", children: "Restaurants" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1 justify-center bg-[#F000D0] ", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        className: "flex h-13 w-40 justify-center font-semibold text-white",
        href: "/activities/hiking",
        children: "Hiking"
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
