import { h as createServerRpc, i as createServerFn, k as Cu, l as createFileRoute, j as ke } from "./ssr-D243SbGa.js";
import { o } from "./footer.module-cqFoTc87-8Oaen6-e.js";
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
const a = createServerRpc("src_routes_index_tsx--getTodo_createServerFn_handler", "/_serverFn", (e, r) => d.__executeServer(e, r)), d = createServerFn({ method: "GET" }).handler(a, async () => (await Cu("https://jsonplaceholder.typicode.com/todos/11")).data), i = createServerRpc("src_routes_index_tsx--getServerTime_createServerFn_handler", "/_serverFn", (e, r) => c.__executeServer(e, r)), m = createServerRpc("src_routes_index_tsx--getServerData_createServerFn_handler", "/_serverFn", (e, r) => l.__executeServer(e, r)), c = createServerFn({ method: "GET" }).handler(i, async () => (/* @__PURE__ */ new Date()).toISOString()), l = createServerFn({ method: "GET" }).handler(m, async () => ({ message: "Hello, World!" })), p = createFileRoute("/")({ component: function() {
  const e = p.useLoaderData();
  return console.log(e), ke.jsxs(ke.Fragment, { children: [ke.jsxs("p", { className: "bg-red-500 text-white p-4", children: ["Hellow ", e.title] }), ke.jsx("h2", { children: "BijaLapa" }), ke.jsx("footer", { className: `${o.footer_box}`, children: "Footer" })] });
}, loader: async () => await d() });
export {
  m as getServerData_createServerFn_handler,
  i as getServerTime_createServerFn_handler,
  a as getTodo_createServerFn_handler
};
