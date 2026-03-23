import { p as jsxRuntimeExports, c as reactExports, G as ClientOnly } from "./worker-entry-5NGvoT4L.js";
import { C as CardGrounds } from "./CardGrounds-DD_e9e_L.js";
import { C as CardHabitat } from "./CardHabitat-DnfxcMHN.js";
import { C as CardRooms } from "./CardRooms-DjUPegUG.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
function RouteComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: "Loading Middleman...", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClientOnly, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "article_wrapper mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card bg-base-100 w-auto shadow-sm rounded-none mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("figure", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://r2storage.bijalapa.com/logos/2024_BIJALAPA_LOGO_750x500.png", alt: "Logo" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body bg-bln-azul-arena", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "prose lg:prose-lg", children: "Although there is no food service currently available on the premises, around Bijagual you can find several nearby restaurants with a warm and attentive atmosphere. When it comes to activities, the town of Bijagual offers two different hiking trails to the waterfall, as well as a waterhole suitable for swimming. Also, when ocean conditions allow, Jacó beach offers great surfing lessons for all levels." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-4xl bln-rojo", children: "ᴥ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-4xl bln-verde", children: "ᴥ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-4xl bln-amarillo", children: "ᴥ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-4xl mb-14 bln-lila", children: "ᴥ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-lg mb-8 bg-bln-verde-arena p-2", children: "Back to" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardRooms, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardGrounds, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHabitat, {})
    ] })
  ] });
}
export {
  RouteComponent as component
};
