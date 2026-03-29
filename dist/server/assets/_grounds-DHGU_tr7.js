import { n as jsxRuntimeExports, O as Outlet } from "./worker-entry-CuD1FDx6.js";
import { u as useNavSettings } from "./router-w7Vgpazk.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
import "./index-DlcYHSTJ.js";
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
const MenuBarGrounds = () => {
  const { navSettingsStore, dispatchNavSettingsStore } = useNavSettings();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core_flexRow justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "menu menu-vertical gap-1 md:menu-horizontal md:px-1 md:gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1 bg-[#FFF440]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "flex h-13 w-36 justify-center font-semibold text-[#3A3E40]", href: "/yard", children: "The Yard" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1 bg-[#F000D0]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "flex h-13 w-36 justify-center font-semibold text-white", href: "/ranch", children: "Ranch Area" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1 bg-[#A8E200]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "flex h-13 w-36 justify-center font-semibold text-[#3A3E40]", href: "/organic", children: "Organic Practices" }) })
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
