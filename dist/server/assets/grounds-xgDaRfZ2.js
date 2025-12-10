import { j as jsxRuntimeExports, O as Outlet } from "./worker-entry-Qw_DylN4.js";
import { u as useNavSettings } from "./router-DN_eVU6l.js";
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
const MenuBarGrounds = () => {
  const { navSettingsStore, dispatchNavSettingsStore } = useNavSettings();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core_flexRow justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "menu menu-vertical gap-1 md:menu-horizontal md:px-1 md:gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1 bg-[#FFF440]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "flex h-13 w-36 justify-center font-semibold text-[#3A3E40]", href: "/grounds/yard", children: "The Yard" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1 bg-[#F000D0]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "flex h-13 w-36 justify-center font-semibold text-white", href: "/grounds/ranch", children: "Ranch Area" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1 bg-[#A8E200]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "flex h-13 w-36 justify-center font-semibold text-[#3A3E40]", href: "/grounds/organic", children: "Organic Practices" }) })
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
