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
  id: "354e8ffcddee766eda7d111c23a0c3df2eca5329a0dd9e5e9a06ba7244bf70cc",
  name: "getMarkdownfile",
  filename: "src/routes/baqueano/index.tsx"
}, (opts) => getMarkdownfile.__executeServer(opts));
const getMarkdownfile = createServerFn().handler(getMarkdownfile_createServerFn_handler, async () => {
  const response = await axios.get("https://r2storage.bijalapa.com/prose/baqueano/baqueano-guide-index.md");
  return response.data;
});
export {
  getMarkdownfile_createServerFn_handler
};
