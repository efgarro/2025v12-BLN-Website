import { p as jsxRuntimeExports, c as reactExports, G as ClientOnly } from "./worker-entry-5NGvoT4L.js";
import { C as CardGrounds } from "./CardGrounds-DD_e9e_L.js";
import { C as CardHabitat } from "./CardHabitat-DnfxcMHN.js";
import { C as CardEatdo } from "./CardEatdo-DYIWIlzF.js";
import { d as Route } from "./router-D6hqw19b.js";
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
function Rooms() {
  Route.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: "Loading Middleman...", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClientOnly, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "article_wrapper mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card bg-base-100 w-auto shadow-sm rounded-none mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("figure", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://r2storage.bijalapa.com/logos/2024_BIJALAPA_LOGO_750x500.png", alt: "Logo" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body bg-bln-azul-arena", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "prose lg:prose-lg", children: "Just to the side of the high grounds at BijaLapa Natural, a two-room, rural-style place looks out over an expansive undulating mountain range. On a clear, calm and breezy day the deep blue sky contrasts with the colors of the mountains, which transition from forest green to greyish blue. While sitting on the rustic porch, nothing beats peaceful contemplation with cup of coffee in hand." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-4xl bln-rojo", children: "ᴥ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-4xl bln-verde", children: "ᴥ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-4xl bln-amarillo", children: "ᴥ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-4xl mb-14 bln-lila", children: "ᴥ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-lg mb-8 bg-bln-verde-arena p-2", children: "Back to" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardGrounds, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHabitat, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardEatdo, {})
    ] })
  ] });
}
export {
  Rooms as component
};
