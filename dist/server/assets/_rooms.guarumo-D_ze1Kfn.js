import { c as createServerRpc } from "./createServerRpc-Pn5oogK-.js";
import { a as axios } from "./index-Bt-ffQcF.js";
import { z as createServerFn } from "./worker-entry-DOKHgtWa.js";
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
  id: "ae6ffbfaedff658dd01242b63c84172833421a14efa157bd81de5a5e7aaee7e7",
  name: "getMdfile",
  filename: "src/routes/_rooms.guarumo.tsx"
}, (opts) => getMdfile.__executeServer(opts));
const getMdfile = createServerFn().handler(getMdfile_createServerFn_handler, async () => {
  const response = await axios.get("https://r2storage.bijalapa.com/prose/rooms-guarumo-1.md");
  return response.data;
});
export {
  getMdfile_createServerFn_handler
};
