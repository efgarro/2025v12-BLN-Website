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
const getMdfile_createServerFn_handler = createServerRpc({
  id: "b6e3810fa3a2a42449eb15bea1686210f70ac3c40c2d7874cfc614e0234754e3",
  name: "getMdfile",
  filename: "src/routes/inquire.tsx"
}, (opts) => getMdfile.__executeServer(opts));
const getMdfile = createServerFn().handler(getMdfile_createServerFn_handler, async () => {
  const response = await axios.get("https://r2storage.bijalapa.com/prose/inquire.md");
  return response.data;
});
export {
  getMdfile_createServerFn_handler
};
