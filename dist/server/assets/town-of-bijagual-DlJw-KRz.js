import { c as createServerRpc } from "./createServerRpc-BYYXCyIA.js";
import { a as axios } from "./index-3bgYrsNh.js";
import { B as createServerFn } from "./worker-entry-D3zVgP0m.js";
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
import "node:events";
import "node:stream";
import "node:async_hooks";
import "node:stream/web";
const getMarkdownfile_createServerFn_handler = createServerRpc({
  id: "0756239de214fdfffcc90a2553c68bd9a74bf21aae838ee066bc423d5a5cf5eb",
  name: "getMarkdownfile",
  filename: "src/routes/baqueano/town-of-bijagual.tsx"
}, (opts) => getMarkdownfile.__executeServer(opts));
const getMarkdownfile = createServerFn().handler(getMarkdownfile_createServerFn_handler, async () => {
  const response = await axios.get("https://r2storage.bijalapa.com/prose/baqueano/bijagual-waterfall.md");
  return response.data;
});
const SLIDE_COUNT = 5;
Array.from(Array(SLIDE_COUNT).keys());
export {
  getMarkdownfile_createServerFn_handler
};
