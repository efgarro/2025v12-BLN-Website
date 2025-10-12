import { d as Ge, j as ke, u as useQueryClient, c as Bt, n as noop$7, e as shouldThrowError, q as queryOptions, S as It, p as pendingThenable, r as resolveEnabled, s as shallowEqualObjects, a as resolveStaleTime, f as fetchState, b as replaceData } from "./ssr-D243SbGa.js";
import "./worker-entry-BMtBY4SI.js";
import "node:timers";
import "node:buffer";
import "node:stream";
import "node:path";
import "node:url";
import "node:assert";
import "node:zlib";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "cloudflare:workers";
import "node:net";
import "node:util";
import "node:crypto";
var f = class extends It {
  constructor(e, r) {
    super(), this.options = r, this.#e = e, this.#t = null, this.#r = pendingThenable(), this.options.experimental_prefetchInRender || this.#r.reject(new Error("experimental_prefetchInRender feature flag is not enabled")), this.bindMethods(), this.setOptions(r);
  }
  #e;
  #s = void 0;
  #i = void 0;
  #n = void 0;
  #a;
  #o;
  #r;
  #t;
  #u;
  #c;
  #h;
  #l;
  #d;
  #p;
  #f = /* @__PURE__ */ new Set();
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    1 === this.listeners.size && (this.#s.addObserver(this), shouldFetchOnMount(this.#s, this.options) ? this.#y() : this.updateResult(), this.#m());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(this.#s, this.options, this.options.refetchOnReconnect);
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(this.#s, this.options, this.options.refetchOnWindowFocus);
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), this.#R(), this.#b(), this.#s.removeObserver(this);
  }
  setOptions(e) {
    const t = this.options, n = this.#s;
    if (this.options = this.#e.defaultQueryOptions(e), void 0 !== this.options.enabled && "boolean" != typeof this.options.enabled && "function" != typeof this.options.enabled && "boolean" != typeof resolveEnabled(this.options.enabled, this.#s)) throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");
    this.#v(), this.#s.setOptions(this.options), t._defaulted && !shallowEqualObjects(this.options, t) && this.#e.getQueryCache().notify({ type: "observerOptionsUpdated", query: this.#s, observer: this });
    const a = this.hasListeners();
    a && shouldFetchOptionally(this.#s, n, this.options, t) && this.#y(), this.updateResult(), !a || this.#s === n && resolveEnabled(this.options.enabled, this.#s) === resolveEnabled(t.enabled, this.#s) && resolveStaleTime(this.options.staleTime, this.#s) === resolveStaleTime(t.staleTime, this.#s) || this.#Q();
    const o = this.#O();
    !a || this.#s === n && resolveEnabled(this.options.enabled, this.#s) === resolveEnabled(t.enabled, this.#s) && o === this.#p || this.#g(o);
  }
  getOptimisticResult(e) {
    const t = this.#e.getQueryCache().build(this.#e, e), r = this.createResult(t, e);
    return function(e2, t2) {
      if (!shallowEqualObjects(e2.getCurrentResult(), t2)) return true;
      return false;
    }(this, r) && (this.#n = r, this.#o = this.options, this.#a = this.#s.state), r;
  }
  getCurrentResult() {
    return this.#n;
  }
  trackResult(e, t) {
    return new Proxy(e, { get: (e2, r) => (this.trackProp(r), t?.(r), Reflect.get(e2, r)) });
  }
  trackProp(e) {
    this.#f.add(e);
  }
  getCurrentQuery() {
    return this.#s;
  }
  refetch({ ...e } = {}) {
    return this.fetch({ ...e });
  }
  fetchOptimistic(e) {
    const t = this.#e.defaultQueryOptions(e), r = this.#e.getQueryCache().build(this.#e, t);
    return r.fetch().then(() => this.createResult(r, t));
  }
  fetch(e) {
    return this.#y({ ...e, cancelRefetch: e.cancelRefetch ?? true }).then(() => (this.updateResult(), this.#n));
  }
  #y(e) {
    this.#v();
    let t = this.#s.fetch(this.options, e);
    return e?.throwOnError || (t = t.catch(noop$7)), t;
  }
  #Q() {
    this.#R(), resolveStaleTime(this.options.staleTime, this.#s);
  }
  #O() {
    return ("function" == typeof this.options.refetchInterval ? this.options.refetchInterval(this.#s) : this.options.refetchInterval) ?? false;
  }
  #g(e) {
    this.#b(), this.#p = e;
  }
  #m() {
    this.#Q(), this.#g(this.#O());
  }
  #R() {
    this.#l && (clearTimeout(this.#l), this.#l = void 0);
  }
  #b() {
    this.#d && (clearInterval(this.#d), this.#d = void 0);
  }
  createResult(e, s) {
    const i = this.#s, n = this.options, u = this.#n, c = this.#a, h = this.#o, l = e !== i ? e.state : this.#i, { state: d } = e;
    let p, f2 = { ...d }, y2 = false;
    if (s._optimisticResults) {
      const t = this.hasListeners(), r = !t && shouldFetchOnMount(e, s), o = t && shouldFetchOptionally(e, i, s, n);
      (r || o) && (f2 = { ...f2, ...fetchState(d.data, e.options) }), "isRestoring" === s._optimisticResults && (f2.fetchStatus = "idle");
    }
    let { error: m2, errorUpdatedAt: R, status: b } = f2;
    p = f2.data;
    let v = false;
    if (void 0 !== s.placeholderData && void 0 === p && "pending" === b) {
      let e2;
      u?.isPlaceholderData && s.placeholderData === h?.placeholderData ? (e2 = u.data, v = true) : e2 = "function" == typeof s.placeholderData ? s.placeholderData(this.#h?.state.data, this.#h) : s.placeholderData, void 0 !== e2 && (b = "success", p = replaceData(u?.data, e2, s), y2 = true);
    }
    if (s.select && void 0 !== p && !v) if (u && p === c?.data && s.select === this.#u) p = this.#c;
    else try {
      this.#u = s.select, p = s.select(p), p = replaceData(u?.data, p, s), this.#c = p, this.#t = null;
    } catch (e2) {
      this.#t = e2;
    }
    this.#t && (m2 = this.#t, p = this.#c, R = Date.now(), b = "error");
    const Q = "fetching" === f2.fetchStatus, O = "pending" === b, g = "error" === b, I = O && Q, S = void 0 !== p, x = { status: b, fetchStatus: f2.fetchStatus, isPending: O, isSuccess: "success" === b, isError: g, isInitialLoading: I, isLoading: I, data: p, dataUpdatedAt: f2.dataUpdatedAt, error: m2, errorUpdatedAt: R, failureCount: f2.fetchFailureCount, failureReason: f2.fetchFailureReason, errorUpdateCount: f2.errorUpdateCount, isFetched: f2.dataUpdateCount > 0 || f2.errorUpdateCount > 0, isFetchedAfterMount: f2.dataUpdateCount > l.dataUpdateCount || f2.errorUpdateCount > l.errorUpdateCount, isFetching: Q, isRefetching: Q && !O, isLoadingError: g && !S, isPaused: "paused" === f2.fetchStatus, isPlaceholderData: y2, isRefetchError: g && S, isStale: isStale(e, s), refetch: this.refetch, promise: this.#r, isEnabled: false !== resolveEnabled(s.enabled, e) };
    if (this.options.experimental_prefetchInRender) {
      const finalizeThenableIfPossible = (e2) => {
        "error" === x.status ? e2.reject(x.error) : void 0 !== x.data && e2.resolve(x.data);
      }, recreateThenable = () => {
        const e2 = this.#r = x.promise = pendingThenable();
        finalizeThenableIfPossible(e2);
      }, r = this.#r;
      switch (r.status) {
        case "pending":
          e.queryHash === i.queryHash && finalizeThenableIfPossible(r);
          break;
        case "fulfilled":
          "error" !== x.status && x.data === r.value || recreateThenable();
          break;
        case "rejected":
          "error" === x.status && x.error === r.reason || recreateThenable();
      }
    }
    return x;
  }
  updateResult() {
    const e = this.#n, t = this.createResult(this.#s, this.options);
    if (this.#a = this.#s.state, this.#o = this.options, void 0 !== this.#a.data && (this.#h = this.#s), shallowEqualObjects(t, e)) return;
    this.#n = t;
    this.#I({ listeners: (() => {
      if (!e) return true;
      const { notifyOnChangeProps: t2 } = this.options, r = "function" == typeof t2 ? t2() : t2;
      if ("all" === r || !r && !this.#f.size) return true;
      const s = new Set(r ?? this.#f);
      return this.options.throwOnError && s.add("error"), Object.keys(this.#n).some((t3) => {
        const r2 = t3;
        return this.#n[r2] !== e[r2] && s.has(r2);
      });
    })() });
  }
  #v() {
    const e = this.#e.getQueryCache().build(this.#e, this.options);
    if (e === this.#s) return;
    const t = this.#s;
    this.#s = e, this.#i = e.state, this.hasListeners() && (t?.removeObserver(this), e.addObserver(this));
  }
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && this.#m();
  }
  #I(e) {
    Bt.batch(() => {
      e.listeners && this.listeners.forEach((e2) => {
        e2(this.#n);
      }), this.#e.getQueryCache().notify({ query: this.#s, type: "observerResultsUpdated" });
    });
  }
};
function shouldFetchOnMount(e, t) {
  return function(e2, t2) {
    return false !== resolveEnabled(t2.enabled, e2) && void 0 === e2.state.data && !("error" === e2.state.status && false === t2.retryOnMount);
  }(e, t) || void 0 !== e.state.data && shouldFetchOn(e, t, t.refetchOnMount);
}
function shouldFetchOn(e, t, s) {
  if (false !== resolveEnabled(t.enabled, e) && "static" !== resolveStaleTime(t.staleTime, e)) {
    const r = "function" == typeof s ? s(e) : s;
    return "always" === r || false !== r && isStale(e, t);
  }
  return false;
}
function shouldFetchOptionally(e, t, s, i) {
  return (e !== t || false === resolveEnabled(i.enabled, e)) && (!s.suspense || "error" !== e.state.status) && isStale(e, s);
}
function isStale(e, t) {
  return false !== resolveEnabled(t.enabled, e) && e.isStaleByTime(resolveStaleTime(t.staleTime, e));
}
var y = Ge.createContext(false);
y.Provider;
var m = Ge.createContext(/* @__PURE__ */ function() {
  let e = false;
  return { clearReset: () => {
    e = false;
  }, reset: () => {
    e = true;
  }, isReset: () => e };
}()), defaultThrowOnError = (e, t) => void 0 === t.state.data;
function useBaseQuery(e, t, r) {
  const s = Ge.useContext(y), i = Ge.useContext(m), a = useQueryClient(), o = a.defaultQueryOptions(e);
  a.getDefaultOptions().queries?._experimental_beforeQuery?.(o), o._optimisticResults = s ? "isRestoring" : "optimistic", ((e2) => {
    if (e2.suspense) {
      const clamp = (e3) => "static" === e3 ? e3 : Math.max(e3 ?? 1e3, 1e3), t2 = e2.staleTime;
      e2.staleTime = "function" == typeof t2 ? (...e3) => clamp(t2(...e3)) : clamp(t2), "number" == typeof e2.gcTime && (e2.gcTime = Math.max(e2.gcTime, 1e3));
    }
  })(o), ((e2, t2) => {
    (e2.suspense || e2.throwOnError || e2.experimental_prefetchInRender) && (t2.isReset() || (e2.retryOnMount = false));
  })(o, i), ((e2) => {
    Ge.useEffect(() => {
      e2.clearReset();
    }, [e2]);
  })(i), a.getQueryCache().get(o.queryHash);
  const [d] = Ge.useState(() => new t(a, o)), p = d.getOptimisticResult(o), f2 = !s && false !== e.subscribed;
  if (Ge.useSyncExternalStore(Ge.useCallback((e2) => {
    const t2 = f2 ? d.subscribe(Bt.batchCalls(e2)) : noop$7;
    return d.updateResult(), t2;
  }, [d, f2]), () => d.getCurrentResult(), () => d.getCurrentResult()), Ge.useEffect(() => {
    d.setOptions(o);
  }, [o, d]), ((e2, t2) => e2?.suspense && t2.isPending)(o, p)) throw ((e2, t2, r2) => t2.fetchOptimistic(e2).catch(() => {
    r2.clearReset();
  }))(o, d, i);
  if ((({ result: e2, errorResetBoundary: t2, throwOnError: r2, query: s2, suspense: i2 }) => e2.isError && !t2.isReset() && !e2.isFetching && s2 && (i2 && void 0 === e2.data || shouldThrowError(r2, [e2.error, s2])))({ result: p, errorResetBoundary: i, throwOnError: o.throwOnError, query: a.getQueryCache().get(o.queryHash), suspense: o.suspense })) throw p.error;
  return a.getDefaultOptions().queries?._experimental_afterQuery?.(o, p), o.experimental_prefetchInRender, o.notifyOnChangeProps ? p : d.trackResult(p);
}
function DeferredQuery() {
  const e = (t = queryOptions({ queryKey: ["deferred"], queryFn: async () => (await new Promise((e2) => setTimeout(e2, 3e3)), { message: "Hello deferred from the server!", status: "success", time: /* @__PURE__ */ new Date() }) }), useBaseQuery({ ...t, enabled: true, suspense: true, throwOnError: defaultThrowOnError, placeholderData: void 0 }, f));
  var t;
  return ke.jsxs("div", { children: [ke.jsx("h1", { children: "Deferred Query" }), ke.jsxs("div", { children: ["Status: ", e.data.status] }), ke.jsxs("div", { children: ["Message: ", e.data.message] }), ke.jsxs("div", { children: ["Time: ", e.data.time.toISOString()] })] });
}
const SplitComponent = function() {
  const [e, t] = Ge.useState(0);
  return ke.jsxs("div", { className: "p-2", children: [ke.jsx(Ge.Suspense, { fallback: "Loading Middleman...", children: ke.jsx(DeferredQuery, {}) }), ke.jsxs("div", { children: ["Count: ", e] }), ke.jsx("div", { children: ke.jsx("button", { onClick: () => t(e + 1), children: "Increment" }) })] });
};
export {
  SplitComponent as component
};
