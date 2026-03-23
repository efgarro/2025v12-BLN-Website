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
  id: "d178f02cd22b94599bf4c28970271b77f157da7d3496046b806bea80ca0e4174",
  name: "getMdfile",
  filename: "src/routes/_eatdo.restaurants.tsx"
}, (opts) => getMdfile.__executeServer(opts));
const getMdfile = createServerFn().handler(getMdfile_createServerFn_handler, async () => {
  const response = await axios.get("https://r2storage.bijalapa.com/prose/restaurants-1.md");
  return response.data;
});
export {
  getMdfile_createServerFn_handler
};
