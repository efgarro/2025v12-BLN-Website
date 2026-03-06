import { c as createServerRpc } from "./createServerRpc-D7QAqryr.js";
import { a as axios } from "./index-CazyvIUG.js";
import { z as createServerFn } from "./worker-entry-o1n2AQkn.js";
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
  id: "0c0bdb610a4ecdbce296b8288e27bbb1415b2f98c0a591fda53994d95c78ba2e",
  name: "getMdfile",
  filename: "src/routes/_eatdo.hiking.tsx"
}, (opts) => getMdfile.__executeServer(opts));
const getMdfile = createServerFn().handler(getMdfile_createServerFn_handler, async () => {
  const response = await axios.get("https://r2storage.bijalapa.com/prose/hiking-1.md");
  return response.data;
});
export {
  getMdfile_createServerFn_handler
};
