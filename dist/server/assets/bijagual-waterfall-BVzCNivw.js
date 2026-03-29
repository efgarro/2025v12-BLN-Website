import { c as createServerRpc } from "./createServerRpc-E0Xzz3eZ.js";
import { a as axios } from "./index-DlcYHSTJ.js";
import { B as createServerFn } from "./worker-entry-CuD1FDx6.js";
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
  id: "6569faef6d1d83c1050cd821083a57132905cd1a56eaaedebafb618e78aca9d2",
  name: "getMarkdownfile",
  filename: "src/routes/baqueano/bijagual-waterfall.tsx"
}, (opts) => getMarkdownfile.__executeServer(opts));
const getMarkdownfile = createServerFn().handler(getMarkdownfile_createServerFn_handler, async () => {
  const response = await axios.get("https://r2storage.bijalapa.com/prose/baqueano/bijagual-waterfall.md");
  return response.data;
});
export {
  getMarkdownfile_createServerFn_handler
};
