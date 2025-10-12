import { EventEmitter } from "node:events";
import { Writable, Readable } from "node:stream";
import { Buffer } from "node:buffer";
import { setImmediate, clearImmediate } from "node:timers";
import { env as env$1 } from "cloudflare:workers";
import { Socket } from "node:net";
import h from "node:util";
import f from "node:crypto";
const hrtime$1 = /* @__PURE__ */ Object.assign(function hrtime(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, { bigint: function bigint() {
  return BigInt(Date.now() * 1e6);
} });
let ReadStream$1 = class ReadStream {
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};
let WriteStream$1 = class WriteStream {
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x2, y2, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};
// @__NO_SIDE_EFFECTS__
function createNotImplementedError$1(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented$1(name) {
  const fn2 = () => {
    throw /* @__PURE__ */ createNotImplementedError$1(name);
  };
  return Object.assign(fn2, { __unenv__: true });
}
// @__NO_SIDE_EFFECTS__
function notImplementedClass$1(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
const NODE_VERSION = "22.14.0";
let Process$1 = class Process extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream$1(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream$1(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream$1(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented$1("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented$1("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented$1("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented$1("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented$1("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented$1("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
const globalProcess = globalThis["process"];
const getBuiltinModule = globalProcess.getBuiltinModule;
const workerdProcess = getBuiltinModule("node:process");
const isWorkerdProcessV2 = globalThis.Cloudflare.compatibilityFlags.enable_nodejs_process_v2;
const unenvProcess = new Process$1({
  env: globalProcess.env,
  // `hrtime` is only available from workerd process v2
  hrtime: isWorkerdProcessV2 ? workerdProcess.hrtime : hrtime$1,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
const { exit, features, platform } = workerdProcess;
const {
  // Always implemented by workerd
  env,
  // Only implemented in workerd v2
  hrtime: hrtime2,
  // Always implemented by workerd
  nextTick
} = unenvProcess;
const {
  _channel,
  _disconnect,
  _events,
  _eventsCount,
  _handleQueue,
  _maxListeners,
  _pendingMessage,
  _send,
  assert,
  disconnect,
  mainModule
} = unenvProcess;
const {
  // @ts-expect-error `_debugEnd` is missing typings
  _debugEnd,
  // @ts-expect-error `_debugProcess` is missing typings
  _debugProcess,
  // @ts-expect-error `_exiting` is missing typings
  _exiting,
  // @ts-expect-error `_fatalException` is missing typings
  _fatalException,
  // @ts-expect-error `_getActiveHandles` is missing typings
  _getActiveHandles,
  // @ts-expect-error `_getActiveRequests` is missing typings
  _getActiveRequests,
  // @ts-expect-error `_kill` is missing typings
  _kill,
  // @ts-expect-error `_linkedBinding` is missing typings
  _linkedBinding,
  // @ts-expect-error `_preload_modules` is missing typings
  _preload_modules,
  // @ts-expect-error `_rawDebug` is missing typings
  _rawDebug,
  // @ts-expect-error `_startProfilerIdleNotifier` is missing typings
  _startProfilerIdleNotifier,
  // @ts-expect-error `_stopProfilerIdleNotifier` is missing typings
  _stopProfilerIdleNotifier,
  // @ts-expect-error `_tickCallback` is missing typings
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  availableMemory,
  // @ts-expect-error `binding` is missing typings
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  // @ts-expect-error `domain` is missing typings
  domain,
  emit,
  emitWarning,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  // @ts-expect-error `initgroups` is missing typings
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  memoryUsage,
  // @ts-expect-error `moduleLoadList` is missing typings
  moduleLoadList,
  off,
  on: on$1,
  once,
  // @ts-expect-error `openStdin` is missing typings
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  // @ts-expect-error `reallyExit` is missing typings
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send: send$1,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = isWorkerdProcessV2 ? workerdProcess : unenvProcess;
const _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime2,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on: on$1,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert,
  binding,
  send: send$1,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
globalThis.process = _process;
const noop = Object.assign(() => {
}, { __unenv__: true });
const _console = globalThis.console;
const _ignoreErrors = true;
const _stderr = new Writable();
const _stdout = new Writable();
const Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass$1("console.Console");
const _times = /* @__PURE__ */ new Map();
const _stdoutErrorHandler = noop;
const _stderrErrorHandler = noop;
const workerdConsole = globalThis["console"];
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
globalThis.console = workerdConsole;
const _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
const _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
const nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
class PerformanceEntry {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
}
const PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
class PerformanceMeasure extends PerformanceEntry {
  entryType = "measure";
}
class PerformanceResourceTiming extends PerformanceEntry {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
}
class PerformanceObserverEntryList {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
}
class Performance {
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError$1("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError$1("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError$1("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError$1("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
}
class PerformanceObserver {
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError$1("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError$1("PerformanceObserver.observe");
  }
  bind(fn2) {
    return fn2;
  }
  runInAsyncScope(fn2, thisArg, ...args) {
    return fn2.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
}
const performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
class WriteStream2 {
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(e) {
    this.fd = e;
  }
  clearLine(e, t) {
    return t && t(), false;
  }
  clearScreenDown(e) {
    return e && e(), false;
  }
  cursorTo(e, t, r2) {
    return r2 && "function" == typeof r2 && r2(), false;
  }
  moveCursor(e, t, r2) {
    return r2 && r2(), false;
  }
  getColorDepth(e) {
    return 1;
  }
  hasColors(e, t) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(e, t, r2) {
    e instanceof Uint8Array && (e = new TextDecoder().decode(e));
    try {
      console.log(e);
    } catch {
    }
    return r2 && "function" == typeof r2 && r2(), false;
  }
}
class ReadStream2 {
  fd;
  isRaw = false;
  isTTY = false;
  constructor(e) {
    this.fd = e;
  }
  setRawMode(e) {
    return this.isRaw = e, this;
  }
}
function createNotImplementedError(e) {
  return new Error(`[unenv] ${e} is not implemented yet!`);
}
function notImplemented(e) {
  return Object.assign(() => {
    throw createNotImplementedError(e);
  }, { __unenv__: true });
}
function notImplementedAsync(e) {
  const t = notImplemented(e);
  return t.__promisify__ = () => notImplemented(e + ".__promisify__"), t.native = t, t;
}
function notImplementedClass(e) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${e} is not implemented yet!`);
    }
  };
}
const m = "22.14.0";
class Process2 extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(e) {
    super(), this.env = e.env, this.hrtime = e.hrtime, this.nextTick = e.nextTick;
    for (const e2 of [...Object.getOwnPropertyNames(Process2.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const t = this[e2];
      "function" == typeof t && (this[e2] = t.bind(this));
    }
  }
  emitWarning(e, t, r2) {
    console.warn(`${r2 ? `[${r2}] ` : ""}${t ? `${t}: ` : ""}${e}`);
  }
  emit(...e) {
    return super.emit(...e);
  }
  listeners(e) {
    return super.listeners(e);
  }
  #e;
  #t;
  #r;
  get stdin() {
    return this.#e ??= new ReadStream2(0);
  }
  get stdout() {
    return this.#t ??= new WriteStream2(1);
  }
  get stderr() {
    return this.#r ??= new WriteStream2(2);
  }
  #n = "/";
  chdir(e) {
    this.#n = e;
  }
  cwd() {
    return this.#n;
  }
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${m}`;
  }
  get versions() {
    return { node: m };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  ref() {
  }
  unref() {
  }
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  permission = { has: notImplemented("process.permission.has") };
  report = { directory: "", filename: "", signal: "SIGUSR2", compact: false, reportOnFatalError: false, reportOnSignal: false, reportOnUncaughtException: false, getReport: notImplemented("process.report.getReport"), writeReport: notImplemented("process.report.writeReport") };
  finalization = { register: notImplemented("process.finalization.register"), unregister: notImplemented("process.finalization.unregister"), registerBeforeExit: notImplemented("process.finalization.registerBeforeExit") };
  memoryUsage = Object.assign(() => ({ arrayBuffers: 0, rss: 0, external: 0, heapTotal: 0, heapUsed: 0 }), { rss: () => 0 });
  mainModule = void 0;
  domain = void 0;
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
}
const g = /* @__PURE__ */ Object.create(null), _ = globalThis.process, _getEnv = (e) => globalThis.__env__ || _?.env || (e ? g : globalThis), E = new Proxy(g, { get: (e, t) => _getEnv()[t] ?? g[t], has: (e, t) => t in _getEnv() || t in g, set: (e, t, r2) => (_getEnv(true)[t] = r2, true), deleteProperty: (e, t) => (delete _getEnv(true)[t], true), ownKeys() {
  const e = _getEnv();
  return Object.keys(e);
}, getOwnPropertyDescriptor(e, t) {
  const r2 = _getEnv();
  if (t in r2) return { value: r2[t], writable: true, enumerable: true, configurable: true };
} }), C = Object.assign(function(e) {
  const t = Date.now(), r2 = Math.trunc(t / 1e3), s = t % 1e3 * 1e6;
  if (e) {
    let t2 = r2 - e[0], a = s - e[0];
    return a < 0 && (t2 -= 1, a = 1e9 + a), [t2, a];
  }
  return [r2, s];
}, { bigint: function() {
  return BigInt(1e6 * Date.now());
} });
globalThis.__env__ = env$1;
const S = new Process2({ env: E, hrtime: C, nextTick: _process.nextTick });
for (const e of ["exit", "getBuiltinModule", "platform"]) e in _process && (S[e] = _process[e]);
_process.features && Object.defineProperty(S, "features", { get: () => _process.features });
const { abort: R, addListener: x, allowedNodeEnvironmentFlags: H, hasUncaughtExceptionCaptureCallback: P, setUncaughtExceptionCaptureCallback: I, loadEnvFile: T, sourceMapsEnabled: M, arch: O, argv: j, argv0: N, chdir: D, config: q, connected: U, constrainedMemory: B, availableMemory: K, cpuUsage: $, cwd: L, debugPort: F, dlopen: z, disconnect: W, emit: V, emitWarning: Q, env: G, eventNames: J, execArgv: Y, execPath: X, exit: Z, finalization: ee, features: te, getBuiltinModule: re, getActiveResourcesInfo: ne, getMaxListeners: oe, hrtime: se, kill: ae, listeners: ie, listenerCount: ce, memoryUsage: le, nextTick: de, on: ue, off: he, once: pe, pid: fe, platform: ye, ppid: me, prependListener: ge, prependOnceListener: we, rawListeners: be, release: ve, removeAllListeners: _e, removeListener: Ee, report: Ce, resourceUsage: Se, setMaxListeners: Re, setSourceMapsEnabled: ke, stderr: xe, stdin: He, stdout: Ae, title: Pe, umask: Ie, uptime: Te, version: Me, versions: Oe, domain: je, initgroups: Ne, moduleLoadList: De, reallyExit: qe, openStdin: Ue, assert: Be, binding: Ke, send: $e, exitCode: Le, channel: Fe, getegid: ze, geteuid: We, getgid: Ve, getgroups: Qe, getuid: Ge, setegid: Je, seteuid: Ye, setgid: Xe, setgroups: Ze, setuid: et, permission: tt, mainModule: rt, _events: nt, _eventsCount: ot, _exiting: st, _maxListeners: at, _debugEnd: it, _debugProcess: ct, _fatalException: lt, _getActiveHandles: dt, _getActiveRequests: ut, _kill: ht, _preload_modules: pt, _rawDebug: ft, _startProfilerIdleNotifier: yt, _stopProfilerIdleNotifier: mt, _tickCallback: gt, _disconnect: wt, _handleQueue: bt, _pendingMessage: vt, _channel: _t, _send: Et, _linkedBinding: Ct } = S, St = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Rt = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, kt = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(e, t) {
  if (!("__proto__" === e || "constructor" === e && t && "object" == typeof t && "prototype" in t)) return t;
  !function(e2) {
    console.warn(`[destr] Dropping "${e2}" key to prevent prototype pollution.`);
  }(e);
}
function destr(e, t = {}) {
  if ("string" != typeof e) return e;
  if ('"' === e[0] && '"' === e[e.length - 1] && -1 === e.indexOf("\\")) return e.slice(1, -1);
  const r2 = e.trim();
  if (r2.length <= 9) switch (r2.toLowerCase()) {
    case "true":
      return true;
    case "false":
      return false;
    case "undefined":
      return;
    case "null":
      return null;
    case "nan":
      return Number.NaN;
    case "infinity":
      return Number.POSITIVE_INFINITY;
    case "-infinity":
      return Number.NEGATIVE_INFINITY;
  }
  if (!kt.test(e)) {
    if (t.strict) throw new SyntaxError("[destr] Invalid JSON");
    return e;
  }
  try {
    if (St.test(e) || Rt.test(e)) {
      if (t.strict) throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(e, jsonParseTransform);
    }
    return JSON.parse(e);
  } catch (r3) {
    if (t.strict) throw r3;
    return e;
  }
}
const xt = /#/g, Ht = /&/g, At = /\//g, Pt = /=/g, It = /\+/g, Tt = /%5e/gi, Mt = /%60/gi, Ot = /%7c/gi, jt = /%20/gi;
function encodeQueryValue(e) {
  return (t = "string" == typeof e ? e : JSON.stringify(e), encodeURI("" + t).replace(Ot, "|")).replace(It, "%2B").replace(jt, "+").replace(xt, "%23").replace(Ht, "%26").replace(Mt, "`").replace(Tt, "^").replace(At, "%2F");
  var t;
}
function encodeQueryKey(e) {
  return encodeQueryValue(e).replace(Pt, "%3D");
}
function decode(e = "") {
  try {
    return decodeURIComponent("" + e);
  } catch {
    return "" + e;
  }
}
function decodeQueryKey(e) {
  return decode(e.replace(It, " "));
}
function decodeQueryValue(e) {
  return decode(e.replace(It, " "));
}
function parseQuery(e = "") {
  const t = /* @__PURE__ */ Object.create(null);
  "?" === e[0] && (e = e.slice(1));
  for (const r2 of e.split("&")) {
    const e2 = r2.match(/([^=]+)=?(.*)/) || [];
    if (e2.length < 2) continue;
    const s = decodeQueryKey(e2[1]);
    if ("__proto__" === s || "constructor" === s) continue;
    const a = decodeQueryValue(e2[2] || "");
    void 0 === t[s] ? t[s] = a : Array.isArray(t[s]) ? t[s].push(a) : t[s] = [t[s], a];
  }
  return t;
}
function stringifyQuery(e) {
  return Object.keys(e).filter((t) => void 0 !== e[t]).map((t) => {
    return r2 = t, "number" != typeof (s = e[t]) && "boolean" != typeof s || (s = String(s)), s ? Array.isArray(s) ? s.map((e2) => `${encodeQueryKey(r2)}=${encodeQueryValue(e2)}`).join("&") : `${encodeQueryKey(r2)}=${encodeQueryValue(s)}` : encodeQueryKey(r2);
    var r2, s;
  }).filter(Boolean).join("&");
}
const Nt = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, Dt = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, qt = /^([/\\]\s*){2,}[^/\\]/, Ut = /^\.?\//;
function hasProtocol(e, t = {}) {
  return "boolean" == typeof t && (t = { acceptRelative: t }), t.strict ? Nt.test(e) : Dt.test(e) || !!t.acceptRelative && qt.test(e);
}
function withoutTrailingSlash(e = "", t) {
  return (function(e2 = "") {
    return e2.endsWith("/");
  }(e) ? e.slice(0, -1) : e) || "/";
}
function withTrailingSlash(e = "", t) {
  return e.endsWith("/") ? e : e + "/";
}
function withoutBase(e, t) {
  if (isEmptyURL(t)) return e;
  const r2 = withoutTrailingSlash(t);
  if (!e.startsWith(r2)) return e;
  const s = e.slice(r2.length);
  return "/" === s[0] ? s : "/" + s;
}
function withQuery(e, t) {
  const r2 = parseURL(e), s = { ...parseQuery(r2.search), ...t };
  return r2.search = stringifyQuery(s), function(e2) {
    const t2 = e2.pathname || "", r3 = e2.search ? (e2.search.startsWith("?") ? "" : "?") + e2.search : "", s2 = e2.hash || "", a = e2.auth ? e2.auth + "@" : "", c2 = e2.host || "", d = e2.protocol || e2[Bt] ? (e2.protocol || "") + "//" : "";
    return d + a + c2 + t2 + r3 + s2;
  }(r2);
}
function getQuery(e) {
  return parseQuery(parseURL(e).search);
}
function isEmptyURL(e) {
  return !e || "/" === e;
}
function joinURL(e, ...t) {
  let r2 = e || "";
  for (const e2 of t.filter((e3) => /* @__PURE__ */ function(e4) {
    return e4 && "/" !== e4;
  }(e3))) if (r2) {
    const t2 = e2.replace(Ut, "");
    r2 = withTrailingSlash(r2) + t2;
  } else r2 = e2;
  return r2;
}
const Bt = Symbol.for("ufo:protocolRelative");
function parseURL(e = "", t) {
  const r2 = e.match(/^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i);
  if (r2) {
    const [, e2, t2 = ""] = r2;
    return { protocol: e2.toLowerCase(), pathname: t2, href: e2 + t2, auth: "", host: "", search: "", hash: "" };
  }
  if (!hasProtocol(e, { acceptRelative: true })) return parsePath(e);
  const [, s = "", a, c2 = ""] = e.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, d = "", u = ""] = c2.match(/([^#/?]*)(.*)?/) || [];
  "file:" === s && (u = u.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: h2, search: f2, hash: m2 } = parsePath(u);
  return { protocol: s.toLowerCase(), auth: a ? a.slice(0, Math.max(0, a.length - 1)) : "", host: d, pathname: h2, search: f2, hash: m2, [Bt]: !s };
}
function parsePath(e = "") {
  const [t = "", r2 = "", s = ""] = (e.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return { pathname: t, search: r2, hash: s };
}
const Kt = 0, $t = 1, Lt = 2;
function createRouter$1(e = {}) {
  const t = { options: e, rootNode: createRadixNode(), staticRoutesMap: {} }, normalizeTrailingSlash = (t2) => e.strictTrailingSlash ? t2 : t2.replace(/\/$/, "") || "/";
  if (e.routes) for (const r2 in e.routes) insert(t, normalizeTrailingSlash(r2), e.routes[r2]);
  return { ctx: t, lookup: (e2) => function(e3, t2) {
    const r2 = e3.staticRoutesMap[t2];
    if (r2) return r2.data;
    const s = t2.split("/"), a = {};
    let c2 = false, d = null, u = e3.rootNode, h2 = null;
    for (let e4 = 0; e4 < s.length; e4++) {
      const t3 = s[e4];
      null !== u.wildcardChildNode && (d = u.wildcardChildNode, h2 = s.slice(e4).join("/"));
      const r3 = u.children.get(t3);
      if (void 0 === r3) {
        if (u && u.placeholderChildren.length > 1) {
          const t4 = s.length - e4;
          u = u.placeholderChildren.find((e5) => e5.maxDepth === t4) || null;
        } else u = u.placeholderChildren[0] || null;
        if (!u) break;
        u.paramName && (a[u.paramName] = t3), c2 = true;
      } else u = r3;
    }
    null !== u && null !== u.data || null === d || (u = d, a[u.paramName || "_"] = h2, c2 = true);
    if (!u) return null;
    if (c2) return { ...u.data, params: c2 ? a : void 0 };
    return u.data;
  }(t, normalizeTrailingSlash(e2)), insert: (e2, r2) => insert(t, normalizeTrailingSlash(e2), r2), remove: (e2) => function(e3, t2) {
    let r2 = false;
    const s = t2.split("/");
    let a = e3.rootNode;
    for (const e4 of s) if (a = a.children.get(e4), !a) return r2;
    if (a.data) {
      const e4 = s.at(-1) || "";
      a.data = null, 0 === Object.keys(a.children).length && a.parent && (a.parent.children.delete(e4), a.parent.wildcardChildNode = null, a.parent.placeholderChildren = []), r2 = true;
    }
    return r2;
  }(t, normalizeTrailingSlash(e2)) };
}
function insert(e, t, r2) {
  let s = true;
  const a = t.split("/");
  let c2 = e.rootNode, d = 0;
  const u = [c2];
  for (const e2 of a) {
    let t2;
    if (t2 = c2.children.get(e2)) c2 = t2;
    else {
      const r3 = getNodeType(e2);
      t2 = createRadixNode({ type: r3, parent: c2 }), c2.children.set(e2, t2), r3 === Lt ? (t2.paramName = "*" === e2 ? "_" + d++ : e2.slice(1), c2.placeholderChildren.push(t2), s = false) : r3 === $t && (c2.wildcardChildNode = t2, t2.paramName = e2.slice(3) || "_", s = false), u.push(t2), c2 = t2;
    }
  }
  for (const [e2, t2] of u.entries()) t2.maxDepth = Math.max(u.length - e2, t2.maxDepth || 0);
  return c2.data = r2, true === s && (e.staticRoutesMap[t] = c2), c2;
}
function createRadixNode(e = {}) {
  return { type: e.type || Kt, maxDepth: 0, parent: e.parent || null, children: /* @__PURE__ */ new Map(), data: e.data || null, paramName: e.paramName || null, wildcardChildNode: null, placeholderChildren: [] };
}
function getNodeType(e) {
  return e.startsWith("**") ? $t : ":" === e[0] || "*" === e ? Lt : Kt;
}
function toRouteMatcher(e) {
  return /* @__PURE__ */ function(e2, t) {
    return { ctx: { table: e2 }, matchAll: (r2) => _matchRoutes(r2, e2, t) };
  }(_routerNodeToTable("", e.ctx.rootNode), e.ctx.options.strictTrailingSlash);
}
function _matchRoutes(e, t, r2) {
  true !== r2 && e.endsWith("/") && (e = e.slice(0, -1) || "/");
  const s = [];
  for (const [r3, a2] of _sortRoutesMap(t.wildcard)) (e === r3 || e.startsWith(r3 + "/")) && s.push(a2);
  for (const [r3, a2] of _sortRoutesMap(t.dynamic)) if (e.startsWith(r3 + "/")) {
    const t2 = "/" + e.slice(r3.length).split("/").splice(2).join("/");
    s.push(..._matchRoutes(t2, a2));
  }
  const a = t.static.get(e);
  return a && s.push(a), s.filter(Boolean);
}
function _sortRoutesMap(e) {
  return [...e.entries()].sort((e2, t) => e2[0].length - t[0].length);
}
function _routerNodeToTable(e, t) {
  const r2 = { static: /* @__PURE__ */ new Map(), wildcard: /* @__PURE__ */ new Map(), dynamic: /* @__PURE__ */ new Map() };
  return function _addNode(e2, t2) {
    if (e2) if (t2.type !== Kt || e2.includes("*") || e2.includes(":")) {
      if (t2.type === $t) r2.wildcard.set(e2.replace("/**", ""), t2.data);
      else if (t2.type === Lt) {
        const s = _routerNodeToTable("", t2);
        return t2.data && s.static.set("/", t2.data), void r2.dynamic.set(e2.replace(/\/\*|\/:\w+/, ""), s);
      }
    } else t2.data && r2.static.set(e2, t2.data);
    for (const [r3, s] of t2.children.entries()) _addNode(`${e2}/${r3}`.replace("//", "/"), s);
  }(e, t), r2;
}
function isPlainObject(e) {
  if (null === e || "object" != typeof e) return false;
  const t = Object.getPrototypeOf(e);
  return (null === t || t === Object.prototype || null === Object.getPrototypeOf(t)) && (!(Symbol.iterator in e) && (!(Symbol.toStringTag in e) || "[object Module]" === Object.prototype.toString.call(e)));
}
function _defu(e, t, r2 = ".", s) {
  if (!isPlainObject(t)) return _defu(e, {}, r2, s);
  const a = Object.assign({}, t);
  for (const t2 in e) {
    if ("__proto__" === t2 || "constructor" === t2) continue;
    const c2 = e[t2];
    null != c2 && (s && s(a, t2, c2, r2) || (Array.isArray(c2) && Array.isArray(a[t2]) ? a[t2] = [...c2, ...a[t2]] : isPlainObject(c2) && isPlainObject(a[t2]) ? a[t2] = _defu(c2, a[t2], (r2 ? `${r2}.` : "") + t2.toString(), s) : a[t2] = c2));
  }
  return a;
}
function createDefu(e) {
  return (...t) => t.reduce((t2, r2) => _defu(t2, r2, "", e), {});
}
const Ft = createDefu(), zt = createDefu((e, t, r2) => {
  if (void 0 !== e[t] && "function" == typeof r2) return e[t] = r2(e[t]), true;
});
function o(e) {
  throw new Error(`${e} is not implemented yet!`);
}
class i extends EventEmitter {
  __unenv__ = {};
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(e, t) {
    return new i(t);
  }
  constructor(e) {
    super();
  }
  _read(e) {
  }
  read(e) {
  }
  setEncoding(e) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(e) {
    return this;
  }
  unshift(e, t) {
  }
  wrap(e) {
    return this;
  }
  push(e, t) {
    return false;
  }
  _destroy(e, t) {
    this.removeAllListeners();
  }
  destroy(e) {
    return this.destroyed = true, this._destroy(e), this;
  }
  pipe(e, t) {
    return {};
  }
  compose(e, t) {
    throw new Error("Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    return this.destroy(), Promise.resolve();
  }
  async *[Symbol.asyncIterator]() {
    throw o("Readable.asyncIterator");
  }
  iterator(e) {
    throw o("Readable.iterator");
  }
  map(e, t) {
    throw o("Readable.map");
  }
  filter(e, t) {
    throw o("Readable.filter");
  }
  forEach(e, t) {
    throw o("Readable.forEach");
  }
  reduce(e, t, r2) {
    throw o("Readable.reduce");
  }
  find(e, t) {
    throw o("Readable.find");
  }
  findIndex(e, t) {
    throw o("Readable.findIndex");
  }
  some(e, t) {
    throw o("Readable.some");
  }
  toArray(e) {
    throw o("Readable.toArray");
  }
  every(e, t) {
    throw o("Readable.every");
  }
  flatMap(e, t) {
    throw o("Readable.flatMap");
  }
  drop(e, t) {
    throw o("Readable.drop");
  }
  take(e, t) {
    throw o("Readable.take");
  }
  asIndexedPairs(e) {
    throw o("Readable.asIndexedPairs");
  }
}
let Wt = class extends EventEmitter {
  __unenv__ = {};
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  writableAborted = false;
  destroyed = false;
  _data;
  _encoding = "utf8";
  constructor(e) {
    super();
  }
  pipe(e, t) {
    return {};
  }
  _write(t, r2, s) {
    if (this.writableEnded) s && s();
    else {
      if (void 0 === this._data) this._data = t;
      else {
        const s2 = "string" == typeof this._data ? Buffer.from(this._data, this._encoding || r2 || "utf8") : this._data, a = "string" == typeof t ? Buffer.from(t, r2 || this._encoding || "utf8") : t;
        this._data = Buffer.concat([s2, a]);
      }
      this._encoding = r2, s && s();
    }
  }
  _writev(e, t) {
  }
  _destroy(e, t) {
  }
  _final(e) {
  }
  write(e, t, r2) {
    const s = "string" == typeof t ? this._encoding : "utf8", a = "function" == typeof t ? t : "function" == typeof r2 ? r2 : void 0;
    return this._write(e, s, a), true;
  }
  setDefaultEncoding(e) {
    return this;
  }
  end(e, t, r2) {
    const s = "function" == typeof e ? e : "function" == typeof t ? t : "function" == typeof r2 ? r2 : void 0;
    if (this.writableEnded) return s && s(), this;
    const a = e === s ? void 0 : e;
    if (a) {
      const e2 = t === s ? void 0 : t;
      this.write(a, e2, s);
    }
    return this.writableEnded = true, this.writableFinished = true, this.emit("close"), this.emit("finish"), this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(e) {
    return this.destroyed = true, delete this._data, this.removeAllListeners(), this;
  }
  compose(e, t) {
    throw new Error("Method not implemented.");
  }
};
const Vt = class {
  allowHalfOpen = true;
  _destroy;
  constructor(e = new i(), t = new Wt()) {
    Object.assign(this, e), Object.assign(this, t), this._destroy = /* @__PURE__ */ function(...e2) {
      return function(...t2) {
        for (const r2 of e2) r2(...t2);
      };
    }(e._destroy, t._destroy);
  }
};
const Qt = (Object.assign(Vt.prototype, i.prototype), Object.assign(Vt.prototype, Wt.prototype), Vt);
class A extends Qt {
  __unenv__ = {};
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(e) {
    super();
  }
  write(e, t, r2) {
    return false;
  }
  connect(e, t, r2) {
    return this;
  }
  end(e, t, r2) {
    return this;
  }
  setEncoding(e) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(e, t) {
    return this;
  }
  setNoDelay(e) {
    return this;
  }
  setKeepAlive(e, t) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const e = new Error("ERR_SOCKET_CLOSED");
    return e.code = "ERR_SOCKET_CLOSED", this.destroy(e), this;
  }
}
class y extends i {
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(e) {
    super(), this.socket = this.connection = e || new A();
  }
  get rawHeaders() {
    const e = this.headers, t = [];
    for (const r2 in e) if (Array.isArray(e[r2])) for (const s of e[r2]) t.push(r2, s);
    else t.push(r2, e[r2]);
    return t;
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(e, t) {
    return this;
  }
  get headersDistinct() {
    return p(this.headers);
  }
  get trailersDistinct() {
    return p(this.trailers);
  }
}
function p(e) {
  const t = {};
  for (const [r2, s] of Object.entries(e)) r2 && (t[r2] = (Array.isArray(s) ? s : [s]).filter(Boolean));
  return t;
}
class w extends Wt {
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(e) {
    super(), this.req = e;
  }
  assignSocket(e) {
    e._httpMessage = this, this.socket = e, this.connection = e, this.emit("socket", e), this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(e) {
  }
  writeContinue(e) {
  }
  writeHead(e, t, r2) {
    e && (this.statusCode = e), "string" == typeof t && (this.statusMessage = t, t = void 0);
    const s = r2 || t;
    if (s && !Array.isArray(s)) for (const e2 in s) this.setHeader(e2, s[e2]);
    return this.headersSent = true, this;
  }
  writeProcessing() {
  }
  setTimeout(e, t) {
    return this;
  }
  appendHeader(e, t) {
    e = e.toLowerCase();
    const r2 = this._headers[e], s = [...Array.isArray(r2) ? r2 : [r2], ...Array.isArray(t) ? t : [t]].filter(Boolean);
    return this._headers[e] = s.length > 1 ? s : s[0], this;
  }
  setHeader(e, t) {
    return this._headers[e.toLowerCase()] = t, this;
  }
  setHeaders(e) {
    for (const [t, r2] of Object.entries(e)) this.setHeader(t, r2);
    return this;
  }
  getHeader(e) {
    return this._headers[e.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(e) {
    return e.toLowerCase() in this._headers;
  }
  removeHeader(e) {
    delete this._headers[e.toLowerCase()];
  }
  addTrailers(e) {
  }
  flushHeaders() {
  }
  writeEarlyHints(e, t) {
    "function" == typeof t && t();
  }
}
const Gt = (() => {
  const n2 = function() {
  };
  return n2.prototype = /* @__PURE__ */ Object.create(null), n2;
})();
function v(e = {}) {
  if (e instanceof Headers) return e;
  const t = new Headers();
  for (const [r2, s] of Object.entries(e)) if (void 0 !== s) {
    if (Array.isArray(s)) {
      for (const e2 of s) t.append(r2, String(e2));
      continue;
    }
    t.set(r2, String(s));
  }
  return t;
}
const Jt = /* @__PURE__ */ new Set([101, 204, 205, 304]);
async function b(e, t) {
  const r2 = new y(), s = new w(r2);
  let a;
  if (r2.url = t.url?.toString() || "/", !r2.url.startsWith("/")) {
    const e2 = new URL(r2.url);
    a = e2.host, r2.url = e2.pathname + e2.search + e2.hash;
  }
  r2.method = t.method || "GET", r2.headers = function(e2 = {}) {
    const t2 = new Gt(), r3 = Array.isArray(e2) || function(e3) {
      return "function" == typeof e3?.entries;
    }(e2) ? e2 : Object.entries(e2);
    for (const [e3, s2] of r3) if (s2) {
      if (void 0 === t2[e3]) {
        t2[e3] = s2;
        continue;
      }
      t2[e3] = [...Array.isArray(t2[e3]) ? t2[e3] : [t2[e3]], ...Array.isArray(s2) ? s2 : [s2]];
    }
    return t2;
  }(t.headers || {}), r2.headers.host || (r2.headers.host = t.host || a || "localhost"), r2.connection.encrypted = r2.connection.encrypted || "https" === t.protocol, r2.body = t.body || null, r2.__unenv__ = t.context, await e(r2, s);
  let c2 = s._data;
  (Jt.has(s.statusCode) || "HEAD" === r2.method.toUpperCase()) && (c2 = null, delete s._headers["content-length"]);
  const d = { status: s.statusCode, statusText: s.statusMessage, headers: s._headers, body: c2 };
  return r2.destroy(), s.destroy(), d;
}
function hasProp(e, t) {
  try {
    return t in e;
  } catch {
    return false;
  }
}
class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(e, t = {}) {
    super(e, t), t.cause && !this.cause && (this.cause = t.cause);
  }
  toJSON() {
    const e = { message: this.message, statusCode: sanitizeStatusCode(this.statusCode, 500) };
    return this.statusMessage && (e.statusMessage = sanitizeStatusMessage(this.statusMessage)), void 0 !== this.data && (e.data = this.data), e;
  }
}
function createError(e) {
  if ("string" == typeof e) return new H3Error(e);
  if (isError$1(e)) return e;
  const t = new H3Error(e.message ?? e.statusMessage ?? "", { cause: e.cause || e });
  if (hasProp(e, "stack")) try {
    Object.defineProperty(t, "stack", { get: () => e.stack });
  } catch {
    try {
      t.stack = e.stack;
    } catch {
    }
  }
  if (e.data && (t.data = e.data), e.statusCode ? t.statusCode = sanitizeStatusCode(e.statusCode, t.statusCode) : e.status && (t.statusCode = sanitizeStatusCode(e.status, t.statusCode)), e.statusMessage ? t.statusMessage = e.statusMessage : e.statusText && (t.statusMessage = e.statusText), t.statusMessage) {
    const e2 = t.statusMessage;
    sanitizeStatusMessage(t.statusMessage) !== e2 && console.warn("[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default.");
  }
  return void 0 !== e.fatal && (t.fatal = e.fatal), void 0 !== e.unhandled && (t.unhandled = e.unhandled), t;
}
function isError$1(e) {
  return true === e?.constructor?.__h3_error__;
}
const Yt = Symbol.for("h3RawBody"), Xt = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(t, r2 = "utf8") {
  !function(e, t2) {
    if (!function(e2, t3) {
      if ("string" == typeof t3) {
        if (e2.method === t3) return true;
      } else if (t3.includes(e2.method)) return true;
      return false;
    }(e, t2)) throw createError({ statusCode: 405, statusMessage: "HTTP method is not allowed." });
  }(t, Xt);
  const s = t._requestBody || t.web?.request?.body || t.node.req[Yt] || t.node.req.rawBody || t.node.req.body;
  if (s) {
    const t2 = Promise.resolve(s).then((t3) => Buffer.isBuffer(t3) ? t3 : "function" == typeof t3.pipeTo ? new Promise((r3, s2) => {
      const a2 = [];
      t3.pipeTo(new WritableStream({ write(e) {
        a2.push(e);
      }, close() {
        r3(Buffer.concat(a2));
      }, abort(e) {
        s2(e);
      } })).catch(s2);
    }) : "function" == typeof t3.pipe ? new Promise((r3, s2) => {
      const a2 = [];
      t3.on("data", (e) => {
        a2.push(e);
      }).on("end", () => {
        r3(Buffer.concat(a2));
      }).on("error", s2);
    }) : t3.constructor === Object ? Buffer.from(JSON.stringify(t3)) : t3 instanceof URLSearchParams ? Buffer.from(t3.toString()) : t3 instanceof FormData ? new Response(t3).bytes().then((t4) => Buffer.from(t4)) : Buffer.from(t3));
    return r2 ? t2.then((e) => e.toString(r2)) : t2;
  }
  if (!Number.parseInt(t.node.req.headers["content-length"] || "") && !String(t.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) return Promise.resolve(void 0);
  const a = t.node.req[Yt] = new Promise((r3, s2) => {
    const a2 = [];
    t.node.req.on("error", (e) => {
      s2(e);
    }).on("data", (e) => {
      a2.push(e);
    }).on("end", () => {
      r3(Buffer.concat(a2));
    });
  });
  return r2 ? a.then((e) => e.toString(r2)) : a;
}
function handleCacheHeaders(e, t) {
  const r2 = ["public", ...t.cacheControls || []];
  let s = false;
  if (void 0 !== t.maxAge && r2.push("max-age=" + +t.maxAge, "s-maxage=" + +t.maxAge), t.modifiedTime) {
    const r3 = new Date(t.modifiedTime), a = e.node.req.headers["if-modified-since"];
    e.node.res.setHeader("last-modified", r3.toUTCString()), a && new Date(a) >= r3 && (s = true);
  }
  if (t.etag) {
    e.node.res.setHeader("etag", t.etag);
    e.node.req.headers["if-none-match"] === t.etag && (s = true);
  }
  return e.node.res.setHeader("cache-control", r2.join(", ")), !!s && (e.node.res.statusCode = 304, e.handled || e.node.res.end(), true);
}
const Zt = { html: "text/html", json: "application/json" }, er = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(e = "") {
  return e.replace(er, "");
}
function sanitizeStatusCode(e, t = 200) {
  return e ? ("string" == typeof e && (e = Number.parseInt(e, 10)), e < 100 || e > 999 ? t : e) : t;
}
function splitCookiesString(e) {
  if (Array.isArray(e)) return e.flatMap((e2) => splitCookiesString(e2));
  if ("string" != typeof e) return [];
  const t = [];
  let r2, s, a, c2, d, u = 0;
  const skipWhitespace = () => {
    for (; u < e.length && /\s/.test(e.charAt(u)); ) u += 1;
    return u < e.length;
  }, notSpecialChar = () => (s = e.charAt(u), "=" !== s && ";" !== s && "," !== s);
  for (; u < e.length; ) {
    for (r2 = u, d = false; skipWhitespace(); ) if (s = e.charAt(u), "," === s) {
      for (a = u, u += 1, skipWhitespace(), c2 = u; u < e.length && notSpecialChar(); ) u += 1;
      u < e.length && "=" === e.charAt(u) ? (d = true, u = c2, t.push(e.slice(r2, a)), r2 = u) : u = a + 1;
    } else u += 1;
    (!d || u >= e.length) && t.push(e.slice(r2));
  }
  return t;
}
const tr = void 0 === setImmediate ? (e) => e() : setImmediate;
function send(e, t, r2) {
  return r2 && function(e2, t2) {
    t2 && 304 !== e2.node.res.statusCode && !e2.node.res.getHeader("content-type") && e2.node.res.setHeader("content-type", t2);
  }(e, r2), new Promise((r3) => {
    tr(() => {
      e.handled || e.node.res.end(t), r3();
    });
  });
}
function setResponseStatus(e, t, r2) {
  t && (e.node.res.statusCode = sanitizeStatusCode(t, e.node.res.statusCode)), r2 && (e.node.res.statusMessage = sanitizeStatusMessage(r2));
}
function setResponseHeaders(e, t) {
  for (const [r2, s] of Object.entries(t)) e.node.res.setHeader(r2, s);
}
const rr = setResponseHeaders;
function sendStream(e, t) {
  if (!t || "object" != typeof t) throw new Error("[h3] Invalid stream provided.");
  if (e.node.res._data = t, !e.node.res.socket) return e._handled = true, Promise.resolve();
  if (hasProp(t, "pipeTo") && "function" == typeof t.pipeTo) return t.pipeTo(new WritableStream({ write(t2) {
    e.node.res.write(t2);
  } })).then(() => {
    e.node.res.end();
  });
  if (hasProp(t, "pipe") && "function" == typeof t.pipe) return new Promise((r2, s) => {
    t.pipe(e.node.res), t.on && (t.on("end", () => {
      e.node.res.end(), r2();
    }), t.on("error", (e2) => {
      s(e2);
    })), e.node.res.on("close", () => {
      t.abort && t.abort();
    });
  });
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(e, t) {
  for (const [r2, s] of t.headers) "set-cookie" === r2 ? e.node.res.appendHeader(r2, splitCookiesString(s)) : e.node.res.setHeader(r2, s);
  if (t.status && (e.node.res.statusCode = sanitizeStatusCode(t.status, e.node.res.statusCode)), t.statusText && (e.node.res.statusMessage = sanitizeStatusMessage(t.statusText)), t.redirected && e.node.res.setHeader("location", t.url), t.body) return sendStream(e, t.body);
  e.node.res.end();
}
const nr = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]), or = /* @__PURE__ */ new Set(["transfer-encoding", "accept-encoding", "connection", "keep-alive", "upgrade", "expect", "host", "accept"]);
async function proxyRequest(e, t, r2 = {}) {
  let s, a;
  nr.has(e.method) && (r2.streamRequest ? (s = function(e2) {
    if (!Xt.includes(e2.method)) return;
    const t2 = e2.web?.request?.body || e2._requestBody;
    return t2 || (Yt in e2.node.req || "rawBody" in e2.node.req || "body" in e2.node.req || "__unenv__" in e2.node.req ? new ReadableStream({ async start(t3) {
      const r3 = await readRawBody(e2, false);
      r3 && t3.enqueue(r3), t3.close();
    } }) : new ReadableStream({ start: (t3) => {
      e2.node.req.on("data", (e3) => {
        t3.enqueue(e3);
      }), e2.node.req.on("end", () => {
        t3.close();
      }), e2.node.req.on("error", (e3) => {
        t3.error(e3);
      });
    } }));
  }(e), a = "half") : s = await readRawBody(e, false).catch(() => {
  }));
  const c2 = r2.fetchOptions?.method || e.method, d = function(e2, ...t2) {
    const r3 = t2.filter(Boolean);
    if (0 === r3.length) return e2;
    const s2 = new Headers(e2);
    for (const e3 of r3) {
      const t3 = Array.isArray(e3) ? e3 : "function" == typeof e3.entries ? e3.entries() : Object.entries(e3);
      for (const [e4, r4] of t3) void 0 !== r4 && s2.set(e4, r4);
    }
    return s2;
  }(getProxyRequestHeaders(e, { host: t.startsWith("/") }), r2.fetchOptions?.headers, r2.headers);
  return async function(e2, t2, r3 = {}) {
    let s2;
    try {
      s2 = await _getFetch(r3.fetch)(t2, { headers: r3.headers, ignoreResponseError: true, ...r3.fetchOptions });
    } catch (e3) {
      throw createError({ status: 502, statusMessage: "Bad Gateway", cause: e3 });
    }
    e2.node.res.statusCode = sanitizeStatusCode(s2.status, e2.node.res.statusCode), e2.node.res.statusMessage = sanitizeStatusMessage(s2.statusText);
    const a2 = [];
    for (const [t3, r4] of s2.headers.entries()) "content-encoding" !== t3 && "content-length" !== t3 && ("set-cookie" !== t3 ? e2.node.res.setHeader(t3, r4) : a2.push(...splitCookiesString(r4)));
    a2.length > 0 && e2.node.res.setHeader("set-cookie", a2.map((e3) => (r3.cookieDomainRewrite && (e3 = rewriteCookieProperty(e3, r3.cookieDomainRewrite, "domain")), r3.cookiePathRewrite && (e3 = rewriteCookieProperty(e3, r3.cookiePathRewrite, "path")), e3)));
    r3.onResponse && await r3.onResponse(e2, s2);
    if (void 0 !== s2._data) return s2._data;
    if (e2.handled) return;
    if (false === r3.sendStream) {
      const t3 = new Uint8Array(await s2.arrayBuffer());
      return e2.node.res.end(t3);
    }
    if (s2.body) for await (const t3 of s2.body) e2.node.res.write(t3);
    return e2.node.res.end();
  }(e, t, { ...r2, fetchOptions: { method: c2, body: s, duplex: a, ...r2.fetchOptions, headers: d } });
}
function getProxyRequestHeaders(e, t) {
  const r2 = /* @__PURE__ */ Object.create(null), s = function(e2) {
    const t2 = {};
    for (const r3 in e2.node.req.headers) {
      const s2 = e2.node.req.headers[r3];
      t2[r3] = Array.isArray(s2) ? s2.filter(Boolean).join(", ") : s2;
    }
    return t2;
  }(e);
  for (const e2 in s) (!or.has(e2) || "host" === e2 && t?.host) && (r2[e2] = s[e2]);
  return r2;
}
function fetchWithEvent(e, t, r2, s) {
  return _getFetch(s?.fetch)(t, { ...r2, context: r2?.context || e.context, headers: { ...getProxyRequestHeaders(e, { host: "string" == typeof t && t.startsWith("/") }), ...r2?.headers } });
}
function _getFetch(e) {
  if (e) return e;
  if (globalThis.fetch) return globalThis.fetch;
  throw new Error("fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js.");
}
function rewriteCookieProperty(e, t, r2) {
  const s = "string" == typeof t ? { "*": t } : t;
  return e.replace(new RegExp(`(;\\s*${r2}=)([^;]+)`, "gi"), (e2, t2, r3) => {
    let a;
    if (r3 in s) a = s[r3];
    else {
      if (!("*" in s)) return e2;
      a = s["*"];
    }
    return a ? t2 + a : "";
  });
}
class H3Event {
  __is_event__ = true;
  node;
  web;
  context = {};
  _method;
  _path;
  _headers;
  _requestBody;
  _handled = false;
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(e, t) {
    this.node = { req: e, res: t };
  }
  get method() {
    return this._method || (this._method = (this.node.req.method || "GET").toUpperCase()), this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    return this._headers || (this._headers = function(e) {
      const t = new Headers();
      for (const [r2, s] of Object.entries(e)) if (Array.isArray(s)) for (const e2 of s) t.append(r2, e2);
      else s && t.set(r2, s);
      return t;
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
function isEvent(e) {
  return hasProp(e, "__is_event__");
}
function createEvent(e, t) {
  return new H3Event(e, t);
}
function defineEventHandler(e) {
  if ("function" == typeof e) return e.__is_handler__ = true, e;
  const t = { onRequest: _normalizeArray(e.onRequest), onBeforeResponse: _normalizeArray(e.onBeforeResponse) }, _handler = (r2) => async function(e2, t2, r3) {
    if (r3.onRequest) {
      for (const t3 of r3.onRequest) if (await t3(e2), e2.handled) return;
    }
    const s = await t2(e2), a = { body: s };
    if (r3.onBeforeResponse) for (const t3 of r3.onBeforeResponse) await t3(e2, a);
    return a.body;
  }(r2, e.handler, t);
  return _handler.__is_handler__ = true, _handler.__resolve__ = e.handler.__resolve__, _handler.__websocket__ = e.websocket, _handler;
}
function _normalizeArray(e) {
  return e ? Array.isArray(e) ? e : [e] : void 0;
}
const sr = defineEventHandler;
function isEventHandler(e) {
  return hasProp(e, "__is_handler__");
}
function toEventHandler(e, t, r2) {
  return isEventHandler(e) || console.warn("[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.", r2 && "/" !== r2 ? `
     Route: ${r2}` : "", `
     Handler: ${e}`), e;
}
const lazyEventHandler = function(e) {
  let t, r2;
  const resolveHandler = () => r2 ? Promise.resolve(r2) : (t || (t = Promise.resolve(e()).then((e2) => {
    const t2 = e2.default || e2;
    if ("function" != typeof t2) throw new TypeError("Invalid lazy handler result. It should be a function:", t2);
    return r2 = { handler: toEventHandler(e2.default || e2) }, r2;
  })), t), s = sr((e2) => r2 ? r2.handler(e2) : resolveHandler().then((t2) => t2.handler(e2)));
  return s.__resolve__ = resolveHandler, s;
};
function createApp(e = {}) {
  const t = [], r2 = function(e2, t2) {
    const r3 = t2.debug ? 2 : void 0;
    return sr(async (s2) => {
      s2.node.req.originalUrl = s2.node.req.originalUrl || s2.node.req.url || "/";
      const a2 = s2._path || s2.node.req.url || "/";
      let c3;
      t2.onRequest && await t2.onRequest(s2);
      for (const d of e2) {
        if (d.route.length > 1) {
          if (!a2.startsWith(d.route)) continue;
          c3 = a2.slice(d.route.length) || "/";
        } else c3 = a2;
        if (d.match && !d.match(c3, s2)) continue;
        s2._path = c3, s2.node.req.url = c3;
        const e3 = await d.handler(s2), u = void 0 === e3 ? void 0 : await e3;
        if (void 0 !== u) {
          const e4 = { body: u };
          return t2.onBeforeResponse && (s2._onBeforeResponseCalled = true, await t2.onBeforeResponse(s2, e4)), await handleHandlerResponse(s2, e4.body, r3), void (t2.onAfterResponse && (s2._onAfterResponseCalled = true, await t2.onAfterResponse(s2, e4)));
        }
        if (s2.handled) return void (t2.onAfterResponse && (s2._onAfterResponseCalled = true, await t2.onAfterResponse(s2, void 0)));
      }
      if (!s2.handled) throw createError({ statusCode: 404, statusMessage: `Cannot find any path matching ${s2.path || "/"}.` });
      t2.onAfterResponse && (s2._onAfterResponseCalled = true, await t2.onAfterResponse(s2, void 0));
    });
  }(t, e), s = /* @__PURE__ */ function(e2) {
    return async (t2) => {
      let r3;
      for (const s2 of e2) {
        if ("/" === s2.route && !s2.handler.__resolve__) continue;
        if (!t2.startsWith(s2.route)) continue;
        if (r3 = t2.slice(s2.route.length) || "/", s2.match && !s2.match(r3, void 0)) continue;
        let e3 = { route: s2.route, handler: s2.handler };
        if (e3.handler.__resolve__) {
          const t3 = await e3.handler.__resolve__(r3);
          if (!t3) continue;
          e3 = { ...e3, ...t3, route: joinURL(e3.route || "/", t3.route || "/") };
        }
        return e3;
      }
    };
  }(t);
  r2.__resolve__ = s;
  const a = /* @__PURE__ */ function(e2) {
    let t2;
    return () => (t2 || (t2 = e2()), t2);
  }(() => {
    return t2 = s, { ...e.websocket, async resolve(e2) {
      const r3 = e2.request?.url || e2.url || "/", { pathname: s2 } = "string" == typeof r3 ? parseURL(r3) : r3, a2 = await t2(s2);
      return a2?.handler?.__websocket__ || {};
    } };
    var t2;
  }), c2 = { use: (e2, t2, r3) => use(c2, e2, t2, r3), resolve: s, handler: r2, stack: t, options: e, get websocket() {
    return a();
  } };
  return c2;
}
function use(e, t, r2, s) {
  if (Array.isArray(t)) for (const a of t) use(e, a, r2, s);
  else if (Array.isArray(r2)) for (const a of r2) use(e, t, a, s);
  else "string" == typeof t ? e.stack.push(normalizeLayer({ ...s, route: t, handler: r2 })) : "function" == typeof t ? e.stack.push(normalizeLayer({ ...r2, handler: t })) : e.stack.push(normalizeLayer({ ...t }));
  return e;
}
function normalizeLayer(e) {
  let t = e.handler;
  return t.handler && (t = t.handler), e.lazy ? t = lazyEventHandler(t) : isEventHandler(t) || (t = toEventHandler(t, 0, e.route)), { route: withoutTrailingSlash(e.route), match: e.match, handler: t };
}
function handleHandlerResponse(t, r2, s) {
  if (null === r2) return function(e, t2) {
    if (e.handled) return;
    t2 || 200 === e.node.res.statusCode || (t2 = e.node.res.statusCode);
    const r3 = sanitizeStatusCode(t2, 204);
    204 === r3 && e.node.res.removeHeader("content-length"), e.node.res.writeHead(r3), e.node.res.end();
  }(t);
  if (r2) {
    if (a = r2, "undefined" != typeof Response && a instanceof Response) return sendWebResponse(t, r2);
    if (function(e) {
      if (!e || "object" != typeof e) return false;
      if ("function" == typeof e.pipe) {
        if ("function" == typeof e._read) return true;
        if ("function" == typeof e.abort) return true;
      }
      return "function" == typeof e.pipeTo;
    }(r2)) return sendStream(t, r2);
    if (r2.buffer) return send(t, r2);
    if (r2.arrayBuffer && "function" == typeof r2.arrayBuffer) return r2.arrayBuffer().then((s2) => send(t, Buffer.from(s2), r2.type));
    if (r2 instanceof Error) throw createError(r2);
    if ("function" == typeof r2.end) return true;
  }
  var a;
  const c2 = typeof r2;
  if ("string" === c2) return send(t, r2, Zt.html);
  if ("object" === c2 || "boolean" === c2 || "number" === c2) return send(t, JSON.stringify(r2, void 0, s), Zt.json);
  if ("bigint" === c2) return send(t, r2.toString(), Zt.json);
  throw createError({ statusCode: 500, statusMessage: `[h3] Cannot send ${c2} as response.` });
}
const ar = ["connect", "delete", "get", "head", "options", "post", "put", "trace", "patch"];
function toNodeListener(e) {
  return async function(t, r2) {
    const s = createEvent(t, r2);
    try {
      await e.handler(s);
    } catch (t2) {
      const r3 = createError(t2);
      if (isError$1(t2) || (r3.unhandled = true), setResponseStatus(s, r3.statusCode, r3.statusMessage), e.options.onError && await e.options.onError(r3, s), s.handled) return;
      (r3.unhandled || r3.fatal) && console.error("[h3]", r3.fatal ? "[fatal]" : "[unhandled]", r3), e.options.onBeforeResponse && !s._onBeforeResponseCalled && await e.options.onBeforeResponse(s, { body: r3 }), await function(e2, t3, r4) {
        if (e2.handled) return;
        const s2 = isError$1(t3) ? t3 : createError(t3), a = { statusCode: s2.statusCode, statusMessage: s2.statusMessage, stack: [], data: s2.data };
        if (r4 && (a.stack = (s2.stack || "").split("\n").map((e3) => e3.trim())), e2.handled) return;
        setResponseStatus(e2, Number.parseInt(s2.statusCode), s2.statusMessage), e2.node.res.setHeader("content-type", Zt.json), e2.node.res.end(JSON.stringify(a, void 0, 2));
      }(s, r3, !!e.options.debug), e.options.onAfterResponse && !s._onAfterResponseCalled && await e.options.onAfterResponse(s, { body: r3 });
    }
  };
}
function flatHooks(e, t = {}, r2) {
  for (const s in e) {
    const a = e[s], c2 = r2 ? `${r2}:${s}` : s;
    "object" == typeof a && null !== a ? flatHooks(a, t, c2) : "function" == typeof a && (t[c2] = a);
  }
  return t;
}
const ir = { run: (e) => e() }, cr = void 0 !== console.createTask ? console.createTask : () => ir;
function serialTaskCaller(e, t) {
  const r2 = t.shift(), s = cr(r2);
  return e.reduce((e2, r3) => e2.then(() => s.run(() => r3(...t))), Promise.resolve());
}
function parallelTaskCaller(e, t) {
  const r2 = t.shift(), s = cr(r2);
  return Promise.all(e.map((e2) => s.run(() => e2(...t))));
}
function callEachWith(e, t) {
  for (const r2 of [...e]) r2(t);
}
class Hookable {
  constructor() {
    this._hooks = {}, this._before = void 0, this._after = void 0, this._deprecatedMessages = void 0, this._deprecatedHooks = {}, this.hook = this.hook.bind(this), this.callHook = this.callHook.bind(this), this.callHookWith = this.callHookWith.bind(this);
  }
  hook(e, t, r2 = {}) {
    if (!e || "function" != typeof t) return () => {
    };
    const s = e;
    let a;
    for (; this._deprecatedHooks[e]; ) a = this._deprecatedHooks[e], e = a.to;
    if (a && !r2.allowDeprecated) {
      let e2 = a.message;
      e2 || (e2 = `${s} hook has been deprecated` + (a.to ? `, please use ${a.to}` : "")), this._deprecatedMessages || (this._deprecatedMessages = /* @__PURE__ */ new Set()), this._deprecatedMessages.has(e2) || (console.warn(e2), this._deprecatedMessages.add(e2));
    }
    if (!t.name) try {
      Object.defineProperty(t, "name", { get: () => "_" + e.replace(/\W+/g, "_") + "_hook_cb", configurable: true });
    } catch {
    }
    return this._hooks[e] = this._hooks[e] || [], this._hooks[e].push(t), () => {
      t && (this.removeHook(e, t), t = void 0);
    };
  }
  hookOnce(e, t) {
    let r2, _function = (...e2) => ("function" == typeof r2 && r2(), r2 = void 0, _function = void 0, t(...e2));
    return r2 = this.hook(e, _function), r2;
  }
  removeHook(e, t) {
    if (this._hooks[e]) {
      const r2 = this._hooks[e].indexOf(t);
      -1 !== r2 && this._hooks[e].splice(r2, 1), 0 === this._hooks[e].length && delete this._hooks[e];
    }
  }
  deprecateHook(e, t) {
    this._deprecatedHooks[e] = "string" == typeof t ? { to: t } : t;
    const r2 = this._hooks[e] || [];
    delete this._hooks[e];
    for (const t2 of r2) this.hook(e, t2);
  }
  deprecateHooks(e) {
    Object.assign(this._deprecatedHooks, e);
    for (const t in e) this.deprecateHook(t, e[t]);
  }
  addHooks(e) {
    const t = flatHooks(e), r2 = Object.keys(t).map((e2) => this.hook(e2, t[e2]));
    return () => {
      for (const e2 of r2.splice(0, r2.length)) e2();
    };
  }
  removeHooks(e) {
    const t = flatHooks(e);
    for (const e2 in t) this.removeHook(e2, t[e2]);
  }
  removeAllHooks() {
    for (const e in this._hooks) delete this._hooks[e];
  }
  callHook(e, ...t) {
    return t.unshift(e), this.callHookWith(serialTaskCaller, e, ...t);
  }
  callHookParallel(e, ...t) {
    return t.unshift(e), this.callHookWith(parallelTaskCaller, e, ...t);
  }
  callHookWith(e, t, ...r2) {
    const s = this._before || this._after ? { name: t, args: r2, context: {} } : void 0;
    this._before && callEachWith(this._before, s);
    const a = e(t in this._hooks ? [...this._hooks[t]] : [], r2);
    return a instanceof Promise ? a.finally(() => {
      this._after && s && callEachWith(this._after, s);
    }) : (this._after && s && callEachWith(this._after, s), a);
  }
  beforeEach(e) {
    return this._before = this._before || [], this._before.push(e), () => {
      if (void 0 !== this._before) {
        const t = this._before.indexOf(e);
        -1 !== t && this._before.splice(t, 1);
      }
    };
  }
  afterEach(e) {
    return this._after = this._after || [], this._after.push(e), () => {
      if (void 0 !== this._after) {
        const t = this._after.indexOf(e);
        -1 !== t && this._after.splice(t, 1);
      }
    };
  }
}
const lr = globalThis;
class FetchError extends Error {
  constructor(e, t) {
    super(e, t), this.name = "FetchError", t?.cause && !this.cause && (this.cause = t.cause);
  }
}
const dr = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function isPayloadMethod(e = "GET") {
  return dr.has(e.toUpperCase());
}
const ur = /* @__PURE__ */ new Set(["image/svg", "application/xml", "application/xhtml", "application/html"]), hr = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function resolveFetchOptions(e, t, r2, s) {
  const a = function(e2, t2, r3) {
    if (!t2) return new r3(e2);
    const s2 = new r3(t2);
    if (e2) for (const [t3, a2] of Symbol.iterator in e2 || Array.isArray(e2) ? e2 : new r3(e2)) s2.set(t3, a2);
    return s2;
  }(t?.headers ?? e?.headers, r2?.headers, s);
  let c2;
  return (r2?.query || r2?.params || t?.params || t?.query) && (c2 = { ...r2?.params, ...r2?.query, ...t?.params, ...t?.query }), { ...r2, ...t, query: c2, params: c2, headers: a };
}
async function callHooks(e, t) {
  if (t) if (Array.isArray(t)) for (const r2 of t) await r2(e);
  else await t(e);
}
const pr = /* @__PURE__ */ new Set([408, 409, 425, 429, 500, 502, 503, 504]), fr = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(e = {}) {
  const { fetch: t = globalThis.fetch, Headers: r2 = globalThis.Headers, AbortController: s = globalThis.AbortController } = e;
  async function onError(e2) {
    const t2 = e2.error && "AbortError" === e2.error.name && !e2.options.timeout || false;
    if (false !== e2.options.retry && !t2) {
      let t3;
      t3 = "number" == typeof e2.options.retry ? e2.options.retry : isPayloadMethod(e2.options.method) ? 0 : 1;
      const r4 = e2.response && e2.response.status || 500;
      if (t3 > 0 && (Array.isArray(e2.options.retryStatusCodes) ? e2.options.retryStatusCodes.includes(r4) : pr.has(r4))) {
        const r5 = "function" == typeof e2.options.retryDelay ? e2.options.retryDelay(e2) : e2.options.retryDelay || 0;
        return r5 > 0 && await new Promise((e3) => setTimeout(e3, r5)), $fetchRaw(e2.request, { ...e2.options, retry: t3 - 1 });
      }
    }
    const r3 = function(e3) {
      const t3 = e3.error?.message || e3.error?.toString() || "", r4 = e3.request?.method || e3.options?.method || "GET", s2 = e3.request?.url || String(e3.request) || "/", a = `[${r4}] ${JSON.stringify(s2)}`, c2 = e3.response ? `${e3.response.status} ${e3.response.statusText}` : "<no response>", d = new FetchError(`${a}: ${c2}${t3 ? ` ${t3}` : ""}`, e3.error ? { cause: e3.error } : void 0);
      for (const t4 of ["request", "options", "response"]) Object.defineProperty(d, t4, { get: () => e3[t4] });
      for (const [t4, r5] of [["data", "_data"], ["status", "status"], ["statusCode", "status"], ["statusText", "statusText"], ["statusMessage", "statusText"]]) Object.defineProperty(d, t4, { get: () => e3.response && e3.response[r5] });
      return d;
    }(e2);
    throw Error.captureStackTrace && Error.captureStackTrace(r3, $fetchRaw), r3;
  }
  const $fetchRaw = async function(a, c2 = {}) {
    const d = { request: a, options: resolveFetchOptions(a, c2, e.defaults, r2), response: void 0, error: void 0 };
    let u;
    if (d.options.method && (d.options.method = d.options.method.toUpperCase()), d.options.onRequest && await callHooks(d, d.options.onRequest), "string" == typeof d.request && (d.options.baseURL && (d.request = function(e2, t2) {
      if (isEmptyURL(t2) || hasProtocol(e2)) return e2;
      const r3 = withoutTrailingSlash(t2);
      return e2.startsWith(r3) ? e2 : joinURL(r3, e2);
    }(d.request, d.options.baseURL)), d.options.query && (d.request = withQuery(d.request, d.options.query), delete d.options.query), "query" in d.options && delete d.options.query, "params" in d.options && delete d.options.params), d.options.body && isPayloadMethod(d.options.method) && (!function(e2) {
      if (void 0 === e2) return false;
      const t2 = typeof e2;
      return "string" === t2 || "number" === t2 || "boolean" === t2 || null === t2 || "object" === t2 && (!!Array.isArray(e2) || !e2.buffer && (e2.constructor && "Object" === e2.constructor.name || "function" == typeof e2.toJSON));
    }(d.options.body) ? ("pipeTo" in d.options.body && "function" == typeof d.options.body.pipeTo || "function" == typeof d.options.body.pipe) && ("duplex" in d.options || (d.options.duplex = "half")) : (d.options.body = "string" == typeof d.options.body ? d.options.body : JSON.stringify(d.options.body), d.options.headers = new r2(d.options.headers || {}), d.options.headers.has("content-type") || d.options.headers.set("content-type", "application/json"), d.options.headers.has("accept") || d.options.headers.set("accept", "application/json"))), !d.options.signal && d.options.timeout) {
      const e2 = new s();
      u = setTimeout(() => {
        const t2 = new Error("[TimeoutError]: The operation was aborted due to timeout");
        t2.name = "TimeoutError", t2.code = 23, e2.abort(t2);
      }, d.options.timeout), d.options.signal = e2.signal;
    }
    try {
      d.response = await t(d.request, d.options);
    } catch (e2) {
      return d.error = e2, d.options.onRequestError && await callHooks(d, d.options.onRequestError), await onError(d);
    } finally {
      u && clearTimeout(u);
    }
    if ((d.response.body || d.response._bodyInit) && !fr.has(d.response.status) && "HEAD" !== d.options.method) {
      const e2 = (d.options.parseResponse ? "json" : d.options.responseType) || function(e3 = "") {
        if (!e3) return "json";
        const t2 = e3.split(";").shift() || "";
        return hr.test(t2) ? "json" : ur.has(t2) || t2.startsWith("text/") ? "text" : "blob";
      }(d.response.headers.get("content-type") || "");
      switch (e2) {
        case "json": {
          const e3 = await d.response.text(), t2 = d.options.parseResponse || destr;
          d.response._data = t2(e3);
          break;
        }
        case "stream":
          d.response._data = d.response.body || d.response._bodyInit;
          break;
        default:
          d.response._data = await d.response[e2]();
      }
    }
    return d.options.onResponse && await callHooks(d, d.options.onResponse), !d.options.ignoreResponseError && d.response.status >= 400 && d.response.status < 600 ? (d.options.onResponseError && await callHooks(d, d.options.onResponseError), await onError(d)) : d.response;
  }, $fetch = async function(e2, t2) {
    return (await $fetchRaw(e2, t2))._data;
  };
  return $fetch.raw = $fetchRaw, $fetch.native = (...e2) => t(...e2), $fetch.create = (t2 = {}, r3 = {}) => createFetch({ ...e, ...r3, defaults: { ...e.defaults, ...r3.defaults, ...t2 } }), $fetch;
}
const yr = function() {
  if ("undefined" != typeof globalThis) return globalThis;
  if ("undefined" != typeof self) return self;
  if (void 0 !== lr) return lr;
  throw new Error("unable to locate global object");
}(), mr = yr.fetch ? (...e) => yr.fetch(...e) : () => Promise.reject(new Error("[ofetch] global.fetch is not supported!")), gr = yr.Headers, wr = yr.AbortController;
function asyncCall(e, ...t) {
  try {
    return (r2 = e(...t)) && "function" == typeof r2.then ? r2 : Promise.resolve(r2);
  } catch (e2) {
    return Promise.reject(e2);
  }
  var r2;
}
function stringify(e) {
  if (/* @__PURE__ */ function(e2) {
    const t = typeof e2;
    return null === e2 || "object" !== t && "function" !== t;
  }(e)) return String(e);
  if (function(e2) {
    const t = Object.getPrototypeOf(e2);
    return !t || t.isPrototypeOf(Object);
  }(e) || Array.isArray(e)) return JSON.stringify(e);
  if ("function" == typeof e.toJSON) return stringify(e.toJSON());
  throw new Error("[unstorage] Cannot stringify value!");
}
createFetch({ fetch: mr, Headers: gr, AbortController: wr });
const br = "base64:";
function serializeRaw(t) {
  return "string" == typeof t ? t : br + function(t2) {
    if (globalThis.Buffer) return Buffer.from(t2).toString("base64");
    return globalThis.btoa(String.fromCodePoint(...t2));
  }(t);
}
function deserializeRaw(t) {
  return "string" != typeof t ? t : t.startsWith(br) ? function(t2) {
    if (globalThis.Buffer) return Buffer.from(t2, "base64");
    return Uint8Array.from(globalThis.atob(t2), (e) => e.codePointAt(0));
  }(t.slice(7)) : t;
}
const vr = ["has", "hasItem", "get", "getItem", "getItemRaw", "set", "setItem", "setItemRaw", "del", "remove", "removeItem", "getMeta", "setMeta", "removeMeta", "getKeys", "clear", "mount", "unmount"];
function normalizeKey$1(e) {
  return e && e.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...e) {
  return normalizeKey$1(e.join(":"));
}
function normalizeBaseKey(e) {
  return (e = normalizeKey$1(e)) ? e + ":" : "";
}
const memory = () => {
  const e = /* @__PURE__ */ new Map();
  return { name: "memory", getInstance: () => e, hasItem: (t) => e.has(t), getItem: (t) => e.get(t) ?? null, getItemRaw: (t) => e.get(t) ?? null, setItem(t, r2) {
    e.set(t, r2);
  }, setItemRaw(t, r2) {
    e.set(t, r2);
  }, removeItem(t) {
    e.delete(t);
  }, getKeys: () => [...e.keys()], clear() {
    e.clear();
  }, dispose() {
    e.clear();
  } };
};
function watch(e, t, r2) {
  return e.watch ? e.watch((e2, s) => t(e2, r2 + s)) : () => {
  };
}
async function dispose(e) {
  "function" == typeof e.dispose && await asyncCall(e.dispose);
}
const _r = {}, normalizeKey = function(e) {
  return e && e.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}, Er = { getKeys: () => Promise.resolve(Object.keys(_r)), hasItem: (e) => (e = normalizeKey(e), Promise.resolve(e in _r)), getItem: (e) => (e = normalizeKey(e), Promise.resolve(_r[e] ? _r[e].import() : null)), getMeta: (e) => (e = normalizeKey(e), Promise.resolve(_r[e] ? _r[e].meta : {})) }, Cr = function(e = {}) {
  const t = { mounts: { "": e.driver || memory() }, mountpoints: [""], watching: false, watchListeners: [], unwatch: {} }, getMount = (e2) => {
    for (const r3 of t.mountpoints) if (e2.startsWith(r3)) return { base: r3, relativeKey: e2.slice(r3.length), driver: t.mounts[r3] };
    return { base: "", relativeKey: e2, driver: t.mounts[""] };
  }, getMounts = (e2, r3) => t.mountpoints.filter((t2) => t2.startsWith(e2) || r3 && e2.startsWith(t2)).map((r4) => ({ relativeBase: e2.length > r4.length ? e2.slice(r4.length) : void 0, mountpoint: r4, driver: t.mounts[r4] })), onChange = (e2, r3) => {
    if (t.watching) {
      r3 = normalizeKey$1(r3);
      for (const s of t.watchListeners) s(e2, r3);
    }
  }, stopWatch = async () => {
    if (t.watching) {
      for (const e2 in t.unwatch) await t.unwatch[e2]();
      t.unwatch = {}, t.watching = false;
    }
  }, runBatch = (e2, t2, r3) => {
    const s = /* @__PURE__ */ new Map(), getBatch = (e3) => {
      let t3 = s.get(e3.base);
      return t3 || (t3 = { driver: e3.driver, base: e3.base, items: [] }, s.set(e3.base, t3)), t3;
    };
    for (const r4 of e2) {
      const e3 = "string" == typeof r4, s2 = normalizeKey$1(e3 ? r4 : r4.key), a = e3 ? void 0 : r4.value, c2 = e3 || !r4.options ? t2 : { ...t2, ...r4.options }, d = getMount(s2);
      getBatch(d).items.push({ key: s2, value: a, relativeKey: d.relativeKey, options: c2 });
    }
    return Promise.all([...s.values()].map((e3) => r3(e3))).then((e3) => e3.flat());
  }, r2 = { hasItem(e2, t2 = {}) {
    e2 = normalizeKey$1(e2);
    const { relativeKey: r3, driver: s } = getMount(e2);
    return asyncCall(s.hasItem, r3, t2);
  }, getItem(e2, t2 = {}) {
    e2 = normalizeKey$1(e2);
    const { relativeKey: r3, driver: s } = getMount(e2);
    return asyncCall(s.getItem, r3, t2).then((e3) => destr(e3));
  }, getItems: (e2, t2 = {}) => runBatch(e2, t2, (e3) => e3.driver.getItems ? asyncCall(e3.driver.getItems, e3.items.map((e4) => ({ key: e4.relativeKey, options: e4.options })), t2).then((t3) => t3.map((t4) => ({ key: joinKeys(e3.base, t4.key), value: destr(t4.value) }))) : Promise.all(e3.items.map((t3) => asyncCall(e3.driver.getItem, t3.relativeKey, t3.options).then((e4) => ({ key: t3.key, value: destr(e4) }))))), getItemRaw(e2, t2 = {}) {
    e2 = normalizeKey$1(e2);
    const { relativeKey: r3, driver: s } = getMount(e2);
    return s.getItemRaw ? asyncCall(s.getItemRaw, r3, t2) : asyncCall(s.getItem, r3, t2).then((e3) => deserializeRaw(e3));
  }, async setItem(e2, t2, s = {}) {
    if (void 0 === t2) return r2.removeItem(e2);
    e2 = normalizeKey$1(e2);
    const { relativeKey: a, driver: c2 } = getMount(e2);
    c2.setItem && (await asyncCall(c2.setItem, a, stringify(t2), s), c2.watch || onChange("update", e2));
  }, async setItems(e2, t2) {
    await runBatch(e2, t2, async (e3) => {
      if (e3.driver.setItems) return asyncCall(e3.driver.setItems, e3.items.map((e4) => ({ key: e4.relativeKey, value: stringify(e4.value), options: e4.options })), t2);
      e3.driver.setItem && await Promise.all(e3.items.map((t3) => asyncCall(e3.driver.setItem, t3.relativeKey, stringify(t3.value), t3.options)));
    });
  }, async setItemRaw(e2, t2, s = {}) {
    if (void 0 === t2) return r2.removeItem(e2, s);
    e2 = normalizeKey$1(e2);
    const { relativeKey: a, driver: c2 } = getMount(e2);
    if (c2.setItemRaw) await asyncCall(c2.setItemRaw, a, t2, s);
    else {
      if (!c2.setItem) return;
      await asyncCall(c2.setItem, a, serializeRaw(t2), s);
    }
    c2.watch || onChange("update", e2);
  }, async removeItem(e2, t2 = {}) {
    "boolean" == typeof t2 && (t2 = { removeMeta: t2 }), e2 = normalizeKey$1(e2);
    const { relativeKey: r3, driver: s } = getMount(e2);
    s.removeItem && (await asyncCall(s.removeItem, r3, t2), (t2.removeMeta || t2.removeMata) && await asyncCall(s.removeItem, r3 + "$", t2), s.watch || onChange("remove", e2));
  }, async getMeta(e2, t2 = {}) {
    "boolean" == typeof t2 && (t2 = { nativeOnly: t2 }), e2 = normalizeKey$1(e2);
    const { relativeKey: r3, driver: s } = getMount(e2), a = /* @__PURE__ */ Object.create(null);
    if (s.getMeta && Object.assign(a, await asyncCall(s.getMeta, r3, t2)), !t2.nativeOnly) {
      const e3 = await asyncCall(s.getItem, r3 + "$", t2).then((e4) => destr(e4));
      e3 && "object" == typeof e3 && ("string" == typeof e3.atime && (e3.atime = new Date(e3.atime)), "string" == typeof e3.mtime && (e3.mtime = new Date(e3.mtime)), Object.assign(a, e3));
    }
    return a;
  }, setMeta(e2, t2, r3 = {}) {
    return this.setItem(e2 + "$", t2, r3);
  }, removeMeta(e2, t2 = {}) {
    return this.removeItem(e2 + "$", t2);
  }, async getKeys(e2, t2 = {}) {
    e2 = normalizeBaseKey(e2);
    const r3 = getMounts(e2, true);
    let s = [];
    const a = [];
    let c2 = true;
    for (const e3 of r3) {
      e3.driver.flags?.maxDepth || (c2 = false);
      const r4 = await asyncCall(e3.driver.getKeys, e3.relativeBase, t2);
      for (const t3 of r4) {
        const r5 = e3.mountpoint + normalizeKey$1(t3);
        s.some((e4) => r5.startsWith(e4)) || a.push(r5);
      }
      s = [e3.mountpoint, ...s.filter((t3) => !t3.startsWith(e3.mountpoint))];
    }
    const d = void 0 !== t2.maxDepth && !c2;
    return a.filter((r4) => (!d || function(e3, t3) {
      if (void 0 === t3) return true;
      let r5 = 0, s2 = e3.indexOf(":");
      for (; s2 > -1; ) r5++, s2 = e3.indexOf(":", s2 + 1);
      return r5 <= t3;
    }(r4, t2.maxDepth)) && function(e3, t3) {
      return t3 ? e3.startsWith(t3) && "$" !== e3[e3.length - 1] : "$" !== e3[e3.length - 1];
    }(r4, e2));
  }, async clear(e2, t2 = {}) {
    e2 = normalizeBaseKey(e2), await Promise.all(getMounts(e2, false).map(async (e3) => {
      if (e3.driver.clear) return asyncCall(e3.driver.clear, e3.relativeBase, t2);
      if (e3.driver.removeItem) {
        const r3 = await e3.driver.getKeys(e3.relativeBase || "", t2);
        return Promise.all(r3.map((r4) => e3.driver.removeItem(r4, t2)));
      }
    }));
  }, async dispose() {
    await Promise.all(Object.values(t.mounts).map((e2) => dispose(e2)));
  }, watch: async (e2) => (await (async () => {
    if (!t.watching) {
      t.watching = true;
      for (const e3 in t.mounts) t.unwatch[e3] = await watch(t.mounts[e3], onChange, e3);
    }
  })(), t.watchListeners.push(e2), async () => {
    t.watchListeners = t.watchListeners.filter((t2) => t2 !== e2), 0 === t.watchListeners.length && await stopWatch();
  }), async unwatch() {
    t.watchListeners = [], await stopWatch();
  }, mount(e2, s) {
    if ((e2 = normalizeBaseKey(e2)) && t.mounts[e2]) throw new Error(`already mounted at ${e2}`);
    return e2 && (t.mountpoints.push(e2), t.mountpoints.sort((e3, t2) => t2.length - e3.length)), t.mounts[e2] = s, t.watching && Promise.resolve(watch(s, onChange, e2)).then((r3) => {
      t.unwatch[e2] = r3;
    }).catch(console.error), r2;
  }, async unmount(e2, r3 = true) {
    (e2 = normalizeBaseKey(e2)) && t.mounts[e2] && (t.watching && e2 in t.unwatch && (t.unwatch[e2]?.(), delete t.unwatch[e2]), r3 && await dispose(t.mounts[e2]), t.mountpoints = t.mountpoints.filter((t2) => t2 !== e2), delete t.mounts[e2]);
  }, getMount(e2 = "") {
    e2 = normalizeKey$1(e2) + ":";
    const t2 = getMount(e2);
    return { driver: t2.driver, base: t2.base };
  }, getMounts(e2 = "", t2 = {}) {
    e2 = normalizeKey$1(e2);
    return getMounts(e2, t2.parents).map((e3) => ({ driver: e3.driver, base: e3.mountpoint }));
  }, keys: (e2, t2 = {}) => r2.getKeys(e2, t2), get: (e2, t2 = {}) => r2.getItem(e2, t2), set: (e2, t2, s = {}) => r2.setItem(e2, t2, s), has: (e2, t2 = {}) => r2.hasItem(e2, t2), del: (e2, t2 = {}) => r2.removeItem(e2, t2), remove: (e2, t2 = {}) => r2.removeItem(e2, t2) };
  return r2;
}({});
function useStorage(e = "") {
  return e ? function(e2, t) {
    if (!(t = normalizeBaseKey(t))) return e2;
    const r2 = { ...e2 };
    for (const s of vr) r2[s] = (r3 = "", ...a) => e2[s](t + r3, ...a);
    return r2.getKeys = (r3 = "", ...s) => e2.getKeys(t + r3, ...s).then((e3) => e3.map((e4) => e4.slice(t.length))), r2.getItems = async (r3, s) => {
      const a = r3.map((e3) => "string" == typeof e3 ? t + e3 : { ...e3, key: t + e3.key });
      return (await e2.getItems(a, s)).map((e3) => ({ key: e3.key.slice(t.length), value: e3.value }));
    }, r2.setItems = async (r3, s) => {
      const a = r3.map((e3) => ({ key: t + e3.key, value: e3.value, options: e3.options }));
      return e2.setItems(a, s);
    }, r2;
  }(Cr, e) : Cr;
}
Cr.mount("/assets", Er);
const Sr = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225], Rr = [1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998], kr = [];
class k {
  _data = new l$1();
  _hash = new l$1([...Sr]);
  _nDataBytes = 0;
  _minBufferSize = 0;
  finalize(e) {
    e && this._append(e);
    const t = 8 * this._nDataBytes, r2 = 8 * this._data.sigBytes;
    return this._data.words[r2 >>> 5] |= 128 << 24 - r2 % 32, this._data.words[14 + (r2 + 64 >>> 9 << 4)] = Math.floor(t / 4294967296), this._data.words[15 + (r2 + 64 >>> 9 << 4)] = t, this._data.sigBytes = 4 * this._data.words.length, this._process(), this._hash;
  }
  _doProcessBlock(e, t) {
    const r2 = this._hash.words;
    let s = r2[0], a = r2[1], c2 = r2[2], d = r2[3], u = r2[4], h2 = r2[5], f2 = r2[6], m2 = r2[7];
    for (let r3 = 0; r3 < 64; r3++) {
      if (r3 < 16) kr[r3] = 0 | e[t + r3];
      else {
        const e2 = kr[r3 - 15], t2 = (e2 << 25 | e2 >>> 7) ^ (e2 << 14 | e2 >>> 18) ^ e2 >>> 3, s2 = kr[r3 - 2], a2 = (s2 << 15 | s2 >>> 17) ^ (s2 << 13 | s2 >>> 19) ^ s2 >>> 10;
        kr[r3] = t2 + kr[r3 - 7] + a2 + kr[r3 - 16];
      }
      const g2 = s & a ^ s & c2 ^ a & c2, _2 = (s << 30 | s >>> 2) ^ (s << 19 | s >>> 13) ^ (s << 10 | s >>> 22), E2 = m2 + ((u << 26 | u >>> 6) ^ (u << 21 | u >>> 11) ^ (u << 7 | u >>> 25)) + (u & h2 ^ ~u & f2) + Rr[r3] + kr[r3];
      m2 = f2, f2 = h2, h2 = u, u = d + E2 | 0, d = c2, c2 = a, a = s, s = E2 + (_2 + g2) | 0;
    }
    r2[0] = r2[0] + s | 0, r2[1] = r2[1] + a | 0, r2[2] = r2[2] + c2 | 0, r2[3] = r2[3] + d | 0, r2[4] = r2[4] + u | 0, r2[5] = r2[5] + h2 | 0, r2[6] = r2[6] + f2 | 0, r2[7] = r2[7] + m2 | 0;
  }
  _append(e) {
    "string" == typeof e && (e = l$1.fromUtf8(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;
  }
  _process(e) {
    let t, r2 = this._data.sigBytes / 64;
    r2 = e ? Math.ceil(r2) : Math.max((0 | r2) - this._minBufferSize, 0);
    const s = 16 * r2, a = Math.min(4 * s, this._data.sigBytes);
    if (s) {
      for (let e2 = 0; e2 < s; e2 += 16) this._doProcessBlock(this._data.words, e2);
      t = this._data.words.splice(0, s), this._data.sigBytes -= a;
    }
    return new l$1(t, a);
  }
}
let l$1 = class l {
  words;
  sigBytes;
  constructor(e, t) {
    e = this.words = e || [], this.sigBytes = void 0 === t ? 4 * e.length : t;
  }
  static fromUtf8(e) {
    const t = unescape(encodeURIComponent(e)), r2 = t.length, s = [];
    for (let e2 = 0; e2 < r2; e2++) s[e2 >>> 2] |= (255 & t.charCodeAt(e2)) << 24 - e2 % 4 * 8;
    return new l(s, r2);
  }
  toBase64() {
    const e = [];
    for (let t = 0; t < this.sigBytes; t += 3) {
      const r2 = (this.words[t >>> 2] >>> 24 - t % 4 * 8 & 255) << 16 | (this.words[t + 1 >>> 2] >>> 24 - (t + 1) % 4 * 8 & 255) << 8 | this.words[t + 2 >>> 2] >>> 24 - (t + 2) % 4 * 8 & 255;
      for (let s = 0; s < 4 && 8 * t + 6 * s < 8 * this.sigBytes; s++) e.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(r2 >>> 6 * (3 - s) & 63));
    }
    return e.join("");
  }
  concat(e) {
    if (this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8, this.words.length = Math.ceil(this.sigBytes / 4), this.sigBytes % 4) for (let t = 0; t < e.sigBytes; t++) {
      const r2 = e.words[t >>> 2] >>> 24 - t % 4 * 8 & 255;
      this.words[this.sigBytes + t >>> 2] |= r2 << 24 - (this.sigBytes + t) % 4 * 8;
    }
    else for (let t = 0; t < e.sigBytes; t += 4) this.words[this.sigBytes + t >>> 2] = e.words[t >>> 2];
    this.sigBytes += e.sigBytes;
  }
};
const xr = (() => {
  class Hasher2 {
    buff = "";
    #o = /* @__PURE__ */ new Map();
    write(e) {
      this.buff += e;
    }
    dispatch(e) {
      return this[null === e ? "null" : typeof e](e);
    }
    object(t) {
      if (t && "function" == typeof t.toJSON) return this.object(t.toJSON());
      const r2 = Object.prototype.toString.call(t);
      let s = "";
      const a = r2.length;
      s = a < 10 ? "unknown:[" + r2 + "]" : r2.slice(8, a - 1), s = s.toLowerCase();
      let c2 = null;
      if (void 0 !== (c2 = this.#o.get(t))) return this.dispatch("[CIRCULAR:" + c2 + "]");
      if (this.#o.set(t, this.#o.size), void 0 !== Buffer && Buffer.isBuffer && Buffer.isBuffer(t)) return this.write("buffer:"), this.write(t.toString("utf8"));
      if ("object" !== s && "function" !== s && "asyncfunction" !== s) this[s] ? this[s](t) : this.unknown(t, s);
      else {
        const e = Object.keys(t).sort(), r3 = [];
        this.write("object:" + (e.length + r3.length) + ":");
        const dispatchForKey = (e2) => {
          this.dispatch(e2), this.write(":"), this.dispatch(t[e2]), this.write(",");
        };
        for (const t2 of e) dispatchForKey(t2);
        for (const e2 of r3) dispatchForKey(e2);
      }
    }
    array(e, t) {
      if (t = void 0 !== t && t, this.write("array:" + e.length + ":"), !t || e.length <= 1) {
        for (const t2 of e) this.dispatch(t2);
        return;
      }
      const r2 = /* @__PURE__ */ new Map(), s = e.map((e2) => {
        const t2 = new Hasher2();
        t2.dispatch(e2);
        for (const [e3, s2] of t2.#o) r2.set(e3, s2);
        return t2.toString();
      });
      return this.#o = r2, s.sort(), this.array(s, false);
    }
    date(e) {
      return this.write("date:" + e.toJSON());
    }
    symbol(e) {
      return this.write("symbol:" + e.toString());
    }
    unknown(e, t) {
      if (this.write(t), e) return this.write(":"), e && "function" == typeof e.entries ? this.array([...e.entries()], true) : void 0;
    }
    error(e) {
      return this.write("error:" + e.toString());
    }
    boolean(e) {
      return this.write("bool:" + e);
    }
    string(e) {
      this.write("string:" + e.length + ":"), this.write(e);
    }
    function(e) {
      this.write("fn:"), !function(e2) {
        if ("function" != typeof e2) return false;
        return "[native code] }" === Function.prototype.toString.call(e2).slice(-15);
      }(e) ? this.dispatch(e.toString()) : this.dispatch("[native]");
    }
    number(e) {
      return this.write("number:" + e);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(e) {
      return this.write("regex:" + e.toString());
    }
    arraybuffer(e) {
      return this.write("arraybuffer:"), this.dispatch(new Uint8Array(e));
    }
    url(e) {
      return this.write("url:" + e.toString());
    }
    map(e) {
      this.write("map:");
      const t = [...e];
      return this.array(t, false);
    }
    set(e) {
      this.write("set:");
      const t = [...e];
      return this.array(t, false);
    }
    bigint(e) {
      return this.write("bigint:" + e.toString());
    }
  }
  for (const e of ["uint8array", "uint8clampedarray", "unt8array", "uint16array", "unt16array", "uint32array", "unt32array", "float32array", "float64array"]) Hasher2.prototype[e] = function(t) {
    return this.write(e + ":"), this.array([...t], false);
  };
  return Hasher2;
})();
function hash$1(e) {
  return function(e2) {
    return new k().finalize(e2).toBase64();
  }("string" == typeof e ? e : function(e2) {
    const t = new xr();
    return t.dispatch(e2), t.buff;
  }(e)).replace(/[-_]/g, "").slice(0, 10);
}
function defineCachedFunction(e, t = {}) {
  t = { name: "_", base: "/cache", swr: true, maxAge: 1, ...t };
  const r2 = {}, s = t.group || "nitro/functions", a = t.name || e.name || "_", c2 = t.integrity || hash$1([e, t]), d = t.validate || ((e2) => void 0 !== e2.value);
  return async (...u) => {
    if (await t.shouldBypassCache?.(...u)) return e(...u);
    const h2 = await (t.getKey || getKey)(...u), f2 = await t.shouldInvalidateCache?.(...u), m2 = await async function(e2, u2, h3, f3) {
      const m3 = [t.base, s, a, e2 + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
      let g3 = await useStorage().getItem(m3).catch((e3) => {
        console.error("[cache] Cache read error.", e3), useNitroApp().captureError(e3, { event: f3, tags: ["cache"] });
      }) || {};
      if ("object" != typeof g3) {
        g3 = {};
        const e3 = new Error("Malformed data read from cache.");
        console.error("[cache]", e3), useNitroApp().captureError(e3, { event: f3, tags: ["cache"] });
      }
      const _2 = 1e3 * (t.maxAge ?? 0);
      _2 && (g3.expires = Date.now() + _2);
      const E2 = h3 || g3.integrity !== c2 || _2 && Date.now() - (g3.mtime || 0) > _2 || false === d(g3), C2 = E2 ? (async () => {
        const s2 = r2[e2];
        s2 || (void 0 !== g3.value && (t.staleMaxAge || 0) >= 0 && false === t.swr && (g3.value = void 0, g3.integrity = void 0, g3.mtime = void 0, g3.expires = void 0), r2[e2] = Promise.resolve(u2()));
        try {
          g3.value = await r2[e2];
        } catch (t2) {
          throw s2 || delete r2[e2], t2;
        }
        if (!s2 && (g3.mtime = Date.now(), g3.integrity = c2, delete r2[e2], false !== d(g3))) {
          let e3;
          t.maxAge && !t.swr && (e3 = { ttl: t.maxAge });
          const r3 = useStorage().setItem(m3, g3, e3).catch((e4) => {
            console.error("[cache] Cache write error.", e4), useNitroApp().captureError(e4, { event: f3, tags: ["cache"] });
          });
          f3?.waitUntil && f3.waitUntil(r3);
        }
      })() : Promise.resolve();
      return void 0 === g3.value ? await C2 : E2 && f3 && f3.waitUntil && f3.waitUntil(C2), t.swr && false !== d(g3) ? (C2.catch((e3) => {
        console.error("[cache] SWR handler error.", e3), useNitroApp().captureError(e3, { event: f3, tags: ["cache"] });
      }), g3) : C2.then(() => g3);
    }(h2, () => e(...u), f2, u[0] && isEvent(u[0]) ? u[0] : void 0);
    let g2 = m2.value;
    return t.transform && (g2 = await t.transform(m2, ...u) || g2), g2;
  };
}
function getKey(...e) {
  return e.length > 0 ? hash$1(e) : "";
}
function escapeKey(e) {
  return String(e).replace(/\W/g, "");
}
function cloneWithProxy(e, t) {
  return new Proxy(e, { get: (e2, r2, s) => r2 in t ? t[r2] : Reflect.get(e2, r2, s), set: (e2, r2, s, a) => r2 in t ? (t[r2] = s, true) : Reflect.set(e2, r2, s, a) });
}
const cachedEventHandler = function(e, t = { name: "_", base: "/cache", swr: true, maxAge: 1 }) {
  const r2 = (t.varies || []).filter(Boolean).map((e2) => e2.toLowerCase()).sort(), s = { ...t, getKey: async (e2) => {
    const s2 = await t.getKey?.(e2);
    if (s2) return escapeKey(s2);
    const a2 = e2.node.req.originalUrl || e2.node.req.url || e2.path;
    let c2;
    try {
      c2 = escapeKey(decodeURI(parseURL(a2).pathname)).slice(0, 16) || "index";
    } catch {
      c2 = "-";
    }
    return [`${c2}.${hash$1(a2)}`, ...r2.map((t2) => [t2, e2.node.req.headers[t2]]).map(([e3, t2]) => `${escapeKey(e3)}.${hash$1(t2)}`)].join(":");
  }, validate: (e2) => !!e2.value && (!(e2.value.code >= 400) && (void 0 !== e2.value.body && ("undefined" !== e2.value.headers.etag && "undefined" !== e2.value.headers["last-modified"]))), group: t.group || "nitro/handlers", integrity: t.integrity || hash$1([e, t]) }, a = function(e2, t2 = {}) {
    return defineCachedFunction(e2, t2);
  }(async (a2) => {
    const c2 = {};
    for (const e2 of r2) {
      const t2 = a2.node.req.headers[e2];
      void 0 !== t2 && (c2[e2] = t2);
    }
    const d = cloneWithProxy(a2.node.req, { headers: c2 }), u = {};
    let h2;
    const f2 = createEvent(d, cloneWithProxy(a2.node.res, { statusCode: 200, writableEnded: false, writableFinished: false, headersSent: false, closed: false, getHeader: (e2) => u[e2], setHeader(e2, t2) {
      return u[e2] = t2, this;
    }, getHeaderNames: () => Object.keys(u), hasHeader: (e2) => e2 in u, removeHeader(e2) {
      delete u[e2];
    }, getHeaders: () => u, end(e2, t2, r3) {
      return "string" == typeof e2 && (h2 = e2), "function" == typeof t2 && t2(), "function" == typeof r3 && r3(), this;
    }, write: (e2, t2, r3) => ("string" == typeof e2 && (h2 = e2), "function" == typeof t2 && t2(void 0), "function" == typeof r3 && r3(), true), writeHead(e2, t2) {
      if (this.statusCode = e2, t2) {
        if (Array.isArray(t2) || "string" == typeof t2) throw new TypeError("Raw headers  is not supported.");
        for (const e3 in t2) {
          const r3 = t2[e3];
          void 0 !== r3 && this.setHeader(e3, r3);
        }
      }
      return this;
    } }));
    f2.fetch = (e2, t2) => fetchWithEvent(f2, e2, t2, { fetch: useNitroApp().localFetch }), f2.$fetch = (e2, t2) => fetchWithEvent(f2, e2, t2, { fetch: globalThis.$fetch }), f2.waitUntil = a2.waitUntil, f2.context = a2.context, f2.context.cache = { options: s };
    const m2 = await e(f2) || h2, g2 = f2.node.res.getHeaders();
    g2.etag = String(g2.Etag || g2.etag || `W/"${hash$1(m2)}"`), g2["last-modified"] = String(g2["Last-Modified"] || g2["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString());
    const _2 = [];
    t.swr ? (t.maxAge && _2.push(`s-maxage=${t.maxAge}`), t.staleMaxAge ? _2.push(`stale-while-revalidate=${t.staleMaxAge}`) : _2.push("stale-while-revalidate")) : t.maxAge && _2.push(`max-age=${t.maxAge}`), _2.length > 0 && (g2["cache-control"] = _2.join(", "));
    return { code: f2.node.res.statusCode, headers: g2, body: m2 };
  }, s);
  return defineEventHandler(async (r3) => {
    if (t.headersOnly) {
      if (handleCacheHeaders(r3, { maxAge: t.maxAge })) return;
      return e(r3);
    }
    const s2 = await a(r3);
    if (r3.node.res.headersSent || r3.node.res.writableEnded) return s2.body;
    if (!handleCacheHeaders(r3, { modifiedTime: new Date(s2.headers["last-modified"]), etag: s2.headers.etag, maxAge: t.maxAge })) {
      r3.node.res.statusCode = s2.code;
      for (const e2 in s2.headers) {
        const t2 = s2.headers[e2];
        "set-cookie" === e2 ? r3.node.res.appendHeader(e2, splitCookiesString(t2)) : void 0 !== t2 && r3.node.res.setHeader(e2, t2);
      }
      return s2.body;
    }
  });
};
function klona(e) {
  if ("object" != typeof e) return e;
  var t, r2, s = Object.prototype.toString.call(e);
  if ("[object Object]" === s) {
    if (e.constructor !== Object && "function" == typeof e.constructor) for (t in r2 = new e.constructor(), e) e.hasOwnProperty(t) && r2[t] !== e[t] && (r2[t] = klona(e[t]));
    else for (t in r2 = {}, e) "__proto__" === t ? Object.defineProperty(r2, t, { value: klona(e[t]), configurable: true, enumerable: true, writable: true }) : r2[t] = klona(e[t]);
    return r2;
  }
  if ("[object Array]" === s) {
    for (t = e.length, r2 = Array(t); t--; ) r2[t] = klona(e[t]);
    return r2;
  }
  return "[object Set]" === s ? (r2 = /* @__PURE__ */ new Set(), e.forEach(function(e2) {
    r2.add(klona(e2));
  }), r2) : "[object Map]" === s ? (r2 = /* @__PURE__ */ new Map(), e.forEach(function(e2, t2) {
    r2.set(klona(t2), klona(e2));
  }), r2) : "[object Date]" === s ? /* @__PURE__ */ new Date(+e) : "[object RegExp]" === s ? ((r2 = new RegExp(e.source, e.flags)).lastIndex = e.lastIndex, r2) : "[object DataView]" === s ? new e.constructor(klona(e.buffer)) : "[object ArrayBuffer]" === s ? e.slice(0) : "Array]" === s.slice(-6) ? new e.constructor(e) : e;
}
const Hr = zt({}), Ar = /\d/, Pr = ["-", "_", "/", "."];
function isUppercase(e = "") {
  if (!Ar.test(e)) return e !== e.toLowerCase();
}
function kebabCase(e, t) {
  return e ? (Array.isArray(e) ? e : function(e2) {
    const t2 = Pr, r2 = [];
    if (!e2 || "string" != typeof e2) return r2;
    let s, a, c2 = "";
    for (const d of e2) {
      const e3 = t2.includes(d);
      if (true === e3) {
        r2.push(c2), c2 = "", s = void 0;
        continue;
      }
      const u = isUppercase(d);
      if (false === a) {
        if (false === s && true === u) {
          r2.push(c2), c2 = d, s = u;
          continue;
        }
        if (true === s && false === u && c2.length > 1) {
          const e4 = c2.at(-1);
          r2.push(c2.slice(0, Math.max(0, c2.length - 1))), c2 = e4 + d, s = u;
          continue;
        }
      }
      c2 += d, s = u, a = e3;
    }
    return r2.push(c2), r2;
  }(e)).map((e2) => e2.toLowerCase()).join(t) : "";
}
function getEnv(e, t) {
  const r2 = (s = e, kebabCase(s || "", "_")).toUpperCase();
  var s;
  return destr(S.env[t.prefix + r2] ?? S.env[t.altPrefix + r2]);
}
function _isObject(e) {
  return "object" == typeof e && !Array.isArray(e);
}
const Ir = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(e) {
  return e.replace(Ir, (e2, t) => S.env[t] || e2);
}
const Tr = { app: { baseURL: "/" }, nitro: { routeRules: {} } }, Mr = { prefix: "NITRO_", altPrefix: Tr.nitro.envPrefix ?? S.env.NITRO_ENV_PREFIX ?? "_", envExpansion: Tr.nitro.envExpansion ?? S.env.NITRO_ENV_EXPANSION ?? false }, Or = _deepFreeze(function applyEnv(e, t, r2 = "") {
  for (const s in e) {
    const a = r2 ? `${r2}_${s}` : s, c2 = getEnv(a, t);
    _isObject(e[s]) ? _isObject(c2) ? (e[s] = { ...e[s], ...c2 }, applyEnv(e[s], t, a)) : void 0 === c2 ? applyEnv(e[s], t, a) : e[s] = c2 ?? e[s] : e[s] = c2 ?? e[s], t.envExpansion && "string" == typeof e[s] && (e[s] = _expandFromEnv(e[s]));
  }
  return e;
}(klona(Tr), Mr));
function useRuntimeConfig(e) {
  return Or;
}
function _deepFreeze(e) {
  const t = Object.getOwnPropertyNames(e);
  for (const r2 of t) {
    const t2 = e[r2];
    t2 && "object" == typeof t2 && _deepFreeze(t2);
  }
  return Object.freeze(e);
}
_deepFreeze(klona(Hr)), new Proxy(/* @__PURE__ */ Object.create(null), { get: (e, t) => {
  console.warn("Please use `useRuntimeConfig()` instead of accessing config directly.");
  const r2 = useRuntimeConfig();
  if (t in r2) return r2[t];
} });
const jr = toRouteMatcher(createRouter$1({ routes: useRuntimeConfig().nitro.routeRules }));
function createRouteRulesHandler(e) {
  return sr((t) => {
    const r2 = function(e2) {
      e2.context._nitro = e2.context._nitro || {}, e2.context._nitro.routeRules || (e2.context._nitro.routeRules = getRouteRulesForPath(withoutBase(e2.path.split("?")[0], useRuntimeConfig().app.baseURL)));
      return e2.context._nitro.routeRules;
    }(t);
    if (r2.headers && rr(t, r2.headers), r2.redirect) {
      let e2 = r2.redirect.to;
      if (e2.endsWith("/**")) {
        let s = t.path;
        const a = r2.redirect._redirectStripBase;
        a && (s = withoutBase(s, a)), e2 = joinURL(e2.slice(0, -3), s);
      } else if (t.path.includes("?")) {
        e2 = withQuery(e2, getQuery(t.path));
      }
      return function(e3, t2, r3 = 302) {
        return e3.node.res.statusCode = sanitizeStatusCode(r3, e3.node.res.statusCode), e3.node.res.setHeader("location", t2), send(e3, `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${t2.replace(/"/g, "%22")}"></head></html>`, Zt.html);
      }(t, e2, r2.redirect.statusCode);
    }
    if (r2.proxy) {
      let s = r2.proxy.to;
      if (s.endsWith("/**")) {
        let e2 = t.path;
        const a = r2.proxy._proxyStripBase;
        a && (e2 = withoutBase(e2, a)), s = joinURL(s.slice(0, -3), e2);
      } else if (t.path.includes("?")) {
        s = withQuery(s, getQuery(t.path));
      }
      return proxyRequest(t, s, { fetch: e.localFetch, ...r2.proxy });
    }
  });
}
function getRouteRulesForPath(e) {
  return Ft({}, ...jr.matchAll(e).reverse());
}
const Nr = /post|put|patch/i;
function requestHasBody(e) {
  return Nr.test(e.method);
}
function joinHeaders(e) {
  return Array.isArray(e) ? e.join(", ") : String(e);
}
function normalizeCookieHeader(e = "") {
  return splitCookiesString(joinHeaders(e));
}
function normalizeCookieHeaders(e) {
  const t = new Headers();
  for (const [r2, s] of e) if ("set-cookie" === r2) for (const e2 of normalizeCookieHeader(s)) t.append("set-cookie", e2);
  else t.set(r2, joinHeaders(s));
  return t;
}
function defaultHandler(e, t, r2) {
  const s = e.unhandled || e.fatal, a = e.statusCode || 500, c2 = e.statusMessage || "Server Error", d = function(e2, t2 = {}) {
    const r3 = function(e3, t3 = {}) {
      if (t3.xForwardedHost) {
        const t4 = e3.node.req.headers["x-forwarded-host"], r4 = (t4 || "").split(",").shift()?.trim();
        if (r4) return r4;
      }
      return e3.node.req.headers.host || "localhost";
    }(e2, t2), s2 = function(e3, t3 = {}) {
      return false !== t3.xForwardedProto && "https" === e3.node.req.headers["x-forwarded-proto"] || e3.node.req.connection?.encrypted ? "https" : "http";
    }(e2, t2), a2 = (e2.node.req.originalUrl || e2.path).replace(/^[/\\]+/g, "/");
    return new URL(a2, `${s2}://${r3}`);
  }(t, { xForwardedHost: true, xForwardedProto: true });
  if (404 === a) {
    const e2 = "/";
    if (/^\/[^/]/.test(e2) && !d.pathname.startsWith(e2)) {
      return { status: 302, statusText: "Found", headers: { location: `${e2}${d.pathname.slice(1)}${d.search}` }, body: "Redirecting..." };
    }
  }
  if (s && !r2?.silent) {
    const r3 = [e.unhandled && "[unhandled]", e.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${r3} [${t.method}] ${d}
`, e);
  }
  const u = { "content-type": "application/json", "x-content-type-options": "nosniff", "x-frame-options": "DENY", "referrer-policy": "no-referrer", "content-security-policy": "script-src 'none'; frame-ancestors 'none';" };
  setResponseStatus(t, a, c2), 404 !== a && function(e2, t2) {
    return e2.node.res.getHeader(t2);
  }(t, "cache-control") || (u["cache-control"] = "no-cache");
  return { status: a, statusText: c2, headers: u, body: { error: true, url: d.href, statusCode: a, statusMessage: c2, message: s ? "Server Error" : e.message, data: s ? void 0 : e.data } };
}
const Dr = [function(e, t) {
  const r2 = defaultHandler(e, t);
  return setResponseHeaders(t, r2.headers), setResponseStatus(t, r2.status, r2.statusText), send(t, JSON.stringify(r2.body, null, 2));
}];
const qr = [], Ur = [{ route: "/**", handler: () => import("./ssr-D243SbGa.js").then(function(e) {
  return e.x;
}), lazy: true, middleware: false, method: void 0 }];
const Br = function() {
  const e = useRuntimeConfig(), t = new Hookable(), captureError = (e2, r3 = {}) => {
    const s2 = t.callHookParallel("error", e2, r3).catch((e3) => {
      console.error("Error while capturing another error", e3);
    });
    if (r3.event && isEvent(r3.event)) {
      const t2 = r3.event.context.nitro?.errors;
      t2 && t2.push({ error: e2, context: r3 }), r3.event.waitUntil && r3.event.waitUntil(s2);
    }
  }, r2 = createApp({ debug: destr(false), onError: (e2, t2) => (captureError(e2, { event: t2, tags: ["request"] }), async function(e3, t3) {
    for (const r3 of Dr) try {
      if (await r3(e3, t3, { defaultHandler }), t3.handled) return;
    } catch (e4) {
      console.error(e4);
    }
  }(e2, t2)), onRequest: async (e2) => {
    e2.context.nitro = e2.context.nitro || { errors: [] };
    const t2 = e2.node.req?.__unenv__;
    t2?._platform && (e2.context = { _platform: t2?._platform, ...t2._platform, ...e2.context }), !e2.context.waitUntil && t2?.waitUntil && (e2.context.waitUntil = t2.waitUntil), e2.fetch = (t3, r3) => fetchWithEvent(e2, t3, r3, { fetch: localFetch }), e2.$fetch = (t3, r3) => fetchWithEvent(e2, t3, r3, { fetch: c2 }), e2.waitUntil = (t3) => {
      e2.context.nitro._waitUntilPromises || (e2.context.nitro._waitUntilPromises = []), e2.context.nitro._waitUntilPromises.push(t3), e2.context.waitUntil && e2.context.waitUntil(t3);
    }, e2.captureError = (t3, r3) => {
      captureError(t3, { event: e2, ...r3 });
    }, await Br.hooks.callHook("request", e2).catch((t3) => {
      captureError(t3, { event: e2, tags: ["request"] });
    });
  }, onBeforeResponse: async (e2, t2) => {
    await Br.hooks.callHook("beforeResponse", e2, t2).catch((t3) => {
      captureError(t3, { event: e2, tags: ["request", "response"] });
    });
  }, onAfterResponse: async (e2, t2) => {
    await Br.hooks.callHook("afterResponse", e2, t2).catch((t3) => {
      captureError(t3, { event: e2, tags: ["request", "response"] });
    });
  } }), s = function(e2 = {}) {
    const t2 = createRouter$1({}), r3 = {};
    let s2;
    const a2 = {}, addRoute = (e3, s3, c4) => {
      let d = r3[e3];
      if (d || (r3[e3] = d = { path: e3, handlers: {} }, t2.insert(e3, d)), Array.isArray(c4)) for (const t3 of c4) addRoute(e3, s3, t3);
      else d.handlers[c4] = toEventHandler(s3, 0, e3);
      return a2;
    };
    a2.use = a2.add = (e3, t3, r4) => addRoute(e3, t3, r4 || "all");
    for (const e3 of ar) a2[e3] = (t3, r4) => a2.add(t3, r4, e3);
    const matchHandler = (e3 = "/", r4 = "get") => {
      const a3 = e3.indexOf("?");
      -1 !== a3 && (e3 = e3.slice(0, Math.max(0, a3)));
      const c4 = t2.lookup(e3);
      if (!c4 || !c4.handlers) return { error: createError({ statusCode: 404, name: "Not Found", statusMessage: `Cannot find any route matching ${e3 || "/"}.` }) };
      let d = c4.handlers[r4] || c4.handlers.all;
      if (!d) {
        s2 || (s2 = toRouteMatcher(t2));
        const a4 = s2.matchAll(e3).reverse();
        for (const e4 of a4) {
          if (e4.handlers[r4]) {
            d = e4.handlers[r4], c4.handlers[r4] = c4.handlers[r4] || d;
            break;
          }
          if (e4.handlers.all) {
            d = e4.handlers.all, c4.handlers.all = c4.handlers.all || d;
            break;
          }
        }
      }
      return d ? { matched: c4, handler: d } : { error: createError({ statusCode: 405, name: "Method Not Allowed", statusMessage: `Method ${r4} is not allowed on this route.` }) };
    }, c3 = e2.preemptive || e2.preemtive;
    return a2.handler = sr((e3) => {
      const t3 = matchHandler(e3.path, e3.method.toLowerCase());
      if ("error" in t3) {
        if (c3) throw t3.error;
        return;
      }
      e3.context.matchedRoute = t3.matched;
      const r4 = t3.matched.params || {};
      return e3.context.params = r4, Promise.resolve(t3.handler(e3)).then((e4) => void 0 === e4 && c3 ? null : e4);
    }), a2.handler.__resolve__ = async (e3) => {
      e3 = function(e4 = "") {
        return function(e5 = "") {
          return e5.startsWith("/");
        }(e4) ? e4 : "/" + e4;
      }(e3);
      const t3 = matchHandler(e3);
      if ("error" in t3) return;
      let r4 = { route: t3.matched.path, handler: t3.handler };
      if (t3.handler.__resolve__) {
        const s3 = await t3.handler.__resolve__(e3);
        if (!s3) return;
        r4 = { ...r4, ...s3 };
      }
      return r4;
    }, a2;
  }({ preemptive: true }), a = toNodeListener(r2), localFetch = (e2, t2) => e2.toString().startsWith("/") ? async function(e3, t3, r3 = {}) {
    try {
      const s2 = await b(e3, { url: t3, ...r3 });
      return new Response(s2.body, { status: s2.status, statusText: s2.statusText, headers: v(s2.headers) });
    } catch (e4) {
      return new Response(e4.toString(), { status: Number.parseInt(e4.statusCode || e4.code) || 500, statusText: e4.statusText });
    }
  }(a, e2, t2).then((e3) => function(e4) {
    return e4.headers.has("set-cookie") ? new Response(e4.body, { status: e4.status, statusText: e4.statusText, headers: normalizeCookieHeaders(e4.headers) }) : e4;
  }(e3)) : globalThis.fetch(e2, t2), c2 = createFetch({ fetch: localFetch, Headers: gr, defaults: { baseURL: e.app.baseURL } });
  globalThis.$fetch = c2, r2.use(createRouteRulesHandler({ localFetch }));
  for (const t2 of Ur) {
    let a2 = t2.lazy ? lazyEventHandler(t2.handler) : t2.handler;
    if (t2.middleware || !t2.route) {
      const s2 = (e.app.baseURL + (t2.route || "/")).replace(/\/+/g, "/");
      r2.use(s2, a2);
    } else {
      const e2 = getRouteRulesForPath(t2.route.replace(/:\w+|\*\*/g, "_"));
      e2.cache && (a2 = cachedEventHandler(a2, { group: "nitro/routes", ...e2.cache })), s.use(t2.route, a2, t2.method);
    }
  }
  return r2.use(e.app.baseURL, s.handler), { hooks: t, h3App: r2, router: s, localCall: (e2) => b(a, e2), localFetch, captureError };
}();
function useNitroApp() {
  return Br;
}
!function(e) {
  for (const t of qr) try {
    t(e);
  } catch (t2) {
    throw e.captureError(t2, { tags: ["plugin"] }), t2;
  }
}(Br);
class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(e) {
    super(), this.socket = this.connection = e || new Socket();
  }
  get rawHeaders() {
    return function(e) {
      const t = [];
      for (const r2 in e) if (Array.isArray(e[r2])) for (const s of e[r2]) t.push(r2, s);
      else t.push(r2, e[r2]);
      return t;
    }(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(e, t) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
  _read() {
  }
}
function _distinct(e) {
  const t = {};
  for (const [r2, s] of Object.entries(e)) r2 && (t[r2] = (Array.isArray(s) ? s : [s]).filter(Boolean));
  return t;
}
class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(e) {
    super(), this.req = e;
  }
  assignSocket(e) {
    e._httpMessage = this, this.socket = e, this.connection = e, this.emit("socket", e), this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(e) {
  }
  writeContinue(e) {
  }
  writeHead(e, t, r2) {
    e && (this.statusCode = e), "string" == typeof t && (this.statusMessage = t, t = void 0);
    const s = r2 || t;
    if (s) if (Array.isArray(s)) ;
    else for (const e2 in s) this.setHeader(e2, s[e2]);
    return this.headersSent = true, this;
  }
  writeProcessing() {
  }
  setTimeout(e, t) {
    return this;
  }
  appendHeader(e, t) {
    e = e.toLowerCase();
    const r2 = this._headers[e], s = [...Array.isArray(r2) ? r2 : [r2], ...Array.isArray(t) ? t : [t]].filter(Boolean);
    return this._headers[e] = s.length > 1 ? s : s[0], this;
  }
  setHeader(e, t) {
    return this._headers[e.toLowerCase()] = Array.isArray(t) ? [...t] : t, this;
  }
  setHeaders(e) {
    for (const [t, r2] of e.entries()) this.setHeader(t, r2);
    return this;
  }
  getHeader(e) {
    return this._headers[e.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(e) {
    return e.toLowerCase() in this._headers;
  }
  removeHeader(e) {
    delete this._headers[e.toLowerCase()];
  }
  addTrailers(e) {
  }
  flushHeaders() {
  }
  writeEarlyHints(e, t) {
    "function" == typeof t && t();
  }
}
class Agent extends EventEmitter {
  __unenv__ = {};
  maxFreeSockets = 256;
  maxSockets = 1 / 0;
  maxTotalSockets = 1 / 0;
  freeSockets = {};
  sockets = {};
  requests = {};
  options;
  constructor(e = {}) {
    super(), this.options = e;
  }
  destroy() {
  }
}
const Kr = ["ACL", "BIND", "CHECKOUT", "CONNECT", "COPY", "DELETE", "GET", "HEAD", "LINK", "LOCK", "M-SEARCH", "MERGE", "MKACTIVITY", "MKCALENDAR", "MKCOL", "MOVE", "NOTIFY", "OPTIONS", "PATCH", "POST", "PRI", "PROPFIND", "PROPPATCH", "PURGE", "PUT", "REBIND", "REPORT", "SEARCH", "SOURCE", "SUBSCRIBE", "TRACE", "UNBIND", "UNLINK", "UNLOCK", "UNSUBSCRIBE"], $r = { 100: "Continue", 101: "Switching Protocols", 102: "Processing", 103: "Early Hints", 200: "OK", 201: "Created", 202: "Accepted", 203: "Non-Authoritative Information", 204: "No Content", 205: "Reset Content", 206: "Partial Content", 207: "Multi-Status", 208: "Already Reported", 226: "IM Used", 300: "Multiple Choices", 301: "Moved Permanently", 302: "Found", 303: "See Other", 304: "Not Modified", 305: "Use Proxy", 307: "Temporary Redirect", 308: "Permanent Redirect", 400: "Bad Request", 401: "Unauthorized", 402: "Payment Required", 403: "Forbidden", 404: "Not Found", 405: "Method Not Allowed", 406: "Not Acceptable", 407: "Proxy Authentication Required", 408: "Request Timeout", 409: "Conflict", 410: "Gone", 411: "Length Required", 412: "Precondition Failed", 413: "Payload Too Large", 414: "URI Too Long", 415: "Unsupported Media Type", 416: "Range Not Satisfiable", 417: "Expectation Failed", 418: "I'm a Teapot", 421: "Misdirected Request", 422: "Unprocessable Entity", 423: "Locked", 424: "Failed Dependency", 425: "Too Early", 426: "Upgrade Required", 428: "Precondition Required", 429: "Too Many Requests", 431: "Request Header Fields Too Large", 451: "Unavailable For Legal Reasons", 500: "Internal Server Error", 501: "Not Implemented", 502: "Bad Gateway", 503: "Service Unavailable", 504: "Gateway Timeout", 505: "HTTP Version Not Supported", 506: "Variant Also Negotiates", 507: "Insufficient Storage", 508: "Loop Detected", 509: "Bandwidth Limit Exceeded", 510: "Not Extended", 511: "Network Authentication Required" }, Lr = notImplemented("http.createServer"), Fr = notImplemented("http.request"), zr = notImplemented("http.get"), Wr = notImplementedClass("http.Server"), Vr = notImplementedClass("http.OutgoingMessage"), Qr = notImplementedClass("http.ClientRequest"), Gr = new Agent(), Jr = notImplemented("http.validateHeaderName"), Yr = notImplemented("http.validateHeaderValue"), Xr = notImplemented("http.setMaxIdleHTTPParsers"), Zr = notImplemented("http._connectionListener"), en = globalThis.WebSocket || notImplementedClass("WebSocket"), tn = globalThis.CloseEvent || notImplementedClass("CloseEvent"), rn = globalThis.MessageEvent || notImplementedClass("MessageEvent"), nn = { METHODS: Kr, STATUS_CODES: $r, maxHeaderSize: 16384, IncomingMessage, ServerResponse, WebSocket: en, CloseEvent: tn, MessageEvent: rn, createServer: Lr, request: Fr, get: zr, Server: Wr, OutgoingMessage: Vr, ClientRequest: Qr, Agent, globalAgent: Gr, validateHeaderName: Jr, validateHeaderValue: Yr, setMaxIdleHTTPParsers: Xr, _connectionListener: Zr }, on = Object.freeze(Object.defineProperty({ __proto__: null, Agent, ClientRequest: Qr, CloseEvent: tn, IncomingMessage, METHODS: Kr, MessageEvent: rn, OutgoingMessage: Vr, STATUS_CODES: $r, Server: Wr, ServerResponse, WebSocket: en, _connectionListener: Zr, createServer: Lr, default: nn, get: zr, globalAgent: Gr, maxHeaderSize: 16384, request: Fr, setMaxIdleHTTPParsers: Xr, validateHeaderName: Jr, validateHeaderValue: Yr }, Symbol.toStringTag, { value: "Module" })), isRegExp = (e) => e instanceof RegExp, isDate = (e) => e instanceof Date, isBoolean = (e) => "boolean" == typeof e, isNull = (e) => null === e, isNullOrUndefined = (e) => null == e, isNumber = (e) => "number" == typeof e, isString = (e) => "string" == typeof e, isSymbol = (e) => "symbol" == typeof e, isUndefined = (e) => void 0 === e, isFunction = (e) => "function" == typeof e, isBuffer = (e) => e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8, isObject = (e) => null !== e && "object" == typeof e && Object.getPrototypeOf(e).isPrototypeOf(Object), isError = (e) => e instanceof Error, isPrimitive = (e) => "object" == typeof e ? null === e : "function" != typeof e, sn = notImplemented("util._errnoException"), an = notImplemented("util._exceptionWithHostPort"), cn = notImplemented("util.getSystemErrorMap"), ln = notImplemented("util.getSystemErrorName"), dn = notImplemented("util.parseEnv"), un = notImplemented("util.styleText"), { MIMEParams: hn, MIMEType: pn, TextDecoder: fn, TextEncoder: yn, _extend: mn, aborted: gn, callbackify: wn, debug: bn, debuglog: vn, deprecate: _n, format: En, formatWithOptions: Cn, getCallSite: Sn, inherits: Rn, inspect: kn, log: xn, parseArgs: Hn, promisify: An, stripVTControlCharacters: Pn, toUSVString: In, transferableAbortController: Tn, transferableAbortSignal: Mn, isArray: On, isDeepStrictEqual: jn } = h, Nn = h.types, Dn = { _errnoException: sn, _exceptionWithHostPort: an, getSystemErrorMap: cn, getSystemErrorName: ln, isArray: On, isBoolean, isBuffer, isDate, isDeepStrictEqual: jn, isError, isFunction, isNull, isNullOrUndefined, isNumber, isObject, isPrimitive, isRegExp, isString, isSymbol, isUndefined, parseEnv: dn, styleText: un, MIMEParams: hn, MIMEType: pn, TextDecoder: fn, TextEncoder: yn, _extend: mn, aborted: gn, callbackify: wn, debug: bn, debuglog: vn, deprecate: _n, format: En, formatWithOptions: Cn, getCallSite: Sn, inherits: Rn, inspect: kn, log: xn, parseArgs: Hn, promisify: An, stripVTControlCharacters: Pn, toUSVString: In, transferableAbortController: Tn, transferableAbortSignal: Mn, types: Nn }, qn = Object.freeze(Object.defineProperty({ __proto__: null, MIMEParams: hn, MIMEType: pn, TextDecoder: fn, TextEncoder: yn, _errnoException: sn, _exceptionWithHostPort: an, _extend: mn, aborted: gn, callbackify: wn, debug: bn, debuglog: vn, default: Dn, deprecate: _n, format: En, formatWithOptions: Cn, getCallSite: Sn, getSystemErrorMap: cn, getSystemErrorName: ln, inherits: Rn, inspect: kn, isArray: On, isBoolean, isBuffer, isDate, isDeepStrictEqual: jn, isError, isFunction, isNull, isNullOrUndefined, isNumber, isObject, isPrimitive, isRegExp, isString, isSymbol, isUndefined, log: xn, parseArgs: Hn, parseEnv: dn, promisify: An, stripVTControlCharacters: Pn, styleText: un, toUSVString: In, transferableAbortController: Tn, transferableAbortSignal: Mn, types: Nn }, Symbol.toStringTag, { value: "Module" })), getRandomValues$1 = (e) => globalThis.crypto?.getRandomValues(e);
new Proxy(globalThis.crypto, { get: (e, t) => "CryptoKey" === t ? globalThis.CryptoKey : "function" == typeof globalThis.crypto[t] ? globalThis.crypto[t].bind(globalThis.crypto) : globalThis.crypto[t] });
const randomBytes$1 = (t, r2) => {
  const s = Buffer.alloc(t, 0, void 0);
  for (let e = 0; e < t; e += 65536) getRandomValues$1(Uint8Array.prototype.subarray.call(s, e, e + 65536));
  if ("function" != typeof r2) return s;
  r2(null, s);
}, Un = randomBytes$1, Bn = randomBytes$1, Kn = notImplemented("crypto.pseudoRandomBytes"), $n = notImplementedClass("crypto.Cipher"), Ln = notImplementedClass("crypto.Decipher"), { webcrypto: Fn, Certificate: zn, Cipheriv: Wn, Decipheriv: Vn, DiffieHellman: Qn, DiffieHellmanGroup: Gn, ECDH: Jn, Hash: Yn, Hmac: Xn, KeyObject: Zn, PrivateKeyObject: eo, PublicKeyObject: to, SecretKeyObject: ro, Sign: no, Verify: oo, X509Certificate: so, checkPrime: ao, checkPrimeSync: io, constants: co, createCipheriv: lo, createDecipheriv: uo, createDiffieHellman: ho, createDiffieHellmanGroup: po, createECDH: fo, createHash: yo, createHmac: mo, createPrivateKey: go, createPublicKey: wo, createSecretKey: bo, createSign: vo, createVerify: _o, diffieHellman: Eo, fips: Co, generateKey: So, generateKeyPair: Ro, generateKeyPairSync: ko, generateKeySync: xo, generatePrime: Ho, generatePrimeSync: Ao, getCipherInfo: Po, getCiphers: Io, getCurves: To, getDiffieHellman: Mo, getFips: Oo, getHashes: jo, hash: No, hkdf: Do, hkdfSync: qo, pbkdf2: Uo, pbkdf2Sync: Bo, privateDecrypt: Ko, privateEncrypt: $o, publicDecrypt: Lo, publicEncrypt: Fo, randomBytes: zo, randomFill: Wo, randomFillSync: Vo, randomInt: Qo, randomUUID: Go, scrypt: Jo, scryptSync: Yo, secureHeapUsed: Xo, setEngine: Zo, setFips: es, sign: ts, subtle: rs, timingSafeEqual: ns, verify: os } = f, ss = f.getRandomValues.bind(f.webcrypto), as = { Cipher: $n, Decipher: Ln, rng: Un, prng: Bn, pseudoRandomBytes: Kn, webcrypto: Fn, getRandomValues: ss, Certificate: zn, Cipheriv: Wn, Decipheriv: Vn, DiffieHellman: Qn, DiffieHellmanGroup: Gn, ECDH: Jn, Hash: Yn, Hmac: Xn, KeyObject: Zn, PrivateKeyObject: eo, PublicKeyObject: to, SecretKeyObject: ro, Sign: no, Verify: oo, X509Certificate: so, checkPrime: ao, checkPrimeSync: io, constants: co, createCipheriv: lo, createDecipheriv: uo, createDiffieHellman: ho, createDiffieHellmanGroup: po, createECDH: fo, createHash: yo, createHmac: mo, createPrivateKey: go, createPublicKey: wo, createSecretKey: bo, createSign: vo, createVerify: _o, diffieHellman: Eo, fips: Co, generateKey: So, generateKeyPair: Ro, generateKeyPairSync: ko, generateKeySync: xo, generatePrime: Ho, generatePrimeSync: Ao, getCipherInfo: Po, getCiphers: Io, getCurves: To, getDiffieHellman: Mo, getFips: Oo, getHashes: jo, hash: No, hkdf: Do, hkdfSync: qo, pbkdf2: Uo, pbkdf2Sync: Bo, privateDecrypt: Ko, privateEncrypt: $o, publicDecrypt: Lo, publicEncrypt: Fo, randomBytes: zo, randomFill: Wo, randomFillSync: Vo, randomInt: Qo, randomUUID: Go, scrypt: Jo, scryptSync: Yo, secureHeapUsed: Xo, setEngine: Zo, setFips: es, sign: ts, subtle: rs, timingSafeEqual: ns, verify: os }, is = Object.freeze(Object.defineProperty({ __proto__: null, Certificate: zn, Cipher: $n, Cipheriv: Wn, Decipher: Ln, Decipheriv: Vn, DiffieHellman: Qn, DiffieHellmanGroup: Gn, ECDH: Jn, Hash: Yn, Hmac: Xn, KeyObject: Zn, PrivateKeyObject: eo, PublicKeyObject: to, SecretKeyObject: ro, Sign: no, Verify: oo, X509Certificate: so, checkPrime: ao, checkPrimeSync: io, constants: co, createCipheriv: lo, createDecipheriv: uo, createDiffieHellman: ho, createDiffieHellmanGroup: po, createECDH: fo, createHash: yo, createHmac: mo, createPrivateKey: go, createPublicKey: wo, createSecretKey: bo, createSign: vo, createVerify: _o, default: as, diffieHellman: Eo, fips: Co, generateKey: So, generateKeyPair: Ro, generateKeyPairSync: ko, generateKeySync: xo, generatePrime: Ho, generatePrimeSync: Ao, getCipherInfo: Po, getCiphers: Io, getCurves: To, getDiffieHellman: Mo, getFips: Oo, getHashes: jo, getRandomValues: ss, hash: No, hkdf: Do, hkdfSync: qo, pbkdf2: Uo, pbkdf2Sync: Bo, privateDecrypt: Ko, privateEncrypt: $o, prng: Bn, pseudoRandomBytes: Kn, publicDecrypt: Lo, publicEncrypt: Fo, randomBytes: zo, randomFill: Wo, randomFillSync: Vo, randomInt: Qo, randomUUID: Go, rng: Un, scrypt: Jo, scryptSync: Yo, secureHeapUsed: Xo, setEngine: Zo, setFips: es, sign: ts, subtle: rs, timingSafeEqual: ns, verify: os, webcrypto: Fn }, Symbol.toStringTag, { value: "Module" }));
globalThis._importMeta_ = { url: "file:///_entry.js", env: {} };
"global" in globalThis || (globalThis.global = globalThis);
const l2 = globalThis.process;
globalThis.process = l2 ? new Proxy(l2, { get: (t, s, a) => Reflect.has(t, s) ? Reflect.get(t, s, a) : Reflect.get(S, s, a) }) : S, globalThis.Buffer || (globalThis.Buffer = Buffer), globalThis.setImmediate || (globalThis.setImmediate = setImmediate), globalThis.clearImmediate || (globalThis.clearImmediate = clearImmediate);
const c = { "/assets/about-HietOLc1.js": { type: "text/javascript; charset=utf-8", etag: '"4cc31-sZS8n8yqHWdoJY0gkj8jzD7ET4Y"', mtime: "2025-10-10T19:27:09.643Z", size: 314417, path: "../public/assets/about-HietOLc1.js" }, "/assets/app-DGxfKCjO.css": { type: "text/css; charset=utf-8", etag: '"13a93-aQoUoaqwB93bcafcxAiPzNlrRCg"', mtime: "2025-10-10T19:27:09.643Z", size: 80531, path: "../public/assets/app-DGxfKCjO.css" }, "/assets/deferred-oAEYbsdS.js": { type: "text/javascript; charset=utf-8", etag: '"251e-N0LMDivrS9jd20XoEGjPkgS8ZvM"', mtime: "2025-10-10T19:27:09.643Z", size: 9502, path: "../public/assets/deferred-oAEYbsdS.js" }, "/assets/index-89pAZCRU.css": { type: "text/css; charset=utf-8", etag: '"3d-MunatJnK2FG30EDxLOFwQsJhqzg"', mtime: "2025-10-10T19:27:09.643Z", size: 61, path: "../public/assets/index-89pAZCRU.css" }, "/assets/index-BPmiGJSz.js": { type: "text/javascript; charset=utf-8", etag: '"186-hMzteTx7376P8Jm61ousuJvrHUY"', mtime: "2025-10-10T19:27:09.643Z", size: 390, path: "../public/assets/index-BPmiGJSz.js" }, "/assets/main-C8KIyoGN.js": { type: "text/javascript; charset=utf-8", etag: '"4ada1-lF7G0KNXc52wzpwJa/dlh3Kk8FQ"', mtime: "2025-10-10T19:27:09.643Z", size: 306593, path: "../public/assets/main-C8KIyoGN.js" }, "/assets/styles-D3CiK31b.css": { type: "text/css; charset=utf-8", etag: '"15ad-H9OH50S83nnEWcnZZgNy7lyf0zc"', mtime: "2025-10-10T19:27:09.642Z", size: 5549, path: "../public/assets/styles-D3CiK31b.css" }, "/.vite/manifest.json": { type: "application/json", etag: '"6bb-Oqo29WuVuvqIQrW/OnKJe8BZ2v8"', mtime: "2025-10-10T19:27:09.643Z", size: 1723, path: "../public/.vite/manifest.json" } }, r = {};
const n = function(e) {
  const o2 = useNitroApp();
  return { async fetch(i2, l3, c2) {
    const r2 = {}, n2 = new URL(i2.url);
    if (e.fetch) {
      const t = await e.fetch(i2, l3, c2, n2, r2);
      if (t) return t;
    }
    return async function(e2, o3, i3, l4 = new URL(e2.url), c3 = useNitroApp(), r3) {
      let n3;
      requestHasBody(e2) && (n3 = Buffer.from(await e2.arrayBuffer()));
      return globalThis.__env__ = o3, c3.localFetch(l4.pathname + l4.search, { context: { waitUntil: (e3) => i3.waitUntil(e3), _platform: { cf: e2.cf, cloudflare: { request: e2, env: o3, context: i3, url: l4, ...r3 } } }, host: l4.hostname, protocol: l4.protocol, method: e2.method, headers: e2.headers, body: n3 });
    }(i2, l3, c2, n2, o2, r2);
  }, scheduled(e2, t, s) {
    globalThis.__env__ = t, s.waitUntil(o2.hooks.callHook("cloudflare:scheduled", { controller: e2, env: t, context: s }));
  }, email(e2, t, s) {
    globalThis.__env__ = t, s.waitUntil(o2.hooks.callHook("cloudflare:email", { message: e2, event: e2, env: t, context: s }));
  }, queue(e2, t, s) {
    globalThis.__env__ = t, s.waitUntil(o2.hooks.callHook("cloudflare:queue", { batch: e2, event: e2, env: t, context: s }));
  }, tail(e2, t, s) {
    globalThis.__env__ = t, s.waitUntil(o2.hooks.callHook("cloudflare:tail", { traces: e2, env: t, context: s }));
  }, trace(e2, t, s) {
    globalThis.__env__ = t, s.waitUntil(o2.hooks.callHook("cloudflare:trace", { traces: e2, env: t, context: s }));
  } };
}({ fetch(e, t, s, a) {
  if (t.ASSETS && function(e2 = "") {
    if (c[e2]) return true;
    for (const t2 in r) if (e2.startsWith(t2)) return true;
    return false;
  }(a.pathname)) return t.ASSETS.fetch(e);
} });
const workerEntry = n ?? {};
export {
  Agent as A,
  Dn as D,
  S,
  as as a,
  notImplementedClass as b,
  notImplementedAsync as c,
  nn as d,
  is as i,
  lr as l,
  notImplemented as n,
  on as o,
  qn as q,
  workerEntry as w
};
