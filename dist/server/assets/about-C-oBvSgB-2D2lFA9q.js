import { h as createServerRpc, i as createServerFn, k as Cu, l as createFileRoute, j as ke } from "./ssr-D243SbGa.js";
import { B as BasicLayout, M as Markdown, r as remarkGfm } from "./01-Basic-qtdMQvVv-afeXvf3-.js";
import "./worker-entry-BMtBY4SI.js";
import "node:timers";
import "node:buffer";
import "node:stream";
import "node:path";
import "node:url";
import "node:assert";
import "node:zlib";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "cloudflare:workers";
import "node:net";
import "node:util";
import "node:crypto";
const c = createServerRpc("src_routes_about_tsx--getMdfile_createServerFn_handler", "/_serverFn", (e, r) => m.__executeServer(e, r)), m = createServerFn().handler(c, async () => (await Cu.get("https://raw.githubusercontent.com/efgarro/2024v10-SCR-CMApp/refs/heads/main/README.md")).data), l = createFileRoute("/about")({ component: function() {
  const e = l.useLoaderData();
  return console.log(e), ke.jsxs(ke.Fragment, { children: [ke.jsx("div", { className: "font-serif", children: 'Hello "/about"!' }), ke.jsxs("div", { className: "core_wrapper", children: [ke.jsxs("div", { className: "flex gap-4", children: [ke.jsx("button", { className: "btn btn-neutral", children: "Neutral" }), ke.jsx("button", { className: "btn btn-primary", children: "Primary" }), ke.jsx("button", { className: "btn btn-secondary", children: "Secondary" }), ke.jsx("button", { className: "btn btn-accent", children: "Accent" }), ke.jsx("button", { className: "btn btn-info", children: "Info" }), ke.jsx("button", { className: "btn btn-success", children: "Success" }), ke.jsx("button", { className: "btn btn-warning", children: "Warning" }), ke.jsx("button", { className: "btn btn-error", children: "Error" })] }), ke.jsx("textarea", { className: "textarea my-3", placeholder: "Bio" }), ke.jsx(BasicLayout, {}), ke.jsx("div", { className: "prose prose-lg prose-pre:bg-amber-900", children: ke.jsx(Markdown, { remarkPlugins: [remarkGfm], children: e }) })] })] });
}, loader: async () => await m() });
export {
  c as getMdfile_createServerFn_handler
};
