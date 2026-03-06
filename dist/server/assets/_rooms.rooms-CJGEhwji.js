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
  id: "37ea454f599b2225fcc212ea4d48d83936f9a7b3e44a97e9f4b62d6dcbcec8d8",
  name: "getMdfile",
  filename: "src/routes/_rooms.rooms.tsx"
}, (opts) => getMdfile.__executeServer(opts));
const getMdfile = createServerFn().handler(getMdfile_createServerFn_handler, async () => {
  const response = await axios.get("https://r2storage.bijalapa.com/prose/rooms-1.md");
  return response.data;
});
export {
  getMdfile_createServerFn_handler
};
