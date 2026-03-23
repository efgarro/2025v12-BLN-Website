import { p as jsxRuntimeExports, c as reactExports, G as ClientOnly } from "./worker-entry-5NGvoT4L.js";
import { C as CardGrounds } from "./CardGrounds-DD_e9e_L.js";
import { C as CardHabitat } from "./CardHabitat-DnfxcMHN.js";
import { C as CardEatdo } from "./CardEatdo-DYIWIlzF.js";
import { C as CardRooms } from "./CardRooms-DjUPegUG.js";
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "core_wrapper", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: "Loading Middleman...", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClientOnly, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "article_wrapper mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card bg-base-100 w-auto shadow-sm rounded-none mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("figure", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "https://r2storage.bijalapa.com/logos/2024_BIJALAPA_LOGO_750x500.png", alt: "Logo" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-body bg-bln-azul-arena", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "prose lg:prose-lg", children: "Hidden away, and scarcely a five-minute drive from the center of town, BijaLapa Natural offers rooms with a view where the grounds and the scenery set the stage for peaceful contemplation. When weather conditions permit, the starry...starry nights are spectacular." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-4xl bln-rojo", children: "ᴥ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-4xl bln-verde", children: "ᴥ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-4xl bln-amarillo", children: "ᴥ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-4xl mb-14 bln-lila", children: "ᴥ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardRooms, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardGrounds, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHabitat, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardEatdo, {})
    ] })
  ] }) });
}
export {
  Home as component
};
