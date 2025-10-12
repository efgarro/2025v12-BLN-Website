import { S as S$1, l as lr$1, a as as$1, A as Agent, n as notImplemented, b as notImplementedClass, c as notImplementedAsync, D as Dn$1, d as nn$1, q as qn$1, i as is$1, o as on$1 } from "./worker-entry-BMtBY4SI.js";
import { setImmediate } from "node:timers";
import { Buffer } from "node:buffer";
import * as b from "node:stream";
import b__default, { Readable, PassThrough } from "node:stream";
import * as R from "node:path";
import * as P from "node:url";
import P__default from "node:url";
import * as E from "node:assert";
import $ from "node:zlib";
import { EventEmitter } from "node:events";
import { AsyncLocalStorage as AsyncLocalStorage$1 } from "node:async_hooks";
import { ReadableStream as ReadableStream$1 } from "node:stream/web";
import "cloudflare:workers";
import "node:net";
import "node:util";
import "node:crypto";
function invariant(e, n) {
  if (!e) throw new Error("Invariant failed");
}
var I = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
function getDefaultExportFromCjs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function getDefaultExportFromNamespaceIfNotNamed(e) {
  return e && Object.prototype.hasOwnProperty.call(e, "default") && 1 === Object.keys(e).length ? e.default : e;
}
const N = getDefaultExportFromCjs(function(e, n) {
}), D = /* @__PURE__ */ new WeakMap(), B = /* @__PURE__ */ new WeakMap(), q = { current: [] };
let H = false, V = 0;
const W = /* @__PURE__ */ new Set(), G = /* @__PURE__ */ new Map();
function __flush_internals(e) {
  const n = Array.from(e).sort((e2, n2) => e2 instanceof Derived && e2.options.deps.includes(n2) ? 1 : n2 instanceof Derived && n2.options.deps.includes(e2) ? -1 : 0);
  for (const e2 of n) {
    if (q.current.includes(e2)) continue;
    q.current.push(e2), e2.recompute();
    const n2 = B.get(e2);
    if (n2) for (const e3 of n2) {
      const n3 = D.get(e3);
      n3 && __flush_internals(n3);
    }
  }
}
function __notifyListeners(e) {
  e.listeners.forEach((n) => n({ prevVal: e.prevState, currentVal: e.state }));
}
function __notifyDerivedListeners(e) {
  e.listeners.forEach((n) => n({ prevVal: e.prevState, currentVal: e.state }));
}
function __flush(e) {
  if (V > 0 && !G.has(e) && G.set(e, e.prevState), W.add(e), !(V > 0 || H)) try {
    for (H = true; W.size > 0; ) {
      const e2 = Array.from(W);
      W.clear();
      for (const n of e2) {
        const e3 = G.get(n) ?? n.prevState;
        n.prevState = e3, __notifyListeners(n);
      }
      for (const n of e2) {
        const e3 = D.get(n);
        e3 && (q.current.push(n), __flush_internals(e3));
      }
      for (const n of e2) {
        const e3 = D.get(n);
        if (e3) for (const n2 of e3) __notifyDerivedListeners(n2);
      }
    }
  } finally {
    H = false, q.current = [], G.clear();
  }
}
function batch(e) {
  V++;
  try {
    e();
  } finally {
    if (V--, 0 === V) {
      const e2 = Array.from(W)[0];
      e2 && __flush(e2);
    }
  }
}
class Store {
  constructor(e, n) {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = (e2) => {
      var n2, r;
      this.listeners.add(e2);
      const a = null == (r = null == (n2 = this.options) ? void 0 : n2.onSubscribe) ? void 0 : r.call(n2, e2, this);
      return () => {
        this.listeners.delete(e2), null == a || a();
      };
    }, this.prevState = e, this.state = e, this.options = n;
  }
  setState(e) {
    var n, r, a;
    this.prevState = this.state, (null == (n = this.options) ? void 0 : n.updateFn) ? this.state = this.options.updateFn(this.prevState)(e) : !/* @__PURE__ */ function(e2) {
      return "function" == typeof e2;
    }(e) ? this.state = e : this.state = e(this.prevState), null == (a = null == (r = this.options) ? void 0 : r.onUpdate) || a.call(r), __flush(this);
  }
}
class Derived {
  constructor(e) {
    this.listeners = /* @__PURE__ */ new Set(), this._subscriptions = [], this.lastSeenDepValues = [], this.getDepVals = () => {
      const e2 = [], n = [];
      for (const r of this.options.deps) e2.push(r.prevState), n.push(r.state);
      return this.lastSeenDepValues = n, { prevDepVals: e2, currDepVals: n, prevVal: this.prevState ?? void 0 };
    }, this.recompute = () => {
      var e2, n;
      this.prevState = this.state;
      const { prevDepVals: r, currDepVals: a, prevVal: o } = this.getDepVals();
      this.state = this.options.fn({ prevDepVals: r, currDepVals: a, prevVal: o }), null == (n = (e2 = this.options).onUpdate) || n.call(e2);
    }, this.checkIfRecalculationNeededDeeply = () => {
      for (const e3 of this.options.deps) e3 instanceof Derived && e3.checkIfRecalculationNeededDeeply();
      let e2 = false;
      const n = this.lastSeenDepValues, { currDepVals: r } = this.getDepVals();
      for (let a = 0; a < r.length; a++) if (r[a] !== n[a]) {
        e2 = true;
        break;
      }
      e2 && this.recompute();
    }, this.mount = () => (this.registerOnGraph(), this.checkIfRecalculationNeededDeeply(), () => {
      this.unregisterFromGraph();
      for (const e2 of this._subscriptions) e2();
    }), this.subscribe = (e2) => {
      var n, r;
      this.listeners.add(e2);
      const a = null == (r = (n = this.options).onSubscribe) ? void 0 : r.call(n, e2, this);
      return () => {
        this.listeners.delete(e2), null == a || a();
      };
    }, this.options = e, this.state = e.fn({ prevDepVals: void 0, prevVal: void 0, currDepVals: this.getDepVals().currDepVals });
  }
  registerOnGraph(e = this.options.deps) {
    for (const n of e) if (n instanceof Derived) n.registerOnGraph(), this.registerOnGraph(n.options.deps);
    else if (n instanceof Store) {
      let e2 = D.get(n);
      e2 || (e2 = /* @__PURE__ */ new Set(), D.set(n, e2)), e2.add(this);
      let r = B.get(this);
      r || (r = /* @__PURE__ */ new Set(), B.set(this, r)), r.add(n);
    }
  }
  unregisterFromGraph(e = this.options.deps) {
    for (const n of e) if (n instanceof Derived) this.unregisterFromGraph(n.options.deps);
    else if (n instanceof Store) {
      const e2 = D.get(n);
      e2 && e2.delete(this);
      const r = B.get(this);
      r && r.delete(n);
    }
  }
}
const Q = "__TSR_index", X = "popstate", Y = "beforeunload";
function createHistory(e) {
  let n = e.getLocation();
  const r = /* @__PURE__ */ new Set(), notify = (a) => {
    n = e.getLocation(), r.forEach((e2) => e2({ location: n, action: a }));
  }, handleIndexChange = (r2) => {
    e.notifyOnIndexChange ?? 1 ? notify(r2) : n = e.getLocation();
  }, tryNavigation = async ({ task: r2, navigateOpts: a, ...o }) => {
    var s, i;
    if ((null == a ? void 0 : a.ignoreBlocker) ?? false) return void r2();
    const c = (null == (s = e.getBlockers) ? void 0 : s.call(e)) ?? [], l = "PUSH" === o.type || "REPLACE" === o.type;
    if ("undefined" != typeof document && c.length && l) for (const r3 of c) {
      const a2 = parseHref(o.path, o.state);
      if (await r3.blockerFn({ currentLocation: n, nextLocation: a2, action: o.type })) return void (null == (i = e.onBlocked) || i.call(e));
    }
    r2();
  };
  return { get location() {
    return n;
  }, get length() {
    return e.getLength();
  }, subscribers: r, subscribe: (e2) => (r.add(e2), () => {
    r.delete(e2);
  }), push: (r2, a, o) => {
    const s = n.state[Q];
    a = assignKeyAndIndex(s + 1, a), tryNavigation({ task: () => {
      e.pushState(r2, a), notify({ type: "PUSH" });
    }, navigateOpts: o, type: "PUSH", path: r2, state: a });
  }, replace: (r2, a, o) => {
    const s = n.state[Q];
    a = assignKeyAndIndex(s, a), tryNavigation({ task: () => {
      e.replaceState(r2, a), notify({ type: "REPLACE" });
    }, navigateOpts: o, type: "REPLACE", path: r2, state: a });
  }, go: (n2, r2) => {
    tryNavigation({ task: () => {
      e.go(n2), handleIndexChange({ type: "GO", index: n2 });
    }, navigateOpts: r2, type: "GO" });
  }, back: (n2) => {
    tryNavigation({ task: () => {
      e.back((null == n2 ? void 0 : n2.ignoreBlocker) ?? false), handleIndexChange({ type: "BACK" });
    }, navigateOpts: n2, type: "BACK" });
  }, forward: (n2) => {
    tryNavigation({ task: () => {
      e.forward((null == n2 ? void 0 : n2.ignoreBlocker) ?? false), handleIndexChange({ type: "FORWARD" });
    }, navigateOpts: n2, type: "FORWARD" });
  }, canGoBack: () => 0 !== n.state[Q], createHref: (n2) => e.createHref(n2), block: (n2) => {
    var r2;
    if (!e.setBlockers) return () => {
    };
    const a = (null == (r2 = e.getBlockers) ? void 0 : r2.call(e)) ?? [];
    return e.setBlockers([...a, n2]), () => {
      var r3, a2;
      const o = (null == (r3 = e.getBlockers) ? void 0 : r3.call(e)) ?? [];
      null == (a2 = e.setBlockers) || a2.call(e, o.filter((e2) => e2 !== n2));
    };
  }, flush: () => {
    var n2;
    return null == (n2 = e.flush) ? void 0 : n2.call(e);
  }, destroy: () => {
    var n2;
    return null == (n2 = e.destroy) ? void 0 : n2.call(e);
  }, notify };
}
function assignKeyAndIndex(e, n) {
  n || (n = {});
  const r = createRandomKey();
  return { ...n, key: r, __TSR_key: r, [Q]: e };
}
function createMemoryHistory(e = { initialEntries: ["/"] }) {
  const n = e.initialEntries;
  let r = e.initialIndex ? Math.min(Math.max(e.initialIndex, 0), n.length - 1) : n.length - 1;
  const a = n.map((e2, n2) => assignKeyAndIndex(n2, void 0));
  return createHistory({ getLocation: () => parseHref(n[r], a[r]), getLength: () => n.length, pushState: (e2, o) => {
    r < n.length - 1 && (n.splice(r + 1), a.splice(r + 1)), a.push(o), n.push(e2), r = Math.max(n.length - 1, 0);
  }, replaceState: (e2, o) => {
    a[r] = o, n[r] = e2;
  }, back: () => {
    r = Math.max(r - 1, 0);
  }, forward: () => {
    r = Math.min(r + 1, n.length - 1);
  }, go: (e2) => {
    r = Math.min(Math.max(r + e2, 0), n.length - 1);
  }, createHref: (e2) => e2 });
}
function parseHref(e, n) {
  const r = e.indexOf("#"), a = e.indexOf("?"), o = createRandomKey();
  return { href: e, pathname: e.substring(0, r > 0 ? a > 0 ? Math.min(r, a) : r : a > 0 ? a : e.length), hash: r > -1 ? e.substring(r) : "", search: a > -1 ? e.slice(a, -1 === r ? void 0 : r) : "", state: n || { [Q]: 0, key: o, __TSR_key: o } };
}
function createRandomKey() {
  return (Math.random() + 1).toString(36).substring(7);
}
function last(e) {
  return e[e.length - 1];
}
function functionalUpdate$1(e, n) {
  return /* @__PURE__ */ function(e2) {
    return "function" == typeof e2;
  }(e) ? e(n) : e;
}
function pick(e, n) {
  return n.reduce((n2, r) => (n2[r] = e[r], n2), {});
}
function replaceEqualDeep$1(e, n) {
  if (e === n) return e;
  const r = n, a = isPlainArray$1(e) && isPlainArray$1(r);
  if (a || isSimplePlainObject(e) && isSimplePlainObject(r)) {
    const n2 = a ? e : Object.keys(e).concat(Object.getOwnPropertySymbols(e)), o = n2.length, s = a ? r : Object.keys(r).concat(Object.getOwnPropertySymbols(r)), i = s.length, c = a ? [] : {};
    let l = 0;
    for (let o2 = 0; o2 < i; o2++) {
      const i2 = a ? o2 : s[o2];
      (!a && n2.includes(i2) || a) && void 0 === e[i2] && void 0 === r[i2] ? (c[i2] = void 0, l++) : (c[i2] = replaceEqualDeep$1(e[i2], r[i2]), c[i2] === e[i2] && void 0 !== e[i2] && l++);
    }
    return o === i && l === o ? e : c;
  }
  return r;
}
function isSimplePlainObject(e) {
  return isPlainObject$2(e) && Object.getOwnPropertyNames(e).length === Object.keys(e).length;
}
function isPlainObject$2(e) {
  if (!hasObjectPrototype$1(e)) return false;
  const n = e.constructor;
  if (void 0 === n) return true;
  const r = n.prototype;
  return !!hasObjectPrototype$1(r) && !!r.hasOwnProperty("isPrototypeOf");
}
function hasObjectPrototype$1(e) {
  return "[object Object]" === Object.prototype.toString.call(e);
}
function isPlainArray$1(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function getObjectKeys(e, n) {
  let r = Object.keys(e);
  return n && (r = r.filter((n2) => void 0 !== e[n2])), r;
}
function deepEqual(e, n, r) {
  if (e === n) return true;
  if (typeof e != typeof n) return false;
  if (isPlainObject$2(e) && isPlainObject$2(n)) {
    const a = (null == r ? void 0 : r.ignoreUndefined) ?? true, o = getObjectKeys(e, a), s = getObjectKeys(n, a);
    return !(!(null == r ? void 0 : r.partial) && o.length !== s.length) && s.every((a2) => deepEqual(e[a2], n[a2], r));
  }
  return !(!Array.isArray(e) || !Array.isArray(n)) && (e.length === n.length && !e.some((e2, a) => !deepEqual(e2, n[a], r)));
}
function createControlledPromise(e) {
  let n, r;
  const a = new Promise((e2, a2) => {
    n = e2, r = a2;
  });
  return a.status = "pending", a.resolve = (r2) => {
    a.status = "resolved", a.value = r2, n(r2), null == e || e(r2);
  }, a.reject = (e2) => {
    a.status = "rejected", r(e2);
  }, a;
}
function joinPaths(e) {
  return cleanPath(e.filter((e2) => void 0 !== e2).join("/"));
}
function cleanPath(e) {
  return e.replace(/\/{2,}/g, "/");
}
function trimPathLeft(e) {
  return "/" === e ? e : e.replace(/^\/{1,}/, "");
}
function trimPathRight(e) {
  return "/" === e ? e : e.replace(/\/{1,}$/, "");
}
function trimPath(e) {
  return trimPathRight(trimPathLeft(e));
}
function removeTrailingSlash(e, n) {
  return (null == e ? void 0 : e.endsWith("/")) && "/" !== e && e !== `${n}/` ? e.slice(0, -1) : e;
}
function segmentToString(e) {
  const { type: n, value: r } = e;
  if (0 === n) return r;
  const { prefixSegment: a, suffixSegment: o } = e;
  if (1 === n) {
    const e2 = r.substring(1);
    if (a && o) return `${a}{$${e2}}${o}`;
    if (a) return `${a}{$${e2}}`;
    if (o) return `{$${e2}}${o}`;
  }
  if (3 === n) {
    const e2 = r.substring(1);
    return a && o ? `${a}{-$${e2}}${o}` : a ? `${a}{-$${e2}}` : o ? `{-$${e2}}${o}` : `{-$${e2}}`;
  }
  if (2 === n) {
    if (a && o) return `${a}{$}${o}`;
    if (a) return `${a}{$}`;
    if (o) return `{$}${o}`;
  }
  return r;
}
const parsePathname = (e, n) => {
  if (!e) return [];
  const r = null == n ? void 0 : n.get(e);
  if (r) return r;
  const a = function(e2) {
    e2 = cleanPath(e2);
    const n2 = [];
    "/" === e2.slice(0, 1) && (e2 = e2.substring(1), n2.push({ type: 0, value: "/" }));
    if (!e2) return n2;
    const r2 = e2.split("/").filter(Boolean);
    n2.push(...r2.map((e3) => {
      const n3 = e3.match(re);
      if (n3) {
        return { type: 2, value: "$", prefixSegment: n3[1] || void 0, suffixSegment: n3[2] || void 0 };
      }
      const r3 = e3.match(te);
      if (r3) {
        const e4 = r3[1];
        return { type: 3, value: r3[2], prefixSegment: e4 || void 0, suffixSegment: r3[3] || void 0 };
      }
      const a2 = e3.match(ee);
      if (a2) {
        const e4 = a2[1];
        return { type: 1, value: "" + a2[2], prefixSegment: e4 || void 0, suffixSegment: a2[3] || void 0 };
      }
      if (Z.test(e3)) {
        return { type: 1, value: "$" + e3.substring(1), prefixSegment: void 0, suffixSegment: void 0 };
      }
      return ne.test(e3) ? { type: 2, value: "$", prefixSegment: void 0, suffixSegment: void 0 } : { type: 0, value: e3.includes("%25") ? e3.split("%25").map((e4) => decodeURI(e4)).join("%25") : decodeURI(e3) };
    })), "/" === e2.slice(-1) && (e2 = e2.substring(1), n2.push({ type: 0, value: "/" }));
    return n2;
  }(e);
  return null == n || n.set(e, a), a;
}, Z = /^\$.{1,}$/, ee = /^(.*?)\{(\$[a-zA-Z_$][a-zA-Z0-9_$]*)\}(.*)$/, te = /^(.*?)\{-(\$[a-zA-Z_$][a-zA-Z0-9_$]*)\}(.*)$/, ne = /^\$$/, re = /^(.*?)\{\$\}(.*)$/;
function interpolatePath({ path: e, params: n, leaveWildcards: r, leaveParams: a, decodeCharMap: o, parseCache: s }) {
  const i = parsePathname(e, s);
  function encodeParam(e2) {
    const r2 = n[e2], a2 = "string" == typeof r2;
    return "*" === e2 || "_splat" === e2 ? a2 ? encodeURI(r2) : r2 : a2 ? function(e3, n2) {
      let r3 = encodeURIComponent(e3);
      if (n2) for (const [e4, a3] of n2) r3 = r3.replaceAll(e4, a3);
      return r3;
    }(r2, o) : r2;
  }
  let c = false;
  const l = {}, u = joinPaths(i.map((e2) => {
    if (0 === e2.type) return e2.value;
    if (2 === e2.type) {
      l._splat = n._splat;
      const a2 = e2.prefixSegment || "", o2 = e2.suffixSegment || "";
      if (!("_splat" in n)) return c = true, r ? `${a2}${e2.value}${o2}` : a2 || o2 ? `${a2}${o2}` : void 0;
      const s2 = encodeParam("_splat");
      return r ? `${a2}${e2.value}${s2 ?? ""}${o2}` : `${a2}${s2}${o2}`;
    }
    if (1 === e2.type) {
      const r2 = e2.value.substring(1);
      c || r2 in n || (c = true), l[r2] = n[r2];
      const o2 = e2.prefixSegment || "", s2 = e2.suffixSegment || "";
      if (a) {
        const n2 = encodeParam(e2.value);
        return `${o2}${e2.value}${n2 ?? ""}${s2}`;
      }
      return `${o2}${encodeParam(r2) ?? "undefined"}${s2}`;
    }
    if (3 === e2.type) {
      const o2 = e2.value.substring(1), s2 = e2.prefixSegment || "", i2 = e2.suffixSegment || "";
      if (!(o2 in n) || null == n[o2]) return r ? `${s2}${o2}${i2}` : s2 || i2 ? `${s2}${i2}` : void 0;
      if (l[o2] = n[o2], a) {
        const n2 = encodeParam(e2.value);
        return `${s2}${e2.value}${n2 ?? ""}${i2}`;
      }
      return r ? `${s2}${o2}${encodeParam(o2) ?? ""}${i2}` : `${s2}${encodeParam(o2) ?? ""}${i2}`;
    }
    return e2.value;
  }));
  return { usedParams: l, interpolatedPath: u, isMissingParams: c };
}
function matchPathname(e, n, r, a) {
  const o = function(e2, n2, { to: r2, fuzzy: a2, caseSensitive: o2 }, s) {
    if ("/" !== e2 && !n2.startsWith(e2)) return;
    n2 = removeBasepath(e2, n2, o2), r2 = removeBasepath(e2, `${r2 ?? "$"}`, o2);
    const i = parsePathname(n2.startsWith("/") ? n2 : `/${n2}`, s), c = parsePathname(r2.startsWith("/") ? r2 : `/${r2}`, s), l = {};
    return function(e3, n3, r3, a3, o3) {
      var s2, i2, c2;
      let l2 = 0, u = 0;
      for (; l2 < e3.length || u < n3.length; ) {
        const p = e3[l2], h = n3[u];
        if (h) {
          if (2 === h.type) {
            const n4 = e3.slice(l2);
            let a4;
            if (h.prefixSegment || h.suffixSegment) {
              if (!p) return false;
              const r4 = h.prefixSegment || "", o4 = h.suffixSegment || "", i3 = p.value;
              if ("prefixSegment" in h && !i3.startsWith(r4)) return false;
              if ("suffixSegment" in h && !(null == (s2 = e3[e3.length - 1]) ? void 0 : s2.value.endsWith(o4))) return false;
              let c3 = decodeURI(joinPaths(n4.map((e4) => e4.value)));
              r4 && c3.startsWith(r4) && (c3 = c3.slice(r4.length)), o4 && c3.endsWith(o4) && (c3 = c3.slice(0, c3.length - o4.length)), a4 = c3;
            } else a4 = decodeURI(joinPaths(n4.map((e4) => e4.value)));
            return r3["*"] = a4, r3._splat = a4, true;
          }
          if (0 === h.type) {
            if ("/" === h.value && !(null == p ? void 0 : p.value)) {
              u++;
              continue;
            }
            if (p) {
              if (o3) {
                if (h.value !== p.value) return false;
              } else if (h.value.toLowerCase() !== p.value.toLowerCase()) return false;
              l2++, u++;
              continue;
            }
            return false;
          }
          if (1 === h.type) {
            if (!p) return false;
            if ("/" === p.value) return false;
            let e4 = "", n4 = false;
            if (h.prefixSegment || h.suffixSegment) {
              const r4 = h.prefixSegment || "", a4 = h.suffixSegment || "", o4 = p.value;
              if (r4 && !o4.startsWith(r4)) return false;
              if (a4 && !o4.endsWith(a4)) return false;
              let s3 = o4;
              r4 && s3.startsWith(r4) && (s3 = s3.slice(r4.length)), a4 && s3.endsWith(a4) && (s3 = s3.slice(0, s3.length - a4.length)), e4 = decodeURIComponent(s3), n4 = true;
            } else e4 = decodeURIComponent(p.value), n4 = true;
            n4 && (r3[h.value.substring(1)] = e4, l2++), u++;
            continue;
          }
          if (3 === h.type) {
            if (!p) {
              u++;
              continue;
            }
            if ("/" === p.value) {
              u++;
              continue;
            }
            let a4 = "", o4 = false;
            if (h.prefixSegment || h.suffixSegment) {
              const e4 = h.prefixSegment || "", n4 = h.suffixSegment || "", r4 = p.value;
              if ((!e4 || r4.startsWith(e4)) && (!n4 || r4.endsWith(n4))) {
                let s3 = r4;
                e4 && s3.startsWith(e4) && (s3 = s3.slice(e4.length)), n4 && s3.endsWith(n4) && (s3 = s3.slice(0, s3.length - n4.length)), a4 = decodeURIComponent(s3), o4 = true;
              }
            } else {
              let r4 = true;
              for (let a5 = u + 1; a5 < n3.length; a5++) {
                const o5 = n3[a5];
                if (0 === (null == o5 ? void 0 : o5.type) && o5.value === p.value) {
                  r4 = false;
                  break;
                }
                if (1 === (null == o5 ? void 0 : o5.type) || 2 === (null == o5 ? void 0 : o5.type)) {
                  e3.length < n3.length && (r4 = false);
                  break;
                }
              }
              r4 && (a4 = decodeURIComponent(p.value), o4 = true);
            }
            o4 && (r3[h.value.substring(1)] = a4, l2++), u++;
            continue;
          }
        }
        if (l2 < e3.length && u >= n3.length) return r3["**"] = joinPaths(e3.slice(l2).map((e4) => e4.value)), !!a3 && "/" !== (null == (i2 = n3[n3.length - 1]) ? void 0 : i2.value);
        if (u < n3.length && l2 >= e3.length) {
          for (let e4 = u; e4 < n3.length; e4++) if (3 !== (null == (c2 = n3[e4]) ? void 0 : c2.type)) return false;
          break;
        }
        break;
      }
      return true;
    }(i, c, l, a2, o2) ? l : void 0;
  }(e, n, r, a);
  if (!r.to || o) return o ?? {};
}
function removeBasepath(e, n, r = false) {
  const a = r ? e : e.toLowerCase(), o = r ? n : n.toLowerCase();
  switch (true) {
    case "/" === a:
      return n;
    case o === a:
      return "";
    case n.length < e.length:
    case "/" !== o[a.length]:
      return n;
    case o.startsWith(a):
      return n.slice(e.length);
    default:
      return n;
  }
}
function isNotFound(e) {
  return !!(null == e ? void 0 : e.isNotFound);
}
const ae = "tsr-scroll-restoration-v1_3";
const oe = /* @__PURE__ */ function() {
  return;
}(), defaultGetScrollRestorationKey = (e) => e.state.__TSR_key || e.href;
let ie = false;
function restoreScroll({ storageKey: e, key: n, behavior: r, shouldScrollRestoration: a, scrollToTopSelectors: o, location: s }) {
  var i;
  let c;
  try {
    c = JSON.parse(sessionStorage.getItem(e) || "{}");
  } catch (e2) {
    return void console.error(e2);
  }
  const l = c[n || (null == (i = window.history.state) ? void 0 : i.key)];
  ie = true, (() => {
    if (a && l && Object.keys(l).length > 0) {
      for (const e3 in l) {
        const n2 = l[e3];
        if ("window" === e3) window.scrollTo({ top: n2.scrollY, left: n2.scrollX, behavior: r });
        else if (e3) {
          const r2 = document.querySelector(e3);
          r2 && (r2.scrollLeft = n2.scrollX, r2.scrollTop = n2.scrollY);
        }
      }
      return;
    }
    const e2 = (s ?? window.location).hash.split("#")[1];
    if (e2) {
      const n2 = (window.history.state || {}).__hashScrollIntoViewOptions ?? true;
      if (n2) {
        const r2 = document.getElementById(e2);
        r2 && r2.scrollIntoView(n2);
      }
      return;
    }
    ["window", ...(null == o ? void 0 : o.filter((e3) => "window" !== e3)) ?? []].forEach((e3) => {
      const n2 = "window" === e3 ? window : "function" == typeof e3 ? e3() : document.querySelector(e3);
      n2 && n2.scrollTo({ top: 0, left: 0, behavior: r });
    });
  })(), ie = false;
}
function setupScrollRestoration(e, n) {
  if (void 0 === oe) return;
  if ((e.options.scrollRestoration ?? false) && (e.isScrollRestoring = true), "undefined" == typeof document || e.isScrollRestorationSetup) return;
  e.isScrollRestorationSetup = true, ie = false;
  const r = e.options.getScrollRestorationKey || defaultGetScrollRestorationKey;
  window.history.scrollRestoration = "manual";
  const onScroll = (n2) => {
    if (ie || !e.isScrollRestoring) return;
    let a = "";
    if (n2.target === document || n2.target === window) a = "window";
    else {
      const e2 = n2.target.getAttribute("data-scroll-restoration-id");
      a = e2 ? `[data-scroll-restoration-id="${e2}"]` : function(e3) {
        const n3 = [];
        let r2;
        for (; r2 = e3.parentNode; ) n3.unshift(`${e3.tagName}:nth-child(${[].indexOf.call(r2.children, e3) + 1})`), e3 = r2;
        return `${n3.join(" > ")}`.toLowerCase();
      }(n2.target);
    }
    const o = r(e.state.location);
    oe.set((e2) => {
      const n3 = e2[o] = e2[o] || {}, r2 = n3[a] = n3[a] || {};
      if ("window" === a) r2.scrollX = window.scrollX || 0, r2.scrollY = window.scrollY || 0;
      else if (a) {
        const e3 = document.querySelector(a);
        e3 && (r2.scrollX = e3.scrollLeft || 0, r2.scrollY = e3.scrollTop || 0);
      }
      return e2;
    });
  };
  "undefined" != typeof document && document.addEventListener("scroll", /* @__PURE__ */ ((e2, n2) => {
    let r2;
    return (...a) => {
      r2 || (r2 = setTimeout(() => {
        e2(...a), r2 = null;
      }, n2));
    };
  })(onScroll, 100), true), e.subscribe("onRendered", (n2) => {
    const a = r(n2.toLocation);
    e.resetNextScroll ? (restoreScroll({ storageKey: ae, key: a, behavior: e.options.scrollRestorationBehavior, shouldScrollRestoration: e.isScrollRestoring, scrollToTopSelectors: e.options.scrollToTopSelectors, location: e.history.location }), e.isScrollRestoring && oe.set((e2) => (e2[a] = e2[a] || {}, e2))) : e.resetNextScroll = true;
  });
}
function toValue(e) {
  return e ? "false" !== e && ("true" === e || (0 * +e == 0 && +e + "" === e ? +e : e)) : "";
}
const ce = (le = JSON.parse, (e) => {
  "?" === e.substring(0, 1) && (e = e.substring(1));
  const n = [...new URLSearchParams(e).entries()].reduce((e2, [n2, r]) => {
    const a = e2[n2];
    return e2[n2] = null == a ? toValue(r) : Array.isArray(a) ? [...a, toValue(r)] : [a, toValue(r)], e2;
  }, {});
  for (const e2 in n) {
    const r = n[e2];
    if ("string" == typeof r) try {
      n[e2] = le(r);
    } catch (e3) {
    }
  }
  return n;
});
var le;
const ue = /* @__PURE__ */ function(e, n) {
  return (r) => {
    r = { ...r }, Object.keys(r).forEach((a2) => {
      const o = r[a2];
      void 0 === o || void 0 === o ? delete r[a2] : r[a2] = function(r2) {
        if ("object" == typeof r2 && null !== r2) try {
          return e(r2);
        } catch (e2) {
        }
        else if ("string" == typeof r2 && "function" == typeof n) try {
          return n(r2), e(r2);
        } catch (e2) {
        }
        return r2;
      }(o);
    });
    const a = function(e2) {
      const n2 = Object.entries(e2).flatMap(([e3, n3]) => Array.isArray(n3) ? n3.map((n4) => [e3, String(n4)]) : [[e3, String(n3)]]);
      return "" + new URLSearchParams(n2).toString();
    }(r).toString();
    return a ? `?${a}` : "";
  };
}(JSON.stringify, JSON.parse);
const pe = "__root__";
function isRedirect(e) {
  return e instanceof Response && !!e.options;
}
function getLocationChangeInfo(e) {
  const n = e.resolvedLocation, r = e.location;
  return { fromLocation: n, toLocation: r, pathChanged: (null == n ? void 0 : n.pathname) !== r.pathname, hrefChanged: (null == n ? void 0 : n.href) !== r.href, hashChanged: (null == n ? void 0 : n.hash) !== r.hash };
}
class RouterCore {
  constructor(e) {
    this.tempLocationKey = `${Math.round(1e7 * Math.random())}`, this.resetNextScroll = true, this.shouldViewTransition = void 0, this.isViewTransitionTypesSupported = void 0, this.subscribers = /* @__PURE__ */ new Set(), this.isScrollRestoring = false, this.isScrollRestorationSetup = false, this.startTransition = (e2) => e2(), this.update = (e2) => {
      e2.notFoundRoute && console.warn("The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/framework/react/guide/not-found-errors#migrating-from-notfoundroute for more info.");
      const n = this.options;
      this.options = { ...this.options, ...e2 }, this.isServer = this.options.isServer ?? "undefined" == typeof document, this.pathParamsDecodeCharMap = this.options.pathParamsAllowedCharacters ? new Map(this.options.pathParamsAllowedCharacters.map((e3) => [encodeURIComponent(e3), e3])) : void 0, (!this.basepath || e2.basepath && e2.basepath !== n.basepath) && (void 0 === e2.basepath || "" === e2.basepath || "/" === e2.basepath ? this.basepath = "/" : this.basepath = `/${trimPath(e2.basepath)}`), (!this.history || this.options.history && this.options.history !== this.history) && (this.history = this.options.history ?? (this.isServer ? createMemoryHistory({ initialEntries: [this.basepath || "/"] }) : function() {
        var e3, n2;
        const r = "undefined" != typeof document ? window : void 0, a = r.history.pushState, o = r.history.replaceState;
        let s = [];
        const _getBlockers = () => s, parseLocation = () => parseHref(`${r.location.pathname}${r.location.search}${r.location.hash}`, r.history.state);
        if (!(null == (e3 = r.history.state) ? void 0 : e3.__TSR_key) && !(null == (n2 = r.history.state) ? void 0 : n2.key)) {
          const e4 = createRandomKey();
          r.history.replaceState({ [Q]: 0, key: e4, __TSR_key: e4 }, "");
        }
        let i, c, l, u = parseLocation(), p = false, h = false, g = false, v = false;
        const flush = () => {
          c && (y._ignoreSubscribers = true, (c.isPush ? r.history.pushState : r.history.replaceState)(c.state, "", c.href), y._ignoreSubscribers = false, c = void 0, l = void 0, i = void 0);
        }, queueHistoryAction = (e4, n3, r2) => {
          const a2 = n3;
          l || (i = u), u = parseHref(n3, r2), c = { href: a2, state: r2, isPush: (null == c ? void 0 : c.isPush) || "push" === e4 }, l || (l = Promise.resolve().then(() => flush()));
        }, onPushPop = (e4) => {
          u = parseLocation(), y.notify({ type: e4 });
        }, onPushPopEvent = async () => {
          if (h) return void (h = false);
          const e4 = parseLocation(), n3 = e4.state[Q] - u.state[Q], a2 = -1 === n3, o2 = !(1 === n3) && !a2 || p;
          p = false;
          const s2 = o2 ? "GO" : a2 ? "BACK" : "FORWARD", i2 = o2 ? { type: "GO", index: n3 } : { type: a2 ? "BACK" : "FORWARD" };
          if (g) g = false;
          else {
            const n4 = _getBlockers();
            if ("undefined" != typeof document && n4.length) {
              for (const a3 of n4) if (await a3.blockerFn({ currentLocation: u, nextLocation: e4, action: s2 })) return h = true, r.history.go(1), void y.notify(i2);
            }
          }
          u = parseLocation(), y.notify(i2);
        }, onBeforeUnload = (e4) => {
          if (v) return void (v = false);
          let n3 = false;
          const r2 = _getBlockers();
          if ("undefined" != typeof document && r2.length) for (const e5 of r2) {
            const r3 = e5.enableBeforeUnload ?? true;
            if (true === r3) {
              n3 = true;
              break;
            }
            if ("function" == typeof r3 && true === r3()) {
              n3 = true;
              break;
            }
          }
          return n3 ? (e4.preventDefault(), e4.returnValue = "") : void 0;
        }, y = createHistory({ getLocation: () => u, getLength: () => r.history.length, pushState: (e4, n3) => queueHistoryAction("push", e4, n3), replaceState: (e4, n3) => queueHistoryAction("replace", e4, n3), back: (e4) => (e4 && (g = true), v = true, r.history.back()), forward: (e4) => {
          e4 && (g = true), v = true, r.history.forward();
        }, go: (e4) => {
          p = true, r.history.go(e4);
        }, createHref: (e4) => e4, flush, destroy: () => {
          r.history.pushState = a, r.history.replaceState = o, r.removeEventListener(Y, onBeforeUnload, { capture: true }), r.removeEventListener(X, onPushPopEvent);
        }, onBlocked: () => {
          i && u !== i && (u = i);
        }, getBlockers: _getBlockers, setBlockers: (e4) => s = e4, notifyOnIndexChange: false });
        return r.addEventListener(Y, onBeforeUnload, { capture: true }), r.addEventListener(X, onPushPopEvent), r.history.pushState = function(...e4) {
          const n3 = a.apply(r.history, e4);
          return y._ignoreSubscribers || onPushPop("PUSH"), n3;
        }, r.history.replaceState = function(...e4) {
          const n3 = o.apply(r.history, e4);
          return y._ignoreSubscribers || onPushPop("REPLACE"), n3;
        }, y;
      }()), this.latestLocation = this.parseLocation()), this.options.routeTree !== this.routeTree && (this.routeTree = this.options.routeTree, this.buildRouteTree()), this.__store || (this.__store = new Store({ loadedAt: 0, isLoading: false, isTransitioning: false, status: "idle", resolvedLocation: void 0, location: this.latestLocation, matches: [], pendingMatches: [], cachedMatches: [], statusCode: 200 }, { onUpdate: () => {
        this.__store.state = { ...this.state, cachedMatches: this.state.cachedMatches.filter((e3) => !["redirected"].includes(e3.status)) };
      } }), setupScrollRestoration(this));
    }, this.buildRouteTree = () => {
      const { routesById: e2, routesByPath: n, flatRoutes: r } = processRouteTree({ routeTree: this.routeTree, initRoute: (e3, n2) => {
        e3.init({ originalIndex: n2 });
      } });
      this.routesById = e2, this.routesByPath = n, this.flatRoutes = r;
      const a = this.options.notFoundRoute;
      a && (a.init({ originalIndex: 99999999999 }), this.routesById[a.id] = a);
    }, this.subscribe = (e2, n) => {
      const r = { eventType: e2, fn: n };
      return this.subscribers.add(r), () => {
        this.subscribers.delete(r);
      };
    }, this.emit = (e2) => {
      this.subscribers.forEach((n) => {
        n.eventType === e2.type && n.fn(e2);
      });
    }, this.parseLocation = (e2, n) => {
      const parse = ({ pathname: n2, search: r2, hash: a2, state: o2 }) => {
        const s = this.options.parseSearch(r2), i = this.options.stringifySearch(s);
        return { pathname: n2, searchStr: i, search: replaceEqualDeep$1(null == e2 ? void 0 : e2.search, s), hash: a2.split("#").reverse()[0] ?? "", href: `${n2}${i}${a2}`, state: replaceEqualDeep$1(null == e2 ? void 0 : e2.state, o2) };
      }, r = parse(n ?? this.history.location), { __tempLocation: a, __tempKey: o } = r.state;
      if (a && (!o || o === this.tempLocationKey)) {
        const e3 = parse(a);
        return e3.state.key = r.state.key, e3.state.__TSR_key = r.state.__TSR_key, delete e3.state.__tempLocation, { ...e3, maskedLocation: r };
      }
      return r;
    }, this.resolvePathWithBase = (e2, n) => function({ basepath: e3, base: n2, to: r, trailingSlash: a = "never", caseSensitive: o, parseCache: s }) {
      var i;
      n2 = removeBasepath(e3, n2, o), r = removeBasepath(e3, r, o);
      let c = parsePathname(n2, s).slice();
      const l = parsePathname(r, s);
      c.length > 1 && "/" === (null == (i = last(c)) ? void 0 : i.value) && c.pop();
      for (let e4 = 0, n3 = l.length; e4 < n3; e4++) {
        const r2 = l[e4], a2 = r2.value;
        "/" === a2 ? e4 ? e4 === n3 - 1 && c.push(r2) : c = [r2] : ".." === a2 ? c.pop() : "." === a2 || c.push(r2);
      }
      return c.length > 1 && ("/" === last(c).value ? "never" === a && c.pop() : "always" === a && c.push({ type: 0, value: "/" })), joinPaths([e3, ...c.map(segmentToString)]);
    }({ basepath: this.basepath, base: e2, to: cleanPath(n), trailingSlash: this.options.trailingSlash, caseSensitive: this.options.caseSensitive, parseCache: this.parsePathnameCache }), this.matchRoutes = (e2, n, r) => "string" == typeof e2 ? this.matchRoutesInternal({ pathname: e2, search: n }, r) : this.matchRoutesInternal(e2, n), this.parsePathnameCache = /* @__PURE__ */ function(e2) {
      const n = /* @__PURE__ */ new Map();
      let r, a;
      const touch = (e3) => {
        e3.next && (e3.prev ? (e3.prev.next = e3.next, e3.next.prev = e3.prev, e3.next = void 0, a && (a.next = e3, e3.prev = a)) : (e3.next.prev = void 0, r = e3.next, e3.next = void 0, a && (e3.prev = a, a.next = e3)), a = e3);
      };
      return { get(e3) {
        const r2 = n.get(e3);
        if (r2) return touch(r2), r2.value;
      }, set(o, s) {
        if (n.size >= e2 && r) {
          const e3 = r;
          n.delete(e3.key), e3.next && (r = e3.next, e3.next.prev = void 0), e3 === a && (a = void 0);
        }
        const i = n.get(o);
        if (i) i.value = s, touch(i);
        else {
          const e3 = { key: o, value: s, prev: a };
          a && (a.next = e3), a = e3, r || (r = e3), n.set(o, e3);
        }
      } };
    }(1e3), this.getMatchedRoutes = (e2, n) => getMatchedRoutes({ pathname: e2, routePathname: n, basepath: this.basepath, caseSensitive: this.options.caseSensitive, routesByPath: this.routesByPath, routesById: this.routesById, flatRoutes: this.flatRoutes, parseCache: this.parsePathnameCache }), this.cancelMatch = (e2) => {
      const n = this.getMatch(e2);
      n && (n.abortController.abort(), this.updateMatch(e2, (e3) => (clearTimeout(e3.pendingTimeout), { ...e3, pendingTimeout: void 0 })));
    }, this.cancelMatches = () => {
      var e2;
      null == (e2 = this.state.pendingMatches) || e2.forEach((e3) => {
        this.cancelMatch(e3.id);
      });
    }, this.buildLocation = (e2) => {
      const build = (n = {}) => {
        var r;
        const a = n._fromLocation || this.latestLocation, o = last(this.matchRoutes(a, { _buildLocation: true }));
        let s = o.fullPath;
        const i = n.to ? this.resolvePathWithBase(s, `${n.to}`) : this.resolvePathWithBase(s, "."), c = !!n.to && !comparePaths(n.to.toString(), s) && !comparePaths(i, s);
        "path" === n.unsafeRelative ? s = a.pathname : c && n.from && (s = n.from);
        const l = o.search, u = { ...o.params }, p = n.to ? this.resolvePathWithBase(s, `${n.to}`) : this.resolvePathWithBase(s, ".");
        let h = false === n.params || null === n.params ? {} : true === (n.params ?? true) ? u : { ...u, ...functionalUpdate$1(n.params, u) };
        const g = interpolatePath({ path: p, params: h ?? {}, parseCache: this.parsePathnameCache }).interpolatedPath, v = this.matchRoutes(g, {}, { _buildLocation: true }).map((e3) => this.looseRoutesById[e3.routeId]);
        Object.keys(h).length > 0 && v.map((e3) => {
          var n2;
          return (null == (n2 = e3.options.params) ? void 0 : n2.stringify) ?? e3.options.stringifyParams;
        }).filter(Boolean).forEach((e3) => {
          h = { ...h, ...e3(h) };
        });
        const y = interpolatePath({ path: p, params: h ?? {}, leaveWildcards: false, leaveParams: e2.leaveParams, decodeCharMap: this.pathParamsDecodeCharMap, parseCache: this.parsePathnameCache }).interpolatedPath;
        let b2 = l;
        if (e2._includeValidateSearch && (null == (r = this.options.search) ? void 0 : r.strict)) {
          let e3 = {};
          v.forEach((n2) => {
            try {
              n2.options.validateSearch && (e3 = { ...e3, ...validateSearch(n2.options.validateSearch, { ...e3, ...b2 }) ?? {} });
            } catch {
            }
          }), b2 = e3;
        }
        b2 = function({ search: e3, dest: n2, destRoutes: r2, _includeValidateSearch: a2 }) {
          const o2 = r2.reduce((e4, n3) => {
            var r3;
            const o3 = [];
            if ("search" in n3.options) (null == (r3 = n3.options.search) ? void 0 : r3.middlewares) && o3.push(...n3.options.search.middlewares);
            else if (n3.options.preSearchFilters || n3.options.postSearchFilters) {
              const legacyMiddleware = ({ search: e5, next: r4 }) => {
                let a3 = e5;
                "preSearchFilters" in n3.options && n3.options.preSearchFilters && (a3 = n3.options.preSearchFilters.reduce((e6, n4) => n4(e6), e5));
                const o4 = r4(a3);
                return "postSearchFilters" in n3.options && n3.options.postSearchFilters ? n3.options.postSearchFilters.reduce((e6, n4) => n4(e6), o4) : o4;
              };
              o3.push(legacyMiddleware);
            }
            if (a2 && n3.options.validateSearch) {
              const validate = ({ search: e5, next: r4 }) => {
                const a3 = r4(e5);
                try {
                  return { ...a3, ...validateSearch(n3.options.validateSearch, a3) ?? {} };
                } catch {
                  return a3;
                }
              };
              o3.push(validate);
            }
            return e4.concat(o3);
          }, []) ?? [], final = ({ search: e4 }) => n2.search ? true === n2.search ? e4 : functionalUpdate$1(n2.search, e4) : {};
          o2.push(final);
          const applyNext = (e4, n3) => {
            if (e4 >= o2.length) return n3;
            return (0, o2[e4])({ search: n3, next: (n4) => applyNext(e4 + 1, n4) });
          };
          return applyNext(0, e3);
        }({ search: b2, dest: n, destRoutes: v, _includeValidateSearch: e2._includeValidateSearch }), b2 = replaceEqualDeep$1(l, b2);
        const k = this.options.stringifySearch(b2), C = true === n.hash ? a.hash : n.hash ? functionalUpdate$1(n.hash, a.hash) : void 0, R2 = C ? `#${C}` : "";
        let P2 = true === n.state ? a.state : n.state ? functionalUpdate$1(n.state, a.state) : {};
        return P2 = replaceEqualDeep$1(a.state, P2), { pathname: y, search: b2, searchStr: k, state: P2, hash: C ?? "", href: `${y}${k}${R2}`, unmaskOnReload: n.unmaskOnReload };
      }, buildWithMatches = (n = {}, r) => {
        var a;
        const o = build(n);
        let s = r ? build(r) : void 0;
        if (!s) {
          let n2 = {};
          const i = null == (a = this.options.routeMasks) ? void 0 : a.find((e3) => {
            const r2 = matchPathname(this.basepath, o.pathname, { to: e3.from, caseSensitive: false, fuzzy: false }, this.parsePathnameCache);
            return !!r2 && (n2 = r2, true);
          });
          if (i) {
            const { from: a2, ...o2 } = i;
            r = { ...pick(e2, ["from"]), ...o2, params: n2 }, s = build(r);
          }
        }
        if (s) {
          const e3 = build(r);
          o.maskedLocation = e3;
        }
        return o;
      };
      return e2.mask ? buildWithMatches(e2, { ...pick(e2, ["from"]), ...e2.mask }) : buildWithMatches(e2);
    }, this.commitLocation = ({ viewTransition: e2, ignoreBlocker: n, ...r }) => {
      const a = this.latestLocation.href === r.href, o = this.commitLocationPromise;
      if (this.commitLocationPromise = createControlledPromise(() => {
        null == o || o.resolve();
      }), a && (() => {
        const e3 = ["key", "__TSR_key", "__TSR_index", "__hashScrollIntoViewOptions"];
        e3.forEach((e4) => {
          r.state[e4] = this.latestLocation.state[e4];
        });
        const n2 = deepEqual(r.state, this.latestLocation.state);
        return e3.forEach((e4) => {
          delete r.state[e4];
        }), n2;
      })()) this.load();
      else {
        let { maskedLocation: a2, hashScrollIntoView: o2, ...s } = r;
        a2 && (s = { ...a2, state: { ...a2.state, __tempKey: void 0, __tempLocation: { ...s, search: s.searchStr, state: { ...s.state, __tempKey: void 0, __tempLocation: void 0, __TSR_key: void 0, key: void 0 } } } }, (s.unmaskOnReload ?? this.options.unmaskOnReload) && (s.state.__tempKey = this.tempLocationKey)), s.state.__hashScrollIntoViewOptions = o2 ?? this.options.defaultHashScrollIntoView ?? true, this.shouldViewTransition = e2, this.history[r.replace ? "replace" : "push"](s.href, s.state, { ignoreBlocker: n });
      }
      return this.resetNextScroll = r.resetScroll ?? true, this.history.subscribers.size || this.load(), this.commitLocationPromise;
    }, this.buildAndCommitLocation = ({ replace: e2, resetScroll: n, hashScrollIntoView: r, viewTransition: a, ignoreBlocker: o, href: s, ...i } = {}) => {
      if (s) {
        const n2 = this.history.location.state.__TSR_index, r2 = parseHref(s, { __TSR_index: e2 ? n2 : n2 + 1 });
        i.to = r2.pathname, i.search = this.options.parseSearch(r2.search), i.hash = r2.hash.slice(1);
      }
      const c = this.buildLocation({ ...i, _includeValidateSearch: true });
      return this.commitLocation({ ...c, viewTransition: a, replace: e2, resetScroll: n, hashScrollIntoView: r, ignoreBlocker: o });
    }, this.navigate = ({ to: e2, reloadDocument: n, href: r, ...a }) => {
      if (!n && r) try {
        new URL(`${r}`), n = true;
      } catch {
      }
      if (n) {
        if (!r) {
          const n2 = this.buildLocation({ to: e2, ...a });
          r = this.history.createHref(n2.href);
        }
        return a.replace ? window.location.replace(r) : window.location.href = r, Promise.resolve();
      }
      return this.buildAndCommitLocation({ ...a, href: r, to: e2, _isNavigate: true });
    }, this.beforeLoad = () => {
      if (this.cancelMatches(), this.latestLocation = this.parseLocation(this.latestLocation), this.isServer) {
        const e3 = this.buildLocation({ to: this.latestLocation.pathname, search: true, params: true, hash: true, state: true, _includeValidateSearch: true }), normalizeUrl = (e4) => {
          try {
            return encodeURI(decodeURI(e4));
          } catch {
            return e4;
          }
        };
        if (trimPath(normalizeUrl(this.latestLocation.href)) !== trimPath(normalizeUrl(e3.href))) throw function(e4) {
          if (e4.statusCode = e4.statusCode || e4.code || 307, !e4.reloadDocument) try {
            new URL(`${e4.href}`), e4.reloadDocument = true;
          } catch {
          }
          const n = new Headers(e4.headers || {});
          e4.href && null === n.get("Location") && n.set("Location", e4.href);
          const r = new Response(null, { status: e4.statusCode, headers: n });
          if (r.options = e4, e4.throw) throw r;
          return r;
        }({ href: e3.href });
      }
      const e2 = this.matchRoutes(this.latestLocation);
      this.__store.setState((n) => ({ ...n, status: "pending", statusCode: 200, isLoading: true, location: this.latestLocation, pendingMatches: e2, cachedMatches: n.cachedMatches.filter((n2) => !e2.some((e3) => e3.id === n2.id)) }));
    }, this.load = async (e2) => {
      let n, r, a;
      for (a = new Promise((o) => {
        this.startTransition(async () => {
          var s;
          try {
            this.beforeLoad();
            const n2 = this.latestLocation, r2 = this.state.resolvedLocation;
            this.state.redirect || this.emit({ type: "onBeforeNavigate", ...getLocationChangeInfo({ resolvedLocation: r2, location: n2 }) }), this.emit({ type: "onBeforeLoad", ...getLocationChangeInfo({ resolvedLocation: r2, location: n2 }) }), await this.loadMatches({ sync: null == e2 ? void 0 : e2.sync, matches: this.state.pendingMatches, location: n2, onReady: async () => {
              this.startViewTransition(async () => {
                let e3, n3, r3;
                batch(() => {
                  this.__store.setState((a2) => {
                    const o2 = a2.matches, s2 = a2.pendingMatches || a2.matches;
                    return e3 = o2.filter((e4) => !s2.some((n4) => n4.id === e4.id)), n3 = s2.filter((e4) => !o2.some((n4) => n4.id === e4.id)), r3 = o2.filter((e4) => s2.some((n4) => n4.id === e4.id)), { ...a2, isLoading: false, loadedAt: Date.now(), matches: s2, pendingMatches: void 0, cachedMatches: [...a2.cachedMatches, ...e3.filter((e4) => "error" !== e4.status)] };
                  }), this.clearExpiredCache();
                }), [[e3, "onLeave"], [n3, "onEnter"], [r3, "onStay"]].forEach(([e4, n4]) => {
                  e4.forEach((e5) => {
                    var r4, a2;
                    null == (a2 = (r4 = this.looseRoutesById[e5.routeId].options)[n4]) || a2.call(r4, e5);
                  });
                });
              });
            } });
          } catch (e3) {
            isRedirect(e3) ? (n = e3, this.isServer || this.navigate({ ...n.options, replace: true, ignoreBlocker: true })) : isNotFound(e3) && (r = e3), this.__store.setState((e4) => ({ ...e4, statusCode: n ? n.status : r ? 404 : e4.matches.some((e5) => "error" === e5.status) ? 500 : 200, redirect: n }));
          }
          this.latestLoadPromise === a && (null == (s = this.commitLocationPromise) || s.resolve(), this.latestLoadPromise = void 0, this.commitLocationPromise = void 0), o();
        });
      }), this.latestLoadPromise = a, await a; this.latestLoadPromise && a !== this.latestLoadPromise; ) await this.latestLoadPromise;
      this.hasNotFoundMatch() && this.__store.setState((e3) => ({ ...e3, statusCode: 404 }));
    }, this.startViewTransition = (e2) => {
      const n = this.shouldViewTransition ?? this.options.defaultViewTransition;
      if (delete this.shouldViewTransition, n && "undefined" != typeof document && "startViewTransition" in document && "function" == typeof document.startViewTransition) {
        let r;
        if ("object" == typeof n && this.isViewTransitionTypesSupported) {
          const a = this.latestLocation, o = this.state.resolvedLocation;
          r = { update: e2, types: "function" == typeof n.types ? n.types(getLocationChangeInfo({ resolvedLocation: o, location: a })) : n.types };
        } else r = e2;
        document.startViewTransition(r);
      } else e2();
    }, this.updateMatch = (e2, n) => {
      var r;
      const a = (null == (r = this.state.pendingMatches) ? void 0 : r.some((n2) => n2.id === e2)) ? "pendingMatches" : this.state.matches.some((n2) => n2.id === e2) ? "matches" : this.state.cachedMatches.some((n2) => n2.id === e2) ? "cachedMatches" : "";
      a && this.__store.setState((r2) => {
        var o;
        return { ...r2, [a]: null == (o = r2[a]) ? void 0 : o.map((r3) => r3.id === e2 ? n(r3) : r3) };
      });
    }, this.getMatch = (e2) => {
      var n;
      const findFn = (n2) => n2.id === e2;
      return this.state.cachedMatches.find(findFn) ?? (null == (n = this.state.pendingMatches) ? void 0 : n.find(findFn)) ?? this.state.matches.find(findFn);
    }, this.loadMatches = async ({ location: e2, matches: n, preload: r, onReady: a, updateMatch: o = this.updateMatch, sync: s }) => {
      let i, c = false;
      const triggerOnReady = async () => {
        c || (c = true, await (null == a ? void 0 : a()));
      }, resolvePreload = (e3) => !(!r || this.state.matches.some((n2) => n2.id === e3));
      !this.isServer && this.state.matches.some((e3) => e3._forcePending) && triggerOnReady();
      const handleRedirectAndNotFound = (r2, a2) => {
        var s2, i2, l;
        if (isRedirect(a2) || isNotFound(a2)) {
          if (isRedirect(a2) && a2.redirectHandled && !a2.options.reloadDocument) throw a2;
          if (null == (s2 = r2.beforeLoadPromise) || s2.resolve(), null == (i2 = r2.loaderPromise) || i2.resolve(), o(r2.id, (e3) => ({ ...e3, status: isRedirect(a2) ? "redirected" : isNotFound(a2) ? "notFound" : "error", isFetching: false, error: a2, beforeLoadPromise: void 0, loaderPromise: void 0 })), a2.routeId || (a2.routeId = r2.routeId), null == (l = r2.loadPromise) || l.resolve(), isRedirect(a2)) throw c = true, a2.options._fromLocation = e2, a2.redirectHandled = true, a2 = this.resolveRedirect(a2);
          if (isNotFound(a2)) throw this._handleNotFound(n, a2, { updateMatch: o }), a2;
        }
      }, shouldSkipLoader = (e3) => {
        const n2 = this.getMatch(e3);
        return !(this.isServer || !n2._dehydrated) || !(!this.isServer || false !== n2.ssr);
      };
      try {
        await new Promise((r2, c2) => {
          (async () => {
            var l, u, p, h;
            try {
              const handleSerialError = (e3, r3, a2) => {
                var s2, c4;
                const { id: l2, routeId: u2 } = n[e3], p2 = this.looseRoutesById[u2];
                if (r3 instanceof Promise) throw r3;
                r3.routerCode = a2, i = i ?? e3, handleRedirectAndNotFound(this.getMatch(l2), r3);
                try {
                  null == (c4 = (s2 = p2.options).onError) || c4.call(s2, r3);
                } catch (e4) {
                  r3 = e4, handleRedirectAndNotFound(this.getMatch(l2), r3);
                }
                o(l2, (e4) => {
                  var n2, a3;
                  return null == (n2 = e4.beforeLoadPromise) || n2.resolve(), null == (a3 = e4.loadPromise) || a3.resolve(), { ...e4, error: r3, status: "error", isFetching: false, updatedAt: Date.now(), abortController: new AbortController(), beforeLoadPromise: void 0 };
                });
              };
              for (const [r3, { id: s2, routeId: i2 }] of n.entries()) {
                const c4 = this.getMatch(s2), g2 = null == (l = n[r3 - 1]) ? void 0 : l.id, v = g2 ? this.getMatch(g2) : void 0, y = this.looseRoutesById[i2], b2 = y.options.pendingMs ?? this.options.defaultPendingMs;
                if (this.isServer) {
                  let r4;
                  if (this.isShell()) r4 = s2 === pe;
                  else {
                    const a2 = this.options.defaultSsr ?? true;
                    if (false === (null == v ? void 0 : v.ssr)) r4 = false;
                    else {
                      let o2;
                      if (void 0 === y.options.ssr) o2 = a2;
                      else if ("function" == typeof y.options.ssr) {
                        let makeMaybe = function(e3, n2) {
                          return n2 ? { status: "error", error: n2 } : { status: "success", value: e3 };
                        };
                        const { search: r5, params: i3 } = this.getMatch(s2), l2 = { search: makeMaybe(r5, c4.searchError), params: makeMaybe(i3, c4.paramsError), location: e2, matches: n.map((e3) => ({ index: e3.index, pathname: e3.pathname, fullPath: e3.fullPath, staticData: e3.staticData, id: e3.id, routeId: e3.routeId, search: makeMaybe(e3.search, e3.searchError), params: makeMaybe(e3.params, e3.paramsError), ssr: e3.ssr })) };
                        o2 = await y.options.ssr(l2) ?? a2;
                      } else o2 = y.options.ssr;
                      r4 = true === o2 && "data-only" === (null == v ? void 0 : v.ssr) ? "data-only" : o2;
                    }
                  }
                  o(s2, (e3) => ({ ...e3, ssr: r4 }));
                }
                if (shouldSkipLoader(s2)) continue;
                const k = !(!a || this.isServer || resolvePreload(s2) || !(y.options.loader || y.options.beforeLoad || routeNeedsPreload(y)) || "number" != typeof b2 || b2 === 1 / 0 || !(y.options.pendingComponent ?? (null == (u = this.options) ? void 0 : u.defaultPendingComponent)));
                let C = true;
                const setupPendingTimeout = () => {
                  if (k && void 0 === this.getMatch(s2).pendingTimeout) {
                    const e3 = setTimeout(() => {
                      try {
                        triggerOnReady();
                      } catch {
                      }
                    }, b2);
                    o(s2, (n2) => ({ ...n2, pendingTimeout: e3 }));
                  }
                };
                if (c4.beforeLoadPromise || c4.loaderPromise) {
                  setupPendingTimeout(), await c4.beforeLoadPromise;
                  const e3 = this.getMatch(s2);
                  "error" === e3.status ? C = true : !e3.preload || "redirected" !== e3.status && "notFound" !== e3.status || handleRedirectAndNotFound(e3, e3.error);
                }
                if (C) {
                  try {
                    o(s2, (e3) => {
                      const n2 = e3.loadPromise;
                      return { ...e3, loadPromise: createControlledPromise(() => {
                        null == n2 || n2.resolve();
                      }), beforeLoadPromise: createControlledPromise() };
                    });
                    const { paramsError: a2, searchError: i3 } = this.getMatch(s2);
                    a2 && handleSerialError(r3, a2, "PARSE_PARAMS"), i3 && handleSerialError(r3, i3, "VALIDATE_SEARCH"), setupPendingTimeout();
                    const c5 = new AbortController(), l2 = (null == v ? void 0 : v.context) ?? this.options.context ?? {};
                    o(s2, (e3) => ({ ...e3, isFetching: "beforeLoad", fetchCount: e3.fetchCount + 1, abortController: c5, context: { ...l2, ...e3.__routeContext } }));
                    const { search: u2, params: g3, context: b3, cause: k2 } = this.getMatch(s2), C2 = resolvePreload(s2), R2 = { search: u2, abortController: c5, params: g3, preload: C2, context: b3, location: e2, navigate: (n2) => this.navigate({ ...n2, _fromLocation: e2 }), buildLocation: this.buildLocation, cause: C2 ? "preload" : k2, matches: n }, P2 = await (null == (h = (p = y.options).beforeLoad) ? void 0 : h.call(p, R2));
                    (isRedirect(P2) || isNotFound(P2)) && handleSerialError(r3, P2, "BEFORE_LOAD"), o(s2, (e3) => ({ ...e3, __beforeLoadContext: P2, context: { ...l2, ...e3.__routeContext, ...P2 }, abortController: c5 }));
                  } catch (e3) {
                    handleSerialError(r3, e3, "BEFORE_LOAD");
                  }
                  o(s2, (e3) => {
                    var n2;
                    return null == (n2 = e3.beforeLoadPromise) || n2.resolve(), { ...e3, beforeLoadPromise: void 0, isFetching: false };
                  });
                }
              }
              const c3 = n.slice(0, i), g = [];
              c3.forEach(({ id: r3, routeId: a2 }, i2) => {
                g.push((async () => {
                  let c4 = false, l2 = false;
                  const u2 = this.looseRoutesById[a2], executeHead = async () => {
                    var e3, a3, o2, s2, i3, c5;
                    const l3 = this.getMatch(r3);
                    if (!l3) return;
                    const p3 = { matches: n, match: l3, params: l3.params, loaderData: l3.loaderData }, h2 = await (null == (a3 = (e3 = u2.options).head) ? void 0 : a3.call(e3, p3)), g2 = null == h2 ? void 0 : h2.meta, v = null == h2 ? void 0 : h2.links, y = null == h2 ? void 0 : h2.scripts, b2 = null == h2 ? void 0 : h2.styles, k = await (null == (s2 = (o2 = u2.options).scripts) ? void 0 : s2.call(o2, p3));
                    return { meta: g2, links: v, headScripts: y, headers: await (null == (c5 = (i3 = u2.options).headers) ? void 0 : c5.call(i3, p3)), scripts: k, styles: b2 };
                  }, potentialPendingMinPromise = async () => {
                    const e3 = this.getMatch(r3);
                    e3.minPendingPromise && await e3.minPendingPromise;
                  }, p2 = this.getMatch(r3);
                  if (shouldSkipLoader(r3)) {
                    if (this.isServer) {
                      const e3 = await executeHead();
                      return o(r3, (n2) => ({ ...n2, ...e3 })), this.getMatch(r3);
                    }
                  } else if (p2.loaderPromise) {
                    if ("success" === p2.status && !s && !p2.preload) return this.getMatch(r3);
                    await p2.loaderPromise;
                    const e3 = this.getMatch(r3);
                    e3.error && handleRedirectAndNotFound(e3, e3.error);
                  } else {
                    const n2 = g[i2 - 1], getLoaderContext = () => {
                      const { params: a4, loaderDeps: o2, abortController: s2, context: i3, cause: c5 } = this.getMatch(r3), l3 = resolvePreload(r3);
                      return { params: a4, deps: o2, preload: !!l3, parentMatchPromise: n2, abortController: s2, context: i3, location: e2, navigate: (n3) => this.navigate({ ...n3, _fromLocation: e2 }), cause: l3 ? "preload" : c5, route: u2 };
                    }, a3 = Date.now() - this.getMatch(r3).updatedAt, p3 = resolvePreload(r3), h2 = p3 ? u2.options.preloadStaleTime ?? this.options.defaultPreloadStaleTime ?? 3e4 : u2.options.staleTime ?? this.options.defaultStaleTime ?? 0, v = u2.options.shouldReload, y = "function" == typeof v ? v(getLoaderContext()) : v;
                    o(r3, (e3) => ({ ...e3, loaderPromise: createControlledPromise(), preload: !!p3 && !this.state.matches.some((e4) => e4.id === r3) }));
                    const runLoader = async () => {
                      var e3, n3, a4, s2;
                      try {
                        try {
                          (!this.isServer || this.isServer && true === this.getMatch(r3).ssr) && this.loadRouteChunk(u2), o(r3, (e4) => ({ ...e4, isFetching: "loader" }));
                          const a5 = await (null == (n3 = (e3 = u2.options).loader) ? void 0 : n3.call(e3, getLoaderContext()));
                          handleRedirectAndNotFound(this.getMatch(r3), a5), o(r3, (e4) => ({ ...e4, loaderData: a5 })), await u2._lazyPromise;
                          const s3 = await executeHead();
                          await potentialPendingMinPromise(), await u2._componentsPromise, o(r3, (e4) => ({ ...e4, error: void 0, status: "success", isFetching: false, updatedAt: Date.now(), ...s3 }));
                        } catch (e4) {
                          let n4 = e4;
                          await potentialPendingMinPromise(), handleRedirectAndNotFound(this.getMatch(r3), e4);
                          try {
                            null == (s2 = (a4 = u2.options).onError) || s2.call(a4, e4);
                          } catch (e5) {
                            n4 = e5, handleRedirectAndNotFound(this.getMatch(r3), e5);
                          }
                          const i3 = await executeHead();
                          o(r3, (e5) => ({ ...e5, error: n4, status: "error", isFetching: false, ...i3 }));
                        }
                      } catch (e4) {
                        const n4 = await executeHead();
                        o(r3, (e5) => ({ ...e5, loaderPromise: void 0, ...n4 })), handleRedirectAndNotFound(this.getMatch(r3), e4);
                      }
                    }, { status: b2, invalid: k } = this.getMatch(r3);
                    if (c4 = "success" === b2 && (k || (y ?? a3 > h2)), p3 && false === u2.options.preload) ;
                    else if (c4 && !s) l2 = true, (async () => {
                      try {
                        await runLoader();
                        const { loaderPromise: e3, loadPromise: n3 } = this.getMatch(r3);
                        null == e3 || e3.resolve(), null == n3 || n3.resolve(), o(r3, (e4) => ({ ...e4, loaderPromise: void 0 }));
                      } catch (e3) {
                        isRedirect(e3) && await this.navigate(e3.options);
                      }
                    })();
                    else if ("success" !== b2 || c4 && s) await runLoader();
                    else {
                      const e3 = await executeHead();
                      o(r3, (n3) => ({ ...n3, ...e3 }));
                    }
                  }
                  if (!l2) {
                    const { loaderPromise: e3, loadPromise: n2 } = this.getMatch(r3);
                    null == e3 || e3.resolve(), null == n2 || n2.resolve();
                  }
                  return o(r3, (e3) => (clearTimeout(e3.pendingTimeout), { ...e3, isFetching: !!l2 && e3.isFetching, loaderPromise: l2 ? e3.loaderPromise : void 0, invalid: false, pendingTimeout: void 0, _dehydrated: void 0 })), this.getMatch(r3);
                })());
              }), await Promise.all(g), r2();
            } catch (e3) {
              c2(e3);
            }
          })();
        }), await triggerOnReady();
      } catch (e3) {
        if (isRedirect(e3) || isNotFound(e3)) throw isNotFound(e3) && !r && await triggerOnReady(), e3;
      }
      return n;
    }, this.invalidate = (e2) => {
      const invalidate = (n) => {
        var r;
        return (null == (r = null == e2 ? void 0 : e2.filter) ? void 0 : r.call(e2, n)) ?? 1 ? { ...n, invalid: true, ...(null == e2 ? void 0 : e2.forcePending) || "error" === n.status ? { status: "pending", error: void 0 } : {} } : n;
      };
      return this.__store.setState((e3) => {
        var n;
        return { ...e3, matches: e3.matches.map(invalidate), cachedMatches: e3.cachedMatches.map(invalidate), pendingMatches: null == (n = e3.pendingMatches) ? void 0 : n.map(invalidate) };
      }), this.shouldViewTransition = false, this.load({ sync: null == e2 ? void 0 : e2.sync });
    }, this.resolveRedirect = (e2) => (e2.options.href || (e2.options.href = this.buildLocation(e2.options).href, e2.headers.set("Location", e2.options.href)), e2.headers.get("Location") || e2.headers.set("Location", e2.options.href), e2), this.clearCache = (e2) => {
      const n = null == e2 ? void 0 : e2.filter;
      void 0 !== n ? this.__store.setState((e3) => ({ ...e3, cachedMatches: e3.cachedMatches.filter((e4) => !n(e4)) })) : this.__store.setState((e3) => ({ ...e3, cachedMatches: [] }));
    }, this.clearExpiredCache = () => {
      this.clearCache({ filter: (e2) => {
        const n = this.looseRoutesById[e2.routeId];
        if (!n.options.loader) return true;
        const r = (e2.preload ? n.options.preloadGcTime ?? this.options.defaultPreloadGcTime : n.options.gcTime ?? this.options.defaultGcTime) ?? 3e5;
        if ("error" === e2.status) return true;
        return Date.now() - e2.updatedAt >= r;
      } });
    }, this.loadRouteChunk = (e2) => (void 0 === e2._lazyPromise && (e2.lazyFn ? e2._lazyPromise = e2.lazyFn().then((n) => {
      const { id: r, ...a } = n.options;
      Object.assign(e2.options, a);
    }) : e2._lazyPromise = Promise.resolve()), void 0 === e2._componentsPromise && (e2._componentsPromise = e2._lazyPromise.then(() => Promise.all(de.map(async (n) => {
      const r = e2.options[n];
      (null == r ? void 0 : r.preload) && await r.preload();
    })))), e2._componentsPromise), this.preloadRoute = async (e2) => {
      const n = this.buildLocation(e2);
      let r = this.matchRoutes(n, { throwOnError: true, preload: true, dest: e2 });
      const a = new Set([...this.state.matches, ...this.state.pendingMatches ?? []].map((e3) => e3.id)), o = /* @__PURE__ */ new Set([...a, ...this.state.cachedMatches.map((e3) => e3.id)]);
      batch(() => {
        r.forEach((e3) => {
          o.has(e3.id) || this.__store.setState((n2) => ({ ...n2, cachedMatches: [...n2.cachedMatches, e3] }));
        });
      });
      try {
        return r = await this.loadMatches({ matches: r, location: n, preload: true, updateMatch: (e3, n2) => {
          a.has(e3) ? r = r.map((r2) => r2.id === e3 ? n2(r2) : r2) : this.updateMatch(e3, n2);
        } }), r;
      } catch (e3) {
        if (isRedirect(e3)) {
          if (e3.options.reloadDocument) return;
          return await this.preloadRoute({ ...e3.options, _fromLocation: n });
        }
        return void (isNotFound(e3) || console.error(e3));
      }
    }, this.matchRoute = (e2, n) => {
      const r = { ...e2, to: e2.to ? this.resolvePathWithBase(e2.from || "", e2.to) : void 0, params: e2.params || {}, leaveParams: true }, a = this.buildLocation(r);
      if ((null == n ? void 0 : n.pending) && "pending" !== this.state.status) return false;
      const o = (void 0 === (null == n ? void 0 : n.pending) ? !this.state.isLoading : n.pending) ? this.latestLocation : this.state.resolvedLocation || this.state.location, s = matchPathname(this.basepath, o.pathname, { ...n, to: a.pathname }, this.parsePathnameCache);
      return !!s && (!(e2.params && !deepEqual(s, e2.params, { partial: true })) && (s && ((null == n ? void 0 : n.includeSearch) ?? 1) ? !!deepEqual(o.search, a.search, { partial: true }) && s : s));
    }, this._handleNotFound = (e2, n, { updateMatch: r = this.updateMatch } = {}) => {
      var a;
      const o = this.routesById[n.routeId ?? ""] ?? this.routeTree, s = {};
      for (const n2 of e2) s[n2.routeId] = n2;
      !o.options.notFoundComponent && (null == (a = this.options) ? void 0 : a.defaultNotFoundComponent) && (o.options.notFoundComponent = this.options.defaultNotFoundComponent), invariant(o.options.notFoundComponent);
      const i = s[o.id];
      invariant(i, o.id), r(i.id, (e3) => ({ ...e3, status: "notFound", error: n, isFetching: false })), "BEFORE_LOAD" === n.routerCode && o.parentRoute && (n.routeId = o.parentRoute.id, this._handleNotFound(e2, n, { updateMatch: r }));
    }, this.hasNotFoundMatch = () => this.__store.state.matches.some((e2) => "notFound" === e2.status || e2.globalNotFound), this.update({ defaultPreloadDelay: 50, defaultPendingMs: 1e3, defaultPendingMinMs: 500, context: void 0, ...e, caseSensitive: e.caseSensitive ?? false, notFoundMode: e.notFoundMode ?? "fuzzy", stringifySearch: e.stringifySearch ?? ue, parseSearch: e.parseSearch ?? ce }), "undefined" != typeof document && (self.__TSR_ROUTER__ = this);
  }
  isShell() {
    return !!this.options.isShell;
  }
  isPrerendering() {
    return !!this.options.isPrerendering;
  }
  get state() {
    return this.__store.state;
  }
  get looseRoutesById() {
    return this.routesById;
  }
  matchRoutesInternal(e, n) {
    var r;
    const { foundRoute: a, matchedRoutes: o, routeParams: s } = this.getMatchedRoutes(e.pathname, null == (r = null == n ? void 0 : n.dest) ? void 0 : r.to);
    let i = false;
    (a ? "/" !== a.path && s["**"] : trimPathRight(e.pathname)) && (this.options.notFoundRoute ? o.push(this.options.notFoundRoute) : i = true);
    const c = (() => {
      if (i) {
        if ("root" !== this.options.notFoundMode) for (let e2 = o.length - 1; e2 >= 0; e2--) {
          const n2 = o[e2];
          if (n2.children) return n2.id;
        }
        return pe;
      }
    })(), l = o.map((e2) => {
      var r2;
      let a2;
      const o2 = (null == (r2 = e2.options.params) ? void 0 : r2.parse) ?? e2.options.parseParams;
      if (o2) try {
        const e3 = o2(s);
        Object.assign(s, e3);
      } catch (e3) {
        if (a2 = new PathParamError(e3.message, { cause: e3 }), null == n ? void 0 : n.throwOnError) throw a2;
        return a2;
      }
    }), u = [], getParentContext = (e2) => (null == e2 ? void 0 : e2.id) ? e2.context ?? this.options.context ?? {} : this.options.context ?? {};
    return o.forEach((r2, a2) => {
      var o2, i2;
      const p = u[a2 - 1], [h, g, v] = (() => {
        const a3 = (null == p ? void 0 : p.search) ?? e.search, o3 = (null == p ? void 0 : p._strictSearch) ?? {};
        try {
          const e2 = validateSearch(r2.options.validateSearch, { ...a3 }) ?? {};
          return [{ ...a3, ...e2 }, { ...o3, ...e2 }, void 0];
        } catch (e2) {
          let r3 = e2;
          if (e2 instanceof SearchParamError || (r3 = new SearchParamError(e2.message, { cause: e2 })), null == n ? void 0 : n.throwOnError) throw r3;
          return [a3, {}, r3];
        }
      })(), y = (null == (i2 = (o2 = r2.options).loaderDeps) ? void 0 : i2.call(o2, { search: h })) ?? "", b2 = y ? JSON.stringify(y) : "", { usedParams: k, interpolatedPath: C } = interpolatePath({ path: r2.fullPath, params: s, decodeCharMap: this.pathParamsDecodeCharMap }), R2 = interpolatePath({ path: r2.id, params: s, leaveWildcards: true, decodeCharMap: this.pathParamsDecodeCharMap, parseCache: this.parsePathnameCache }).interpolatedPath + b2, P2 = this.getMatch(R2), T = this.state.matches.find((e2) => e2.routeId === r2.id), E2 = T ? "stay" : "enter";
      let $2;
      if (P2) $2 = { ...P2, cause: E2, params: T ? replaceEqualDeep$1(T.params, s) : s, _strictParams: k, search: replaceEqualDeep$1(T ? T.search : P2.search, h), _strictSearch: g };
      else {
        const e2 = r2.options.loader || r2.options.beforeLoad || r2.lazyFn || routeNeedsPreload(r2) ? "pending" : "success";
        $2 = { id: R2, index: a2, routeId: r2.id, params: T ? replaceEqualDeep$1(T.params, s) : s, _strictParams: k, pathname: joinPaths([this.basepath, C]), updatedAt: Date.now(), search: T ? replaceEqualDeep$1(T.search, h) : h, _strictSearch: g, searchError: void 0, status: e2, isFetching: false, error: void 0, paramsError: l[a2], __routeContext: {}, __beforeLoadContext: void 0, context: {}, abortController: new AbortController(), fetchCount: 0, cause: E2, loaderDeps: T ? replaceEqualDeep$1(T.loaderDeps, y) : y, invalid: false, preload: false, links: void 0, scripts: void 0, headScripts: void 0, meta: void 0, staticData: r2.options.staticData || {}, loadPromise: createControlledPromise(), fullPath: r2.fullPath };
      }
      (null == n ? void 0 : n.preload) || ($2.globalNotFound = c === r2.id), $2.searchError = v;
      const F = getParentContext(p);
      $2.context = { ...F, ...$2.__routeContext, ...$2.__beforeLoadContext }, u.push($2);
    }), u.forEach((r2, a2) => {
      var o2, s2;
      const i2 = this.looseRoutesById[r2.routeId];
      if (!this.getMatch(r2.id) && true !== (null == n ? void 0 : n._buildLocation)) {
        const n2 = u[a2 - 1], c2 = getParentContext(n2), l2 = { deps: r2.loaderDeps, params: r2.params, context: c2, location: e, navigate: (n3) => this.navigate({ ...n3, _fromLocation: e }), buildLocation: this.buildLocation, cause: r2.cause, abortController: r2.abortController, preload: !!r2.preload, matches: u };
        r2.__routeContext = (null == (s2 = (o2 = i2.options).context) ? void 0 : s2.call(o2, l2)) ?? {}, r2.context = { ...c2, ...r2.__routeContext, ...r2.__beforeLoadContext };
      }
    }), u;
  }
}
class SearchParamError extends Error {
}
class PathParamError extends Error {
}
const normalize = (e) => e.endsWith("/") && e.length > 1 ? e.slice(0, -1) : e;
function comparePaths(e, n) {
  return normalize(e) === normalize(n);
}
function validateSearch(e, n) {
  if (null == e) return {};
  if ("~standard" in e) {
    const r = e["~standard"].validate(n);
    if (r instanceof Promise) throw new SearchParamError("Async validation not supported");
    if (r.issues) throw new SearchParamError(JSON.stringify(r.issues, void 0, 2), { cause: r });
    return r.value;
  }
  return "parse" in e ? e.parse(n) : "function" == typeof e ? e(n) : {};
}
const de = ["component", "errorComponent", "pendingComponent", "notFoundComponent"];
function routeNeedsPreload(e) {
  var n;
  for (const r of de) if (null == (n = e.options[r]) ? void 0 : n.preload) return true;
  return false;
}
const he = 0.5, ge = 0.4, ve = 0.25;
function handleParam(e, n) {
  return e.prefixSegment && e.suffixSegment ? n + 0.05 : e.prefixSegment ? n + 0.02 : e.suffixSegment ? n + 0.01 : n;
}
function processRouteTree({ routeTree: e, initRoute: n }) {
  const r = {}, a = {}, recurseRoutes = (e2) => {
    e2.forEach((e3, o2) => {
      null == n || n(e3, o2);
      if (invariant(!r[e3.id], String(e3.id)), r[e3.id] = e3, !e3.isRoot && e3.path) {
        const n2 = trimPathRight(e3.fullPath);
        a[n2] && !e3.fullPath.endsWith("/") || (a[n2] = e3);
      }
      const s2 = e3.children;
      (null == s2 ? void 0 : s2.length) && recurseRoutes(s2);
    });
  };
  recurseRoutes([e]);
  const o = [];
  Object.values(r).forEach((e2, n2) => {
    var r2;
    if (e2.isRoot || !e2.path) return;
    const a2 = trimPathLeft(e2.fullPath);
    let s2 = parsePathname(a2), i = 0;
    for (; s2.length > i + 1 && "/" === (null == (r2 = s2[i]) ? void 0 : r2.value); ) i++;
    i > 0 && (s2 = s2.slice(i));
    let c = 0, l = false;
    const u = s2.map((e3, n3) => {
      if ("/" === e3.value) return 0.75;
      let r3;
      if (1 === e3.type ? r3 = he : 3 === e3.type ? (r3 = ge, c++) : 2 === e3.type && (r3 = ve), r3) {
        for (let a3 = n3 + 1; a3 < s2.length; a3++) {
          const n4 = s2[a3];
          if (0 === n4.type && "/" !== n4.value) return l = true, handleParam(e3, r3 + 0.2);
        }
        return handleParam(e3, r3);
      }
      return 1;
    });
    o.push({ child: e2, trimmed: a2, parsed: s2, index: n2, scores: u, optionalParamCount: c, hasStaticAfter: l });
  });
  const s = o.sort((e2, n2) => {
    const r2 = Math.min(e2.scores.length, n2.scores.length);
    for (let a2 = 0; a2 < r2; a2++) if (e2.scores[a2] !== n2.scores[a2]) return n2.scores[a2] - e2.scores[a2];
    if (e2.scores.length !== n2.scores.length) {
      if (e2.optionalParamCount !== n2.optionalParamCount) {
        if (e2.hasStaticAfter === n2.hasStaticAfter) return e2.optionalParamCount - n2.optionalParamCount;
        if (e2.hasStaticAfter && !n2.hasStaticAfter) return -1;
        if (!e2.hasStaticAfter && n2.hasStaticAfter) return 1;
      }
      return n2.scores.length - e2.scores.length;
    }
    for (let a2 = 0; a2 < r2; a2++) if (e2.parsed[a2].value !== n2.parsed[a2].value) return e2.parsed[a2].value > n2.parsed[a2].value ? 1 : -1;
    return e2.index - n2.index;
  }).map((e2, n2) => (e2.child.rank = n2, e2.child));
  return { routesById: r, routesByPath: a, flatRoutes: s };
}
function getMatchedRoutes({ pathname: e, routePathname: n, basepath: r, caseSensitive: a, routesByPath: o, routesById: s, flatRoutes: i, parseCache: c }) {
  let l = {};
  const u = trimPathRight(e), getMatchedParams = (e2) => {
    var n2;
    return matchPathname(r, u, { to: e2.fullPath, caseSensitive: (null == (n2 = e2.options) ? void 0 : n2.caseSensitive) ?? a, fuzzy: true }, c);
  };
  let p = void 0 !== n ? o[n] : void 0;
  if (p) l = getMatchedParams(p);
  else {
    let e2;
    for (const n2 of i) {
      const r2 = getMatchedParams(n2);
      if (r2) {
        if ("/" === n2.path || !r2["**"]) {
          p = n2, l = r2;
          break;
        }
        e2 || (e2 = { foundRoute: n2, routeParams: r2 });
      }
    }
    !p && e2 && (p = e2.foundRoute, l = e2.routeParams);
  }
  let h = p || s[pe];
  const g = [h];
  for (; h.parentRoute; ) h = h.parentRoute, g.push(h);
  return g.reverse(), { matchedRoutes: g, routeParams: l, foundRoute: p };
}
class BaseRoute {
  constructor(e) {
    if (this.init = (e2) => {
      var n, r;
      this.originalIndex = e2.originalIndex;
      const a = this.options, o = !(null == a ? void 0 : a.path) && !(null == a ? void 0 : a.id);
      this.parentRoute = null == (r = (n = this.options).getParentRoute) ? void 0 : r.call(n), o ? this._path = pe : this.parentRoute || invariant(false);
      let s = o ? pe : null == a ? void 0 : a.path;
      s && "/" !== s && (s = trimPathLeft(s));
      const i = (null == a ? void 0 : a.id) || s;
      let c = o ? pe : joinPaths([this.parentRoute.id === pe ? "" : this.parentRoute.id, i]);
      s === pe && (s = "/"), c !== pe && (c = joinPaths(["/", c]));
      const l = c === pe ? "/" : joinPaths([this.parentRoute.fullPath, s]);
      this._path = s, this._id = c, this._fullPath = l, this._to = l;
    }, this.clone = (e2) => {
      this._path = e2._path, this._id = e2._id, this._fullPath = e2._fullPath, this._to = e2._to, this.options.getParentRoute = e2.options.getParentRoute, this.children = e2.children;
    }, this.addChildren = (e2) => this._addFileChildren(e2), this._addFileChildren = (e2) => (Array.isArray(e2) && (this.children = e2), "object" == typeof e2 && null !== e2 && (this.children = Object.values(e2)), this), this._addFileTypes = () => this, this.updateLoader = (e2) => (Object.assign(this.options, e2), this), this.update = (e2) => (Object.assign(this.options, e2), this), this.lazy = (e2) => (this.lazyFn = e2, this), this.options = e || {}, this.isRoot = !(null == e ? void 0 : e.getParentRoute), (null == e ? void 0 : e.id) && (null == e ? void 0 : e.path)) throw new Error("Route cannot have both an 'id' and a 'path' option.");
  }
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
}
class BaseRootRoute extends BaseRoute {
  constructor(e) {
    super(e);
  }
}
var ye = { exports: {} }, be = {}, xe = Symbol.for("react.transitional.element"), Se = Symbol.for("react.fragment");
function jsxProd(e, n, r) {
  var a = null;
  if (void 0 !== r && (a = "" + r), void 0 !== n.key && (a = "" + n.key), "key" in n) for (var o in r = {}, n) "key" !== o && (r[o] = n[o]);
  else r = n;
  return n = r.ref, { $$typeof: xe, type: e, key: a, ref: void 0 !== n ? n : null, props: r };
}
be.Fragment = Se, be.jsx = jsxProd, be.jsxs = jsxProd, ye.exports = be;
var ke = ye.exports, we = { exports: {} }, Ce = {}, Re = Symbol.for("react.transitional.element"), Pe = Symbol.for("react.portal"), Te = Symbol.for("react.fragment"), Ee = Symbol.for("react.strict_mode"), $e = Symbol.for("react.profiler"), Fe = Symbol.for("react.consumer"), _e = Symbol.for("react.context"), Ae = Symbol.for("react.forward_ref"), Oe = Symbol.for("react.suspense"), Ie = Symbol.for("react.memo"), Me = Symbol.for("react.lazy"), Ne = Symbol.iterator;
var De = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Be = Object.assign, ze = {};
function Component(e, n, r) {
  this.props = e, this.context = n, this.refs = ze, this.updater = r || De;
}
function ComponentDummy() {
}
function PureComponent(e, n, r) {
  this.props = e, this.context = n, this.refs = ze, this.updater = r || De;
}
Component.prototype.isReactComponent = {}, Component.prototype.setState = function(e, n) {
  if ("object" != typeof e && "function" != typeof e && null != e) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, n, "setState");
}, Component.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
}, ComponentDummy.prototype = Component.prototype;
var qe = PureComponent.prototype = new ComponentDummy();
qe.constructor = PureComponent, Be(qe, Component.prototype), qe.isPureReactComponent = true;
var He = Array.isArray, Ue = { H: null, A: null, T: null, S: null, V: null }, Ve = Object.prototype.hasOwnProperty;
function ReactElement(e, n, r, a, o, s) {
  return r = s.ref, { $$typeof: Re, type: e, key: n, ref: void 0 !== r ? r : null, props: s };
}
function isValidElement(e) {
  return "object" == typeof e && null !== e && e.$$typeof === Re;
}
var We = /\/+/g;
function getElementKey(e, n) {
  return "object" == typeof e && null !== e && null != e.key ? (r = "" + e.key, a = { "=": "=0", ":": "=2" }, "$" + r.replace(/[=:]/g, function(e2) {
    return a[e2];
  })) : n.toString(36);
  var r, a;
}
function noop$1$2() {
}
function mapIntoArray(e, n, r, a, o) {
  var s = typeof e;
  "undefined" !== s && "boolean" !== s || (e = null);
  var i, c, l = false;
  if (null === e) l = true;
  else switch (s) {
    case "bigint":
    case "string":
    case "number":
      l = true;
      break;
    case "object":
      switch (e.$$typeof) {
        case Re:
        case Pe:
          l = true;
          break;
        case Me:
          return mapIntoArray((l = e._init)(e._payload), n, r, a, o);
      }
  }
  if (l) return o = o(e), l = "" === a ? "." + getElementKey(e, 0) : a, He(o) ? (r = "", null != l && (r = l.replace(We, "$&/") + "/"), mapIntoArray(o, n, r, "", function(e2) {
    return e2;
  })) : null != o && (isValidElement(o) && (i = o, c = r + (null == o.key || e && e.key === o.key ? "" : ("" + o.key).replace(We, "$&/") + "/") + l, o = ReactElement(i.type, c, void 0, 0, 0, i.props)), n.push(o)), 1;
  l = 0;
  var u, p = "" === a ? "." : a + ":";
  if (He(e)) for (var h = 0; h < e.length; h++) l += mapIntoArray(a = e[h], n, r, s = p + getElementKey(a, h), o);
  else if ("function" == typeof (h = null === (u = e) || "object" != typeof u ? null : "function" == typeof (u = Ne && u[Ne] || u["@@iterator"]) ? u : null)) for (e = h.call(e), h = 0; !(a = e.next()).done; ) l += mapIntoArray(a = a.value, n, r, s = p + getElementKey(a, h++), o);
  else if ("object" === s) {
    if ("function" == typeof e.then) return mapIntoArray(function(e2) {
      switch (e2.status) {
        case "fulfilled":
          return e2.value;
        case "rejected":
          throw e2.reason;
        default:
          switch ("string" == typeof e2.status ? e2.then(noop$1$2, noop$1$2) : (e2.status = "pending", e2.then(function(n2) {
            "pending" === e2.status && (e2.status = "fulfilled", e2.value = n2);
          }, function(n2) {
            "pending" === e2.status && (e2.status = "rejected", e2.reason = n2);
          })), e2.status) {
            case "fulfilled":
              return e2.value;
            case "rejected":
              throw e2.reason;
          }
      }
      throw e2;
    }(e), n, r, a, o);
    throw n = String(e), Error("Objects are not valid as a React child (found: " + ("[object Object]" === n ? "object with keys {" + Object.keys(e).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
  }
  return l;
}
function mapChildren(e, n, r) {
  if (null == e) return e;
  var a = [], o = 0;
  return mapIntoArray(e, a, "", "", function(e2) {
    return n.call(r, e2, o++);
  }), a;
}
function lazyInitializer(e) {
  if (-1 === e._status) {
    var n = e._result;
    (n = n()).then(function(n2) {
      0 !== e._status && -1 !== e._status || (e._status = 1, e._result = n2);
    }, function(n2) {
      0 !== e._status && -1 !== e._status || (e._status = 2, e._result = n2);
    }), -1 === e._status && (e._status = 0, e._result = n);
  }
  if (1 === e._status) return e._result.default;
  throw e._result;
}
var Ke = "function" == typeof reportError ? reportError : function(n) {
  "object" != typeof S$1 || "function" != typeof S$1.emit ? console.error(n) : S$1.emit("uncaughtException", n);
};
function noop$9() {
}
Ce.Children = { map: mapChildren, forEach: function(e, n, r) {
  mapChildren(e, function() {
    n.apply(this, arguments);
  }, r);
}, count: function(e) {
  var n = 0;
  return mapChildren(e, function() {
    n++;
  }), n;
}, toArray: function(e) {
  return mapChildren(e, function(e2) {
    return e2;
  }) || [];
}, only: function(e) {
  if (!isValidElement(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} }, Ce.Component = Component, Ce.Fragment = Te, Ce.Profiler = $e, Ce.PureComponent = PureComponent, Ce.StrictMode = Ee, Ce.Suspense = Oe, Ce.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Ue, Ce.__COMPILER_RUNTIME = { __proto__: null, c: function(e) {
  return Ue.H.useMemoCache(e);
} }, Ce.cache = function(e) {
  return function() {
    return e.apply(null, arguments);
  };
}, Ce.cloneElement = function(e, n, r) {
  if (null == e) throw Error("The argument must be a React element, but you passed " + e + ".");
  var a = Be({}, e.props), o = e.key;
  if (null != n) for (s in void 0 !== n.ref && void 0, void 0 !== n.key && (o = "" + n.key), n) !Ve.call(n, s) || "key" === s || "__self" === s || "__source" === s || "ref" === s && void 0 === n.ref || (a[s] = n[s]);
  var s = arguments.length - 2;
  if (1 === s) a.children = r;
  else if (1 < s) {
    for (var i = Array(s), c = 0; c < s; c++) i[c] = arguments[c + 2];
    a.children = i;
  }
  return ReactElement(e.type, o, void 0, 0, 0, a);
}, Ce.createContext = function(e) {
  return (e = { $$typeof: _e, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null }).Provider = e, e.Consumer = { $$typeof: Fe, _context: e }, e;
}, Ce.createElement = function(e, n, r) {
  var a, o = {}, s = null;
  if (null != n) for (a in void 0 !== n.key && (s = "" + n.key), n) Ve.call(n, a) && "key" !== a && "__self" !== a && "__source" !== a && (o[a] = n[a]);
  var i = arguments.length - 2;
  if (1 === i) o.children = r;
  else if (1 < i) {
    for (var c = Array(i), l = 0; l < i; l++) c[l] = arguments[l + 2];
    o.children = c;
  }
  if (e && e.defaultProps) for (a in i = e.defaultProps) void 0 === o[a] && (o[a] = i[a]);
  return ReactElement(e, s, void 0, 0, 0, o);
}, Ce.createRef = function() {
  return { current: null };
}, Ce.forwardRef = function(e) {
  return { $$typeof: Ae, render: e };
}, Ce.isValidElement = isValidElement, Ce.lazy = function(e) {
  return { $$typeof: Me, _payload: { _status: -1, _result: e }, _init: lazyInitializer };
}, Ce.memo = function(e, n) {
  return { $$typeof: Ie, type: e, compare: void 0 === n ? null : n };
}, Ce.startTransition = function(e) {
  var n = Ue.T, r = {};
  Ue.T = r;
  try {
    var a = e(), o = Ue.S;
    null !== o && o(r, a), "object" == typeof a && null !== a && "function" == typeof a.then && a.then(noop$9, Ke);
  } catch (e2) {
    Ke(e2);
  } finally {
    Ue.T = n;
  }
}, Ce.unstable_useCacheRefresh = function() {
  return Ue.H.useCacheRefresh();
}, Ce.use = function(e) {
  return Ue.H.use(e);
}, Ce.useActionState = function(e, n, r) {
  return Ue.H.useActionState(e, n, r);
}, Ce.useCallback = function(e, n) {
  return Ue.H.useCallback(e, n);
}, Ce.useContext = function(e) {
  return Ue.H.useContext(e);
}, Ce.useDebugValue = function() {
}, Ce.useDeferredValue = function(e, n) {
  return Ue.H.useDeferredValue(e, n);
}, Ce.useEffect = function(e, n, r) {
  var a = Ue.H;
  if ("function" == typeof r) throw Error("useEffect CRUD overload is not enabled in this build of React.");
  return a.useEffect(e, n);
}, Ce.useId = function() {
  return Ue.H.useId();
}, Ce.useImperativeHandle = function(e, n, r) {
  return Ue.H.useImperativeHandle(e, n, r);
}, Ce.useInsertionEffect = function(e, n) {
  return Ue.H.useInsertionEffect(e, n);
}, Ce.useLayoutEffect = function(e, n) {
  return Ue.H.useLayoutEffect(e, n);
}, Ce.useMemo = function(e, n) {
  return Ue.H.useMemo(e, n);
}, Ce.useOptimistic = function(e, n) {
  return Ue.H.useOptimistic(e, n);
}, Ce.useReducer = function(e, n, r) {
  return Ue.H.useReducer(e, n, r);
}, Ce.useRef = function(e) {
  return Ue.H.useRef(e);
}, Ce.useState = function(e) {
  return Ue.H.useState(e);
}, Ce.useSyncExternalStore = function(e, n, r) {
  return Ue.H.useSyncExternalStore(e, n, r);
}, Ce.useTransition = function() {
  return Ue.H.useTransition();
}, Ce.version = "19.1.1", we.exports = Ce;
var Ge = we.exports;
const Qe = getDefaultExportFromCjs(Ge);
function CatchBoundary(e) {
  const n = e.errorComponent ?? ErrorComponent;
  return ke.jsx(CatchBoundaryImpl, { getResetKey: e.getResetKey, onCatch: e.onCatch, children: ({ error: r, reset: a }) => r ? Ge.createElement(n, { error: r, reset: a }) : e.children });
}
class CatchBoundaryImpl extends Ge.Component {
  constructor() {
    super(...arguments), this.state = { error: null };
  }
  static getDerivedStateFromProps(e) {
    return { resetKey: e.getResetKey() };
  }
  static getDerivedStateFromError(e) {
    return { error: e };
  }
  reset() {
    this.setState({ error: null });
  }
  componentDidUpdate(e, n) {
    n.error && n.resetKey !== this.state.resetKey && this.reset();
  }
  componentDidCatch(e, n) {
    this.props.onCatch && this.props.onCatch(e, n);
  }
  render() {
    return this.props.children({ error: this.state.resetKey !== this.props.getResetKey() ? null : this.state.error, reset: () => {
      this.reset();
    } });
  }
}
function ErrorComponent({ error: e }) {
  const [n, r] = Ge.useState(false);
  return ke.jsxs("div", { style: { padding: ".5rem", maxWidth: "100%" }, children: [ke.jsxs("div", { style: { display: "flex", alignItems: "center", gap: ".5rem" }, children: [ke.jsx("strong", { style: { fontSize: "1rem" }, children: "Something went wrong!" }), ke.jsx("button", { style: { appearance: "none", fontSize: ".6em", border: "1px solid currentColor", padding: ".1rem .2rem", fontWeight: "bold", borderRadius: ".25rem" }, onClick: () => r((e2) => !e2), children: n ? "Hide Error" : "Show Error" })] }), ke.jsx("div", { style: { height: ".25rem" } }), n ? ke.jsx("div", { children: ke.jsx("pre", { style: { fontSize: ".7em", border: "1px solid red", borderRadius: ".25rem", padding: ".3rem", color: "red", overflow: "auto" }, children: e.message ? ke.jsx("code", { children: e.message }) : null }) }) : null] });
}
function ClientOnly({ children: e, fallback: n = null }) {
  return Qe.useSyncExternalStore(subscribe, () => true, () => false) ? ke.jsx(Qe.Fragment, { children: e }) : ke.jsx(Qe.Fragment, { children: n });
}
function subscribe() {
  return () => {
  };
}
var Je = { exports: {} }, Xe = {}, Ze = { exports: {} }, et = {}, tt = Ge;
tt.useState, tt.useEffect, tt.useLayoutEffect, tt.useDebugValue;
var shim$1 = function(e, n) {
  return n();
};
et.useSyncExternalStore = void 0 !== tt.useSyncExternalStore ? tt.useSyncExternalStore : shim$1, Ze.exports = et;
var nt = Ze.exports, rt = Ge, at = nt;
var ot = "function" == typeof Object.is ? Object.is : function(e, n) {
  return e === n && (0 !== e || 1 / e == 1 / n) || e != e && n != n;
}, st = at.useSyncExternalStore, it = rt.useRef, ct = rt.useEffect, lt = rt.useMemo, ut = rt.useDebugValue;
Xe.useSyncExternalStoreWithSelector = function(e, n, r, a, o) {
  var s = it(null);
  if (null === s.current) {
    var i = { hasValue: false, value: null };
    s.current = i;
  } else i = s.current;
  s = lt(function() {
    function memoizedSelector(n2) {
      if (!c2) {
        if (c2 = true, e2 = n2, n2 = a(n2), void 0 !== o && i.hasValue) {
          var r2 = i.value;
          if (o(r2, n2)) return s2 = r2;
        }
        return s2 = n2;
      }
      if (r2 = s2, ot(e2, n2)) return r2;
      var l2 = a(n2);
      return void 0 !== o && o(r2, l2) ? (e2 = n2, r2) : (e2 = n2, s2 = l2);
    }
    var e2, s2, c2 = false, l = void 0 === r ? null : r;
    return [function() {
      return memoizedSelector(n());
    }, null === l ? void 0 : function() {
      return memoizedSelector(l());
    }];
  }, [n, r, a, o]);
  var c = st(e, s[0], s[1]);
  return ct(function() {
    i.hasValue = true, i.value = c;
  }, [c]), ut(c), c;
}, Je.exports = Xe;
var pt = Je.exports;
function shallow(e, n) {
  if (Object.is(e, n)) return true;
  if ("object" != typeof e || null === e || "object" != typeof n || null === n) return false;
  if (e instanceof Map && n instanceof Map) {
    if (e.size !== n.size) return false;
    for (const [r2, a] of e) if (!n.has(r2) || !Object.is(a, n.get(r2))) return false;
    return true;
  }
  if (e instanceof Set && n instanceof Set) {
    if (e.size !== n.size) return false;
    for (const r2 of e) if (!n.has(r2)) return false;
    return true;
  }
  if (e instanceof Date && n instanceof Date) return e.getTime() === n.getTime();
  const r = Object.keys(e);
  if (r.length !== Object.keys(n).length) return false;
  for (let a = 0; a < r.length; a++) if (!Object.prototype.hasOwnProperty.call(n, r[a]) || !Object.is(e[r[a]], n[r[a]])) return false;
  return true;
}
const dt = Ge.createContext(null);
function getRouterContext() {
  return "undefined" == typeof document ? dt : window.__TSR_ROUTER_CONTEXT__ ? window.__TSR_ROUTER_CONTEXT__ : (window.__TSR_ROUTER_CONTEXT__ = dt, dt);
}
function useRouter(e) {
  const n = Ge.useContext(getRouterContext());
  return N(!(((null == e ? void 0 : e.warn) ?? 1) && !n), "useRouter must be used inside a <RouterProvider> component!"), n;
}
function useRouterState(e) {
  const n = useRouter({ warn: void 0 === (null == e ? void 0 : e.router) }), r = (null == e ? void 0 : e.router) || n, a = Ge.useRef(void 0);
  return function(e2, n2 = (e3) => e3) {
    return pt.useSyncExternalStoreWithSelector(e2.subscribe, () => e2.state, () => e2.state, n2, shallow);
  }(r.__store, (n2) => {
    if (null == e ? void 0 : e.select) {
      if (e.structuralSharing ?? r.options.defaultStructuralSharing) {
        const r2 = replaceEqualDeep$1(a.current, e.select(n2));
        return a.current = r2, r2;
      }
      return e.select(n2);
    }
    return n2;
  });
}
const ht = Ge.createContext(void 0), mt = Ge.createContext(void 0);
function useMatch(e) {
  const n = Ge.useContext(e.from ? mt : ht), r = useRouterState({ select: (r2) => {
    const a = r2.matches.find((r3) => e.from ? e.from === r3.routeId : r3.id === n);
    if (invariant(!((e.shouldThrow ?? 1) && !a), e.from && e.from), void 0 !== a) return e.select ? e.select(a) : a;
  }, structuralSharing: e.structuralSharing });
  return r;
}
function useLoaderData(e) {
  return useMatch({ from: e.from, strict: e.strict, structuralSharing: e.structuralSharing, select: (n) => e.select ? e.select(n.loaderData) : n.loaderData });
}
function useLoaderDeps(e) {
  const { select: n, ...r } = e;
  return useMatch({ ...r, select: (e2) => n ? n(e2.loaderDeps) : e2.loaderDeps });
}
function useParams(e) {
  return useMatch({ from: e.from, strict: e.strict, shouldThrow: e.shouldThrow, structuralSharing: e.structuralSharing, select: (n) => e.select ? e.select(n.params) : n.params });
}
function useSearch(e) {
  return useMatch({ from: e.from, strict: e.strict, shouldThrow: e.shouldThrow, structuralSharing: e.structuralSharing, select: (n) => e.select ? e.select(n.search) : n.search });
}
function useNavigate(e) {
  const { navigate: n, state: r } = useRouter(), a = useMatch({ strict: false, select: (e2) => e2.index });
  return Ge.useCallback((o) => {
    const s = o.from ?? (null == e ? void 0 : e.from) ?? r.matches[a].fullPath;
    return n({ ...o, from: s });
  }, [null == e ? void 0 : e.from, n]);
}
var ft = { exports: {} }, gt = {}, vt = Ge;
function formatProdErrorMessage$1(e) {
  var n = "https://react.dev/errors/" + e;
  if (1 < arguments.length) {
    n += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var r = 2; r < arguments.length; r++) n += "&args[]=" + encodeURIComponent(arguments[r]);
  }
  return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function noop$8() {
}
var yt = { d: { f: noop$8, r: function() {
  throw Error(formatProdErrorMessage$1(522));
}, D: noop$8, C: noop$8, L: noop$8, m: noop$8, X: noop$8, S: noop$8, M: noop$8 }, p: 0, findDOMNode: null }, bt = Symbol.for("react.portal");
var xt = vt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
function getCrossOriginStringAs(e, n) {
  return "font" === e ? "" : "string" == typeof n ? "use-credentials" === n ? n : "" : void 0;
}
gt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = yt, gt.createPortal = function(e, n) {
  var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!n || 1 !== n.nodeType && 9 !== n.nodeType && 11 !== n.nodeType) throw Error(formatProdErrorMessage$1(299));
  return function(e2, n2, r2) {
    var a = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
    return { $$typeof: bt, key: null == a ? null : "" + a, children: e2, containerInfo: n2, implementation: r2 };
  }(e, n, null, r);
}, gt.flushSync = function(e) {
  var n = xt.T, r = yt.p;
  try {
    if (xt.T = null, yt.p = 2, e) return e();
  } finally {
    xt.T = n, yt.p = r, yt.d.f();
  }
}, gt.preconnect = function(e, n) {
  "string" == typeof e && (n ? n = "string" == typeof (n = n.crossOrigin) ? "use-credentials" === n ? n : "" : void 0 : n = null, yt.d.C(e, n));
}, gt.prefetchDNS = function(e) {
  "string" == typeof e && yt.d.D(e);
}, gt.preinit = function(e, n) {
  if ("string" == typeof e && n && "string" == typeof n.as) {
    var r = n.as, a = getCrossOriginStringAs(r, n.crossOrigin), o = "string" == typeof n.integrity ? n.integrity : void 0, s = "string" == typeof n.fetchPriority ? n.fetchPriority : void 0;
    "style" === r ? yt.d.S(e, "string" == typeof n.precedence ? n.precedence : void 0, { crossOrigin: a, integrity: o, fetchPriority: s }) : "script" === r && yt.d.X(e, { crossOrigin: a, integrity: o, fetchPriority: s, nonce: "string" == typeof n.nonce ? n.nonce : void 0 });
  }
}, gt.preinitModule = function(e, n) {
  if ("string" == typeof e) if ("object" == typeof n && null !== n) {
    if (null == n.as || "script" === n.as) {
      var r = getCrossOriginStringAs(n.as, n.crossOrigin);
      yt.d.M(e, { crossOrigin: r, integrity: "string" == typeof n.integrity ? n.integrity : void 0, nonce: "string" == typeof n.nonce ? n.nonce : void 0 });
    }
  } else null == n && yt.d.M(e);
}, gt.preload = function(e, n) {
  if ("string" == typeof e && "object" == typeof n && null !== n && "string" == typeof n.as) {
    var r = n.as, a = getCrossOriginStringAs(r, n.crossOrigin);
    yt.d.L(e, r, { crossOrigin: a, integrity: "string" == typeof n.integrity ? n.integrity : void 0, nonce: "string" == typeof n.nonce ? n.nonce : void 0, type: "string" == typeof n.type ? n.type : void 0, fetchPriority: "string" == typeof n.fetchPriority ? n.fetchPriority : void 0, referrerPolicy: "string" == typeof n.referrerPolicy ? n.referrerPolicy : void 0, imageSrcSet: "string" == typeof n.imageSrcSet ? n.imageSrcSet : void 0, imageSizes: "string" == typeof n.imageSizes ? n.imageSizes : void 0, media: "string" == typeof n.media ? n.media : void 0 });
  }
}, gt.preloadModule = function(e, n) {
  if ("string" == typeof e) if (n) {
    var r = getCrossOriginStringAs(n.as, n.crossOrigin);
    yt.d.m(e, { as: "string" == typeof n.as && "script" !== n.as ? n.as : void 0, crossOrigin: r, integrity: "string" == typeof n.integrity ? n.integrity : void 0 });
  } else yt.d.m(e);
}, gt.requestFormReset = function(e) {
  yt.d.r(e);
}, gt.unstable_batchedUpdates = function(e, n) {
  return e(n);
}, gt.useFormState = function(e, n, r) {
  return xt.H.useFormState(e, n, r);
}, gt.useFormStatus = function() {
  return xt.H.useHostTransitionStatus();
}, gt.version = "19.1.1", function checkDCE() {
  if ("undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE) try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (e) {
    console.error(e);
  }
}(), ft.exports = gt;
var St = ft.exports;
const kt = Ge.useEffect;
function usePrevious(e) {
  const n = Ge.useRef({ value: e, prev: null }), r = n.current.value;
  return e !== r && (n.current = { value: e, prev: r }), n.current.prev;
}
function useLinkProps(e, n) {
  const r = useRouter(), [a, o] = Ge.useState(false), s = Ge.useRef(false), i = function(e2) {
    const n2 = Ge.useRef(null);
    return Ge.useImperativeHandle(e2, () => n2.current, []), n2;
  }(n), { activeProps: c, inactiveProps: l, activeOptions: u, to: p, preload: h, preloadDelay: g, hashScrollIntoView: v, replace: y, startTransition: b2, resetScroll: k, viewTransition: C, children: R2, target: P2, disabled: T, style: E2, className: $2, onClick: F, onFocus: A, onMouseEnter: O, onMouseLeave: I2, onTouchStart: N2, ignoreBlocker: D2, params: B2, search: q2, hash: H2, state: V2, mask: W2, reloadDocument: G2, unsafeRelative: Q2, from: X2, _fromLocation: Y2, ...Z2 } = e, ee2 = Ge.useMemo(() => {
    try {
      return new URL(p), "external";
    } catch {
    }
    return "internal";
  }, [p]), te2 = useRouterState({ select: (e2) => e2.location.search, structuralSharing: true }), ne2 = useMatch({ strict: false, select: (n2) => e.from ?? n2.fullPath }), re2 = Ge.useMemo(() => r.buildLocation({ ...e, from: ne2 }), [r, te2, e._fromLocation, ne2, e.hash, e.to, e.search, e.params, e.state, e.mask, e.unsafeRelative]), ae2 = "external" === ee2, oe2 = !e.reloadDocument && !ae2 && (h ?? r.options.defaultPreload), ie2 = g ?? r.options.defaultPreloadDelay ?? 0, ce2 = useRouterState({ select: (e2) => {
    if (ae2) return false;
    if (null == u ? void 0 : u.exact) {
      if (!(n2 = e2.location.pathname, a2 = re2.pathname, o2 = r.basepath, removeTrailingSlash(n2, o2) === removeTrailingSlash(a2, o2))) return false;
    } else {
      const n3 = removeTrailingSlash(e2.location.pathname, r.basepath), a3 = removeTrailingSlash(re2.pathname, r.basepath);
      if (!(n3.startsWith(a3) && (n3.length === a3.length || "/" === n3[a3.length]))) return false;
    }
    var n2, a2, o2;
    if ((null == u ? void 0 : u.includeSearch) ?? 1) {
      if (!deepEqual(e2.location.search, re2.search, { partial: !(null == u ? void 0 : u.exact), ignoreUndefined: !(null == u ? void 0 : u.explicitUndefined) })) return false;
    }
    return !(null == u ? void 0 : u.includeHash) || e2.location.hash === re2.hash;
  } }), le2 = Ge.useCallback(() => {
    r.preloadRoute({ ...e, from: ne2 }).catch((e2) => {
      console.warn(e2), console.warn("Error preloading route! ☝️");
    });
  }, [r, e.to, e._fromLocation, ne2, e.search, e.hash, e.params, e.state, e.mask, e.unsafeRelative, e.hashScrollIntoView, e.href, e.ignoreBlocker, e.reloadDocument, e.replace, e.resetScroll, e.viewTransition]);
  if (function(e2, n2, r2 = {}, a2 = {}) {
    Ge.useEffect(() => {
      if (!e2.current || a2.disabled || "function" != typeof IntersectionObserver) return;
      const o2 = new IntersectionObserver(([e3]) => {
        n2(e3);
      }, r2);
      return o2.observe(e2.current), () => {
        o2.disconnect();
      };
    }, [n2, r2, a2.disabled, e2]);
  }(i, Ge.useCallback((e2) => {
    (null == e2 ? void 0 : e2.isIntersecting) && le2();
  }, [le2]), $t, { disabled: !(!T && "viewport" === oe2) }), Ge.useEffect(() => {
    s.current || T || "render" !== oe2 || (le2(), s.current = true);
  }, [T, le2, oe2]), ae2) return { ...Z2, ref: i, type: ee2, href: p, ...R2 && { children: R2 }, ...P2 && { target: P2 }, ...T && { disabled: T }, ...E2 && { style: E2 }, ...$2 && { className: $2 }, ...F && { onClick: F }, ...A && { onFocus: A }, ...O && { onMouseEnter: O }, ...I2 && { onMouseLeave: I2 }, ...N2 && { onTouchStart: N2 } };
  const handleFocus = (e2) => {
    T || oe2 && le2();
  }, ue2 = handleFocus, pe2 = ce2 ? functionalUpdate$1(c, {}) ?? Ct : wt, de2 = ce2 ? wt : functionalUpdate$1(l, {}) ?? wt, he2 = [$2, pe2.className, de2.className].filter(Boolean).join(" "), ge2 = (E2 || pe2.style || de2.style) && { ...E2, ...pe2.style, ...de2.style };
  return { ...Z2, ...pe2, ...de2, href: T ? void 0 : re2.maskedLocation ? r.history.createHref(re2.maskedLocation.href) : r.history.createHref(re2.href), ref: i, onClick: composeHandlers([F, (n2) => {
    if (!(T || function(e2) {
      return !!(e2.metaKey || e2.altKey || e2.ctrlKey || e2.shiftKey);
    }(n2) || n2.defaultPrevented || P2 && "_self" !== P2 || 0 !== n2.button)) {
      n2.preventDefault(), St.flushSync(() => {
        o(true);
      });
      const a2 = r.subscribe("onResolved", () => {
        a2(), o(false);
      });
      r.navigate({ ...e, from: ne2, replace: y, resetScroll: k, hashScrollIntoView: v, startTransition: b2, viewTransition: C, ignoreBlocker: D2 });
    }
  }]), onFocus: composeHandlers([A, handleFocus]), onMouseEnter: composeHandlers([O, (e2) => {
    if (!T && oe2) if (ie2) {
      const n2 = e2.target;
      if (Et.has(n2)) return;
      const r2 = setTimeout(() => {
        Et.delete(n2), le2();
      }, ie2);
      Et.set(n2, r2);
    } else le2();
  }]), onMouseLeave: composeHandlers([I2, (e2) => {
    if (T || !oe2 || !ie2) return;
    const n2 = e2.target, r2 = Et.get(n2);
    r2 && (clearTimeout(r2), Et.delete(n2));
  }]), onTouchStart: composeHandlers([N2, ue2]), disabled: !!T, target: P2, ...ge2 && { style: ge2 }, ...he2 && { className: he2 }, ...T && Rt, ...ce2 && Pt, ...a && Tt };
}
const wt = {}, Ct = { className: "active" }, Rt = { role: "link", "aria-disabled": true }, Pt = { "data-status": "active", "aria-current": "page" }, Tt = { "data-transitioning": "transitioning" }, Et = /* @__PURE__ */ new WeakMap(), $t = { rootMargin: "100px" }, composeHandlers = (e) => (n) => {
  e.filter(Boolean).forEach((e2) => {
    n.defaultPrevented || e2(n);
  });
}, Ft = Ge.forwardRef((e, n) => {
  const { _asChild: r, ...a } = e, { type: o, ref: s, ...i } = useLinkProps(a, n), c = "function" == typeof a.children ? a.children({ isActive: "active" === i["data-status"] }) : a.children;
  return void 0 === r && delete i.disabled, Ge.createElement(r || "a", { ...i, ref: s }, c);
});
let _t = class extends BaseRoute {
  constructor(e) {
    super(e), this.useMatch = (e2) => useMatch({ select: null == e2 ? void 0 : e2.select, from: this.id, structuralSharing: null == e2 ? void 0 : e2.structuralSharing }), this.useRouteContext = (e2) => useMatch({ ...e2, from: this.id, select: (n) => (null == e2 ? void 0 : e2.select) ? e2.select(n.context) : n.context }), this.useSearch = (e2) => useSearch({ select: null == e2 ? void 0 : e2.select, structuralSharing: null == e2 ? void 0 : e2.structuralSharing, from: this.id }), this.useParams = (e2) => useParams({ select: null == e2 ? void 0 : e2.select, structuralSharing: null == e2 ? void 0 : e2.structuralSharing, from: this.id }), this.useLoaderDeps = (e2) => useLoaderDeps({ ...e2, from: this.id }), this.useLoaderData = (e2) => useLoaderData({ ...e2, from: this.id }), this.useNavigate = () => useNavigate({ from: this.fullPath }), this.Link = Qe.forwardRef((e2, n) => ke.jsx(Ft, { ref: n, from: this.fullPath, ...e2 })), this.$$typeof = Symbol.for("react.memo");
  }
};
class RootRoute extends BaseRootRoute {
  constructor(e) {
    super(e), this.useMatch = (e2) => useMatch({ select: null == e2 ? void 0 : e2.select, from: this.id, structuralSharing: null == e2 ? void 0 : e2.structuralSharing }), this.useRouteContext = (e2) => useMatch({ ...e2, from: this.id, select: (n) => (null == e2 ? void 0 : e2.select) ? e2.select(n.context) : n.context }), this.useSearch = (e2) => useSearch({ select: null == e2 ? void 0 : e2.select, structuralSharing: null == e2 ? void 0 : e2.structuralSharing, from: this.id }), this.useParams = (e2) => useParams({ select: null == e2 ? void 0 : e2.select, structuralSharing: null == e2 ? void 0 : e2.structuralSharing, from: this.id }), this.useLoaderDeps = (e2) => useLoaderDeps({ ...e2, from: this.id }), this.useLoaderData = (e2) => useLoaderData({ ...e2, from: this.id }), this.useNavigate = () => useNavigate({ from: this.fullPath }), this.Link = Qe.forwardRef((e2, n) => ke.jsx(Ft, { ref: n, from: this.fullPath, ...e2 })), this.$$typeof = Symbol.for("react.memo");
  }
}
function createFileRoute(e) {
  return "object" == typeof e ? new FileRoute(e, { silent: true }).createRoute(e) : new FileRoute(e, { silent: true }).createRoute;
}
class FileRoute {
  constructor(e, n) {
    this.path = e, this.createRoute = (e2) => {
      N(this.silent, "FileRoute is deprecated and will be removed in the next major version. Use the createFileRoute(path)(options) function instead.");
      const n2 = function(e3) {
        return new _t(e3);
      }(e2);
      return n2.isRoot = false, n2;
    }, this.silent = null == n ? void 0 : n.silent;
  }
}
class LazyRoute {
  constructor(e) {
    this.useMatch = (e2) => useMatch({ select: null == e2 ? void 0 : e2.select, from: this.options.id, structuralSharing: null == e2 ? void 0 : e2.structuralSharing }), this.useRouteContext = (e2) => useMatch({ from: this.options.id, select: (n) => (null == e2 ? void 0 : e2.select) ? e2.select(n.context) : n.context }), this.useSearch = (e2) => useSearch({ select: null == e2 ? void 0 : e2.select, structuralSharing: null == e2 ? void 0 : e2.structuralSharing, from: this.options.id }), this.useParams = (e2) => useParams({ select: null == e2 ? void 0 : e2.select, structuralSharing: null == e2 ? void 0 : e2.structuralSharing, from: this.options.id }), this.useLoaderDeps = (e2) => useLoaderDeps({ ...e2, from: this.options.id }), this.useLoaderData = (e2) => useLoaderData({ ...e2, from: this.options.id }), this.useNavigate = () => useNavigate({ from: useRouter().routesById[this.options.id].fullPath }), this.options = e, this.$$typeof = Symbol.for("react.memo");
  }
}
function lazyRouteComponent(e, n) {
  let r, a, o;
  const load = () => (r || (r = e().then((e2) => {
    r = void 0, a = e2[n];
  }).catch((e2) => {
    o = e2, function(e3) {
      "string" == typeof (null == e3 ? void 0 : e3.message) && (e3.message.startsWith("Failed to fetch dynamically imported module") || e3.message.startsWith("error loading dynamically imported module") || e3.message.startsWith("Importing a module script failed"));
    }(o);
  })), r), lazyComp = function(e2) {
    if (o) throw o;
    if (!a) throw load();
    return Ge.createElement(a, e2);
  };
  return lazyComp.preload = load, lazyComp;
}
function Transitioner() {
  const e = useRouter(), n = Ge.useRef({ router: e, mounted: false }), [r, a] = Ge.useState(false), { hasPendingMatches: o, isLoading: s } = useRouterState({ select: (e2) => ({ isLoading: e2.isLoading, hasPendingMatches: e2.matches.some((e3) => "pending" === e3.status) }), structuralSharing: true }), i = usePrevious(s), c = s || r || o, l = usePrevious(c), u = s || o, p = usePrevious(u);
  return e.startTransition = (e2) => {
    a(true), Ge.startTransition(() => {
      e2(), a(false);
    });
  }, Ge.useEffect(() => {
    const n2 = e.history.subscribe(e.load), r2 = e.buildLocation({ to: e.latestLocation.pathname, search: true, params: true, hash: true, state: true, _includeValidateSearch: true });
    return trimPathRight(e.latestLocation.href) !== trimPathRight(r2.href) && e.commitLocation({ ...r2, replace: true }), () => {
      n2();
    };
  }, [e, e.history]), kt(() => {
    if (n.current.router === e && n.current.mounted) return;
    n.current = { router: e, mounted: true };
    (async () => {
      try {
        await e.load();
      } catch (e2) {
        console.error(e2);
      }
    })();
  }, [e]), kt(() => {
    i && !s && e.emit({ type: "onLoad", ...getLocationChangeInfo(e.state) });
  }, [i, e, s]), kt(() => {
    p && !u && e.emit({ type: "onBeforeRouteMount", ...getLocationChangeInfo(e.state) });
  }, [u, p, e]), kt(() => {
    l && !c && (e.emit({ type: "onResolved", ...getLocationChangeInfo(e.state) }), e.__store.setState((e2) => ({ ...e2, status: "idle", resolvedLocation: e2.location })), function(e2) {
      if ("undefined" != typeof document && document.querySelector) {
        const n2 = e2.state.location.state.__hashScrollIntoViewOptions ?? true;
        if (n2 && "" !== e2.state.location.hash) {
          const r2 = document.getElementById(e2.state.location.hash);
          r2 && r2.scrollIntoView(n2);
        }
      }
    }(e));
  }, [c, l, e]), null;
}
function CatchNotFound(e) {
  const n = useRouterState({ select: (e2) => `not-found-${e2.location.pathname}-${e2.status}` });
  return ke.jsx(CatchBoundary, { getResetKey: () => n, onCatch: (n2, r) => {
    var a;
    if (!isNotFound(n2)) throw n2;
    null == (a = e.onCatch) || a.call(e, n2, r);
  }, errorComponent: ({ error: n2 }) => {
    var r;
    if (isNotFound(n2)) return null == (r = e.fallback) ? void 0 : r.call(e, n2);
    throw n2;
  }, children: e.children });
}
function DefaultGlobalNotFound() {
  return ke.jsx("p", { children: "Not Found" });
}
function SafeFragment(e) {
  return ke.jsx(ke.Fragment, { children: e.children });
}
function renderRouteNotFound(e, n, r) {
  return n.options.notFoundComponent ? ke.jsx(n.options.notFoundComponent, { data: r }) : e.options.defaultNotFoundComponent ? ke.jsx(e.options.defaultNotFoundComponent, { data: r }) : ke.jsx(DefaultGlobalNotFound, {});
}
function ScriptOnce({ children: e }) {
  return "undefined" != typeof document ? null : ke.jsx("script", { className: "$tsr", dangerouslySetInnerHTML: { __html: [e].filter(Boolean).join("\n") } });
}
function ScrollRestoration() {
  const e = useRouter(), n = (e.options.getScrollRestorationKey || defaultGetScrollRestorationKey)(e.latestLocation), r = n !== defaultGetScrollRestorationKey(e.latestLocation) ? n : void 0;
  if (!e.isScrollRestoring || !e.isServer) return null;
  const a = { storageKey: ae, shouldScrollRestoration: true };
  return r && (a.key = r), ke.jsx(ScriptOnce, { children: `(${restoreScroll.toString()})(${JSON.stringify(a)})` });
}
const At = Ge.memo(function({ matchId: e }) {
  var n, r;
  const a = useRouter(), o = useRouterState({ select: (n2) => {
    const r2 = n2.matches.find((n3) => n3.id === e);
    return invariant(r2), pick(r2, ["routeId", "ssr", "_displayPending"]);
  }, structuralSharing: true }), s = a.routesById[o.routeId], i = s.options.pendingComponent ?? a.options.defaultPendingComponent, c = i ? ke.jsx(i, {}) : null, l = s.options.errorComponent ?? a.options.defaultErrorComponent, u = s.options.onCatch ?? a.options.defaultOnCatch, p = s.isRoot ? s.options.notFoundComponent ?? (null == (n = a.options.notFoundRoute) ? void 0 : n.options.component) : s.options.notFoundComponent, h = false === o.ssr || "data-only" === o.ssr, g = (!s.isRoot || s.options.wrapInSuspense || h) && (s.options.wrapInSuspense ?? i ?? ((null == (r = s.options.errorComponent) ? void 0 : r.preload) || h)) ? Ge.Suspense : SafeFragment, v = l ? CatchBoundary : SafeFragment, y = p ? CatchNotFound : SafeFragment, b2 = useRouterState({ select: (e2) => e2.loadedAt }), k = useRouterState({ select: (n2) => {
    var r2;
    const a2 = n2.matches.findIndex((n3) => n3.id === e);
    return null == (r2 = n2.matches[a2 - 1]) ? void 0 : r2.routeId;
  } }), C = s.isRoot ? s.options.shellComponent ?? SafeFragment : SafeFragment;
  return ke.jsxs(C, { children: [ke.jsx(ht.Provider, { value: e, children: ke.jsx(g, { fallback: c, children: ke.jsx(v, { getResetKey: () => b2, errorComponent: l || ErrorComponent, onCatch: (n2, r2) => {
    if (isNotFound(n2)) throw n2;
    N(false, `Error in route match: ${e}`), null == u || u(n2, r2);
  }, children: ke.jsx(y, { fallback: (e2) => {
    if (!p || e2.routeId && e2.routeId !== o.routeId || !e2.routeId && !s.isRoot) throw e2;
    return Ge.createElement(p, e2);
  }, children: h || o._displayPending ? ke.jsx(ClientOnly, { fallback: c, children: ke.jsx(Ot, { matchId: e }) }) : ke.jsx(Ot, { matchId: e }) }) }) }) }), k === pe && a.options.scrollRestoration ? ke.jsxs(ke.Fragment, { children: [ke.jsx(OnRendered, {}), ke.jsx(ScrollRestoration, {})] }) : null] });
});
function OnRendered() {
  const e = useRouter(), n = Ge.useRef(void 0);
  return ke.jsx("script", { suppressHydrationWarning: true, ref: (r) => {
    !r || void 0 !== n.current && n.current.href === e.latestLocation.href || (e.emit({ type: "onRendered", ...getLocationChangeInfo(e.state) }), n.current = e.latestLocation);
  } }, e.latestLocation.state.__TSR_key);
}
const Ot = Ge.memo(function({ matchId: e }) {
  var n, r, a, o, s;
  const i = useRouter(), { match: c, key: l, routeId: u } = useRouterState({ select: (n2) => {
    const r2 = n2.matches.findIndex((n3) => n3.id === e), a2 = n2.matches[r2], o2 = a2.routeId, s2 = i.routesById[o2].options.remountDeps ?? i.options.defaultRemountDeps, c2 = null == s2 ? void 0 : s2({ routeId: o2, loaderDeps: a2.loaderDeps, params: a2._strictParams, search: a2._strictSearch });
    return { key: c2 ? JSON.stringify(c2) : void 0, routeId: o2, match: pick(a2, ["id", "status", "error", "_forcePending", "_displayPending"]) };
  }, structuralSharing: true }), p = i.routesById[u], h = Ge.useMemo(() => {
    const e2 = p.options.component ?? i.options.defaultComponent;
    return e2 ? ke.jsx(e2, {}, l) : ke.jsx(jt, {});
  }, [l, p.options.component, i.options.defaultComponent]);
  if (c._displayPending) throw null == (n = i.getMatch(c.id)) ? void 0 : n.displayPendingPromise;
  if (c._forcePending) throw null == (r = i.getMatch(c.id)) ? void 0 : r.minPendingPromise;
  if ("pending" === c.status) {
    const e2 = p.options.pendingMinMs ?? i.options.defaultPendingMinMs;
    if (e2 && !(null == (a = i.getMatch(c.id)) ? void 0 : a.minPendingPromise) && !i.isServer) {
      const n2 = createControlledPromise();
      Promise.resolve().then(() => {
        i.updateMatch(c.id, (e3) => ({ ...e3, minPendingPromise: n2 }));
      }), setTimeout(() => {
        n2.resolve(), i.updateMatch(c.id, (e3) => ({ ...e3, minPendingPromise: void 0 }));
      }, e2);
    }
    throw null == (o = i.getMatch(c.id)) ? void 0 : o.loadPromise;
  }
  if ("notFound" === c.status) return invariant(isNotFound(c.error)), renderRouteNotFound(i, p, c.error);
  if ("redirected" === c.status) throw invariant(isRedirect(c.error)), null == (s = i.getMatch(c.id)) ? void 0 : s.loadPromise;
  if ("error" === c.status) {
    if (i.isServer) {
      const e2 = (p.options.errorComponent ?? i.options.defaultErrorComponent) || ErrorComponent;
      return ke.jsx(e2, { error: c.error, reset: void 0, info: { componentStack: "" } });
    }
    throw c.error;
  }
  return h;
}), jt = Ge.memo(function() {
  const e = useRouter(), n = Ge.useContext(ht), r = useRouterState({ select: (e2) => {
    var r2;
    return null == (r2 = e2.matches.find((e3) => e3.id === n)) ? void 0 : r2.routeId;
  } }), a = e.routesById[r], o = useRouterState({ select: (e2) => {
    const r2 = e2.matches.find((e3) => e3.id === n);
    return invariant(r2), r2.globalNotFound;
  } }), s = useRouterState({ select: (e2) => {
    var r2;
    const a2 = e2.matches, o2 = a2.findIndex((e3) => e3.id === n);
    return null == (r2 = a2[o2 + 1]) ? void 0 : r2.id;
  } }), i = e.options.defaultPendingComponent ? ke.jsx(e.options.defaultPendingComponent, {}) : null;
  if (o) return renderRouteNotFound(e, a, void 0);
  if (!s) return null;
  const c = ke.jsx(At, { matchId: s });
  return n === pe ? ke.jsx(Ge.Suspense, { fallback: i, children: c }) : c;
});
function Matches() {
  const e = useRouter(), n = e.options.defaultPendingComponent ? ke.jsx(e.options.defaultPendingComponent, {}) : null, r = e.isServer || "undefined" != typeof document && e.ssr ? SafeFragment : Ge.Suspense, a = ke.jsxs(r, { fallback: n, children: [!e.isServer && ke.jsx(Transitioner, {}), ke.jsx(MatchesInner, {})] });
  return e.options.InnerWrap ? ke.jsx(e.options.InnerWrap, { children: a }) : a;
}
function MatchesInner() {
  const e = useRouter(), n = useRouterState({ select: (e2) => {
    var n2;
    return null == (n2 = e2.matches[0]) ? void 0 : n2.id;
  } }), r = useRouterState({ select: (e2) => e2.loadedAt }), a = n ? ke.jsx(At, { matchId: n }) : null;
  return ke.jsx(ht.Provider, { value: n, children: e.options.disableGlobalCatchBoundary ? a : ke.jsx(CatchBoundary, { getResetKey: () => r, errorComponent: ErrorComponent, onCatch: (e2) => {
    N(false, "The following error wasn't caught by any route! At the very least, consider setting an 'errorComponent' in your RootRoute!"), N(false, e2.message || e2.toString());
  }, children: a }) });
}
class Router extends RouterCore {
  constructor(e) {
    super(e);
  }
}
function RouterContextProvider({ router: e, children: n, ...r }) {
  Object.keys(r).length > 0 && e.update({ ...e.options, ...r, context: { ...e.options.context, ...r.context } });
  const a = getRouterContext(), o = ke.jsx(a.Provider, { value: e, children: n });
  return e.options.Wrap ? ke.jsx(e.options.Wrap, { children: o }) : o;
}
function RouterProvider({ router: e, ...n }) {
  return ke.jsx(RouterContextProvider, { router: e, ...n, children: ke.jsx(Matches, {}) });
}
function Asset({ tag: e, attrs: n, children: r }) {
  switch (e) {
    case "title":
      return ke.jsx("title", { ...n, suppressHydrationWarning: true, children: r });
    case "meta":
      return ke.jsx("meta", { ...n, suppressHydrationWarning: true });
    case "link":
      return ke.jsx("link", { ...n, suppressHydrationWarning: true });
    case "style":
      return ke.jsx("style", { ...n, dangerouslySetInnerHTML: { __html: r } });
    case "script":
      return ke.jsx(Script, { attrs: n, children: r });
    default:
      return null;
  }
}
function Script({ attrs: e, children: n }) {
  return Ge.useEffect(() => {
    if (null == e ? void 0 : e.src) {
      const n2 = document.createElement("script");
      for (const [r, a] of Object.entries(e)) "suppressHydrationWarning" !== r && void 0 !== a && false !== a && n2.setAttribute(r, "boolean" == typeof a ? "" : String(a));
      return document.head.appendChild(n2), () => {
        n2.parentNode && n2.parentNode.removeChild(n2);
      };
    }
    if ("string" == typeof n) {
      const r = document.createElement("script");
      if (r.textContent = n, e) for (const [n2, a] of Object.entries(e)) "suppressHydrationWarning" !== n2 && void 0 !== a && false !== a && r.setAttribute(n2, "boolean" == typeof a ? "" : String(a));
      return document.head.appendChild(r), () => {
        r.parentNode && r.parentNode.removeChild(r);
      };
    }
  }, [e, n]), (null == e ? void 0 : e.src) && "string" == typeof e.src ? ke.jsx("script", { ...e, suppressHydrationWarning: true }) : "string" == typeof n ? ke.jsx("script", { ...e, dangerouslySetInnerHTML: { __html: n }, suppressHydrationWarning: true }) : null;
}
"undefined" != typeof globalThis && (globalThis.createFileRoute = createFileRoute, globalThis.createLazyFileRoute = function(e) {
  return "object" == typeof e ? new LazyRoute(e) : (n) => new LazyRoute({ id: e, ...n });
});
const useTags = () => {
  const e = useRouter(), n = useRouterState({ select: (e2) => e2.matches.map((e3) => e3.meta).filter(Boolean) }), r = Ge.useMemo(() => {
    const e2 = [], r2 = {};
    let a2;
    return [...n].reverse().forEach((n2) => {
      [...n2].reverse().forEach((n3) => {
        if (n3) if (n3.title) a2 || (a2 = { tag: "title", children: n3.title });
        else {
          const a3 = n3.name ?? n3.property;
          if (a3) {
            if (r2[a3]) return;
            r2[a3] = true;
          }
          e2.push({ tag: "meta", attrs: { ...n3 } });
        }
      });
    }), a2 && e2.push(a2), e2.reverse(), e2;
  }, [n]), a = useRouterState({ select: (n2) => {
    var r2;
    const a2 = n2.matches.map((e2) => e2.links).filter(Boolean).flat(1).map((e2) => ({ tag: "link", attrs: { ...e2 } })), o2 = null == (r2 = e.ssr) ? void 0 : r2.manifest;
    return [...a2, ...n2.matches.map((e2) => {
      var n3;
      return (null == (n3 = null == o2 ? void 0 : o2.routes[e2.routeId]) ? void 0 : n3.assets) ?? [];
    }).filter(Boolean).flat(1).filter((e2) => "link" === e2.tag).map((e2) => ({ tag: "link", attrs: { ...e2.attrs, suppressHydrationWarning: true } }))];
  }, structuralSharing: true }), o = useRouterState({ select: (n2) => {
    const r2 = [];
    return n2.matches.map((n3) => e.looseRoutesById[n3.routeId]).forEach((n3) => {
      var a2, o2, s2, i2;
      return null == (i2 = null == (s2 = null == (o2 = null == (a2 = e.ssr) ? void 0 : a2.manifest) ? void 0 : o2.routes[n3.id]) ? void 0 : s2.preloads) ? void 0 : i2.filter(Boolean).forEach((e2) => {
        r2.push({ tag: "link", attrs: { rel: "modulepreload", href: e2 } });
      });
    }), r2;
  }, structuralSharing: true }), s = useRouterState({ select: (e2) => e2.matches.map((e3) => e3.styles).flat(1).filter(Boolean).map(({ children: e3, ...n2 }) => ({ tag: "style", attrs: n2, children: e3 })), structuralSharing: true }), i = useRouterState({ select: (e2) => e2.matches.map((e3) => e3.headScripts).flat(1).filter(Boolean).map(({ children: e3, ...n2 }) => ({ tag: "script", attrs: { ...n2 }, children: e3 })), structuralSharing: true });
  return function(e2, n2) {
    const r2 = /* @__PURE__ */ new Set();
    return e2.filter((e3) => {
      const a2 = n2(e3);
      return !r2.has(a2) && (r2.add(a2), true);
    });
  }([...r, ...o, ...a, ...s, ...i], (e2) => JSON.stringify(e2));
};
function HeadContent() {
  return useTags().map((e) => Ge.createElement(Asset, { ...e, key: `tsr-meta-${JSON.stringify(e)}` }));
}
const Scripts = () => {
  const e = useRouter(), n = useRouterState({ select: (n2) => {
    var r2;
    const a2 = [], o = null == (r2 = e.ssr) ? void 0 : r2.manifest;
    return o ? (n2.matches.map((n3) => e.looseRoutesById[n3.routeId]).forEach((e2) => {
      var n3, r3;
      return null == (r3 = null == (n3 = o.routes[e2.id]) ? void 0 : n3.assets) ? void 0 : r3.filter((e3) => "script" === e3.tag).forEach((e3) => {
        a2.push({ tag: "script", attrs: e3.attrs, children: e3.children });
      });
    }), a2) : [];
  }, structuralSharing: true }), { scripts: r } = useRouterState({ select: (e2) => ({ scripts: e2.matches.map((e3) => e3.scripts).flat(1).filter(Boolean).map(({ children: e3, ...n2 }) => ({ tag: "script", attrs: { ...n2, suppressHydrationWarning: true }, children: e3 })) }), structuralSharing: true }), a = [...r, ...n];
  return ke.jsx(ke.Fragment, { children: a.map((e2, n2) => Ge.createElement(Asset, { ...e2, key: `tsr-scripts-${e2.tag}-${n2}` })) });
};
var It = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  subscribe(e) {
    return this.listeners.add(e), this.onSubscribe(), () => {
      this.listeners.delete(e), this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};
function noop$7() {
}
function resolveStaleTime(e, n) {
  return "function" == typeof e ? e(n) : e;
}
function resolveEnabled(e, n) {
  return "function" == typeof e ? e(n) : e;
}
function matchQuery(e, n) {
  const { type: r = "all", exact: a, fetchStatus: o, predicate: s, queryKey: i, stale: c } = e;
  if (i) {
    if (a) {
      if (n.queryHash !== hashQueryKeyByOptions(i, n.options)) return false;
    } else if (!partialMatchKey(n.queryKey, i)) return false;
  }
  if ("all" !== r) {
    const e2 = n.isActive();
    if ("active" === r && !e2) return false;
    if ("inactive" === r && e2) return false;
  }
  return ("boolean" != typeof c || n.isStale() === c) && ((!o || o === n.state.fetchStatus) && !(s && !s(n)));
}
function matchMutation(e, n) {
  const { exact: r, status: a, predicate: o, mutationKey: s } = e;
  if (s) {
    if (!n.options.mutationKey) return false;
    if (r) {
      if (hashKey(n.options.mutationKey) !== hashKey(s)) return false;
    } else if (!partialMatchKey(n.options.mutationKey, s)) return false;
  }
  return (!a || n.state.status === a) && !(o && !o(n));
}
function hashQueryKeyByOptions(e, n) {
  return (n?.queryKeyHashFn || hashKey)(e);
}
function hashKey(e) {
  return JSON.stringify(e, (e2, n) => isPlainObject$1(n) ? Object.keys(n).sort().reduce((e3, r) => (e3[r] = n[r], e3), {}) : n);
}
function partialMatchKey(e, n) {
  return e === n || typeof e == typeof n && (!(!e || !n || "object" != typeof e || "object" != typeof n) && Object.keys(n).every((r) => partialMatchKey(e[r], n[r])));
}
function replaceEqualDeep(e, n) {
  if (e === n) return e;
  const r = isPlainArray(e) && isPlainArray(n);
  if (r || isPlainObject$1(e) && isPlainObject$1(n)) {
    const a = r ? e : Object.keys(e), o = a.length, s = r ? n : Object.keys(n), i = s.length, c = r ? [] : {}, l = new Set(a);
    let u = 0;
    for (let a2 = 0; a2 < i; a2++) {
      const o2 = r ? a2 : s[a2];
      (!r && l.has(o2) || r) && void 0 === e[o2] && void 0 === n[o2] ? (c[o2] = void 0, u++) : (c[o2] = replaceEqualDeep(e[o2], n[o2]), c[o2] === e[o2] && void 0 !== e[o2] && u++);
    }
    return o === i && u === o ? e : c;
  }
  return n;
}
function shallowEqualObjects(e, n) {
  if (!n || Object.keys(e).length !== Object.keys(n).length) return false;
  for (const r in e) if (e[r] !== n[r]) return false;
  return true;
}
function isPlainArray(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function isPlainObject$1(e) {
  if (!hasObjectPrototype(e)) return false;
  const n = e.constructor;
  if (void 0 === n) return true;
  const r = n.prototype;
  return !!hasObjectPrototype(r) && (!!r.hasOwnProperty("isPrototypeOf") && Object.getPrototypeOf(e) === Object.prototype);
}
function hasObjectPrototype(e) {
  return "[object Object]" === Object.prototype.toString.call(e);
}
function replaceData(e, n, r) {
  return "function" == typeof r.structuralSharing ? r.structuralSharing(e, n) : false !== r.structuralSharing ? replaceEqualDeep(e, n) : n;
}
function addToEnd(e, n, r = 0) {
  const a = [...e, n];
  return r && a.length > r ? a.slice(1) : a;
}
function addToStart(e, n, r = 0) {
  const a = [n, ...e];
  return r && a.length > r ? a.slice(0, -1) : a;
}
var Mt = Symbol();
function ensureQueryFn(e, n) {
  return !e.queryFn && n?.initialPromise ? () => n.initialPromise : e.queryFn && e.queryFn !== Mt ? e.queryFn : () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`));
}
function shouldThrowError(e, n) {
  return "function" == typeof e ? e(...n) : !!e;
}
var Lt = new class extends It {
  #e;
  #t;
  #n;
  constructor() {
    super(), this.#n = (e) => {
    };
  }
  onSubscribe() {
    this.#t || this.setEventListener(this.#n);
  }
  onUnsubscribe() {
    this.hasListeners() || (this.#t?.(), this.#t = void 0);
  }
  setEventListener(e) {
    this.#n = e, this.#t?.(), this.#t = e((e2) => {
      "boolean" == typeof e2 ? this.setFocused(e2) : this.onFocus();
    });
  }
  setFocused(e) {
    this.#e !== e && (this.#e = e, this.onFocus());
  }
  onFocus() {
    const e = this.isFocused();
    this.listeners.forEach((n) => {
      n(e);
    });
  }
  isFocused() {
    return "boolean" == typeof this.#e ? this.#e : "hidden" !== globalThis.document?.visibilityState;
  }
}(), Nt = new class extends It {
  #r = true;
  #t;
  #n;
  constructor() {
    super(), this.#n = (e) => {
    };
  }
  onSubscribe() {
    this.#t || this.setEventListener(this.#n);
  }
  onUnsubscribe() {
    this.hasListeners() || (this.#t?.(), this.#t = void 0);
  }
  setEventListener(e) {
    this.#n = e, this.#t?.(), this.#t = e(this.setOnline.bind(this));
  }
  setOnline(e) {
    this.#r !== e && (this.#r = e, this.listeners.forEach((n) => {
      n(e);
    }));
  }
  isOnline() {
    return this.#r;
  }
}();
function pendingThenable() {
  let e, n;
  const r = new Promise((r2, a) => {
    e = r2, n = a;
  });
  function finalize(e2) {
    Object.assign(r, e2), delete r.resolve, delete r.reject;
  }
  return r.status = "pending", r.catch(() => {
  }), r.resolve = (n2) => {
    finalize({ status: "fulfilled", value: n2 }), e(n2);
  }, r.reject = (e2) => {
    finalize({ status: "rejected", reason: e2 }), n(e2);
  }, r;
}
function defaultRetryDelay(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function canFetch(e) {
  return "online" !== (e ?? "online") || Nt.isOnline();
}
var Dt = class extends Error {
  constructor(e) {
    super("CancelledError"), this.revert = e?.revert, this.silent = e?.silent;
  }
};
function isCancelledError(e) {
  return e instanceof Dt;
}
function createRetryer(e) {
  let n, r = false, a = 0, o = false;
  const s = pendingThenable(), canContinue = () => Lt.isFocused() && ("always" === e.networkMode || Nt.isOnline()) && e.canRun(), canStart = () => canFetch(e.networkMode) && e.canRun(), resolve = (r2) => {
    o || (o = true, e.onSuccess?.(r2), n?.(), s.resolve(r2));
  }, reject = (r2) => {
    o || (o = true, e.onError?.(r2), n?.(), s.reject(r2));
  }, pause = () => new Promise((r2) => {
    n = (e2) => {
      (o || canContinue()) && r2(e2);
    }, e.onPause?.();
  }).then(() => {
    n = void 0, o || e.onContinue?.();
  }), run = () => {
    if (o) return;
    let n2;
    const s2 = 0 === a ? e.initialPromise : void 0;
    try {
      n2 = s2 ?? e.fn();
    } catch (e2) {
      n2 = Promise.reject(e2);
    }
    Promise.resolve(n2).then(resolve).catch((n3) => {
      if (o) return;
      const s3 = e.retry ?? 0, i = e.retryDelay ?? defaultRetryDelay, c = "function" == typeof i ? i(a, n3) : i, l = true === s3 || "number" == typeof s3 && a < s3 || "function" == typeof s3 && s3(a, n3);
      var u;
      !r && l ? (a++, e.onFail?.(a, n3), (u = c, new Promise((e2) => {
        setTimeout(e2, u);
      })).then(() => canContinue() ? void 0 : pause()).then(() => {
        r ? reject(n3) : run();
      })) : reject(n3);
    });
  };
  return { promise: s, cancel: (n2) => {
    o || (reject(new Dt(n2)), e.abort?.());
  }, continue: () => (n?.(), s), cancelRetry: () => {
    r = true;
  }, continueRetry: () => {
    r = false;
  }, canStart, start: () => (canStart() ? run() : pause().then(run), s) };
}
var defaultScheduler = (e) => setTimeout(e, 0);
var Bt = /* @__PURE__ */ function() {
  let e = [], n = 0, notifyFn = (e2) => {
    e2();
  }, batchNotifyFn = (e2) => {
    e2();
  }, r = defaultScheduler;
  const schedule = (a) => {
    n ? e.push(a) : r(() => {
      notifyFn(a);
    });
  };
  return { batch: (a) => {
    let o;
    n++;
    try {
      o = a();
    } finally {
      n--, n || (() => {
        const n2 = e;
        e = [], n2.length && r(() => {
          batchNotifyFn(() => {
            n2.forEach((e2) => {
              notifyFn(e2);
            });
          });
        });
      })();
    }
    return o;
  }, batchCalls: (e2) => (...n2) => {
    schedule(() => {
      e2(...n2);
    });
  }, schedule, setNotifyFunction: (e2) => {
    notifyFn = e2;
  }, setBatchNotifyFunction: (e2) => {
    batchNotifyFn = e2;
  }, setScheduler: (e2) => {
    r = e2;
  } };
}(), zt = class {
  #a;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    var e;
    this.clearGcTimeout(), "number" == typeof (e = this.gcTime) && e >= 0 && e !== 1 / 0 && (this.#a = setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }
  updateGcTime(e) {
    this.gcTime = Math.max(this.gcTime || 0, e ?? 1 / 0);
  }
  clearGcTimeout() {
    this.#a && (clearTimeout(this.#a), this.#a = void 0);
  }
}, qt = class extends zt {
  #o;
  #s;
  #i;
  #c;
  #l;
  #u;
  #p;
  constructor(e) {
    super(), this.#p = false, this.#u = e.defaultOptions, this.setOptions(e.options), this.observers = [], this.#c = e.client, this.#i = this.#c.getQueryCache(), this.queryKey = e.queryKey, this.queryHash = e.queryHash, this.#o = function(e2) {
      const n = "function" == typeof e2.initialData ? e2.initialData() : e2.initialData, r = void 0 !== n, a = r ? "function" == typeof e2.initialDataUpdatedAt ? e2.initialDataUpdatedAt() : e2.initialDataUpdatedAt : 0;
      return { data: n, dataUpdateCount: 0, dataUpdatedAt: r ? a ?? Date.now() : 0, error: null, errorUpdateCount: 0, errorUpdatedAt: 0, fetchFailureCount: 0, fetchFailureReason: null, fetchMeta: null, isInvalidated: false, status: r ? "success" : "pending", fetchStatus: "idle" };
    }(this.options), this.state = e.state ?? this.#o, this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    return this.#l?.promise;
  }
  setOptions(e) {
    this.options = { ...this.#u, ...e }, this.updateGcTime(this.options.gcTime);
  }
  optionalRemove() {
    this.observers.length || "idle" !== this.state.fetchStatus || this.#i.remove(this);
  }
  setData(e, n) {
    const r = replaceData(this.state.data, e, this.options);
    return this.#d({ data: r, type: "success", dataUpdatedAt: n?.updatedAt, manual: n?.manual }), r;
  }
  setState(e, n) {
    this.#d({ type: "setState", state: e, setStateOptions: n });
  }
  cancel(e) {
    const n = this.#l?.promise;
    return this.#l?.cancel(e), n ? n.then(noop$7).catch(noop$7) : Promise.resolve();
  }
  destroy() {
    super.destroy(), this.cancel({ silent: true });
  }
  reset() {
    this.destroy(), this.setState(this.#o);
  }
  isActive() {
    return this.observers.some((e) => false !== resolveEnabled(e.options.enabled, this));
  }
  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === Mt || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStatic() {
    return this.getObserversCount() > 0 && this.observers.some((e) => "static" === resolveStaleTime(e.options.staleTime, this));
  }
  isStale() {
    return this.getObserversCount() > 0 ? this.observers.some((e) => e.getCurrentResult().isStale) : void 0 === this.state.data || this.state.isInvalidated;
  }
  isStaleByTime(e = 0) {
    return void 0 === this.state.data || "static" !== e && (!!this.state.isInvalidated || !function(e2, n) {
      return Math.max(e2 + (n || 0) - Date.now(), 0);
    }(this.state.dataUpdatedAt, e));
  }
  onFocus() {
    const e = this.observers.find((e2) => e2.shouldFetchOnWindowFocus());
    e?.refetch({ cancelRefetch: false }), this.#l?.continue();
  }
  onOnline() {
    const e = this.observers.find((e2) => e2.shouldFetchOnReconnect());
    e?.refetch({ cancelRefetch: false }), this.#l?.continue();
  }
  addObserver(e) {
    this.observers.includes(e) || (this.observers.push(e), this.clearGcTimeout(), this.#i.notify({ type: "observerAdded", query: this, observer: e }));
  }
  removeObserver(e) {
    this.observers.includes(e) && (this.observers = this.observers.filter((n) => n !== e), this.observers.length || (this.#l && (this.#p ? this.#l.cancel({ revert: true }) : this.#l.cancelRetry()), this.scheduleGc()), this.#i.notify({ type: "observerRemoved", query: this, observer: e }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    this.state.isInvalidated || this.#d({ type: "invalidate" });
  }
  fetch(e, n) {
    if ("idle" !== this.state.fetchStatus) {
      if (void 0 !== this.state.data && n?.cancelRefetch) this.cancel({ silent: true });
      else if (this.#l) return this.#l.continueRetry(), this.#l.promise;
    }
    if (e && this.setOptions(e), !this.options.queryFn) {
      const e2 = this.observers.find((e3) => e3.options.queryFn);
      e2 && this.setOptions(e2.options);
    }
    const r = new AbortController(), addSignalProperty = (e2) => {
      Object.defineProperty(e2, "signal", { enumerable: true, get: () => (this.#p = true, r.signal) });
    }, fetchFn = () => {
      const e2 = ensureQueryFn(this.options, n), r2 = (() => {
        const e3 = { client: this.#c, queryKey: this.queryKey, meta: this.meta };
        return addSignalProperty(e3), e3;
      })();
      return this.#p = false, this.options.persister ? this.options.persister(e2, r2, this) : e2(r2);
    }, a = (() => {
      const e2 = { fetchOptions: n, options: this.options, queryKey: this.queryKey, client: this.#c, state: this.state, fetchFn };
      return addSignalProperty(e2), e2;
    })();
    this.options.behavior?.onFetch(a, this), this.#s = this.state, "idle" !== this.state.fetchStatus && this.state.fetchMeta === a.fetchOptions?.meta || this.#d({ type: "fetch", meta: a.fetchOptions?.meta });
    const onError2 = (e2) => {
      isCancelledError(e2) && e2.silent || this.#d({ type: "error", error: e2 }), isCancelledError(e2) || (this.#i.config.onError?.(e2, this), this.#i.config.onSettled?.(this.state.data, e2, this)), this.scheduleGc();
    };
    return this.#l = createRetryer({ initialPromise: n?.initialPromise, fn: a.fetchFn, abort: r.abort.bind(r), onSuccess: (e2) => {
      if (void 0 !== e2) {
        try {
          this.setData(e2);
        } catch (e3) {
          return void onError2(e3);
        }
        this.#i.config.onSuccess?.(e2, this), this.#i.config.onSettled?.(e2, this.state.error, this), this.scheduleGc();
      } else onError2(new Error(`${this.queryHash} data is undefined`));
    }, onError: onError2, onFail: (e2, n2) => {
      this.#d({ type: "failed", failureCount: e2, error: n2 });
    }, onPause: () => {
      this.#d({ type: "pause" });
    }, onContinue: () => {
      this.#d({ type: "continue" });
    }, retry: a.options.retry, retryDelay: a.options.retryDelay, networkMode: a.options.networkMode, canRun: () => true }), this.#l.start();
  }
  #d(e) {
    this.state = ((n) => {
      switch (e.type) {
        case "failed":
          return { ...n, fetchFailureCount: e.failureCount, fetchFailureReason: e.error };
        case "pause":
          return { ...n, fetchStatus: "paused" };
        case "continue":
          return { ...n, fetchStatus: "fetching" };
        case "fetch":
          return { ...n, ...fetchState(n.data, this.options), fetchMeta: e.meta ?? null };
        case "success":
          return this.#s = void 0, { ...n, data: e.data, dataUpdateCount: n.dataUpdateCount + 1, dataUpdatedAt: e.dataUpdatedAt ?? Date.now(), error: null, isInvalidated: false, status: "success", ...!e.manual && { fetchStatus: "idle", fetchFailureCount: 0, fetchFailureReason: null } };
        case "error":
          const r = e.error;
          return isCancelledError(r) && r.revert && this.#s ? { ...this.#s, fetchStatus: "idle" } : { ...n, error: r, errorUpdateCount: n.errorUpdateCount + 1, errorUpdatedAt: Date.now(), fetchFailureCount: n.fetchFailureCount + 1, fetchFailureReason: r, fetchStatus: "idle", status: "error" };
        case "invalidate":
          return { ...n, isInvalidated: true };
        case "setState":
          return { ...n, ...e.state };
      }
    })(this.state), Bt.batch(() => {
      this.observers.forEach((e2) => {
        e2.onQueryUpdate();
      }), this.#i.notify({ query: this, type: "updated", action: e });
    });
  }
};
function fetchState(e, n) {
  return { fetchFailureCount: 0, fetchFailureReason: null, fetchStatus: canFetch(n.networkMode) ? "fetching" : "paused", ...void 0 === e && { error: null, status: "pending" } };
}
var Ht = class extends It {
  constructor(e = {}) {
    super(), this.config = e, this.#h = /* @__PURE__ */ new Map();
  }
  #h;
  build(e, n, r) {
    const a = n.queryKey, o = n.queryHash ?? hashQueryKeyByOptions(a, n);
    let s = this.get(o);
    return s || (s = new qt({ client: e, queryKey: a, queryHash: o, options: e.defaultQueryOptions(n), state: r, defaultOptions: e.getQueryDefaults(a) }), this.add(s)), s;
  }
  add(e) {
    this.#h.has(e.queryHash) || (this.#h.set(e.queryHash, e), this.notify({ type: "added", query: e }));
  }
  remove(e) {
    const n = this.#h.get(e.queryHash);
    n && (e.destroy(), n === e && this.#h.delete(e.queryHash), this.notify({ type: "removed", query: e }));
  }
  clear() {
    Bt.batch(() => {
      this.getAll().forEach((e) => {
        this.remove(e);
      });
    });
  }
  get(e) {
    return this.#h.get(e);
  }
  getAll() {
    return [...this.#h.values()];
  }
  find(e) {
    const n = { exact: true, ...e };
    return this.getAll().find((e2) => matchQuery(n, e2));
  }
  findAll(e = {}) {
    const n = this.getAll();
    return Object.keys(e).length > 0 ? n.filter((n2) => matchQuery(e, n2)) : n;
  }
  notify(e) {
    Bt.batch(() => {
      this.listeners.forEach((n) => {
        n(e);
      });
    });
  }
  onFocus() {
    Bt.batch(() => {
      this.getAll().forEach((e) => {
        e.onFocus();
      });
    });
  }
  onOnline() {
    Bt.batch(() => {
      this.getAll().forEach((e) => {
        e.onOnline();
      });
    });
  }
}, Ut = class extends zt {
  #m;
  #f;
  #l;
  constructor(e) {
    super(), this.mutationId = e.mutationId, this.#f = e.mutationCache, this.#m = [], this.state = e.state || { context: void 0, data: void 0, error: null, failureCount: 0, failureReason: null, isPaused: false, status: "idle", variables: void 0, submittedAt: 0 }, this.setOptions(e.options), this.scheduleGc();
  }
  setOptions(e) {
    this.options = e, this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(e) {
    this.#m.includes(e) || (this.#m.push(e), this.clearGcTimeout(), this.#f.notify({ type: "observerAdded", mutation: this, observer: e }));
  }
  removeObserver(e) {
    this.#m = this.#m.filter((n) => n !== e), this.scheduleGc(), this.#f.notify({ type: "observerRemoved", mutation: this, observer: e });
  }
  optionalRemove() {
    this.#m.length || ("pending" === this.state.status ? this.scheduleGc() : this.#f.remove(this));
  }
  continue() {
    return this.#l?.continue() ?? this.execute(this.state.variables);
  }
  async execute(e) {
    const onContinue = () => {
      this.#d({ type: "continue" });
    };
    this.#l = createRetryer({ fn: () => this.options.mutationFn ? this.options.mutationFn(e) : Promise.reject(new Error("No mutationFn found")), onFail: (e2, n2) => {
      this.#d({ type: "failed", failureCount: e2, error: n2 });
    }, onPause: () => {
      this.#d({ type: "pause" });
    }, onContinue, retry: this.options.retry ?? 0, retryDelay: this.options.retryDelay, networkMode: this.options.networkMode, canRun: () => this.#f.canRun(this) });
    const n = "pending" === this.state.status, r = !this.#l.canStart();
    try {
      if (n) onContinue();
      else {
        this.#d({ type: "pending", variables: e, isPaused: r }), await this.#f.config.onMutate?.(e, this);
        const n2 = await this.options.onMutate?.(e);
        n2 !== this.state.context && this.#d({ type: "pending", context: n2, variables: e, isPaused: r });
      }
      const a = await this.#l.start();
      return await this.#f.config.onSuccess?.(a, e, this.state.context, this), await this.options.onSuccess?.(a, e, this.state.context), await this.#f.config.onSettled?.(a, null, this.state.variables, this.state.context, this), await this.options.onSettled?.(a, null, e, this.state.context), this.#d({ type: "success", data: a }), a;
    } catch (n2) {
      try {
        throw await this.#f.config.onError?.(n2, e, this.state.context, this), await this.options.onError?.(n2, e, this.state.context), await this.#f.config.onSettled?.(void 0, n2, this.state.variables, this.state.context, this), await this.options.onSettled?.(void 0, n2, e, this.state.context), n2;
      } finally {
        this.#d({ type: "error", error: n2 });
      }
    } finally {
      this.#f.runNext(this);
    }
  }
  #d(e) {
    this.state = ((n) => {
      switch (e.type) {
        case "failed":
          return { ...n, failureCount: e.failureCount, failureReason: e.error };
        case "pause":
          return { ...n, isPaused: true };
        case "continue":
          return { ...n, isPaused: false };
        case "pending":
          return { ...n, context: e.context, data: void 0, failureCount: 0, failureReason: null, error: null, isPaused: e.isPaused, status: "pending", variables: e.variables, submittedAt: Date.now() };
        case "success":
          return { ...n, data: e.data, failureCount: 0, failureReason: null, error: null, status: "success", isPaused: false };
        case "error":
          return { ...n, data: void 0, error: e.error, failureCount: n.failureCount + 1, failureReason: e.error, isPaused: false, status: "error" };
      }
    })(this.state), Bt.batch(() => {
      this.#m.forEach((n) => {
        n.onMutationUpdate(e);
      }), this.#f.notify({ mutation: this, type: "updated", action: e });
    });
  }
};
var Vt = class extends It {
  constructor(e = {}) {
    super(), this.config = e, this.#g = /* @__PURE__ */ new Set(), this.#v = /* @__PURE__ */ new Map(), this.#y = 0;
  }
  #g;
  #v;
  #y;
  build(e, n, r) {
    const a = new Ut({ mutationCache: this, mutationId: ++this.#y, options: e.defaultMutationOptions(n), state: r });
    return this.add(a), a;
  }
  add(e) {
    this.#g.add(e);
    const n = scopeFor(e);
    if ("string" == typeof n) {
      const r = this.#v.get(n);
      r ? r.push(e) : this.#v.set(n, [e]);
    }
    this.notify({ type: "added", mutation: e });
  }
  remove(e) {
    if (this.#g.delete(e)) {
      const n = scopeFor(e);
      if ("string" == typeof n) {
        const r = this.#v.get(n);
        if (r) if (r.length > 1) {
          const n2 = r.indexOf(e);
          -1 !== n2 && r.splice(n2, 1);
        } else r[0] === e && this.#v.delete(n);
      }
    }
    this.notify({ type: "removed", mutation: e });
  }
  canRun(e) {
    const n = scopeFor(e);
    if ("string" == typeof n) {
      const r = this.#v.get(n), a = r?.find((e2) => "pending" === e2.state.status);
      return !a || a === e;
    }
    return true;
  }
  runNext(e) {
    const n = scopeFor(e);
    if ("string" == typeof n) {
      const r = this.#v.get(n)?.find((n2) => n2 !== e && n2.state.isPaused);
      return r?.continue() ?? Promise.resolve();
    }
    return Promise.resolve();
  }
  clear() {
    Bt.batch(() => {
      this.#g.forEach((e) => {
        this.notify({ type: "removed", mutation: e });
      }), this.#g.clear(), this.#v.clear();
    });
  }
  getAll() {
    return Array.from(this.#g);
  }
  find(e) {
    const n = { exact: true, ...e };
    return this.getAll().find((e2) => matchMutation(n, e2));
  }
  findAll(e = {}) {
    return this.getAll().filter((n) => matchMutation(e, n));
  }
  notify(e) {
    Bt.batch(() => {
      this.listeners.forEach((n) => {
        n(e);
      });
    });
  }
  resumePausedMutations() {
    const e = this.getAll().filter((e2) => e2.state.isPaused);
    return Bt.batch(() => Promise.all(e.map((e2) => e2.continue().catch(noop$7))));
  }
};
function scopeFor(e) {
  return e.options.scope?.id;
}
function infiniteQueryBehavior(e) {
  return { onFetch: (n, r) => {
    const a = n.options, o = n.fetchOptions?.meta?.fetchMore?.direction, s = n.state.data?.pages || [], i = n.state.data?.pageParams || [];
    let c = { pages: [], pageParams: [] }, l = 0;
    const fetchFn = async () => {
      let r2 = false;
      const u = ensureQueryFn(n.options, n.fetchOptions), fetchPage = async (e2, a2, o2) => {
        if (r2) return Promise.reject();
        if (null == a2 && e2.pages.length) return Promise.resolve(e2);
        const s2 = (() => {
          const e3 = { client: n.client, queryKey: n.queryKey, pageParam: a2, direction: o2 ? "backward" : "forward", meta: n.options.meta };
          var s3;
          return s3 = e3, Object.defineProperty(s3, "signal", { enumerable: true, get: () => (n.signal.aborted ? r2 = true : n.signal.addEventListener("abort", () => {
            r2 = true;
          }), n.signal) }), e3;
        })(), i2 = await u(s2), { maxPages: c2 } = n.options, l2 = o2 ? addToStart : addToEnd;
        return { pages: l2(e2.pages, i2, c2), pageParams: l2(e2.pageParams, a2, c2) };
      };
      if (o && s.length) {
        const e2 = "backward" === o, n2 = { pages: s, pageParams: i }, r3 = (e2 ? getPreviousPageParam : getNextPageParam)(a, n2);
        c = await fetchPage(n2, r3, e2);
      } else {
        const n2 = e ?? s.length;
        do {
          const e2 = 0 === l ? i[0] ?? a.initialPageParam : getNextPageParam(a, c);
          if (l > 0 && null == e2) break;
          c = await fetchPage(c, e2), l++;
        } while (l < n2);
      }
      return c;
    };
    n.options.persister ? n.fetchFn = () => n.options.persister?.(fetchFn, { client: n.client, queryKey: n.queryKey, meta: n.options.meta, signal: n.signal }, r) : n.fetchFn = fetchFn;
  } };
}
function getNextPageParam(e, { pages: n, pageParams: r }) {
  const a = n.length - 1;
  return n.length > 0 ? e.getNextPageParam(n[a], n, r[a], r) : void 0;
}
function getPreviousPageParam(e, { pages: n, pageParams: r }) {
  return n.length > 0 ? e.getPreviousPageParam?.(n[0], n, r[0], r) : void 0;
}
var Wt = class {
  #b;
  #f;
  #u;
  #x;
  #S;
  #k;
  #w;
  #C;
  constructor(e = {}) {
    this.#b = e.queryCache || new Ht(), this.#f = e.mutationCache || new Vt(), this.#u = e.defaultOptions || {}, this.#x = /* @__PURE__ */ new Map(), this.#S = /* @__PURE__ */ new Map(), this.#k = 0;
  }
  mount() {
    this.#k++, 1 === this.#k && (this.#w = Lt.subscribe(async (e) => {
      e && (await this.resumePausedMutations(), this.#b.onFocus());
    }), this.#C = Nt.subscribe(async (e) => {
      e && (await this.resumePausedMutations(), this.#b.onOnline());
    }));
  }
  unmount() {
    this.#k--, 0 === this.#k && (this.#w?.(), this.#w = void 0, this.#C?.(), this.#C = void 0);
  }
  isFetching(e) {
    return this.#b.findAll({ ...e, fetchStatus: "fetching" }).length;
  }
  isMutating(e) {
    return this.#f.findAll({ ...e, status: "pending" }).length;
  }
  getQueryData(e) {
    const n = this.defaultQueryOptions({ queryKey: e });
    return this.#b.get(n.queryHash)?.state.data;
  }
  ensureQueryData(e) {
    const n = this.defaultQueryOptions(e), r = this.#b.build(this, n), a = r.state.data;
    return void 0 === a ? this.fetchQuery(e) : (e.revalidateIfStale && r.isStaleByTime(resolveStaleTime(n.staleTime, r)) && this.prefetchQuery(n), Promise.resolve(a));
  }
  getQueriesData(e) {
    return this.#b.findAll(e).map(({ queryKey: e2, state: n }) => [e2, n.data]);
  }
  setQueryData(e, n, r) {
    const a = this.defaultQueryOptions({ queryKey: e }), o = this.#b.get(a.queryHash), s = o?.state.data, i = function(e2, n2) {
      return "function" == typeof e2 ? e2(n2) : e2;
    }(n, s);
    if (void 0 !== i) return this.#b.build(this, a).setData(i, { ...r, manual: true });
  }
  setQueriesData(e, n, r) {
    return Bt.batch(() => this.#b.findAll(e).map(({ queryKey: e2 }) => [e2, this.setQueryData(e2, n, r)]));
  }
  getQueryState(e) {
    const n = this.defaultQueryOptions({ queryKey: e });
    return this.#b.get(n.queryHash)?.state;
  }
  removeQueries(e) {
    const n = this.#b;
    Bt.batch(() => {
      n.findAll(e).forEach((e2) => {
        n.remove(e2);
      });
    });
  }
  resetQueries(e, n) {
    const r = this.#b;
    return Bt.batch(() => (r.findAll(e).forEach((e2) => {
      e2.reset();
    }), this.refetchQueries({ type: "active", ...e }, n)));
  }
  cancelQueries(e, n = {}) {
    const r = { revert: true, ...n }, a = Bt.batch(() => this.#b.findAll(e).map((e2) => e2.cancel(r)));
    return Promise.all(a).then(noop$7).catch(noop$7);
  }
  invalidateQueries(e, n = {}) {
    return Bt.batch(() => (this.#b.findAll(e).forEach((e2) => {
      e2.invalidate();
    }), "none" === e?.refetchType ? Promise.resolve() : this.refetchQueries({ ...e, type: e?.refetchType ?? e?.type ?? "active" }, n)));
  }
  refetchQueries(e, n = {}) {
    const r = { ...n, cancelRefetch: n.cancelRefetch ?? true }, a = Bt.batch(() => this.#b.findAll(e).filter((e2) => !e2.isDisabled() && !e2.isStatic()).map((e2) => {
      let n2 = e2.fetch(void 0, r);
      return r.throwOnError || (n2 = n2.catch(noop$7)), "paused" === e2.state.fetchStatus ? Promise.resolve() : n2;
    }));
    return Promise.all(a).then(noop$7);
  }
  fetchQuery(e) {
    const n = this.defaultQueryOptions(e);
    void 0 === n.retry && (n.retry = false);
    const r = this.#b.build(this, n);
    return r.isStaleByTime(resolveStaleTime(n.staleTime, r)) ? r.fetch(n) : Promise.resolve(r.state.data);
  }
  prefetchQuery(e) {
    return this.fetchQuery(e).then(noop$7).catch(noop$7);
  }
  fetchInfiniteQuery(e) {
    return e.behavior = infiniteQueryBehavior(e.pages), this.fetchQuery(e);
  }
  prefetchInfiniteQuery(e) {
    return this.fetchInfiniteQuery(e).then(noop$7).catch(noop$7);
  }
  ensureInfiniteQueryData(e) {
    return e.behavior = infiniteQueryBehavior(e.pages), this.ensureQueryData(e);
  }
  resumePausedMutations() {
    return Nt.isOnline() ? this.#f.resumePausedMutations() : Promise.resolve();
  }
  getQueryCache() {
    return this.#b;
  }
  getMutationCache() {
    return this.#f;
  }
  getDefaultOptions() {
    return this.#u;
  }
  setDefaultOptions(e) {
    this.#u = e;
  }
  setQueryDefaults(e, n) {
    this.#x.set(hashKey(e), { queryKey: e, defaultOptions: n });
  }
  getQueryDefaults(e) {
    const n = [...this.#x.values()], r = {};
    return n.forEach((n2) => {
      partialMatchKey(e, n2.queryKey) && Object.assign(r, n2.defaultOptions);
    }), r;
  }
  setMutationDefaults(e, n) {
    this.#S.set(hashKey(e), { mutationKey: e, defaultOptions: n });
  }
  getMutationDefaults(e) {
    const n = [...this.#S.values()], r = {};
    return n.forEach((n2) => {
      partialMatchKey(e, n2.mutationKey) && Object.assign(r, n2.defaultOptions);
    }), r;
  }
  defaultQueryOptions(e) {
    if (e._defaulted) return e;
    const n = { ...this.#u.queries, ...this.getQueryDefaults(e.queryKey), ...e, _defaulted: true };
    return n.queryHash || (n.queryHash = hashQueryKeyByOptions(n.queryKey, n)), void 0 === n.refetchOnReconnect && (n.refetchOnReconnect = "always" !== n.networkMode), void 0 === n.throwOnError && (n.throwOnError = !!n.suspense), !n.networkMode && n.persister && (n.networkMode = "offlineFirst"), n.queryFn === Mt && (n.enabled = false), n;
  }
  defaultMutationOptions(e) {
    return e?._defaulted ? e : { ...this.#u.mutations, ...e?.mutationKey && this.getMutationDefaults(e.mutationKey), ...e, _defaulted: true };
  }
  clear() {
    this.#b.clear(), this.#f.clear();
  }
};
function defaultTransformerFn(e) {
  return e;
}
function dehydrateMutation(e) {
  return { mutationKey: e.options.mutationKey, state: e.state, ...e.options.scope && { scope: e.options.scope }, ...e.meta && { meta: e.meta } };
}
function dehydrateQuery(e, n, r) {
  return { dehydratedAt: Date.now(), state: { ...e.state, ...void 0 !== e.state.data && { data: n(e.state.data) } }, queryKey: e.queryKey, queryHash: e.queryHash, ..."pending" === e.state.status && { promise: e.promise?.then(n).catch((e2) => r(e2) ? Promise.reject(new Error("redacted")) : Promise.reject(e2)) }, ...e.meta && { meta: e.meta } };
}
function defaultShouldDehydrateMutation(e) {
  return e.state.isPaused;
}
function defaultShouldDehydrateQuery(e) {
  return "success" === e.state.status;
}
function defaultShouldRedactErrors(e) {
  return true;
}
function dehydrate(e, n = {}) {
  const r = n.shouldDehydrateMutation ?? e.getDefaultOptions().dehydrate?.shouldDehydrateMutation ?? defaultShouldDehydrateMutation, a = e.getMutationCache().getAll().flatMap((e2) => r(e2) ? [dehydrateMutation(e2)] : []), o = n.shouldDehydrateQuery ?? e.getDefaultOptions().dehydrate?.shouldDehydrateQuery ?? defaultShouldDehydrateQuery, s = n.shouldRedactErrors ?? e.getDefaultOptions().dehydrate?.shouldRedactErrors ?? defaultShouldRedactErrors, i = n.serializeData ?? e.getDefaultOptions().dehydrate?.serializeData ?? defaultTransformerFn;
  return { mutations: a, queries: e.getQueryCache().getAll().flatMap((e2) => o(e2) ? [dehydrateQuery(e2, i, s)] : []) };
}
function hydrate(e, n, r) {
  if ("object" != typeof n || null === n) return;
  const a = e.getMutationCache(), o = e.getQueryCache(), s = e.getDefaultOptions().hydrate?.deserializeData ?? defaultTransformerFn, i = n.mutations || [], c = n.queries || [];
  i.forEach(({ state: n2, ...o2 }) => {
    a.build(e, { ...e.getDefaultOptions().hydrate?.mutations, ...r?.defaultOptions?.mutations, ...o2 }, n2);
  }), c.forEach(({ queryKey: n2, state: a2, queryHash: i2, meta: c2, promise: l, dehydratedAt: u }) => {
    const p = l ? function(e2) {
      let n3;
      if (e2.then((e3) => (n3 = e3, e3), noop$7)?.catch(noop$7), void 0 !== n3) return { data: n3 };
    }(l) : void 0, h = void 0 === a2.data ? p?.data : a2.data, g = void 0 === h ? h : s(h);
    let v = o.get(i2);
    const y = "pending" === v?.state.status, b2 = "fetching" === v?.state.fetchStatus;
    if (v) {
      const e2 = p && void 0 !== u && u > v.state.dataUpdatedAt;
      if (a2.dataUpdatedAt > v.state.dataUpdatedAt || e2) {
        const { fetchStatus: e3, ...n3 } = a2;
        v.setState({ ...n3, data: g });
      }
    } else v = o.build(e, { ...e.getDefaultOptions().hydrate?.queries, ...r?.defaultOptions?.queries, queryKey: n2, queryHash: i2, meta: c2 }, { ...a2, data: g, fetchStatus: "idle", status: void 0 !== g ? "success" : a2.status });
    l && !y && !b2 && (void 0 === u || u > v.state.dataUpdatedAt) && v.fetch(void 0, { initialPromise: Promise.resolve(l).then(s) });
  });
}
var Kt = Ge.createContext(void 0), useQueryClient = (e) => {
  const n = Ge.useContext(Kt);
  if (!n) throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return n;
}, QueryClientProvider = ({ client: e, children: n }) => (Ge.useEffect(() => (e.mount(), () => {
  e.unmount();
}), [e]), ke.jsx(Kt.Provider, { value: e, children: n }));
function queryOptions(e) {
  return e;
}
var ReactQueryDevtools2 = function() {
  return null;
};
const Gt = Symbol("error");
function handleError(e, n = Qt) {
  const r = n && n.context && n.context[Gt], a = function(e2) {
    return e2 instanceof Error ? e2 : new Error("string" == typeof e2 ? e2 : "Unknown error", { cause: e2 });
  }(e);
  if (!r) throw a;
  try {
    for (const e2 of r) e2(a);
  } catch (e2) {
    handleError(e2, n && n.owner || null);
  }
}
let Qt = null;
function createMemo(e, n) {
  let r;
  Qt = function() {
    const e2 = { owner: Qt, context: Qt ? Qt.context : null, owned: null, cleanups: null };
    return Qt && (Qt.owned ? Qt.owned.push(e2) : Qt.owned = [e2]), e2;
  }();
  try {
    r = e(n);
  } catch (e2) {
    handleError(e2);
  } finally {
    Qt = Qt.owner;
  }
  return () => r;
}
function createContext(e) {
  const n = Symbol("context");
  return { id: n, Provider: createProvider(n), defaultValue: e };
}
function children(e) {
  const n = createMemo(() => resolveChildren(e()));
  return n.toArray = () => {
    const e2 = n();
    return Array.isArray(e2) ? e2 : null != e2 ? [e2] : [];
  }, n;
}
function resolveChildren(e) {
  if ("function" == typeof e && !e.length) return resolveChildren(e());
  if (Array.isArray(e)) {
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const a = resolveChildren(e[r]);
      Array.isArray(a) ? n.push.apply(n, a) : n.push(a);
    }
    return n;
  }
  return e;
}
function createProvider(e) {
  return function(n) {
    return createMemo(() => (Qt.context = { ...Qt.context, [e]: n.value }, children(() => n.children)));
  };
}
var Jt, Xt = ((Jt = Xt || {})[Jt.AggregateError = 1] = "AggregateError", Jt[Jt.ArrowFunction = 2] = "ArrowFunction", Jt[Jt.ErrorPrototypeStack = 4] = "ErrorPrototypeStack", Jt[Jt.ObjectAssign = 8] = "ObjectAssign", Jt[Jt.BigIntTypedArray = 16] = "BigIntTypedArray", Jt);
function Nr(e) {
  switch (e) {
    case '"':
      return '\\"';
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "\b":
      return "\\b";
    case "	":
      return "\\t";
    case "\f":
      return "\\f";
    case "<":
      return "\\x3C";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return;
  }
}
function d(e) {
  let n, r = "", a = 0;
  for (let o = 0, s = e.length; o < s; o++) n = Nr(e[o]), n && (r += e.slice(a, o) + n, a = o + 1);
  return 0 === a ? r = e : r += e.slice(a), r;
}
var Yt = "__SEROVAL_REFS__", Zt = "$R", en = `self.${Zt}`;
function f(e, n) {
  if (!e) throw n;
}
var tn = /* @__PURE__ */ new Map(), nn = /* @__PURE__ */ new Map();
function je(e) {
  return tn.has(e);
}
function Hr(e) {
  return e;
}
function Ye(e, n) {
  for (let r = 0, a = n.length; r < a; r++) {
    let a2 = n[r];
    e.has(a2) || (e.add(a2), a2.extends && Ye(e, a2.extends));
  }
}
function m(e) {
  if (e) {
    let n = /* @__PURE__ */ new Set();
    return Ye(n, e), [...n];
  }
}
"undefined" != typeof globalThis ? Object.defineProperty(globalThis, Yt, { value: nn, configurable: true, writable: false, enumerable: false }) : "undefined" != typeof self ? Object.defineProperty(self, Yt, { value: nn, configurable: true, writable: false, enumerable: false }) : void 0 !== lr$1 && Object.defineProperty(lr$1, Yt, { value: nn, configurable: true, writable: false, enumerable: false });
var rn = { 0: "Symbol.asyncIterator", 1: "Symbol.hasInstance", 2: "Symbol.isConcatSpreadable", 3: "Symbol.iterator", 4: "Symbol.match", 5: "Symbol.matchAll", 6: "Symbol.replace", 7: "Symbol.search", 8: "Symbol.species", 9: "Symbol.split", 10: "Symbol.toPrimitive", 11: "Symbol.toStringTag", 12: "Symbol.unscopables" }, an = { [Symbol.asyncIterator]: 0, [Symbol.hasInstance]: 1, [Symbol.isConcatSpreadable]: 2, [Symbol.iterator]: 3, [Symbol.match]: 4, [Symbol.matchAll]: 5, [Symbol.replace]: 6, [Symbol.search]: 7, [Symbol.species]: 8, [Symbol.split]: 9, [Symbol.toPrimitive]: 10, [Symbol.toStringTag]: 11, [Symbol.unscopables]: 12 }, on = { 2: "!0", 3: "!1", 1: "void 0", 0: "null", 4: "-0", 5: "1/0", 6: "-1/0", 7: "0/0" }, sn = { 0: "Error", 1: "EvalError", 2: "RangeError", 3: "ReferenceError", 4: "SyntaxError", 5: "TypeError", 6: "URIError" }, cn = void 0;
function u$1(e, n, r, a, o, s, i, c, l, u, p, h) {
  return { t: e, i: n, s: r, l: a, c: o, m: s, p: i, e: c, a: l, f: u, b: p, o: h };
}
function x(e) {
  return u$1(2, cn, e, cn, cn, cn, cn, cn, cn, cn, cn, cn);
}
var ln = x(2), un = x(3), pn = x(1), dn = x(0), hn = x(4), mn = x(5), fn = x(6), gn = x(7);
function me(e) {
  return e instanceof EvalError ? 1 : e instanceof RangeError ? 2 : e instanceof ReferenceError ? 3 : e instanceof SyntaxError ? 4 : e instanceof TypeError ? 5 : e instanceof URIError ? 6 : 0;
}
function j(e, n) {
  let r = function(e2) {
    let n2 = sn[me(e2)];
    return e2.name !== n2 ? { name: e2.name } : e2.constructor.name !== n2 ? { name: e2.constructor.name } : {};
  }(e), a = Object.getOwnPropertyNames(e);
  for (let o, s = 0, i = a.length; s < i; s++) o = a[s], "name" !== o && "message" !== o && ("stack" === o ? 4 & n && (r = r || {}, r[o] = e[o]) : (r = r || {}, r[o] = e[o]));
  return r;
}
function fe(e) {
  return Object.isFrozen(e) ? 3 : Object.isSealed(e) ? 2 : Object.isExtensible(e) ? 0 : 1;
}
function w$1(e) {
  return u$1(1, cn, d(e), cn, cn, cn, cn, cn, cn, cn, cn, cn);
}
function nr(e, n) {
  return u$1(18, e, d(function(e2) {
    return f(je(e2), new Cn(e2)), tn.get(e2);
  }(n)), cn, cn, cn, cn, cn, cn, cn, cn, cn);
}
function _(e, n, r) {
  return u$1(25, e, r, cn, d(n), cn, cn, cn, cn, cn, cn, cn);
}
function M(e, n) {
  return u$1(28, cn, cn, cn, cn, cn, cn, cn, [e, n], cn, cn, cn);
}
function U(e, n) {
  return u$1(30, cn, cn, cn, cn, cn, cn, cn, [e, n], cn, cn, cn);
}
function L(e, n, r) {
  return u$1(31, e, cn, cn, cn, cn, cn, cn, r, n, cn, cn);
}
var { toString: vn } = Object.prototype;
var yn = class extends Error {
  constructor(e, n) {
    var r, a;
    super((r = e, (a = n) instanceof Error ? `Seroval caught an error during the ${r} process.
  
${a.name}
${a.message}

- For more information, please check the "cause" property of this error.
- If you believe this is an error in Seroval, please submit an issue at https://github.com/lxsmnsyc/seroval/issues/new` : `Seroval caught an error during the ${r} process.

"${vn.call(a)}"

For more information, please check the "cause" property of this error.`)), this.cause = n;
  }
}, bn = class extends yn {
  constructor(e) {
    super("parsing", e);
  }
}, xn = class extends yn {
  constructor(e) {
    super("serialization", e);
  }
}, Sn = class extends Error {
  constructor(e) {
    super(`The value ${vn.call(e)} of type "${typeof e}" cannot be parsed/serialized.
      
There are few workarounds for this problem:
- Transform the value in a way that it can be serialized.
- If the reference is present on multiple runtimes (isomorphic), you can use the Reference API to map the references.`), this.value = e;
  }
}, kn = class extends Error {
  constructor(e) {
    super('Unsupported node type "' + e.t + '".');
  }
}, wn = class extends Error {
  constructor(e) {
    super('Missing plugin for tag "' + e + '".');
  }
}, Cn = class extends Error {
  constructor(e) {
    super('Missing reference for the value "' + vn.call(e) + '" of type "' + typeof e + '"'), this.value = e;
  }
}, Rn = class {
  constructor(e, n) {
    this.value = e, this.replacement = n;
  }
};
function z(e, n, r) {
  return 2 & e ? (1 === n.length ? n[0] : "(" + n.join(",") + ")") + "=>" + (r.startsWith("{") ? "(" + r + ")" : r) : "function(" + n.join(",") + "){return " + r + "}";
}
function S(e, n, r) {
  return 2 & e ? (1 === n.length ? n[0] : "(" + n.join(",") + ")") + "=>{" + r + "}" : "function(" + n.join(",") + "){" + r + "}";
}
var Pn = {}, Tn = {}, En = { 0: {}, 1: {}, 2: {}, 3: {}, 4: {} };
function cr(e, n) {
  switch (n) {
    case 0:
      return "[]";
    case 1:
      return function(e2) {
        return z(e2, ["r"], "(r.p=new Promise(" + S(e2, ["s", "f"], "r.s=s,r.f=f") + "))");
      }(e);
    case 2:
      return function(e2) {
        return S(e2, ["r", "d"], "r.s(d),r.p.s=1,r.p.v=d");
      }(e);
    case 3:
      return function(e2) {
        return S(e2, ["r", "d"], "r.f(d),r.p.s=2,r.p.v=d");
      }(e);
    case 4:
      return function(e2) {
        return z(e2, ["b", "a", "s", "l", "p", "f", "e", "n"], "(b=[],a=!0,s=!1,l=[],p=0,f=" + S(e2, ["v", "m", "x"], "for(x=0;x<p;x++)l[x]&&l[x][m](v)") + ",n=" + S(e2, ["o", "x", "z", "c"], 'for(x=0,z=b.length;x<z;x++)(c=b[x],(!a&&x===z-1)?o[s?"return":"throw"](c):o.next(c))') + ",e=" + z(e2, ["o", "t"], "(a&&(l[t=p++]=o),n(o)," + S(e2, [], "a&&(l[t]=void 0)") + ")") + ",{__SEROVAL_STREAM__:!0,on:" + z(e2, ["o"], "e(o)") + ",next:" + S(e2, ["v"], 'a&&(b.push(v),f(v,"next"))') + ",throw:" + S(e2, ["v"], 'a&&(b.push(v),f(v,"throw"),a=s=!1,l.length=0)') + ",return:" + S(e2, ["v"], 'a&&(b.push(v),f(v,"return"),a=!1,s=!0,l.length=0)') + "})");
      }(e);
    default:
      return "";
  }
}
function K() {
  let e = /* @__PURE__ */ new Set(), n = [], r = true, a = true;
  return { __SEROVAL_STREAM__: true, on(o) {
    r && e.add(o);
    for (let e2 = 0, s = n.length; e2 < s; e2++) {
      let i = n[e2];
      e2 !== s - 1 || r ? o.next(i) : a ? o.return(i) : o.throw(i);
    }
    return () => {
      r && e.delete(o);
    };
  }, next(a2) {
    r && (n.push(a2), function(n2) {
      for (let r2 of e.keys()) r2.next(n2);
    }(a2));
  }, throw(o) {
    r && (n.push(o), function(n2) {
      for (let r2 of e.keys()) r2.throw(n2);
    }(o), r = false, a = false, e.clear());
  }, return(o) {
    r && (n.push(o), function(n2) {
      for (let r2 of e.keys()) r2.return(n2);
    }(o), r = false, a = true, e.clear());
  } };
}
function J(e) {
  let n = [], r = -1, a = -1, o = e[Symbol.iterator]();
  for (; ; ) try {
    let e2 = o.next();
    if (n.push(e2.value), e2.done) {
      a = n.length - 1;
      break;
    }
  } catch (e2) {
    r = n.length, n.push(e2);
  }
  return { v: n, t: r, d: a };
}
var $n = class {
  constructor(e) {
    this.marked = /* @__PURE__ */ new Set(), this.plugins = e.plugins, this.features = 31 ^ (e.disabledFeatures || 0), this.refs = e.refs || /* @__PURE__ */ new Map();
  }
  markRef(e) {
    this.marked.add(e);
  }
  isMarked(e) {
    return this.marked.has(e);
  }
  createIndex(e) {
    let n = this.refs.size;
    return this.refs.set(e, n), n;
  }
  getIndexedValue(e) {
    let n = this.refs.get(e);
    return null != n ? (this.markRef(n), { type: 1, value: (r = n, u$1(4, r, cn, cn, cn, cn, cn, cn, cn, cn, cn, cn)) }) : { type: 0, value: this.createIndex(e) };
    var r;
  }
  getReference(e) {
    let n = this.getIndexedValue(e);
    return 1 === n.type ? n : je(e) ? { type: 2, value: nr(n.value, e) } : n;
  }
  parseWellKnownSymbol(e) {
    let n = this.getReference(e);
    return 0 !== n.type ? n.value : (f(e in an, new Sn(e)), function(e2, n2) {
      return u$1(17, e2, an[n2], cn, cn, cn, cn, cn, cn, cn, cn, cn);
    }(n.value, e));
  }
  parseSpecialReference(e) {
    let n = this.getIndexedValue(En[e]);
    return 1 === n.type ? n.value : u$1(26, n.value, e, cn, cn, cn, cn, cn, cn, cn, cn, cn);
  }
  parseIteratorFactory() {
    let e = this.getIndexedValue(Pn);
    return 1 === e.type ? e.value : u$1(27, e.value, cn, cn, cn, cn, cn, cn, cn, this.parseWellKnownSymbol(Symbol.iterator), cn, cn);
  }
  parseAsyncIteratorFactory() {
    let e = this.getIndexedValue(Tn);
    return 1 === e.type ? e.value : u$1(29, e.value, cn, cn, cn, cn, cn, cn, [this.parseSpecialReference(1), this.parseWellKnownSymbol(Symbol.asyncIterator)], cn, cn, cn);
  }
  createObjectNode(e, n, r, a) {
    return u$1(r ? 11 : 10, e, cn, cn, cn, cn, a, cn, cn, cn, cn, fe(n));
  }
  createMapNode(e, n, r, a) {
    return u$1(8, e, cn, cn, cn, cn, cn, { k: n, v: r, s: a }, cn, this.parseSpecialReference(0), cn, cn);
  }
  createPromiseConstructorNode(e, n) {
    return u$1(22, e, n, cn, cn, cn, cn, cn, cn, this.parseSpecialReference(1), cn, cn);
  }
}, Fn = /^[$A-Z_][0-9A-Z_$]*$/i;
function Le(e) {
  let n = e[0];
  return ("$" === n || "_" === n || n >= "A" && n <= "Z" || n >= "a" && n <= "z") && Fn.test(e);
}
function se(e) {
  switch (e.t) {
    case 0:
      return e.s + "=" + e.v;
    case 2:
      return e.s + ".set(" + e.k + "," + e.v + ")";
    case 1:
      return e.s + ".add(" + e.v + ")";
    case 3:
      return e.s + ".delete(" + e.k + ")";
  }
}
function fr(e) {
  if (e.length) {
    let n = "", r = function(e2) {
      let n2 = [], r2 = e2[0];
      for (let a, o = 1, s = e2.length, i = r2; o < s; o++) a = e2[o], 0 === a.t && a.v === i.v ? r2 = { t: 0, s: a.s, k: cn, v: se(r2) } : 2 === a.t && a.s === i.s ? r2 = { t: 2, s: se(r2), k: a.k, v: a.v } : 1 === a.t && a.s === i.s ? r2 = { t: 1, s: se(r2), k: cn, v: a.v } : 3 === a.t && a.s === i.s ? r2 = { t: 3, s: se(r2), k: a.k, v: cn } : (n2.push(r2), r2 = a), i = a;
      return n2.push(r2), n2;
    }(e);
    for (let e2 = 0, a = r.length; e2 < a; e2++) n += se(r[e2]) + ",";
    return n;
  }
  return cn;
}
var _n = { 3: "Object.freeze", 2: "Object.seal", 1: "Object.preventExtensions", 0: cn }, An = class {
  constructor(e) {
    this.stack = [], this.flags = [], this.assignments = [], this.plugins = e.plugins, this.features = e.features, this.marked = new Set(e.markedRefs);
  }
  createFunction(e, n) {
    return z(this.features, e, n);
  }
  createEffectfulFunction(e, n) {
    return S(this.features, e, n);
  }
  markRef(e) {
    this.marked.add(e);
  }
  isMarked(e) {
    return this.marked.has(e);
  }
  pushObjectFlag(e, n) {
    0 !== e && (this.markRef(n), this.flags.push({ type: e, value: this.getRefParam(n) }));
  }
  resolveFlags() {
    let e = "";
    for (let n = 0, r = this.flags, a = r.length; n < a; n++) {
      let a2 = r[n];
      e += _n[a2.type] + "(" + a2.value + "),";
    }
    return e;
  }
  resolvePatches() {
    let e = fr(this.assignments), n = this.resolveFlags();
    return e ? n ? e + n : e : n;
  }
  createAssignment(e, n) {
    this.assignments.push({ t: 0, s: e, k: cn, v: n });
  }
  createAddAssignment(e, n) {
    this.assignments.push({ t: 1, s: this.getRefParam(e), k: cn, v: n });
  }
  createSetAssignment(e, n, r) {
    this.assignments.push({ t: 2, s: this.getRefParam(e), k: n, v: r });
  }
  createDeleteAssignment(e, n) {
    this.assignments.push({ t: 3, s: this.getRefParam(e), k: n, v: cn });
  }
  createArrayAssign(e, n, r) {
    this.createAssignment(this.getRefParam(e) + "[" + n + "]", r);
  }
  createObjectAssign(e, n, r) {
    this.createAssignment(this.getRefParam(e) + "." + n, r);
  }
  isIndexedValueInStack(e) {
    return 4 === e.t && this.stack.includes(e.i);
  }
  serializeReference(e) {
    return this.assignIndexedValue(e.i, Yt + '.get("' + e.s + '")');
  }
  serializeArrayItem(e, n, r) {
    return n ? this.isIndexedValueInStack(n) ? (this.markRef(e), this.createArrayAssign(e, r, this.getRefParam(n.i)), "") : this.serialize(n) : "";
  }
  serializeArray(e) {
    let n = e.i;
    if (e.l) {
      this.stack.push(n);
      let r = e.a, a = this.serializeArrayItem(n, r[0], 0), o = "" === a;
      for (let s, i = 1, c = e.l; i < c; i++) s = this.serializeArrayItem(n, r[i], i), a += "," + s, o = "" === s;
      return this.stack.pop(), this.pushObjectFlag(e.o, e.i), this.assignIndexedValue(n, "[" + a + (o ? ",]" : "]"));
    }
    return this.assignIndexedValue(n, "[]");
  }
  serializeProperty(e, n, r) {
    if ("string" == typeof n) {
      let a = Number(n), o = a >= 0 && a.toString() === n || Le(n);
      if (this.isIndexedValueInStack(r)) {
        let s = this.getRefParam(r.i);
        return this.markRef(e.i), o && a != a ? this.createObjectAssign(e.i, n, s) : this.createArrayAssign(e.i, o ? n : '"' + n + '"', s), "";
      }
      return (o ? n : '"' + n + '"') + ":" + this.serialize(r);
    }
    return "[" + this.serialize(n) + "]:" + this.serialize(r);
  }
  serializeProperties(e, n) {
    let r = n.s;
    if (r) {
      let a = n.k, o = n.v;
      this.stack.push(e.i);
      let s = this.serializeProperty(e, a[0], o[0]);
      for (let n2 = 1, i = s; n2 < r; n2++) i = this.serializeProperty(e, a[n2], o[n2]), s += (i && s && ",") + i;
      return this.stack.pop(), "{" + s + "}";
    }
    return "{}";
  }
  serializeObject(e) {
    return this.pushObjectFlag(e.o, e.i), this.assignIndexedValue(e.i, this.serializeProperties(e, e.p));
  }
  serializeWithObjectAssign(e, n, r) {
    let a = this.serializeProperties(e, n);
    return "{}" !== a ? "Object.assign(" + r + "," + a + ")" : r;
  }
  serializeStringKeyAssignment(e, n, r, a) {
    let o = this.serialize(a), s = Number(r), i = s >= 0 && s.toString() === r || Le(r);
    if (this.isIndexedValueInStack(a)) i && s != s ? this.createObjectAssign(e.i, r, o) : this.createArrayAssign(e.i, i ? r : '"' + r + '"', o);
    else {
      let a2 = this.assignments;
      this.assignments = n, i && s != s ? this.createObjectAssign(e.i, r, o) : this.createArrayAssign(e.i, i ? r : '"' + r + '"', o), this.assignments = a2;
    }
  }
  serializeAssignment(e, n, r, a) {
    if ("string" == typeof r) this.serializeStringKeyAssignment(e, n, r, a);
    else {
      let o = this.stack;
      this.stack = [];
      let s = this.serialize(a);
      this.stack = o;
      let i = this.assignments;
      this.assignments = n, this.createArrayAssign(e.i, this.serialize(r), s), this.assignments = i;
    }
  }
  serializeAssignments(e, n) {
    let r = n.s;
    if (r) {
      let a = [], o = n.k, s = n.v;
      this.stack.push(e.i);
      for (let n2 = 0; n2 < r; n2++) this.serializeAssignment(e, a, o[n2], s[n2]);
      return this.stack.pop(), fr(a);
    }
    return cn;
  }
  serializeDictionary(e, n) {
    if (e.p) if (8 & this.features) n = this.serializeWithObjectAssign(e, e.p, n);
    else {
      this.markRef(e.i);
      let r = this.serializeAssignments(e, e.p);
      if (r) return "(" + this.assignIndexedValue(e.i, n) + "," + r + this.getRefParam(e.i) + ")";
    }
    return this.assignIndexedValue(e.i, n);
  }
  serializeNullConstructor(e) {
    return this.pushObjectFlag(e.o, e.i), this.serializeDictionary(e, "Object.create(null)");
  }
  serializeDate(e) {
    return this.assignIndexedValue(e.i, 'new Date("' + e.s + '")');
  }
  serializeRegExp(e) {
    return this.assignIndexedValue(e.i, "/" + e.c + "/" + e.m);
  }
  serializeSetItem(e, n) {
    return this.isIndexedValueInStack(n) ? (this.markRef(e), this.createAddAssignment(e, this.getRefParam(n.i)), "") : this.serialize(n);
  }
  serializeSet(e) {
    let n = "new Set", r = e.l, a = e.i;
    if (r) {
      let o = e.a;
      this.stack.push(a);
      let s = this.serializeSetItem(a, o[0]);
      for (let e2 = 1, n2 = s; e2 < r; e2++) n2 = this.serializeSetItem(a, o[e2]), s += (n2 && s && ",") + n2;
      this.stack.pop(), s && (n += "([" + s + "])");
    }
    return this.assignIndexedValue(a, n);
  }
  serializeMapEntry(e, n, r, a) {
    if (this.isIndexedValueInStack(n)) {
      let o = this.getRefParam(n.i);
      if (this.markRef(e), this.isIndexedValueInStack(r)) {
        let n2 = this.getRefParam(r.i);
        return this.createSetAssignment(e, o, n2), "";
      }
      if (4 !== r.t && null != r.i && this.isMarked(r.i)) {
        let n2 = "(" + this.serialize(r) + ",[" + a + "," + a + "])";
        return this.createSetAssignment(e, o, this.getRefParam(r.i)), this.createDeleteAssignment(e, a), n2;
      }
      let s = this.stack;
      return this.stack = [], this.createSetAssignment(e, o, this.serialize(r)), this.stack = s, "";
    }
    if (this.isIndexedValueInStack(r)) {
      let o = this.getRefParam(r.i);
      if (this.markRef(e), 4 !== n.t && null != n.i && this.isMarked(n.i)) {
        let r2 = "(" + this.serialize(n) + ",[" + a + "," + a + "])";
        return this.createSetAssignment(e, this.getRefParam(n.i), o), this.createDeleteAssignment(e, a), r2;
      }
      let s = this.stack;
      return this.stack = [], this.createSetAssignment(e, this.serialize(n), o), this.stack = s, "";
    }
    return "[" + this.serialize(n) + "," + this.serialize(r) + "]";
  }
  serializeMap(e) {
    let n = "new Map", r = e.e.s, a = e.i, o = e.f, s = this.getRefParam(o.i);
    if (r) {
      let o2 = e.e.k, i = e.e.v;
      this.stack.push(a);
      let c = this.serializeMapEntry(a, o2[0], i[0], s);
      for (let e2 = 1, n2 = c; e2 < r; e2++) n2 = this.serializeMapEntry(a, o2[e2], i[e2], s), c += (n2 && c && ",") + n2;
      this.stack.pop(), c && (n += "([" + c + "])");
    }
    return 26 === o.t && (this.markRef(o.i), n = "(" + this.serialize(o) + "," + n + ")"), this.assignIndexedValue(a, n);
  }
  serializeArrayBuffer(e) {
    let n = "new Uint8Array(", r = e.s, a = r.length;
    if (a) {
      n += "[" + r[0];
      for (let e2 = 1; e2 < a; e2++) n += "," + r[e2];
      n += "]";
    }
    return this.assignIndexedValue(e.i, n + ").buffer");
  }
  serializeTypedArray(e) {
    return this.assignIndexedValue(e.i, "new " + e.c + "(" + this.serialize(e.f) + "," + e.b + "," + e.l + ")");
  }
  serializeDataView(e) {
    return this.assignIndexedValue(e.i, "new DataView(" + this.serialize(e.f) + "," + e.b + "," + e.l + ")");
  }
  serializeAggregateError(e) {
    let n = e.i;
    this.stack.push(n);
    let r = this.serializeDictionary(e, 'new AggregateError([],"' + e.m + '")');
    return this.stack.pop(), r;
  }
  serializeError(e) {
    return this.serializeDictionary(e, "new " + sn[e.s] + '("' + e.m + '")');
  }
  serializePromise(e) {
    let n, r = e.f, a = e.i, o = e.s ? "Promise.resolve" : "Promise.reject";
    if (this.isIndexedValueInStack(r)) {
      let a2 = this.getRefParam(r.i);
      n = o + (e.s ? "().then(" + this.createFunction([], a2) + ")" : "().catch(" + this.createEffectfulFunction([], "throw " + a2) + ")");
    } else {
      this.stack.push(a);
      let e2 = this.serialize(r);
      this.stack.pop(), n = o + "(" + e2 + ")";
    }
    return this.assignIndexedValue(a, n);
  }
  serializeWellKnownSymbol(e) {
    return this.assignIndexedValue(e.i, rn[e.s]);
  }
  serializeBoxed(e) {
    return this.assignIndexedValue(e.i, "Object(" + this.serialize(e.f) + ")");
  }
  serializePlugin(e) {
    let n = this.plugins;
    if (n) for (let r = 0, a = n.length; r < a; r++) {
      let a2 = n[r];
      if (a2.tag === e.c) return this.assignIndexedValue(e.i, a2.serialize(e.s, this, { id: e.i }));
    }
    throw new wn(e.c);
  }
  getConstructor(e) {
    let n = this.serialize(e);
    return n === this.getRefParam(e.i) ? n : "(" + n + ")";
  }
  serializePromiseConstructor(e) {
    let n = this.assignIndexedValue(e.s, "{p:0,s:0,f:0}");
    return this.assignIndexedValue(e.i, this.getConstructor(e.f) + "(" + n + ")");
  }
  serializePromiseResolve(e) {
    return this.getConstructor(e.a[0]) + "(" + this.getRefParam(e.i) + "," + this.serialize(e.a[1]) + ")";
  }
  serializePromiseReject(e) {
    return this.getConstructor(e.a[0]) + "(" + this.getRefParam(e.i) + "," + this.serialize(e.a[1]) + ")";
  }
  serializeSpecialReference(e) {
    return this.assignIndexedValue(e.i, cr(this.features, e.s));
  }
  serializeIteratorFactory(e) {
    let n = "", r = false;
    return 4 !== e.f.t && (this.markRef(e.f.i), n = "(" + this.serialize(e.f) + ",", r = true), n += this.assignIndexedValue(e.i, this.createFunction(["s"], this.createFunction(["i", "c", "d", "t"], "(i=0,t={[" + this.getRefParam(e.f.i) + "]:" + this.createFunction([], "t") + ",next:" + this.createEffectfulFunction([], "if(i>s.d)return{done:!0,value:void 0};if(d=s.v[c=i++],c===s.t)throw d;return{done:c===s.d,value:d}") + "})"))), r && (n += ")"), n;
  }
  serializeIteratorFactoryInstance(e) {
    return this.getConstructor(e.a[0]) + "(" + this.serialize(e.a[1]) + ")";
  }
  serializeAsyncIteratorFactory(e) {
    let n = e.a[0], r = e.a[1], a = "";
    4 !== n.t && (this.markRef(n.i), a += "(" + this.serialize(n)), 4 !== r.t && (this.markRef(r.i), a += (a ? "," : "(") + this.serialize(r)), a && (a += ",");
    let o = this.assignIndexedValue(e.i, this.createFunction(["s"], this.createFunction(["b", "c", "p", "d", "e", "t", "f"], "(b=[],c=0,p=[],d=-1,e=!1,f=" + this.createEffectfulFunction(["i", "l"], "for(i=0,l=p.length;i<l;i++)p[i].s({done:!0,value:void 0})") + ",s.on({next:" + this.createEffectfulFunction(["v", "t"], "if(t=p.shift())t.s({done:!1,value:v});b.push(v)") + ",throw:" + this.createEffectfulFunction(["v", "t"], "if(t=p.shift())t.f(v);f(),d=b.length,e=!0,b.push(v)") + ",return:" + this.createEffectfulFunction(["v", "t"], "if(t=p.shift())t.s({done:!0,value:v});f(),d=b.length,b.push(v)") + "}),t={[" + this.getRefParam(r.i) + "]:" + this.createFunction([], "t.p") + ",next:" + this.createEffectfulFunction(["i", "t", "v"], "if(d===-1){return((i=c++)>=b.length)?(" + this.getRefParam(n.i) + "(t={p:0,s:0,f:0}),p.push(t),t.p):{done:!1,value:b[i]}}if(c>d)return{done:!0,value:void 0};if(v=b[i=c++],i!==d)return{done:!1,value:v};if(e)throw v;return{done:!0,value:v}") + "})")));
    return a ? a + o + ")" : o;
  }
  serializeAsyncIteratorFactoryInstance(e) {
    return this.getConstructor(e.a[0]) + "(" + this.serialize(e.a[1]) + ")";
  }
  serializeStreamConstructor(e) {
    let n = this.assignIndexedValue(e.i, this.getConstructor(e.f) + "()"), r = e.a.length;
    if (r) {
      let a = this.serialize(e.a[0]);
      for (let n2 = 1; n2 < r; n2++) a += "," + this.serialize(e.a[n2]);
      return "(" + n + "," + a + "," + this.getRefParam(e.i) + ")";
    }
    return n;
  }
  serializeStreamNext(e) {
    return this.getRefParam(e.i) + ".next(" + this.serialize(e.f) + ")";
  }
  serializeStreamThrow(e) {
    return this.getRefParam(e.i) + ".throw(" + this.serialize(e.f) + ")";
  }
  serializeStreamReturn(e) {
    return this.getRefParam(e.i) + ".return(" + this.serialize(e.f) + ")";
  }
  serialize(e) {
    try {
      switch (e.t) {
        case 2:
          return on[e.s];
        case 0:
          return "" + e.s;
        case 1:
          return '"' + e.s + '"';
        case 3:
          return e.s + "n";
        case 4:
          return this.getRefParam(e.i);
        case 18:
          return this.serializeReference(e);
        case 9:
          return this.serializeArray(e);
        case 10:
          return this.serializeObject(e);
        case 11:
          return this.serializeNullConstructor(e);
        case 5:
          return this.serializeDate(e);
        case 6:
          return this.serializeRegExp(e);
        case 7:
          return this.serializeSet(e);
        case 8:
          return this.serializeMap(e);
        case 19:
          return this.serializeArrayBuffer(e);
        case 16:
        case 15:
          return this.serializeTypedArray(e);
        case 20:
          return this.serializeDataView(e);
        case 14:
          return this.serializeAggregateError(e);
        case 13:
          return this.serializeError(e);
        case 12:
          return this.serializePromise(e);
        case 17:
          return this.serializeWellKnownSymbol(e);
        case 21:
          return this.serializeBoxed(e);
        case 22:
          return this.serializePromiseConstructor(e);
        case 23:
          return this.serializePromiseResolve(e);
        case 24:
          return this.serializePromiseReject(e);
        case 25:
          return this.serializePlugin(e);
        case 26:
          return this.serializeSpecialReference(e);
        case 27:
          return this.serializeIteratorFactory(e);
        case 28:
          return this.serializeIteratorFactoryInstance(e);
        case 29:
          return this.serializeAsyncIteratorFactory(e);
        case 30:
          return this.serializeAsyncIteratorFactoryInstance(e);
        case 31:
          return this.serializeStreamConstructor(e);
        case 32:
          return this.serializeStreamNext(e);
        case 33:
          return this.serializeStreamThrow(e);
        case 34:
          return this.serializeStreamReturn(e);
        default:
          throw new kn(e);
      }
    } catch (e2) {
      throw new xn(e2);
    }
  }
}, On = class extends An {
  constructor(e) {
    super(e), this.mode = "cross", this.scopeId = e.scopeId;
  }
  getRefParam(e) {
    return "$R[" + e + "]";
  }
  assignIndexedValue(e, n) {
    return this.getRefParam(e) + "=" + n;
  }
  serializeTop(e) {
    let n = this.serialize(e), r = e.i;
    if (null == r) return n;
    let a = this.resolvePatches(), o = this.getRefParam(r), s = null == this.scopeId ? "" : Zt, i = a ? "(" + n + "," + a + o + ")" : n;
    if ("" === s) return 10 !== e.t || a ? i : "(" + i + ")";
    let c = null == this.scopeId ? "()" : '($R["' + d(this.scopeId) + '"])';
    return "(" + this.createFunction([s], i) + ")" + c;
  }
}, jn = class extends $n {
  parseItems(e) {
    let n = [];
    for (let r = 0, a = e.length; r < a; r++) r in e && (n[r] = this.parse(e[r]));
    return n;
  }
  parseArray(e, n) {
    return function(e2, n2, r) {
      return u$1(9, e2, cn, n2.length, cn, cn, cn, cn, r, cn, cn, fe(n2));
    }(e, n, this.parseItems(n));
  }
  parseProperties(e) {
    let n = Object.entries(e), r = [], a = [];
    for (let e2 = 0, o2 = n.length; e2 < o2; e2++) r.push(d(n[e2][0])), a.push(this.parse(n[e2][1]));
    let o = Symbol.iterator;
    return o in e && (r.push(this.parseWellKnownSymbol(o)), a.push(M(this.parseIteratorFactory(), this.parse(J(e))))), o = Symbol.asyncIterator, o in e && (r.push(this.parseWellKnownSymbol(o)), a.push(U(this.parseAsyncIteratorFactory(), this.parse(K())))), o = Symbol.toStringTag, o in e && (r.push(this.parseWellKnownSymbol(o)), a.push(w$1(e[o]))), o = Symbol.isConcatSpreadable, o in e && (r.push(this.parseWellKnownSymbol(o)), a.push(e[o] ? ln : un)), { k: r, v: a, s: r.length };
  }
  parsePlainObject(e, n, r) {
    return this.createObjectNode(e, n, r, this.parseProperties(n));
  }
  parseBoxed(e, n) {
    return function(e2, n2) {
      return u$1(21, e2, cn, cn, cn, cn, cn, cn, cn, n2, cn, cn);
    }(e, this.parse(n.valueOf()));
  }
  parseTypedArray(e, n) {
    return function(e2, n2, r) {
      return u$1(15, e2, cn, n2.length, n2.constructor.name, cn, cn, cn, cn, r, n2.byteOffset, cn);
    }(e, n, this.parse(n.buffer));
  }
  parseBigIntTypedArray(e, n) {
    return function(e2, n2, r) {
      return u$1(16, e2, cn, n2.length, n2.constructor.name, cn, cn, cn, cn, r, n2.byteOffset, cn);
    }(e, n, this.parse(n.buffer));
  }
  parseDataView(e, n) {
    return function(e2, n2, r) {
      return u$1(20, e2, cn, n2.byteLength, cn, cn, cn, cn, cn, r, n2.byteOffset, cn);
    }(e, n, this.parse(n.buffer));
  }
  parseError(e, n) {
    let r = j(n, this.features);
    return function(e2, n2, r2) {
      return u$1(13, e2, me(n2), cn, cn, d(n2.message), r2, cn, cn, cn, cn, cn);
    }(e, n, r ? this.parseProperties(r) : cn);
  }
  parseAggregateError(e, n) {
    let r = j(n, this.features);
    return function(e2, n2, r2) {
      return u$1(14, e2, me(n2), cn, cn, d(n2.message), r2, cn, cn, cn, cn, cn);
    }(e, n, r ? this.parseProperties(r) : cn);
  }
  parseMap(e, n) {
    let r = [], a = [];
    for (let [e2, o] of n.entries()) r.push(this.parse(e2)), a.push(this.parse(o));
    return this.createMapNode(e, r, a, n.size);
  }
  parseSet(e, n) {
    let r = [];
    for (let e2 of n.keys()) r.push(this.parse(e2));
    return function(e2, n2, r2) {
      return u$1(7, e2, cn, n2, cn, cn, cn, cn, r2, cn, cn, cn);
    }(e, n.size, r);
  }
  parsePlugin(e, n) {
    let r = this.plugins;
    if (r) for (let a = 0, o = r.length; a < o; a++) {
      let o2 = r[a];
      if (o2.parse.sync && o2.test(n)) return _(e, o2.tag, o2.parse.sync(n, this, { id: e }));
    }
  }
  parseStream(e, n) {
    return L(e, this.parseSpecialReference(4), []);
  }
  parsePromise(e, n) {
    return this.createPromiseConstructorNode(e, this.createIndex({}));
  }
  parseObject(e, n) {
    if (Array.isArray(n)) return this.parseArray(e, n);
    if ("__SEROVAL_STREAM__" in n) return this.parseStream(e, n);
    let r = n.constructor;
    if (r === Rn) return this.parse(n.replacement);
    let a = this.parsePlugin(e, n);
    if (a) return a;
    switch (r) {
      case Object:
        return this.parsePlainObject(e, n, false);
      case void 0:
        return this.parsePlainObject(e, n, true);
      case Date:
        return function(e2, n2) {
          let r2 = n2.valueOf();
          return u$1(5, e2, r2 != r2 ? "" : n2.toISOString(), cn, cn, cn, cn, cn, cn, cn, cn, cn);
        }(e, n);
      case RegExp:
        return function(e2, n2) {
          return u$1(6, e2, cn, cn, d(n2.source), n2.flags, cn, cn, cn, cn, cn, cn);
        }(e, n);
      case Error:
      case EvalError:
      case RangeError:
      case ReferenceError:
      case SyntaxError:
      case TypeError:
      case URIError:
        return this.parseError(e, n);
      case Number:
      case Boolean:
      case String:
      case BigInt:
        return this.parseBoxed(e, n);
      case ArrayBuffer:
        return function(e2, n2) {
          let r2 = new Uint8Array(n2), a2 = r2.length, o2 = new Array(a2);
          for (let e3 = 0; e3 < a2; e3++) o2[e3] = r2[e3];
          return u$1(19, e2, o2, cn, cn, cn, cn, cn, cn, cn, cn, cn);
        }(e, n);
      case Int8Array:
      case Int16Array:
      case Int32Array:
      case Uint8Array:
      case Uint16Array:
      case Uint32Array:
      case Uint8ClampedArray:
      case Float32Array:
      case Float64Array:
        return this.parseTypedArray(e, n);
      case DataView:
        return this.parseDataView(e, n);
      case Map:
        return this.parseMap(e, n);
      case Set:
        return this.parseSet(e, n);
    }
    if (r === Promise || n instanceof Promise) return this.parsePromise(e, n);
    let o = this.features;
    if (16 & o) switch (r) {
      case BigInt64Array:
      case BigUint64Array:
        return this.parseBigIntTypedArray(e, n);
    }
    if (1 & o && "undefined" != typeof AggregateError && (r === AggregateError || n instanceof AggregateError)) return this.parseAggregateError(e, n);
    if (n instanceof Error) return this.parseError(e, n);
    if (Symbol.iterator in n || Symbol.asyncIterator in n) return this.parsePlainObject(e, n, !!r);
    throw new Sn(n);
  }
  parseFunction(e) {
    let n = this.getReference(e);
    if (0 !== n.type) return n.value;
    let r = this.parsePlugin(n.value, e);
    if (r) return r;
    throw new Sn(e);
  }
  parse(e) {
    switch (typeof e) {
      case "boolean":
        return e ? ln : un;
      case "undefined":
        return pn;
      case "string":
        return w$1(e);
      case "number":
        return function(e2) {
          switch (e2) {
            case Number.POSITIVE_INFINITY:
              return mn;
            case Number.NEGATIVE_INFINITY:
              return fn;
          }
          return e2 != e2 ? gn : Object.is(e2, -0) ? hn : u$1(0, cn, e2, cn, cn, cn, cn, cn, cn, cn, cn, cn);
        }(e);
      case "bigint":
        return u$1(3, cn, "" + e, cn, cn, cn, cn, cn, cn, cn, cn, cn);
      case "object":
        if (e) {
          let n = this.getReference(e);
          return 0 === n.type ? this.parseObject(n.value, e) : n.value;
        }
        return dn;
      case "symbol":
        return this.parseWellKnownSymbol(e);
      case "function":
        return this.parseFunction(e);
      default:
        throw new Sn(e);
    }
  }
  parseTop(e) {
    try {
      return this.parse(e);
    } catch (e2) {
      throw e2 instanceof bn ? e2 : new bn(e2);
    }
  }
}, In = class extends jn {
  constructor(e) {
    super(e), this.alive = true, this.pending = 0, this.initial = true, this.buffer = [], this.onParseCallback = e.onParse, this.onErrorCallback = e.onError, this.onDoneCallback = e.onDone;
  }
  onParseInternal(e, n) {
    try {
      this.onParseCallback(e, n);
    } catch (e2) {
      this.onError(e2);
    }
  }
  flush() {
    for (let e = 0, n = this.buffer.length; e < n; e++) this.onParseInternal(this.buffer[e], false);
  }
  onParse(e) {
    this.initial ? this.buffer.push(e) : this.onParseInternal(e, false);
  }
  onError(e) {
    if (!this.onErrorCallback) throw e;
    this.onErrorCallback(e);
  }
  onDone() {
    this.onDoneCallback && this.onDoneCallback();
  }
  pushPendingState() {
    this.pending++;
  }
  popPendingState() {
    --this.pending <= 0 && this.onDone();
  }
  parseProperties(e) {
    let n = Object.entries(e), r = [], a = [];
    for (let e2 = 0, o2 = n.length; e2 < o2; e2++) r.push(d(n[e2][0])), a.push(this.parse(n[e2][1]));
    let o = Symbol.iterator;
    return o in e && (r.push(this.parseWellKnownSymbol(o)), a.push(M(this.parseIteratorFactory(), this.parse(J(e))))), o = Symbol.asyncIterator, o in e && (r.push(this.parseWellKnownSymbol(o)), a.push(U(this.parseAsyncIteratorFactory(), this.parse(function(e2) {
      let n2 = K(), r2 = e2[Symbol.asyncIterator]();
      return async function t() {
        try {
          let e3 = await r2.next();
          e3.done ? n2.return(e3.value) : (n2.next(e3.value), await t());
        } catch (e3) {
          n2.throw(e3);
        }
      }().catch(() => {
      }), n2;
    }(e))))), o = Symbol.toStringTag, o in e && (r.push(this.parseWellKnownSymbol(o)), a.push(w$1(e[o]))), o = Symbol.isConcatSpreadable, o in e && (r.push(this.parseWellKnownSymbol(o)), a.push(e[o] ? ln : un)), { k: r, v: a, s: r.length };
  }
  handlePromiseSuccess(e, n) {
    let r = this.parseWithError(n);
    r && this.onParse(u$1(23, e, cn, cn, cn, cn, cn, cn, [this.parseSpecialReference(2), r], cn, cn, cn)), this.popPendingState();
  }
  handlePromiseFailure(e, n) {
    if (this.alive) {
      let r = this.parseWithError(n);
      r && this.onParse(u$1(24, e, cn, cn, cn, cn, cn, cn, [this.parseSpecialReference(3), r], cn, cn, cn));
    }
    this.popPendingState();
  }
  parsePromise(e, n) {
    let r = this.createIndex({});
    return n.then(this.handlePromiseSuccess.bind(this, r), this.handlePromiseFailure.bind(this, r)), this.pushPendingState(), this.createPromiseConstructorNode(e, r);
  }
  parsePlugin(e, n) {
    let r = this.plugins;
    if (r) for (let a = 0, o = r.length; a < o; a++) {
      let o2 = r[a];
      if (o2.parse.stream && o2.test(n)) return _(e, o2.tag, o2.parse.stream(n, this, { id: e }));
    }
    return cn;
  }
  parseStream(e, n) {
    let r = L(e, this.parseSpecialReference(4), []);
    return this.pushPendingState(), n.on({ next: (n2) => {
      if (this.alive) {
        let r2 = this.parseWithError(n2);
        r2 && this.onParse(u$1(32, e, cn, cn, cn, cn, cn, cn, cn, r2, cn, cn));
      }
    }, throw: (n2) => {
      if (this.alive) {
        let r2 = this.parseWithError(n2);
        r2 && this.onParse(u$1(33, e, cn, cn, cn, cn, cn, cn, cn, r2, cn, cn));
      }
      this.popPendingState();
    }, return: (n2) => {
      if (this.alive) {
        let r2 = this.parseWithError(n2);
        r2 && this.onParse(u$1(34, e, cn, cn, cn, cn, cn, cn, cn, r2, cn, cn));
      }
      this.popPendingState();
    } }), r;
  }
  parseWithError(e) {
    try {
      return this.parse(e);
    } catch (e2) {
      return this.onError(e2), cn;
    }
  }
  start(e) {
    let n = this.parseWithError(e);
    n && (this.onParseInternal(n, true), this.initial = false, this.flush(), this.pending <= 0 && this.destroy());
  }
  destroy() {
    this.alive && (this.onDone(), this.alive = false);
  }
  isAlive() {
    return this.alive;
  }
}, Mn = class extends In {
  constructor() {
    super(...arguments), this.mode = "cross";
  }
};
var Ln = {};
function w(e) {
  let n = K(), r = e.getReader();
  return async function t() {
    try {
      let e2 = await r.read();
      e2.done ? n.return(e2.value) : (n.next(e2.value), await t());
    } catch (e2) {
      n.throw(e2);
    }
  }().catch(() => {
  }), n;
}
var Nn = { tag: "seroval/plugins/web/ReadableStream", extends: [{ tag: "seroval-plugins/web/ReadableStreamFactory", test: (e) => e === Ln, parse: { sync() {
}, async: async () => await Promise.resolve(void 0), stream() {
} }, serialize: (e, n) => n.createFunction(["d"], "new ReadableStream({start:" + n.createEffectfulFunction(["c"], "d.on({next:" + n.createEffectfulFunction(["v"], "c.enqueue(v)") + ",throw:" + n.createEffectfulFunction(["v"], "c.error(v)") + ",return:" + n.createEffectfulFunction([], "c.close()") + "})") + "})"), deserialize: () => Ln }], test: (e) => "undefined" != typeof ReadableStream && e instanceof ReadableStream, parse: { sync: (e, n) => ({ factory: n.parse(Ln), stream: n.parse(K()) }), async: async (e, n) => ({ factory: await n.parse(Ln), stream: await n.parse(w(e)) }), stream: (e, n) => ({ factory: n.parse(Ln), stream: n.parse(w(e)) }) }, serialize: (e, n) => "(" + n.serialize(e.factory) + ")(" + n.serialize(e.stream) + ")", deserialize(e, n) {
  let r = n.deserialize(e.stream);
  return new ReadableStream({ start(e2) {
    r.on({ next(n2) {
      e2.enqueue(n2);
    }, throw(n2) {
      e2.error(n2);
    }, return() {
      e2.close();
    } });
  } });
} }, Dn = Nn;
function bind$4(e, n) {
  return function() {
    return e.apply(n, arguments);
  };
}
const { toString: Bn } = Object.prototype, { getPrototypeOf: zn } = Object, { iterator: qn, toStringTag: Hn } = Symbol, Un = (Vn = /* @__PURE__ */ Object.create(null), (e) => {
  const n = Bn.call(e);
  return Vn[n] || (Vn[n] = n.slice(8, -1).toLowerCase());
});
var Vn;
const kindOfTest = (e) => (e = e.toLowerCase(), (n) => Un(n) === e), typeOfTest = (e) => (n) => typeof n === e, { isArray: Wn } = Array, Kn = typeOfTest("undefined");
function isBuffer$1(e) {
  return null !== e && !Kn(e) && null !== e.constructor && !Kn(e.constructor) && Jn(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Gn = kindOfTest("ArrayBuffer");
const Qn = typeOfTest("string"), Jn = typeOfTest("function"), Xn = typeOfTest("number"), isObject = (e) => null !== e && "object" == typeof e, isPlainObject = (e) => {
  if ("object" !== Un(e)) return false;
  const n = zn(e);
  return !(null !== n && n !== Object.prototype && null !== Object.getPrototypeOf(n) || Hn in e || qn in e);
}, Yn = kindOfTest("Date"), Zn = kindOfTest("File"), er = kindOfTest("Blob"), tr = kindOfTest("FileList"), rr = kindOfTest("URLSearchParams"), [ar, or, sr, ir] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
function forEach(e, n, { allOwnKeys: r = false } = {}) {
  if (null == e) return;
  let a, o;
  if ("object" != typeof e && (e = [e]), Wn(e)) for (a = 0, o = e.length; a < o; a++) n.call(null, e[a], a, e);
  else {
    if (isBuffer$1(e)) return;
    const o2 = r ? Object.getOwnPropertyNames(e) : Object.keys(e), s = o2.length;
    let i;
    for (a = 0; a < s; a++) i = o2[a], n.call(null, e[i], i, e);
  }
}
function findKey(e, n) {
  if (isBuffer$1(e)) return null;
  n = n.toLowerCase();
  const r = Object.keys(e);
  let a, o = r.length;
  for (; o-- > 0; ) if (a = r[o], n === a.toLowerCase()) return a;
  return null;
}
const lr = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : lr$1, isContextDefined = (e) => !Kn(e) && e !== lr;
const ur = /* @__PURE__ */ ((e) => (n) => e && n instanceof e)("undefined" != typeof Uint8Array && zn(Uint8Array)), pr = kindOfTest("HTMLFormElement"), dr = (({ hasOwnProperty: e }) => (n, r) => e.call(n, r))(Object.prototype), hr = kindOfTest("RegExp"), reduceDescriptors = (e, n) => {
  const r = Object.getOwnPropertyDescriptors(e), a = {};
  forEach(r, (r2, o) => {
    let s;
    false !== (s = n(r2, o, e)) && (a[o] = s || r2);
  }), Object.defineProperties(e, a);
};
const mr = kindOfTest("AsyncFunction"), gr = (vr = "function" == typeof setImmediate, yr = Jn(lr.postMessage), vr ? setImmediate : yr ? (br = `axios@${Math.random()}`, xr = [], lr.addEventListener("message", ({ source: e, data: n }) => {
  e === lr && n === br && xr.length && xr.shift()();
}, false), (e) => {
  xr.push(e), lr.postMessage(br, "*");
}) : (e) => setTimeout(e));
var vr, yr, br, xr;
const Sr = "undefined" != typeof queueMicrotask ? queueMicrotask.bind(lr) : void 0 !== S$1 && S$1.nextTick || gr, kr = { isArray: Wn, isArrayBuffer: Gn, isBuffer: isBuffer$1, isFormData: (e) => {
  let n;
  return e && ("function" == typeof FormData && e instanceof FormData || Jn(e.append) && ("formdata" === (n = Un(e)) || "object" === n && Jn(e.toString) && "[object FormData]" === e.toString()));
}, isArrayBufferView: function(e) {
  let n;
  return n = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && Gn(e.buffer), n;
}, isString: Qn, isNumber: Xn, isBoolean: (e) => true === e || false === e, isObject, isPlainObject, isEmptyObject: (e) => {
  if (!isObject(e) || isBuffer$1(e)) return false;
  try {
    return 0 === Object.keys(e).length && Object.getPrototypeOf(e) === Object.prototype;
  } catch (e2) {
    return false;
  }
}, isReadableStream: ar, isRequest: or, isResponse: sr, isHeaders: ir, isUndefined: Kn, isDate: Yn, isFile: Zn, isBlob: er, isRegExp: hr, isFunction: Jn, isStream: (e) => isObject(e) && Jn(e.pipe), isURLSearchParams: rr, isTypedArray: ur, isFileList: tr, forEach, merge: function merge() {
  const { caseless: e, skipUndefined: n } = isContextDefined(this) && this || {}, r = {}, assignValue = (a, o) => {
    const s = e && findKey(r, o) || o;
    isPlainObject(r[s]) && isPlainObject(a) ? r[s] = merge(r[s], a) : isPlainObject(a) ? r[s] = merge({}, a) : Wn(a) ? r[s] = a.slice() : n && Kn(a) || (r[s] = a);
  };
  for (let e2 = 0, n2 = arguments.length; e2 < n2; e2++) arguments[e2] && forEach(arguments[e2], assignValue);
  return r;
}, extend: (e, n, r, { allOwnKeys: a } = {}) => (forEach(n, (n2, a2) => {
  r && Jn(n2) ? e[a2] = bind$4(n2, r) : e[a2] = n2;
}, { allOwnKeys: a }), e), trim: (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""), stripBOM: (e) => (65279 === e.charCodeAt(0) && (e = e.slice(1)), e), inherits: (e, n, r, a) => {
  e.prototype = Object.create(n.prototype, a), e.prototype.constructor = e, Object.defineProperty(e, "super", { value: n.prototype }), r && Object.assign(e.prototype, r);
}, toFlatObject: (e, n, r, a) => {
  let o, s, i;
  const c = {};
  if (n = n || {}, null == e) return n;
  do {
    for (o = Object.getOwnPropertyNames(e), s = o.length; s-- > 0; ) i = o[s], a && !a(i, e, n) || c[i] || (n[i] = e[i], c[i] = true);
    e = false !== r && zn(e);
  } while (e && (!r || r(e, n)) && e !== Object.prototype);
  return n;
}, kindOf: Un, kindOfTest, endsWith: (e, n, r) => {
  e = String(e), (void 0 === r || r > e.length) && (r = e.length), r -= n.length;
  const a = e.indexOf(n, r);
  return -1 !== a && a === r;
}, toArray: (e) => {
  if (!e) return null;
  if (Wn(e)) return e;
  let n = e.length;
  if (!Xn(n)) return null;
  const r = new Array(n);
  for (; n-- > 0; ) r[n] = e[n];
  return r;
}, forEachEntry: (e, n) => {
  const r = (e && e[qn]).call(e);
  let a;
  for (; (a = r.next()) && !a.done; ) {
    const r2 = a.value;
    n.call(e, r2[0], r2[1]);
  }
}, matchAll: (e, n) => {
  let r;
  const a = [];
  for (; null !== (r = e.exec(n)); ) a.push(r);
  return a;
}, isHTMLForm: pr, hasOwnProperty: dr, hasOwnProp: dr, reduceDescriptors, freezeMethods: (e) => {
  reduceDescriptors(e, (n, r) => {
    if (Jn(e) && -1 !== ["arguments", "caller", "callee"].indexOf(r)) return false;
    const a = e[r];
    Jn(a) && (n.enumerable = false, "writable" in n ? n.writable = false : n.set || (n.set = () => {
      throw Error("Can not rewrite read-only method '" + r + "'");
    }));
  });
}, toObjectSet: (e, n) => {
  const r = {}, define = (e2) => {
    e2.forEach((e3) => {
      r[e3] = true;
    });
  };
  return Wn(e) ? define(e) : define(String(e).split(n)), r;
}, toCamelCase: (e) => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function(e2, n, r) {
  return n.toUpperCase() + r;
}), noop: () => {
}, toFiniteNumber: (e, n) => null != e && Number.isFinite(e = +e) ? e : n, findKey, global: lr, isContextDefined, isSpecCompliantForm: function(e) {
  return !!(e && Jn(e.append) && "FormData" === e[Hn] && e[qn]);
}, toJSONObject: (e) => {
  const n = new Array(10), visit = (e2, r) => {
    if (isObject(e2)) {
      if (n.indexOf(e2) >= 0) return;
      if (isBuffer$1(e2)) return e2;
      if (!("toJSON" in e2)) {
        n[r] = e2;
        const a = Wn(e2) ? [] : {};
        return forEach(e2, (e3, n2) => {
          const o = visit(e3, r + 1);
          !Kn(o) && (a[n2] = o);
        }), n[r] = void 0, a;
      }
    }
    return e2;
  };
  return visit(e, 0);
}, isAsyncFn: mr, isThenable: (e) => e && (isObject(e) || Jn(e)) && Jn(e.then) && Jn(e.catch), setImmediate: gr, asap: Sr, isIterable: (e) => null != e && Jn(e[qn]) };
function AxiosError$1(e, n, r, a, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", n && (this.code = n), r && (this.config = r), a && (this.request = a), o && (this.response = o, this.status = o.status ? o.status : null);
}
kr.inherits(AxiosError$1, Error, { toJSON: function() {
  return { message: this.message, name: this.name, description: this.description, number: this.number, fileName: this.fileName, lineNumber: this.lineNumber, columnNumber: this.columnNumber, stack: this.stack, config: kr.toJSONObject(this.config), code: this.code, status: this.status };
} });
const wr = AxiosError$1.prototype, Cr = {};
["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach((e) => {
  Cr[e] = { value: e };
}), Object.defineProperties(AxiosError$1, Cr), Object.defineProperty(wr, "isAxiosError", { value: true }), AxiosError$1.from = (e, n, r, a, o, s) => {
  const i = Object.create(wr);
  kr.toFlatObject(e, i, function(e2) {
    return e2 !== Error.prototype;
  }, (e2) => "isAxiosError" !== e2);
  const c = e && e.message ? e.message : "Error", l = null == n && e ? e.code : n;
  return AxiosError$1.call(i, c, l, r, a, o), e && null == i.cause && Object.defineProperty(i, "cause", { value: e, configurable: true }), i.name = e && e.name || "Error", s && Object.assign(i, s), i;
};
const Rr = getDefaultExportFromNamespaceIfNotNamed(qn$1), Pr = getDefaultExportFromNamespaceIfNotNamed(b);
var Tr = Pr.Stream, Er = DelayedStream$1;
function DelayedStream$1() {
  this.source = null, this.dataSize = 0, this.maxDataSize = 1048576, this.pauseStream = true, this._maxDataSizeExceeded = false, this._released = false, this._bufferedEvents = [];
}
Rr.inherits(DelayedStream$1, Tr), DelayedStream$1.create = function(e, n) {
  var r = new this();
  for (var a in n = n || {}) r[a] = n[a];
  r.source = e;
  var o = e.emit;
  return e.emit = function() {
    return r._handleEmit(arguments), o.apply(e, arguments);
  }, e.on("error", function() {
  }), r.pauseStream && e.pause(), r;
}, Object.defineProperty(DelayedStream$1.prototype, "readable", { configurable: true, enumerable: true, get: function() {
  return this.source.readable;
} }), DelayedStream$1.prototype.setEncoding = function() {
  return this.source.setEncoding.apply(this.source, arguments);
}, DelayedStream$1.prototype.resume = function() {
  this._released || this.release(), this.source.resume();
}, DelayedStream$1.prototype.pause = function() {
  this.source.pause();
}, DelayedStream$1.prototype.release = function() {
  this._released = true, this._bufferedEvents.forEach(function(e) {
    this.emit.apply(this, e);
  }.bind(this)), this._bufferedEvents = [];
}, DelayedStream$1.prototype.pipe = function() {
  var e = Tr.prototype.pipe.apply(this, arguments);
  return this.resume(), e;
}, DelayedStream$1.prototype._handleEmit = function(e) {
  this._released ? this.emit.apply(this, e) : ("data" === e[0] && (this.dataSize += e[1].length, this._checkIfMaxDataSizeExceeded()), this._bufferedEvents.push(e));
}, DelayedStream$1.prototype._checkIfMaxDataSizeExceeded = function() {
  if (!(this._maxDataSizeExceeded || this.dataSize <= this.maxDataSize)) {
    this._maxDataSizeExceeded = true;
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this.emit("error", new Error(e));
  }
};
var $r = Rr, Fr = Pr.Stream, _r = Er, Ar = CombinedStream$1;
function CombinedStream$1() {
  this.writable = false, this.readable = true, this.dataSize = 0, this.maxDataSize = 2097152, this.pauseStreams = true, this._released = false, this._streams = [], this._currentStream = null, this._insideLoop = false, this._pendingNext = false;
}
$r.inherits(CombinedStream$1, Fr), CombinedStream$1.create = function(e) {
  var n = new this();
  for (var r in e = e || {}) n[r] = e[r];
  return n;
}, CombinedStream$1.isStreamLike = function(e) {
  return "function" != typeof e && "string" != typeof e && "boolean" != typeof e && "number" != typeof e && !Buffer.isBuffer(e);
}, CombinedStream$1.prototype.append = function(e) {
  if (CombinedStream$1.isStreamLike(e)) {
    if (!(e instanceof _r)) {
      var n = _r.create(e, { maxDataSize: 1 / 0, pauseStream: this.pauseStreams });
      e.on("data", this._checkDataSize.bind(this)), e = n;
    }
    this._handleErrors(e), this.pauseStreams && e.pause();
  }
  return this._streams.push(e), this;
}, CombinedStream$1.prototype.pipe = function(e, n) {
  return Fr.prototype.pipe.call(this, e, n), this.resume(), e;
}, CombinedStream$1.prototype._getNext = function() {
  if (this._currentStream = null, this._insideLoop) this._pendingNext = true;
  else {
    this._insideLoop = true;
    try {
      do {
        this._pendingNext = false, this._realGetNext();
      } while (this._pendingNext);
    } finally {
      this._insideLoop = false;
    }
  }
}, CombinedStream$1.prototype._realGetNext = function() {
  var e = this._streams.shift();
  void 0 !== e ? "function" == typeof e ? e(function(e2) {
    CombinedStream$1.isStreamLike(e2) && (e2.on("data", this._checkDataSize.bind(this)), this._handleErrors(e2)), this._pipeNext(e2);
  }.bind(this)) : this._pipeNext(e) : this.end();
}, CombinedStream$1.prototype._pipeNext = function(e) {
  if (this._currentStream = e, CombinedStream$1.isStreamLike(e)) return e.on("end", this._getNext.bind(this)), void e.pipe(this, { end: false });
  var n = e;
  this.write(n), this._getNext();
}, CombinedStream$1.prototype._handleErrors = function(e) {
  var n = this;
  e.on("error", function(e2) {
    n._emitError(e2);
  });
}, CombinedStream$1.prototype.write = function(e) {
  this.emit("data", e);
}, CombinedStream$1.prototype.pause = function() {
  this.pauseStreams && (this.pauseStreams && this._currentStream && "function" == typeof this._currentStream.pause && this._currentStream.pause(), this.emit("pause"));
}, CombinedStream$1.prototype.resume = function() {
  this._released || (this._released = true, this.writable = true, this._getNext()), this.pauseStreams && this._currentStream && "function" == typeof this._currentStream.resume && this._currentStream.resume(), this.emit("resume");
}, CombinedStream$1.prototype.end = function() {
  this._reset(), this.emit("end");
}, CombinedStream$1.prototype.destroy = function() {
  this._reset(), this.emit("close");
}, CombinedStream$1.prototype._reset = function() {
  this.writable = false, this._streams = [], this._currentStream = null;
}, CombinedStream$1.prototype._checkDataSize = function() {
  if (this._updateDataSize(), !(this.dataSize <= this.maxDataSize)) {
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this._emitError(new Error(e));
  }
}, CombinedStream$1.prototype._updateDataSize = function() {
  this.dataSize = 0;
  var e = this;
  this._streams.forEach(function(n) {
    n.dataSize && (e.dataSize += n.dataSize);
  }), this._currentStream && this._currentStream.dataSize && (this.dataSize += this._currentStream.dataSize);
}, CombinedStream$1.prototype._emitError = function(e) {
  this._reset(), this.emit("error", e);
};
const Or = getDefaultExportFromNamespaceIfNotNamed(R), jr = getDefaultExportFromNamespaceIfNotNamed(on$1), Ir = notImplementedClass("https.Server"), Mr = Agent, Lr = new Mr(), Dr = notImplemented("https.get"), Br = notImplemented("https.createServer"), zr = notImplemented("https.request"), qr = { Server: Ir, Agent: Mr, globalAgent: Lr, get: Dr, createServer: Br, request: zr }, Ur = getDefaultExportFromNamespaceIfNotNamed(Object.freeze(Object.defineProperty({ __proto__: null, Agent: Mr, Server: Ir, createServer: Br, default: qr, get: Dr, globalAgent: Lr, request: zr }, Symbol.toStringTag, { value: "Module" }))), Vr = getDefaultExportFromNamespaceIfNotNamed(P), Wr = notImplemented("fs.access"), Kr = notImplemented("fs.copyFile"), Gr = notImplemented("fs.cp"), Qr = notImplemented("fs.open"), Jr = notImplemented("fs.opendir"), Xr = notImplemented("fs.rename"), Yr = notImplemented("fs.truncate"), Zr = notImplemented("fs.rm"), ea = notImplemented("fs.rmdir"), ta = notImplemented("fs.mkdir"), na = notImplemented("fs.readdir"), ra = notImplemented("fs.readlink"), aa = notImplemented("fs.symlink"), oa = notImplemented("fs.lstat"), sa = notImplemented("fs.stat"), ia = notImplemented("fs.link"), ca = notImplemented("fs.unlink"), la = notImplemented("fs.chmod"), ua = notImplemented("fs.lchmod"), pa = notImplemented("fs.lchown"), da = notImplemented("fs.chown"), ha = notImplemented("fs.utimes"), ma = notImplemented("fs.lutimes"), fa = notImplemented("fs.realpath"), ga = notImplemented("fs.mkdtemp"), va = notImplemented("fs.writeFile"), ya = notImplemented("fs.appendFile"), ba = notImplemented("fs.readFile"), xa = notImplemented("fs.watch"), Sa = notImplemented("fs.statfs"), ka = notImplemented("fs.glob"), wa = Object.freeze(Object.defineProperty({ __proto__: null, COPYFILE_EXCL: 1, COPYFILE_FICLONE: 2, COPYFILE_FICLONE_FORCE: 4, EXTENSIONLESS_FORMAT_JAVASCRIPT: 0, EXTENSIONLESS_FORMAT_WASM: 1, F_OK: 0, O_APPEND: 1024, O_CREAT: 64, O_DIRECT: 16384, O_DIRECTORY: 65536, O_DSYNC: 4096, O_EXCL: 128, O_NOATIME: 262144, O_NOCTTY: 256, O_NOFOLLOW: 131072, O_NONBLOCK: 2048, O_RDONLY: 0, O_RDWR: 2, O_SYNC: 1052672, O_TRUNC: 512, O_WRONLY: 1, R_OK: 4, S_IFBLK: 24576, S_IFCHR: 8192, S_IFDIR: 16384, S_IFIFO: 4096, S_IFLNK: 40960, S_IFMT: 61440, S_IFREG: 32768, S_IFSOCK: 49152, S_IRGRP: 32, S_IROTH: 4, S_IRUSR: 256, S_IRWXG: 56, S_IRWXO: 7, S_IRWXU: 448, S_IWGRP: 16, S_IWOTH: 2, S_IWUSR: 128, S_IXGRP: 8, S_IXOTH: 1, S_IXUSR: 64, UV_DIRENT_BLOCK: 7, UV_DIRENT_CHAR: 6, UV_DIRENT_DIR: 2, UV_DIRENT_FIFO: 4, UV_DIRENT_FILE: 1, UV_DIRENT_LINK: 3, UV_DIRENT_SOCKET: 5, UV_DIRENT_UNKNOWN: 0, UV_FS_COPYFILE_EXCL: 1, UV_FS_COPYFILE_FICLONE: 2, UV_FS_COPYFILE_FICLONE_FORCE: 4, UV_FS_O_FILEMAP: 0, UV_FS_SYMLINK_DIR: 1, UV_FS_SYMLINK_JUNCTION: 2, W_OK: 2, X_OK: 1 }, Symbol.toStringTag, { value: "Module" })), Ca = { constants: wa, access: Wr, appendFile: ya, chmod: la, chown: da, copyFile: Kr, cp: Gr, glob: ka, lchmod: ua, lchown: pa, link: ia, lstat: oa, lutimes: ma, mkdir: ta, mkdtemp: ga, open: Qr, opendir: Jr, readFile: ba, readdir: na, readlink: ra, realpath: fa, rename: Xr, rm: Zr, rmdir: ea, stat: sa, statfs: Sa, symlink: aa, truncate: Yr, unlink: ca, utimes: ha, watch: xa, writeFile: va }, Ra = notImplementedClass("fs.Dir"), Pa = notImplementedClass("fs.Dirent"), Ta = notImplementedClass("fs.Stats"), Ea = notImplementedClass("fs.ReadStream"), $a = notImplementedClass("fs.WriteStream"), Fa = Ea, _a = $a;
function callbackify$1(e) {
  const fnc = function(...n) {
    const r = n.pop();
    e().catch((e2) => r(e2)).then((e2) => r(void 0, e2));
  };
  return fnc.__promisify__ = e, fnc.native = fnc, fnc;
}
const Aa = callbackify$1(Wr), Oa = callbackify$1(ya), ja = callbackify$1(da), Ia = callbackify$1(la), Ma = callbackify$1(Kr), La = callbackify$1(Gr), Na = callbackify$1(pa), Da = callbackify$1(ua), Ba = callbackify$1(ia), za = callbackify$1(oa), qa = callbackify$1(ma), Ha = callbackify$1(ta), Ua = callbackify$1(ga), Va = callbackify$1(fa), Wa = callbackify$1(Qr), Ka = callbackify$1(Jr), Ga = callbackify$1(na), Qa = callbackify$1(ba), Ja = callbackify$1(ra), Xa = callbackify$1(Xr), Ya = callbackify$1(Zr), Za = callbackify$1(ea), eo = callbackify$1(sa), to = callbackify$1(aa), no = callbackify$1(Yr), ro = callbackify$1(ca), ao = callbackify$1(ha), oo = callbackify$1(va), so = callbackify$1(Sa), io = notImplementedAsync("fs.close"), co = notImplementedAsync("fs.createReadStream"), lo = notImplementedAsync("fs.createWriteStream"), uo = notImplementedAsync("fs.exists"), po = notImplementedAsync("fs.fchown"), ho = notImplementedAsync("fs.fchmod"), mo = notImplementedAsync("fs.fdatasync"), fo = notImplementedAsync("fs.fstat"), go = notImplementedAsync("fs.fsync"), vo = notImplementedAsync("fs.ftruncate"), yo = notImplementedAsync("fs.futimes"), bo = notImplementedAsync("fs.lstatSync"), xo = notImplementedAsync("fs.read"), So = notImplementedAsync("fs.readv"), ko = notImplementedAsync("fs.realpathSync"), wo = notImplementedAsync("fs.statSync"), Co = notImplementedAsync("fs.unwatchFile"), Ro = notImplementedAsync("fs.watch"), Po = notImplementedAsync("fs.watchFile"), To = notImplementedAsync("fs.write"), Eo = notImplementedAsync("fs.writev"), $o = notImplementedAsync("fs._toUnixTimestamp"), Fo = notImplementedAsync("fs.openAsBlob"), _o = notImplementedAsync("fs.glob"), Ao = notImplemented("fs.appendFileSync"), Oo = notImplemented("fs.accessSync"), jo = notImplemented("fs.chownSync"), Io = notImplemented("fs.chmodSync"), Mo = notImplemented("fs.closeSync"), Lo = notImplemented("fs.copyFileSync"), No = notImplemented("fs.cpSync"), existsSync = () => false, Do = notImplemented("fs.fchownSync"), Bo = notImplemented("fs.fchmodSync"), zo = notImplemented("fs.fdatasyncSync"), qo = notImplemented("fs.fstatSync"), Ho = notImplemented("fs.fsyncSync"), Uo = notImplemented("fs.ftruncateSync"), Vo = notImplemented("fs.futimesSync"), Wo = notImplemented("fs.lchownSync"), Ko = notImplemented("fs.lchmodSync"), Go = notImplemented("fs.linkSync"), Qo = notImplemented("fs.lutimesSync"), Jo = notImplemented("fs.mkdirSync"), Xo = notImplemented("fs.mkdtempSync"), Yo = notImplemented("fs.openSync"), Zo = notImplemented("fs.opendirSync"), es = notImplemented("fs.readdirSync"), ts = notImplemented("fs.readSync"), ns = notImplemented("fs.readvSync"), rs = notImplemented("fs.readFileSync"), as = notImplemented("fs.readlinkSync"), os = notImplemented("fs.renameSync"), ss = notImplemented("fs.rmSync"), is = notImplemented("fs.rmdirSync"), cs = notImplemented("fs.symlinkSync"), ls = notImplemented("fs.truncateSync"), us = notImplemented("fs.unlinkSync"), ps = notImplemented("fs.utimesSync"), ds = notImplemented("fs.writeFileSync"), hs = notImplemented("fs.writeSync"), ms = notImplemented("fs.writevSync"), fs = notImplemented("fs.statfsSync"), gs = notImplemented("fs.globSync"), vs = { F_OK: 0, R_OK: 4, W_OK: 2, X_OK: 1, constants: wa, promises: Ca, Dir: Ra, Dirent: Pa, FileReadStream: Fa, FileWriteStream: _a, ReadStream: Ea, Stats: Ta, WriteStream: $a, _toUnixTimestamp: $o, access: Aa, accessSync: Oo, appendFile: Oa, appendFileSync: Ao, chmod: Ia, chmodSync: Io, chown: ja, chownSync: jo, close: io, closeSync: Mo, copyFile: Ma, copyFileSync: Lo, cp: La, cpSync: No, createReadStream: co, createWriteStream: lo, exists: uo, existsSync, fchmod: ho, fchmodSync: Bo, fchown: po, fchownSync: Do, fdatasync: mo, fdatasyncSync: zo, fstat: fo, fstatSync: qo, fsync: go, fsyncSync: Ho, ftruncate: vo, ftruncateSync: Uo, futimes: yo, futimesSync: Vo, glob: _o, lchmod: Da, globSync: gs, lchmodSync: Ko, lchown: Na, lchownSync: Wo, link: Ba, linkSync: Go, lstat: za, lstatSync: bo, lutimes: qa, lutimesSync: Qo, mkdir: Ha, mkdirSync: Jo, mkdtemp: Ua, mkdtempSync: Xo, open: Wa, openAsBlob: Fo, openSync: Yo, opendir: Ka, opendirSync: Zo, read: xo, readFile: Qa, readFileSync: rs, readSync: ts, readdir: Ga, readdirSync: es, readlink: Ja, readlinkSync: as, readv: So, readvSync: ns, realpath: Va, realpathSync: ko, rename: Xa, renameSync: os, rm: Ya, rmSync: ss, rmdir: Za, rmdirSync: is, stat: eo, statSync: wo, statfs: so, statfsSync: fs, symlink: to, symlinkSync: cs, truncate: no, truncateSync: ls, unlink: ro, unlinkSync: us, unwatchFile: Co, utimes: ao, utimesSync: ps, watch: Ro, watchFile: Po, write: To, writeFile: oo, writeFileSync: ds, writeSync: hs, writev: Eo, writevSync: ms }, ys = Object.freeze(Object.defineProperty({ __proto__: null, Dir: Ra, Dirent: Pa, F_OK: 0, FileReadStream: Fa, FileWriteStream: _a, R_OK: 4, ReadStream: Ea, Stats: Ta, W_OK: 2, WriteStream: $a, X_OK: 1, _toUnixTimestamp: $o, access: Aa, accessSync: Oo, appendFile: Oa, appendFileSync: Ao, chmod: Ia, chmodSync: Io, chown: ja, chownSync: jo, close: io, closeSync: Mo, constants: wa, copyFile: Ma, copyFileSync: Lo, cp: La, cpSync: No, createReadStream: co, createWriteStream: lo, default: vs, exists: uo, existsSync, fchmod: ho, fchmodSync: Bo, fchown: po, fchownSync: Do, fdatasync: mo, fdatasyncSync: zo, fstat: fo, fstatSync: qo, fsync: go, fsyncSync: Ho, ftruncate: vo, ftruncateSync: Uo, futimes: yo, futimesSync: Vo, glob: _o, globSync: gs, lchmod: Da, lchmodSync: Ko, lchown: Na, lchownSync: Wo, link: Ba, linkSync: Go, lstat: za, lstatSync: bo, lutimes: qa, lutimesSync: Qo, mkdir: Ha, mkdirSync: Jo, mkdtemp: Ua, mkdtempSync: Xo, open: Wa, openAsBlob: Fo, openSync: Yo, opendir: Ka, opendirSync: Zo, promises: Ca, read: xo, readFile: Qa, readFileSync: rs, readSync: ts, readdir: Ga, readdirSync: es, readlink: Ja, readlinkSync: as, readv: So, readvSync: ns, realpath: Va, realpathSync: ko, rename: Xa, renameSync: os, rm: Ya, rmSync: ss, rmdir: Za, rmdirSync: is, stat: eo, statSync: wo, statfs: so, statfsSync: fs, symlink: to, symlinkSync: cs, truncate: no, truncateSync: ls, unlink: ro, unlinkSync: us, unwatchFile: Co, utimes: ao, utimesSync: ps, watch: Ro, watchFile: Po, write: To, writeFile: oo, writeFileSync: ds, writeSync: hs, writev: Eo, writevSync: ms }, Symbol.toStringTag, { value: "Module" })), bs = getDefaultExportFromNamespaceIfNotNamed(ys), xs = getDefaultExportFromNamespaceIfNotNamed(is$1);
var Ss = {};
var ks = { "application/1d-interleaved-parityfec": { source: "iana" }, "application/3gpdash-qoe-report+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/3gpp-ims+xml": { source: "iana", compressible: true }, "application/3gpphal+json": { source: "iana", compressible: true }, "application/3gpphalforms+json": { source: "iana", compressible: true }, "application/a2l": { source: "iana" }, "application/ace+cbor": { source: "iana" }, "application/activemessage": { source: "iana" }, "application/activity+json": { source: "iana", compressible: true }, "application/alto-costmap+json": { source: "iana", compressible: true }, "application/alto-costmapfilter+json": { source: "iana", compressible: true }, "application/alto-directory+json": { source: "iana", compressible: true }, "application/alto-endpointcost+json": { source: "iana", compressible: true }, "application/alto-endpointcostparams+json": { source: "iana", compressible: true }, "application/alto-endpointprop+json": { source: "iana", compressible: true }, "application/alto-endpointpropparams+json": { source: "iana", compressible: true }, "application/alto-error+json": { source: "iana", compressible: true }, "application/alto-networkmap+json": { source: "iana", compressible: true }, "application/alto-networkmapfilter+json": { source: "iana", compressible: true }, "application/alto-updatestreamcontrol+json": { source: "iana", compressible: true }, "application/alto-updatestreamparams+json": { source: "iana", compressible: true }, "application/aml": { source: "iana" }, "application/andrew-inset": { source: "iana", extensions: ["ez"] }, "application/applefile": { source: "iana" }, "application/applixware": { source: "apache", extensions: ["aw"] }, "application/at+jwt": { source: "iana" }, "application/atf": { source: "iana" }, "application/atfx": { source: "iana" }, "application/atom+xml": { source: "iana", compressible: true, extensions: ["atom"] }, "application/atomcat+xml": { source: "iana", compressible: true, extensions: ["atomcat"] }, "application/atomdeleted+xml": { source: "iana", compressible: true, extensions: ["atomdeleted"] }, "application/atomicmail": { source: "iana" }, "application/atomsvc+xml": { source: "iana", compressible: true, extensions: ["atomsvc"] }, "application/atsc-dwd+xml": { source: "iana", compressible: true, extensions: ["dwd"] }, "application/atsc-dynamic-event-message": { source: "iana" }, "application/atsc-held+xml": { source: "iana", compressible: true, extensions: ["held"] }, "application/atsc-rdt+json": { source: "iana", compressible: true }, "application/atsc-rsat+xml": { source: "iana", compressible: true, extensions: ["rsat"] }, "application/atxml": { source: "iana" }, "application/auth-policy+xml": { source: "iana", compressible: true }, "application/bacnet-xdd+zip": { source: "iana", compressible: false }, "application/batch-smtp": { source: "iana" }, "application/bdoc": { compressible: false, extensions: ["bdoc"] }, "application/beep+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/calendar+json": { source: "iana", compressible: true }, "application/calendar+xml": { source: "iana", compressible: true, extensions: ["xcs"] }, "application/call-completion": { source: "iana" }, "application/cals-1840": { source: "iana" }, "application/captive+json": { source: "iana", compressible: true }, "application/cbor": { source: "iana" }, "application/cbor-seq": { source: "iana" }, "application/cccex": { source: "iana" }, "application/ccmp+xml": { source: "iana", compressible: true }, "application/ccxml+xml": { source: "iana", compressible: true, extensions: ["ccxml"] }, "application/cdfx+xml": { source: "iana", compressible: true, extensions: ["cdfx"] }, "application/cdmi-capability": { source: "iana", extensions: ["cdmia"] }, "application/cdmi-container": { source: "iana", extensions: ["cdmic"] }, "application/cdmi-domain": { source: "iana", extensions: ["cdmid"] }, "application/cdmi-object": { source: "iana", extensions: ["cdmio"] }, "application/cdmi-queue": { source: "iana", extensions: ["cdmiq"] }, "application/cdni": { source: "iana" }, "application/cea": { source: "iana" }, "application/cea-2018+xml": { source: "iana", compressible: true }, "application/cellml+xml": { source: "iana", compressible: true }, "application/cfw": { source: "iana" }, "application/city+json": { source: "iana", compressible: true }, "application/clr": { source: "iana" }, "application/clue+xml": { source: "iana", compressible: true }, "application/clue_info+xml": { source: "iana", compressible: true }, "application/cms": { source: "iana" }, "application/cnrp+xml": { source: "iana", compressible: true }, "application/coap-group+json": { source: "iana", compressible: true }, "application/coap-payload": { source: "iana" }, "application/commonground": { source: "iana" }, "application/conference-info+xml": { source: "iana", compressible: true }, "application/cose": { source: "iana" }, "application/cose-key": { source: "iana" }, "application/cose-key-set": { source: "iana" }, "application/cpl+xml": { source: "iana", compressible: true, extensions: ["cpl"] }, "application/csrattrs": { source: "iana" }, "application/csta+xml": { source: "iana", compressible: true }, "application/cstadata+xml": { source: "iana", compressible: true }, "application/csvm+json": { source: "iana", compressible: true }, "application/cu-seeme": { source: "apache", extensions: ["cu"] }, "application/cwt": { source: "iana" }, "application/cybercash": { source: "iana" }, "application/dart": { compressible: true }, "application/dash+xml": { source: "iana", compressible: true, extensions: ["mpd"] }, "application/dash-patch+xml": { source: "iana", compressible: true, extensions: ["mpp"] }, "application/dashdelta": { source: "iana" }, "application/davmount+xml": { source: "iana", compressible: true, extensions: ["davmount"] }, "application/dca-rft": { source: "iana" }, "application/dcd": { source: "iana" }, "application/dec-dx": { source: "iana" }, "application/dialog-info+xml": { source: "iana", compressible: true }, "application/dicom": { source: "iana" }, "application/dicom+json": { source: "iana", compressible: true }, "application/dicom+xml": { source: "iana", compressible: true }, "application/dii": { source: "iana" }, "application/dit": { source: "iana" }, "application/dns": { source: "iana" }, "application/dns+json": { source: "iana", compressible: true }, "application/dns-message": { source: "iana" }, "application/docbook+xml": { source: "apache", compressible: true, extensions: ["dbk"] }, "application/dots+cbor": { source: "iana" }, "application/dskpp+xml": { source: "iana", compressible: true }, "application/dssc+der": { source: "iana", extensions: ["dssc"] }, "application/dssc+xml": { source: "iana", compressible: true, extensions: ["xdssc"] }, "application/dvcs": { source: "iana" }, "application/ecmascript": { source: "iana", compressible: true, extensions: ["es", "ecma"] }, "application/edi-consent": { source: "iana" }, "application/edi-x12": { source: "iana", compressible: false }, "application/edifact": { source: "iana", compressible: false }, "application/efi": { source: "iana" }, "application/elm+json": { source: "iana", charset: "UTF-8", compressible: true }, "application/elm+xml": { source: "iana", compressible: true }, "application/emergencycalldata.cap+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/emergencycalldata.comment+xml": { source: "iana", compressible: true }, "application/emergencycalldata.control+xml": { source: "iana", compressible: true }, "application/emergencycalldata.deviceinfo+xml": { source: "iana", compressible: true }, "application/emergencycalldata.ecall.msd": { source: "iana" }, "application/emergencycalldata.providerinfo+xml": { source: "iana", compressible: true }, "application/emergencycalldata.serviceinfo+xml": { source: "iana", compressible: true }, "application/emergencycalldata.subscriberinfo+xml": { source: "iana", compressible: true }, "application/emergencycalldata.veds+xml": { source: "iana", compressible: true }, "application/emma+xml": { source: "iana", compressible: true, extensions: ["emma"] }, "application/emotionml+xml": { source: "iana", compressible: true, extensions: ["emotionml"] }, "application/encaprtp": { source: "iana" }, "application/epp+xml": { source: "iana", compressible: true }, "application/epub+zip": { source: "iana", compressible: false, extensions: ["epub"] }, "application/eshop": { source: "iana" }, "application/exi": { source: "iana", extensions: ["exi"] }, "application/expect-ct-report+json": { source: "iana", compressible: true }, "application/express": { source: "iana", extensions: ["exp"] }, "application/fastinfoset": { source: "iana" }, "application/fastsoap": { source: "iana" }, "application/fdt+xml": { source: "iana", compressible: true, extensions: ["fdt"] }, "application/fhir+json": { source: "iana", charset: "UTF-8", compressible: true }, "application/fhir+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/fido.trusted-apps+json": { compressible: true }, "application/fits": { source: "iana" }, "application/flexfec": { source: "iana" }, "application/font-sfnt": { source: "iana" }, "application/font-tdpfr": { source: "iana", extensions: ["pfr"] }, "application/font-woff": { source: "iana", compressible: false }, "application/framework-attributes+xml": { source: "iana", compressible: true }, "application/geo+json": { source: "iana", compressible: true, extensions: ["geojson"] }, "application/geo+json-seq": { source: "iana" }, "application/geopackage+sqlite3": { source: "iana" }, "application/geoxacml+xml": { source: "iana", compressible: true }, "application/gltf-buffer": { source: "iana" }, "application/gml+xml": { source: "iana", compressible: true, extensions: ["gml"] }, "application/gpx+xml": { source: "apache", compressible: true, extensions: ["gpx"] }, "application/gxf": { source: "apache", extensions: ["gxf"] }, "application/gzip": { source: "iana", compressible: false, extensions: ["gz"] }, "application/h224": { source: "iana" }, "application/held+xml": { source: "iana", compressible: true }, "application/hjson": { extensions: ["hjson"] }, "application/http": { source: "iana" }, "application/hyperstudio": { source: "iana", extensions: ["stk"] }, "application/ibe-key-request+xml": { source: "iana", compressible: true }, "application/ibe-pkg-reply+xml": { source: "iana", compressible: true }, "application/ibe-pp-data": { source: "iana" }, "application/iges": { source: "iana" }, "application/im-iscomposing+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/index": { source: "iana" }, "application/index.cmd": { source: "iana" }, "application/index.obj": { source: "iana" }, "application/index.response": { source: "iana" }, "application/index.vnd": { source: "iana" }, "application/inkml+xml": { source: "iana", compressible: true, extensions: ["ink", "inkml"] }, "application/iotp": { source: "iana" }, "application/ipfix": { source: "iana", extensions: ["ipfix"] }, "application/ipp": { source: "iana" }, "application/isup": { source: "iana" }, "application/its+xml": { source: "iana", compressible: true, extensions: ["its"] }, "application/java-archive": { source: "apache", compressible: false, extensions: ["jar", "war", "ear"] }, "application/java-serialized-object": { source: "apache", compressible: false, extensions: ["ser"] }, "application/java-vm": { source: "apache", compressible: false, extensions: ["class"] }, "application/javascript": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["js", "mjs"] }, "application/jf2feed+json": { source: "iana", compressible: true }, "application/jose": { source: "iana" }, "application/jose+json": { source: "iana", compressible: true }, "application/jrd+json": { source: "iana", compressible: true }, "application/jscalendar+json": { source: "iana", compressible: true }, "application/json": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["json", "map"] }, "application/json-patch+json": { source: "iana", compressible: true }, "application/json-seq": { source: "iana" }, "application/json5": { extensions: ["json5"] }, "application/jsonml+json": { source: "apache", compressible: true, extensions: ["jsonml"] }, "application/jwk+json": { source: "iana", compressible: true }, "application/jwk-set+json": { source: "iana", compressible: true }, "application/jwt": { source: "iana" }, "application/kpml-request+xml": { source: "iana", compressible: true }, "application/kpml-response+xml": { source: "iana", compressible: true }, "application/ld+json": { source: "iana", compressible: true, extensions: ["jsonld"] }, "application/lgr+xml": { source: "iana", compressible: true, extensions: ["lgr"] }, "application/link-format": { source: "iana" }, "application/load-control+xml": { source: "iana", compressible: true }, "application/lost+xml": { source: "iana", compressible: true, extensions: ["lostxml"] }, "application/lostsync+xml": { source: "iana", compressible: true }, "application/lpf+zip": { source: "iana", compressible: false }, "application/lxf": { source: "iana" }, "application/mac-binhex40": { source: "iana", extensions: ["hqx"] }, "application/mac-compactpro": { source: "apache", extensions: ["cpt"] }, "application/macwriteii": { source: "iana" }, "application/mads+xml": { source: "iana", compressible: true, extensions: ["mads"] }, "application/manifest+json": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["webmanifest"] }, "application/marc": { source: "iana", extensions: ["mrc"] }, "application/marcxml+xml": { source: "iana", compressible: true, extensions: ["mrcx"] }, "application/mathematica": { source: "iana", extensions: ["ma", "nb", "mb"] }, "application/mathml+xml": { source: "iana", compressible: true, extensions: ["mathml"] }, "application/mathml-content+xml": { source: "iana", compressible: true }, "application/mathml-presentation+xml": { source: "iana", compressible: true }, "application/mbms-associated-procedure-description+xml": { source: "iana", compressible: true }, "application/mbms-deregister+xml": { source: "iana", compressible: true }, "application/mbms-envelope+xml": { source: "iana", compressible: true }, "application/mbms-msk+xml": { source: "iana", compressible: true }, "application/mbms-msk-response+xml": { source: "iana", compressible: true }, "application/mbms-protection-description+xml": { source: "iana", compressible: true }, "application/mbms-reception-report+xml": { source: "iana", compressible: true }, "application/mbms-register+xml": { source: "iana", compressible: true }, "application/mbms-register-response+xml": { source: "iana", compressible: true }, "application/mbms-schedule+xml": { source: "iana", compressible: true }, "application/mbms-user-service-description+xml": { source: "iana", compressible: true }, "application/mbox": { source: "iana", extensions: ["mbox"] }, "application/media-policy-dataset+xml": { source: "iana", compressible: true, extensions: ["mpf"] }, "application/media_control+xml": { source: "iana", compressible: true }, "application/mediaservercontrol+xml": { source: "iana", compressible: true, extensions: ["mscml"] }, "application/merge-patch+json": { source: "iana", compressible: true }, "application/metalink+xml": { source: "apache", compressible: true, extensions: ["metalink"] }, "application/metalink4+xml": { source: "iana", compressible: true, extensions: ["meta4"] }, "application/mets+xml": { source: "iana", compressible: true, extensions: ["mets"] }, "application/mf4": { source: "iana" }, "application/mikey": { source: "iana" }, "application/mipc": { source: "iana" }, "application/missing-blocks+cbor-seq": { source: "iana" }, "application/mmt-aei+xml": { source: "iana", compressible: true, extensions: ["maei"] }, "application/mmt-usd+xml": { source: "iana", compressible: true, extensions: ["musd"] }, "application/mods+xml": { source: "iana", compressible: true, extensions: ["mods"] }, "application/moss-keys": { source: "iana" }, "application/moss-signature": { source: "iana" }, "application/mosskey-data": { source: "iana" }, "application/mosskey-request": { source: "iana" }, "application/mp21": { source: "iana", extensions: ["m21", "mp21"] }, "application/mp4": { source: "iana", extensions: ["mp4s", "m4p"] }, "application/mpeg4-generic": { source: "iana" }, "application/mpeg4-iod": { source: "iana" }, "application/mpeg4-iod-xmt": { source: "iana" }, "application/mrb-consumer+xml": { source: "iana", compressible: true }, "application/mrb-publish+xml": { source: "iana", compressible: true }, "application/msc-ivr+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/msc-mixer+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/msword": { source: "iana", compressible: false, extensions: ["doc", "dot"] }, "application/mud+json": { source: "iana", compressible: true }, "application/multipart-core": { source: "iana" }, "application/mxf": { source: "iana", extensions: ["mxf"] }, "application/n-quads": { source: "iana", extensions: ["nq"] }, "application/n-triples": { source: "iana", extensions: ["nt"] }, "application/nasdata": { source: "iana" }, "application/news-checkgroups": { source: "iana", charset: "US-ASCII" }, "application/news-groupinfo": { source: "iana", charset: "US-ASCII" }, "application/news-transmission": { source: "iana" }, "application/nlsml+xml": { source: "iana", compressible: true }, "application/node": { source: "iana", extensions: ["cjs"] }, "application/nss": { source: "iana" }, "application/oauth-authz-req+jwt": { source: "iana" }, "application/oblivious-dns-message": { source: "iana" }, "application/ocsp-request": { source: "iana" }, "application/ocsp-response": { source: "iana" }, "application/octet-stream": { source: "iana", compressible: false, extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"] }, "application/oda": { source: "iana", extensions: ["oda"] }, "application/odm+xml": { source: "iana", compressible: true }, "application/odx": { source: "iana" }, "application/oebps-package+xml": { source: "iana", compressible: true, extensions: ["opf"] }, "application/ogg": { source: "iana", compressible: false, extensions: ["ogx"] }, "application/omdoc+xml": { source: "apache", compressible: true, extensions: ["omdoc"] }, "application/onenote": { source: "apache", extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"] }, "application/opc-nodeset+xml": { source: "iana", compressible: true }, "application/oscore": { source: "iana" }, "application/oxps": { source: "iana", extensions: ["oxps"] }, "application/p21": { source: "iana" }, "application/p21+zip": { source: "iana", compressible: false }, "application/p2p-overlay+xml": { source: "iana", compressible: true, extensions: ["relo"] }, "application/parityfec": { source: "iana" }, "application/passport": { source: "iana" }, "application/patch-ops-error+xml": { source: "iana", compressible: true, extensions: ["xer"] }, "application/pdf": { source: "iana", compressible: false, extensions: ["pdf"] }, "application/pdx": { source: "iana" }, "application/pem-certificate-chain": { source: "iana" }, "application/pgp-encrypted": { source: "iana", compressible: false, extensions: ["pgp"] }, "application/pgp-keys": { source: "iana", extensions: ["asc"] }, "application/pgp-signature": { source: "iana", extensions: ["asc", "sig"] }, "application/pics-rules": { source: "apache", extensions: ["prf"] }, "application/pidf+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/pidf-diff+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/pkcs10": { source: "iana", extensions: ["p10"] }, "application/pkcs12": { source: "iana" }, "application/pkcs7-mime": { source: "iana", extensions: ["p7m", "p7c"] }, "application/pkcs7-signature": { source: "iana", extensions: ["p7s"] }, "application/pkcs8": { source: "iana", extensions: ["p8"] }, "application/pkcs8-encrypted": { source: "iana" }, "application/pkix-attr-cert": { source: "iana", extensions: ["ac"] }, "application/pkix-cert": { source: "iana", extensions: ["cer"] }, "application/pkix-crl": { source: "iana", extensions: ["crl"] }, "application/pkix-pkipath": { source: "iana", extensions: ["pkipath"] }, "application/pkixcmp": { source: "iana", extensions: ["pki"] }, "application/pls+xml": { source: "iana", compressible: true, extensions: ["pls"] }, "application/poc-settings+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/postscript": { source: "iana", compressible: true, extensions: ["ai", "eps", "ps"] }, "application/ppsp-tracker+json": { source: "iana", compressible: true }, "application/problem+json": { source: "iana", compressible: true }, "application/problem+xml": { source: "iana", compressible: true }, "application/provenance+xml": { source: "iana", compressible: true, extensions: ["provx"] }, "application/prs.alvestrand.titrax-sheet": { source: "iana" }, "application/prs.cww": { source: "iana", extensions: ["cww"] }, "application/prs.cyn": { source: "iana", charset: "7-BIT" }, "application/prs.hpub+zip": { source: "iana", compressible: false }, "application/prs.nprend": { source: "iana" }, "application/prs.plucker": { source: "iana" }, "application/prs.rdf-xml-crypt": { source: "iana" }, "application/prs.xsf+xml": { source: "iana", compressible: true }, "application/pskc+xml": { source: "iana", compressible: true, extensions: ["pskcxml"] }, "application/pvd+json": { source: "iana", compressible: true }, "application/qsig": { source: "iana" }, "application/raml+yaml": { compressible: true, extensions: ["raml"] }, "application/raptorfec": { source: "iana" }, "application/rdap+json": { source: "iana", compressible: true }, "application/rdf+xml": { source: "iana", compressible: true, extensions: ["rdf", "owl"] }, "application/reginfo+xml": { source: "iana", compressible: true, extensions: ["rif"] }, "application/relax-ng-compact-syntax": { source: "iana", extensions: ["rnc"] }, "application/remote-printing": { source: "iana" }, "application/reputon+json": { source: "iana", compressible: true }, "application/resource-lists+xml": { source: "iana", compressible: true, extensions: ["rl"] }, "application/resource-lists-diff+xml": { source: "iana", compressible: true, extensions: ["rld"] }, "application/rfc+xml": { source: "iana", compressible: true }, "application/riscos": { source: "iana" }, "application/rlmi+xml": { source: "iana", compressible: true }, "application/rls-services+xml": { source: "iana", compressible: true, extensions: ["rs"] }, "application/route-apd+xml": { source: "iana", compressible: true, extensions: ["rapd"] }, "application/route-s-tsid+xml": { source: "iana", compressible: true, extensions: ["sls"] }, "application/route-usd+xml": { source: "iana", compressible: true, extensions: ["rusd"] }, "application/rpki-ghostbusters": { source: "iana", extensions: ["gbr"] }, "application/rpki-manifest": { source: "iana", extensions: ["mft"] }, "application/rpki-publication": { source: "iana" }, "application/rpki-roa": { source: "iana", extensions: ["roa"] }, "application/rpki-updown": { source: "iana" }, "application/rsd+xml": { source: "apache", compressible: true, extensions: ["rsd"] }, "application/rss+xml": { source: "apache", compressible: true, extensions: ["rss"] }, "application/rtf": { source: "iana", compressible: true, extensions: ["rtf"] }, "application/rtploopback": { source: "iana" }, "application/rtx": { source: "iana" }, "application/samlassertion+xml": { source: "iana", compressible: true }, "application/samlmetadata+xml": { source: "iana", compressible: true }, "application/sarif+json": { source: "iana", compressible: true }, "application/sarif-external-properties+json": { source: "iana", compressible: true }, "application/sbe": { source: "iana" }, "application/sbml+xml": { source: "iana", compressible: true, extensions: ["sbml"] }, "application/scaip+xml": { source: "iana", compressible: true }, "application/scim+json": { source: "iana", compressible: true }, "application/scvp-cv-request": { source: "iana", extensions: ["scq"] }, "application/scvp-cv-response": { source: "iana", extensions: ["scs"] }, "application/scvp-vp-request": { source: "iana", extensions: ["spq"] }, "application/scvp-vp-response": { source: "iana", extensions: ["spp"] }, "application/sdp": { source: "iana", extensions: ["sdp"] }, "application/secevent+jwt": { source: "iana" }, "application/senml+cbor": { source: "iana" }, "application/senml+json": { source: "iana", compressible: true }, "application/senml+xml": { source: "iana", compressible: true, extensions: ["senmlx"] }, "application/senml-etch+cbor": { source: "iana" }, "application/senml-etch+json": { source: "iana", compressible: true }, "application/senml-exi": { source: "iana" }, "application/sensml+cbor": { source: "iana" }, "application/sensml+json": { source: "iana", compressible: true }, "application/sensml+xml": { source: "iana", compressible: true, extensions: ["sensmlx"] }, "application/sensml-exi": { source: "iana" }, "application/sep+xml": { source: "iana", compressible: true }, "application/sep-exi": { source: "iana" }, "application/session-info": { source: "iana" }, "application/set-payment": { source: "iana" }, "application/set-payment-initiation": { source: "iana", extensions: ["setpay"] }, "application/set-registration": { source: "iana" }, "application/set-registration-initiation": { source: "iana", extensions: ["setreg"] }, "application/sgml": { source: "iana" }, "application/sgml-open-catalog": { source: "iana" }, "application/shf+xml": { source: "iana", compressible: true, extensions: ["shf"] }, "application/sieve": { source: "iana", extensions: ["siv", "sieve"] }, "application/simple-filter+xml": { source: "iana", compressible: true }, "application/simple-message-summary": { source: "iana" }, "application/simplesymbolcontainer": { source: "iana" }, "application/sipc": { source: "iana" }, "application/slate": { source: "iana" }, "application/smil": { source: "iana" }, "application/smil+xml": { source: "iana", compressible: true, extensions: ["smi", "smil"] }, "application/smpte336m": { source: "iana" }, "application/soap+fastinfoset": { source: "iana" }, "application/soap+xml": { source: "iana", compressible: true }, "application/sparql-query": { source: "iana", extensions: ["rq"] }, "application/sparql-results+xml": { source: "iana", compressible: true, extensions: ["srx"] }, "application/spdx+json": { source: "iana", compressible: true }, "application/spirits-event+xml": { source: "iana", compressible: true }, "application/sql": { source: "iana" }, "application/srgs": { source: "iana", extensions: ["gram"] }, "application/srgs+xml": { source: "iana", compressible: true, extensions: ["grxml"] }, "application/sru+xml": { source: "iana", compressible: true, extensions: ["sru"] }, "application/ssdl+xml": { source: "apache", compressible: true, extensions: ["ssdl"] }, "application/ssml+xml": { source: "iana", compressible: true, extensions: ["ssml"] }, "application/stix+json": { source: "iana", compressible: true }, "application/swid+xml": { source: "iana", compressible: true, extensions: ["swidtag"] }, "application/tamp-apex-update": { source: "iana" }, "application/tamp-apex-update-confirm": { source: "iana" }, "application/tamp-community-update": { source: "iana" }, "application/tamp-community-update-confirm": { source: "iana" }, "application/tamp-error": { source: "iana" }, "application/tamp-sequence-adjust": { source: "iana" }, "application/tamp-sequence-adjust-confirm": { source: "iana" }, "application/tamp-status-query": { source: "iana" }, "application/tamp-status-response": { source: "iana" }, "application/tamp-update": { source: "iana" }, "application/tamp-update-confirm": { source: "iana" }, "application/tar": { compressible: true }, "application/taxii+json": { source: "iana", compressible: true }, "application/td+json": { source: "iana", compressible: true }, "application/tei+xml": { source: "iana", compressible: true, extensions: ["tei", "teicorpus"] }, "application/tetra_isi": { source: "iana" }, "application/thraud+xml": { source: "iana", compressible: true, extensions: ["tfi"] }, "application/timestamp-query": { source: "iana" }, "application/timestamp-reply": { source: "iana" }, "application/timestamped-data": { source: "iana", extensions: ["tsd"] }, "application/tlsrpt+gzip": { source: "iana" }, "application/tlsrpt+json": { source: "iana", compressible: true }, "application/tnauthlist": { source: "iana" }, "application/token-introspection+jwt": { source: "iana" }, "application/toml": { compressible: true, extensions: ["toml"] }, "application/trickle-ice-sdpfrag": { source: "iana" }, "application/trig": { source: "iana", extensions: ["trig"] }, "application/ttml+xml": { source: "iana", compressible: true, extensions: ["ttml"] }, "application/tve-trigger": { source: "iana" }, "application/tzif": { source: "iana" }, "application/tzif-leap": { source: "iana" }, "application/ubjson": { compressible: false, extensions: ["ubj"] }, "application/ulpfec": { source: "iana" }, "application/urc-grpsheet+xml": { source: "iana", compressible: true }, "application/urc-ressheet+xml": { source: "iana", compressible: true, extensions: ["rsheet"] }, "application/urc-targetdesc+xml": { source: "iana", compressible: true, extensions: ["td"] }, "application/urc-uisocketdesc+xml": { source: "iana", compressible: true }, "application/vcard+json": { source: "iana", compressible: true }, "application/vcard+xml": { source: "iana", compressible: true }, "application/vemmi": { source: "iana" }, "application/vividence.scriptfile": { source: "apache" }, "application/vnd.1000minds.decision-model+xml": { source: "iana", compressible: true, extensions: ["1km"] }, "application/vnd.3gpp-prose+xml": { source: "iana", compressible: true }, "application/vnd.3gpp-prose-pc3ch+xml": { source: "iana", compressible: true }, "application/vnd.3gpp-v2x-local-service-information": { source: "iana" }, "application/vnd.3gpp.5gnas": { source: "iana" }, "application/vnd.3gpp.access-transfer-events+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.bsf+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.gmop+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.gtpc": { source: "iana" }, "application/vnd.3gpp.interworking-data": { source: "iana" }, "application/vnd.3gpp.lpp": { source: "iana" }, "application/vnd.3gpp.mc-signalling-ear": { source: "iana" }, "application/vnd.3gpp.mcdata-affiliation-command+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcdata-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcdata-payload": { source: "iana" }, "application/vnd.3gpp.mcdata-service-config+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcdata-signalling": { source: "iana" }, "application/vnd.3gpp.mcdata-ue-config+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcdata-user-profile+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-affiliation-command+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-floor-request+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-location-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-mbms-usage-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-service-config+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-signed+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-ue-config+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-ue-init-config+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-user-profile+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-affiliation-command+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-affiliation-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-location-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-service-config+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-transmission-request+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-ue-config+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-user-profile+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mid-call+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.ngap": { source: "iana" }, "application/vnd.3gpp.pfcp": { source: "iana" }, "application/vnd.3gpp.pic-bw-large": { source: "iana", extensions: ["plb"] }, "application/vnd.3gpp.pic-bw-small": { source: "iana", extensions: ["psb"] }, "application/vnd.3gpp.pic-bw-var": { source: "iana", extensions: ["pvb"] }, "application/vnd.3gpp.s1ap": { source: "iana" }, "application/vnd.3gpp.sms": { source: "iana" }, "application/vnd.3gpp.sms+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.srvcc-ext+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.srvcc-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.state-and-event-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.ussd+xml": { source: "iana", compressible: true }, "application/vnd.3gpp2.bcmcsinfo+xml": { source: "iana", compressible: true }, "application/vnd.3gpp2.sms": { source: "iana" }, "application/vnd.3gpp2.tcap": { source: "iana", extensions: ["tcap"] }, "application/vnd.3lightssoftware.imagescal": { source: "iana" }, "application/vnd.3m.post-it-notes": { source: "iana", extensions: ["pwn"] }, "application/vnd.accpac.simply.aso": { source: "iana", extensions: ["aso"] }, "application/vnd.accpac.simply.imp": { source: "iana", extensions: ["imp"] }, "application/vnd.acucobol": { source: "iana", extensions: ["acu"] }, "application/vnd.acucorp": { source: "iana", extensions: ["atc", "acutc"] }, "application/vnd.adobe.air-application-installer-package+zip": { source: "apache", compressible: false, extensions: ["air"] }, "application/vnd.adobe.flash.movie": { source: "iana" }, "application/vnd.adobe.formscentral.fcdt": { source: "iana", extensions: ["fcdt"] }, "application/vnd.adobe.fxp": { source: "iana", extensions: ["fxp", "fxpl"] }, "application/vnd.adobe.partial-upload": { source: "iana" }, "application/vnd.adobe.xdp+xml": { source: "iana", compressible: true, extensions: ["xdp"] }, "application/vnd.adobe.xfdf": { source: "iana", extensions: ["xfdf"] }, "application/vnd.aether.imp": { source: "iana" }, "application/vnd.afpc.afplinedata": { source: "iana" }, "application/vnd.afpc.afplinedata-pagedef": { source: "iana" }, "application/vnd.afpc.cmoca-cmresource": { source: "iana" }, "application/vnd.afpc.foca-charset": { source: "iana" }, "application/vnd.afpc.foca-codedfont": { source: "iana" }, "application/vnd.afpc.foca-codepage": { source: "iana" }, "application/vnd.afpc.modca": { source: "iana" }, "application/vnd.afpc.modca-cmtable": { source: "iana" }, "application/vnd.afpc.modca-formdef": { source: "iana" }, "application/vnd.afpc.modca-mediummap": { source: "iana" }, "application/vnd.afpc.modca-objectcontainer": { source: "iana" }, "application/vnd.afpc.modca-overlay": { source: "iana" }, "application/vnd.afpc.modca-pagesegment": { source: "iana" }, "application/vnd.age": { source: "iana", extensions: ["age"] }, "application/vnd.ah-barcode": { source: "iana" }, "application/vnd.ahead.space": { source: "iana", extensions: ["ahead"] }, "application/vnd.airzip.filesecure.azf": { source: "iana", extensions: ["azf"] }, "application/vnd.airzip.filesecure.azs": { source: "iana", extensions: ["azs"] }, "application/vnd.amadeus+json": { source: "iana", compressible: true }, "application/vnd.amazon.ebook": { source: "apache", extensions: ["azw"] }, "application/vnd.amazon.mobi8-ebook": { source: "iana" }, "application/vnd.americandynamics.acc": { source: "iana", extensions: ["acc"] }, "application/vnd.amiga.ami": { source: "iana", extensions: ["ami"] }, "application/vnd.amundsen.maze+xml": { source: "iana", compressible: true }, "application/vnd.android.ota": { source: "iana" }, "application/vnd.android.package-archive": { source: "apache", compressible: false, extensions: ["apk"] }, "application/vnd.anki": { source: "iana" }, "application/vnd.anser-web-certificate-issue-initiation": { source: "iana", extensions: ["cii"] }, "application/vnd.anser-web-funds-transfer-initiation": { source: "apache", extensions: ["fti"] }, "application/vnd.antix.game-component": { source: "iana", extensions: ["atx"] }, "application/vnd.apache.arrow.file": { source: "iana" }, "application/vnd.apache.arrow.stream": { source: "iana" }, "application/vnd.apache.thrift.binary": { source: "iana" }, "application/vnd.apache.thrift.compact": { source: "iana" }, "application/vnd.apache.thrift.json": { source: "iana" }, "application/vnd.api+json": { source: "iana", compressible: true }, "application/vnd.aplextor.warrp+json": { source: "iana", compressible: true }, "application/vnd.apothekende.reservation+json": { source: "iana", compressible: true }, "application/vnd.apple.installer+xml": { source: "iana", compressible: true, extensions: ["mpkg"] }, "application/vnd.apple.keynote": { source: "iana", extensions: ["key"] }, "application/vnd.apple.mpegurl": { source: "iana", extensions: ["m3u8"] }, "application/vnd.apple.numbers": { source: "iana", extensions: ["numbers"] }, "application/vnd.apple.pages": { source: "iana", extensions: ["pages"] }, "application/vnd.apple.pkpass": { compressible: false, extensions: ["pkpass"] }, "application/vnd.arastra.swi": { source: "iana" }, "application/vnd.aristanetworks.swi": { source: "iana", extensions: ["swi"] }, "application/vnd.artisan+json": { source: "iana", compressible: true }, "application/vnd.artsquare": { source: "iana" }, "application/vnd.astraea-software.iota": { source: "iana", extensions: ["iota"] }, "application/vnd.audiograph": { source: "iana", extensions: ["aep"] }, "application/vnd.autopackage": { source: "iana" }, "application/vnd.avalon+json": { source: "iana", compressible: true }, "application/vnd.avistar+xml": { source: "iana", compressible: true }, "application/vnd.balsamiq.bmml+xml": { source: "iana", compressible: true, extensions: ["bmml"] }, "application/vnd.balsamiq.bmpr": { source: "iana" }, "application/vnd.banana-accounting": { source: "iana" }, "application/vnd.bbf.usp.error": { source: "iana" }, "application/vnd.bbf.usp.msg": { source: "iana" }, "application/vnd.bbf.usp.msg+json": { source: "iana", compressible: true }, "application/vnd.bekitzur-stech+json": { source: "iana", compressible: true }, "application/vnd.bint.med-content": { source: "iana" }, "application/vnd.biopax.rdf+xml": { source: "iana", compressible: true }, "application/vnd.blink-idb-value-wrapper": { source: "iana" }, "application/vnd.blueice.multipass": { source: "iana", extensions: ["mpm"] }, "application/vnd.bluetooth.ep.oob": { source: "iana" }, "application/vnd.bluetooth.le.oob": { source: "iana" }, "application/vnd.bmi": { source: "iana", extensions: ["bmi"] }, "application/vnd.bpf": { source: "iana" }, "application/vnd.bpf3": { source: "iana" }, "application/vnd.businessobjects": { source: "iana", extensions: ["rep"] }, "application/vnd.byu.uapi+json": { source: "iana", compressible: true }, "application/vnd.cab-jscript": { source: "iana" }, "application/vnd.canon-cpdl": { source: "iana" }, "application/vnd.canon-lips": { source: "iana" }, "application/vnd.capasystems-pg+json": { source: "iana", compressible: true }, "application/vnd.cendio.thinlinc.clientconf": { source: "iana" }, "application/vnd.century-systems.tcp_stream": { source: "iana" }, "application/vnd.chemdraw+xml": { source: "iana", compressible: true, extensions: ["cdxml"] }, "application/vnd.chess-pgn": { source: "iana" }, "application/vnd.chipnuts.karaoke-mmd": { source: "iana", extensions: ["mmd"] }, "application/vnd.ciedi": { source: "iana" }, "application/vnd.cinderella": { source: "iana", extensions: ["cdy"] }, "application/vnd.cirpack.isdn-ext": { source: "iana" }, "application/vnd.citationstyles.style+xml": { source: "iana", compressible: true, extensions: ["csl"] }, "application/vnd.claymore": { source: "iana", extensions: ["cla"] }, "application/vnd.cloanto.rp9": { source: "iana", extensions: ["rp9"] }, "application/vnd.clonk.c4group": { source: "iana", extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"] }, "application/vnd.cluetrust.cartomobile-config": { source: "iana", extensions: ["c11amc"] }, "application/vnd.cluetrust.cartomobile-config-pkg": { source: "iana", extensions: ["c11amz"] }, "application/vnd.coffeescript": { source: "iana" }, "application/vnd.collabio.xodocuments.document": { source: "iana" }, "application/vnd.collabio.xodocuments.document-template": { source: "iana" }, "application/vnd.collabio.xodocuments.presentation": { source: "iana" }, "application/vnd.collabio.xodocuments.presentation-template": { source: "iana" }, "application/vnd.collabio.xodocuments.spreadsheet": { source: "iana" }, "application/vnd.collabio.xodocuments.spreadsheet-template": { source: "iana" }, "application/vnd.collection+json": { source: "iana", compressible: true }, "application/vnd.collection.doc+json": { source: "iana", compressible: true }, "application/vnd.collection.next+json": { source: "iana", compressible: true }, "application/vnd.comicbook+zip": { source: "iana", compressible: false }, "application/vnd.comicbook-rar": { source: "iana" }, "application/vnd.commerce-battelle": { source: "iana" }, "application/vnd.commonspace": { source: "iana", extensions: ["csp"] }, "application/vnd.contact.cmsg": { source: "iana", extensions: ["cdbcmsg"] }, "application/vnd.coreos.ignition+json": { source: "iana", compressible: true }, "application/vnd.cosmocaller": { source: "iana", extensions: ["cmc"] }, "application/vnd.crick.clicker": { source: "iana", extensions: ["clkx"] }, "application/vnd.crick.clicker.keyboard": { source: "iana", extensions: ["clkk"] }, "application/vnd.crick.clicker.palette": { source: "iana", extensions: ["clkp"] }, "application/vnd.crick.clicker.template": { source: "iana", extensions: ["clkt"] }, "application/vnd.crick.clicker.wordbank": { source: "iana", extensions: ["clkw"] }, "application/vnd.criticaltools.wbs+xml": { source: "iana", compressible: true, extensions: ["wbs"] }, "application/vnd.cryptii.pipe+json": { source: "iana", compressible: true }, "application/vnd.crypto-shade-file": { source: "iana" }, "application/vnd.cryptomator.encrypted": { source: "iana" }, "application/vnd.cryptomator.vault": { source: "iana" }, "application/vnd.ctc-posml": { source: "iana", extensions: ["pml"] }, "application/vnd.ctct.ws+xml": { source: "iana", compressible: true }, "application/vnd.cups-pdf": { source: "iana" }, "application/vnd.cups-postscript": { source: "iana" }, "application/vnd.cups-ppd": { source: "iana", extensions: ["ppd"] }, "application/vnd.cups-raster": { source: "iana" }, "application/vnd.cups-raw": { source: "iana" }, "application/vnd.curl": { source: "iana" }, "application/vnd.curl.car": { source: "apache", extensions: ["car"] }, "application/vnd.curl.pcurl": { source: "apache", extensions: ["pcurl"] }, "application/vnd.cyan.dean.root+xml": { source: "iana", compressible: true }, "application/vnd.cybank": { source: "iana" }, "application/vnd.cyclonedx+json": { source: "iana", compressible: true }, "application/vnd.cyclonedx+xml": { source: "iana", compressible: true }, "application/vnd.d2l.coursepackage1p0+zip": { source: "iana", compressible: false }, "application/vnd.d3m-dataset": { source: "iana" }, "application/vnd.d3m-problem": { source: "iana" }, "application/vnd.dart": { source: "iana", compressible: true, extensions: ["dart"] }, "application/vnd.data-vision.rdz": { source: "iana", extensions: ["rdz"] }, "application/vnd.datapackage+json": { source: "iana", compressible: true }, "application/vnd.dataresource+json": { source: "iana", compressible: true }, "application/vnd.dbf": { source: "iana", extensions: ["dbf"] }, "application/vnd.debian.binary-package": { source: "iana" }, "application/vnd.dece.data": { source: "iana", extensions: ["uvf", "uvvf", "uvd", "uvvd"] }, "application/vnd.dece.ttml+xml": { source: "iana", compressible: true, extensions: ["uvt", "uvvt"] }, "application/vnd.dece.unspecified": { source: "iana", extensions: ["uvx", "uvvx"] }, "application/vnd.dece.zip": { source: "iana", extensions: ["uvz", "uvvz"] }, "application/vnd.denovo.fcselayout-link": { source: "iana", extensions: ["fe_launch"] }, "application/vnd.desmume.movie": { source: "iana" }, "application/vnd.dir-bi.plate-dl-nosuffix": { source: "iana" }, "application/vnd.dm.delegation+xml": { source: "iana", compressible: true }, "application/vnd.dna": { source: "iana", extensions: ["dna"] }, "application/vnd.document+json": { source: "iana", compressible: true }, "application/vnd.dolby.mlp": { source: "apache", extensions: ["mlp"] }, "application/vnd.dolby.mobile.1": { source: "iana" }, "application/vnd.dolby.mobile.2": { source: "iana" }, "application/vnd.doremir.scorecloud-binary-document": { source: "iana" }, "application/vnd.dpgraph": { source: "iana", extensions: ["dpg"] }, "application/vnd.dreamfactory": { source: "iana", extensions: ["dfac"] }, "application/vnd.drive+json": { source: "iana", compressible: true }, "application/vnd.ds-keypoint": { source: "apache", extensions: ["kpxx"] }, "application/vnd.dtg.local": { source: "iana" }, "application/vnd.dtg.local.flash": { source: "iana" }, "application/vnd.dtg.local.html": { source: "iana" }, "application/vnd.dvb.ait": { source: "iana", extensions: ["ait"] }, "application/vnd.dvb.dvbisl+xml": { source: "iana", compressible: true }, "application/vnd.dvb.dvbj": { source: "iana" }, "application/vnd.dvb.esgcontainer": { source: "iana" }, "application/vnd.dvb.ipdcdftnotifaccess": { source: "iana" }, "application/vnd.dvb.ipdcesgaccess": { source: "iana" }, "application/vnd.dvb.ipdcesgaccess2": { source: "iana" }, "application/vnd.dvb.ipdcesgpdd": { source: "iana" }, "application/vnd.dvb.ipdcroaming": { source: "iana" }, "application/vnd.dvb.iptv.alfec-base": { source: "iana" }, "application/vnd.dvb.iptv.alfec-enhancement": { source: "iana" }, "application/vnd.dvb.notif-aggregate-root+xml": { source: "iana", compressible: true }, "application/vnd.dvb.notif-container+xml": { source: "iana", compressible: true }, "application/vnd.dvb.notif-generic+xml": { source: "iana", compressible: true }, "application/vnd.dvb.notif-ia-msglist+xml": { source: "iana", compressible: true }, "application/vnd.dvb.notif-ia-registration-request+xml": { source: "iana", compressible: true }, "application/vnd.dvb.notif-ia-registration-response+xml": { source: "iana", compressible: true }, "application/vnd.dvb.notif-init+xml": { source: "iana", compressible: true }, "application/vnd.dvb.pfr": { source: "iana" }, "application/vnd.dvb.service": { source: "iana", extensions: ["svc"] }, "application/vnd.dxr": { source: "iana" }, "application/vnd.dynageo": { source: "iana", extensions: ["geo"] }, "application/vnd.dzr": { source: "iana" }, "application/vnd.easykaraoke.cdgdownload": { source: "iana" }, "application/vnd.ecdis-update": { source: "iana" }, "application/vnd.ecip.rlp": { source: "iana" }, "application/vnd.eclipse.ditto+json": { source: "iana", compressible: true }, "application/vnd.ecowin.chart": { source: "iana", extensions: ["mag"] }, "application/vnd.ecowin.filerequest": { source: "iana" }, "application/vnd.ecowin.fileupdate": { source: "iana" }, "application/vnd.ecowin.series": { source: "iana" }, "application/vnd.ecowin.seriesrequest": { source: "iana" }, "application/vnd.ecowin.seriesupdate": { source: "iana" }, "application/vnd.efi.img": { source: "iana" }, "application/vnd.efi.iso": { source: "iana" }, "application/vnd.emclient.accessrequest+xml": { source: "iana", compressible: true }, "application/vnd.enliven": { source: "iana", extensions: ["nml"] }, "application/vnd.enphase.envoy": { source: "iana" }, "application/vnd.eprints.data+xml": { source: "iana", compressible: true }, "application/vnd.epson.esf": { source: "iana", extensions: ["esf"] }, "application/vnd.epson.msf": { source: "iana", extensions: ["msf"] }, "application/vnd.epson.quickanime": { source: "iana", extensions: ["qam"] }, "application/vnd.epson.salt": { source: "iana", extensions: ["slt"] }, "application/vnd.epson.ssf": { source: "iana", extensions: ["ssf"] }, "application/vnd.ericsson.quickcall": { source: "iana" }, "application/vnd.espass-espass+zip": { source: "iana", compressible: false }, "application/vnd.eszigno3+xml": { source: "iana", compressible: true, extensions: ["es3", "et3"] }, "application/vnd.etsi.aoc+xml": { source: "iana", compressible: true }, "application/vnd.etsi.asic-e+zip": { source: "iana", compressible: false }, "application/vnd.etsi.asic-s+zip": { source: "iana", compressible: false }, "application/vnd.etsi.cug+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvcommand+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvdiscovery+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvprofile+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvsad-bc+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvsad-cod+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvsad-npvr+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvservice+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvsync+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvueprofile+xml": { source: "iana", compressible: true }, "application/vnd.etsi.mcid+xml": { source: "iana", compressible: true }, "application/vnd.etsi.mheg5": { source: "iana" }, "application/vnd.etsi.overload-control-policy-dataset+xml": { source: "iana", compressible: true }, "application/vnd.etsi.pstn+xml": { source: "iana", compressible: true }, "application/vnd.etsi.sci+xml": { source: "iana", compressible: true }, "application/vnd.etsi.simservs+xml": { source: "iana", compressible: true }, "application/vnd.etsi.timestamp-token": { source: "iana" }, "application/vnd.etsi.tsl+xml": { source: "iana", compressible: true }, "application/vnd.etsi.tsl.der": { source: "iana" }, "application/vnd.eu.kasparian.car+json": { source: "iana", compressible: true }, "application/vnd.eudora.data": { source: "iana" }, "application/vnd.evolv.ecig.profile": { source: "iana" }, "application/vnd.evolv.ecig.settings": { source: "iana" }, "application/vnd.evolv.ecig.theme": { source: "iana" }, "application/vnd.exstream-empower+zip": { source: "iana", compressible: false }, "application/vnd.exstream-package": { source: "iana" }, "application/vnd.ezpix-album": { source: "iana", extensions: ["ez2"] }, "application/vnd.ezpix-package": { source: "iana", extensions: ["ez3"] }, "application/vnd.f-secure.mobile": { source: "iana" }, "application/vnd.familysearch.gedcom+zip": { source: "iana", compressible: false }, "application/vnd.fastcopy-disk-image": { source: "iana" }, "application/vnd.fdf": { source: "iana", extensions: ["fdf"] }, "application/vnd.fdsn.mseed": { source: "iana", extensions: ["mseed"] }, "application/vnd.fdsn.seed": { source: "iana", extensions: ["seed", "dataless"] }, "application/vnd.ffsns": { source: "iana" }, "application/vnd.ficlab.flb+zip": { source: "iana", compressible: false }, "application/vnd.filmit.zfc": { source: "iana" }, "application/vnd.fints": { source: "iana" }, "application/vnd.firemonkeys.cloudcell": { source: "iana" }, "application/vnd.flographit": { source: "iana", extensions: ["gph"] }, "application/vnd.fluxtime.clip": { source: "iana", extensions: ["ftc"] }, "application/vnd.font-fontforge-sfd": { source: "iana" }, "application/vnd.framemaker": { source: "iana", extensions: ["fm", "frame", "maker", "book"] }, "application/vnd.frogans.fnc": { source: "iana", extensions: ["fnc"] }, "application/vnd.frogans.ltf": { source: "iana", extensions: ["ltf"] }, "application/vnd.fsc.weblaunch": { source: "iana", extensions: ["fsc"] }, "application/vnd.fujifilm.fb.docuworks": { source: "iana" }, "application/vnd.fujifilm.fb.docuworks.binder": { source: "iana" }, "application/vnd.fujifilm.fb.docuworks.container": { source: "iana" }, "application/vnd.fujifilm.fb.jfi+xml": { source: "iana", compressible: true }, "application/vnd.fujitsu.oasys": { source: "iana", extensions: ["oas"] }, "application/vnd.fujitsu.oasys2": { source: "iana", extensions: ["oa2"] }, "application/vnd.fujitsu.oasys3": { source: "iana", extensions: ["oa3"] }, "application/vnd.fujitsu.oasysgp": { source: "iana", extensions: ["fg5"] }, "application/vnd.fujitsu.oasysprs": { source: "iana", extensions: ["bh2"] }, "application/vnd.fujixerox.art-ex": { source: "iana" }, "application/vnd.fujixerox.art4": { source: "iana" }, "application/vnd.fujixerox.ddd": { source: "iana", extensions: ["ddd"] }, "application/vnd.fujixerox.docuworks": { source: "iana", extensions: ["xdw"] }, "application/vnd.fujixerox.docuworks.binder": { source: "iana", extensions: ["xbd"] }, "application/vnd.fujixerox.docuworks.container": { source: "iana" }, "application/vnd.fujixerox.hbpl": { source: "iana" }, "application/vnd.fut-misnet": { source: "iana" }, "application/vnd.futoin+cbor": { source: "iana" }, "application/vnd.futoin+json": { source: "iana", compressible: true }, "application/vnd.fuzzysheet": { source: "iana", extensions: ["fzs"] }, "application/vnd.genomatix.tuxedo": { source: "iana", extensions: ["txd"] }, "application/vnd.gentics.grd+json": { source: "iana", compressible: true }, "application/vnd.geo+json": { source: "iana", compressible: true }, "application/vnd.geocube+xml": { source: "iana", compressible: true }, "application/vnd.geogebra.file": { source: "iana", extensions: ["ggb"] }, "application/vnd.geogebra.slides": { source: "iana" }, "application/vnd.geogebra.tool": { source: "iana", extensions: ["ggt"] }, "application/vnd.geometry-explorer": { source: "iana", extensions: ["gex", "gre"] }, "application/vnd.geonext": { source: "iana", extensions: ["gxt"] }, "application/vnd.geoplan": { source: "iana", extensions: ["g2w"] }, "application/vnd.geospace": { source: "iana", extensions: ["g3w"] }, "application/vnd.gerber": { source: "iana" }, "application/vnd.globalplatform.card-content-mgt": { source: "iana" }, "application/vnd.globalplatform.card-content-mgt-response": { source: "iana" }, "application/vnd.gmx": { source: "iana", extensions: ["gmx"] }, "application/vnd.google-apps.document": { compressible: false, extensions: ["gdoc"] }, "application/vnd.google-apps.presentation": { compressible: false, extensions: ["gslides"] }, "application/vnd.google-apps.spreadsheet": { compressible: false, extensions: ["gsheet"] }, "application/vnd.google-earth.kml+xml": { source: "iana", compressible: true, extensions: ["kml"] }, "application/vnd.google-earth.kmz": { source: "iana", compressible: false, extensions: ["kmz"] }, "application/vnd.gov.sk.e-form+xml": { source: "iana", compressible: true }, "application/vnd.gov.sk.e-form+zip": { source: "iana", compressible: false }, "application/vnd.gov.sk.xmldatacontainer+xml": { source: "iana", compressible: true }, "application/vnd.grafeq": { source: "iana", extensions: ["gqf", "gqs"] }, "application/vnd.gridmp": { source: "iana" }, "application/vnd.groove-account": { source: "iana", extensions: ["gac"] }, "application/vnd.groove-help": { source: "iana", extensions: ["ghf"] }, "application/vnd.groove-identity-message": { source: "iana", extensions: ["gim"] }, "application/vnd.groove-injector": { source: "iana", extensions: ["grv"] }, "application/vnd.groove-tool-message": { source: "iana", extensions: ["gtm"] }, "application/vnd.groove-tool-template": { source: "iana", extensions: ["tpl"] }, "application/vnd.groove-vcard": { source: "iana", extensions: ["vcg"] }, "application/vnd.hal+json": { source: "iana", compressible: true }, "application/vnd.hal+xml": { source: "iana", compressible: true, extensions: ["hal"] }, "application/vnd.handheld-entertainment+xml": { source: "iana", compressible: true, extensions: ["zmm"] }, "application/vnd.hbci": { source: "iana", extensions: ["hbci"] }, "application/vnd.hc+json": { source: "iana", compressible: true }, "application/vnd.hcl-bireports": { source: "iana" }, "application/vnd.hdt": { source: "iana" }, "application/vnd.heroku+json": { source: "iana", compressible: true }, "application/vnd.hhe.lesson-player": { source: "iana", extensions: ["les"] }, "application/vnd.hl7cda+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/vnd.hl7v2+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/vnd.hp-hpgl": { source: "iana", extensions: ["hpgl"] }, "application/vnd.hp-hpid": { source: "iana", extensions: ["hpid"] }, "application/vnd.hp-hps": { source: "iana", extensions: ["hps"] }, "application/vnd.hp-jlyt": { source: "iana", extensions: ["jlt"] }, "application/vnd.hp-pcl": { source: "iana", extensions: ["pcl"] }, "application/vnd.hp-pclxl": { source: "iana", extensions: ["pclxl"] }, "application/vnd.httphone": { source: "iana" }, "application/vnd.hydrostatix.sof-data": { source: "iana", extensions: ["sfd-hdstx"] }, "application/vnd.hyper+json": { source: "iana", compressible: true }, "application/vnd.hyper-item+json": { source: "iana", compressible: true }, "application/vnd.hyperdrive+json": { source: "iana", compressible: true }, "application/vnd.hzn-3d-crossword": { source: "iana" }, "application/vnd.ibm.afplinedata": { source: "iana" }, "application/vnd.ibm.electronic-media": { source: "iana" }, "application/vnd.ibm.minipay": { source: "iana", extensions: ["mpy"] }, "application/vnd.ibm.modcap": { source: "iana", extensions: ["afp", "listafp", "list3820"] }, "application/vnd.ibm.rights-management": { source: "iana", extensions: ["irm"] }, "application/vnd.ibm.secure-container": { source: "iana", extensions: ["sc"] }, "application/vnd.iccprofile": { source: "iana", extensions: ["icc", "icm"] }, "application/vnd.ieee.1905": { source: "iana" }, "application/vnd.igloader": { source: "iana", extensions: ["igl"] }, "application/vnd.imagemeter.folder+zip": { source: "iana", compressible: false }, "application/vnd.imagemeter.image+zip": { source: "iana", compressible: false }, "application/vnd.immervision-ivp": { source: "iana", extensions: ["ivp"] }, "application/vnd.immervision-ivu": { source: "iana", extensions: ["ivu"] }, "application/vnd.ims.imsccv1p1": { source: "iana" }, "application/vnd.ims.imsccv1p2": { source: "iana" }, "application/vnd.ims.imsccv1p3": { source: "iana" }, "application/vnd.ims.lis.v2.result+json": { source: "iana", compressible: true }, "application/vnd.ims.lti.v2.toolconsumerprofile+json": { source: "iana", compressible: true }, "application/vnd.ims.lti.v2.toolproxy+json": { source: "iana", compressible: true }, "application/vnd.ims.lti.v2.toolproxy.id+json": { source: "iana", compressible: true }, "application/vnd.ims.lti.v2.toolsettings+json": { source: "iana", compressible: true }, "application/vnd.ims.lti.v2.toolsettings.simple+json": { source: "iana", compressible: true }, "application/vnd.informedcontrol.rms+xml": { source: "iana", compressible: true }, "application/vnd.informix-visionary": { source: "iana" }, "application/vnd.infotech.project": { source: "iana" }, "application/vnd.infotech.project+xml": { source: "iana", compressible: true }, "application/vnd.innopath.wamp.notification": { source: "iana" }, "application/vnd.insors.igm": { source: "iana", extensions: ["igm"] }, "application/vnd.intercon.formnet": { source: "iana", extensions: ["xpw", "xpx"] }, "application/vnd.intergeo": { source: "iana", extensions: ["i2g"] }, "application/vnd.intertrust.digibox": { source: "iana" }, "application/vnd.intertrust.nncp": { source: "iana" }, "application/vnd.intu.qbo": { source: "iana", extensions: ["qbo"] }, "application/vnd.intu.qfx": { source: "iana", extensions: ["qfx"] }, "application/vnd.iptc.g2.catalogitem+xml": { source: "iana", compressible: true }, "application/vnd.iptc.g2.conceptitem+xml": { source: "iana", compressible: true }, "application/vnd.iptc.g2.knowledgeitem+xml": { source: "iana", compressible: true }, "application/vnd.iptc.g2.newsitem+xml": { source: "iana", compressible: true }, "application/vnd.iptc.g2.newsmessage+xml": { source: "iana", compressible: true }, "application/vnd.iptc.g2.packageitem+xml": { source: "iana", compressible: true }, "application/vnd.iptc.g2.planningitem+xml": { source: "iana", compressible: true }, "application/vnd.ipunplugged.rcprofile": { source: "iana", extensions: ["rcprofile"] }, "application/vnd.irepository.package+xml": { source: "iana", compressible: true, extensions: ["irp"] }, "application/vnd.is-xpr": { source: "iana", extensions: ["xpr"] }, "application/vnd.isac.fcs": { source: "iana", extensions: ["fcs"] }, "application/vnd.iso11783-10+zip": { source: "iana", compressible: false }, "application/vnd.jam": { source: "iana", extensions: ["jam"] }, "application/vnd.japannet-directory-service": { source: "iana" }, "application/vnd.japannet-jpnstore-wakeup": { source: "iana" }, "application/vnd.japannet-payment-wakeup": { source: "iana" }, "application/vnd.japannet-registration": { source: "iana" }, "application/vnd.japannet-registration-wakeup": { source: "iana" }, "application/vnd.japannet-setstore-wakeup": { source: "iana" }, "application/vnd.japannet-verification": { source: "iana" }, "application/vnd.japannet-verification-wakeup": { source: "iana" }, "application/vnd.jcp.javame.midlet-rms": { source: "iana", extensions: ["rms"] }, "application/vnd.jisp": { source: "iana", extensions: ["jisp"] }, "application/vnd.joost.joda-archive": { source: "iana", extensions: ["joda"] }, "application/vnd.jsk.isdn-ngn": { source: "iana" }, "application/vnd.kahootz": { source: "iana", extensions: ["ktz", "ktr"] }, "application/vnd.kde.karbon": { source: "iana", extensions: ["karbon"] }, "application/vnd.kde.kchart": { source: "iana", extensions: ["chrt"] }, "application/vnd.kde.kformula": { source: "iana", extensions: ["kfo"] }, "application/vnd.kde.kivio": { source: "iana", extensions: ["flw"] }, "application/vnd.kde.kontour": { source: "iana", extensions: ["kon"] }, "application/vnd.kde.kpresenter": { source: "iana", extensions: ["kpr", "kpt"] }, "application/vnd.kde.kspread": { source: "iana", extensions: ["ksp"] }, "application/vnd.kde.kword": { source: "iana", extensions: ["kwd", "kwt"] }, "application/vnd.kenameaapp": { source: "iana", extensions: ["htke"] }, "application/vnd.kidspiration": { source: "iana", extensions: ["kia"] }, "application/vnd.kinar": { source: "iana", extensions: ["kne", "knp"] }, "application/vnd.koan": { source: "iana", extensions: ["skp", "skd", "skt", "skm"] }, "application/vnd.kodak-descriptor": { source: "iana", extensions: ["sse"] }, "application/vnd.las": { source: "iana" }, "application/vnd.las.las+json": { source: "iana", compressible: true }, "application/vnd.las.las+xml": { source: "iana", compressible: true, extensions: ["lasxml"] }, "application/vnd.laszip": { source: "iana" }, "application/vnd.leap+json": { source: "iana", compressible: true }, "application/vnd.liberty-request+xml": { source: "iana", compressible: true }, "application/vnd.llamagraphics.life-balance.desktop": { source: "iana", extensions: ["lbd"] }, "application/vnd.llamagraphics.life-balance.exchange+xml": { source: "iana", compressible: true, extensions: ["lbe"] }, "application/vnd.logipipe.circuit+zip": { source: "iana", compressible: false }, "application/vnd.loom": { source: "iana" }, "application/vnd.lotus-1-2-3": { source: "iana", extensions: ["123"] }, "application/vnd.lotus-approach": { source: "iana", extensions: ["apr"] }, "application/vnd.lotus-freelance": { source: "iana", extensions: ["pre"] }, "application/vnd.lotus-notes": { source: "iana", extensions: ["nsf"] }, "application/vnd.lotus-organizer": { source: "iana", extensions: ["org"] }, "application/vnd.lotus-screencam": { source: "iana", extensions: ["scm"] }, "application/vnd.lotus-wordpro": { source: "iana", extensions: ["lwp"] }, "application/vnd.macports.portpkg": { source: "iana", extensions: ["portpkg"] }, "application/vnd.mapbox-vector-tile": { source: "iana", extensions: ["mvt"] }, "application/vnd.marlin.drm.actiontoken+xml": { source: "iana", compressible: true }, "application/vnd.marlin.drm.conftoken+xml": { source: "iana", compressible: true }, "application/vnd.marlin.drm.license+xml": { source: "iana", compressible: true }, "application/vnd.marlin.drm.mdcf": { source: "iana" }, "application/vnd.mason+json": { source: "iana", compressible: true }, "application/vnd.maxar.archive.3tz+zip": { source: "iana", compressible: false }, "application/vnd.maxmind.maxmind-db": { source: "iana" }, "application/vnd.mcd": { source: "iana", extensions: ["mcd"] }, "application/vnd.medcalcdata": { source: "iana", extensions: ["mc1"] }, "application/vnd.mediastation.cdkey": { source: "iana", extensions: ["cdkey"] }, "application/vnd.meridian-slingshot": { source: "iana" }, "application/vnd.mfer": { source: "iana", extensions: ["mwf"] }, "application/vnd.mfmp": { source: "iana", extensions: ["mfm"] }, "application/vnd.micro+json": { source: "iana", compressible: true }, "application/vnd.micrografx.flo": { source: "iana", extensions: ["flo"] }, "application/vnd.micrografx.igx": { source: "iana", extensions: ["igx"] }, "application/vnd.microsoft.portable-executable": { source: "iana" }, "application/vnd.microsoft.windows.thumbnail-cache": { source: "iana" }, "application/vnd.miele+json": { source: "iana", compressible: true }, "application/vnd.mif": { source: "iana", extensions: ["mif"] }, "application/vnd.minisoft-hp3000-save": { source: "iana" }, "application/vnd.mitsubishi.misty-guard.trustweb": { source: "iana" }, "application/vnd.mobius.daf": { source: "iana", extensions: ["daf"] }, "application/vnd.mobius.dis": { source: "iana", extensions: ["dis"] }, "application/vnd.mobius.mbk": { source: "iana", extensions: ["mbk"] }, "application/vnd.mobius.mqy": { source: "iana", extensions: ["mqy"] }, "application/vnd.mobius.msl": { source: "iana", extensions: ["msl"] }, "application/vnd.mobius.plc": { source: "iana", extensions: ["plc"] }, "application/vnd.mobius.txf": { source: "iana", extensions: ["txf"] }, "application/vnd.mophun.application": { source: "iana", extensions: ["mpn"] }, "application/vnd.mophun.certificate": { source: "iana", extensions: ["mpc"] }, "application/vnd.motorola.flexsuite": { source: "iana" }, "application/vnd.motorola.flexsuite.adsi": { source: "iana" }, "application/vnd.motorola.flexsuite.fis": { source: "iana" }, "application/vnd.motorola.flexsuite.gotap": { source: "iana" }, "application/vnd.motorola.flexsuite.kmr": { source: "iana" }, "application/vnd.motorola.flexsuite.ttc": { source: "iana" }, "application/vnd.motorola.flexsuite.wem": { source: "iana" }, "application/vnd.motorola.iprm": { source: "iana" }, "application/vnd.mozilla.xul+xml": { source: "iana", compressible: true, extensions: ["xul"] }, "application/vnd.ms-3mfdocument": { source: "iana" }, "application/vnd.ms-artgalry": { source: "iana", extensions: ["cil"] }, "application/vnd.ms-asf": { source: "iana" }, "application/vnd.ms-cab-compressed": { source: "iana", extensions: ["cab"] }, "application/vnd.ms-color.iccprofile": { source: "apache" }, "application/vnd.ms-excel": { source: "iana", compressible: false, extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"] }, "application/vnd.ms-excel.addin.macroenabled.12": { source: "iana", extensions: ["xlam"] }, "application/vnd.ms-excel.sheet.binary.macroenabled.12": { source: "iana", extensions: ["xlsb"] }, "application/vnd.ms-excel.sheet.macroenabled.12": { source: "iana", extensions: ["xlsm"] }, "application/vnd.ms-excel.template.macroenabled.12": { source: "iana", extensions: ["xltm"] }, "application/vnd.ms-fontobject": { source: "iana", compressible: true, extensions: ["eot"] }, "application/vnd.ms-htmlhelp": { source: "iana", extensions: ["chm"] }, "application/vnd.ms-ims": { source: "iana", extensions: ["ims"] }, "application/vnd.ms-lrm": { source: "iana", extensions: ["lrm"] }, "application/vnd.ms-office.activex+xml": { source: "iana", compressible: true }, "application/vnd.ms-officetheme": { source: "iana", extensions: ["thmx"] }, "application/vnd.ms-opentype": { source: "apache", compressible: true }, "application/vnd.ms-outlook": { compressible: false, extensions: ["msg"] }, "application/vnd.ms-package.obfuscated-opentype": { source: "apache" }, "application/vnd.ms-pki.seccat": { source: "apache", extensions: ["cat"] }, "application/vnd.ms-pki.stl": { source: "apache", extensions: ["stl"] }, "application/vnd.ms-playready.initiator+xml": { source: "iana", compressible: true }, "application/vnd.ms-powerpoint": { source: "iana", compressible: false, extensions: ["ppt", "pps", "pot"] }, "application/vnd.ms-powerpoint.addin.macroenabled.12": { source: "iana", extensions: ["ppam"] }, "application/vnd.ms-powerpoint.presentation.macroenabled.12": { source: "iana", extensions: ["pptm"] }, "application/vnd.ms-powerpoint.slide.macroenabled.12": { source: "iana", extensions: ["sldm"] }, "application/vnd.ms-powerpoint.slideshow.macroenabled.12": { source: "iana", extensions: ["ppsm"] }, "application/vnd.ms-powerpoint.template.macroenabled.12": { source: "iana", extensions: ["potm"] }, "application/vnd.ms-printdevicecapabilities+xml": { source: "iana", compressible: true }, "application/vnd.ms-printing.printticket+xml": { source: "apache", compressible: true }, "application/vnd.ms-printschematicket+xml": { source: "iana", compressible: true }, "application/vnd.ms-project": { source: "iana", extensions: ["mpp", "mpt"] }, "application/vnd.ms-tnef": { source: "iana" }, "application/vnd.ms-windows.devicepairing": { source: "iana" }, "application/vnd.ms-windows.nwprinting.oob": { source: "iana" }, "application/vnd.ms-windows.printerpairing": { source: "iana" }, "application/vnd.ms-windows.wsd.oob": { source: "iana" }, "application/vnd.ms-wmdrm.lic-chlg-req": { source: "iana" }, "application/vnd.ms-wmdrm.lic-resp": { source: "iana" }, "application/vnd.ms-wmdrm.meter-chlg-req": { source: "iana" }, "application/vnd.ms-wmdrm.meter-resp": { source: "iana" }, "application/vnd.ms-word.document.macroenabled.12": { source: "iana", extensions: ["docm"] }, "application/vnd.ms-word.template.macroenabled.12": { source: "iana", extensions: ["dotm"] }, "application/vnd.ms-works": { source: "iana", extensions: ["wps", "wks", "wcm", "wdb"] }, "application/vnd.ms-wpl": { source: "iana", extensions: ["wpl"] }, "application/vnd.ms-xpsdocument": { source: "iana", compressible: false, extensions: ["xps"] }, "application/vnd.msa-disk-image": { source: "iana" }, "application/vnd.mseq": { source: "iana", extensions: ["mseq"] }, "application/vnd.msign": { source: "iana" }, "application/vnd.multiad.creator": { source: "iana" }, "application/vnd.multiad.creator.cif": { source: "iana" }, "application/vnd.music-niff": { source: "iana" }, "application/vnd.musician": { source: "iana", extensions: ["mus"] }, "application/vnd.muvee.style": { source: "iana", extensions: ["msty"] }, "application/vnd.mynfc": { source: "iana", extensions: ["taglet"] }, "application/vnd.nacamar.ybrid+json": { source: "iana", compressible: true }, "application/vnd.ncd.control": { source: "iana" }, "application/vnd.ncd.reference": { source: "iana" }, "application/vnd.nearst.inv+json": { source: "iana", compressible: true }, "application/vnd.nebumind.line": { source: "iana" }, "application/vnd.nervana": { source: "iana" }, "application/vnd.netfpx": { source: "iana" }, "application/vnd.neurolanguage.nlu": { source: "iana", extensions: ["nlu"] }, "application/vnd.nimn": { source: "iana" }, "application/vnd.nintendo.nitro.rom": { source: "iana" }, "application/vnd.nintendo.snes.rom": { source: "iana" }, "application/vnd.nitf": { source: "iana", extensions: ["ntf", "nitf"] }, "application/vnd.noblenet-directory": { source: "iana", extensions: ["nnd"] }, "application/vnd.noblenet-sealer": { source: "iana", extensions: ["nns"] }, "application/vnd.noblenet-web": { source: "iana", extensions: ["nnw"] }, "application/vnd.nokia.catalogs": { source: "iana" }, "application/vnd.nokia.conml+wbxml": { source: "iana" }, "application/vnd.nokia.conml+xml": { source: "iana", compressible: true }, "application/vnd.nokia.iptv.config+xml": { source: "iana", compressible: true }, "application/vnd.nokia.isds-radio-presets": { source: "iana" }, "application/vnd.nokia.landmark+wbxml": { source: "iana" }, "application/vnd.nokia.landmark+xml": { source: "iana", compressible: true }, "application/vnd.nokia.landmarkcollection+xml": { source: "iana", compressible: true }, "application/vnd.nokia.n-gage.ac+xml": { source: "iana", compressible: true, extensions: ["ac"] }, "application/vnd.nokia.n-gage.data": { source: "iana", extensions: ["ngdat"] }, "application/vnd.nokia.n-gage.symbian.install": { source: "iana", extensions: ["n-gage"] }, "application/vnd.nokia.ncd": { source: "iana" }, "application/vnd.nokia.pcd+wbxml": { source: "iana" }, "application/vnd.nokia.pcd+xml": { source: "iana", compressible: true }, "application/vnd.nokia.radio-preset": { source: "iana", extensions: ["rpst"] }, "application/vnd.nokia.radio-presets": { source: "iana", extensions: ["rpss"] }, "application/vnd.novadigm.edm": { source: "iana", extensions: ["edm"] }, "application/vnd.novadigm.edx": { source: "iana", extensions: ["edx"] }, "application/vnd.novadigm.ext": { source: "iana", extensions: ["ext"] }, "application/vnd.ntt-local.content-share": { source: "iana" }, "application/vnd.ntt-local.file-transfer": { source: "iana" }, "application/vnd.ntt-local.ogw_remote-access": { source: "iana" }, "application/vnd.ntt-local.sip-ta_remote": { source: "iana" }, "application/vnd.ntt-local.sip-ta_tcp_stream": { source: "iana" }, "application/vnd.oasis.opendocument.chart": { source: "iana", extensions: ["odc"] }, "application/vnd.oasis.opendocument.chart-template": { source: "iana", extensions: ["otc"] }, "application/vnd.oasis.opendocument.database": { source: "iana", extensions: ["odb"] }, "application/vnd.oasis.opendocument.formula": { source: "iana", extensions: ["odf"] }, "application/vnd.oasis.opendocument.formula-template": { source: "iana", extensions: ["odft"] }, "application/vnd.oasis.opendocument.graphics": { source: "iana", compressible: false, extensions: ["odg"] }, "application/vnd.oasis.opendocument.graphics-template": { source: "iana", extensions: ["otg"] }, "application/vnd.oasis.opendocument.image": { source: "iana", extensions: ["odi"] }, "application/vnd.oasis.opendocument.image-template": { source: "iana", extensions: ["oti"] }, "application/vnd.oasis.opendocument.presentation": { source: "iana", compressible: false, extensions: ["odp"] }, "application/vnd.oasis.opendocument.presentation-template": { source: "iana", extensions: ["otp"] }, "application/vnd.oasis.opendocument.spreadsheet": { source: "iana", compressible: false, extensions: ["ods"] }, "application/vnd.oasis.opendocument.spreadsheet-template": { source: "iana", extensions: ["ots"] }, "application/vnd.oasis.opendocument.text": { source: "iana", compressible: false, extensions: ["odt"] }, "application/vnd.oasis.opendocument.text-master": { source: "iana", extensions: ["odm"] }, "application/vnd.oasis.opendocument.text-template": { source: "iana", extensions: ["ott"] }, "application/vnd.oasis.opendocument.text-web": { source: "iana", extensions: ["oth"] }, "application/vnd.obn": { source: "iana" }, "application/vnd.ocf+cbor": { source: "iana" }, "application/vnd.oci.image.manifest.v1+json": { source: "iana", compressible: true }, "application/vnd.oftn.l10n+json": { source: "iana", compressible: true }, "application/vnd.oipf.contentaccessdownload+xml": { source: "iana", compressible: true }, "application/vnd.oipf.contentaccessstreaming+xml": { source: "iana", compressible: true }, "application/vnd.oipf.cspg-hexbinary": { source: "iana" }, "application/vnd.oipf.dae.svg+xml": { source: "iana", compressible: true }, "application/vnd.oipf.dae.xhtml+xml": { source: "iana", compressible: true }, "application/vnd.oipf.mippvcontrolmessage+xml": { source: "iana", compressible: true }, "application/vnd.oipf.pae.gem": { source: "iana" }, "application/vnd.oipf.spdiscovery+xml": { source: "iana", compressible: true }, "application/vnd.oipf.spdlist+xml": { source: "iana", compressible: true }, "application/vnd.oipf.ueprofile+xml": { source: "iana", compressible: true }, "application/vnd.oipf.userprofile+xml": { source: "iana", compressible: true }, "application/vnd.olpc-sugar": { source: "iana", extensions: ["xo"] }, "application/vnd.oma-scws-config": { source: "iana" }, "application/vnd.oma-scws-http-request": { source: "iana" }, "application/vnd.oma-scws-http-response": { source: "iana" }, "application/vnd.oma.bcast.associated-procedure-parameter+xml": { source: "iana", compressible: true }, "application/vnd.oma.bcast.drm-trigger+xml": { source: "iana", compressible: true }, "application/vnd.oma.bcast.imd+xml": { source: "iana", compressible: true }, "application/vnd.oma.bcast.ltkm": { source: "iana" }, "application/vnd.oma.bcast.notification+xml": { source: "iana", compressible: true }, "application/vnd.oma.bcast.provisioningtrigger": { source: "iana" }, "application/vnd.oma.bcast.sgboot": { source: "iana" }, "application/vnd.oma.bcast.sgdd+xml": { source: "iana", compressible: true }, "application/vnd.oma.bcast.sgdu": { source: "iana" }, "application/vnd.oma.bcast.simple-symbol-container": { source: "iana" }, "application/vnd.oma.bcast.smartcard-trigger+xml": { source: "iana", compressible: true }, "application/vnd.oma.bcast.sprov+xml": { source: "iana", compressible: true }, "application/vnd.oma.bcast.stkm": { source: "iana" }, "application/vnd.oma.cab-address-book+xml": { source: "iana", compressible: true }, "application/vnd.oma.cab-feature-handler+xml": { source: "iana", compressible: true }, "application/vnd.oma.cab-pcc+xml": { source: "iana", compressible: true }, "application/vnd.oma.cab-subs-invite+xml": { source: "iana", compressible: true }, "application/vnd.oma.cab-user-prefs+xml": { source: "iana", compressible: true }, "application/vnd.oma.dcd": { source: "iana" }, "application/vnd.oma.dcdc": { source: "iana" }, "application/vnd.oma.dd2+xml": { source: "iana", compressible: true, extensions: ["dd2"] }, "application/vnd.oma.drm.risd+xml": { source: "iana", compressible: true }, "application/vnd.oma.group-usage-list+xml": { source: "iana", compressible: true }, "application/vnd.oma.lwm2m+cbor": { source: "iana" }, "application/vnd.oma.lwm2m+json": { source: "iana", compressible: true }, "application/vnd.oma.lwm2m+tlv": { source: "iana" }, "application/vnd.oma.pal+xml": { source: "iana", compressible: true }, "application/vnd.oma.poc.detailed-progress-report+xml": { source: "iana", compressible: true }, "application/vnd.oma.poc.final-report+xml": { source: "iana", compressible: true }, "application/vnd.oma.poc.groups+xml": { source: "iana", compressible: true }, "application/vnd.oma.poc.invocation-descriptor+xml": { source: "iana", compressible: true }, "application/vnd.oma.poc.optimized-progress-report+xml": { source: "iana", compressible: true }, "application/vnd.oma.push": { source: "iana" }, "application/vnd.oma.scidm.messages+xml": { source: "iana", compressible: true }, "application/vnd.oma.xcap-directory+xml": { source: "iana", compressible: true }, "application/vnd.omads-email+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/vnd.omads-file+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/vnd.omads-folder+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/vnd.omaloc-supl-init": { source: "iana" }, "application/vnd.onepager": { source: "iana" }, "application/vnd.onepagertamp": { source: "iana" }, "application/vnd.onepagertamx": { source: "iana" }, "application/vnd.onepagertat": { source: "iana" }, "application/vnd.onepagertatp": { source: "iana" }, "application/vnd.onepagertatx": { source: "iana" }, "application/vnd.openblox.game+xml": { source: "iana", compressible: true, extensions: ["obgx"] }, "application/vnd.openblox.game-binary": { source: "iana" }, "application/vnd.openeye.oeb": { source: "iana" }, "application/vnd.openofficeorg.extension": { source: "apache", extensions: ["oxt"] }, "application/vnd.openstreetmap.data+xml": { source: "iana", compressible: true, extensions: ["osm"] }, "application/vnd.opentimestamps.ots": { source: "iana" }, "application/vnd.openxmlformats-officedocument.custom-properties+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.drawing+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.extended-properties+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.presentation": { source: "iana", compressible: false, extensions: ["pptx"] }, "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.slide": { source: "iana", extensions: ["sldx"] }, "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.slideshow": { source: "iana", extensions: ["ppsx"] }, "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.template": { source: "iana", extensions: ["potx"] }, "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { source: "iana", compressible: false, extensions: ["xlsx"] }, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.template": { source: "iana", extensions: ["xltx"] }, "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.theme+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.themeoverride+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.vmldrawing": { source: "iana" }, "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { source: "iana", compressible: false, extensions: ["docx"] }, "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.template": { source: "iana", extensions: ["dotx"] }, "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-package.core-properties+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-package.relationships+xml": { source: "iana", compressible: true }, "application/vnd.oracle.resource+json": { source: "iana", compressible: true }, "application/vnd.orange.indata": { source: "iana" }, "application/vnd.osa.netdeploy": { source: "iana" }, "application/vnd.osgeo.mapguide.package": { source: "iana", extensions: ["mgp"] }, "application/vnd.osgi.bundle": { source: "iana" }, "application/vnd.osgi.dp": { source: "iana", extensions: ["dp"] }, "application/vnd.osgi.subsystem": { source: "iana", extensions: ["esa"] }, "application/vnd.otps.ct-kip+xml": { source: "iana", compressible: true }, "application/vnd.oxli.countgraph": { source: "iana" }, "application/vnd.pagerduty+json": { source: "iana", compressible: true }, "application/vnd.palm": { source: "iana", extensions: ["pdb", "pqa", "oprc"] }, "application/vnd.panoply": { source: "iana" }, "application/vnd.paos.xml": { source: "iana" }, "application/vnd.patentdive": { source: "iana" }, "application/vnd.patientecommsdoc": { source: "iana" }, "application/vnd.pawaafile": { source: "iana", extensions: ["paw"] }, "application/vnd.pcos": { source: "iana" }, "application/vnd.pg.format": { source: "iana", extensions: ["str"] }, "application/vnd.pg.osasli": { source: "iana", extensions: ["ei6"] }, "application/vnd.piaccess.application-licence": { source: "iana" }, "application/vnd.picsel": { source: "iana", extensions: ["efif"] }, "application/vnd.pmi.widget": { source: "iana", extensions: ["wg"] }, "application/vnd.poc.group-advertisement+xml": { source: "iana", compressible: true }, "application/vnd.pocketlearn": { source: "iana", extensions: ["plf"] }, "application/vnd.powerbuilder6": { source: "iana", extensions: ["pbd"] }, "application/vnd.powerbuilder6-s": { source: "iana" }, "application/vnd.powerbuilder7": { source: "iana" }, "application/vnd.powerbuilder7-s": { source: "iana" }, "application/vnd.powerbuilder75": { source: "iana" }, "application/vnd.powerbuilder75-s": { source: "iana" }, "application/vnd.preminet": { source: "iana" }, "application/vnd.previewsystems.box": { source: "iana", extensions: ["box"] }, "application/vnd.proteus.magazine": { source: "iana", extensions: ["mgz"] }, "application/vnd.psfs": { source: "iana" }, "application/vnd.publishare-delta-tree": { source: "iana", extensions: ["qps"] }, "application/vnd.pvi.ptid1": { source: "iana", extensions: ["ptid"] }, "application/vnd.pwg-multiplexed": { source: "iana" }, "application/vnd.pwg-xhtml-print+xml": { source: "iana", compressible: true }, "application/vnd.qualcomm.brew-app-res": { source: "iana" }, "application/vnd.quarantainenet": { source: "iana" }, "application/vnd.quark.quarkxpress": { source: "iana", extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"] }, "application/vnd.quobject-quoxdocument": { source: "iana" }, "application/vnd.radisys.moml+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-audit+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-audit-conf+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-audit-conn+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-audit-dialog+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-audit-stream+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-conf+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-dialog+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-dialog-base+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-dialog-fax-detect+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-dialog-group+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-dialog-speech+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-dialog-transform+xml": { source: "iana", compressible: true }, "application/vnd.rainstor.data": { source: "iana" }, "application/vnd.rapid": { source: "iana" }, "application/vnd.rar": { source: "iana", extensions: ["rar"] }, "application/vnd.realvnc.bed": { source: "iana", extensions: ["bed"] }, "application/vnd.recordare.musicxml": { source: "iana", extensions: ["mxl"] }, "application/vnd.recordare.musicxml+xml": { source: "iana", compressible: true, extensions: ["musicxml"] }, "application/vnd.renlearn.rlprint": { source: "iana" }, "application/vnd.resilient.logic": { source: "iana" }, "application/vnd.restful+json": { source: "iana", compressible: true }, "application/vnd.rig.cryptonote": { source: "iana", extensions: ["cryptonote"] }, "application/vnd.rim.cod": { source: "apache", extensions: ["cod"] }, "application/vnd.rn-realmedia": { source: "apache", extensions: ["rm"] }, "application/vnd.rn-realmedia-vbr": { source: "apache", extensions: ["rmvb"] }, "application/vnd.route66.link66+xml": { source: "iana", compressible: true, extensions: ["link66"] }, "application/vnd.rs-274x": { source: "iana" }, "application/vnd.ruckus.download": { source: "iana" }, "application/vnd.s3sms": { source: "iana" }, "application/vnd.sailingtracker.track": { source: "iana", extensions: ["st"] }, "application/vnd.sar": { source: "iana" }, "application/vnd.sbm.cid": { source: "iana" }, "application/vnd.sbm.mid2": { source: "iana" }, "application/vnd.scribus": { source: "iana" }, "application/vnd.sealed.3df": { source: "iana" }, "application/vnd.sealed.csf": { source: "iana" }, "application/vnd.sealed.doc": { source: "iana" }, "application/vnd.sealed.eml": { source: "iana" }, "application/vnd.sealed.mht": { source: "iana" }, "application/vnd.sealed.net": { source: "iana" }, "application/vnd.sealed.ppt": { source: "iana" }, "application/vnd.sealed.tiff": { source: "iana" }, "application/vnd.sealed.xls": { source: "iana" }, "application/vnd.sealedmedia.softseal.html": { source: "iana" }, "application/vnd.sealedmedia.softseal.pdf": { source: "iana" }, "application/vnd.seemail": { source: "iana", extensions: ["see"] }, "application/vnd.seis+json": { source: "iana", compressible: true }, "application/vnd.sema": { source: "iana", extensions: ["sema"] }, "application/vnd.semd": { source: "iana", extensions: ["semd"] }, "application/vnd.semf": { source: "iana", extensions: ["semf"] }, "application/vnd.shade-save-file": { source: "iana" }, "application/vnd.shana.informed.formdata": { source: "iana", extensions: ["ifm"] }, "application/vnd.shana.informed.formtemplate": { source: "iana", extensions: ["itp"] }, "application/vnd.shana.informed.interchange": { source: "iana", extensions: ["iif"] }, "application/vnd.shana.informed.package": { source: "iana", extensions: ["ipk"] }, "application/vnd.shootproof+json": { source: "iana", compressible: true }, "application/vnd.shopkick+json": { source: "iana", compressible: true }, "application/vnd.shp": { source: "iana" }, "application/vnd.shx": { source: "iana" }, "application/vnd.sigrok.session": { source: "iana" }, "application/vnd.simtech-mindmapper": { source: "iana", extensions: ["twd", "twds"] }, "application/vnd.siren+json": { source: "iana", compressible: true }, "application/vnd.smaf": { source: "iana", extensions: ["mmf"] }, "application/vnd.smart.notebook": { source: "iana" }, "application/vnd.smart.teacher": { source: "iana", extensions: ["teacher"] }, "application/vnd.snesdev-page-table": { source: "iana" }, "application/vnd.software602.filler.form+xml": { source: "iana", compressible: true, extensions: ["fo"] }, "application/vnd.software602.filler.form-xml-zip": { source: "iana" }, "application/vnd.solent.sdkm+xml": { source: "iana", compressible: true, extensions: ["sdkm", "sdkd"] }, "application/vnd.spotfire.dxp": { source: "iana", extensions: ["dxp"] }, "application/vnd.spotfire.sfs": { source: "iana", extensions: ["sfs"] }, "application/vnd.sqlite3": { source: "iana" }, "application/vnd.sss-cod": { source: "iana" }, "application/vnd.sss-dtf": { source: "iana" }, "application/vnd.sss-ntf": { source: "iana" }, "application/vnd.stardivision.calc": { source: "apache", extensions: ["sdc"] }, "application/vnd.stardivision.draw": { source: "apache", extensions: ["sda"] }, "application/vnd.stardivision.impress": { source: "apache", extensions: ["sdd"] }, "application/vnd.stardivision.math": { source: "apache", extensions: ["smf"] }, "application/vnd.stardivision.writer": { source: "apache", extensions: ["sdw", "vor"] }, "application/vnd.stardivision.writer-global": { source: "apache", extensions: ["sgl"] }, "application/vnd.stepmania.package": { source: "iana", extensions: ["smzip"] }, "application/vnd.stepmania.stepchart": { source: "iana", extensions: ["sm"] }, "application/vnd.street-stream": { source: "iana" }, "application/vnd.sun.wadl+xml": { source: "iana", compressible: true, extensions: ["wadl"] }, "application/vnd.sun.xml.calc": { source: "apache", extensions: ["sxc"] }, "application/vnd.sun.xml.calc.template": { source: "apache", extensions: ["stc"] }, "application/vnd.sun.xml.draw": { source: "apache", extensions: ["sxd"] }, "application/vnd.sun.xml.draw.template": { source: "apache", extensions: ["std"] }, "application/vnd.sun.xml.impress": { source: "apache", extensions: ["sxi"] }, "application/vnd.sun.xml.impress.template": { source: "apache", extensions: ["sti"] }, "application/vnd.sun.xml.math": { source: "apache", extensions: ["sxm"] }, "application/vnd.sun.xml.writer": { source: "apache", extensions: ["sxw"] }, "application/vnd.sun.xml.writer.global": { source: "apache", extensions: ["sxg"] }, "application/vnd.sun.xml.writer.template": { source: "apache", extensions: ["stw"] }, "application/vnd.sus-calendar": { source: "iana", extensions: ["sus", "susp"] }, "application/vnd.svd": { source: "iana", extensions: ["svd"] }, "application/vnd.swiftview-ics": { source: "iana" }, "application/vnd.sycle+xml": { source: "iana", compressible: true }, "application/vnd.syft+json": { source: "iana", compressible: true }, "application/vnd.symbian.install": { source: "apache", extensions: ["sis", "sisx"] }, "application/vnd.syncml+xml": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["xsm"] }, "application/vnd.syncml.dm+wbxml": { source: "iana", charset: "UTF-8", extensions: ["bdm"] }, "application/vnd.syncml.dm+xml": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["xdm"] }, "application/vnd.syncml.dm.notification": { source: "iana" }, "application/vnd.syncml.dmddf+wbxml": { source: "iana" }, "application/vnd.syncml.dmddf+xml": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["ddf"] }, "application/vnd.syncml.dmtnds+wbxml": { source: "iana" }, "application/vnd.syncml.dmtnds+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/vnd.syncml.ds.notification": { source: "iana" }, "application/vnd.tableschema+json": { source: "iana", compressible: true }, "application/vnd.tao.intent-module-archive": { source: "iana", extensions: ["tao"] }, "application/vnd.tcpdump.pcap": { source: "iana", extensions: ["pcap", "cap", "dmp"] }, "application/vnd.think-cell.ppttc+json": { source: "iana", compressible: true }, "application/vnd.tmd.mediaflex.api+xml": { source: "iana", compressible: true }, "application/vnd.tml": { source: "iana" }, "application/vnd.tmobile-livetv": { source: "iana", extensions: ["tmo"] }, "application/vnd.tri.onesource": { source: "iana" }, "application/vnd.trid.tpt": { source: "iana", extensions: ["tpt"] }, "application/vnd.triscape.mxs": { source: "iana", extensions: ["mxs"] }, "application/vnd.trueapp": { source: "iana", extensions: ["tra"] }, "application/vnd.truedoc": { source: "iana" }, "application/vnd.ubisoft.webplayer": { source: "iana" }, "application/vnd.ufdl": { source: "iana", extensions: ["ufd", "ufdl"] }, "application/vnd.uiq.theme": { source: "iana", extensions: ["utz"] }, "application/vnd.umajin": { source: "iana", extensions: ["umj"] }, "application/vnd.unity": { source: "iana", extensions: ["unityweb"] }, "application/vnd.uoml+xml": { source: "iana", compressible: true, extensions: ["uoml"] }, "application/vnd.uplanet.alert": { source: "iana" }, "application/vnd.uplanet.alert-wbxml": { source: "iana" }, "application/vnd.uplanet.bearer-choice": { source: "iana" }, "application/vnd.uplanet.bearer-choice-wbxml": { source: "iana" }, "application/vnd.uplanet.cacheop": { source: "iana" }, "application/vnd.uplanet.cacheop-wbxml": { source: "iana" }, "application/vnd.uplanet.channel": { source: "iana" }, "application/vnd.uplanet.channel-wbxml": { source: "iana" }, "application/vnd.uplanet.list": { source: "iana" }, "application/vnd.uplanet.list-wbxml": { source: "iana" }, "application/vnd.uplanet.listcmd": { source: "iana" }, "application/vnd.uplanet.listcmd-wbxml": { source: "iana" }, "application/vnd.uplanet.signal": { source: "iana" }, "application/vnd.uri-map": { source: "iana" }, "application/vnd.valve.source.material": { source: "iana" }, "application/vnd.vcx": { source: "iana", extensions: ["vcx"] }, "application/vnd.vd-study": { source: "iana" }, "application/vnd.vectorworks": { source: "iana" }, "application/vnd.vel+json": { source: "iana", compressible: true }, "application/vnd.verimatrix.vcas": { source: "iana" }, "application/vnd.veritone.aion+json": { source: "iana", compressible: true }, "application/vnd.veryant.thin": { source: "iana" }, "application/vnd.ves.encrypted": { source: "iana" }, "application/vnd.vidsoft.vidconference": { source: "iana" }, "application/vnd.visio": { source: "iana", extensions: ["vsd", "vst", "vss", "vsw"] }, "application/vnd.visionary": { source: "iana", extensions: ["vis"] }, "application/vnd.vividence.scriptfile": { source: "iana" }, "application/vnd.vsf": { source: "iana", extensions: ["vsf"] }, "application/vnd.wap.sic": { source: "iana" }, "application/vnd.wap.slc": { source: "iana" }, "application/vnd.wap.wbxml": { source: "iana", charset: "UTF-8", extensions: ["wbxml"] }, "application/vnd.wap.wmlc": { source: "iana", extensions: ["wmlc"] }, "application/vnd.wap.wmlscriptc": { source: "iana", extensions: ["wmlsc"] }, "application/vnd.webturbo": { source: "iana", extensions: ["wtb"] }, "application/vnd.wfa.dpp": { source: "iana" }, "application/vnd.wfa.p2p": { source: "iana" }, "application/vnd.wfa.wsc": { source: "iana" }, "application/vnd.windows.devicepairing": { source: "iana" }, "application/vnd.wmc": { source: "iana" }, "application/vnd.wmf.bootstrap": { source: "iana" }, "application/vnd.wolfram.mathematica": { source: "iana" }, "application/vnd.wolfram.mathematica.package": { source: "iana" }, "application/vnd.wolfram.player": { source: "iana", extensions: ["nbp"] }, "application/vnd.wordperfect": { source: "iana", extensions: ["wpd"] }, "application/vnd.wqd": { source: "iana", extensions: ["wqd"] }, "application/vnd.wrq-hp3000-labelled": { source: "iana" }, "application/vnd.wt.stf": { source: "iana", extensions: ["stf"] }, "application/vnd.wv.csp+wbxml": { source: "iana" }, "application/vnd.wv.csp+xml": { source: "iana", compressible: true }, "application/vnd.wv.ssp+xml": { source: "iana", compressible: true }, "application/vnd.xacml+json": { source: "iana", compressible: true }, "application/vnd.xara": { source: "iana", extensions: ["xar"] }, "application/vnd.xfdl": { source: "iana", extensions: ["xfdl"] }, "application/vnd.xfdl.webform": { source: "iana" }, "application/vnd.xmi+xml": { source: "iana", compressible: true }, "application/vnd.xmpie.cpkg": { source: "iana" }, "application/vnd.xmpie.dpkg": { source: "iana" }, "application/vnd.xmpie.plan": { source: "iana" }, "application/vnd.xmpie.ppkg": { source: "iana" }, "application/vnd.xmpie.xlim": { source: "iana" }, "application/vnd.yamaha.hv-dic": { source: "iana", extensions: ["hvd"] }, "application/vnd.yamaha.hv-script": { source: "iana", extensions: ["hvs"] }, "application/vnd.yamaha.hv-voice": { source: "iana", extensions: ["hvp"] }, "application/vnd.yamaha.openscoreformat": { source: "iana", extensions: ["osf"] }, "application/vnd.yamaha.openscoreformat.osfpvg+xml": { source: "iana", compressible: true, extensions: ["osfpvg"] }, "application/vnd.yamaha.remote-setup": { source: "iana" }, "application/vnd.yamaha.smaf-audio": { source: "iana", extensions: ["saf"] }, "application/vnd.yamaha.smaf-phrase": { source: "iana", extensions: ["spf"] }, "application/vnd.yamaha.through-ngn": { source: "iana" }, "application/vnd.yamaha.tunnel-udpencap": { source: "iana" }, "application/vnd.yaoweme": { source: "iana" }, "application/vnd.yellowriver-custom-menu": { source: "iana", extensions: ["cmp"] }, "application/vnd.youtube.yt": { source: "iana" }, "application/vnd.zul": { source: "iana", extensions: ["zir", "zirz"] }, "application/vnd.zzazz.deck+xml": { source: "iana", compressible: true, extensions: ["zaz"] }, "application/voicexml+xml": { source: "iana", compressible: true, extensions: ["vxml"] }, "application/voucher-cms+json": { source: "iana", compressible: true }, "application/vq-rtcpxr": { source: "iana" }, "application/wasm": { source: "iana", compressible: true, extensions: ["wasm"] }, "application/watcherinfo+xml": { source: "iana", compressible: true, extensions: ["wif"] }, "application/webpush-options+json": { source: "iana", compressible: true }, "application/whoispp-query": { source: "iana" }, "application/whoispp-response": { source: "iana" }, "application/widget": { source: "iana", extensions: ["wgt"] }, "application/winhlp": { source: "apache", extensions: ["hlp"] }, "application/wita": { source: "iana" }, "application/wordperfect5.1": { source: "iana" }, "application/wsdl+xml": { source: "iana", compressible: true, extensions: ["wsdl"] }, "application/wspolicy+xml": { source: "iana", compressible: true, extensions: ["wspolicy"] }, "application/x-7z-compressed": { source: "apache", compressible: false, extensions: ["7z"] }, "application/x-abiword": { source: "apache", extensions: ["abw"] }, "application/x-ace-compressed": { source: "apache", extensions: ["ace"] }, "application/x-amf": { source: "apache" }, "application/x-apple-diskimage": { source: "apache", extensions: ["dmg"] }, "application/x-arj": { compressible: false, extensions: ["arj"] }, "application/x-authorware-bin": { source: "apache", extensions: ["aab", "x32", "u32", "vox"] }, "application/x-authorware-map": { source: "apache", extensions: ["aam"] }, "application/x-authorware-seg": { source: "apache", extensions: ["aas"] }, "application/x-bcpio": { source: "apache", extensions: ["bcpio"] }, "application/x-bdoc": { compressible: false, extensions: ["bdoc"] }, "application/x-bittorrent": { source: "apache", extensions: ["torrent"] }, "application/x-blorb": { source: "apache", extensions: ["blb", "blorb"] }, "application/x-bzip": { source: "apache", compressible: false, extensions: ["bz"] }, "application/x-bzip2": { source: "apache", compressible: false, extensions: ["bz2", "boz"] }, "application/x-cbr": { source: "apache", extensions: ["cbr", "cba", "cbt", "cbz", "cb7"] }, "application/x-cdlink": { source: "apache", extensions: ["vcd"] }, "application/x-cfs-compressed": { source: "apache", extensions: ["cfs"] }, "application/x-chat": { source: "apache", extensions: ["chat"] }, "application/x-chess-pgn": { source: "apache", extensions: ["pgn"] }, "application/x-chrome-extension": { extensions: ["crx"] }, "application/x-cocoa": { source: "nginx", extensions: ["cco"] }, "application/x-compress": { source: "apache" }, "application/x-conference": { source: "apache", extensions: ["nsc"] }, "application/x-cpio": { source: "apache", extensions: ["cpio"] }, "application/x-csh": { source: "apache", extensions: ["csh"] }, "application/x-deb": { compressible: false }, "application/x-debian-package": { source: "apache", extensions: ["deb", "udeb"] }, "application/x-dgc-compressed": { source: "apache", extensions: ["dgc"] }, "application/x-director": { source: "apache", extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"] }, "application/x-doom": { source: "apache", extensions: ["wad"] }, "application/x-dtbncx+xml": { source: "apache", compressible: true, extensions: ["ncx"] }, "application/x-dtbook+xml": { source: "apache", compressible: true, extensions: ["dtb"] }, "application/x-dtbresource+xml": { source: "apache", compressible: true, extensions: ["res"] }, "application/x-dvi": { source: "apache", compressible: false, extensions: ["dvi"] }, "application/x-envoy": { source: "apache", extensions: ["evy"] }, "application/x-eva": { source: "apache", extensions: ["eva"] }, "application/x-font-bdf": { source: "apache", extensions: ["bdf"] }, "application/x-font-dos": { source: "apache" }, "application/x-font-framemaker": { source: "apache" }, "application/x-font-ghostscript": { source: "apache", extensions: ["gsf"] }, "application/x-font-libgrx": { source: "apache" }, "application/x-font-linux-psf": { source: "apache", extensions: ["psf"] }, "application/x-font-pcf": { source: "apache", extensions: ["pcf"] }, "application/x-font-snf": { source: "apache", extensions: ["snf"] }, "application/x-font-speedo": { source: "apache" }, "application/x-font-sunos-news": { source: "apache" }, "application/x-font-type1": { source: "apache", extensions: ["pfa", "pfb", "pfm", "afm"] }, "application/x-font-vfont": { source: "apache" }, "application/x-freearc": { source: "apache", extensions: ["arc"] }, "application/x-futuresplash": { source: "apache", extensions: ["spl"] }, "application/x-gca-compressed": { source: "apache", extensions: ["gca"] }, "application/x-glulx": { source: "apache", extensions: ["ulx"] }, "application/x-gnumeric": { source: "apache", extensions: ["gnumeric"] }, "application/x-gramps-xml": { source: "apache", extensions: ["gramps"] }, "application/x-gtar": { source: "apache", extensions: ["gtar"] }, "application/x-gzip": { source: "apache" }, "application/x-hdf": { source: "apache", extensions: ["hdf"] }, "application/x-httpd-php": { compressible: true, extensions: ["php"] }, "application/x-install-instructions": { source: "apache", extensions: ["install"] }, "application/x-iso9660-image": { source: "apache", extensions: ["iso"] }, "application/x-iwork-keynote-sffkey": { extensions: ["key"] }, "application/x-iwork-numbers-sffnumbers": { extensions: ["numbers"] }, "application/x-iwork-pages-sffpages": { extensions: ["pages"] }, "application/x-java-archive-diff": { source: "nginx", extensions: ["jardiff"] }, "application/x-java-jnlp-file": { source: "apache", compressible: false, extensions: ["jnlp"] }, "application/x-javascript": { compressible: true }, "application/x-keepass2": { extensions: ["kdbx"] }, "application/x-latex": { source: "apache", compressible: false, extensions: ["latex"] }, "application/x-lua-bytecode": { extensions: ["luac"] }, "application/x-lzh-compressed": { source: "apache", extensions: ["lzh", "lha"] }, "application/x-makeself": { source: "nginx", extensions: ["run"] }, "application/x-mie": { source: "apache", extensions: ["mie"] }, "application/x-mobipocket-ebook": { source: "apache", extensions: ["prc", "mobi"] }, "application/x-mpegurl": { compressible: false }, "application/x-ms-application": { source: "apache", extensions: ["application"] }, "application/x-ms-shortcut": { source: "apache", extensions: ["lnk"] }, "application/x-ms-wmd": { source: "apache", extensions: ["wmd"] }, "application/x-ms-wmz": { source: "apache", extensions: ["wmz"] }, "application/x-ms-xbap": { source: "apache", extensions: ["xbap"] }, "application/x-msaccess": { source: "apache", extensions: ["mdb"] }, "application/x-msbinder": { source: "apache", extensions: ["obd"] }, "application/x-mscardfile": { source: "apache", extensions: ["crd"] }, "application/x-msclip": { source: "apache", extensions: ["clp"] }, "application/x-msdos-program": { extensions: ["exe"] }, "application/x-msdownload": { source: "apache", extensions: ["exe", "dll", "com", "bat", "msi"] }, "application/x-msmediaview": { source: "apache", extensions: ["mvb", "m13", "m14"] }, "application/x-msmetafile": { source: "apache", extensions: ["wmf", "wmz", "emf", "emz"] }, "application/x-msmoney": { source: "apache", extensions: ["mny"] }, "application/x-mspublisher": { source: "apache", extensions: ["pub"] }, "application/x-msschedule": { source: "apache", extensions: ["scd"] }, "application/x-msterminal": { source: "apache", extensions: ["trm"] }, "application/x-mswrite": { source: "apache", extensions: ["wri"] }, "application/x-netcdf": { source: "apache", extensions: ["nc", "cdf"] }, "application/x-ns-proxy-autoconfig": { compressible: true, extensions: ["pac"] }, "application/x-nzb": { source: "apache", extensions: ["nzb"] }, "application/x-perl": { source: "nginx", extensions: ["pl", "pm"] }, "application/x-pilot": { source: "nginx", extensions: ["prc", "pdb"] }, "application/x-pkcs12": { source: "apache", compressible: false, extensions: ["p12", "pfx"] }, "application/x-pkcs7-certificates": { source: "apache", extensions: ["p7b", "spc"] }, "application/x-pkcs7-certreqresp": { source: "apache", extensions: ["p7r"] }, "application/x-pki-message": { source: "iana" }, "application/x-rar-compressed": { source: "apache", compressible: false, extensions: ["rar"] }, "application/x-redhat-package-manager": { source: "nginx", extensions: ["rpm"] }, "application/x-research-info-systems": { source: "apache", extensions: ["ris"] }, "application/x-sea": { source: "nginx", extensions: ["sea"] }, "application/x-sh": { source: "apache", compressible: true, extensions: ["sh"] }, "application/x-shar": { source: "apache", extensions: ["shar"] }, "application/x-shockwave-flash": { source: "apache", compressible: false, extensions: ["swf"] }, "application/x-silverlight-app": { source: "apache", extensions: ["xap"] }, "application/x-sql": { source: "apache", extensions: ["sql"] }, "application/x-stuffit": { source: "apache", compressible: false, extensions: ["sit"] }, "application/x-stuffitx": { source: "apache", extensions: ["sitx"] }, "application/x-subrip": { source: "apache", extensions: ["srt"] }, "application/x-sv4cpio": { source: "apache", extensions: ["sv4cpio"] }, "application/x-sv4crc": { source: "apache", extensions: ["sv4crc"] }, "application/x-t3vm-image": { source: "apache", extensions: ["t3"] }, "application/x-tads": { source: "apache", extensions: ["gam"] }, "application/x-tar": { source: "apache", compressible: true, extensions: ["tar"] }, "application/x-tcl": { source: "apache", extensions: ["tcl", "tk"] }, "application/x-tex": { source: "apache", extensions: ["tex"] }, "application/x-tex-tfm": { source: "apache", extensions: ["tfm"] }, "application/x-texinfo": { source: "apache", extensions: ["texinfo", "texi"] }, "application/x-tgif": { source: "apache", extensions: ["obj"] }, "application/x-ustar": { source: "apache", extensions: ["ustar"] }, "application/x-virtualbox-hdd": { compressible: true, extensions: ["hdd"] }, "application/x-virtualbox-ova": { compressible: true, extensions: ["ova"] }, "application/x-virtualbox-ovf": { compressible: true, extensions: ["ovf"] }, "application/x-virtualbox-vbox": { compressible: true, extensions: ["vbox"] }, "application/x-virtualbox-vbox-extpack": { compressible: false, extensions: ["vbox-extpack"] }, "application/x-virtualbox-vdi": { compressible: true, extensions: ["vdi"] }, "application/x-virtualbox-vhd": { compressible: true, extensions: ["vhd"] }, "application/x-virtualbox-vmdk": { compressible: true, extensions: ["vmdk"] }, "application/x-wais-source": { source: "apache", extensions: ["src"] }, "application/x-web-app-manifest+json": { compressible: true, extensions: ["webapp"] }, "application/x-www-form-urlencoded": { source: "iana", compressible: true }, "application/x-x509-ca-cert": { source: "iana", extensions: ["der", "crt", "pem"] }, "application/x-x509-ca-ra-cert": { source: "iana" }, "application/x-x509-next-ca-cert": { source: "iana" }, "application/x-xfig": { source: "apache", extensions: ["fig"] }, "application/x-xliff+xml": { source: "apache", compressible: true, extensions: ["xlf"] }, "application/x-xpinstall": { source: "apache", compressible: false, extensions: ["xpi"] }, "application/x-xz": { source: "apache", extensions: ["xz"] }, "application/x-zmachine": { source: "apache", extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"] }, "application/x400-bp": { source: "iana" }, "application/xacml+xml": { source: "iana", compressible: true }, "application/xaml+xml": { source: "apache", compressible: true, extensions: ["xaml"] }, "application/xcap-att+xml": { source: "iana", compressible: true, extensions: ["xav"] }, "application/xcap-caps+xml": { source: "iana", compressible: true, extensions: ["xca"] }, "application/xcap-diff+xml": { source: "iana", compressible: true, extensions: ["xdf"] }, "application/xcap-el+xml": { source: "iana", compressible: true, extensions: ["xel"] }, "application/xcap-error+xml": { source: "iana", compressible: true }, "application/xcap-ns+xml": { source: "iana", compressible: true, extensions: ["xns"] }, "application/xcon-conference-info+xml": { source: "iana", compressible: true }, "application/xcon-conference-info-diff+xml": { source: "iana", compressible: true }, "application/xenc+xml": { source: "iana", compressible: true, extensions: ["xenc"] }, "application/xhtml+xml": { source: "iana", compressible: true, extensions: ["xhtml", "xht"] }, "application/xhtml-voice+xml": { source: "apache", compressible: true }, "application/xliff+xml": { source: "iana", compressible: true, extensions: ["xlf"] }, "application/xml": { source: "iana", compressible: true, extensions: ["xml", "xsl", "xsd", "rng"] }, "application/xml-dtd": { source: "iana", compressible: true, extensions: ["dtd"] }, "application/xml-external-parsed-entity": { source: "iana" }, "application/xml-patch+xml": { source: "iana", compressible: true }, "application/xmpp+xml": { source: "iana", compressible: true }, "application/xop+xml": { source: "iana", compressible: true, extensions: ["xop"] }, "application/xproc+xml": { source: "apache", compressible: true, extensions: ["xpl"] }, "application/xslt+xml": { source: "iana", compressible: true, extensions: ["xsl", "xslt"] }, "application/xspf+xml": { source: "apache", compressible: true, extensions: ["xspf"] }, "application/xv+xml": { source: "iana", compressible: true, extensions: ["mxml", "xhvml", "xvml", "xvm"] }, "application/yang": { source: "iana", extensions: ["yang"] }, "application/yang-data+json": { source: "iana", compressible: true }, "application/yang-data+xml": { source: "iana", compressible: true }, "application/yang-patch+json": { source: "iana", compressible: true }, "application/yang-patch+xml": { source: "iana", compressible: true }, "application/yin+xml": { source: "iana", compressible: true, extensions: ["yin"] }, "application/zip": { source: "iana", compressible: false, extensions: ["zip"] }, "application/zlib": { source: "iana" }, "application/zstd": { source: "iana" }, "audio/1d-interleaved-parityfec": { source: "iana" }, "audio/32kadpcm": { source: "iana" }, "audio/3gpp": { source: "iana", compressible: false, extensions: ["3gpp"] }, "audio/3gpp2": { source: "iana" }, "audio/aac": { source: "iana" }, "audio/ac3": { source: "iana" }, "audio/adpcm": { source: "apache", extensions: ["adp"] }, "audio/amr": { source: "iana", extensions: ["amr"] }, "audio/amr-wb": { source: "iana" }, "audio/amr-wb+": { source: "iana" }, "audio/aptx": { source: "iana" }, "audio/asc": { source: "iana" }, "audio/atrac-advanced-lossless": { source: "iana" }, "audio/atrac-x": { source: "iana" }, "audio/atrac3": { source: "iana" }, "audio/basic": { source: "iana", compressible: false, extensions: ["au", "snd"] }, "audio/bv16": { source: "iana" }, "audio/bv32": { source: "iana" }, "audio/clearmode": { source: "iana" }, "audio/cn": { source: "iana" }, "audio/dat12": { source: "iana" }, "audio/dls": { source: "iana" }, "audio/dsr-es201108": { source: "iana" }, "audio/dsr-es202050": { source: "iana" }, "audio/dsr-es202211": { source: "iana" }, "audio/dsr-es202212": { source: "iana" }, "audio/dv": { source: "iana" }, "audio/dvi4": { source: "iana" }, "audio/eac3": { source: "iana" }, "audio/encaprtp": { source: "iana" }, "audio/evrc": { source: "iana" }, "audio/evrc-qcp": { source: "iana" }, "audio/evrc0": { source: "iana" }, "audio/evrc1": { source: "iana" }, "audio/evrcb": { source: "iana" }, "audio/evrcb0": { source: "iana" }, "audio/evrcb1": { source: "iana" }, "audio/evrcnw": { source: "iana" }, "audio/evrcnw0": { source: "iana" }, "audio/evrcnw1": { source: "iana" }, "audio/evrcwb": { source: "iana" }, "audio/evrcwb0": { source: "iana" }, "audio/evrcwb1": { source: "iana" }, "audio/evs": { source: "iana" }, "audio/flexfec": { source: "iana" }, "audio/fwdred": { source: "iana" }, "audio/g711-0": { source: "iana" }, "audio/g719": { source: "iana" }, "audio/g722": { source: "iana" }, "audio/g7221": { source: "iana" }, "audio/g723": { source: "iana" }, "audio/g726-16": { source: "iana" }, "audio/g726-24": { source: "iana" }, "audio/g726-32": { source: "iana" }, "audio/g726-40": { source: "iana" }, "audio/g728": { source: "iana" }, "audio/g729": { source: "iana" }, "audio/g7291": { source: "iana" }, "audio/g729d": { source: "iana" }, "audio/g729e": { source: "iana" }, "audio/gsm": { source: "iana" }, "audio/gsm-efr": { source: "iana" }, "audio/gsm-hr-08": { source: "iana" }, "audio/ilbc": { source: "iana" }, "audio/ip-mr_v2.5": { source: "iana" }, "audio/isac": { source: "apache" }, "audio/l16": { source: "iana" }, "audio/l20": { source: "iana" }, "audio/l24": { source: "iana", compressible: false }, "audio/l8": { source: "iana" }, "audio/lpc": { source: "iana" }, "audio/melp": { source: "iana" }, "audio/melp1200": { source: "iana" }, "audio/melp2400": { source: "iana" }, "audio/melp600": { source: "iana" }, "audio/mhas": { source: "iana" }, "audio/midi": { source: "apache", extensions: ["mid", "midi", "kar", "rmi"] }, "audio/mobile-xmf": { source: "iana", extensions: ["mxmf"] }, "audio/mp3": { compressible: false, extensions: ["mp3"] }, "audio/mp4": { source: "iana", compressible: false, extensions: ["m4a", "mp4a"] }, "audio/mp4a-latm": { source: "iana" }, "audio/mpa": { source: "iana" }, "audio/mpa-robust": { source: "iana" }, "audio/mpeg": { source: "iana", compressible: false, extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"] }, "audio/mpeg4-generic": { source: "iana" }, "audio/musepack": { source: "apache" }, "audio/ogg": { source: "iana", compressible: false, extensions: ["oga", "ogg", "spx", "opus"] }, "audio/opus": { source: "iana" }, "audio/parityfec": { source: "iana" }, "audio/pcma": { source: "iana" }, "audio/pcma-wb": { source: "iana" }, "audio/pcmu": { source: "iana" }, "audio/pcmu-wb": { source: "iana" }, "audio/prs.sid": { source: "iana" }, "audio/qcelp": { source: "iana" }, "audio/raptorfec": { source: "iana" }, "audio/red": { source: "iana" }, "audio/rtp-enc-aescm128": { source: "iana" }, "audio/rtp-midi": { source: "iana" }, "audio/rtploopback": { source: "iana" }, "audio/rtx": { source: "iana" }, "audio/s3m": { source: "apache", extensions: ["s3m"] }, "audio/scip": { source: "iana" }, "audio/silk": { source: "apache", extensions: ["sil"] }, "audio/smv": { source: "iana" }, "audio/smv-qcp": { source: "iana" }, "audio/smv0": { source: "iana" }, "audio/sofa": { source: "iana" }, "audio/sp-midi": { source: "iana" }, "audio/speex": { source: "iana" }, "audio/t140c": { source: "iana" }, "audio/t38": { source: "iana" }, "audio/telephone-event": { source: "iana" }, "audio/tetra_acelp": { source: "iana" }, "audio/tetra_acelp_bb": { source: "iana" }, "audio/tone": { source: "iana" }, "audio/tsvcis": { source: "iana" }, "audio/uemclip": { source: "iana" }, "audio/ulpfec": { source: "iana" }, "audio/usac": { source: "iana" }, "audio/vdvi": { source: "iana" }, "audio/vmr-wb": { source: "iana" }, "audio/vnd.3gpp.iufp": { source: "iana" }, "audio/vnd.4sb": { source: "iana" }, "audio/vnd.audiokoz": { source: "iana" }, "audio/vnd.celp": { source: "iana" }, "audio/vnd.cisco.nse": { source: "iana" }, "audio/vnd.cmles.radio-events": { source: "iana" }, "audio/vnd.cns.anp1": { source: "iana" }, "audio/vnd.cns.inf1": { source: "iana" }, "audio/vnd.dece.audio": { source: "iana", extensions: ["uva", "uvva"] }, "audio/vnd.digital-winds": { source: "iana", extensions: ["eol"] }, "audio/vnd.dlna.adts": { source: "iana" }, "audio/vnd.dolby.heaac.1": { source: "iana" }, "audio/vnd.dolby.heaac.2": { source: "iana" }, "audio/vnd.dolby.mlp": { source: "iana" }, "audio/vnd.dolby.mps": { source: "iana" }, "audio/vnd.dolby.pl2": { source: "iana" }, "audio/vnd.dolby.pl2x": { source: "iana" }, "audio/vnd.dolby.pl2z": { source: "iana" }, "audio/vnd.dolby.pulse.1": { source: "iana" }, "audio/vnd.dra": { source: "iana", extensions: ["dra"] }, "audio/vnd.dts": { source: "iana", extensions: ["dts"] }, "audio/vnd.dts.hd": { source: "iana", extensions: ["dtshd"] }, "audio/vnd.dts.uhd": { source: "iana" }, "audio/vnd.dvb.file": { source: "iana" }, "audio/vnd.everad.plj": { source: "iana" }, "audio/vnd.hns.audio": { source: "iana" }, "audio/vnd.lucent.voice": { source: "iana", extensions: ["lvp"] }, "audio/vnd.ms-playready.media.pya": { source: "iana", extensions: ["pya"] }, "audio/vnd.nokia.mobile-xmf": { source: "iana" }, "audio/vnd.nortel.vbk": { source: "iana" }, "audio/vnd.nuera.ecelp4800": { source: "iana", extensions: ["ecelp4800"] }, "audio/vnd.nuera.ecelp7470": { source: "iana", extensions: ["ecelp7470"] }, "audio/vnd.nuera.ecelp9600": { source: "iana", extensions: ["ecelp9600"] }, "audio/vnd.octel.sbc": { source: "iana" }, "audio/vnd.presonus.multitrack": { source: "iana" }, "audio/vnd.qcelp": { source: "iana" }, "audio/vnd.rhetorex.32kadpcm": { source: "iana" }, "audio/vnd.rip": { source: "iana", extensions: ["rip"] }, "audio/vnd.rn-realaudio": { compressible: false }, "audio/vnd.sealedmedia.softseal.mpeg": { source: "iana" }, "audio/vnd.vmx.cvsd": { source: "iana" }, "audio/vnd.wave": { compressible: false }, "audio/vorbis": { source: "iana", compressible: false }, "audio/vorbis-config": { source: "iana" }, "audio/wav": { compressible: false, extensions: ["wav"] }, "audio/wave": { compressible: false, extensions: ["wav"] }, "audio/webm": { source: "apache", compressible: false, extensions: ["weba"] }, "audio/x-aac": { source: "apache", compressible: false, extensions: ["aac"] }, "audio/x-aiff": { source: "apache", extensions: ["aif", "aiff", "aifc"] }, "audio/x-caf": { source: "apache", compressible: false, extensions: ["caf"] }, "audio/x-flac": { source: "apache", extensions: ["flac"] }, "audio/x-m4a": { source: "nginx", extensions: ["m4a"] }, "audio/x-matroska": { source: "apache", extensions: ["mka"] }, "audio/x-mpegurl": { source: "apache", extensions: ["m3u"] }, "audio/x-ms-wax": { source: "apache", extensions: ["wax"] }, "audio/x-ms-wma": { source: "apache", extensions: ["wma"] }, "audio/x-pn-realaudio": { source: "apache", extensions: ["ram", "ra"] }, "audio/x-pn-realaudio-plugin": { source: "apache", extensions: ["rmp"] }, "audio/x-realaudio": { source: "nginx", extensions: ["ra"] }, "audio/x-tta": { source: "apache" }, "audio/x-wav": { source: "apache", extensions: ["wav"] }, "audio/xm": { source: "apache", extensions: ["xm"] }, "chemical/x-cdx": { source: "apache", extensions: ["cdx"] }, "chemical/x-cif": { source: "apache", extensions: ["cif"] }, "chemical/x-cmdf": { source: "apache", extensions: ["cmdf"] }, "chemical/x-cml": { source: "apache", extensions: ["cml"] }, "chemical/x-csml": { source: "apache", extensions: ["csml"] }, "chemical/x-pdb": { source: "apache" }, "chemical/x-xyz": { source: "apache", extensions: ["xyz"] }, "font/collection": { source: "iana", extensions: ["ttc"] }, "font/otf": { source: "iana", compressible: true, extensions: ["otf"] }, "font/sfnt": { source: "iana" }, "font/ttf": { source: "iana", compressible: true, extensions: ["ttf"] }, "font/woff": { source: "iana", extensions: ["woff"] }, "font/woff2": { source: "iana", extensions: ["woff2"] }, "image/aces": { source: "iana", extensions: ["exr"] }, "image/apng": { compressible: false, extensions: ["apng"] }, "image/avci": { source: "iana", extensions: ["avci"] }, "image/avcs": { source: "iana", extensions: ["avcs"] }, "image/avif": { source: "iana", compressible: false, extensions: ["avif"] }, "image/bmp": { source: "iana", compressible: true, extensions: ["bmp"] }, "image/cgm": { source: "iana", extensions: ["cgm"] }, "image/dicom-rle": { source: "iana", extensions: ["drle"] }, "image/emf": { source: "iana", extensions: ["emf"] }, "image/fits": { source: "iana", extensions: ["fits"] }, "image/g3fax": { source: "iana", extensions: ["g3"] }, "image/gif": { source: "iana", compressible: false, extensions: ["gif"] }, "image/heic": { source: "iana", extensions: ["heic"] }, "image/heic-sequence": { source: "iana", extensions: ["heics"] }, "image/heif": { source: "iana", extensions: ["heif"] }, "image/heif-sequence": { source: "iana", extensions: ["heifs"] }, "image/hej2k": { source: "iana", extensions: ["hej2"] }, "image/hsj2": { source: "iana", extensions: ["hsj2"] }, "image/ief": { source: "iana", extensions: ["ief"] }, "image/jls": { source: "iana", extensions: ["jls"] }, "image/jp2": { source: "iana", compressible: false, extensions: ["jp2", "jpg2"] }, "image/jpeg": { source: "iana", compressible: false, extensions: ["jpeg", "jpg", "jpe"] }, "image/jph": { source: "iana", extensions: ["jph"] }, "image/jphc": { source: "iana", extensions: ["jhc"] }, "image/jpm": { source: "iana", compressible: false, extensions: ["jpm"] }, "image/jpx": { source: "iana", compressible: false, extensions: ["jpx", "jpf"] }, "image/jxr": { source: "iana", extensions: ["jxr"] }, "image/jxra": { source: "iana", extensions: ["jxra"] }, "image/jxrs": { source: "iana", extensions: ["jxrs"] }, "image/jxs": { source: "iana", extensions: ["jxs"] }, "image/jxsc": { source: "iana", extensions: ["jxsc"] }, "image/jxsi": { source: "iana", extensions: ["jxsi"] }, "image/jxss": { source: "iana", extensions: ["jxss"] }, "image/ktx": { source: "iana", extensions: ["ktx"] }, "image/ktx2": { source: "iana", extensions: ["ktx2"] }, "image/naplps": { source: "iana" }, "image/pjpeg": { compressible: false }, "image/png": { source: "iana", compressible: false, extensions: ["png"] }, "image/prs.btif": { source: "iana", extensions: ["btif"] }, "image/prs.pti": { source: "iana", extensions: ["pti"] }, "image/pwg-raster": { source: "iana" }, "image/sgi": { source: "apache", extensions: ["sgi"] }, "image/svg+xml": { source: "iana", compressible: true, extensions: ["svg", "svgz"] }, "image/t38": { source: "iana", extensions: ["t38"] }, "image/tiff": { source: "iana", compressible: false, extensions: ["tif", "tiff"] }, "image/tiff-fx": { source: "iana", extensions: ["tfx"] }, "image/vnd.adobe.photoshop": { source: "iana", compressible: true, extensions: ["psd"] }, "image/vnd.airzip.accelerator.azv": { source: "iana", extensions: ["azv"] }, "image/vnd.cns.inf2": { source: "iana" }, "image/vnd.dece.graphic": { source: "iana", extensions: ["uvi", "uvvi", "uvg", "uvvg"] }, "image/vnd.djvu": { source: "iana", extensions: ["djvu", "djv"] }, "image/vnd.dvb.subtitle": { source: "iana", extensions: ["sub"] }, "image/vnd.dwg": { source: "iana", extensions: ["dwg"] }, "image/vnd.dxf": { source: "iana", extensions: ["dxf"] }, "image/vnd.fastbidsheet": { source: "iana", extensions: ["fbs"] }, "image/vnd.fpx": { source: "iana", extensions: ["fpx"] }, "image/vnd.fst": { source: "iana", extensions: ["fst"] }, "image/vnd.fujixerox.edmics-mmr": { source: "iana", extensions: ["mmr"] }, "image/vnd.fujixerox.edmics-rlc": { source: "iana", extensions: ["rlc"] }, "image/vnd.globalgraphics.pgb": { source: "iana" }, "image/vnd.microsoft.icon": { source: "iana", compressible: true, extensions: ["ico"] }, "image/vnd.mix": { source: "iana" }, "image/vnd.mozilla.apng": { source: "iana" }, "image/vnd.ms-dds": { compressible: true, extensions: ["dds"] }, "image/vnd.ms-modi": { source: "iana", extensions: ["mdi"] }, "image/vnd.ms-photo": { source: "apache", extensions: ["wdp"] }, "image/vnd.net-fpx": { source: "iana", extensions: ["npx"] }, "image/vnd.pco.b16": { source: "iana", extensions: ["b16"] }, "image/vnd.radiance": { source: "iana" }, "image/vnd.sealed.png": { source: "iana" }, "image/vnd.sealedmedia.softseal.gif": { source: "iana" }, "image/vnd.sealedmedia.softseal.jpg": { source: "iana" }, "image/vnd.svf": { source: "iana" }, "image/vnd.tencent.tap": { source: "iana", extensions: ["tap"] }, "image/vnd.valve.source.texture": { source: "iana", extensions: ["vtf"] }, "image/vnd.wap.wbmp": { source: "iana", extensions: ["wbmp"] }, "image/vnd.xiff": { source: "iana", extensions: ["xif"] }, "image/vnd.zbrush.pcx": { source: "iana", extensions: ["pcx"] }, "image/webp": { source: "apache", extensions: ["webp"] }, "image/wmf": { source: "iana", extensions: ["wmf"] }, "image/x-3ds": { source: "apache", extensions: ["3ds"] }, "image/x-cmu-raster": { source: "apache", extensions: ["ras"] }, "image/x-cmx": { source: "apache", extensions: ["cmx"] }, "image/x-freehand": { source: "apache", extensions: ["fh", "fhc", "fh4", "fh5", "fh7"] }, "image/x-icon": { source: "apache", compressible: true, extensions: ["ico"] }, "image/x-jng": { source: "nginx", extensions: ["jng"] }, "image/x-mrsid-image": { source: "apache", extensions: ["sid"] }, "image/x-ms-bmp": { source: "nginx", compressible: true, extensions: ["bmp"] }, "image/x-pcx": { source: "apache", extensions: ["pcx"] }, "image/x-pict": { source: "apache", extensions: ["pic", "pct"] }, "image/x-portable-anymap": { source: "apache", extensions: ["pnm"] }, "image/x-portable-bitmap": { source: "apache", extensions: ["pbm"] }, "image/x-portable-graymap": { source: "apache", extensions: ["pgm"] }, "image/x-portable-pixmap": { source: "apache", extensions: ["ppm"] }, "image/x-rgb": { source: "apache", extensions: ["rgb"] }, "image/x-tga": { source: "apache", extensions: ["tga"] }, "image/x-xbitmap": { source: "apache", extensions: ["xbm"] }, "image/x-xcf": { compressible: false }, "image/x-xpixmap": { source: "apache", extensions: ["xpm"] }, "image/x-xwindowdump": { source: "apache", extensions: ["xwd"] }, "message/cpim": { source: "iana" }, "message/delivery-status": { source: "iana" }, "message/disposition-notification": { source: "iana", extensions: ["disposition-notification"] }, "message/external-body": { source: "iana" }, "message/feedback-report": { source: "iana" }, "message/global": { source: "iana", extensions: ["u8msg"] }, "message/global-delivery-status": { source: "iana", extensions: ["u8dsn"] }, "message/global-disposition-notification": { source: "iana", extensions: ["u8mdn"] }, "message/global-headers": { source: "iana", extensions: ["u8hdr"] }, "message/http": { source: "iana", compressible: false }, "message/imdn+xml": { source: "iana", compressible: true }, "message/news": { source: "iana" }, "message/partial": { source: "iana", compressible: false }, "message/rfc822": { source: "iana", compressible: true, extensions: ["eml", "mime"] }, "message/s-http": { source: "iana" }, "message/sip": { source: "iana" }, "message/sipfrag": { source: "iana" }, "message/tracking-status": { source: "iana" }, "message/vnd.si.simp": { source: "iana" }, "message/vnd.wfa.wsc": { source: "iana", extensions: ["wsc"] }, "model/3mf": { source: "iana", extensions: ["3mf"] }, "model/e57": { source: "iana" }, "model/gltf+json": { source: "iana", compressible: true, extensions: ["gltf"] }, "model/gltf-binary": { source: "iana", compressible: true, extensions: ["glb"] }, "model/iges": { source: "iana", compressible: false, extensions: ["igs", "iges"] }, "model/mesh": { source: "iana", compressible: false, extensions: ["msh", "mesh", "silo"] }, "model/mtl": { source: "iana", extensions: ["mtl"] }, "model/obj": { source: "iana", extensions: ["obj"] }, "model/step": { source: "iana" }, "model/step+xml": { source: "iana", compressible: true, extensions: ["stpx"] }, "model/step+zip": { source: "iana", compressible: false, extensions: ["stpz"] }, "model/step-xml+zip": { source: "iana", compressible: false, extensions: ["stpxz"] }, "model/stl": { source: "iana", extensions: ["stl"] }, "model/vnd.collada+xml": { source: "iana", compressible: true, extensions: ["dae"] }, "model/vnd.dwf": { source: "iana", extensions: ["dwf"] }, "model/vnd.flatland.3dml": { source: "iana" }, "model/vnd.gdl": { source: "iana", extensions: ["gdl"] }, "model/vnd.gs-gdl": { source: "apache" }, "model/vnd.gs.gdl": { source: "iana" }, "model/vnd.gtw": { source: "iana", extensions: ["gtw"] }, "model/vnd.moml+xml": { source: "iana", compressible: true }, "model/vnd.mts": { source: "iana", extensions: ["mts"] }, "model/vnd.opengex": { source: "iana", extensions: ["ogex"] }, "model/vnd.parasolid.transmit.binary": { source: "iana", extensions: ["x_b"] }, "model/vnd.parasolid.transmit.text": { source: "iana", extensions: ["x_t"] }, "model/vnd.pytha.pyox": { source: "iana" }, "model/vnd.rosette.annotated-data-model": { source: "iana" }, "model/vnd.sap.vds": { source: "iana", extensions: ["vds"] }, "model/vnd.usdz+zip": { source: "iana", compressible: false, extensions: ["usdz"] }, "model/vnd.valve.source.compiled-map": { source: "iana", extensions: ["bsp"] }, "model/vnd.vtu": { source: "iana", extensions: ["vtu"] }, "model/vrml": { source: "iana", compressible: false, extensions: ["wrl", "vrml"] }, "model/x3d+binary": { source: "apache", compressible: false, extensions: ["x3db", "x3dbz"] }, "model/x3d+fastinfoset": { source: "iana", extensions: ["x3db"] }, "model/x3d+vrml": { source: "apache", compressible: false, extensions: ["x3dv", "x3dvz"] }, "model/x3d+xml": { source: "iana", compressible: true, extensions: ["x3d", "x3dz"] }, "model/x3d-vrml": { source: "iana", extensions: ["x3dv"] }, "multipart/alternative": { source: "iana", compressible: false }, "multipart/appledouble": { source: "iana" }, "multipart/byteranges": { source: "iana" }, "multipart/digest": { source: "iana" }, "multipart/encrypted": { source: "iana", compressible: false }, "multipart/form-data": { source: "iana", compressible: false }, "multipart/header-set": { source: "iana" }, "multipart/mixed": { source: "iana" }, "multipart/multilingual": { source: "iana" }, "multipart/parallel": { source: "iana" }, "multipart/related": { source: "iana", compressible: false }, "multipart/report": { source: "iana" }, "multipart/signed": { source: "iana", compressible: false }, "multipart/vnd.bint.med-plus": { source: "iana" }, "multipart/voice-message": { source: "iana" }, "multipart/x-mixed-replace": { source: "iana" }, "text/1d-interleaved-parityfec": { source: "iana" }, "text/cache-manifest": { source: "iana", compressible: true, extensions: ["appcache", "manifest"] }, "text/calendar": { source: "iana", extensions: ["ics", "ifb"] }, "text/calender": { compressible: true }, "text/cmd": { compressible: true }, "text/coffeescript": { extensions: ["coffee", "litcoffee"] }, "text/cql": { source: "iana" }, "text/cql-expression": { source: "iana" }, "text/cql-identifier": { source: "iana" }, "text/css": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["css"] }, "text/csv": { source: "iana", compressible: true, extensions: ["csv"] }, "text/csv-schema": { source: "iana" }, "text/directory": { source: "iana" }, "text/dns": { source: "iana" }, "text/ecmascript": { source: "iana" }, "text/encaprtp": { source: "iana" }, "text/enriched": { source: "iana" }, "text/fhirpath": { source: "iana" }, "text/flexfec": { source: "iana" }, "text/fwdred": { source: "iana" }, "text/gff3": { source: "iana" }, "text/grammar-ref-list": { source: "iana" }, "text/html": { source: "iana", compressible: true, extensions: ["html", "htm", "shtml"] }, "text/jade": { extensions: ["jade"] }, "text/javascript": { source: "iana", compressible: true }, "text/jcr-cnd": { source: "iana" }, "text/jsx": { compressible: true, extensions: ["jsx"] }, "text/less": { compressible: true, extensions: ["less"] }, "text/markdown": { source: "iana", compressible: true, extensions: ["markdown", "md"] }, "text/mathml": { source: "nginx", extensions: ["mml"] }, "text/mdx": { compressible: true, extensions: ["mdx"] }, "text/mizar": { source: "iana" }, "text/n3": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["n3"] }, "text/parameters": { source: "iana", charset: "UTF-8" }, "text/parityfec": { source: "iana" }, "text/plain": { source: "iana", compressible: true, extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"] }, "text/provenance-notation": { source: "iana", charset: "UTF-8" }, "text/prs.fallenstein.rst": { source: "iana" }, "text/prs.lines.tag": { source: "iana", extensions: ["dsc"] }, "text/prs.prop.logic": { source: "iana" }, "text/raptorfec": { source: "iana" }, "text/red": { source: "iana" }, "text/rfc822-headers": { source: "iana" }, "text/richtext": { source: "iana", compressible: true, extensions: ["rtx"] }, "text/rtf": { source: "iana", compressible: true, extensions: ["rtf"] }, "text/rtp-enc-aescm128": { source: "iana" }, "text/rtploopback": { source: "iana" }, "text/rtx": { source: "iana" }, "text/sgml": { source: "iana", extensions: ["sgml", "sgm"] }, "text/shaclc": { source: "iana" }, "text/shex": { source: "iana", extensions: ["shex"] }, "text/slim": { extensions: ["slim", "slm"] }, "text/spdx": { source: "iana", extensions: ["spdx"] }, "text/strings": { source: "iana" }, "text/stylus": { extensions: ["stylus", "styl"] }, "text/t140": { source: "iana" }, "text/tab-separated-values": { source: "iana", compressible: true, extensions: ["tsv"] }, "text/troff": { source: "iana", extensions: ["t", "tr", "roff", "man", "me", "ms"] }, "text/turtle": { source: "iana", charset: "UTF-8", extensions: ["ttl"] }, "text/ulpfec": { source: "iana" }, "text/uri-list": { source: "iana", compressible: true, extensions: ["uri", "uris", "urls"] }, "text/vcard": { source: "iana", compressible: true, extensions: ["vcard"] }, "text/vnd.a": { source: "iana" }, "text/vnd.abc": { source: "iana" }, "text/vnd.ascii-art": { source: "iana" }, "text/vnd.curl": { source: "iana", extensions: ["curl"] }, "text/vnd.curl.dcurl": { source: "apache", extensions: ["dcurl"] }, "text/vnd.curl.mcurl": { source: "apache", extensions: ["mcurl"] }, "text/vnd.curl.scurl": { source: "apache", extensions: ["scurl"] }, "text/vnd.debian.copyright": { source: "iana", charset: "UTF-8" }, "text/vnd.dmclientscript": { source: "iana" }, "text/vnd.dvb.subtitle": { source: "iana", extensions: ["sub"] }, "text/vnd.esmertec.theme-descriptor": { source: "iana", charset: "UTF-8" }, "text/vnd.familysearch.gedcom": { source: "iana", extensions: ["ged"] }, "text/vnd.ficlab.flt": { source: "iana" }, "text/vnd.fly": { source: "iana", extensions: ["fly"] }, "text/vnd.fmi.flexstor": { source: "iana", extensions: ["flx"] }, "text/vnd.gml": { source: "iana" }, "text/vnd.graphviz": { source: "iana", extensions: ["gv"] }, "text/vnd.hans": { source: "iana" }, "text/vnd.hgl": { source: "iana" }, "text/vnd.in3d.3dml": { source: "iana", extensions: ["3dml"] }, "text/vnd.in3d.spot": { source: "iana", extensions: ["spot"] }, "text/vnd.iptc.newsml": { source: "iana" }, "text/vnd.iptc.nitf": { source: "iana" }, "text/vnd.latex-z": { source: "iana" }, "text/vnd.motorola.reflex": { source: "iana" }, "text/vnd.ms-mediapackage": { source: "iana" }, "text/vnd.net2phone.commcenter.command": { source: "iana" }, "text/vnd.radisys.msml-basic-layout": { source: "iana" }, "text/vnd.senx.warpscript": { source: "iana" }, "text/vnd.si.uricatalogue": { source: "iana" }, "text/vnd.sosi": { source: "iana" }, "text/vnd.sun.j2me.app-descriptor": { source: "iana", charset: "UTF-8", extensions: ["jad"] }, "text/vnd.trolltech.linguist": { source: "iana", charset: "UTF-8" }, "text/vnd.wap.si": { source: "iana" }, "text/vnd.wap.sl": { source: "iana" }, "text/vnd.wap.wml": { source: "iana", extensions: ["wml"] }, "text/vnd.wap.wmlscript": { source: "iana", extensions: ["wmls"] }, "text/vtt": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["vtt"] }, "text/x-asm": { source: "apache", extensions: ["s", "asm"] }, "text/x-c": { source: "apache", extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"] }, "text/x-component": { source: "nginx", extensions: ["htc"] }, "text/x-fortran": { source: "apache", extensions: ["f", "for", "f77", "f90"] }, "text/x-gwt-rpc": { compressible: true }, "text/x-handlebars-template": { extensions: ["hbs"] }, "text/x-java-source": { source: "apache", extensions: ["java"] }, "text/x-jquery-tmpl": { compressible: true }, "text/x-lua": { extensions: ["lua"] }, "text/x-markdown": { compressible: true, extensions: ["mkd"] }, "text/x-nfo": { source: "apache", extensions: ["nfo"] }, "text/x-opml": { source: "apache", extensions: ["opml"] }, "text/x-org": { compressible: true, extensions: ["org"] }, "text/x-pascal": { source: "apache", extensions: ["p", "pas"] }, "text/x-processing": { compressible: true, extensions: ["pde"] }, "text/x-sass": { extensions: ["sass"] }, "text/x-scss": { extensions: ["scss"] }, "text/x-setext": { source: "apache", extensions: ["etx"] }, "text/x-sfv": { source: "apache", extensions: ["sfv"] }, "text/x-suse-ymp": { compressible: true, extensions: ["ymp"] }, "text/x-uuencode": { source: "apache", extensions: ["uu"] }, "text/x-vcalendar": { source: "apache", extensions: ["vcs"] }, "text/x-vcard": { source: "apache", extensions: ["vcf"] }, "text/xml": { source: "iana", compressible: true, extensions: ["xml"] }, "text/xml-external-parsed-entity": { source: "iana" }, "text/yaml": { compressible: true, extensions: ["yaml", "yml"] }, "video/1d-interleaved-parityfec": { source: "iana" }, "video/3gpp": { source: "iana", extensions: ["3gp", "3gpp"] }, "video/3gpp-tt": { source: "iana" }, "video/3gpp2": { source: "iana", extensions: ["3g2"] }, "video/av1": { source: "iana" }, "video/bmpeg": { source: "iana" }, "video/bt656": { source: "iana" }, "video/celb": { source: "iana" }, "video/dv": { source: "iana" }, "video/encaprtp": { source: "iana" }, "video/ffv1": { source: "iana" }, "video/flexfec": { source: "iana" }, "video/h261": { source: "iana", extensions: ["h261"] }, "video/h263": { source: "iana", extensions: ["h263"] }, "video/h263-1998": { source: "iana" }, "video/h263-2000": { source: "iana" }, "video/h264": { source: "iana", extensions: ["h264"] }, "video/h264-rcdo": { source: "iana" }, "video/h264-svc": { source: "iana" }, "video/h265": { source: "iana" }, "video/iso.segment": { source: "iana", extensions: ["m4s"] }, "video/jpeg": { source: "iana", extensions: ["jpgv"] }, "video/jpeg2000": { source: "iana" }, "video/jpm": { source: "apache", extensions: ["jpm", "jpgm"] }, "video/jxsv": { source: "iana" }, "video/mj2": { source: "iana", extensions: ["mj2", "mjp2"] }, "video/mp1s": { source: "iana" }, "video/mp2p": { source: "iana" }, "video/mp2t": { source: "iana", extensions: ["ts"] }, "video/mp4": { source: "iana", compressible: false, extensions: ["mp4", "mp4v", "mpg4"] }, "video/mp4v-es": { source: "iana" }, "video/mpeg": { source: "iana", compressible: false, extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"] }, "video/mpeg4-generic": { source: "iana" }, "video/mpv": { source: "iana" }, "video/nv": { source: "iana" }, "video/ogg": { source: "iana", compressible: false, extensions: ["ogv"] }, "video/parityfec": { source: "iana" }, "video/pointer": { source: "iana" }, "video/quicktime": { source: "iana", compressible: false, extensions: ["qt", "mov"] }, "video/raptorfec": { source: "iana" }, "video/raw": { source: "iana" }, "video/rtp-enc-aescm128": { source: "iana" }, "video/rtploopback": { source: "iana" }, "video/rtx": { source: "iana" }, "video/scip": { source: "iana" }, "video/smpte291": { source: "iana" }, "video/smpte292m": { source: "iana" }, "video/ulpfec": { source: "iana" }, "video/vc1": { source: "iana" }, "video/vc2": { source: "iana" }, "video/vnd.cctv": { source: "iana" }, "video/vnd.dece.hd": { source: "iana", extensions: ["uvh", "uvvh"] }, "video/vnd.dece.mobile": { source: "iana", extensions: ["uvm", "uvvm"] }, "video/vnd.dece.mp4": { source: "iana" }, "video/vnd.dece.pd": { source: "iana", extensions: ["uvp", "uvvp"] }, "video/vnd.dece.sd": { source: "iana", extensions: ["uvs", "uvvs"] }, "video/vnd.dece.video": { source: "iana", extensions: ["uvv", "uvvv"] }, "video/vnd.directv.mpeg": { source: "iana" }, "video/vnd.directv.mpeg-tts": { source: "iana" }, "video/vnd.dlna.mpeg-tts": { source: "iana" }, "video/vnd.dvb.file": { source: "iana", extensions: ["dvb"] }, "video/vnd.fvt": { source: "iana", extensions: ["fvt"] }, "video/vnd.hns.video": { source: "iana" }, "video/vnd.iptvforum.1dparityfec-1010": { source: "iana" }, "video/vnd.iptvforum.1dparityfec-2005": { source: "iana" }, "video/vnd.iptvforum.2dparityfec-1010": { source: "iana" }, "video/vnd.iptvforum.2dparityfec-2005": { source: "iana" }, "video/vnd.iptvforum.ttsavc": { source: "iana" }, "video/vnd.iptvforum.ttsmpeg2": { source: "iana" }, "video/vnd.motorola.video": { source: "iana" }, "video/vnd.motorola.videop": { source: "iana" }, "video/vnd.mpegurl": { source: "iana", extensions: ["mxu", "m4u"] }, "video/vnd.ms-playready.media.pyv": { source: "iana", extensions: ["pyv"] }, "video/vnd.nokia.interleaved-multimedia": { source: "iana" }, "video/vnd.nokia.mp4vr": { source: "iana" }, "video/vnd.nokia.videovoip": { source: "iana" }, "video/vnd.objectvideo": { source: "iana" }, "video/vnd.radgamettools.bink": { source: "iana" }, "video/vnd.radgamettools.smacker": { source: "iana" }, "video/vnd.sealed.mpeg1": { source: "iana" }, "video/vnd.sealed.mpeg4": { source: "iana" }, "video/vnd.sealed.swf": { source: "iana" }, "video/vnd.sealedmedia.softseal.mov": { source: "iana" }, "video/vnd.uvvu.mp4": { source: "iana", extensions: ["uvu", "uvvu"] }, "video/vnd.vivo": { source: "iana", extensions: ["viv"] }, "video/vnd.youtube.yt": { source: "iana" }, "video/vp8": { source: "iana" }, "video/vp9": { source: "iana" }, "video/webm": { source: "apache", compressible: false, extensions: ["webm"] }, "video/x-f4v": { source: "apache", extensions: ["f4v"] }, "video/x-fli": { source: "apache", extensions: ["fli"] }, "video/x-flv": { source: "apache", compressible: false, extensions: ["flv"] }, "video/x-m4v": { source: "apache", extensions: ["m4v"] }, "video/x-matroska": { source: "apache", compressible: false, extensions: ["mkv", "mk3d", "mks"] }, "video/x-mng": { source: "apache", extensions: ["mng"] }, "video/x-ms-asf": { source: "apache", extensions: ["asf", "asx"] }, "video/x-ms-vob": { source: "apache", extensions: ["vob"] }, "video/x-ms-wm": { source: "apache", extensions: ["wm"] }, "video/x-ms-wmv": { source: "apache", compressible: false, extensions: ["wmv"] }, "video/x-ms-wmx": { source: "apache", extensions: ["wmx"] }, "video/x-ms-wvx": { source: "apache", extensions: ["wvx"] }, "video/x-msvideo": { source: "apache", extensions: ["avi"] }, "video/x-sgi-movie": { source: "apache", extensions: ["movie"] }, "video/x-smv": { source: "apache", extensions: ["smv"] }, "x-conference/x-cooltalk": { source: "apache", extensions: ["ice"] }, "x-shader/x-fragment": { compressible: true }, "x-shader/x-vertex": { compressible: true } };
!function(e) {
  var n, r, a, o = ks, s = Or.extname, i = /^\s*([^;\s]*)(?:;|\s|$)/, c = /^text\//i;
  function charset(e2) {
    if (!e2 || "string" != typeof e2) return false;
    var n2 = i.exec(e2), r2 = n2 && o[n2[1].toLowerCase()];
    return r2 && r2.charset ? r2.charset : !(!n2 || !c.test(n2[1])) && "UTF-8";
  }
  e.charset = charset, e.charsets = { lookup: charset }, e.contentType = function(n2) {
    if (!n2 || "string" != typeof n2) return false;
    var r2 = -1 === n2.indexOf("/") ? e.lookup(n2) : n2;
    if (!r2) return false;
    if (-1 === r2.indexOf("charset")) {
      var a2 = e.charset(r2);
      a2 && (r2 += "; charset=" + a2.toLowerCase());
    }
    return r2;
  }, e.extension = function(n2) {
    if (!n2 || "string" != typeof n2) return false;
    var r2 = i.exec(n2), a2 = r2 && e.extensions[r2[1].toLowerCase()];
    if (!a2 || !a2.length) return false;
    return a2[0];
  }, e.extensions = /* @__PURE__ */ Object.create(null), e.lookup = function(n2) {
    if (!n2 || "string" != typeof n2) return false;
    var r2 = s("x." + n2).toLowerCase().substr(1);
    if (!r2) return false;
    return e.types[r2] || false;
  }, e.types = /* @__PURE__ */ Object.create(null), n = e.extensions, r = e.types, a = ["nginx", "apache", void 0, "iana"], Object.keys(o).forEach(function(e2) {
    var s2 = o[e2], i2 = s2.extensions;
    if (i2 && i2.length) {
      n[e2] = i2;
      for (var c2 = 0; c2 < i2.length; c2++) {
        var l = i2[c2];
        if (r[l]) {
          var u = a.indexOf(o[r[l]].source), p = a.indexOf(s2.source);
          if ("application/octet-stream" !== r[l] && (u > p || u === p && "application/" === r[l].substr(0, 12))) continue;
        }
        r[l] = e2;
      }
    }
  });
}(Ss);
var defer = function(n) {
  var r = "function" == typeof setImmediate ? setImmediate : "object" == typeof S$1 && "function" == typeof S$1.nextTick ? S$1.nextTick : null;
  r ? r(n) : setTimeout(n, 0);
}, async_1 = function(e) {
  var n = false;
  return defer(function() {
    n = true;
  }), function(r, a) {
    n ? e(r, a) : defer(function() {
      e(r, a);
    });
  };
};
var abort_1 = function(e) {
  Object.keys(e.jobs).forEach(clean.bind(e)), e.jobs = {};
};
function clean(e) {
  "function" == typeof this.jobs[e] && this.jobs[e]();
}
var ws = async_1, Cs = abort_1, iterate_1 = function(e, n, r, a) {
  var o = r.keyedList ? r.keyedList[r.index] : r.index;
  r.jobs[o] = function(e2, n2, r2, a2) {
    var o2;
    o2 = 2 == e2.length ? e2(r2, ws(a2)) : e2(r2, n2, ws(a2));
    return o2;
  }(n, o, e[o], function(e2, n2) {
    o in r.jobs && (delete r.jobs[o], e2 ? Cs(r) : r.results[o] = n2, a(e2, r.results));
  });
};
var state_1 = function(e, n) {
  var r = !Array.isArray(e), a = { index: 0, keyedList: r || n ? Object.keys(e) : null, jobs: {}, results: r ? {} : [], size: r ? Object.keys(e).length : e.length };
  n && a.keyedList.sort(r ? n : function(r2, a2) {
    return n(e[r2], e[a2]);
  });
  return a;
};
var Rs = abort_1, Ps = async_1, terminator_1 = function(e) {
  if (!Object.keys(this.jobs).length) return;
  this.index = this.size, Rs(this), Ps(e)(null, this.results);
};
var Ts = iterate_1, Es = state_1, $s = terminator_1, parallel_1 = function(e, n, r) {
  var a = Es(e);
  for (; a.index < (a.keyedList || e).length; ) Ts(e, n, a, function(e2, n2) {
    e2 ? r(e2, n2) : 0 !== Object.keys(a.jobs).length || r(null, a.results);
  }), a.index++;
  return $s.bind(a, r);
};
var Fs = { exports: {} }, _s = iterate_1, As = state_1, Os = terminator_1;
function ascending(e, n) {
  return e < n ? -1 : e > n ? 1 : 0;
}
Fs.exports = function(e, n, r, a) {
  var o = As(e, r);
  return _s(e, n, o, function iteratorHandler(r2, s) {
    r2 ? a(r2, s) : (o.index++, o.index < (o.keyedList || e).length ? _s(e, n, o, iteratorHandler) : a(null, o.results));
  }), Os.bind(o, a);
}, Fs.exports.ascending = ascending, Fs.exports.descending = function(e, n) {
  return -1 * ascending(e, n);
};
var js = Fs.exports, Is = js, serial_1 = function(e, n, r) {
  return Is(e, n, null, r);
};
var Ms, Ls, Ns = { parallel: parallel_1, serial: serial_1, serialOrdered: js }, Ds = Object, Bs = Error, zs = EvalError, qs = RangeError, Hs = ReferenceError, Us = SyntaxError;
function requireType() {
  return Ls ? Ms : (Ls = 1, Ms = TypeError);
}
var Vs = URIError, Ws = Math.abs, Ks = Math.floor, Gs = Math.max, Qs = Math.min, Js = Math.pow, Xs = Math.round, Ys = Number.isNaN || function(e) {
  return e != e;
}, Zs = Ys, ei = Object.getOwnPropertyDescriptor;
if (ei) try {
  ei([], "length");
} catch (e) {
  ei = null;
}
var ti = ei, ni = Object.defineProperty || false;
if (ni) try {
  ni({}, "a", { value: 1 });
} catch (e) {
  ni = false;
}
var ri, ai, oi, si, ii, ci, li, ui, pi = ni;
function requireShams$1() {
  return ai ? ri : (ai = 1, ri = function() {
    if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols) return false;
    if ("symbol" == typeof Symbol.iterator) return true;
    var e = {}, n = Symbol("test"), r = Object(n);
    if ("string" == typeof n) return false;
    if ("[object Symbol]" !== Object.prototype.toString.call(n)) return false;
    if ("[object Symbol]" !== Object.prototype.toString.call(r)) return false;
    for (var a in e[n] = 42, e) return false;
    if ("function" == typeof Object.keys && 0 !== Object.keys(e).length) return false;
    if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(e).length) return false;
    var o = Object.getOwnPropertySymbols(e);
    if (1 !== o.length || o[0] !== n) return false;
    if (!Object.prototype.propertyIsEnumerable.call(e, n)) return false;
    if ("function" == typeof Object.getOwnPropertyDescriptor) {
      var s = Object.getOwnPropertyDescriptor(e, n);
      if (42 !== s.value || true !== s.enumerable) return false;
    }
    return true;
  });
}
function requireHasSymbols() {
  if (si) return oi;
  si = 1;
  var e = "undefined" != typeof Symbol && Symbol, n = requireShams$1();
  return oi = function() {
    return "function" == typeof e && ("function" == typeof Symbol && ("symbol" == typeof e("foo") && ("symbol" == typeof Symbol("bar") && n())));
  };
}
function requireReflect_getPrototypeOf() {
  return ci ? ii : (ci = 1, ii = "undefined" != typeof Reflect && Reflect.getPrototypeOf || null);
}
function requireObject_getPrototypeOf() {
  return ui ? li : (ui = 1, li = Ds.getPrototypeOf || null);
}
var di, hi, mi, fi, gi, vi, yi, bi, xi, Si, ki, wi, Ci, Ri, Pi = Object.prototype.toString, Ti = Math.max, concatty = function(e, n) {
  for (var r = [], a = 0; a < e.length; a += 1) r[a] = e[a];
  for (var o = 0; o < n.length; o += 1) r[o + e.length] = n[o];
  return r;
}, implementation = function(e) {
  var n = this;
  if ("function" != typeof n || "[object Function]" !== Pi.apply(n)) throw new TypeError("Function.prototype.bind called on incompatible " + n);
  for (var r, a = function(e2, n2) {
    for (var r2 = [], a2 = n2, o2 = 0; a2 < e2.length; a2 += 1, o2 += 1) r2[o2] = e2[a2];
    return r2;
  }(arguments, 1), o = Ti(0, n.length - a.length), s = [], i = 0; i < o; i++) s[i] = "$" + i;
  if (r = Function("binder", "return function (" + function(e2, n2) {
    for (var r2 = "", a2 = 0; a2 < e2.length; a2 += 1) r2 += e2[a2], a2 + 1 < e2.length && (r2 += n2);
    return r2;
  }(s, ",") + "){ return binder.apply(this,arguments); }")(function() {
    if (this instanceof r) {
      var o2 = n.apply(this, concatty(a, arguments));
      return Object(o2) === o2 ? o2 : this;
    }
    return n.apply(e, concatty(a, arguments));
  }), n.prototype) {
    var Empty = function() {
    };
    Empty.prototype = n.prototype, r.prototype = new Empty(), Empty.prototype = null;
  }
  return r;
}, Ei = Function.prototype.bind || implementation;
function requireFunctionCall() {
  return hi ? di : (hi = 1, di = Function.prototype.call);
}
function requireFunctionApply() {
  return fi ? mi : (fi = 1, mi = Function.prototype.apply);
}
function requireReflectApply() {
  return vi ? gi : (vi = 1, gi = "undefined" != typeof Reflect && Reflect && Reflect.apply);
}
function requireActualApply() {
  if (bi) return yi;
  bi = 1;
  var e = Ei, n = requireFunctionApply(), r = requireFunctionCall();
  return yi = requireReflectApply() || e.call(r, n);
}
function requireCallBindApplyHelpers() {
  if (Si) return xi;
  Si = 1;
  var e = Ei, n = requireType(), r = requireFunctionCall(), a = requireActualApply();
  return xi = function(o) {
    if (o.length < 1 || "function" != typeof o[0]) throw new n("a function is required");
    return a(e, r, o);
  };
}
function requireGet() {
  if (wi) return ki;
  wi = 1;
  var e, n = requireCallBindApplyHelpers(), r = ti;
  try {
    e = [].__proto__ === Array.prototype;
  } catch (e2) {
    if (!e2 || "object" != typeof e2 || !("code" in e2) || "ERR_PROTO_ACCESS" !== e2.code) throw e2;
  }
  var a = !!e && r && r(Object.prototype, "__proto__"), o = Object, s = o.getPrototypeOf;
  return ki = a && "function" == typeof a.get ? n([a.get]) : "function" == typeof s && function(e2) {
    return s(null == e2 ? e2 : o(e2));
  };
}
function requireGetProto() {
  if (Ri) return Ci;
  Ri = 1;
  var e = requireReflect_getPrototypeOf(), n = requireObject_getPrototypeOf(), r = requireGet();
  return Ci = e ? function(n2) {
    return e(n2);
  } : n ? function(e2) {
    if (!e2 || "object" != typeof e2 && "function" != typeof e2) throw new TypeError("getProto: not an object");
    return n(e2);
  } : r ? function(e2) {
    return r(e2);
  } : null, Ci;
}
var $i, Fi = Function.prototype.call, _i = Object.prototype.hasOwnProperty, Ai = Ei.call(Fi, _i), Oi = Ds, ji = Bs, Ii = zs, Mi = qs, Li = Hs, Ni = Us, Di = requireType(), Bi = Vs, zi = Ws, qi = Ks, Hi = Gs, Ui = Qs, Vi = Js, Wi = Xs, sign = function(e) {
  return Zs(e) || 0 === e ? e : e < 0 ? -1 : 1;
}, Ki = Function, getEvalledConstructor = function(e) {
  try {
    return Ki('"use strict"; return (' + e + ").constructor;")();
  } catch (e2) {
  }
}, Gi = ti, Qi = pi, throwTypeError = function() {
  throw new Di();
}, Ji = Gi ? function() {
  try {
    return throwTypeError;
  } catch (e) {
    try {
      return Gi(arguments, "callee").get;
    } catch (e2) {
      return throwTypeError;
    }
  }
}() : throwTypeError, Xi = requireHasSymbols()(), Yi = requireGetProto(), Zi = requireObject_getPrototypeOf(), ec = requireReflect_getPrototypeOf(), tc = requireFunctionApply(), nc = requireFunctionCall(), rc = {}, ac = "undefined" != typeof Uint8Array && Yi ? Yi(Uint8Array) : $i, oc = { __proto__: null, "%AggregateError%": "undefined" == typeof AggregateError ? $i : AggregateError, "%Array%": Array, "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? $i : ArrayBuffer, "%ArrayIteratorPrototype%": Xi && Yi ? Yi([][Symbol.iterator]()) : $i, "%AsyncFromSyncIteratorPrototype%": $i, "%AsyncFunction%": rc, "%AsyncGenerator%": rc, "%AsyncGeneratorFunction%": rc, "%AsyncIteratorPrototype%": rc, "%Atomics%": "undefined" == typeof Atomics ? $i : Atomics, "%BigInt%": "undefined" == typeof BigInt ? $i : BigInt, "%BigInt64Array%": "undefined" == typeof BigInt64Array ? $i : BigInt64Array, "%BigUint64Array%": "undefined" == typeof BigUint64Array ? $i : BigUint64Array, "%Boolean%": Boolean, "%DataView%": "undefined" == typeof DataView ? $i : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": ji, "%eval%": eval, "%EvalError%": Ii, "%Float16Array%": "undefined" == typeof Float16Array ? $i : Float16Array, "%Float32Array%": "undefined" == typeof Float32Array ? $i : Float32Array, "%Float64Array%": "undefined" == typeof Float64Array ? $i : Float64Array, "%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? $i : FinalizationRegistry, "%Function%": Ki, "%GeneratorFunction%": rc, "%Int8Array%": "undefined" == typeof Int8Array ? $i : Int8Array, "%Int16Array%": "undefined" == typeof Int16Array ? $i : Int16Array, "%Int32Array%": "undefined" == typeof Int32Array ? $i : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": Xi && Yi ? Yi(Yi([][Symbol.iterator]())) : $i, "%JSON%": "object" == typeof JSON ? JSON : $i, "%Map%": "undefined" == typeof Map ? $i : Map, "%MapIteratorPrototype%": "undefined" != typeof Map && Xi && Yi ? Yi((/* @__PURE__ */ new Map())[Symbol.iterator]()) : $i, "%Math%": Math, "%Number%": Number, "%Object%": Oi, "%Object.getOwnPropertyDescriptor%": Gi, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": "undefined" == typeof Promise ? $i : Promise, "%Proxy%": "undefined" == typeof Proxy ? $i : Proxy, "%RangeError%": Mi, "%ReferenceError%": Li, "%Reflect%": "undefined" == typeof Reflect ? $i : Reflect, "%RegExp%": RegExp, "%Set%": "undefined" == typeof Set ? $i : Set, "%SetIteratorPrototype%": "undefined" != typeof Set && Xi && Yi ? Yi((/* @__PURE__ */ new Set())[Symbol.iterator]()) : $i, "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? $i : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": Xi && Yi ? Yi(""[Symbol.iterator]()) : $i, "%Symbol%": Xi ? Symbol : $i, "%SyntaxError%": Ni, "%ThrowTypeError%": Ji, "%TypedArray%": ac, "%TypeError%": Di, "%Uint8Array%": "undefined" == typeof Uint8Array ? $i : Uint8Array, "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? $i : Uint8ClampedArray, "%Uint16Array%": "undefined" == typeof Uint16Array ? $i : Uint16Array, "%Uint32Array%": "undefined" == typeof Uint32Array ? $i : Uint32Array, "%URIError%": Bi, "%WeakMap%": "undefined" == typeof WeakMap ? $i : WeakMap, "%WeakRef%": "undefined" == typeof WeakRef ? $i : WeakRef, "%WeakSet%": "undefined" == typeof WeakSet ? $i : WeakSet, "%Function.prototype.call%": nc, "%Function.prototype.apply%": tc, "%Object.defineProperty%": Qi, "%Object.getPrototypeOf%": Zi, "%Math.abs%": zi, "%Math.floor%": qi, "%Math.max%": Hi, "%Math.min%": Ui, "%Math.pow%": Vi, "%Math.round%": Wi, "%Math.sign%": sign, "%Reflect.getPrototypeOf%": ec };
if (Yi) try {
  null.error;
} catch (e) {
  var sc = Yi(Yi(e));
  oc["%Error.prototype%"] = sc;
}
var ic, cc, lc = function doEval(e) {
  var n;
  if ("%AsyncFunction%" === e) n = getEvalledConstructor("async function () {}");
  else if ("%GeneratorFunction%" === e) n = getEvalledConstructor("function* () {}");
  else if ("%AsyncGeneratorFunction%" === e) n = getEvalledConstructor("async function* () {}");
  else if ("%AsyncGenerator%" === e) {
    var r = doEval("%AsyncGeneratorFunction%");
    r && (n = r.prototype);
  } else if ("%AsyncIteratorPrototype%" === e) {
    var a = doEval("%AsyncGenerator%");
    a && Yi && (n = Yi(a.prototype));
  }
  return oc[e] = n, n;
}, uc = { __proto__: null, "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, pc = Ei, dc = Ai, hc = pc.call(nc, Array.prototype.concat), mc = pc.call(tc, Array.prototype.splice), fc = pc.call(nc, String.prototype.replace), gc = pc.call(nc, String.prototype.slice), vc = pc.call(nc, RegExp.prototype.exec), yc = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, bc = /\\(\\)?/g, getBaseIntrinsic = function(e, n) {
  var r, a = e;
  if (dc(uc, a) && (a = "%" + (r = uc[a])[0] + "%"), dc(oc, a)) {
    var o = oc[a];
    if (o === rc && (o = lc(a)), void 0 === o && false) ;
    return { alias: r, name: a, value: o };
  }
  throw new Ni("intrinsic " + e + " does not exist!");
};
function requireShams() {
  if (cc) return ic;
  cc = 1;
  var e = requireShams$1();
  return ic = function() {
    return e() && !!Symbol.toStringTag;
  };
}
var GetIntrinsic = function(e, n) {
  if (0 === e.length) throw new Di("intrinsic name must be a non-empty string");
  if (null === vc(/^%?[^%]*%?$/, e)) throw new Ni("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var r = function(e2) {
    var n2 = gc(e2, 0, 1), r2 = gc(e2, -1);
    if ("%" === n2 && "%" !== r2) throw new Ni("invalid intrinsic syntax, expected closing `%`");
    if ("%" === r2 && "%" !== n2) throw new Ni("invalid intrinsic syntax, expected opening `%`");
    var a2 = [];
    return fc(e2, yc, function(e3, n3, r3, o2) {
      a2[a2.length] = r3 ? fc(o2, bc, "$1") : n3 || e3;
    }), a2;
  }(e), a = r.length > 0 ? r[0] : "", o = getBaseIntrinsic("%" + a + "%"), s = o.name, i = o.value, c = false, l = o.alias;
  l && (a = l[0], mc(r, hc([0, 1], l)));
  for (var u = 1, p = true; u < r.length; u += 1) {
    var h = r[u], g = gc(h, 0, 1), v = gc(h, -1);
    if (('"' === g || "'" === g || "`" === g || '"' === v || "'" === v || "`" === v) && g !== v) throw new Ni("property names with quotes must have matching quotes");
    if ("constructor" !== h && p || (c = true), dc(oc, s = "%" + (a += "." + h) + "%")) i = oc[s];
    else if (null != i) {
      if (!(h in i)) {
        return;
      }
      if (Gi && u + 1 >= r.length) {
        var y = Gi(i, h);
        i = (p = !!y) && "get" in y && !("originalValue" in y.get) ? y.get : i[h];
      } else p = dc(i, h), i = i[h];
      p && !c && (oc[s] = i);
    }
  }
  return i;
}, xc = GetIntrinsic("%Object.defineProperty%"), Sc = requireShams()(), kc = Ai, wc = requireType(), Cc = Sc ? Symbol.toStringTag : null, Rc = Ar, Pc = Rr, Tc = Or, Ec = jr, $c = Ur, Fc = Vr.parse, _c = bs, Ac = Pr.Stream, Oc = xs, jc = Ss, Ic = Ns, setToStringTag = function(e, n) {
  var r = arguments.length > 2 && !!arguments[2] && arguments[2].force, a = arguments.length > 2 && !!arguments[2] && arguments[2].nonConfigurable;
  if (void 0 !== r && "boolean" != typeof r || void 0 !== a && "boolean" != typeof a) throw new wc("if provided, the `overrideIfSet` and `nonConfigurable` options must be booleans");
  !Cc || !r && kc(e, Cc) || (xc ? xc(e, Cc, { configurable: !a, enumerable: false, value: n, writable: false }) : e[Cc] = n);
}, Mc = Ai, populate = function(e, n) {
  return Object.keys(n).forEach(function(r) {
    e[r] = e[r] || n[r];
  }), e;
};
function FormData$1(e) {
  if (!(this instanceof FormData$1)) return new FormData$1(e);
  for (var n in this._overheadLength = 0, this._valueLength = 0, this._valuesToMeasure = [], Rc.call(this), e = e || {}) this[n] = e[n];
}
Pc.inherits(FormData$1, Rc), FormData$1.LINE_BREAK = "\r\n", FormData$1.DEFAULT_CONTENT_TYPE = "application/octet-stream", FormData$1.prototype.append = function(e, n, r) {
  "string" == typeof (r = r || {}) && (r = { filename: r });
  var a = Rc.prototype.append.bind(this);
  if ("number" != typeof n && null != n || (n = String(n)), Array.isArray(n)) this._error(new Error("Arrays are not supported."));
  else {
    var o = this._multiPartHeader(e, n, r), s = this._multiPartFooter();
    a(o), a(n), a(s), this._trackLength(o, n, r);
  }
}, FormData$1.prototype._trackLength = function(e, n, r) {
  var a = 0;
  null != r.knownLength ? a += Number(r.knownLength) : Buffer.isBuffer(n) ? a = n.length : "string" == typeof n && (a = Buffer.byteLength(n)), this._valueLength += a, this._overheadLength += Buffer.byteLength(e) + FormData$1.LINE_BREAK.length, n && (n.path || n.readable && Mc(n, "httpVersion") || n instanceof Ac) && (r.knownLength || this._valuesToMeasure.push(n));
}, FormData$1.prototype._lengthRetriever = function(e, n) {
  Mc(e, "fd") ? null != e.end && e.end != 1 / 0 && null != e.start ? n(null, e.end + 1 - (e.start ? e.start : 0)) : _c.stat(e.path, function(r, a) {
    if (r) n(r);
    else {
      var o = a.size - (e.start ? e.start : 0);
      n(null, o);
    }
  }) : Mc(e, "httpVersion") ? n(null, Number(e.headers["content-length"])) : Mc(e, "httpModule") ? (e.on("response", function(r) {
    e.pause(), n(null, Number(r.headers["content-length"]));
  }), e.resume()) : n("Unknown stream");
}, FormData$1.prototype._multiPartHeader = function(e, n, r) {
  if ("string" == typeof r.header) return r.header;
  var a, o = this._getContentDisposition(n, r), s = this._getContentType(n, r), i = "", c = { "Content-Disposition": ["form-data", 'name="' + e + '"'].concat(o || []), "Content-Type": [].concat(s || []) };
  for (var l in "object" == typeof r.header && populate(c, r.header), c) if (Mc(c, l)) {
    if (null == (a = c[l])) continue;
    Array.isArray(a) || (a = [a]), a.length && (i += l + ": " + a.join("; ") + FormData$1.LINE_BREAK);
  }
  return "--" + this.getBoundary() + FormData$1.LINE_BREAK + i + FormData$1.LINE_BREAK;
}, FormData$1.prototype._getContentDisposition = function(e, n) {
  var r;
  if ("string" == typeof n.filepath ? r = Tc.normalize(n.filepath).replace(/\\/g, "/") : n.filename || e && (e.name || e.path) ? r = Tc.basename(n.filename || e && (e.name || e.path)) : e && e.readable && Mc(e, "httpVersion") && (r = Tc.basename(e.client._httpMessage.path || "")), r) return 'filename="' + r + '"';
}, FormData$1.prototype._getContentType = function(e, n) {
  var r = n.contentType;
  return !r && e && e.name && (r = jc.lookup(e.name)), !r && e && e.path && (r = jc.lookup(e.path)), !r && e && e.readable && Mc(e, "httpVersion") && (r = e.headers["content-type"]), r || !n.filepath && !n.filename || (r = jc.lookup(n.filepath || n.filename)), !r && e && "object" == typeof e && (r = FormData$1.DEFAULT_CONTENT_TYPE), r;
}, FormData$1.prototype._multiPartFooter = function() {
  return function(e) {
    var n = FormData$1.LINE_BREAK;
    0 === this._streams.length && (n += this._lastBoundary()), e(n);
  }.bind(this);
}, FormData$1.prototype._lastBoundary = function() {
  return "--" + this.getBoundary() + "--" + FormData$1.LINE_BREAK;
}, FormData$1.prototype.getHeaders = function(e) {
  var n, r = { "content-type": "multipart/form-data; boundary=" + this.getBoundary() };
  for (n in e) Mc(e, n) && (r[n.toLowerCase()] = e[n]);
  return r;
}, FormData$1.prototype.setBoundary = function(e) {
  if ("string" != typeof e) throw new TypeError("FormData boundary must be a string");
  this._boundary = e;
}, FormData$1.prototype.getBoundary = function() {
  return this._boundary || this._generateBoundary(), this._boundary;
}, FormData$1.prototype.getBuffer = function() {
  for (var e = new Buffer.alloc(0), n = this.getBoundary(), r = 0, a = this._streams.length; r < a; r++) "function" != typeof this._streams[r] && (e = Buffer.isBuffer(this._streams[r]) ? Buffer.concat([e, this._streams[r]]) : Buffer.concat([e, Buffer.from(this._streams[r])]), "string" == typeof this._streams[r] && this._streams[r].substring(2, n.length + 2) === n || (e = Buffer.concat([e, Buffer.from(FormData$1.LINE_BREAK)])));
  return Buffer.concat([e, Buffer.from(this._lastBoundary())]);
}, FormData$1.prototype._generateBoundary = function() {
  this._boundary = "--------------------------" + Oc.randomBytes(12).toString("hex");
}, FormData$1.prototype.getLengthSync = function() {
  var e = this._overheadLength + this._valueLength;
  return this._streams.length && (e += this._lastBoundary().length), this.hasKnownLength() || this._error(new Error("Cannot calculate proper length in synchronous way.")), e;
}, FormData$1.prototype.hasKnownLength = function() {
  var e = true;
  return this._valuesToMeasure.length && (e = false), e;
}, FormData$1.prototype.getLength = function(n) {
  var r = this._overheadLength + this._valueLength;
  this._streams.length && (r += this._lastBoundary().length), this._valuesToMeasure.length ? Ic.parallel(this._valuesToMeasure, this._lengthRetriever, function(e, a) {
    e ? n(e) : (a.forEach(function(e2) {
      r += e2;
    }), n(null, r));
  }) : S$1.nextTick(n.bind(this, null, r));
}, FormData$1.prototype.submit = function(e, n) {
  var r, a, o = { method: "post" };
  return "string" == typeof e ? (e = Fc(e), a = populate({ port: e.port, path: e.pathname, host: e.hostname, protocol: e.protocol }, o)) : (a = populate(e, o)).port || (a.port = "https:" === a.protocol ? 443 : 80), a.headers = this.getHeaders(e.headers), r = "https:" === a.protocol ? $c.request(a) : Ec.request(a), this.getLength(function(e2, a2) {
    if (e2 && "Unknown stream" !== e2) this._error(e2);
    else if (a2 && r.setHeader("Content-Length", a2), this.pipe(r), n) {
      var o2, callback = function(e3, a3) {
        return r.removeListener("error", callback), r.removeListener("response", o2), n.call(this, e3, a3);
      };
      o2 = callback.bind(this, null), r.on("error", callback), r.on("response", o2);
    }
  }.bind(this)), r;
}, FormData$1.prototype._error = function(e) {
  this.error || (this.error = e, this.pause(), this.emit("error", e));
}, FormData$1.prototype.toString = function() {
  return "[object FormData]";
}, setToStringTag(FormData$1, "FormData");
const Lc = getDefaultExportFromCjs(FormData$1);
function isVisitable(e) {
  return kr.isPlainObject(e) || kr.isArray(e);
}
function removeBrackets(e) {
  return kr.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function renderKey(e, n, r) {
  return e ? e.concat(n).map(function(e2, n2) {
    return e2 = removeBrackets(e2), !r && n2 ? "[" + e2 + "]" : e2;
  }).join(r ? "." : "") : n;
}
const Nc = kr.toFlatObject(kr, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function toFormData$1(e, n, r) {
  if (!kr.isObject(e)) throw new TypeError("target must be an object");
  n = n || new (Lc || FormData)();
  const a = (r = kr.toFlatObject(r, { metaTokens: true, dots: false, indexes: false }, false, function(e2, n2) {
    return !kr.isUndefined(n2[e2]);
  })).metaTokens, o = r.visitor || defaultVisitor, s = r.dots, i = r.indexes, c = (r.Blob || "undefined" != typeof Blob && Blob) && kr.isSpecCompliantForm(n);
  if (!kr.isFunction(o)) throw new TypeError("visitor must be a function");
  function convertValue(e2) {
    if (null === e2) return "";
    if (kr.isDate(e2)) return e2.toISOString();
    if (kr.isBoolean(e2)) return e2.toString();
    if (!c && kr.isBlob(e2)) throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    return kr.isArrayBuffer(e2) || kr.isTypedArray(e2) ? c && "function" == typeof Blob ? new Blob([e2]) : Buffer.from(e2) : e2;
  }
  function defaultVisitor(e2, r2, o2) {
    let c2 = e2;
    if (e2 && !o2 && "object" == typeof e2) {
      if (kr.endsWith(r2, "{}")) r2 = a ? r2 : r2.slice(0, -2), e2 = JSON.stringify(e2);
      else if (kr.isArray(e2) && function(e3) {
        return kr.isArray(e3) && !e3.some(isVisitable);
      }(e2) || (kr.isFileList(e2) || kr.endsWith(r2, "[]")) && (c2 = kr.toArray(e2))) return r2 = removeBrackets(r2), c2.forEach(function(e3, a2) {
        !kr.isUndefined(e3) && null !== e3 && n.append(true === i ? renderKey([r2], a2, s) : null === i ? r2 : r2 + "[]", convertValue(e3));
      }), false;
    }
    return !!isVisitable(e2) || (n.append(renderKey(o2, r2, s), convertValue(e2)), false);
  }
  const l = [], u = Object.assign(Nc, { defaultVisitor, convertValue, isVisitable });
  if (!kr.isObject(e)) throw new TypeError("data must be an object");
  return function build(e2, r2) {
    if (!kr.isUndefined(e2)) {
      if (-1 !== l.indexOf(e2)) throw Error("Circular reference detected in " + r2.join("."));
      l.push(e2), kr.forEach(e2, function(e3, a2) {
        true === (!(kr.isUndefined(e3) || null === e3) && o.call(n, e3, kr.isString(a2) ? a2.trim() : a2, r2, u)) && build(e3, r2 ? r2.concat(a2) : [a2]);
      }), l.pop();
    }
  }(e), n;
}
function encode$1(e) {
  const n = { "!": "%21", "'": "%27", "(": "%28", ")": "%29", "~": "%7E", "%20": "+", "%00": "\0" };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(e2) {
    return n[e2];
  });
}
function AxiosURLSearchParams(e, n) {
  this._pairs = [], e && toFormData$1(e, this, n);
}
const Dc = AxiosURLSearchParams.prototype;
function encode(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function buildURL(e, n, r) {
  if (!n) return e;
  const a = r && r.encode || encode;
  kr.isFunction(r) && (r = { serialize: r });
  const o = r && r.serialize;
  let s;
  if (s = o ? o(n, r) : kr.isURLSearchParams(n) ? n.toString() : new AxiosURLSearchParams(n, r).toString(a), s) {
    const n2 = e.indexOf("#");
    -1 !== n2 && (e = e.slice(0, n2)), e += (-1 === e.indexOf("?") ? "?" : "&") + s;
  }
  return e;
}
Dc.append = function(e, n) {
  this._pairs.push([e, n]);
}, Dc.toString = function(e) {
  const n = e ? function(n2) {
    return e.call(this, n2, encode$1);
  } : encode$1;
  return this._pairs.map(function(e2) {
    return n(e2[0]) + "=" + n(e2[1]);
  }, "").join("&");
};
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  use(e, n, r) {
    return this.handlers.push({ fulfilled: e, rejected: n, synchronous: !!r && r.synchronous, runWhen: r ? r.runWhen : null }), this.handlers.length - 1;
  }
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(e) {
    kr.forEach(this.handlers, function(n) {
      null !== n && e(n);
    });
  }
}
const Bc = { silentJSONParsing: true, forcedJSONParsing: true, clarifyTimeoutError: false }, zc = P__default.URLSearchParams, qc = "abcdefghijklmnopqrstuvwxyz", Hc = "0123456789", Uc = { DIGIT: Hc, ALPHA: qc, ALPHA_DIGIT: qc + qc.toUpperCase() + Hc }, Vc = { isNode: true, classes: { URLSearchParams: zc, FormData: Lc, Blob: "undefined" != typeof Blob && Blob || null }, ALPHABET: Uc, generateString: (e = 16, n = Uc.ALPHA_DIGIT) => {
  let r = "";
  const { length: a } = n, o = new Uint32Array(e);
  as$1.randomFillSync(o);
  for (let s = 0; s < e; s++) r += n[o[s] % a];
  return r;
}, protocols: ["http", "https", "file", "data"] }, Wc = false, Kc = "object" == typeof navigator && navigator || void 0, Gc = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && "function" == typeof self.importScripts, Qc = { ...Object.freeze(Object.defineProperty({ __proto__: null, hasBrowserEnv: Wc, hasStandardBrowserEnv: false, hasStandardBrowserWebWorkerEnv: Gc, navigator: Kc, origin: "http://localhost" }, Symbol.toStringTag, { value: "Module" })), ...Vc };
function formDataToJSON(e) {
  function buildPath(e2, n, r, a) {
    let o = e2[a++];
    if ("__proto__" === o) return true;
    const s = Number.isFinite(+o), i = a >= e2.length;
    if (o = !o && kr.isArray(r) ? r.length : o, i) return kr.hasOwnProp(r, o) ? r[o] = [r[o], n] : r[o] = n, !s;
    r[o] && kr.isObject(r[o]) || (r[o] = []);
    return buildPath(e2, n, r[o], a) && kr.isArray(r[o]) && (r[o] = function(e3) {
      const n2 = {}, r2 = Object.keys(e3);
      let a2;
      const o2 = r2.length;
      let s2;
      for (a2 = 0; a2 < o2; a2++) s2 = r2[a2], n2[s2] = e3[s2];
      return n2;
    }(r[o])), !s;
  }
  if (kr.isFormData(e) && kr.isFunction(e.entries)) {
    const n = {};
    return kr.forEachEntry(e, (e2, r) => {
      buildPath(function(e3) {
        return kr.matchAll(/\w+|\[(\w*)]/g, e3).map((e4) => "[]" === e4[0] ? "" : e4[1] || e4[0]);
      }(e2), r, n, 0);
    }), n;
  }
  return null;
}
const Jc = { transitional: Bc, adapter: ["xhr", "http", "fetch"], transformRequest: [function(e, n) {
  const r = n.getContentType() || "", a = r.indexOf("application/json") > -1, o = kr.isObject(e);
  o && kr.isHTMLForm(e) && (e = new FormData(e));
  if (kr.isFormData(e)) return a ? JSON.stringify(formDataToJSON(e)) : e;
  if (kr.isArrayBuffer(e) || kr.isBuffer(e) || kr.isStream(e) || kr.isFile(e) || kr.isBlob(e) || kr.isReadableStream(e)) return e;
  if (kr.isArrayBufferView(e)) return e.buffer;
  if (kr.isURLSearchParams(e)) return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", false), e.toString();
  let s;
  if (o) {
    if (r.indexOf("application/x-www-form-urlencoded") > -1) return function(e2, n2) {
      return toFormData$1(e2, new Qc.classes.URLSearchParams(), { visitor: function(e3, n3, r2, a2) {
        return Qc.isNode && kr.isBuffer(e3) ? (this.append(n3, e3.toString("base64")), false) : a2.defaultVisitor.apply(this, arguments);
      }, ...n2 });
    }(e, this.formSerializer).toString();
    if ((s = kr.isFileList(e)) || r.indexOf("multipart/form-data") > -1) {
      const n2 = this.env && this.env.FormData;
      return toFormData$1(s ? { "files[]": e } : e, n2 && new n2(), this.formSerializer);
    }
  }
  return o || a ? (n.setContentType("application/json", false), function(e2, n2, r2) {
    if (kr.isString(e2)) try {
      return (n2 || JSON.parse)(e2), kr.trim(e2);
    } catch (e3) {
      if ("SyntaxError" !== e3.name) throw e3;
    }
    return (r2 || JSON.stringify)(e2);
  }(e)) : e;
}], transformResponse: [function(e) {
  const n = this.transitional || Jc.transitional, r = n && n.forcedJSONParsing, a = "json" === this.responseType;
  if (kr.isResponse(e) || kr.isReadableStream(e)) return e;
  if (e && kr.isString(e) && (r && !this.responseType || a)) {
    const r2 = !(n && n.silentJSONParsing) && a;
    try {
      return JSON.parse(e, this.parseReviver);
    } catch (e2) {
      if (r2) {
        if ("SyntaxError" === e2.name) throw AxiosError$1.from(e2, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
        throw e2;
      }
    }
  }
  return e;
}], timeout: 0, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN", maxContentLength: -1, maxBodyLength: -1, env: { FormData: Qc.classes.FormData, Blob: Qc.classes.Blob }, validateStatus: function(e) {
  return e >= 200 && e < 300;
}, headers: { common: { Accept: "application/json, text/plain, */*", "Content-Type": void 0 } } };
kr.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Jc.headers[e] = {};
});
const Xc = kr.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]), Yc = Symbol("internals");
function normalizeHeader(e) {
  return e && String(e).trim().toLowerCase();
}
function normalizeValue(e) {
  return false === e || null == e ? e : kr.isArray(e) ? e.map(normalizeValue) : String(e);
}
function matchHeaderValue(e, n, r, a, o) {
  return kr.isFunction(a) ? a.call(this, n, r) : (o && (n = r), kr.isString(n) ? kr.isString(a) ? -1 !== n.indexOf(a) : kr.isRegExp(a) ? a.test(n) : void 0 : void 0);
}
let Zc = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, n, r) {
    const a = this;
    function setHeader(e2, n2, r2) {
      const o = normalizeHeader(n2);
      if (!o) throw new Error("header name must be a non-empty string");
      const s = kr.findKey(a, o);
      (!s || void 0 === a[s] || true === r2 || void 0 === r2 && false !== a[s]) && (a[s || n2] = normalizeValue(e2));
    }
    const setHeaders = (e2, n2) => kr.forEach(e2, (e3, r2) => setHeader(e3, r2, n2));
    if (kr.isPlainObject(e) || e instanceof this.constructor) setHeaders(e, n);
    else if (kr.isString(e) && (e = e.trim()) && !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())) setHeaders(((e2) => {
      const n2 = {};
      let r2, a2, o;
      return e2 && e2.split("\n").forEach(function(e3) {
        o = e3.indexOf(":"), r2 = e3.substring(0, o).trim().toLowerCase(), a2 = e3.substring(o + 1).trim(), !r2 || n2[r2] && Xc[r2] || ("set-cookie" === r2 ? n2[r2] ? n2[r2].push(a2) : n2[r2] = [a2] : n2[r2] = n2[r2] ? n2[r2] + ", " + a2 : a2);
      }), n2;
    })(e), n);
    else if (kr.isObject(e) && kr.isIterable(e)) {
      let r2, a2, o = {};
      for (const n2 of e) {
        if (!kr.isArray(n2)) throw TypeError("Object iterator must return a key-value pair");
        o[a2 = n2[0]] = (r2 = o[a2]) ? kr.isArray(r2) ? [...r2, n2[1]] : [r2, n2[1]] : n2[1];
      }
      setHeaders(o, n);
    } else null != e && setHeader(n, e, r);
    return this;
  }
  get(e, n) {
    if (e = normalizeHeader(e)) {
      const r = kr.findKey(this, e);
      if (r) {
        const e2 = this[r];
        if (!n) return e2;
        if (true === n) return function(e3) {
          const n2 = /* @__PURE__ */ Object.create(null), r2 = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
          let a;
          for (; a = r2.exec(e3); ) n2[a[1]] = a[2];
          return n2;
        }(e2);
        if (kr.isFunction(n)) return n.call(this, e2, r);
        if (kr.isRegExp(n)) return n.exec(e2);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, n) {
    if (e = normalizeHeader(e)) {
      const r = kr.findKey(this, e);
      return !(!r || void 0 === this[r] || n && !matchHeaderValue(0, this[r], r, n));
    }
    return false;
  }
  delete(e, n) {
    const r = this;
    let a = false;
    function deleteHeader(e2) {
      if (e2 = normalizeHeader(e2)) {
        const o = kr.findKey(r, e2);
        !o || n && !matchHeaderValue(0, r[o], o, n) || (delete r[o], a = true);
      }
    }
    return kr.isArray(e) ? e.forEach(deleteHeader) : deleteHeader(e), a;
  }
  clear(e) {
    const n = Object.keys(this);
    let r = n.length, a = false;
    for (; r--; ) {
      const o = n[r];
      e && !matchHeaderValue(0, this[o], o, e, true) || (delete this[o], a = true);
    }
    return a;
  }
  normalize(e) {
    const n = this, r = {};
    return kr.forEach(this, (a, o) => {
      const s = kr.findKey(r, o);
      if (s) return n[s] = normalizeValue(a), void delete n[o];
      const i = e ? function(e2) {
        return e2.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e3, n2, r2) => n2.toUpperCase() + r2);
      }(o) : String(o).trim();
      i !== o && delete n[o], n[i] = normalizeValue(a), r[i] = true;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const n = /* @__PURE__ */ Object.create(null);
    return kr.forEach(this, (r, a) => {
      null != r && false !== r && (n[a] = e && kr.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, n]) => e + ": " + n).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...n) {
    const r = new this(e);
    return n.forEach((e2) => r.set(e2)), r;
  }
  static accessor(e) {
    const n = (this[Yc] = this[Yc] = { accessors: {} }).accessors, r = this.prototype;
    function defineAccessor(e2) {
      const a = normalizeHeader(e2);
      n[a] || (!function(e3, n2) {
        const r2 = kr.toCamelCase(" " + n2);
        ["get", "set", "has"].forEach((a2) => {
          Object.defineProperty(e3, a2 + r2, { value: function(e4, r3, o) {
            return this[a2].call(this, n2, e4, r3, o);
          }, configurable: true });
        });
      }(r, e2), n[a] = true);
    }
    return kr.isArray(e) ? e.forEach(defineAccessor) : defineAccessor(e), this;
  }
};
function transformData(e, n) {
  const r = this || Jc, a = n || r, o = Zc.from(a.headers);
  let s = a.data;
  return kr.forEach(e, function(e2) {
    s = e2.call(r, s, o.normalize(), n ? n.status : void 0);
  }), o.normalize(), s;
}
function isCancel$1(e) {
  return !(!e || !e.__CANCEL__);
}
function CanceledError$1(e, n, r) {
  AxiosError$1.call(this, null == e ? "canceled" : e, AxiosError$1.ERR_CANCELED, n, r), this.name = "CanceledError";
}
function settle(e, n, r) {
  const a = r.config.validateStatus;
  r.status && a && !a(r.status) ? n(new AxiosError$1("Request failed with status code " + r.status, [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4], r.config, r.request, r)) : e(r);
}
function buildFullPath(e, n, r) {
  let a = !function(e2) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e2);
  }(n);
  return e && (a || 0 == r) ? function(e2, n2) {
    return n2 ? e2.replace(/\/?\/$/, "") + "/" + n2.replace(/^\/+/, "") : e2;
  }(e, n) : n;
}
Zc.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]), kr.reduceDescriptors(Zc.prototype, ({ value: e }, n) => {
  let r = n[0].toUpperCase() + n.slice(1);
  return { get: () => e, set(e2) {
    this[r] = e2;
  } };
}), kr.freezeMethods(Zc), kr.inherits(CanceledError$1, AxiosError$1, { __CANCEL__: true });
var el = {}, tl = Vr.parse, nl = { ftp: 21, gopher: 70, http: 80, https: 443, ws: 80, wss: 443 }, rl = String.prototype.endsWith || function(e) {
  return e.length <= this.length && -1 !== this.indexOf(e, this.length - e.length);
};
function getEnv(n) {
  return S$1.env[n.toLowerCase()] || S$1.env[n.toUpperCase()] || "";
}
el.getProxyForUrl = function(e) {
  var n = "string" == typeof e ? tl(e) : e || {}, r = n.protocol, a = n.host, o = n.port;
  if ("string" != typeof a || !a || "string" != typeof r) return "";
  if (r = r.split(":", 1)[0], !function(e2, n2) {
    var r2 = (getEnv("npm_config_no_proxy") || getEnv("no_proxy")).toLowerCase();
    if (!r2) return true;
    if ("*" === r2) return false;
    return r2.split(/[,\s]/).every(function(r3) {
      if (!r3) return true;
      var a2 = r3.match(/^(.+):(\d+)$/), o2 = a2 ? a2[1] : r3, s2 = a2 ? parseInt(a2[2]) : 0;
      return !(!s2 || s2 === n2) || (/^[.*]/.test(o2) ? ("*" === o2.charAt(0) && (o2 = o2.slice(1)), !rl.call(e2, o2)) : e2 !== o2);
    });
  }(a = a.replace(/:\d*$/, ""), o = parseInt(o) || nl[r] || 0)) return "";
  var s = getEnv("npm_config_" + r + "_proxy") || getEnv(r + "_proxy") || getEnv("npm_config_proxy") || getEnv("all_proxy");
  return s && -1 === s.indexOf("://") && (s = r + "://" + s), s;
};
var al = { exports: {} };
const ol = getDefaultExportFromNamespaceIfNotNamed(E), noop$5 = () => {
}, debug$2 = () => console.debug, sl = noop$5, il = noop$5, cl = noop$5, ll = noop$5, ul = debug$2, pl = noop$5, dl = noop$5, hl = noop$5, ml = console.debug, fl = noop$5, gl = noop$5, vl = noop$5, yl = noop$5, bl = [], xl = {}, Sl = [], kl = [], wl = {}, Cl = noop$5;
Object.assign(debug$2, { default: debug$2, coerce: sl, disable: il, enable: cl, enabled: ll, extend: ul, humanize: pl, destroy: dl, init: hl, log: ml, formatArgs: fl, save: gl, load: vl, useColors: yl, colors: bl, inspectOpts: xl, names: Sl, skips: kl, formatters: wl, selectColors: Cl });
const Rl = getDefaultExportFromNamespaceIfNotNamed(Object.freeze(Object.defineProperty({ __proto__: null, coerce: sl, colors: bl, default: debug$2, destroy: dl, disable: il, enable: cl, enabled: ll, extend: ul, formatArgs: fl, formatters: wl, humanize: pl, init: hl, inspectOpts: xl, load: vl, log: ml, names: Sl, save: gl, selectColors: Cl, skips: kl, useColors: yl }, Symbol.toStringTag, { value: "Module" })));
var Pl, Tl, El, $l = Vr, Fl = $l.URL, _l = jr, Al = Ur, Ol = Pr.Writable, jl = ol, debug = function() {
  if (!Pl) {
    try {
      Pl = Rl("follow-redirects");
    } catch (e) {
    }
    "function" != typeof Pl && (Pl = function() {
    });
  }
  Pl.apply(null, arguments);
};
Tl = void 0 !== S$1, El = isFunction$1(Error.captureStackTrace), Tl || El || console.warn("The follow-redirects package should be excluded from browser builds.");
var Il = false;
try {
  jl(new Fl(""));
} catch (e) {
  Il = "ERR_INVALID_URL" === e.code;
}
var Ml = ["auth", "host", "hostname", "href", "path", "pathname", "port", "protocol", "query", "search", "hash"], Ll = ["abort", "aborted", "connect", "error", "socket", "timeout"], Nl = /* @__PURE__ */ Object.create(null);
Ll.forEach(function(e) {
  Nl[e] = function(n, r, a) {
    this._redirectable.emit(e, n, r, a);
  };
});
var Dl = createErrorType("ERR_INVALID_URL", "Invalid URL", TypeError), Bl = createErrorType("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed"), zl = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded", Bl), ql = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit"), Hl = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end"), Ul = Ol.prototype.destroy || noop$4;
function RedirectableRequest(e, n) {
  Ol.call(this), this._sanitizeOptions(e), this._options = e, this._ended = false, this._ending = false, this._redirectCount = 0, this._redirects = [], this._requestBodyLength = 0, this._requestBodyBuffers = [], n && this.on("response", n);
  var r = this;
  this._onNativeResponse = function(e2) {
    try {
      r._processResponse(e2);
    } catch (e3) {
      r.emit("error", e3 instanceof Bl ? e3 : new Bl({ cause: e3 }));
    }
  }, this._performRequest();
}
function wrap(e) {
  var n = { maxRedirects: 21, maxBodyLength: 10485760 }, r = {};
  return Object.keys(e).forEach(function(a) {
    var o = a + ":", s = r[o] = e[a], i = n[a] = Object.create(s);
    Object.defineProperties(i, { request: { value: function(e2, a2, s2) {
      var i2;
      return i2 = e2, Fl && i2 instanceof Fl ? e2 = spreadUrlObject(e2) : isString(e2) ? e2 = spreadUrlObject(parseUrl(e2)) : (s2 = a2, a2 = validateUrl(e2), e2 = { protocol: o }), isFunction$1(a2) && (s2 = a2, a2 = null), (a2 = Object.assign({ maxRedirects: n.maxRedirects, maxBodyLength: n.maxBodyLength }, e2, a2)).nativeProtocols = r, isString(a2.host) || isString(a2.hostname) || (a2.hostname = "::1"), jl.equal(a2.protocol, o, "protocol mismatch"), debug("options", a2), new RedirectableRequest(a2, s2);
    }, configurable: true, enumerable: true, writable: true }, get: { value: function(e2, n2, r2) {
      var a2 = i.request(e2, n2, r2);
      return a2.end(), a2;
    }, configurable: true, enumerable: true, writable: true } });
  }), n;
}
function noop$4() {
}
function parseUrl(e) {
  var n;
  if (Il) n = new Fl(e);
  else if (!isString((n = validateUrl($l.parse(e))).protocol)) throw new Dl({ input: e });
  return n;
}
function validateUrl(e) {
  if (/^\[/.test(e.hostname) && !/^\[[:0-9a-f]+\]$/i.test(e.hostname)) throw new Dl({ input: e.href || e });
  if (/^\[/.test(e.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(e.host)) throw new Dl({ input: e.href || e });
  return e;
}
function spreadUrlObject(e, n) {
  var r = n || {};
  for (var a of Ml) r[a] = e[a];
  return r.hostname.startsWith("[") && (r.hostname = r.hostname.slice(1, -1)), "" !== r.port && (r.port = Number(r.port)), r.path = r.search ? r.pathname + r.search : r.pathname, r;
}
function removeMatchingHeaders(e, n) {
  var r;
  for (var a in n) e.test(a) && (r = n[a], delete n[a]);
  return null == r ? void 0 : String(r).trim();
}
function createErrorType(e, n, r) {
  function CustomError(r2) {
    isFunction$1(Error.captureStackTrace) && Error.captureStackTrace(this, this.constructor), Object.assign(this, r2 || {}), this.code = e, this.message = this.cause ? n + ": " + this.cause.message : n;
  }
  return CustomError.prototype = new (r || Error)(), Object.defineProperties(CustomError.prototype, { constructor: { value: CustomError, enumerable: false }, name: { value: "Error [" + e + "]", enumerable: false } }), CustomError;
}
function destroyRequest(e, n) {
  for (var r of Ll) e.removeListener(r, Nl[r]);
  e.on("error", noop$4), e.destroy(n);
}
function isString(e) {
  return "string" == typeof e || e instanceof String;
}
function isFunction$1(e) {
  return "function" == typeof e;
}
RedirectableRequest.prototype = Object.create(Ol.prototype), RedirectableRequest.prototype.abort = function() {
  destroyRequest(this._currentRequest), this._currentRequest.abort(), this.emit("abort");
}, RedirectableRequest.prototype.destroy = function(e) {
  return destroyRequest(this._currentRequest, e), Ul.call(this, e), this;
}, RedirectableRequest.prototype.write = function(e, n, r) {
  if (this._ending) throw new Hl();
  if (!isString(e) && ("object" != typeof (a = e) || !("length" in a))) throw new TypeError("data should be a string, Buffer or Uint8Array");
  var a;
  isFunction$1(n) && (r = n, n = null), 0 !== e.length ? this._requestBodyLength + e.length <= this._options.maxBodyLength ? (this._requestBodyLength += e.length, this._requestBodyBuffers.push({ data: e, encoding: n }), this._currentRequest.write(e, n, r)) : (this.emit("error", new ql()), this.abort()) : r && r();
}, RedirectableRequest.prototype.end = function(e, n, r) {
  if (isFunction$1(e) ? (r = e, e = n = null) : isFunction$1(n) && (r = n, n = null), e) {
    var a = this, o = this._currentRequest;
    this.write(e, n, function() {
      a._ended = true, o.end(null, null, r);
    }), this._ending = true;
  } else this._ended = this._ending = true, this._currentRequest.end(null, null, r);
}, RedirectableRequest.prototype.setHeader = function(e, n) {
  this._options.headers[e] = n, this._currentRequest.setHeader(e, n);
}, RedirectableRequest.prototype.removeHeader = function(e) {
  delete this._options.headers[e], this._currentRequest.removeHeader(e);
}, RedirectableRequest.prototype.setTimeout = function(e, n) {
  var r = this;
  function destroyOnTimeout(n2) {
    n2.setTimeout(e), n2.removeListener("timeout", n2.destroy), n2.addListener("timeout", n2.destroy);
  }
  function startTimer(n2) {
    r._timeout && clearTimeout(r._timeout), r._timeout = setTimeout(function() {
      r.emit("timeout"), clearTimer();
    }, e), destroyOnTimeout(n2);
  }
  function clearTimer() {
    r._timeout && (clearTimeout(r._timeout), r._timeout = null), r.removeListener("abort", clearTimer), r.removeListener("error", clearTimer), r.removeListener("response", clearTimer), r.removeListener("close", clearTimer), n && r.removeListener("timeout", n), r.socket || r._currentRequest.removeListener("socket", startTimer);
  }
  return n && this.on("timeout", n), this.socket ? startTimer(this.socket) : this._currentRequest.once("socket", startTimer), this.on("socket", destroyOnTimeout), this.on("abort", clearTimer), this.on("error", clearTimer), this.on("response", clearTimer), this.on("close", clearTimer), this;
}, ["flushHeaders", "getHeader", "setNoDelay", "setSocketKeepAlive"].forEach(function(e) {
  RedirectableRequest.prototype[e] = function(n, r) {
    return this._currentRequest[e](n, r);
  };
}), ["aborted", "connection", "socket"].forEach(function(e) {
  Object.defineProperty(RedirectableRequest.prototype, e, { get: function() {
    return this._currentRequest[e];
  } });
}), RedirectableRequest.prototype._sanitizeOptions = function(e) {
  if (e.headers || (e.headers = {}), e.host && (e.hostname || (e.hostname = e.host), delete e.host), !e.pathname && e.path) {
    var n = e.path.indexOf("?");
    n < 0 ? e.pathname = e.path : (e.pathname = e.path.substring(0, n), e.search = e.path.substring(n));
  }
}, RedirectableRequest.prototype._performRequest = function() {
  var e = this._options.protocol, n = this._options.nativeProtocols[e];
  if (!n) throw new TypeError("Unsupported protocol " + e);
  if (this._options.agents) {
    var r = e.slice(0, -1);
    this._options.agent = this._options.agents[r];
  }
  var a = this._currentRequest = n.request(this._options, this._onNativeResponse);
  for (var o of (a._redirectable = this, Ll)) a.on(o, Nl[o]);
  if (this._currentUrl = /^\//.test(this._options.path) ? $l.format(this._options) : this._options.path, this._isRedirect) {
    var s = 0, i = this, c = this._requestBodyBuffers;
    !function writeNext(e2) {
      if (a === i._currentRequest) if (e2) i.emit("error", e2);
      else if (s < c.length) {
        var n2 = c[s++];
        a.finished || a.write(n2.data, n2.encoding, writeNext);
      } else i._ended && a.end();
    }();
  }
}, RedirectableRequest.prototype._processResponse = function(e) {
  var n = e.statusCode;
  this._options.trackRedirects && this._redirects.push({ url: this._currentUrl, headers: e.headers, statusCode: n });
  var r, a = e.headers.location;
  if (!a || false === this._options.followRedirects || n < 300 || n >= 400) return e.responseUrl = this._currentUrl, e.redirects = this._redirects, this.emit("response", e), void (this._requestBodyBuffers = []);
  if (destroyRequest(this._currentRequest), e.destroy(), ++this._redirectCount > this._options.maxRedirects) throw new zl();
  var o = this._options.beforeRedirect;
  o && (r = Object.assign({ Host: e.req.getHeader("host") }, this._options.headers));
  var s = this._options.method;
  ((301 === n || 302 === n) && "POST" === this._options.method || 303 === n && !/^(?:GET|HEAD)$/.test(this._options.method)) && (this._options.method = "GET", this._requestBodyBuffers = [], removeMatchingHeaders(/^content-/i, this._options.headers));
  var i, c, l = removeMatchingHeaders(/^host$/i, this._options.headers), u = parseUrl(this._currentUrl), p = l || u.host, h = /^\w+:/.test(a) ? this._currentUrl : $l.format(Object.assign(u, { host: p })), g = (i = a, c = h, Il ? new Fl(i, c) : parseUrl($l.resolve(c, i)));
  if (debug("redirecting to", g.href), this._isRedirect = true, spreadUrlObject(g, this._options), (g.protocol !== u.protocol && "https:" !== g.protocol || g.host !== p && !function(e2, n2) {
    jl(isString(e2) && isString(n2));
    var r2 = e2.length - n2.length - 1;
    return r2 > 0 && "." === e2[r2] && e2.endsWith(n2);
  }(g.host, p)) && removeMatchingHeaders(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers), isFunction$1(o)) {
    var v = { headers: e.headers, statusCode: n }, y = { url: h, method: s, headers: r };
    o(this._options, v, y), this._sanitizeOptions(this._options);
  }
  this._performRequest();
}, al.exports = wrap({ http: _l, https: Al }), al.exports.wrap = wrap;
const Vl = getDefaultExportFromCjs(al.exports), Wl = "1.12.2";
function parseProtocol(e) {
  const n = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return n && n[1] || "";
}
const Kl = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
const Gl = Symbol("internals");
class AxiosTransformStream extends b__default.Transform {
  constructor(e) {
    super({ readableHighWaterMark: (e = kr.toFlatObject(e, { maxRate: 0, chunkSize: 65536, minChunkSize: 100, timeWindow: 500, ticksRate: 2, samplesCount: 15 }, null, (e2, n2) => !kr.isUndefined(n2[e2]))).chunkSize });
    const n = this[Gl] = { timeWindow: e.timeWindow, chunkSize: e.chunkSize, maxRate: e.maxRate, minChunkSize: e.minChunkSize, bytesSeen: 0, isCaptured: false, notifiedBytesLoaded: 0, ts: Date.now(), bytes: 0, onReadCallback: null };
    this.on("newListener", (e2) => {
      "progress" === e2 && (n.isCaptured || (n.isCaptured = true));
    });
  }
  _read(e) {
    const n = this[Gl];
    return n.onReadCallback && n.onReadCallback(), super._read(e);
  }
  _transform(n, r, a) {
    const o = this[Gl], s = o.maxRate, i = this.readableHighWaterMark, c = o.timeWindow, l = s / (1e3 / c), u = false !== o.minChunkSize ? Math.max(o.minChunkSize, 0.01 * l) : 0, pushChunk = (n2, r2) => {
      const a2 = Buffer.byteLength(n2);
      o.bytesSeen += a2, o.bytes += a2, o.isCaptured && this.emit("progress", o.bytesSeen), this.push(n2) ? S$1.nextTick(r2) : o.onReadCallback = () => {
        o.onReadCallback = null, S$1.nextTick(r2);
      };
    }, transformChunk = (n2, r2) => {
      const a2 = Buffer.byteLength(n2);
      let p, h = null, g = i, y = 0;
      if (s) {
        const e = Date.now();
        (!o.ts || (y = e - o.ts) >= c) && (o.ts = e, p = l - o.bytes, o.bytes = p < 0 ? -p : 0, y = 0), p = l - o.bytes;
      }
      if (s) {
        if (p <= 0) return setTimeout(() => {
          r2(null, n2);
        }, c - y);
        p < g && (g = p);
      }
      g && a2 > g && a2 - g > u && (h = n2.subarray(g), n2 = n2.subarray(0, g)), pushChunk(n2, h ? () => {
        S$1.nextTick(r2, null, h);
      } : r2);
    };
    transformChunk(n, function transformNextChunk(e, n2) {
      if (e) return a(e);
      n2 ? transformChunk(n2, transformNextChunk) : a(null);
    });
  }
}
const { asyncIterator: Ql } = Symbol, readBlob = async function* (e) {
  e.stream ? yield* e.stream() : e.arrayBuffer ? yield await e.arrayBuffer() : e[Ql] ? yield* e[Ql]() : yield e;
}, Jl = Qc.ALPHABET.ALPHA_DIGIT + "-_", Xl = "function" == typeof TextEncoder ? new TextEncoder() : new Dn$1.TextEncoder(), Yl = "\r\n", Zl = Xl.encode(Yl);
class FormDataPart {
  constructor(e, n) {
    const { escapeName: r } = this.constructor, a = kr.isString(n);
    let o = `Content-Disposition: form-data; name="${r(e)}"${!a && n.name ? `; filename="${r(n.name)}"` : ""}${Yl}`;
    a ? n = Xl.encode(String(n).replace(/\r?\n|\r\n?/g, Yl)) : o += `Content-Type: ${n.type || "application/octet-stream"}${Yl}`, this.headers = Xl.encode(o + Yl), this.contentLength = a ? n.byteLength : n.size, this.size = this.headers.byteLength + this.contentLength + 2, this.name = e, this.value = n;
  }
  async *encode() {
    yield this.headers;
    const { value: e } = this;
    kr.isTypedArray(e) ? yield e : yield* readBlob(e), yield Zl;
  }
  static escapeName(e) {
    return String(e).replace(/[\r\n"]/g, (e2) => ({ "\r": "%0D", "\n": "%0A", '"': "%22" })[e2]);
  }
}
class ZlibHeaderTransformStream extends b__default.Transform {
  __transform(e, n, r) {
    this.push(e), r();
  }
  _transform(e, n, r) {
    if (0 !== e.length && (this._transform = this.__transform, 120 !== e[0])) {
      const e2 = Buffer.alloc(2);
      e2[0] = 120, e2[1] = 156, this.push(e2, n);
    }
    this.__transform(e, n, r);
  }
}
const callbackify = (e, n) => kr.isAsyncFn(e) ? function(...r) {
  const a = r.pop();
  e.apply(this, r).then((e2) => {
    try {
      n ? a(null, ...n(e2)) : a(null, e2);
    } catch (e3) {
      a(e3);
    }
  }, a);
} : e;
const progressEventReducer = (e, n, r = 3) => {
  let a = 0;
  const o = function(e2, n2) {
    e2 = e2 || 10;
    const r2 = new Array(e2), a2 = new Array(e2);
    let o2, s = 0, i = 0;
    return n2 = void 0 !== n2 ? n2 : 1e3, function(c) {
      const l = Date.now(), u = a2[i];
      o2 || (o2 = l), r2[s] = c, a2[s] = l;
      let p = i, h = 0;
      for (; p !== s; ) h += r2[p++], p %= e2;
      if (s = (s + 1) % e2, s === i && (i = (i + 1) % e2), l - o2 < n2) return;
      const g = u && l - u;
      return g ? Math.round(1e3 * h / g) : void 0;
    };
  }(50, 250);
  return function(e2, n2) {
    let r2, a2, o2 = 0, s = 1e3 / n2;
    const invoke = (n3, s2 = Date.now()) => {
      o2 = s2, r2 = null, a2 && (clearTimeout(a2), a2 = null), e2(...n3);
    };
    return [(...e3) => {
      const n3 = Date.now(), i = n3 - o2;
      i >= s ? invoke(e3, n3) : (r2 = e3, a2 || (a2 = setTimeout(() => {
        a2 = null, invoke(r2);
      }, s - i)));
    }, () => r2 && invoke(r2)];
  }((r2) => {
    const s = r2.loaded, i = r2.lengthComputable ? r2.total : void 0, c = s - a, l = o(c);
    a = s;
    e({ loaded: s, total: i, progress: i ? s / i : void 0, bytes: c, rate: l || void 0, estimated: l && i && s <= i ? (i - s) / l : void 0, event: r2, lengthComputable: null != i, [n ? "download" : "upload"]: true });
  }, r);
}, progressEventDecorator = (e, n) => {
  const r = null != e;
  return [(a) => n[0]({ lengthComputable: r, total: e, loaded: a }), n[1]];
}, asyncDecorator = (e) => (...n) => kr.asap(() => e(...n));
const eu = { flush: $.constants.Z_SYNC_FLUSH, finishFlush: $.constants.Z_SYNC_FLUSH }, tu = { flush: $.constants.BROTLI_OPERATION_FLUSH, finishFlush: $.constants.BROTLI_OPERATION_FLUSH }, nu = kr.isFunction($.createBrotliDecompress), { http: ru, https: au } = Vl, ou = /https:?/, su = Qc.protocols.map((e) => e + ":"), flushOnFinish = (e, [n, r]) => (e.on("end", r).on("error", r), n);
function dispatchBeforeRedirect(e, n) {
  e.beforeRedirects.proxy && e.beforeRedirects.proxy(e), e.beforeRedirects.config && e.beforeRedirects.config(e, n);
}
function setProxy(e, n, r) {
  let a = n;
  if (!a && false !== a) {
    const e2 = el.getProxyForUrl(r);
    e2 && (a = new URL(e2));
  }
  if (a) {
    if (a.username && (a.auth = (a.username || "") + ":" + (a.password || "")), a.auth) {
      (a.auth.username || a.auth.password) && (a.auth = (a.auth.username || "") + ":" + (a.auth.password || ""));
      const n3 = Buffer.from(a.auth, "utf8").toString("base64");
      e.headers["Proxy-Authorization"] = "Basic " + n3;
    }
    e.headers.host = e.hostname + (e.port ? ":" + e.port : "");
    const n2 = a.hostname || a.host;
    e.hostname = n2, e.host = n2, e.port = a.port, e.path = r, a.protocol && (e.protocol = a.protocol.includes(":") ? a.protocol : `${a.protocol}:`);
  }
  e.beforeRedirects.proxy = function(e2) {
    setProxy(e2, n, e2.href);
  };
}
const iu = void 0 !== S$1 && "process" === kr.kindOf(S$1), buildAddressEntry = (e, n) => (({ address: e2, family: n2 }) => {
  if (!kr.isString(e2)) throw TypeError("address must be a string");
  return { address: e2, family: n2 || (e2.indexOf(".") < 0 ? 6 : 4) };
})(kr.isObject(e) ? e : { address: e, family: n }), cu = iu && function(e) {
  return n = async function(n2, r, a) {
    let { data: o, lookup: s, family: i } = e;
    const { responseType: c, responseEncoding: l } = e, u = e.method.toUpperCase();
    let g, y, C = false;
    if (s) {
      const e2 = callbackify(s, (e3) => kr.isArray(e3) ? e3 : [e3]);
      s = (n3, r2, a2) => {
        e2(n3, r2, (e3, n4, o2) => {
          if (e3) return a2(e3);
          const s2 = kr.isArray(n4) ? n4.map((e4) => buildAddressEntry(e4)) : [buildAddressEntry(n4, o2)];
          r2.all ? a2(e3, s2) : a2(e3, s2[0].address, s2[0].family);
        });
      };
    }
    const R2 = new EventEmitter(), onFinished = () => {
      e.cancelToken && e.cancelToken.unsubscribe(abort2), e.signal && e.signal.removeEventListener("abort", abort2), R2.removeAllListeners();
    };
    function abort2(n3) {
      R2.emit("abort", !n3 || n3.type ? new CanceledError$1(null, e, y) : n3);
    }
    a((e2, n3) => {
      g = true, n3 && (C = true, onFinished());
    }), R2.once("abort", r), (e.cancelToken || e.signal) && (e.cancelToken && e.cancelToken.subscribe(abort2), e.signal && (e.signal.aborted ? abort2() : e.signal.addEventListener("abort", abort2)));
    const P2 = buildFullPath(e.baseURL, e.url, e.allowAbsoluteUrls), T = new URL(P2, Qc.hasBrowserEnv ? Qc.origin : void 0), E2 = T.protocol || su[0];
    if ("data:" === E2) {
      if (e.maxContentLength > -1) {
        const n3 = function(e2) {
          if (!e2 || "string" != typeof e2) return 0;
          if (!e2.startsWith("data:")) return 0;
          const n4 = e2.indexOf(",");
          if (n4 < 0) return 0;
          const r2 = e2.slice(5, n4), a3 = e2.slice(n4 + 1);
          if (/;base64/i.test(r2)) {
            let e3 = a3.length;
            const n5 = a3.length;
            for (let r4 = 0; r4 < n5; r4++) if (37 === a3.charCodeAt(r4) && r4 + 2 < n5) {
              const n6 = a3.charCodeAt(r4 + 1), o3 = a3.charCodeAt(r4 + 2);
              (n6 >= 48 && n6 <= 57 || n6 >= 65 && n6 <= 70 || n6 >= 97 && n6 <= 102) && (o3 >= 48 && o3 <= 57 || o3 >= 65 && o3 <= 70 || o3 >= 97 && o3 <= 102) && (e3 -= 2, r4 += 2);
            }
            let r3 = 0, o2 = n5 - 1;
            const tailIsPct3D = (e4) => e4 >= 2 && 37 === a3.charCodeAt(e4 - 2) && 51 === a3.charCodeAt(e4 - 1) && (68 === a3.charCodeAt(e4) || 100 === a3.charCodeAt(e4));
            o2 >= 0 && (61 === a3.charCodeAt(o2) ? (r3++, o2--) : tailIsPct3D(o2) && (r3++, o2 -= 3)), 1 === r3 && o2 >= 0 && (61 === a3.charCodeAt(o2) || tailIsPct3D(o2)) && r3++;
            const s2 = 3 * Math.floor(e3 / 4) - (r3 || 0);
            return s2 > 0 ? s2 : 0;
          }
          return Buffer.byteLength(a3, "utf8");
        }(String(e.url || P2 || ""));
        if (n3 > e.maxContentLength) return r(new AxiosError$1("maxContentLength size of " + e.maxContentLength + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, e));
      }
      let a2;
      if ("GET" !== u) return settle(n2, r, { status: 405, statusText: "method not allowed", headers: {}, config: e });
      try {
        a2 = function(e2, n3, r2) {
          const a3 = r2 && r2.Blob || Qc.classes.Blob, o2 = parseProtocol(e2);
          if (void 0 === n3 && a3 && (n3 = true), "data" === o2) {
            e2 = o2.length ? e2.slice(o2.length + 1) : e2;
            const r3 = Kl.exec(e2);
            if (!r3) throw new AxiosError$1("Invalid URL", AxiosError$1.ERR_INVALID_URL);
            const s2 = r3[1], i2 = r3[2], c2 = r3[3], l2 = Buffer.from(decodeURIComponent(c2), i2 ? "base64" : "utf8");
            if (n3) {
              if (!a3) throw new AxiosError$1("Blob is not supported", AxiosError$1.ERR_NOT_SUPPORT);
              return new a3([l2], { type: s2 });
            }
            return l2;
          }
          throw new AxiosError$1("Unsupported protocol " + o2, AxiosError$1.ERR_NOT_SUPPORT);
        }(e.url, "blob" === c, { Blob: e.env && e.env.Blob });
      } catch (n3) {
        throw AxiosError$1.from(n3, AxiosError$1.ERR_BAD_REQUEST, e);
      }
      return "text" === c ? (a2 = a2.toString(l), l && "utf8" !== l || (a2 = kr.stripBOM(a2))) : "stream" === c && (a2 = b__default.Readable.from(a2)), settle(n2, r, { data: a2, status: 200, statusText: "OK", headers: new Zc(), config: e });
    }
    if (-1 === su.indexOf(E2)) return r(new AxiosError$1("Unsupported protocol " + E2, AxiosError$1.ERR_BAD_REQUEST, e));
    const A = Zc.from(e.headers).normalize();
    A.set("User-Agent", "axios/" + Wl, false);
    const { onUploadProgress: O, onDownloadProgress: I2 } = e, N2 = e.maxRate;
    let D2, B2;
    if (kr.isSpecCompliantForm(o)) {
      const e2 = A.getContentType(/boundary=([-_\w\d]{10,70})/i);
      o = ((e3, n3, r2) => {
        const { tag: a2 = "form-data-boundary", size: o2 = 25, boundary: s2 = a2 + "-" + Qc.generateString(o2, Jl) } = r2 || {};
        if (!kr.isFormData(e3)) throw TypeError("FormData instance required");
        if (s2.length < 1 || s2.length > 70) throw Error("boundary must be 10-70 characters long");
        const i2 = Xl.encode("--" + s2 + Yl), c2 = Xl.encode("--" + s2 + "--" + Yl);
        let l2 = c2.byteLength;
        const u2 = Array.from(e3.entries()).map(([e4, n4]) => {
          const r3 = new FormDataPart(e4, n4);
          return l2 += r3.size, r3;
        });
        l2 += i2.byteLength * u2.length, l2 = kr.toFiniteNumber(l2);
        const p = { "Content-Type": `multipart/form-data; boundary=${s2}` };
        return Number.isFinite(l2) && (p["Content-Length"] = l2), n3 && n3(p), Readable.from(async function* () {
          for (const e4 of u2) yield i2, yield* e4.encode();
          yield c2;
        }());
      })(o, (e3) => {
        A.set(e3);
      }, { tag: `axios-${Wl}-boundary`, boundary: e2 && e2[1] || void 0 });
    } else if (kr.isFormData(o) && kr.isFunction(o.getHeaders)) {
      if (A.set(o.getHeaders()), !A.hasContentLength()) try {
        const e2 = await Dn$1.promisify(o.getLength).call(o);
        Number.isFinite(e2) && e2 >= 0 && A.setContentLength(e2);
      } catch (e2) {
      }
    } else if (kr.isBlob(o) || kr.isFile(o)) o.size && A.setContentType(o.type || "application/octet-stream"), A.setContentLength(o.size || 0), o = b__default.Readable.from(readBlob(o));
    else if (o && !kr.isStream(o)) {
      if (Buffer.isBuffer(o)) ;
      else if (kr.isArrayBuffer(o)) o = Buffer.from(new Uint8Array(o));
      else {
        if (!kr.isString(o)) return r(new AxiosError$1("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", AxiosError$1.ERR_BAD_REQUEST, e));
        o = Buffer.from(o, "utf-8");
      }
      if (A.setContentLength(o.length, false), e.maxBodyLength > -1 && o.length > e.maxBodyLength) return r(new AxiosError$1("Request body larger than maxBodyLength limit", AxiosError$1.ERR_BAD_REQUEST, e));
    }
    const q2 = kr.toFiniteNumber(A.getContentLength());
    let H2, V2;
    kr.isArray(N2) ? (D2 = N2[0], B2 = N2[1]) : D2 = B2 = N2, o && (O || D2) && (kr.isStream(o) || (o = b__default.Readable.from(o, { objectMode: false })), o = b__default.pipeline([o, new AxiosTransformStream({ maxRate: kr.toFiniteNumber(D2) })], kr.noop), O && o.on("progress", flushOnFinish(o, progressEventDecorator(q2, progressEventReducer(asyncDecorator(O), false, 3))))), e.auth && (H2 = (e.auth.username || "") + ":" + (e.auth.password || "")), !H2 && T.username && (H2 = T.username + ":" + T.password), H2 && A.delete("authorization");
    try {
      V2 = buildURL(T.pathname + T.search, e.params, e.paramsSerializer).replace(/^\?/, "");
    } catch (n3) {
      const a2 = new Error(n3.message);
      return a2.config = e, a2.url = e.url, a2.exists = true, r(a2);
    }
    A.set("Accept-Encoding", "gzip, compress, deflate" + (nu ? ", br" : ""), false);
    const W2 = { path: V2, method: u, headers: A.toJSON(), agents: { http: e.httpAgent, https: e.httpsAgent }, auth: H2, protocol: E2, family: i, beforeRedirect: dispatchBeforeRedirect, beforeRedirects: {} };
    let G2;
    !kr.isUndefined(s) && (W2.lookup = s), e.socketPath ? W2.socketPath = e.socketPath : (W2.hostname = T.hostname.startsWith("[") ? T.hostname.slice(1, -1) : T.hostname, W2.port = T.port, setProxy(W2, e.proxy, E2 + "//" + T.hostname + (T.port ? ":" + T.port : "") + W2.path));
    const Q2 = ou.test(W2.protocol);
    if (W2.agent = Q2 ? e.httpsAgent : e.httpAgent, e.transport ? G2 = e.transport : 0 === e.maxRedirects ? G2 = Q2 ? qr : nn$1 : (e.maxRedirects && (W2.maxRedirects = e.maxRedirects), e.beforeRedirect && (W2.beforeRedirects.config = e.beforeRedirect), G2 = Q2 ? au : ru), e.maxBodyLength > -1 ? W2.maxBodyLength = e.maxBodyLength : W2.maxBodyLength = 1 / 0, e.insecureHTTPParser && (W2.insecureHTTPParser = e.insecureHTTPParser), y = G2.request(W2, function(a2) {
      if (y.destroyed) return;
      const o2 = [a2], s2 = +a2.headers["content-length"];
      if (I2 || B2) {
        const e2 = new AxiosTransformStream({ maxRate: kr.toFiniteNumber(B2) });
        I2 && e2.on("progress", flushOnFinish(e2, progressEventDecorator(s2, progressEventReducer(asyncDecorator(I2), true, 3)))), o2.push(e2);
      }
      let i2 = a2;
      const p = a2.req || y;
      if (false !== e.decompress && a2.headers["content-encoding"]) switch ("HEAD" !== u && 204 !== a2.statusCode || delete a2.headers["content-encoding"], (a2.headers["content-encoding"] || "").toLowerCase()) {
        case "gzip":
        case "x-gzip":
        case "compress":
        case "x-compress":
          o2.push($.createUnzip(eu)), delete a2.headers["content-encoding"];
          break;
        case "deflate":
          o2.push(new ZlibHeaderTransformStream()), o2.push($.createUnzip(eu)), delete a2.headers["content-encoding"];
          break;
        case "br":
          nu && (o2.push($.createBrotliDecompress(tu)), delete a2.headers["content-encoding"]);
      }
      i2 = o2.length > 1 ? b__default.pipeline(o2, kr.noop) : o2[0];
      const h = b__default.finished(i2, () => {
        h(), onFinished();
      }), g2 = { status: a2.statusCode, statusText: a2.statusMessage, headers: new Zc(a2.headers), config: e, request: p };
      if ("stream" === c) g2.data = i2, settle(n2, r, g2);
      else {
        const a3 = [];
        let o3 = 0;
        i2.on("data", function(n3) {
          a3.push(n3), o3 += n3.length, e.maxContentLength > -1 && o3 > e.maxContentLength && (C = true, i2.destroy(), r(new AxiosError$1("maxContentLength size of " + e.maxContentLength + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, e, p)));
        }), i2.on("aborted", function() {
          if (C) return;
          const n3 = new AxiosError$1("stream has been aborted", AxiosError$1.ERR_BAD_RESPONSE, e, p);
          i2.destroy(n3), r(n3);
        }), i2.on("error", function(n3) {
          y.destroyed || r(AxiosError$1.from(n3, null, e, p));
        }), i2.on("end", function() {
          try {
            let e2 = 1 === a3.length ? a3[0] : Buffer.concat(a3);
            "arraybuffer" !== c && (e2 = e2.toString(l), l && "utf8" !== l || (e2 = kr.stripBOM(e2))), g2.data = e2;
          } catch (n3) {
            return r(AxiosError$1.from(n3, null, e, g2.request, g2));
          }
          settle(n2, r, g2);
        });
      }
      R2.once("abort", (e2) => {
        i2.destroyed || (i2.emit("error", e2), i2.destroy());
      });
    }), R2.once("abort", (e2) => {
      r(e2), y.destroy(e2);
    }), y.on("error", function(n3) {
      r(AxiosError$1.from(n3, null, e, y));
    }), y.on("socket", function(e2) {
      e2.setKeepAlive(true, 6e4);
    }), e.timeout) {
      const n3 = parseInt(e.timeout, 10);
      if (Number.isNaN(n3)) return void r(new AxiosError$1("error trying to parse `config.timeout` to int", AxiosError$1.ERR_BAD_OPTION_VALUE, e, y));
      y.setTimeout(n3, function() {
        if (g) return;
        let n4 = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
        const a2 = e.transitional || Bc;
        e.timeoutErrorMessage && (n4 = e.timeoutErrorMessage), r(new AxiosError$1(n4, a2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED, e, y)), abort2();
      });
    }
    if (kr.isStream(o)) {
      let n3 = false, r2 = false;
      o.on("end", () => {
        n3 = true;
      }), o.once("error", (e2) => {
        r2 = true, y.destroy(e2);
      }), o.on("close", () => {
        n3 || r2 || abort2(new CanceledError$1("Request stream has been aborted", e, y));
      }), o.pipe(y);
    } else y.end(o);
  }, new Promise((e2, r) => {
    let a, o;
    const done = (e3, n2) => {
      o || (o = true, a && a(e3, n2));
    }, _reject = (e3) => {
      done(e3, true), r(e3);
    };
    n((n2) => {
      done(n2), e2(n2);
    }, _reject, (e3) => a = e3).catch(_reject);
  });
  var n;
}, lu = Qc.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, n) => (r) => (r = new URL(r, Qc.origin), e.protocol === r.protocol && e.host === r.host && (n || e.port === r.port)))(new URL(Qc.origin), Qc.navigator && /(msie|trident)/i.test(Qc.navigator.userAgent)) : () => true, uu = Qc.hasStandardBrowserEnv ? { write(e, n, r, a, o, s) {
  const i = [e + "=" + encodeURIComponent(n)];
  kr.isNumber(r) && i.push("expires=" + new Date(r).toGMTString()), kr.isString(a) && i.push("path=" + a), kr.isString(o) && i.push("domain=" + o), true === s && i.push("secure"), document.cookie = i.join("; ");
}, read(e) {
  const n = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
  return n ? decodeURIComponent(n[3]) : null;
}, remove(e) {
  this.write(e, "", Date.now() - 864e5);
} } : { write() {
}, read: () => null, remove() {
} }, headersToObject = (e) => e instanceof Zc ? { ...e } : e;
function mergeConfig$1(e, n) {
  n = n || {};
  const r = {};
  function getMergedValue(e2, n2, r2, a2) {
    return kr.isPlainObject(e2) && kr.isPlainObject(n2) ? kr.merge.call({ caseless: a2 }, e2, n2) : kr.isPlainObject(n2) ? kr.merge({}, n2) : kr.isArray(n2) ? n2.slice() : n2;
  }
  function mergeDeepProperties(e2, n2, r2, a2) {
    return kr.isUndefined(n2) ? kr.isUndefined(e2) ? void 0 : getMergedValue(void 0, e2, 0, a2) : getMergedValue(e2, n2, 0, a2);
  }
  function valueFromConfig2(e2, n2) {
    if (!kr.isUndefined(n2)) return getMergedValue(void 0, n2);
  }
  function defaultToConfig2(e2, n2) {
    return kr.isUndefined(n2) ? kr.isUndefined(e2) ? void 0 : getMergedValue(void 0, e2) : getMergedValue(void 0, n2);
  }
  function mergeDirectKeys(r2, a2, o) {
    return o in n ? getMergedValue(r2, a2) : o in e ? getMergedValue(void 0, r2) : void 0;
  }
  const a = { url: valueFromConfig2, method: valueFromConfig2, data: valueFromConfig2, baseURL: defaultToConfig2, transformRequest: defaultToConfig2, transformResponse: defaultToConfig2, paramsSerializer: defaultToConfig2, timeout: defaultToConfig2, timeoutMessage: defaultToConfig2, withCredentials: defaultToConfig2, withXSRFToken: defaultToConfig2, adapter: defaultToConfig2, responseType: defaultToConfig2, xsrfCookieName: defaultToConfig2, xsrfHeaderName: defaultToConfig2, onUploadProgress: defaultToConfig2, onDownloadProgress: defaultToConfig2, decompress: defaultToConfig2, maxContentLength: defaultToConfig2, maxBodyLength: defaultToConfig2, beforeRedirect: defaultToConfig2, transport: defaultToConfig2, httpAgent: defaultToConfig2, httpsAgent: defaultToConfig2, cancelToken: defaultToConfig2, socketPath: defaultToConfig2, responseEncoding: defaultToConfig2, validateStatus: mergeDirectKeys, headers: (e2, n2, r2) => mergeDeepProperties(headersToObject(e2), headersToObject(n2), 0, true) };
  return kr.forEach(Object.keys({ ...e, ...n }), function(o) {
    const s = a[o] || mergeDeepProperties, i = s(e[o], n[o], o);
    kr.isUndefined(i) && s !== mergeDirectKeys || (r[o] = i);
  }), r;
}
const resolveConfig = (e) => {
  const n = mergeConfig$1({}, e);
  let { data: r, withXSRFToken: a, xsrfHeaderName: o, xsrfCookieName: s, headers: i, auth: c } = n;
  if (n.headers = i = Zc.from(i), n.url = buildURL(buildFullPath(n.baseURL, n.url, n.allowAbsoluteUrls), e.params, e.paramsSerializer), c && i.set("Authorization", "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))), kr.isFormData(r)) {
    if (Qc.hasStandardBrowserEnv || Qc.hasStandardBrowserWebWorkerEnv) i.setContentType(void 0);
    else if (kr.isFunction(r.getHeaders)) {
      const e2 = r.getHeaders(), n2 = ["content-type", "content-length"];
      Object.entries(e2).forEach(([e3, r2]) => {
        n2.includes(e3.toLowerCase()) && i.set(e3, r2);
      });
    }
  }
  if (Qc.hasStandardBrowserEnv && (a && kr.isFunction(a) && (a = a(n)), a || false !== a && lu(n.url))) {
    const e2 = o && s && uu.read(s);
    e2 && i.set(o, e2);
  }
  return n;
}, pu = "undefined" != typeof XMLHttpRequest && function(e) {
  return new Promise(function(n, r) {
    const a = resolveConfig(e);
    let o = a.data;
    const s = Zc.from(a.headers).normalize();
    let i, c, l, u, p, { responseType: h, onUploadProgress: g, onDownloadProgress: v } = a;
    function done() {
      u && u(), p && p(), a.cancelToken && a.cancelToken.unsubscribe(i), a.signal && a.signal.removeEventListener("abort", i);
    }
    let y = new XMLHttpRequest();
    function onloadend() {
      if (!y) return;
      const a2 = Zc.from("getAllResponseHeaders" in y && y.getAllResponseHeaders());
      settle(function(e2) {
        n(e2), done();
      }, function(e2) {
        r(e2), done();
      }, { data: h && "text" !== h && "json" !== h ? y.response : y.responseText, status: y.status, statusText: y.statusText, headers: a2, config: e, request: y }), y = null;
    }
    y.open(a.method.toUpperCase(), a.url, true), y.timeout = a.timeout, "onloadend" in y ? y.onloadend = onloadend : y.onreadystatechange = function() {
      y && 4 === y.readyState && (0 !== y.status || y.responseURL && 0 === y.responseURL.indexOf("file:")) && setTimeout(onloadend);
    }, y.onabort = function() {
      y && (r(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, e, y)), y = null);
    }, y.onerror = function(n2) {
      const a2 = new AxiosError$1(n2 && n2.message ? n2.message : "Network Error", AxiosError$1.ERR_NETWORK, e, y);
      a2.event = n2 || null, r(a2), y = null;
    }, y.ontimeout = function() {
      let n2 = a.timeout ? "timeout of " + a.timeout + "ms exceeded" : "timeout exceeded";
      const o2 = a.transitional || Bc;
      a.timeoutErrorMessage && (n2 = a.timeoutErrorMessage), r(new AxiosError$1(n2, o2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED, e, y)), y = null;
    }, void 0 === o && s.setContentType(null), "setRequestHeader" in y && kr.forEach(s.toJSON(), function(e2, n2) {
      y.setRequestHeader(n2, e2);
    }), kr.isUndefined(a.withCredentials) || (y.withCredentials = !!a.withCredentials), h && "json" !== h && (y.responseType = a.responseType), v && ([l, p] = progressEventReducer(v, true), y.addEventListener("progress", l)), g && y.upload && ([c, u] = progressEventReducer(g), y.upload.addEventListener("progress", c), y.upload.addEventListener("loadend", u)), (a.cancelToken || a.signal) && (i = (n2) => {
      y && (r(!n2 || n2.type ? new CanceledError$1(null, e, y) : n2), y.abort(), y = null);
    }, a.cancelToken && a.cancelToken.subscribe(i), a.signal && (a.signal.aborted ? i() : a.signal.addEventListener("abort", i)));
    const b2 = parseProtocol(a.url);
    b2 && -1 === Qc.protocols.indexOf(b2) ? r(new AxiosError$1("Unsupported protocol " + b2 + ":", AxiosError$1.ERR_BAD_REQUEST, e)) : y.send(o || null);
  });
}, composeSignals = (e, n) => {
  const { length: r } = e = e ? e.filter(Boolean) : [];
  if (n || r) {
    let r2, a = new AbortController();
    const onabort = function(e2) {
      if (!r2) {
        r2 = true, unsubscribe();
        const n2 = e2 instanceof Error ? e2 : this.reason;
        a.abort(n2 instanceof AxiosError$1 ? n2 : new CanceledError$1(n2 instanceof Error ? n2.message : n2));
      }
    };
    let o = n && setTimeout(() => {
      o = null, onabort(new AxiosError$1(`timeout ${n} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, n);
    const unsubscribe = () => {
      e && (o && clearTimeout(o), o = null, e.forEach((e2) => {
        e2.unsubscribe ? e2.unsubscribe(onabort) : e2.removeEventListener("abort", onabort);
      }), e = null);
    };
    e.forEach((e2) => e2.addEventListener("abort", onabort));
    const { signal: s } = a;
    return s.unsubscribe = () => kr.asap(unsubscribe), s;
  }
}, streamChunk = function* (e, n) {
  let r = e.byteLength;
  if (r < n) return void (yield e);
  let a, o = 0;
  for (; o < r; ) a = o + n, yield e.slice(o, a), o = a;
}, readStream$1 = async function* (e) {
  if (e[Symbol.asyncIterator]) return void (yield* e);
  const n = e.getReader();
  try {
    for (; ; ) {
      const { done: e2, value: r } = await n.read();
      if (e2) break;
      yield r;
    }
  } finally {
    await n.cancel();
  }
}, trackStream = (e, n, r, a) => {
  const o = async function* (e2, n2) {
    for await (const r2 of readStream$1(e2)) yield* streamChunk(r2, n2);
  }(e, n);
  let s, i = 0, _onFinish = (e2) => {
    s || (s = true, a && a(e2));
  };
  return new ReadableStream({ async pull(e2) {
    try {
      const { done: n2, value: a2 } = await o.next();
      if (n2) return _onFinish(), void e2.close();
      let s2 = a2.byteLength;
      if (r) {
        let e3 = i += s2;
        r(e3);
      }
      e2.enqueue(new Uint8Array(a2));
    } catch (e3) {
      throw _onFinish(e3), e3;
    }
  }, cancel: (e2) => (_onFinish(e2), o.return()) }, { highWaterMark: 2 });
}, { isFunction: du } = kr, hu = (({ Request: e, Response: n }) => ({ Request: e, Response: n }))(kr.global), { ReadableStream: mu, TextEncoder: fu } = kr.global, test = (e, ...n) => {
  try {
    return !!e(...n);
  } catch (e2) {
    return false;
  }
}, factory = (e) => {
  e = kr.merge.call({ skipUndefined: true }, hu, e);
  const { fetch: n, Request: r, Response: a } = e, o = n ? du(n) : "function" == typeof fetch, s = du(r), i = du(a);
  if (!o) return false;
  const c = o && du(mu), l = o && ("function" == typeof fu ? (u = new fu(), (e2) => u.encode(e2)) : async (e2) => new Uint8Array(await new r(e2).arrayBuffer()));
  var u;
  const p = s && c && test(() => {
    let e2 = false;
    const n2 = new r(Qc.origin, { body: new mu(), method: "POST", get duplex() {
      return e2 = true, "half";
    } }).headers.has("Content-Type");
    return e2 && !n2;
  }), h = i && c && test(() => kr.isReadableStream(new a("").body)), g = { stream: h && ((e2) => e2.body) };
  o && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((e2) => {
    !g[e2] && (g[e2] = (n2, r2) => {
      let a2 = n2 && n2[e2];
      if (a2) return a2.call(n2);
      throw new AxiosError$1(`Response type '${e2}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, r2);
    });
  });
  const resolveBodyLength = async (e2, n2) => {
    const a2 = kr.toFiniteNumber(e2.getContentLength());
    return null == a2 ? (async (e3) => {
      if (null == e3) return 0;
      if (kr.isBlob(e3)) return e3.size;
      if (kr.isSpecCompliantForm(e3)) {
        const n3 = new r(Qc.origin, { method: "POST", body: e3 });
        return (await n3.arrayBuffer()).byteLength;
      }
      return kr.isArrayBufferView(e3) || kr.isArrayBuffer(e3) ? e3.byteLength : (kr.isURLSearchParams(e3) && (e3 += ""), kr.isString(e3) ? (await l(e3)).byteLength : void 0);
    })(n2) : a2;
  };
  return async (e2) => {
    let { url: o2, method: i2, data: c2, signal: l2, cancelToken: u2, timeout: v, onDownloadProgress: y, onUploadProgress: b2, responseType: k, headers: C, withCredentials: R2 = "same-origin", fetchOptions: P2 } = resolveConfig(e2), T = n || fetch;
    k = k ? (k + "").toLowerCase() : "text";
    let E2 = composeSignals([l2, u2 && u2.toAbortSignal()], v), $2 = null;
    const F = E2 && E2.unsubscribe && (() => {
      E2.unsubscribe();
    });
    let A;
    try {
      if (b2 && p && "get" !== i2 && "head" !== i2 && 0 !== (A = await resolveBodyLength(C, c2))) {
        let e3, n3 = new r(o2, { method: "POST", body: c2, duplex: "half" });
        if (kr.isFormData(c2) && (e3 = n3.headers.get("content-type")) && C.setContentType(e3), n3.body) {
          const [e4, r2] = progressEventDecorator(A, progressEventReducer(asyncDecorator(b2)));
          c2 = trackStream(n3.body, 65536, e4, r2);
        }
      }
      kr.isString(R2) || (R2 = R2 ? "include" : "omit");
      const n2 = s && "credentials" in r.prototype, l3 = { ...P2, signal: E2, method: i2.toUpperCase(), headers: C.normalize().toJSON(), body: c2, duplex: "half", credentials: n2 ? R2 : void 0 };
      $2 = s && new r(o2, l3);
      let u3 = await (s ? T($2, P2) : T(o2, l3));
      const v2 = h && ("stream" === k || "response" === k);
      if (h && (y || v2 && F)) {
        const e3 = {};
        ["status", "statusText", "headers"].forEach((n4) => {
          e3[n4] = u3[n4];
        });
        const n3 = kr.toFiniteNumber(u3.headers.get("content-length")), [r2, o3] = y && progressEventDecorator(n3, progressEventReducer(asyncDecorator(y), true)) || [];
        u3 = new a(trackStream(u3.body, 65536, r2, () => {
          o3 && o3(), F && F();
        }), e3);
      }
      k = k || "text";
      let O = await g[kr.findKey(g, k) || "text"](u3, e2);
      return !v2 && F && F(), await new Promise((n3, r2) => {
        settle(n3, r2, { data: O, headers: Zc.from(u3.headers), status: u3.status, statusText: u3.statusText, config: e2, request: $2 });
      });
    } catch (n2) {
      if (F && F(), n2 && "TypeError" === n2.name && /Load failed|fetch/i.test(n2.message)) throw Object.assign(new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, e2, $2), { cause: n2.cause || n2 });
      throw AxiosError$1.from(n2, n2 && n2.code, e2, $2);
    }
  };
}, gu = /* @__PURE__ */ new Map(), getFetch = (e) => {
  let n = e ? e.env : {};
  const { fetch: r, Request: a, Response: o } = n, s = [a, o, r];
  let i, c, l = s.length, u = gu;
  for (; l--; ) i = s[l], c = u.get(i), void 0 === c && u.set(i, c = l ? /* @__PURE__ */ new Map() : factory(n)), u = c;
  return c;
};
getFetch();
const vu = { http: cu, xhr: pu, fetch: { get: getFetch } };
kr.forEach(vu, (e, n) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: n });
    } catch (e2) {
    }
    Object.defineProperty(e, "adapterName", { value: n });
  }
});
const renderReason = (e) => `- ${e}`, isResolvedHandle = (e) => kr.isFunction(e) || null === e || false === e, adapters_getAdapter = (e, n) => {
  e = kr.isArray(e) ? e : [e];
  const { length: r } = e;
  let a, o;
  const s = {};
  for (let i = 0; i < r; i++) {
    let r2;
    if (a = e[i], o = a, !isResolvedHandle(a) && (o = vu[(r2 = String(a)).toLowerCase()], void 0 === o)) throw new AxiosError$1(`Unknown adapter '${r2}'`);
    if (o && (kr.isFunction(o) || (o = o.get(n)))) break;
    s[r2 || "#" + i] = o;
  }
  if (!o) {
    const e2 = Object.entries(s).map(([e3, n2]) => `adapter ${e3} ` + (false === n2 ? "is not supported by the environment" : "is not available in the build"));
    throw new AxiosError$1("There is no suitable adapter to dispatch the request " + (r ? e2.length > 1 ? "since :\n" + e2.map(renderReason).join("\n") : " " + renderReason(e2[0]) : "as no adapter specified"), "ERR_NOT_SUPPORT");
  }
  return o;
};
function throwIfCancellationRequested(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new CanceledError$1(null, e);
}
function dispatchRequest(e) {
  throwIfCancellationRequested(e), e.headers = Zc.from(e.headers), e.data = transformData.call(e, e.transformRequest), -1 !== ["post", "put", "patch"].indexOf(e.method) && e.headers.setContentType("application/x-www-form-urlencoded", false);
  return adapters_getAdapter(e.adapter || Jc.adapter, e)(e).then(function(n) {
    return throwIfCancellationRequested(e), n.data = transformData.call(e, e.transformResponse, n), n.headers = Zc.from(n.headers), n;
  }, function(n) {
    return isCancel$1(n) || (throwIfCancellationRequested(e), n && n.response && (n.response.data = transformData.call(e, e.transformResponse, n.response), n.response.headers = Zc.from(n.response.headers))), Promise.reject(n);
  });
}
const yu = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, n) => {
  yu[e] = function(r) {
    return typeof r === e || "a" + (n < 1 ? "n " : " ") + e;
  };
});
const bu = {};
yu.transitional = function(e, n, r) {
  function formatMessage(e2, n2) {
    return "[Axios v" + Wl + "] Transitional option '" + e2 + "'" + n2 + (r ? ". " + r : "");
  }
  return (r2, a, o) => {
    if (false === e) throw new AxiosError$1(formatMessage(a, " has been removed" + (n ? " in " + n : "")), AxiosError$1.ERR_DEPRECATED);
    return n && !bu[a] && (bu[a] = true, console.warn(formatMessage(a, " has been deprecated since v" + n + " and will be removed in the near future"))), !e || e(r2, a, o);
  };
}, yu.spelling = function(e) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${e}`), true);
};
const xu = { assertOptions: function(e, n, r) {
  if ("object" != typeof e) throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  const a = Object.keys(e);
  let o = a.length;
  for (; o-- > 0; ) {
    const s = a[o], i = n[s];
    if (i) {
      const n2 = e[s], r2 = void 0 === n2 || i(n2, s, e);
      if (true !== r2) throw new AxiosError$1("option " + s + " must be " + r2, AxiosError$1.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (true !== r) throw new AxiosError$1("Unknown option " + s, AxiosError$1.ERR_BAD_OPTION);
  }
}, validators: yu }, Su = xu.validators;
let ku = class {
  constructor(e) {
    this.defaults = e || {}, this.interceptors = { request: new InterceptorManager(), response: new InterceptorManager() };
  }
  async request(e, n) {
    try {
      return await this._request(e, n);
    } catch (e2) {
      if (e2 instanceof Error) {
        let n2 = {};
        Error.captureStackTrace ? Error.captureStackTrace(n2) : n2 = new Error();
        const r = n2.stack ? n2.stack.replace(/^.+\n/, "") : "";
        try {
          e2.stack ? r && !String(e2.stack).endsWith(r.replace(/^.+\n.+\n/, "")) && (e2.stack += "\n" + r) : e2.stack = r;
        } catch (e3) {
        }
      }
      throw e2;
    }
  }
  _request(e, n) {
    "string" == typeof e ? (n = n || {}).url = e : n = e || {}, n = mergeConfig$1(this.defaults, n);
    const { transitional: r, paramsSerializer: a, headers: o } = n;
    void 0 !== r && xu.assertOptions(r, { silentJSONParsing: Su.transitional(Su.boolean), forcedJSONParsing: Su.transitional(Su.boolean), clarifyTimeoutError: Su.transitional(Su.boolean) }, false), null != a && (kr.isFunction(a) ? n.paramsSerializer = { serialize: a } : xu.assertOptions(a, { encode: Su.function, serialize: Su.function }, true)), void 0 !== n.allowAbsoluteUrls || (void 0 !== this.defaults.allowAbsoluteUrls ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = true), xu.assertOptions(n, { baseUrl: Su.spelling("baseURL"), withXsrfToken: Su.spelling("withXSRFToken") }, true), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let s = o && kr.merge(o.common, o[n.method]);
    o && kr.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (e2) => {
      delete o[e2];
    }), n.headers = Zc.concat(s, o);
    const i = [];
    let c = true;
    this.interceptors.request.forEach(function(e2) {
      "function" == typeof e2.runWhen && false === e2.runWhen(n) || (c = c && e2.synchronous, i.unshift(e2.fulfilled, e2.rejected));
    });
    const l = [];
    let u;
    this.interceptors.response.forEach(function(e2) {
      l.push(e2.fulfilled, e2.rejected);
    });
    let p, h = 0;
    if (!c) {
      const e2 = [dispatchRequest.bind(this), void 0];
      for (e2.unshift(...i), e2.push(...l), p = e2.length, u = Promise.resolve(n); h < p; ) u = u.then(e2[h++], e2[h++]);
      return u;
    }
    p = i.length;
    let g = n;
    for (; h < p; ) {
      const e2 = i[h++], n2 = i[h++];
      try {
        g = e2(g);
      } catch (e3) {
        n2.call(this, e3);
        break;
      }
    }
    try {
      u = dispatchRequest.call(this, g);
    } catch (e2) {
      return Promise.reject(e2);
    }
    for (h = 0, p = l.length; h < p; ) u = u.then(l[h++], l[h++]);
    return u;
  }
  getUri(e) {
    return buildURL(buildFullPath((e = mergeConfig$1(this.defaults, e)).baseURL, e.url, e.allowAbsoluteUrls), e.params, e.paramsSerializer);
  }
};
kr.forEach(["delete", "get", "head", "options"], function(e) {
  ku.prototype[e] = function(n, r) {
    return this.request(mergeConfig$1(r || {}, { method: e, url: n, data: (r || {}).data }));
  };
}), kr.forEach(["post", "put", "patch"], function(e) {
  function generateHTTPMethod(n) {
    return function(r, a, o) {
      return this.request(mergeConfig$1(o || {}, { method: e, headers: n ? { "Content-Type": "multipart/form-data" } : {}, url: r, data: a }));
    };
  }
  ku.prototype[e] = generateHTTPMethod(), ku.prototype[e + "Form"] = generateHTTPMethod(true);
});
const wu = { Continue: 100, SwitchingProtocols: 101, Processing: 102, EarlyHints: 103, Ok: 200, Created: 201, Accepted: 202, NonAuthoritativeInformation: 203, NoContent: 204, ResetContent: 205, PartialContent: 206, MultiStatus: 207, AlreadyReported: 208, ImUsed: 226, MultipleChoices: 300, MovedPermanently: 301, Found: 302, SeeOther: 303, NotModified: 304, UseProxy: 305, Unused: 306, TemporaryRedirect: 307, PermanentRedirect: 308, BadRequest: 400, Unauthorized: 401, PaymentRequired: 402, Forbidden: 403, NotFound: 404, MethodNotAllowed: 405, NotAcceptable: 406, ProxyAuthenticationRequired: 407, RequestTimeout: 408, Conflict: 409, Gone: 410, LengthRequired: 411, PreconditionFailed: 412, PayloadTooLarge: 413, UriTooLong: 414, UnsupportedMediaType: 415, RangeNotSatisfiable: 416, ExpectationFailed: 417, ImATeapot: 418, MisdirectedRequest: 421, UnprocessableEntity: 422, Locked: 423, FailedDependency: 424, TooEarly: 425, UpgradeRequired: 426, PreconditionRequired: 428, TooManyRequests: 429, RequestHeaderFieldsTooLarge: 431, UnavailableForLegalReasons: 451, InternalServerError: 500, NotImplemented: 501, BadGateway: 502, ServiceUnavailable: 503, GatewayTimeout: 504, HttpVersionNotSupported: 505, VariantAlsoNegotiates: 506, InsufficientStorage: 507, LoopDetected: 508, NotExtended: 510, NetworkAuthenticationRequired: 511 };
Object.entries(wu).forEach(([e, n]) => {
  wu[n] = e;
});
const Cu = function createInstance(e) {
  const n = new ku(e), r = bind$4(ku.prototype.request, n);
  return kr.extend(r, ku.prototype, n, { allOwnKeys: true }), kr.extend(r, n, null, { allOwnKeys: true }), r.create = function(n2) {
    return createInstance(mergeConfig$1(e, n2));
  }, r;
}(Jc);
Cu.Axios = ku, Cu.CanceledError = CanceledError$1, Cu.CancelToken = class CancelToken {
  constructor(e) {
    if ("function" != typeof e) throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(e2) {
      n = e2;
    });
    const r = this;
    this.promise.then((e2) => {
      if (!r._listeners) return;
      let n2 = r._listeners.length;
      for (; n2-- > 0; ) r._listeners[n2](e2);
      r._listeners = null;
    }), this.promise.then = (e2) => {
      let n2;
      const a = new Promise((e3) => {
        r.subscribe(e3), n2 = e3;
      }).then(e2);
      return a.cancel = function() {
        r.unsubscribe(n2);
      }, a;
    }, e(function(e2, a, o) {
      r.reason || (r.reason = new CanceledError$1(e2, a, o), n(r.reason));
    });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(e) {
    this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  unsubscribe(e) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(e);
    -1 !== n && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const e = new AbortController(), abort2 = (n) => {
      e.abort(n);
    };
    return this.subscribe(abort2), e.signal.unsubscribe = () => this.unsubscribe(abort2), e.signal;
  }
  static source() {
    let e;
    return { token: new CancelToken(function(n) {
      e = n;
    }), cancel: e };
  }
}, Cu.isCancel = isCancel$1, Cu.VERSION = Wl, Cu.toFormData = toFormData$1, Cu.AxiosError = AxiosError$1, Cu.Cancel = Cu.CanceledError, Cu.all = function(e) {
  return Promise.all(e);
}, Cu.spread = function(e) {
  return function(n) {
    return e.apply(null, n);
  };
}, Cu.isAxiosError = function(e) {
  return kr.isObject(e) && true === e.isAxiosError;
}, Cu.mergeConfig = mergeConfig$1, Cu.AxiosHeaders = Zc, Cu.formToJSON = (e) => formDataToJSON(kr.isHTMLForm(e) ? new FormData(e) : e), Cu.getAdapter = adapters_getAdapter, Cu.HttpStatusCode = wu, Cu.default = Cu;
const { Axios: Ru, AxiosError: Pu, CanceledError: Tu, isCancel: Eu, CancelToken: $u, VERSION: Fu, all: _u, Cancel: Au, isAxiosError: Ou, spread: ju, toFormData: Iu, AxiosHeaders: Mu, HttpStatusCode: Lu, formToJSON: Nu, getAdapter: Du, mergeConfig: Bu } = Cu;
function splitSetCookieString(e) {
  if (Array.isArray(e)) return e.flatMap((e2) => splitSetCookieString(e2));
  if ("string" != typeof e) return [];
  const n = [];
  let r, a, o, s, i, c = 0;
  const skipWhitespace = () => {
    for (; c < e.length && /\s/.test(e.charAt(c)); ) c += 1;
    return c < e.length;
  }, notSpecialChar = () => (a = e.charAt(c), "=" !== a && ";" !== a && "," !== a);
  for (; c < e.length; ) {
    for (r = c, i = false; skipWhitespace(); ) if (a = e.charAt(c), "," === a) {
      for (o = c, c += 1, skipWhitespace(), s = c; c < e.length && notSpecialChar(); ) c += 1;
      c < e.length && "=" === e.charAt(c) ? (i = true, c = s, n.push(e.slice(r, o)), r = c) : c = o + 1;
    } else c += 1;
    (!i || c >= e.length) && n.push(e.slice(r, e.length));
  }
  return n;
}
function mergeHeaders(...e) {
  return e.reduce((e2, n) => {
    const r = function(e3) {
      return e3 instanceof Headers || Array.isArray(e3) || "object" == typeof e3 ? new Headers(e3) : new Headers();
    }(n);
    for (const [n2, a] of r.entries()) if ("set-cookie" === n2) {
      splitSetCookieString(a).forEach((n3) => e2.append("set-cookie", n3));
    } else e2.set(n2, a);
    return e2;
  }, new Headers());
}
function json(e, n) {
  return new Response(JSON.stringify(e), { ...n, headers: mergeHeaders({ "content-type": "application/json" }, null == n ? void 0 : n.headers) });
}
const zu = Hr({ tag: "tanstack-start:seroval-plugins/Error", test: (e) => e instanceof Error, parse: { sync: (e, n) => ({ message: n.parse(e.message) }), async: async (e, n) => ({ message: await n.parse(e.message) }), stream: (e, n) => ({ message: n.parse(e.message) }) }, serialize: (e, n) => "new Error(" + n.serialize(e.message) + ")", deserialize: (e, n) => new Error(n.deserialize(e.message)) });
function dehydrateMatch(e) {
  const n = { i: e.id, u: e.updatedAt, s: e.status }, r = [["__beforeLoadContext", "b"], ["loaderData", "l"], ["error", "e"], ["ssr", "ssr"]];
  for (const [a, o] of r) void 0 !== e[a] && (n[o] = e[a]);
  return n;
}
function attachRouterServerSsrUtils(e, n) {
  e.ssr = { manifest: n };
  const r = /* @__PURE__ */ new Map();
  let a = false;
  const getInitialScript = () => {
    return a ? "" : (a = true, (null == (e2 = "tsr") ? `${en}=${en}||[]` : `(${en}=${en}||{})["${d(e2)}"]=[]`) + ';self.$_TSR={c:()=>{document.querySelectorAll(".\\\\$tsr").forEach(e=>{e.remove()})}};\n;');
    var e2;
  };
  let o = false;
  const s = [];
  e.serverSsr = { injectedHtml: [], injectHtml: (n2) => {
    const r2 = Promise.resolve().then(n2);
    return e.serverSsr.injectedHtml.push(r2), e.emit({ type: "onInjectedHtml", promise: r2 }), r2.then(() => {
    });
  }, injectScript: (n2) => e.serverSsr.injectHtml(async () => {
    const e2 = await n2();
    return `<script class='$tsr'>${getInitialScript()}${e2};if (typeof $_TSR !== 'undefined') $_TSR.c()<\/script>`;
  }), dehydrate: async () => {
    var n2, a2, s2;
    invariant(!o);
    let i = e.state.matches;
    e.isShell() && (i = i.slice(0, 1));
    const c = i.map(dehydrateMatch), l = { manifest: e.ssr.manifest, matches: c }, u = null == (n2 = i[i.length - 1]) ? void 0 : n2.id;
    u && (l.lastMatchId = u), l.dehydratedData = await (null == (s2 = (a2 = e.options).dehydrate) ? void 0 : s2.call(a2)), o = true;
    const p = createControlledPromise();
    !function(e2, n3) {
      let r2 = m(n3.plugins), a3 = new Mn({ plugins: r2, refs: n3.refs, disabledFeatures: n3.disabledFeatures, onParse(e3, o2) {
        let s3, i2 = new On({ plugins: r2, features: a3.features, scopeId: n3.scopeId, markedRefs: a3.marked });
        try {
          s3 = i2.serializeTop(e3);
        } catch (e4) {
          return void (n3.onError && n3.onError(e4));
        }
        n3.onSerialize(s3, o2);
      }, onError: n3.onError, onDone: n3.onDone });
      a3.start(e2), a3.destroy.bind(a3);
    }(l, { refs: r, plugins: [Dn, zu], onSerialize: (n3, r2) => {
      const a3 = r2 ? '$_TSR["router"]=' + n3 : n3;
      e.serverSsr.injectScript(() => a3);
    }, scopeId: "tsr", onDone: () => p.resolve(""), onError: (e2) => p.reject(e2) }), e.serverSsr.injectHtml(() => p);
  }, isDehydrated: () => o, onRenderFinished: (e2) => s.push(e2), setRenderFinished: () => {
    s.forEach((e2) => e2());
  } };
}
const qu = /(<body)/, Hu = /(<\/body>)/, Uu = /(<\/html>)/, Vu = /(<head.*?>)/, Wu = /(<\/[a-zA-Z][\w:.-]*?>)/g, Ku = new TextDecoder();
function transformStreamWithRouter(e, n) {
  const r = function() {
    let e2;
    const n2 = new TextEncoder(), r2 = { stream: new ReadableStream$1({ start(n3) {
      e2 = n3;
    } }), write: (r3) => {
      e2.enqueue(n2.encode(r3));
    }, end: (a2) => {
      a2 && e2.enqueue(n2.encode(a2)), e2.close(), r2.destroyed = true;
    }, destroy: (n3) => {
      e2.error(n3);
    }, destroyed: false };
    return r2;
  }();
  let a = true, o = "", s = "", i = false, c = false, l = "", u = "";
  function getBufferedRouterStream() {
    const e2 = o;
    return o = "", e2;
  }
  const p = createControlledPromise();
  let h = 0;
  e.serverSsr.injectedHtml.forEach((e2) => {
    handleInjectedHtml(e2);
  });
  const g = e.subscribe("onInjectedHtml", (e2) => {
    handleInjectedHtml(e2.promise);
  });
  function handleInjectedHtml(e2) {
    h++, e2.then((e3) => {
      i ? r.write(e3) : o += e3;
    }).catch(p.reject).finally(() => {
      h--, a || 0 !== h || (g(), p.resolve());
    });
  }
  return p.then(() => {
    const e2 = u + getBufferedRouterStream() + s;
    r.end(e2);
  }).catch((e2) => {
    console.error("Error reading routerStream:", e2), r.destroy(e2);
  }), async function(e2, n2) {
    var r2, a2, o2;
    try {
      const o3 = e2.getReader();
      let s2;
      for (; !(s2 = await o3.read()).done; ) null == (r2 = n2.onData) || r2.call(n2, s2);
      null == (a2 = n2.onEnd) || a2.call(n2);
    } catch (e3) {
      null == (o2 = n2.onError) || o2.call(n2, e3);
    }
  }(n, { onData: (e2) => {
    const n2 = function(e3) {
      return e3 instanceof Uint8Array ? Ku.decode(e3) : String(e3);
    }(e2.value);
    let a2 = l + n2;
    const o2 = a2.match(Hu), p2 = a2.match(Uu);
    if (!i) {
      a2.match(qu) && (i = true);
    }
    if (!c) {
      const e3 = a2.match(Vu);
      if (e3) {
        c = true;
        const n3 = e3.index, o3 = e3[0], s2 = a2.slice(n3 + o3.length);
        r.write(a2.slice(0, n3) + o3 + getBufferedRouterStream()), a2 = s2;
      }
    }
    if (!i) return r.write(a2), void (l = "");
    if (o2 && p2 && o2.index < p2.index) {
      const e3 = o2.index;
      return s = a2.slice(e3), r.write(a2.slice(0, e3) + getBufferedRouterStream()), void (l = "");
    }
    let h2, g2 = 0;
    for (; null !== (h2 = Wu.exec(a2)); ) g2 = h2.index + h2[0].length;
    if (g2 > 0) {
      const e3 = a2.slice(0, g2) + getBufferedRouterStream() + u;
      r.write(e3), l = a2.slice(g2);
    } else l = a2, u += getBufferedRouterStream();
  }, onEnd: () => {
    a = false, e.serverSsr.setRenderFinished(), 0 === h && p.resolve();
  }, onError: (e2) => {
    console.error("Error reading appStream:", e2), r.destroy(e2);
  } }), r.stream;
}
function hasProp(e, n) {
  try {
    return n in e;
  } catch {
    return false;
  }
}
var Gu = Object.defineProperty, __publicField$2 = (e, n, r) => (((e2, n2, r2) => {
  n2 in e2 ? Gu(e2, n2, { enumerable: true, configurable: true, writable: true, value: r2 }) : e2[n2] = r2;
})(e, "symbol" != typeof n ? n + "" : n, r), r);
class H3Error extends Error {
  constructor(e, n = {}) {
    super(e, n), __publicField$2(this, "statusCode", 500), __publicField$2(this, "fatal", false), __publicField$2(this, "unhandled", false), __publicField$2(this, "statusMessage"), __publicField$2(this, "data"), __publicField$2(this, "cause"), n.cause && !this.cause && (this.cause = n.cause);
  }
  toJSON() {
    const e = { message: this.message, statusCode: sanitizeStatusCode(this.statusCode, 500) };
    return this.statusMessage && (e.statusMessage = sanitizeStatusMessage(this.statusMessage)), void 0 !== this.data && (e.data = this.data), e;
  }
}
function assertMethod(e, n, r) {
  if (!function(e2, n2) {
    if ("string" == typeof n2) {
      if (e2.method === n2) return true;
    } else if (n2.includes(e2.method)) return true;
    return false;
  }(e, n)) throw function(e2) {
    if ("string" == typeof e2) return new H3Error(e2);
    if (function(e3) {
      return true === e3?.constructor?.__h3_error__;
    }(e2)) return e2;
    const n2 = new H3Error(e2.message ?? e2.statusMessage ?? "", { cause: e2.cause || e2 });
    if (hasProp(e2, "stack")) try {
      Object.defineProperty(n2, "stack", { get: () => e2.stack });
    } catch {
      try {
        n2.stack = e2.stack;
      } catch {
      }
    }
    if (e2.data && (n2.data = e2.data), e2.statusCode ? n2.statusCode = sanitizeStatusCode(e2.statusCode, n2.statusCode) : e2.status && (n2.statusCode = sanitizeStatusCode(e2.status, n2.statusCode)), e2.statusMessage ? n2.statusMessage = e2.statusMessage : e2.statusText && (n2.statusMessage = e2.statusText), n2.statusMessage) {
      const e3 = n2.statusMessage;
      sanitizeStatusMessage(n2.statusMessage) !== e3 && console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.");
    }
    return void 0 !== e2.fatal && (n2.fatal = e2.fatal), void 0 !== e2.unhandled && (n2.unhandled = e2.unhandled), n2;
  }({ statusCode: 405, statusMessage: "HTTP method is not allowed." });
}
function toWebRequest(e) {
  return e.web?.request || new Request(function(e2, n = {}) {
    const r = function(e3, n2 = {}) {
      if (n2.xForwardedHost) {
        const n3 = e3.node.req.headers["x-forwarded-host"];
        if (n3) return n3;
      }
      return e3.node.req.headers.host || "localhost";
    }(e2, n), a = function(e3, n2 = {}) {
      return false !== n2.xForwardedProto && "https" === e3.node.req.headers["x-forwarded-proto"] || e3.node.req.connection?.encrypted ? "https" : "http";
    }(e2, n), o = (e2.node.req.originalUrl || e2.path).replace(/^[/\\]+/g, "/");
    return new URL(o, `${a}://${r}`);
  }(e), { duplex: "half", method: e.method, headers: e.headers, body: getRequestWebStream(e) });
}
__publicField$2(H3Error, "__h3_error__", true);
const Qu = Symbol.for("h3RawBody"), Ju = ["PATCH", "POST", "PUT", "DELETE"];
function getRequestWebStream(e) {
  if (!Ju.includes(e.method)) return;
  const n = e.web?.request?.body || e._requestBody;
  if (n) return n;
  return Qu in e.node.req || "rawBody" in e.node.req || "body" in e.node.req || "__unenv__" in e.node.req ? new ReadableStream({ async start(n2) {
    const r = await function(e2, n3 = "utf8") {
      assertMethod(e2, Ju);
      const r2 = e2._requestBody || e2.web?.request?.body || e2.node.req[Qu] || e2.node.req.rawBody || e2.node.req.body;
      if (r2) {
        const e3 = Promise.resolve(r2).then((e4) => Buffer.isBuffer(e4) ? e4 : "function" == typeof e4.pipeTo ? new Promise((n4, r3) => {
          const a2 = [];
          e4.pipeTo(new WritableStream({ write(e5) {
            a2.push(e5);
          }, close() {
            n4(Buffer.concat(a2));
          }, abort(e5) {
            r3(e5);
          } })).catch(r3);
        }) : "function" == typeof e4.pipe ? new Promise((n4, r3) => {
          const a2 = [];
          e4.on("data", (e5) => {
            a2.push(e5);
          }).on("end", () => {
            n4(Buffer.concat(a2));
          }).on("error", r3);
        }) : e4.constructor === Object ? Buffer.from(JSON.stringify(e4)) : e4 instanceof URLSearchParams ? Buffer.from(e4.toString()) : Buffer.from(e4));
        return n3 ? e3.then((e4) => e4.toString(n3)) : e3;
      }
      if (!Number.parseInt(e2.node.req.headers["content-length"] || "") && !String(e2.node.req.headers["transfer-encoding"] ?? "").split(",").map((e3) => e3.trim()).filter(Boolean).includes("chunked")) return Promise.resolve(void 0);
      const a = e2.node.req[Qu] = new Promise((n4, r3) => {
        const a2 = [];
        e2.node.req.on("error", (e3) => {
          r3(e3);
        }).on("data", (e3) => {
          a2.push(e3);
        }).on("end", () => {
          n4(Buffer.concat(a2));
        });
      });
      return n3 ? a.then((e3) => e3.toString(n3)) : a;
    }(e, false);
    r && n2.enqueue(r), n2.close();
  } }) : new ReadableStream({ start: (n2) => {
    e.node.req.on("data", (e2) => {
      n2.enqueue(e2);
    }), e.node.req.on("end", () => {
      n2.close();
    }), e.node.req.on("error", (e2) => {
      n2.error(e2);
    });
  } });
}
const Xu = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(e = "") {
  return e.replace(Xu, "");
}
function sanitizeStatusCode(e, n = 200) {
  return e ? ("string" == typeof e && (e = Number.parseInt(e, 10)), e < 100 || e > 999 ? n : e) : n;
}
function splitCookiesString(e) {
  if (Array.isArray(e)) return e.flatMap((e2) => splitCookiesString(e2));
  if ("string" != typeof e) return [];
  const n = [];
  let r, a, o, s, i, c = 0;
  const skipWhitespace = () => {
    for (; c < e.length && /\s/.test(e.charAt(c)); ) c += 1;
    return c < e.length;
  }, notSpecialChar = () => (a = e.charAt(c), "=" !== a && ";" !== a && "," !== a);
  for (; c < e.length; ) {
    for (r = c, i = false; skipWhitespace(); ) if (a = e.charAt(c), "," === a) {
      for (o = c, c += 1, skipWhitespace(), s = c; c < e.length && notSpecialChar(); ) c += 1;
      c < e.length && "=" === e.charAt(c) ? (i = true, c = s, n.push(e.slice(r, o)), r = c) : c = o + 1;
    } else c += 1;
    (!i || c >= e.length) && n.push(e.slice(r));
  }
  return n;
}
function sendWebResponse(e, n) {
  for (const [r, a] of n.headers) "set-cookie" === r ? e.node.res.appendHeader(r, splitCookiesString(a)) : e.node.res.setHeader(r, a);
  if (n.status && (e.node.res.statusCode = sanitizeStatusCode(n.status, e.node.res.statusCode)), n.statusText && (e.node.res.statusMessage = sanitizeStatusMessage(n.statusText)), n.redirected && e.node.res.setHeader("location", n.url), n.body) return function(e2, n2) {
    if (!n2 || "object" != typeof n2) throw new Error("[h3] Invalid stream provided.");
    if (e2.node.res._data = n2, !e2.node.res.socket) return e2._handled = true, Promise.resolve();
    if (hasProp(n2, "pipeTo") && "function" == typeof n2.pipeTo) return n2.pipeTo(new WritableStream({ write(n3) {
      e2.node.res.write(n3);
    } })).then(() => {
      e2.node.res.end();
    });
    if (hasProp(n2, "pipe") && "function" == typeof n2.pipe) return new Promise((r, a) => {
      n2.pipe(e2.node.res), n2.on && (n2.on("end", () => {
        e2.node.res.end(), r();
      }), n2.on("error", (e3) => {
        a(e3);
      })), e2.node.res.on("close", () => {
        n2.abort && n2.abort();
      });
    });
    throw new Error("[h3] Invalid or incompatible stream provided.");
  }(e, n.body);
  e.node.res.end();
}
var Yu = Object.defineProperty, __publicField = (e, n, r) => (((e2, n2, r2) => {
  n2 in e2 ? Yu(e2, n2, { enumerable: true, configurable: true, writable: true, value: r2 }) : e2[n2] = r2;
})(e, "symbol" != typeof n ? n + "" : n, r), r);
class H3Event {
  constructor(e, n) {
    __publicField(this, "__is_event__", true), __publicField(this, "node"), __publicField(this, "web"), __publicField(this, "context", {}), __publicField(this, "_method"), __publicField(this, "_path"), __publicField(this, "_headers"), __publicField(this, "_requestBody"), __publicField(this, "_handled", false), __publicField(this, "_onBeforeResponseCalled"), __publicField(this, "_onAfterResponseCalled"), this.node = { req: e, res: n };
  }
  get method() {
    return this._method || (this._method = (this.node.req.method || "GET").toUpperCase()), this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    return this._headers || (this._headers = function(e) {
      const n = new Headers();
      for (const [r, a] of Object.entries(e)) if (Array.isArray(a)) for (const e2 of a) n.append(r, e2);
      else a && n.set(r, a);
      return n;
    }(this.node.req.headers)), this._headers;
  }
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(e) {
    return Promise.resolve(e).then((e2) => sendWebResponse(this, e2));
  }
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  get req() {
    return this.node.req;
  }
  get res() {
    return this.node.res;
  }
}
function _normalizeArray(e) {
  return e ? Array.isArray(e) ? e : [e] : void 0;
}
var Zu = {}, ep = {}, tp = Ge, np = St, rp = Symbol.for("react.transitional.element"), ap = Symbol.for("react.portal"), op = Symbol.for("react.fragment"), sp = Symbol.for("react.strict_mode"), ip = Symbol.for("react.profiler"), cp = Symbol.for("react.provider"), lp = Symbol.for("react.consumer"), up = Symbol.for("react.context"), pp = Symbol.for("react.forward_ref"), dp = Symbol.for("react.suspense"), hp = Symbol.for("react.suspense_list"), mp = Symbol.for("react.memo"), fp = Symbol.for("react.lazy"), gp = Symbol.for("react.scope"), vp = Symbol.for("react.activity"), yp = Symbol.for("react.legacy_hidden"), bp = Symbol.for("react.memo_cache_sentinel"), xp = Symbol.for("react.view_transition"), Sp = Symbol.iterator, kp = Array.isArray;
function murmurhash3_32_gc$1(e, n) {
  var r = 3 & e.length, a = e.length - r, o = n;
  for (n = 0; n < a; ) {
    var s = 255 & e.charCodeAt(n) | (255 & e.charCodeAt(++n)) << 8 | (255 & e.charCodeAt(++n)) << 16 | (255 & e.charCodeAt(++n)) << 24;
    ++n, o = 27492 + (65535 & (o = 5 * (65535 & (o = (o ^= s = 461845907 * (65535 & (s = (s = 3432918353 * (65535 & s) + ((3432918353 * (s >>> 16) & 65535) << 16) & 4294967295) << 15 | s >>> 17)) + ((461845907 * (s >>> 16) & 65535) << 16) & 4294967295) << 13 | o >>> 19)) + ((5 * (o >>> 16) & 65535) << 16) & 4294967295)) + (((o >>> 16) + 58964 & 65535) << 16);
  }
  switch (s = 0, r) {
    case 3:
      s ^= (255 & e.charCodeAt(n + 2)) << 16;
    case 2:
      s ^= (255 & e.charCodeAt(n + 1)) << 8;
    case 1:
      o ^= 461845907 * (65535 & (s = (s = 3432918353 * (65535 & (s ^= 255 & e.charCodeAt(n))) + ((3432918353 * (s >>> 16) & 65535) << 16) & 4294967295) << 15 | s >>> 17)) + ((461845907 * (s >>> 16) & 65535) << 16) & 4294967295;
  }
  return o ^= e.length, o = 2246822507 * (65535 & (o ^= o >>> 16)) + ((2246822507 * (o >>> 16) & 65535) << 16) & 4294967295, ((o = 3266489909 * (65535 & (o ^= o >>> 13)) + ((3266489909 * (o >>> 16) & 65535) << 16) & 4294967295) ^ o >>> 16) >>> 0;
}
function handleErrorInNextTick(e) {
  setTimeout(function() {
    throw e;
  });
}
var wp = Promise, Cp = "function" == typeof queueMicrotask ? queueMicrotask : function(e) {
  wp.resolve(null).then(e).catch(handleErrorInNextTick);
}, Rp = null, Pp = 0;
function writeChunk(e, n) {
  if (0 !== n.byteLength) if (2048 < n.byteLength) 0 < Pp && (e.enqueue(new Uint8Array(Rp.buffer, 0, Pp)), Rp = new Uint8Array(2048), Pp = 0), e.enqueue(n);
  else {
    var r = Rp.length - Pp;
    r < n.byteLength && (0 === r ? e.enqueue(Rp) : (Rp.set(n.subarray(0, r), Pp), e.enqueue(Rp), n = n.subarray(r)), Rp = new Uint8Array(2048), Pp = 0), Rp.set(n, Pp), Pp += n.byteLength;
  }
}
function writeChunkAndReturn(e, n) {
  return writeChunk(e, n), true;
}
function completeWriting(e) {
  Rp && 0 < Pp && (e.enqueue(new Uint8Array(Rp.buffer, 0, Pp)), Rp = null, Pp = 0);
}
var Tp = new TextEncoder();
function stringToChunk(e) {
  return Tp.encode(e);
}
function stringToPrecomputedChunk(e) {
  return Tp.encode(e);
}
function closeWithError(e, n) {
  "function" == typeof e.error ? e.error(n) : e.close();
}
var Ep = Object.assign, $p = Object.prototype.hasOwnProperty, Fp = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), _p = {}, Ap = {};
function isAttributeNameSafe$1(e) {
  return !!$p.call(Ap, e) || !$p.call(_p, e) && (Fp.test(e) ? Ap[e] = true : (_p[e] = true, false));
}
var Op = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), jp = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), Ip = /["'&<>]/;
function escapeTextForBrowser$1(e) {
  if ("boolean" == typeof e || "number" == typeof e || "bigint" == typeof e) return "" + e;
  e = "" + e;
  var n = Ip.exec(e);
  if (n) {
    var r, a = "", o = 0;
    for (r = n.index; r < e.length; r++) {
      switch (e.charCodeAt(r)) {
        case 34:
          n = "&quot;";
          break;
        case 38:
          n = "&amp;";
          break;
        case 39:
          n = "&#x27;";
          break;
        case 60:
          n = "&lt;";
          break;
        case 62:
          n = "&gt;";
          break;
        default:
          continue;
      }
      o !== r && (a += e.slice(o, r)), o = r + 1, a += n;
    }
    e = o !== r ? a + e.slice(o, r) : a;
  }
  return e;
}
var Mp = /([A-Z])/g, Lp = /^ms-/, Np = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function sanitizeURL$1(e) {
  return Np.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
}
var Dp = tp.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Bp = np.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, zp = { pending: false, data: null, method: null, action: null }, qp = Bp.d;
Bp.d = { f: qp.f, r: qp.r, D: function(e) {
  var n = resolveRequest();
  if (n) {
    var r = n.resumableState, a = n.renderState;
    if ("string" == typeof e && e) {
      var o, s;
      if (!r.dnsResources.hasOwnProperty(e)) r.dnsResources[e] = null, (s = (r = a.headers) && 0 < r.remainingCapacity) && (o = "<" + ("" + e).replace(Bh, escapeHrefForLinkHeaderURLContextReplacer$1) + ">; rel=dns-prefetch", s = 0 <= (r.remainingCapacity -= o.length + 2)), s ? (a.resets.dns[e] = null, r.preconnects && (r.preconnects += ", "), r.preconnects += o) : (pushLinkImpl$1(o = [], { href: e, rel: "dns-prefetch" }), a.preconnects.add(o));
      enqueueFlush$1(n);
    }
  } else qp.D(e);
}, C: function(e, n) {
  var r = resolveRequest();
  if (r) {
    var a = r.resumableState, o = r.renderState;
    if ("string" == typeof e && e) {
      var s = "use-credentials" === n ? "credentials" : "string" == typeof n ? "anonymous" : "default";
      if (!a.connectResources[s].hasOwnProperty(e)) {
        var i, c;
        if (a.connectResources[s][e] = null, c = (a = o.headers) && 0 < a.remainingCapacity) {
          if (c = "<" + ("" + e).replace(Bh, escapeHrefForLinkHeaderURLContextReplacer$1) + ">; rel=preconnect", "string" == typeof n) c += '; crossorigin="' + ("" + n).replace(zh, escapeStringForLinkHeaderQuotedParamValueContextReplacer$1) + '"';
          i = c, c = 0 <= (a.remainingCapacity -= i.length + 2);
        }
        c ? (o.resets.connect[s][e] = null, a.preconnects && (a.preconnects += ", "), a.preconnects += i) : (pushLinkImpl$1(s = [], { rel: "preconnect", href: e, crossOrigin: n }), o.preconnects.add(s));
      }
      enqueueFlush$1(r);
    }
  } else qp.C(e, n);
}, L: function(e, n, r) {
  var a = resolveRequest();
  if (a) {
    var o = a.resumableState, s = a.renderState;
    if (n && e) {
      switch (n) {
        case "image":
          if (r) var i = r.imageSrcSet, c = r.imageSizes, l = r.fetchPriority;
          var u, p = i ? i + "\n" + (c || "") : e;
          if (o.imageResources.hasOwnProperty(p)) return;
          o.imageResources[p] = Hp, (o = s.headers) && 0 < o.remainingCapacity && "string" != typeof i && "high" === l && (u = getPreloadAsHeader$1(e, n, r), 0 <= (o.remainingCapacity -= u.length + 2)) ? (s.resets.image[p] = Hp, o.highImagePreloads && (o.highImagePreloads += ", "), o.highImagePreloads += u) : (pushLinkImpl$1(o = [], Ep({ rel: "preload", href: i ? void 0 : e, as: n }, r)), "high" === l ? s.highImagePreloads.add(o) : (s.bulkPreloads.add(o), s.preloads.images.set(p, o)));
          break;
        case "style":
          if (o.styleResources.hasOwnProperty(e)) return;
          pushLinkImpl$1(i = [], Ep({ rel: "preload", href: e, as: n }, r)), o.styleResources[e] = !r || "string" != typeof r.crossOrigin && "string" != typeof r.integrity ? Hp : [r.crossOrigin, r.integrity], s.preloads.stylesheets.set(e, i), s.bulkPreloads.add(i);
          break;
        case "script":
          if (o.scriptResources.hasOwnProperty(e)) return;
          i = [], s.preloads.scripts.set(e, i), s.bulkPreloads.add(i), pushLinkImpl$1(i, Ep({ rel: "preload", href: e, as: n }, r)), o.scriptResources[e] = !r || "string" != typeof r.crossOrigin && "string" != typeof r.integrity ? Hp : [r.crossOrigin, r.integrity];
          break;
        default:
          if (o.unknownResources.hasOwnProperty(n)) {
            if ((i = o.unknownResources[n]).hasOwnProperty(e)) return;
          } else i = {}, o.unknownResources[n] = i;
          if (i[e] = Hp, (o = s.headers) && 0 < o.remainingCapacity && "font" === n && (p = getPreloadAsHeader$1(e, n, r), 0 <= (o.remainingCapacity -= p.length + 2))) s.resets.font[e] = Hp, o.fontPreloads && (o.fontPreloads += ", "), o.fontPreloads += p;
          else if ("font" === (pushLinkImpl$1(o = [], e = Ep({ rel: "preload", href: e, as: n }, r)), n)) s.fontPreloads.add(o);
          else s.bulkPreloads.add(o);
      }
      enqueueFlush$1(a);
    }
  } else qp.L(e, n, r);
}, m: function(e, n) {
  var r = resolveRequest();
  if (r) {
    var a = r.resumableState, o = r.renderState;
    if (e) {
      var s = n && "string" == typeof n.as ? n.as : "script";
      if ("script" === s) {
        if (a.moduleScriptResources.hasOwnProperty(e)) return;
        s = [], a.moduleScriptResources[e] = !n || "string" != typeof n.crossOrigin && "string" != typeof n.integrity ? Hp : [n.crossOrigin, n.integrity], o.preloads.moduleScripts.set(e, s);
      } else {
        if (a.moduleUnknownResources.hasOwnProperty(s)) {
          var i = a.unknownResources[s];
          if (i.hasOwnProperty(e)) return;
        } else i = {}, a.moduleUnknownResources[s] = i;
        s = [], i[e] = Hp;
      }
      pushLinkImpl$1(s, Ep({ rel: "modulepreload", href: e }, n)), o.bulkPreloads.add(s), enqueueFlush$1(r);
    }
  } else qp.m(e, n);
}, X: function(e, n) {
  var r = resolveRequest();
  if (r) {
    var a = r.resumableState, o = r.renderState;
    if (e) {
      var s = a.scriptResources.hasOwnProperty(e) ? a.scriptResources[e] : void 0;
      null !== s && (a.scriptResources[e] = null, n = Ep({ src: e, async: true }, n), s && (2 === s.length && adoptPreloadCredentials$1(n, s), e = o.preloads.scripts.get(e)) && (e.length = 0), e = [], o.scripts.add(e), pushScriptImpl$1(e, n), enqueueFlush$1(r));
    }
  } else qp.X(e, n);
}, S: function(e, n, r) {
  var a = resolveRequest();
  if (a) {
    var o = a.resumableState, s = a.renderState;
    if (e) {
      n = n || "default";
      var i = s.styles.get(n), c = o.styleResources.hasOwnProperty(e) ? o.styleResources[e] : void 0;
      null !== c && (o.styleResources[e] = null, i || (i = { precedence: stringToChunk(escapeTextForBrowser$1(n)), rules: [], hrefs: [], sheets: /* @__PURE__ */ new Map() }, s.styles.set(n, i)), n = { state: 0, props: Ep({ rel: "stylesheet", href: e, "data-precedence": n }, r) }, c && (2 === c.length && adoptPreloadCredentials$1(n.props, c), (s = s.preloads.stylesheets.get(e)) && 0 < s.length ? s.length = 0 : n.state = 1), i.sheets.set(e, n), enqueueFlush$1(a));
    }
  } else qp.S(e, n, r);
}, M: function(e, n) {
  var r = resolveRequest();
  if (r) {
    var a = r.resumableState, o = r.renderState;
    if (e) {
      var s = a.moduleScriptResources.hasOwnProperty(e) ? a.moduleScriptResources[e] : void 0;
      null !== s && (a.moduleScriptResources[e] = null, n = Ep({ src: e, type: "module", async: true }, n), s && (2 === s.length && adoptPreloadCredentials$1(n, s), e = o.preloads.moduleScripts.get(e)) && (e.length = 0), e = [], o.scripts.add(e), pushScriptImpl$1(e, n), enqueueFlush$1(r));
    }
  } else qp.M(e, n);
} };
var Hp = [];
stringToPrecomputedChunk('"></template>');
var Up = stringToPrecomputedChunk("<script>"), Vp = stringToPrecomputedChunk("<\/script>"), Wp = stringToPrecomputedChunk('<script src="'), Kp = stringToPrecomputedChunk('<script type="module" src="'), Gp = stringToPrecomputedChunk('" nonce="'), Qp = stringToPrecomputedChunk('" integrity="'), Jp = stringToPrecomputedChunk('" crossorigin="'), Xp = stringToPrecomputedChunk('" async=""><\/script>'), Yp = /(<\/|<)(s)(cript)/gi;
function scriptReplacer$1(e, n, r, a) {
  return n + ("s" === r ? "\\u0073" : "\\u0053") + a;
}
var Zp = stringToPrecomputedChunk('<script type="importmap">'), ed = stringToPrecomputedChunk("<\/script>");
function createRenderState$1(e, n, r, a, o, s) {
  var i = void 0 === n ? Up : stringToPrecomputedChunk('<script nonce="' + escapeTextForBrowser$1(n) + '">'), c = e.idPrefix;
  r = [];
  var l = e.bootstrapScriptContent, u = e.bootstrapScripts, p = e.bootstrapModules;
  if (void 0 !== l && r.push(i, stringToChunk(("" + l).replace(Yp, scriptReplacer$1)), Vp), l = [], void 0 !== a && (l.push(Zp), l.push(stringToChunk(("" + JSON.stringify(a)).replace(Yp, scriptReplacer$1))), l.push(ed)), a = o ? { preconnects: "", fontPreloads: "", highImagePreloads: "", remainingCapacity: 2 + ("number" == typeof s ? s : 2e3) } : null, o = { placeholderPrefix: stringToPrecomputedChunk(c + "P:"), segmentPrefix: stringToPrecomputedChunk(c + "S:"), boundaryPrefix: stringToPrecomputedChunk(c + "B:"), startInlineScript: i, preamble: { htmlChunks: null, headChunks: null, bodyChunks: null, contribution: 0 }, externalRuntimeScript: null, bootstrapChunks: r, importMapChunks: l, onHeaders: o, headers: a, resets: { font: {}, dns: {}, connect: { default: {}, anonymous: {}, credentials: {} }, image: {}, style: {} }, charsetChunks: [], viewportChunks: [], hoistableChunks: [], preconnects: /* @__PURE__ */ new Set(), fontPreloads: /* @__PURE__ */ new Set(), highImagePreloads: /* @__PURE__ */ new Set(), styles: /* @__PURE__ */ new Map(), bootstrapScripts: /* @__PURE__ */ new Set(), scripts: /* @__PURE__ */ new Set(), bulkPreloads: /* @__PURE__ */ new Set(), preloads: { images: /* @__PURE__ */ new Map(), stylesheets: /* @__PURE__ */ new Map(), scripts: /* @__PURE__ */ new Map(), moduleScripts: /* @__PURE__ */ new Map() }, nonce: n, hoistableState: null, stylesToHoist: false }, void 0 !== u) for (a = 0; a < u.length; a++) {
    var h = u[a];
    c = i = void 0, l = { rel: "preload", as: "script", fetchPriority: "low", nonce: n }, "string" == typeof h ? l.href = s = h : (l.href = s = h.src, l.integrity = c = "string" == typeof h.integrity ? h.integrity : void 0, l.crossOrigin = i = "string" == typeof h || null == h.crossOrigin ? void 0 : "use-credentials" === h.crossOrigin ? "use-credentials" : "");
    var g = s;
    (h = e).scriptResources[g] = null, h.moduleScriptResources[g] = null, pushLinkImpl$1(h = [], l), o.bootstrapScripts.add(h), r.push(Wp, stringToChunk(escapeTextForBrowser$1(s))), n && r.push(Gp, stringToChunk(escapeTextForBrowser$1(n))), "string" == typeof c && r.push(Qp, stringToChunk(escapeTextForBrowser$1(c))), "string" == typeof i && r.push(Jp, stringToChunk(escapeTextForBrowser$1(i))), r.push(Xp);
  }
  if (void 0 !== p) for (u = 0; u < p.length; u++) i = s = void 0, c = { rel: "modulepreload", fetchPriority: "low", nonce: n }, "string" == typeof (l = p[u]) ? c.href = a = l : (c.href = a = l.src, c.integrity = i = "string" == typeof l.integrity ? l.integrity : void 0, c.crossOrigin = s = "string" == typeof l || null == l.crossOrigin ? void 0 : "use-credentials" === l.crossOrigin ? "use-credentials" : ""), h = a, (l = e).scriptResources[h] = null, l.moduleScriptResources[h] = null, pushLinkImpl$1(l = [], c), o.bootstrapScripts.add(l), r.push(Kp, stringToChunk(escapeTextForBrowser$1(a))), n && r.push(Gp, stringToChunk(escapeTextForBrowser$1(n))), "string" == typeof i && r.push(Qp, stringToChunk(escapeTextForBrowser$1(i))), "string" == typeof s && r.push(Jp, stringToChunk(escapeTextForBrowser$1(s))), r.push(Xp);
  return o;
}
function createResumableState$1(e, n, r, a, o) {
  return { idPrefix: void 0 === e ? "" : e, nextFormID: 0, streamingFormat: 0, bootstrapScriptContent: r, bootstrapScripts: a, bootstrapModules: o, instructions: 0, hasBody: false, hasHtml: false, unknownResources: {}, dnsResources: {}, connectResources: { default: {}, anonymous: {}, credentials: {} }, imageResources: {}, styleResources: {}, scriptResources: {}, moduleUnknownResources: {}, moduleScriptResources: {} };
}
function createPreambleState$1() {
  return { htmlChunks: null, headChunks: null, bodyChunks: null, contribution: 0 };
}
function createFormatContext$1(e, n, r) {
  return { insertionMode: e, selectedValue: n, tagScope: r };
}
function createRootFormatContext(e) {
  return createFormatContext$1("http://www.w3.org/2000/svg" === e ? 4 : "http://www.w3.org/1998/Math/MathML" === e ? 5 : 0, null, 0);
}
function getChildFormatContext$1(e, n, r) {
  switch (n) {
    case "noscript":
      return createFormatContext$1(2, null, 1 | e.tagScope);
    case "select":
      return createFormatContext$1(2, null != r.value ? r.value : r.defaultValue, e.tagScope);
    case "svg":
      return createFormatContext$1(4, null, e.tagScope);
    case "picture":
      return createFormatContext$1(2, null, 2 | e.tagScope);
    case "math":
      return createFormatContext$1(5, null, e.tagScope);
    case "foreignObject":
      return createFormatContext$1(2, null, e.tagScope);
    case "table":
      return createFormatContext$1(6, null, e.tagScope);
    case "thead":
    case "tbody":
    case "tfoot":
      return createFormatContext$1(7, null, e.tagScope);
    case "colgroup":
      return createFormatContext$1(9, null, e.tagScope);
    case "tr":
      return createFormatContext$1(8, null, e.tagScope);
    case "head":
      if (2 > e.insertionMode) return createFormatContext$1(3, null, e.tagScope);
      break;
    case "html":
      if (0 === e.insertionMode) return createFormatContext$1(1, null, e.tagScope);
  }
  return 6 <= e.insertionMode || 2 > e.insertionMode ? createFormatContext$1(2, null, e.tagScope) : e;
}
var td = stringToPrecomputedChunk("<!-- -->");
function pushTextInstance$1(e, n, r, a) {
  return "" === n ? a : (a && e.push(td), e.push(stringToChunk(escapeTextForBrowser$1(n))), true);
}
var nd = /* @__PURE__ */ new Map(), rd = stringToPrecomputedChunk(' style="'), ad = stringToPrecomputedChunk(":"), od = stringToPrecomputedChunk(";");
function pushStyleAttribute$1(e, n) {
  if ("object" != typeof n) throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
  var r, a = true;
  for (r in n) if ($p.call(n, r)) {
    var o = n[r];
    if (null != o && "boolean" != typeof o && "" !== o) {
      if (0 === r.indexOf("--")) {
        var s = stringToChunk(escapeTextForBrowser$1(r));
        o = stringToChunk(escapeTextForBrowser$1(("" + o).trim()));
      } else void 0 === (s = nd.get(r)) && (s = stringToPrecomputedChunk(escapeTextForBrowser$1(r.replace(Mp, "-$1").toLowerCase().replace(Lp, "-ms-"))), nd.set(r, s)), o = "number" == typeof o ? 0 === o || Op.has(r) ? stringToChunk("" + o) : stringToChunk(o + "px") : stringToChunk(escapeTextForBrowser$1(("" + o).trim()));
      a ? (a = false, e.push(rd, s, ad, o)) : e.push(od, s, ad, o);
    }
  }
  a || e.push(cd);
}
var sd = stringToPrecomputedChunk(" "), id = stringToPrecomputedChunk('="'), cd = stringToPrecomputedChunk('"'), ld = stringToPrecomputedChunk('=""');
function pushBooleanAttribute$1(e, n, r) {
  r && "function" != typeof r && "symbol" != typeof r && e.push(sd, stringToChunk(n), ld);
}
function pushStringAttribute$1(e, n, r) {
  "function" != typeof r && "symbol" != typeof r && "boolean" != typeof r && e.push(sd, stringToChunk(n), id, stringToChunk(escapeTextForBrowser$1(r)), cd);
}
var ud = stringToPrecomputedChunk(escapeTextForBrowser$1("javascript:throw new Error('React form unexpectedly submitted.')")), pd = stringToPrecomputedChunk('<input type="hidden"');
function pushAdditionalFormField$1(e, n) {
  this.push(pd), validateAdditionalFormField$1(e), pushStringAttribute$1(this, "name", n), pushStringAttribute$1(this, "value", e), this.push(hd);
}
function validateAdditionalFormField$1(e) {
  if ("string" != typeof e) throw Error("File/Blob fields are not yet supported in progressive forms. Will fallback to client hydration.");
}
function getCustomFormFields$1(e, n) {
  if ("function" == typeof n.$$FORM_ACTION) {
    var r = e.nextFormID++;
    e = e.idPrefix + r;
    try {
      var a = n.$$FORM_ACTION(e);
      if (a) {
        var o = a.data;
        null != o && o.forEach(validateAdditionalFormField$1);
      }
      return a;
    } catch (e2) {
      if ("object" == typeof e2 && null !== e2 && "function" == typeof e2.then) throw e2;
    }
  }
  return null;
}
function pushFormActionAttribute$1(e, n, r, a, o, s, i, c) {
  var l = null;
  if ("function" == typeof a) {
    var u = getCustomFormFields$1(n, a);
    null !== u ? (c = u.name, a = u.action || "", o = u.encType, s = u.method, i = u.target, l = u.data) : (e.push(sd, stringToChunk("formAction"), id, ud, cd), i = s = o = a = c = null, injectFormReplayingRuntime$1(n, r));
  }
  return null != c && pushAttribute$1(e, "name", c), null != a && pushAttribute$1(e, "formAction", a), null != o && pushAttribute$1(e, "formEncType", o), null != s && pushAttribute$1(e, "formMethod", s), null != i && pushAttribute$1(e, "formTarget", i), l;
}
function pushAttribute$1(e, n, r) {
  switch (n) {
    case "className":
      pushStringAttribute$1(e, "class", r);
      break;
    case "tabIndex":
      pushStringAttribute$1(e, "tabindex", r);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      pushStringAttribute$1(e, n, r);
      break;
    case "style":
      pushStyleAttribute$1(e, r);
      break;
    case "src":
    case "href":
      if ("" === r) break;
    case "action":
    case "formAction":
      if (null == r || "function" == typeof r || "symbol" == typeof r || "boolean" == typeof r) break;
      r = sanitizeURL$1("" + r), e.push(sd, stringToChunk(n), id, stringToChunk(escapeTextForBrowser$1(r)), cd);
      break;
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "ref":
      break;
    case "autoFocus":
    case "multiple":
    case "muted":
      pushBooleanAttribute$1(e, n.toLowerCase(), r);
      break;
    case "xlinkHref":
      if ("function" == typeof r || "symbol" == typeof r || "boolean" == typeof r) break;
      r = sanitizeURL$1("" + r), e.push(sd, stringToChunk("xlink:href"), id, stringToChunk(escapeTextForBrowser$1(r)), cd);
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      "function" != typeof r && "symbol" != typeof r && e.push(sd, stringToChunk(n), id, stringToChunk(escapeTextForBrowser$1(r)), cd);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      r && "function" != typeof r && "symbol" != typeof r && e.push(sd, stringToChunk(n), ld);
      break;
    case "capture":
    case "download":
      true === r ? e.push(sd, stringToChunk(n), ld) : false !== r && "function" != typeof r && "symbol" != typeof r && e.push(sd, stringToChunk(n), id, stringToChunk(escapeTextForBrowser$1(r)), cd);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      "function" != typeof r && "symbol" != typeof r && !isNaN(r) && 1 <= r && e.push(sd, stringToChunk(n), id, stringToChunk(escapeTextForBrowser$1(r)), cd);
      break;
    case "rowSpan":
    case "start":
      "function" == typeof r || "symbol" == typeof r || isNaN(r) || e.push(sd, stringToChunk(n), id, stringToChunk(escapeTextForBrowser$1(r)), cd);
      break;
    case "xlinkActuate":
      pushStringAttribute$1(e, "xlink:actuate", r);
      break;
    case "xlinkArcrole":
      pushStringAttribute$1(e, "xlink:arcrole", r);
      break;
    case "xlinkRole":
      pushStringAttribute$1(e, "xlink:role", r);
      break;
    case "xlinkShow":
      pushStringAttribute$1(e, "xlink:show", r);
      break;
    case "xlinkTitle":
      pushStringAttribute$1(e, "xlink:title", r);
      break;
    case "xlinkType":
      pushStringAttribute$1(e, "xlink:type", r);
      break;
    case "xmlBase":
      pushStringAttribute$1(e, "xml:base", r);
      break;
    case "xmlLang":
      pushStringAttribute$1(e, "xml:lang", r);
      break;
    case "xmlSpace":
      pushStringAttribute$1(e, "xml:space", r);
      break;
    default:
      if ((!(2 < n.length) || "o" !== n[0] && "O" !== n[0] || "n" !== n[1] && "N" !== n[1]) && isAttributeNameSafe$1(n = jp.get(n) || n)) {
        switch (typeof r) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            var a = n.toLowerCase().slice(0, 5);
            if ("data-" !== a && "aria-" !== a) return;
        }
        e.push(sd, stringToChunk(n), id, stringToChunk(escapeTextForBrowser$1(r)), cd);
      }
  }
}
var dd = stringToPrecomputedChunk(">"), hd = stringToPrecomputedChunk("/>");
function pushInnerHTML$1(e, n, r) {
  if (null != n) {
    if (null != r) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
    if ("object" != typeof n || !("__html" in n)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
    null != (n = n.__html) && e.push(stringToChunk("" + n));
  }
}
var md = stringToPrecomputedChunk(' selected=""'), fd = stringToPrecomputedChunk(`addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});`);
function injectFormReplayingRuntime$1(e, n) {
  !(16 & e.instructions) && (e.instructions |= 16, n.bootstrapChunks.unshift(n.startInlineScript, fd, Vp));
}
var gd = stringToPrecomputedChunk("<!--F!-->"), vd = stringToPrecomputedChunk("<!--F-->");
function pushLinkImpl$1(e, n) {
  for (var r in e.push(startChunkForTag$1("link")), n) if ($p.call(n, r)) {
    var a = n[r];
    if (null != a) switch (r) {
      case "children":
      case "dangerouslySetInnerHTML":
        throw Error("link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      default:
        pushAttribute$1(e, r, a);
    }
  }
  return e.push(hd), null;
}
var yd = /(<\/|<)(s)(tyle)/gi;
function styleReplacer$1(e, n, r, a) {
  return n + ("s" === r ? "\\73 " : "\\53 ") + a;
}
function pushSelfClosing$1(e, n, r) {
  for (var a in e.push(startChunkForTag$1(r)), n) if ($p.call(n, a)) {
    var o = n[a];
    if (null != o) switch (a) {
      case "children":
      case "dangerouslySetInnerHTML":
        throw Error(r + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      default:
        pushAttribute$1(e, a, o);
    }
  }
  return e.push(hd), null;
}
function pushTitleImpl$1(e, n) {
  e.push(startChunkForTag$1("title"));
  var r, a = null, o = null;
  for (r in n) if ($p.call(n, r)) {
    var s = n[r];
    if (null != s) switch (r) {
      case "children":
        a = s;
        break;
      case "dangerouslySetInnerHTML":
        o = s;
        break;
      default:
        pushAttribute$1(e, r, s);
    }
  }
  return e.push(dd), "function" != typeof (n = Array.isArray(a) ? 2 > a.length ? a[0] : null : a) && "symbol" != typeof n && null != n && e.push(stringToChunk(escapeTextForBrowser$1("" + n))), pushInnerHTML$1(e, o, a), e.push(endChunkForTag$1("title")), null;
}
function pushScriptImpl$1(e, n) {
  e.push(startChunkForTag$1("script"));
  var r, a = null, o = null;
  for (r in n) if ($p.call(n, r)) {
    var s = n[r];
    if (null != s) switch (r) {
      case "children":
        a = s;
        break;
      case "dangerouslySetInnerHTML":
        o = s;
        break;
      default:
        pushAttribute$1(e, r, s);
    }
  }
  return e.push(dd), pushInnerHTML$1(e, o, a), "string" == typeof a && e.push(stringToChunk(("" + a).replace(Yp, scriptReplacer$1))), e.push(endChunkForTag$1("script")), null;
}
function pushStartSingletonElement$1(e, n, r) {
  e.push(startChunkForTag$1(r));
  var a, o = r = null;
  for (a in n) if ($p.call(n, a)) {
    var s = n[a];
    if (null != s) switch (a) {
      case "children":
        r = s;
        break;
      case "dangerouslySetInnerHTML":
        o = s;
        break;
      default:
        pushAttribute$1(e, a, s);
    }
  }
  return e.push(dd), pushInnerHTML$1(e, o, r), r;
}
function pushStartGenericElement$1(e, n, r) {
  e.push(startChunkForTag$1(r));
  var a, o = r = null;
  for (a in n) if ($p.call(n, a)) {
    var s = n[a];
    if (null != s) switch (a) {
      case "children":
        r = s;
        break;
      case "dangerouslySetInnerHTML":
        o = s;
        break;
      default:
        pushAttribute$1(e, a, s);
    }
  }
  return e.push(dd), pushInnerHTML$1(e, o, r), "string" == typeof r ? (e.push(stringToChunk(escapeTextForBrowser$1(r))), null) : r;
}
var bd = stringToPrecomputedChunk("\n"), xd = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, Sd = /* @__PURE__ */ new Map();
function startChunkForTag$1(e) {
  var n = Sd.get(e);
  if (void 0 === n) {
    if (!xd.test(e)) throw Error("Invalid tag: " + e);
    n = stringToPrecomputedChunk("<" + e), Sd.set(e, n);
  }
  return n;
}
var kd = stringToPrecomputedChunk("<!DOCTYPE html>");
function pushStartInstance$1(e, n, r, a, o, s, i, c, l, u) {
  switch (n) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "g":
    case "p":
    case "li":
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      break;
    case "a":
      e.push(startChunkForTag$1("a"));
      var p, h = null, g = null;
      for (p in r) if ($p.call(r, p)) {
        var v = r[p];
        if (null != v) switch (p) {
          case "children":
            h = v;
            break;
          case "dangerouslySetInnerHTML":
            g = v;
            break;
          case "href":
            "" === v ? pushStringAttribute$1(e, "href", "") : pushAttribute$1(e, p, v);
            break;
          default:
            pushAttribute$1(e, p, v);
        }
      }
      if (e.push(dd), pushInnerHTML$1(e, g, h), "string" == typeof h) {
        e.push(stringToChunk(escapeTextForBrowser$1(h)));
        var y = null;
      } else y = h;
      return y;
    case "select":
      e.push(startChunkForTag$1("select"));
      var b2, k = null, C = null;
      for (b2 in r) if ($p.call(r, b2)) {
        var R2 = r[b2];
        if (null != R2) switch (b2) {
          case "children":
            k = R2;
            break;
          case "dangerouslySetInnerHTML":
            C = R2;
            break;
          case "defaultValue":
          case "value":
            break;
          default:
            pushAttribute$1(e, b2, R2);
        }
      }
      return e.push(dd), pushInnerHTML$1(e, C, k), k;
    case "option":
      var P2 = c.selectedValue;
      e.push(startChunkForTag$1("option"));
      var T, E2 = null, $2 = null, F = null, A = null;
      for (T in r) if ($p.call(r, T)) {
        var O = r[T];
        if (null != O) switch (T) {
          case "children":
            E2 = O;
            break;
          case "selected":
            F = O;
            break;
          case "dangerouslySetInnerHTML":
            A = O;
            break;
          case "value":
            $2 = O;
          default:
            pushAttribute$1(e, T, O);
        }
      }
      if (null != P2) {
        var I2 = null !== $2 ? "" + $2 : function(e2) {
          var n2 = "";
          return tp.Children.forEach(e2, function(e3) {
            null != e3 && (n2 += e3);
          }), n2;
        }(E2);
        if (kp(P2)) {
          for (var N2 = 0; N2 < P2.length; N2++) if ("" + P2[N2] === I2) {
            e.push(md);
            break;
          }
        } else "" + P2 === I2 && e.push(md);
      } else F && e.push(md);
      return e.push(dd), pushInnerHTML$1(e, A, E2), E2;
    case "textarea":
      e.push(startChunkForTag$1("textarea"));
      var D2, B2 = null, q2 = null, H2 = null;
      for (D2 in r) if ($p.call(r, D2)) {
        var V2 = r[D2];
        if (null != V2) switch (D2) {
          case "children":
            H2 = V2;
            break;
          case "value":
            B2 = V2;
            break;
          case "defaultValue":
            q2 = V2;
            break;
          case "dangerouslySetInnerHTML":
            throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
          default:
            pushAttribute$1(e, D2, V2);
        }
      }
      if (null === B2 && null !== q2 && (B2 = q2), e.push(dd), null != H2) {
        if (null != B2) throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
        if (kp(H2)) {
          if (1 < H2.length) throw Error("<textarea> can only have at most one child.");
          B2 = "" + H2[0];
        }
        B2 = "" + H2;
      }
      return "string" == typeof B2 && "\n" === B2[0] && e.push(bd), null !== B2 && e.push(stringToChunk(escapeTextForBrowser$1("" + B2))), null;
    case "input":
      e.push(startChunkForTag$1("input"));
      var W2, G2 = null, Q2 = null, X2 = null, Y2 = null, Z2 = null, ee2 = null, te2 = null, ne2 = null, re2 = null;
      for (W2 in r) if ($p.call(r, W2)) {
        var ae2 = r[W2];
        if (null != ae2) switch (W2) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error("input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
          case "name":
            G2 = ae2;
            break;
          case "formAction":
            Q2 = ae2;
            break;
          case "formEncType":
            X2 = ae2;
            break;
          case "formMethod":
            Y2 = ae2;
            break;
          case "formTarget":
            Z2 = ae2;
            break;
          case "defaultChecked":
            re2 = ae2;
            break;
          case "defaultValue":
            te2 = ae2;
            break;
          case "checked":
            ne2 = ae2;
            break;
          case "value":
            ee2 = ae2;
            break;
          default:
            pushAttribute$1(e, W2, ae2);
        }
      }
      var oe2 = pushFormActionAttribute$1(e, a, o, Q2, X2, Y2, Z2, G2);
      return null !== ne2 ? pushBooleanAttribute$1(e, "checked", ne2) : null !== re2 && pushBooleanAttribute$1(e, "checked", re2), null !== ee2 ? pushAttribute$1(e, "value", ee2) : null !== te2 && pushAttribute$1(e, "value", te2), e.push(hd), null != oe2 && oe2.forEach(pushAdditionalFormField$1, e), null;
    case "button":
      e.push(startChunkForTag$1("button"));
      var ie2, ce2 = null, le2 = null, ue2 = null, pe2 = null, de2 = null, he2 = null, ge2 = null;
      for (ie2 in r) if ($p.call(r, ie2)) {
        var ve2 = r[ie2];
        if (null != ve2) switch (ie2) {
          case "children":
            ce2 = ve2;
            break;
          case "dangerouslySetInnerHTML":
            le2 = ve2;
            break;
          case "name":
            ue2 = ve2;
            break;
          case "formAction":
            pe2 = ve2;
            break;
          case "formEncType":
            de2 = ve2;
            break;
          case "formMethod":
            he2 = ve2;
            break;
          case "formTarget":
            ge2 = ve2;
            break;
          default:
            pushAttribute$1(e, ie2, ve2);
        }
      }
      var ye2 = pushFormActionAttribute$1(e, a, o, pe2, de2, he2, ge2, ue2);
      if (e.push(dd), null != ye2 && ye2.forEach(pushAdditionalFormField$1, e), pushInnerHTML$1(e, le2, ce2), "string" == typeof ce2) {
        e.push(stringToChunk(escapeTextForBrowser$1(ce2)));
        var be2 = null;
      } else be2 = ce2;
      return be2;
    case "form":
      e.push(startChunkForTag$1("form"));
      var xe2, Se2 = null, ke2 = null, we2 = null, Ce2 = null, Re2 = null, Pe2 = null;
      for (xe2 in r) if ($p.call(r, xe2)) {
        var Te2 = r[xe2];
        if (null != Te2) switch (xe2) {
          case "children":
            Se2 = Te2;
            break;
          case "dangerouslySetInnerHTML":
            ke2 = Te2;
            break;
          case "action":
            we2 = Te2;
            break;
          case "encType":
            Ce2 = Te2;
            break;
          case "method":
            Re2 = Te2;
            break;
          case "target":
            Pe2 = Te2;
            break;
          default:
            pushAttribute$1(e, xe2, Te2);
        }
      }
      var Ee2 = null, $e2 = null;
      if ("function" == typeof we2) {
        var Fe2 = getCustomFormFields$1(a, we2);
        null !== Fe2 ? (we2 = Fe2.action || "", Ce2 = Fe2.encType, Re2 = Fe2.method, Pe2 = Fe2.target, Ee2 = Fe2.data, $e2 = Fe2.name) : (e.push(sd, stringToChunk("action"), id, ud, cd), Pe2 = Re2 = Ce2 = we2 = null, injectFormReplayingRuntime$1(a, o));
      }
      if (null != we2 && pushAttribute$1(e, "action", we2), null != Ce2 && pushAttribute$1(e, "encType", Ce2), null != Re2 && pushAttribute$1(e, "method", Re2), null != Pe2 && pushAttribute$1(e, "target", Pe2), e.push(dd), null !== $e2 && (e.push(pd), pushStringAttribute$1(e, "name", $e2), e.push(hd), null != Ee2 && Ee2.forEach(pushAdditionalFormField$1, e)), pushInnerHTML$1(e, ke2, Se2), "string" == typeof Se2) {
        e.push(stringToChunk(escapeTextForBrowser$1(Se2)));
        var _e2 = null;
      } else _e2 = Se2;
      return _e2;
    case "menuitem":
      for (var Ae2 in e.push(startChunkForTag$1("menuitem")), r) if ($p.call(r, Ae2)) {
        var Oe2 = r[Ae2];
        if (null != Oe2) switch (Ae2) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error("menuitems cannot have `children` nor `dangerouslySetInnerHTML`.");
          default:
            pushAttribute$1(e, Ae2, Oe2);
        }
      }
      return e.push(dd), null;
    case "object":
      e.push(startChunkForTag$1("object"));
      var Ie2, Me2 = null, Ne2 = null;
      for (Ie2 in r) if ($p.call(r, Ie2)) {
        var De2 = r[Ie2];
        if (null != De2) switch (Ie2) {
          case "children":
            Me2 = De2;
            break;
          case "dangerouslySetInnerHTML":
            Ne2 = De2;
            break;
          case "data":
            var Be2 = sanitizeURL$1("" + De2);
            if ("" === Be2) break;
            e.push(sd, stringToChunk("data"), id, stringToChunk(escapeTextForBrowser$1(Be2)), cd);
            break;
          default:
            pushAttribute$1(e, Ie2, De2);
        }
      }
      if (e.push(dd), pushInnerHTML$1(e, Ne2, Me2), "string" == typeof Me2) {
        e.push(stringToChunk(escapeTextForBrowser$1(Me2)));
        var ze2 = null;
      } else ze2 = Me2;
      return ze2;
    case "title":
      if (4 === c.insertionMode || 1 & c.tagScope || null != r.itemProp) var qe2 = pushTitleImpl$1(e, r);
      else u ? qe2 = null : (pushTitleImpl$1(o.hoistableChunks, r), qe2 = void 0);
      return qe2;
    case "link":
      var He2 = r.rel, Ue2 = r.href, Ve2 = r.precedence;
      if (4 === c.insertionMode || 1 & c.tagScope || null != r.itemProp || "string" != typeof He2 || "string" != typeof Ue2 || "" === Ue2) {
        pushLinkImpl$1(e, r);
        var We2 = null;
      } else if ("stylesheet" === r.rel) if ("string" != typeof Ve2 || null != r.disabled || r.onLoad || r.onError) We2 = pushLinkImpl$1(e, r);
      else {
        var Ke2 = o.styles.get(Ve2), Ge2 = a.styleResources.hasOwnProperty(Ue2) ? a.styleResources[Ue2] : void 0;
        if (null !== Ge2) {
          a.styleResources[Ue2] = null, Ke2 || (Ke2 = { precedence: stringToChunk(escapeTextForBrowser$1(Ve2)), rules: [], hrefs: [], sheets: /* @__PURE__ */ new Map() }, o.styles.set(Ve2, Ke2));
          var Qe2 = { state: 0, props: Ep({}, r, { "data-precedence": r.precedence, precedence: null }) };
          if (Ge2) {
            2 === Ge2.length && adoptPreloadCredentials$1(Qe2.props, Ge2);
            var Je2 = o.preloads.stylesheets.get(Ue2);
            Je2 && 0 < Je2.length ? Je2.length = 0 : Qe2.state = 1;
          }
          Ke2.sheets.set(Ue2, Qe2), i && i.stylesheets.add(Qe2);
        } else if (Ke2) {
          var Xe2 = Ke2.sheets.get(Ue2);
          Xe2 && i && i.stylesheets.add(Xe2);
        }
        l && e.push(td), We2 = null;
      }
      else r.onLoad || r.onError ? We2 = pushLinkImpl$1(e, r) : (l && e.push(td), We2 = u ? null : pushLinkImpl$1(o.hoistableChunks, r));
      return We2;
    case "script":
      var Ze2 = r.async;
      if ("string" != typeof r.src || !r.src || !Ze2 || "function" == typeof Ze2 || "symbol" == typeof Ze2 || r.onLoad || r.onError || 4 === c.insertionMode || 1 & c.tagScope || null != r.itemProp) var et2 = pushScriptImpl$1(e, r);
      else {
        var tt2 = r.src;
        if ("module" === r.type) var nt2 = a.moduleScriptResources, rt2 = o.preloads.moduleScripts;
        else nt2 = a.scriptResources, rt2 = o.preloads.scripts;
        var at2 = nt2.hasOwnProperty(tt2) ? nt2[tt2] : void 0;
        if (null !== at2) {
          nt2[tt2] = null;
          var ot2 = r;
          if (at2) {
            2 === at2.length && adoptPreloadCredentials$1(ot2 = Ep({}, r), at2);
            var st2 = rt2.get(tt2);
            st2 && (st2.length = 0);
          }
          var it2 = [];
          o.scripts.add(it2), pushScriptImpl$1(it2, ot2);
        }
        l && e.push(td), et2 = null;
      }
      return et2;
    case "style":
      var ct2 = r.precedence, lt2 = r.href;
      if (4 === c.insertionMode || 1 & c.tagScope || null != r.itemProp || "string" != typeof ct2 || "string" != typeof lt2 || "" === lt2) {
        e.push(startChunkForTag$1("style"));
        var ut2, pt2 = null, dt2 = null;
        for (ut2 in r) if ($p.call(r, ut2)) {
          var ht2 = r[ut2];
          if (null != ht2) switch (ut2) {
            case "children":
              pt2 = ht2;
              break;
            case "dangerouslySetInnerHTML":
              dt2 = ht2;
              break;
            default:
              pushAttribute$1(e, ut2, ht2);
          }
        }
        e.push(dd);
        var mt2 = Array.isArray(pt2) ? 2 > pt2.length ? pt2[0] : null : pt2;
        "function" != typeof mt2 && "symbol" != typeof mt2 && null != mt2 && e.push(stringToChunk(("" + mt2).replace(yd, styleReplacer$1))), pushInnerHTML$1(e, dt2, pt2), e.push(endChunkForTag$1("style"));
        var ft2 = null;
      } else {
        var gt2 = o.styles.get(ct2);
        if (null !== (a.styleResources.hasOwnProperty(lt2) ? a.styleResources[lt2] : void 0)) {
          a.styleResources[lt2] = null, gt2 ? gt2.hrefs.push(stringToChunk(escapeTextForBrowser$1(lt2))) : (gt2 = { precedence: stringToChunk(escapeTextForBrowser$1(ct2)), rules: [], hrefs: [stringToChunk(escapeTextForBrowser$1(lt2))], sheets: /* @__PURE__ */ new Map() }, o.styles.set(ct2, gt2));
          var vt2, yt2 = gt2.rules, bt2 = null, xt2 = null;
          for (vt2 in r) if ($p.call(r, vt2)) {
            var St2 = r[vt2];
            if (null != St2) switch (vt2) {
              case "children":
                bt2 = St2;
                break;
              case "dangerouslySetInnerHTML":
                xt2 = St2;
            }
          }
          var kt2 = Array.isArray(bt2) ? 2 > bt2.length ? bt2[0] : null : bt2;
          "function" != typeof kt2 && "symbol" != typeof kt2 && null != kt2 && yt2.push(stringToChunk(("" + kt2).replace(yd, styleReplacer$1))), pushInnerHTML$1(yt2, xt2, bt2);
        }
        gt2 && i && i.styles.add(gt2), l && e.push(td), ft2 = void 0;
      }
      return ft2;
    case "meta":
      if (4 === c.insertionMode || 1 & c.tagScope || null != r.itemProp) var wt2 = pushSelfClosing$1(e, r, "meta");
      else l && e.push(td), wt2 = u ? null : "string" == typeof r.charSet ? pushSelfClosing$1(o.charsetChunks, r, "meta") : "viewport" === r.name ? pushSelfClosing$1(o.viewportChunks, r, "meta") : pushSelfClosing$1(o.hoistableChunks, r, "meta");
      return wt2;
    case "listing":
    case "pre":
      e.push(startChunkForTag$1(n));
      var Ct2, Rt2 = null, Pt2 = null;
      for (Ct2 in r) if ($p.call(r, Ct2)) {
        var Tt2 = r[Ct2];
        if (null != Tt2) switch (Ct2) {
          case "children":
            Rt2 = Tt2;
            break;
          case "dangerouslySetInnerHTML":
            Pt2 = Tt2;
            break;
          default:
            pushAttribute$1(e, Ct2, Tt2);
        }
      }
      if (e.push(dd), null != Pt2) {
        if (null != Rt2) throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if ("object" != typeof Pt2 || !("__html" in Pt2)) throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information.");
        var Et2 = Pt2.__html;
        null != Et2 && ("string" == typeof Et2 && 0 < Et2.length && "\n" === Et2[0] ? e.push(bd, stringToChunk(Et2)) : e.push(stringToChunk("" + Et2)));
      }
      return "string" == typeof Rt2 && "\n" === Rt2[0] && e.push(bd), Rt2;
    case "img":
      var $t2 = r.src, Ft2 = r.srcSet;
      if (!("lazy" === r.loading || !$t2 && !Ft2 || "string" != typeof $t2 && null != $t2 || "string" != typeof Ft2 && null != Ft2) && "low" !== r.fetchPriority && false == !!(3 & c.tagScope) && ("string" != typeof $t2 || ":" !== $t2[4] || "d" !== $t2[0] && "D" !== $t2[0] || "a" !== $t2[1] && "A" !== $t2[1] || "t" !== $t2[2] && "T" !== $t2[2] || "a" !== $t2[3] && "A" !== $t2[3]) && ("string" != typeof Ft2 || ":" !== Ft2[4] || "d" !== Ft2[0] && "D" !== Ft2[0] || "a" !== Ft2[1] && "A" !== Ft2[1] || "t" !== Ft2[2] && "T" !== Ft2[2] || "a" !== Ft2[3] && "A" !== Ft2[3])) {
        var _t2 = "string" == typeof r.sizes ? r.sizes : void 0, At2 = Ft2 ? Ft2 + "\n" + (_t2 || "") : $t2, Ot2 = o.preloads.images, jt2 = Ot2.get(At2);
        if (jt2) ("high" === r.fetchPriority || 10 > o.highImagePreloads.size) && (Ot2.delete(At2), o.highImagePreloads.add(jt2));
        else if (!a.imageResources.hasOwnProperty(At2)) {
          a.imageResources[At2] = Hp;
          var It2, Mt2 = r.crossOrigin, Lt2 = "string" == typeof Mt2 ? "use-credentials" === Mt2 ? Mt2 : "" : void 0, Nt2 = o.headers;
          Nt2 && 0 < Nt2.remainingCapacity && "string" != typeof r.srcSet && ("high" === r.fetchPriority || 500 > Nt2.highImagePreloads.length) && (It2 = getPreloadAsHeader$1($t2, "image", { imageSrcSet: r.srcSet, imageSizes: r.sizes, crossOrigin: Lt2, integrity: r.integrity, nonce: r.nonce, type: r.type, fetchPriority: r.fetchPriority, referrerPolicy: r.refererPolicy }), 0 <= (Nt2.remainingCapacity -= It2.length + 2)) ? (o.resets.image[At2] = Hp, Nt2.highImagePreloads && (Nt2.highImagePreloads += ", "), Nt2.highImagePreloads += It2) : (pushLinkImpl$1(jt2 = [], { rel: "preload", as: "image", href: Ft2 ? void 0 : $t2, imageSrcSet: Ft2, imageSizes: _t2, crossOrigin: Lt2, integrity: r.integrity, type: r.type, fetchPriority: r.fetchPriority, referrerPolicy: r.referrerPolicy }), "high" === r.fetchPriority || 10 > o.highImagePreloads.size ? o.highImagePreloads.add(jt2) : (o.bulkPreloads.add(jt2), Ot2.set(At2, jt2)));
        }
      }
      return pushSelfClosing$1(e, r, "img");
    case "base":
    case "area":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "param":
    case "source":
    case "track":
    case "wbr":
      return pushSelfClosing$1(e, r, n);
    case "head":
      if (2 > c.insertionMode) {
        var Dt2 = s || o.preamble;
        if (Dt2.headChunks) throw Error("The `<head>` tag may only be rendered once.");
        Dt2.headChunks = [];
        var Bt2 = pushStartSingletonElement$1(Dt2.headChunks, r, "head");
      } else Bt2 = pushStartGenericElement$1(e, r, "head");
      return Bt2;
    case "body":
      if (2 > c.insertionMode) {
        var zt2 = s || o.preamble;
        if (zt2.bodyChunks) throw Error("The `<body>` tag may only be rendered once.");
        zt2.bodyChunks = [];
        var qt2 = pushStartSingletonElement$1(zt2.bodyChunks, r, "body");
      } else qt2 = pushStartGenericElement$1(e, r, "body");
      return qt2;
    case "html":
      if (0 === c.insertionMode) {
        var Ht2 = s || o.preamble;
        if (Ht2.htmlChunks) throw Error("The `<html>` tag may only be rendered once.");
        Ht2.htmlChunks = [kd];
        var Ut2 = pushStartSingletonElement$1(Ht2.htmlChunks, r, "html");
      } else Ut2 = pushStartGenericElement$1(e, r, "html");
      return Ut2;
    default:
      if (-1 !== n.indexOf("-")) {
        e.push(startChunkForTag$1(n));
        var Vt2, Wt2 = null, Kt2 = null;
        for (Vt2 in r) if ($p.call(r, Vt2)) {
          var Gt2 = r[Vt2];
          if (null != Gt2) {
            var Qt2 = Vt2;
            switch (Vt2) {
              case "children":
                Wt2 = Gt2;
                break;
              case "dangerouslySetInnerHTML":
                Kt2 = Gt2;
                break;
              case "style":
                pushStyleAttribute$1(e, Gt2);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
              case "ref":
                break;
              case "className":
                Qt2 = "class";
              default:
                if (isAttributeNameSafe$1(Vt2) && "function" != typeof Gt2 && "symbol" != typeof Gt2 && false !== Gt2) {
                  if (true === Gt2) Gt2 = "";
                  else if ("object" == typeof Gt2) continue;
                  e.push(sd, stringToChunk(Qt2), id, stringToChunk(escapeTextForBrowser$1(Gt2)), cd);
                }
            }
          }
        }
        return e.push(dd), pushInnerHTML$1(e, Kt2, Wt2), Wt2;
      }
  }
  return pushStartGenericElement$1(e, r, n);
}
var wd = /* @__PURE__ */ new Map();
function endChunkForTag$1(e) {
  var n = wd.get(e);
  return void 0 === n && (n = stringToPrecomputedChunk("</" + e + ">"), wd.set(e, n)), n;
}
function hoistPreambleState$1(e, n) {
  null === (e = e.preamble).htmlChunks && n.htmlChunks && (e.htmlChunks = n.htmlChunks, n.contribution |= 1), null === e.headChunks && n.headChunks && (e.headChunks = n.headChunks, n.contribution |= 4), null === e.bodyChunks && n.bodyChunks && (e.bodyChunks = n.bodyChunks, n.contribution |= 2);
}
function writeBootstrap$1(e, n) {
  n = n.bootstrapChunks;
  for (var r = 0; r < n.length - 1; r++) writeChunk(e, n[r]);
  return !(r < n.length) || (r = n[r], n.length = 0, writeChunkAndReturn(e, r));
}
var Cd = stringToPrecomputedChunk('<template id="'), Rd = stringToPrecomputedChunk('"></template>'), Pd = stringToPrecomputedChunk("<!--$-->"), Td = stringToPrecomputedChunk('<!--$?--><template id="'), Ed = stringToPrecomputedChunk('"></template>'), $d = stringToPrecomputedChunk("<!--$!-->"), Fd = stringToPrecomputedChunk("<!--/$-->"), _d = stringToPrecomputedChunk("<template"), Ad = stringToPrecomputedChunk('"'), Od = stringToPrecomputedChunk(' data-dgst="');
stringToPrecomputedChunk(' data-msg="'), stringToPrecomputedChunk(' data-stck="'), stringToPrecomputedChunk(' data-cstck="');
var jd = stringToPrecomputedChunk("></template>");
function writeStartPendingSuspenseBoundary$1(e, n, r) {
  if (writeChunk(e, Td), null === r) throw Error("An ID must have been assigned before we can complete the boundary.");
  return writeChunk(e, n.boundaryPrefix), writeChunk(e, stringToChunk(r.toString(16))), writeChunkAndReturn(e, Ed);
}
var Id = stringToPrecomputedChunk("<!--"), Md = stringToPrecomputedChunk("-->");
function writePreambleContribution$1(e, n) {
  0 !== (n = n.contribution) && (writeChunk(e, Id), writeChunk(e, stringToChunk("" + n)), writeChunk(e, Md));
}
var Ld = stringToPrecomputedChunk('<div hidden id="'), Nd = stringToPrecomputedChunk('">'), Dd = stringToPrecomputedChunk("</div>"), Bd = stringToPrecomputedChunk('<svg aria-hidden="true" style="display:none" id="'), zd = stringToPrecomputedChunk('">'), qd = stringToPrecomputedChunk("</svg>"), Hd = stringToPrecomputedChunk('<math aria-hidden="true" style="display:none" id="'), Ud = stringToPrecomputedChunk('">'), Vd = stringToPrecomputedChunk("</math>"), Wd = stringToPrecomputedChunk('<table hidden id="'), Kd = stringToPrecomputedChunk('">'), Gd = stringToPrecomputedChunk("</table>"), Qd = stringToPrecomputedChunk('<table hidden><tbody id="'), Jd = stringToPrecomputedChunk('">'), Xd = stringToPrecomputedChunk("</tbody></table>"), Yd = stringToPrecomputedChunk('<table hidden><tr id="'), Zd = stringToPrecomputedChunk('">'), eh = stringToPrecomputedChunk("</tr></table>"), th = stringToPrecomputedChunk('<table hidden><colgroup id="'), nh = stringToPrecomputedChunk('">'), rh = stringToPrecomputedChunk("</colgroup></table>");
var ah = stringToPrecomputedChunk('$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'), oh = stringToPrecomputedChunk('$RS("'), sh = stringToPrecomputedChunk('","'), ih = stringToPrecomputedChunk('")<\/script>');
stringToPrecomputedChunk('<template data-rsi="" data-sid="'), stringToPrecomputedChunk('" data-pid="');
var ch = stringToPrecomputedChunk('$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RC("'), lh = stringToPrecomputedChunk('$RC("'), uh = stringToPrecomputedChunk('$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RM=new Map;\n$RR=function(t,u,y){function v(n){this._p=null;n()}for(var w=$RC,p=$RM,q=new Map,r=document,g,b,h=r.querySelectorAll("link[data-precedence],style[data-precedence]"),x=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?x.push(b):("LINK"===b.tagName&&p.set(b.getAttribute("href"),b),q.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var e=y[b++];if(!e){k=!1;b=0;continue}var c=!1,m=0;var d=e[m++];if(a=p.get(d)){var f=a._p;c=!0}else{a=r.createElement("link");a.href=\nd;a.rel="stylesheet";for(a.dataset.precedence=l=e[m++];f=e[m++];)a.setAttribute(f,e[m++]);f=a._p=new Promise(function(n,z){a.onload=v.bind(a,n);a.onerror=v.bind(a,z)});p.set(d,a)}d=a.getAttribute("media");!f||d&&!matchMedia(d).matches||h.push(f);if(c)continue}else{a=x[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=q.get(l)||g;c===g&&(g=a);q.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=r.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(w.bind(null,\nt,u,""),w.bind(null,t,u,"Resource failed to load"))};$RR("'), ph = stringToPrecomputedChunk('$RM=new Map;\n$RR=function(t,u,y){function v(n){this._p=null;n()}for(var w=$RC,p=$RM,q=new Map,r=document,g,b,h=r.querySelectorAll("link[data-precedence],style[data-precedence]"),x=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?x.push(b):("LINK"===b.tagName&&p.set(b.getAttribute("href"),b),q.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var e=y[b++];if(!e){k=!1;b=0;continue}var c=!1,m=0;var d=e[m++];if(a=p.get(d)){var f=a._p;c=!0}else{a=r.createElement("link");a.href=\nd;a.rel="stylesheet";for(a.dataset.precedence=l=e[m++];f=e[m++];)a.setAttribute(f,e[m++]);f=a._p=new Promise(function(n,z){a.onload=v.bind(a,n);a.onerror=v.bind(a,z)});p.set(d,a)}d=a.getAttribute("media");!f||d&&!matchMedia(d).matches||h.push(f);if(c)continue}else{a=x[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=q.get(l)||g;c===g&&(g=a);q.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=r.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(w.bind(null,\nt,u,""),w.bind(null,t,u,"Resource failed to load"))};$RR("'), dh = stringToPrecomputedChunk('$RR("'), hh = stringToPrecomputedChunk('","'), mh = stringToPrecomputedChunk('",'), fh = stringToPrecomputedChunk('"'), gh = stringToPrecomputedChunk(")<\/script>");
stringToPrecomputedChunk('<template data-rci="" data-bid="'), stringToPrecomputedChunk('<template data-rri="" data-bid="'), stringToPrecomputedChunk('" data-sid="'), stringToPrecomputedChunk('" data-sty="');
var vh = stringToPrecomputedChunk('$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("'), yh = stringToPrecomputedChunk('$RX("'), bh = stringToPrecomputedChunk('"'), xh = stringToPrecomputedChunk(","), Sh = stringToPrecomputedChunk(")<\/script>");
stringToPrecomputedChunk('<template data-rxi="" data-bid="'), stringToPrecomputedChunk('" data-dgst="'), stringToPrecomputedChunk('" data-msg="'), stringToPrecomputedChunk('" data-stck="'), stringToPrecomputedChunk('" data-cstck="');
var kh = /[<\u2028\u2029]/g;
function escapeJSStringsForInstructionScripts$1(e) {
  return JSON.stringify(e).replace(kh, function(e2) {
    switch (e2) {
      case "<":
        return "\\u003c";
      case "\u2028":
        return "\\u2028";
      case "\u2029":
        return "\\u2029";
      default:
        throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
    }
  });
}
var wh = /[&><\u2028\u2029]/g;
function escapeJSObjectForInstructionScripts$1(e) {
  return JSON.stringify(e).replace(wh, function(e2) {
    switch (e2) {
      case "&":
        return "\\u0026";
      case ">":
        return "\\u003e";
      case "<":
        return "\\u003c";
      case "\u2028":
        return "\\u2028";
      case "\u2029":
        return "\\u2029";
      default:
        throw Error("escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
    }
  });
}
var Ch = stringToPrecomputedChunk('<style media="not all" data-precedence="'), Rh = stringToPrecomputedChunk('" data-href="'), Ph = stringToPrecomputedChunk('">'), Th = stringToPrecomputedChunk("</style>"), Eh = false, $h = true;
function flushStyleTagsLateForBoundary$1(e) {
  var n = e.rules, r = e.hrefs, a = 0;
  if (r.length) {
    for (writeChunk(this, Ch), writeChunk(this, e.precedence), writeChunk(this, Rh); a < r.length - 1; a++) writeChunk(this, r[a]), writeChunk(this, Oh);
    for (writeChunk(this, r[a]), writeChunk(this, Ph), a = 0; a < n.length; a++) writeChunk(this, n[a]);
    $h = writeChunkAndReturn(this, Th), Eh = true, n.length = 0, r.length = 0;
  }
}
function hasStylesToHoist$1(e) {
  return 2 !== e.state && (Eh = true);
}
function writeHoistablesForBoundary$1(e, n, r) {
  return Eh = false, $h = true, n.styles.forEach(flushStyleTagsLateForBoundary$1, e), n.stylesheets.forEach(hasStylesToHoist$1), Eh && (r.stylesToHoist = true), $h;
}
function flushResource$1(e) {
  for (var n = 0; n < e.length; n++) writeChunk(this, e[n]);
  e.length = 0;
}
var Fh = [];
function flushStyleInPreamble$1(e) {
  pushLinkImpl$1(Fh, e.props);
  for (var n = 0; n < Fh.length; n++) writeChunk(this, Fh[n]);
  Fh.length = 0, e.state = 2;
}
var _h = stringToPrecomputedChunk('<style data-precedence="'), Ah = stringToPrecomputedChunk('" data-href="'), Oh = stringToPrecomputedChunk(" "), jh = stringToPrecomputedChunk('">'), Ih = stringToPrecomputedChunk("</style>");
function flushStylesInPreamble$1(e) {
  var n = 0 < e.sheets.size;
  e.sheets.forEach(flushStyleInPreamble$1, this), e.sheets.clear();
  var r = e.rules, a = e.hrefs;
  if (!n || a.length) {
    if (writeChunk(this, _h), writeChunk(this, e.precedence), e = 0, a.length) {
      for (writeChunk(this, Ah); e < a.length - 1; e++) writeChunk(this, a[e]), writeChunk(this, Oh);
      writeChunk(this, a[e]);
    }
    for (writeChunk(this, jh), e = 0; e < r.length; e++) writeChunk(this, r[e]);
    writeChunk(this, Ih), r.length = 0, a.length = 0;
  }
}
function preloadLateStyle$1(e) {
  if (0 === e.state) {
    e.state = 1;
    var n = e.props;
    for (pushLinkImpl$1(Fh, { rel: "preload", as: "style", href: e.props.href, crossOrigin: n.crossOrigin, fetchPriority: n.fetchPriority, integrity: n.integrity, media: n.media, hrefLang: n.hrefLang, referrerPolicy: n.referrerPolicy }), e = 0; e < Fh.length; e++) writeChunk(this, Fh[e]);
    Fh.length = 0;
  }
}
function preloadLateStyles$1(e) {
  e.sheets.forEach(preloadLateStyle$1, this), e.sheets.clear();
}
var Mh = stringToPrecomputedChunk("["), Lh = stringToPrecomputedChunk(",["), Nh = stringToPrecomputedChunk(","), Dh = stringToPrecomputedChunk("]");
function writeStyleResourceAttributeInJS$1(e, n, r) {
  var a = n.toLowerCase();
  switch (typeof r) {
    case "function":
    case "symbol":
      return;
  }
  switch (n) {
    case "innerHTML":
    case "dangerouslySetInnerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "style":
    case "ref":
      return;
    case "className":
      a = "class", n = "" + r;
      break;
    case "hidden":
      if (false === r) return;
      n = "";
      break;
    case "src":
    case "href":
      n = "" + (r = sanitizeURL$1(r));
      break;
    default:
      if (2 < n.length && ("o" === n[0] || "O" === n[0]) && ("n" === n[1] || "N" === n[1]) || !isAttributeNameSafe$1(n)) return;
      n = "" + r;
  }
  writeChunk(e, Nh), writeChunk(e, stringToChunk(escapeJSObjectForInstructionScripts$1(a))), writeChunk(e, Nh), writeChunk(e, stringToChunk(escapeJSObjectForInstructionScripts$1(n)));
}
function createHoistableState$1() {
  return { styles: /* @__PURE__ */ new Set(), stylesheets: /* @__PURE__ */ new Set() };
}
function adoptPreloadCredentials$1(e, n) {
  null == e.crossOrigin && (e.crossOrigin = n[0]), null == e.integrity && (e.integrity = n[1]);
}
function getPreloadAsHeader$1(e, n, r) {
  for (var a in n = "<" + (e = ("" + e).replace(Bh, escapeHrefForLinkHeaderURLContextReplacer$1)) + '>; rel=preload; as="' + (n = ("" + n).replace(zh, escapeStringForLinkHeaderQuotedParamValueContextReplacer$1)) + '"', r) $p.call(r, a) && ("string" == typeof (e = r[a]) && (n += "; " + a.toLowerCase() + '="' + ("" + e).replace(zh, escapeStringForLinkHeaderQuotedParamValueContextReplacer$1) + '"'));
  return n;
}
var Bh = /[<>\r\n]/g;
function escapeHrefForLinkHeaderURLContextReplacer$1(e) {
  switch (e) {
    case "<":
      return "%3C";
    case ">":
      return "%3E";
    case "\n":
      return "%0A";
    case "\r":
      return "%0D";
    default:
      throw Error("escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
  }
}
var zh = /["';,\r\n]/g;
function escapeStringForLinkHeaderQuotedParamValueContextReplacer$1(e) {
  switch (e) {
    case '"':
      return "%22";
    case "'":
      return "%27";
    case ";":
      return "%3B";
    case ",":
      return "%2C";
    case "\n":
      return "%0A";
    case "\r":
      return "%0D";
    default:
      throw Error("escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
  }
}
function hoistStyleQueueDependency$1(e) {
  this.styles.add(e);
}
function hoistStylesheetDependency$1(e) {
  this.stylesheets.add(e);
}
var qh = Function.prototype.bind, Hh = "function" == typeof AsyncLocalStorage, Uh = Hh ? new AsyncLocalStorage() : null, Vh = Symbol.for("react.client.reference");
function getComponentNameFromType$1(e) {
  if (null == e) return null;
  if ("function" == typeof e) return e.$$typeof === Vh ? null : e.displayName || e.name || null;
  if ("string" == typeof e) return e;
  switch (e) {
    case op:
      return "Fragment";
    case ip:
      return "Profiler";
    case sp:
      return "StrictMode";
    case dp:
      return "Suspense";
    case hp:
      return "SuspenseList";
    case vp:
      return "Activity";
  }
  if ("object" == typeof e) switch (e.$$typeof) {
    case ap:
      return "Portal";
    case up:
      return (e.displayName || "Context") + ".Provider";
    case lp:
      return (e._context.displayName || "Context") + ".Consumer";
    case pp:
      var n = e.render;
      return (e = e.displayName) || (e = "" !== (e = n.displayName || n.name || "") ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case mp:
      return null !== (n = e.displayName || null) ? n : getComponentNameFromType$1(e.type) || "Memo";
    case fp:
      n = e._payload, e = e._init;
      try {
        return getComponentNameFromType$1(e(n));
      } catch (e2) {
      }
  }
  return null;
}
var Wh = {}, Kh = null;
function popToNearestCommonAncestor$1(e, n) {
  if (e !== n) {
    e.context._currentValue = e.parentValue, e = e.parent;
    var r = n.parent;
    if (null === e) {
      if (null !== r) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
    } else {
      if (null === r) throw Error("The stacks must reach the root at the same time. This is a bug in React.");
      popToNearestCommonAncestor$1(e, r);
    }
    n.context._currentValue = n.value;
  }
}
function popAllPrevious$1(e) {
  e.context._currentValue = e.parentValue, null !== (e = e.parent) && popAllPrevious$1(e);
}
function pushAllNext$1(e) {
  var n = e.parent;
  null !== n && pushAllNext$1(n), e.context._currentValue = e.value;
}
function popPreviousToCommonLevel$1(e, n) {
  if (e.context._currentValue = e.parentValue, null === (e = e.parent)) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
  e.depth === n.depth ? popToNearestCommonAncestor$1(e, n) : popPreviousToCommonLevel$1(e, n);
}
function popNextToCommonLevel$1(e, n) {
  var r = n.parent;
  if (null === r) throw Error("The depth must equal at least at zero before reaching the root. This is a bug in React.");
  e.depth === r.depth ? popToNearestCommonAncestor$1(e, r) : popNextToCommonLevel$1(e, r), n.context._currentValue = n.value;
}
function switchContext$1(e) {
  var n = Kh;
  n !== e && (null === n ? pushAllNext$1(e) : null === e ? popAllPrevious$1(n) : n.depth === e.depth ? popToNearestCommonAncestor$1(n, e) : n.depth > e.depth ? popPreviousToCommonLevel$1(n, e) : popNextToCommonLevel$1(n, e), Kh = e);
}
var Gh = { enqueueSetState: function(e, n) {
  null !== (e = e._reactInternals).queue && e.queue.push(n);
}, enqueueReplaceState: function(e, n) {
  (e = e._reactInternals).replace = true, e.queue = [n];
}, enqueueForceUpdate: function() {
} }, Qh = { id: 1, overflow: "" };
function pushTreeContext$1(e, n, r) {
  var a = e.id;
  e = e.overflow;
  var o = 32 - Jh(a) - 1;
  a &= ~(1 << o), r += 1;
  var s = 32 - Jh(n) + o;
  if (30 < s) {
    var i = o - o % 5;
    return s = (a & (1 << i) - 1).toString(32), a >>= i, o -= i, { id: 1 << 32 - Jh(n) + o | r << o | a, overflow: s + e };
  }
  return { id: 1 << s | r << o | a, overflow: e };
}
var Jh = Math.clz32 ? Math.clz32 : function(e) {
  return e >>>= 0, 0 === e ? 32 : 31 - (Xh(e) / Yh | 0) | 0;
}, Xh = Math.log, Yh = Math.LN2;
var Zh = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`.");
function noop$2$1() {
}
var em = null;
function getSuspendedThenable$1() {
  if (null === em) throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
  var e = em;
  return em = null, e;
}
var tm = "function" == typeof Object.is ? Object.is : function(e, n) {
  return e === n && (0 !== e || 1 / e == 1 / n) || e != e && n != n;
}, nm = null, rm = null, am = null, om = null, sm = null, im = null, cm = false, lm = false, um = 0, pm = 0, dm = -1, hm = 0, mm = null, fm = null, gm = 0;
function resolveCurrentlyRenderingComponent$1() {
  if (null === nm) throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
  return nm;
}
function createHook$1() {
  if (0 < gm) throw Error("Rendered more hooks than during the previous render");
  return { memoizedState: null, queue: null, next: null };
}
function createWorkInProgressHook$1() {
  return null === im ? null === sm ? (cm = false, sm = im = createHook$1()) : (cm = true, im = sm) : null === im.next ? (cm = false, im = im.next = createHook$1()) : (cm = true, im = im.next), im;
}
function getThenableStateAfterSuspending$1() {
  var e = mm;
  return mm = null, e;
}
function resetHooksState$1() {
  om = am = rm = nm = null, lm = false, sm = null, gm = 0, im = fm = null;
}
function basicStateReducer$1(e, n) {
  return "function" == typeof n ? n(e) : n;
}
function useReducer$1(e, n, r) {
  if (nm = resolveCurrentlyRenderingComponent$1(), im = createWorkInProgressHook$1(), cm) {
    var a = im.queue;
    if (n = a.dispatch, null !== fm && void 0 !== (r = fm.get(a))) {
      fm.delete(a), a = im.memoizedState;
      do {
        a = e(a, r.action), r = r.next;
      } while (null !== r);
      return im.memoizedState = a, [a, n];
    }
    return [im.memoizedState, n];
  }
  return e = e === basicStateReducer$1 ? "function" == typeof n ? n() : n : void 0 !== r ? r(n) : n, im.memoizedState = e, e = (e = im.queue = { last: null, dispatch: null }).dispatch = dispatchAction$1.bind(null, nm, e), [im.memoizedState, e];
}
function useMemo$1(e, n) {
  if (nm = resolveCurrentlyRenderingComponent$1(), n = void 0 === n ? null : n, null !== (im = createWorkInProgressHook$1())) {
    var r = im.memoizedState;
    if (null !== r && null !== n) {
      var a = r[1];
      e: if (null === a) a = false;
      else {
        for (var o = 0; o < a.length && o < n.length; o++) if (!tm(n[o], a[o])) {
          a = false;
          break e;
        }
        a = true;
      }
      if (a) return r[0];
    }
  }
  return e = e(), im.memoizedState = [e, n], e;
}
function dispatchAction$1(e, n, r) {
  if (25 <= gm) throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
  if (e === nm) if (lm = true, e = { action: r, next: null }, null === fm && (fm = /* @__PURE__ */ new Map()), void 0 === (r = fm.get(n))) fm.set(n, e);
  else {
    for (n = r; null !== n.next; ) n = n.next;
    n.next = e;
  }
}
function unsupportedStartTransition$1() {
  throw Error("startTransition cannot be called during server rendering.");
}
function unsupportedSetOptimisticState$1() {
  throw Error("Cannot update optimistic state while rendering.");
}
function useActionState$1(e, n, r) {
  resolveCurrentlyRenderingComponent$1();
  var a = pm++, o = am;
  if ("function" == typeof e.$$FORM_ACTION) {
    var s = null, i = om;
    o = o.formState;
    var c = e.$$IS_SIGNATURE_EQUAL;
    if (null !== o && "function" == typeof c) {
      var l = o[1];
      c.call(e, o[2], o[3]) && (l === (s = void 0 !== r ? "p" + r : "k" + murmurhash3_32_gc$1(JSON.stringify([i, null, a]), 0)) && (dm = a, n = o[0]));
    }
    var u = e.bind(null, n);
    return e = function(e2) {
      u(e2);
    }, "function" == typeof u.$$FORM_ACTION && (e.$$FORM_ACTION = function(e2) {
      e2 = u.$$FORM_ACTION(e2), void 0 !== r && (r += "", e2.action = r);
      var n2 = e2.data;
      return n2 && (null === s && (s = void 0 !== r ? "p" + r : "k" + murmurhash3_32_gc$1(JSON.stringify([i, null, a]), 0)), n2.append("$ACTION_KEY", s)), e2;
    }), [n, e, false];
  }
  var p = e.bind(null, n);
  return [n, function(e2) {
    p(e2);
  }, false];
}
function unwrapThenable$1(e) {
  var n = hm;
  return hm += 1, null === mm && (mm = []), function(e2, n2, r) {
    switch (void 0 === (r = e2[r]) ? e2.push(n2) : r !== n2 && (n2.then(noop$2$1, noop$2$1), n2 = r), n2.status) {
      case "fulfilled":
        return n2.value;
      case "rejected":
        throw n2.reason;
      default:
        switch ("string" == typeof n2.status ? n2.then(noop$2$1, noop$2$1) : ((e2 = n2).status = "pending", e2.then(function(e3) {
          if ("pending" === n2.status) {
            var r2 = n2;
            r2.status = "fulfilled", r2.value = e3;
          }
        }, function(e3) {
          if ("pending" === n2.status) {
            var r2 = n2;
            r2.status = "rejected", r2.reason = e3;
          }
        })), n2.status) {
          case "fulfilled":
            return n2.value;
          case "rejected":
            throw n2.reason;
        }
        throw em = n2, Zh;
    }
  }(mm, e, n);
}
function unsupportedRefresh$1() {
  throw Error("Cache cannot be refreshed during server rendering.");
}
function noop$1$1() {
}
var vm, ym, bm = { readContext: function(e) {
  return e._currentValue;
}, use: function(e) {
  if (null !== e && "object" == typeof e) {
    if ("function" == typeof e.then) return unwrapThenable$1(e);
    if (e.$$typeof === up) return e._currentValue;
  }
  throw Error("An unsupported type was passed to use(): " + String(e));
}, useContext: function(e) {
  return resolveCurrentlyRenderingComponent$1(), e._currentValue;
}, useMemo: useMemo$1, useReducer: useReducer$1, useRef: function(e) {
  nm = resolveCurrentlyRenderingComponent$1();
  var n = (im = createWorkInProgressHook$1()).memoizedState;
  return null === n ? (e = { current: e }, im.memoizedState = e) : n;
}, useState: function(e) {
  return useReducer$1(basicStateReducer$1, e);
}, useInsertionEffect: noop$1$1, useLayoutEffect: noop$1$1, useCallback: function(e, n) {
  return useMemo$1(function() {
    return e;
  }, n);
}, useImperativeHandle: noop$1$1, useEffect: noop$1$1, useDebugValue: noop$1$1, useDeferredValue: function(e, n) {
  return resolveCurrentlyRenderingComponent$1(), void 0 !== n ? n : e;
}, useTransition: function() {
  return resolveCurrentlyRenderingComponent$1(), [false, unsupportedStartTransition$1];
}, useId: function() {
  var e = rm.treeContext, n = e.overflow;
  e = ((e = e.id) & ~(1 << 32 - Jh(e) - 1)).toString(32) + n;
  var r = xm;
  if (null === r) throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component.");
  return n = um++, e = "«" + r.idPrefix + "R" + e, 0 < n && (e += "H" + n.toString(32)), e + "»";
}, useSyncExternalStore: function(e, n, r) {
  if (void 0 === r) throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
  return r();
}, useOptimistic: function(e) {
  return resolveCurrentlyRenderingComponent$1(), [e, unsupportedSetOptimisticState$1];
}, useActionState: useActionState$1, useFormState: useActionState$1, useHostTransitionStatus: function() {
  return resolveCurrentlyRenderingComponent$1(), zp;
}, useMemoCache: function(e) {
  for (var n = Array(e), r = 0; r < e; r++) n[r] = bp;
  return n;
}, useCacheRefresh: function() {
  return unsupportedRefresh$1;
} }, xm = null, Sm = { getCacheForType: function() {
  throw Error("Not implemented.");
} };
function prepareStackTrace(e, n) {
  e = (e.name || "Error") + ": " + (e.message || "");
  for (var r = 0; r < n.length; r++) e += "\n    at " + n[r].toString();
  return e;
}
function describeBuiltInComponentFrame$1(e) {
  if (void 0 === vm) try {
    throw Error();
  } catch (e2) {
    var n = e2.stack.trim().match(/\n( *(at )?)/);
    vm = n && n[1] || "", ym = -1 < e2.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e2.stack.indexOf("@") ? "@unknown:0:0" : "";
  }
  return "\n" + vm + e + ym;
}
var km = false;
function describeNativeComponentFrame$1(e, n) {
  if (!e || km) return "";
  km = true;
  var r = Error.prepareStackTrace;
  Error.prepareStackTrace = prepareStackTrace;
  try {
    var a = { DetermineComponentFrameRoot: function() {
      try {
        if (n) {
          var Fake = function() {
            throw Error();
          };
          if (Object.defineProperty(Fake.prototype, "props", { set: function() {
            throw Error();
          } }), "object" == typeof Reflect && Reflect.construct) {
            try {
              Reflect.construct(Fake, []);
            } catch (e2) {
              var r2 = e2;
            }
            Reflect.construct(e, [], Fake);
          } else {
            try {
              Fake.call();
            } catch (e2) {
              r2 = e2;
            }
            e.call(Fake.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (e2) {
            r2 = e2;
          }
          (Fake = e()) && "function" == typeof Fake.catch && Fake.catch(function() {
          });
        }
      } catch (e2) {
        if (e2 && r2 && "string" == typeof e2.stack) return [e2.stack, r2.stack];
      }
      return [null, null];
    } };
    a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var o = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
    o && o.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
    var s = a.DetermineComponentFrameRoot(), i = s[0], c = s[1];
    if (i && c) {
      var l = i.split("\n"), u = c.split("\n");
      for (o = a = 0; a < l.length && !l[a].includes("DetermineComponentFrameRoot"); ) a++;
      for (; o < u.length && !u[o].includes("DetermineComponentFrameRoot"); ) o++;
      if (a === l.length || o === u.length) for (a = l.length - 1, o = u.length - 1; 1 <= a && 0 <= o && l[a] !== u[o]; ) o--;
      for (; 1 <= a && 0 <= o; a--, o--) if (l[a] !== u[o]) {
        if (1 !== a || 1 !== o) do {
          if (a--, 0 > --o || l[a] !== u[o]) {
            var p = "\n" + l[a].replace(" at new ", " at ");
            return e.displayName && p.includes("<anonymous>") && (p = p.replace("<anonymous>", e.displayName)), p;
          }
        } while (1 <= a && 0 <= o);
        break;
      }
    }
  } finally {
    km = false, Error.prepareStackTrace = r;
  }
  return (r = e ? e.displayName || e.name : "") ? describeBuiltInComponentFrame$1(r) : "";
}
function describeComponentStackByType$1(e) {
  if ("string" == typeof e) return describeBuiltInComponentFrame$1(e);
  if ("function" == typeof e) return e.prototype && e.prototype.isReactComponent ? describeNativeComponentFrame$1(e, true) : describeNativeComponentFrame$1(e, false);
  if ("object" == typeof e && null !== e) {
    switch (e.$$typeof) {
      case pp:
        return describeNativeComponentFrame$1(e.render, false);
      case mp:
        return describeNativeComponentFrame$1(e.type, false);
      case fp:
        var n = e, r = n._payload;
        n = n._init;
        try {
          e = n(r);
        } catch (e2) {
          return describeBuiltInComponentFrame$1("Lazy");
        }
        return describeComponentStackByType$1(e);
    }
    if ("string" == typeof e.name) return r = e.env, describeBuiltInComponentFrame$1(e.name + (r ? " [" + r + "]" : ""));
  }
  switch (e) {
    case hp:
      return describeBuiltInComponentFrame$1("SuspenseList");
    case dp:
      return describeBuiltInComponentFrame$1("Suspense");
  }
  return "";
}
function defaultErrorHandler$1(e) {
  if ("object" == typeof e && null !== e && "string" == typeof e.environmentName) {
    var n = e.environmentName;
    "string" == typeof (e = [e].slice(0))[0] ? e.splice(0, 1, "\x1B[0m\x1B[7m%c%s\x1B[0m%c " + e[0], "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", " " + n + " ", "") : e.splice(0, 0, "\x1B[0m\x1B[7m%c%s\x1B[0m%c ", "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", " " + n + " ", ""), e.unshift(console), (n = qh.apply(console.error, e))();
  } else console.error(e);
  return null;
}
function noop$3() {
}
function RequestInstance$1(e, n, r, a, o, s, i, c, l, u, p) {
  var h = /* @__PURE__ */ new Set();
  this.destination = null, this.flushScheduled = false, this.resumableState = e, this.renderState = n, this.rootFormatContext = r, this.progressiveChunkSize = void 0 === a ? 12800 : a, this.status = 10, this.fatalError = null, this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0, this.completedPreambleSegments = this.completedRootSegment = null, this.abortableTasks = h, this.pingedTasks = [], this.clientRenderedBoundaries = [], this.completedBoundaries = [], this.partialBoundaries = [], this.trackedPostpones = null, this.onError = void 0 === o ? defaultErrorHandler$1 : o, this.onPostpone = void 0 === u ? noop$3 : u, this.onAllReady = void 0 === s ? noop$3 : s, this.onShellReady = void 0 === i ? noop$3 : i, this.onShellError = void 0 === c ? noop$3 : c, this.onFatalError = void 0 === l ? noop$3 : l, this.formState = void 0 === p ? null : p;
}
function createRequest$1(e, n, r, a, o, s, i, c, l, u, p, h) {
  return (r = createPendingSegment$1(n = new RequestInstance$1(n, r, a, o, s, i, c, l, u, p, h), 0, null, a, false, false)).parentFlushed = true, pushComponentStack$1(e = createRenderTask$1(n, null, e, -1, null, r, null, null, n.abortableTasks, null, a, null, Qh, null, false)), n.pingedTasks.push(e), n;
}
var wm = null;
function resolveRequest() {
  if (wm) return wm;
  if (Hh) {
    var e = Uh.getStore();
    if (e) return e;
  }
  return null;
}
function pingTask$1(e, n) {
  e.pingedTasks.push(n), 1 === e.pingedTasks.length && (e.flushScheduled = null !== e.destination, null !== e.trackedPostpones || 10 === e.status ? Cp(function() {
    return performWork$1(e);
  }) : setTimeout(function() {
    return performWork$1(e);
  }, 0));
}
function createSuspenseBoundary$1(e, n, r, a) {
  return { status: 0, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, completedSegments: [], byteSize: 0, fallbackAbortableTasks: n, errorDigest: null, contentState: createHoistableState$1(), fallbackState: createHoistableState$1(), contentPreamble: r, fallbackPreamble: a, trackedContentKeyPath: null, trackedFallbackNode: null };
}
function createRenderTask$1(e, n, r, a, o, s, i, c, l, u, p, h, g, v, y) {
  e.allPendingTasks++, null === o ? e.pendingRootTasks++ : o.pendingTasks++;
  var b2 = { replay: null, node: r, childIndex: a, ping: function() {
    return pingTask$1(e, b2);
  }, blockedBoundary: o, blockedSegment: s, blockedPreamble: i, hoistableState: c, abortSet: l, keyPath: u, formatContext: p, context: h, treeContext: g, componentStack: v, thenableState: n, isFallback: y };
  return l.add(b2), b2;
}
function createReplayTask$1(e, n, r, a, o, s, i, c, l, u, p, h, g, v) {
  e.allPendingTasks++, null === s ? e.pendingRootTasks++ : s.pendingTasks++, r.pendingTasks++;
  var y = { replay: r, node: a, childIndex: o, ping: function() {
    return pingTask$1(e, y);
  }, blockedBoundary: s, blockedSegment: null, blockedPreamble: null, hoistableState: i, abortSet: c, keyPath: l, formatContext: u, context: p, treeContext: h, componentStack: g, thenableState: n, isFallback: v };
  return c.add(y), y;
}
function createPendingSegment$1(e, n, r, a, o, s) {
  return { status: 0, parentFlushed: false, id: -1, index: n, chunks: [], children: [], preambleChildren: [], parentFormatContext: a, boundary: r, lastPushedText: o, textEmbedded: s };
}
function pushComponentStack$1(e) {
  var n = e.node;
  if ("object" == typeof n && null !== n && n.$$typeof === rp) e.componentStack = { parent: e.componentStack, type: n.type };
}
function getThrownInfo$1(e) {
  var n = {};
  return e && Object.defineProperty(n, "componentStack", { configurable: true, enumerable: true, get: function() {
    try {
      var r = "", a = e;
      do {
        r += describeComponentStackByType$1(a.type), a = a.parent;
      } while (a);
      var o = r;
    } catch (e2) {
      o = "\nError generating stack: " + e2.message + "\n" + e2.stack;
    }
    return Object.defineProperty(n, "componentStack", { value: o }), o;
  } }), n;
}
function logRecoverableError$1(e, n, r) {
  if (null == (n = (e = e.onError)(n, r)) || "string" == typeof n) return n;
}
function fatalError$1(e, n) {
  var r = e.onShellError, a = e.onFatalError;
  r(n), a(n), null !== e.destination ? (e.status = 14, closeWithError(e.destination, n)) : (e.status = 13, e.fatalError = n);
}
function renderWithHooks$1(e, n, r, a, o, s) {
  var i = n.thenableState;
  for (n.thenableState = null, nm = {}, rm = n, am = e, om = r, pm = um = 0, dm = -1, hm = 0, mm = i, e = a(o, s); lm; ) lm = false, pm = um = 0, dm = -1, hm = 0, gm += 1, im = null, e = a(o, s);
  return resetHooksState$1(), e;
}
function finishFunctionComponent$1(e, n, r, a, o, s, i) {
  var c = false;
  if (0 !== s && null !== e.formState) {
    var l = n.blockedSegment;
    if (null !== l) {
      c = true, l = l.chunks;
      for (var u = 0; u < s; u++) u === i ? l.push(gd) : l.push(vd);
    }
  }
  s = n.keyPath, n.keyPath = r, o ? (r = n.treeContext, n.treeContext = pushTreeContext$1(r, 1, 0), renderNode$1(e, n, a, -1), n.treeContext = r) : c ? renderNode$1(e, n, a, -1) : renderNodeDestructive$1(e, n, a, -1), n.keyPath = s;
}
function renderElement$1(e, n, r, a, o, s) {
  if ("function" == typeof a) if (a.prototype && a.prototype.isReactComponent) {
    var i = o;
    if ("ref" in o) for (var c in i = {}, o) "ref" !== c && (i[c] = o[c]);
    var l = a.defaultProps;
    if (l) for (var u in i === o && (i = Ep({}, i, o)), l) void 0 === i[u] && (i[u] = l[u]);
    o = i, i = Wh, "object" == typeof (l = a.contextType) && null !== l && (i = l._currentValue);
    var p = void 0 !== (i = new a(o, i)).state ? i.state : null;
    if (i.updater = Gh, i.props = o, i.state = p, l = { queue: [], replace: false }, i._reactInternals = l, s = a.contextType, i.context = "object" == typeof s && null !== s ? s._currentValue : Wh, "function" == typeof (s = a.getDerivedStateFromProps) && (p = null == (s = s(o, p)) ? p : Ep({}, p, s), i.state = p), "function" != typeof a.getDerivedStateFromProps && "function" != typeof i.getSnapshotBeforeUpdate && ("function" == typeof i.UNSAFE_componentWillMount || "function" == typeof i.componentWillMount)) if (a = i.state, "function" == typeof i.componentWillMount && i.componentWillMount(), "function" == typeof i.UNSAFE_componentWillMount && i.UNSAFE_componentWillMount(), a !== i.state && Gh.enqueueReplaceState(i, i.state, null), null !== l.queue && 0 < l.queue.length) if (a = l.queue, s = l.replace, l.queue = null, l.replace = false, s && 1 === a.length) i.state = a[0];
    else {
      for (l = s ? a[0] : i.state, p = true, s = s ? 1 : 0; s < a.length; s++) null != (u = "function" == typeof (u = a[s]) ? u.call(i, l, o, void 0) : u) && (p ? (p = false, l = Ep({}, l, u)) : Ep(l, u));
      i.state = l;
    }
    else l.queue = null;
    if (a = i.render(), 12 === e.status) throw null;
    o = n.keyPath, n.keyPath = r, renderNodeDestructive$1(e, n, a, -1), n.keyPath = o;
  } else {
    if (a = renderWithHooks$1(e, n, r, a, o, void 0), 12 === e.status) throw null;
    finishFunctionComponent$1(e, n, r, a, 0 !== um, pm, dm);
  }
  else {
    if ("string" != typeof a) {
      switch (a) {
        case yp:
        case sp:
        case ip:
        case op:
          return a = n.keyPath, n.keyPath = r, renderNodeDestructive$1(e, n, o.children, -1), void (n.keyPath = a);
        case vp:
          return void ("hidden" !== o.mode && (a = n.keyPath, n.keyPath = r, renderNodeDestructive$1(e, n, o.children, -1), n.keyPath = a));
        case hp:
          return a = n.keyPath, n.keyPath = r, renderNodeDestructive$1(e, n, o.children, -1), void (n.keyPath = a);
        case xp:
        case gp:
          throw Error("ReactDOMServer does not yet support scope components.");
        case dp:
          e: if (null !== n.replay) {
            a = n.keyPath, n.keyPath = r, r = o.children;
            try {
              renderNode$1(e, n, r, -1);
            } finally {
              n.keyPath = a;
            }
          } else {
            a = n.keyPath;
            var h = n.blockedBoundary;
            s = n.blockedPreamble;
            var g = n.hoistableState;
            u = n.blockedSegment, c = o.fallback, o = o.children;
            var v = /* @__PURE__ */ new Set(), y = 2 > n.formatContext.insertionMode ? createSuspenseBoundary$1(0, v, { htmlChunks: null, headChunks: null, bodyChunks: null, contribution: 0 }, { htmlChunks: null, headChunks: null, bodyChunks: null, contribution: 0 }) : createSuspenseBoundary$1(0, v, null, null);
            null !== e.trackedPostpones && (y.trackedContentKeyPath = r);
            var b2 = createPendingSegment$1(0, u.chunks.length, y, n.formatContext, false, false);
            u.children.push(b2), u.lastPushedText = false;
            var k = createPendingSegment$1(0, 0, null, n.formatContext, false, false);
            if (k.parentFlushed = true, null !== e.trackedPostpones) {
              l = [(i = [r[0], "Suspense Fallback", r[2]])[1], i[2], [], null], e.trackedPostpones.workingMap.set(i, l), y.trackedFallbackNode = l, n.blockedSegment = b2, n.blockedPreamble = y.fallbackPreamble, n.keyPath = i, b2.status = 6;
              try {
                renderNode$1(e, n, c, -1), b2.lastPushedText && b2.textEmbedded && b2.chunks.push(td), b2.status = 1;
              } catch (n2) {
                throw b2.status = 12 === e.status ? 3 : 4, n2;
              } finally {
                n.blockedSegment = u, n.blockedPreamble = s, n.keyPath = a;
              }
              pushComponentStack$1(n = createRenderTask$1(e, null, o, -1, y, k, y.contentPreamble, y.contentState, n.abortSet, r, n.formatContext, n.context, n.treeContext, n.componentStack, n.isFallback)), e.pingedTasks.push(n);
            } else {
              n.blockedBoundary = y, n.blockedPreamble = y.contentPreamble, n.hoistableState = y.contentState, n.blockedSegment = k, n.keyPath = r, k.status = 6;
              try {
                if (renderNode$1(e, n, o, -1), k.lastPushedText && k.textEmbedded && k.chunks.push(td), k.status = 1, queueCompletedSegment$1(y, k), 0 === y.pendingTasks && 0 === y.status) {
                  y.status = 1, 0 === e.pendingRootTasks && n.blockedPreamble && preparePreamble$1(e);
                  break e;
                }
              } catch (r2) {
                y.status = 4, 12 === e.status ? (k.status = 3, i = e.fatalError) : (k.status = 4, i = r2), p = logRecoverableError$1(e, i, l = getThrownInfo$1(n.componentStack)), y.errorDigest = p, untrackBoundary$1(e, y);
              } finally {
                n.blockedBoundary = h, n.blockedPreamble = s, n.hoistableState = g, n.blockedSegment = u, n.keyPath = a;
              }
              pushComponentStack$1(n = createRenderTask$1(e, null, c, -1, h, b2, y.fallbackPreamble, y.fallbackState, v, [r[0], "Suspense Fallback", r[2]], n.formatContext, n.context, n.treeContext, n.componentStack, true)), e.pingedTasks.push(n);
            }
          }
          return;
      }
      if ("object" == typeof a && null !== a) switch (a.$$typeof) {
        case pp:
          if ("ref" in o) for (y in i = {}, o) "ref" !== y && (i[y] = o[y]);
          else i = o;
          return void finishFunctionComponent$1(e, n, r, a = renderWithHooks$1(e, n, r, a.render, i, s), 0 !== um, pm, dm);
        case mp:
          return void renderElement$1(e, n, r, a.type, o, s);
        case cp:
        case up:
          if (l = o.children, i = n.keyPath, o = o.value, p = a._currentValue, a._currentValue = o, Kh = a = { parent: s = Kh, depth: null === s ? 0 : s.depth + 1, context: a, parentValue: p, value: o }, n.context = a, n.keyPath = r, renderNodeDestructive$1(e, n, l, -1), null === (e = Kh)) throw Error("Tried to pop a Context at the root of the app. This is a bug in React.");
          return e.context._currentValue = e.parentValue, e = Kh = e.parent, n.context = e, void (n.keyPath = i);
        case lp:
          return a = (o = o.children)(a._context._currentValue), o = n.keyPath, n.keyPath = r, renderNodeDestructive$1(e, n, a, -1), void (n.keyPath = o);
        case fp:
          if (a = (i = a._init)(a._payload), 12 === e.status) throw null;
          return void renderElement$1(e, n, r, a, o, s);
      }
      throw Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (null == a ? a : typeof a) + ".");
    }
    if (null === (i = n.blockedSegment)) i = o.children, l = n.formatContext, p = n.keyPath, n.formatContext = getChildFormatContext$1(l, a, o), n.keyPath = r, renderNode$1(e, n, i, -1), n.formatContext = l, n.keyPath = p;
    else {
      s = pushStartInstance$1(i.chunks, a, o, e.resumableState, e.renderState, n.blockedPreamble, n.hoistableState, n.formatContext, i.lastPushedText, n.isFallback), i.lastPushedText = false, l = n.formatContext, p = n.keyPath, n.keyPath = r, 3 === (n.formatContext = getChildFormatContext$1(l, a, o)).insertionMode ? (r = createPendingSegment$1(0, 0, null, n.formatContext, false, false), i.preambleChildren.push(r), pushComponentStack$1(r = createRenderTask$1(e, null, s, -1, n.blockedBoundary, r, n.blockedPreamble, n.hoistableState, e.abortableTasks, n.keyPath, n.formatContext, n.context, n.treeContext, n.componentStack, n.isFallback)), e.pingedTasks.push(r)) : renderNode$1(e, n, s, -1), n.formatContext = l, n.keyPath = p;
      e: {
        switch (n = i.chunks, e = e.resumableState, a) {
          case "title":
          case "style":
          case "script":
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break e;
          case "body":
            if (1 >= l.insertionMode) {
              e.hasBody = true;
              break e;
            }
            break;
          case "html":
            if (0 === l.insertionMode) {
              e.hasHtml = true;
              break e;
            }
            break;
          case "head":
            if (1 >= l.insertionMode) break e;
        }
        n.push(endChunkForTag$1(a));
      }
      i.lastPushedText = false;
    }
  }
}
function resumeNode$1(e, n, r, a, o) {
  var s = n.replay, i = n.blockedBoundary, c = createPendingSegment$1(0, 0, null, n.formatContext, false, false);
  c.id = r, c.parentFlushed = true;
  try {
    n.replay = null, n.blockedSegment = c, renderNode$1(e, n, a, o), c.status = 1, null === i ? e.completedRootSegment = c : (queueCompletedSegment$1(i, c), i.parentFlushed && e.partialBoundaries.push(i));
  } finally {
    n.replay = s, n.blockedSegment = null;
  }
}
function renderNodeDestructive$1(e, n, r, a) {
  null !== n.replay && "number" == typeof n.replay.slots ? resumeNode$1(e, n, n.replay.slots, r, a) : (n.node = r, n.childIndex = a, r = n.componentStack, pushComponentStack$1(n), retryNode$1(e, n), n.componentStack = r);
}
function retryNode$1(e, n) {
  var r = n.node, a = n.childIndex;
  if (null !== r) {
    if ("object" == typeof r) {
      switch (r.$$typeof) {
        case rp:
          var o = r.type, s = r.key, i = r.props, c = void 0 !== (r = i.ref) ? r : null, l = getComponentNameFromType$1(o), u = null == s ? -1 === a ? 0 : a : s;
          if (s = [n.keyPath, l, u], null !== n.replay) e: {
            var p = n.replay;
            for (a = p.nodes, r = 0; r < a.length; r++) {
              var h = a[r];
              if (u === h[1]) {
                if (4 === h.length) {
                  if (null !== l && l !== h[0]) throw Error("Expected the resume to render <" + h[0] + "> in this slot but instead it rendered <" + l + ">. The tree doesn't match so React will fallback to client rendering.");
                  var g = h[2];
                  l = h[3], u = n.node, n.replay = { nodes: g, slots: l, pendingTasks: 1 };
                  try {
                    if (renderElement$1(e, n, s, o, i, c), 1 === n.replay.pendingTasks && 0 < n.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
                    n.replay.pendingTasks--;
                  } catch (r2) {
                    if ("object" == typeof r2 && null !== r2 && (r2 === Zh || "function" == typeof r2.then)) throw n.node === u && (n.replay = p), r2;
                    n.replay.pendingTasks--, i = getThrownInfo$1(n.componentStack), abortRemainingReplayNodes$1(e, s = n.blockedBoundary, g, l, o = r2, i = logRecoverableError$1(e, o, i));
                  }
                  n.replay = p;
                } else {
                  if (o !== dp) throw Error("Expected the resume to render <Suspense> in this slot but instead it rendered <" + (getComponentNameFromType$1(o) || "Unknown") + ">. The tree doesn't match so React will fallback to client rendering.");
                  t: {
                    p = void 0, o = h[5], c = h[2], l = h[3], u = null === h[4] ? [] : h[4][2], h = null === h[4] ? null : h[4][3];
                    var v = n.keyPath, y = n.replay, b2 = n.blockedBoundary, k = n.hoistableState, C = i.children, R2 = i.fallback, P2 = /* @__PURE__ */ new Set();
                    (i = 2 > n.formatContext.insertionMode ? createSuspenseBoundary$1(0, P2, createPreambleState$1(), createPreambleState$1()) : createSuspenseBoundary$1(0, P2, null, null)).parentFlushed = true, i.rootSegmentID = o, n.blockedBoundary = i, n.hoistableState = i.contentState, n.keyPath = s, n.replay = { nodes: c, slots: l, pendingTasks: 1 };
                    try {
                      if (renderNode$1(e, n, C, -1), 1 === n.replay.pendingTasks && 0 < n.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
                      if (n.replay.pendingTasks--, 0 === i.pendingTasks && 0 === i.status) {
                        i.status = 1, e.completedBoundaries.push(i);
                        break t;
                      }
                    } catch (r2) {
                      i.status = 4, p = logRecoverableError$1(e, r2, g = getThrownInfo$1(n.componentStack)), i.errorDigest = p, n.replay.pendingTasks--, e.clientRenderedBoundaries.push(i);
                    } finally {
                      n.blockedBoundary = b2, n.hoistableState = k, n.replay = y, n.keyPath = v;
                    }
                    pushComponentStack$1(n = createReplayTask$1(e, null, { nodes: u, slots: h, pendingTasks: 0 }, R2, -1, b2, i.fallbackState, P2, [s[0], "Suspense Fallback", s[2]], n.formatContext, n.context, n.treeContext, n.componentStack, true)), e.pingedTasks.push(n);
                  }
                }
                a.splice(r, 1);
                break e;
              }
            }
          }
          else renderElement$1(e, n, s, o, i, c);
          return;
        case ap:
          throw Error("Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render.");
        case fp:
          if (r = (g = r._init)(r._payload), 12 === e.status) throw null;
          return void renderNodeDestructive$1(e, n, r, a);
      }
      if (kp(r)) return void renderChildrenArray$1(e, n, r, a);
      if (null === r || "object" != typeof r ? g = null : g = "function" == typeof (g = Sp && r[Sp] || r["@@iterator"]) ? g : null, g && (g = g.call(r))) {
        if (!(r = g.next()).done) {
          i = [];
          do {
            i.push(r.value), r = g.next();
          } while (!r.done);
          renderChildrenArray$1(e, n, i, a);
        }
        return;
      }
      if ("function" == typeof r.then) return n.thenableState = null, renderNodeDestructive$1(e, n, unwrapThenable$1(r), a);
      if (r.$$typeof === up) return renderNodeDestructive$1(e, n, r._currentValue, a);
      throw a = Object.prototype.toString.call(r), Error("Objects are not valid as a React child (found: " + ("[object Object]" === a ? "object with keys {" + Object.keys(r).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    "string" == typeof r ? null !== (a = n.blockedSegment) && (a.lastPushedText = pushTextInstance$1(a.chunks, r, e.renderState, a.lastPushedText)) : "number" != typeof r && "bigint" != typeof r || null !== (a = n.blockedSegment) && (a.lastPushedText = pushTextInstance$1(a.chunks, "" + r, e.renderState, a.lastPushedText));
  }
}
function renderChildrenArray$1(e, n, r, a) {
  var o = n.keyPath;
  if (-1 === a || (n.keyPath = [n.keyPath, "Fragment", a], null === n.replay)) {
    if (s = n.treeContext, i = r.length, null !== n.replay && (null !== (c = n.replay.slots) && "object" == typeof c)) {
      for (a = 0; a < i; a++) l = r[a], n.treeContext = pushTreeContext$1(s, i, a), "number" == typeof (u = c[a]) ? (resumeNode$1(e, n, u, l, a), delete c[a]) : renderNode$1(e, n, l, a);
      return n.treeContext = s, void (n.keyPath = o);
    }
    for (c = 0; c < i; c++) a = r[c], n.treeContext = pushTreeContext$1(s, i, c), renderNode$1(e, n, a, c);
    n.treeContext = s, n.keyPath = o;
  } else {
    for (var s = n.replay, i = s.nodes, c = 0; c < i.length; c++) {
      var l = i[c];
      if (l[1] === a) {
        a = l[2], l = l[3], n.replay = { nodes: a, slots: l, pendingTasks: 1 };
        try {
          if (renderChildrenArray$1(e, n, r, -1), 1 === n.replay.pendingTasks && 0 < n.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
          n.replay.pendingTasks--;
        } catch (o2) {
          if ("object" == typeof o2 && null !== o2 && (o2 === Zh || "function" == typeof o2.then)) throw o2;
          n.replay.pendingTasks--, r = getThrownInfo$1(n.componentStack);
          var u = n.blockedBoundary;
          abortRemainingReplayNodes$1(e, u, a, l, o2, r = logRecoverableError$1(e, o2, r));
        }
        n.replay = s, i.splice(c, 1);
        break;
      }
    }
    n.keyPath = o;
  }
}
function untrackBoundary$1(e, n) {
  null !== (e = e.trackedPostpones) && (null !== (n = n.trackedContentKeyPath) && (void 0 !== (n = e.workingMap.get(n)) && (n.length = 4, n[2] = [], n[3] = null)));
}
function spawnNewSuspendedReplayTask$1(e, n, r) {
  return createReplayTask$1(e, r, n.replay, n.node, n.childIndex, n.blockedBoundary, n.hoistableState, n.abortSet, n.keyPath, n.formatContext, n.context, n.treeContext, n.componentStack, n.isFallback);
}
function spawnNewSuspendedRenderTask$1(e, n, r) {
  var a = n.blockedSegment, o = createPendingSegment$1(0, a.chunks.length, null, n.formatContext, a.lastPushedText, true);
  return a.children.push(o), a.lastPushedText = false, createRenderTask$1(e, r, n.node, n.childIndex, n.blockedBoundary, o, n.blockedPreamble, n.hoistableState, n.abortSet, n.keyPath, n.formatContext, n.context, n.treeContext, n.componentStack, n.isFallback);
}
function renderNode$1(e, n, r, a) {
  var o = n.formatContext, s = n.context, i = n.keyPath, c = n.treeContext, l = n.componentStack, u = n.blockedSegment;
  if (null === u) try {
    return renderNodeDestructive$1(e, n, r, a);
  } catch (u2) {
    if (resetHooksState$1(), "object" == typeof (r = u2 === Zh ? getSuspendedThenable$1() : u2) && null !== r) {
      if ("function" == typeof r.then) return e = spawnNewSuspendedReplayTask$1(e, n, a = getThenableStateAfterSuspending$1()).ping, r.then(e, e), n.formatContext = o, n.context = s, n.keyPath = i, n.treeContext = c, n.componentStack = l, void switchContext$1(s);
      if ("Maximum call stack size exceeded" === r.message) return r = spawnNewSuspendedReplayTask$1(e, n, r = getThenableStateAfterSuspending$1()), e.pingedTasks.push(r), n.formatContext = o, n.context = s, n.keyPath = i, n.treeContext = c, n.componentStack = l, void switchContext$1(s);
    }
  }
  else {
    var p = u.children.length, h = u.chunks.length;
    try {
      return renderNodeDestructive$1(e, n, r, a);
    } catch (g) {
      if (resetHooksState$1(), u.children.length = p, u.chunks.length = h, "object" == typeof (r = g === Zh ? getSuspendedThenable$1() : g) && null !== r) {
        if ("function" == typeof r.then) return e = spawnNewSuspendedRenderTask$1(e, n, a = getThenableStateAfterSuspending$1()).ping, r.then(e, e), n.formatContext = o, n.context = s, n.keyPath = i, n.treeContext = c, n.componentStack = l, void switchContext$1(s);
        if ("Maximum call stack size exceeded" === r.message) return r = spawnNewSuspendedRenderTask$1(e, n, r = getThenableStateAfterSuspending$1()), e.pingedTasks.push(r), n.formatContext = o, n.context = s, n.keyPath = i, n.treeContext = c, n.componentStack = l, void switchContext$1(s);
      }
    }
  }
  throw n.formatContext = o, n.context = s, n.keyPath = i, n.treeContext = c, switchContext$1(s), r;
}
function abortTaskSoft$1(e) {
  var n = e.blockedBoundary;
  null !== (e = e.blockedSegment) && (e.status = 3, finishedTask$1(this, n, e));
}
function abortRemainingReplayNodes$1(e, n, r, a, o, s) {
  for (var i = 0; i < r.length; i++) {
    var c = r[i];
    if (4 === c.length) abortRemainingReplayNodes$1(e, n, c[2], c[3], o, s);
    else {
      c = c[5];
      var l = e, u = s, p = createSuspenseBoundary$1(0, /* @__PURE__ */ new Set(), null, null);
      p.parentFlushed = true, p.rootSegmentID = c, p.status = 4, p.errorDigest = u, p.parentFlushed && l.clientRenderedBoundaries.push(p);
    }
  }
  if (r.length = 0, null !== a) {
    if (null === n) throw Error("We should not have any resumable nodes in the shell. This is a bug in React.");
    if (4 !== n.status && (n.status = 4, n.errorDigest = s, n.parentFlushed && e.clientRenderedBoundaries.push(n)), "object" == typeof a) for (var h in a) delete a[h];
  }
}
function abortTask$1(e, n, r) {
  var a = e.blockedBoundary, o = e.blockedSegment;
  if (null !== o) {
    if (6 === o.status) return;
    o.status = 3;
  }
  if (o = getThrownInfo$1(e.componentStack), null === a) {
    if (13 !== n.status && 14 !== n.status) {
      if (null === (a = e.replay)) return logRecoverableError$1(n, r, o), void fatalError$1(n, r);
      a.pendingTasks--, 0 === a.pendingTasks && 0 < a.nodes.length && (e = logRecoverableError$1(n, r, o), abortRemainingReplayNodes$1(n, null, a.nodes, a.slots, r, e)), n.pendingRootTasks--, 0 === n.pendingRootTasks && completeShell$1(n);
    }
  } else a.pendingTasks--, 4 !== a.status && (a.status = 4, e = logRecoverableError$1(n, r, o), a.status = 4, a.errorDigest = e, untrackBoundary$1(n, a), a.parentFlushed && n.clientRenderedBoundaries.push(a)), a.fallbackAbortableTasks.forEach(function(e2) {
    return abortTask$1(e2, n, r);
  }), a.fallbackAbortableTasks.clear();
  n.allPendingTasks--, 0 === n.allPendingTasks && completeAll$1(n);
}
function safelyEmitEarlyPreloads$1(e, n) {
  try {
    var r = e.renderState, a = r.onHeaders;
    if (a) {
      var o = r.headers;
      if (o) {
        r.headers = null;
        var s = o.preconnects;
        if (o.fontPreloads && (s && (s += ", "), s += o.fontPreloads), o.highImagePreloads && (s && (s += ", "), s += o.highImagePreloads), !n) {
          var i = r.styles.values(), c = i.next();
          e: for (; 0 < o.remainingCapacity && !c.done; c = i.next()) for (var l = c.value.sheets.values(), u = l.next(); 0 < o.remainingCapacity && !u.done; u = l.next()) {
            var p = u.value, h = p.props, g = h.href, v = p.props, y = getPreloadAsHeader$1(v.href, "style", { crossOrigin: v.crossOrigin, integrity: v.integrity, nonce: v.nonce, type: v.type, fetchPriority: v.fetchPriority, referrerPolicy: v.referrerPolicy, media: v.media });
            if (!(0 <= (o.remainingCapacity -= y.length + 2))) break e;
            r.resets.style[g] = Hp, s && (s += ", "), s += y, r.resets.style[g] = "string" == typeof h.crossOrigin || "string" == typeof h.integrity ? [h.crossOrigin, h.integrity] : Hp;
          }
        }
        a(s ? { Link: s } : {});
      }
    }
  } catch (n2) {
    logRecoverableError$1(e, n2, {});
  }
}
function completeShell$1(e) {
  null === e.trackedPostpones && safelyEmitEarlyPreloads$1(e, true), null === e.trackedPostpones && preparePreamble$1(e), e.onShellError = noop$3, (e = e.onShellReady)();
}
function completeAll$1(e) {
  safelyEmitEarlyPreloads$1(e, null === e.trackedPostpones || (null === e.completedRootSegment || 5 !== e.completedRootSegment.status)), preparePreamble$1(e), (e = e.onAllReady)();
}
function queueCompletedSegment$1(e, n) {
  if (0 === n.chunks.length && 1 === n.children.length && null === n.children[0].boundary && -1 === n.children[0].id) {
    var r = n.children[0];
    r.id = n.id, r.parentFlushed = true, 1 === r.status && queueCompletedSegment$1(e, r);
  } else e.completedSegments.push(n);
}
function finishedTask$1(e, n, r) {
  if (null === n) {
    if (null !== r && r.parentFlushed) {
      if (null !== e.completedRootSegment) throw Error("There can only be one root segment. This is a bug in React.");
      e.completedRootSegment = r;
    }
    e.pendingRootTasks--, 0 === e.pendingRootTasks && completeShell$1(e);
  } else n.pendingTasks--, 4 !== n.status && (0 === n.pendingTasks ? (0 === n.status && (n.status = 1), null !== r && r.parentFlushed && 1 === r.status && queueCompletedSegment$1(n, r), n.parentFlushed && e.completedBoundaries.push(n), 1 === n.status && (n.fallbackAbortableTasks.forEach(abortTaskSoft$1, e), n.fallbackAbortableTasks.clear(), 0 === e.pendingRootTasks && null === e.trackedPostpones && null !== n.contentPreamble && preparePreamble$1(e))) : null !== r && r.parentFlushed && 1 === r.status && (queueCompletedSegment$1(n, r), 1 === n.completedSegments.length && n.parentFlushed && e.partialBoundaries.push(n)));
  e.allPendingTasks--, 0 === e.allPendingTasks && completeAll$1(e);
}
function performWork$1(e) {
  if (14 !== e.status && 13 !== e.status) {
    var n = Kh, r = Dp.H;
    Dp.H = bm;
    var a = Dp.A;
    Dp.A = Sm;
    var o = wm;
    wm = e;
    var s = xm;
    xm = e.resumableState;
    try {
      var i, c = e.pingedTasks;
      for (i = 0; i < c.length; i++) {
        var l = c[i], u = e, p = l.blockedSegment;
        if (null === p) {
          var h = u;
          if (0 !== l.replay.pendingTasks) {
            switchContext$1(l.context);
            try {
              if ("number" == typeof l.replay.slots ? resumeNode$1(h, l, l.replay.slots, l.node, l.childIndex) : retryNode$1(h, l), 1 === l.replay.pendingTasks && 0 < l.replay.nodes.length) throw Error("Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering.");
              l.replay.pendingTasks--, l.abortSet.delete(l), finishedTask$1(h, l.blockedBoundary, null);
            } catch (e2) {
              resetHooksState$1();
              var g = e2 === Zh ? getSuspendedThenable$1() : e2;
              if ("object" == typeof g && null !== g && "function" == typeof g.then) {
                var v = l.ping;
                g.then(v, v), l.thenableState = getThenableStateAfterSuspending$1();
              } else {
                l.replay.pendingTasks--, l.abortSet.delete(l);
                var y = getThrownInfo$1(l.componentStack);
                u = void 0;
                var b2 = h, k = l.blockedBoundary, C = 12 === h.status ? h.fatalError : g;
                abortRemainingReplayNodes$1(b2, k, l.replay.nodes, l.replay.slots, C, u = logRecoverableError$1(b2, C, y)), h.pendingRootTasks--, 0 === h.pendingRootTasks && completeShell$1(h), h.allPendingTasks--, 0 === h.allPendingTasks && completeAll$1(h);
              }
            }
          }
        } else if (h = void 0, 0 === (b2 = p).status) {
          b2.status = 6, switchContext$1(l.context);
          var R2 = b2.children.length, P2 = b2.chunks.length;
          try {
            retryNode$1(u, l), b2.lastPushedText && b2.textEmbedded && b2.chunks.push(td), l.abortSet.delete(l), b2.status = 1, finishedTask$1(u, l.blockedBoundary, b2);
          } catch (e2) {
            resetHooksState$1(), b2.children.length = R2, b2.chunks.length = P2;
            var T = e2 === Zh ? getSuspendedThenable$1() : 12 === u.status ? u.fatalError : e2;
            if ("object" == typeof T && null !== T && "function" == typeof T.then) {
              b2.status = 0, l.thenableState = getThenableStateAfterSuspending$1();
              var E2 = l.ping;
              T.then(E2, E2);
            } else {
              var $2 = getThrownInfo$1(l.componentStack);
              l.abortSet.delete(l), b2.status = 4;
              var F = l.blockedBoundary;
              h = logRecoverableError$1(u, T, $2), null === F ? fatalError$1(u, T) : (F.pendingTasks--, 4 !== F.status && (F.status = 4, F.errorDigest = h, untrackBoundary$1(u, F), F.parentFlushed && u.clientRenderedBoundaries.push(F), 0 === u.pendingRootTasks && null === u.trackedPostpones && null !== F.contentPreamble && preparePreamble$1(u))), u.allPendingTasks--, 0 === u.allPendingTasks && completeAll$1(u);
            }
          }
        }
      }
      c.splice(0, i), null !== e.destination && flushCompletedQueues$1(e, e.destination);
    } catch (n2) {
      logRecoverableError$1(e, n2, {}), fatalError$1(e, n2);
    } finally {
      xm = s, Dp.H = r, Dp.A = a, r === bm && switchContext$1(n), wm = o;
    }
  }
}
function preparePreambleFromSubtree$1(e, n, r) {
  n.preambleChildren.length && r.push(n.preambleChildren);
  for (var a = false, o = 0; o < n.children.length; o++) a = preparePreambleFromSegment$1(e, n.children[o], r) || a;
  return a;
}
function preparePreambleFromSegment$1(e, n, r) {
  var a = n.boundary;
  if (null === a) return preparePreambleFromSubtree$1(e, n, r);
  var o = a.contentPreamble, s = a.fallbackPreamble;
  if (null === o || null === s) return false;
  switch (a.status) {
    case 1:
      if (hoistPreambleState$1(e.renderState, o), !(n = a.completedSegments[0])) throw Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
      return preparePreambleFromSubtree$1(e, n, r);
    case 5:
      if (null !== e.trackedPostpones) return true;
    case 4:
      if (1 === n.status) return hoistPreambleState$1(e.renderState, s), preparePreambleFromSubtree$1(e, n, r);
    default:
      return true;
  }
}
function preparePreamble$1(e) {
  if (e.completedRootSegment && null === e.completedPreambleSegments) {
    var n = [], r = preparePreambleFromSegment$1(e, e.completedRootSegment, n), a = e.renderState.preamble;
    (false === r || a.headChunks && a.bodyChunks) && (e.completedPreambleSegments = n);
  }
}
function flushSubtree$1(e, n, r, a) {
  switch (r.parentFlushed = true, r.status) {
    case 0:
      r.id = e.nextSegmentId++;
    case 5:
      return a = r.id, r.lastPushedText = false, r.textEmbedded = false, e = e.renderState, writeChunk(n, Cd), writeChunk(n, e.placeholderPrefix), writeChunk(n, e = stringToChunk(a.toString(16))), writeChunkAndReturn(n, Rd);
    case 1:
      r.status = 2;
      var o = true, s = r.chunks, i = 0;
      r = r.children;
      for (var c = 0; c < r.length; c++) {
        for (o = r[c]; i < o.index; i++) writeChunk(n, s[i]);
        o = flushSegment$1(e, n, o, a);
      }
      for (; i < s.length - 1; i++) writeChunk(n, s[i]);
      return i < s.length && (o = writeChunkAndReturn(n, s[i])), o;
    default:
      throw Error("Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React.");
  }
}
function flushSegment$1(e, n, r, a) {
  var o = r.boundary;
  if (null === o) return flushSubtree$1(e, n, r, a);
  if (o.parentFlushed = true, 4 === o.status) {
    var s = o.errorDigest;
    return writeChunkAndReturn(n, $d), writeChunk(n, _d), s && (writeChunk(n, Od), writeChunk(n, stringToChunk(escapeTextForBrowser$1(s))), writeChunk(n, Ad)), writeChunkAndReturn(n, jd), flushSubtree$1(e, n, r, a), (e = o.fallbackPreamble) && writePreambleContribution$1(n, e), writeChunkAndReturn(n, Fd);
  }
  if (1 !== o.status) return 0 === o.status && (o.rootSegmentID = e.nextSegmentId++), 0 < o.completedSegments.length && e.partialBoundaries.push(o), writeStartPendingSuspenseBoundary$1(n, e.renderState, o.rootSegmentID), a && ((o = o.fallbackState).styles.forEach(hoistStyleQueueDependency$1, a), o.stylesheets.forEach(hoistStylesheetDependency$1, a)), flushSubtree$1(e, n, r, a), writeChunkAndReturn(n, Fd);
  if (o.byteSize > e.progressiveChunkSize) return o.rootSegmentID = e.nextSegmentId++, e.completedBoundaries.push(o), writeStartPendingSuspenseBoundary$1(n, e.renderState, o.rootSegmentID), flushSubtree$1(e, n, r, a), writeChunkAndReturn(n, Fd);
  if (a && ((r = o.contentState).styles.forEach(hoistStyleQueueDependency$1, a), r.stylesheets.forEach(hoistStylesheetDependency$1, a)), writeChunkAndReturn(n, Pd), 1 !== (r = o.completedSegments).length) throw Error("A previously unvisited boundary must have exactly one root segment. This is a bug in React.");
  return flushSegment$1(e, n, r[0], a), (e = o.contentPreamble) && writePreambleContribution$1(n, e), writeChunkAndReturn(n, Fd);
}
function flushSegmentContainer$1(e, n, r, a) {
  return function(e2, n2, r2, a2) {
    switch (r2.insertionMode) {
      case 0:
      case 1:
      case 3:
      case 2:
        return writeChunk(e2, Ld), writeChunk(e2, n2.segmentPrefix), writeChunk(e2, stringToChunk(a2.toString(16))), writeChunkAndReturn(e2, Nd);
      case 4:
        return writeChunk(e2, Bd), writeChunk(e2, n2.segmentPrefix), writeChunk(e2, stringToChunk(a2.toString(16))), writeChunkAndReturn(e2, zd);
      case 5:
        return writeChunk(e2, Hd), writeChunk(e2, n2.segmentPrefix), writeChunk(e2, stringToChunk(a2.toString(16))), writeChunkAndReturn(e2, Ud);
      case 6:
        return writeChunk(e2, Wd), writeChunk(e2, n2.segmentPrefix), writeChunk(e2, stringToChunk(a2.toString(16))), writeChunkAndReturn(e2, Kd);
      case 7:
        return writeChunk(e2, Qd), writeChunk(e2, n2.segmentPrefix), writeChunk(e2, stringToChunk(a2.toString(16))), writeChunkAndReturn(e2, Jd);
      case 8:
        return writeChunk(e2, Yd), writeChunk(e2, n2.segmentPrefix), writeChunk(e2, stringToChunk(a2.toString(16))), writeChunkAndReturn(e2, Zd);
      case 9:
        return writeChunk(e2, th), writeChunk(e2, n2.segmentPrefix), writeChunk(e2, stringToChunk(a2.toString(16))), writeChunkAndReturn(e2, nh);
      default:
        throw Error("Unknown insertion mode. This is a bug in React.");
    }
  }(n, e.renderState, r.parentFormatContext, r.id), flushSegment$1(e, n, r, a), function(e2, n2) {
    switch (n2.insertionMode) {
      case 0:
      case 1:
      case 3:
      case 2:
        return writeChunkAndReturn(e2, Dd);
      case 4:
        return writeChunkAndReturn(e2, qd);
      case 5:
        return writeChunkAndReturn(e2, Vd);
      case 6:
        return writeChunkAndReturn(e2, Gd);
      case 7:
        return writeChunkAndReturn(e2, Xd);
      case 8:
        return writeChunkAndReturn(e2, eh);
      case 9:
        return writeChunkAndReturn(e2, rh);
      default:
        throw Error("Unknown insertion mode. This is a bug in React.");
    }
  }(n, r.parentFormatContext);
}
function flushCompletedBoundary$1(e, n, r) {
  for (var a = r.completedSegments, o = 0; o < a.length; o++) flushPartiallyCompletedSegment$1(e, n, r, a[o]);
  a.length = 0, writeHoistablesForBoundary$1(n, r.contentState, e.renderState), a = e.resumableState, e = e.renderState, o = r.rootSegmentID, r = r.contentState;
  var s = e.stylesToHoist;
  return e.stylesToHoist = false, writeChunk(n, e.startInlineScript), s ? 2 & a.instructions ? 8 & a.instructions ? writeChunk(n, dh) : (a.instructions |= 8, writeChunk(n, ph)) : (a.instructions |= 10, writeChunk(n, uh)) : 2 & a.instructions ? writeChunk(n, lh) : (a.instructions |= 2, writeChunk(n, ch)), a = stringToChunk(o.toString(16)), writeChunk(n, e.boundaryPrefix), writeChunk(n, a), writeChunk(n, hh), writeChunk(n, e.segmentPrefix), writeChunk(n, a), s ? (writeChunk(n, mh), function(e2, n2) {
    writeChunk(e2, Mh);
    var r2 = Mh;
    n2.stylesheets.forEach(function(n3) {
      if (2 !== n3.state) if (3 === n3.state) writeChunk(e2, r2), writeChunk(e2, stringToChunk(escapeJSObjectForInstructionScripts$1("" + n3.props.href))), writeChunk(e2, Dh), r2 = Lh;
      else {
        writeChunk(e2, r2);
        var a2 = n3.props["data-precedence"], o2 = n3.props, s2 = sanitizeURL$1("" + n3.props.href);
        for (var i in writeChunk(e2, stringToChunk(escapeJSObjectForInstructionScripts$1(s2))), a2 = "" + a2, writeChunk(e2, Nh), writeChunk(e2, stringToChunk(escapeJSObjectForInstructionScripts$1(a2))), o2) if ($p.call(o2, i) && null != (a2 = o2[i])) switch (i) {
          case "href":
          case "rel":
          case "precedence":
          case "data-precedence":
            break;
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error("link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
          default:
            writeStyleResourceAttributeInJS$1(e2, i, a2);
        }
        writeChunk(e2, Dh), r2 = Lh, n3.state = 3;
      }
    }), writeChunk(e2, Dh);
  }(n, r)) : writeChunk(n, fh), r = writeChunkAndReturn(n, gh), writeBootstrap$1(n, e) && r;
}
function flushPartiallyCompletedSegment$1(e, n, r, a) {
  if (2 === a.status) return true;
  var o = r.contentState, s = a.id;
  if (-1 === s) {
    if (-1 === (a.id = r.rootSegmentID)) throw Error("A root segment ID must have been assigned by now. This is a bug in React.");
    return flushSegmentContainer$1(e, n, a, o);
  }
  return s === r.rootSegmentID ? flushSegmentContainer$1(e, n, a, o) : (flushSegmentContainer$1(e, n, a, o), r = e.resumableState, writeChunk(n, (e = e.renderState).startInlineScript), 1 & r.instructions ? writeChunk(n, oh) : (r.instructions |= 1, writeChunk(n, ah)), writeChunk(n, e.segmentPrefix), writeChunk(n, s = stringToChunk(s.toString(16))), writeChunk(n, sh), writeChunk(n, e.placeholderPrefix), writeChunk(n, s), n = writeChunkAndReturn(n, ih));
}
function flushCompletedQueues$1(e, n) {
  Rp = new Uint8Array(2048), Pp = 0;
  try {
    if (!(0 < e.pendingRootTasks)) {
      var r, a = e.completedRootSegment;
      if (null !== a) {
        if (5 === a.status) return;
        var o = e.completedPreambleSegments;
        if (null === o) return;
        var s, i = e.renderState, c = i.preamble, l = c.htmlChunks, u = c.headChunks;
        if (l) {
          for (s = 0; s < l.length; s++) writeChunk(n, l[s]);
          if (u) for (s = 0; s < u.length; s++) writeChunk(n, u[s]);
          else writeChunk(n, startChunkForTag$1("head")), writeChunk(n, dd);
        } else if (u) for (s = 0; s < u.length; s++) writeChunk(n, u[s]);
        var p = i.charsetChunks;
        for (s = 0; s < p.length; s++) writeChunk(n, p[s]);
        p.length = 0, i.preconnects.forEach(flushResource$1, n), i.preconnects.clear();
        var h = i.viewportChunks;
        for (s = 0; s < h.length; s++) writeChunk(n, h[s]);
        h.length = 0, i.fontPreloads.forEach(flushResource$1, n), i.fontPreloads.clear(), i.highImagePreloads.forEach(flushResource$1, n), i.highImagePreloads.clear(), i.styles.forEach(flushStylesInPreamble$1, n);
        var g = i.importMapChunks;
        for (s = 0; s < g.length; s++) writeChunk(n, g[s]);
        g.length = 0, i.bootstrapScripts.forEach(flushResource$1, n), i.scripts.forEach(flushResource$1, n), i.scripts.clear(), i.bulkPreloads.forEach(flushResource$1, n), i.bulkPreloads.clear();
        var v = i.hoistableChunks;
        for (s = 0; s < v.length; s++) writeChunk(n, v[s]);
        for (i = v.length = 0; i < o.length; i++) {
          var y = o[i];
          for (c = 0; c < y.length; c++) flushSegment$1(e, n, y[c], null);
        }
        var b2 = e.renderState.preamble, k = b2.headChunks;
        (b2.htmlChunks || k) && writeChunk(n, endChunkForTag$1("head"));
        var C = b2.bodyChunks;
        if (C) for (o = 0; o < C.length; o++) writeChunk(n, C[o]);
        flushSegment$1(e, n, a, null), e.completedRootSegment = null, writeBootstrap$1(n, e.renderState);
      }
      var R2 = e.renderState;
      a = 0;
      var P2 = R2.viewportChunks;
      for (a = 0; a < P2.length; a++) writeChunk(n, P2[a]);
      P2.length = 0, R2.preconnects.forEach(flushResource$1, n), R2.preconnects.clear(), R2.fontPreloads.forEach(flushResource$1, n), R2.fontPreloads.clear(), R2.highImagePreloads.forEach(flushResource$1, n), R2.highImagePreloads.clear(), R2.styles.forEach(preloadLateStyles$1, n), R2.scripts.forEach(flushResource$1, n), R2.scripts.clear(), R2.bulkPreloads.forEach(flushResource$1, n), R2.bulkPreloads.clear();
      var T = R2.hoistableChunks;
      for (a = 0; a < T.length; a++) writeChunk(n, T[a]);
      T.length = 0;
      var E2 = e.clientRenderedBoundaries;
      for (r = 0; r < E2.length; r++) {
        var $2 = E2[r];
        R2 = n;
        var F = e.resumableState, A = e.renderState, O = $2.rootSegmentID, I2 = $2.errorDigest;
        writeChunk(R2, A.startInlineScript), 4 & F.instructions ? writeChunk(R2, yh) : (F.instructions |= 4, writeChunk(R2, vh)), writeChunk(R2, A.boundaryPrefix), writeChunk(R2, stringToChunk(O.toString(16))), writeChunk(R2, bh), I2 && (writeChunk(R2, xh), writeChunk(R2, stringToChunk(escapeJSStringsForInstructionScripts$1(I2 || ""))));
        var N2 = writeChunkAndReturn(R2, Sh);
        if (!N2) return e.destination = null, r++, void E2.splice(0, r);
      }
      E2.splice(0, r);
      var D2 = e.completedBoundaries;
      for (r = 0; r < D2.length; r++) if (!flushCompletedBoundary$1(e, n, D2[r])) return e.destination = null, r++, void D2.splice(0, r);
      D2.splice(0, r), completeWriting(n), Rp = new Uint8Array(2048), Pp = 0;
      var B2 = e.partialBoundaries;
      for (r = 0; r < B2.length; r++) {
        var q2 = B2[r];
        e: {
          E2 = e, $2 = n;
          var H2 = q2.completedSegments;
          for (N2 = 0; N2 < H2.length; N2++) if (!flushPartiallyCompletedSegment$1(E2, $2, q2, H2[N2])) {
            N2++, H2.splice(0, N2);
            var V2 = false;
            break e;
          }
          H2.splice(0, N2), V2 = writeHoistablesForBoundary$1($2, q2.contentState, E2.renderState);
        }
        if (!V2) return e.destination = null, r++, void B2.splice(0, r);
      }
      B2.splice(0, r);
      var W2 = e.completedBoundaries;
      for (r = 0; r < W2.length; r++) if (!flushCompletedBoundary$1(e, n, W2[r])) return e.destination = null, r++, void W2.splice(0, r);
      W2.splice(0, r);
    }
  } finally {
    0 === e.allPendingTasks && 0 === e.pingedTasks.length && 0 === e.clientRenderedBoundaries.length && 0 === e.completedBoundaries.length ? (e.flushScheduled = false, (r = e.resumableState).hasBody && writeChunk(n, endChunkForTag$1("body")), r.hasHtml && writeChunk(n, endChunkForTag$1("html")), completeWriting(n), e.status = 14, n.close(), e.destination = null) : completeWriting(n);
  }
}
function startWork(e) {
  e.flushScheduled = null !== e.destination, Cp(Hh ? function() {
    return Uh.run(e, performWork$1, e);
  } : function() {
    return performWork$1(e);
  }), setTimeout(function() {
    10 === e.status && (e.status = 11), null === e.trackedPostpones && (Hh ? Uh.run(e, enqueueEarlyPreloadsAfterInitialWork, e) : enqueueEarlyPreloadsAfterInitialWork(e));
  }, 0);
}
function enqueueEarlyPreloadsAfterInitialWork(e) {
  safelyEmitEarlyPreloads$1(e, 0 === e.pendingRootTasks);
}
function enqueueFlush$1(e) {
  false === e.flushScheduled && 0 === e.pingedTasks.length && null !== e.destination && (e.flushScheduled = true, setTimeout(function() {
    var n = e.destination;
    n ? flushCompletedQueues$1(e, n) : e.flushScheduled = false;
  }, 0));
}
function startFlowing$1(e, n) {
  if (13 === e.status) e.status = 14, closeWithError(n, e.fatalError);
  else if (14 !== e.status && null === e.destination) {
    e.destination = n;
    try {
      flushCompletedQueues$1(e, n);
    } catch (n2) {
      logRecoverableError$1(e, n2, {}), fatalError$1(e, n2);
    }
  }
}
function abort$1(e, n) {
  11 !== e.status && 10 !== e.status || (e.status = 12);
  try {
    var r = e.abortableTasks;
    if (0 < r.size) {
      var a = void 0 === n ? Error("The render was aborted by the server without a reason.") : "object" == typeof n && null !== n && "function" == typeof n.then ? Error("The render was aborted by the server with a promise.") : n;
      e.fatalError = a, r.forEach(function(n2) {
        return abortTask$1(n2, e, a);
      }), r.clear();
    }
    null !== e.destination && flushCompletedQueues$1(e, e.destination);
  } catch (n2) {
    logRecoverableError$1(e, n2, {}), fatalError$1(e, n2);
  }
}
function ensureCorrectIsomorphicReactVersion() {
  var e = tp.version;
  if ("19.1.1" !== e) throw Error('Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:\n  - react:      ' + e + "\n  - react-dom:  19.1.1\nLearn more: https://react.dev/warnings/version-mismatch");
}
ensureCorrectIsomorphicReactVersion(), ensureCorrectIsomorphicReactVersion(), ep.prerender = function(e, n) {
  return new Promise(function(r, a) {
    var o, s = n ? n.onHeaders : void 0;
    s && (o = function(e2) {
      s(new Headers(e2));
    });
    var i = createResumableState$1(n ? n.identifierPrefix : void 0, n && n.unstable_externalRuntimeSrc, n ? n.bootstrapScriptContent : void 0, n ? n.bootstrapScripts : void 0, n ? n.bootstrapModules : void 0), c = function(e2, n2, r2, a2, o2, s2, i2, c2, l2, u, p) {
      return (e2 = createRequest$1(e2, n2, r2, a2, o2, s2, i2, c2, l2, u, p, void 0)).trackedPostpones = { workingMap: /* @__PURE__ */ new Map(), rootNodes: [], rootSlots: null }, e2;
    }(e, i, createRenderState$1(i, void 0, n ? n.unstable_externalRuntimeSrc : void 0, n ? n.importMap : void 0, o, n ? n.maxHeadersLength : void 0), createRootFormatContext(n ? n.namespaceURI : void 0), n ? n.progressiveChunkSize : void 0, n ? n.onError : void 0, function() {
      var e2 = { prelude: new ReadableStream({ type: "bytes", pull: function(e3) {
        startFlowing$1(c, e3);
      }, cancel: function(e3) {
        c.destination = null, abort$1(c, e3);
      } }, { highWaterMark: 0 }) };
      r(e2);
    }, void 0, void 0, a, n ? n.onPostpone : void 0);
    if (n && n.signal) {
      var l = n.signal;
      if (l.aborted) abort$1(c, l.reason);
      else {
        var listener = function() {
          abort$1(c, l.reason), l.removeEventListener("abort", listener);
        };
        l.addEventListener("abort", listener);
      }
    }
    startWork(c);
  });
}, ep.renderToReadableStream = function(e, n) {
  return new Promise(function(r, a) {
    var o, s, i, c = new Promise(function(e2, n2) {
      s = e2, o = n2;
    }), l = n ? n.onHeaders : void 0;
    l && (i = function(e2) {
      l(new Headers(e2));
    });
    var u = createResumableState$1(n ? n.identifierPrefix : void 0, n && n.unstable_externalRuntimeSrc, n ? n.bootstrapScriptContent : void 0, n ? n.bootstrapScripts : void 0, n ? n.bootstrapModules : void 0), p = createRequest$1(e, u, createRenderState$1(u, n ? n.nonce : void 0, n ? n.unstable_externalRuntimeSrc : void 0, n ? n.importMap : void 0, i, n ? n.maxHeadersLength : void 0), createRootFormatContext(n ? n.namespaceURI : void 0), n ? n.progressiveChunkSize : void 0, n ? n.onError : void 0, s, function() {
      var e2 = new ReadableStream({ type: "bytes", pull: function(e3) {
        startFlowing$1(p, e3);
      }, cancel: function(e3) {
        p.destination = null, abort$1(p, e3);
      } }, { highWaterMark: 0 });
      e2.allReady = c, r(e2);
    }, function(e2) {
      c.catch(function() {
      }), a(e2);
    }, o, n ? n.onPostpone : void 0, n ? n.formState : void 0);
    if (n && n.signal) {
      var h = n.signal;
      if (h.aborted) abort$1(p, h.reason);
      else {
        var listener = function() {
          abort$1(p, h.reason), h.removeEventListener("abort", listener);
        };
        h.addEventListener("abort", listener);
      }
    }
    startWork(p);
  });
}, ep.version = "19.1.1";
var Cm = {}, Rm = Ge, Pm = St;
function formatProdErrorMessage(e) {
  var n = "https://react.dev/errors/" + e;
  if (1 < arguments.length) {
    n += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var r = 2; r < arguments.length; r++) n += "&args[]=" + encodeURIComponent(arguments[r]);
  }
  return "Minified React error #" + e + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Tm = Symbol.for("react.transitional.element"), Em = Symbol.for("react.portal"), $m = Symbol.for("react.fragment"), Fm = Symbol.for("react.strict_mode"), _m = Symbol.for("react.profiler"), Am = Symbol.for("react.provider"), Om = Symbol.for("react.consumer"), jm = Symbol.for("react.context"), Im = Symbol.for("react.forward_ref"), Mm = Symbol.for("react.suspense"), Lm = Symbol.for("react.suspense_list"), Nm = Symbol.for("react.memo"), Dm = Symbol.for("react.lazy"), Bm = Symbol.for("react.scope"), zm = Symbol.for("react.activity"), qm = Symbol.for("react.legacy_hidden"), Hm = Symbol.for("react.memo_cache_sentinel"), Um = Symbol.for("react.view_transition"), Vm = Symbol.iterator, Wm = Array.isArray;
function murmurhash3_32_gc(e, n) {
  var r = 3 & e.length, a = e.length - r, o = n;
  for (n = 0; n < a; ) {
    var s = 255 & e.charCodeAt(n) | (255 & e.charCodeAt(++n)) << 8 | (255 & e.charCodeAt(++n)) << 16 | (255 & e.charCodeAt(++n)) << 24;
    ++n, o = 27492 + (65535 & (o = 5 * (65535 & (o = (o ^= s = 461845907 * (65535 & (s = (s = 3432918353 * (65535 & s) + ((3432918353 * (s >>> 16) & 65535) << 16) & 4294967295) << 15 | s >>> 17)) + ((461845907 * (s >>> 16) & 65535) << 16) & 4294967295) << 13 | o >>> 19)) + ((5 * (o >>> 16) & 65535) << 16) & 4294967295)) + (((o >>> 16) + 58964 & 65535) << 16);
  }
  switch (s = 0, r) {
    case 3:
      s ^= (255 & e.charCodeAt(n + 2)) << 16;
    case 2:
      s ^= (255 & e.charCodeAt(n + 1)) << 8;
    case 1:
      o ^= 461845907 * (65535 & (s = (s = 3432918353 * (65535 & (s ^= 255 & e.charCodeAt(n))) + ((3432918353 * (s >>> 16) & 65535) << 16) & 4294967295) << 15 | s >>> 17)) + ((461845907 * (s >>> 16) & 65535) << 16) & 4294967295;
  }
  return o ^= e.length, o = 2246822507 * (65535 & (o ^= o >>> 16)) + ((2246822507 * (o >>> 16) & 65535) << 16) & 4294967295, ((o = 3266489909 * (65535 & (o ^= o >>> 13)) + ((3266489909 * (o >>> 16) & 65535) << 16) & 4294967295) ^ o >>> 16) >>> 0;
}
var Km = Object.assign, Gm = Object.prototype.hasOwnProperty, Qm = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Jm = {}, Xm = {};
function isAttributeNameSafe(e) {
  return !!Gm.call(Xm, e) || !Gm.call(Jm, e) && (Qm.test(e) ? Xm[e] = true : (Jm[e] = true, false));
}
var Ym = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" ")), Zm = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), ef = /["'&<>]/;
function escapeTextForBrowser(e) {
  if ("boolean" == typeof e || "number" == typeof e || "bigint" == typeof e) return "" + e;
  e = "" + e;
  var n = ef.exec(e);
  if (n) {
    var r, a = "", o = 0;
    for (r = n.index; r < e.length; r++) {
      switch (e.charCodeAt(r)) {
        case 34:
          n = "&quot;";
          break;
        case 38:
          n = "&amp;";
          break;
        case 39:
          n = "&#x27;";
          break;
        case 60:
          n = "&lt;";
          break;
        case 62:
          n = "&gt;";
          break;
        default:
          continue;
      }
      o !== r && (a += e.slice(o, r)), o = r + 1, a += n;
    }
    e = o !== r ? a + e.slice(o, r) : a;
  }
  return e;
}
var tf = /([A-Z])/g, nf = /^ms-/, rf = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function sanitizeURL(e) {
  return rf.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
}
var af = Rm.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, of = Pm.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, sf = { pending: false, data: null, method: null, action: null }, cf = of.d;
of.d = { f: cf.f, r: cf.r, D: function(e) {
  var n = og || null;
  if (n) {
    var r = n.resumableState, a = n.renderState;
    if ("string" == typeof e && e) {
      var o, s;
      if (!r.dnsResources.hasOwnProperty(e)) r.dnsResources[e] = null, (s = (r = a.headers) && 0 < r.remainingCapacity) && (o = "<" + ("" + e).replace(kf, escapeHrefForLinkHeaderURLContextReplacer) + ">; rel=dns-prefetch", s = 0 <= (r.remainingCapacity -= o.length + 2)), s ? (a.resets.dns[e] = null, r.preconnects && (r.preconnects += ", "), r.preconnects += o) : (pushLinkImpl(o = [], { href: e, rel: "dns-prefetch" }), a.preconnects.add(o));
      enqueueFlush(n);
    }
  } else cf.D(e);
}, C: function(e, n) {
  var r = og || null;
  if (r) {
    var a = r.resumableState, o = r.renderState;
    if ("string" == typeof e && e) {
      var s = "use-credentials" === n ? "credentials" : "string" == typeof n ? "anonymous" : "default";
      if (!a.connectResources[s].hasOwnProperty(e)) {
        var i, c;
        if (a.connectResources[s][e] = null, c = (a = o.headers) && 0 < a.remainingCapacity) {
          if (c = "<" + ("" + e).replace(kf, escapeHrefForLinkHeaderURLContextReplacer) + ">; rel=preconnect", "string" == typeof n) c += '; crossorigin="' + ("" + n).replace(wf, escapeStringForLinkHeaderQuotedParamValueContextReplacer) + '"';
          i = c, c = 0 <= (a.remainingCapacity -= i.length + 2);
        }
        c ? (o.resets.connect[s][e] = null, a.preconnects && (a.preconnects += ", "), a.preconnects += i) : (pushLinkImpl(s = [], { rel: "preconnect", href: e, crossOrigin: n }), o.preconnects.add(s));
      }
      enqueueFlush(r);
    }
  } else cf.C(e, n);
}, L: function(e, n, r) {
  var a = og || null;
  if (a) {
    var o = a.resumableState, s = a.renderState;
    if (n && e) {
      switch (n) {
        case "image":
          if (r) var i = r.imageSrcSet, c = r.imageSizes, l = r.fetchPriority;
          var u, p = i ? i + "\n" + (c || "") : e;
          if (o.imageResources.hasOwnProperty(p)) return;
          o.imageResources[p] = lf, (o = s.headers) && 0 < o.remainingCapacity && "string" != typeof i && "high" === l && (u = getPreloadAsHeader(e, n, r), 0 <= (o.remainingCapacity -= u.length + 2)) ? (s.resets.image[p] = lf, o.highImagePreloads && (o.highImagePreloads += ", "), o.highImagePreloads += u) : (pushLinkImpl(o = [], Km({ rel: "preload", href: i ? void 0 : e, as: n }, r)), "high" === l ? s.highImagePreloads.add(o) : (s.bulkPreloads.add(o), s.preloads.images.set(p, o)));
          break;
        case "style":
          if (o.styleResources.hasOwnProperty(e)) return;
          pushLinkImpl(i = [], Km({ rel: "preload", href: e, as: n }, r)), o.styleResources[e] = !r || "string" != typeof r.crossOrigin && "string" != typeof r.integrity ? lf : [r.crossOrigin, r.integrity], s.preloads.stylesheets.set(e, i), s.bulkPreloads.add(i);
          break;
        case "script":
          if (o.scriptResources.hasOwnProperty(e)) return;
          i = [], s.preloads.scripts.set(e, i), s.bulkPreloads.add(i), pushLinkImpl(i, Km({ rel: "preload", href: e, as: n }, r)), o.scriptResources[e] = !r || "string" != typeof r.crossOrigin && "string" != typeof r.integrity ? lf : [r.crossOrigin, r.integrity];
          break;
        default:
          if (o.unknownResources.hasOwnProperty(n)) {
            if ((i = o.unknownResources[n]).hasOwnProperty(e)) return;
          } else i = {}, o.unknownResources[n] = i;
          if (i[e] = lf, (o = s.headers) && 0 < o.remainingCapacity && "font" === n && (p = getPreloadAsHeader(e, n, r), 0 <= (o.remainingCapacity -= p.length + 2))) s.resets.font[e] = lf, o.fontPreloads && (o.fontPreloads += ", "), o.fontPreloads += p;
          else if ("font" === (pushLinkImpl(o = [], e = Km({ rel: "preload", href: e, as: n }, r)), n)) s.fontPreloads.add(o);
          else s.bulkPreloads.add(o);
      }
      enqueueFlush(a);
    }
  } else cf.L(e, n, r);
}, m: function(e, n) {
  var r = og || null;
  if (r) {
    var a = r.resumableState, o = r.renderState;
    if (e) {
      var s = n && "string" == typeof n.as ? n.as : "script";
      if ("script" === s) {
        if (a.moduleScriptResources.hasOwnProperty(e)) return;
        s = [], a.moduleScriptResources[e] = !n || "string" != typeof n.crossOrigin && "string" != typeof n.integrity ? lf : [n.crossOrigin, n.integrity], o.preloads.moduleScripts.set(e, s);
      } else {
        if (a.moduleUnknownResources.hasOwnProperty(s)) {
          var i = a.unknownResources[s];
          if (i.hasOwnProperty(e)) return;
        } else i = {}, a.moduleUnknownResources[s] = i;
        s = [], i[e] = lf;
      }
      pushLinkImpl(s, Km({ rel: "modulepreload", href: e }, n)), o.bulkPreloads.add(s), enqueueFlush(r);
    }
  } else cf.m(e, n);
}, X: function(e, n) {
  var r = og || null;
  if (r) {
    var a = r.resumableState, o = r.renderState;
    if (e) {
      var s = a.scriptResources.hasOwnProperty(e) ? a.scriptResources[e] : void 0;
      null !== s && (a.scriptResources[e] = null, n = Km({ src: e, async: true }, n), s && (2 === s.length && adoptPreloadCredentials(n, s), e = o.preloads.scripts.get(e)) && (e.length = 0), e = [], o.scripts.add(e), pushScriptImpl(e, n), enqueueFlush(r));
    }
  } else cf.X(e, n);
}, S: function(e, n, r) {
  var a = og || null;
  if (a) {
    var o = a.resumableState, s = a.renderState;
    if (e) {
      n = n || "default";
      var i = s.styles.get(n), c = o.styleResources.hasOwnProperty(e) ? o.styleResources[e] : void 0;
      null !== c && (o.styleResources[e] = null, i || (i = { precedence: escapeTextForBrowser(n), rules: [], hrefs: [], sheets: /* @__PURE__ */ new Map() }, s.styles.set(n, i)), n = { state: 0, props: Km({ rel: "stylesheet", href: e, "data-precedence": n }, r) }, c && (2 === c.length && adoptPreloadCredentials(n.props, c), (s = s.preloads.stylesheets.get(e)) && 0 < s.length ? s.length = 0 : n.state = 1), i.sheets.set(e, n), enqueueFlush(a));
    }
  } else cf.S(e, n, r);
}, M: function(e, n) {
  var r = og || null;
  if (r) {
    var a = r.resumableState, o = r.renderState;
    if (e) {
      var s = a.moduleScriptResources.hasOwnProperty(e) ? a.moduleScriptResources[e] : void 0;
      null !== s && (a.moduleScriptResources[e] = null, n = Km({ src: e, type: "module", async: true }, n), s && (2 === s.length && adoptPreloadCredentials(n, s), e = o.preloads.moduleScripts.get(e)) && (e.length = 0), e = [], o.scripts.add(e), pushScriptImpl(e, n), enqueueFlush(r));
    }
  } else cf.M(e, n);
} };
var lf = [], uf = /(<\/|<)(s)(cript)/gi;
function scriptReplacer(e, n, r, a) {
  return n + ("s" === r ? "\\u0073" : "\\u0053") + a;
}
function createPreambleState() {
  return { htmlChunks: null, headChunks: null, bodyChunks: null, contribution: 0 };
}
function createFormatContext(e, n, r) {
  return { insertionMode: e, selectedValue: n, tagScope: r };
}
function getChildFormatContext(e, n, r) {
  switch (n) {
    case "noscript":
      return createFormatContext(2, null, 1 | e.tagScope);
    case "select":
      return createFormatContext(2, null != r.value ? r.value : r.defaultValue, e.tagScope);
    case "svg":
      return createFormatContext(4, null, e.tagScope);
    case "picture":
      return createFormatContext(2, null, 2 | e.tagScope);
    case "math":
      return createFormatContext(5, null, e.tagScope);
    case "foreignObject":
      return createFormatContext(2, null, e.tagScope);
    case "table":
      return createFormatContext(6, null, e.tagScope);
    case "thead":
    case "tbody":
    case "tfoot":
      return createFormatContext(7, null, e.tagScope);
    case "colgroup":
      return createFormatContext(9, null, e.tagScope);
    case "tr":
      return createFormatContext(8, null, e.tagScope);
    case "head":
      if (2 > e.insertionMode) return createFormatContext(3, null, e.tagScope);
      break;
    case "html":
      if (0 === e.insertionMode) return createFormatContext(1, null, e.tagScope);
  }
  return 6 <= e.insertionMode || 2 > e.insertionMode ? createFormatContext(2, null, e.tagScope) : e;
}
var pf = /* @__PURE__ */ new Map();
function pushStyleAttribute(e, n) {
  if ("object" != typeof n) throw Error(formatProdErrorMessage(62));
  var r, a = true;
  for (r in n) if (Gm.call(n, r)) {
    var o = n[r];
    if (null != o && "boolean" != typeof o && "" !== o) {
      if (0 === r.indexOf("--")) {
        var s = escapeTextForBrowser(r);
        o = escapeTextForBrowser(("" + o).trim());
      } else void 0 === (s = pf.get(r)) && (s = escapeTextForBrowser(r.replace(tf, "-$1").toLowerCase().replace(nf, "-ms-")), pf.set(r, s)), o = "number" == typeof o ? 0 === o || Ym.has(r) ? "" + o : o + "px" : escapeTextForBrowser(("" + o).trim());
      a ? (a = false, e.push(' style="', s, ":", o)) : e.push(";", s, ":", o);
    }
  }
  a || e.push('"');
}
function pushBooleanAttribute(e, n, r) {
  r && "function" != typeof r && "symbol" != typeof r && e.push(" ", n, '=""');
}
function pushStringAttribute(e, n, r) {
  "function" != typeof r && "symbol" != typeof r && "boolean" != typeof r && e.push(" ", n, '="', escapeTextForBrowser(r), '"');
}
var df = escapeTextForBrowser("javascript:throw new Error('React form unexpectedly submitted.')");
function pushAdditionalFormField(e, n) {
  this.push('<input type="hidden"'), validateAdditionalFormField(e), pushStringAttribute(this, "name", n), pushStringAttribute(this, "value", e), this.push("/>");
}
function validateAdditionalFormField(e) {
  if ("string" != typeof e) throw Error(formatProdErrorMessage(480));
}
function getCustomFormFields(e, n) {
  if ("function" == typeof n.$$FORM_ACTION) {
    var r = e.nextFormID++;
    e = e.idPrefix + r;
    try {
      var a = n.$$FORM_ACTION(e);
      if (a) {
        var o = a.data;
        null != o && o.forEach(validateAdditionalFormField);
      }
      return a;
    } catch (e2) {
      if ("object" == typeof e2 && null !== e2 && "function" == typeof e2.then) throw e2;
    }
  }
  return null;
}
function pushFormActionAttribute(e, n, r, a, o, s, i, c) {
  var l = null;
  if ("function" == typeof a) {
    var u = getCustomFormFields(n, a);
    null !== u ? (c = u.name, a = u.action || "", o = u.encType, s = u.method, i = u.target, l = u.data) : (e.push(" ", "formAction", '="', df, '"'), i = s = o = a = c = null, injectFormReplayingRuntime(n, r));
  }
  return null != c && pushAttribute(e, "name", c), null != a && pushAttribute(e, "formAction", a), null != o && pushAttribute(e, "formEncType", o), null != s && pushAttribute(e, "formMethod", s), null != i && pushAttribute(e, "formTarget", i), l;
}
function pushAttribute(e, n, r) {
  switch (n) {
    case "className":
      pushStringAttribute(e, "class", r);
      break;
    case "tabIndex":
      pushStringAttribute(e, "tabindex", r);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      pushStringAttribute(e, n, r);
      break;
    case "style":
      pushStyleAttribute(e, r);
      break;
    case "src":
    case "href":
      if ("" === r) break;
    case "action":
    case "formAction":
      if (null == r || "function" == typeof r || "symbol" == typeof r || "boolean" == typeof r) break;
      r = sanitizeURL("" + r), e.push(" ", n, '="', escapeTextForBrowser(r), '"');
      break;
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "ref":
      break;
    case "autoFocus":
    case "multiple":
    case "muted":
      pushBooleanAttribute(e, n.toLowerCase(), r);
      break;
    case "xlinkHref":
      if ("function" == typeof r || "symbol" == typeof r || "boolean" == typeof r) break;
      r = sanitizeURL("" + r), e.push(" ", "xlink:href", '="', escapeTextForBrowser(r), '"');
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      "function" != typeof r && "symbol" != typeof r && e.push(" ", n, '="', escapeTextForBrowser(r), '"');
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      r && "function" != typeof r && "symbol" != typeof r && e.push(" ", n, '=""');
      break;
    case "capture":
    case "download":
      true === r ? e.push(" ", n, '=""') : false !== r && "function" != typeof r && "symbol" != typeof r && e.push(" ", n, '="', escapeTextForBrowser(r), '"');
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      "function" != typeof r && "symbol" != typeof r && !isNaN(r) && 1 <= r && e.push(" ", n, '="', escapeTextForBrowser(r), '"');
      break;
    case "rowSpan":
    case "start":
      "function" == typeof r || "symbol" == typeof r || isNaN(r) || e.push(" ", n, '="', escapeTextForBrowser(r), '"');
      break;
    case "xlinkActuate":
      pushStringAttribute(e, "xlink:actuate", r);
      break;
    case "xlinkArcrole":
      pushStringAttribute(e, "xlink:arcrole", r);
      break;
    case "xlinkRole":
      pushStringAttribute(e, "xlink:role", r);
      break;
    case "xlinkShow":
      pushStringAttribute(e, "xlink:show", r);
      break;
    case "xlinkTitle":
      pushStringAttribute(e, "xlink:title", r);
      break;
    case "xlinkType":
      pushStringAttribute(e, "xlink:type", r);
      break;
    case "xmlBase":
      pushStringAttribute(e, "xml:base", r);
      break;
    case "xmlLang":
      pushStringAttribute(e, "xml:lang", r);
      break;
    case "xmlSpace":
      pushStringAttribute(e, "xml:space", r);
      break;
    default:
      if ((!(2 < n.length) || "o" !== n[0] && "O" !== n[0] || "n" !== n[1] && "N" !== n[1]) && isAttributeNameSafe(n = Zm.get(n) || n)) {
        switch (typeof r) {
          case "function":
          case "symbol":
            return;
          case "boolean":
            var a = n.toLowerCase().slice(0, 5);
            if ("data-" !== a && "aria-" !== a) return;
        }
        e.push(" ", n, '="', escapeTextForBrowser(r), '"');
      }
  }
}
function pushInnerHTML(e, n, r) {
  if (null != n) {
    if (null != r) throw Error(formatProdErrorMessage(60));
    if ("object" != typeof n || !("__html" in n)) throw Error(formatProdErrorMessage(61));
    null != (n = n.__html) && e.push("" + n);
  }
}
function injectFormReplayingRuntime(e, n) {
  !(16 & e.instructions) && (e.instructions |= 16, n.bootstrapChunks.unshift(n.startInlineScript, `addEventListener("submit",function(a){if(!a.defaultPrevented){var c=a.target,d=a.submitter,e=c.action,b=d;if(d){var f=d.getAttribute("formAction");null!=f&&(e=f,b=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===e&&(a.preventDefault(),b?(a=document.createElement("input"),a.name=b.name,a.value=b.value,b.parentNode.insertBefore(a,b),b=new FormData(c),a.parentNode.removeChild(a)):b=new FormData(c),a=c.ownerDocument||c,(a.$$reactFormReplay=a.$$reactFormReplay||[]).push(c,d,b))}});`, "<\/script>"));
}
function pushLinkImpl(e, n) {
  for (var r in e.push(startChunkForTag("link")), n) if (Gm.call(n, r)) {
    var a = n[r];
    if (null != a) switch (r) {
      case "children":
      case "dangerouslySetInnerHTML":
        throw Error(formatProdErrorMessage(399, "link"));
      default:
        pushAttribute(e, r, a);
    }
  }
  return e.push("/>"), null;
}
var hf = /(<\/|<)(s)(tyle)/gi;
function styleReplacer(e, n, r, a) {
  return n + ("s" === r ? "\\73 " : "\\53 ") + a;
}
function pushSelfClosing(e, n, r) {
  for (var a in e.push(startChunkForTag(r)), n) if (Gm.call(n, a)) {
    var o = n[a];
    if (null != o) switch (a) {
      case "children":
      case "dangerouslySetInnerHTML":
        throw Error(formatProdErrorMessage(399, r));
      default:
        pushAttribute(e, a, o);
    }
  }
  return e.push("/>"), null;
}
function pushTitleImpl(e, n) {
  e.push(startChunkForTag("title"));
  var r, a = null, o = null;
  for (r in n) if (Gm.call(n, r)) {
    var s = n[r];
    if (null != s) switch (r) {
      case "children":
        a = s;
        break;
      case "dangerouslySetInnerHTML":
        o = s;
        break;
      default:
        pushAttribute(e, r, s);
    }
  }
  return e.push(">"), "function" != typeof (n = Array.isArray(a) ? 2 > a.length ? a[0] : null : a) && "symbol" != typeof n && null != n && e.push(escapeTextForBrowser("" + n)), pushInnerHTML(e, o, a), e.push(endChunkForTag("title")), null;
}
function pushScriptImpl(e, n) {
  e.push(startChunkForTag("script"));
  var r, a = null, o = null;
  for (r in n) if (Gm.call(n, r)) {
    var s = n[r];
    if (null != s) switch (r) {
      case "children":
        a = s;
        break;
      case "dangerouslySetInnerHTML":
        o = s;
        break;
      default:
        pushAttribute(e, r, s);
    }
  }
  return e.push(">"), pushInnerHTML(e, o, a), "string" == typeof a && e.push(("" + a).replace(uf, scriptReplacer)), e.push(endChunkForTag("script")), null;
}
function pushStartSingletonElement(e, n, r) {
  e.push(startChunkForTag(r));
  var a, o = r = null;
  for (a in n) if (Gm.call(n, a)) {
    var s = n[a];
    if (null != s) switch (a) {
      case "children":
        r = s;
        break;
      case "dangerouslySetInnerHTML":
        o = s;
        break;
      default:
        pushAttribute(e, a, s);
    }
  }
  return e.push(">"), pushInnerHTML(e, o, r), r;
}
function pushStartGenericElement(e, n, r) {
  e.push(startChunkForTag(r));
  var a, o = r = null;
  for (a in n) if (Gm.call(n, a)) {
    var s = n[a];
    if (null != s) switch (a) {
      case "children":
        r = s;
        break;
      case "dangerouslySetInnerHTML":
        o = s;
        break;
      default:
        pushAttribute(e, a, s);
    }
  }
  return e.push(">"), pushInnerHTML(e, o, r), "string" == typeof r ? (e.push(escapeTextForBrowser(r)), null) : r;
}
var mf = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, ff = /* @__PURE__ */ new Map();
function startChunkForTag(e) {
  var n = ff.get(e);
  if (void 0 === n) {
    if (!mf.test(e)) throw Error(formatProdErrorMessage(65, e));
    n = "<" + e, ff.set(e, n);
  }
  return n;
}
function pushStartInstance(e, n, r, a, o, s, i, c, l, u) {
  switch (n) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "g":
    case "p":
    case "li":
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      break;
    case "a":
      e.push(startChunkForTag("a"));
      var p, h = null, g = null;
      for (p in r) if (Gm.call(r, p)) {
        var v = r[p];
        if (null != v) switch (p) {
          case "children":
            h = v;
            break;
          case "dangerouslySetInnerHTML":
            g = v;
            break;
          case "href":
            "" === v ? pushStringAttribute(e, "href", "") : pushAttribute(e, p, v);
            break;
          default:
            pushAttribute(e, p, v);
        }
      }
      if (e.push(">"), pushInnerHTML(e, g, h), "string" == typeof h) {
        e.push(escapeTextForBrowser(h));
        var y = null;
      } else y = h;
      return y;
    case "select":
      e.push(startChunkForTag("select"));
      var b2, k = null, C = null;
      for (b2 in r) if (Gm.call(r, b2)) {
        var R2 = r[b2];
        if (null != R2) switch (b2) {
          case "children":
            k = R2;
            break;
          case "dangerouslySetInnerHTML":
            C = R2;
            break;
          case "defaultValue":
          case "value":
            break;
          default:
            pushAttribute(e, b2, R2);
        }
      }
      return e.push(">"), pushInnerHTML(e, C, k), k;
    case "option":
      var P2 = c.selectedValue;
      e.push(startChunkForTag("option"));
      var T, E2 = null, $2 = null, F = null, A = null;
      for (T in r) if (Gm.call(r, T)) {
        var O = r[T];
        if (null != O) switch (T) {
          case "children":
            E2 = O;
            break;
          case "selected":
            F = O;
            break;
          case "dangerouslySetInnerHTML":
            A = O;
            break;
          case "value":
            $2 = O;
          default:
            pushAttribute(e, T, O);
        }
      }
      if (null != P2) {
        var I2 = null !== $2 ? "" + $2 : function(e2) {
          var n2 = "";
          return Rm.Children.forEach(e2, function(e3) {
            null != e3 && (n2 += e3);
          }), n2;
        }(E2);
        if (Wm(P2)) {
          for (var N2 = 0; N2 < P2.length; N2++) if ("" + P2[N2] === I2) {
            e.push(' selected=""');
            break;
          }
        } else "" + P2 === I2 && e.push(' selected=""');
      } else F && e.push(' selected=""');
      return e.push(">"), pushInnerHTML(e, A, E2), E2;
    case "textarea":
      e.push(startChunkForTag("textarea"));
      var D2, B2 = null, q2 = null, H2 = null;
      for (D2 in r) if (Gm.call(r, D2)) {
        var V2 = r[D2];
        if (null != V2) switch (D2) {
          case "children":
            H2 = V2;
            break;
          case "value":
            B2 = V2;
            break;
          case "defaultValue":
            q2 = V2;
            break;
          case "dangerouslySetInnerHTML":
            throw Error(formatProdErrorMessage(91));
          default:
            pushAttribute(e, D2, V2);
        }
      }
      if (null === B2 && null !== q2 && (B2 = q2), e.push(">"), null != H2) {
        if (null != B2) throw Error(formatProdErrorMessage(92));
        if (Wm(H2)) {
          if (1 < H2.length) throw Error(formatProdErrorMessage(93));
          B2 = "" + H2[0];
        }
        B2 = "" + H2;
      }
      return "string" == typeof B2 && "\n" === B2[0] && e.push("\n"), null !== B2 && e.push(escapeTextForBrowser("" + B2)), null;
    case "input":
      e.push(startChunkForTag("input"));
      var W2, G2 = null, Q2 = null, X2 = null, Y2 = null, Z2 = null, ee2 = null, te2 = null, ne2 = null, re2 = null;
      for (W2 in r) if (Gm.call(r, W2)) {
        var ae2 = r[W2];
        if (null != ae2) switch (W2) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(formatProdErrorMessage(399, "input"));
          case "name":
            G2 = ae2;
            break;
          case "formAction":
            Q2 = ae2;
            break;
          case "formEncType":
            X2 = ae2;
            break;
          case "formMethod":
            Y2 = ae2;
            break;
          case "formTarget":
            Z2 = ae2;
            break;
          case "defaultChecked":
            re2 = ae2;
            break;
          case "defaultValue":
            te2 = ae2;
            break;
          case "checked":
            ne2 = ae2;
            break;
          case "value":
            ee2 = ae2;
            break;
          default:
            pushAttribute(e, W2, ae2);
        }
      }
      var oe2 = pushFormActionAttribute(e, a, o, Q2, X2, Y2, Z2, G2);
      return null !== ne2 ? pushBooleanAttribute(e, "checked", ne2) : null !== re2 && pushBooleanAttribute(e, "checked", re2), null !== ee2 ? pushAttribute(e, "value", ee2) : null !== te2 && pushAttribute(e, "value", te2), e.push("/>"), null != oe2 && oe2.forEach(pushAdditionalFormField, e), null;
    case "button":
      e.push(startChunkForTag("button"));
      var ie2, ce2 = null, le2 = null, ue2 = null, pe2 = null, de2 = null, he2 = null, ge2 = null;
      for (ie2 in r) if (Gm.call(r, ie2)) {
        var ve2 = r[ie2];
        if (null != ve2) switch (ie2) {
          case "children":
            ce2 = ve2;
            break;
          case "dangerouslySetInnerHTML":
            le2 = ve2;
            break;
          case "name":
            ue2 = ve2;
            break;
          case "formAction":
            pe2 = ve2;
            break;
          case "formEncType":
            de2 = ve2;
            break;
          case "formMethod":
            he2 = ve2;
            break;
          case "formTarget":
            ge2 = ve2;
            break;
          default:
            pushAttribute(e, ie2, ve2);
        }
      }
      var ye2 = pushFormActionAttribute(e, a, o, pe2, de2, he2, ge2, ue2);
      if (e.push(">"), null != ye2 && ye2.forEach(pushAdditionalFormField, e), pushInnerHTML(e, le2, ce2), "string" == typeof ce2) {
        e.push(escapeTextForBrowser(ce2));
        var be2 = null;
      } else be2 = ce2;
      return be2;
    case "form":
      e.push(startChunkForTag("form"));
      var xe2, Se2 = null, ke2 = null, we2 = null, Ce2 = null, Re2 = null, Pe2 = null;
      for (xe2 in r) if (Gm.call(r, xe2)) {
        var Te2 = r[xe2];
        if (null != Te2) switch (xe2) {
          case "children":
            Se2 = Te2;
            break;
          case "dangerouslySetInnerHTML":
            ke2 = Te2;
            break;
          case "action":
            we2 = Te2;
            break;
          case "encType":
            Ce2 = Te2;
            break;
          case "method":
            Re2 = Te2;
            break;
          case "target":
            Pe2 = Te2;
            break;
          default:
            pushAttribute(e, xe2, Te2);
        }
      }
      var Ee2 = null, $e2 = null;
      if ("function" == typeof we2) {
        var Fe2 = getCustomFormFields(a, we2);
        null !== Fe2 ? (we2 = Fe2.action || "", Ce2 = Fe2.encType, Re2 = Fe2.method, Pe2 = Fe2.target, Ee2 = Fe2.data, $e2 = Fe2.name) : (e.push(" ", "action", '="', df, '"'), Pe2 = Re2 = Ce2 = we2 = null, injectFormReplayingRuntime(a, o));
      }
      if (null != we2 && pushAttribute(e, "action", we2), null != Ce2 && pushAttribute(e, "encType", Ce2), null != Re2 && pushAttribute(e, "method", Re2), null != Pe2 && pushAttribute(e, "target", Pe2), e.push(">"), null !== $e2 && (e.push('<input type="hidden"'), pushStringAttribute(e, "name", $e2), e.push("/>"), null != Ee2 && Ee2.forEach(pushAdditionalFormField, e)), pushInnerHTML(e, ke2, Se2), "string" == typeof Se2) {
        e.push(escapeTextForBrowser(Se2));
        var _e2 = null;
      } else _e2 = Se2;
      return _e2;
    case "menuitem":
      for (var Ae2 in e.push(startChunkForTag("menuitem")), r) if (Gm.call(r, Ae2)) {
        var Oe2 = r[Ae2];
        if (null != Oe2) switch (Ae2) {
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(formatProdErrorMessage(400));
          default:
            pushAttribute(e, Ae2, Oe2);
        }
      }
      return e.push(">"), null;
    case "object":
      e.push(startChunkForTag("object"));
      var Ie2, Me2 = null, Ne2 = null;
      for (Ie2 in r) if (Gm.call(r, Ie2)) {
        var De2 = r[Ie2];
        if (null != De2) switch (Ie2) {
          case "children":
            Me2 = De2;
            break;
          case "dangerouslySetInnerHTML":
            Ne2 = De2;
            break;
          case "data":
            var Be2 = sanitizeURL("" + De2);
            if ("" === Be2) break;
            e.push(" ", "data", '="', escapeTextForBrowser(Be2), '"');
            break;
          default:
            pushAttribute(e, Ie2, De2);
        }
      }
      if (e.push(">"), pushInnerHTML(e, Ne2, Me2), "string" == typeof Me2) {
        e.push(escapeTextForBrowser(Me2));
        var ze2 = null;
      } else ze2 = Me2;
      return ze2;
    case "title":
      if (4 === c.insertionMode || 1 & c.tagScope || null != r.itemProp) var qe2 = pushTitleImpl(e, r);
      else u ? qe2 = null : (pushTitleImpl(o.hoistableChunks, r), qe2 = void 0);
      return qe2;
    case "link":
      var He2 = r.rel, Ue2 = r.href, Ve2 = r.precedence;
      if (4 === c.insertionMode || 1 & c.tagScope || null != r.itemProp || "string" != typeof He2 || "string" != typeof Ue2 || "" === Ue2) {
        pushLinkImpl(e, r);
        var We2 = null;
      } else if ("stylesheet" === r.rel) if ("string" != typeof Ve2 || null != r.disabled || r.onLoad || r.onError) We2 = pushLinkImpl(e, r);
      else {
        var Ke2 = o.styles.get(Ve2), Ge2 = a.styleResources.hasOwnProperty(Ue2) ? a.styleResources[Ue2] : void 0;
        if (null !== Ge2) {
          a.styleResources[Ue2] = null, Ke2 || (Ke2 = { precedence: escapeTextForBrowser(Ve2), rules: [], hrefs: [], sheets: /* @__PURE__ */ new Map() }, o.styles.set(Ve2, Ke2));
          var Qe2 = { state: 0, props: Km({}, r, { "data-precedence": r.precedence, precedence: null }) };
          if (Ge2) {
            2 === Ge2.length && adoptPreloadCredentials(Qe2.props, Ge2);
            var Je2 = o.preloads.stylesheets.get(Ue2);
            Je2 && 0 < Je2.length ? Je2.length = 0 : Qe2.state = 1;
          }
          Ke2.sheets.set(Ue2, Qe2), i && i.stylesheets.add(Qe2);
        } else if (Ke2) {
          var Xe2 = Ke2.sheets.get(Ue2);
          Xe2 && i && i.stylesheets.add(Xe2);
        }
        l && e.push("<!-- -->"), We2 = null;
      }
      else r.onLoad || r.onError ? We2 = pushLinkImpl(e, r) : (l && e.push("<!-- -->"), We2 = u ? null : pushLinkImpl(o.hoistableChunks, r));
      return We2;
    case "script":
      var Ze2 = r.async;
      if ("string" != typeof r.src || !r.src || !Ze2 || "function" == typeof Ze2 || "symbol" == typeof Ze2 || r.onLoad || r.onError || 4 === c.insertionMode || 1 & c.tagScope || null != r.itemProp) var et2 = pushScriptImpl(e, r);
      else {
        var tt2 = r.src;
        if ("module" === r.type) var nt2 = a.moduleScriptResources, rt2 = o.preloads.moduleScripts;
        else nt2 = a.scriptResources, rt2 = o.preloads.scripts;
        var at2 = nt2.hasOwnProperty(tt2) ? nt2[tt2] : void 0;
        if (null !== at2) {
          nt2[tt2] = null;
          var ot2 = r;
          if (at2) {
            2 === at2.length && adoptPreloadCredentials(ot2 = Km({}, r), at2);
            var st2 = rt2.get(tt2);
            st2 && (st2.length = 0);
          }
          var it2 = [];
          o.scripts.add(it2), pushScriptImpl(it2, ot2);
        }
        l && e.push("<!-- -->"), et2 = null;
      }
      return et2;
    case "style":
      var ct2 = r.precedence, lt2 = r.href;
      if (4 === c.insertionMode || 1 & c.tagScope || null != r.itemProp || "string" != typeof ct2 || "string" != typeof lt2 || "" === lt2) {
        e.push(startChunkForTag("style"));
        var ut2, pt2 = null, dt2 = null;
        for (ut2 in r) if (Gm.call(r, ut2)) {
          var ht2 = r[ut2];
          if (null != ht2) switch (ut2) {
            case "children":
              pt2 = ht2;
              break;
            case "dangerouslySetInnerHTML":
              dt2 = ht2;
              break;
            default:
              pushAttribute(e, ut2, ht2);
          }
        }
        e.push(">");
        var mt2 = Array.isArray(pt2) ? 2 > pt2.length ? pt2[0] : null : pt2;
        "function" != typeof mt2 && "symbol" != typeof mt2 && null != mt2 && e.push(("" + mt2).replace(hf, styleReplacer)), pushInnerHTML(e, dt2, pt2), e.push(endChunkForTag("style"));
        var ft2 = null;
      } else {
        var gt2 = o.styles.get(ct2);
        if (null !== (a.styleResources.hasOwnProperty(lt2) ? a.styleResources[lt2] : void 0)) {
          a.styleResources[lt2] = null, gt2 ? gt2.hrefs.push(escapeTextForBrowser(lt2)) : (gt2 = { precedence: escapeTextForBrowser(ct2), rules: [], hrefs: [escapeTextForBrowser(lt2)], sheets: /* @__PURE__ */ new Map() }, o.styles.set(ct2, gt2));
          var vt2, yt2 = gt2.rules, bt2 = null, xt2 = null;
          for (vt2 in r) if (Gm.call(r, vt2)) {
            var St2 = r[vt2];
            if (null != St2) switch (vt2) {
              case "children":
                bt2 = St2;
                break;
              case "dangerouslySetInnerHTML":
                xt2 = St2;
            }
          }
          var kt2 = Array.isArray(bt2) ? 2 > bt2.length ? bt2[0] : null : bt2;
          "function" != typeof kt2 && "symbol" != typeof kt2 && null != kt2 && yt2.push(("" + kt2).replace(hf, styleReplacer)), pushInnerHTML(yt2, xt2, bt2);
        }
        gt2 && i && i.styles.add(gt2), l && e.push("<!-- -->"), ft2 = void 0;
      }
      return ft2;
    case "meta":
      if (4 === c.insertionMode || 1 & c.tagScope || null != r.itemProp) var wt2 = pushSelfClosing(e, r, "meta");
      else l && e.push("<!-- -->"), wt2 = u ? null : "string" == typeof r.charSet ? pushSelfClosing(o.charsetChunks, r, "meta") : "viewport" === r.name ? pushSelfClosing(o.viewportChunks, r, "meta") : pushSelfClosing(o.hoistableChunks, r, "meta");
      return wt2;
    case "listing":
    case "pre":
      e.push(startChunkForTag(n));
      var Ct2, Rt2 = null, Pt2 = null;
      for (Ct2 in r) if (Gm.call(r, Ct2)) {
        var Tt2 = r[Ct2];
        if (null != Tt2) switch (Ct2) {
          case "children":
            Rt2 = Tt2;
            break;
          case "dangerouslySetInnerHTML":
            Pt2 = Tt2;
            break;
          default:
            pushAttribute(e, Ct2, Tt2);
        }
      }
      if (e.push(">"), null != Pt2) {
        if (null != Rt2) throw Error(formatProdErrorMessage(60));
        if ("object" != typeof Pt2 || !("__html" in Pt2)) throw Error(formatProdErrorMessage(61));
        var Et2 = Pt2.__html;
        null != Et2 && ("string" == typeof Et2 && 0 < Et2.length && "\n" === Et2[0] ? e.push("\n", Et2) : e.push("" + Et2));
      }
      return "string" == typeof Rt2 && "\n" === Rt2[0] && e.push("\n"), Rt2;
    case "img":
      var $t2 = r.src, Ft2 = r.srcSet;
      if (!("lazy" === r.loading || !$t2 && !Ft2 || "string" != typeof $t2 && null != $t2 || "string" != typeof Ft2 && null != Ft2) && "low" !== r.fetchPriority && false == !!(3 & c.tagScope) && ("string" != typeof $t2 || ":" !== $t2[4] || "d" !== $t2[0] && "D" !== $t2[0] || "a" !== $t2[1] && "A" !== $t2[1] || "t" !== $t2[2] && "T" !== $t2[2] || "a" !== $t2[3] && "A" !== $t2[3]) && ("string" != typeof Ft2 || ":" !== Ft2[4] || "d" !== Ft2[0] && "D" !== Ft2[0] || "a" !== Ft2[1] && "A" !== Ft2[1] || "t" !== Ft2[2] && "T" !== Ft2[2] || "a" !== Ft2[3] && "A" !== Ft2[3])) {
        var _t2 = "string" == typeof r.sizes ? r.sizes : void 0, At2 = Ft2 ? Ft2 + "\n" + (_t2 || "") : $t2, Ot2 = o.preloads.images, jt2 = Ot2.get(At2);
        if (jt2) ("high" === r.fetchPriority || 10 > o.highImagePreloads.size) && (Ot2.delete(At2), o.highImagePreloads.add(jt2));
        else if (!a.imageResources.hasOwnProperty(At2)) {
          a.imageResources[At2] = lf;
          var It2, Mt2 = r.crossOrigin, Lt2 = "string" == typeof Mt2 ? "use-credentials" === Mt2 ? Mt2 : "" : void 0, Nt2 = o.headers;
          Nt2 && 0 < Nt2.remainingCapacity && "string" != typeof r.srcSet && ("high" === r.fetchPriority || 500 > Nt2.highImagePreloads.length) && (It2 = getPreloadAsHeader($t2, "image", { imageSrcSet: r.srcSet, imageSizes: r.sizes, crossOrigin: Lt2, integrity: r.integrity, nonce: r.nonce, type: r.type, fetchPriority: r.fetchPriority, referrerPolicy: r.refererPolicy }), 0 <= (Nt2.remainingCapacity -= It2.length + 2)) ? (o.resets.image[At2] = lf, Nt2.highImagePreloads && (Nt2.highImagePreloads += ", "), Nt2.highImagePreloads += It2) : (pushLinkImpl(jt2 = [], { rel: "preload", as: "image", href: Ft2 ? void 0 : $t2, imageSrcSet: Ft2, imageSizes: _t2, crossOrigin: Lt2, integrity: r.integrity, type: r.type, fetchPriority: r.fetchPriority, referrerPolicy: r.referrerPolicy }), "high" === r.fetchPriority || 10 > o.highImagePreloads.size ? o.highImagePreloads.add(jt2) : (o.bulkPreloads.add(jt2), Ot2.set(At2, jt2)));
        }
      }
      return pushSelfClosing(e, r, "img");
    case "base":
    case "area":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "param":
    case "source":
    case "track":
    case "wbr":
      return pushSelfClosing(e, r, n);
    case "head":
      if (2 > c.insertionMode) {
        var Dt2 = s || o.preamble;
        if (Dt2.headChunks) throw Error(formatProdErrorMessage(545, "`<head>`"));
        Dt2.headChunks = [];
        var Bt2 = pushStartSingletonElement(Dt2.headChunks, r, "head");
      } else Bt2 = pushStartGenericElement(e, r, "head");
      return Bt2;
    case "body":
      if (2 > c.insertionMode) {
        var zt2 = s || o.preamble;
        if (zt2.bodyChunks) throw Error(formatProdErrorMessage(545, "`<body>`"));
        zt2.bodyChunks = [];
        var qt2 = pushStartSingletonElement(zt2.bodyChunks, r, "body");
      } else qt2 = pushStartGenericElement(e, r, "body");
      return qt2;
    case "html":
      if (0 === c.insertionMode) {
        var Ht2 = s || o.preamble;
        if (Ht2.htmlChunks) throw Error(formatProdErrorMessage(545, "`<html>`"));
        Ht2.htmlChunks = [""];
        var Ut2 = pushStartSingletonElement(Ht2.htmlChunks, r, "html");
      } else Ut2 = pushStartGenericElement(e, r, "html");
      return Ut2;
    default:
      if (-1 !== n.indexOf("-")) {
        e.push(startChunkForTag(n));
        var Vt2, Wt2 = null, Kt2 = null;
        for (Vt2 in r) if (Gm.call(r, Vt2)) {
          var Gt2 = r[Vt2];
          if (null != Gt2) {
            var Qt2 = Vt2;
            switch (Vt2) {
              case "children":
                Wt2 = Gt2;
                break;
              case "dangerouslySetInnerHTML":
                Kt2 = Gt2;
                break;
              case "style":
                pushStyleAttribute(e, Gt2);
                break;
              case "suppressContentEditableWarning":
              case "suppressHydrationWarning":
              case "ref":
                break;
              case "className":
                Qt2 = "class";
              default:
                if (isAttributeNameSafe(Vt2) && "function" != typeof Gt2 && "symbol" != typeof Gt2 && false !== Gt2) {
                  if (true === Gt2) Gt2 = "";
                  else if ("object" == typeof Gt2) continue;
                  e.push(" ", Qt2, '="', escapeTextForBrowser(Gt2), '"');
                }
            }
          }
        }
        return e.push(">"), pushInnerHTML(e, Kt2, Wt2), Wt2;
      }
  }
  return pushStartGenericElement(e, r, n);
}
var gf = /* @__PURE__ */ new Map();
function endChunkForTag(e) {
  var n = gf.get(e);
  return void 0 === n && (n = "</" + e + ">", gf.set(e, n)), n;
}
function hoistPreambleState(e, n) {
  null === (e = e.preamble).htmlChunks && n.htmlChunks && (e.htmlChunks = n.htmlChunks, n.contribution |= 1), null === e.headChunks && n.headChunks && (e.headChunks = n.headChunks, n.contribution |= 4), null === e.bodyChunks && n.bodyChunks && (e.bodyChunks = n.bodyChunks, n.contribution |= 2);
}
function writeBootstrap(e, n) {
  n = n.bootstrapChunks;
  for (var r = 0; r < n.length - 1; r++) e.push(n[r]);
  return !(r < n.length) || (r = n[r], n.length = 0, e.push(r));
}
function writeStartPendingSuspenseBoundary(e, n, r) {
  if (e.push('<!--$?--><template id="'), null === r) throw Error(formatProdErrorMessage(395));
  return e.push(n.boundaryPrefix), n = r.toString(16), e.push(n), e.push('"></template>');
}
function writePreambleContribution(e, n) {
  0 !== (n = n.contribution) && (e.push("<!--"), e.push("" + n), e.push("-->"));
}
var vf = /[<\u2028\u2029]/g;
function escapeJSStringsForInstructionScripts(e) {
  return JSON.stringify(e).replace(vf, function(e2) {
    switch (e2) {
      case "<":
        return "\\u003c";
      case "\u2028":
        return "\\u2028";
      case "\u2029":
        return "\\u2029";
      default:
        throw Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
    }
  });
}
var yf = /[&><\u2028\u2029]/g;
function escapeJSObjectForInstructionScripts(e) {
  return JSON.stringify(e).replace(yf, function(e2) {
    switch (e2) {
      case "&":
        return "\\u0026";
      case ">":
        return "\\u003e";
      case "<":
        return "\\u003c";
      case "\u2028":
        return "\\u2028";
      case "\u2029":
        return "\\u2029";
      default:
        throw Error("escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
    }
  });
}
var bf = false, xf = true;
function flushStyleTagsLateForBoundary(e) {
  var n = e.rules, r = e.hrefs, a = 0;
  if (r.length) {
    for (this.push('<style media="not all" data-precedence="'), this.push(e.precedence), this.push('" data-href="'); a < r.length - 1; a++) this.push(r[a]), this.push(" ");
    for (this.push(r[a]), this.push('">'), a = 0; a < n.length; a++) this.push(n[a]);
    xf = this.push("</style>"), bf = true, n.length = 0, r.length = 0;
  }
}
function hasStylesToHoist(e) {
  return 2 !== e.state && (bf = true);
}
function writeHoistablesForBoundary(e, n, r) {
  return bf = false, xf = true, n.styles.forEach(flushStyleTagsLateForBoundary, e), n.stylesheets.forEach(hasStylesToHoist), bf && (r.stylesToHoist = true), xf;
}
function flushResource(e) {
  for (var n = 0; n < e.length; n++) this.push(e[n]);
  e.length = 0;
}
var Sf = [];
function flushStyleInPreamble(e) {
  pushLinkImpl(Sf, e.props);
  for (var n = 0; n < Sf.length; n++) this.push(Sf[n]);
  Sf.length = 0, e.state = 2;
}
function flushStylesInPreamble(e) {
  var n = 0 < e.sheets.size;
  e.sheets.forEach(flushStyleInPreamble, this), e.sheets.clear();
  var r = e.rules, a = e.hrefs;
  if (!n || a.length) {
    if (this.push('<style data-precedence="'), this.push(e.precedence), e = 0, a.length) {
      for (this.push('" data-href="'); e < a.length - 1; e++) this.push(a[e]), this.push(" ");
      this.push(a[e]);
    }
    for (this.push('">'), e = 0; e < r.length; e++) this.push(r[e]);
    this.push("</style>"), r.length = 0, a.length = 0;
  }
}
function preloadLateStyle(e) {
  if (0 === e.state) {
    e.state = 1;
    var n = e.props;
    for (pushLinkImpl(Sf, { rel: "preload", as: "style", href: e.props.href, crossOrigin: n.crossOrigin, fetchPriority: n.fetchPriority, integrity: n.integrity, media: n.media, hrefLang: n.hrefLang, referrerPolicy: n.referrerPolicy }), e = 0; e < Sf.length; e++) this.push(Sf[e]);
    Sf.length = 0;
  }
}
function preloadLateStyles(e) {
  e.sheets.forEach(preloadLateStyle, this), e.sheets.clear();
}
function writeStyleResourceAttributeInJS(e, n, r) {
  var a = n.toLowerCase();
  switch (typeof r) {
    case "function":
    case "symbol":
      return;
  }
  switch (n) {
    case "innerHTML":
    case "dangerouslySetInnerHTML":
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "style":
    case "ref":
      return;
    case "className":
      a = "class", n = "" + r;
      break;
    case "hidden":
      if (false === r) return;
      n = "";
      break;
    case "src":
    case "href":
      n = "" + (r = sanitizeURL(r));
      break;
    default:
      if (2 < n.length && ("o" === n[0] || "O" === n[0]) && ("n" === n[1] || "N" === n[1]) || !isAttributeNameSafe(n)) return;
      n = "" + r;
  }
  e.push(","), a = escapeJSObjectForInstructionScripts(a), e.push(a), e.push(","), a = escapeJSObjectForInstructionScripts(n), e.push(a);
}
function createHoistableState() {
  return { styles: /* @__PURE__ */ new Set(), stylesheets: /* @__PURE__ */ new Set() };
}
function adoptPreloadCredentials(e, n) {
  null == e.crossOrigin && (e.crossOrigin = n[0]), null == e.integrity && (e.integrity = n[1]);
}
function getPreloadAsHeader(e, n, r) {
  for (var a in n = "<" + (e = ("" + e).replace(kf, escapeHrefForLinkHeaderURLContextReplacer)) + '>; rel=preload; as="' + (n = ("" + n).replace(wf, escapeStringForLinkHeaderQuotedParamValueContextReplacer)) + '"', r) Gm.call(r, a) && ("string" == typeof (e = r[a]) && (n += "; " + a.toLowerCase() + '="' + ("" + e).replace(wf, escapeStringForLinkHeaderQuotedParamValueContextReplacer) + '"'));
  return n;
}
var kf = /[<>\r\n]/g;
function escapeHrefForLinkHeaderURLContextReplacer(e) {
  switch (e) {
    case "<":
      return "%3C";
    case ">":
      return "%3E";
    case "\n":
      return "%0A";
    case "\r":
      return "%0D";
    default:
      throw Error("escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
  }
}
var wf = /["';,\r\n]/g;
function escapeStringForLinkHeaderQuotedParamValueContextReplacer(e) {
  switch (e) {
    case '"':
      return "%22";
    case "'":
      return "%27";
    case ";":
      return "%3B";
    case ",":
      return "%2C";
    case "\n":
      return "%0A";
    case "\r":
      return "%0D";
    default:
      throw Error("escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
  }
}
function hoistStyleQueueDependency(e) {
  this.styles.add(e);
}
function hoistStylesheetDependency(e) {
  this.stylesheets.add(e);
}
function pushTextInstance(e, n, r, a) {
  return r.generateStaticMarkup ? (e.push(escapeTextForBrowser(n)), false) : ("" === n ? e = a : (a && e.push("<!-- -->"), e.push(escapeTextForBrowser(n)), e = true), e);
}
function pushSegmentFinale(e, n, r, a) {
  n.generateStaticMarkup || r && a && e.push("<!-- -->");
}
var Cf = Function.prototype.bind, Rf = Symbol.for("react.client.reference");
function getComponentNameFromType(e) {
  if (null == e) return null;
  if ("function" == typeof e) return e.$$typeof === Rf ? null : e.displayName || e.name || null;
  if ("string" == typeof e) return e;
  switch (e) {
    case $m:
      return "Fragment";
    case _m:
      return "Profiler";
    case Fm:
      return "StrictMode";
    case Mm:
      return "Suspense";
    case Lm:
      return "SuspenseList";
    case zm:
      return "Activity";
  }
  if ("object" == typeof e) switch (e.$$typeof) {
    case Em:
      return "Portal";
    case jm:
      return (e.displayName || "Context") + ".Provider";
    case Om:
      return (e._context.displayName || "Context") + ".Consumer";
    case Im:
      var n = e.render;
      return (e = e.displayName) || (e = "" !== (e = n.displayName || n.name || "") ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Nm:
      return null !== (n = e.displayName || null) ? n : getComponentNameFromType(e.type) || "Memo";
    case Dm:
      n = e._payload, e = e._init;
      try {
        return getComponentNameFromType(e(n));
      } catch (e2) {
      }
  }
  return null;
}
var Pf = {}, Tf = null;
function popToNearestCommonAncestor(e, n) {
  if (e !== n) {
    e.context._currentValue2 = e.parentValue, e = e.parent;
    var r = n.parent;
    if (null === e) {
      if (null !== r) throw Error(formatProdErrorMessage(401));
    } else {
      if (null === r) throw Error(formatProdErrorMessage(401));
      popToNearestCommonAncestor(e, r);
    }
    n.context._currentValue2 = n.value;
  }
}
function popAllPrevious(e) {
  e.context._currentValue2 = e.parentValue, null !== (e = e.parent) && popAllPrevious(e);
}
function pushAllNext(e) {
  var n = e.parent;
  null !== n && pushAllNext(n), e.context._currentValue2 = e.value;
}
function popPreviousToCommonLevel(e, n) {
  if (e.context._currentValue2 = e.parentValue, null === (e = e.parent)) throw Error(formatProdErrorMessage(402));
  e.depth === n.depth ? popToNearestCommonAncestor(e, n) : popPreviousToCommonLevel(e, n);
}
function popNextToCommonLevel(e, n) {
  var r = n.parent;
  if (null === r) throw Error(formatProdErrorMessage(402));
  e.depth === r.depth ? popToNearestCommonAncestor(e, r) : popNextToCommonLevel(e, r), n.context._currentValue2 = n.value;
}
function switchContext(e) {
  var n = Tf;
  n !== e && (null === n ? pushAllNext(e) : null === e ? popAllPrevious(n) : n.depth === e.depth ? popToNearestCommonAncestor(n, e) : n.depth > e.depth ? popPreviousToCommonLevel(n, e) : popNextToCommonLevel(n, e), Tf = e);
}
var Ef = { enqueueSetState: function(e, n) {
  null !== (e = e._reactInternals).queue && e.queue.push(n);
}, enqueueReplaceState: function(e, n) {
  (e = e._reactInternals).replace = true, e.queue = [n];
}, enqueueForceUpdate: function() {
} }, $f = { id: 1, overflow: "" };
function pushTreeContext(e, n, r) {
  var a = e.id;
  e = e.overflow;
  var o = 32 - Ff(a) - 1;
  a &= ~(1 << o), r += 1;
  var s = 32 - Ff(n) + o;
  if (30 < s) {
    var i = o - o % 5;
    return s = (a & (1 << i) - 1).toString(32), a >>= i, o -= i, { id: 1 << 32 - Ff(n) + o | r << o | a, overflow: s + e };
  }
  return { id: 1 << s | r << o | a, overflow: e };
}
var Ff = Math.clz32 ? Math.clz32 : function(e) {
  return e >>>= 0, 0 === e ? 32 : 31 - (_f(e) / Af | 0) | 0;
}, _f = Math.log, Af = Math.LN2;
var Of = Error(formatProdErrorMessage(460));
function noop$2() {
}
var jf = null;
function getSuspendedThenable() {
  if (null === jf) throw Error(formatProdErrorMessage(459));
  var e = jf;
  return jf = null, e;
}
var If = "function" == typeof Object.is ? Object.is : function(e, n) {
  return e === n && (0 !== e || 1 / e == 1 / n) || e != e && n != n;
}, Mf = null, Lf = null, Nf = null, Df = null, Bf = null, zf = null, qf = false, Hf = false, Uf = 0, Vf = 0, Wf = -1, Kf = 0, Gf = null, Qf = null, Jf = 0;
function resolveCurrentlyRenderingComponent() {
  if (null === Mf) throw Error(formatProdErrorMessage(321));
  return Mf;
}
function createHook() {
  if (0 < Jf) throw Error(formatProdErrorMessage(312));
  return { memoizedState: null, queue: null, next: null };
}
function createWorkInProgressHook() {
  return null === zf ? null === Bf ? (qf = false, Bf = zf = createHook()) : (qf = true, zf = Bf) : null === zf.next ? (qf = false, zf = zf.next = createHook()) : (qf = true, zf = zf.next), zf;
}
function getThenableStateAfterSuspending() {
  var e = Gf;
  return Gf = null, e;
}
function resetHooksState() {
  Df = Nf = Lf = Mf = null, Hf = false, Bf = null, Jf = 0, zf = Qf = null;
}
function basicStateReducer(e, n) {
  return "function" == typeof n ? n(e) : n;
}
function useReducer(e, n, r) {
  if (Mf = resolveCurrentlyRenderingComponent(), zf = createWorkInProgressHook(), qf) {
    var a = zf.queue;
    if (n = a.dispatch, null !== Qf && void 0 !== (r = Qf.get(a))) {
      Qf.delete(a), a = zf.memoizedState;
      do {
        a = e(a, r.action), r = r.next;
      } while (null !== r);
      return zf.memoizedState = a, [a, n];
    }
    return [zf.memoizedState, n];
  }
  return e = e === basicStateReducer ? "function" == typeof n ? n() : n : void 0 !== r ? r(n) : n, zf.memoizedState = e, e = (e = zf.queue = { last: null, dispatch: null }).dispatch = dispatchAction.bind(null, Mf, e), [zf.memoizedState, e];
}
function useMemo(e, n) {
  if (Mf = resolveCurrentlyRenderingComponent(), n = void 0 === n ? null : n, null !== (zf = createWorkInProgressHook())) {
    var r = zf.memoizedState;
    if (null !== r && null !== n) {
      var a = r[1];
      e: if (null === a) a = false;
      else {
        for (var o = 0; o < a.length && o < n.length; o++) if (!If(n[o], a[o])) {
          a = false;
          break e;
        }
        a = true;
      }
      if (a) return r[0];
    }
  }
  return e = e(), zf.memoizedState = [e, n], e;
}
function dispatchAction(e, n, r) {
  if (25 <= Jf) throw Error(formatProdErrorMessage(301));
  if (e === Mf) if (Hf = true, e = { action: r, next: null }, null === Qf && (Qf = /* @__PURE__ */ new Map()), void 0 === (r = Qf.get(n))) Qf.set(n, e);
  else {
    for (n = r; null !== n.next; ) n = n.next;
    n.next = e;
  }
}
function unsupportedStartTransition() {
  throw Error(formatProdErrorMessage(394));
}
function unsupportedSetOptimisticState() {
  throw Error(formatProdErrorMessage(479));
}
function useActionState(e, n, r) {
  resolveCurrentlyRenderingComponent();
  var a = Vf++, o = Nf;
  if ("function" == typeof e.$$FORM_ACTION) {
    var s = null, i = Df;
    o = o.formState;
    var c = e.$$IS_SIGNATURE_EQUAL;
    if (null !== o && "function" == typeof c) {
      var l = o[1];
      c.call(e, o[2], o[3]) && (l === (s = void 0 !== r ? "p" + r : "k" + murmurhash3_32_gc(JSON.stringify([i, null, a]), 0)) && (Wf = a, n = o[0]));
    }
    var u = e.bind(null, n);
    return e = function(e2) {
      u(e2);
    }, "function" == typeof u.$$FORM_ACTION && (e.$$FORM_ACTION = function(e2) {
      e2 = u.$$FORM_ACTION(e2), void 0 !== r && (r += "", e2.action = r);
      var n2 = e2.data;
      return n2 && (null === s && (s = void 0 !== r ? "p" + r : "k" + murmurhash3_32_gc(JSON.stringify([i, null, a]), 0)), n2.append("$ACTION_KEY", s)), e2;
    }), [n, e, false];
  }
  var p = e.bind(null, n);
  return [n, function(e2) {
    p(e2);
  }, false];
}
function unwrapThenable(e) {
  var n = Kf;
  return Kf += 1, null === Gf && (Gf = []), function(e2, n2, r) {
    switch (void 0 === (r = e2[r]) ? e2.push(n2) : r !== n2 && (n2.then(noop$2, noop$2), n2 = r), n2.status) {
      case "fulfilled":
        return n2.value;
      case "rejected":
        throw n2.reason;
      default:
        switch ("string" == typeof n2.status ? n2.then(noop$2, noop$2) : ((e2 = n2).status = "pending", e2.then(function(e3) {
          if ("pending" === n2.status) {
            var r2 = n2;
            r2.status = "fulfilled", r2.value = e3;
          }
        }, function(e3) {
          if ("pending" === n2.status) {
            var r2 = n2;
            r2.status = "rejected", r2.reason = e3;
          }
        })), n2.status) {
          case "fulfilled":
            return n2.value;
          case "rejected":
            throw n2.reason;
        }
        throw jf = n2, Of;
    }
  }(Gf, e, n);
}
function unsupportedRefresh() {
  throw Error(formatProdErrorMessage(393));
}
function noop$1() {
}
var Xf, Yf, Zf = { readContext: function(e) {
  return e._currentValue2;
}, use: function(e) {
  if (null !== e && "object" == typeof e) {
    if ("function" == typeof e.then) return unwrapThenable(e);
    if (e.$$typeof === jm) return e._currentValue2;
  }
  throw Error(formatProdErrorMessage(438, String(e)));
}, useContext: function(e) {
  return resolveCurrentlyRenderingComponent(), e._currentValue2;
}, useMemo, useReducer, useRef: function(e) {
  Mf = resolveCurrentlyRenderingComponent();
  var n = (zf = createWorkInProgressHook()).memoizedState;
  return null === n ? (e = { current: e }, zf.memoizedState = e) : n;
}, useState: function(e) {
  return useReducer(basicStateReducer, e);
}, useInsertionEffect: noop$1, useLayoutEffect: noop$1, useCallback: function(e, n) {
  return useMemo(function() {
    return e;
  }, n);
}, useImperativeHandle: noop$1, useEffect: noop$1, useDebugValue: noop$1, useDeferredValue: function(e, n) {
  return resolveCurrentlyRenderingComponent(), void 0 !== n ? n : e;
}, useTransition: function() {
  return resolveCurrentlyRenderingComponent(), [false, unsupportedStartTransition];
}, useId: function() {
  var e = Lf.treeContext, n = e.overflow;
  e = ((e = e.id) & ~(1 << 32 - Ff(e) - 1)).toString(32) + n;
  var r = eg;
  if (null === r) throw Error(formatProdErrorMessage(404));
  return n = Uf++, e = "«" + r.idPrefix + "R" + e, 0 < n && (e += "H" + n.toString(32)), e + "»";
}, useSyncExternalStore: function(e, n, r) {
  if (void 0 === r) throw Error(formatProdErrorMessage(407));
  return r();
}, useOptimistic: function(e) {
  return resolveCurrentlyRenderingComponent(), [e, unsupportedSetOptimisticState];
}, useActionState, useFormState: useActionState, useHostTransitionStatus: function() {
  return resolveCurrentlyRenderingComponent(), sf;
}, useMemoCache: function(e) {
  for (var n = Array(e), r = 0; r < e; r++) n[r] = Hm;
  return n;
}, useCacheRefresh: function() {
  return unsupportedRefresh;
} }, eg = null, tg = { getCacheForType: function() {
  throw Error(formatProdErrorMessage(248));
} };
function describeBuiltInComponentFrame(e) {
  if (void 0 === Xf) try {
    throw Error();
  } catch (e2) {
    var n = e2.stack.trim().match(/\n( *(at )?)/);
    Xf = n && n[1] || "", Yf = -1 < e2.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e2.stack.indexOf("@") ? "@unknown:0:0" : "";
  }
  return "\n" + Xf + e + Yf;
}
var ng = false;
function describeNativeComponentFrame(e, n) {
  if (!e || ng) return "";
  ng = true;
  var r = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var a = { DetermineComponentFrameRoot: function() {
      try {
        if (n) {
          var Fake = function() {
            throw Error();
          };
          if (Object.defineProperty(Fake.prototype, "props", { set: function() {
            throw Error();
          } }), "object" == typeof Reflect && Reflect.construct) {
            try {
              Reflect.construct(Fake, []);
            } catch (e2) {
              var r2 = e2;
            }
            Reflect.construct(e, [], Fake);
          } else {
            try {
              Fake.call();
            } catch (e2) {
              r2 = e2;
            }
            e.call(Fake.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (e2) {
            r2 = e2;
          }
          (Fake = e()) && "function" == typeof Fake.catch && Fake.catch(function() {
          });
        }
      } catch (e2) {
        if (e2 && r2 && "string" == typeof e2.stack) return [e2.stack, r2.stack];
      }
      return [null, null];
    } };
    a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var o = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
    o && o.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
    var s = a.DetermineComponentFrameRoot(), i = s[0], c = s[1];
    if (i && c) {
      var l = i.split("\n"), u = c.split("\n");
      for (o = a = 0; a < l.length && !l[a].includes("DetermineComponentFrameRoot"); ) a++;
      for (; o < u.length && !u[o].includes("DetermineComponentFrameRoot"); ) o++;
      if (a === l.length || o === u.length) for (a = l.length - 1, o = u.length - 1; 1 <= a && 0 <= o && l[a] !== u[o]; ) o--;
      for (; 1 <= a && 0 <= o; a--, o--) if (l[a] !== u[o]) {
        if (1 !== a || 1 !== o) do {
          if (a--, 0 > --o || l[a] !== u[o]) {
            var p = "\n" + l[a].replace(" at new ", " at ");
            return e.displayName && p.includes("<anonymous>") && (p = p.replace("<anonymous>", e.displayName)), p;
          }
        } while (1 <= a && 0 <= o);
        break;
      }
    }
  } finally {
    ng = false, Error.prepareStackTrace = r;
  }
  return (r = e ? e.displayName || e.name : "") ? describeBuiltInComponentFrame(r) : "";
}
function describeComponentStackByType(e) {
  if ("string" == typeof e) return describeBuiltInComponentFrame(e);
  if ("function" == typeof e) return e.prototype && e.prototype.isReactComponent ? describeNativeComponentFrame(e, true) : describeNativeComponentFrame(e, false);
  if ("object" == typeof e && null !== e) {
    switch (e.$$typeof) {
      case Im:
        return describeNativeComponentFrame(e.render, false);
      case Nm:
        return describeNativeComponentFrame(e.type, false);
      case Dm:
        var n = e, r = n._payload;
        n = n._init;
        try {
          e = n(r);
        } catch (e2) {
          return describeBuiltInComponentFrame("Lazy");
        }
        return describeComponentStackByType(e);
    }
    if ("string" == typeof e.name) return r = e.env, describeBuiltInComponentFrame(e.name + (r ? " [" + r + "]" : ""));
  }
  switch (e) {
    case Lm:
      return describeBuiltInComponentFrame("SuspenseList");
    case Mm:
      return describeBuiltInComponentFrame("Suspense");
  }
  return "";
}
function defaultErrorHandler(e) {
  if ("object" == typeof e && null !== e && "string" == typeof e.environmentName) {
    var n = e.environmentName;
    "string" == typeof (e = [e].slice(0))[0] ? e.splice(0, 1, "[%s] " + e[0], " " + n + " ") : e.splice(0, 0, "[%s] ", " " + n + " "), e.unshift(console), (n = Cf.apply(console.error, e))();
  } else console.error(e);
  return null;
}
function noop() {
}
function RequestInstance(e, n, r, a, o, s, i, c, l, u, p) {
  var h = /* @__PURE__ */ new Set();
  this.destination = null, this.flushScheduled = false, this.resumableState = e, this.renderState = n, this.rootFormatContext = r, this.progressiveChunkSize = void 0 === a ? 12800 : a, this.status = 10, this.fatalError = null, this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0, this.completedPreambleSegments = this.completedRootSegment = null, this.abortableTasks = h, this.pingedTasks = [], this.clientRenderedBoundaries = [], this.completedBoundaries = [], this.partialBoundaries = [], this.trackedPostpones = null, this.onError = void 0 === o ? defaultErrorHandler : o, this.onPostpone = void 0 === u ? noop : u, this.onAllReady = void 0 === s ? noop : s, this.onShellReady = void 0 === i ? noop : i, this.onShellError = void 0 === c ? noop : c, this.onFatalError = void 0 === l ? noop : l, this.formState = void 0 === p ? null : p;
}
var rg, ag, og = null;
function pingTask(e, n) {
  e.pingedTasks.push(n), 1 === e.pingedTasks.length && (e.flushScheduled = null !== e.destination, performWork(e));
}
function createSuspenseBoundary(e, n, r, a) {
  return { status: 0, rootSegmentID: -1, parentFlushed: false, pendingTasks: 0, completedSegments: [], byteSize: 0, fallbackAbortableTasks: n, errorDigest: null, contentState: createHoistableState(), fallbackState: createHoistableState(), contentPreamble: r, fallbackPreamble: a, trackedContentKeyPath: null, trackedFallbackNode: null };
}
function createRenderTask(e, n, r, a, o, s, i, c, l, u, p, h, g, v, y) {
  e.allPendingTasks++, null === o ? e.pendingRootTasks++ : o.pendingTasks++;
  var b2 = { replay: null, node: r, childIndex: a, ping: function() {
    return pingTask(e, b2);
  }, blockedBoundary: o, blockedSegment: s, blockedPreamble: i, hoistableState: c, abortSet: l, keyPath: u, formatContext: p, context: h, treeContext: g, componentStack: v, thenableState: n, isFallback: y };
  return l.add(b2), b2;
}
function createReplayTask(e, n, r, a, o, s, i, c, l, u, p, h, g, v) {
  e.allPendingTasks++, null === s ? e.pendingRootTasks++ : s.pendingTasks++, r.pendingTasks++;
  var y = { replay: r, node: a, childIndex: o, ping: function() {
    return pingTask(e, y);
  }, blockedBoundary: s, blockedSegment: null, blockedPreamble: null, hoistableState: i, abortSet: c, keyPath: l, formatContext: u, context: p, treeContext: h, componentStack: g, thenableState: n, isFallback: v };
  return c.add(y), y;
}
function createPendingSegment(e, n, r, a, o, s) {
  return { status: 0, parentFlushed: false, id: -1, index: n, chunks: [], children: [], preambleChildren: [], parentFormatContext: a, boundary: r, lastPushedText: o, textEmbedded: s };
}
function pushComponentStack(e) {
  var n = e.node;
  if ("object" == typeof n && null !== n && n.$$typeof === Tm) e.componentStack = { parent: e.componentStack, type: n.type };
}
function getThrownInfo(e) {
  var n = {};
  return e && Object.defineProperty(n, "componentStack", { configurable: true, enumerable: true, get: function() {
    try {
      var r = "", a = e;
      do {
        r += describeComponentStackByType(a.type), a = a.parent;
      } while (a);
      var o = r;
    } catch (e2) {
      o = "\nError generating stack: " + e2.message + "\n" + e2.stack;
    }
    return Object.defineProperty(n, "componentStack", { value: o }), o;
  } }), n;
}
function logRecoverableError(e, n, r) {
  if (null == (n = (e = e.onError)(n, r)) || "string" == typeof n) return n;
}
function fatalError(e, n) {
  var r = e.onShellError, a = e.onFatalError;
  r(n), a(n), null !== e.destination ? (e.status = 14, e.destination.destroy(n)) : (e.status = 13, e.fatalError = n);
}
function renderWithHooks(e, n, r, a, o, s) {
  var i = n.thenableState;
  for (n.thenableState = null, Mf = {}, Lf = n, Nf = e, Df = r, Vf = Uf = 0, Wf = -1, Kf = 0, Gf = i, e = a(o, s); Hf; ) Hf = false, Vf = Uf = 0, Wf = -1, Kf = 0, Jf += 1, zf = null, e = a(o, s);
  return resetHooksState(), e;
}
function finishFunctionComponent(e, n, r, a, o, s, i) {
  var c = false;
  if (0 !== s && null !== e.formState) {
    var l = n.blockedSegment;
    if (null !== l) {
      c = true, l = l.chunks;
      for (var u = 0; u < s; u++) u === i ? l.push("<!--F!-->") : l.push("<!--F-->");
    }
  }
  s = n.keyPath, n.keyPath = r, o ? (r = n.treeContext, n.treeContext = pushTreeContext(r, 1, 0), renderNode(e, n, a, -1), n.treeContext = r) : c ? renderNode(e, n, a, -1) : renderNodeDestructive(e, n, a, -1), n.keyPath = s;
}
function renderElement(e, n, r, a, o, s) {
  if ("function" == typeof a) if (a.prototype && a.prototype.isReactComponent) {
    var i = o;
    if ("ref" in o) for (var c in i = {}, o) "ref" !== c && (i[c] = o[c]);
    var l = a.defaultProps;
    if (l) for (var u in i === o && (i = Km({}, i, o)), l) void 0 === i[u] && (i[u] = l[u]);
    o = i, i = Pf, "object" == typeof (l = a.contextType) && null !== l && (i = l._currentValue2);
    var p = void 0 !== (i = new a(o, i)).state ? i.state : null;
    if (i.updater = Ef, i.props = o, i.state = p, l = { queue: [], replace: false }, i._reactInternals = l, s = a.contextType, i.context = "object" == typeof s && null !== s ? s._currentValue2 : Pf, "function" == typeof (s = a.getDerivedStateFromProps) && (p = null == (s = s(o, p)) ? p : Km({}, p, s), i.state = p), "function" != typeof a.getDerivedStateFromProps && "function" != typeof i.getSnapshotBeforeUpdate && ("function" == typeof i.UNSAFE_componentWillMount || "function" == typeof i.componentWillMount)) if (a = i.state, "function" == typeof i.componentWillMount && i.componentWillMount(), "function" == typeof i.UNSAFE_componentWillMount && i.UNSAFE_componentWillMount(), a !== i.state && Ef.enqueueReplaceState(i, i.state, null), null !== l.queue && 0 < l.queue.length) if (a = l.queue, s = l.replace, l.queue = null, l.replace = false, s && 1 === a.length) i.state = a[0];
    else {
      for (l = s ? a[0] : i.state, p = true, s = s ? 1 : 0; s < a.length; s++) null != (u = "function" == typeof (u = a[s]) ? u.call(i, l, o, void 0) : u) && (p ? (p = false, l = Km({}, l, u)) : Km(l, u));
      i.state = l;
    }
    else l.queue = null;
    if (a = i.render(), 12 === e.status) throw null;
    o = n.keyPath, n.keyPath = r, renderNodeDestructive(e, n, a, -1), n.keyPath = o;
  } else {
    if (a = renderWithHooks(e, n, r, a, o, void 0), 12 === e.status) throw null;
    finishFunctionComponent(e, n, r, a, 0 !== Uf, Vf, Wf);
  }
  else {
    if ("string" != typeof a) {
      switch (a) {
        case qm:
        case Fm:
        case _m:
        case $m:
          return a = n.keyPath, n.keyPath = r, renderNodeDestructive(e, n, o.children, -1), void (n.keyPath = a);
        case zm:
          return void ("hidden" !== o.mode && (a = n.keyPath, n.keyPath = r, renderNodeDestructive(e, n, o.children, -1), n.keyPath = a));
        case Lm:
          return a = n.keyPath, n.keyPath = r, renderNodeDestructive(e, n, o.children, -1), void (n.keyPath = a);
        case Um:
        case Bm:
          throw Error(formatProdErrorMessage(343));
        case Mm:
          e: if (null !== n.replay) {
            a = n.keyPath, n.keyPath = r, r = o.children;
            try {
              renderNode(e, n, r, -1);
            } finally {
              n.keyPath = a;
            }
          } else {
            a = n.keyPath;
            var h = n.blockedBoundary;
            s = n.blockedPreamble;
            var g = n.hoistableState;
            u = n.blockedSegment, c = o.fallback, o = o.children;
            var v = /* @__PURE__ */ new Set(), y = 2 > n.formatContext.insertionMode ? createSuspenseBoundary(0, v, { htmlChunks: null, headChunks: null, bodyChunks: null, contribution: 0 }, { htmlChunks: null, headChunks: null, bodyChunks: null, contribution: 0 }) : createSuspenseBoundary(0, v, null, null);
            null !== e.trackedPostpones && (y.trackedContentKeyPath = r);
            var b2 = createPendingSegment(0, u.chunks.length, y, n.formatContext, false, false);
            u.children.push(b2), u.lastPushedText = false;
            var k = createPendingSegment(0, 0, null, n.formatContext, false, false);
            if (k.parentFlushed = true, null !== e.trackedPostpones) {
              l = [(i = [r[0], "Suspense Fallback", r[2]])[1], i[2], [], null], e.trackedPostpones.workingMap.set(i, l), y.trackedFallbackNode = l, n.blockedSegment = b2, n.blockedPreamble = y.fallbackPreamble, n.keyPath = i, b2.status = 6;
              try {
                renderNode(e, n, c, -1), pushSegmentFinale(b2.chunks, e.renderState, b2.lastPushedText, b2.textEmbedded), b2.status = 1;
              } catch (n2) {
                throw b2.status = 12 === e.status ? 3 : 4, n2;
              } finally {
                n.blockedSegment = u, n.blockedPreamble = s, n.keyPath = a;
              }
              pushComponentStack(n = createRenderTask(e, null, o, -1, y, k, y.contentPreamble, y.contentState, n.abortSet, r, n.formatContext, n.context, n.treeContext, n.componentStack, n.isFallback)), e.pingedTasks.push(n);
            } else {
              n.blockedBoundary = y, n.blockedPreamble = y.contentPreamble, n.hoistableState = y.contentState, n.blockedSegment = k, n.keyPath = r, k.status = 6;
              try {
                if (renderNode(e, n, o, -1), pushSegmentFinale(k.chunks, e.renderState, k.lastPushedText, k.textEmbedded), k.status = 1, queueCompletedSegment(y, k), 0 === y.pendingTasks && 0 === y.status) {
                  y.status = 1, 0 === e.pendingRootTasks && n.blockedPreamble && preparePreamble(e);
                  break e;
                }
              } catch (r2) {
                y.status = 4, 12 === e.status ? (k.status = 3, i = e.fatalError) : (k.status = 4, i = r2), p = logRecoverableError(e, i, l = getThrownInfo(n.componentStack)), y.errorDigest = p, untrackBoundary(e, y);
              } finally {
                n.blockedBoundary = h, n.blockedPreamble = s, n.hoistableState = g, n.blockedSegment = u, n.keyPath = a;
              }
              pushComponentStack(n = createRenderTask(e, null, c, -1, h, b2, y.fallbackPreamble, y.fallbackState, v, [r[0], "Suspense Fallback", r[2]], n.formatContext, n.context, n.treeContext, n.componentStack, true)), e.pingedTasks.push(n);
            }
          }
          return;
      }
      if ("object" == typeof a && null !== a) switch (a.$$typeof) {
        case Im:
          if ("ref" in o) for (y in i = {}, o) "ref" !== y && (i[y] = o[y]);
          else i = o;
          return void finishFunctionComponent(e, n, r, a = renderWithHooks(e, n, r, a.render, i, s), 0 !== Uf, Vf, Wf);
        case Nm:
          return void renderElement(e, n, r, a.type, o, s);
        case Am:
        case jm:
          if (l = o.children, i = n.keyPath, o = o.value, p = a._currentValue2, a._currentValue2 = o, Tf = a = { parent: s = Tf, depth: null === s ? 0 : s.depth + 1, context: a, parentValue: p, value: o }, n.context = a, n.keyPath = r, renderNodeDestructive(e, n, l, -1), null === (e = Tf)) throw Error(formatProdErrorMessage(403));
          return e.context._currentValue2 = e.parentValue, e = Tf = e.parent, n.context = e, void (n.keyPath = i);
        case Om:
          return a = (o = o.children)(a._context._currentValue2), o = n.keyPath, n.keyPath = r, renderNodeDestructive(e, n, a, -1), void (n.keyPath = o);
        case Dm:
          if (a = (i = a._init)(a._payload), 12 === e.status) throw null;
          return void renderElement(e, n, r, a, o, s);
      }
      throw Error(formatProdErrorMessage(130, null == a ? a : typeof a, ""));
    }
    if (null === (i = n.blockedSegment)) i = o.children, l = n.formatContext, p = n.keyPath, n.formatContext = getChildFormatContext(l, a, o), n.keyPath = r, renderNode(e, n, i, -1), n.formatContext = l, n.keyPath = p;
    else {
      s = pushStartInstance(i.chunks, a, o, e.resumableState, e.renderState, n.blockedPreamble, n.hoistableState, n.formatContext, i.lastPushedText, n.isFallback), i.lastPushedText = false, l = n.formatContext, p = n.keyPath, n.keyPath = r, 3 === (n.formatContext = getChildFormatContext(l, a, o)).insertionMode ? (r = createPendingSegment(0, 0, null, n.formatContext, false, false), i.preambleChildren.push(r), pushComponentStack(r = createRenderTask(e, null, s, -1, n.blockedBoundary, r, n.blockedPreamble, n.hoistableState, e.abortableTasks, n.keyPath, n.formatContext, n.context, n.treeContext, n.componentStack, n.isFallback)), e.pingedTasks.push(r)) : renderNode(e, n, s, -1), n.formatContext = l, n.keyPath = p;
      e: {
        switch (n = i.chunks, e = e.resumableState, a) {
          case "title":
          case "style":
          case "script":
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break e;
          case "body":
            if (1 >= l.insertionMode) {
              e.hasBody = true;
              break e;
            }
            break;
          case "html":
            if (0 === l.insertionMode) {
              e.hasHtml = true;
              break e;
            }
            break;
          case "head":
            if (1 >= l.insertionMode) break e;
        }
        n.push(endChunkForTag(a));
      }
      i.lastPushedText = false;
    }
  }
}
function resumeNode(e, n, r, a, o) {
  var s = n.replay, i = n.blockedBoundary, c = createPendingSegment(0, 0, null, n.formatContext, false, false);
  c.id = r, c.parentFlushed = true;
  try {
    n.replay = null, n.blockedSegment = c, renderNode(e, n, a, o), c.status = 1, null === i ? e.completedRootSegment = c : (queueCompletedSegment(i, c), i.parentFlushed && e.partialBoundaries.push(i));
  } finally {
    n.replay = s, n.blockedSegment = null;
  }
}
function renderNodeDestructive(e, n, r, a) {
  null !== n.replay && "number" == typeof n.replay.slots ? resumeNode(e, n, n.replay.slots, r, a) : (n.node = r, n.childIndex = a, r = n.componentStack, pushComponentStack(n), retryNode(e, n), n.componentStack = r);
}
function retryNode(e, n) {
  var r = n.node, a = n.childIndex;
  if (null !== r) {
    if ("object" == typeof r) {
      switch (r.$$typeof) {
        case Tm:
          var o = r.type, s = r.key, i = r.props, c = void 0 !== (r = i.ref) ? r : null, l = getComponentNameFromType(o), u = null == s ? -1 === a ? 0 : a : s;
          if (s = [n.keyPath, l, u], null !== n.replay) e: {
            var p = n.replay;
            for (a = p.nodes, r = 0; r < a.length; r++) {
              var h = a[r];
              if (u === h[1]) {
                if (4 === h.length) {
                  if (null !== l && l !== h[0]) throw Error(formatProdErrorMessage(490, h[0], l));
                  var g = h[2];
                  l = h[3], u = n.node, n.replay = { nodes: g, slots: l, pendingTasks: 1 };
                  try {
                    if (renderElement(e, n, s, o, i, c), 1 === n.replay.pendingTasks && 0 < n.replay.nodes.length) throw Error(formatProdErrorMessage(488));
                    n.replay.pendingTasks--;
                  } catch (r2) {
                    if ("object" == typeof r2 && null !== r2 && (r2 === Of || "function" == typeof r2.then)) throw n.node === u && (n.replay = p), r2;
                    n.replay.pendingTasks--, i = getThrownInfo(n.componentStack), abortRemainingReplayNodes(e, s = n.blockedBoundary, g, l, o = r2, i = logRecoverableError(e, o, i));
                  }
                  n.replay = p;
                } else {
                  if (o !== Mm) throw Error(formatProdErrorMessage(490, "Suspense", getComponentNameFromType(o) || "Unknown"));
                  t: {
                    p = void 0, o = h[5], c = h[2], l = h[3], u = null === h[4] ? [] : h[4][2], h = null === h[4] ? null : h[4][3];
                    var v = n.keyPath, y = n.replay, b2 = n.blockedBoundary, k = n.hoistableState, C = i.children, R2 = i.fallback, P2 = /* @__PURE__ */ new Set();
                    (i = 2 > n.formatContext.insertionMode ? createSuspenseBoundary(0, P2, createPreambleState(), createPreambleState()) : createSuspenseBoundary(0, P2, null, null)).parentFlushed = true, i.rootSegmentID = o, n.blockedBoundary = i, n.hoistableState = i.contentState, n.keyPath = s, n.replay = { nodes: c, slots: l, pendingTasks: 1 };
                    try {
                      if (renderNode(e, n, C, -1), 1 === n.replay.pendingTasks && 0 < n.replay.nodes.length) throw Error(formatProdErrorMessage(488));
                      if (n.replay.pendingTasks--, 0 === i.pendingTasks && 0 === i.status) {
                        i.status = 1, e.completedBoundaries.push(i);
                        break t;
                      }
                    } catch (r2) {
                      i.status = 4, p = logRecoverableError(e, r2, g = getThrownInfo(n.componentStack)), i.errorDigest = p, n.replay.pendingTasks--, e.clientRenderedBoundaries.push(i);
                    } finally {
                      n.blockedBoundary = b2, n.hoistableState = k, n.replay = y, n.keyPath = v;
                    }
                    pushComponentStack(n = createReplayTask(e, null, { nodes: u, slots: h, pendingTasks: 0 }, R2, -1, b2, i.fallbackState, P2, [s[0], "Suspense Fallback", s[2]], n.formatContext, n.context, n.treeContext, n.componentStack, true)), e.pingedTasks.push(n);
                  }
                }
                a.splice(r, 1);
                break e;
              }
            }
          }
          else renderElement(e, n, s, o, i, c);
          return;
        case Em:
          throw Error(formatProdErrorMessage(257));
        case Dm:
          if (r = (g = r._init)(r._payload), 12 === e.status) throw null;
          return void renderNodeDestructive(e, n, r, a);
      }
      if (Wm(r)) return void renderChildrenArray(e, n, r, a);
      if (null === r || "object" != typeof r ? g = null : g = "function" == typeof (g = Vm && r[Vm] || r["@@iterator"]) ? g : null, g && (g = g.call(r))) {
        if (!(r = g.next()).done) {
          i = [];
          do {
            i.push(r.value), r = g.next();
          } while (!r.done);
          renderChildrenArray(e, n, i, a);
        }
        return;
      }
      if ("function" == typeof r.then) return n.thenableState = null, renderNodeDestructive(e, n, unwrapThenable(r), a);
      if (r.$$typeof === jm) return renderNodeDestructive(e, n, r._currentValue2, a);
      throw a = Object.prototype.toString.call(r), Error(formatProdErrorMessage(31, "[object Object]" === a ? "object with keys {" + Object.keys(r).join(", ") + "}" : a));
    }
    "string" == typeof r ? null !== (a = n.blockedSegment) && (a.lastPushedText = pushTextInstance(a.chunks, r, e.renderState, a.lastPushedText)) : "number" != typeof r && "bigint" != typeof r || null !== (a = n.blockedSegment) && (a.lastPushedText = pushTextInstance(a.chunks, "" + r, e.renderState, a.lastPushedText));
  }
}
function renderChildrenArray(e, n, r, a) {
  var o = n.keyPath;
  if (-1 === a || (n.keyPath = [n.keyPath, "Fragment", a], null === n.replay)) {
    if (s = n.treeContext, i = r.length, null !== n.replay && (null !== (c = n.replay.slots) && "object" == typeof c)) {
      for (a = 0; a < i; a++) l = r[a], n.treeContext = pushTreeContext(s, i, a), "number" == typeof (u = c[a]) ? (resumeNode(e, n, u, l, a), delete c[a]) : renderNode(e, n, l, a);
      return n.treeContext = s, void (n.keyPath = o);
    }
    for (c = 0; c < i; c++) a = r[c], n.treeContext = pushTreeContext(s, i, c), renderNode(e, n, a, c);
    n.treeContext = s, n.keyPath = o;
  } else {
    for (var s = n.replay, i = s.nodes, c = 0; c < i.length; c++) {
      var l = i[c];
      if (l[1] === a) {
        a = l[2], l = l[3], n.replay = { nodes: a, slots: l, pendingTasks: 1 };
        try {
          if (renderChildrenArray(e, n, r, -1), 1 === n.replay.pendingTasks && 0 < n.replay.nodes.length) throw Error(formatProdErrorMessage(488));
          n.replay.pendingTasks--;
        } catch (o2) {
          if ("object" == typeof o2 && null !== o2 && (o2 === Of || "function" == typeof o2.then)) throw o2;
          n.replay.pendingTasks--, r = getThrownInfo(n.componentStack);
          var u = n.blockedBoundary;
          abortRemainingReplayNodes(e, u, a, l, o2, r = logRecoverableError(e, o2, r));
        }
        n.replay = s, i.splice(c, 1);
        break;
      }
    }
    n.keyPath = o;
  }
}
function untrackBoundary(e, n) {
  null !== (e = e.trackedPostpones) && (null !== (n = n.trackedContentKeyPath) && (void 0 !== (n = e.workingMap.get(n)) && (n.length = 4, n[2] = [], n[3] = null)));
}
function spawnNewSuspendedReplayTask(e, n, r) {
  return createReplayTask(e, r, n.replay, n.node, n.childIndex, n.blockedBoundary, n.hoistableState, n.abortSet, n.keyPath, n.formatContext, n.context, n.treeContext, n.componentStack, n.isFallback);
}
function spawnNewSuspendedRenderTask(e, n, r) {
  var a = n.blockedSegment, o = createPendingSegment(0, a.chunks.length, null, n.formatContext, a.lastPushedText, true);
  return a.children.push(o), a.lastPushedText = false, createRenderTask(e, r, n.node, n.childIndex, n.blockedBoundary, o, n.blockedPreamble, n.hoistableState, n.abortSet, n.keyPath, n.formatContext, n.context, n.treeContext, n.componentStack, n.isFallback);
}
function renderNode(e, n, r, a) {
  var o = n.formatContext, s = n.context, i = n.keyPath, c = n.treeContext, l = n.componentStack, u = n.blockedSegment;
  if (null === u) try {
    return renderNodeDestructive(e, n, r, a);
  } catch (u2) {
    if (resetHooksState(), "object" == typeof (r = u2 === Of ? getSuspendedThenable() : u2) && null !== r) {
      if ("function" == typeof r.then) return e = spawnNewSuspendedReplayTask(e, n, a = getThenableStateAfterSuspending()).ping, r.then(e, e), n.formatContext = o, n.context = s, n.keyPath = i, n.treeContext = c, n.componentStack = l, void switchContext(s);
      if ("Maximum call stack size exceeded" === r.message) return r = spawnNewSuspendedReplayTask(e, n, r = getThenableStateAfterSuspending()), e.pingedTasks.push(r), n.formatContext = o, n.context = s, n.keyPath = i, n.treeContext = c, n.componentStack = l, void switchContext(s);
    }
  }
  else {
    var p = u.children.length, h = u.chunks.length;
    try {
      return renderNodeDestructive(e, n, r, a);
    } catch (g) {
      if (resetHooksState(), u.children.length = p, u.chunks.length = h, "object" == typeof (r = g === Of ? getSuspendedThenable() : g) && null !== r) {
        if ("function" == typeof r.then) return e = spawnNewSuspendedRenderTask(e, n, a = getThenableStateAfterSuspending()).ping, r.then(e, e), n.formatContext = o, n.context = s, n.keyPath = i, n.treeContext = c, n.componentStack = l, void switchContext(s);
        if ("Maximum call stack size exceeded" === r.message) return r = spawnNewSuspendedRenderTask(e, n, r = getThenableStateAfterSuspending()), e.pingedTasks.push(r), n.formatContext = o, n.context = s, n.keyPath = i, n.treeContext = c, n.componentStack = l, void switchContext(s);
      }
    }
  }
  throw n.formatContext = o, n.context = s, n.keyPath = i, n.treeContext = c, switchContext(s), r;
}
function abortTaskSoft(e) {
  var n = e.blockedBoundary;
  null !== (e = e.blockedSegment) && (e.status = 3, finishedTask(this, n, e));
}
function abortRemainingReplayNodes(e, n, r, a, o, s) {
  for (var i = 0; i < r.length; i++) {
    var c = r[i];
    if (4 === c.length) abortRemainingReplayNodes(e, n, c[2], c[3], o, s);
    else {
      c = c[5];
      var l = e, u = s, p = createSuspenseBoundary(0, /* @__PURE__ */ new Set(), null, null);
      p.parentFlushed = true, p.rootSegmentID = c, p.status = 4, p.errorDigest = u, p.parentFlushed && l.clientRenderedBoundaries.push(p);
    }
  }
  if (r.length = 0, null !== a) {
    if (null === n) throw Error(formatProdErrorMessage(487));
    if (4 !== n.status && (n.status = 4, n.errorDigest = s, n.parentFlushed && e.clientRenderedBoundaries.push(n)), "object" == typeof a) for (var h in a) delete a[h];
  }
}
function abortTask(e, n, r) {
  var a = e.blockedBoundary, o = e.blockedSegment;
  if (null !== o) {
    if (6 === o.status) return;
    o.status = 3;
  }
  if (o = getThrownInfo(e.componentStack), null === a) {
    if (13 !== n.status && 14 !== n.status) {
      if (null === (a = e.replay)) return logRecoverableError(n, r, o), void fatalError(n, r);
      a.pendingTasks--, 0 === a.pendingTasks && 0 < a.nodes.length && (e = logRecoverableError(n, r, o), abortRemainingReplayNodes(n, null, a.nodes, a.slots, r, e)), n.pendingRootTasks--, 0 === n.pendingRootTasks && completeShell(n);
    }
  } else a.pendingTasks--, 4 !== a.status && (a.status = 4, e = logRecoverableError(n, r, o), a.status = 4, a.errorDigest = e, untrackBoundary(n, a), a.parentFlushed && n.clientRenderedBoundaries.push(a)), a.fallbackAbortableTasks.forEach(function(e2) {
    return abortTask(e2, n, r);
  }), a.fallbackAbortableTasks.clear();
  n.allPendingTasks--, 0 === n.allPendingTasks && completeAll(n);
}
function safelyEmitEarlyPreloads(e, n) {
  try {
    var r = e.renderState, a = r.onHeaders;
    if (a) {
      var o = r.headers;
      if (o) {
        r.headers = null;
        var s = o.preconnects;
        if (o.fontPreloads && (s && (s += ", "), s += o.fontPreloads), o.highImagePreloads && (s && (s += ", "), s += o.highImagePreloads), !n) {
          var i = r.styles.values(), c = i.next();
          e: for (; 0 < o.remainingCapacity && !c.done; c = i.next()) for (var l = c.value.sheets.values(), u = l.next(); 0 < o.remainingCapacity && !u.done; u = l.next()) {
            var p = u.value, h = p.props, g = h.href, v = p.props, y = getPreloadAsHeader(v.href, "style", { crossOrigin: v.crossOrigin, integrity: v.integrity, nonce: v.nonce, type: v.type, fetchPriority: v.fetchPriority, referrerPolicy: v.referrerPolicy, media: v.media });
            if (!(0 <= (o.remainingCapacity -= y.length + 2))) break e;
            r.resets.style[g] = lf, s && (s += ", "), s += y, r.resets.style[g] = "string" == typeof h.crossOrigin || "string" == typeof h.integrity ? [h.crossOrigin, h.integrity] : lf;
          }
        }
        a(s ? { Link: s } : {});
      }
    }
  } catch (n2) {
    logRecoverableError(e, n2, {});
  }
}
function completeShell(e) {
  null === e.trackedPostpones && safelyEmitEarlyPreloads(e, true), null === e.trackedPostpones && preparePreamble(e), e.onShellError = noop, (e = e.onShellReady)();
}
function completeAll(e) {
  safelyEmitEarlyPreloads(e, null === e.trackedPostpones || (null === e.completedRootSegment || 5 !== e.completedRootSegment.status)), preparePreamble(e), (e = e.onAllReady)();
}
function queueCompletedSegment(e, n) {
  if (0 === n.chunks.length && 1 === n.children.length && null === n.children[0].boundary && -1 === n.children[0].id) {
    var r = n.children[0];
    r.id = n.id, r.parentFlushed = true, 1 === r.status && queueCompletedSegment(e, r);
  } else e.completedSegments.push(n);
}
function finishedTask(e, n, r) {
  if (null === n) {
    if (null !== r && r.parentFlushed) {
      if (null !== e.completedRootSegment) throw Error(formatProdErrorMessage(389));
      e.completedRootSegment = r;
    }
    e.pendingRootTasks--, 0 === e.pendingRootTasks && completeShell(e);
  } else n.pendingTasks--, 4 !== n.status && (0 === n.pendingTasks ? (0 === n.status && (n.status = 1), null !== r && r.parentFlushed && 1 === r.status && queueCompletedSegment(n, r), n.parentFlushed && e.completedBoundaries.push(n), 1 === n.status && (n.fallbackAbortableTasks.forEach(abortTaskSoft, e), n.fallbackAbortableTasks.clear(), 0 === e.pendingRootTasks && null === e.trackedPostpones && null !== n.contentPreamble && preparePreamble(e))) : null !== r && r.parentFlushed && 1 === r.status && (queueCompletedSegment(n, r), 1 === n.completedSegments.length && n.parentFlushed && e.partialBoundaries.push(n)));
  e.allPendingTasks--, 0 === e.allPendingTasks && completeAll(e);
}
function performWork(e) {
  if (14 !== e.status && 13 !== e.status) {
    var n = Tf, r = af.H;
    af.H = Zf;
    var a = af.A;
    af.A = tg;
    var o = og;
    og = e;
    var s = eg;
    eg = e.resumableState;
    try {
      var i, c = e.pingedTasks;
      for (i = 0; i < c.length; i++) {
        var l = c[i], u = e, p = l.blockedSegment;
        if (null === p) {
          var h = u;
          if (0 !== l.replay.pendingTasks) {
            switchContext(l.context);
            try {
              if ("number" == typeof l.replay.slots ? resumeNode(h, l, l.replay.slots, l.node, l.childIndex) : retryNode(h, l), 1 === l.replay.pendingTasks && 0 < l.replay.nodes.length) throw Error(formatProdErrorMessage(488));
              l.replay.pendingTasks--, l.abortSet.delete(l), finishedTask(h, l.blockedBoundary, null);
            } catch (e2) {
              resetHooksState();
              var g = e2 === Of ? getSuspendedThenable() : e2;
              if ("object" == typeof g && null !== g && "function" == typeof g.then) {
                var v = l.ping;
                g.then(v, v), l.thenableState = getThenableStateAfterSuspending();
              } else {
                l.replay.pendingTasks--, l.abortSet.delete(l);
                var y = getThrownInfo(l.componentStack);
                u = void 0;
                var b2 = h, k = l.blockedBoundary, C = 12 === h.status ? h.fatalError : g;
                abortRemainingReplayNodes(b2, k, l.replay.nodes, l.replay.slots, C, u = logRecoverableError(b2, C, y)), h.pendingRootTasks--, 0 === h.pendingRootTasks && completeShell(h), h.allPendingTasks--, 0 === h.allPendingTasks && completeAll(h);
              }
            }
          }
        } else if (h = void 0, 0 === (b2 = p).status) {
          b2.status = 6, switchContext(l.context);
          var R2 = b2.children.length, P2 = b2.chunks.length;
          try {
            retryNode(u, l), pushSegmentFinale(b2.chunks, u.renderState, b2.lastPushedText, b2.textEmbedded), l.abortSet.delete(l), b2.status = 1, finishedTask(u, l.blockedBoundary, b2);
          } catch (e2) {
            resetHooksState(), b2.children.length = R2, b2.chunks.length = P2;
            var T = e2 === Of ? getSuspendedThenable() : 12 === u.status ? u.fatalError : e2;
            if ("object" == typeof T && null !== T && "function" == typeof T.then) {
              b2.status = 0, l.thenableState = getThenableStateAfterSuspending();
              var E2 = l.ping;
              T.then(E2, E2);
            } else {
              var $2 = getThrownInfo(l.componentStack);
              l.abortSet.delete(l), b2.status = 4;
              var F = l.blockedBoundary;
              h = logRecoverableError(u, T, $2), null === F ? fatalError(u, T) : (F.pendingTasks--, 4 !== F.status && (F.status = 4, F.errorDigest = h, untrackBoundary(u, F), F.parentFlushed && u.clientRenderedBoundaries.push(F), 0 === u.pendingRootTasks && null === u.trackedPostpones && null !== F.contentPreamble && preparePreamble(u))), u.allPendingTasks--, 0 === u.allPendingTasks && completeAll(u);
            }
          }
        }
      }
      c.splice(0, i), null !== e.destination && flushCompletedQueues(e, e.destination);
    } catch (n2) {
      logRecoverableError(e, n2, {}), fatalError(e, n2);
    } finally {
      eg = s, af.H = r, af.A = a, r === Zf && switchContext(n), og = o;
    }
  }
}
function preparePreambleFromSubtree(e, n, r) {
  n.preambleChildren.length && r.push(n.preambleChildren);
  for (var a = false, o = 0; o < n.children.length; o++) a = preparePreambleFromSegment(e, n.children[o], r) || a;
  return a;
}
function preparePreambleFromSegment(e, n, r) {
  var a = n.boundary;
  if (null === a) return preparePreambleFromSubtree(e, n, r);
  var o = a.contentPreamble, s = a.fallbackPreamble;
  if (null === o || null === s) return false;
  switch (a.status) {
    case 1:
      if (hoistPreambleState(e.renderState, o), !(n = a.completedSegments[0])) throw Error(formatProdErrorMessage(391));
      return preparePreambleFromSubtree(e, n, r);
    case 5:
      if (null !== e.trackedPostpones) return true;
    case 4:
      if (1 === n.status) return hoistPreambleState(e.renderState, s), preparePreambleFromSubtree(e, n, r);
    default:
      return true;
  }
}
function preparePreamble(e) {
  if (e.completedRootSegment && null === e.completedPreambleSegments) {
    var n = [], r = preparePreambleFromSegment(e, e.completedRootSegment, n), a = e.renderState.preamble;
    (false === r || a.headChunks && a.bodyChunks) && (e.completedPreambleSegments = n);
  }
}
function flushSubtree(e, n, r, a) {
  switch (r.parentFlushed = true, r.status) {
    case 0:
      r.id = e.nextSegmentId++;
    case 5:
      return a = r.id, r.lastPushedText = false, r.textEmbedded = false, e = e.renderState, n.push('<template id="'), n.push(e.placeholderPrefix), e = a.toString(16), n.push(e), n.push('"></template>');
    case 1:
      r.status = 2;
      var o = true, s = r.chunks, i = 0;
      r = r.children;
      for (var c = 0; c < r.length; c++) {
        for (o = r[c]; i < o.index; i++) n.push(s[i]);
        o = flushSegment(e, n, o, a);
      }
      for (; i < s.length - 1; i++) n.push(s[i]);
      return i < s.length && (o = n.push(s[i])), o;
    default:
      throw Error(formatProdErrorMessage(390));
  }
}
function flushSegment(e, n, r, a) {
  var o = r.boundary;
  if (null === o) return flushSubtree(e, n, r, a);
  if (o.parentFlushed = true, 4 === o.status) {
    if (!e.renderState.generateStaticMarkup) {
      var s = o.errorDigest;
      n.push("<!--$!-->"), n.push("<template"), s && (n.push(' data-dgst="'), s = escapeTextForBrowser(s), n.push(s), n.push('"')), n.push("></template>");
    }
    return flushSubtree(e, n, r, a), e.renderState.generateStaticMarkup ? n = true : ((e = o.fallbackPreamble) && writePreambleContribution(n, e), n = n.push("<!--/$-->")), n;
  }
  if (1 !== o.status) return 0 === o.status && (o.rootSegmentID = e.nextSegmentId++), 0 < o.completedSegments.length && e.partialBoundaries.push(o), writeStartPendingSuspenseBoundary(n, e.renderState, o.rootSegmentID), a && ((o = o.fallbackState).styles.forEach(hoistStyleQueueDependency, a), o.stylesheets.forEach(hoistStylesheetDependency, a)), flushSubtree(e, n, r, a), n.push("<!--/$-->");
  if (o.byteSize > e.progressiveChunkSize) return o.rootSegmentID = e.nextSegmentId++, e.completedBoundaries.push(o), writeStartPendingSuspenseBoundary(n, e.renderState, o.rootSegmentID), flushSubtree(e, n, r, a), n.push("<!--/$-->");
  if (a && ((r = o.contentState).styles.forEach(hoistStyleQueueDependency, a), r.stylesheets.forEach(hoistStylesheetDependency, a)), e.renderState.generateStaticMarkup || n.push("<!--$-->"), 1 !== (r = o.completedSegments).length) throw Error(formatProdErrorMessage(391));
  return flushSegment(e, n, r[0], a), e.renderState.generateStaticMarkup ? n = true : ((e = o.contentPreamble) && writePreambleContribution(n, e), n = n.push("<!--/$-->")), n;
}
function flushSegmentContainer(e, n, r, a) {
  return function(e2, n2, r2, a2) {
    switch (r2.insertionMode) {
      case 0:
      case 1:
      case 3:
      case 2:
        return e2.push('<div hidden id="'), e2.push(n2.segmentPrefix), n2 = a2.toString(16), e2.push(n2), e2.push('">');
      case 4:
        return e2.push('<svg aria-hidden="true" style="display:none" id="'), e2.push(n2.segmentPrefix), n2 = a2.toString(16), e2.push(n2), e2.push('">');
      case 5:
        return e2.push('<math aria-hidden="true" style="display:none" id="'), e2.push(n2.segmentPrefix), n2 = a2.toString(16), e2.push(n2), e2.push('">');
      case 6:
        return e2.push('<table hidden id="'), e2.push(n2.segmentPrefix), n2 = a2.toString(16), e2.push(n2), e2.push('">');
      case 7:
        return e2.push('<table hidden><tbody id="'), e2.push(n2.segmentPrefix), n2 = a2.toString(16), e2.push(n2), e2.push('">');
      case 8:
        return e2.push('<table hidden><tr id="'), e2.push(n2.segmentPrefix), n2 = a2.toString(16), e2.push(n2), e2.push('">');
      case 9:
        return e2.push('<table hidden><colgroup id="'), e2.push(n2.segmentPrefix), n2 = a2.toString(16), e2.push(n2), e2.push('">');
      default:
        throw Error(formatProdErrorMessage(397));
    }
  }(n, e.renderState, r.parentFormatContext, r.id), flushSegment(e, n, r, a), function(e2, n2) {
    switch (n2.insertionMode) {
      case 0:
      case 1:
      case 3:
      case 2:
        return e2.push("</div>");
      case 4:
        return e2.push("</svg>");
      case 5:
        return e2.push("</math>");
      case 6:
        return e2.push("</table>");
      case 7:
        return e2.push("</tbody></table>");
      case 8:
        return e2.push("</tr></table>");
      case 9:
        return e2.push("</colgroup></table>");
      default:
        throw Error(formatProdErrorMessage(397));
    }
  }(n, r.parentFormatContext);
}
function flushCompletedBoundary(e, n, r) {
  for (var a = r.completedSegments, o = 0; o < a.length; o++) flushPartiallyCompletedSegment(e, n, r, a[o]);
  a.length = 0, writeHoistablesForBoundary(n, r.contentState, e.renderState), a = e.resumableState, e = e.renderState, o = r.rootSegmentID, r = r.contentState;
  var s = e.stylesToHoist;
  return e.stylesToHoist = false, n.push(e.startInlineScript), s ? 2 & a.instructions ? 8 & a.instructions ? n.push('$RR("') : (a.instructions |= 8, n.push('$RM=new Map;\n$RR=function(t,u,y){function v(n){this._p=null;n()}for(var w=$RC,p=$RM,q=new Map,r=document,g,b,h=r.querySelectorAll("link[data-precedence],style[data-precedence]"),x=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?x.push(b):("LINK"===b.tagName&&p.set(b.getAttribute("href"),b),q.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var e=y[b++];if(!e){k=!1;b=0;continue}var c=!1,m=0;var d=e[m++];if(a=p.get(d)){var f=a._p;c=!0}else{a=r.createElement("link");a.href=\nd;a.rel="stylesheet";for(a.dataset.precedence=l=e[m++];f=e[m++];)a.setAttribute(f,e[m++]);f=a._p=new Promise(function(n,z){a.onload=v.bind(a,n);a.onerror=v.bind(a,z)});p.set(d,a)}d=a.getAttribute("media");!f||d&&!matchMedia(d).matches||h.push(f);if(c)continue}else{a=x[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=q.get(l)||g;c===g&&(g=a);q.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=r.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(w.bind(null,\nt,u,""),w.bind(null,t,u,"Resource failed to load"))};$RR("')) : (a.instructions |= 10, n.push('$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RM=new Map;\n$RR=function(t,u,y){function v(n){this._p=null;n()}for(var w=$RC,p=$RM,q=new Map,r=document,g,b,h=r.querySelectorAll("link[data-precedence],style[data-precedence]"),x=[],k=0;b=h[k++];)"not all"===b.getAttribute("media")?x.push(b):("LINK"===b.tagName&&p.set(b.getAttribute("href"),b),q.set(b.dataset.precedence,g=b));b=0;h=[];var l,a;for(k=!0;;){if(k){var e=y[b++];if(!e){k=!1;b=0;continue}var c=!1,m=0;var d=e[m++];if(a=p.get(d)){var f=a._p;c=!0}else{a=r.createElement("link");a.href=\nd;a.rel="stylesheet";for(a.dataset.precedence=l=e[m++];f=e[m++];)a.setAttribute(f,e[m++]);f=a._p=new Promise(function(n,z){a.onload=v.bind(a,n);a.onerror=v.bind(a,z)});p.set(d,a)}d=a.getAttribute("media");!f||d&&!matchMedia(d).matches||h.push(f);if(c)continue}else{a=x[b++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=q.get(l)||g;c===g&&(g=a);q.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=r.head,c.insertBefore(a,c.firstChild))}Promise.all(h).then(w.bind(null,\nt,u,""),w.bind(null,t,u,"Resource failed to load"))};$RR("')) : 2 & a.instructions ? n.push('$RC("') : (a.instructions |= 2, n.push('$RC=function(b,c,e){c=document.getElementById(c);c.parentNode.removeChild(c);var a=document.getElementById(b);if(a){b=a.previousSibling;if(e)b.data="$!",a.setAttribute("data-dgst",e);else{e=b.parentNode;a=b.nextSibling;var f=0;do{if(a&&8===a.nodeType){var d=a.data;if("/$"===d)if(0===f)break;else f--;else"$"!==d&&"$?"!==d&&"$!"!==d||f++}d=a.nextSibling;e.removeChild(a);a=d}while(a);for(;c.firstChild;)e.insertBefore(c.firstChild,a);b.data="$"}b._reactRetry&&b._reactRetry()}};$RC("')), a = o.toString(16), n.push(e.boundaryPrefix), n.push(a), n.push('","'), n.push(e.segmentPrefix), n.push(a), s ? (n.push('",'), function(e2, n2) {
    e2.push("[");
    var r2 = "[";
    n2.stylesheets.forEach(function(n3) {
      if (2 !== n3.state) if (3 === n3.state) e2.push(r2), n3 = escapeJSObjectForInstructionScripts("" + n3.props.href), e2.push(n3), e2.push("]"), r2 = ",[";
      else {
        e2.push(r2);
        var a2 = n3.props["data-precedence"], o2 = n3.props, s2 = sanitizeURL("" + n3.props.href);
        for (var i in s2 = escapeJSObjectForInstructionScripts(s2), e2.push(s2), a2 = "" + a2, e2.push(","), a2 = escapeJSObjectForInstructionScripts(a2), e2.push(a2), o2) if (Gm.call(o2, i) && null != (a2 = o2[i])) switch (i) {
          case "href":
          case "rel":
          case "precedence":
          case "data-precedence":
            break;
          case "children":
          case "dangerouslySetInnerHTML":
            throw Error(formatProdErrorMessage(399, "link"));
          default:
            writeStyleResourceAttributeInJS(e2, i, a2);
        }
        e2.push("]"), r2 = ",[", n3.state = 3;
      }
    }), e2.push("]");
  }(n, r)) : n.push('"'), r = n.push(")<\/script>"), writeBootstrap(n, e) && r;
}
function flushPartiallyCompletedSegment(e, n, r, a) {
  if (2 === a.status) return true;
  var o = r.contentState, s = a.id;
  if (-1 === s) {
    if (-1 === (a.id = r.rootSegmentID)) throw Error(formatProdErrorMessage(392));
    return flushSegmentContainer(e, n, a, o);
  }
  return s === r.rootSegmentID ? flushSegmentContainer(e, n, a, o) : (flushSegmentContainer(e, n, a, o), r = e.resumableState, e = e.renderState, n.push(e.startInlineScript), 1 & r.instructions ? n.push('$RS("') : (r.instructions |= 1, n.push('$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("')), n.push(e.segmentPrefix), s = s.toString(16), n.push(s), n.push('","'), n.push(e.placeholderPrefix), n.push(s), n = n.push('")<\/script>'));
}
function flushCompletedQueues(e, n) {
  try {
    if (!(0 < e.pendingRootTasks)) {
      var r, a = e.completedRootSegment;
      if (null !== a) {
        if (5 === a.status) return;
        var o = e.completedPreambleSegments;
        if (null === o) return;
        var s, i = e.renderState, c = i.preamble, l = c.htmlChunks, u = c.headChunks;
        if (l) {
          for (s = 0; s < l.length; s++) n.push(l[s]);
          if (u) for (s = 0; s < u.length; s++) n.push(u[s]);
          else {
            var p = startChunkForTag("head");
            n.push(p), n.push(">");
          }
        } else if (u) for (s = 0; s < u.length; s++) n.push(u[s]);
        var h = i.charsetChunks;
        for (s = 0; s < h.length; s++) n.push(h[s]);
        h.length = 0, i.preconnects.forEach(flushResource, n), i.preconnects.clear();
        var g = i.viewportChunks;
        for (s = 0; s < g.length; s++) n.push(g[s]);
        g.length = 0, i.fontPreloads.forEach(flushResource, n), i.fontPreloads.clear(), i.highImagePreloads.forEach(flushResource, n), i.highImagePreloads.clear(), i.styles.forEach(flushStylesInPreamble, n);
        var v = i.importMapChunks;
        for (s = 0; s < v.length; s++) n.push(v[s]);
        v.length = 0, i.bootstrapScripts.forEach(flushResource, n), i.scripts.forEach(flushResource, n), i.scripts.clear(), i.bulkPreloads.forEach(flushResource, n), i.bulkPreloads.clear();
        var y = i.hoistableChunks;
        for (s = 0; s < y.length; s++) n.push(y[s]);
        for (i = y.length = 0; i < o.length; i++) {
          var b2 = o[i];
          for (c = 0; c < b2.length; c++) flushSegment(e, n, b2[c], null);
        }
        var k = e.renderState.preamble, C = k.headChunks;
        if (k.htmlChunks || C) {
          var R2 = endChunkForTag("head");
          n.push(R2);
        }
        var P2 = k.bodyChunks;
        if (P2) for (o = 0; o < P2.length; o++) n.push(P2[o]);
        flushSegment(e, n, a, null), e.completedRootSegment = null, writeBootstrap(n, e.renderState);
      }
      var T = e.renderState;
      a = 0;
      var E2 = T.viewportChunks;
      for (a = 0; a < E2.length; a++) n.push(E2[a]);
      E2.length = 0, T.preconnects.forEach(flushResource, n), T.preconnects.clear(), T.fontPreloads.forEach(flushResource, n), T.fontPreloads.clear(), T.highImagePreloads.forEach(flushResource, n), T.highImagePreloads.clear(), T.styles.forEach(preloadLateStyles, n), T.scripts.forEach(flushResource, n), T.scripts.clear(), T.bulkPreloads.forEach(flushResource, n), T.bulkPreloads.clear();
      var $2 = T.hoistableChunks;
      for (a = 0; a < $2.length; a++) n.push($2[a]);
      $2.length = 0;
      var F = e.clientRenderedBoundaries;
      for (r = 0; r < F.length; r++) {
        var A = F[r];
        T = n;
        var O = e.resumableState, I2 = e.renderState, N2 = A.rootSegmentID, D2 = A.errorDigest;
        T.push(I2.startInlineScript), 4 & O.instructions ? T.push('$RX("') : (O.instructions |= 4, T.push('$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("')), T.push(I2.boundaryPrefix);
        var B2 = N2.toString(16);
        if (T.push(B2), T.push('"'), D2) {
          T.push(",");
          var q2 = escapeJSStringsForInstructionScripts(D2 || "");
          T.push(q2);
        }
        var H2 = T.push(")<\/script>");
        if (!H2) return e.destination = null, r++, void F.splice(0, r);
      }
      F.splice(0, r);
      var V2 = e.completedBoundaries;
      for (r = 0; r < V2.length; r++) if (!flushCompletedBoundary(e, n, V2[r])) return e.destination = null, r++, void V2.splice(0, r);
      V2.splice(0, r);
      var W2 = e.partialBoundaries;
      for (r = 0; r < W2.length; r++) {
        var G2 = W2[r];
        e: {
          F = e, A = n;
          var Q2 = G2.completedSegments;
          for (H2 = 0; H2 < Q2.length; H2++) if (!flushPartiallyCompletedSegment(F, A, G2, Q2[H2])) {
            H2++, Q2.splice(0, H2);
            var X2 = false;
            break e;
          }
          Q2.splice(0, H2), X2 = writeHoistablesForBoundary(A, G2.contentState, F.renderState);
        }
        if (!X2) return e.destination = null, r++, void W2.splice(0, r);
      }
      W2.splice(0, r);
      var Y2 = e.completedBoundaries;
      for (r = 0; r < Y2.length; r++) if (!flushCompletedBoundary(e, n, Y2[r])) return e.destination = null, r++, void Y2.splice(0, r);
      Y2.splice(0, r);
    }
  } finally {
    0 === e.allPendingTasks && 0 === e.pingedTasks.length && 0 === e.clientRenderedBoundaries.length && 0 === e.completedBoundaries.length && (e.flushScheduled = false, (r = e.resumableState).hasBody && (W2 = endChunkForTag("body"), n.push(W2)), r.hasHtml && (r = endChunkForTag("html"), n.push(r)), e.status = 14, n.push(null), e.destination = null);
  }
}
function enqueueFlush(e) {
  if (false === e.flushScheduled && 0 === e.pingedTasks.length && null !== e.destination) {
    e.flushScheduled = true;
    var n = e.destination;
    n ? flushCompletedQueues(e, n) : e.flushScheduled = false;
  }
}
function startFlowing(e, n) {
  if (13 === e.status) e.status = 14, n.destroy(e.fatalError);
  else if (14 !== e.status && null === e.destination) {
    e.destination = n;
    try {
      flushCompletedQueues(e, n);
    } catch (n2) {
      logRecoverableError(e, n2, {}), fatalError(e, n2);
    }
  }
}
function abort(e, n) {
  11 !== e.status && 10 !== e.status || (e.status = 12);
  try {
    var r = e.abortableTasks;
    if (0 < r.size) {
      var a = void 0 === n ? Error(formatProdErrorMessage(432)) : "object" == typeof n && null !== n && "function" == typeof n.then ? Error(formatProdErrorMessage(530)) : n;
      e.fatalError = a, r.forEach(function(n2) {
        return abortTask(n2, e, a);
      }), r.clear();
    }
    null !== e.destination && flushCompletedQueues(e, e.destination);
  } catch (n2) {
    logRecoverableError(e, n2, {}), fatalError(e, n2);
  }
}
function onError() {
}
function renderToStringImpl(e, n, r, a) {
  var o, s, i, c, l = false, u = null, p = "", h = false;
  if (e = function(e2, n2, r2, a2, o2, s2, i2, c2, l2, u2, p2, h2) {
    return (r2 = createPendingSegment(n2 = new RequestInstance(n2, r2, a2, o2, s2, i2, c2, l2, u2, p2, h2), 0, null, a2, false, false)).parentFlushed = true, pushComponentStack(e2 = createRenderTask(n2, null, e2, -1, null, r2, null, null, n2.abortableTasks, null, a2, null, $f, null, false)), n2.pingedTasks.push(e2), n2;
  }(e, n = { idPrefix: void 0 === (o = n ? n.identifierPrefix : void 0) ? "" : o, nextFormID: 0, streamingFormat: 0, bootstrapScriptContent: s, bootstrapScripts: i, bootstrapModules: c, instructions: 0, hasBody: false, hasHtml: false, unknownResources: {}, dnsResources: {}, connectResources: { default: {}, anonymous: {}, credentials: {} }, imageResources: {}, styleResources: {}, scriptResources: {}, moduleUnknownResources: {}, moduleScriptResources: {} }, function(e2, n2) {
    var r2 = e2.idPrefix, a2 = [], o2 = e2.bootstrapScriptContent, s2 = e2.bootstrapScripts, i2 = e2.bootstrapModules;
    void 0 !== o2 && a2.push("<script>", ("" + o2).replace(uf, scriptReplacer), "<\/script>"), o2 = r2 + "P:";
    var c2 = r2 + "S:";
    r2 += "B:";
    var l2 = { htmlChunks: null, headChunks: null, bodyChunks: null, contribution: 0 }, u2 = /* @__PURE__ */ new Set(), p2 = /* @__PURE__ */ new Set(), h2 = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Set(), y = /* @__PURE__ */ new Set(), b2 = /* @__PURE__ */ new Set(), k = { images: /* @__PURE__ */ new Map(), stylesheets: /* @__PURE__ */ new Map(), scripts: /* @__PURE__ */ new Map(), moduleScripts: /* @__PURE__ */ new Map() };
    if (void 0 !== s2) for (var C = 0; C < s2.length; C++) {
      var R2, P2 = s2[C], T = void 0, E2 = void 0, $2 = { rel: "preload", as: "script", fetchPriority: "low", nonce: void 0 };
      "string" == typeof P2 ? $2.href = R2 = P2 : ($2.href = R2 = P2.src, $2.integrity = E2 = "string" == typeof P2.integrity ? P2.integrity : void 0, $2.crossOrigin = T = "string" == typeof P2 || null == P2.crossOrigin ? void 0 : "use-credentials" === P2.crossOrigin ? "use-credentials" : "");
      var F = R2;
      (P2 = e2).scriptResources[F] = null, P2.moduleScriptResources[F] = null, pushLinkImpl(P2 = [], $2), v.add(P2), a2.push('<script src="', escapeTextForBrowser(R2)), "string" == typeof E2 && a2.push('" integrity="', escapeTextForBrowser(E2)), "string" == typeof T && a2.push('" crossorigin="', escapeTextForBrowser(T)), a2.push('" async=""><\/script>');
    }
    if (void 0 !== i2) for (s2 = 0; s2 < i2.length; s2++) T = R2 = void 0, E2 = { rel: "modulepreload", fetchPriority: "low", nonce: void 0 }, "string" == typeof ($2 = i2[s2]) ? E2.href = C = $2 : (E2.href = C = $2.src, E2.integrity = T = "string" == typeof $2.integrity ? $2.integrity : void 0, E2.crossOrigin = R2 = "string" == typeof $2 || null == $2.crossOrigin ? void 0 : "use-credentials" === $2.crossOrigin ? "use-credentials" : ""), P2 = C, ($2 = e2).scriptResources[P2] = null, $2.moduleScriptResources[P2] = null, pushLinkImpl($2 = [], E2), v.add($2), a2.push('<script type="module" src="', escapeTextForBrowser(C)), "string" == typeof T && a2.push('" integrity="', escapeTextForBrowser(T)), "string" == typeof R2 && a2.push('" crossorigin="', escapeTextForBrowser(R2)), a2.push('" async=""><\/script>');
    return { placeholderPrefix: o2, segmentPrefix: c2, boundaryPrefix: r2, startInlineScript: "<script>", preamble: l2, externalRuntimeScript: null, bootstrapChunks: a2, importMapChunks: [], onHeaders: void 0, headers: null, resets: { font: {}, dns: {}, connect: { default: {}, anonymous: {}, credentials: {} }, image: {}, style: {} }, charsetChunks: [], viewportChunks: [], hoistableChunks: [], preconnects: u2, fontPreloads: p2, highImagePreloads: h2, styles: g, bootstrapScripts: v, scripts: y, bulkPreloads: b2, preloads: k, stylesToHoist: false, generateStaticMarkup: n2 };
  }(n, r), createFormatContext(0, null, 0), 1 / 0, onError, void 0, function() {
    h = true;
  }, void 0, void 0, void 0), e.flushScheduled = null !== e.destination, performWork(e), 10 === e.status && (e.status = 11), null === e.trackedPostpones && safelyEmitEarlyPreloads(e, 0 === e.pendingRootTasks), abort(e, a), startFlowing(e, { push: function(e2) {
    return null !== e2 && (p += e2), true;
  }, destroy: function(e2) {
    l = true, u = e2;
  } }), l && u !== a) throw u;
  if (!h) throw Error(formatProdErrorMessage(426));
  return p;
}
Cm.renderToStaticMarkup = function(e, n) {
  return renderToStringImpl(e, n, true, 'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
}, Cm.renderToString = function(e, n) {
  return renderToStringImpl(e, n, false, 'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToReadableStream" which supports Suspense on the server');
}, Cm.version = "19.1.1", rg = ep, ag = Cm, Zu.version = rg.version, Zu.renderToReadableStream = rg.renderToReadableStream, Zu.renderToString = ag.renderToString, Zu.renderToStaticMarkup = ag.renderToStaticMarkup, rg.resume && (Zu.resume = rg.resume);
var sg, ig = /bot|crawl|http|lighthouse|scan|search|spider/i;
function isbot(e) {
  return Boolean(e) && function() {
    if (sg instanceof RegExp) return sg;
    try {
      sg = new RegExp(" daum[ /]| deusu/| yadirectfetcher|(?:^|[^g])news(?!sapphire)|(?<! (?:channel/|google/))google(?!(app|/google| pixel))|(?<! cu)bots?(?:\\b|_)|(?<!(?:lib))http|(?<![hg]m)score|(?<!cam)scan|@[a-z][\\w-]+\\.|\\(\\)|\\.com\\b|\\btime/|\\||^<|^[\\w \\.\\-\\(?:\\):%]+(?:/v?\\d+(?:\\.\\d+)?(?:\\.\\d{1,10})*?)?(?:,|$)|^[^ ]{50,}$|^\\d+\\b|^\\w*search\\b|^\\w+/[\\w\\(\\)]*$|^active|^ad muncher|^amaya|^avsdevicesdk/|^azure|^biglotron|^bot|^bw/|^clamav[ /]|^client/|^cobweb/|^custom|^ddg[_-]android|^discourse|^dispatch/\\d|^downcast/|^duckduckgo|^email|^facebook|^getright/|^gozilla/|^hobbit|^hotzonu|^hwcdn/|^igetter/|^jeode/|^jetty/|^jigsaw|^microsoft bits|^movabletype|^mozilla/\\d\\.\\d\\s[\\w\\.-]+$|^mozilla/\\d\\.\\d\\s\\(compatible;?(?:\\s\\w+\\/\\d+\\.\\d+)?\\)$|^navermailapp|^netsurf|^offline|^openai/|^owler|^php|^postman|^python|^rank|^read|^reed|^rest|^rss|^snapchat|^space bison|^svn|^swcd |^taringa|^thumbor/|^track|^w3c|^webbandit/|^webcopier|^wget|^whatsapp|^wordpress|^xenu link sleuth|^yahoo|^yandex|^zdm/\\d|^zoom marketplace/|^{{.*}}$|analyzer|archive|ask jeeves/teoma|audit|bit\\.ly/|bluecoat drtr|browsex|burpcollaborator|capture|catch|check\\b|checker|chrome-lighthouse|chromeframe|classifier|cloudflare|convertify|crawl|cypress/|dareboost|datanyze|dejaclick|detect|dmbrowser|download|evc-batch/|exaleadcloudview|feed|firephp|functionize|gomezagent|grab|headless|httrack|hubspot marketing grader|hydra|ibisbrowser|infrawatch|insight|inspect|iplabel|ips-agent|java(?!;)|library|linkcheck|mail\\.ru/|manager|measure|neustar wpm|node|nutch|offbyone|onetrust|optimize|pageburst|pagespeed|parser|perl|phantomjs|pingdom|powermarks|preview|proxy|ptst[ /]\\d|retriever|rexx;|rigor|rss\\b|scrape|server|sogou|sparkler/|speedcurve|spider|splash|statuscake|supercleaner|synapse|synthetic|tools|torrent|transcoder|url|validator|virtuoso|wappalyzer|webglance|webkit2png|whatcms/|xtate/", "i");
    } catch (e2) {
      sg = ig;
    }
    return sg;
  }().test(e);
}
const renderRouterToStream = async ({ request: e, router: n, responseHeaders: r, children: a }) => {
  if ("function" == typeof Zu.renderToReadableStream) {
    const o = await Zu.renderToReadableStream(a, { signal: e.signal });
    isbot(e.headers.get("User-Agent")) && await o.allReady;
    const s = function(e2, n2) {
      return transformStreamWithRouter(e2, n2);
    }(n, o);
    return new Response(s, { status: n.state.statusCode, headers: r });
  }
  if ("function" == typeof Zu.renderToPipeableStream) {
    const o = new PassThrough();
    try {
      const n2 = Zu.renderToPipeableStream(a, { ...isbot(e.headers.get("User-Agent")) ? { onAllReady() {
        n2.pipe(o);
      } } : { onShellReady() {
        n2.pipe(o);
      } }, onError: (e2, n3) => {
        console.error("Error in renderToPipeableStream:", e2, n3);
      } });
    } catch (e2) {
      console.error("Error in renderToPipeableStream:", e2);
    }
    const s = function(e2, n2) {
      return Readable.fromWeb(transformStreamWithRouter(e2, Readable.toWeb(n2)));
    }(n, o);
    return new Response(s, { status: n.state.statusCode, headers: r });
  }
  throw new Error("No renderToReadableStream or renderToPipeableStream found in react-dom/server. Ensure you are using a version of react-dom that supports streaming.");
};
function StartServer(e) {
  return ke.jsx(RouterProvider, { router: e.router });
}
const defaultStreamHandler = ({ request: e, router: n, responseHeaders: r }) => renderRouterToStream({ request: e, router: n, responseHeaders: r, children: ke.jsx(StartServer, { router: n }) }), cg = { stringify: (e) => JSON.stringify(e, function(e2, n) {
  const r = this[e2], a = lg.find((e3) => e3.stringifyCondition(r));
  return a ? a.stringify(r) : n;
}), parse: (e) => JSON.parse(e, function(e2, n) {
  const r = this[e2];
  if (isPlainObject$2(r)) {
    const e3 = lg.find((e4) => e4.parseCondition(r));
    if (e3) return e3.parse(r);
  }
  return n;
}), encode: (e) => {
  if (Array.isArray(e)) return e.map((e2) => cg.encode(e2));
  if (isPlainObject$2(e)) return Object.fromEntries(Object.entries(e).map(([e2, n2]) => [e2, cg.encode(n2)]));
  const n = lg.find((n2) => n2.stringifyCondition(e));
  return n ? n.stringify(e) : e;
}, decode: (e) => {
  if (isPlainObject$2(e)) {
    const n = lg.find((n2) => n2.parseCondition(e));
    if (n) return n.parse(e);
  }
  return Array.isArray(e) ? e.map((e2) => cg.decode(e2)) : isPlainObject$2(e) ? Object.fromEntries(Object.entries(e).map(([e2, n]) => [e2, cg.decode(n)])) : e;
} }, createSerializer = (e, n, r, a) => ({ key: e, stringifyCondition: n, stringify: (n2) => ({ [`$${e}`]: r(n2) }), parseCondition: (n2) => Object.hasOwn(n2, `$${e}`), parse: (n2) => a(n2[`$${e}`]) }), lg = [createSerializer("undefined", (e) => void 0 === e, () => 0, () => {
}), createSerializer("date", (e) => e instanceof Date, (e) => e.toISOString(), (e) => new Date(e)), createSerializer("error", (e) => e instanceof Error, (e) => ({ ...e, message: e.message, stack: void 0, cause: e.cause }), (e) => Object.assign(new Error(e.message), e)), createSerializer("formData", (e) => e instanceof FormData, (e) => {
  const n = {};
  return e.forEach((e2, r) => {
    const a = n[r];
    void 0 !== a ? Array.isArray(a) ? a.push(e2) : n[r] = [a, e2] : n[r] = e2;
  }), n;
}, (e) => {
  const n = new FormData();
  return Object.entries(e).forEach(([e2, r]) => {
    Array.isArray(r) ? r.forEach((r2) => n.append(e2, r2)) : n.append(e2, r);
  }), n;
}), createSerializer("bigint", (e) => "bigint" == typeof e, (e) => e.toString(), (e) => BigInt(e))], ug = new AsyncLocalStorage$1();
const pg = [], getRouterInstance = () => {
  var e;
  return null == (e = function(e2) {
    const n = ug.getStore();
    if (!n && false !== (null == e2 ? void 0 : e2.throwIfNotFound)) throw new Error("No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");
    return n;
  }({ throwIfNotFound: false })) ? void 0 : e.router;
};
function createServerFn(e, n) {
  const r = n || e || {};
  return void 0 === r.method && (r.method = "GET"), { options: r, middleware: (e2) => createServerFn(void 0, Object.assign(r, { middleware: e2 })), validator: (e2) => createServerFn(void 0, Object.assign(r, { validator: e2 })), type: (e2) => createServerFn(void 0, Object.assign(r, { type: e2 })), handler: (...e2) => {
    const [n2, a] = e2;
    Object.assign(r, { ...n2, extractedFn: n2, serverFn: a });
    const o = [...r.middleware || [], serverFnBaseToMiddleware(r)];
    return Object.assign(async (e3) => executeMiddleware$1(o, "client", { ...n2, ...r, data: null == e3 ? void 0 : e3.data, headers: null == e3 ? void 0 : e3.headers, signal: null == e3 ? void 0 : e3.signal, context: {}, router: getRouterInstance() }).then((e4) => {
      if ("full" === r.response) return e4;
      if (e4.error) throw e4.error;
      return e4.result;
    }), { ...n2, __executeServer: async (e3, a2) => {
      const s = e3 instanceof FormData ? function(e4) {
        const n3 = e4.get("__TSR_CONTEXT");
        if (e4.delete("__TSR_CONTEXT"), "string" != typeof n3) return { context: {}, data: e4 };
        try {
          return { context: cg.parse(n3), data: e4 };
        } catch {
          return { data: e4 };
        }
      }(e3) : e3;
      s.type = "function" == typeof r.type ? r.type(s) : r.type;
      const i = { ...n2, ...s, signal: a2 }, run = () => executeMiddleware$1(o, "server", i).then((e4) => ({ result: e4.result, error: e4.error, context: e4.sendContext }));
      if ("static" === i.type) {
        let e4;
        if ((null == dg ? void 0 : dg.getItem) && (e4 = await dg.getItem(i)), e4 || (e4 = await run().then((e5) => ({ ctx: e5, error: null })).catch((e5) => ({ ctx: void 0, error: e5 })), (null == dg ? void 0 : dg.setItem) && await dg.setItem(i, e4)), invariant(e4), e4.error) throw e4.error;
        return e4.ctx;
      }
      return run();
    } });
  } };
}
async function executeMiddleware$1(e, n, r) {
  const a = flattenMiddlewares([...pg, ...e]), next = async (e2) => {
    const r2 = a.shift();
    if (!r2) return e2;
    r2.options.validator && ("client" !== n || r2.options.validateClient) && (e2.data = await function(e3, n2) {
      if (null == e3) return {};
      if ("~standard" in e3) {
        const r3 = e3["~standard"].validate(n2);
        if (r3 instanceof Promise) throw new Error("Async validation not supported");
        if (r3.issues) throw new Error(JSON.stringify(r3.issues, void 0, 2));
        return r3.value;
      }
      if ("parse" in e3) return e3.parse(n2);
      if ("function" == typeof e3) return e3(n2);
      throw new Error("Invalid validator type!");
    }(r2.options.validator, e2.data));
    const o = "client" === n ? r2.options.client : r2.options.server;
    return o ? applyMiddleware(o, e2, async (e3) => next(e3).catch((n2) => {
      if (isRedirect(n2) || isNotFound(n2)) return { ...e3, error: n2 };
      throw n2;
    })) : next(e2);
  };
  return next({ ...r, headers: r.headers || {}, sendContext: r.sendContext || {}, context: r.context || {} });
}
let dg;
function flattenMiddlewares(e) {
  const n = /* @__PURE__ */ new Set(), r = [], recurse = (e2) => {
    e2.forEach((e3) => {
      e3.options.middleware && recurse(e3.options.middleware), n.has(e3) || (n.add(e3), r.push(e3));
    });
  };
  return recurse(e), r;
}
!function(e) {
  dg = "function" == typeof e ? e() : e;
}(() => {
  const getStaticCacheUrl = async (e2, n) => {
    const r = await async function(e3) {
      const n2 = new TextEncoder().encode(e3), r2 = await crypto.subtle.digest("SHA-1", n2), a = Array.from(new Uint8Array(r2)).map((e4) => e4.toString(16).padStart(2, "0")).join("");
      return a;
    }(`${e2.functionId}__${n}`);
    return `/__tsr/staticServerFnCache/${r}.json`;
  }, jsonToFilenameSafeString = (e2) => JSON.stringify(e2 ?? "", (e3, n) => n && "object" == typeof n && !Array.isArray(n) ? Object.keys(n).sort().reduce((e4, r) => (e4[r] = n[r], e4), {}) : n).replace(/[/\\?%*:|"<>]/g, "-").replace(/\s+/g, "_"), e = "undefined" != typeof document ? /* @__PURE__ */ new Map() : null;
  return { getItem: async (e2) => {
    if ("undefined" == typeof document) {
      const n = jsonToFilenameSafeString(e2.data), r = await getStaticCacheUrl(e2, n), a = "C:/00-CodeShop/2025v12-BLN-Website/.output/public", { promises: o } = await Promise.resolve().then(function() {
        return ys;
      }), s = (await import("node:path")).join(a, r), [i, c] = await o.readFile(s, "utf-8").then((e3) => [cg.parse(e3), null]).catch((e3) => [null, e3]);
      if (c && "ENOENT" !== c.code) throw c;
      return i;
    }
  }, setItem: async (e2, n) => {
    const { promises: r } = await Promise.resolve().then(function() {
      return ys;
    }), a = await import("node:path"), o = jsonToFilenameSafeString(e2.data), s = await getStaticCacheUrl(e2, o), i = a.join("C:/00-CodeShop/2025v12-BLN-Website/.output/public", s);
    await r.mkdir(a.dirname(i), { recursive: true }), await r.writeFile(i, cg.stringify(n));
  }, fetchItem: async (n) => {
    const r = jsonToFilenameSafeString(n.data), a = await getStaticCacheUrl(n, r);
    let o = null == e ? void 0 : e.get(a);
    return o || (o = await fetch(a, { method: "GET" }).then((e2) => e2.text()).then((e2) => cg.parse(e2)), null == e || e.set(a, o)), o;
  } };
});
const applyMiddleware = async (e, n, r) => e({ ...n, next: async (e2 = {}) => r({ ...n, ...e2, context: { ...n.context, ...e2.context }, sendContext: { ...n.sendContext, ...e2.sendContext ?? {} }, headers: mergeHeaders(n.headers, e2.headers), result: void 0 !== e2.result ? e2.result : "raw" === n.response ? e2 : n.result, error: e2.error ?? n.error }) });
function serverFnBaseToMiddleware(e) {
  return { _types: void 0, options: { validator: e.validator, validateClient: e.validateClient, client: async ({ next: n, sendContext: r, ...a }) => {
    var o;
    const s = { ...a, context: r, type: "function" == typeof a.type ? a.type(a) : a.type };
    if ("static" === a.type && "undefined" != typeof document) {
      invariant(dg);
      const e2 = await dg.fetchItem(s);
      if (e2) {
        if (e2.error) throw e2.error;
        return n(e2.ctx);
      }
      N(e2, `No static cache item found for ${s.functionId}__${JSON.stringify(s.data)}, falling back to server function...`);
    }
    return n(await (null == (o = e.extractedFn) ? void 0 : o.call(e, s)));
  }, server: async ({ next: n, ...r }) => {
    var a;
    const o = await (null == (a = e.serverFn) ? void 0 : a.call(e, r));
    return n({ ...r, result: o });
  } } };
}
const hg = new AsyncLocalStorage$1();
function getEvent() {
  const e = hg.getStore();
  if (!e) throw new Error("No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");
  return e;
}
const mg = Symbol("$HTTPEvent");
function createWrapperFunction(e) {
  return function(...n) {
    const r = n[0];
    var a;
    return "object" == typeof (a = r) && (a instanceof H3Event || (null == a ? void 0 : a[mg]) instanceof H3Event || true === (null == a ? void 0 : a.__is_event__)) ? n[0] = r instanceof H3Event || r.__is_event__ ? r : r[mg] : n.unshift(getEvent()), e(...n);
  };
}
const fg = createWrapperFunction(function(e) {
  return e.node.res.statusCode;
}), gg = createWrapperFunction(function(e) {
  return e.node.res.getHeaders();
});
const vg = "tanstack-start-route-tree:v", yg = "tanstack-start-manifest:v", bg = "tanstack-start-server-fn-manifest:v";
async function loadVirtualModule(e) {
  switch (e) {
    case vg:
      return await Promise.resolve().then(() => Dg);
    case yg:
      return await import("./_tanstack-start-manifest_v-CUsKgOx8-DuCybPi7.js");
    case bg:
      return await import("./_tanstack-start-server-fn-manifest_v-CzLXrrmC-DSNSelFo.js");
    default:
      throw new Error(`Unknown virtual module: ${e}`);
  }
}
function isNotFoundResponse(e) {
  const { headers: n, ...r } = e;
  return new Response(JSON.stringify(r), { status: 200, headers: { "Content-Type": "application/json", ...n || {} } });
}
const xg = "X-TSS_SHELL";
function handlerToMiddleware(e) {
  return async ({ next: n, ...r }) => {
    const a = await e(r);
    return a ? { response: a } : n(r);
  };
}
function handleCtxResult(e) {
  return isSpecialResponse(e) ? { response: e } : e;
}
function isSpecialResponse(e) {
  return e instanceof Response || isRedirect(e);
}
function routerWithQueryClient(e, n, r) {
  const a = e.options;
  if (e.options = { ...e.options, context: { ...a.context, queryClient: n }, Wrap: ({ children: e2 }) => {
    const r2 = Ge.Fragment, o = a.Wrap || Ge.Fragment;
    return ke.jsx(r2, { children: ke.jsx(QueryClientProvider, { client: n, children: ke.jsx(o, { children: e2 }) }) });
  } }, e.isServer) {
    const r2 = function() {
      let e2;
      const n2 = new ReadableStream({ start(n3) {
        e2 = n3;
      } });
      let r3 = false;
      return { stream: n2, enqueue: (n3) => e2.enqueue(n3), close: () => {
        e2.close(), r3 = true;
      }, isClosed: () => r3, error: (n3) => e2.error(n3) };
    }();
    e.options.dehydrate = async () => {
      var o2;
      const s = await (null == (o2 = a.dehydrate) ? void 0 : o2.call(a)), i = dehydrate(n);
      e.serverSsr.onRenderFinished(() => r2.close());
      return { ...s, dehydratedQueryClient: i, queryStream: r2.stream };
    };
    const o = n.getDefaultOptions();
    n.setDefaultOptions({ ...o, dehydrate: { shouldDehydrateQuery: () => true, ...o.dehydrate } }), n.getQueryCache().subscribe((a2) => {
      if ("added" === a2.type) {
        if (!e.serverSsr.isDehydrated()) return;
        if (r2.isClosed()) return void console.warn(`tried to stream query ${a2.query.queryHash} after stream was already closed`);
        r2.enqueue(dehydrate(n, { shouldDehydrateQuery: (e2) => {
          var n2, r3;
          return e2.queryHash === a2.query.queryHash && ((null == (r3 = null == (n2 = o.dehydrate) ? void 0 : n2.shouldDehydrateQuery) ? void 0 : r3.call(n2, e2)) ?? true);
        } }));
      }
    });
  } else {
    e.options.hydrate = async (e2) => {
      var r2;
      await (null == (r2 = a.hydrate) ? void 0 : r2.call(a, e2)), hydrate(n, e2.dehydratedQueryClient);
      const o = e2.queryStream.getReader();
      o.read().then(async function handle({ done: e3, value: r3 }) {
        if (hydrate(n, r3), e3) return;
        return handle(await o.read());
      }).catch((e3) => {
        console.error("Error reading query stream:", e3);
      });
    };
    {
      const r2 = n.getMutationCache().config;
      n.getMutationCache().config = { ...r2, onError: (n2, a3, o, s) => {
        var i;
        return isRedirect(n2) ? (n2.options._fromLocation = e.state.location, e.navigate(e.resolveRedirect(n2).options)) : null == (i = r2.onError) ? void 0 : i.call(r2, n2, a3, o, s);
      } };
      const a2 = n.getQueryCache().config;
      n.getQueryCache().config = { ...a2, onError: (n2, r3) => {
        var o;
        return isRedirect(n2) ? (n2.options._fromLocation = e.state.location, e.navigate(e.resolveRedirect(n2).options)) : null == (o = a2.onError) ? void 0 : o.call(a2, n2, r3);
      } };
    }
  }
  return e;
}
const Sg = createContext(void 0), kg = createContext(void 0), TanStackRouterDevtools = function() {
  return null;
}, wg = function(e) {
  return new RootRoute(e);
}({ head: () => ({ meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { title: "BijaLapa" }], links: [{ rel: "stylesheet", href: "/assets/app-DGxfKCjO.css" }, { rel: "stylesheet", href: "/assets/styles-D3CiK31b.css" }] }), component: function() {
  return ke.jsx(RootDocument, { children: ke.jsx(jt, {}) });
} });
function RootDocument({ children: e }) {
  return ke.jsxs("html", { children: [ke.jsx("head", { children: ke.jsx(HeadContent, {}) }), ke.jsxs("body", { children: [e, ke.jsx(TanStackRouterDevtools, { position: "bottom-right" }), ke.jsx(ReactQueryDevtools2, { buttonPosition: "bottom-left" }), ke.jsx(Scripts, {})] })] });
}
const Cg = createFileRoute("/deferred")({ loader: ({ context: e }) => {
  e.queryClient.prefetchQuery({ queryKey: ["deferred"], queryFn: async () => (await new Promise((e2) => setTimeout(e2, 3e3)), { message: "Hello deferred from the server!", status: "success", time: /* @__PURE__ */ new Date() }) });
}, component: lazyRouteComponent(() => import("./deferred-CdxJuQ03-JCt7819F.js"), "component") });
function sanitizeBase(e) {
  return e.replace(/^\/|\/$/g, "");
}
const createServerRpc = (e, n, r) => {
  invariant(r);
  const a = sanitizeBase("/"), o = `${a ? `/${a}` : ""}/${sanitizeBase(n)}/${e}`;
  return Object.assign(r, { url: o, functionId: e });
}, Rg = createServerRpc("src_routes_about_tsx--getMdfile_createServerFn_handler", "/_serverFn", (e, n) => Pg.__executeServer(e, n)), Pg = createServerFn().handler(Rg, async () => (await Cu.get("https://raw.githubusercontent.com/efgarro/2024v10-SCR-CMApp/refs/heads/main/README.md")).data), Tg = createFileRoute("/about")({ component: lazyRouteComponent(() => import("./about-Bxe6PIfo-BRS385By.js"), "component"), loader: async () => await Pg() }), Eg = createServerRpc("src_routes_index_tsx--getTodo_createServerFn_handler", "/_serverFn", (e, n) => $g.__executeServer(e, n)), $g = createServerFn({ method: "GET" }).handler(Eg, async () => (await Cu("https://jsonplaceholder.typicode.com/todos/11")).data), Fg = createServerRpc("src_routes_index_tsx--getServerTime_createServerFn_handler", "/_serverFn", (e, n) => _g.__executeServer(e, n)), _g = createServerFn({ method: "GET" }).handler(Fg, async () => (/* @__PURE__ */ new Date()).toISOString()), Ag = createServerRpc("src_routes_index_tsx--getServerData_createServerFn_handler", "/_serverFn", (e, n) => Og.__executeServer(e, n)), Og = createServerFn({ method: "GET" }).handler(Ag, async () => ({ message: "Hello, World!" })), jg = createFileRoute("/")({ component: lazyRouteComponent(() => import("./index-DyXh9kiA-D4oL5WrM.js"), "component"), loader: async () => await $g() }), Ig = Cg.update({ id: "/deferred", path: "/deferred", getParentRoute: () => wg }), Mg = Tg.update({ id: "/about", path: "/about", getParentRoute: () => wg }), Lg = { IndexRoute: jg.update({ id: "/", path: "/", getParentRoute: () => wg }), AboutRoute: Mg, DeferredRoute: Ig }, Ng = wg._addFileChildren(Lg)._addFileTypes(), Dg = Object.freeze(Object.defineProperty({ __proto__: null, routeTree: Ng }, Symbol.toStringTag, { value: "Module" }));
const Bg = function({ createRouter: n }) {
  let r, a = null, o = null;
  return (s) => {
    const i = globalThis.fetch, startRequestResolver = async ({ request: c }) => {
      globalThis.fetch = async function(e, n2) {
        function resolve(e2, n3) {
          const r2 = new Request(e2, n3);
          return startRequestResolver({ request: r2 });
        }
        function getOrigin() {
          return c.headers.get("Origin") || c.headers.get("Referer") || "http://localhost";
        }
        if ("string" == typeof e && e.startsWith("/")) {
          return resolve(new URL(e, getOrigin()), n2);
        }
        if ("object" == typeof e && "url" in e && "string" == typeof e.url && e.url.startsWith("/")) {
          return resolve(new URL(e.url, getOrigin()), n2);
        }
        return i(e, n2);
      };
      const l = new URL(c.url), u = decodeURIComponent(l.href.replace(l.origin, "")), p = await n(), h = createMemoryHistory({ initialEntries: [u] }), g = "true" === S$1.env.TSS_PRERENDERING;
      let v = "true" === S$1.env.TSS_SHELL;
      g && !v && (v = "true" === c.headers.get(xg)), p.update({ history: h, isShell: v, isPrerendering: g });
      const y = await (async () => {
        try {
          0;
          const e = joinPaths(["/", trimPath("/_serverFn"), "/"]);
          if (u.startsWith(e)) return await (async ({ request: e2 }) => {
            const n2 = new AbortController(), r2 = n2.signal, abort2 = () => n2.abort();
            e2.signal.addEventListener("abort", abort2);
            const a2 = e2.method, o2 = new URL(e2.url, "http://localhost:3000"), s2 = new RegExp(`${i2 = "/_serverFn", i2.replace(/^\/|\/$/g, "")}/([^/?#]+)`);
            var i2;
            const c2 = o2.pathname.match(s2), l2 = c2 ? c2[1] : null, u2 = Object.fromEntries(o2.searchParams.entries()), p2 = "createServerFn" in u2;
            if ("string" != typeof l2) throw new Error("Invalid server action param for serverFnId: " + l2);
            const { default: h2 } = await loadVirtualModule(bg), g2 = h2[l2];
            if (!g2) throw console.info("serverFnManifest", h2), new Error("Server function info not found for " + l2);
            const v2 = await g2.importer();
            if (!v2) throw console.info("serverFnInfo", g2), new Error("Server function module not resolved for " + l2);
            const y2 = v2[g2.functionName];
            if (!y2) throw console.info("serverFnInfo", g2), console.info("fnModule", v2), new Error(`Server function module export not resolved for serverFn ID: ${l2}`);
            const b3 = ["multipart/form-data", "application/x-www-form-urlencoded"], k = await (async () => {
              try {
                let n3 = await (async () => {
                  if (e2.headers.get("Content-Type") && b3.some((n5) => {
                    var r3;
                    return null == (r3 = e2.headers.get("Content-Type")) ? void 0 : r3.includes(n5);
                  })) return invariant("get" !== a2.toLowerCase()), await y2(await e2.formData(), r2);
                  if ("get" === a2.toLowerCase()) {
                    let e3 = u2;
                    return p2 && (e3 = u2.payload), e3 = e3 ? cg.parse(e3) : e3, await y2(e3, r2);
                  }
                  const n4 = await e2.text(), o3 = cg.parse(n4);
                  return p2 ? await y2(o3, r2) : await y2(...o3, r2);
                })();
                return n3.result instanceof Response ? n3.result : !p2 && (n3 = n3.result, n3 instanceof Response) ? n3 : isNotFound(n3) ? isNotFoundResponse(n3) : new Response(void 0 !== n3 ? cg.stringify(n3) : void 0, { status: fg(getEvent()), headers: { "Content-Type": "application/json" } });
              } catch (e3) {
                return e3 instanceof Response ? e3 : isNotFound(e3) ? isNotFoundResponse(e3) : (console.info(), console.info("Server Fn Error!"), console.info(), console.error(e3), console.info(), new Response(cg.stringify(e3), { status: 500, headers: { "Content-Type": "application/json" } }));
              }
            })();
            return e2.signal.removeEventListener("abort", abort2), k;
          })({ request: c });
          if (null === a) try {
            a = await loadVirtualModule(vg), a.serverRouteTree && (r = processRouteTree({ routeTree: a.serverRouteTree, initRoute: (e2, n2) => {
              e2.init({ originalIndex: n2 });
            } }));
          } catch (e2) {
            console.log(e2);
          }
          const executeRouter = () => async function(e2, n2) {
            return ug.run(e2, n2);
          }({ router: p }, async () => {
            const e2 = (c.headers.get("Accept") || "*/*").split(",");
            if (!["*/*", "text/html"].some((n3) => e2.some((e3) => e3.trim().startsWith(n3)))) return json({ error: "Only HTML requests are supported here" }, { status: 500 });
            if (null === o && (o = await async function() {
              const { tsrStartManifest: e3 } = await loadVirtualModule(yg), n3 = e3(), r3 = n3.routes[pe] = n3.routes[pe] || {};
              r3.assets = r3.assets || [];
              let a2 = `import('${n3.clientEntry}')`;
              r3.assets.push({ tag: "script", attrs: { type: "module", suppressHydrationWarning: true, async: true }, children: a2 });
              const o2 = { ...n3, routes: Object.fromEntries(Object.entries(n3.routes).map(([e4, n4]) => {
                const { preloads: r4, assets: a3 } = n4;
                return [e4, { preloads: r4, assets: a3 }];
              })) };
              return o2;
            }()), attachRouterServerSsrUtils(p, o), await p.load(), p.state.redirect) return p.state.redirect;
            await p.serverSsr.dehydrate();
            const n2 = (r2 = { router: p }, mergeHeaders(gg(), { "Content-Type": "text/html; charset=UTF-8" }, ...r2.router.state.matches.map((e3) => e3.headers)));
            var r2;
            return await s({ request: c, router: p, responseHeaders: n2 });
          });
          if (r) {
            const [e2, n2] = await async function(e3) {
              var n3, r2;
              const a2 = new URL(e3.request.url), o2 = a2.pathname, s2 = getMatchedRoutes({ pathname: o2, basepath: e3.basePath, caseSensitive: true, routesByPath: e3.processedServerRouteTree.routesByPath, routesById: e3.processedServerRouteTree.routesById, flatRoutes: e3.processedServerRouteTree.flatRoutes }), i2 = e3.router.getMatchedRoutes(o2, void 0);
              let c2, l2 = [];
              if (l2 = s2.matchedRoutes, i2.foundRoute && s2.matchedRoutes.length < i2.matchedRoutes.length) {
                const r3 = [...i2.matchedRoutes].reverse().find((n4) => void 0 !== e3.processedServerRouteTree.routesById[n4.id]);
                if (r3) {
                  let a3 = r3.id;
                  l2 = [];
                  do {
                    const r4 = e3.processedServerRouteTree.routesById[a3];
                    if (!r4) break;
                    l2.push(r4), a3 = null == (n3 = r4.parentRoute) ? void 0 : n3.id;
                  } while (a3);
                  l2.reverse();
                }
              }
              if (l2.length) {
                const n4 = flattenMiddlewares(l2.flatMap((e4) => e4.options.middleware).filter(Boolean)).map((e4) => e4.options.server);
                if (null == (r2 = s2.foundRoute) ? void 0 : r2.options.methods) {
                  const r3 = Object.keys(s2.foundRoute.options.methods).find((n5) => n5.toLowerCase() === e3.request.method.toLowerCase());
                  if (r3) {
                    const e4 = s2.foundRoute.options.methods[r3];
                    e4 && ("function" == typeof e4 ? n4.push(handlerToMiddleware(e4)) : (e4._options.middlewares && e4._options.middlewares.length && n4.push(...flattenMiddlewares(e4._options.middlewares).map((e5) => e5.options.server)), e4._options.handler && n4.push(handlerToMiddleware(e4._options.handler))));
                  }
                }
                n4.push(handlerToMiddleware(e3.executeRouter));
                const a3 = await function(e4, n5) {
                  let r3 = -1;
                  const next = async (n6) => {
                    r3++;
                    const a4 = e4[r3];
                    if (!a4) return n6;
                    const o3 = await a4({ ...n6, next: async (e5) => {
                      const r4 = await next({ ...n6, ...e5, context: { ...n6.context, ...(null == e5 ? void 0 : e5.context) || {} } });
                      return Object.assign(n6, handleCtxResult(r4));
                    } }).catch((e5) => {
                      if (isSpecialResponse(e5)) return { response: e5 };
                      throw e5;
                    });
                    return Object.assign(n6, handleCtxResult(o3));
                  };
                  return handleCtxResult(next(n5));
                }(n4, { request: e3.request, context: {}, params: s2.routeParams, pathname: o2 });
                c2 = a3.response;
              }
              return [l2, c2];
            }({ processedServerRouteTree: r, router: p, request: c, basePath: "/", executeRouter });
            if (n2) return n2;
          }
          return await executeRouter();
        } catch (e) {
          if (e instanceof Response) return e;
          throw e;
        }
      })();
      if (isRedirect(y)) {
        if (isRedirect(b2 = y) && b2.options.href) return "manual" === c.headers.get("x-tsr-redirect") ? json({ ...y.options, isSerializedRedirect: true }, { headers: y.headers }) : y;
        if (y.options.to && "string" == typeof y.options.to && !y.options.to.startsWith("/")) throw new Error(`Server side redirects must use absolute paths via the 'href' or 'to' options. The redirect() method's "to" property accepts an internal path only. Use the "href" property to provide an external URL. Received: ${JSON.stringify(y.options)}`);
        if (["params", "search", "hash"].some((e2) => "function" == typeof y.options[e2])) throw new Error(`Server side redirects must use static search, params, and hash values and do not support functional values. Received functional values for: ${Object.keys(y.options).filter((e2) => "function" == typeof y.options[e2]).map((e2) => `"${e2}"`).join(", ")}`);
        const e = p.resolveRedirect(y);
        return "manual" === c.headers.get("x-tsr-redirect") ? json({ ...y.options, isSerializedRedirect: true }, { headers: y.headers }) : e;
      }
      var b2;
      return y;
    };
    return startRequestResolver;
  };
}({ createRouter: function() {
  const e = new Wt();
  return routerWithQueryClient(((e2) => new Router(e2))({ routeTree: Ng, context: { queryClient: e }, defaultPreload: "intent", defaultPreloadStaleTime: 0, scrollRestoration: true }), e);
} })(defaultStreamHandler), zg = (qg = function(e) {
  const n = toWebRequest(e);
  return Bg({ request: n });
}, function(e) {
  if ("function" == typeof e) return e.__is_handler__ = true, e;
  const n = { onRequest: _normalizeArray(e.onRequest), onBeforeResponse: _normalizeArray(e.onBeforeResponse) }, _handler = (r) => async function(e2, n2, r2) {
    if (r2.onRequest) {
      for (const n3 of r2.onRequest) if (await n3(e2), e2.handled) return;
    }
    const a = { body: await n2(e2) };
    if (r2.onBeforeResponse) for (const n3 of r2.onBeforeResponse) await n3(e2, a);
    return a.body;
  }(r, e.handler, n);
  return _handler.__is_handler__ = true, _handler.__resolve__ = e.handler.__resolve__, _handler.__websocket__ = e.websocket, _handler;
}((e) => async function(e2, n) {
  return hg.run(e2, n);
}(e, () => qg(e))));
var qg;
const Hg = Object.freeze(Object.defineProperty({ __proto__: null, D: kg, R: Tg, S: Sg, a: jg, b: createServerFn, c: createServerRpc, default: zg, u: () => {
  const e = function(e2) {
    return Qt && Qt.context && void 0 !== Qt.context[e2.id] ? Qt.context[e2.id] : e2.defaultValue;
  }(kg);
  if (!e) throw new Error("useDevtoolsOnClose must be used within a TanStackRouterDevtools component");
  return e;
} }, Symbol.toStringTag, { value: "Module" }));
export {
  Tg as R,
  It as S,
  resolveStaleTime as a,
  replaceData as b,
  Bt as c,
  Ge as d,
  shouldThrowError as e,
  fetchState as f,
  jg as g,
  createServerRpc as h,
  createServerFn as i,
  ke as j,
  Cu as k,
  createFileRoute as l,
  getDefaultExportFromNamespaceIfNotNamed as m,
  noop$7 as n,
  getDefaultExportFromCjs as o,
  pendingThenable as p,
  queryOptions as q,
  resolveEnabled as r,
  shallowEqualObjects as s,
  I as t,
  useQueryClient as u,
  St as v,
  Qe as w,
  Hg as x
};
