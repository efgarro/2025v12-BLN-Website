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
  id: "33affaf11fd21dc6db02d9eb7c684327d5201328a65d681393c21af5ccd2a2ac",
  name: "getMdfile",
  filename: "src/routes/_rooms.sunrise.tsx"
}, (opts) => getMdfile.__executeServer(opts));
const getMdfile = createServerFn().handler(getMdfile_createServerFn_handler, async () => {
  const response = await axios.get("https://r2storage.bijalapa.com/prose/rooms-sunrise-1.md");
  return response.data;
});
export {
  getMdfile_createServerFn_handler
};
