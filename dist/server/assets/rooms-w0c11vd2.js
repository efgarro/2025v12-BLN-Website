import { j as jsxRuntimeExports, r as reactExports, C as ClientOnly, O as Outlet } from "./worker-entry-CNtAIndy.js";
import { I as ImageCluster } from "./ImageCluster-CynK9CTz.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
import "./useScreenWidth-CLb3Fo_b.js";
import "./router-DQ0CsUOz.js";
import "./index-rLUVFJqL.js";
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
const MenuBarViewRooms = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "core_flexRow justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "menu menu-vertical gap-1 md:menu-horizontal md:px-1 md:gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1 bg-[#A8E200]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "a",
      {
        className: "flex h-13 w-36 justify-center font-semibold text-[#3A3E40]",
        href: "/rooms/guarumo",
        children: "Guarumo Room"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex-1 bg-[#ff9c46]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "flex h-13 w-36 justify-center font-semibold text-[#3A3E40]", href: "/rooms/sunrise", children: "Sunrise Room" }) })
  ] }) });
};
function Rooms() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "core_wrapper", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MenuBarViewRooms, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: "Loading Middleman...", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClientOnly, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ImageCluster, { image_cluster_id: "019a939c-e590-779a-aaa6-66085d69ccae" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] });
}
export {
  Rooms as component
};
