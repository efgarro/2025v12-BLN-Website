import { w as Qe$1, o as getDefaultExportFromCjs, j as ke$1, m as getDefaultExportFromNamespaceIfNotNamed, t as I$1, d as Ge$1, v as St$1 } from "./ssr-D243SbGa.js";
function r(e) {
  var t, n, o = "";
  if ("string" == typeof e || "number" == typeof e) o += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (n = r(e[t])) && (o && (o += " "), o += n);
  } else for (n in e) e[n] && (o && (o += " "), o += n);
  return o;
}
function clsx() {
  for (var e, t, n = 0, o = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = r(e)) && (o && (o += " "), o += t);
  return o;
}
const l = Object.freeze(Object.defineProperty({ __proto__: null, clsx, default: clsx }, Symbol.toStringTag, { value: "Module" }));
function ok$1() {
}
function unreachable() {
}
const u = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, c = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, f = {};
function name(e, t) {
  return (f.jsx ? c : u).test(e);
}
const p = /[ \t\n\f\r]/g;
function empty$1(e) {
  return "" === e.replace(p, "");
}
class Schema {
  constructor(e, t, n) {
    this.normal = t, this.property = e, n && (this.space = n);
  }
}
function merge$1(e, t) {
  const n = {}, o = {};
  for (const t2 of e) Object.assign(n, t2.property), Object.assign(o, t2.normal);
  return new Schema(n, o, t);
}
function normalize$1(e) {
  return e.toLowerCase();
}
Schema.prototype.normal = {}, Schema.prototype.property = {}, Schema.prototype.space = void 0;
class Info {
  constructor(e, t) {
    this.attribute = t, this.property = e;
  }
}
Info.prototype.attribute = "", Info.prototype.booleanish = false, Info.prototype.boolean = false, Info.prototype.commaOrSpaceSeparated = false, Info.prototype.commaSeparated = false, Info.prototype.defined = false, Info.prototype.mustUseProperty = false, Info.prototype.number = false, Info.prototype.overloadedBoolean = false, Info.prototype.property = "", Info.prototype.spaceSeparated = false, Info.prototype.space = void 0;
let d = 0;
const h = increment(), g = increment(), m = increment(), y = increment(), b = increment(), v = increment(), k = increment();
function increment() {
  return 2 ** ++d;
}
const x = Object.freeze(Object.defineProperty({ __proto__: null, boolean: h, booleanish: g, commaOrSpaceSeparated: k, commaSeparated: v, number: y, overloadedBoolean: m, spaceSeparated: b }, Symbol.toStringTag, { value: "Module" })), w = Object.keys(x);
class DefinedInfo extends Info {
  constructor(e, t, n, o) {
    let i = -1;
    if (super(e, t), mark(this, "space", o), "number" == typeof n) for (; ++i < w.length; ) {
      const e2 = w[i];
      mark(this, w[i], (n & x[e2]) === x[e2]);
    }
  }
}
function mark(e, t, n) {
  n && (e[t] = n);
}
function create(e) {
  const t = {}, n = {};
  for (const [o, i] of Object.entries(e.properties)) {
    const a = new DefinedInfo(o, e.transform(e.attributes || {}, o), i, e.space);
    e.mustUseProperty && e.mustUseProperty.includes(o) && (a.mustUseProperty = true), t[o] = a, n[normalize$1(o)] = o, n[normalize$1(a.attribute)] = o;
  }
  return new Schema(t, n, e.space);
}
DefinedInfo.prototype.defined = true;
const S = create({ properties: { ariaActiveDescendant: null, ariaAtomic: g, ariaAutoComplete: null, ariaBusy: g, ariaChecked: g, ariaColCount: y, ariaColIndex: y, ariaColSpan: y, ariaControls: b, ariaCurrent: null, ariaDescribedBy: b, ariaDetails: null, ariaDisabled: g, ariaDropEffect: b, ariaErrorMessage: null, ariaExpanded: g, ariaFlowTo: b, ariaGrabbed: g, ariaHasPopup: null, ariaHidden: g, ariaInvalid: null, ariaKeyShortcuts: null, ariaLabel: null, ariaLabelledBy: b, ariaLevel: y, ariaLive: null, ariaModal: g, ariaMultiLine: g, ariaMultiSelectable: g, ariaOrientation: null, ariaOwns: b, ariaPlaceholder: null, ariaPosInSet: y, ariaPressed: g, ariaReadOnly: g, ariaRelevant: null, ariaRequired: g, ariaRoleDescription: b, ariaRowCount: y, ariaRowIndex: y, ariaRowSpan: y, ariaSelected: g, ariaSetSize: y, ariaSort: null, ariaValueMax: y, ariaValueMin: y, ariaValueNow: y, ariaValueText: null, role: null }, transform: (e, t) => "role" === t ? t : "aria-" + t.slice(4).toLowerCase() });
function caseSensitiveTransform(e, t) {
  return t in e ? e[t] : t;
}
function caseInsensitiveTransform(e, t) {
  return caseSensitiveTransform(e, t.toLowerCase());
}
const _ = create({ attributes: { acceptcharset: "accept-charset", classname: "class", htmlfor: "for", httpequiv: "http-equiv" }, mustUseProperty: ["checked", "multiple", "muted", "selected"], properties: { abbr: null, accept: v, acceptCharset: b, accessKey: b, action: null, allow: null, allowFullScreen: h, allowPaymentRequest: h, allowUserMedia: h, alt: null, as: null, async: h, autoCapitalize: null, autoComplete: b, autoFocus: h, autoPlay: h, blocking: b, capture: null, charSet: null, checked: h, cite: null, className: b, cols: y, colSpan: null, content: null, contentEditable: g, controls: h, controlsList: b, coords: y | v, crossOrigin: null, data: null, dateTime: null, decoding: null, default: h, defer: h, dir: null, dirName: null, disabled: h, download: m, draggable: g, encType: null, enterKeyHint: null, fetchPriority: null, form: null, formAction: null, formEncType: null, formMethod: null, formNoValidate: h, formTarget: null, headers: b, height: y, hidden: m, high: y, href: null, hrefLang: null, htmlFor: b, httpEquiv: b, id: null, imageSizes: null, imageSrcSet: null, inert: h, inputMode: null, integrity: null, is: null, isMap: h, itemId: null, itemProp: b, itemRef: b, itemScope: h, itemType: b, kind: null, label: null, lang: null, language: null, list: null, loading: null, loop: h, low: y, manifest: null, max: null, maxLength: y, media: null, method: null, min: null, minLength: y, multiple: h, muted: h, name: null, nonce: null, noModule: h, noValidate: h, onAbort: null, onAfterPrint: null, onAuxClick: null, onBeforeMatch: null, onBeforePrint: null, onBeforeToggle: null, onBeforeUnload: null, onBlur: null, onCancel: null, onCanPlay: null, onCanPlayThrough: null, onChange: null, onClick: null, onClose: null, onContextLost: null, onContextMenu: null, onContextRestored: null, onCopy: null, onCueChange: null, onCut: null, onDblClick: null, onDrag: null, onDragEnd: null, onDragEnter: null, onDragExit: null, onDragLeave: null, onDragOver: null, onDragStart: null, onDrop: null, onDurationChange: null, onEmptied: null, onEnded: null, onError: null, onFocus: null, onFormData: null, onHashChange: null, onInput: null, onInvalid: null, onKeyDown: null, onKeyPress: null, onKeyUp: null, onLanguageChange: null, onLoad: null, onLoadedData: null, onLoadedMetadata: null, onLoadEnd: null, onLoadStart: null, onMessage: null, onMessageError: null, onMouseDown: null, onMouseEnter: null, onMouseLeave: null, onMouseMove: null, onMouseOut: null, onMouseOver: null, onMouseUp: null, onOffline: null, onOnline: null, onPageHide: null, onPageShow: null, onPaste: null, onPause: null, onPlay: null, onPlaying: null, onPopState: null, onProgress: null, onRateChange: null, onRejectionHandled: null, onReset: null, onResize: null, onScroll: null, onScrollEnd: null, onSecurityPolicyViolation: null, onSeeked: null, onSeeking: null, onSelect: null, onSlotChange: null, onStalled: null, onStorage: null, onSubmit: null, onSuspend: null, onTimeUpdate: null, onToggle: null, onUnhandledRejection: null, onUnload: null, onVolumeChange: null, onWaiting: null, onWheel: null, open: h, optimum: y, pattern: null, ping: b, placeholder: null, playsInline: h, popover: null, popoverTarget: null, popoverTargetAction: null, poster: null, preload: null, readOnly: h, referrerPolicy: null, rel: b, required: h, reversed: h, rows: y, rowSpan: y, sandbox: b, scope: null, scoped: h, seamless: h, selected: h, shadowRootClonable: h, shadowRootDelegatesFocus: h, shadowRootMode: null, shape: null, size: y, sizes: null, slot: null, span: y, spellCheck: g, src: null, srcDoc: null, srcLang: null, srcSet: null, start: y, step: null, style: null, tabIndex: y, target: null, title: null, translate: null, type: null, typeMustMatch: h, useMap: null, value: g, width: y, wrap: null, writingSuggestions: null, align: null, aLink: null, archive: b, axis: null, background: null, bgColor: null, border: y, borderColor: null, bottomMargin: y, cellPadding: null, cellSpacing: null, char: null, charOff: null, classId: null, clear: null, code: null, codeBase: null, codeType: null, color: null, compact: h, declare: h, event: null, face: null, frame: null, frameBorder: null, hSpace: y, leftMargin: y, link: null, longDesc: null, lowSrc: null, marginHeight: y, marginWidth: y, noResize: h, noHref: h, noShade: h, noWrap: h, object: null, profile: null, prompt: null, rev: null, rightMargin: y, rules: null, scheme: null, scrolling: g, standby: null, summary: null, text: null, topMargin: y, valueType: null, version: null, vAlign: null, vLink: null, vSpace: y, allowTransparency: null, autoCorrect: null, autoSave: null, disablePictureInPicture: h, disableRemotePlayback: h, prefix: null, property: null, results: y, security: null, unselectable: null }, space: "html", transform: caseInsensitiveTransform }), C = create({ attributes: { accentHeight: "accent-height", alignmentBaseline: "alignment-baseline", arabicForm: "arabic-form", baselineShift: "baseline-shift", capHeight: "cap-height", className: "class", clipPath: "clip-path", clipRule: "clip-rule", colorInterpolation: "color-interpolation", colorInterpolationFilters: "color-interpolation-filters", colorProfile: "color-profile", colorRendering: "color-rendering", crossOrigin: "crossorigin", dataType: "datatype", dominantBaseline: "dominant-baseline", enableBackground: "enable-background", fillOpacity: "fill-opacity", fillRule: "fill-rule", floodColor: "flood-color", floodOpacity: "flood-opacity", fontFamily: "font-family", fontSize: "font-size", fontSizeAdjust: "font-size-adjust", fontStretch: "font-stretch", fontStyle: "font-style", fontVariant: "font-variant", fontWeight: "font-weight", glyphName: "glyph-name", glyphOrientationHorizontal: "glyph-orientation-horizontal", glyphOrientationVertical: "glyph-orientation-vertical", hrefLang: "hreflang", horizAdvX: "horiz-adv-x", horizOriginX: "horiz-origin-x", horizOriginY: "horiz-origin-y", imageRendering: "image-rendering", letterSpacing: "letter-spacing", lightingColor: "lighting-color", markerEnd: "marker-end", markerMid: "marker-mid", markerStart: "marker-start", navDown: "nav-down", navDownLeft: "nav-down-left", navDownRight: "nav-down-right", navLeft: "nav-left", navNext: "nav-next", navPrev: "nav-prev", navRight: "nav-right", navUp: "nav-up", navUpLeft: "nav-up-left", navUpRight: "nav-up-right", onAbort: "onabort", onActivate: "onactivate", onAfterPrint: "onafterprint", onBeforePrint: "onbeforeprint", onBegin: "onbegin", onCancel: "oncancel", onCanPlay: "oncanplay", onCanPlayThrough: "oncanplaythrough", onChange: "onchange", onClick: "onclick", onClose: "onclose", onCopy: "oncopy", onCueChange: "oncuechange", onCut: "oncut", onDblClick: "ondblclick", onDrag: "ondrag", onDragEnd: "ondragend", onDragEnter: "ondragenter", onDragExit: "ondragexit", onDragLeave: "ondragleave", onDragOver: "ondragover", onDragStart: "ondragstart", onDrop: "ondrop", onDurationChange: "ondurationchange", onEmptied: "onemptied", onEnd: "onend", onEnded: "onended", onError: "onerror", onFocus: "onfocus", onFocusIn: "onfocusin", onFocusOut: "onfocusout", onHashChange: "onhashchange", onInput: "oninput", onInvalid: "oninvalid", onKeyDown: "onkeydown", onKeyPress: "onkeypress", onKeyUp: "onkeyup", onLoad: "onload", onLoadedData: "onloadeddata", onLoadedMetadata: "onloadedmetadata", onLoadStart: "onloadstart", onMessage: "onmessage", onMouseDown: "onmousedown", onMouseEnter: "onmouseenter", onMouseLeave: "onmouseleave", onMouseMove: "onmousemove", onMouseOut: "onmouseout", onMouseOver: "onmouseover", onMouseUp: "onmouseup", onMouseWheel: "onmousewheel", onOffline: "onoffline", onOnline: "ononline", onPageHide: "onpagehide", onPageShow: "onpageshow", onPaste: "onpaste", onPause: "onpause", onPlay: "onplay", onPlaying: "onplaying", onPopState: "onpopstate", onProgress: "onprogress", onRateChange: "onratechange", onRepeat: "onrepeat", onReset: "onreset", onResize: "onresize", onScroll: "onscroll", onSeeked: "onseeked", onSeeking: "onseeking", onSelect: "onselect", onShow: "onshow", onStalled: "onstalled", onStorage: "onstorage", onSubmit: "onsubmit", onSuspend: "onsuspend", onTimeUpdate: "ontimeupdate", onToggle: "ontoggle", onUnload: "onunload", onVolumeChange: "onvolumechange", onWaiting: "onwaiting", onZoom: "onzoom", overlinePosition: "overline-position", overlineThickness: "overline-thickness", paintOrder: "paint-order", panose1: "panose-1", pointerEvents: "pointer-events", referrerPolicy: "referrerpolicy", renderingIntent: "rendering-intent", shapeRendering: "shape-rendering", stopColor: "stop-color", stopOpacity: "stop-opacity", strikethroughPosition: "strikethrough-position", strikethroughThickness: "strikethrough-thickness", strokeDashArray: "stroke-dasharray", strokeDashOffset: "stroke-dashoffset", strokeLineCap: "stroke-linecap", strokeLineJoin: "stroke-linejoin", strokeMiterLimit: "stroke-miterlimit", strokeOpacity: "stroke-opacity", strokeWidth: "stroke-width", tabIndex: "tabindex", textAnchor: "text-anchor", textDecoration: "text-decoration", textRendering: "text-rendering", transformOrigin: "transform-origin", typeOf: "typeof", underlinePosition: "underline-position", underlineThickness: "underline-thickness", unicodeBidi: "unicode-bidi", unicodeRange: "unicode-range", unitsPerEm: "units-per-em", vAlphabetic: "v-alphabetic", vHanging: "v-hanging", vIdeographic: "v-ideographic", vMathematical: "v-mathematical", vectorEffect: "vector-effect", vertAdvY: "vert-adv-y", vertOriginX: "vert-origin-x", vertOriginY: "vert-origin-y", wordSpacing: "word-spacing", writingMode: "writing-mode", xHeight: "x-height", playbackOrder: "playbackorder", timelineBegin: "timelinebegin" }, properties: { about: k, accentHeight: y, accumulate: null, additive: null, alignmentBaseline: null, alphabetic: y, amplitude: y, arabicForm: null, ascent: y, attributeName: null, attributeType: null, azimuth: y, bandwidth: null, baselineShift: null, baseFrequency: null, baseProfile: null, bbox: null, begin: null, bias: y, by: null, calcMode: null, capHeight: y, className: b, clip: null, clipPath: null, clipPathUnits: null, clipRule: null, color: null, colorInterpolation: null, colorInterpolationFilters: null, colorProfile: null, colorRendering: null, content: null, contentScriptType: null, contentStyleType: null, crossOrigin: null, cursor: null, cx: null, cy: null, d: null, dataType: null, defaultAction: null, descent: y, diffuseConstant: y, direction: null, display: null, dur: null, divisor: y, dominantBaseline: null, download: h, dx: null, dy: null, edgeMode: null, editable: null, elevation: y, enableBackground: null, end: null, event: null, exponent: y, externalResourcesRequired: null, fill: null, fillOpacity: y, fillRule: null, filter: null, filterRes: null, filterUnits: null, floodColor: null, floodOpacity: null, focusable: null, focusHighlight: null, fontFamily: null, fontSize: null, fontSizeAdjust: null, fontStretch: null, fontStyle: null, fontVariant: null, fontWeight: null, format: null, fr: null, from: null, fx: null, fy: null, g1: v, g2: v, glyphName: v, glyphOrientationHorizontal: null, glyphOrientationVertical: null, glyphRef: null, gradientTransform: null, gradientUnits: null, handler: null, hanging: y, hatchContentUnits: null, hatchUnits: null, height: null, href: null, hrefLang: null, horizAdvX: y, horizOriginX: y, horizOriginY: y, id: null, ideographic: y, imageRendering: null, initialVisibility: null, in: null, in2: null, intercept: y, k: y, k1: y, k2: y, k3: y, k4: y, kernelMatrix: k, kernelUnitLength: null, keyPoints: null, keySplines: null, keyTimes: null, kerning: null, lang: null, lengthAdjust: null, letterSpacing: null, lightingColor: null, limitingConeAngle: y, local: null, markerEnd: null, markerMid: null, markerStart: null, markerHeight: null, markerUnits: null, markerWidth: null, mask: null, maskContentUnits: null, maskUnits: null, mathematical: null, max: null, media: null, mediaCharacterEncoding: null, mediaContentEncodings: null, mediaSize: y, mediaTime: null, method: null, min: null, mode: null, name: null, navDown: null, navDownLeft: null, navDownRight: null, navLeft: null, navNext: null, navPrev: null, navRight: null, navUp: null, navUpLeft: null, navUpRight: null, numOctaves: null, observer: null, offset: null, onAbort: null, onActivate: null, onAfterPrint: null, onBeforePrint: null, onBegin: null, onCancel: null, onCanPlay: null, onCanPlayThrough: null, onChange: null, onClick: null, onClose: null, onCopy: null, onCueChange: null, onCut: null, onDblClick: null, onDrag: null, onDragEnd: null, onDragEnter: null, onDragExit: null, onDragLeave: null, onDragOver: null, onDragStart: null, onDrop: null, onDurationChange: null, onEmptied: null, onEnd: null, onEnded: null, onError: null, onFocus: null, onFocusIn: null, onFocusOut: null, onHashChange: null, onInput: null, onInvalid: null, onKeyDown: null, onKeyPress: null, onKeyUp: null, onLoad: null, onLoadedData: null, onLoadedMetadata: null, onLoadStart: null, onMessage: null, onMouseDown: null, onMouseEnter: null, onMouseLeave: null, onMouseMove: null, onMouseOut: null, onMouseOver: null, onMouseUp: null, onMouseWheel: null, onOffline: null, onOnline: null, onPageHide: null, onPageShow: null, onPaste: null, onPause: null, onPlay: null, onPlaying: null, onPopState: null, onProgress: null, onRateChange: null, onRepeat: null, onReset: null, onResize: null, onScroll: null, onSeeked: null, onSeeking: null, onSelect: null, onShow: null, onStalled: null, onStorage: null, onSubmit: null, onSuspend: null, onTimeUpdate: null, onToggle: null, onUnload: null, onVolumeChange: null, onWaiting: null, onZoom: null, opacity: null, operator: null, order: null, orient: null, orientation: null, origin: null, overflow: null, overlay: null, overlinePosition: y, overlineThickness: y, paintOrder: null, panose1: null, path: null, pathLength: y, patternContentUnits: null, patternTransform: null, patternUnits: null, phase: null, ping: b, pitch: null, playbackOrder: null, pointerEvents: null, points: null, pointsAtX: y, pointsAtY: y, pointsAtZ: y, preserveAlpha: null, preserveAspectRatio: null, primitiveUnits: null, propagate: null, property: k, r: null, radius: null, referrerPolicy: null, refX: null, refY: null, rel: k, rev: k, renderingIntent: null, repeatCount: null, repeatDur: null, requiredExtensions: k, requiredFeatures: k, requiredFonts: k, requiredFormats: k, resource: null, restart: null, result: null, rotate: null, rx: null, ry: null, scale: null, seed: null, shapeRendering: null, side: null, slope: null, snapshotTime: null, specularConstant: y, specularExponent: y, spreadMethod: null, spacing: null, startOffset: null, stdDeviation: null, stemh: null, stemv: null, stitchTiles: null, stopColor: null, stopOpacity: null, strikethroughPosition: y, strikethroughThickness: y, string: null, stroke: null, strokeDashArray: k, strokeDashOffset: null, strokeLineCap: null, strokeLineJoin: null, strokeMiterLimit: y, strokeOpacity: y, strokeWidth: null, style: null, surfaceScale: y, syncBehavior: null, syncBehaviorDefault: null, syncMaster: null, syncTolerance: null, syncToleranceDefault: null, systemLanguage: k, tabIndex: y, tableValues: null, target: null, targetX: y, targetY: y, textAnchor: null, textDecoration: null, textRendering: null, textLength: null, timelineBegin: null, title: null, transformBehavior: null, type: null, typeOf: k, to: null, transform: null, transformOrigin: null, u1: null, u2: null, underlinePosition: y, underlineThickness: y, unicode: null, unicodeBidi: null, unicodeRange: null, unitsPerEm: y, values: null, vAlphabetic: y, vMathematical: y, vectorEffect: null, vHanging: y, vIdeographic: y, version: null, vertAdvY: y, vertOriginX: y, vertOriginY: y, viewBox: null, viewTarget: null, visibility: null, width: null, widths: null, wordSpacing: null, writingMode: null, x: null, x1: null, x2: null, xChannelSelector: null, xHeight: y, y: null, y1: null, y2: null, yChannelSelector: null, z: null, zoomAndPan: null }, space: "svg", transform: caseSensitiveTransform }), E = create({ properties: { xLinkActuate: null, xLinkArcRole: null, xLinkHref: null, xLinkRole: null, xLinkShow: null, xLinkTitle: null, xLinkType: null }, space: "xlink", transform: (e, t) => "xlink:" + t.slice(5).toLowerCase() }), O = create({ attributes: { xmlnsxlink: "xmlns:xlink" }, properties: { xmlnsXLink: null, xmlns: null }, space: "xmlns", transform: caseInsensitiveTransform }), I = create({ properties: { xmlBase: null, xmlLang: null, xmlSpace: null }, space: "xml", transform: (e, t) => "xml:" + t.slice(3).toLowerCase() }), A = { classId: "classID", dataType: "datatype", itemId: "itemID", strokeDashArray: "strokeDasharray", strokeDashOffset: "strokeDashoffset", strokeLineCap: "strokeLinecap", strokeLineJoin: "strokeLinejoin", strokeMiterLimit: "strokeMiterlimit", typeOf: "typeof", xLinkActuate: "xlinkActuate", xLinkArcRole: "xlinkArcrole", xLinkHref: "xlinkHref", xLinkRole: "xlinkRole", xLinkShow: "xlinkShow", xLinkTitle: "xlinkTitle", xLinkType: "xlinkType", xmlnsXLink: "xmlnsXlink" }, D = /[A-Z]/g, R = /-[a-z]/g, P = /^data[-\w.:]+$/i;
function kebab(e) {
  return "-" + e.toLowerCase();
}
function camelcase(e) {
  return e.charAt(1).toUpperCase();
}
const L = merge$1([S, _, E, O, I], "html"), T = merge$1([S, C, E, O, I], "svg");
var z = {}, j = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, M = /\n/g, q = /^\s*/, F = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, N = /^:\s*/, B = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, H = /^[;\s]*/, W = /^\s+|\s+$/g, U = "";
function trim(e) {
  return e ? e.replace(W, U) : U;
}
var $ = z && z.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(z, "__esModule", { value: true });
var V = z.default = function(e, t) {
  var n = null;
  if (!e || "string" != typeof e) return n;
  var o = (0, G.default)(e), i = "function" == typeof t;
  return o.forEach(function(e2) {
    if ("declaration" === e2.type) {
      var o2 = e2.property, a = e2.value;
      i ? t(o2, a, e2) : a && ((n = n || {})[o2] = a);
    }
  }), n;
}, G = $(function(e, t) {
  if ("string" != typeof e) throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, o = 1;
  function updatePosition(e2) {
    var t2 = e2.match(M);
    t2 && (n += t2.length);
    var i = e2.lastIndexOf("\n");
    o = ~i ? e2.length - i : o + e2.length;
  }
  function position2() {
    var e2 = { line: n, column: o };
    return function(t2) {
      return t2.position = new Position(e2), whitespace(), t2;
    };
  }
  function Position(e2) {
    this.start = e2, this.end = { line: n, column: o }, this.source = t.source;
  }
  function error(i) {
    var a = new Error(t.source + ":" + n + ":" + o + ": " + i);
    if (a.reason = i, a.filename = t.source, a.line = n, a.column = o, a.source = e, !t.silent) throw a;
  }
  function match(t2) {
    var n2 = t2.exec(e);
    if (n2) {
      var o2 = n2[0];
      return updatePosition(o2), e = e.slice(o2.length), n2;
    }
  }
  function whitespace() {
    match(q);
  }
  function comments(e2) {
    var t2;
    for (e2 = e2 || []; t2 = comment(); ) false !== t2 && e2.push(t2);
    return e2;
  }
  function comment() {
    var t2 = position2();
    if ("/" == e.charAt(0) && "*" == e.charAt(1)) {
      for (var n2 = 2; U != e.charAt(n2) && ("*" != e.charAt(n2) || "/" != e.charAt(n2 + 1)); ) ++n2;
      if (n2 += 2, U === e.charAt(n2 - 1)) return error("End of comment missing");
      var i = e.slice(2, n2 - 2);
      return o += 2, updatePosition(i), e = e.slice(n2), o += 2, t2({ type: "comment", comment: i });
    }
  }
  function declaration() {
    var e2 = position2(), t2 = match(F);
    if (t2) {
      if (comment(), !match(N)) return error("property missing ':'");
      var n2 = match(B), o2 = e2({ type: "declaration", property: trim(t2[0].replace(j, U)), value: n2 ? trim(n2[0].replace(j, U)) : U });
      return match(H), o2;
    }
  }
  return Position.prototype.content = e, whitespace(), function() {
    var e2, t2 = [];
    for (comments(t2); e2 = declaration(); ) false !== e2 && (t2.push(e2), comments(t2));
    return t2;
  }();
});
const K = V.default || V, Y = getDefaultExportFromNamespaceIfNotNamed(Object.freeze(Object.defineProperty({ __proto__: null, default: K }, Symbol.toStringTag, { value: "Module" })));
var X = {};
Object.defineProperty(X, "__esModule", { value: true }), X.camelCase = void 0;
var Q = /^--[a-zA-Z0-9_-]+$/, Z = /-([a-z])/g, J = /^[^-]+$/, ee = /^-(webkit|moz|ms|o|khtml)-/, te = /^-(ms)-/, capitalize = function(e, t) {
  return t.toUpperCase();
}, trimHyphen = function(e, t) {
  return "".concat(t, "-");
};
X.camelCase = function(e, t) {
  return void 0 === t && (t = {}), function(e2) {
    return !e2 || J.test(e2) || Q.test(e2);
  }(e) ? e : (e = e.toLowerCase(), (e = t.reactCompat ? e.replace(te, trimHyphen) : e.replace(ee, trimHyphen)).replace(Z, capitalize));
};
var ne = (oe && oe.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
})(Y), re = X;
function StyleToJS(e, t) {
  var n = {};
  return e && "string" == typeof e ? ((0, ne.default)(e, function(e2, o) {
    e2 && o && (n[(0, re.camelCase)(e2, t)] = o);
  }), n) : n;
}
StyleToJS.default = StyleToJS;
var oe = StyleToJS;
const ie = getDefaultExportFromCjs(oe), ae = point$2("end"), se = point$2("start");
function point$2(e) {
  return function(t) {
    const n = t && t.position && t.position[e] || {};
    if ("number" == typeof n.line && n.line > 0 && "number" == typeof n.column && n.column > 0) return { line: n.line, column: n.column, offset: "number" == typeof n.offset && n.offset > -1 ? n.offset : void 0 };
  };
}
function stringifyPosition(e) {
  return e && "object" == typeof e ? "position" in e || "type" in e ? position(e.position) : "start" in e || "end" in e ? position(e) : "line" in e || "column" in e ? point$1(e) : "" : "";
}
function point$1(e) {
  return index(e && e.line) + ":" + index(e && e.column);
}
function position(e) {
  return point$1(e && e.start) + "-" + point$1(e && e.end);
}
function index(e) {
  return e && "number" == typeof e ? e : 1;
}
class VFileMessage extends Error {
  constructor(e, t, n) {
    super(), "string" == typeof t && (n = t, t = void 0);
    let o = "", i = {}, a = false;
    if (t && (i = "line" in t && "column" in t || "start" in t && "end" in t ? { place: t } : "type" in t ? { ancestors: [t], place: t.position } : { ...t }), "string" == typeof e ? o = e : !i.cause && e && (a = true, o = e.message, i.cause = e), !i.ruleId && !i.source && "string" == typeof n) {
      const e2 = n.indexOf(":");
      -1 === e2 ? i.ruleId = n : (i.source = n.slice(0, e2), i.ruleId = n.slice(e2 + 1));
    }
    if (!i.place && i.ancestors && i.ancestors) {
      const e2 = i.ancestors[i.ancestors.length - 1];
      e2 && (i.place = e2.position);
    }
    const s = i.place && "start" in i.place ? i.place.start : i.place;
    this.ancestors = i.ancestors || void 0, this.cause = i.cause || void 0, this.column = s ? s.column : void 0, this.fatal = void 0, this.file = "", this.message = o, this.line = s ? s.line : void 0, this.name = stringifyPosition(i.place) || "1:1", this.place = i.place || void 0, this.reason = this.message, this.ruleId = i.ruleId || void 0, this.source = i.source || void 0, this.stack = a && i.cause && "string" == typeof i.cause.stack ? i.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
VFileMessage.prototype.file = "", VFileMessage.prototype.name = "", VFileMessage.prototype.reason = "", VFileMessage.prototype.message = "", VFileMessage.prototype.stack = "", VFileMessage.prototype.column = void 0, VFileMessage.prototype.line = void 0, VFileMessage.prototype.ancestors = void 0, VFileMessage.prototype.cause = void 0, VFileMessage.prototype.fatal = void 0, VFileMessage.prototype.place = void 0, VFileMessage.prototype.ruleId = void 0, VFileMessage.prototype.source = void 0;
const le = {}.hasOwnProperty, ue = /* @__PURE__ */ new Map(), ce = /[A-Z]/g, fe = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), pe = /* @__PURE__ */ new Set(["td", "th"]), de = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function toJsxRuntime(e, t) {
  if (!t || void 0 === t.Fragment) throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let o;
  if (t.development) {
    if ("function" != typeof t.jsxDEV) throw new TypeError("Expected `jsxDEV` in options when `development: true`");
    o = /* @__PURE__ */ function(e2, t2) {
      return create2;
      function create2(n2, o2, i2, a2) {
        const s = Array.isArray(i2.children), l2 = se(n2);
        return t2(o2, i2, a2, s, { columnNumber: l2 ? l2.column - 1 : void 0, fileName: e2, lineNumber: l2 ? l2.line : void 0 }, void 0);
      }
    }(n, t.jsxDEV);
  } else {
    if ("function" != typeof t.jsx) throw new TypeError("Expected `jsx` in production options");
    if ("function" != typeof t.jsxs) throw new TypeError("Expected `jsxs` in production options");
    o = /* @__PURE__ */ function(e2, t2, n2) {
      return create2;
      function create2(e3, o2, i2, a2) {
        const s = Array.isArray(i2.children) ? n2 : t2;
        return a2 ? s(o2, i2, a2) : s(o2, i2);
      }
    }(0, t.jsx, t.jsxs);
  }
  const i = { Fragment: t.Fragment, ancestors: [], components: t.components || {}, create: o, elementAttributeNameCase: t.elementAttributeNameCase || "react", evaluater: t.createEvaluater ? t.createEvaluater() : void 0, filePath: n, ignoreInvalidStyle: t.ignoreInvalidStyle || false, passKeys: false !== t.passKeys, passNode: t.passNode || false, schema: "svg" === t.space ? T : L, stylePropertyNameCase: t.stylePropertyNameCase || "dom", tableCellAlignToStyle: false !== t.tableCellAlignToStyle }, a = one$1(i, e, void 0);
  return a && "string" != typeof a ? a : i.create(e, i.Fragment, { children: a || void 0 }, void 0);
}
function one$1(e, t, n) {
  return "element" === t.type ? function(e2, t2, n2) {
    const o = e2.schema;
    let i = o;
    "svg" === t2.tagName.toLowerCase() && "html" === o.space && (i = T, e2.schema = i);
    e2.ancestors.push(t2);
    const a = findComponentFromName(e2, t2.tagName, false), s = function(e3, t3) {
      const n3 = {};
      let o2, i2;
      for (i2 in t3.properties) if ("children" !== i2 && le.call(t3.properties, i2)) {
        const a2 = createProperty(e3, i2, t3.properties[i2]);
        if (a2) {
          const [i3, s2] = a2;
          e3.tableCellAlignToStyle && "align" === i3 && "string" == typeof s2 && pe.has(t3.tagName) ? o2 = s2 : n3[i3] = s2;
        }
      }
      if (o2) {
        (n3.style || (n3.style = {}))["css" === e3.stylePropertyNameCase ? "text-align" : "textAlign"] = o2;
      }
      return n3;
    }(e2, t2);
    let l2 = createChildren(e2, t2);
    fe.has(t2.tagName) && (l2 = l2.filter(function(e3) {
      return "string" != typeof e3 || !("object" == typeof (t3 = e3) ? "text" === t3.type && empty$1(t3.value) : empty$1(t3));
      var t3;
    }));
    return addNode(e2, s, a, t2), addChildren(s, l2), e2.ancestors.pop(), e2.schema = o, e2.create(t2, a, s, n2);
  }(e, t, n) : "mdxFlowExpression" === t.type || "mdxTextExpression" === t.type ? function(e2, t2) {
    if (t2.data && t2.data.estree && e2.evaluater) {
      const n2 = t2.data.estree.body[0];
      return n2.type, e2.evaluater.evaluateExpression(n2.expression);
    }
    crashEstree(e2, t2.position);
  }(e, t) : "mdxJsxFlowElement" === t.type || "mdxJsxTextElement" === t.type ? function(e2, t2, n2) {
    const o = e2.schema;
    let i = o;
    "svg" === t2.name && "html" === o.space && (i = T, e2.schema = i);
    e2.ancestors.push(t2);
    const a = null === t2.name ? e2.Fragment : findComponentFromName(e2, t2.name, true), s = function(e3, t3) {
      const n3 = {};
      for (const o2 of t3.attributes) if ("mdxJsxExpressionAttribute" === o2.type) if (o2.data && o2.data.estree && e3.evaluater) {
        const t4 = o2.data.estree.body[0];
        ok$1(t4.type);
        const i2 = t4.expression;
        ok$1(i2.type);
        const a2 = i2.properties[0];
        ok$1(a2.type), Object.assign(n3, e3.evaluater.evaluateExpression(a2.argument));
      } else crashEstree(e3, t3.position);
      else {
        const i2 = o2.name;
        let a2;
        if (o2.value && "object" == typeof o2.value) if (o2.value.data && o2.value.data.estree && e3.evaluater) {
          const t4 = o2.value.data.estree.body[0];
          ok$1(t4.type), a2 = e3.evaluater.evaluateExpression(t4.expression);
        } else crashEstree(e3, t3.position);
        else a2 = null === o2.value || o2.value;
        n3[i2] = a2;
      }
      return n3;
    }(e2, t2), l2 = createChildren(e2, t2);
    return addNode(e2, s, a, t2), addChildren(s, l2), e2.ancestors.pop(), e2.schema = o, e2.create(t2, a, s, n2);
  }(e, t, n) : "mdxjsEsm" === t.type ? function(e2, t2) {
    if (t2.data && t2.data.estree && e2.evaluater) return e2.evaluater.evaluateProgram(t2.data.estree);
    crashEstree(e2, t2.position);
  }(e, t) : "root" === t.type ? function(e2, t2, n2) {
    const o = {};
    return addChildren(o, createChildren(e2, t2)), e2.create(t2, e2.Fragment, o, n2);
  }(e, t, n) : "text" === t.type ? function(e2, t2) {
    return t2.value;
  }(0, t) : void 0;
}
function addNode(e, t, n, o) {
  "string" != typeof n && n !== e.Fragment && e.passNode && (t.node = o);
}
function addChildren(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function createChildren(e, t) {
  const n = [];
  let o = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : ue;
  for (; ++o < t.children.length; ) {
    const a = t.children[o];
    let s;
    if (e.passKeys) {
      const e2 = "element" === a.type ? a.tagName : "mdxJsxFlowElement" === a.type || "mdxJsxTextElement" === a.type ? a.name : void 0;
      if (e2) {
        const t2 = i.get(e2) || 0;
        s = e2 + "-" + t2, i.set(e2, t2 + 1);
      }
    }
    const l2 = one$1(e, a, s);
    void 0 !== l2 && n.push(l2);
  }
  return n;
}
function createProperty(e, t, n) {
  const o = function(e2, t2) {
    const n2 = normalize$1(t2);
    let o2 = t2, i = Info;
    if (n2 in e2.normal) return e2.property[e2.normal[n2]];
    if (n2.length > 4 && "data" === n2.slice(0, 4) && P.test(t2)) {
      if ("-" === t2.charAt(4)) {
        const e3 = t2.slice(5).replace(R, camelcase);
        o2 = "data" + e3.charAt(0).toUpperCase() + e3.slice(1);
      } else {
        const e3 = t2.slice(4);
        if (!R.test(e3)) {
          let n3 = e3.replace(D, kebab);
          "-" !== n3.charAt(0) && (n3 = "-" + n3), t2 = "data" + n3;
        }
      }
      i = DefinedInfo;
    }
    return new i(o2, t2);
  }(e.schema, t);
  if (!(null == n || "number" == typeof n && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = o.commaSeparated ? function(e2) {
      const t2 = {};
      return ("" === e2[e2.length - 1] ? [...e2, ""] : e2).join((t2.padRight ? " " : "") + "," + (false === t2.padLeft ? "" : " ")).trim();
    }(n) : n.join(" ").trim()), "style" === o.property) {
      let t2 = "object" == typeof n ? n : function(e2, t3) {
        try {
          return ie(t3, { reactCompat: true });
        } catch (t4) {
          if (e2.ignoreInvalidStyle) return {};
          const n2 = t4, o2 = new VFileMessage("Cannot parse `style` attribute", { ancestors: e2.ancestors, cause: n2, ruleId: "style", source: "hast-util-to-jsx-runtime" });
          throw o2.file = e2.filePath || void 0, o2.url = de + "#cannot-parse-style-attribute", o2;
        }
      }(e, String(n));
      return "css" === e.stylePropertyNameCase && (t2 = function(e2) {
        const t3 = {};
        let n2;
        for (n2 in e2) le.call(e2, n2) && (t3[transformStyleToCssCasing(n2)] = e2[n2]);
        return t3;
      }(t2)), ["style", t2];
    }
    return ["react" === e.elementAttributeNameCase && o.space ? A[o.property] || o.property : o.attribute, n];
  }
}
function findComponentFromName(e, t, n) {
  let o;
  if (n) if (t.includes(".")) {
    const e2 = t.split(".");
    let n2, i = -1;
    for (; ++i < e2.length; ) {
      const t2 = name(e2[i]) ? { type: "Identifier", name: e2[i] } : { type: "Literal", value: e2[i] };
      n2 = n2 ? { type: "MemberExpression", object: n2, property: t2, computed: Boolean(i && "Literal" === t2.type), optional: false } : t2;
    }
    o = n2;
  } else o = name(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  else o = { type: "Literal", value: t };
  if ("Literal" === o.type) {
    const t2 = o.value;
    return le.call(e.components, t2) ? e.components[t2] : t2;
  }
  if (e.evaluater) return e.evaluater.evaluateExpression(o);
  crashEstree(e);
}
function crashEstree(e, t) {
  const n = new VFileMessage("Cannot handle MDX estrees without `createEvaluater`", { ancestors: e.ancestors, place: t, ruleId: "mdx-estree", source: "hast-util-to-jsx-runtime" });
  throw n.file = e.filePath || void 0, n.url = de + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function transformStyleToCssCasing(e) {
  let t = e.replace(ce, toDash);
  return "ms-" === t.slice(0, 3) && (t = "-" + t), t;
}
function toDash(e) {
  return "-" + e.toLowerCase();
}
const he = { action: ["form"], cite: ["blockquote", "del", "ins", "q"], data: ["object"], formAction: ["button", "input"], href: ["a", "area", "base", "link"], icon: ["menuitem"], itemId: null, manifest: ["html"], ping: ["a", "area"], poster: ["video"], src: ["audio", "embed", "iframe", "img", "input", "script", "source", "track", "video"] }, ge = {};
function toString$2(e, t) {
  return one(e, "boolean" != typeof ge.includeImageAlt || ge.includeImageAlt, "boolean" != typeof ge.includeHtml || ge.includeHtml);
}
function one(e, t, n) {
  if (function(e2) {
    return Boolean(e2 && "object" == typeof e2);
  }(e)) {
    if ("value" in e) return "html" !== e.type || n ? e.value : "";
    if (t && "alt" in e && e.alt) return e.alt;
    if ("children" in e) return all(e.children, t, n);
  }
  return Array.isArray(e) ? all(e, t, n) : "";
}
function all(e, t, n) {
  const o = [];
  let i = -1;
  for (; ++i < e.length; ) o[i] = one(e[i], t, n);
  return o.join("");
}
const me = { AElig: "Æ", AMP: "&", Aacute: "Á", Abreve: "Ă", Acirc: "Â", Acy: "А", Afr: "𝔄", Agrave: "À", Alpha: "Α", Amacr: "Ā", And: "⩓", Aogon: "Ą", Aopf: "𝔸", ApplyFunction: "⁡", Aring: "Å", Ascr: "𝒜", Assign: "≔", Atilde: "Ã", Auml: "Ä", Backslash: "∖", Barv: "⫧", Barwed: "⌆", Bcy: "Б", Because: "∵", Bernoullis: "ℬ", Beta: "Β", Bfr: "𝔅", Bopf: "𝔹", Breve: "˘", Bscr: "ℬ", Bumpeq: "≎", CHcy: "Ч", COPY: "©", Cacute: "Ć", Cap: "⋒", CapitalDifferentialD: "ⅅ", Cayleys: "ℭ", Ccaron: "Č", Ccedil: "Ç", Ccirc: "Ĉ", Cconint: "∰", Cdot: "Ċ", Cedilla: "¸", CenterDot: "·", Cfr: "ℭ", Chi: "Χ", CircleDot: "⊙", CircleMinus: "⊖", CirclePlus: "⊕", CircleTimes: "⊗", ClockwiseContourIntegral: "∲", CloseCurlyDoubleQuote: "”", CloseCurlyQuote: "’", Colon: "∷", Colone: "⩴", Congruent: "≡", Conint: "∯", ContourIntegral: "∮", Copf: "ℂ", Coproduct: "∐", CounterClockwiseContourIntegral: "∳", Cross: "⨯", Cscr: "𝒞", Cup: "⋓", CupCap: "≍", DD: "ⅅ", DDotrahd: "⤑", DJcy: "Ђ", DScy: "Ѕ", DZcy: "Џ", Dagger: "‡", Darr: "↡", Dashv: "⫤", Dcaron: "Ď", Dcy: "Д", Del: "∇", Delta: "Δ", Dfr: "𝔇", DiacriticalAcute: "´", DiacriticalDot: "˙", DiacriticalDoubleAcute: "˝", DiacriticalGrave: "`", DiacriticalTilde: "˜", Diamond: "⋄", DifferentialD: "ⅆ", Dopf: "𝔻", Dot: "¨", DotDot: "⃜", DotEqual: "≐", DoubleContourIntegral: "∯", DoubleDot: "¨", DoubleDownArrow: "⇓", DoubleLeftArrow: "⇐", DoubleLeftRightArrow: "⇔", DoubleLeftTee: "⫤", DoubleLongLeftArrow: "⟸", DoubleLongLeftRightArrow: "⟺", DoubleLongRightArrow: "⟹", DoubleRightArrow: "⇒", DoubleRightTee: "⊨", DoubleUpArrow: "⇑", DoubleUpDownArrow: "⇕", DoubleVerticalBar: "∥", DownArrow: "↓", DownArrowBar: "⤓", DownArrowUpArrow: "⇵", DownBreve: "̑", DownLeftRightVector: "⥐", DownLeftTeeVector: "⥞", DownLeftVector: "↽", DownLeftVectorBar: "⥖", DownRightTeeVector: "⥟", DownRightVector: "⇁", DownRightVectorBar: "⥗", DownTee: "⊤", DownTeeArrow: "↧", Downarrow: "⇓", Dscr: "𝒟", Dstrok: "Đ", ENG: "Ŋ", ETH: "Ð", Eacute: "É", Ecaron: "Ě", Ecirc: "Ê", Ecy: "Э", Edot: "Ė", Efr: "𝔈", Egrave: "È", Element: "∈", Emacr: "Ē", EmptySmallSquare: "◻", EmptyVerySmallSquare: "▫", Eogon: "Ę", Eopf: "𝔼", Epsilon: "Ε", Equal: "⩵", EqualTilde: "≂", Equilibrium: "⇌", Escr: "ℰ", Esim: "⩳", Eta: "Η", Euml: "Ë", Exists: "∃", ExponentialE: "ⅇ", Fcy: "Ф", Ffr: "𝔉", FilledSmallSquare: "◼", FilledVerySmallSquare: "▪", Fopf: "𝔽", ForAll: "∀", Fouriertrf: "ℱ", Fscr: "ℱ", GJcy: "Ѓ", GT: ">", Gamma: "Γ", Gammad: "Ϝ", Gbreve: "Ğ", Gcedil: "Ģ", Gcirc: "Ĝ", Gcy: "Г", Gdot: "Ġ", Gfr: "𝔊", Gg: "⋙", Gopf: "𝔾", GreaterEqual: "≥", GreaterEqualLess: "⋛", GreaterFullEqual: "≧", GreaterGreater: "⪢", GreaterLess: "≷", GreaterSlantEqual: "⩾", GreaterTilde: "≳", Gscr: "𝒢", Gt: "≫", HARDcy: "Ъ", Hacek: "ˇ", Hat: "^", Hcirc: "Ĥ", Hfr: "ℌ", HilbertSpace: "ℋ", Hopf: "ℍ", HorizontalLine: "─", Hscr: "ℋ", Hstrok: "Ħ", HumpDownHump: "≎", HumpEqual: "≏", IEcy: "Е", IJlig: "Ĳ", IOcy: "Ё", Iacute: "Í", Icirc: "Î", Icy: "И", Idot: "İ", Ifr: "ℑ", Igrave: "Ì", Im: "ℑ", Imacr: "Ī", ImaginaryI: "ⅈ", Implies: "⇒", Int: "∬", Integral: "∫", Intersection: "⋂", InvisibleComma: "⁣", InvisibleTimes: "⁢", Iogon: "Į", Iopf: "𝕀", Iota: "Ι", Iscr: "ℐ", Itilde: "Ĩ", Iukcy: "І", Iuml: "Ï", Jcirc: "Ĵ", Jcy: "Й", Jfr: "𝔍", Jopf: "𝕁", Jscr: "𝒥", Jsercy: "Ј", Jukcy: "Є", KHcy: "Х", KJcy: "Ќ", Kappa: "Κ", Kcedil: "Ķ", Kcy: "К", Kfr: "𝔎", Kopf: "𝕂", Kscr: "𝒦", LJcy: "Љ", LT: "<", Lacute: "Ĺ", Lambda: "Λ", Lang: "⟪", Laplacetrf: "ℒ", Larr: "↞", Lcaron: "Ľ", Lcedil: "Ļ", Lcy: "Л", LeftAngleBracket: "⟨", LeftArrow: "←", LeftArrowBar: "⇤", LeftArrowRightArrow: "⇆", LeftCeiling: "⌈", LeftDoubleBracket: "⟦", LeftDownTeeVector: "⥡", LeftDownVector: "⇃", LeftDownVectorBar: "⥙", LeftFloor: "⌊", LeftRightArrow: "↔", LeftRightVector: "⥎", LeftTee: "⊣", LeftTeeArrow: "↤", LeftTeeVector: "⥚", LeftTriangle: "⊲", LeftTriangleBar: "⧏", LeftTriangleEqual: "⊴", LeftUpDownVector: "⥑", LeftUpTeeVector: "⥠", LeftUpVector: "↿", LeftUpVectorBar: "⥘", LeftVector: "↼", LeftVectorBar: "⥒", Leftarrow: "⇐", Leftrightarrow: "⇔", LessEqualGreater: "⋚", LessFullEqual: "≦", LessGreater: "≶", LessLess: "⪡", LessSlantEqual: "⩽", LessTilde: "≲", Lfr: "𝔏", Ll: "⋘", Lleftarrow: "⇚", Lmidot: "Ŀ", LongLeftArrow: "⟵", LongLeftRightArrow: "⟷", LongRightArrow: "⟶", Longleftarrow: "⟸", Longleftrightarrow: "⟺", Longrightarrow: "⟹", Lopf: "𝕃", LowerLeftArrow: "↙", LowerRightArrow: "↘", Lscr: "ℒ", Lsh: "↰", Lstrok: "Ł", Lt: "≪", Map: "⤅", Mcy: "М", MediumSpace: " ", Mellintrf: "ℳ", Mfr: "𝔐", MinusPlus: "∓", Mopf: "𝕄", Mscr: "ℳ", Mu: "Μ", NJcy: "Њ", Nacute: "Ń", Ncaron: "Ň", Ncedil: "Ņ", Ncy: "Н", NegativeMediumSpace: "​", NegativeThickSpace: "​", NegativeThinSpace: "​", NegativeVeryThinSpace: "​", NestedGreaterGreater: "≫", NestedLessLess: "≪", NewLine: "\n", Nfr: "𝔑", NoBreak: "⁠", NonBreakingSpace: " ", Nopf: "ℕ", Not: "⫬", NotCongruent: "≢", NotCupCap: "≭", NotDoubleVerticalBar: "∦", NotElement: "∉", NotEqual: "≠", NotEqualTilde: "≂̸", NotExists: "∄", NotGreater: "≯", NotGreaterEqual: "≱", NotGreaterFullEqual: "≧̸", NotGreaterGreater: "≫̸", NotGreaterLess: "≹", NotGreaterSlantEqual: "⩾̸", NotGreaterTilde: "≵", NotHumpDownHump: "≎̸", NotHumpEqual: "≏̸", NotLeftTriangle: "⋪", NotLeftTriangleBar: "⧏̸", NotLeftTriangleEqual: "⋬", NotLess: "≮", NotLessEqual: "≰", NotLessGreater: "≸", NotLessLess: "≪̸", NotLessSlantEqual: "⩽̸", NotLessTilde: "≴", NotNestedGreaterGreater: "⪢̸", NotNestedLessLess: "⪡̸", NotPrecedes: "⊀", NotPrecedesEqual: "⪯̸", NotPrecedesSlantEqual: "⋠", NotReverseElement: "∌", NotRightTriangle: "⋫", NotRightTriangleBar: "⧐̸", NotRightTriangleEqual: "⋭", NotSquareSubset: "⊏̸", NotSquareSubsetEqual: "⋢", NotSquareSuperset: "⊐̸", NotSquareSupersetEqual: "⋣", NotSubset: "⊂⃒", NotSubsetEqual: "⊈", NotSucceeds: "⊁", NotSucceedsEqual: "⪰̸", NotSucceedsSlantEqual: "⋡", NotSucceedsTilde: "≿̸", NotSuperset: "⊃⃒", NotSupersetEqual: "⊉", NotTilde: "≁", NotTildeEqual: "≄", NotTildeFullEqual: "≇", NotTildeTilde: "≉", NotVerticalBar: "∤", Nscr: "𝒩", Ntilde: "Ñ", Nu: "Ν", OElig: "Œ", Oacute: "Ó", Ocirc: "Ô", Ocy: "О", Odblac: "Ő", Ofr: "𝔒", Ograve: "Ò", Omacr: "Ō", Omega: "Ω", Omicron: "Ο", Oopf: "𝕆", OpenCurlyDoubleQuote: "“", OpenCurlyQuote: "‘", Or: "⩔", Oscr: "𝒪", Oslash: "Ø", Otilde: "Õ", Otimes: "⨷", Ouml: "Ö", OverBar: "‾", OverBrace: "⏞", OverBracket: "⎴", OverParenthesis: "⏜", PartialD: "∂", Pcy: "П", Pfr: "𝔓", Phi: "Φ", Pi: "Π", PlusMinus: "±", Poincareplane: "ℌ", Popf: "ℙ", Pr: "⪻", Precedes: "≺", PrecedesEqual: "⪯", PrecedesSlantEqual: "≼", PrecedesTilde: "≾", Prime: "″", Product: "∏", Proportion: "∷", Proportional: "∝", Pscr: "𝒫", Psi: "Ψ", QUOT: '"', Qfr: "𝔔", Qopf: "ℚ", Qscr: "𝒬", RBarr: "⤐", REG: "®", Racute: "Ŕ", Rang: "⟫", Rarr: "↠", Rarrtl: "⤖", Rcaron: "Ř", Rcedil: "Ŗ", Rcy: "Р", Re: "ℜ", ReverseElement: "∋", ReverseEquilibrium: "⇋", ReverseUpEquilibrium: "⥯", Rfr: "ℜ", Rho: "Ρ", RightAngleBracket: "⟩", RightArrow: "→", RightArrowBar: "⇥", RightArrowLeftArrow: "⇄", RightCeiling: "⌉", RightDoubleBracket: "⟧", RightDownTeeVector: "⥝", RightDownVector: "⇂", RightDownVectorBar: "⥕", RightFloor: "⌋", RightTee: "⊢", RightTeeArrow: "↦", RightTeeVector: "⥛", RightTriangle: "⊳", RightTriangleBar: "⧐", RightTriangleEqual: "⊵", RightUpDownVector: "⥏", RightUpTeeVector: "⥜", RightUpVector: "↾", RightUpVectorBar: "⥔", RightVector: "⇀", RightVectorBar: "⥓", Rightarrow: "⇒", Ropf: "ℝ", RoundImplies: "⥰", Rrightarrow: "⇛", Rscr: "ℛ", Rsh: "↱", RuleDelayed: "⧴", SHCHcy: "Щ", SHcy: "Ш", SOFTcy: "Ь", Sacute: "Ś", Sc: "⪼", Scaron: "Š", Scedil: "Ş", Scirc: "Ŝ", Scy: "С", Sfr: "𝔖", ShortDownArrow: "↓", ShortLeftArrow: "←", ShortRightArrow: "→", ShortUpArrow: "↑", Sigma: "Σ", SmallCircle: "∘", Sopf: "𝕊", Sqrt: "√", Square: "□", SquareIntersection: "⊓", SquareSubset: "⊏", SquareSubsetEqual: "⊑", SquareSuperset: "⊐", SquareSupersetEqual: "⊒", SquareUnion: "⊔", Sscr: "𝒮", Star: "⋆", Sub: "⋐", Subset: "⋐", SubsetEqual: "⊆", Succeeds: "≻", SucceedsEqual: "⪰", SucceedsSlantEqual: "≽", SucceedsTilde: "≿", SuchThat: "∋", Sum: "∑", Sup: "⋑", Superset: "⊃", SupersetEqual: "⊇", Supset: "⋑", THORN: "Þ", TRADE: "™", TSHcy: "Ћ", TScy: "Ц", Tab: "	", Tau: "Τ", Tcaron: "Ť", Tcedil: "Ţ", Tcy: "Т", Tfr: "𝔗", Therefore: "∴", Theta: "Θ", ThickSpace: "  ", ThinSpace: " ", Tilde: "∼", TildeEqual: "≃", TildeFullEqual: "≅", TildeTilde: "≈", Topf: "𝕋", TripleDot: "⃛", Tscr: "𝒯", Tstrok: "Ŧ", Uacute: "Ú", Uarr: "↟", Uarrocir: "⥉", Ubrcy: "Ў", Ubreve: "Ŭ", Ucirc: "Û", Ucy: "У", Udblac: "Ű", Ufr: "𝔘", Ugrave: "Ù", Umacr: "Ū", UnderBar: "_", UnderBrace: "⏟", UnderBracket: "⎵", UnderParenthesis: "⏝", Union: "⋃", UnionPlus: "⊎", Uogon: "Ų", Uopf: "𝕌", UpArrow: "↑", UpArrowBar: "⤒", UpArrowDownArrow: "⇅", UpDownArrow: "↕", UpEquilibrium: "⥮", UpTee: "⊥", UpTeeArrow: "↥", Uparrow: "⇑", Updownarrow: "⇕", UpperLeftArrow: "↖", UpperRightArrow: "↗", Upsi: "ϒ", Upsilon: "Υ", Uring: "Ů", Uscr: "𝒰", Utilde: "Ũ", Uuml: "Ü", VDash: "⊫", Vbar: "⫫", Vcy: "В", Vdash: "⊩", Vdashl: "⫦", Vee: "⋁", Verbar: "‖", Vert: "‖", VerticalBar: "∣", VerticalLine: "|", VerticalSeparator: "❘", VerticalTilde: "≀", VeryThinSpace: " ", Vfr: "𝔙", Vopf: "𝕍", Vscr: "𝒱", Vvdash: "⊪", Wcirc: "Ŵ", Wedge: "⋀", Wfr: "𝔚", Wopf: "𝕎", Wscr: "𝒲", Xfr: "𝔛", Xi: "Ξ", Xopf: "𝕏", Xscr: "𝒳", YAcy: "Я", YIcy: "Ї", YUcy: "Ю", Yacute: "Ý", Ycirc: "Ŷ", Ycy: "Ы", Yfr: "𝔜", Yopf: "𝕐", Yscr: "𝒴", Yuml: "Ÿ", ZHcy: "Ж", Zacute: "Ź", Zcaron: "Ž", Zcy: "З", Zdot: "Ż", ZeroWidthSpace: "​", Zeta: "Ζ", Zfr: "ℨ", Zopf: "ℤ", Zscr: "𝒵", aacute: "á", abreve: "ă", ac: "∾", acE: "∾̳", acd: "∿", acirc: "â", acute: "´", acy: "а", aelig: "æ", af: "⁡", afr: "𝔞", agrave: "à", alefsym: "ℵ", aleph: "ℵ", alpha: "α", amacr: "ā", amalg: "⨿", amp: "&", and: "∧", andand: "⩕", andd: "⩜", andslope: "⩘", andv: "⩚", ang: "∠", ange: "⦤", angle: "∠", angmsd: "∡", angmsdaa: "⦨", angmsdab: "⦩", angmsdac: "⦪", angmsdad: "⦫", angmsdae: "⦬", angmsdaf: "⦭", angmsdag: "⦮", angmsdah: "⦯", angrt: "∟", angrtvb: "⊾", angrtvbd: "⦝", angsph: "∢", angst: "Å", angzarr: "⍼", aogon: "ą", aopf: "𝕒", ap: "≈", apE: "⩰", apacir: "⩯", ape: "≊", apid: "≋", apos: "'", approx: "≈", approxeq: "≊", aring: "å", ascr: "𝒶", ast: "*", asymp: "≈", asympeq: "≍", atilde: "ã", auml: "ä", awconint: "∳", awint: "⨑", bNot: "⫭", backcong: "≌", backepsilon: "϶", backprime: "‵", backsim: "∽", backsimeq: "⋍", barvee: "⊽", barwed: "⌅", barwedge: "⌅", bbrk: "⎵", bbrktbrk: "⎶", bcong: "≌", bcy: "б", bdquo: "„", becaus: "∵", because: "∵", bemptyv: "⦰", bepsi: "϶", bernou: "ℬ", beta: "β", beth: "ℶ", between: "≬", bfr: "𝔟", bigcap: "⋂", bigcirc: "◯", bigcup: "⋃", bigodot: "⨀", bigoplus: "⨁", bigotimes: "⨂", bigsqcup: "⨆", bigstar: "★", bigtriangledown: "▽", bigtriangleup: "△", biguplus: "⨄", bigvee: "⋁", bigwedge: "⋀", bkarow: "⤍", blacklozenge: "⧫", blacksquare: "▪", blacktriangle: "▴", blacktriangledown: "▾", blacktriangleleft: "◂", blacktriangleright: "▸", blank: "␣", blk12: "▒", blk14: "░", blk34: "▓", block: "█", bne: "=⃥", bnequiv: "≡⃥", bnot: "⌐", bopf: "𝕓", bot: "⊥", bottom: "⊥", bowtie: "⋈", boxDL: "╗", boxDR: "╔", boxDl: "╖", boxDr: "╓", boxH: "═", boxHD: "╦", boxHU: "╩", boxHd: "╤", boxHu: "╧", boxUL: "╝", boxUR: "╚", boxUl: "╜", boxUr: "╙", boxV: "║", boxVH: "╬", boxVL: "╣", boxVR: "╠", boxVh: "╫", boxVl: "╢", boxVr: "╟", boxbox: "⧉", boxdL: "╕", boxdR: "╒", boxdl: "┐", boxdr: "┌", boxh: "─", boxhD: "╥", boxhU: "╨", boxhd: "┬", boxhu: "┴", boxminus: "⊟", boxplus: "⊞", boxtimes: "⊠", boxuL: "╛", boxuR: "╘", boxul: "┘", boxur: "└", boxv: "│", boxvH: "╪", boxvL: "╡", boxvR: "╞", boxvh: "┼", boxvl: "┤", boxvr: "├", bprime: "‵", breve: "˘", brvbar: "¦", bscr: "𝒷", bsemi: "⁏", bsim: "∽", bsime: "⋍", bsol: "\\", bsolb: "⧅", bsolhsub: "⟈", bull: "•", bullet: "•", bump: "≎", bumpE: "⪮", bumpe: "≏", bumpeq: "≏", cacute: "ć", cap: "∩", capand: "⩄", capbrcup: "⩉", capcap: "⩋", capcup: "⩇", capdot: "⩀", caps: "∩︀", caret: "⁁", caron: "ˇ", ccaps: "⩍", ccaron: "č", ccedil: "ç", ccirc: "ĉ", ccups: "⩌", ccupssm: "⩐", cdot: "ċ", cedil: "¸", cemptyv: "⦲", cent: "¢", centerdot: "·", cfr: "𝔠", chcy: "ч", check: "✓", checkmark: "✓", chi: "χ", cir: "○", cirE: "⧃", circ: "ˆ", circeq: "≗", circlearrowleft: "↺", circlearrowright: "↻", circledR: "®", circledS: "Ⓢ", circledast: "⊛", circledcirc: "⊚", circleddash: "⊝", cire: "≗", cirfnint: "⨐", cirmid: "⫯", cirscir: "⧂", clubs: "♣", clubsuit: "♣", colon: ":", colone: "≔", coloneq: "≔", comma: ",", commat: "@", comp: "∁", compfn: "∘", complement: "∁", complexes: "ℂ", cong: "≅", congdot: "⩭", conint: "∮", copf: "𝕔", coprod: "∐", copy: "©", copysr: "℗", crarr: "↵", cross: "✗", cscr: "𝒸", csub: "⫏", csube: "⫑", csup: "⫐", csupe: "⫒", ctdot: "⋯", cudarrl: "⤸", cudarrr: "⤵", cuepr: "⋞", cuesc: "⋟", cularr: "↶", cularrp: "⤽", cup: "∪", cupbrcap: "⩈", cupcap: "⩆", cupcup: "⩊", cupdot: "⊍", cupor: "⩅", cups: "∪︀", curarr: "↷", curarrm: "⤼", curlyeqprec: "⋞", curlyeqsucc: "⋟", curlyvee: "⋎", curlywedge: "⋏", curren: "¤", curvearrowleft: "↶", curvearrowright: "↷", cuvee: "⋎", cuwed: "⋏", cwconint: "∲", cwint: "∱", cylcty: "⌭", dArr: "⇓", dHar: "⥥", dagger: "†", daleth: "ℸ", darr: "↓", dash: "‐", dashv: "⊣", dbkarow: "⤏", dblac: "˝", dcaron: "ď", dcy: "д", dd: "ⅆ", ddagger: "‡", ddarr: "⇊", ddotseq: "⩷", deg: "°", delta: "δ", demptyv: "⦱", dfisht: "⥿", dfr: "𝔡", dharl: "⇃", dharr: "⇂", diam: "⋄", diamond: "⋄", diamondsuit: "♦", diams: "♦", die: "¨", digamma: "ϝ", disin: "⋲", div: "÷", divide: "÷", divideontimes: "⋇", divonx: "⋇", djcy: "ђ", dlcorn: "⌞", dlcrop: "⌍", dollar: "$", dopf: "𝕕", dot: "˙", doteq: "≐", doteqdot: "≑", dotminus: "∸", dotplus: "∔", dotsquare: "⊡", doublebarwedge: "⌆", downarrow: "↓", downdownarrows: "⇊", downharpoonleft: "⇃", downharpoonright: "⇂", drbkarow: "⤐", drcorn: "⌟", drcrop: "⌌", dscr: "𝒹", dscy: "ѕ", dsol: "⧶", dstrok: "đ", dtdot: "⋱", dtri: "▿", dtrif: "▾", duarr: "⇵", duhar: "⥯", dwangle: "⦦", dzcy: "џ", dzigrarr: "⟿", eDDot: "⩷", eDot: "≑", eacute: "é", easter: "⩮", ecaron: "ě", ecir: "≖", ecirc: "ê", ecolon: "≕", ecy: "э", edot: "ė", ee: "ⅇ", efDot: "≒", efr: "𝔢", eg: "⪚", egrave: "è", egs: "⪖", egsdot: "⪘", el: "⪙", elinters: "⏧", ell: "ℓ", els: "⪕", elsdot: "⪗", emacr: "ē", empty: "∅", emptyset: "∅", emptyv: "∅", emsp13: " ", emsp14: " ", emsp: " ", eng: "ŋ", ensp: " ", eogon: "ę", eopf: "𝕖", epar: "⋕", eparsl: "⧣", eplus: "⩱", epsi: "ε", epsilon: "ε", epsiv: "ϵ", eqcirc: "≖", eqcolon: "≕", eqsim: "≂", eqslantgtr: "⪖", eqslantless: "⪕", equals: "=", equest: "≟", equiv: "≡", equivDD: "⩸", eqvparsl: "⧥", erDot: "≓", erarr: "⥱", escr: "ℯ", esdot: "≐", esim: "≂", eta: "η", eth: "ð", euml: "ë", euro: "€", excl: "!", exist: "∃", expectation: "ℰ", exponentiale: "ⅇ", fallingdotseq: "≒", fcy: "ф", female: "♀", ffilig: "ﬃ", fflig: "ﬀ", ffllig: "ﬄ", ffr: "𝔣", filig: "ﬁ", fjlig: "fj", flat: "♭", fllig: "ﬂ", fltns: "▱", fnof: "ƒ", fopf: "𝕗", forall: "∀", fork: "⋔", forkv: "⫙", fpartint: "⨍", frac12: "½", frac13: "⅓", frac14: "¼", frac15: "⅕", frac16: "⅙", frac18: "⅛", frac23: "⅔", frac25: "⅖", frac34: "¾", frac35: "⅗", frac38: "⅜", frac45: "⅘", frac56: "⅚", frac58: "⅝", frac78: "⅞", frasl: "⁄", frown: "⌢", fscr: "𝒻", gE: "≧", gEl: "⪌", gacute: "ǵ", gamma: "γ", gammad: "ϝ", gap: "⪆", gbreve: "ğ", gcirc: "ĝ", gcy: "г", gdot: "ġ", ge: "≥", gel: "⋛", geq: "≥", geqq: "≧", geqslant: "⩾", ges: "⩾", gescc: "⪩", gesdot: "⪀", gesdoto: "⪂", gesdotol: "⪄", gesl: "⋛︀", gesles: "⪔", gfr: "𝔤", gg: "≫", ggg: "⋙", gimel: "ℷ", gjcy: "ѓ", gl: "≷", glE: "⪒", gla: "⪥", glj: "⪤", gnE: "≩", gnap: "⪊", gnapprox: "⪊", gne: "⪈", gneq: "⪈", gneqq: "≩", gnsim: "⋧", gopf: "𝕘", grave: "`", gscr: "ℊ", gsim: "≳", gsime: "⪎", gsiml: "⪐", gt: ">", gtcc: "⪧", gtcir: "⩺", gtdot: "⋗", gtlPar: "⦕", gtquest: "⩼", gtrapprox: "⪆", gtrarr: "⥸", gtrdot: "⋗", gtreqless: "⋛", gtreqqless: "⪌", gtrless: "≷", gtrsim: "≳", gvertneqq: "≩︀", gvnE: "≩︀", hArr: "⇔", hairsp: " ", half: "½", hamilt: "ℋ", hardcy: "ъ", harr: "↔", harrcir: "⥈", harrw: "↭", hbar: "ℏ", hcirc: "ĥ", hearts: "♥", heartsuit: "♥", hellip: "…", hercon: "⊹", hfr: "𝔥", hksearow: "⤥", hkswarow: "⤦", hoarr: "⇿", homtht: "∻", hookleftarrow: "↩", hookrightarrow: "↪", hopf: "𝕙", horbar: "―", hscr: "𝒽", hslash: "ℏ", hstrok: "ħ", hybull: "⁃", hyphen: "‐", iacute: "í", ic: "⁣", icirc: "î", icy: "и", iecy: "е", iexcl: "¡", iff: "⇔", ifr: "𝔦", igrave: "ì", ii: "ⅈ", iiiint: "⨌", iiint: "∭", iinfin: "⧜", iiota: "℩", ijlig: "ĳ", imacr: "ī", image: "ℑ", imagline: "ℐ", imagpart: "ℑ", imath: "ı", imof: "⊷", imped: "Ƶ", in: "∈", incare: "℅", infin: "∞", infintie: "⧝", inodot: "ı", int: "∫", intcal: "⊺", integers: "ℤ", intercal: "⊺", intlarhk: "⨗", intprod: "⨼", iocy: "ё", iogon: "į", iopf: "𝕚", iota: "ι", iprod: "⨼", iquest: "¿", iscr: "𝒾", isin: "∈", isinE: "⋹", isindot: "⋵", isins: "⋴", isinsv: "⋳", isinv: "∈", it: "⁢", itilde: "ĩ", iukcy: "і", iuml: "ï", jcirc: "ĵ", jcy: "й", jfr: "𝔧", jmath: "ȷ", jopf: "𝕛", jscr: "𝒿", jsercy: "ј", jukcy: "є", kappa: "κ", kappav: "ϰ", kcedil: "ķ", kcy: "к", kfr: "𝔨", kgreen: "ĸ", khcy: "х", kjcy: "ќ", kopf: "𝕜", kscr: "𝓀", lAarr: "⇚", lArr: "⇐", lAtail: "⤛", lBarr: "⤎", lE: "≦", lEg: "⪋", lHar: "⥢", lacute: "ĺ", laemptyv: "⦴", lagran: "ℒ", lambda: "λ", lang: "⟨", langd: "⦑", langle: "⟨", lap: "⪅", laquo: "«", larr: "←", larrb: "⇤", larrbfs: "⤟", larrfs: "⤝", larrhk: "↩", larrlp: "↫", larrpl: "⤹", larrsim: "⥳", larrtl: "↢", lat: "⪫", latail: "⤙", late: "⪭", lates: "⪭︀", lbarr: "⤌", lbbrk: "❲", lbrace: "{", lbrack: "[", lbrke: "⦋", lbrksld: "⦏", lbrkslu: "⦍", lcaron: "ľ", lcedil: "ļ", lceil: "⌈", lcub: "{", lcy: "л", ldca: "⤶", ldquo: "“", ldquor: "„", ldrdhar: "⥧", ldrushar: "⥋", ldsh: "↲", le: "≤", leftarrow: "←", leftarrowtail: "↢", leftharpoondown: "↽", leftharpoonup: "↼", leftleftarrows: "⇇", leftrightarrow: "↔", leftrightarrows: "⇆", leftrightharpoons: "⇋", leftrightsquigarrow: "↭", leftthreetimes: "⋋", leg: "⋚", leq: "≤", leqq: "≦", leqslant: "⩽", les: "⩽", lescc: "⪨", lesdot: "⩿", lesdoto: "⪁", lesdotor: "⪃", lesg: "⋚︀", lesges: "⪓", lessapprox: "⪅", lessdot: "⋖", lesseqgtr: "⋚", lesseqqgtr: "⪋", lessgtr: "≶", lesssim: "≲", lfisht: "⥼", lfloor: "⌊", lfr: "𝔩", lg: "≶", lgE: "⪑", lhard: "↽", lharu: "↼", lharul: "⥪", lhblk: "▄", ljcy: "љ", ll: "≪", llarr: "⇇", llcorner: "⌞", llhard: "⥫", lltri: "◺", lmidot: "ŀ", lmoust: "⎰", lmoustache: "⎰", lnE: "≨", lnap: "⪉", lnapprox: "⪉", lne: "⪇", lneq: "⪇", lneqq: "≨", lnsim: "⋦", loang: "⟬", loarr: "⇽", lobrk: "⟦", longleftarrow: "⟵", longleftrightarrow: "⟷", longmapsto: "⟼", longrightarrow: "⟶", looparrowleft: "↫", looparrowright: "↬", lopar: "⦅", lopf: "𝕝", loplus: "⨭", lotimes: "⨴", lowast: "∗", lowbar: "_", loz: "◊", lozenge: "◊", lozf: "⧫", lpar: "(", lparlt: "⦓", lrarr: "⇆", lrcorner: "⌟", lrhar: "⇋", lrhard: "⥭", lrm: "‎", lrtri: "⊿", lsaquo: "‹", lscr: "𝓁", lsh: "↰", lsim: "≲", lsime: "⪍", lsimg: "⪏", lsqb: "[", lsquo: "‘", lsquor: "‚", lstrok: "ł", lt: "<", ltcc: "⪦", ltcir: "⩹", ltdot: "⋖", lthree: "⋋", ltimes: "⋉", ltlarr: "⥶", ltquest: "⩻", ltrPar: "⦖", ltri: "◃", ltrie: "⊴", ltrif: "◂", lurdshar: "⥊", luruhar: "⥦", lvertneqq: "≨︀", lvnE: "≨︀", mDDot: "∺", macr: "¯", male: "♂", malt: "✠", maltese: "✠", map: "↦", mapsto: "↦", mapstodown: "↧", mapstoleft: "↤", mapstoup: "↥", marker: "▮", mcomma: "⨩", mcy: "м", mdash: "—", measuredangle: "∡", mfr: "𝔪", mho: "℧", micro: "µ", mid: "∣", midast: "*", midcir: "⫰", middot: "·", minus: "−", minusb: "⊟", minusd: "∸", minusdu: "⨪", mlcp: "⫛", mldr: "…", mnplus: "∓", models: "⊧", mopf: "𝕞", mp: "∓", mscr: "𝓂", mstpos: "∾", mu: "μ", multimap: "⊸", mumap: "⊸", nGg: "⋙̸", nGt: "≫⃒", nGtv: "≫̸", nLeftarrow: "⇍", nLeftrightarrow: "⇎", nLl: "⋘̸", nLt: "≪⃒", nLtv: "≪̸", nRightarrow: "⇏", nVDash: "⊯", nVdash: "⊮", nabla: "∇", nacute: "ń", nang: "∠⃒", nap: "≉", napE: "⩰̸", napid: "≋̸", napos: "ŉ", napprox: "≉", natur: "♮", natural: "♮", naturals: "ℕ", nbsp: " ", nbump: "≎̸", nbumpe: "≏̸", ncap: "⩃", ncaron: "ň", ncedil: "ņ", ncong: "≇", ncongdot: "⩭̸", ncup: "⩂", ncy: "н", ndash: "–", ne: "≠", neArr: "⇗", nearhk: "⤤", nearr: "↗", nearrow: "↗", nedot: "≐̸", nequiv: "≢", nesear: "⤨", nesim: "≂̸", nexist: "∄", nexists: "∄", nfr: "𝔫", ngE: "≧̸", nge: "≱", ngeq: "≱", ngeqq: "≧̸", ngeqslant: "⩾̸", nges: "⩾̸", ngsim: "≵", ngt: "≯", ngtr: "≯", nhArr: "⇎", nharr: "↮", nhpar: "⫲", ni: "∋", nis: "⋼", nisd: "⋺", niv: "∋", njcy: "њ", nlArr: "⇍", nlE: "≦̸", nlarr: "↚", nldr: "‥", nle: "≰", nleftarrow: "↚", nleftrightarrow: "↮", nleq: "≰", nleqq: "≦̸", nleqslant: "⩽̸", nles: "⩽̸", nless: "≮", nlsim: "≴", nlt: "≮", nltri: "⋪", nltrie: "⋬", nmid: "∤", nopf: "𝕟", not: "¬", notin: "∉", notinE: "⋹̸", notindot: "⋵̸", notinva: "∉", notinvb: "⋷", notinvc: "⋶", notni: "∌", notniva: "∌", notnivb: "⋾", notnivc: "⋽", npar: "∦", nparallel: "∦", nparsl: "⫽⃥", npart: "∂̸", npolint: "⨔", npr: "⊀", nprcue: "⋠", npre: "⪯̸", nprec: "⊀", npreceq: "⪯̸", nrArr: "⇏", nrarr: "↛", nrarrc: "⤳̸", nrarrw: "↝̸", nrightarrow: "↛", nrtri: "⋫", nrtrie: "⋭", nsc: "⊁", nsccue: "⋡", nsce: "⪰̸", nscr: "𝓃", nshortmid: "∤", nshortparallel: "∦", nsim: "≁", nsime: "≄", nsimeq: "≄", nsmid: "∤", nspar: "∦", nsqsube: "⋢", nsqsupe: "⋣", nsub: "⊄", nsubE: "⫅̸", nsube: "⊈", nsubset: "⊂⃒", nsubseteq: "⊈", nsubseteqq: "⫅̸", nsucc: "⊁", nsucceq: "⪰̸", nsup: "⊅", nsupE: "⫆̸", nsupe: "⊉", nsupset: "⊃⃒", nsupseteq: "⊉", nsupseteqq: "⫆̸", ntgl: "≹", ntilde: "ñ", ntlg: "≸", ntriangleleft: "⋪", ntrianglelefteq: "⋬", ntriangleright: "⋫", ntrianglerighteq: "⋭", nu: "ν", num: "#", numero: "№", numsp: " ", nvDash: "⊭", nvHarr: "⤄", nvap: "≍⃒", nvdash: "⊬", nvge: "≥⃒", nvgt: ">⃒", nvinfin: "⧞", nvlArr: "⤂", nvle: "≤⃒", nvlt: "<⃒", nvltrie: "⊴⃒", nvrArr: "⤃", nvrtrie: "⊵⃒", nvsim: "∼⃒", nwArr: "⇖", nwarhk: "⤣", nwarr: "↖", nwarrow: "↖", nwnear: "⤧", oS: "Ⓢ", oacute: "ó", oast: "⊛", ocir: "⊚", ocirc: "ô", ocy: "о", odash: "⊝", odblac: "ő", odiv: "⨸", odot: "⊙", odsold: "⦼", oelig: "œ", ofcir: "⦿", ofr: "𝔬", ogon: "˛", ograve: "ò", ogt: "⧁", ohbar: "⦵", ohm: "Ω", oint: "∮", olarr: "↺", olcir: "⦾", olcross: "⦻", oline: "‾", olt: "⧀", omacr: "ō", omega: "ω", omicron: "ο", omid: "⦶", ominus: "⊖", oopf: "𝕠", opar: "⦷", operp: "⦹", oplus: "⊕", or: "∨", orarr: "↻", ord: "⩝", order: "ℴ", orderof: "ℴ", ordf: "ª", ordm: "º", origof: "⊶", oror: "⩖", orslope: "⩗", orv: "⩛", oscr: "ℴ", oslash: "ø", osol: "⊘", otilde: "õ", otimes: "⊗", otimesas: "⨶", ouml: "ö", ovbar: "⌽", par: "∥", para: "¶", parallel: "∥", parsim: "⫳", parsl: "⫽", part: "∂", pcy: "п", percnt: "%", period: ".", permil: "‰", perp: "⊥", pertenk: "‱", pfr: "𝔭", phi: "φ", phiv: "ϕ", phmmat: "ℳ", phone: "☎", pi: "π", pitchfork: "⋔", piv: "ϖ", planck: "ℏ", planckh: "ℎ", plankv: "ℏ", plus: "+", plusacir: "⨣", plusb: "⊞", pluscir: "⨢", plusdo: "∔", plusdu: "⨥", pluse: "⩲", plusmn: "±", plussim: "⨦", plustwo: "⨧", pm: "±", pointint: "⨕", popf: "𝕡", pound: "£", pr: "≺", prE: "⪳", prap: "⪷", prcue: "≼", pre: "⪯", prec: "≺", precapprox: "⪷", preccurlyeq: "≼", preceq: "⪯", precnapprox: "⪹", precneqq: "⪵", precnsim: "⋨", precsim: "≾", prime: "′", primes: "ℙ", prnE: "⪵", prnap: "⪹", prnsim: "⋨", prod: "∏", profalar: "⌮", profline: "⌒", profsurf: "⌓", prop: "∝", propto: "∝", prsim: "≾", prurel: "⊰", pscr: "𝓅", psi: "ψ", puncsp: " ", qfr: "𝔮", qint: "⨌", qopf: "𝕢", qprime: "⁗", qscr: "𝓆", quaternions: "ℍ", quatint: "⨖", quest: "?", questeq: "≟", quot: '"', rAarr: "⇛", rArr: "⇒", rAtail: "⤜", rBarr: "⤏", rHar: "⥤", race: "∽̱", racute: "ŕ", radic: "√", raemptyv: "⦳", rang: "⟩", rangd: "⦒", range: "⦥", rangle: "⟩", raquo: "»", rarr: "→", rarrap: "⥵", rarrb: "⇥", rarrbfs: "⤠", rarrc: "⤳", rarrfs: "⤞", rarrhk: "↪", rarrlp: "↬", rarrpl: "⥅", rarrsim: "⥴", rarrtl: "↣", rarrw: "↝", ratail: "⤚", ratio: "∶", rationals: "ℚ", rbarr: "⤍", rbbrk: "❳", rbrace: "}", rbrack: "]", rbrke: "⦌", rbrksld: "⦎", rbrkslu: "⦐", rcaron: "ř", rcedil: "ŗ", rceil: "⌉", rcub: "}", rcy: "р", rdca: "⤷", rdldhar: "⥩", rdquo: "”", rdquor: "”", rdsh: "↳", real: "ℜ", realine: "ℛ", realpart: "ℜ", reals: "ℝ", rect: "▭", reg: "®", rfisht: "⥽", rfloor: "⌋", rfr: "𝔯", rhard: "⇁", rharu: "⇀", rharul: "⥬", rho: "ρ", rhov: "ϱ", rightarrow: "→", rightarrowtail: "↣", rightharpoondown: "⇁", rightharpoonup: "⇀", rightleftarrows: "⇄", rightleftharpoons: "⇌", rightrightarrows: "⇉", rightsquigarrow: "↝", rightthreetimes: "⋌", ring: "˚", risingdotseq: "≓", rlarr: "⇄", rlhar: "⇌", rlm: "‏", rmoust: "⎱", rmoustache: "⎱", rnmid: "⫮", roang: "⟭", roarr: "⇾", robrk: "⟧", ropar: "⦆", ropf: "𝕣", roplus: "⨮", rotimes: "⨵", rpar: ")", rpargt: "⦔", rppolint: "⨒", rrarr: "⇉", rsaquo: "›", rscr: "𝓇", rsh: "↱", rsqb: "]", rsquo: "’", rsquor: "’", rthree: "⋌", rtimes: "⋊", rtri: "▹", rtrie: "⊵", rtrif: "▸", rtriltri: "⧎", ruluhar: "⥨", rx: "℞", sacute: "ś", sbquo: "‚", sc: "≻", scE: "⪴", scap: "⪸", scaron: "š", sccue: "≽", sce: "⪰", scedil: "ş", scirc: "ŝ", scnE: "⪶", scnap: "⪺", scnsim: "⋩", scpolint: "⨓", scsim: "≿", scy: "с", sdot: "⋅", sdotb: "⊡", sdote: "⩦", seArr: "⇘", searhk: "⤥", searr: "↘", searrow: "↘", sect: "§", semi: ";", seswar: "⤩", setminus: "∖", setmn: "∖", sext: "✶", sfr: "𝔰", sfrown: "⌢", sharp: "♯", shchcy: "щ", shcy: "ш", shortmid: "∣", shortparallel: "∥", shy: "­", sigma: "σ", sigmaf: "ς", sigmav: "ς", sim: "∼", simdot: "⩪", sime: "≃", simeq: "≃", simg: "⪞", simgE: "⪠", siml: "⪝", simlE: "⪟", simne: "≆", simplus: "⨤", simrarr: "⥲", slarr: "←", smallsetminus: "∖", smashp: "⨳", smeparsl: "⧤", smid: "∣", smile: "⌣", smt: "⪪", smte: "⪬", smtes: "⪬︀", softcy: "ь", sol: "/", solb: "⧄", solbar: "⌿", sopf: "𝕤", spades: "♠", spadesuit: "♠", spar: "∥", sqcap: "⊓", sqcaps: "⊓︀", sqcup: "⊔", sqcups: "⊔︀", sqsub: "⊏", sqsube: "⊑", sqsubset: "⊏", sqsubseteq: "⊑", sqsup: "⊐", sqsupe: "⊒", sqsupset: "⊐", sqsupseteq: "⊒", squ: "□", square: "□", squarf: "▪", squf: "▪", srarr: "→", sscr: "𝓈", ssetmn: "∖", ssmile: "⌣", sstarf: "⋆", star: "☆", starf: "★", straightepsilon: "ϵ", straightphi: "ϕ", strns: "¯", sub: "⊂", subE: "⫅", subdot: "⪽", sube: "⊆", subedot: "⫃", submult: "⫁", subnE: "⫋", subne: "⊊", subplus: "⪿", subrarr: "⥹", subset: "⊂", subseteq: "⊆", subseteqq: "⫅", subsetneq: "⊊", subsetneqq: "⫋", subsim: "⫇", subsub: "⫕", subsup: "⫓", succ: "≻", succapprox: "⪸", succcurlyeq: "≽", succeq: "⪰", succnapprox: "⪺", succneqq: "⪶", succnsim: "⋩", succsim: "≿", sum: "∑", sung: "♪", sup1: "¹", sup2: "²", sup3: "³", sup: "⊃", supE: "⫆", supdot: "⪾", supdsub: "⫘", supe: "⊇", supedot: "⫄", suphsol: "⟉", suphsub: "⫗", suplarr: "⥻", supmult: "⫂", supnE: "⫌", supne: "⊋", supplus: "⫀", supset: "⊃", supseteq: "⊇", supseteqq: "⫆", supsetneq: "⊋", supsetneqq: "⫌", supsim: "⫈", supsub: "⫔", supsup: "⫖", swArr: "⇙", swarhk: "⤦", swarr: "↙", swarrow: "↙", swnwar: "⤪", szlig: "ß", target: "⌖", tau: "τ", tbrk: "⎴", tcaron: "ť", tcedil: "ţ", tcy: "т", tdot: "⃛", telrec: "⌕", tfr: "𝔱", there4: "∴", therefore: "∴", theta: "θ", thetasym: "ϑ", thetav: "ϑ", thickapprox: "≈", thicksim: "∼", thinsp: " ", thkap: "≈", thksim: "∼", thorn: "þ", tilde: "˜", times: "×", timesb: "⊠", timesbar: "⨱", timesd: "⨰", tint: "∭", toea: "⤨", top: "⊤", topbot: "⌶", topcir: "⫱", topf: "𝕥", topfork: "⫚", tosa: "⤩", tprime: "‴", trade: "™", triangle: "▵", triangledown: "▿", triangleleft: "◃", trianglelefteq: "⊴", triangleq: "≜", triangleright: "▹", trianglerighteq: "⊵", tridot: "◬", trie: "≜", triminus: "⨺", triplus: "⨹", trisb: "⧍", tritime: "⨻", trpezium: "⏢", tscr: "𝓉", tscy: "ц", tshcy: "ћ", tstrok: "ŧ", twixt: "≬", twoheadleftarrow: "↞", twoheadrightarrow: "↠", uArr: "⇑", uHar: "⥣", uacute: "ú", uarr: "↑", ubrcy: "ў", ubreve: "ŭ", ucirc: "û", ucy: "у", udarr: "⇅", udblac: "ű", udhar: "⥮", ufisht: "⥾", ufr: "𝔲", ugrave: "ù", uharl: "↿", uharr: "↾", uhblk: "▀", ulcorn: "⌜", ulcorner: "⌜", ulcrop: "⌏", ultri: "◸", umacr: "ū", uml: "¨", uogon: "ų", uopf: "𝕦", uparrow: "↑", updownarrow: "↕", upharpoonleft: "↿", upharpoonright: "↾", uplus: "⊎", upsi: "υ", upsih: "ϒ", upsilon: "υ", upuparrows: "⇈", urcorn: "⌝", urcorner: "⌝", urcrop: "⌎", uring: "ů", urtri: "◹", uscr: "𝓊", utdot: "⋰", utilde: "ũ", utri: "▵", utrif: "▴", uuarr: "⇈", uuml: "ü", uwangle: "⦧", vArr: "⇕", vBar: "⫨", vBarv: "⫩", vDash: "⊨", vangrt: "⦜", varepsilon: "ϵ", varkappa: "ϰ", varnothing: "∅", varphi: "ϕ", varpi: "ϖ", varpropto: "∝", varr: "↕", varrho: "ϱ", varsigma: "ς", varsubsetneq: "⊊︀", varsubsetneqq: "⫋︀", varsupsetneq: "⊋︀", varsupsetneqq: "⫌︀", vartheta: "ϑ", vartriangleleft: "⊲", vartriangleright: "⊳", vcy: "в", vdash: "⊢", vee: "∨", veebar: "⊻", veeeq: "≚", vellip: "⋮", verbar: "|", vert: "|", vfr: "𝔳", vltri: "⊲", vnsub: "⊂⃒", vnsup: "⊃⃒", vopf: "𝕧", vprop: "∝", vrtri: "⊳", vscr: "𝓋", vsubnE: "⫋︀", vsubne: "⊊︀", vsupnE: "⫌︀", vsupne: "⊋︀", vzigzag: "⦚", wcirc: "ŵ", wedbar: "⩟", wedge: "∧", wedgeq: "≙", weierp: "℘", wfr: "𝔴", wopf: "𝕨", wp: "℘", wr: "≀", wreath: "≀", wscr: "𝓌", xcap: "⋂", xcirc: "◯", xcup: "⋃", xdtri: "▽", xfr: "𝔵", xhArr: "⟺", xharr: "⟷", xi: "ξ", xlArr: "⟸", xlarr: "⟵", xmap: "⟼", xnis: "⋻", xodot: "⨀", xopf: "𝕩", xoplus: "⨁", xotime: "⨂", xrArr: "⟹", xrarr: "⟶", xscr: "𝓍", xsqcup: "⨆", xuplus: "⨄", xutri: "△", xvee: "⋁", xwedge: "⋀", yacute: "ý", yacy: "я", ycirc: "ŷ", ycy: "ы", yen: "¥", yfr: "𝔶", yicy: "ї", yopf: "𝕪", yscr: "𝓎", yucy: "ю", yuml: "ÿ", zacute: "ź", zcaron: "ž", zcy: "з", zdot: "ż", zeetrf: "ℨ", zeta: "ζ", zfr: "𝔷", zhcy: "ж", zigrarr: "⇝", zopf: "𝕫", zscr: "𝓏", zwj: "‍", zwnj: "‌" }, ye = {}.hasOwnProperty;
function decodeNamedCharacterReference(e) {
  return !!ye.call(me, e) && me[e];
}
function splice(e, t, n, o) {
  const i = e.length;
  let a, s = 0;
  if (t = t < 0 ? -t > i ? 0 : i + t : t > i ? i : t, n = n > 0 ? n : 0, o.length < 1e4) a = Array.from(o), a.unshift(t, n), e.splice(...a);
  else for (n && e.splice(t, n); s < o.length; ) a = o.slice(s, s + 1e4), a.unshift(t, 0), e.splice(...a), s += 1e4, t += 1e4;
}
function push(e, t) {
  return e.length > 0 ? (splice(e, e.length, 0, t), e) : t;
}
const be = {}.hasOwnProperty;
function combineExtensions(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; ) syntaxExtension(t, e[n]);
  return t;
}
function syntaxExtension(e, t) {
  let n;
  for (n in t) {
    const o = (be.call(e, n) ? e[n] : void 0) || (e[n] = {}), i = t[n];
    let a;
    if (i) for (a in i) {
      be.call(o, a) || (o[a] = []);
      const e2 = i[a];
      constructs(o[a], Array.isArray(e2) ? e2 : e2 ? [e2] : []);
    }
  }
}
function constructs(e, t) {
  let n = -1;
  const o = [];
  for (; ++n < t.length; ) ("after" === t[n].add ? e : o).push(t[n]);
  splice(e, 0, 0, o);
}
function decodeNumericCharacterReference(e, t) {
  const n = Number.parseInt(e, t);
  return n < 9 || 11 === n || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || !(65535 & ~n) || 65534 == (65535 & n) || n > 1114111 ? "�" : String.fromCodePoint(n);
}
function normalizeIdentifier(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const ve = regexCheck(/[A-Za-z]/), ke = regexCheck(/[\dA-Za-z]/), xe = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
function asciiControl(e) {
  return null !== e && (e < 32 || 127 === e);
}
const we = regexCheck(/\d/), Se = regexCheck(/[\dA-Fa-f]/), _e = regexCheck(/[!-/:-@[-`{-~]/);
function markdownLineEnding(e) {
  return null !== e && e < -2;
}
function markdownLineEndingOrSpace(e) {
  return null !== e && (e < 0 || 32 === e);
}
function markdownSpace(e) {
  return -2 === e || -1 === e || 32 === e;
}
const Ce = regexCheck(/\p{P}|\p{S}/u), Ee = regexCheck(/\s/);
function regexCheck(e) {
  return function(t) {
    return null !== t && t > -1 && e.test(String.fromCharCode(t));
  };
}
function normalizeUri(e) {
  const t = [];
  let n = -1, o = 0, i = 0;
  for (; ++n < e.length; ) {
    const a = e.charCodeAt(n);
    let s = "";
    if (37 === a && ke(e.charCodeAt(n + 1)) && ke(e.charCodeAt(n + 2))) i = 2;
    else if (a < 128) /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(a)) || (s = String.fromCharCode(a));
    else if (a > 55295 && a < 57344) {
      const t2 = e.charCodeAt(n + 1);
      a < 56320 && t2 > 56319 && t2 < 57344 ? (s = String.fromCharCode(a, t2), i = 1) : s = "�";
    } else s = String.fromCharCode(a);
    s && (t.push(e.slice(o, n), encodeURIComponent(s)), o = n + i + 1, s = ""), i && (n += i, i = 0);
  }
  return t.join("") + e.slice(o);
}
function factorySpace(e, t, n, o) {
  const i = o ? o - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return function(o2) {
    if (markdownSpace(o2)) return e.enter(n), prefix(o2);
    return t(o2);
  };
  function prefix(o2) {
    return markdownSpace(o2) && a++ < i ? (e.consume(o2), prefix) : (e.exit(n), t(o2));
  }
}
const Oe = { tokenize: function(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, function(n2) {
    if (null === n2) return void e.consume(n2);
    return e.enter("lineEnding"), e.consume(n2), e.exit("lineEnding"), factorySpace(e, t, "linePrefix");
  }, function(t2) {
    return e.enter("paragraph"), lineStart(t2);
  });
  let n;
  return t;
  function lineStart(t2) {
    const o = e.enter("chunkText", { contentType: "text", previous: n });
    return n && (n.next = o), n = o, data(t2);
  }
  function data(t2) {
    return null === t2 ? (e.exit("chunkText"), e.exit("paragraph"), void e.consume(t2)) : markdownLineEnding(t2) ? (e.consume(t2), e.exit("chunkText"), lineStart) : (e.consume(t2), data);
  }
} };
const Ie = { tokenize: function(e) {
  const t = this, n = [];
  let o, i, a, s = 0;
  return start;
  function start(o2) {
    if (s < n.length) {
      const i2 = n[s];
      return t.containerState = i2[1], e.attempt(i2[0].continuation, documentContinue, checkNewContainers)(o2);
    }
    return checkNewContainers(o2);
  }
  function documentContinue(e2) {
    if (s++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, o && closeFlow();
      const n2 = t.events.length;
      let i2, a2 = n2;
      for (; a2--; ) if ("exit" === t.events[a2][0] && "chunkFlow" === t.events[a2][1].type) {
        i2 = t.events[a2][1].end;
        break;
      }
      exitContainers(s);
      let l2 = n2;
      for (; l2 < t.events.length; ) t.events[l2][1].end = { ...i2 }, l2++;
      return splice(t.events, a2 + 1, 0, t.events.slice(n2)), t.events.length = l2, checkNewContainers(e2);
    }
    return start(e2);
  }
  function checkNewContainers(i2) {
    if (s === n.length) {
      if (!o) return documentContinued(i2);
      if (o.currentConstruct && o.currentConstruct.concrete) return flowStart(i2);
      t.interrupt = Boolean(o.currentConstruct && !o._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(Ae, thereIsANewContainer, thereIsNoNewContainer)(i2);
  }
  function thereIsANewContainer(e2) {
    return o && closeFlow(), exitContainers(s), documentContinued(e2);
  }
  function thereIsNoNewContainer(e2) {
    return t.parser.lazy[t.now().line] = s !== n.length, a = t.now().offset, flowStart(e2);
  }
  function documentContinued(n2) {
    return t.containerState = {}, e.attempt(Ae, containerContinue, flowStart)(n2);
  }
  function containerContinue(e2) {
    return s++, n.push([t.currentConstruct, t.containerState]), documentContinued(e2);
  }
  function flowStart(n2) {
    return null === n2 ? (o && closeFlow(), exitContainers(0), void e.consume(n2)) : (o = o || t.parser.flow(t.now()), e.enter("chunkFlow", { _tokenizer: o, contentType: "flow", previous: i }), flowContinue(n2));
  }
  function flowContinue(n2) {
    return null === n2 ? (writeToChild(e.exit("chunkFlow"), true), exitContainers(0), void e.consume(n2)) : markdownLineEnding(n2) ? (e.consume(n2), writeToChild(e.exit("chunkFlow")), s = 0, t.interrupt = void 0, start) : (e.consume(n2), flowContinue);
  }
  function writeToChild(e2, n2) {
    const l2 = t.sliceStream(e2);
    if (n2 && l2.push(null), e2.previous = i, i && (i.next = e2), i = e2, o.defineSkip(e2.start), o.write(l2), t.parser.lazy[e2.start.line]) {
      let e3 = o.events.length;
      for (; e3--; ) if (o.events[e3][1].start.offset < a && (!o.events[e3][1].end || o.events[e3][1].end.offset > a)) return;
      const n3 = t.events.length;
      let i2, l3, u2 = n3;
      for (; u2--; ) if ("exit" === t.events[u2][0] && "chunkFlow" === t.events[u2][1].type) {
        if (i2) {
          l3 = t.events[u2][1].end;
          break;
        }
        i2 = true;
      }
      for (exitContainers(s), e3 = n3; e3 < t.events.length; ) t.events[e3][1].end = { ...l3 }, e3++;
      splice(t.events, u2 + 1, 0, t.events.slice(n3)), t.events.length = e3;
    }
  }
  function exitContainers(o2) {
    let i2 = n.length;
    for (; i2-- > o2; ) {
      const o3 = n[i2];
      t.containerState = o3[1], o3[0].exit.call(t, e);
    }
    n.length = o2;
  }
  function closeFlow() {
    o.write([null]), i = void 0, o = void 0, t.containerState._closeFlow = void 0;
  }
} }, Ae = { tokenize: function(e, t, n) {
  return factorySpace(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
} };
function classifyCharacter(e) {
  return null === e || markdownLineEndingOrSpace(e) || Ee(e) ? 1 : Ce(e) ? 2 : void 0;
}
function resolveAll(e, t, n) {
  const o = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !o.includes(a) && (t = a(t, n), o.push(a));
  }
  return t;
}
const De = { name: "attention", resolveAll: function(e, t) {
  let n, o, i, a, s, l2, u2, c2, f2 = -1;
  for (; ++f2 < e.length; ) if ("enter" === e[f2][0] && "attentionSequence" === e[f2][1].type && e[f2][1]._close) {
    for (n = f2; n--; ) if ("exit" === e[n][0] && "attentionSequence" === e[n][1].type && e[n][1]._open && t.sliceSerialize(e[n][1]).charCodeAt(0) === t.sliceSerialize(e[f2][1]).charCodeAt(0)) {
      if ((e[n][1]._close || e[f2][1]._open) && (e[f2][1].end.offset - e[f2][1].start.offset) % 3 && !((e[n][1].end.offset - e[n][1].start.offset + e[f2][1].end.offset - e[f2][1].start.offset) % 3)) continue;
      l2 = e[n][1].end.offset - e[n][1].start.offset > 1 && e[f2][1].end.offset - e[f2][1].start.offset > 1 ? 2 : 1;
      const p2 = { ...e[n][1].end }, d2 = { ...e[f2][1].start };
      movePoint(p2, -l2), movePoint(d2, l2), a = { type: l2 > 1 ? "strongSequence" : "emphasisSequence", start: p2, end: { ...e[n][1].end } }, s = { type: l2 > 1 ? "strongSequence" : "emphasisSequence", start: { ...e[f2][1].start }, end: d2 }, i = { type: l2 > 1 ? "strongText" : "emphasisText", start: { ...e[n][1].end }, end: { ...e[f2][1].start } }, o = { type: l2 > 1 ? "strong" : "emphasis", start: { ...a.start }, end: { ...s.end } }, e[n][1].end = { ...a.start }, e[f2][1].start = { ...s.end }, u2 = [], e[n][1].end.offset - e[n][1].start.offset && (u2 = push(u2, [["enter", e[n][1], t], ["exit", e[n][1], t]])), u2 = push(u2, [["enter", o, t], ["enter", a, t], ["exit", a, t], ["enter", i, t]]), u2 = push(u2, resolveAll(t.parser.constructs.insideSpan.null, e.slice(n + 1, f2), t)), u2 = push(u2, [["exit", i, t], ["enter", s, t], ["exit", s, t], ["exit", o, t]]), e[f2][1].end.offset - e[f2][1].start.offset ? (c2 = 2, u2 = push(u2, [["enter", e[f2][1], t], ["exit", e[f2][1], t]])) : c2 = 0, splice(e, n - 1, f2 - n + 3, u2), f2 = n + u2.length - c2 - 2;
      break;
    }
  }
  f2 = -1;
  for (; ++f2 < e.length; ) "attentionSequence" === e[f2][1].type && (e[f2][1].type = "data");
  return e;
}, tokenize: function(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, o = this.previous, i = classifyCharacter(o);
  let a;
  return function(t2) {
    return a = t2, e.enter("attentionSequence"), inside(t2);
  };
  function inside(s) {
    if (s === a) return e.consume(s), inside;
    const l2 = e.exit("attentionSequence"), u2 = classifyCharacter(s), c2 = !u2 || 2 === u2 && i || n.includes(s), f2 = !i || 2 === i && u2 || n.includes(o);
    return l2._open = Boolean(42 === a ? c2 : c2 && (i || !f2)), l2._close = Boolean(42 === a ? f2 : f2 && (u2 || !c2)), t(s);
  }
} };
function movePoint(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const Re = { name: "autolink", tokenize: function(e, t, n) {
  let o = 0;
  return function(t2) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(t2), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), open;
  };
  function open(t2) {
    return ve(t2) ? (e.consume(t2), schemeOrEmailAtext) : 64 === t2 ? n(t2) : emailAtext(t2);
  }
  function schemeOrEmailAtext(e2) {
    return 43 === e2 || 45 === e2 || 46 === e2 || ke(e2) ? (o = 1, schemeInsideOrEmailAtext(e2)) : emailAtext(e2);
  }
  function schemeInsideOrEmailAtext(t2) {
    return 58 === t2 ? (e.consume(t2), o = 0, urlInside) : (43 === t2 || 45 === t2 || 46 === t2 || ke(t2)) && o++ < 32 ? (e.consume(t2), schemeInsideOrEmailAtext) : (o = 0, emailAtext(t2));
  }
  function urlInside(o2) {
    return 62 === o2 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(o2), e.exit("autolinkMarker"), e.exit("autolink"), t) : null === o2 || 32 === o2 || 60 === o2 || asciiControl(o2) ? n(o2) : (e.consume(o2), urlInside);
  }
  function emailAtext(t2) {
    return 64 === t2 ? (e.consume(t2), emailAtSignOrDot) : xe(t2) ? (e.consume(t2), emailAtext) : n(t2);
  }
  function emailAtSignOrDot(e2) {
    return ke(e2) ? emailLabel(e2) : n(e2);
  }
  function emailLabel(n2) {
    return 46 === n2 ? (e.consume(n2), o = 0, emailAtSignOrDot) : 62 === n2 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(n2), e.exit("autolinkMarker"), e.exit("autolink"), t) : emailValue(n2);
  }
  function emailValue(t2) {
    if ((45 === t2 || ke(t2)) && o++ < 63) {
      const n2 = 45 === t2 ? emailValue : emailLabel;
      return e.consume(t2), n2;
    }
    return n(t2);
  }
} };
const Pe = { partial: true, tokenize: function(e, t, n) {
  return function(t2) {
    return markdownSpace(t2) ? factorySpace(e, after, "linePrefix")(t2) : after(t2);
  };
  function after(e2) {
    return null === e2 || markdownLineEnding(e2) ? t(e2) : n(e2);
  }
} };
const Le = { continuation: { tokenize: function(e, t, n) {
  const o = this;
  return function(t2) {
    if (markdownSpace(t2)) return factorySpace(e, contBefore, "linePrefix", o.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t2);
    return contBefore(t2);
  };
  function contBefore(o2) {
    return e.attempt(Le, t, n)(o2);
  }
} }, exit: function(e) {
  e.exit("blockQuote");
}, name: "blockQuote", tokenize: function(e, t, n) {
  const o = this;
  return function(t2) {
    if (62 === t2) {
      const n2 = o.containerState;
      return n2.open || (e.enter("blockQuote", { _container: true }), n2.open = true), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(t2), e.exit("blockQuoteMarker"), after;
    }
    return n(t2);
  };
  function after(n2) {
    return markdownSpace(n2) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(n2), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(n2));
  }
} };
const Te = { name: "characterEscape", tokenize: function(e, t, n) {
  return function(t2) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(t2), e.exit("escapeMarker"), inside;
  };
  function inside(o) {
    return _e(o) ? (e.enter("characterEscapeValue"), e.consume(o), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(o);
  }
} };
const ze = { name: "characterReference", tokenize: function(e, t, n) {
  const o = this;
  let i, a, s = 0;
  return function(t2) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(t2), e.exit("characterReferenceMarker"), open;
  };
  function open(t2) {
    return 35 === t2 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(t2), e.exit("characterReferenceMarkerNumeric"), numeric) : (e.enter("characterReferenceValue"), i = 31, a = ke, value(t2));
  }
  function numeric(t2) {
    return 88 === t2 || 120 === t2 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(t2), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), i = 6, a = Se, value) : (e.enter("characterReferenceValue"), i = 7, a = we, value(t2));
  }
  function value(l2) {
    if (59 === l2 && s) {
      const i2 = e.exit("characterReferenceValue");
      return a !== ke || decodeNamedCharacterReference(o.sliceSerialize(i2)) ? (e.enter("characterReferenceMarker"), e.consume(l2), e.exit("characterReferenceMarker"), e.exit("characterReference"), t) : n(l2);
    }
    return a(l2) && s++ < i ? (e.consume(l2), value) : n(l2);
  }
} };
const je = { partial: true, tokenize: function(e, t, n) {
  const o = this;
  return function(t2) {
    if (null === t2) return n(t2);
    return e.enter("lineEnding"), e.consume(t2), e.exit("lineEnding"), lineStart;
  };
  function lineStart(e2) {
    return o.parser.lazy[o.now().line] ? n(e2) : t(e2);
  }
} }, Me = { concrete: true, name: "codeFenced", tokenize: function(e, t, n) {
  const o = this, i = { partial: true, tokenize: function(e2, t2, n2) {
    let i2 = 0;
    return startBefore;
    function startBefore(t3) {
      return e2.enter("lineEnding"), e2.consume(t3), e2.exit("lineEnding"), start;
    }
    function start(t3) {
      return e2.enter("codeFencedFence"), markdownSpace(t3) ? factorySpace(e2, beforeSequenceClose, "linePrefix", o.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t3) : beforeSequenceClose(t3);
    }
    function beforeSequenceClose(t3) {
      return t3 === a ? (e2.enter("codeFencedFenceSequence"), sequenceClose(t3)) : n2(t3);
    }
    function sequenceClose(t3) {
      return t3 === a ? (i2++, e2.consume(t3), sequenceClose) : i2 >= l2 ? (e2.exit("codeFencedFenceSequence"), markdownSpace(t3) ? factorySpace(e2, sequenceCloseAfter, "whitespace")(t3) : sequenceCloseAfter(t3)) : n2(t3);
    }
    function sequenceCloseAfter(o2) {
      return null === o2 || markdownLineEnding(o2) ? (e2.exit("codeFencedFence"), t2(o2)) : n2(o2);
    }
  } };
  let a, s = 0, l2 = 0;
  return function(t2) {
    return function(t3) {
      const n2 = o.events[o.events.length - 1];
      return s = n2 && "linePrefix" === n2[1].type ? n2[2].sliceSerialize(n2[1], true).length : 0, a = t3, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), sequenceOpen(t3);
    }(t2);
  };
  function sequenceOpen(t2) {
    return t2 === a ? (l2++, e.consume(t2), sequenceOpen) : l2 < 3 ? n(t2) : (e.exit("codeFencedFenceSequence"), markdownSpace(t2) ? factorySpace(e, infoBefore, "whitespace")(t2) : infoBefore(t2));
  }
  function infoBefore(n2) {
    return null === n2 || markdownLineEnding(n2) ? (e.exit("codeFencedFence"), o.interrupt ? t(n2) : e.check(je, atNonLazyBreak, after)(n2)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", { contentType: "string" }), info(n2));
  }
  function info(t2) {
    return null === t2 || markdownLineEnding(t2) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), infoBefore(t2)) : markdownSpace(t2) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), factorySpace(e, metaBefore, "whitespace")(t2)) : 96 === t2 && t2 === a ? n(t2) : (e.consume(t2), info);
  }
  function metaBefore(t2) {
    return null === t2 || markdownLineEnding(t2) ? infoBefore(t2) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", { contentType: "string" }), meta(t2));
  }
  function meta(t2) {
    return null === t2 || markdownLineEnding(t2) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), infoBefore(t2)) : 96 === t2 && t2 === a ? n(t2) : (e.consume(t2), meta);
  }
  function atNonLazyBreak(t2) {
    return e.attempt(i, after, contentBefore)(t2);
  }
  function contentBefore(t2) {
    return e.enter("lineEnding"), e.consume(t2), e.exit("lineEnding"), contentStart;
  }
  function contentStart(t2) {
    return s > 0 && markdownSpace(t2) ? factorySpace(e, beforeContentChunk, "linePrefix", s + 1)(t2) : beforeContentChunk(t2);
  }
  function beforeContentChunk(t2) {
    return null === t2 || markdownLineEnding(t2) ? e.check(je, atNonLazyBreak, after)(t2) : (e.enter("codeFlowValue"), contentChunk(t2));
  }
  function contentChunk(t2) {
    return null === t2 || markdownLineEnding(t2) ? (e.exit("codeFlowValue"), beforeContentChunk(t2)) : (e.consume(t2), contentChunk);
  }
  function after(n2) {
    return e.exit("codeFenced"), t(n2);
  }
} };
const qe = { name: "codeIndented", tokenize: function(e, t, n) {
  const o = this;
  return function(t2) {
    return e.enter("codeIndented"), factorySpace(e, afterPrefix, "linePrefix", 5)(t2);
  };
  function afterPrefix(e2) {
    const t2 = o.events[o.events.length - 1];
    return t2 && "linePrefix" === t2[1].type && t2[2].sliceSerialize(t2[1], true).length >= 4 ? atBreak(e2) : n(e2);
  }
  function atBreak(t2) {
    return null === t2 ? after(t2) : markdownLineEnding(t2) ? e.attempt(Fe, atBreak, after)(t2) : (e.enter("codeFlowValue"), inside(t2));
  }
  function inside(t2) {
    return null === t2 || markdownLineEnding(t2) ? (e.exit("codeFlowValue"), atBreak(t2)) : (e.consume(t2), inside);
  }
  function after(n2) {
    return e.exit("codeIndented"), t(n2);
  }
} }, Fe = { partial: true, tokenize: function(e, t, n) {
  const o = this;
  return furtherStart;
  function furtherStart(t2) {
    return o.parser.lazy[o.now().line] ? n(t2) : markdownLineEnding(t2) ? (e.enter("lineEnding"), e.consume(t2), e.exit("lineEnding"), furtherStart) : factorySpace(e, afterPrefix, "linePrefix", 5)(t2);
  }
  function afterPrefix(e2) {
    const i = o.events[o.events.length - 1];
    return i && "linePrefix" === i[1].type && i[2].sliceSerialize(i[1], true).length >= 4 ? t(e2) : markdownLineEnding(e2) ? furtherStart(e2) : n(e2);
  }
} };
const Ne = { name: "codeText", previous: function(e) {
  return 96 !== e || "characterEscape" === this.events[this.events.length - 1][1].type;
}, resolve: function(e) {
  let t, n, o = e.length - 4, i = 3;
  if (!("lineEnding" !== e[i][1].type && "space" !== e[i][1].type || "lineEnding" !== e[o][1].type && "space" !== e[o][1].type)) {
    for (t = i; ++t < o; ) if ("codeTextData" === e[t][1].type) {
      e[i][1].type = "codeTextPadding", e[o][1].type = "codeTextPadding", i += 2, o -= 2;
      break;
    }
  }
  t = i - 1, o++;
  for (; ++t <= o; ) void 0 === n ? t !== o && "lineEnding" !== e[t][1].type && (n = t) : t !== o && "lineEnding" !== e[t][1].type || (e[n][1].type = "codeTextData", t !== n + 2 && (e[n][1].end = e[t - 1][1].end, e.splice(n + 2, t - n - 2), o -= t - n - 2, t = n + 2), n = void 0);
  return e;
}, tokenize: function(e, t, n) {
  let o, i, a = 0;
  return function(t2) {
    return e.enter("codeText"), e.enter("codeTextSequence"), sequenceOpen(t2);
  };
  function sequenceOpen(t2) {
    return 96 === t2 ? (e.consume(t2), a++, sequenceOpen) : (e.exit("codeTextSequence"), between(t2));
  }
  function between(t2) {
    return null === t2 ? n(t2) : 32 === t2 ? (e.enter("space"), e.consume(t2), e.exit("space"), between) : 96 === t2 ? (i = e.enter("codeTextSequence"), o = 0, sequenceClose(t2)) : markdownLineEnding(t2) ? (e.enter("lineEnding"), e.consume(t2), e.exit("lineEnding"), between) : (e.enter("codeTextData"), data(t2));
  }
  function data(t2) {
    return null === t2 || 32 === t2 || 96 === t2 || markdownLineEnding(t2) ? (e.exit("codeTextData"), between(t2)) : (e.consume(t2), data);
  }
  function sequenceClose(n2) {
    return 96 === n2 ? (e.consume(n2), o++, sequenceClose) : o === a ? (e.exit("codeTextSequence"), e.exit("codeText"), t(n2)) : (i.type = "codeTextData", data(n2));
  }
} };
class SpliceBuffer {
  constructor(e) {
    this.left = e ? [...e] : [], this.right = [];
  }
  get(e) {
    if (e < 0 || e >= this.left.length + this.right.length) throw new RangeError("Cannot access index `" + e + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return e < this.left.length ? this.left[e] : this.right[this.right.length - e + this.left.length - 1];
  }
  get length() {
    return this.left.length + this.right.length;
  }
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  slice(e, t) {
    const n = null == t ? Number.POSITIVE_INFINITY : t;
    return n < this.left.length ? this.left.slice(e, n) : e > this.left.length ? this.right.slice(this.right.length - n + this.left.length, this.right.length - e + this.left.length).reverse() : this.left.slice(e).concat(this.right.slice(this.right.length - n + this.left.length).reverse());
  }
  splice(e, t, n) {
    const o = t || 0;
    this.setCursor(Math.trunc(e));
    const i = this.right.splice(this.right.length - o, Number.POSITIVE_INFINITY);
    return n && chunkedPush(this.left, n), i.reverse();
  }
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  push(e) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(e);
  }
  pushMany(e) {
    this.setCursor(Number.POSITIVE_INFINITY), chunkedPush(this.left, e);
  }
  unshift(e) {
    this.setCursor(0), this.right.push(e);
  }
  unshiftMany(e) {
    this.setCursor(0), chunkedPush(this.right, e.reverse());
  }
  setCursor(e) {
    if (!(e === this.left.length || e > this.left.length && 0 === this.right.length || e < 0 && 0 === this.left.length)) if (e < this.left.length) {
      const t = this.left.splice(e, Number.POSITIVE_INFINITY);
      chunkedPush(this.right, t.reverse());
    } else {
      const t = this.right.splice(this.left.length + this.right.length - e, Number.POSITIVE_INFINITY);
      chunkedPush(this.left, t.reverse());
    }
  }
}
function chunkedPush(e, t) {
  let n = 0;
  if (t.length < 1e4) e.push(...t);
  else for (; n < t.length; ) e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function subtokenize(e) {
  const t = {};
  let n, o, i, a, s, l2, u2, c2 = -1;
  const f2 = new SpliceBuffer(e);
  for (; ++c2 < f2.length; ) {
    for (; c2 in t; ) c2 = t[c2];
    if (n = f2.get(c2), c2 && "chunkFlow" === n[1].type && "listItemPrefix" === f2.get(c2 - 1)[1].type && (l2 = n[1]._tokenizer.events, i = 0, i < l2.length && "lineEndingBlank" === l2[i][1].type && (i += 2), i < l2.length && "content" === l2[i][1].type)) for (; ++i < l2.length && "content" !== l2[i][1].type; ) "chunkText" === l2[i][1].type && (l2[i][1]._isInFirstContentOfListItem = true, i++);
    if ("enter" === n[0]) n[1].contentType && (Object.assign(t, subcontent(f2, c2)), c2 = t[c2], u2 = true);
    else if (n[1]._container) {
      for (i = c2, o = void 0; i--; ) if (a = f2.get(i), "lineEnding" === a[1].type || "lineEndingBlank" === a[1].type) "enter" === a[0] && (o && (f2.get(o)[1].type = "lineEndingBlank"), a[1].type = "lineEnding", o = i);
      else if ("linePrefix" !== a[1].type && "listItemIndent" !== a[1].type) break;
      o && (n[1].end = { ...f2.get(o)[1].start }, s = f2.slice(o, c2), s.unshift(n), f2.splice(o, c2 - o + 1, s));
    }
  }
  return splice(e, 0, Number.POSITIVE_INFINITY, f2.slice(0)), !u2;
}
function subcontent(e, t) {
  const n = e.get(t)[1], o = e.get(t)[2];
  let i = t - 1;
  const a = [];
  let s = n._tokenizer;
  s || (s = o.parser[n.contentType](n.start), n._contentTypeTextTrailing && (s._contentTypeTextTrailing = true));
  const l2 = s.events, u2 = [], c2 = {};
  let f2, p2, d2 = -1, h2 = n, g2 = 0, m2 = 0;
  const y2 = [m2];
  for (; h2; ) {
    for (; e.get(++i)[1] !== h2; ) ;
    a.push(i), h2._tokenizer || (f2 = o.sliceStream(h2), h2.next || f2.push(null), p2 && s.defineSkip(h2.start), h2._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = true), s.write(f2), h2._isInFirstContentOfListItem && (s._gfmTasklistFirstContentOfListItem = void 0)), p2 = h2, h2 = h2.next;
  }
  for (h2 = n; ++d2 < l2.length; ) "exit" === l2[d2][0] && "enter" === l2[d2 - 1][0] && l2[d2][1].type === l2[d2 - 1][1].type && l2[d2][1].start.line !== l2[d2][1].end.line && (m2 = d2 + 1, y2.push(m2), h2._tokenizer = void 0, h2.previous = void 0, h2 = h2.next);
  for (s.events = [], h2 ? (h2._tokenizer = void 0, h2.previous = void 0) : y2.pop(), d2 = y2.length; d2--; ) {
    const t2 = l2.slice(y2[d2], y2[d2 + 1]), n2 = a.pop();
    u2.push([n2, n2 + t2.length - 1]), e.splice(n2, 2, t2);
  }
  for (u2.reverse(), d2 = -1; ++d2 < u2.length; ) c2[g2 + u2[d2][0]] = g2 + u2[d2][1], g2 += u2[d2][1] - u2[d2][0] - 1;
  return c2;
}
const Be = { resolve: function(e) {
  return subtokenize(e), e;
}, tokenize: function(e, t) {
  let n;
  return function(t2) {
    return e.enter("content"), n = e.enter("chunkContent", { contentType: "content" }), chunkInside(t2);
  };
  function chunkInside(t2) {
    return null === t2 ? contentEnd(t2) : markdownLineEnding(t2) ? e.check(He, contentContinue, contentEnd)(t2) : (e.consume(t2), chunkInside);
  }
  function contentEnd(n2) {
    return e.exit("chunkContent"), e.exit("content"), t(n2);
  }
  function contentContinue(t2) {
    return e.consume(t2), e.exit("chunkContent"), n.next = e.enter("chunkContent", { contentType: "content", previous: n }), n = n.next, chunkInside;
  }
} }, He = { partial: true, tokenize: function(e, t, n) {
  const o = this;
  return function(t2) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(t2), e.exit("lineEnding"), factorySpace(e, prefixed, "linePrefix");
  };
  function prefixed(i) {
    if (null === i || markdownLineEnding(i)) return n(i);
    const a = o.events[o.events.length - 1];
    return !o.parser.constructs.disable.null.includes("codeIndented") && a && "linePrefix" === a[1].type && a[2].sliceSerialize(a[1], true).length >= 4 ? t(i) : e.interrupt(o.parser.constructs.flow, n, t)(i);
  }
} };
function factoryDestination(e, t, n, o, i, a, s, l2, u2) {
  const c2 = u2 || Number.POSITIVE_INFINITY;
  let f2 = 0;
  return function(t2) {
    if (60 === t2) return e.enter(o), e.enter(i), e.enter(a), e.consume(t2), e.exit(a), enclosedBefore;
    if (null === t2 || 32 === t2 || 41 === t2 || asciiControl(t2)) return n(t2);
    return e.enter(o), e.enter(s), e.enter(l2), e.enter("chunkString", { contentType: "string" }), raw(t2);
  };
  function enclosedBefore(n2) {
    return 62 === n2 ? (e.enter(a), e.consume(n2), e.exit(a), e.exit(i), e.exit(o), t) : (e.enter(l2), e.enter("chunkString", { contentType: "string" }), enclosed(n2));
  }
  function enclosed(t2) {
    return 62 === t2 ? (e.exit("chunkString"), e.exit(l2), enclosedBefore(t2)) : null === t2 || 60 === t2 || markdownLineEnding(t2) ? n(t2) : (e.consume(t2), 92 === t2 ? enclosedEscape : enclosed);
  }
  function enclosedEscape(t2) {
    return 60 === t2 || 62 === t2 || 92 === t2 ? (e.consume(t2), enclosed) : enclosed(t2);
  }
  function raw(i2) {
    return f2 || null !== i2 && 41 !== i2 && !markdownLineEndingOrSpace(i2) ? f2 < c2 && 40 === i2 ? (e.consume(i2), f2++, raw) : 41 === i2 ? (e.consume(i2), f2--, raw) : null === i2 || 32 === i2 || 40 === i2 || asciiControl(i2) ? n(i2) : (e.consume(i2), 92 === i2 ? rawEscape : raw) : (e.exit("chunkString"), e.exit(l2), e.exit(s), e.exit(o), t(i2));
  }
  function rawEscape(t2) {
    return 40 === t2 || 41 === t2 || 92 === t2 ? (e.consume(t2), raw) : raw(t2);
  }
}
function factoryLabel(e, t, n, o, i, a) {
  const s = this;
  let l2, u2 = 0;
  return function(t2) {
    return e.enter(o), e.enter(i), e.consume(t2), e.exit(i), e.enter(a), atBreak;
  };
  function atBreak(c2) {
    return u2 > 999 || null === c2 || 91 === c2 || 93 === c2 && !l2 || 94 === c2 && !u2 && "_hiddenFootnoteSupport" in s.parser.constructs ? n(c2) : 93 === c2 ? (e.exit(a), e.enter(i), e.consume(c2), e.exit(i), e.exit(o), t) : markdownLineEnding(c2) ? (e.enter("lineEnding"), e.consume(c2), e.exit("lineEnding"), atBreak) : (e.enter("chunkString", { contentType: "string" }), labelInside(c2));
  }
  function labelInside(t2) {
    return null === t2 || 91 === t2 || 93 === t2 || markdownLineEnding(t2) || u2++ > 999 ? (e.exit("chunkString"), atBreak(t2)) : (e.consume(t2), l2 || (l2 = !markdownSpace(t2)), 92 === t2 ? labelEscape : labelInside);
  }
  function labelEscape(t2) {
    return 91 === t2 || 92 === t2 || 93 === t2 ? (e.consume(t2), u2++, labelInside) : labelInside(t2);
  }
}
function factoryTitle(e, t, n, o, i, a) {
  let s;
  return function(t2) {
    if (34 === t2 || 39 === t2 || 40 === t2) return e.enter(o), e.enter(i), e.consume(t2), e.exit(i), s = 40 === t2 ? 41 : t2, begin;
    return n(t2);
  };
  function begin(n2) {
    return n2 === s ? (e.enter(i), e.consume(n2), e.exit(i), e.exit(o), t) : (e.enter(a), atBreak(n2));
  }
  function atBreak(t2) {
    return t2 === s ? (e.exit(a), begin(s)) : null === t2 ? n(t2) : markdownLineEnding(t2) ? (e.enter("lineEnding"), e.consume(t2), e.exit("lineEnding"), factorySpace(e, atBreak, "linePrefix")) : (e.enter("chunkString", { contentType: "string" }), inside(t2));
  }
  function inside(t2) {
    return t2 === s || null === t2 || markdownLineEnding(t2) ? (e.exit("chunkString"), atBreak(t2)) : (e.consume(t2), 92 === t2 ? escape : inside);
  }
  function escape(t2) {
    return t2 === s || 92 === t2 ? (e.consume(t2), inside) : inside(t2);
  }
}
function factoryWhitespace(e, t) {
  let n;
  return function start(o) {
    if (markdownLineEnding(o)) return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), n = true, start;
    if (markdownSpace(o)) return factorySpace(e, start, n ? "linePrefix" : "lineSuffix")(o);
    return t(o);
  };
}
const We = { name: "definition", tokenize: function(e, t, n) {
  const o = this;
  let i;
  return function(t2) {
    return e.enter("definition"), function(t3) {
      return factoryLabel.call(o, e, labelAfter, n, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(t3);
    }(t2);
  };
  function labelAfter(t2) {
    return i = normalizeIdentifier(o.sliceSerialize(o.events[o.events.length - 1][1]).slice(1, -1)), 58 === t2 ? (e.enter("definitionMarker"), e.consume(t2), e.exit("definitionMarker"), markerAfter) : n(t2);
  }
  function markerAfter(t2) {
    return markdownLineEndingOrSpace(t2) ? factoryWhitespace(e, destinationBefore)(t2) : destinationBefore(t2);
  }
  function destinationBefore(t2) {
    return factoryDestination(e, destinationAfter, n, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(t2);
  }
  function destinationAfter(t2) {
    return e.attempt(Ue, after, after)(t2);
  }
  function after(t2) {
    return markdownSpace(t2) ? factorySpace(e, afterWhitespace, "whitespace")(t2) : afterWhitespace(t2);
  }
  function afterWhitespace(a) {
    return null === a || markdownLineEnding(a) ? (e.exit("definition"), o.parser.defined.push(i), t(a)) : n(a);
  }
} }, Ue = { partial: true, tokenize: function(e, t, n) {
  return function(t2) {
    return markdownLineEndingOrSpace(t2) ? factoryWhitespace(e, beforeMarker)(t2) : n(t2);
  };
  function beforeMarker(t2) {
    return factoryTitle(e, titleAfter, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(t2);
  }
  function titleAfter(t2) {
    return markdownSpace(t2) ? factorySpace(e, titleAfterOptionalWhitespace, "whitespace")(t2) : titleAfterOptionalWhitespace(t2);
  }
  function titleAfterOptionalWhitespace(e2) {
    return null === e2 || markdownLineEnding(e2) ? t(e2) : n(e2);
  }
} };
const $e = { name: "hardBreakEscape", tokenize: function(e, t, n) {
  return function(t2) {
    return e.enter("hardBreakEscape"), e.consume(t2), after;
  };
  function after(o) {
    return markdownLineEnding(o) ? (e.exit("hardBreakEscape"), t(o)) : n(o);
  }
} };
const Ve = { name: "headingAtx", resolve: function(e, t) {
  let n, o, i = e.length - 2, a = 3;
  "whitespace" === e[a][1].type && (a += 2);
  i - 2 > a && "whitespace" === e[i][1].type && (i -= 2);
  "atxHeadingSequence" === e[i][1].type && (a === i - 1 || i - 4 > a && "whitespace" === e[i - 2][1].type) && (i -= a + 1 === i ? 2 : 4);
  i > a && (n = { type: "atxHeadingText", start: e[a][1].start, end: e[i][1].end }, o = { type: "chunkText", start: e[a][1].start, end: e[i][1].end, contentType: "text" }, splice(e, a, i - a + 1, [["enter", n, t], ["enter", o, t], ["exit", o, t], ["exit", n, t]]));
  return e;
}, tokenize: function(e, t, n) {
  let o = 0;
  return function(t2) {
    return e.enter("atxHeading"), function(t3) {
      return e.enter("atxHeadingSequence"), sequenceOpen(t3);
    }(t2);
  };
  function sequenceOpen(t2) {
    return 35 === t2 && o++ < 6 ? (e.consume(t2), sequenceOpen) : null === t2 || markdownLineEndingOrSpace(t2) ? (e.exit("atxHeadingSequence"), atBreak(t2)) : n(t2);
  }
  function atBreak(n2) {
    return 35 === n2 ? (e.enter("atxHeadingSequence"), sequenceFurther(n2)) : null === n2 || markdownLineEnding(n2) ? (e.exit("atxHeading"), t(n2)) : markdownSpace(n2) ? factorySpace(e, atBreak, "whitespace")(n2) : (e.enter("atxHeadingText"), data(n2));
  }
  function sequenceFurther(t2) {
    return 35 === t2 ? (e.consume(t2), sequenceFurther) : (e.exit("atxHeadingSequence"), atBreak(t2));
  }
  function data(t2) {
    return null === t2 || 35 === t2 || markdownLineEndingOrSpace(t2) ? (e.exit("atxHeadingText"), atBreak(t2)) : (e.consume(t2), data);
  }
} };
const Ge = ["address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "search", "section", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul"], Ke = ["pre", "script", "style", "textarea"], Ye = { concrete: true, name: "htmlFlow", resolveTo: function(e) {
  let t = e.length;
  for (; t-- && ("enter" !== e[t][0] || "htmlFlow" !== e[t][1].type); ) ;
  t > 1 && "linePrefix" === e[t - 2][1].type && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2));
  return e;
}, tokenize: function(e, t, n) {
  const o = this;
  let i, a, s, l2, u2;
  return function(t2) {
    return function(t3) {
      return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(t3), open;
    }(t2);
  };
  function open(l3) {
    return 33 === l3 ? (e.consume(l3), declarationOpen) : 47 === l3 ? (e.consume(l3), a = true, tagCloseStart) : 63 === l3 ? (e.consume(l3), i = 3, o.interrupt ? t : continuationDeclarationInside) : ve(l3) ? (e.consume(l3), s = String.fromCharCode(l3), tagName) : n(l3);
  }
  function declarationOpen(a2) {
    return 45 === a2 ? (e.consume(a2), i = 2, commentOpenInside) : 91 === a2 ? (e.consume(a2), i = 5, l2 = 0, cdataOpenInside) : ve(a2) ? (e.consume(a2), i = 4, o.interrupt ? t : continuationDeclarationInside) : n(a2);
  }
  function commentOpenInside(i2) {
    return 45 === i2 ? (e.consume(i2), o.interrupt ? t : continuationDeclarationInside) : n(i2);
  }
  function cdataOpenInside(i2) {
    const a2 = "CDATA[";
    return i2 === a2.charCodeAt(l2++) ? (e.consume(i2), 6 === l2 ? o.interrupt ? t : continuation : cdataOpenInside) : n(i2);
  }
  function tagCloseStart(t2) {
    return ve(t2) ? (e.consume(t2), s = String.fromCharCode(t2), tagName) : n(t2);
  }
  function tagName(l3) {
    if (null === l3 || 47 === l3 || 62 === l3 || markdownLineEndingOrSpace(l3)) {
      const u3 = 47 === l3, c2 = s.toLowerCase();
      return u3 || a || !Ke.includes(c2) ? Ge.includes(s.toLowerCase()) ? (i = 6, u3 ? (e.consume(l3), basicSelfClosing) : o.interrupt ? t(l3) : continuation(l3)) : (i = 7, o.interrupt && !o.parser.lazy[o.now().line] ? n(l3) : a ? completeClosingTagAfter(l3) : completeAttributeNameBefore(l3)) : (i = 1, o.interrupt ? t(l3) : continuation(l3));
    }
    return 45 === l3 || ke(l3) ? (e.consume(l3), s += String.fromCharCode(l3), tagName) : n(l3);
  }
  function basicSelfClosing(i2) {
    return 62 === i2 ? (e.consume(i2), o.interrupt ? t : continuation) : n(i2);
  }
  function completeClosingTagAfter(t2) {
    return markdownSpace(t2) ? (e.consume(t2), completeClosingTagAfter) : completeEnd(t2);
  }
  function completeAttributeNameBefore(t2) {
    return 47 === t2 ? (e.consume(t2), completeEnd) : 58 === t2 || 95 === t2 || ve(t2) ? (e.consume(t2), completeAttributeName) : markdownSpace(t2) ? (e.consume(t2), completeAttributeNameBefore) : completeEnd(t2);
  }
  function completeAttributeName(t2) {
    return 45 === t2 || 46 === t2 || 58 === t2 || 95 === t2 || ke(t2) ? (e.consume(t2), completeAttributeName) : completeAttributeNameAfter(t2);
  }
  function completeAttributeNameAfter(t2) {
    return 61 === t2 ? (e.consume(t2), completeAttributeValueBefore) : markdownSpace(t2) ? (e.consume(t2), completeAttributeNameAfter) : completeAttributeNameBefore(t2);
  }
  function completeAttributeValueBefore(t2) {
    return null === t2 || 60 === t2 || 61 === t2 || 62 === t2 || 96 === t2 ? n(t2) : 34 === t2 || 39 === t2 ? (e.consume(t2), u2 = t2, completeAttributeValueQuoted) : markdownSpace(t2) ? (e.consume(t2), completeAttributeValueBefore) : completeAttributeValueUnquoted(t2);
  }
  function completeAttributeValueQuoted(t2) {
    return t2 === u2 ? (e.consume(t2), u2 = null, completeAttributeValueQuotedAfter) : null === t2 || markdownLineEnding(t2) ? n(t2) : (e.consume(t2), completeAttributeValueQuoted);
  }
  function completeAttributeValueUnquoted(t2) {
    return null === t2 || 34 === t2 || 39 === t2 || 47 === t2 || 60 === t2 || 61 === t2 || 62 === t2 || 96 === t2 || markdownLineEndingOrSpace(t2) ? completeAttributeNameAfter(t2) : (e.consume(t2), completeAttributeValueUnquoted);
  }
  function completeAttributeValueQuotedAfter(e2) {
    return 47 === e2 || 62 === e2 || markdownSpace(e2) ? completeAttributeNameBefore(e2) : n(e2);
  }
  function completeEnd(t2) {
    return 62 === t2 ? (e.consume(t2), completeAfter) : n(t2);
  }
  function completeAfter(t2) {
    return null === t2 || markdownLineEnding(t2) ? continuation(t2) : markdownSpace(t2) ? (e.consume(t2), completeAfter) : n(t2);
  }
  function continuation(t2) {
    return 45 === t2 && 2 === i ? (e.consume(t2), continuationCommentInside) : 60 === t2 && 1 === i ? (e.consume(t2), continuationRawTagOpen) : 62 === t2 && 4 === i ? (e.consume(t2), continuationClose) : 63 === t2 && 3 === i ? (e.consume(t2), continuationDeclarationInside) : 93 === t2 && 5 === i ? (e.consume(t2), continuationCdataInside) : !markdownLineEnding(t2) || 6 !== i && 7 !== i ? null === t2 || markdownLineEnding(t2) ? (e.exit("htmlFlowData"), continuationStart(t2)) : (e.consume(t2), continuation) : (e.exit("htmlFlowData"), e.check(Xe, continuationAfter, continuationStart)(t2));
  }
  function continuationStart(t2) {
    return e.check(Qe, continuationStartNonLazy, continuationAfter)(t2);
  }
  function continuationStartNonLazy(t2) {
    return e.enter("lineEnding"), e.consume(t2), e.exit("lineEnding"), continuationBefore;
  }
  function continuationBefore(t2) {
    return null === t2 || markdownLineEnding(t2) ? continuationStart(t2) : (e.enter("htmlFlowData"), continuation(t2));
  }
  function continuationCommentInside(t2) {
    return 45 === t2 ? (e.consume(t2), continuationDeclarationInside) : continuation(t2);
  }
  function continuationRawTagOpen(t2) {
    return 47 === t2 ? (e.consume(t2), s = "", continuationRawEndTag) : continuation(t2);
  }
  function continuationRawEndTag(t2) {
    if (62 === t2) {
      const n2 = s.toLowerCase();
      return Ke.includes(n2) ? (e.consume(t2), continuationClose) : continuation(t2);
    }
    return ve(t2) && s.length < 8 ? (e.consume(t2), s += String.fromCharCode(t2), continuationRawEndTag) : continuation(t2);
  }
  function continuationCdataInside(t2) {
    return 93 === t2 ? (e.consume(t2), continuationDeclarationInside) : continuation(t2);
  }
  function continuationDeclarationInside(t2) {
    return 62 === t2 ? (e.consume(t2), continuationClose) : 45 === t2 && 2 === i ? (e.consume(t2), continuationDeclarationInside) : continuation(t2);
  }
  function continuationClose(t2) {
    return null === t2 || markdownLineEnding(t2) ? (e.exit("htmlFlowData"), continuationAfter(t2)) : (e.consume(t2), continuationClose);
  }
  function continuationAfter(n2) {
    return e.exit("htmlFlow"), t(n2);
  }
} }, Xe = { partial: true, tokenize: function(e, t, n) {
  return function(o) {
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), e.attempt(Pe, t, n);
  };
} }, Qe = { partial: true, tokenize: function(e, t, n) {
  const o = this;
  return function(t2) {
    if (markdownLineEnding(t2)) return e.enter("lineEnding"), e.consume(t2), e.exit("lineEnding"), after;
    return n(t2);
  };
  function after(e2) {
    return o.parser.lazy[o.now().line] ? n(e2) : t(e2);
  }
} };
const Ze = { name: "htmlText", tokenize: function(e, t, n) {
  const o = this;
  let i, a, s;
  return function(t2) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(t2), open;
  };
  function open(t2) {
    return 33 === t2 ? (e.consume(t2), declarationOpen) : 47 === t2 ? (e.consume(t2), tagCloseStart) : 63 === t2 ? (e.consume(t2), instruction) : ve(t2) ? (e.consume(t2), tagOpen) : n(t2);
  }
  function declarationOpen(t2) {
    return 45 === t2 ? (e.consume(t2), commentOpenInside) : 91 === t2 ? (e.consume(t2), a = 0, cdataOpenInside) : ve(t2) ? (e.consume(t2), declaration) : n(t2);
  }
  function commentOpenInside(t2) {
    return 45 === t2 ? (e.consume(t2), commentEnd) : n(t2);
  }
  function comment(t2) {
    return null === t2 ? n(t2) : 45 === t2 ? (e.consume(t2), commentClose) : markdownLineEnding(t2) ? (s = comment, lineEndingBefore(t2)) : (e.consume(t2), comment);
  }
  function commentClose(t2) {
    return 45 === t2 ? (e.consume(t2), commentEnd) : comment(t2);
  }
  function commentEnd(e2) {
    return 62 === e2 ? end(e2) : 45 === e2 ? commentClose(e2) : comment(e2);
  }
  function cdataOpenInside(t2) {
    const o2 = "CDATA[";
    return t2 === o2.charCodeAt(a++) ? (e.consume(t2), 6 === a ? cdata : cdataOpenInside) : n(t2);
  }
  function cdata(t2) {
    return null === t2 ? n(t2) : 93 === t2 ? (e.consume(t2), cdataClose) : markdownLineEnding(t2) ? (s = cdata, lineEndingBefore(t2)) : (e.consume(t2), cdata);
  }
  function cdataClose(t2) {
    return 93 === t2 ? (e.consume(t2), cdataEnd) : cdata(t2);
  }
  function cdataEnd(t2) {
    return 62 === t2 ? end(t2) : 93 === t2 ? (e.consume(t2), cdataEnd) : cdata(t2);
  }
  function declaration(t2) {
    return null === t2 || 62 === t2 ? end(t2) : markdownLineEnding(t2) ? (s = declaration, lineEndingBefore(t2)) : (e.consume(t2), declaration);
  }
  function instruction(t2) {
    return null === t2 ? n(t2) : 63 === t2 ? (e.consume(t2), instructionClose) : markdownLineEnding(t2) ? (s = instruction, lineEndingBefore(t2)) : (e.consume(t2), instruction);
  }
  function instructionClose(e2) {
    return 62 === e2 ? end(e2) : instruction(e2);
  }
  function tagCloseStart(t2) {
    return ve(t2) ? (e.consume(t2), tagClose) : n(t2);
  }
  function tagClose(t2) {
    return 45 === t2 || ke(t2) ? (e.consume(t2), tagClose) : tagCloseBetween(t2);
  }
  function tagCloseBetween(t2) {
    return markdownLineEnding(t2) ? (s = tagCloseBetween, lineEndingBefore(t2)) : markdownSpace(t2) ? (e.consume(t2), tagCloseBetween) : end(t2);
  }
  function tagOpen(t2) {
    return 45 === t2 || ke(t2) ? (e.consume(t2), tagOpen) : 47 === t2 || 62 === t2 || markdownLineEndingOrSpace(t2) ? tagOpenBetween(t2) : n(t2);
  }
  function tagOpenBetween(t2) {
    return 47 === t2 ? (e.consume(t2), end) : 58 === t2 || 95 === t2 || ve(t2) ? (e.consume(t2), tagOpenAttributeName) : markdownLineEnding(t2) ? (s = tagOpenBetween, lineEndingBefore(t2)) : markdownSpace(t2) ? (e.consume(t2), tagOpenBetween) : end(t2);
  }
  function tagOpenAttributeName(t2) {
    return 45 === t2 || 46 === t2 || 58 === t2 || 95 === t2 || ke(t2) ? (e.consume(t2), tagOpenAttributeName) : tagOpenAttributeNameAfter(t2);
  }
  function tagOpenAttributeNameAfter(t2) {
    return 61 === t2 ? (e.consume(t2), tagOpenAttributeValueBefore) : markdownLineEnding(t2) ? (s = tagOpenAttributeNameAfter, lineEndingBefore(t2)) : markdownSpace(t2) ? (e.consume(t2), tagOpenAttributeNameAfter) : tagOpenBetween(t2);
  }
  function tagOpenAttributeValueBefore(t2) {
    return null === t2 || 60 === t2 || 61 === t2 || 62 === t2 || 96 === t2 ? n(t2) : 34 === t2 || 39 === t2 ? (e.consume(t2), i = t2, tagOpenAttributeValueQuoted) : markdownLineEnding(t2) ? (s = tagOpenAttributeValueBefore, lineEndingBefore(t2)) : markdownSpace(t2) ? (e.consume(t2), tagOpenAttributeValueBefore) : (e.consume(t2), tagOpenAttributeValueUnquoted);
  }
  function tagOpenAttributeValueQuoted(t2) {
    return t2 === i ? (e.consume(t2), i = void 0, tagOpenAttributeValueQuotedAfter) : null === t2 ? n(t2) : markdownLineEnding(t2) ? (s = tagOpenAttributeValueQuoted, lineEndingBefore(t2)) : (e.consume(t2), tagOpenAttributeValueQuoted);
  }
  function tagOpenAttributeValueUnquoted(t2) {
    return null === t2 || 34 === t2 || 39 === t2 || 60 === t2 || 61 === t2 || 96 === t2 ? n(t2) : 47 === t2 || 62 === t2 || markdownLineEndingOrSpace(t2) ? tagOpenBetween(t2) : (e.consume(t2), tagOpenAttributeValueUnquoted);
  }
  function tagOpenAttributeValueQuotedAfter(e2) {
    return 47 === e2 || 62 === e2 || markdownLineEndingOrSpace(e2) ? tagOpenBetween(e2) : n(e2);
  }
  function end(o2) {
    return 62 === o2 ? (e.consume(o2), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(o2);
  }
  function lineEndingBefore(t2) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(t2), e.exit("lineEnding"), lineEndingAfter;
  }
  function lineEndingAfter(t2) {
    return markdownSpace(t2) ? factorySpace(e, lineEndingAfterPrefix, "linePrefix", o.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t2) : lineEndingAfterPrefix(t2);
  }
  function lineEndingAfterPrefix(t2) {
    return e.enter("htmlTextData"), s(t2);
  }
} };
const Je = { name: "labelEnd", resolveAll: function(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const o = e[t][1];
    if (n.push(e[t]), "labelImage" === o.type || "labelLink" === o.type || "labelEnd" === o.type) {
      const e2 = "labelImage" === o.type ? 4 : 2;
      o.type = "data", t += e2;
    }
  }
  e.length !== n.length && splice(e, 0, e.length, n);
  return e;
}, resolveTo: function(e, t) {
  let n, o, i, a, s = e.length, l2 = 0;
  for (; s--; ) if (n = e[s][1], o) {
    if ("link" === n.type || "labelLink" === n.type && n._inactive) break;
    "enter" === e[s][0] && "labelLink" === n.type && (n._inactive = true);
  } else if (i) {
    if ("enter" === e[s][0] && ("labelImage" === n.type || "labelLink" === n.type) && !n._balanced && (o = s, "labelLink" !== n.type)) {
      l2 = 2;
      break;
    }
  } else "labelEnd" === n.type && (i = s);
  const u2 = { type: "labelLink" === e[o][1].type ? "link" : "image", start: { ...e[o][1].start }, end: { ...e[e.length - 1][1].end } }, c2 = { type: "label", start: { ...e[o][1].start }, end: { ...e[i][1].end } }, f2 = { type: "labelText", start: { ...e[o + l2 + 2][1].end }, end: { ...e[i - 2][1].start } };
  return a = [["enter", u2, t], ["enter", c2, t]], a = push(a, e.slice(o + 1, o + l2 + 3)), a = push(a, [["enter", f2, t]]), a = push(a, resolveAll(t.parser.constructs.insideSpan.null, e.slice(o + l2 + 4, i - 3), t)), a = push(a, [["exit", f2, t], e[i - 2], e[i - 1], ["exit", c2, t]]), a = push(a, e.slice(i + 1)), a = push(a, [["exit", u2, t]]), splice(e, o, e.length, a), e;
}, tokenize: function(e, t, n) {
  const o = this;
  let i, a, s = o.events.length;
  for (; s--; ) if (("labelImage" === o.events[s][1].type || "labelLink" === o.events[s][1].type) && !o.events[s][1]._balanced) {
    i = o.events[s][1];
    break;
  }
  return function(t2) {
    if (!i) return n(t2);
    if (i._inactive) return labelEndNok(t2);
    return a = o.parser.defined.includes(normalizeIdentifier(o.sliceSerialize({ start: i.end, end: o.now() }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(t2), e.exit("labelMarker"), e.exit("labelEnd"), after;
  };
  function after(t2) {
    return 40 === t2 ? e.attempt(et, labelEndOk, a ? labelEndOk : labelEndNok)(t2) : 91 === t2 ? e.attempt(tt, labelEndOk, a ? referenceNotFull : labelEndNok)(t2) : a ? labelEndOk(t2) : labelEndNok(t2);
  }
  function referenceNotFull(t2) {
    return e.attempt(nt, labelEndOk, labelEndNok)(t2);
  }
  function labelEndOk(e2) {
    return t(e2);
  }
  function labelEndNok(e2) {
    return i._balanced = true, n(e2);
  }
} }, et = { tokenize: function(e, t, n) {
  return function(t2) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(t2), e.exit("resourceMarker"), resourceBefore;
  };
  function resourceBefore(t2) {
    return markdownLineEndingOrSpace(t2) ? factoryWhitespace(e, resourceOpen)(t2) : resourceOpen(t2);
  }
  function resourceOpen(t2) {
    return 41 === t2 ? resourceEnd(t2) : factoryDestination(e, resourceDestinationAfter, resourceDestinationMissing, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(t2);
  }
  function resourceDestinationAfter(t2) {
    return markdownLineEndingOrSpace(t2) ? factoryWhitespace(e, resourceBetween)(t2) : resourceEnd(t2);
  }
  function resourceDestinationMissing(e2) {
    return n(e2);
  }
  function resourceBetween(t2) {
    return 34 === t2 || 39 === t2 || 40 === t2 ? factoryTitle(e, resourceTitleAfter, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(t2) : resourceEnd(t2);
  }
  function resourceTitleAfter(t2) {
    return markdownLineEndingOrSpace(t2) ? factoryWhitespace(e, resourceEnd)(t2) : resourceEnd(t2);
  }
  function resourceEnd(o) {
    return 41 === o ? (e.enter("resourceMarker"), e.consume(o), e.exit("resourceMarker"), e.exit("resource"), t) : n(o);
  }
} }, tt = { tokenize: function(e, t, n) {
  const o = this;
  return function(t2) {
    return factoryLabel.call(o, e, referenceFullAfter, referenceFullMissing, "reference", "referenceMarker", "referenceString")(t2);
  };
  function referenceFullAfter(e2) {
    return o.parser.defined.includes(normalizeIdentifier(o.sliceSerialize(o.events[o.events.length - 1][1]).slice(1, -1))) ? t(e2) : n(e2);
  }
  function referenceFullMissing(e2) {
    return n(e2);
  }
} }, nt = { tokenize: function(e, t, n) {
  return function(t2) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(t2), e.exit("referenceMarker"), referenceCollapsedOpen;
  };
  function referenceCollapsedOpen(o) {
    return 93 === o ? (e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), e.exit("reference"), t) : n(o);
  }
} };
const rt = { name: "labelStartImage", resolveAll: Je.resolveAll, tokenize: function(e, t, n) {
  const o = this;
  return function(t2) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(t2), e.exit("labelImageMarker"), open;
  };
  function open(t2) {
    return 91 === t2 ? (e.enter("labelMarker"), e.consume(t2), e.exit("labelMarker"), e.exit("labelImage"), after) : n(t2);
  }
  function after(e2) {
    return 94 === e2 && "_hiddenFootnoteSupport" in o.parser.constructs ? n(e2) : t(e2);
  }
} };
const ot = { name: "labelStartLink", resolveAll: Je.resolveAll, tokenize: function(e, t, n) {
  const o = this;
  return function(t2) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(t2), e.exit("labelMarker"), e.exit("labelLink"), after;
  };
  function after(e2) {
    return 94 === e2 && "_hiddenFootnoteSupport" in o.parser.constructs ? n(e2) : t(e2);
  }
} };
const it = { name: "lineEnding", tokenize: function(e, t) {
  return function(n) {
    return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), factorySpace(e, t, "linePrefix");
  };
} };
const at = { name: "thematicBreak", tokenize: function(e, t, n) {
  let o, i = 0;
  return function(t2) {
    return e.enter("thematicBreak"), function(e2) {
      return o = e2, atBreak(e2);
    }(t2);
  };
  function atBreak(a) {
    return a === o ? (e.enter("thematicBreakSequence"), sequence(a)) : i >= 3 && (null === a || markdownLineEnding(a)) ? (e.exit("thematicBreak"), t(a)) : n(a);
  }
  function sequence(t2) {
    return t2 === o ? (e.consume(t2), i++, sequence) : (e.exit("thematicBreakSequence"), markdownSpace(t2) ? factorySpace(e, atBreak, "whitespace")(t2) : atBreak(t2));
  }
} };
const st = { continuation: { tokenize: function(e, t, n) {
  const o = this;
  return o.containerState._closeFlow = void 0, e.check(Pe, onBlank, notBlank);
  function onBlank(n2) {
    return o.containerState.furtherBlankLines = o.containerState.furtherBlankLines || o.containerState.initialBlankLine, factorySpace(e, t, "listItemIndent", o.containerState.size + 1)(n2);
  }
  function notBlank(n2) {
    return o.containerState.furtherBlankLines || !markdownSpace(n2) ? (o.containerState.furtherBlankLines = void 0, o.containerState.initialBlankLine = void 0, notInCurrentItem(n2)) : (o.containerState.furtherBlankLines = void 0, o.containerState.initialBlankLine = void 0, e.attempt(ut, t, notInCurrentItem)(n2));
  }
  function notInCurrentItem(i) {
    return o.containerState._closeFlow = true, o.interrupt = void 0, factorySpace(e, e.attempt(st, t, n), "linePrefix", o.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i);
  }
} }, exit: function(e) {
  e.exit(this.containerState.type);
}, name: "list", tokenize: function(e, t, n) {
  const o = this, i = o.events[o.events.length - 1];
  let a = i && "linePrefix" === i[1].type ? i[2].sliceSerialize(i[1], true).length : 0, s = 0;
  return function(t2) {
    const i2 = o.containerState.type || (42 === t2 || 43 === t2 || 45 === t2 ? "listUnordered" : "listOrdered");
    if ("listUnordered" === i2 ? !o.containerState.marker || t2 === o.containerState.marker : we(t2)) {
      if (o.containerState.type || (o.containerState.type = i2, e.enter(i2, { _container: true })), "listUnordered" === i2) return e.enter("listItemPrefix"), 42 === t2 || 45 === t2 ? e.check(at, n, atMarker)(t2) : atMarker(t2);
      if (!o.interrupt || 49 === t2) return e.enter("listItemPrefix"), e.enter("listItemValue"), inside(t2);
    }
    return n(t2);
  };
  function inside(t2) {
    return we(t2) && ++s < 10 ? (e.consume(t2), inside) : (!o.interrupt || s < 2) && (o.containerState.marker ? t2 === o.containerState.marker : 41 === t2 || 46 === t2) ? (e.exit("listItemValue"), atMarker(t2)) : n(t2);
  }
  function atMarker(t2) {
    return e.enter("listItemMarker"), e.consume(t2), e.exit("listItemMarker"), o.containerState.marker = o.containerState.marker || t2, e.check(Pe, o.interrupt ? n : onBlank, e.attempt(lt, endOfPrefix, otherPrefix));
  }
  function onBlank(e2) {
    return o.containerState.initialBlankLine = true, a++, endOfPrefix(e2);
  }
  function otherPrefix(t2) {
    return markdownSpace(t2) ? (e.enter("listItemPrefixWhitespace"), e.consume(t2), e.exit("listItemPrefixWhitespace"), endOfPrefix) : n(t2);
  }
  function endOfPrefix(n2) {
    return o.containerState.size = a + o.sliceSerialize(e.exit("listItemPrefix"), true).length, t(n2);
  }
} }, lt = { partial: true, tokenize: function(e, t, n) {
  const o = this;
  return factorySpace(e, function(e2) {
    const i = o.events[o.events.length - 1];
    return !markdownSpace(e2) && i && "listItemPrefixWhitespace" === i[1].type ? t(e2) : n(e2);
  }, "listItemPrefixWhitespace", o.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
} }, ut = { partial: true, tokenize: function(e, t, n) {
  const o = this;
  return factorySpace(e, function(e2) {
    const i = o.events[o.events.length - 1];
    return i && "listItemIndent" === i[1].type && i[2].sliceSerialize(i[1], true).length === o.containerState.size ? t(e2) : n(e2);
  }, "listItemIndent", o.containerState.size + 1);
} };
const ct = { name: "setextUnderline", resolveTo: function(e, t) {
  let n, o, i, a = e.length;
  for (; a--; ) if ("enter" === e[a][0]) {
    if ("content" === e[a][1].type) {
      n = a;
      break;
    }
    "paragraph" === e[a][1].type && (o = a);
  } else "content" === e[a][1].type && e.splice(a, 1), i || "definition" !== e[a][1].type || (i = a);
  const s = { type: "setextHeading", start: { ...e[n][1].start }, end: { ...e[e.length - 1][1].end } };
  e[o][1].type = "setextHeadingText", i ? (e.splice(o, 0, ["enter", s, t]), e.splice(i + 1, 0, ["exit", e[n][1], t]), e[n][1].end = { ...e[i][1].end }) : e[n][1] = s;
  return e.push(["exit", s, t]), e;
}, tokenize: function(e, t, n) {
  const o = this;
  let i;
  return function(t2) {
    let a, s = o.events.length;
    for (; s--; ) if ("lineEnding" !== o.events[s][1].type && "linePrefix" !== o.events[s][1].type && "content" !== o.events[s][1].type) {
      a = "paragraph" === o.events[s][1].type;
      break;
    }
    if (!o.parser.lazy[o.now().line] && (o.interrupt || a)) return e.enter("setextHeadingLine"), i = t2, function(t3) {
      return e.enter("setextHeadingLineSequence"), inside(t3);
    }(t2);
    return n(t2);
  };
  function inside(t2) {
    return t2 === i ? (e.consume(t2), inside) : (e.exit("setextHeadingLineSequence"), markdownSpace(t2) ? factorySpace(e, after, "lineSuffix")(t2) : after(t2));
  }
  function after(o2) {
    return null === o2 || markdownLineEnding(o2) ? (e.exit("setextHeadingLine"), t(o2)) : n(o2);
  }
} };
const ft = { tokenize: function(e) {
  const t = this, n = e.attempt(Pe, function(o) {
    if (null === o) return void e.consume(o);
    return e.enter("lineEndingBlank"), e.consume(o), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
  }, e.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(e, e.attempt(this.parser.constructs.flow, afterConstruct, e.attempt(Be, afterConstruct)), "linePrefix")));
  return n;
  function afterConstruct(o) {
    if (null !== o) return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), t.currentConstruct = void 0, n;
    e.consume(o);
  }
} };
const pt = { resolveAll: createResolver() }, dt = initializeFactory("string"), ht = initializeFactory("text");
function initializeFactory(e) {
  return { resolveAll: createResolver("text" === e ? resolveAllLineSuffixes : void 0), tokenize: function(t) {
    const n = this, o = this.parser.constructs[e], i = t.attempt(o, start, notText);
    return start;
    function start(e2) {
      return atBreak(e2) ? i(e2) : notText(e2);
    }
    function notText(e2) {
      if (null !== e2) return t.enter("data"), t.consume(e2), data;
      t.consume(e2);
    }
    function data(e2) {
      return atBreak(e2) ? (t.exit("data"), i(e2)) : (t.consume(e2), data);
    }
    function atBreak(e2) {
      if (null === e2) return true;
      const t2 = o[e2];
      let i2 = -1;
      if (t2) for (; ++i2 < t2.length; ) {
        const e3 = t2[i2];
        if (!e3.previous || e3.previous.call(n, n.previous)) return true;
      }
      return false;
    }
  } };
}
function createResolver(e) {
  return function(t, n) {
    let o, i = -1;
    for (; ++i <= t.length; ) void 0 === o ? t[i] && "data" === t[i][1].type && (o = i, i++) : t[i] && "data" === t[i][1].type || (i !== o + 2 && (t[o][1].end = t[i - 1][1].end, t.splice(o + 2, i - o - 2), i = o + 2), o = void 0);
    return e ? e(t, n) : t;
  };
}
function resolveAllLineSuffixes(e, t) {
  let n = 0;
  for (; ++n <= e.length; ) if ((n === e.length || "lineEnding" === e[n][1].type) && "data" === e[n - 1][1].type) {
    const o = e[n - 1][1], i = t.sliceStream(o);
    let a, s = i.length, l2 = -1, u2 = 0;
    for (; s--; ) {
      const e2 = i[s];
      if ("string" == typeof e2) {
        for (l2 = e2.length; 32 === e2.charCodeAt(l2 - 1); ) u2++, l2--;
        if (l2) break;
        l2 = -1;
      } else if (-2 === e2) a = true, u2++;
      else if (-1 !== e2) {
        s++;
        break;
      }
    }
    if (t._contentTypeTextTrailing && n === e.length && (u2 = 0), u2) {
      const i2 = { type: n === e.length || a || u2 < 2 ? "lineSuffix" : "hardBreakTrailing", start: { _bufferIndex: s ? l2 : o.start._bufferIndex + l2, _index: o.start._index + s, line: o.end.line, column: o.end.column - u2, offset: o.end.offset - u2 }, end: { ...o.end } };
      o.end = { ...i2.start }, o.start.offset === o.end.offset ? Object.assign(o, i2) : (e.splice(n, 0, ["enter", i2, t], ["exit", i2, t]), n += 2);
    }
    n++;
  }
  return e;
}
const gt = { 42: st, 43: st, 45: st, 48: st, 49: st, 50: st, 51: st, 52: st, 53: st, 54: st, 55: st, 56: st, 57: st, 62: Le }, mt = { 91: We }, yt = { [-2]: qe, [-1]: qe, 32: qe }, bt = { 35: Ve, 42: at, 45: [ct, at], 60: Ye, 61: ct, 95: at, 96: Me, 126: Me }, vt = { 38: ze, 92: Te }, kt = { [-5]: it, [-4]: it, [-3]: it, 33: rt, 38: ze, 42: De, 60: [Re, Ze], 91: ot, 92: [$e, Te], 93: Je, 95: De, 96: Ne }, xt = { null: [De, pt] }, wt = Object.freeze(Object.defineProperty({ __proto__: null, attentionMarkers: { null: [42, 95] }, contentInitial: mt, disable: { null: [] }, document: gt, flow: bt, flowInitial: yt, insideSpan: xt, string: vt, text: kt }, Symbol.toStringTag, { value: "Module" }));
function createTokenizer(e, t, n) {
  let o = { _bufferIndex: -1, _index: 0, line: n && n.line || 1, column: n && n.column || 1, offset: n && n.offset || 0 };
  const i = {}, a = [];
  let s = [], l2 = [];
  const u2 = { attempt: constructFactory(function(e2, t2) {
    addResult(e2, t2.from);
  }), check: constructFactory(onsuccessfulcheck), consume: function(e2) {
    markdownLineEnding(e2) ? (o.line++, o.column = 1, o.offset += -3 === e2 ? 2 : 1, accountForPotentialSkip()) : -1 !== e2 && (o.column++, o.offset++);
    o._bufferIndex < 0 ? o._index++ : (o._bufferIndex++, o._bufferIndex === s[o._index].length && (o._bufferIndex = -1, o._index++));
    c2.previous = e2;
  }, enter: function(e2, t2) {
    const n2 = t2 || {};
    return n2.type = e2, n2.start = now(), c2.events.push(["enter", n2, c2]), l2.push(n2), n2;
  }, exit: function(e2) {
    const t2 = l2.pop();
    return t2.end = now(), c2.events.push(["exit", t2, c2]), t2;
  }, interrupt: constructFactory(onsuccessfulcheck, { interrupt: true }) }, c2 = { code: null, containerState: {}, defineSkip: function(e2) {
    i[e2.line] = e2.column, accountForPotentialSkip();
  }, events: [], now, parser: e, previous: null, sliceSerialize: function(e2, t2) {
    return function(e3, t3) {
      let n2 = -1;
      const o2 = [];
      let i2;
      for (; ++n2 < e3.length; ) {
        const a2 = e3[n2];
        let s2;
        if ("string" == typeof a2) s2 = a2;
        else switch (a2) {
          case -5:
            s2 = "\r";
            break;
          case -4:
            s2 = "\n";
            break;
          case -3:
            s2 = "\r\n";
            break;
          case -2:
            s2 = t3 ? " " : "	";
            break;
          case -1:
            if (!t3 && i2) continue;
            s2 = " ";
            break;
          default:
            s2 = String.fromCharCode(a2);
        }
        i2 = -2 === a2, o2.push(s2);
      }
      return o2.join("");
    }(sliceStream(e2), t2);
  }, sliceStream, write: function(e2) {
    if (s = push(s, e2), main(), null !== s[s.length - 1]) return [];
    return addResult(t, 0), c2.events = resolveAll(a, c2.events, c2), c2.events;
  } };
  let f2 = t.tokenize.call(c2, u2);
  return t.resolveAll && a.push(t), c2;
  function sliceStream(e2) {
    return function(e3, t2) {
      const n2 = t2.start._index, o2 = t2.start._bufferIndex, i2 = t2.end._index, a2 = t2.end._bufferIndex;
      let s2;
      if (n2 === i2) s2 = [e3[n2].slice(o2, a2)];
      else {
        if (s2 = e3.slice(n2, i2), o2 > -1) {
          const e4 = s2[0];
          "string" == typeof e4 ? s2[0] = e4.slice(o2) : s2.shift();
        }
        a2 > 0 && s2.push(e3[i2].slice(0, a2));
      }
      return s2;
    }(s, e2);
  }
  function now() {
    const { _bufferIndex: e2, _index: t2, line: n2, column: i2, offset: a2 } = o;
    return { _bufferIndex: e2, _index: t2, line: n2, column: i2, offset: a2 };
  }
  function main() {
    let e2;
    for (; o._index < s.length; ) {
      const t2 = s[o._index];
      if ("string" == typeof t2) for (e2 = o._index, o._bufferIndex < 0 && (o._bufferIndex = 0); o._index === e2 && o._bufferIndex < t2.length; ) go(t2.charCodeAt(o._bufferIndex));
      else go(t2);
    }
  }
  function go(e2) {
    f2 = f2(e2);
  }
  function onsuccessfulcheck(e2, t2) {
    t2.restore();
  }
  function constructFactory(e2, t2) {
    return function(n2, i2, a2) {
      let s2, f3, p2, d2;
      return Array.isArray(n2) ? handleListOfConstructs(n2) : "tokenize" in n2 ? handleListOfConstructs([n2]) : /* @__PURE__ */ function(e3) {
        return start;
        function start(t3) {
          const n3 = null !== t3 && e3[t3], o2 = null !== t3 && e3.null;
          return handleListOfConstructs([...Array.isArray(n3) ? n3 : n3 ? [n3] : [], ...Array.isArray(o2) ? o2 : o2 ? [o2] : []])(t3);
        }
      }(n2);
      function handleListOfConstructs(e3) {
        return s2 = e3, f3 = 0, 0 === e3.length ? a2 : handleConstruct(e3[f3]);
      }
      function handleConstruct(e3) {
        return function(n3) {
          d2 = function() {
            const e4 = now(), t3 = c2.previous, n4 = c2.currentConstruct, i3 = c2.events.length, a3 = Array.from(l2);
            return { from: i3, restore };
            function restore() {
              o = e4, c2.previous = t3, c2.currentConstruct = n4, c2.events.length = i3, l2 = a3, accountForPotentialSkip();
            }
          }(), p2 = e3, e3.partial || (c2.currentConstruct = e3);
          if (e3.name && c2.parser.constructs.disable.null.includes(e3.name)) return nok();
          return e3.tokenize.call(t2 ? Object.assign(Object.create(c2), t2) : c2, u2, ok2, nok)(n3);
        };
      }
      function ok2(t3) {
        return e2(p2, d2), i2;
      }
      function nok(e3) {
        return d2.restore(), ++f3 < s2.length ? handleConstruct(s2[f3]) : a2;
      }
    };
  }
  function addResult(e2, t2) {
    e2.resolveAll && !a.includes(e2) && a.push(e2), e2.resolve && splice(c2.events, t2, c2.events.length - t2, e2.resolve(c2.events.slice(t2), c2)), e2.resolveTo && (c2.events = e2.resolveTo(c2.events, c2));
  }
  function accountForPotentialSkip() {
    o.line in i && o.column < 2 && (o.column = i[o.line], o.offset += i[o.line] - 1);
  }
}
const St = /[\0\t\n\r]/g;
const _t = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function decode(e, t, n) {
  if (t) return t;
  if (35 === n.charCodeAt(0)) {
    const e2 = n.charCodeAt(1), t2 = 120 === e2 || 88 === e2;
    return decodeNumericCharacterReference(n.slice(t2 ? 2 : 1), t2 ? 16 : 10);
  }
  return decodeNamedCharacterReference(n) || e;
}
const Ct = {}.hasOwnProperty;
function fromMarkdown(e, t, n) {
  return "string" != typeof t && (n = t, t = void 0), function(e2) {
    const t2 = { transforms: [], canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"], enter: { autolink: opener(link2), autolinkProtocol: onenterdata, autolinkEmail: onenterdata, atxHeading: opener(heading), blockQuote: opener(blockQuote), characterEscape: onenterdata, characterReference: onenterdata, codeFenced: opener(codeFlow), codeFencedFenceInfo: buffer, codeFencedFenceMeta: buffer, codeIndented: opener(codeFlow, buffer), codeText: opener(codeText, buffer), codeTextData: onenterdata, data: onenterdata, codeFlowValue: onenterdata, definition: opener(definition), definitionDestinationString: buffer, definitionLabelString: buffer, definitionTitleString: buffer, emphasis: opener(emphasis2), hardBreakEscape: opener(hardBreak2), hardBreakTrailing: opener(hardBreak2), htmlFlow: opener(html2, buffer), htmlFlowData: onenterdata, htmlText: opener(html2, buffer), htmlTextData: onenterdata, image: opener(image2), label: buffer, link: opener(link2), listItem: opener(listItem), listItemValue: onenterlistitemvalue, listOrdered: opener(list, onenterlistordered), listUnordered: opener(list), paragraph: opener(paragraph), reference: onenterreference, referenceString: buffer, resourceDestinationString: buffer, resourceTitleString: buffer, setextHeading: opener(heading), strong: opener(strong2), thematicBreak: opener(thematicBreak) }, exit: { atxHeading: closer(), atxHeadingSequence: onexitatxheadingsequence, autolink: closer(), autolinkEmail: onexitautolinkemail, autolinkProtocol: onexitautolinkprotocol, blockQuote: closer(), characterEscapeValue: onexitdata, characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker, characterReferenceMarkerNumeric: onexitcharacterreferencemarker, characterReferenceValue: onexitcharacterreferencevalue, characterReference: onexitcharacterreference, codeFenced: closer(onexitcodefenced), codeFencedFence: onexitcodefencedfence, codeFencedFenceInfo: onexitcodefencedfenceinfo, codeFencedFenceMeta: onexitcodefencedfencemeta, codeFlowValue: onexitdata, codeIndented: closer(onexitcodeindented), codeText: closer(onexitcodetext), codeTextData: onexitdata, data: onexitdata, definition: closer(), definitionDestinationString: onexitdefinitiondestinationstring, definitionLabelString: onexitdefinitionlabelstring, definitionTitleString: onexitdefinitiontitlestring, emphasis: closer(), hardBreakEscape: closer(onexithardbreak), hardBreakTrailing: closer(onexithardbreak), htmlFlow: closer(onexithtmlflow), htmlFlowData: onexitdata, htmlText: closer(onexithtmltext), htmlTextData: onexitdata, image: closer(onexitimage), label: onexitlabel, labelText: onexitlabeltext, lineEnding: onexitlineending, link: closer(onexitlink), listItem: closer(), listOrdered: closer(), listUnordered: closer(), paragraph: closer(), referenceString: onexitreferencestring, resourceDestinationString: onexitresourcedestinationstring, resourceTitleString: onexitresourcetitlestring, resource: onexitresource, setextHeading: closer(onexitsetextheading), setextHeadingLineSequence: onexitsetextheadinglinesequence, setextHeadingText: onexitsetextheadingtext, strong: closer(), thematicBreak: closer() } };
    configure(t2, (e2 || {}).mdastExtensions || []);
    const n2 = {};
    return compile;
    function compile(e3) {
      let o = { type: "root", children: [] };
      const i = { stack: [o], tokenStack: [], config: t2, enter, exit: exit2, buffer, resume, data: n2 }, a = [];
      let s = -1;
      for (; ++s < e3.length; ) if ("listOrdered" === e3[s][1].type || "listUnordered" === e3[s][1].type) if ("enter" === e3[s][0]) a.push(s);
      else {
        s = prepareList(e3, a.pop(), s);
      }
      for (s = -1; ++s < e3.length; ) {
        const n3 = t2[e3[s][0]];
        Ct.call(n3, e3[s][1].type) && n3[e3[s][1].type].call(Object.assign({ sliceSerialize: e3[s][2].sliceSerialize }, i), e3[s][1]);
      }
      if (i.tokenStack.length > 0) {
        const e4 = i.tokenStack[i.tokenStack.length - 1];
        (e4[1] || defaultOnError).call(i, void 0, e4[0]);
      }
      for (o.position = { start: point(e3.length > 0 ? e3[0][1].start : { line: 1, column: 1, offset: 0 }), end: point(e3.length > 0 ? e3[e3.length - 2][1].end : { line: 1, column: 1, offset: 0 }) }, s = -1; ++s < t2.transforms.length; ) o = t2.transforms[s](o) || o;
      return o;
    }
    function prepareList(e3, t3, n3) {
      let o, i, a, s, l2 = t3 - 1, u2 = -1, c2 = false;
      for (; ++l2 <= n3; ) {
        const t4 = e3[l2];
        switch (t4[1].type) {
          case "listUnordered":
          case "listOrdered":
          case "blockQuote":
            "enter" === t4[0] ? u2++ : u2--, s = void 0;
            break;
          case "lineEndingBlank":
            "enter" === t4[0] && (!o || s || u2 || a || (a = l2), s = void 0);
            break;
          case "linePrefix":
          case "listItemValue":
          case "listItemMarker":
          case "listItemPrefix":
          case "listItemPrefixWhitespace":
            break;
          default:
            s = void 0;
        }
        if (!u2 && "enter" === t4[0] && "listItemPrefix" === t4[1].type || -1 === u2 && "exit" === t4[0] && ("listUnordered" === t4[1].type || "listOrdered" === t4[1].type)) {
          if (o) {
            let s2 = l2;
            for (i = void 0; s2--; ) {
              const t5 = e3[s2];
              if ("lineEnding" === t5[1].type || "lineEndingBlank" === t5[1].type) {
                if ("exit" === t5[0]) continue;
                i && (e3[i][1].type = "lineEndingBlank", c2 = true), t5[1].type = "lineEnding", i = s2;
              } else if ("linePrefix" !== t5[1].type && "blockQuotePrefix" !== t5[1].type && "blockQuotePrefixWhitespace" !== t5[1].type && "blockQuoteMarker" !== t5[1].type && "listItemIndent" !== t5[1].type) break;
            }
            a && (!i || a < i) && (o._spread = true), o.end = Object.assign({}, i ? e3[i][1].start : t4[1].end), e3.splice(i || l2, 0, ["exit", o, t4[2]]), l2++, n3++;
          }
          if ("listItemPrefix" === t4[1].type) {
            const i2 = { type: "listItem", _spread: false, start: Object.assign({}, t4[1].start), end: void 0 };
            o = i2, e3.splice(l2, 0, ["enter", i2, t4[2]]), l2++, n3++, a = void 0, s = true;
          }
        }
      }
      return e3[t3][1]._spread = c2, n3;
    }
    function opener(e3, t3) {
      return open;
      function open(n3) {
        enter.call(this, e3(n3), n3), t3 && t3.call(this, n3);
      }
    }
    function buffer() {
      this.stack.push({ type: "fragment", children: [] });
    }
    function enter(e3, t3, n3) {
      this.stack[this.stack.length - 1].children.push(e3), this.stack.push(e3), this.tokenStack.push([t3, n3 || void 0]), e3.position = { start: point(t3.start), end: void 0 };
    }
    function closer(e3) {
      return close;
      function close(t3) {
        e3 && e3.call(this, t3), exit2.call(this, t3);
      }
    }
    function exit2(e3, t3) {
      const n3 = this.stack.pop(), o = this.tokenStack.pop();
      if (!o) throw new Error("Cannot close `" + e3.type + "` (" + stringifyPosition({ start: e3.start, end: e3.end }) + "): it’s not open");
      if (o[0].type !== e3.type) if (t3) t3.call(this, e3, o[0]);
      else {
        (o[1] || defaultOnError).call(this, e3, o[0]);
      }
      n3.position.end = point(e3.end);
    }
    function resume() {
      return toString$2(this.stack.pop());
    }
    function onenterlistordered() {
      this.data.expectingFirstListItemValue = true;
    }
    function onenterlistitemvalue(e3) {
      if (this.data.expectingFirstListItemValue) {
        this.stack[this.stack.length - 2].start = Number.parseInt(this.sliceSerialize(e3), 10), this.data.expectingFirstListItemValue = void 0;
      }
    }
    function onexitcodefencedfenceinfo() {
      const e3 = this.resume();
      this.stack[this.stack.length - 1].lang = e3;
    }
    function onexitcodefencedfencemeta() {
      const e3 = this.resume();
      this.stack[this.stack.length - 1].meta = e3;
    }
    function onexitcodefencedfence() {
      this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = true);
    }
    function onexitcodefenced() {
      const e3 = this.resume();
      this.stack[this.stack.length - 1].value = e3.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
    }
    function onexitcodeindented() {
      const e3 = this.resume();
      this.stack[this.stack.length - 1].value = e3.replace(/(\r?\n|\r)$/g, "");
    }
    function onexitdefinitionlabelstring(e3) {
      const t3 = this.resume(), n3 = this.stack[this.stack.length - 1];
      n3.label = t3, n3.identifier = normalizeIdentifier(this.sliceSerialize(e3)).toLowerCase();
    }
    function onexitdefinitiontitlestring() {
      const e3 = this.resume();
      this.stack[this.stack.length - 1].title = e3;
    }
    function onexitdefinitiondestinationstring() {
      const e3 = this.resume();
      this.stack[this.stack.length - 1].url = e3;
    }
    function onexitatxheadingsequence(e3) {
      const t3 = this.stack[this.stack.length - 1];
      if (!t3.depth) {
        const n3 = this.sliceSerialize(e3).length;
        t3.depth = n3;
      }
    }
    function onexitsetextheadingtext() {
      this.data.setextHeadingSlurpLineEnding = true;
    }
    function onexitsetextheadinglinesequence(e3) {
      this.stack[this.stack.length - 1].depth = 61 === this.sliceSerialize(e3).codePointAt(0) ? 1 : 2;
    }
    function onexitsetextheading() {
      this.data.setextHeadingSlurpLineEnding = void 0;
    }
    function onenterdata(e3) {
      const t3 = this.stack[this.stack.length - 1].children;
      let n3 = t3[t3.length - 1];
      n3 && "text" === n3.type || (n3 = text(), n3.position = { start: point(e3.start), end: void 0 }, t3.push(n3)), this.stack.push(n3);
    }
    function onexitdata(e3) {
      const t3 = this.stack.pop();
      t3.value += this.sliceSerialize(e3), t3.position.end = point(e3.end);
    }
    function onexitlineending(e3) {
      const n3 = this.stack[this.stack.length - 1];
      if (this.data.atHardBreak) {
        return n3.children[n3.children.length - 1].position.end = point(e3.end), void (this.data.atHardBreak = void 0);
      }
      !this.data.setextHeadingSlurpLineEnding && t2.canContainEols.includes(n3.type) && (onenterdata.call(this, e3), onexitdata.call(this, e3));
    }
    function onexithardbreak() {
      this.data.atHardBreak = true;
    }
    function onexithtmlflow() {
      const e3 = this.resume();
      this.stack[this.stack.length - 1].value = e3;
    }
    function onexithtmltext() {
      const e3 = this.resume();
      this.stack[this.stack.length - 1].value = e3;
    }
    function onexitcodetext() {
      const e3 = this.resume();
      this.stack[this.stack.length - 1].value = e3;
    }
    function onexitlink() {
      const e3 = this.stack[this.stack.length - 1];
      if (this.data.inReference) {
        const t3 = this.data.referenceType || "shortcut";
        e3.type += "Reference", e3.referenceType = t3, delete e3.url, delete e3.title;
      } else delete e3.identifier, delete e3.label;
      this.data.referenceType = void 0;
    }
    function onexitimage() {
      const e3 = this.stack[this.stack.length - 1];
      if (this.data.inReference) {
        const t3 = this.data.referenceType || "shortcut";
        e3.type += "Reference", e3.referenceType = t3, delete e3.url, delete e3.title;
      } else delete e3.identifier, delete e3.label;
      this.data.referenceType = void 0;
    }
    function onexitlabeltext(e3) {
      const t3 = this.sliceSerialize(e3), n3 = this.stack[this.stack.length - 2];
      n3.label = function(e4) {
        return e4.replace(_t, decode);
      }(t3), n3.identifier = normalizeIdentifier(t3).toLowerCase();
    }
    function onexitlabel() {
      const e3 = this.stack[this.stack.length - 1], t3 = this.resume(), n3 = this.stack[this.stack.length - 1];
      if (this.data.inReference = true, "link" === n3.type) {
        const t4 = e3.children;
        n3.children = t4;
      } else n3.alt = t3;
    }
    function onexitresourcedestinationstring() {
      const e3 = this.resume();
      this.stack[this.stack.length - 1].url = e3;
    }
    function onexitresourcetitlestring() {
      const e3 = this.resume();
      this.stack[this.stack.length - 1].title = e3;
    }
    function onexitresource() {
      this.data.inReference = void 0;
    }
    function onenterreference() {
      this.data.referenceType = "collapsed";
    }
    function onexitreferencestring(e3) {
      const t3 = this.resume(), n3 = this.stack[this.stack.length - 1];
      n3.label = t3, n3.identifier = normalizeIdentifier(this.sliceSerialize(e3)).toLowerCase(), this.data.referenceType = "full";
    }
    function onexitcharacterreferencemarker(e3) {
      this.data.characterReferenceType = e3.type;
    }
    function onexitcharacterreferencevalue(e3) {
      const t3 = this.sliceSerialize(e3), n3 = this.data.characterReferenceType;
      let o;
      if (n3) o = decodeNumericCharacterReference(t3, "characterReferenceMarkerNumeric" === n3 ? 10 : 16), this.data.characterReferenceType = void 0;
      else {
        o = decodeNamedCharacterReference(t3);
      }
      this.stack[this.stack.length - 1].value += o;
    }
    function onexitcharacterreference(e3) {
      this.stack.pop().position.end = point(e3.end);
    }
    function onexitautolinkprotocol(e3) {
      onexitdata.call(this, e3);
      this.stack[this.stack.length - 1].url = this.sliceSerialize(e3);
    }
    function onexitautolinkemail(e3) {
      onexitdata.call(this, e3);
      this.stack[this.stack.length - 1].url = "mailto:" + this.sliceSerialize(e3);
    }
    function blockQuote() {
      return { type: "blockquote", children: [] };
    }
    function codeFlow() {
      return { type: "code", lang: null, meta: null, value: "" };
    }
    function codeText() {
      return { type: "inlineCode", value: "" };
    }
    function definition() {
      return { type: "definition", identifier: "", label: null, title: null, url: "" };
    }
    function emphasis2() {
      return { type: "emphasis", children: [] };
    }
    function heading() {
      return { type: "heading", depth: 0, children: [] };
    }
    function hardBreak2() {
      return { type: "break" };
    }
    function html2() {
      return { type: "html", value: "" };
    }
    function image2() {
      return { type: "image", title: null, url: "", alt: null };
    }
    function link2() {
      return { type: "link", title: null, url: "", children: [] };
    }
    function list(e3) {
      return { type: "list", ordered: "listOrdered" === e3.type, start: null, spread: e3._spread, children: [] };
    }
    function listItem(e3) {
      return { type: "listItem", spread: e3._spread, checked: null, children: [] };
    }
    function paragraph() {
      return { type: "paragraph", children: [] };
    }
    function strong2() {
      return { type: "strong", children: [] };
    }
    function text() {
      return { type: "text", value: "" };
    }
    function thematicBreak() {
      return { type: "thematicBreak" };
    }
  }(n)(function(e2) {
    for (; !subtokenize(e2); ) ;
    return e2;
  }(function(e2) {
    const t2 = { constructs: combineExtensions([wt, ...(e2 || {}).extensions || []]), content: create2(Oe), defined: [], document: create2(Ie), flow: create2(ft), lazy: {}, string: create2(dt), text: create2(ht) };
    return t2;
    function create2(e3) {
      return function(n2) {
        return createTokenizer(t2, e3, n2);
      };
    }
  }(n).document().write((/* @__PURE__ */ function() {
    let e2, t2 = 1, n2 = "", o = true;
    return function(i, a, s) {
      const l2 = [];
      let u2, c2, f2, p2, d2;
      for (i = n2 + ("string" == typeof i ? i.toString() : new TextDecoder(a || void 0).decode(i)), f2 = 0, n2 = "", o && (65279 === i.charCodeAt(0) && f2++, o = void 0); f2 < i.length; ) {
        if (St.lastIndex = f2, u2 = St.exec(i), p2 = u2 && void 0 !== u2.index ? u2.index : i.length, d2 = i.charCodeAt(p2), !u2) {
          n2 = i.slice(f2);
          break;
        }
        if (10 === d2 && f2 === p2 && e2) l2.push(-3), e2 = void 0;
        else switch (e2 && (l2.push(-5), e2 = void 0), f2 < p2 && (l2.push(i.slice(f2, p2)), t2 += p2 - f2), d2) {
          case 0:
            l2.push(65533), t2++;
            break;
          case 9:
            for (c2 = 4 * Math.ceil(t2 / 4), l2.push(-2); t2++ < c2; ) l2.push(-1);
            break;
          case 10:
            l2.push(-4), t2 = 1;
            break;
          default:
            e2 = true, t2 = 1;
        }
        f2 = p2 + 1;
      }
      return s && (e2 && l2.push(-5), n2 && l2.push(n2), l2.push(null)), l2;
    };
  }())(e, t, true))));
}
function point(e) {
  return { line: e.line, column: e.column, offset: e.offset };
}
function configure(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const o = t[n];
    Array.isArray(o) ? configure(e, o) : extension(e, o);
  }
}
function extension(e, t) {
  let n;
  for (n in t) if (Ct.call(t, n)) switch (n) {
    case "canContainEols": {
      const o = t[n];
      o && e[n].push(...o);
      break;
    }
    case "transforms": {
      const o = t[n];
      o && e[n].push(...o);
      break;
    }
    case "enter":
    case "exit": {
      const o = t[n];
      o && Object.assign(e[n], o);
      break;
    }
  }
}
function defaultOnError(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + stringifyPosition({ start: e.start, end: e.end }) + "): a different token (`" + t.type + "`, " + stringifyPosition({ start: t.start, end: t.end }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + stringifyPosition({ start: t.start, end: t.end }) + ") is still open");
}
function remarkParse(e) {
  const t = this;
  t.parser = function(n) {
    return fromMarkdown(n, { ...t.data("settings"), ...e, extensions: t.data("micromarkExtensions") || [], mdastExtensions: t.data("fromMarkdownExtensions") || [] });
  };
}
function revert(e, t) {
  const n = t.referenceType;
  let o = "]";
  if ("collapsed" === n ? o += "[]" : "full" === n && (o += "[" + (t.label || t.identifier) + "]"), "imageReference" === t.type) return [{ type: "text", value: "![" + t.alt + o }];
  const i = e.all(t), a = i[0];
  a && "text" === a.type ? a.value = "[" + a.value : i.unshift({ type: "text", value: "[" });
  const s = i[i.length - 1];
  return s && "text" === s.type ? s.value += o : i.push({ type: "text", value: o }), i;
}
function listItemLoose(e) {
  const t = e.spread;
  return null == t ? e.children.length > 1 : t;
}
function trimLines(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let o = n.exec(t), i = 0;
  const a = [];
  for (; o; ) a.push(trimLine(t.slice(i, o.index), i > 0, true), o[0]), i = o.index + o[0].length, o = n.exec(t);
  return a.push(trimLine(t.slice(i), i > 0, false)), a.join("");
}
function trimLine(e, t, n) {
  let o = 0, i = e.length;
  if (t) {
    let t2 = e.codePointAt(o);
    for (; 9 === t2 || 32 === t2; ) o++, t2 = e.codePointAt(o);
  }
  if (n) {
    let t2 = e.codePointAt(i - 1);
    for (; 9 === t2 || 32 === t2; ) i--, t2 = e.codePointAt(i - 1);
  }
  return i > o ? e.slice(o, i) : "";
}
const Et = { blockquote: function(e, t) {
  const n = { type: "element", tagName: "blockquote", properties: {}, children: e.wrap(e.all(t), true) };
  return e.patch(t, n), e.applyData(t, n);
}, break: function(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: "\n" }];
}, code: function(e, t) {
  const n = t.value ? t.value + "\n" : "", o = {};
  t.lang && (o.className = ["language-" + t.lang]);
  let i = { type: "element", tagName: "code", properties: o, children: [{ type: "text", value: n }] };
  return t.meta && (i.data = { meta: t.meta }), e.patch(t, i), i = e.applyData(t, i), i = { type: "element", tagName: "pre", properties: {}, children: [i] }, e.patch(t, i), i;
}, delete: function(e, t) {
  const n = { type: "element", tagName: "del", properties: {}, children: e.all(t) };
  return e.patch(t, n), e.applyData(t, n);
}, emphasis: function(e, t) {
  const n = { type: "element", tagName: "em", properties: {}, children: e.all(t) };
  return e.patch(t, n), e.applyData(t, n);
}, footnoteReference: function(e, t) {
  const n = "string" == typeof e.options.clobberPrefix ? e.options.clobberPrefix : "user-content-", o = String(t.identifier).toUpperCase(), i = normalizeUri(o.toLowerCase()), a = e.footnoteOrder.indexOf(o);
  let s, l2 = e.footnoteCounts.get(o);
  void 0 === l2 ? (l2 = 0, e.footnoteOrder.push(o), s = e.footnoteOrder.length) : s = a + 1, l2 += 1, e.footnoteCounts.set(o, l2);
  const u2 = { type: "element", tagName: "a", properties: { href: "#" + n + "fn-" + i, id: n + "fnref-" + i + (l2 > 1 ? "-" + l2 : ""), dataFootnoteRef: true, ariaDescribedBy: ["footnote-label"] }, children: [{ type: "text", value: String(s) }] };
  e.patch(t, u2);
  const c2 = { type: "element", tagName: "sup", properties: {}, children: [u2] };
  return e.patch(t, c2), e.applyData(t, c2);
}, heading: function(e, t) {
  const n = { type: "element", tagName: "h" + t.depth, properties: {}, children: e.all(t) };
  return e.patch(t, n), e.applyData(t, n);
}, html: function(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}, imageReference: function(e, t) {
  const n = String(t.identifier).toUpperCase(), o = e.definitionById.get(n);
  if (!o) return revert(e, t);
  const i = { src: normalizeUri(o.url || ""), alt: t.alt };
  null !== o.title && void 0 !== o.title && (i.title = o.title);
  const a = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, a), e.applyData(t, a);
}, image: function(e, t) {
  const n = { src: normalizeUri(t.url) };
  null !== t.alt && void 0 !== t.alt && (n.alt = t.alt), null !== t.title && void 0 !== t.title && (n.title = t.title);
  const o = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, o), e.applyData(t, o);
}, inlineCode: function(e, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e.patch(t, n);
  const o = { type: "element", tagName: "code", properties: {}, children: [n] };
  return e.patch(t, o), e.applyData(t, o);
}, linkReference: function(e, t) {
  const n = String(t.identifier).toUpperCase(), o = e.definitionById.get(n);
  if (!o) return revert(e, t);
  const i = { href: normalizeUri(o.url || "") };
  null !== o.title && void 0 !== o.title && (i.title = o.title);
  const a = { type: "element", tagName: "a", properties: i, children: e.all(t) };
  return e.patch(t, a), e.applyData(t, a);
}, link: function(e, t) {
  const n = { href: normalizeUri(t.url) };
  null !== t.title && void 0 !== t.title && (n.title = t.title);
  const o = { type: "element", tagName: "a", properties: n, children: e.all(t) };
  return e.patch(t, o), e.applyData(t, o);
}, listItem: function(e, t, n) {
  const o = e.all(t), i = n ? function(e2) {
    let t2 = false;
    if ("list" === e2.type) {
      t2 = e2.spread || false;
      const n2 = e2.children;
      let o2 = -1;
      for (; !t2 && ++o2 < n2.length; ) t2 = listItemLoose(n2[o2]);
    }
    return t2;
  }(n) : listItemLoose(t), a = {}, s = [];
  if ("boolean" == typeof t.checked) {
    const e2 = o[0];
    let n2;
    e2 && "element" === e2.type && "p" === e2.tagName ? n2 = e2 : (n2 = { type: "element", tagName: "p", properties: {}, children: [] }, o.unshift(n2)), n2.children.length > 0 && n2.children.unshift({ type: "text", value: " " }), n2.children.unshift({ type: "element", tagName: "input", properties: { type: "checkbox", checked: t.checked, disabled: true }, children: [] }), a.className = ["task-list-item"];
  }
  let l2 = -1;
  for (; ++l2 < o.length; ) {
    const e2 = o[l2];
    (i || 0 !== l2 || "element" !== e2.type || "p" !== e2.tagName) && s.push({ type: "text", value: "\n" }), "element" !== e2.type || "p" !== e2.tagName || i ? s.push(e2) : s.push(...e2.children);
  }
  const u2 = o[o.length - 1];
  u2 && (i || "element" !== u2.type || "p" !== u2.tagName) && s.push({ type: "text", value: "\n" });
  const c2 = { type: "element", tagName: "li", properties: a, children: s };
  return e.patch(t, c2), e.applyData(t, c2);
}, list: function(e, t) {
  const n = {}, o = e.all(t);
  let i = -1;
  for ("number" == typeof t.start && 1 !== t.start && (n.start = t.start); ++i < o.length; ) {
    const e2 = o[i];
    if ("element" === e2.type && "li" === e2.tagName && e2.properties && Array.isArray(e2.properties.className) && e2.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const a = { type: "element", tagName: t.ordered ? "ol" : "ul", properties: n, children: e.wrap(o, true) };
  return e.patch(t, a), e.applyData(t, a);
}, paragraph: function(e, t) {
  const n = { type: "element", tagName: "p", properties: {}, children: e.all(t) };
  return e.patch(t, n), e.applyData(t, n);
}, root: function(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}, strong: function(e, t) {
  const n = { type: "element", tagName: "strong", properties: {}, children: e.all(t) };
  return e.patch(t, n), e.applyData(t, n);
}, table: function(e, t) {
  const n = e.all(t), o = n.shift(), i = [];
  if (o) {
    const n2 = { type: "element", tagName: "thead", properties: {}, children: e.wrap([o], true) };
    e.patch(t.children[0], n2), i.push(n2);
  }
  if (n.length > 0) {
    const o2 = { type: "element", tagName: "tbody", properties: {}, children: e.wrap(n, true) }, a2 = se(t.children[1]), s = ae(t.children[t.children.length - 1]);
    a2 && s && (o2.position = { start: a2, end: s }), i.push(o2);
  }
  const a = { type: "element", tagName: "table", properties: {}, children: e.wrap(i, true) };
  return e.patch(t, a), e.applyData(t, a);
}, tableCell: function(e, t) {
  const n = { type: "element", tagName: "td", properties: {}, children: e.all(t) };
  return e.patch(t, n), e.applyData(t, n);
}, tableRow: function(e, t, n) {
  const o = n ? n.children : void 0, i = 0 === (o ? o.indexOf(t) : 1) ? "th" : "td", a = n && "table" === n.type ? n.align : void 0, s = a ? a.length : t.children.length;
  let l2 = -1;
  const u2 = [];
  for (; ++l2 < s; ) {
    const n2 = t.children[l2], o2 = {}, s2 = a ? a[l2] : void 0;
    s2 && (o2.align = s2);
    let c3 = { type: "element", tagName: i, properties: o2, children: [] };
    n2 && (c3.children = e.all(n2), e.patch(n2, c3), c3 = e.applyData(n2, c3)), u2.push(c3);
  }
  const c2 = { type: "element", tagName: "tr", properties: {}, children: e.wrap(u2, true) };
  return e.patch(t, c2), e.applyData(t, c2);
}, text: function(e, t) {
  const n = { type: "text", value: trimLines(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}, thematicBreak: function(e, t) {
  const n = { type: "element", tagName: "hr", properties: {}, children: [] };
  return e.patch(t, n), e.applyData(t, n);
}, toml: ignore, yaml: ignore, definition: ignore, footnoteDefinition: ignore };
function ignore() {
}
const Ot = "object" == typeof self ? self : globalThis, deserialize = (e) => (/* @__PURE__ */ ((e2, t) => {
  const as = (t2, n) => (e2.set(n, t2), t2), unpair = (n) => {
    if (e2.has(n)) return e2.get(n);
    const [o, i] = t[n];
    switch (o) {
      case 0:
      case -1:
        return as(i, n);
      case 1: {
        const e3 = as([], n);
        for (const t2 of i) e3.push(unpair(t2));
        return e3;
      }
      case 2: {
        const e3 = as({}, n);
        for (const [t2, n2] of i) e3[unpair(t2)] = unpair(n2);
        return e3;
      }
      case 3:
        return as(new Date(i), n);
      case 4: {
        const { source: e3, flags: t2 } = i;
        return as(new RegExp(e3, t2), n);
      }
      case 5: {
        const e3 = as(/* @__PURE__ */ new Map(), n);
        for (const [t2, n2] of i) e3.set(unpair(t2), unpair(n2));
        return e3;
      }
      case 6: {
        const e3 = as(/* @__PURE__ */ new Set(), n);
        for (const t2 of i) e3.add(unpair(t2));
        return e3;
      }
      case 7: {
        const { name: e3, message: t2 } = i;
        return as(new Ot[e3](t2), n);
      }
      case 8:
        return as(BigInt(i), n);
      case "BigInt":
        return as(Object(BigInt(i)), n);
      case "ArrayBuffer":
        return as(new Uint8Array(i).buffer, i);
      case "DataView": {
        const { buffer: e3 } = new Uint8Array(i);
        return as(new DataView(e3), i);
      }
    }
    return as(new Ot[o](i), n);
  };
  return unpair;
})(/* @__PURE__ */ new Map(), e))(0), It = "", { toString: At } = {}, { keys: Dt } = Object, typeOf = (e) => {
  const t = typeof e;
  if ("object" !== t || !e) return [0, t];
  const n = At.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [1, It];
    case "Object":
      return [2, It];
    case "Date":
      return [3, It];
    case "RegExp":
      return [4, It];
    case "Map":
      return [5, It];
    case "Set":
      return [6, It];
    case "DataView":
      return [1, n];
  }
  return n.includes("Array") ? [1, n] : n.includes("Error") ? [7, n] : [2, n];
}, shouldSkip = ([e, t]) => 0 === e && ("function" === t || "symbol" === t), serialize$1 = (e, { json: t, lossy: n } = {}) => {
  const o = [];
  return (/* @__PURE__ */ ((e2, t2, n2, o2) => {
    const as = (e3, t3) => {
      const i = o2.push(e3) - 1;
      return n2.set(t3, i), i;
    }, pair = (o3) => {
      if (n2.has(o3)) return n2.get(o3);
      let [i, a] = typeOf(o3);
      switch (i) {
        case 0: {
          let t3 = o3;
          switch (a) {
            case "bigint":
              i = 8, t3 = o3.toString();
              break;
            case "function":
            case "symbol":
              if (e2) throw new TypeError("unable to serialize " + a);
              t3 = null;
              break;
            case "undefined":
              return as([-1], o3);
          }
          return as([i, t3], o3);
        }
        case 1: {
          if (a) {
            let e4 = o3;
            return "DataView" === a ? e4 = new Uint8Array(o3.buffer) : "ArrayBuffer" === a && (e4 = new Uint8Array(o3)), as([a, [...e4]], o3);
          }
          const e3 = [], t3 = as([i, e3], o3);
          for (const t4 of o3) e3.push(pair(t4));
          return t3;
        }
        case 2: {
          if (a) switch (a) {
            case "BigInt":
              return as([a, o3.toString()], o3);
            case "Boolean":
            case "Number":
            case "String":
              return as([a, o3.valueOf()], o3);
          }
          if (t2 && "toJSON" in o3) return pair(o3.toJSON());
          const n3 = [], s2 = as([i, n3], o3);
          for (const t3 of Dt(o3)) !e2 && shouldSkip(typeOf(o3[t3])) || n3.push([pair(t3), pair(o3[t3])]);
          return s2;
        }
        case 3:
          return as([i, o3.toISOString()], o3);
        case 4: {
          const { source: e3, flags: t3 } = o3;
          return as([i, { source: e3, flags: t3 }], o3);
        }
        case 5: {
          const t3 = [], n3 = as([i, t3], o3);
          for (const [n4, i2] of o3) (e2 || !shouldSkip(typeOf(n4)) && !shouldSkip(typeOf(i2))) && t3.push([pair(n4), pair(i2)]);
          return n3;
        }
        case 6: {
          const t3 = [], n3 = as([i, t3], o3);
          for (const n4 of o3) !e2 && shouldSkip(typeOf(n4)) || t3.push(pair(n4));
          return n3;
        }
      }
      const { message: s } = o3;
      return as([i, { name: a, message: s }], o3);
    };
    return pair;
  })(!(t || n), !!t, /* @__PURE__ */ new Map(), o))(e), o;
}, Rt = "function" == typeof structuredClone ? (e, t) => t && ("json" in t || "lossy" in t) ? deserialize(serialize$1(e, t)) : structuredClone(e) : (e, t) => deserialize(serialize$1(e, t));
function defaultFootnoteBackContent(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({ type: "element", tagName: "sup", properties: {}, children: [{ type: "text", value: String(t) }] }), n;
}
function defaultFootnoteBackLabel(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
const convert = function(e) {
  if (null == e) return ok;
  if ("function" == typeof e) return castFactory(e);
  if ("object" == typeof e) return Array.isArray(e) ? function(e2) {
    const t = [];
    let n = -1;
    for (; ++n < e2.length; ) t[n] = convert(e2[n]);
    return castFactory(any);
    function any(...e3) {
      let n2 = -1;
      for (; ++n2 < t.length; ) if (t[n2].apply(this, e3)) return true;
      return false;
    }
  }(e) : function(e2) {
    const t = e2;
    return castFactory(all2);
    function all2(n) {
      const o = n;
      let i;
      for (i in e2) if (o[i] !== t[i]) return false;
      return true;
    }
  }(e);
  if ("string" == typeof e) return function(e2) {
    return castFactory(type2);
    function type2(t) {
      return t && t.type === e2;
    }
  }(e);
  throw new Error("Expected function, string, or object as test");
};
function castFactory(e) {
  return function(t, n, o) {
    return Boolean(function(e2) {
      return null !== e2 && "object" == typeof e2 && "type" in e2;
    }(t) && e.call(this, t, "number" == typeof n ? n : void 0, o || void 0));
  };
}
function ok() {
  return true;
}
const Pt = [], Lt = true, Tt = false;
function visitParents(e, t, n, o) {
  let i;
  "function" == typeof t && "function" != typeof n ? (o = n, n = t) : i = t;
  const a = convert(i), s = o ? -1 : 1;
  !function factory(e2, i2, l2) {
    const u2 = e2 && "object" == typeof e2 ? e2 : {};
    if ("string" == typeof u2.type) {
      const t2 = "string" == typeof u2.tagName ? u2.tagName : "string" == typeof u2.name ? u2.name : void 0;
      Object.defineProperty(visit2, "name", { value: "node (" + e2.type + (t2 ? "<" + t2 + ">" : "") + ")" });
    }
    return visit2;
    function visit2() {
      let u3, c2, f2, p2 = Pt;
      if ((!t || a(e2, i2, l2[l2.length - 1] || void 0)) && (p2 = function(e3) {
        if (Array.isArray(e3)) return e3;
        if ("number" == typeof e3) return [Lt, e3];
        return null == e3 ? Pt : [e3];
      }(n(e2, l2)), p2[0] === Tt)) return p2;
      if ("children" in e2 && e2.children) {
        const t2 = e2;
        if (t2.children && "skip" !== p2[0]) for (c2 = (o ? t2.children.length : -1) + s, f2 = l2.concat(t2); c2 > -1 && c2 < t2.children.length; ) {
          const e3 = t2.children[c2];
          if (u3 = factory(e3, c2, f2)(), u3[0] === Tt) return u3;
          c2 = "number" == typeof u3[1] ? u3[1] : c2 + s;
        }
      }
      return p2;
    }
  }(e, void 0, [])();
}
function visit(e, t, n, o) {
  let i, a, s;
  "function" == typeof t && "function" != typeof n ? (a = void 0, s = t, i = n) : (a = t, s = n, i = o), visitParents(e, a, function(e2, t2) {
    const n2 = t2[t2.length - 1], o2 = n2 ? n2.children.indexOf(e2) : void 0;
    return s(e2, o2, n2);
  }, i);
}
const zt = {}.hasOwnProperty, jt = {};
function patch(e, t) {
  e.position && (t.position = function(e2) {
    const t2 = se(e2), n = ae(e2);
    if (t2 && n) return { start: t2, end: n };
  }(e));
}
function applyData(e, t) {
  let n = t;
  if (e && e.data) {
    const t2 = e.data.hName, o = e.data.hChildren, i = e.data.hProperties;
    if ("string" == typeof t2) if ("element" === n.type) n.tagName = t2;
    else {
      n = { type: "element", tagName: t2, properties: {}, children: "children" in n ? n.children : [n] };
    }
    "element" === n.type && i && Object.assign(n.properties, Rt(i)), "children" in n && n.children && null != o && (n.children = o);
  }
  return n;
}
function defaultUnknownHandler(e, t) {
  const n = t.data || {}, o = !("value" in t) || zt.call(n, "hProperties") || zt.call(n, "hChildren") ? { type: "element", tagName: "div", properties: {}, children: e.all(t) } : { type: "text", value: t.value };
  return e.patch(t, o), e.applyData(t, o);
}
function wrap$1(e, t) {
  const n = [];
  let o = -1;
  for (t && n.push({ type: "text", value: "\n" }); ++o < e.length; ) o && n.push({ type: "text", value: "\n" }), n.push(e[o]);
  return t && e.length > 0 && n.push({ type: "text", value: "\n" }), n;
}
function trimMarkdownSpaceStart(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; 9 === n || 32 === n; ) t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function toHast(e, t) {
  const n = function(e2, t2) {
    const n2 = t2 || jt, o2 = /* @__PURE__ */ new Map(), i2 = /* @__PURE__ */ new Map(), a2 = /* @__PURE__ */ new Map(), s = { ...Et, ...n2.handlers }, l2 = { all: function(e3) {
      const t3 = [];
      if ("children" in e3) {
        const n3 = e3.children;
        let o3 = -1;
        for (; ++o3 < n3.length; ) {
          const i3 = l2.one(n3[o3], e3);
          if (i3) {
            if (o3 && "break" === n3[o3 - 1].type && (Array.isArray(i3) || "text" !== i3.type || (i3.value = trimMarkdownSpaceStart(i3.value)), !Array.isArray(i3) && "element" === i3.type)) {
              const e4 = i3.children[0];
              e4 && "text" === e4.type && (e4.value = trimMarkdownSpaceStart(e4.value));
            }
            Array.isArray(i3) ? t3.push(...i3) : t3.push(i3);
          }
        }
      }
      return t3;
    }, applyData, definitionById: o2, footnoteById: i2, footnoteCounts: a2, footnoteOrder: [], handlers: s, one: function(e3, t3) {
      const n3 = e3.type, o3 = l2.handlers[n3];
      if (zt.call(l2.handlers, n3) && o3) return o3(l2, e3, t3);
      if (l2.options.passThrough && l2.options.passThrough.includes(n3)) {
        if ("children" in e3) {
          const { children: t4, ...n4 } = e3, o4 = Rt(n4);
          return o4.children = l2.all(e3), o4;
        }
        return Rt(e3);
      }
      return (l2.options.unknownHandler || defaultUnknownHandler)(l2, e3, t3);
    }, options: n2, patch, wrap: wrap$1 };
    return visit(e2, function(e3) {
      if ("definition" === e3.type || "footnoteDefinition" === e3.type) {
        const t3 = "definition" === e3.type ? o2 : i2, n3 = String(e3.identifier).toUpperCase();
        t3.has(n3) || t3.set(n3, e3);
      }
    }), l2;
  }(e, t), o = n.one(e, void 0), i = function(e2) {
    const t2 = "string" == typeof e2.options.clobberPrefix ? e2.options.clobberPrefix : "user-content-", n2 = e2.options.footnoteBackContent || defaultFootnoteBackContent, o2 = e2.options.footnoteBackLabel || defaultFootnoteBackLabel, i2 = e2.options.footnoteLabel || "Footnotes", a2 = e2.options.footnoteLabelTagName || "h2", s = e2.options.footnoteLabelProperties || { className: ["sr-only"] }, l2 = [];
    let u2 = -1;
    for (; ++u2 < e2.footnoteOrder.length; ) {
      const i3 = e2.footnoteById.get(e2.footnoteOrder[u2]);
      if (!i3) continue;
      const a3 = e2.all(i3), s2 = String(i3.identifier).toUpperCase(), c2 = normalizeUri(s2.toLowerCase());
      let f2 = 0;
      const p2 = [], d2 = e2.footnoteCounts.get(s2);
      for (; void 0 !== d2 && ++f2 <= d2; ) {
        p2.length > 0 && p2.push({ type: "text", value: " " });
        let e3 = "string" == typeof n2 ? n2 : n2(u2, f2);
        "string" == typeof e3 && (e3 = { type: "text", value: e3 }), p2.push({ type: "element", tagName: "a", properties: { href: "#" + t2 + "fnref-" + c2 + (f2 > 1 ? "-" + f2 : ""), dataFootnoteBackref: "", ariaLabel: "string" == typeof o2 ? o2 : o2(u2, f2), className: ["data-footnote-backref"] }, children: Array.isArray(e3) ? e3 : [e3] });
      }
      const h2 = a3[a3.length - 1];
      if (h2 && "element" === h2.type && "p" === h2.tagName) {
        const e3 = h2.children[h2.children.length - 1];
        e3 && "text" === e3.type ? e3.value += " " : h2.children.push({ type: "text", value: " " }), h2.children.push(...p2);
      } else a3.push(...p2);
      const g2 = { type: "element", tagName: "li", properties: { id: t2 + "fn-" + c2 }, children: e2.wrap(a3, true) };
      e2.patch(i3, g2), l2.push(g2);
    }
    if (0 !== l2.length) return { type: "element", tagName: "section", properties: { dataFootnotes: true, className: ["footnotes"] }, children: [{ type: "element", tagName: a2, properties: { ...Rt(s), id: "footnote-label" }, children: [{ type: "text", value: i2 }] }, { type: "text", value: "\n" }, { type: "element", tagName: "ol", properties: {}, children: e2.wrap(l2, true) }, { type: "text", value: "\n" }] };
  }(n), a = Array.isArray(o) ? { type: "root", children: o } : o || { type: "root", children: [] };
  return i && a.children.push({ type: "text", value: "\n" }, i), a;
}
function remarkRehype(e, t) {
  return e && "run" in e ? async function(n, o) {
    const i = toHast(n, { file: o, ...t });
    await e.run(i, o);
  } : function(n, o) {
    return toHast(n, { file: o, ...e || t });
  };
}
function bail(e) {
  if (e) throw e;
}
var Mt = Object.prototype.hasOwnProperty, qt = Object.prototype.toString, Ft = Object.defineProperty, Nt = Object.getOwnPropertyDescriptor, isArray = function(e) {
  return "function" == typeof Array.isArray ? Array.isArray(e) : "[object Array]" === qt.call(e);
}, isPlainObject$2 = function(e) {
  if (!e || "[object Object]" !== qt.call(e)) return false;
  var t, n = Mt.call(e, "constructor"), o = e.constructor && e.constructor.prototype && Mt.call(e.constructor.prototype, "isPrototypeOf");
  if (e.constructor && !n && !o) return false;
  for (t in e) ;
  return void 0 === t || Mt.call(e, t);
}, setProperty = function(e, t) {
  Ft && "__proto__" === t.name ? Ft(e, t.name, { enumerable: true, configurable: true, value: t.newValue, writable: true }) : e[t.name] = t.newValue;
}, getProperty = function(e, t) {
  if ("__proto__" === t) {
    if (!Mt.call(e, t)) return;
    if (Nt) return Nt(e, t).value;
  }
  return e[t];
}, Bt = function extend() {
  var e, t, n, o, i, a, s = arguments[0], l2 = 1, u2 = arguments.length, c2 = false;
  for ("boolean" == typeof s && (c2 = s, s = arguments[1] || {}, l2 = 2), (null == s || "object" != typeof s && "function" != typeof s) && (s = {}); l2 < u2; ++l2) if (null != (e = arguments[l2])) for (t in e) n = getProperty(s, t), s !== (o = getProperty(e, t)) && (c2 && o && (isPlainObject$2(o) || (i = isArray(o))) ? (i ? (i = false, a = n && isArray(n) ? n : []) : a = n && isPlainObject$2(n) ? n : {}, setProperty(s, { name: t, newValue: extend(c2, a, o) })) : void 0 !== o && setProperty(s, { name: t, newValue: o }));
  return s;
};
const Ht = getDefaultExportFromCjs(Bt);
function isPlainObject$1(e) {
  if ("object" != typeof e || null === e) return false;
  const t = Object.getPrototypeOf(e);
  return !(null !== t && t !== Object.prototype && null !== Object.getPrototypeOf(t) || Symbol.toStringTag in e || Symbol.iterator in e);
}
function trough() {
  const e = [], t = { run: function(...t2) {
    let n = -1;
    const o = t2.pop();
    if ("function" != typeof o) throw new TypeError("Expected function as last argument, not " + o);
    !function next(i, ...a) {
      const s = e[++n];
      let l2 = -1;
      if (i) o(i);
      else {
        for (; ++l2 < t2.length; ) null !== a[l2] && void 0 !== a[l2] || (a[l2] = t2[l2]);
        t2 = a, s ? (/* @__PURE__ */ function(e2, t3) {
          let n2;
          return wrapped;
          function wrapped(...t4) {
            const o2 = e2.length > t4.length;
            let i2;
            o2 && t4.push(done);
            try {
              i2 = e2.apply(this, t4);
            } catch (e3) {
              if (o2 && n2) throw e3;
              return done(e3);
            }
            o2 || (i2 && i2.then && "function" == typeof i2.then ? i2.then(then, done) : i2 instanceof Error ? done(i2) : then(i2));
          }
          function done(e3, ...o2) {
            n2 || (n2 = true, t3(e3, ...o2));
          }
          function then(e3) {
            done(null, e3);
          }
        }(s, next))(...a) : o(null, ...a);
      }
    }(null, ...t2);
  }, use: function(n) {
    if ("function" != typeof n) throw new TypeError("Expected `middelware` to be a function, not " + n);
    return e.push(n), t;
  } };
  return t;
}
const Wt = { basename: function(e, t) {
  if (void 0 !== t && "string" != typeof t) throw new TypeError('"ext" argument must be a string');
  assertPath$1(e);
  let n, o = 0, i = -1, a = e.length;
  if (void 0 === t || 0 === t.length || t.length > e.length) {
    for (; a--; ) if (47 === e.codePointAt(a)) {
      if (n) {
        o = a + 1;
        break;
      }
    } else i < 0 && (n = true, i = a + 1);
    return i < 0 ? "" : e.slice(o, i);
  }
  if (t === e) return "";
  let s = -1, l2 = t.length - 1;
  for (; a--; ) if (47 === e.codePointAt(a)) {
    if (n) {
      o = a + 1;
      break;
    }
  } else s < 0 && (n = true, s = a + 1), l2 > -1 && (e.codePointAt(a) === t.codePointAt(l2--) ? l2 < 0 && (i = a) : (l2 = -1, i = s));
  o === i ? i = s : i < 0 && (i = e.length);
  return e.slice(o, i);
}, dirname: function(e) {
  if (assertPath$1(e), 0 === e.length) return ".";
  let t, n = -1, o = e.length;
  for (; --o; ) if (47 === e.codePointAt(o)) {
    if (t) {
      n = o;
      break;
    }
  } else t || (t = true);
  return n < 0 ? 47 === e.codePointAt(0) ? "/" : "." : 1 === n && 47 === e.codePointAt(0) ? "//" : e.slice(0, n);
}, extname: function(e) {
  assertPath$1(e);
  let t, n = e.length, o = -1, i = 0, a = -1, s = 0;
  for (; n--; ) {
    const l2 = e.codePointAt(n);
    if (47 !== l2) o < 0 && (t = true, o = n + 1), 46 === l2 ? a < 0 ? a = n : 1 !== s && (s = 1) : a > -1 && (s = -1);
    else if (t) {
      i = n + 1;
      break;
    }
  }
  if (a < 0 || o < 0 || 0 === s || 1 === s && a === o - 1 && a === i + 1) return "";
  return e.slice(a, o);
}, join: function(...e) {
  let t, n = -1;
  for (; ++n < e.length; ) assertPath$1(e[n]), e[n] && (t = void 0 === t ? e[n] : t + "/" + e[n]);
  return void 0 === t ? "." : function(e2) {
    assertPath$1(e2);
    const t2 = 47 === e2.codePointAt(0);
    let n2 = function(e3, t3) {
      let n3, o, i = "", a = 0, s = -1, l2 = 0, u2 = -1;
      for (; ++u2 <= e3.length; ) {
        if (u2 < e3.length) n3 = e3.codePointAt(u2);
        else {
          if (47 === n3) break;
          n3 = 47;
        }
        if (47 === n3) {
          if (s === u2 - 1 || 1 === l2) ;
          else if (s !== u2 - 1 && 2 === l2) {
            if (i.length < 2 || 2 !== a || 46 !== i.codePointAt(i.length - 1) || 46 !== i.codePointAt(i.length - 2)) {
              if (i.length > 2) {
                if (o = i.lastIndexOf("/"), o !== i.length - 1) {
                  o < 0 ? (i = "", a = 0) : (i = i.slice(0, o), a = i.length - 1 - i.lastIndexOf("/")), s = u2, l2 = 0;
                  continue;
                }
              } else if (i.length > 0) {
                i = "", a = 0, s = u2, l2 = 0;
                continue;
              }
            }
            t3 && (i = i.length > 0 ? i + "/.." : "..", a = 2);
          } else i.length > 0 ? i += "/" + e3.slice(s + 1, u2) : i = e3.slice(s + 1, u2), a = u2 - s - 1;
          s = u2, l2 = 0;
        } else 46 === n3 && l2 > -1 ? l2++ : l2 = -1;
      }
      return i;
    }(e2, !t2);
    0 !== n2.length || t2 || (n2 = ".");
    n2.length > 0 && 47 === e2.codePointAt(e2.length - 1) && (n2 += "/");
    return t2 ? "/" + n2 : n2;
  }(t);
}, sep: "/" };
function assertPath$1(e) {
  if ("string" != typeof e) throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
}
const Ut = { cwd: function() {
  return "/";
} };
function isUrl(e) {
  return Boolean(null !== e && "object" == typeof e && "href" in e && e.href && "protocol" in e && e.protocol && void 0 === e.auth);
}
function urlToPath(e) {
  if ("string" == typeof e) e = new URL(e);
  else if (!isUrl(e)) {
    const t = new TypeError('The "path" argument must be of type string or an instance of URL. Received `' + e + "`");
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if ("file:" !== e.protocol) {
    const e2 = new TypeError("The URL must be of scheme file");
    throw e2.code = "ERR_INVALID_URL_SCHEME", e2;
  }
  return function(e2) {
    if ("" !== e2.hostname) {
      const e3 = new TypeError('File URL host must be "localhost" or empty on darwin');
      throw e3.code = "ERR_INVALID_FILE_URL_HOST", e3;
    }
    const t = e2.pathname;
    let n = -1;
    for (; ++n < t.length; ) if (37 === t.codePointAt(n) && 50 === t.codePointAt(n + 1)) {
      const e3 = t.codePointAt(n + 2);
      if (70 === e3 || 102 === e3) {
        const e4 = new TypeError("File URL path must not include encoded / characters");
        throw e4.code = "ERR_INVALID_FILE_URL_PATH", e4;
      }
    }
    return decodeURIComponent(t);
  }(e);
}
const $t = ["history", "path", "basename", "stem", "extname", "dirname"];
class VFile {
  constructor(e) {
    let t;
    t = e ? isUrl(e) ? { path: e } : "string" == typeof e || function(e2) {
      return Boolean(e2 && "object" == typeof e2 && "byteLength" in e2 && "byteOffset" in e2);
    }(e) ? { value: e } : e : {}, this.cwd = "cwd" in t ? "" : Ut.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let n, o = -1;
    for (; ++o < $t.length; ) {
      const e2 = $t[o];
      e2 in t && void 0 !== t[e2] && null !== t[e2] && (this[e2] = "history" === e2 ? [...t[e2]] : t[e2]);
    }
    for (n in t) $t.includes(n) || (this[n] = t[n]);
  }
  get basename() {
    return "string" == typeof this.path ? Wt.basename(this.path) : void 0;
  }
  set basename(e) {
    assertNonEmpty(e, "basename"), assertPart(e, "basename"), this.path = Wt.join(this.dirname || "", e);
  }
  get dirname() {
    return "string" == typeof this.path ? Wt.dirname(this.path) : void 0;
  }
  set dirname(e) {
    assertPath(this.basename, "dirname"), this.path = Wt.join(e || "", this.basename);
  }
  get extname() {
    return "string" == typeof this.path ? Wt.extname(this.path) : void 0;
  }
  set extname(e) {
    if (assertPart(e, "extname"), assertPath(this.dirname, "extname"), e) {
      if (46 !== e.codePointAt(0)) throw new Error("`extname` must start with `.`");
      if (e.includes(".", 1)) throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Wt.join(this.dirname, this.stem + (e || ""));
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(e) {
    isUrl(e) && (e = urlToPath(e)), assertNonEmpty(e, "path"), this.path !== e && this.history.push(e);
  }
  get stem() {
    return "string" == typeof this.path ? Wt.basename(this.path, this.extname) : void 0;
  }
  set stem(e) {
    assertNonEmpty(e, "stem"), assertPart(e, "stem"), this.path = Wt.join(this.dirname || "", e + (this.extname || ""));
  }
  fail(e, t, n) {
    const o = this.message(e, t, n);
    throw o.fatal = true, o;
  }
  info(e, t, n) {
    const o = this.message(e, t, n);
    return o.fatal = void 0, o;
  }
  message(e, t, n) {
    const o = new VFileMessage(e, t, n);
    return this.path && (o.name = this.path + ":" + o.name, o.file = this.path), o.fatal = false, this.messages.push(o), o;
  }
  toString(e) {
    if (void 0 === this.value) return "";
    if ("string" == typeof this.value) return this.value;
    return new TextDecoder(e || void 0).decode(this.value);
  }
}
function assertPart(e, t) {
  if (e && e.includes(Wt.sep)) throw new Error("`" + t + "` cannot be a path: did not expect `" + Wt.sep + "`");
}
function assertNonEmpty(e, t) {
  if (!e) throw new Error("`" + t + "` cannot be empty");
}
function assertPath(e, t) {
  if (!e) throw new Error("Setting `" + t + "` requires `path` to be set too");
}
const CallableInstance = function(e) {
  const t = this.constructor.prototype, n = t[e], apply = function() {
    return n.apply(apply, arguments);
  };
  return Object.setPrototypeOf(apply, t), apply;
}, Vt = {}.hasOwnProperty;
class Processor extends CallableInstance {
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = trough();
  }
  copy() {
    const e = new Processor();
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const n = this.attachers[t];
      e.use(...n);
    }
    return e.data(Ht(true, {}, this.namespace)), e;
  }
  data(e, t) {
    return "string" == typeof e ? 2 === arguments.length ? (assertUnfrozen("data", this.frozen), this.namespace[e] = t, this) : Vt.call(this.namespace, e) && this.namespace[e] || void 0 : e ? (assertUnfrozen("data", this.frozen), this.namespace = e, this) : this.namespace;
  }
  freeze() {
    if (this.frozen) return this;
    const e = this;
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [t, ...n] = this.attachers[this.freezeIndex];
      if (false === n[0]) continue;
      true === n[0] && (n[0] = void 0);
      const o = t.call(e, ...n);
      "function" == typeof o && this.transformers.use(o);
    }
    return this.frozen = true, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  parse(e) {
    this.freeze();
    const t = vfile(e), n = this.parser || this.Parser;
    return assertParser("parse", n), n(String(t), t);
  }
  process(e, t) {
    const n = this;
    return this.freeze(), assertParser("process", this.parser || this.Parser), assertCompiler("process", this.compiler || this.Compiler), t ? executor(void 0, t) : new Promise(executor);
    function executor(o, i) {
      const a = vfile(e), s = n.parse(a);
      function realDone(e2, n2) {
        e2 || !n2 ? i(e2) : o ? o(n2) : t(void 0, n2);
      }
      n.run(s, a, function(e2, t2, o2) {
        if (e2 || !t2 || !o2) return realDone(e2);
        const i2 = t2, a2 = n.stringify(i2, o2);
        var s2;
        "string" == typeof (s2 = a2) || function(e3) {
          return Boolean(e3 && "object" == typeof e3 && "byteLength" in e3 && "byteOffset" in e3);
        }(s2) ? o2.value = a2 : o2.result = a2, realDone(e2, o2);
      });
    }
  }
  processSync(e) {
    let t, n = false;
    return this.freeze(), assertParser("processSync", this.parser || this.Parser), assertCompiler("processSync", this.compiler || this.Compiler), this.process(e, function(e2, o) {
      n = true, bail(e2), t = o;
    }), assertDone("processSync", "process", n), t;
  }
  run(e, t, n) {
    assertNode(e), this.freeze();
    const o = this.transformers;
    return n || "function" != typeof t || (n = t, t = void 0), n ? executor(void 0, n) : new Promise(executor);
    function executor(i, a) {
      const s = vfile(t);
      o.run(e, s, function(t2, o2, s2) {
        const l2 = o2 || e;
        t2 ? a(t2) : i ? i(l2) : n(void 0, l2, s2);
      });
    }
  }
  runSync(e, t) {
    let n, o = false;
    return this.run(e, t, function(e2, t2) {
      bail(e2), n = t2, o = true;
    }), assertDone("runSync", "run", o), n;
  }
  stringify(e, t) {
    this.freeze();
    const n = vfile(t), o = this.compiler || this.Compiler;
    return assertCompiler("stringify", o), assertNode(e), o(e, n);
  }
  use(e, ...t) {
    const n = this.attachers, o = this.namespace;
    if (assertUnfrozen("use", this.frozen), null == e) ;
    else if ("function" == typeof e) addPlugin(e, t);
    else {
      if ("object" != typeof e) throw new TypeError("Expected usable value, not `" + e + "`");
      Array.isArray(e) ? addList(e) : addPreset(e);
    }
    return this;
    function add(e2) {
      if ("function" == typeof e2) addPlugin(e2, []);
      else {
        if ("object" != typeof e2) throw new TypeError("Expected usable value, not `" + e2 + "`");
        if (Array.isArray(e2)) {
          const [t2, ...n2] = e2;
          addPlugin(t2, n2);
        } else addPreset(e2);
      }
    }
    function addPreset(e2) {
      if (!("plugins" in e2) && !("settings" in e2)) throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
      addList(e2.plugins), e2.settings && (o.settings = Ht(true, o.settings, e2.settings));
    }
    function addList(e2) {
      let t2 = -1;
      if (null == e2) ;
      else {
        if (!Array.isArray(e2)) throw new TypeError("Expected a list of plugins, not `" + e2 + "`");
        for (; ++t2 < e2.length; ) {
          add(e2[t2]);
        }
      }
    }
    function addPlugin(e2, t2) {
      let o2 = -1, i = -1;
      for (; ++o2 < n.length; ) if (n[o2][0] === e2) {
        i = o2;
        break;
      }
      if (-1 === i) n.push([e2, ...t2]);
      else if (t2.length > 0) {
        let [o3, ...a] = t2;
        const s = n[i][1];
        isPlainObject$1(s) && isPlainObject$1(o3) && (o3 = Ht(true, s, o3)), n[i] = [e2, o3, ...a];
      }
    }
  }
}
const Gt = new Processor().freeze();
function assertParser(e, t) {
  if ("function" != typeof t) throw new TypeError("Cannot `" + e + "` without `parser`");
}
function assertCompiler(e, t) {
  if ("function" != typeof t) throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function assertUnfrozen(e, t) {
  if (t) throw new Error("Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
function assertNode(e) {
  if (!isPlainObject$1(e) || "string" != typeof e.type) throw new TypeError("Expected node, got `" + e + "`");
}
function assertDone(e, t, n) {
  if (!n) throw new Error("`" + e + "` finished async. Use `" + t + "` instead");
}
function vfile(e) {
  return function(e2) {
    return Boolean(e2 && "object" == typeof e2 && "message" in e2 && "messages" in e2);
  }(e) ? e : new VFile(e);
}
const Kt = [], Yt = { allowDangerousHtml: true }, Xt = /^(https?|ircs?|mailto|xmpp)$/i, Qt = [{ from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" }, { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" }, { from: "allowNode", id: "replace-allownode-allowedtypes-and-disallowedtypes", to: "allowElement" }, { from: "allowedTypes", id: "replace-allownode-allowedtypes-and-disallowedtypes", to: "allowedElements" }, { from: "className", id: "remove-classname" }, { from: "disallowedTypes", id: "replace-allownode-allowedtypes-and-disallowedtypes", to: "disallowedElements" }, { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" }, { from: "includeElementIndex", id: "#remove-includeelementindex" }, { from: "includeNodeIndex", id: "change-includenodeindex-to-includeelementindex" }, { from: "linkTarget", id: "remove-linktarget" }, { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" }, { from: "rawSourcePos", id: "#remove-rawsourcepos" }, { from: "renderers", id: "change-renderers-to-components", to: "components" }, { from: "source", id: "change-source-to-children", to: "children" }, { from: "sourcePos", id: "#remove-sourcepos" }, { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" }, { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }];
function Markdown(e) {
  const t = function(e2) {
    const t2 = e2.rehypePlugins || Kt, n = e2.remarkPlugins || Kt, o2 = e2.remarkRehypeOptions ? { ...e2.remarkRehypeOptions, ...Yt } : Yt, i = Gt().use(remarkParse).use(n).use(remarkRehype, o2).use(t2);
    return i;
  }(e), o = function(e2) {
    const t2 = e2.children || "", n = new VFile();
    "string" == typeof t2 && (n.value = t2);
    return n;
  }(e);
  return function(e2, t2) {
    const o2 = t2.allowedElements, i = t2.allowElement, a = t2.components, s = t2.disallowedElements, l2 = t2.skipHtml, u2 = t2.unwrapDisallowed, c2 = t2.urlTransform || defaultUrlTransform;
    for (const e3 of Qt) Object.hasOwn(t2, e3.from) && unreachable((e3.from, e3.to && e3.to, e3.id));
    return visit(e2, transform), toJsxRuntime(e2, { Fragment: ke$1.Fragment, components: a, ignoreInvalidStyle: true, jsx: ke$1.jsx, jsxs: ke$1.jsxs, passKeys: true, passNode: true });
    function transform(e3, t3, n) {
      if ("raw" === e3.type && n && "number" == typeof t3) return l2 ? n.children.splice(t3, 1) : n.children[t3] = { type: "text", value: e3.value }, t3;
      if ("element" === e3.type) {
        let t4;
        for (t4 in he) if (Object.hasOwn(he, t4) && Object.hasOwn(e3.properties, t4)) {
          const n2 = e3.properties[t4], o3 = he[t4];
          (null === o3 || o3.includes(e3.tagName)) && (e3.properties[t4] = c2(String(n2 || ""), t4, e3));
        }
      }
      if ("element" === e3.type) {
        let a2 = o2 ? !o2.includes(e3.tagName) : !!s && s.includes(e3.tagName);
        if (!a2 && i && "number" == typeof t3 && (a2 = !i(e3, t3, n)), a2 && n && "number" == typeof t3) return u2 && e3.children ? n.children.splice(t3, 1, ...e3.children) : n.children.splice(t3, 1), t3;
      }
    }
  }(t.runSync(t.parse(o), o), e);
}
function defaultUrlTransform(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), o = e.indexOf("#"), i = e.indexOf("/");
  return -1 === t || -1 !== i && t > i || -1 !== n && t > n || -1 !== o && t > o || Xt.test(e.slice(0, t)) ? e : "";
}
function ccount(e, t) {
  const n = String(e);
  if ("string" != typeof t) throw new TypeError("Expected character");
  let o = 0, i = n.indexOf(t);
  for (; -1 !== i; ) o++, i = n.indexOf(t, i + t.length);
  return o;
}
function findAndReplace(e, t, n) {
  const o = convert((n || {}).ignore || []), i = function(e2) {
    const t2 = [];
    if (!Array.isArray(e2)) throw new TypeError("Expected find and replace tuple or list of tuples");
    const n2 = !e2[0] || Array.isArray(e2[0]) ? e2 : [e2];
    let o2 = -1;
    for (; ++o2 < n2.length; ) {
      const e3 = n2[o2];
      t2.push([toExpression(e3[0]), toFunction(e3[1])]);
    }
    return t2;
  }(t);
  let a = -1;
  for (; ++a < i.length; ) visitParents(e, "text", visitor);
  function visitor(e2, t2) {
    let n2, s = -1;
    for (; ++s < t2.length; ) {
      const e3 = t2[s], i2 = n2 ? n2.children : void 0;
      if (o(e3, i2 ? i2.indexOf(e3) : void 0, n2)) return;
      n2 = e3;
    }
    if (n2) return function(e3, t3) {
      const n3 = t3[t3.length - 1], o2 = i[a][0], s2 = i[a][1];
      let l2 = 0;
      const u2 = n3.children.indexOf(e3);
      let c2 = false, f2 = [];
      o2.lastIndex = 0;
      let p2 = o2.exec(e3.value);
      for (; p2; ) {
        const n4 = p2.index, i2 = { index: p2.index, input: p2.input, stack: [...t3, e3] };
        let a2 = s2(...p2, i2);
        if ("string" == typeof a2 && (a2 = a2.length > 0 ? { type: "text", value: a2 } : void 0), false === a2 ? o2.lastIndex = n4 + 1 : (l2 !== n4 && f2.push({ type: "text", value: e3.value.slice(l2, n4) }), Array.isArray(a2) ? f2.push(...a2) : a2 && f2.push(a2), l2 = n4 + p2[0].length, c2 = true), !o2.global) break;
        p2 = o2.exec(e3.value);
      }
      c2 ? (l2 < e3.value.length && f2.push({ type: "text", value: e3.value.slice(l2) }), n3.children.splice(u2, 1, ...f2)) : f2 = [e3];
      return u2 + f2.length;
    }(e2, t2);
  }
}
function toExpression(e) {
  return "string" == typeof e ? new RegExp(function(e2) {
    if ("string" != typeof e2) throw new TypeError("Expected a string");
    return e2.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }(e), "g") : e;
}
function toFunction(e) {
  return "function" == typeof e ? e : function() {
    return e;
  };
}
const Zt = "phrasing", Jt = ["autolink", "link", "image", "label"];
function enterLiteralAutolink(e) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e);
}
function enterLiteralAutolinkValue(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function exitLiteralAutolinkHttp(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function exitLiteralAutolinkWww(e) {
  this.config.exit.data.call(this, e);
  const t = this.stack[this.stack.length - 1];
  t.type, t.url = "http://" + this.sliceSerialize(e);
}
function exitLiteralAutolinkEmail(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function exitLiteralAutolink(e) {
  this.exit(e);
}
function transformGfmAutolinkLiterals(e) {
  findAndReplace(e, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, findUrl], [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, findEmail]], { ignore: ["link", "linkReference"] });
}
function findUrl(e, t, n, o, i) {
  let a = "";
  if (!previous(i)) return false;
  if (/^w/i.test(t) && (n = t + n, t = "", a = "http://"), !function(e2) {
    const t2 = e2.split(".");
    if (t2.length < 2 || t2[t2.length - 1] && (/_/.test(t2[t2.length - 1]) || !/[a-zA-Z\d]/.test(t2[t2.length - 1])) || t2[t2.length - 2] && (/_/.test(t2[t2.length - 2]) || !/[a-zA-Z\d]/.test(t2[t2.length - 2]))) return false;
    return true;
  }(n)) return false;
  const s = function(e2) {
    const t2 = /[!"&'),.:;<>?\]}]+$/.exec(e2);
    if (!t2) return [e2, void 0];
    e2 = e2.slice(0, t2.index);
    let n2 = t2[0], o2 = n2.indexOf(")");
    const i2 = ccount(e2, "(");
    let a2 = ccount(e2, ")");
    for (; -1 !== o2 && i2 > a2; ) e2 += n2.slice(0, o2 + 1), n2 = n2.slice(o2 + 1), o2 = n2.indexOf(")"), a2++;
    return [e2, n2];
  }(n + o);
  if (!s[0]) return false;
  const l2 = { type: "link", title: null, url: a + t + s[0], children: [{ type: "text", value: t + s[0] }] };
  return s[1] ? [l2, { type: "text", value: s[1] }] : l2;
}
function findEmail(e, t, n, o) {
  return !(!previous(o, true) || /[-\d_]$/.test(n)) && { type: "link", title: null, url: "mailto:" + t + "@" + n, children: [{ type: "text", value: t + "@" + n }] };
}
function previous(e, t) {
  const n = e.input.charCodeAt(e.index - 1);
  return (0 === e.index || Ee(n) || Ce(n)) && (!t || 47 !== n);
}
function enterFootnoteCallString() {
  this.buffer();
}
function enterFootnoteCall(e) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e);
}
function enterFootnoteDefinitionLabelString() {
  this.buffer();
}
function enterFootnoteDefinition(e) {
  this.enter({ type: "footnoteDefinition", identifier: "", label: "", children: [] }, e);
}
function exitFootnoteCallString(e) {
  const t = this.resume(), n = this.stack[this.stack.length - 1];
  n.type, n.identifier = normalizeIdentifier(this.sliceSerialize(e)).toLowerCase(), n.label = t;
}
function exitFootnoteCall(e) {
  this.exit(e);
}
function exitFootnoteDefinitionLabelString(e) {
  const t = this.resume(), n = this.stack[this.stack.length - 1];
  n.type, n.identifier = normalizeIdentifier(this.sliceSerialize(e)).toLowerCase(), n.label = t;
}
function exitFootnoteDefinition(e) {
  this.exit(e);
}
function footnoteReference(e, t, n, o) {
  const i = n.createTracker(o);
  let a = i.move("[^");
  const s = n.enter("footnoteReference"), l2 = n.enter("reference");
  return a += i.move(n.safe(n.associationId(e), { after: "]", before: a })), l2(), s(), a += i.move("]"), a;
}
function gfmFootnoteToMarkdown(e) {
  let t = false;
  return e && e.firstLineBlank && (t = true), { handlers: { footnoteDefinition: function(e2, n, o, i) {
    const a = o.createTracker(i);
    let s = a.move("[^");
    const l2 = o.enter("footnoteDefinition"), u2 = o.enter("label");
    s += a.move(o.safe(o.associationId(e2), { before: s, after: "]" })), u2(), s += a.move("]:"), e2.children && e2.children.length > 0 && (a.shift(4), s += a.move((t ? "\n" : " ") + o.indentLines(o.containerFlow(e2, a.current()), t ? mapAll : mapExceptFirst)));
    return l2(), s;
  }, footnoteReference }, unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }] };
}
function mapExceptFirst(e, t, n) {
  return 0 === t ? e : mapAll(e, t, n);
}
function mapAll(e, t, n) {
  return (n ? "" : "    ") + e;
}
footnoteReference.peek = function() {
  return "[";
};
const en = ["autolink", "destinationLiteral", "destinationRaw", "reference", "titleQuote", "titleApostrophe"];
function enterStrikethrough(e) {
  this.enter({ type: "delete", children: [] }, e);
}
function exitStrikethrough(e) {
  this.exit(e);
}
function handleDelete(e, t, n, o) {
  const i = n.createTracker(o), a = n.enter("strikethrough");
  let s = i.move("~~");
  return s += n.containerPhrasing(e, { ...i.current(), before: s, after: "~" }), s += i.move("~~"), a(), s;
}
function defaultStringLength(e) {
  return e.length;
}
function serialize(e) {
  return null == e ? "" : String(e);
}
function toAlignment(e) {
  const t = "string" == typeof e ? e.codePointAt(0) : 0;
  return 67 === t || 99 === t ? 99 : 76 === t || 108 === t ? 108 : 82 === t || 114 === t ? 114 : 0;
}
function map$1(e, t, n) {
  return ">" + (n ? "" : " ") + e;
}
function patternInScope(e, t) {
  return listInScope(e, t.inConstruct, true) && !listInScope(e, t.notInConstruct, false);
}
function listInScope(e, t, n) {
  if ("string" == typeof t && (t = [t]), !t || 0 === t.length) return n;
  let o = -1;
  for (; ++o < t.length; ) if (e.includes(t[o])) return true;
  return false;
}
function hardBreak(e, t, n, o) {
  let i = -1;
  for (; ++i < n.unsafe.length; ) if ("\n" === n.unsafe[i].character && patternInScope(n.stack, n.unsafe[i])) return /[ \t]/.test(o.before) ? "" : " ";
  return "\\\n";
}
function map(e, t, n) {
  return (n ? "" : "    ") + e;
}
function checkQuote(e) {
  const t = e.options.quote || '"';
  if ('"' !== t && "'" !== t) throw new Error("Cannot serialize title with `" + t + "` for `options.quote`, expected `\"`, or `'`");
  return t;
}
function encodeCharacterReference(e) {
  return "&#x" + e.toString(16).toUpperCase() + ";";
}
function encodeInfo(e, t, n) {
  const o = classifyCharacter(e), i = classifyCharacter(t);
  return void 0 === o ? void 0 === i ? "_" === n ? { inside: true, outside: true } : { inside: false, outside: false } : 1 === i ? { inside: true, outside: true } : { inside: false, outside: true } : 1 === o ? void 0 === i ? { inside: false, outside: false } : 1 === i ? { inside: true, outside: true } : { inside: false, outside: false } : void 0 === i ? { inside: false, outside: false } : 1 === i ? { inside: true, outside: false } : { inside: false, outside: false };
}
function emphasis(e, t, n, o) {
  const i = function(e2) {
    const t2 = e2.options.emphasis || "*";
    if ("*" !== t2 && "_" !== t2) throw new Error("Cannot serialize emphasis with `" + t2 + "` for `options.emphasis`, expected `*`, or `_`");
    return t2;
  }(n), a = n.enter("emphasis"), s = n.createTracker(o), l2 = s.move(i);
  let u2 = s.move(n.containerPhrasing(e, { after: i, before: l2, ...s.current() }));
  const c2 = u2.charCodeAt(0), f2 = encodeInfo(o.before.charCodeAt(o.before.length - 1), c2, i);
  f2.inside && (u2 = encodeCharacterReference(c2) + u2.slice(1));
  const p2 = u2.charCodeAt(u2.length - 1), d2 = encodeInfo(o.after.charCodeAt(0), p2, i);
  d2.inside && (u2 = u2.slice(0, -1) + encodeCharacterReference(p2));
  const h2 = s.move(i);
  return a(), n.attentionEncodeSurroundingInfo = { after: d2.outside, before: f2.outside }, l2 + u2 + h2;
}
function html(e) {
  return e.value || "";
}
function image(e, t, n, o) {
  const i = checkQuote(n), a = '"' === i ? "Quote" : "Apostrophe", s = n.enter("image");
  let l2 = n.enter("label");
  const u2 = n.createTracker(o);
  let c2 = u2.move("![");
  return c2 += u2.move(n.safe(e.alt, { before: c2, after: "]", ...u2.current() })), c2 += u2.move("]("), l2(), !e.url && e.title || /[\0- \u007F]/.test(e.url) ? (l2 = n.enter("destinationLiteral"), c2 += u2.move("<"), c2 += u2.move(n.safe(e.url, { before: c2, after: ">", ...u2.current() })), c2 += u2.move(">")) : (l2 = n.enter("destinationRaw"), c2 += u2.move(n.safe(e.url, { before: c2, after: e.title ? " " : ")", ...u2.current() }))), l2(), e.title && (l2 = n.enter(`title${a}`), c2 += u2.move(" " + i), c2 += u2.move(n.safe(e.title, { before: c2, after: i, ...u2.current() })), c2 += u2.move(i), l2()), c2 += u2.move(")"), s(), c2;
}
function imageReference(e, t, n, o) {
  const i = e.referenceType, a = n.enter("imageReference");
  let s = n.enter("label");
  const l2 = n.createTracker(o);
  let u2 = l2.move("![");
  const c2 = n.safe(e.alt, { before: u2, after: "]", ...l2.current() });
  u2 += l2.move(c2 + "]["), s();
  const f2 = n.stack;
  n.stack = [], s = n.enter("reference");
  const p2 = n.safe(n.associationId(e), { before: u2, after: "]", ...l2.current() });
  return s(), n.stack = f2, a(), "full" !== i && c2 && c2 === p2 ? "shortcut" === i ? u2 = u2.slice(0, -1) : u2 += l2.move("]") : u2 += l2.move(p2 + "]"), u2;
}
function inlineCode(e, t, n) {
  let o = e.value || "", i = "`", a = -1;
  for (; new RegExp("(^|[^`])" + i + "([^`]|$)").test(o); ) i += "`";
  for (/[^ \r\n]/.test(o) && (/^[ \r\n]/.test(o) && /[ \r\n]$/.test(o) || /^`|`$/.test(o)) && (o = " " + o + " "); ++a < n.unsafe.length; ) {
    const e2 = n.unsafe[a], t2 = n.compilePattern(e2);
    let i2;
    if (e2.atBreak) for (; i2 = t2.exec(o); ) {
      let e3 = i2.index;
      10 === o.charCodeAt(e3) && 13 === o.charCodeAt(e3 - 1) && e3--, o = o.slice(0, e3) + " " + o.slice(i2.index + 1);
    }
  }
  return i + o + i;
}
function formatLinkAsAutolink(e, t) {
  const n = toString$2(e);
  return Boolean(!t.options.resourceLink && e.url && !e.title && e.children && 1 === e.children.length && "text" === e.children[0].type && (n === e.url || "mailto:" + n === e.url) && /^[a-z][a-z+.-]+:/i.test(e.url) && !/[\0- <>\u007F]/.test(e.url));
}
function link(e, t, n, o) {
  const i = checkQuote(n), a = '"' === i ? "Quote" : "Apostrophe", s = n.createTracker(o);
  let l2, u2;
  if (formatLinkAsAutolink(e, n)) {
    const t2 = n.stack;
    n.stack = [], l2 = n.enter("autolink");
    let o2 = s.move("<");
    return o2 += s.move(n.containerPhrasing(e, { before: o2, after: ">", ...s.current() })), o2 += s.move(">"), l2(), n.stack = t2, o2;
  }
  l2 = n.enter("link"), u2 = n.enter("label");
  let c2 = s.move("[");
  return c2 += s.move(n.containerPhrasing(e, { before: c2, after: "](", ...s.current() })), c2 += s.move("]("), u2(), !e.url && e.title || /[\0- \u007F]/.test(e.url) ? (u2 = n.enter("destinationLiteral"), c2 += s.move("<"), c2 += s.move(n.safe(e.url, { before: c2, after: ">", ...s.current() })), c2 += s.move(">")) : (u2 = n.enter("destinationRaw"), c2 += s.move(n.safe(e.url, { before: c2, after: e.title ? " " : ")", ...s.current() }))), u2(), e.title && (u2 = n.enter(`title${a}`), c2 += s.move(" " + i), c2 += s.move(n.safe(e.title, { before: c2, after: i, ...s.current() })), c2 += s.move(i), u2()), c2 += s.move(")"), l2(), c2;
}
function linkReference(e, t, n, o) {
  const i = e.referenceType, a = n.enter("linkReference");
  let s = n.enter("label");
  const l2 = n.createTracker(o);
  let u2 = l2.move("[");
  const c2 = n.containerPhrasing(e, { before: u2, after: "]", ...l2.current() });
  u2 += l2.move(c2 + "]["), s();
  const f2 = n.stack;
  n.stack = [], s = n.enter("reference");
  const p2 = n.safe(n.associationId(e), { before: u2, after: "]", ...l2.current() });
  return s(), n.stack = f2, a(), "full" !== i && c2 && c2 === p2 ? "shortcut" === i ? u2 = u2.slice(0, -1) : u2 += l2.move("]") : u2 += l2.move(p2 + "]"), u2;
}
function checkBullet(e) {
  const t = e.options.bullet || "*";
  if ("*" !== t && "+" !== t && "-" !== t) throw new Error("Cannot serialize items with `" + t + "` for `options.bullet`, expected `*`, `+`, or `-`");
  return t;
}
function checkRule(e) {
  const t = e.options.rule || "*";
  if ("*" !== t && "-" !== t && "_" !== t) throw new Error("Cannot serialize rules with `" + t + "` for `options.rule`, expected `*`, `-`, or `_`");
  return t;
}
handleDelete.peek = function() {
  return "~";
}, emphasis.peek = function(e, t, n) {
  return n.options.emphasis || "*";
}, html.peek = function() {
  return "<";
}, image.peek = function() {
  return "!";
}, imageReference.peek = function() {
  return "!";
}, inlineCode.peek = function() {
  return "`";
}, link.peek = function(e, t, n) {
  return formatLinkAsAutolink(e, n) ? "<" : "[";
}, linkReference.peek = function() {
  return "[";
};
const tn = convert(["break", "delete", "emphasis", "footnote", "footnoteReference", "image", "imageReference", "inlineCode", "inlineMath", "link", "linkReference", "mdxJsxTextElement", "mdxTextExpression", "strong", "text", "textDirective"]);
function strong(e, t, n, o) {
  const i = function(e2) {
    const t2 = e2.options.strong || "*";
    if ("*" !== t2 && "_" !== t2) throw new Error("Cannot serialize strong with `" + t2 + "` for `options.strong`, expected `*`, or `_`");
    return t2;
  }(n), a = n.enter("strong"), s = n.createTracker(o), l2 = s.move(i + i);
  let u2 = s.move(n.containerPhrasing(e, { after: i, before: l2, ...s.current() }));
  const c2 = u2.charCodeAt(0), f2 = encodeInfo(o.before.charCodeAt(o.before.length - 1), c2, i);
  f2.inside && (u2 = encodeCharacterReference(c2) + u2.slice(1));
  const p2 = u2.charCodeAt(u2.length - 1), d2 = encodeInfo(o.after.charCodeAt(0), p2, i);
  d2.inside && (u2 = u2.slice(0, -1) + encodeCharacterReference(p2));
  const h2 = s.move(i + i);
  return a(), n.attentionEncodeSurroundingInfo = { after: d2.outside, before: f2.outside }, l2 + u2 + h2;
}
strong.peek = function(e, t, n) {
  return n.options.strong || "*";
};
const nn = { blockquote: function(e, t, n, o) {
  const i = n.enter("blockquote"), a = n.createTracker(o);
  a.move("> "), a.shift(2);
  const s = n.indentLines(n.containerFlow(e, a.current()), map$1);
  return i(), s;
}, break: hardBreak, code: function(e, t, n, o) {
  const i = function(e2) {
    const t2 = e2.options.fence || "`";
    if ("`" !== t2 && "~" !== t2) throw new Error("Cannot serialize code with `" + t2 + "` for `options.fence`, expected `` ` `` or `~`");
    return t2;
  }(n), a = e.value || "", s = "`" === i ? "GraveAccent" : "Tilde";
  if (function(e2, t2) {
    return Boolean(false === t2.options.fences && e2.value && !e2.lang && /[^ \r\n]/.test(e2.value) && !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e2.value));
  }(e, n)) {
    const e2 = n.enter("codeIndented"), t2 = n.indentLines(a, map);
    return e2(), t2;
  }
  const l2 = n.createTracker(o), u2 = i.repeat(Math.max(function(e2, t2) {
    const n2 = String(e2);
    let o2 = n2.indexOf(t2), i2 = o2, a2 = 0, s2 = 0;
    if ("string" != typeof t2) throw new TypeError("Expected substring");
    for (; -1 !== o2; ) o2 === i2 ? ++a2 > s2 && (s2 = a2) : a2 = 1, i2 = o2 + t2.length, o2 = n2.indexOf(t2, i2);
    return s2;
  }(a, i) + 1, 3)), c2 = n.enter("codeFenced");
  let f2 = l2.move(u2);
  if (e.lang) {
    const t2 = n.enter(`codeFencedLang${s}`);
    f2 += l2.move(n.safe(e.lang, { before: f2, after: " ", encode: ["`"], ...l2.current() })), t2();
  }
  if (e.lang && e.meta) {
    const t2 = n.enter(`codeFencedMeta${s}`);
    f2 += l2.move(" "), f2 += l2.move(n.safe(e.meta, { before: f2, after: "\n", encode: ["`"], ...l2.current() })), t2();
  }
  return f2 += l2.move("\n"), a && (f2 += l2.move(a + "\n")), f2 += l2.move(u2), c2(), f2;
}, definition: function(e, t, n, o) {
  const i = checkQuote(n), a = '"' === i ? "Quote" : "Apostrophe", s = n.enter("definition");
  let l2 = n.enter("label");
  const u2 = n.createTracker(o);
  let c2 = u2.move("[");
  return c2 += u2.move(n.safe(n.associationId(e), { before: c2, after: "]", ...u2.current() })), c2 += u2.move("]: "), l2(), !e.url || /[\0- \u007F]/.test(e.url) ? (l2 = n.enter("destinationLiteral"), c2 += u2.move("<"), c2 += u2.move(n.safe(e.url, { before: c2, after: ">", ...u2.current() })), c2 += u2.move(">")) : (l2 = n.enter("destinationRaw"), c2 += u2.move(n.safe(e.url, { before: c2, after: e.title ? " " : "\n", ...u2.current() }))), l2(), e.title && (l2 = n.enter(`title${a}`), c2 += u2.move(" " + i), c2 += u2.move(n.safe(e.title, { before: c2, after: i, ...u2.current() })), c2 += u2.move(i), l2()), s(), c2;
}, emphasis, hardBreak, heading: function(e, t, n, o) {
  const i = Math.max(Math.min(6, e.depth || 1), 1), a = n.createTracker(o);
  if (function(e2, t2) {
    let n2 = false;
    return visit(e2, function(e3) {
      if ("value" in e3 && /\r?\n|\r/.test(e3.value) || "break" === e3.type) return n2 = true, Tt;
    }), Boolean((!e2.depth || e2.depth < 3) && toString$2(e2) && (t2.options.setext || n2));
  }(e, n)) {
    const t2 = n.enter("headingSetext"), o2 = n.enter("phrasing"), s2 = n.containerPhrasing(e, { ...a.current(), before: "\n", after: "\n" });
    return o2(), t2(), s2 + "\n" + (1 === i ? "=" : "-").repeat(s2.length - (Math.max(s2.lastIndexOf("\r"), s2.lastIndexOf("\n")) + 1));
  }
  const s = "#".repeat(i), l2 = n.enter("headingAtx"), u2 = n.enter("phrasing");
  a.move(s + " ");
  let c2 = n.containerPhrasing(e, { before: "# ", after: "\n", ...a.current() });
  return /^[\t ]/.test(c2) && (c2 = encodeCharacterReference(c2.charCodeAt(0)) + c2.slice(1)), c2 = c2 ? s + " " + c2 : s, n.options.closeAtx && (c2 += " " + s), u2(), l2(), c2;
}, html, image, imageReference, inlineCode, link, linkReference, list: function(e, t, n, o) {
  const i = n.enter("list"), a = n.bulletCurrent;
  let s = e.ordered ? function(e2) {
    const t2 = e2.options.bulletOrdered || ".";
    if ("." !== t2 && ")" !== t2) throw new Error("Cannot serialize items with `" + t2 + "` for `options.bulletOrdered`, expected `.` or `)`");
    return t2;
  }(n) : checkBullet(n);
  const l2 = e.ordered ? "." === s ? ")" : "." : function(e2) {
    const t2 = checkBullet(e2), n2 = e2.options.bulletOther;
    if (!n2) return "*" === t2 ? "-" : "*";
    if ("*" !== n2 && "+" !== n2 && "-" !== n2) throw new Error("Cannot serialize items with `" + n2 + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
    if (n2 === t2) throw new Error("Expected `bullet` (`" + t2 + "`) and `bulletOther` (`" + n2 + "`) to be different");
    return n2;
  }(n);
  let u2 = !(!t || !n.bulletLastUsed) && s === n.bulletLastUsed;
  if (!e.ordered) {
    const t2 = e.children ? e.children[0] : void 0;
    if ("*" !== s && "-" !== s || !t2 || t2.children && t2.children[0] || "list" !== n.stack[n.stack.length - 1] || "listItem" !== n.stack[n.stack.length - 2] || "list" !== n.stack[n.stack.length - 3] || "listItem" !== n.stack[n.stack.length - 4] || 0 !== n.indexStack[n.indexStack.length - 1] || 0 !== n.indexStack[n.indexStack.length - 2] || 0 !== n.indexStack[n.indexStack.length - 3] || (u2 = true), checkRule(n) === s && t2) {
      let t3 = -1;
      for (; ++t3 < e.children.length; ) {
        const n2 = e.children[t3];
        if (n2 && "listItem" === n2.type && n2.children && n2.children[0] && "thematicBreak" === n2.children[0].type) {
          u2 = true;
          break;
        }
      }
    }
  }
  u2 && (s = l2), n.bulletCurrent = s;
  const c2 = n.containerFlow(e, o);
  return n.bulletLastUsed = s, n.bulletCurrent = a, i(), c2;
}, listItem: function(e, t, n, o) {
  const i = function(e2) {
    const t2 = e2.options.listItemIndent || "one";
    if ("tab" !== t2 && "one" !== t2 && "mixed" !== t2) throw new Error("Cannot serialize items with `" + t2 + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
    return t2;
  }(n);
  let a = n.bulletCurrent || checkBullet(n);
  t && "list" === t.type && t.ordered && (a = ("number" == typeof t.start && t.start > -1 ? t.start : 1) + (false === n.options.incrementListMarker ? 0 : t.children.indexOf(e)) + a);
  let s = a.length + 1;
  ("tab" === i || "mixed" === i && (t && "list" === t.type && t.spread || e.spread)) && (s = 4 * Math.ceil(s / 4));
  const l2 = n.createTracker(o);
  l2.move(a + " ".repeat(s - a.length)), l2.shift(s);
  const u2 = n.enter("listItem"), c2 = n.indentLines(n.containerFlow(e, l2.current()), function(e2, t2, n2) {
    if (t2) return (n2 ? "" : " ".repeat(s)) + e2;
    return (n2 ? a : a + " ".repeat(s - a.length)) + e2;
  });
  return u2(), c2;
}, paragraph: function(e, t, n, o) {
  const i = n.enter("paragraph"), a = n.enter("phrasing"), s = n.containerPhrasing(e, o);
  return a(), i(), s;
}, root: function(e, t, n, o) {
  return (e.children.some(function(e2) {
    return tn(e2);
  }) ? n.containerPhrasing : n.containerFlow).call(n, e, o);
}, strong, text: function(e, t, n, o) {
  return n.safe(e.value, o);
}, thematicBreak: function(e, t, n) {
  const o = (checkRule(n) + (n.options.ruleSpaces ? " " : "")).repeat(function(e2) {
    const t2 = e2.options.ruleRepetition || 3;
    if (t2 < 3) throw new Error("Cannot serialize rules with repetition `" + t2 + "` for `options.ruleRepetition`, expected `3` or more");
    return t2;
  }(n));
  return n.options.ruleSpaces ? o.slice(0, -1) : o;
} };
function enterTable(e) {
  const t = e._align;
  this.enter({ type: "table", align: t.map(function(e2) {
    return "none" === e2 ? null : e2;
  }), children: [] }, e), this.data.inTable = true;
}
function exitTable(e) {
  this.exit(e), this.data.inTable = void 0;
}
function enterRow(e) {
  this.enter({ type: "tableRow", children: [] }, e);
}
function exit(e) {
  this.exit(e);
}
function enterCell(e) {
  this.enter({ type: "tableCell", children: [] }, e);
}
function exitCodeText(e) {
  let t = this.resume();
  this.data.inTable && (t = t.replace(/\\([\\|])/g, replace));
  const n = this.stack[this.stack.length - 1];
  n.type, n.value = t, this.exit(e);
}
function replace(e, t) {
  return "|" === t ? t : e;
}
function gfmTableToMarkdown(e) {
  const t = e || {}, n = t.tableCellPadding, o = t.tablePipeAlign, i = t.stringLength, a = n ? " " : "|";
  return { unsafe: [{ character: "\r", inConstruct: "tableCell" }, { character: "\n", inConstruct: "tableCell" }, { atBreak: true, character: "|", after: "[	 :-]" }, { character: "|", inConstruct: "tableCell" }, { atBreak: true, character: ":", after: "-" }, { atBreak: true, character: "-", after: "[:|-]" }], handlers: { inlineCode: function(e2, t2, n2) {
    let o2 = nn.inlineCode(e2, t2, n2);
    n2.stack.includes("tableCell") && (o2 = o2.replace(/\|/g, "\\$&"));
    return o2;
  }, table: function(e2, t2, n2, o2) {
    return serializeData(function(e3, t3, n3) {
      const o3 = e3.children;
      let i2 = -1;
      const a2 = [], s = t3.enter("table");
      for (; ++i2 < o3.length; ) a2[i2] = handleTableRowAsData(o3[i2], t3, n3);
      return s(), a2;
    }(e2, n2, o2), e2.align);
  }, tableCell: handleTableCell, tableRow: function(e2, t2, n2, o2) {
    const i2 = handleTableRowAsData(e2, n2, o2), a2 = serializeData([i2]);
    return a2.slice(0, a2.indexOf("\n"));
  } } };
  function handleTableCell(e2, t2, n2, o2) {
    const i2 = n2.enter("tableCell"), s = n2.enter("phrasing"), l2 = n2.containerPhrasing(e2, { ...o2, before: a, after: a });
    return s(), i2(), l2;
  }
  function serializeData(e2, t2) {
    return function(e3, t3) {
      const n2 = t3 || {}, o2 = (n2.align || []).concat(), i2 = n2.stringLength || defaultStringLength, a2 = [], s = [], l2 = [], u2 = [];
      let c2 = 0, f2 = -1;
      for (; ++f2 < e3.length; ) {
        const t4 = [], o3 = [];
        let a3 = -1;
        for (e3[f2].length > c2 && (c2 = e3[f2].length); ++a3 < e3[f2].length; ) {
          const s2 = serialize(e3[f2][a3]);
          if (false !== n2.alignDelimiters) {
            const e4 = i2(s2);
            o3[a3] = e4, (void 0 === u2[a3] || e4 > u2[a3]) && (u2[a3] = e4);
          }
          t4.push(s2);
        }
        s[f2] = t4, l2[f2] = o3;
      }
      let p2 = -1;
      if ("object" == typeof o2 && "length" in o2) for (; ++p2 < c2; ) a2[p2] = toAlignment(o2[p2]);
      else {
        const e4 = toAlignment(o2);
        for (; ++p2 < c2; ) a2[p2] = e4;
      }
      p2 = -1;
      const d2 = [], h2 = [];
      for (; ++p2 < c2; ) {
        const e4 = a2[p2];
        let t4 = "", o3 = "";
        99 === e4 ? (t4 = ":", o3 = ":") : 108 === e4 ? t4 = ":" : 114 === e4 && (o3 = ":");
        let i3 = false === n2.alignDelimiters ? 1 : Math.max(1, u2[p2] - t4.length - o3.length);
        const s2 = t4 + "-".repeat(i3) + o3;
        false !== n2.alignDelimiters && (i3 = t4.length + i3 + o3.length, i3 > u2[p2] && (u2[p2] = i3), h2[p2] = i3), d2[p2] = s2;
      }
      s.splice(1, 0, d2), l2.splice(1, 0, h2), f2 = -1;
      const g2 = [];
      for (; ++f2 < s.length; ) {
        const e4 = s[f2], t4 = l2[f2];
        p2 = -1;
        const o3 = [];
        for (; ++p2 < c2; ) {
          const i3 = e4[p2] || "";
          let s2 = "", l3 = "";
          if (false !== n2.alignDelimiters) {
            const e5 = u2[p2] - (t4[p2] || 0), n3 = a2[p2];
            114 === n3 ? s2 = " ".repeat(e5) : 99 === n3 ? e5 % 2 ? (s2 = " ".repeat(e5 / 2 + 0.5), l3 = " ".repeat(e5 / 2 - 0.5)) : (s2 = " ".repeat(e5 / 2), l3 = s2) : l3 = " ".repeat(e5);
          }
          false === n2.delimiterStart || p2 || o3.push("|"), false === n2.padding || false === n2.alignDelimiters && "" === i3 || false === n2.delimiterStart && !p2 || o3.push(" "), false !== n2.alignDelimiters && o3.push(s2), o3.push(i3), false !== n2.alignDelimiters && o3.push(l3), false !== n2.padding && o3.push(" "), false === n2.delimiterEnd && p2 === c2 - 1 || o3.push("|");
        }
        g2.push(false === n2.delimiterEnd ? o3.join("").replace(/ +$/, "") : o3.join(""));
      }
      return g2.join("\n");
    }(e2, { align: t2, alignDelimiters: o, padding: n, stringLength: i });
  }
  function handleTableRowAsData(e2, t2, n2) {
    const o2 = e2.children;
    let i2 = -1;
    const a2 = [], s = t2.enter("tableRow");
    for (; ++i2 < o2.length; ) a2[i2] = handleTableCell(o2[i2], 0, t2, n2);
    return s(), a2;
  }
}
function exitCheck(e) {
  const t = this.stack[this.stack.length - 2];
  t.type, t.checked = "taskListCheckValueChecked" === e.type;
}
function exitParagraphWithTaskListItem(e) {
  const t = this.stack[this.stack.length - 2];
  if (t && "listItem" === t.type && "boolean" == typeof t.checked) {
    const e2 = this.stack[this.stack.length - 1];
    e2.type;
    const n = e2.children[0];
    if (n && "text" === n.type) {
      const o = t.children;
      let i, a = -1;
      for (; ++a < o.length; ) {
        const e3 = o[a];
        if ("paragraph" === e3.type) {
          i = e3;
          break;
        }
      }
      i === e2 && (n.value = n.value.slice(1), 0 === n.value.length ? e2.children.shift() : e2.position && n.position && "number" == typeof n.position.start.offset && (n.position.start.column++, n.position.start.offset++, e2.position.start = Object.assign({}, n.position.start)));
    }
  }
  this.exit(e);
}
function listItemWithTaskListItem(e, t, n, o) {
  const i = e.children[0], a = "boolean" == typeof e.checked && i && "paragraph" === i.type, s = "[" + (e.checked ? "x" : " ") + "] ", l2 = n.createTracker(o);
  a && l2.move(s);
  let u2 = nn.listItem(e, t, n, { ...o, ...l2.current() });
  return a && (u2 = u2.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, function(e2) {
    return e2 + s;
  })), u2;
}
const rn = { tokenize: function(e, t, n) {
  let o = 0;
  return function wwwPrefixInside(t2) {
    if ((87 === t2 || 119 === t2) && o < 3) return o++, e.consume(t2), wwwPrefixInside;
    if (46 === t2 && 3 === o) return e.consume(t2), wwwPrefixAfter;
    return n(t2);
  };
  function wwwPrefixAfter(e2) {
    return null === e2 ? n(e2) : t(e2);
  }
}, partial: true }, on = { tokenize: function(e, t, n) {
  let o, i, a;
  return domainInside;
  function domainInside(t2) {
    return 46 === t2 || 95 === t2 ? e.check(sn, domainAfter, domainAtPunctuation)(t2) : null === t2 || markdownLineEndingOrSpace(t2) || Ee(t2) || 45 !== t2 && Ce(t2) ? domainAfter(t2) : (a = true, e.consume(t2), domainInside);
  }
  function domainAtPunctuation(t2) {
    return 95 === t2 ? o = true : (i = o, o = void 0), e.consume(t2), domainInside;
  }
  function domainAfter(e2) {
    return i || o || !a ? n(e2) : t(e2);
  }
}, partial: true }, an = { tokenize: function(e, t) {
  let n = 0, o = 0;
  return pathInside;
  function pathInside(i) {
    return 40 === i ? (n++, e.consume(i), pathInside) : 41 === i && o < n ? pathAtPunctuation(i) : 33 === i || 34 === i || 38 === i || 39 === i || 41 === i || 42 === i || 44 === i || 46 === i || 58 === i || 59 === i || 60 === i || 63 === i || 93 === i || 95 === i || 126 === i ? e.check(sn, t, pathAtPunctuation)(i) : null === i || markdownLineEndingOrSpace(i) || Ee(i) ? t(i) : (e.consume(i), pathInside);
  }
  function pathAtPunctuation(t2) {
    return 41 === t2 && o++, e.consume(t2), pathInside;
  }
}, partial: true }, sn = { tokenize: function(e, t, n) {
  return trail;
  function trail(o) {
    return 33 === o || 34 === o || 39 === o || 41 === o || 42 === o || 44 === o || 46 === o || 58 === o || 59 === o || 63 === o || 95 === o || 126 === o ? (e.consume(o), trail) : 38 === o ? (e.consume(o), trailCharacterReferenceStart) : 93 === o ? (e.consume(o), trailBracketAfter) : 60 === o || null === o || markdownLineEndingOrSpace(o) || Ee(o) ? t(o) : n(o);
  }
  function trailBracketAfter(e2) {
    return null === e2 || 40 === e2 || 91 === e2 || markdownLineEndingOrSpace(e2) || Ee(e2) ? t(e2) : trail(e2);
  }
  function trailCharacterReferenceStart(e2) {
    return ve(e2) ? trailCharacterReferenceInside(e2) : n(e2);
  }
  function trailCharacterReferenceInside(t2) {
    return 59 === t2 ? (e.consume(t2), trail) : ve(t2) ? (e.consume(t2), trailCharacterReferenceInside) : n(t2);
  }
}, partial: true }, ln = { tokenize: function(e, t, n) {
  return function(t2) {
    return e.consume(t2), after;
  };
  function after(e2) {
    return ke(e2) ? n(e2) : t(e2);
  }
}, partial: true }, un = { name: "wwwAutolink", tokenize: function(e, t, n) {
  const o = this;
  return function(t2) {
    if (87 !== t2 && 119 !== t2 || !previousWww.call(o, o.previous) || previousUnbalanced(o.events)) return n(t2);
    return e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(rn, e.attempt(on, e.attempt(an, wwwAfter), n), n)(t2);
  };
  function wwwAfter(n2) {
    return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), t(n2);
  }
}, previous: previousWww }, cn = { name: "protocolAutolink", tokenize: function(e, t, n) {
  const o = this;
  let i = "", a = false;
  return function(t2) {
    if ((72 === t2 || 104 === t2) && previousProtocol.call(o, o.previous) && !previousUnbalanced(o.events)) return e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(t2), e.consume(t2), protocolPrefixInside;
    return n(t2);
  };
  function protocolPrefixInside(t2) {
    if (ve(t2) && i.length < 5) return i += String.fromCodePoint(t2), e.consume(t2), protocolPrefixInside;
    if (58 === t2) {
      const n2 = i.toLowerCase();
      if ("http" === n2 || "https" === n2) return e.consume(t2), protocolSlashesInside;
    }
    return n(t2);
  }
  function protocolSlashesInside(t2) {
    return 47 === t2 ? (e.consume(t2), a ? afterProtocol : (a = true, protocolSlashesInside)) : n(t2);
  }
  function afterProtocol(t2) {
    return null === t2 || asciiControl(t2) || markdownLineEndingOrSpace(t2) || Ee(t2) || Ce(t2) ? n(t2) : e.attempt(on, e.attempt(an, protocolAfter), n)(t2);
  }
  function protocolAfter(n2) {
    return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), t(n2);
  }
}, previous: previousProtocol }, fn = { name: "emailAutolink", tokenize: function(e, t, n) {
  const o = this;
  let i, a;
  return function(t2) {
    if (!gfmAtext(t2) || !previousEmail.call(o, o.previous) || previousUnbalanced(o.events)) return n(t2);
    return e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), atext(t2);
  };
  function atext(t2) {
    return gfmAtext(t2) ? (e.consume(t2), atext) : 64 === t2 ? (e.consume(t2), emailDomain) : n(t2);
  }
  function emailDomain(t2) {
    return 46 === t2 ? e.check(ln, emailDomainAfter, emailDomainDot)(t2) : 45 === t2 || 95 === t2 || ke(t2) ? (a = true, e.consume(t2), emailDomain) : emailDomainAfter(t2);
  }
  function emailDomainDot(t2) {
    return e.consume(t2), i = true, emailDomain;
  }
  function emailDomainAfter(s) {
    return a && i && ve(o.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), t(s)) : n(s);
  }
}, previous: previousEmail }, pn = {};
let dn = 48;
for (; dn < 123; ) pn[dn] = fn, dn++, 58 === dn ? dn = 65 : 91 === dn && (dn = 97);
function previousWww(e) {
  return null === e || 40 === e || 42 === e || 95 === e || 91 === e || 93 === e || 126 === e || markdownLineEndingOrSpace(e);
}
function previousProtocol(e) {
  return !ve(e);
}
function previousEmail(e) {
  return !(47 === e || gfmAtext(e));
}
function gfmAtext(e) {
  return 43 === e || 45 === e || 46 === e || 95 === e || ke(e);
}
function previousUnbalanced(e) {
  let t = e.length, n = false;
  for (; t--; ) {
    const o = e[t][1];
    if (("labelLink" === o.type || "labelImage" === o.type) && !o._balanced) {
      n = true;
      break;
    }
    if (o._gfmAutolinkLiteralWalkedInto) {
      n = false;
      break;
    }
  }
  return e.length > 0 && !n && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = true), n;
}
pn[43] = fn, pn[45] = fn, pn[46] = fn, pn[95] = fn, pn[72] = [fn, cn], pn[104] = [fn, cn], pn[87] = [fn, un], pn[119] = [fn, un];
const hn = { tokenize: function(e, t, n) {
  const o = this;
  return factorySpace(e, function(e2) {
    const i = o.events[o.events.length - 1];
    return i && "gfmFootnoteDefinitionIndent" === i[1].type && 4 === i[2].sliceSerialize(i[1], true).length ? t(e2) : n(e2);
  }, "gfmFootnoteDefinitionIndent", 5);
}, partial: true };
function tokenizePotentialGfmFootnoteCall(e, t, n) {
  const o = this;
  let i = o.events.length;
  const a = o.parser.gfmFootnotes || (o.parser.gfmFootnotes = []);
  let s;
  for (; i--; ) {
    const e2 = o.events[i][1];
    if ("labelImage" === e2.type) {
      s = e2;
      break;
    }
    if ("gfmFootnoteCall" === e2.type || "labelLink" === e2.type || "label" === e2.type || "image" === e2.type || "link" === e2.type) break;
  }
  return function(i2) {
    if (!s || !s._balanced) return n(i2);
    const l2 = normalizeIdentifier(o.sliceSerialize({ start: s.end, end: o.now() }));
    if (94 !== l2.codePointAt(0) || !a.includes(l2.slice(1))) return n(i2);
    return e.enter("gfmFootnoteCallLabelMarker"), e.consume(i2), e.exit("gfmFootnoteCallLabelMarker"), t(i2);
  };
}
function resolveToPotentialGfmFootnoteCall(e, t) {
  let n = e.length;
  for (; n--; ) if ("labelImage" === e[n][1].type && "enter" === e[n][0]) {
    e[n][1];
    break;
  }
  e[n + 1][1].type = "data", e[n + 3][1].type = "gfmFootnoteCallLabelMarker";
  const o = { type: "gfmFootnoteCall", start: Object.assign({}, e[n + 3][1].start), end: Object.assign({}, e[e.length - 1][1].end) }, i = { type: "gfmFootnoteCallMarker", start: Object.assign({}, e[n + 3][1].end), end: Object.assign({}, e[n + 3][1].end) };
  i.end.column++, i.end.offset++, i.end._bufferIndex++;
  const a = { type: "gfmFootnoteCallString", start: Object.assign({}, i.end), end: Object.assign({}, e[e.length - 1][1].start) }, s = { type: "chunkString", contentType: "string", start: Object.assign({}, a.start), end: Object.assign({}, a.end) }, l2 = [e[n + 1], e[n + 2], ["enter", o, t], e[n + 3], e[n + 4], ["enter", i, t], ["exit", i, t], ["enter", a, t], ["enter", s, t], ["exit", s, t], ["exit", a, t], e[e.length - 2], e[e.length - 1], ["exit", o, t]];
  return e.splice(n, e.length - n + 1, ...l2), e;
}
function tokenizeGfmFootnoteCall(e, t, n) {
  const o = this, i = o.parser.gfmFootnotes || (o.parser.gfmFootnotes = []);
  let a, s = 0;
  return function(t2) {
    return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(t2), e.exit("gfmFootnoteCallLabelMarker"), callStart;
  };
  function callStart(t2) {
    return 94 !== t2 ? n(t2) : (e.enter("gfmFootnoteCallMarker"), e.consume(t2), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", callData);
  }
  function callData(l2) {
    if (s > 999 || 93 === l2 && !a || null === l2 || 91 === l2 || markdownLineEndingOrSpace(l2)) return n(l2);
    if (93 === l2) {
      e.exit("chunkString");
      const a2 = e.exit("gfmFootnoteCallString");
      return i.includes(normalizeIdentifier(o.sliceSerialize(a2))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(l2), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), t) : n(l2);
    }
    return markdownLineEndingOrSpace(l2) || (a = true), s++, e.consume(l2), 92 === l2 ? callEscape : callData;
  }
  function callEscape(t2) {
    return 91 === t2 || 92 === t2 || 93 === t2 ? (e.consume(t2), s++, callData) : callData(t2);
  }
}
function tokenizeDefinitionStart(e, t, n) {
  const o = this, i = o.parser.gfmFootnotes || (o.parser.gfmFootnotes = []);
  let a, s, l2 = 0;
  return function(t2) {
    return e.enter("gfmFootnoteDefinition")._container = true, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(t2), e.exit("gfmFootnoteDefinitionLabelMarker"), labelAtMarker;
  };
  function labelAtMarker(t2) {
    return 94 === t2 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(t2), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", labelInside) : n(t2);
  }
  function labelInside(t2) {
    if (l2 > 999 || 93 === t2 && !s || null === t2 || 91 === t2 || markdownLineEndingOrSpace(t2)) return n(t2);
    if (93 === t2) {
      e.exit("chunkString");
      const n2 = e.exit("gfmFootnoteDefinitionLabelString");
      return a = normalizeIdentifier(o.sliceSerialize(n2)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(t2), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), labelAfter;
    }
    return markdownLineEndingOrSpace(t2) || (s = true), l2++, e.consume(t2), 92 === t2 ? labelEscape : labelInside;
  }
  function labelEscape(t2) {
    return 91 === t2 || 92 === t2 || 93 === t2 ? (e.consume(t2), l2++, labelInside) : labelInside(t2);
  }
  function labelAfter(t2) {
    return 58 === t2 ? (e.enter("definitionMarker"), e.consume(t2), e.exit("definitionMarker"), i.includes(a) || i.push(a), factorySpace(e, whitespaceAfter, "gfmFootnoteDefinitionWhitespace")) : n(t2);
  }
  function whitespaceAfter(e2) {
    return t(e2);
  }
}
function tokenizeDefinitionContinuation(e, t, n) {
  return e.check(Pe, t, e.attempt(hn, t, n));
}
function gfmFootnoteDefinitionEnd(e) {
  e.exit("gfmFootnoteDefinition");
}
function gfmStrikethrough(e) {
  let t = (e || {}).singleTilde;
  const n = { name: "strikethrough", tokenize: function(e2, n2, o) {
    const i = this.previous, a = this.events;
    let s = 0;
    return function(t2) {
      if (126 === i && "characterEscape" !== a[a.length - 1][1].type) return o(t2);
      return e2.enter("strikethroughSequenceTemporary"), more(t2);
    };
    function more(a2) {
      const l2 = classifyCharacter(i);
      if (126 === a2) return s > 1 ? o(a2) : (e2.consume(a2), s++, more);
      if (s < 2 && !t) return o(a2);
      const u2 = e2.exit("strikethroughSequenceTemporary"), c2 = classifyCharacter(a2);
      return u2._open = !c2 || 2 === c2 && Boolean(l2), u2._close = !l2 || 2 === l2 && Boolean(c2), n2(a2);
    }
  }, resolveAll: function(e2, t2) {
    let n2 = -1;
    for (; ++n2 < e2.length; ) if ("enter" === e2[n2][0] && "strikethroughSequenceTemporary" === e2[n2][1].type && e2[n2][1]._close) {
      let o = n2;
      for (; o--; ) if ("exit" === e2[o][0] && "strikethroughSequenceTemporary" === e2[o][1].type && e2[o][1]._open && e2[n2][1].end.offset - e2[n2][1].start.offset === e2[o][1].end.offset - e2[o][1].start.offset) {
        e2[n2][1].type = "strikethroughSequence", e2[o][1].type = "strikethroughSequence";
        const i = { type: "strikethrough", start: Object.assign({}, e2[o][1].start), end: Object.assign({}, e2[n2][1].end) }, a = { type: "strikethroughText", start: Object.assign({}, e2[o][1].end), end: Object.assign({}, e2[n2][1].start) }, s = [["enter", i, t2], ["enter", e2[o][1], t2], ["exit", e2[o][1], t2], ["enter", a, t2]], l2 = t2.parser.constructs.insideSpan.null;
        l2 && splice(s, s.length, 0, resolveAll(l2, e2.slice(o + 1, n2), t2)), splice(s, s.length, 0, [["exit", a, t2], ["enter", e2[n2][1], t2], ["exit", e2[n2][1], t2], ["exit", i, t2]]), splice(e2, o - 1, n2 - o + 3, s), n2 = o + s.length - 2;
        break;
      }
    }
    n2 = -1;
    for (; ++n2 < e2.length; ) "strikethroughSequenceTemporary" === e2[n2][1].type && (e2[n2][1].type = "data");
    return e2;
  } };
  return null == t && (t = true), { text: { 126: n }, insideSpan: { null: [n] }, attentionMarkers: { null: [126] } };
}
class EditMap {
  constructor() {
    this.map = [];
  }
  add(e, t, n) {
    !function(e2, t2, n2, o) {
      let i = 0;
      if (0 === n2 && 0 === o.length) return;
      for (; i < e2.map.length; ) {
        if (e2.map[i][0] === t2) return e2.map[i][1] += n2, void e2.map[i][2].push(...o);
        i += 1;
      }
      e2.map.push([t2, n2, o]);
    }(this, e, t, n);
  }
  consume(e) {
    if (this.map.sort(function(e2, t2) {
      return e2[0] - t2[0];
    }), 0 === this.map.length) return;
    let t = this.map.length;
    const n = [];
    for (; t > 0; ) t -= 1, n.push(e.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), e.length = this.map[t][0];
    n.push(e.slice()), e.length = 0;
    let o = n.pop();
    for (; o; ) {
      for (const t2 of o) e.push(t2);
      o = n.pop();
    }
    this.map.length = 0;
  }
}
function gfmTableAlign(e, t) {
  let n = false;
  const o = [];
  for (; t < e.length; ) {
    const i = e[t];
    if (n) {
      if ("enter" === i[0]) "tableContent" === i[1].type && o.push("tableDelimiterMarker" === e[t + 1][1].type ? "left" : "none");
      else if ("tableContent" === i[1].type) {
        if ("tableDelimiterMarker" === e[t - 1][1].type) {
          const e2 = o.length - 1;
          o[e2] = "left" === o[e2] ? "center" : "right";
        }
      } else if ("tableDelimiterRow" === i[1].type) break;
    } else "enter" === i[0] && "tableDelimiterRow" === i[1].type && (n = true);
    t += 1;
  }
  return o;
}
function tokenizeTable(e, t, n) {
  const o = this;
  let i, a = 0, s = 0;
  return function(e2) {
    let t2 = o.events.length - 1;
    for (; t2 > -1; ) {
      const e3 = o.events[t2][1].type;
      if ("lineEnding" !== e3 && "linePrefix" !== e3) break;
      t2--;
    }
    const i2 = t2 > -1 ? o.events[t2][1].type : null, a2 = "tableHead" === i2 || "tableRow" === i2 ? bodyRowStart : headRowBefore;
    if (a2 === bodyRowStart && o.parser.lazy[o.now().line]) return n(e2);
    return a2(e2);
  };
  function headRowBefore(t2) {
    return e.enter("tableHead"), e.enter("tableRow"), function(e2) {
      if (124 === e2) return headRowBreak(e2);
      return i = true, s += 1, headRowBreak(e2);
    }(t2);
  }
  function headRowBreak(t2) {
    return null === t2 ? n(t2) : markdownLineEnding(t2) ? s > 1 ? (s = 0, o.interrupt = true, e.exit("tableRow"), e.enter("lineEnding"), e.consume(t2), e.exit("lineEnding"), headDelimiterStart) : n(t2) : markdownSpace(t2) ? factorySpace(e, headRowBreak, "whitespace")(t2) : (s += 1, i && (i = false, a += 1), 124 === t2 ? (e.enter("tableCellDivider"), e.consume(t2), e.exit("tableCellDivider"), i = true, headRowBreak) : (e.enter("data"), headRowData(t2)));
  }
  function headRowData(t2) {
    return null === t2 || 124 === t2 || markdownLineEndingOrSpace(t2) ? (e.exit("data"), headRowBreak(t2)) : (e.consume(t2), 92 === t2 ? headRowEscape : headRowData);
  }
  function headRowEscape(t2) {
    return 92 === t2 || 124 === t2 ? (e.consume(t2), headRowData) : headRowData(t2);
  }
  function headDelimiterStart(t2) {
    return o.interrupt = false, o.parser.lazy[o.now().line] ? n(t2) : (e.enter("tableDelimiterRow"), i = false, markdownSpace(t2) ? factorySpace(e, headDelimiterBefore, "linePrefix", o.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(t2) : headDelimiterBefore(t2));
  }
  function headDelimiterBefore(t2) {
    return 45 === t2 || 58 === t2 ? headDelimiterValueBefore(t2) : 124 === t2 ? (i = true, e.enter("tableCellDivider"), e.consume(t2), e.exit("tableCellDivider"), headDelimiterCellBefore) : headDelimiterNok(t2);
  }
  function headDelimiterCellBefore(t2) {
    return markdownSpace(t2) ? factorySpace(e, headDelimiterValueBefore, "whitespace")(t2) : headDelimiterValueBefore(t2);
  }
  function headDelimiterValueBefore(t2) {
    return 58 === t2 ? (s += 1, i = true, e.enter("tableDelimiterMarker"), e.consume(t2), e.exit("tableDelimiterMarker"), headDelimiterLeftAlignmentAfter) : 45 === t2 ? (s += 1, headDelimiterLeftAlignmentAfter(t2)) : null === t2 || markdownLineEnding(t2) ? headDelimiterCellAfter(t2) : headDelimiterNok(t2);
  }
  function headDelimiterLeftAlignmentAfter(t2) {
    return 45 === t2 ? (e.enter("tableDelimiterFiller"), headDelimiterFiller(t2)) : headDelimiterNok(t2);
  }
  function headDelimiterFiller(t2) {
    return 45 === t2 ? (e.consume(t2), headDelimiterFiller) : 58 === t2 ? (i = true, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(t2), e.exit("tableDelimiterMarker"), headDelimiterRightAlignmentAfter) : (e.exit("tableDelimiterFiller"), headDelimiterRightAlignmentAfter(t2));
  }
  function headDelimiterRightAlignmentAfter(t2) {
    return markdownSpace(t2) ? factorySpace(e, headDelimiterCellAfter, "whitespace")(t2) : headDelimiterCellAfter(t2);
  }
  function headDelimiterCellAfter(n2) {
    return 124 === n2 ? headDelimiterBefore(n2) : (null === n2 || markdownLineEnding(n2)) && i && a === s ? (e.exit("tableDelimiterRow"), e.exit("tableHead"), t(n2)) : headDelimiterNok(n2);
  }
  function headDelimiterNok(e2) {
    return n(e2);
  }
  function bodyRowStart(t2) {
    return e.enter("tableRow"), bodyRowBreak(t2);
  }
  function bodyRowBreak(n2) {
    return 124 === n2 ? (e.enter("tableCellDivider"), e.consume(n2), e.exit("tableCellDivider"), bodyRowBreak) : null === n2 || markdownLineEnding(n2) ? (e.exit("tableRow"), t(n2)) : markdownSpace(n2) ? factorySpace(e, bodyRowBreak, "whitespace")(n2) : (e.enter("data"), bodyRowData(n2));
  }
  function bodyRowData(t2) {
    return null === t2 || 124 === t2 || markdownLineEndingOrSpace(t2) ? (e.exit("data"), bodyRowBreak(t2)) : (e.consume(t2), 92 === t2 ? bodyRowEscape : bodyRowData);
  }
  function bodyRowEscape(t2) {
    return 92 === t2 || 124 === t2 ? (e.consume(t2), bodyRowData) : bodyRowData(t2);
  }
}
function resolveTable(e, t) {
  let n, o, i, a = -1, s = true, l2 = 0, u2 = [0, 0, 0, 0], c2 = [0, 0, 0, 0], f2 = false, p2 = 0;
  const d2 = new EditMap();
  for (; ++a < e.length; ) {
    const h2 = e[a], g2 = h2[1];
    "enter" === h2[0] ? "tableHead" === g2.type ? (f2 = false, 0 !== p2 && (flushTableEnd(d2, t, p2, n, o), o = void 0, p2 = 0), n = { type: "table", start: Object.assign({}, g2.start), end: Object.assign({}, g2.end) }, d2.add(a, 0, [["enter", n, t]])) : "tableRow" === g2.type || "tableDelimiterRow" === g2.type ? (s = true, i = void 0, u2 = [0, 0, 0, 0], c2 = [0, a + 1, 0, 0], f2 && (f2 = false, o = { type: "tableBody", start: Object.assign({}, g2.start), end: Object.assign({}, g2.end) }, d2.add(a, 0, [["enter", o, t]])), l2 = "tableDelimiterRow" === g2.type ? 2 : o ? 3 : 1) : !l2 || "data" !== g2.type && "tableDelimiterMarker" !== g2.type && "tableDelimiterFiller" !== g2.type ? "tableCellDivider" === g2.type && (s ? s = false : (0 !== u2[1] && (c2[0] = c2[1], i = flushCell(d2, t, u2, l2, void 0, i)), u2 = c2, c2 = [u2[1], a, 0, 0])) : (s = false, 0 === c2[2] && (0 !== u2[1] && (c2[0] = c2[1], i = flushCell(d2, t, u2, l2, void 0, i), u2 = [0, 0, 0, 0]), c2[2] = a)) : "tableHead" === g2.type ? (f2 = true, p2 = a) : "tableRow" === g2.type || "tableDelimiterRow" === g2.type ? (p2 = a, 0 !== u2[1] ? (c2[0] = c2[1], i = flushCell(d2, t, u2, l2, a, i)) : 0 !== c2[1] && (i = flushCell(d2, t, c2, l2, a, i)), l2 = 0) : !l2 || "data" !== g2.type && "tableDelimiterMarker" !== g2.type && "tableDelimiterFiller" !== g2.type || (c2[3] = a);
  }
  for (0 !== p2 && flushTableEnd(d2, t, p2, n, o), d2.consume(t.events), a = -1; ++a < t.events.length; ) {
    const e2 = t.events[a];
    "enter" === e2[0] && "table" === e2[1].type && (e2[1]._align = gfmTableAlign(t.events, a));
  }
  return e;
}
function flushCell(e, t, n, o, i, a) {
  const s = 1 === o ? "tableHeader" : 2 === o ? "tableDelimiter" : "tableData";
  0 !== n[0] && (a.end = Object.assign({}, getPoint(t.events, n[0])), e.add(n[0], 0, [["exit", a, t]]));
  const l2 = getPoint(t.events, n[1]);
  if (a = { type: s, start: Object.assign({}, l2), end: Object.assign({}, l2) }, e.add(n[1], 0, [["enter", a, t]]), 0 !== n[2]) {
    const i2 = getPoint(t.events, n[2]), a2 = getPoint(t.events, n[3]), s2 = { type: "tableContent", start: Object.assign({}, i2), end: Object.assign({}, a2) };
    if (e.add(n[2], 0, [["enter", s2, t]]), 2 !== o) {
      const o2 = t.events[n[2]], i3 = t.events[n[3]];
      if (o2[1].end = Object.assign({}, i3[1].end), o2[1].type = "chunkText", o2[1].contentType = "text", n[3] > n[2] + 1) {
        const t2 = n[2] + 1, o3 = n[3] - n[2] - 1;
        e.add(t2, o3, []);
      }
    }
    e.add(n[3] + 1, 0, [["exit", s2, t]]);
  }
  return void 0 !== i && (a.end = Object.assign({}, getPoint(t.events, i)), e.add(i, 0, [["exit", a, t]]), a = void 0), a;
}
function flushTableEnd(e, t, n, o, i) {
  const a = [], s = getPoint(t.events, n);
  i && (i.end = Object.assign({}, s), a.push(["exit", i, t])), o.end = Object.assign({}, s), a.push(["exit", o, t]), e.add(n + 1, 0, a);
}
function getPoint(e, t) {
  const n = e[t], o = "enter" === n[0] ? "start" : "end";
  return n[1][o];
}
const gn = { name: "tasklistCheck", tokenize: function(e, t, n) {
  const o = this;
  return function(t2) {
    if (null !== o.previous || !o._gfmTasklistFirstContentOfListItem) return n(t2);
    return e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(t2), e.exit("taskListCheckMarker"), inside;
  };
  function inside(t2) {
    return markdownLineEndingOrSpace(t2) ? (e.enter("taskListCheckValueUnchecked"), e.consume(t2), e.exit("taskListCheckValueUnchecked"), close) : 88 === t2 || 120 === t2 ? (e.enter("taskListCheckValueChecked"), e.consume(t2), e.exit("taskListCheckValueChecked"), close) : n(t2);
  }
  function close(t2) {
    return 93 === t2 ? (e.enter("taskListCheckMarker"), e.consume(t2), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), after) : n(t2);
  }
  function after(o2) {
    return markdownLineEnding(o2) ? t(o2) : markdownSpace(o2) ? e.check({ tokenize: spaceThenNonSpace }, t, n)(o2) : n(o2);
  }
} };
function spaceThenNonSpace(e, t, n) {
  return factorySpace(e, function(e2) {
    return null === e2 ? n(e2) : t(e2);
  }, "whitespace");
}
const mn = {};
function remarkGfm(e) {
  const t = e || mn, n = this.data(), o = n.micromarkExtensions || (n.micromarkExtensions = []), i = n.fromMarkdownExtensions || (n.fromMarkdownExtensions = []), a = n.toMarkdownExtensions || (n.toMarkdownExtensions = []);
  o.push(function(e2) {
    return combineExtensions([{ text: pn }, { document: { 91: { name: "gfmFootnoteDefinition", tokenize: tokenizeDefinitionStart, continuation: { tokenize: tokenizeDefinitionContinuation }, exit: gfmFootnoteDefinitionEnd } }, text: { 91: { name: "gfmFootnoteCall", tokenize: tokenizeGfmFootnoteCall }, 93: { name: "gfmPotentialFootnoteCall", add: "after", tokenize: tokenizePotentialGfmFootnoteCall, resolveTo: resolveToPotentialGfmFootnoteCall } } }, gfmStrikethrough(e2), { flow: { null: { name: "table", tokenize: tokenizeTable, resolveAll: resolveTable } } }, { text: { 91: gn } }]);
  }(t)), i.push([{ transforms: [transformGfmAutolinkLiterals], enter: { literalAutolink: enterLiteralAutolink, literalAutolinkEmail: enterLiteralAutolinkValue, literalAutolinkHttp: enterLiteralAutolinkValue, literalAutolinkWww: enterLiteralAutolinkValue }, exit: { literalAutolink: exitLiteralAutolink, literalAutolinkEmail: exitLiteralAutolinkEmail, literalAutolinkHttp: exitLiteralAutolinkHttp, literalAutolinkWww: exitLiteralAutolinkWww } }, { enter: { gfmFootnoteCallString: enterFootnoteCallString, gfmFootnoteCall: enterFootnoteCall, gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString, gfmFootnoteDefinition: enterFootnoteDefinition }, exit: { gfmFootnoteCallString: exitFootnoteCallString, gfmFootnoteCall: exitFootnoteCall, gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString, gfmFootnoteDefinition: exitFootnoteDefinition } }, { canContainEols: ["delete"], enter: { strikethrough: enterStrikethrough }, exit: { strikethrough: exitStrikethrough } }, { enter: { table: enterTable, tableData: enterCell, tableHeader: enterCell, tableRow: enterRow }, exit: { codeText: exitCodeText, table: exitTable, tableData: exit, tableHeader: exit, tableRow: exit } }, { exit: { taskListCheckValueChecked: exitCheck, taskListCheckValueUnchecked: exitCheck, paragraph: exitParagraphWithTaskListItem } }]), a.push(function(e2) {
    return { extensions: [{ unsafe: [{ character: "@", before: "[+\\-.\\w]", after: "[\\-.\\w]", inConstruct: Zt, notInConstruct: Jt }, { character: ".", before: "[Ww]", after: "[\\-.\\w]", inConstruct: Zt, notInConstruct: Jt }, { character: ":", before: "[ps]", after: "\\/", inConstruct: Zt, notInConstruct: Jt }] }, gfmFootnoteToMarkdown(e2), { unsafe: [{ character: "~", inConstruct: "phrasing", notInConstruct: en }], handlers: { delete: handleDelete } }, gfmTableToMarkdown(e2), { unsafe: [{ atBreak: true, character: "-", after: "[:|-]" }], handlers: { listItem: listItemWithTaskListItem } }] };
  }(t));
}
var yn, bn, vn = { exports: {} };
yn = vn, bn = vn.exports, function() {
  var e, t = "Expected a function", n = "__lodash_hash_undefined__", i = "__lodash_placeholder__", a = 32, s = 128, l2 = 256, u2 = 1 / 0, c2 = 9007199254740991, f2 = NaN, p2 = 4294967295, d2 = [["ary", s], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", 16], ["flip", 512], ["partial", a], ["partialRight", 64], ["rearg", l2]], h2 = "[object Arguments]", g2 = "[object Array]", m2 = "[object Boolean]", y2 = "[object Date]", b2 = "[object Error]", v2 = "[object Function]", k2 = "[object GeneratorFunction]", x2 = "[object Map]", w2 = "[object Number]", S2 = "[object Object]", _2 = "[object Promise]", C2 = "[object RegExp]", E2 = "[object Set]", O2 = "[object String]", I2 = "[object Symbol]", A2 = "[object WeakMap]", D2 = "[object ArrayBuffer]", R2 = "[object DataView]", P2 = "[object Float32Array]", L2 = "[object Float64Array]", T2 = "[object Int8Array]", z2 = "[object Int16Array]", j2 = "[object Int32Array]", M2 = "[object Uint8Array]", q2 = "[object Uint8ClampedArray]", F2 = "[object Uint16Array]", N2 = "[object Uint32Array]", B2 = /\b__p \+= '';/g, H2 = /\b(__p \+=) '' \+/g, W2 = /(__e\(.*?\)|\b__t\)) \+\n'';/g, U2 = /&(?:amp|lt|gt|quot|#39);/g, $2 = /[&<>"']/g, V2 = RegExp(U2.source), G2 = RegExp($2.source), K2 = /<%-([\s\S]+?)%>/g, Y2 = /<%([\s\S]+?)%>/g, X2 = /<%=([\s\S]+?)%>/g, Q2 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Z2 = /^\w*$/, J2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ee2 = /[\\^$.*+?()[\]{}|]/g, te2 = RegExp(ee2.source), ne2 = /^\s+/, re2 = /\s/, oe2 = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, ie2 = /\{\n\/\* \[wrapped with (.+)\] \*/, ae2 = /,? & /, se2 = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, le2 = /[()=,{}\[\]\/\s]/, ue2 = /\\(\\)?/g, ce2 = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, fe2 = /\w*$/, pe2 = /^[-+]0x[0-9a-f]+$/i, de2 = /^0b[01]+$/i, he2 = /^\[object .+?Constructor\]$/, ge2 = /^0o[0-7]+$/i, me2 = /^(?:0|[1-9]\d*)$/, ye2 = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, be2 = /($^)/, ve2 = /['\n\r\u2028\u2029\\]/g, ke2 = "\\ud800-\\udfff", xe2 = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", we2 = "\\u2700-\\u27bf", Se2 = "a-z\\xdf-\\xf6\\xf8-\\xff", _e2 = "A-Z\\xc0-\\xd6\\xd8-\\xde", Ce2 = "\\ufe0e\\ufe0f", Ee2 = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Oe2 = "['’]", Ie2 = "[" + ke2 + "]", Ae2 = "[" + Ee2 + "]", De2 = "[" + xe2 + "]", Re2 = "\\d+", Pe2 = "[" + we2 + "]", Le2 = "[" + Se2 + "]", Te2 = "[^" + ke2 + Ee2 + Re2 + we2 + Se2 + _e2 + "]", ze2 = "\\ud83c[\\udffb-\\udfff]", je2 = "[^" + ke2 + "]", Me2 = "(?:\\ud83c[\\udde6-\\uddff]){2}", qe2 = "[\\ud800-\\udbff][\\udc00-\\udfff]", Fe2 = "[" + _e2 + "]", Ne2 = "\\u200d", Be2 = "(?:" + Le2 + "|" + Te2 + ")", He2 = "(?:" + Fe2 + "|" + Te2 + ")", We2 = "(?:['’](?:d|ll|m|re|s|t|ve))?", Ue2 = "(?:['’](?:D|LL|M|RE|S|T|VE))?", $e2 = "(?:" + De2 + "|" + ze2 + ")?", Ve2 = "[" + Ce2 + "]?", Ge2 = Ve2 + $e2 + "(?:" + Ne2 + "(?:" + [je2, Me2, qe2].join("|") + ")" + Ve2 + $e2 + ")*", Ke2 = "(?:" + [Pe2, Me2, qe2].join("|") + ")" + Ge2, Ye2 = "(?:" + [je2 + De2 + "?", De2, Me2, qe2, Ie2].join("|") + ")", Xe2 = RegExp(Oe2, "g"), Qe2 = RegExp(De2, "g"), Ze2 = RegExp(ze2 + "(?=" + ze2 + ")|" + Ye2 + Ge2, "g"), Je2 = RegExp([Fe2 + "?" + Le2 + "+" + We2 + "(?=" + [Ae2, Fe2, "$"].join("|") + ")", He2 + "+" + Ue2 + "(?=" + [Ae2, Fe2 + Be2, "$"].join("|") + ")", Fe2 + "?" + Be2 + "+" + We2, Fe2 + "+" + Ue2, "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Re2, Ke2].join("|"), "g"), et2 = RegExp("[" + Ne2 + ke2 + xe2 + Ce2 + "]"), tt2 = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, nt2 = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], rt2 = -1, ot2 = {};
  ot2[P2] = ot2[L2] = ot2[T2] = ot2[z2] = ot2[j2] = ot2[M2] = ot2[q2] = ot2[F2] = ot2[N2] = true, ot2[h2] = ot2[g2] = ot2[D2] = ot2[m2] = ot2[R2] = ot2[y2] = ot2[b2] = ot2[v2] = ot2[x2] = ot2[w2] = ot2[S2] = ot2[C2] = ot2[E2] = ot2[O2] = ot2[A2] = false;
  var it2 = {};
  it2[h2] = it2[g2] = it2[D2] = it2[R2] = it2[m2] = it2[y2] = it2[P2] = it2[L2] = it2[T2] = it2[z2] = it2[j2] = it2[x2] = it2[w2] = it2[S2] = it2[C2] = it2[E2] = it2[O2] = it2[I2] = it2[M2] = it2[q2] = it2[F2] = it2[N2] = true, it2[b2] = it2[v2] = it2[A2] = false;
  var at2 = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, st2 = parseFloat, lt2 = parseInt, ut2 = "object" == typeof I$1 && I$1 && I$1.Object === Object && I$1, ct2 = "object" == typeof self && self && self.Object === Object && self, ft2 = ut2 || ct2 || Function("return this")(), pt2 = bn && !bn.nodeType && bn, dt2 = pt2 && yn && !yn.nodeType && yn, ht2 = dt2 && dt2.exports === pt2, gt2 = ht2 && ut2.process, mt2 = function() {
    try {
      var e2 = dt2 && dt2.require && dt2.require("util").types;
      return e2 || gt2 && gt2.binding && gt2.binding("util");
    } catch (e3) {
    }
  }(), yt2 = mt2 && mt2.isArrayBuffer, bt2 = mt2 && mt2.isDate, vt2 = mt2 && mt2.isMap, kt2 = mt2 && mt2.isRegExp, xt2 = mt2 && mt2.isSet, wt2 = mt2 && mt2.isTypedArray;
  function apply(e2, t2, n2) {
    switch (n2.length) {
      case 0:
        return e2.call(t2);
      case 1:
        return e2.call(t2, n2[0]);
      case 2:
        return e2.call(t2, n2[0], n2[1]);
      case 3:
        return e2.call(t2, n2[0], n2[1], n2[2]);
    }
    return e2.apply(t2, n2);
  }
  function arrayAggregator(e2, t2, n2, o) {
    for (var i2 = -1, a2 = null == e2 ? 0 : e2.length; ++i2 < a2; ) {
      var s2 = e2[i2];
      t2(o, s2, n2(s2), e2);
    }
    return o;
  }
  function arrayEach(e2, t2) {
    for (var n2 = -1, o = null == e2 ? 0 : e2.length; ++n2 < o && false !== t2(e2[n2], n2, e2); ) ;
    return e2;
  }
  function arrayEachRight(e2, t2) {
    for (var n2 = null == e2 ? 0 : e2.length; n2-- && false !== t2(e2[n2], n2, e2); ) ;
    return e2;
  }
  function arrayEvery(e2, t2) {
    for (var n2 = -1, o = null == e2 ? 0 : e2.length; ++n2 < o; ) if (!t2(e2[n2], n2, e2)) return false;
    return true;
  }
  function arrayFilter(e2, t2) {
    for (var n2 = -1, o = null == e2 ? 0 : e2.length, i2 = 0, a2 = []; ++n2 < o; ) {
      var s2 = e2[n2];
      t2(s2, n2, e2) && (a2[i2++] = s2);
    }
    return a2;
  }
  function arrayIncludes(e2, t2) {
    return !(null == e2 || !e2.length) && baseIndexOf(e2, t2, 0) > -1;
  }
  function arrayIncludesWith(e2, t2, n2) {
    for (var o = -1, i2 = null == e2 ? 0 : e2.length; ++o < i2; ) if (n2(t2, e2[o])) return true;
    return false;
  }
  function arrayMap(e2, t2) {
    for (var n2 = -1, o = null == e2 ? 0 : e2.length, i2 = Array(o); ++n2 < o; ) i2[n2] = t2(e2[n2], n2, e2);
    return i2;
  }
  function arrayPush(e2, t2) {
    for (var n2 = -1, o = t2.length, i2 = e2.length; ++n2 < o; ) e2[i2 + n2] = t2[n2];
    return e2;
  }
  function arrayReduce(e2, t2, n2, o) {
    var i2 = -1, a2 = null == e2 ? 0 : e2.length;
    for (o && a2 && (n2 = e2[++i2]); ++i2 < a2; ) n2 = t2(n2, e2[i2], i2, e2);
    return n2;
  }
  function arrayReduceRight(e2, t2, n2, o) {
    var i2 = null == e2 ? 0 : e2.length;
    for (o && i2 && (n2 = e2[--i2]); i2--; ) n2 = t2(n2, e2[i2], i2, e2);
    return n2;
  }
  function arraySome(e2, t2) {
    for (var n2 = -1, o = null == e2 ? 0 : e2.length; ++n2 < o; ) if (t2(e2[n2], n2, e2)) return true;
    return false;
  }
  var St2 = baseProperty("length");
  function baseFindKey(e2, t2, n2) {
    var o;
    return n2(e2, function(e3, n3, i2) {
      if (t2(e3, n3, i2)) return o = n3, false;
    }), o;
  }
  function baseFindIndex(e2, t2, n2, o) {
    for (var i2 = e2.length, a2 = n2 + (o ? 1 : -1); o ? a2-- : ++a2 < i2; ) if (t2(e2[a2], a2, e2)) return a2;
    return -1;
  }
  function baseIndexOf(e2, t2, n2) {
    return t2 == t2 ? function(e3, t3, n3) {
      for (var o = n3 - 1, i2 = e3.length; ++o < i2; ) if (e3[o] === t3) return o;
      return -1;
    }(e2, t2, n2) : baseFindIndex(e2, baseIsNaN, n2);
  }
  function baseIndexOfWith(e2, t2, n2, o) {
    for (var i2 = n2 - 1, a2 = e2.length; ++i2 < a2; ) if (o(e2[i2], t2)) return i2;
    return -1;
  }
  function baseIsNaN(e2) {
    return e2 != e2;
  }
  function baseMean(e2, t2) {
    var n2 = null == e2 ? 0 : e2.length;
    return n2 ? baseSum(e2, t2) / n2 : f2;
  }
  function baseProperty(t2) {
    return function(n2) {
      return null == n2 ? e : n2[t2];
    };
  }
  function basePropertyOf(t2) {
    return function(n2) {
      return null == t2 ? e : t2[n2];
    };
  }
  function baseReduce(e2, t2, n2, o, i2) {
    return i2(e2, function(e3, i3, a2) {
      n2 = o ? (o = false, e3) : t2(n2, e3, i3, a2);
    }), n2;
  }
  function baseSum(t2, n2) {
    for (var o, i2 = -1, a2 = t2.length; ++i2 < a2; ) {
      var s2 = n2(t2[i2]);
      s2 !== e && (o = o === e ? s2 : o + s2);
    }
    return o;
  }
  function baseTimes(e2, t2) {
    for (var n2 = -1, o = Array(e2); ++n2 < e2; ) o[n2] = t2(n2);
    return o;
  }
  function baseTrim(e2) {
    return e2 ? e2.slice(0, trimmedEndIndex(e2) + 1).replace(ne2, "") : e2;
  }
  function baseUnary(e2) {
    return function(t2) {
      return e2(t2);
    };
  }
  function baseValues(e2, t2) {
    return arrayMap(t2, function(t3) {
      return e2[t3];
    });
  }
  function cacheHas(e2, t2) {
    return e2.has(t2);
  }
  function charsStartIndex(e2, t2) {
    for (var n2 = -1, o = e2.length; ++n2 < o && baseIndexOf(t2, e2[n2], 0) > -1; ) ;
    return n2;
  }
  function charsEndIndex(e2, t2) {
    for (var n2 = e2.length; n2-- && baseIndexOf(t2, e2[n2], 0) > -1; ) ;
    return n2;
  }
  var _t2 = basePropertyOf({ "À": "A", "Á": "A", "Â": "A", "Ã": "A", "Ä": "A", "Å": "A", "à": "a", "á": "a", "â": "a", "ã": "a", "ä": "a", "å": "a", "Ç": "C", "ç": "c", "Ð": "D", "ð": "d", "È": "E", "É": "E", "Ê": "E", "Ë": "E", "è": "e", "é": "e", "ê": "e", "ë": "e", "Ì": "I", "Í": "I", "Î": "I", "Ï": "I", "ì": "i", "í": "i", "î": "i", "ï": "i", "Ñ": "N", "ñ": "n", "Ò": "O", "Ó": "O", "Ô": "O", "Õ": "O", "Ö": "O", "Ø": "O", "ò": "o", "ó": "o", "ô": "o", "õ": "o", "ö": "o", "ø": "o", "Ù": "U", "Ú": "U", "Û": "U", "Ü": "U", "ù": "u", "ú": "u", "û": "u", "ü": "u", "Ý": "Y", "ý": "y", "ÿ": "y", "Æ": "Ae", "æ": "ae", "Þ": "Th", "þ": "th", "ß": "ss", "Ā": "A", "Ă": "A", "Ą": "A", "ā": "a", "ă": "a", "ą": "a", "Ć": "C", "Ĉ": "C", "Ċ": "C", "Č": "C", "ć": "c", "ĉ": "c", "ċ": "c", "č": "c", "Ď": "D", "Đ": "D", "ď": "d", "đ": "d", "Ē": "E", "Ĕ": "E", "Ė": "E", "Ę": "E", "Ě": "E", "ē": "e", "ĕ": "e", "ė": "e", "ę": "e", "ě": "e", "Ĝ": "G", "Ğ": "G", "Ġ": "G", "Ģ": "G", "ĝ": "g", "ğ": "g", "ġ": "g", "ģ": "g", "Ĥ": "H", "Ħ": "H", "ĥ": "h", "ħ": "h", "Ĩ": "I", "Ī": "I", "Ĭ": "I", "Į": "I", "İ": "I", "ĩ": "i", "ī": "i", "ĭ": "i", "į": "i", "ı": "i", "Ĵ": "J", "ĵ": "j", "Ķ": "K", "ķ": "k", "ĸ": "k", "Ĺ": "L", "Ļ": "L", "Ľ": "L", "Ŀ": "L", "Ł": "L", "ĺ": "l", "ļ": "l", "ľ": "l", "ŀ": "l", "ł": "l", "Ń": "N", "Ņ": "N", "Ň": "N", "Ŋ": "N", "ń": "n", "ņ": "n", "ň": "n", "ŋ": "n", "Ō": "O", "Ŏ": "O", "Ő": "O", "ō": "o", "ŏ": "o", "ő": "o", "Ŕ": "R", "Ŗ": "R", "Ř": "R", "ŕ": "r", "ŗ": "r", "ř": "r", "Ś": "S", "Ŝ": "S", "Ş": "S", "Š": "S", "ś": "s", "ŝ": "s", "ş": "s", "š": "s", "Ţ": "T", "Ť": "T", "Ŧ": "T", "ţ": "t", "ť": "t", "ŧ": "t", "Ũ": "U", "Ū": "U", "Ŭ": "U", "Ů": "U", "Ű": "U", "Ų": "U", "ũ": "u", "ū": "u", "ŭ": "u", "ů": "u", "ű": "u", "ų": "u", "Ŵ": "W", "ŵ": "w", "Ŷ": "Y", "ŷ": "y", "Ÿ": "Y", "Ź": "Z", "Ż": "Z", "Ž": "Z", "ź": "z", "ż": "z", "ž": "z", "Ĳ": "IJ", "ĳ": "ij", "Œ": "Oe", "œ": "oe", "ŉ": "'n", "ſ": "s" }), Ct2 = basePropertyOf({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" });
  function escapeStringChar(e2) {
    return "\\" + at2[e2];
  }
  function hasUnicode(e2) {
    return et2.test(e2);
  }
  function mapToArray(e2) {
    var t2 = -1, n2 = Array(e2.size);
    return e2.forEach(function(e3, o) {
      n2[++t2] = [o, e3];
    }), n2;
  }
  function overArg(e2, t2) {
    return function(n2) {
      return e2(t2(n2));
    };
  }
  function replaceHolders(e2, t2) {
    for (var n2 = -1, o = e2.length, a2 = 0, s2 = []; ++n2 < o; ) {
      var l3 = e2[n2];
      l3 !== t2 && l3 !== i || (e2[n2] = i, s2[a2++] = n2);
    }
    return s2;
  }
  function setToArray(e2) {
    var t2 = -1, n2 = Array(e2.size);
    return e2.forEach(function(e3) {
      n2[++t2] = e3;
    }), n2;
  }
  function setToPairs(e2) {
    var t2 = -1, n2 = Array(e2.size);
    return e2.forEach(function(e3) {
      n2[++t2] = [e3, e3];
    }), n2;
  }
  function stringSize(e2) {
    return hasUnicode(e2) ? function(e3) {
      for (var t2 = Ze2.lastIndex = 0; Ze2.test(e3); ) ++t2;
      return t2;
    }(e2) : St2(e2);
  }
  function stringToArray(e2) {
    return hasUnicode(e2) ? function(e3) {
      return e3.match(Ze2) || [];
    }(e2) : function(e3) {
      return e3.split("");
    }(e2);
  }
  function trimmedEndIndex(e2) {
    for (var t2 = e2.length; t2-- && re2.test(e2.charAt(t2)); ) ;
    return t2;
  }
  var Et2 = basePropertyOf({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }), Ot2 = function runInContext(o) {
    var re3, ke3 = (o = null == o ? ft2 : Ot2.defaults(ft2.Object(), o, Ot2.pick(ft2, nt2))).Array, xe3 = o.Date, we3 = o.Error, Se3 = o.Function, _e3 = o.Math, Ce3 = o.Object, Ee3 = o.RegExp, Oe3 = o.String, Ie3 = o.TypeError, Ae3 = ke3.prototype, De3 = Se3.prototype, Re3 = Ce3.prototype, Pe3 = o["__core-js_shared__"], Le3 = De3.toString, Te3 = Re3.hasOwnProperty, ze3 = 0, je3 = (re3 = /[^.]+$/.exec(Pe3 && Pe3.keys && Pe3.keys.IE_PROTO || "")) ? "Symbol(src)_1." + re3 : "", Me3 = Re3.toString, qe3 = Le3.call(Ce3), Fe3 = ft2._, Ne3 = Ee3("^" + Le3.call(Te3).replace(ee2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Be3 = ht2 ? o.Buffer : e, He3 = o.Symbol, We3 = o.Uint8Array, Ue3 = Be3 ? Be3.allocUnsafe : e, $e3 = overArg(Ce3.getPrototypeOf, Ce3), Ve3 = Ce3.create, Ge3 = Re3.propertyIsEnumerable, Ke3 = Ae3.splice, Ye3 = He3 ? He3.isConcatSpreadable : e, Ze3 = He3 ? He3.iterator : e, et3 = He3 ? He3.toStringTag : e, at3 = function() {
      try {
        var e2 = getNative(Ce3, "defineProperty");
        return e2({}, "", {}), e2;
      } catch (e3) {
      }
    }(), ut3 = o.clearTimeout !== ft2.clearTimeout && o.clearTimeout, ct3 = xe3 && xe3.now !== ft2.Date.now && xe3.now, pt3 = o.setTimeout !== ft2.setTimeout && o.setTimeout, dt3 = _e3.ceil, gt3 = _e3.floor, mt3 = Ce3.getOwnPropertySymbols, St3 = Be3 ? Be3.isBuffer : e, It2 = o.isFinite, At2 = Ae3.join, Dt2 = overArg(Ce3.keys, Ce3), Rt2 = _e3.max, Pt2 = _e3.min, Lt2 = xe3.now, Tt2 = o.parseInt, zt2 = _e3.random, jt2 = Ae3.reverse, Mt2 = getNative(o, "DataView"), qt2 = getNative(o, "Map"), Ft2 = getNative(o, "Promise"), Nt2 = getNative(o, "Set"), Bt2 = getNative(o, "WeakMap"), Ht2 = getNative(Ce3, "create"), Wt2 = Bt2 && new Bt2(), Ut2 = {}, $t2 = toSource(Mt2), Vt2 = toSource(qt2), Gt2 = toSource(Ft2), Kt2 = toSource(Nt2), Yt2 = toSource(Bt2), Xt2 = He3 ? He3.prototype : e, Qt2 = Xt2 ? Xt2.valueOf : e, Zt2 = Xt2 ? Xt2.toString : e;
    function lodash(e2) {
      if (isObjectLike(e2) && !rr2(e2) && !(e2 instanceof LazyWrapper)) {
        if (e2 instanceof LodashWrapper) return e2;
        if (Te3.call(e2, "__wrapped__")) return wrapperClone(e2);
      }
      return new LodashWrapper(e2);
    }
    var Jt2 = /* @__PURE__ */ function() {
      function object() {
      }
      return function(t2) {
        if (!isObject(t2)) return {};
        if (Ve3) return Ve3(t2);
        object.prototype = t2;
        var n2 = new object();
        return object.prototype = e, n2;
      };
    }();
    function baseLodash() {
    }
    function LodashWrapper(t2, n2) {
      this.__wrapped__ = t2, this.__actions__ = [], this.__chain__ = !!n2, this.__index__ = 0, this.__values__ = e;
    }
    function LazyWrapper(e2) {
      this.__wrapped__ = e2, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = p2, this.__views__ = [];
    }
    function Hash(e2) {
      var t2 = -1, n2 = null == e2 ? 0 : e2.length;
      for (this.clear(); ++t2 < n2; ) {
        var o2 = e2[t2];
        this.set(o2[0], o2[1]);
      }
    }
    function ListCache(e2) {
      var t2 = -1, n2 = null == e2 ? 0 : e2.length;
      for (this.clear(); ++t2 < n2; ) {
        var o2 = e2[t2];
        this.set(o2[0], o2[1]);
      }
    }
    function MapCache(e2) {
      var t2 = -1, n2 = null == e2 ? 0 : e2.length;
      for (this.clear(); ++t2 < n2; ) {
        var o2 = e2[t2];
        this.set(o2[0], o2[1]);
      }
    }
    function SetCache(e2) {
      var t2 = -1, n2 = null == e2 ? 0 : e2.length;
      for (this.__data__ = new MapCache(); ++t2 < n2; ) this.add(e2[t2]);
    }
    function Stack(e2) {
      var t2 = this.__data__ = new ListCache(e2);
      this.size = t2.size;
    }
    function arrayLikeKeys(e2, t2) {
      var n2 = rr2(e2), o2 = !n2 && nr2(e2), i2 = !n2 && !o2 && ir2(e2), a2 = !n2 && !o2 && !i2 && cr2(e2), s2 = n2 || o2 || i2 || a2, l3 = s2 ? baseTimes(e2.length, Oe3) : [], u3 = l3.length;
      for (var c3 in e2) !t2 && !Te3.call(e2, c3) || s2 && ("length" == c3 || i2 && ("offset" == c3 || "parent" == c3) || a2 && ("buffer" == c3 || "byteLength" == c3 || "byteOffset" == c3) || isIndex(c3, u3)) || l3.push(c3);
      return l3;
    }
    function arraySample(t2) {
      var n2 = t2.length;
      return n2 ? t2[baseRandom(0, n2 - 1)] : e;
    }
    function arraySampleSize(e2, t2) {
      return shuffleSelf(copyArray(e2), baseClamp(t2, 0, e2.length));
    }
    function arrayShuffle(e2) {
      return shuffleSelf(copyArray(e2));
    }
    function assignMergeValue(t2, n2, o2) {
      (o2 !== e && !eq(t2[n2], o2) || o2 === e && !(n2 in t2)) && baseAssignValue(t2, n2, o2);
    }
    function assignValue(t2, n2, o2) {
      var i2 = t2[n2];
      Te3.call(t2, n2) && eq(i2, o2) && (o2 !== e || n2 in t2) || baseAssignValue(t2, n2, o2);
    }
    function assocIndexOf(e2, t2) {
      for (var n2 = e2.length; n2--; ) if (eq(e2[n2][0], t2)) return n2;
      return -1;
    }
    function baseAggregator(e2, t2, n2, o2) {
      return en2(e2, function(e3, i2, a2) {
        t2(o2, e3, n2(e3), a2);
      }), o2;
    }
    function baseAssign(e2, t2) {
      return e2 && copyObject(t2, keys(t2), e2);
    }
    function baseAssignValue(e2, t2, n2) {
      "__proto__" == t2 && at3 ? at3(e2, t2, { configurable: true, enumerable: true, value: n2, writable: true }) : e2[t2] = n2;
    }
    function baseAt(t2, n2) {
      for (var o2 = -1, i2 = n2.length, a2 = ke3(i2), s2 = null == t2; ++o2 < i2; ) a2[o2] = s2 ? e : get(t2, n2[o2]);
      return a2;
    }
    function baseClamp(t2, n2, o2) {
      return t2 == t2 && (o2 !== e && (t2 = t2 <= o2 ? t2 : o2), n2 !== e && (t2 = t2 >= n2 ? t2 : n2)), t2;
    }
    function baseClone(t2, n2, o2, i2, a2, s2) {
      var l3, u3 = 1 & n2, c3 = 2 & n2, f3 = 4 & n2;
      if (o2 && (l3 = a2 ? o2(t2, i2, a2, s2) : o2(t2)), l3 !== e) return l3;
      if (!isObject(t2)) return t2;
      var p3 = rr2(t2);
      if (p3) {
        if (l3 = function(e2) {
          var t3 = e2.length, n3 = new e2.constructor(t3);
          return t3 && "string" == typeof e2[0] && Te3.call(e2, "index") && (n3.index = e2.index, n3.input = e2.input), n3;
        }(t2), !u3) return copyArray(t2, l3);
      } else {
        var d3 = dn2(t2), g3 = d3 == v2 || d3 == k2;
        if (ir2(t2)) return cloneBuffer(t2, u3);
        if (d3 == S2 || d3 == h2 || g3 && !a2) {
          if (l3 = c3 || g3 ? {} : initCloneObject(t2), !u3) return c3 ? function(e2, t3) {
            return copyObject(e2, pn2(e2), t3);
          }(t2, function(e2, t3) {
            return e2 && copyObject(t3, keysIn(t3), e2);
          }(l3, t2)) : function(e2, t3) {
            return copyObject(e2, fn2(e2), t3);
          }(t2, baseAssign(l3, t2));
        } else {
          if (!it2[d3]) return a2 ? t2 : {};
          l3 = function(e2, t3, n3) {
            var o3, i3 = e2.constructor;
            switch (t3) {
              case D2:
                return cloneArrayBuffer(e2);
              case m2:
              case y2:
                return new i3(+e2);
              case R2:
                return function(e3, t4) {
                  var n4 = t4 ? cloneArrayBuffer(e3.buffer) : e3.buffer;
                  return new e3.constructor(n4, e3.byteOffset, e3.byteLength);
                }(e2, n3);
              case P2:
              case L2:
              case T2:
              case z2:
              case j2:
              case M2:
              case q2:
              case F2:
              case N2:
                return cloneTypedArray(e2, n3);
              case x2:
                return new i3();
              case w2:
              case O2:
                return new i3(e2);
              case C2:
                return function(e3) {
                  var t4 = new e3.constructor(e3.source, fe2.exec(e3));
                  return t4.lastIndex = e3.lastIndex, t4;
                }(e2);
              case E2:
                return new i3();
              case I2:
                return o3 = e2, Qt2 ? Ce3(Qt2.call(o3)) : {};
            }
          }(t2, d3, u3);
        }
      }
      s2 || (s2 = new Stack());
      var b3 = s2.get(t2);
      if (b3) return b3;
      s2.set(t2, l3), ur2(t2) ? t2.forEach(function(e2) {
        l3.add(baseClone(e2, n2, o2, e2, t2, s2));
      }) : sr2(t2) && t2.forEach(function(e2, i3) {
        l3.set(i3, baseClone(e2, n2, o2, i3, t2, s2));
      });
      var _3 = p3 ? e : (f3 ? c3 ? getAllKeysIn : getAllKeys : c3 ? keysIn : keys)(t2);
      return arrayEach(_3 || t2, function(e2, i3) {
        _3 && (e2 = t2[i3 = e2]), assignValue(l3, i3, baseClone(e2, n2, o2, i3, t2, s2));
      }), l3;
    }
    function baseConformsTo(t2, n2, o2) {
      var i2 = o2.length;
      if (null == t2) return !i2;
      for (t2 = Ce3(t2); i2--; ) {
        var a2 = o2[i2], s2 = n2[a2], l3 = t2[a2];
        if (l3 === e && !(a2 in t2) || !s2(l3)) return false;
      }
      return true;
    }
    function baseDelay(n2, o2, i2) {
      if ("function" != typeof n2) throw new Ie3(t);
      return mn2(function() {
        n2.apply(e, i2);
      }, o2);
    }
    function baseDifference(e2, t2, n2, o2) {
      var i2 = -1, a2 = arrayIncludes, s2 = true, l3 = e2.length, u3 = [], c3 = t2.length;
      if (!l3) return u3;
      n2 && (t2 = arrayMap(t2, baseUnary(n2))), o2 ? (a2 = arrayIncludesWith, s2 = false) : t2.length >= 200 && (a2 = cacheHas, s2 = false, t2 = new SetCache(t2));
      e: for (; ++i2 < l3; ) {
        var f3 = e2[i2], p3 = null == n2 ? f3 : n2(f3);
        if (f3 = o2 || 0 !== f3 ? f3 : 0, s2 && p3 == p3) {
          for (var d3 = c3; d3--; ) if (t2[d3] === p3) continue e;
          u3.push(f3);
        } else a2(t2, p3, o2) || u3.push(f3);
      }
      return u3;
    }
    lodash.templateSettings = { escape: K2, evaluate: Y2, interpolate: X2, variable: "", imports: { _: lodash } }, lodash.prototype = baseLodash.prototype, lodash.prototype.constructor = lodash, LodashWrapper.prototype = Jt2(baseLodash.prototype), LodashWrapper.prototype.constructor = LodashWrapper, LazyWrapper.prototype = Jt2(baseLodash.prototype), LazyWrapper.prototype.constructor = LazyWrapper, Hash.prototype.clear = function() {
      this.__data__ = Ht2 ? Ht2(null) : {}, this.size = 0;
    }, Hash.prototype.delete = function(e2) {
      var t2 = this.has(e2) && delete this.__data__[e2];
      return this.size -= t2 ? 1 : 0, t2;
    }, Hash.prototype.get = function(t2) {
      var o2 = this.__data__;
      if (Ht2) {
        var i2 = o2[t2];
        return i2 === n ? e : i2;
      }
      return Te3.call(o2, t2) ? o2[t2] : e;
    }, Hash.prototype.has = function(t2) {
      var n2 = this.__data__;
      return Ht2 ? n2[t2] !== e : Te3.call(n2, t2);
    }, Hash.prototype.set = function(t2, o2) {
      var i2 = this.__data__;
      return this.size += this.has(t2) ? 0 : 1, i2[t2] = Ht2 && o2 === e ? n : o2, this;
    }, ListCache.prototype.clear = function() {
      this.__data__ = [], this.size = 0;
    }, ListCache.prototype.delete = function(e2) {
      var t2 = this.__data__, n2 = assocIndexOf(t2, e2);
      return !(n2 < 0 || (n2 == t2.length - 1 ? t2.pop() : Ke3.call(t2, n2, 1), --this.size, 0));
    }, ListCache.prototype.get = function(t2) {
      var n2 = this.__data__, o2 = assocIndexOf(n2, t2);
      return o2 < 0 ? e : n2[o2][1];
    }, ListCache.prototype.has = function(e2) {
      return assocIndexOf(this.__data__, e2) > -1;
    }, ListCache.prototype.set = function(e2, t2) {
      var n2 = this.__data__, o2 = assocIndexOf(n2, e2);
      return o2 < 0 ? (++this.size, n2.push([e2, t2])) : n2[o2][1] = t2, this;
    }, MapCache.prototype.clear = function() {
      this.size = 0, this.__data__ = { hash: new Hash(), map: new (qt2 || ListCache)(), string: new Hash() };
    }, MapCache.prototype.delete = function(e2) {
      var t2 = getMapData(this, e2).delete(e2);
      return this.size -= t2 ? 1 : 0, t2;
    }, MapCache.prototype.get = function(e2) {
      return getMapData(this, e2).get(e2);
    }, MapCache.prototype.has = function(e2) {
      return getMapData(this, e2).has(e2);
    }, MapCache.prototype.set = function(e2, t2) {
      var n2 = getMapData(this, e2), o2 = n2.size;
      return n2.set(e2, t2), this.size += n2.size == o2 ? 0 : 1, this;
    }, SetCache.prototype.add = SetCache.prototype.push = function(e2) {
      return this.__data__.set(e2, n), this;
    }, SetCache.prototype.has = function(e2) {
      return this.__data__.has(e2);
    }, Stack.prototype.clear = function() {
      this.__data__ = new ListCache(), this.size = 0;
    }, Stack.prototype.delete = function(e2) {
      var t2 = this.__data__, n2 = t2.delete(e2);
      return this.size = t2.size, n2;
    }, Stack.prototype.get = function(e2) {
      return this.__data__.get(e2);
    }, Stack.prototype.has = function(e2) {
      return this.__data__.has(e2);
    }, Stack.prototype.set = function(e2, t2) {
      var n2 = this.__data__;
      if (n2 instanceof ListCache) {
        var o2 = n2.__data__;
        if (!qt2 || o2.length < 199) return o2.push([e2, t2]), this.size = ++n2.size, this;
        n2 = this.__data__ = new MapCache(o2);
      }
      return n2.set(e2, t2), this.size = n2.size, this;
    };
    var en2 = createBaseEach(baseForOwn), tn2 = createBaseEach(baseForOwnRight, true);
    function baseEvery(e2, t2) {
      var n2 = true;
      return en2(e2, function(e3, o2, i2) {
        return n2 = !!t2(e3, o2, i2);
      }), n2;
    }
    function baseExtremum(t2, n2, o2) {
      for (var i2 = -1, a2 = t2.length; ++i2 < a2; ) {
        var s2 = t2[i2], l3 = n2(s2);
        if (null != l3 && (u3 === e ? l3 == l3 && !isSymbol(l3) : o2(l3, u3))) var u3 = l3, c3 = s2;
      }
      return c3;
    }
    function baseFilter(e2, t2) {
      var n2 = [];
      return en2(e2, function(e3, o2, i2) {
        t2(e3, o2, i2) && n2.push(e3);
      }), n2;
    }
    function baseFlatten(e2, t2, n2, o2, i2) {
      var a2 = -1, s2 = e2.length;
      for (n2 || (n2 = isFlattenable), i2 || (i2 = []); ++a2 < s2; ) {
        var l3 = e2[a2];
        t2 > 0 && n2(l3) ? t2 > 1 ? baseFlatten(l3, t2 - 1, n2, o2, i2) : arrayPush(i2, l3) : o2 || (i2[i2.length] = l3);
      }
      return i2;
    }
    var nn2 = createBaseFor(), rn2 = createBaseFor(true);
    function baseForOwn(e2, t2) {
      return e2 && nn2(e2, t2, keys);
    }
    function baseForOwnRight(e2, t2) {
      return e2 && rn2(e2, t2, keys);
    }
    function baseFunctions(e2, t2) {
      return arrayFilter(t2, function(t3) {
        return isFunction(e2[t3]);
      });
    }
    function baseGet(t2, n2) {
      for (var o2 = 0, i2 = (n2 = castPath(n2, t2)).length; null != t2 && o2 < i2; ) t2 = t2[toKey(n2[o2++])];
      return o2 && o2 == i2 ? t2 : e;
    }
    function baseGetAllKeys(e2, t2, n2) {
      var o2 = t2(e2);
      return rr2(e2) ? o2 : arrayPush(o2, n2(e2));
    }
    function baseGetTag(t2) {
      return null == t2 ? t2 === e ? "[object Undefined]" : "[object Null]" : et3 && et3 in Ce3(t2) ? function(t3) {
        var n2 = Te3.call(t3, et3), o2 = t3[et3];
        try {
          t3[et3] = e;
          var i2 = true;
        } catch (e2) {
        }
        var a2 = Me3.call(t3);
        return i2 && (n2 ? t3[et3] = o2 : delete t3[et3]), a2;
      }(t2) : function(e2) {
        return Me3.call(e2);
      }(t2);
    }
    function baseGt(e2, t2) {
      return e2 > t2;
    }
    function baseHas(e2, t2) {
      return null != e2 && Te3.call(e2, t2);
    }
    function baseHasIn(e2, t2) {
      return null != e2 && t2 in Ce3(e2);
    }
    function baseIntersection(t2, n2, o2) {
      for (var i2 = o2 ? arrayIncludesWith : arrayIncludes, a2 = t2[0].length, s2 = t2.length, l3 = s2, u3 = ke3(s2), c3 = 1 / 0, f3 = []; l3--; ) {
        var p3 = t2[l3];
        l3 && n2 && (p3 = arrayMap(p3, baseUnary(n2))), c3 = Pt2(p3.length, c3), u3[l3] = !o2 && (n2 || a2 >= 120 && p3.length >= 120) ? new SetCache(l3 && p3) : e;
      }
      p3 = t2[0];
      var d3 = -1, h3 = u3[0];
      e: for (; ++d3 < a2 && f3.length < c3; ) {
        var g3 = p3[d3], m3 = n2 ? n2(g3) : g3;
        if (g3 = o2 || 0 !== g3 ? g3 : 0, !(h3 ? cacheHas(h3, m3) : i2(f3, m3, o2))) {
          for (l3 = s2; --l3; ) {
            var y3 = u3[l3];
            if (!(y3 ? cacheHas(y3, m3) : i2(t2[l3], m3, o2))) continue e;
          }
          h3 && h3.push(m3), f3.push(g3);
        }
      }
      return f3;
    }
    function baseInvoke(t2, n2, o2) {
      var i2 = null == (t2 = parent(t2, n2 = castPath(n2, t2))) ? t2 : t2[toKey(last(n2))];
      return null == i2 ? e : apply(i2, t2, o2);
    }
    function baseIsArguments(e2) {
      return isObjectLike(e2) && baseGetTag(e2) == h2;
    }
    function baseIsEqual(t2, n2, o2, i2, a2) {
      return t2 === n2 || (null == t2 || null == n2 || !isObjectLike(t2) && !isObjectLike(n2) ? t2 != t2 && n2 != n2 : function(t3, n3, o3, i3, a3, s2) {
        var l3 = rr2(t3), u3 = rr2(n3), c3 = l3 ? g2 : dn2(t3), f3 = u3 ? g2 : dn2(n3), p3 = (c3 = c3 == h2 ? S2 : c3) == S2, d3 = (f3 = f3 == h2 ? S2 : f3) == S2, v3 = c3 == f3;
        if (v3 && ir2(t3)) {
          if (!ir2(n3)) return false;
          l3 = true, p3 = false;
        }
        if (v3 && !p3) return s2 || (s2 = new Stack()), l3 || cr2(t3) ? equalArrays(t3, n3, o3, i3, a3, s2) : function(e2, t4, n4, o4, i4, a4, s3) {
          switch (n4) {
            case R2:
              if (e2.byteLength != t4.byteLength || e2.byteOffset != t4.byteOffset) return false;
              e2 = e2.buffer, t4 = t4.buffer;
            case D2:
              return !(e2.byteLength != t4.byteLength || !a4(new We3(e2), new We3(t4)));
            case m2:
            case y2:
            case w2:
              return eq(+e2, +t4);
            case b2:
              return e2.name == t4.name && e2.message == t4.message;
            case C2:
            case O2:
              return e2 == t4 + "";
            case x2:
              var l4 = mapToArray;
            case E2:
              var u4 = 1 & o4;
              if (l4 || (l4 = setToArray), e2.size != t4.size && !u4) return false;
              var c4 = s3.get(e2);
              if (c4) return c4 == t4;
              o4 |= 2, s3.set(e2, t4);
              var f4 = equalArrays(l4(e2), l4(t4), o4, i4, a4, s3);
              return s3.delete(e2), f4;
            case I2:
              if (Qt2) return Qt2.call(e2) == Qt2.call(t4);
          }
          return false;
        }(t3, n3, c3, o3, i3, a3, s2);
        if (!(1 & o3)) {
          var k3 = p3 && Te3.call(t3, "__wrapped__"), _3 = d3 && Te3.call(n3, "__wrapped__");
          if (k3 || _3) {
            var A3 = k3 ? t3.value() : t3, P3 = _3 ? n3.value() : n3;
            return s2 || (s2 = new Stack()), a3(A3, P3, o3, i3, s2);
          }
        }
        return !!v3 && (s2 || (s2 = new Stack()), function(t4, n4, o4, i4, a4, s3) {
          var l4 = 1 & o4, u4 = getAllKeys(t4), c4 = u4.length, f4 = getAllKeys(n4), p4 = f4.length;
          if (c4 != p4 && !l4) return false;
          for (var d4 = c4; d4--; ) {
            var h3 = u4[d4];
            if (!(l4 ? h3 in n4 : Te3.call(n4, h3))) return false;
          }
          var g3 = s3.get(t4), m3 = s3.get(n4);
          if (g3 && m3) return g3 == n4 && m3 == t4;
          var y3 = true;
          s3.set(t4, n4), s3.set(n4, t4);
          for (var b3 = l4; ++d4 < c4; ) {
            var v4 = t4[h3 = u4[d4]], k4 = n4[h3];
            if (i4) var x3 = l4 ? i4(k4, v4, h3, n4, t4, s3) : i4(v4, k4, h3, t4, n4, s3);
            if (!(x3 === e ? v4 === k4 || a4(v4, k4, o4, i4, s3) : x3)) {
              y3 = false;
              break;
            }
            b3 || (b3 = "constructor" == h3);
          }
          if (y3 && !b3) {
            var w3 = t4.constructor, S3 = n4.constructor;
            w3 == S3 || !("constructor" in t4) || !("constructor" in n4) || "function" == typeof w3 && w3 instanceof w3 && "function" == typeof S3 && S3 instanceof S3 || (y3 = false);
          }
          return s3.delete(t4), s3.delete(n4), y3;
        }(t3, n3, o3, i3, a3, s2));
      }(t2, n2, o2, i2, baseIsEqual, a2));
    }
    function baseIsMatch(t2, n2, o2, i2) {
      var a2 = o2.length, s2 = a2, l3 = !i2;
      if (null == t2) return !s2;
      for (t2 = Ce3(t2); a2--; ) {
        var u3 = o2[a2];
        if (l3 && u3[2] ? u3[1] !== t2[u3[0]] : !(u3[0] in t2)) return false;
      }
      for (; ++a2 < s2; ) {
        var c3 = (u3 = o2[a2])[0], f3 = t2[c3], p3 = u3[1];
        if (l3 && u3[2]) {
          if (f3 === e && !(c3 in t2)) return false;
        } else {
          var d3 = new Stack();
          if (i2) var h3 = i2(f3, p3, c3, t2, n2, d3);
          if (!(h3 === e ? baseIsEqual(p3, f3, 3, i2, d3) : h3)) return false;
        }
      }
      return true;
    }
    function baseIsNative(e2) {
      return !(!isObject(e2) || (t2 = e2, je3 && je3 in t2)) && (isFunction(e2) ? Ne3 : he2).test(toSource(e2));
      var t2;
    }
    function baseIteratee(e2) {
      return "function" == typeof e2 ? e2 : null == e2 ? identity : "object" == typeof e2 ? rr2(e2) ? baseMatchesProperty(e2[0], e2[1]) : baseMatches(e2) : property(e2);
    }
    function baseKeys(e2) {
      if (!isPrototype(e2)) return Dt2(e2);
      var t2 = [];
      for (var n2 in Ce3(e2)) Te3.call(e2, n2) && "constructor" != n2 && t2.push(n2);
      return t2;
    }
    function baseKeysIn(e2) {
      if (!isObject(e2)) return function(e3) {
        var t3 = [];
        if (null != e3) for (var n3 in Ce3(e3)) t3.push(n3);
        return t3;
      }(e2);
      var t2 = isPrototype(e2), n2 = [];
      for (var o2 in e2) ("constructor" != o2 || !t2 && Te3.call(e2, o2)) && n2.push(o2);
      return n2;
    }
    function baseLt(e2, t2) {
      return e2 < t2;
    }
    function baseMap(e2, t2) {
      var n2 = -1, o2 = isArrayLike(e2) ? ke3(e2.length) : [];
      return en2(e2, function(e3, i2, a2) {
        o2[++n2] = t2(e3, i2, a2);
      }), o2;
    }
    function baseMatches(e2) {
      var t2 = getMatchData(e2);
      return 1 == t2.length && t2[0][2] ? matchesStrictComparable(t2[0][0], t2[0][1]) : function(n2) {
        return n2 === e2 || baseIsMatch(n2, e2, t2);
      };
    }
    function baseMatchesProperty(t2, n2) {
      return isKey(t2) && isStrictComparable(n2) ? matchesStrictComparable(toKey(t2), n2) : function(o2) {
        var i2 = get(o2, t2);
        return i2 === e && i2 === n2 ? hasIn(o2, t2) : baseIsEqual(n2, i2, 3);
      };
    }
    function baseMerge(t2, n2, o2, i2, a2) {
      t2 !== n2 && nn2(n2, function(s2, l3) {
        if (a2 || (a2 = new Stack()), isObject(s2)) !function(t3, n3, o3, i3, a3, s3, l4) {
          var u4 = safeGet(t3, o3), c3 = safeGet(n3, o3), f3 = l4.get(c3);
          if (f3) assignMergeValue(t3, o3, f3);
          else {
            var p3 = s3 ? s3(u4, c3, o3 + "", t3, n3, l4) : e, d3 = p3 === e;
            if (d3) {
              var h3 = rr2(c3), g3 = !h3 && ir2(c3), m3 = !h3 && !g3 && cr2(c3);
              p3 = c3, h3 || g3 || m3 ? rr2(u4) ? p3 = u4 : isArrayLikeObject(u4) ? p3 = copyArray(u4) : g3 ? (d3 = false, p3 = cloneBuffer(c3, true)) : m3 ? (d3 = false, p3 = cloneTypedArray(c3, true)) : p3 = [] : isPlainObject2(c3) || nr2(c3) ? (p3 = u4, nr2(u4) ? p3 = toPlainObject(u4) : isObject(u4) && !isFunction(u4) || (p3 = initCloneObject(c3))) : d3 = false;
            }
            d3 && (l4.set(c3, p3), a3(p3, c3, i3, s3, l4), l4.delete(c3)), assignMergeValue(t3, o3, p3);
          }
        }(t2, n2, l3, o2, baseMerge, i2, a2);
        else {
          var u3 = i2 ? i2(safeGet(t2, l3), s2, l3 + "", t2, n2, a2) : e;
          u3 === e && (u3 = s2), assignMergeValue(t2, l3, u3);
        }
      }, keysIn);
    }
    function baseNth(t2, n2) {
      var o2 = t2.length;
      if (o2) return isIndex(n2 += n2 < 0 ? o2 : 0, o2) ? t2[n2] : e;
    }
    function baseOrderBy(e2, t2, n2) {
      t2 = t2.length ? arrayMap(t2, function(e3) {
        return rr2(e3) ? function(t3) {
          return baseGet(t3, 1 === e3.length ? e3[0] : e3);
        } : e3;
      }) : [identity];
      var o2 = -1;
      t2 = arrayMap(t2, baseUnary(getIteratee()));
      var i2 = baseMap(e2, function(e3, n3, i3) {
        var a2 = arrayMap(t2, function(t3) {
          return t3(e3);
        });
        return { criteria: a2, index: ++o2, value: e3 };
      });
      return function(e3, t3) {
        var n3 = e3.length;
        for (e3.sort(t3); n3--; ) e3[n3] = e3[n3].value;
        return e3;
      }(i2, function(e3, t3) {
        return function(e4, t4, n3) {
          for (var o3 = -1, i3 = e4.criteria, a2 = t4.criteria, s2 = i3.length, l3 = n3.length; ++o3 < s2; ) {
            var u3 = compareAscending(i3[o3], a2[o3]);
            if (u3) return o3 >= l3 ? u3 : u3 * ("desc" == n3[o3] ? -1 : 1);
          }
          return e4.index - t4.index;
        }(e3, t3, n2);
      });
    }
    function basePickBy(e2, t2, n2) {
      for (var o2 = -1, i2 = t2.length, a2 = {}; ++o2 < i2; ) {
        var s2 = t2[o2], l3 = baseGet(e2, s2);
        n2(l3, s2) && baseSet(a2, castPath(s2, e2), l3);
      }
      return a2;
    }
    function basePullAll(e2, t2, n2, o2) {
      var i2 = o2 ? baseIndexOfWith : baseIndexOf, a2 = -1, s2 = t2.length, l3 = e2;
      for (e2 === t2 && (t2 = copyArray(t2)), n2 && (l3 = arrayMap(e2, baseUnary(n2))); ++a2 < s2; ) for (var u3 = 0, c3 = t2[a2], f3 = n2 ? n2(c3) : c3; (u3 = i2(l3, f3, u3, o2)) > -1; ) l3 !== e2 && Ke3.call(l3, u3, 1), Ke3.call(e2, u3, 1);
      return e2;
    }
    function basePullAt(e2, t2) {
      for (var n2 = e2 ? t2.length : 0, o2 = n2 - 1; n2--; ) {
        var i2 = t2[n2];
        if (n2 == o2 || i2 !== a2) {
          var a2 = i2;
          isIndex(i2) ? Ke3.call(e2, i2, 1) : baseUnset(e2, i2);
        }
      }
      return e2;
    }
    function baseRandom(e2, t2) {
      return e2 + gt3(zt2() * (t2 - e2 + 1));
    }
    function baseRepeat(e2, t2) {
      var n2 = "";
      if (!e2 || t2 < 1 || t2 > c2) return n2;
      do {
        t2 % 2 && (n2 += e2), (t2 = gt3(t2 / 2)) && (e2 += e2);
      } while (t2);
      return n2;
    }
    function baseRest(e2, t2) {
      return yn2(overRest(e2, t2, identity), e2 + "");
    }
    function baseSample(e2) {
      return arraySample(values(e2));
    }
    function baseSampleSize(e2, t2) {
      var n2 = values(e2);
      return shuffleSelf(n2, baseClamp(t2, 0, n2.length));
    }
    function baseSet(t2, n2, o2, i2) {
      if (!isObject(t2)) return t2;
      for (var a2 = -1, s2 = (n2 = castPath(n2, t2)).length, l3 = s2 - 1, u3 = t2; null != u3 && ++a2 < s2; ) {
        var c3 = toKey(n2[a2]), f3 = o2;
        if ("__proto__" === c3 || "constructor" === c3 || "prototype" === c3) return t2;
        if (a2 != l3) {
          var p3 = u3[c3];
          (f3 = i2 ? i2(p3, c3, u3) : e) === e && (f3 = isObject(p3) ? p3 : isIndex(n2[a2 + 1]) ? [] : {});
        }
        assignValue(u3, c3, f3), u3 = u3[c3];
      }
      return t2;
    }
    var on2 = Wt2 ? function(e2, t2) {
      return Wt2.set(e2, t2), e2;
    } : identity, an2 = at3 ? function(e2, t2) {
      return at3(e2, "toString", { configurable: true, enumerable: false, value: constant(t2), writable: true });
    } : identity;
    function baseShuffle(e2) {
      return shuffleSelf(values(e2));
    }
    function baseSlice(e2, t2, n2) {
      var o2 = -1, i2 = e2.length;
      t2 < 0 && (t2 = -t2 > i2 ? 0 : i2 + t2), (n2 = n2 > i2 ? i2 : n2) < 0 && (n2 += i2), i2 = t2 > n2 ? 0 : n2 - t2 >>> 0, t2 >>>= 0;
      for (var a2 = ke3(i2); ++o2 < i2; ) a2[o2] = e2[o2 + t2];
      return a2;
    }
    function baseSome(e2, t2) {
      var n2;
      return en2(e2, function(e3, o2, i2) {
        return !(n2 = t2(e3, o2, i2));
      }), !!n2;
    }
    function baseSortedIndex(e2, t2, n2) {
      var o2 = 0, i2 = null == e2 ? o2 : e2.length;
      if ("number" == typeof t2 && t2 == t2 && i2 <= 2147483647) {
        for (; o2 < i2; ) {
          var a2 = o2 + i2 >>> 1, s2 = e2[a2];
          null !== s2 && !isSymbol(s2) && (n2 ? s2 <= t2 : s2 < t2) ? o2 = a2 + 1 : i2 = a2;
        }
        return i2;
      }
      return baseSortedIndexBy(e2, t2, identity, n2);
    }
    function baseSortedIndexBy(t2, n2, o2, i2) {
      var a2 = 0, s2 = null == t2 ? 0 : t2.length;
      if (0 === s2) return 0;
      for (var l3 = (n2 = o2(n2)) != n2, u3 = null === n2, c3 = isSymbol(n2), f3 = n2 === e; a2 < s2; ) {
        var p3 = gt3((a2 + s2) / 2), d3 = o2(t2[p3]), h3 = d3 !== e, g3 = null === d3, m3 = d3 == d3, y3 = isSymbol(d3);
        if (l3) var b3 = i2 || m3;
        else b3 = f3 ? m3 && (i2 || h3) : u3 ? m3 && h3 && (i2 || !g3) : c3 ? m3 && h3 && !g3 && (i2 || !y3) : !g3 && !y3 && (i2 ? d3 <= n2 : d3 < n2);
        b3 ? a2 = p3 + 1 : s2 = p3;
      }
      return Pt2(s2, 4294967294);
    }
    function baseSortedUniq(e2, t2) {
      for (var n2 = -1, o2 = e2.length, i2 = 0, a2 = []; ++n2 < o2; ) {
        var s2 = e2[n2], l3 = t2 ? t2(s2) : s2;
        if (!n2 || !eq(l3, u3)) {
          var u3 = l3;
          a2[i2++] = 0 === s2 ? 0 : s2;
        }
      }
      return a2;
    }
    function baseToNumber(e2) {
      return "number" == typeof e2 ? e2 : isSymbol(e2) ? f2 : +e2;
    }
    function baseToString(e2) {
      if ("string" == typeof e2) return e2;
      if (rr2(e2)) return arrayMap(e2, baseToString) + "";
      if (isSymbol(e2)) return Zt2 ? Zt2.call(e2) : "";
      var t2 = e2 + "";
      return "0" == t2 && 1 / e2 == -1 / 0 ? "-0" : t2;
    }
    function baseUniq(e2, t2, n2) {
      var o2 = -1, i2 = arrayIncludes, a2 = e2.length, s2 = true, l3 = [], u3 = l3;
      if (n2) s2 = false, i2 = arrayIncludesWith;
      else if (a2 >= 200) {
        var c3 = t2 ? null : un2(e2);
        if (c3) return setToArray(c3);
        s2 = false, i2 = cacheHas, u3 = new SetCache();
      } else u3 = t2 ? [] : l3;
      e: for (; ++o2 < a2; ) {
        var f3 = e2[o2], p3 = t2 ? t2(f3) : f3;
        if (f3 = n2 || 0 !== f3 ? f3 : 0, s2 && p3 == p3) {
          for (var d3 = u3.length; d3--; ) if (u3[d3] === p3) continue e;
          t2 && u3.push(p3), l3.push(f3);
        } else i2(u3, p3, n2) || (u3 !== l3 && u3.push(p3), l3.push(f3));
      }
      return l3;
    }
    function baseUnset(e2, t2) {
      return null == (e2 = parent(e2, t2 = castPath(t2, e2))) || delete e2[toKey(last(t2))];
    }
    function baseUpdate(e2, t2, n2, o2) {
      return baseSet(e2, t2, n2(baseGet(e2, t2)), o2);
    }
    function baseWhile(e2, t2, n2, o2) {
      for (var i2 = e2.length, a2 = o2 ? i2 : -1; (o2 ? a2-- : ++a2 < i2) && t2(e2[a2], a2, e2); ) ;
      return n2 ? baseSlice(e2, o2 ? 0 : a2, o2 ? a2 + 1 : i2) : baseSlice(e2, o2 ? a2 + 1 : 0, o2 ? i2 : a2);
    }
    function baseWrapperValue(e2, t2) {
      var n2 = e2;
      return n2 instanceof LazyWrapper && (n2 = n2.value()), arrayReduce(t2, function(e3, t3) {
        return t3.func.apply(t3.thisArg, arrayPush([e3], t3.args));
      }, n2);
    }
    function baseXor(e2, t2, n2) {
      var o2 = e2.length;
      if (o2 < 2) return o2 ? baseUniq(e2[0]) : [];
      for (var i2 = -1, a2 = ke3(o2); ++i2 < o2; ) for (var s2 = e2[i2], l3 = -1; ++l3 < o2; ) l3 != i2 && (a2[i2] = baseDifference(a2[i2] || s2, e2[l3], t2, n2));
      return baseUniq(baseFlatten(a2, 1), t2, n2);
    }
    function baseZipObject(t2, n2, o2) {
      for (var i2 = -1, a2 = t2.length, s2 = n2.length, l3 = {}; ++i2 < a2; ) {
        var u3 = i2 < s2 ? n2[i2] : e;
        o2(l3, t2[i2], u3);
      }
      return l3;
    }
    function castArrayLikeObject(e2) {
      return isArrayLikeObject(e2) ? e2 : [];
    }
    function castFunction(e2) {
      return "function" == typeof e2 ? e2 : identity;
    }
    function castPath(e2, t2) {
      return rr2(e2) ? e2 : isKey(e2, t2) ? [e2] : bn2(toString(e2));
    }
    var sn2 = baseRest;
    function castSlice(t2, n2, o2) {
      var i2 = t2.length;
      return o2 = o2 === e ? i2 : o2, !n2 && o2 >= i2 ? t2 : baseSlice(t2, n2, o2);
    }
    var ln2 = ut3 || function(e2) {
      return ft2.clearTimeout(e2);
    };
    function cloneBuffer(e2, t2) {
      if (t2) return e2.slice();
      var n2 = e2.length, o2 = Ue3 ? Ue3(n2) : new e2.constructor(n2);
      return e2.copy(o2), o2;
    }
    function cloneArrayBuffer(e2) {
      var t2 = new e2.constructor(e2.byteLength);
      return new We3(t2).set(new We3(e2)), t2;
    }
    function cloneTypedArray(e2, t2) {
      var n2 = t2 ? cloneArrayBuffer(e2.buffer) : e2.buffer;
      return new e2.constructor(n2, e2.byteOffset, e2.length);
    }
    function compareAscending(t2, n2) {
      if (t2 !== n2) {
        var o2 = t2 !== e, i2 = null === t2, a2 = t2 == t2, s2 = isSymbol(t2), l3 = n2 !== e, u3 = null === n2, c3 = n2 == n2, f3 = isSymbol(n2);
        if (!u3 && !f3 && !s2 && t2 > n2 || s2 && l3 && c3 && !u3 && !f3 || i2 && l3 && c3 || !o2 && c3 || !a2) return 1;
        if (!i2 && !s2 && !f3 && t2 < n2 || f3 && o2 && a2 && !i2 && !s2 || u3 && o2 && a2 || !l3 && a2 || !c3) return -1;
      }
      return 0;
    }
    function composeArgs(e2, t2, n2, o2) {
      for (var i2 = -1, a2 = e2.length, s2 = n2.length, l3 = -1, u3 = t2.length, c3 = Rt2(a2 - s2, 0), f3 = ke3(u3 + c3), p3 = !o2; ++l3 < u3; ) f3[l3] = t2[l3];
      for (; ++i2 < s2; ) (p3 || i2 < a2) && (f3[n2[i2]] = e2[i2]);
      for (; c3--; ) f3[l3++] = e2[i2++];
      return f3;
    }
    function composeArgsRight(e2, t2, n2, o2) {
      for (var i2 = -1, a2 = e2.length, s2 = -1, l3 = n2.length, u3 = -1, c3 = t2.length, f3 = Rt2(a2 - l3, 0), p3 = ke3(f3 + c3), d3 = !o2; ++i2 < f3; ) p3[i2] = e2[i2];
      for (var h3 = i2; ++u3 < c3; ) p3[h3 + u3] = t2[u3];
      for (; ++s2 < l3; ) (d3 || i2 < a2) && (p3[h3 + n2[s2]] = e2[i2++]);
      return p3;
    }
    function copyArray(e2, t2) {
      var n2 = -1, o2 = e2.length;
      for (t2 || (t2 = ke3(o2)); ++n2 < o2; ) t2[n2] = e2[n2];
      return t2;
    }
    function copyObject(t2, n2, o2, i2) {
      var a2 = !o2;
      o2 || (o2 = {});
      for (var s2 = -1, l3 = n2.length; ++s2 < l3; ) {
        var u3 = n2[s2], c3 = i2 ? i2(o2[u3], t2[u3], u3, o2, t2) : e;
        c3 === e && (c3 = t2[u3]), a2 ? baseAssignValue(o2, u3, c3) : assignValue(o2, u3, c3);
      }
      return o2;
    }
    function createAggregator(e2, t2) {
      return function(n2, o2) {
        var i2 = rr2(n2) ? arrayAggregator : baseAggregator, a2 = t2 ? t2() : {};
        return i2(n2, e2, getIteratee(o2, 2), a2);
      };
    }
    function createAssigner(t2) {
      return baseRest(function(n2, o2) {
        var i2 = -1, a2 = o2.length, s2 = a2 > 1 ? o2[a2 - 1] : e, l3 = a2 > 2 ? o2[2] : e;
        for (s2 = t2.length > 3 && "function" == typeof s2 ? (a2--, s2) : e, l3 && isIterateeCall(o2[0], o2[1], l3) && (s2 = a2 < 3 ? e : s2, a2 = 1), n2 = Ce3(n2); ++i2 < a2; ) {
          var u3 = o2[i2];
          u3 && t2(n2, u3, i2, s2);
        }
        return n2;
      });
    }
    function createBaseEach(e2, t2) {
      return function(n2, o2) {
        if (null == n2) return n2;
        if (!isArrayLike(n2)) return e2(n2, o2);
        for (var i2 = n2.length, a2 = t2 ? i2 : -1, s2 = Ce3(n2); (t2 ? a2-- : ++a2 < i2) && false !== o2(s2[a2], a2, s2); ) ;
        return n2;
      };
    }
    function createBaseFor(e2) {
      return function(t2, n2, o2) {
        for (var i2 = -1, a2 = Ce3(t2), s2 = o2(t2), l3 = s2.length; l3--; ) {
          var u3 = s2[e2 ? l3 : ++i2];
          if (false === n2(a2[u3], u3, a2)) break;
        }
        return t2;
      };
    }
    function createCaseFirst(t2) {
      return function(n2) {
        var o2 = hasUnicode(n2 = toString(n2)) ? stringToArray(n2) : e, i2 = o2 ? o2[0] : n2.charAt(0), a2 = o2 ? castSlice(o2, 1).join("") : n2.slice(1);
        return i2[t2]() + a2;
      };
    }
    function createCompounder(e2) {
      return function(t2) {
        return arrayReduce(words(deburr(t2).replace(Xe2, "")), e2, "");
      };
    }
    function createCtor(e2) {
      return function() {
        var t2 = arguments;
        switch (t2.length) {
          case 0:
            return new e2();
          case 1:
            return new e2(t2[0]);
          case 2:
            return new e2(t2[0], t2[1]);
          case 3:
            return new e2(t2[0], t2[1], t2[2]);
          case 4:
            return new e2(t2[0], t2[1], t2[2], t2[3]);
          case 5:
            return new e2(t2[0], t2[1], t2[2], t2[3], t2[4]);
          case 6:
            return new e2(t2[0], t2[1], t2[2], t2[3], t2[4], t2[5]);
          case 7:
            return new e2(t2[0], t2[1], t2[2], t2[3], t2[4], t2[5], t2[6]);
        }
        var n2 = Jt2(e2.prototype), o2 = e2.apply(n2, t2);
        return isObject(o2) ? o2 : n2;
      };
    }
    function createFind(t2) {
      return function(n2, o2, i2) {
        var a2 = Ce3(n2);
        if (!isArrayLike(n2)) {
          var s2 = getIteratee(o2, 3);
          n2 = keys(n2), o2 = function(e2) {
            return s2(a2[e2], e2, a2);
          };
        }
        var l3 = t2(n2, o2, i2);
        return l3 > -1 ? a2[s2 ? n2[l3] : l3] : e;
      };
    }
    function createFlow(n2) {
      return flatRest(function(o2) {
        var i2 = o2.length, a2 = i2, s2 = LodashWrapper.prototype.thru;
        for (n2 && o2.reverse(); a2--; ) {
          var l3 = o2[a2];
          if ("function" != typeof l3) throw new Ie3(t);
          if (s2 && !u3 && "wrapper" == getFuncName(l3)) var u3 = new LodashWrapper([], true);
        }
        for (a2 = u3 ? a2 : i2; ++a2 < i2; ) {
          var c3 = getFuncName(l3 = o2[a2]), f3 = "wrapper" == c3 ? cn2(l3) : e;
          u3 = f3 && isLaziable(f3[0]) && 424 == f3[1] && !f3[4].length && 1 == f3[9] ? u3[getFuncName(f3[0])].apply(u3, f3[3]) : 1 == l3.length && isLaziable(l3) ? u3[c3]() : u3.thru(l3);
        }
        return function() {
          var e2 = arguments, t2 = e2[0];
          if (u3 && 1 == e2.length && rr2(t2)) return u3.plant(t2).value();
          for (var n3 = 0, a3 = i2 ? o2[n3].apply(this, e2) : t2; ++n3 < i2; ) a3 = o2[n3].call(this, a3);
          return a3;
        };
      });
    }
    function createHybrid(t2, n2, o2, i2, a2, l3, u3, c3, f3, p3) {
      var d3 = n2 & s, h3 = 1 & n2, g3 = 2 & n2, m3 = 24 & n2, y3 = 512 & n2, b3 = g3 ? e : createCtor(t2);
      return function wrapper() {
        for (var s2 = arguments.length, v3 = ke3(s2), k3 = s2; k3--; ) v3[k3] = arguments[k3];
        if (m3) var x3 = getHolder(wrapper), w3 = function(e2, t3) {
          for (var n3 = e2.length, o3 = 0; n3--; ) e2[n3] === t3 && ++o3;
          return o3;
        }(v3, x3);
        if (i2 && (v3 = composeArgs(v3, i2, a2, m3)), l3 && (v3 = composeArgsRight(v3, l3, u3, m3)), s2 -= w3, m3 && s2 < p3) {
          var S3 = replaceHolders(v3, x3);
          return createRecurry(t2, n2, createHybrid, wrapper.placeholder, o2, v3, S3, c3, f3, p3 - s2);
        }
        var _3 = h3 ? o2 : this, C3 = g3 ? _3[t2] : t2;
        return s2 = v3.length, c3 ? v3 = function(t3, n3) {
          for (var o3 = t3.length, i3 = Pt2(n3.length, o3), a3 = copyArray(t3); i3--; ) {
            var s3 = n3[i3];
            t3[i3] = isIndex(s3, o3) ? a3[s3] : e;
          }
          return t3;
        }(v3, c3) : y3 && s2 > 1 && v3.reverse(), d3 && f3 < s2 && (v3.length = f3), this && this !== ft2 && this instanceof wrapper && (C3 = b3 || createCtor(C3)), C3.apply(_3, v3);
      };
    }
    function createInverter(e2, t2) {
      return function(n2, o2) {
        return function(e3, t3, n3, o3) {
          return baseForOwn(e3, function(e4, i2, a2) {
            t3(o3, n3(e4), i2, a2);
          }), o3;
        }(n2, e2, t2(o2), {});
      };
    }
    function createMathOperation(t2, n2) {
      return function(o2, i2) {
        var a2;
        if (o2 === e && i2 === e) return n2;
        if (o2 !== e && (a2 = o2), i2 !== e) {
          if (a2 === e) return i2;
          "string" == typeof o2 || "string" == typeof i2 ? (o2 = baseToString(o2), i2 = baseToString(i2)) : (o2 = baseToNumber(o2), i2 = baseToNumber(i2)), a2 = t2(o2, i2);
        }
        return a2;
      };
    }
    function createOver(e2) {
      return flatRest(function(t2) {
        return t2 = arrayMap(t2, baseUnary(getIteratee())), baseRest(function(n2) {
          var o2 = this;
          return e2(t2, function(e3) {
            return apply(e3, o2, n2);
          });
        });
      });
    }
    function createPadding(t2, n2) {
      var o2 = (n2 = n2 === e ? " " : baseToString(n2)).length;
      if (o2 < 2) return o2 ? baseRepeat(n2, t2) : n2;
      var i2 = baseRepeat(n2, dt3(t2 / stringSize(n2)));
      return hasUnicode(n2) ? castSlice(stringToArray(i2), 0, t2).join("") : i2.slice(0, t2);
    }
    function createRange(t2) {
      return function(n2, o2, i2) {
        return i2 && "number" != typeof i2 && isIterateeCall(n2, o2, i2) && (o2 = i2 = e), n2 = toFinite(n2), o2 === e ? (o2 = n2, n2 = 0) : o2 = toFinite(o2), function(e2, t3, n3, o3) {
          for (var i3 = -1, a2 = Rt2(dt3((t3 - e2) / (n3 || 1)), 0), s2 = ke3(a2); a2--; ) s2[o3 ? a2 : ++i3] = e2, e2 += n3;
          return s2;
        }(n2, o2, i2 = i2 === e ? n2 < o2 ? 1 : -1 : toFinite(i2), t2);
      };
    }
    function createRelationalOperation(e2) {
      return function(t2, n2) {
        return "string" == typeof t2 && "string" == typeof n2 || (t2 = toNumber(t2), n2 = toNumber(n2)), e2(t2, n2);
      };
    }
    function createRecurry(t2, n2, o2, i2, s2, l3, u3, c3, f3, p3) {
      var d3 = 8 & n2;
      n2 |= d3 ? a : 64, 4 & (n2 &= ~(d3 ? 64 : a)) || (n2 &= -4);
      var h3 = [t2, n2, s2, d3 ? l3 : e, d3 ? u3 : e, d3 ? e : l3, d3 ? e : u3, c3, f3, p3], g3 = o2.apply(e, h3);
      return isLaziable(t2) && gn2(g3, h3), g3.placeholder = i2, setWrapToString(g3, t2, n2);
    }
    function createRound(e2) {
      var t2 = _e3[e2];
      return function(e3, n2) {
        if (e3 = toNumber(e3), (n2 = null == n2 ? 0 : Pt2(toInteger(n2), 292)) && It2(e3)) {
          var o2 = (toString(e3) + "e").split("e");
          return +((o2 = (toString(t2(o2[0] + "e" + (+o2[1] + n2))) + "e").split("e"))[0] + "e" + (+o2[1] - n2));
        }
        return t2(e3);
      };
    }
    var un2 = Nt2 && 1 / setToArray(new Nt2([, -0]))[1] == u2 ? function(e2) {
      return new Nt2(e2);
    } : noop;
    function createToPairs(e2) {
      return function(t2) {
        var n2 = dn2(t2);
        return n2 == x2 ? mapToArray(t2) : n2 == E2 ? setToPairs(t2) : function(e3, t3) {
          return arrayMap(t3, function(t4) {
            return [t4, e3[t4]];
          });
        }(t2, e2(t2));
      };
    }
    function createWrap(n2, o2, u3, c3, f3, p3, d3, h3) {
      var g3 = 2 & o2;
      if (!g3 && "function" != typeof n2) throw new Ie3(t);
      var m3 = c3 ? c3.length : 0;
      if (m3 || (o2 &= -97, c3 = f3 = e), d3 = d3 === e ? d3 : Rt2(toInteger(d3), 0), h3 = h3 === e ? h3 : toInteger(h3), m3 -= f3 ? f3.length : 0, 64 & o2) {
        var y3 = c3, b3 = f3;
        c3 = f3 = e;
      }
      var v3 = g3 ? e : cn2(n2), k3 = [n2, o2, u3, c3, f3, y3, b3, p3, d3, h3];
      if (v3 && function(e2, t2) {
        var n3 = e2[1], o3 = t2[1], a2 = n3 | o3, u4 = a2 < 131, c4 = o3 == s && 8 == n3 || o3 == s && n3 == l2 && e2[7].length <= t2[8] || 384 == o3 && t2[7].length <= t2[8] && 8 == n3;
        if (!u4 && !c4) return e2;
        1 & o3 && (e2[2] = t2[2], a2 |= 1 & n3 ? 0 : 4);
        var f4 = t2[3];
        if (f4) {
          var p4 = e2[3];
          e2[3] = p4 ? composeArgs(p4, f4, t2[4]) : f4, e2[4] = p4 ? replaceHolders(e2[3], i) : t2[4];
        }
        (f4 = t2[5]) && (p4 = e2[5], e2[5] = p4 ? composeArgsRight(p4, f4, t2[6]) : f4, e2[6] = p4 ? replaceHolders(e2[5], i) : t2[6]), (f4 = t2[7]) && (e2[7] = f4), o3 & s && (e2[8] = null == e2[8] ? t2[8] : Pt2(e2[8], t2[8])), null == e2[9] && (e2[9] = t2[9]), e2[0] = t2[0], e2[1] = a2;
      }(k3, v3), n2 = k3[0], o2 = k3[1], u3 = k3[2], c3 = k3[3], f3 = k3[4], !(h3 = k3[9] = k3[9] === e ? g3 ? 0 : n2.length : Rt2(k3[9] - m3, 0)) && 24 & o2 && (o2 &= -25), o2 && 1 != o2) x3 = 8 == o2 || 16 == o2 ? function(t2, n3, o3) {
        var i2 = createCtor(t2);
        return function wrapper() {
          for (var a2 = arguments.length, s2 = ke3(a2), l3 = a2, u4 = getHolder(wrapper); l3--; ) s2[l3] = arguments[l3];
          var c4 = a2 < 3 && s2[0] !== u4 && s2[a2 - 1] !== u4 ? [] : replaceHolders(s2, u4);
          return (a2 -= c4.length) < o3 ? createRecurry(t2, n3, createHybrid, wrapper.placeholder, e, s2, c4, e, e, o3 - a2) : apply(this && this !== ft2 && this instanceof wrapper ? i2 : t2, this, s2);
        };
      }(n2, o2, h3) : o2 != a && 33 != o2 || f3.length ? createHybrid.apply(e, k3) : function(e2, t2, n3, o3) {
        var i2 = 1 & t2, a2 = createCtor(e2);
        return function wrapper() {
          for (var t3 = -1, s2 = arguments.length, l3 = -1, u4 = o3.length, c4 = ke3(u4 + s2), f4 = this && this !== ft2 && this instanceof wrapper ? a2 : e2; ++l3 < u4; ) c4[l3] = o3[l3];
          for (; s2--; ) c4[l3++] = arguments[++t3];
          return apply(f4, i2 ? n3 : this, c4);
        };
      }(n2, o2, u3, c3);
      else var x3 = function(e2, t2, n3) {
        var o3 = 1 & t2, i2 = createCtor(e2);
        return function wrapper() {
          return (this && this !== ft2 && this instanceof wrapper ? i2 : e2).apply(o3 ? n3 : this, arguments);
        };
      }(n2, o2, u3);
      return setWrapToString((v3 ? on2 : gn2)(x3, k3), n2, o2);
    }
    function customDefaultsAssignIn(t2, n2, o2, i2) {
      return t2 === e || eq(t2, Re3[o2]) && !Te3.call(i2, o2) ? n2 : t2;
    }
    function customDefaultsMerge(t2, n2, o2, i2, a2, s2) {
      return isObject(t2) && isObject(n2) && (s2.set(n2, t2), baseMerge(t2, n2, e, customDefaultsMerge, s2), s2.delete(n2)), t2;
    }
    function customOmitClone(t2) {
      return isPlainObject2(t2) ? e : t2;
    }
    function equalArrays(t2, n2, o2, i2, a2, s2) {
      var l3 = 1 & o2, u3 = t2.length, c3 = n2.length;
      if (u3 != c3 && !(l3 && c3 > u3)) return false;
      var f3 = s2.get(t2), p3 = s2.get(n2);
      if (f3 && p3) return f3 == n2 && p3 == t2;
      var d3 = -1, h3 = true, g3 = 2 & o2 ? new SetCache() : e;
      for (s2.set(t2, n2), s2.set(n2, t2); ++d3 < u3; ) {
        var m3 = t2[d3], y3 = n2[d3];
        if (i2) var b3 = l3 ? i2(y3, m3, d3, n2, t2, s2) : i2(m3, y3, d3, t2, n2, s2);
        if (b3 !== e) {
          if (b3) continue;
          h3 = false;
          break;
        }
        if (g3) {
          if (!arraySome(n2, function(e2, t3) {
            if (!cacheHas(g3, t3) && (m3 === e2 || a2(m3, e2, o2, i2, s2))) return g3.push(t3);
          })) {
            h3 = false;
            break;
          }
        } else if (m3 !== y3 && !a2(m3, y3, o2, i2, s2)) {
          h3 = false;
          break;
        }
      }
      return s2.delete(t2), s2.delete(n2), h3;
    }
    function flatRest(t2) {
      return yn2(overRest(t2, e, flatten), t2 + "");
    }
    function getAllKeys(e2) {
      return baseGetAllKeys(e2, keys, fn2);
    }
    function getAllKeysIn(e2) {
      return baseGetAllKeys(e2, keysIn, pn2);
    }
    var cn2 = Wt2 ? function(e2) {
      return Wt2.get(e2);
    } : noop;
    function getFuncName(e2) {
      for (var t2 = e2.name + "", n2 = Ut2[t2], o2 = Te3.call(Ut2, t2) ? n2.length : 0; o2--; ) {
        var i2 = n2[o2], a2 = i2.func;
        if (null == a2 || a2 == e2) return i2.name;
      }
      return t2;
    }
    function getHolder(e2) {
      return (Te3.call(lodash, "placeholder") ? lodash : e2).placeholder;
    }
    function getIteratee() {
      var e2 = lodash.iteratee || iteratee;
      return e2 = e2 === iteratee ? baseIteratee : e2, arguments.length ? e2(arguments[0], arguments[1]) : e2;
    }
    function getMapData(e2, t2) {
      var n2 = e2.__data__;
      return function(e3) {
        var t3 = typeof e3;
        return "string" == t3 || "number" == t3 || "symbol" == t3 || "boolean" == t3 ? "__proto__" !== e3 : null === e3;
      }(t2) ? n2["string" == typeof t2 ? "string" : "hash"] : n2.map;
    }
    function getMatchData(e2) {
      for (var t2 = keys(e2), n2 = t2.length; n2--; ) {
        var o2 = t2[n2], i2 = e2[o2];
        t2[n2] = [o2, i2, isStrictComparable(i2)];
      }
      return t2;
    }
    function getNative(t2, n2) {
      var o2 = function(t3, n3) {
        return null == t3 ? e : t3[n3];
      }(t2, n2);
      return baseIsNative(o2) ? o2 : e;
    }
    var fn2 = mt3 ? function(e2) {
      return null == e2 ? [] : (e2 = Ce3(e2), arrayFilter(mt3(e2), function(t2) {
        return Ge3.call(e2, t2);
      }));
    } : stubArray, pn2 = mt3 ? function(e2) {
      for (var t2 = []; e2; ) arrayPush(t2, fn2(e2)), e2 = $e3(e2);
      return t2;
    } : stubArray, dn2 = baseGetTag;
    function hasPath(e2, t2, n2) {
      for (var o2 = -1, i2 = (t2 = castPath(t2, e2)).length, a2 = false; ++o2 < i2; ) {
        var s2 = toKey(t2[o2]);
        if (!(a2 = null != e2 && n2(e2, s2))) break;
        e2 = e2[s2];
      }
      return a2 || ++o2 != i2 ? a2 : !!(i2 = null == e2 ? 0 : e2.length) && isLength(i2) && isIndex(s2, i2) && (rr2(e2) || nr2(e2));
    }
    function initCloneObject(e2) {
      return "function" != typeof e2.constructor || isPrototype(e2) ? {} : Jt2($e3(e2));
    }
    function isFlattenable(e2) {
      return rr2(e2) || nr2(e2) || !!(Ye3 && e2 && e2[Ye3]);
    }
    function isIndex(e2, t2) {
      var n2 = typeof e2;
      return !!(t2 = null == t2 ? c2 : t2) && ("number" == n2 || "symbol" != n2 && me2.test(e2)) && e2 > -1 && e2 % 1 == 0 && e2 < t2;
    }
    function isIterateeCall(e2, t2, n2) {
      if (!isObject(n2)) return false;
      var o2 = typeof t2;
      return !!("number" == o2 ? isArrayLike(n2) && isIndex(t2, n2.length) : "string" == o2 && t2 in n2) && eq(n2[t2], e2);
    }
    function isKey(e2, t2) {
      if (rr2(e2)) return false;
      var n2 = typeof e2;
      return !("number" != n2 && "symbol" != n2 && "boolean" != n2 && null != e2 && !isSymbol(e2)) || Z2.test(e2) || !Q2.test(e2) || null != t2 && e2 in Ce3(t2);
    }
    function isLaziable(e2) {
      var t2 = getFuncName(e2), n2 = lodash[t2];
      if ("function" != typeof n2 || !(t2 in LazyWrapper.prototype)) return false;
      if (e2 === n2) return true;
      var o2 = cn2(n2);
      return !!o2 && e2 === o2[0];
    }
    (Mt2 && dn2(new Mt2(new ArrayBuffer(1))) != R2 || qt2 && dn2(new qt2()) != x2 || Ft2 && dn2(Ft2.resolve()) != _2 || Nt2 && dn2(new Nt2()) != E2 || Bt2 && dn2(new Bt2()) != A2) && (dn2 = function(t2) {
      var n2 = baseGetTag(t2), o2 = n2 == S2 ? t2.constructor : e, i2 = o2 ? toSource(o2) : "";
      if (i2) switch (i2) {
        case $t2:
          return R2;
        case Vt2:
          return x2;
        case Gt2:
          return _2;
        case Kt2:
          return E2;
        case Yt2:
          return A2;
      }
      return n2;
    });
    var hn2 = Pe3 ? isFunction : stubFalse;
    function isPrototype(e2) {
      var t2 = e2 && e2.constructor;
      return e2 === ("function" == typeof t2 && t2.prototype || Re3);
    }
    function isStrictComparable(e2) {
      return e2 == e2 && !isObject(e2);
    }
    function matchesStrictComparable(t2, n2) {
      return function(o2) {
        return null != o2 && o2[t2] === n2 && (n2 !== e || t2 in Ce3(o2));
      };
    }
    function overRest(t2, n2, o2) {
      return n2 = Rt2(n2 === e ? t2.length - 1 : n2, 0), function() {
        for (var e2 = arguments, i2 = -1, a2 = Rt2(e2.length - n2, 0), s2 = ke3(a2); ++i2 < a2; ) s2[i2] = e2[n2 + i2];
        i2 = -1;
        for (var l3 = ke3(n2 + 1); ++i2 < n2; ) l3[i2] = e2[i2];
        return l3[n2] = o2(s2), apply(t2, this, l3);
      };
    }
    function parent(e2, t2) {
      return t2.length < 2 ? e2 : baseGet(e2, baseSlice(t2, 0, -1));
    }
    function safeGet(e2, t2) {
      if (("constructor" !== t2 || "function" != typeof e2[t2]) && "__proto__" != t2) return e2[t2];
    }
    var gn2 = shortOut(on2), mn2 = pt3 || function(e2, t2) {
      return ft2.setTimeout(e2, t2);
    }, yn2 = shortOut(an2);
    function setWrapToString(e2, t2, n2) {
      var o2 = t2 + "";
      return yn2(e2, function(e3, t3) {
        var n3 = t3.length;
        if (!n3) return e3;
        var o3 = n3 - 1;
        return t3[o3] = (n3 > 1 ? "& " : "") + t3[o3], t3 = t3.join(n3 > 2 ? ", " : " "), e3.replace(oe2, "{\n/* [wrapped with " + t3 + "] */\n");
      }(o2, function(e3, t3) {
        return arrayEach(d2, function(n3) {
          var o3 = "_." + n3[0];
          t3 & n3[1] && !arrayIncludes(e3, o3) && e3.push(o3);
        }), e3.sort();
      }(function(e3) {
        var t3 = e3.match(ie2);
        return t3 ? t3[1].split(ae2) : [];
      }(o2), n2)));
    }
    function shortOut(t2) {
      var n2 = 0, o2 = 0;
      return function() {
        var i2 = Lt2(), a2 = 16 - (i2 - o2);
        if (o2 = i2, a2 > 0) {
          if (++n2 >= 800) return arguments[0];
        } else n2 = 0;
        return t2.apply(e, arguments);
      };
    }
    function shuffleSelf(t2, n2) {
      var o2 = -1, i2 = t2.length, a2 = i2 - 1;
      for (n2 = n2 === e ? i2 : n2; ++o2 < n2; ) {
        var s2 = baseRandom(o2, a2), l3 = t2[s2];
        t2[s2] = t2[o2], t2[o2] = l3;
      }
      return t2.length = n2, t2;
    }
    var bn2 = function(e2) {
      var t2 = memoize(e2, function(e3) {
        return 500 === n2.size && n2.clear(), e3;
      }), n2 = t2.cache;
      return t2;
    }(function(e2) {
      var t2 = [];
      return 46 === e2.charCodeAt(0) && t2.push(""), e2.replace(J2, function(e3, n2, o2, i2) {
        t2.push(o2 ? i2.replace(ue2, "$1") : n2 || e3);
      }), t2;
    });
    function toKey(e2) {
      if ("string" == typeof e2 || isSymbol(e2)) return e2;
      var t2 = e2 + "";
      return "0" == t2 && 1 / e2 == -1 / 0 ? "-0" : t2;
    }
    function toSource(e2) {
      if (null != e2) {
        try {
          return Le3.call(e2);
        } catch (e3) {
        }
        try {
          return e2 + "";
        } catch (e3) {
        }
      }
      return "";
    }
    function wrapperClone(e2) {
      if (e2 instanceof LazyWrapper) return e2.clone();
      var t2 = new LodashWrapper(e2.__wrapped__, e2.__chain__);
      return t2.__actions__ = copyArray(e2.__actions__), t2.__index__ = e2.__index__, t2.__values__ = e2.__values__, t2;
    }
    var vn2 = baseRest(function(e2, t2) {
      return isArrayLikeObject(e2) ? baseDifference(e2, baseFlatten(t2, 1, isArrayLikeObject, true)) : [];
    }), kn2 = baseRest(function(t2, n2) {
      var o2 = last(n2);
      return isArrayLikeObject(o2) && (o2 = e), isArrayLikeObject(t2) ? baseDifference(t2, baseFlatten(n2, 1, isArrayLikeObject, true), getIteratee(o2, 2)) : [];
    }), xn2 = baseRest(function(t2, n2) {
      var o2 = last(n2);
      return isArrayLikeObject(o2) && (o2 = e), isArrayLikeObject(t2) ? baseDifference(t2, baseFlatten(n2, 1, isArrayLikeObject, true), e, o2) : [];
    });
    function findIndex(e2, t2, n2) {
      var o2 = null == e2 ? 0 : e2.length;
      if (!o2) return -1;
      var i2 = null == n2 ? 0 : toInteger(n2);
      return i2 < 0 && (i2 = Rt2(o2 + i2, 0)), baseFindIndex(e2, getIteratee(t2, 3), i2);
    }
    function findLastIndex(t2, n2, o2) {
      var i2 = null == t2 ? 0 : t2.length;
      if (!i2) return -1;
      var a2 = i2 - 1;
      return o2 !== e && (a2 = toInteger(o2), a2 = o2 < 0 ? Rt2(i2 + a2, 0) : Pt2(a2, i2 - 1)), baseFindIndex(t2, getIteratee(n2, 3), a2, true);
    }
    function flatten(e2) {
      return null != e2 && e2.length ? baseFlatten(e2, 1) : [];
    }
    function head(t2) {
      return t2 && t2.length ? t2[0] : e;
    }
    var wn2 = baseRest(function(e2) {
      var t2 = arrayMap(e2, castArrayLikeObject);
      return t2.length && t2[0] === e2[0] ? baseIntersection(t2) : [];
    }), Sn2 = baseRest(function(t2) {
      var n2 = last(t2), o2 = arrayMap(t2, castArrayLikeObject);
      return n2 === last(o2) ? n2 = e : o2.pop(), o2.length && o2[0] === t2[0] ? baseIntersection(o2, getIteratee(n2, 2)) : [];
    }), _n2 = baseRest(function(t2) {
      var n2 = last(t2), o2 = arrayMap(t2, castArrayLikeObject);
      return (n2 = "function" == typeof n2 ? n2 : e) && o2.pop(), o2.length && o2[0] === t2[0] ? baseIntersection(o2, e, n2) : [];
    });
    function last(t2) {
      var n2 = null == t2 ? 0 : t2.length;
      return n2 ? t2[n2 - 1] : e;
    }
    var Cn2 = baseRest(pullAll);
    function pullAll(e2, t2) {
      return e2 && e2.length && t2 && t2.length ? basePullAll(e2, t2) : e2;
    }
    var En2 = flatRest(function(e2, t2) {
      var n2 = null == e2 ? 0 : e2.length, o2 = baseAt(e2, t2);
      return basePullAt(e2, arrayMap(t2, function(e3) {
        return isIndex(e3, n2) ? +e3 : e3;
      }).sort(compareAscending)), o2;
    });
    function reverse(e2) {
      return null == e2 ? e2 : jt2.call(e2);
    }
    var On2 = baseRest(function(e2) {
      return baseUniq(baseFlatten(e2, 1, isArrayLikeObject, true));
    }), In2 = baseRest(function(t2) {
      var n2 = last(t2);
      return isArrayLikeObject(n2) && (n2 = e), baseUniq(baseFlatten(t2, 1, isArrayLikeObject, true), getIteratee(n2, 2));
    }), An2 = baseRest(function(t2) {
      var n2 = last(t2);
      return n2 = "function" == typeof n2 ? n2 : e, baseUniq(baseFlatten(t2, 1, isArrayLikeObject, true), e, n2);
    });
    function unzip(e2) {
      if (!e2 || !e2.length) return [];
      var t2 = 0;
      return e2 = arrayFilter(e2, function(e3) {
        if (isArrayLikeObject(e3)) return t2 = Rt2(e3.length, t2), true;
      }), baseTimes(t2, function(t3) {
        return arrayMap(e2, baseProperty(t3));
      });
    }
    function unzipWith(t2, n2) {
      if (!t2 || !t2.length) return [];
      var o2 = unzip(t2);
      return null == n2 ? o2 : arrayMap(o2, function(t3) {
        return apply(n2, e, t3);
      });
    }
    var Dn2 = baseRest(function(e2, t2) {
      return isArrayLikeObject(e2) ? baseDifference(e2, t2) : [];
    }), Rn2 = baseRest(function(e2) {
      return baseXor(arrayFilter(e2, isArrayLikeObject));
    }), Pn2 = baseRest(function(t2) {
      var n2 = last(t2);
      return isArrayLikeObject(n2) && (n2 = e), baseXor(arrayFilter(t2, isArrayLikeObject), getIteratee(n2, 2));
    }), Ln2 = baseRest(function(t2) {
      var n2 = last(t2);
      return n2 = "function" == typeof n2 ? n2 : e, baseXor(arrayFilter(t2, isArrayLikeObject), e, n2);
    }), Tn2 = baseRest(unzip), zn2 = baseRest(function(t2) {
      var n2 = t2.length, o2 = n2 > 1 ? t2[n2 - 1] : e;
      return o2 = "function" == typeof o2 ? (t2.pop(), o2) : e, unzipWith(t2, o2);
    });
    function chain(e2) {
      var t2 = lodash(e2);
      return t2.__chain__ = true, t2;
    }
    function thru(e2, t2) {
      return t2(e2);
    }
    var jn2 = flatRest(function(t2) {
      var n2 = t2.length, o2 = n2 ? t2[0] : 0, i2 = this.__wrapped__, interceptor = function(e2) {
        return baseAt(e2, t2);
      };
      return !(n2 > 1 || this.__actions__.length) && i2 instanceof LazyWrapper && isIndex(o2) ? ((i2 = i2.slice(o2, +o2 + (n2 ? 1 : 0))).__actions__.push({ func: thru, args: [interceptor], thisArg: e }), new LodashWrapper(i2, this.__chain__).thru(function(t3) {
        return n2 && !t3.length && t3.push(e), t3;
      })) : this.thru(interceptor);
    }), Mn2 = createAggregator(function(e2, t2, n2) {
      Te3.call(e2, n2) ? ++e2[n2] : baseAssignValue(e2, n2, 1);
    }), qn2 = createFind(findIndex), Fn2 = createFind(findLastIndex);
    function forEach(e2, t2) {
      return (rr2(e2) ? arrayEach : en2)(e2, getIteratee(t2, 3));
    }
    function forEachRight(e2, t2) {
      return (rr2(e2) ? arrayEachRight : tn2)(e2, getIteratee(t2, 3));
    }
    var Nn2 = createAggregator(function(e2, t2, n2) {
      Te3.call(e2, n2) ? e2[n2].push(t2) : baseAssignValue(e2, n2, [t2]);
    }), Bn2 = baseRest(function(e2, t2, n2) {
      var o2 = -1, i2 = "function" == typeof t2, a2 = isArrayLike(e2) ? ke3(e2.length) : [];
      return en2(e2, function(e3) {
        a2[++o2] = i2 ? apply(t2, e3, n2) : baseInvoke(e3, t2, n2);
      }), a2;
    }), Hn2 = createAggregator(function(e2, t2, n2) {
      baseAssignValue(e2, n2, t2);
    });
    function map2(e2, t2) {
      return (rr2(e2) ? arrayMap : baseMap)(e2, getIteratee(t2, 3));
    }
    var Wn2 = createAggregator(function(e2, t2, n2) {
      e2[n2 ? 0 : 1].push(t2);
    }, function() {
      return [[], []];
    }), Un2 = baseRest(function(e2, t2) {
      if (null == e2) return [];
      var n2 = t2.length;
      return n2 > 1 && isIterateeCall(e2, t2[0], t2[1]) ? t2 = [] : n2 > 2 && isIterateeCall(t2[0], t2[1], t2[2]) && (t2 = [t2[0]]), baseOrderBy(e2, baseFlatten(t2, 1), []);
    }), $n2 = ct3 || function() {
      return ft2.Date.now();
    };
    function ary(t2, n2, o2) {
      return n2 = o2 ? e : n2, n2 = t2 && null == n2 ? t2.length : n2, createWrap(t2, s, e, e, e, e, n2);
    }
    function before(n2, o2) {
      var i2;
      if ("function" != typeof o2) throw new Ie3(t);
      return n2 = toInteger(n2), function() {
        return --n2 > 0 && (i2 = o2.apply(this, arguments)), n2 <= 1 && (o2 = e), i2;
      };
    }
    var Vn2 = baseRest(function(e2, t2, n2) {
      var o2 = 1;
      if (n2.length) {
        var i2 = replaceHolders(n2, getHolder(Vn2));
        o2 |= a;
      }
      return createWrap(e2, o2, t2, n2, i2);
    }), Gn2 = baseRest(function(e2, t2, n2) {
      var o2 = 3;
      if (n2.length) {
        var i2 = replaceHolders(n2, getHolder(Gn2));
        o2 |= a;
      }
      return createWrap(t2, o2, e2, n2, i2);
    });
    function debounce(n2, o2, i2) {
      var a2, s2, l3, u3, c3, f3, p3 = 0, d3 = false, h3 = false, g3 = true;
      if ("function" != typeof n2) throw new Ie3(t);
      function invokeFunc(t2) {
        var o3 = a2, i3 = s2;
        return a2 = s2 = e, p3 = t2, u3 = n2.apply(i3, o3);
      }
      function shouldInvoke(t2) {
        var n3 = t2 - f3;
        return f3 === e || n3 >= o2 || n3 < 0 || h3 && t2 - p3 >= l3;
      }
      function timerExpired() {
        var e2 = $n2();
        if (shouldInvoke(e2)) return trailingEdge(e2);
        c3 = mn2(timerExpired, function(e3) {
          var t2 = o2 - (e3 - f3);
          return h3 ? Pt2(t2, l3 - (e3 - p3)) : t2;
        }(e2));
      }
      function trailingEdge(t2) {
        return c3 = e, g3 && a2 ? invokeFunc(t2) : (a2 = s2 = e, u3);
      }
      function debounced() {
        var t2 = $n2(), n3 = shouldInvoke(t2);
        if (a2 = arguments, s2 = this, f3 = t2, n3) {
          if (c3 === e) return function(e2) {
            return p3 = e2, c3 = mn2(timerExpired, o2), d3 ? invokeFunc(e2) : u3;
          }(f3);
          if (h3) return ln2(c3), c3 = mn2(timerExpired, o2), invokeFunc(f3);
        }
        return c3 === e && (c3 = mn2(timerExpired, o2)), u3;
      }
      return o2 = toNumber(o2) || 0, isObject(i2) && (d3 = !!i2.leading, l3 = (h3 = "maxWait" in i2) ? Rt2(toNumber(i2.maxWait) || 0, o2) : l3, g3 = "trailing" in i2 ? !!i2.trailing : g3), debounced.cancel = function() {
        c3 !== e && ln2(c3), p3 = 0, a2 = f3 = s2 = c3 = e;
      }, debounced.flush = function() {
        return c3 === e ? u3 : trailingEdge($n2());
      }, debounced;
    }
    var Kn2 = baseRest(function(e2, t2) {
      return baseDelay(e2, 1, t2);
    }), Yn2 = baseRest(function(e2, t2, n2) {
      return baseDelay(e2, toNumber(t2) || 0, n2);
    });
    function memoize(e2, n2) {
      if ("function" != typeof e2 || null != n2 && "function" != typeof n2) throw new Ie3(t);
      var memoized = function() {
        var t2 = arguments, o2 = n2 ? n2.apply(this, t2) : t2[0], i2 = memoized.cache;
        if (i2.has(o2)) return i2.get(o2);
        var a2 = e2.apply(this, t2);
        return memoized.cache = i2.set(o2, a2) || i2, a2;
      };
      return memoized.cache = new (memoize.Cache || MapCache)(), memoized;
    }
    function negate(e2) {
      if ("function" != typeof e2) throw new Ie3(t);
      return function() {
        var t2 = arguments;
        switch (t2.length) {
          case 0:
            return !e2.call(this);
          case 1:
            return !e2.call(this, t2[0]);
          case 2:
            return !e2.call(this, t2[0], t2[1]);
          case 3:
            return !e2.call(this, t2[0], t2[1], t2[2]);
        }
        return !e2.apply(this, t2);
      };
    }
    memoize.Cache = MapCache;
    var Xn2 = sn2(function(e2, t2) {
      var n2 = (t2 = 1 == t2.length && rr2(t2[0]) ? arrayMap(t2[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(t2, 1), baseUnary(getIteratee()))).length;
      return baseRest(function(o2) {
        for (var i2 = -1, a2 = Pt2(o2.length, n2); ++i2 < a2; ) o2[i2] = t2[i2].call(this, o2[i2]);
        return apply(e2, this, o2);
      });
    }), Qn2 = baseRest(function(t2, n2) {
      var o2 = replaceHolders(n2, getHolder(Qn2));
      return createWrap(t2, a, e, n2, o2);
    }), Zn2 = baseRest(function(t2, n2) {
      var o2 = replaceHolders(n2, getHolder(Zn2));
      return createWrap(t2, 64, e, n2, o2);
    }), Jn2 = flatRest(function(t2, n2) {
      return createWrap(t2, l2, e, e, e, n2);
    });
    function eq(e2, t2) {
      return e2 === t2 || e2 != e2 && t2 != t2;
    }
    var er2 = createRelationalOperation(baseGt), tr2 = createRelationalOperation(function(e2, t2) {
      return e2 >= t2;
    }), nr2 = baseIsArguments(/* @__PURE__ */ function() {
      return arguments;
    }()) ? baseIsArguments : function(e2) {
      return isObjectLike(e2) && Te3.call(e2, "callee") && !Ge3.call(e2, "callee");
    }, rr2 = ke3.isArray, or2 = yt2 ? baseUnary(yt2) : function(e2) {
      return isObjectLike(e2) && baseGetTag(e2) == D2;
    };
    function isArrayLike(e2) {
      return null != e2 && isLength(e2.length) && !isFunction(e2);
    }
    function isArrayLikeObject(e2) {
      return isObjectLike(e2) && isArrayLike(e2);
    }
    var ir2 = St3 || stubFalse, ar2 = bt2 ? baseUnary(bt2) : function(e2) {
      return isObjectLike(e2) && baseGetTag(e2) == y2;
    };
    function isError(e2) {
      if (!isObjectLike(e2)) return false;
      var t2 = baseGetTag(e2);
      return t2 == b2 || "[object DOMException]" == t2 || "string" == typeof e2.message && "string" == typeof e2.name && !isPlainObject2(e2);
    }
    function isFunction(e2) {
      if (!isObject(e2)) return false;
      var t2 = baseGetTag(e2);
      return t2 == v2 || t2 == k2 || "[object AsyncFunction]" == t2 || "[object Proxy]" == t2;
    }
    function isInteger(e2) {
      return "number" == typeof e2 && e2 == toInteger(e2);
    }
    function isLength(e2) {
      return "number" == typeof e2 && e2 > -1 && e2 % 1 == 0 && e2 <= c2;
    }
    function isObject(e2) {
      var t2 = typeof e2;
      return null != e2 && ("object" == t2 || "function" == t2);
    }
    function isObjectLike(e2) {
      return null != e2 && "object" == typeof e2;
    }
    var sr2 = vt2 ? baseUnary(vt2) : function(e2) {
      return isObjectLike(e2) && dn2(e2) == x2;
    };
    function isNumber(e2) {
      return "number" == typeof e2 || isObjectLike(e2) && baseGetTag(e2) == w2;
    }
    function isPlainObject2(e2) {
      if (!isObjectLike(e2) || baseGetTag(e2) != S2) return false;
      var t2 = $e3(e2);
      if (null === t2) return true;
      var n2 = Te3.call(t2, "constructor") && t2.constructor;
      return "function" == typeof n2 && n2 instanceof n2 && Le3.call(n2) == qe3;
    }
    var lr2 = kt2 ? baseUnary(kt2) : function(e2) {
      return isObjectLike(e2) && baseGetTag(e2) == C2;
    }, ur2 = xt2 ? baseUnary(xt2) : function(e2) {
      return isObjectLike(e2) && dn2(e2) == E2;
    };
    function isString(e2) {
      return "string" == typeof e2 || !rr2(e2) && isObjectLike(e2) && baseGetTag(e2) == O2;
    }
    function isSymbol(e2) {
      return "symbol" == typeof e2 || isObjectLike(e2) && baseGetTag(e2) == I2;
    }
    var cr2 = wt2 ? baseUnary(wt2) : function(e2) {
      return isObjectLike(e2) && isLength(e2.length) && !!ot2[baseGetTag(e2)];
    }, fr2 = createRelationalOperation(baseLt), pr2 = createRelationalOperation(function(e2, t2) {
      return e2 <= t2;
    });
    function toArray(e2) {
      if (!e2) return [];
      if (isArrayLike(e2)) return isString(e2) ? stringToArray(e2) : copyArray(e2);
      if (Ze3 && e2[Ze3]) return function(e3) {
        for (var t3, n2 = []; !(t3 = e3.next()).done; ) n2.push(t3.value);
        return n2;
      }(e2[Ze3]());
      var t2 = dn2(e2);
      return (t2 == x2 ? mapToArray : t2 == E2 ? setToArray : values)(e2);
    }
    function toFinite(e2) {
      return e2 ? (e2 = toNumber(e2)) === u2 || e2 === -1 / 0 ? 17976931348623157e292 * (e2 < 0 ? -1 : 1) : e2 == e2 ? e2 : 0 : 0 === e2 ? e2 : 0;
    }
    function toInteger(e2) {
      var t2 = toFinite(e2), n2 = t2 % 1;
      return t2 == t2 ? n2 ? t2 - n2 : t2 : 0;
    }
    function toLength(e2) {
      return e2 ? baseClamp(toInteger(e2), 0, p2) : 0;
    }
    function toNumber(e2) {
      if ("number" == typeof e2) return e2;
      if (isSymbol(e2)) return f2;
      if (isObject(e2)) {
        var t2 = "function" == typeof e2.valueOf ? e2.valueOf() : e2;
        e2 = isObject(t2) ? t2 + "" : t2;
      }
      if ("string" != typeof e2) return 0 === e2 ? e2 : +e2;
      e2 = baseTrim(e2);
      var n2 = de2.test(e2);
      return n2 || ge2.test(e2) ? lt2(e2.slice(2), n2 ? 2 : 8) : pe2.test(e2) ? f2 : +e2;
    }
    function toPlainObject(e2) {
      return copyObject(e2, keysIn(e2));
    }
    function toString(e2) {
      return null == e2 ? "" : baseToString(e2);
    }
    var dr2 = createAssigner(function(e2, t2) {
      if (isPrototype(t2) || isArrayLike(t2)) copyObject(t2, keys(t2), e2);
      else for (var n2 in t2) Te3.call(t2, n2) && assignValue(e2, n2, t2[n2]);
    }), hr2 = createAssigner(function(e2, t2) {
      copyObject(t2, keysIn(t2), e2);
    }), gr2 = createAssigner(function(e2, t2, n2, o2) {
      copyObject(t2, keysIn(t2), e2, o2);
    }), mr2 = createAssigner(function(e2, t2, n2, o2) {
      copyObject(t2, keys(t2), e2, o2);
    }), yr2 = flatRest(baseAt), br2 = baseRest(function(t2, n2) {
      t2 = Ce3(t2);
      var o2 = -1, i2 = n2.length, a2 = i2 > 2 ? n2[2] : e;
      for (a2 && isIterateeCall(n2[0], n2[1], a2) && (i2 = 1); ++o2 < i2; ) for (var s2 = n2[o2], l3 = keysIn(s2), u3 = -1, c3 = l3.length; ++u3 < c3; ) {
        var f3 = l3[u3], p3 = t2[f3];
        (p3 === e || eq(p3, Re3[f3]) && !Te3.call(t2, f3)) && (t2[f3] = s2[f3]);
      }
      return t2;
    }), vr2 = baseRest(function(t2) {
      return t2.push(e, customDefaultsMerge), apply(_r2, e, t2);
    });
    function get(t2, n2, o2) {
      var i2 = null == t2 ? e : baseGet(t2, n2);
      return i2 === e ? o2 : i2;
    }
    function hasIn(e2, t2) {
      return null != e2 && hasPath(e2, t2, baseHasIn);
    }
    var kr2 = createInverter(function(e2, t2, n2) {
      null != t2 && "function" != typeof t2.toString && (t2 = Me3.call(t2)), e2[t2] = n2;
    }, constant(identity)), xr2 = createInverter(function(e2, t2, n2) {
      null != t2 && "function" != typeof t2.toString && (t2 = Me3.call(t2)), Te3.call(e2, t2) ? e2[t2].push(n2) : e2[t2] = [n2];
    }, getIteratee), wr2 = baseRest(baseInvoke);
    function keys(e2) {
      return isArrayLike(e2) ? arrayLikeKeys(e2) : baseKeys(e2);
    }
    function keysIn(e2) {
      return isArrayLike(e2) ? arrayLikeKeys(e2, true) : baseKeysIn(e2);
    }
    var Sr2 = createAssigner(function(e2, t2, n2) {
      baseMerge(e2, t2, n2);
    }), _r2 = createAssigner(function(e2, t2, n2, o2) {
      baseMerge(e2, t2, n2, o2);
    }), Cr2 = flatRest(function(e2, t2) {
      var n2 = {};
      if (null == e2) return n2;
      var o2 = false;
      t2 = arrayMap(t2, function(t3) {
        return t3 = castPath(t3, e2), o2 || (o2 = t3.length > 1), t3;
      }), copyObject(e2, getAllKeysIn(e2), n2), o2 && (n2 = baseClone(n2, 7, customOmitClone));
      for (var i2 = t2.length; i2--; ) baseUnset(n2, t2[i2]);
      return n2;
    }), Er2 = flatRest(function(e2, t2) {
      return null == e2 ? {} : function(e3, t3) {
        return basePickBy(e3, t3, function(t4, n2) {
          return hasIn(e3, n2);
        });
      }(e2, t2);
    });
    function pickBy(e2, t2) {
      if (null == e2) return {};
      var n2 = arrayMap(getAllKeysIn(e2), function(e3) {
        return [e3];
      });
      return t2 = getIteratee(t2), basePickBy(e2, n2, function(e3, n3) {
        return t2(e3, n3[0]);
      });
    }
    var Or2 = createToPairs(keys), Ir2 = createToPairs(keysIn);
    function values(e2) {
      return null == e2 ? [] : baseValues(e2, keys(e2));
    }
    var Ar2 = createCompounder(function(e2, t2, n2) {
      return t2 = t2.toLowerCase(), e2 + (n2 ? capitalize2(t2) : t2);
    });
    function capitalize2(e2) {
      return jr2(toString(e2).toLowerCase());
    }
    function deburr(e2) {
      return (e2 = toString(e2)) && e2.replace(ye2, _t2).replace(Qe2, "");
    }
    var Dr2 = createCompounder(function(e2, t2, n2) {
      return e2 + (n2 ? "-" : "") + t2.toLowerCase();
    }), Rr2 = createCompounder(function(e2, t2, n2) {
      return e2 + (n2 ? " " : "") + t2.toLowerCase();
    }), Pr2 = createCaseFirst("toLowerCase"), Lr2 = createCompounder(function(e2, t2, n2) {
      return e2 + (n2 ? "_" : "") + t2.toLowerCase();
    }), Tr2 = createCompounder(function(e2, t2, n2) {
      return e2 + (n2 ? " " : "") + jr2(t2);
    }), zr2 = createCompounder(function(e2, t2, n2) {
      return e2 + (n2 ? " " : "") + t2.toUpperCase();
    }), jr2 = createCaseFirst("toUpperCase");
    function words(t2, n2, o2) {
      return t2 = toString(t2), (n2 = o2 ? e : n2) === e ? function(e2) {
        return tt2.test(e2);
      }(t2) ? function(e2) {
        return e2.match(Je2) || [];
      }(t2) : function(e2) {
        return e2.match(se2) || [];
      }(t2) : t2.match(n2) || [];
    }
    var Mr2 = baseRest(function(t2, n2) {
      try {
        return apply(t2, e, n2);
      } catch (e2) {
        return isError(e2) ? e2 : new we3(e2);
      }
    }), qr2 = flatRest(function(e2, t2) {
      return arrayEach(t2, function(t3) {
        t3 = toKey(t3), baseAssignValue(e2, t3, Vn2(e2[t3], e2));
      }), e2;
    });
    function constant(e2) {
      return function() {
        return e2;
      };
    }
    var Fr2 = createFlow(), Nr2 = createFlow(true);
    function identity(e2) {
      return e2;
    }
    function iteratee(e2) {
      return baseIteratee("function" == typeof e2 ? e2 : baseClone(e2, 1));
    }
    var Br2 = baseRest(function(e2, t2) {
      return function(n2) {
        return baseInvoke(n2, e2, t2);
      };
    }), Hr2 = baseRest(function(e2, t2) {
      return function(n2) {
        return baseInvoke(e2, n2, t2);
      };
    });
    function mixin(e2, t2, n2) {
      var o2 = keys(t2), i2 = baseFunctions(t2, o2);
      null != n2 || isObject(t2) && (i2.length || !o2.length) || (n2 = t2, t2 = e2, e2 = this, i2 = baseFunctions(t2, keys(t2)));
      var a2 = !(isObject(n2) && "chain" in n2 && !n2.chain), s2 = isFunction(e2);
      return arrayEach(i2, function(n3) {
        var o3 = t2[n3];
        e2[n3] = o3, s2 && (e2.prototype[n3] = function() {
          var t3 = this.__chain__;
          if (a2 || t3) {
            var n4 = e2(this.__wrapped__);
            return (n4.__actions__ = copyArray(this.__actions__)).push({ func: o3, args: arguments, thisArg: e2 }), n4.__chain__ = t3, n4;
          }
          return o3.apply(e2, arrayPush([this.value()], arguments));
        });
      }), e2;
    }
    function noop() {
    }
    var Wr2 = createOver(arrayMap), Ur2 = createOver(arrayEvery), $r2 = createOver(arraySome);
    function property(e2) {
      return isKey(e2) ? baseProperty(toKey(e2)) : /* @__PURE__ */ function(e3) {
        return function(t2) {
          return baseGet(t2, e3);
        };
      }(e2);
    }
    var Vr2 = createRange(), Gr2 = createRange(true);
    function stubArray() {
      return [];
    }
    function stubFalse() {
      return false;
    }
    var Kr2, Yr2 = createMathOperation(function(e2, t2) {
      return e2 + t2;
    }, 0), Xr2 = createRound("ceil"), Qr2 = createMathOperation(function(e2, t2) {
      return e2 / t2;
    }, 1), Zr2 = createRound("floor"), Jr2 = createMathOperation(function(e2, t2) {
      return e2 * t2;
    }, 1), eo2 = createRound("round"), to2 = createMathOperation(function(e2, t2) {
      return e2 - t2;
    }, 0);
    return lodash.after = function(e2, n2) {
      if ("function" != typeof n2) throw new Ie3(t);
      return e2 = toInteger(e2), function() {
        if (--e2 < 1) return n2.apply(this, arguments);
      };
    }, lodash.ary = ary, lodash.assign = dr2, lodash.assignIn = hr2, lodash.assignInWith = gr2, lodash.assignWith = mr2, lodash.at = yr2, lodash.before = before, lodash.bind = Vn2, lodash.bindAll = qr2, lodash.bindKey = Gn2, lodash.castArray = function() {
      if (!arguments.length) return [];
      var e2 = arguments[0];
      return rr2(e2) ? e2 : [e2];
    }, lodash.chain = chain, lodash.chunk = function(t2, n2, o2) {
      n2 = (o2 ? isIterateeCall(t2, n2, o2) : n2 === e) ? 1 : Rt2(toInteger(n2), 0);
      var i2 = null == t2 ? 0 : t2.length;
      if (!i2 || n2 < 1) return [];
      for (var a2 = 0, s2 = 0, l3 = ke3(dt3(i2 / n2)); a2 < i2; ) l3[s2++] = baseSlice(t2, a2, a2 += n2);
      return l3;
    }, lodash.compact = function(e2) {
      for (var t2 = -1, n2 = null == e2 ? 0 : e2.length, o2 = 0, i2 = []; ++t2 < n2; ) {
        var a2 = e2[t2];
        a2 && (i2[o2++] = a2);
      }
      return i2;
    }, lodash.concat = function() {
      var e2 = arguments.length;
      if (!e2) return [];
      for (var t2 = ke3(e2 - 1), n2 = arguments[0], o2 = e2; o2--; ) t2[o2 - 1] = arguments[o2];
      return arrayPush(rr2(n2) ? copyArray(n2) : [n2], baseFlatten(t2, 1));
    }, lodash.cond = function(e2) {
      var n2 = null == e2 ? 0 : e2.length, o2 = getIteratee();
      return e2 = n2 ? arrayMap(e2, function(e3) {
        if ("function" != typeof e3[1]) throw new Ie3(t);
        return [o2(e3[0]), e3[1]];
      }) : [], baseRest(function(t2) {
        for (var o3 = -1; ++o3 < n2; ) {
          var i2 = e2[o3];
          if (apply(i2[0], this, t2)) return apply(i2[1], this, t2);
        }
      });
    }, lodash.conforms = function(e2) {
      return function(e3) {
        var t2 = keys(e3);
        return function(n2) {
          return baseConformsTo(n2, e3, t2);
        };
      }(baseClone(e2, 1));
    }, lodash.constant = constant, lodash.countBy = Mn2, lodash.create = function(e2, t2) {
      var n2 = Jt2(e2);
      return null == t2 ? n2 : baseAssign(n2, t2);
    }, lodash.curry = function curry(t2, n2, o2) {
      var i2 = createWrap(t2, 8, e, e, e, e, e, n2 = o2 ? e : n2);
      return i2.placeholder = curry.placeholder, i2;
    }, lodash.curryRight = function curryRight(t2, n2, o2) {
      var i2 = createWrap(t2, 16, e, e, e, e, e, n2 = o2 ? e : n2);
      return i2.placeholder = curryRight.placeholder, i2;
    }, lodash.debounce = debounce, lodash.defaults = br2, lodash.defaultsDeep = vr2, lodash.defer = Kn2, lodash.delay = Yn2, lodash.difference = vn2, lodash.differenceBy = kn2, lodash.differenceWith = xn2, lodash.drop = function(t2, n2, o2) {
      var i2 = null == t2 ? 0 : t2.length;
      return i2 ? baseSlice(t2, (n2 = o2 || n2 === e ? 1 : toInteger(n2)) < 0 ? 0 : n2, i2) : [];
    }, lodash.dropRight = function(t2, n2, o2) {
      var i2 = null == t2 ? 0 : t2.length;
      return i2 ? baseSlice(t2, 0, (n2 = i2 - (n2 = o2 || n2 === e ? 1 : toInteger(n2))) < 0 ? 0 : n2) : [];
    }, lodash.dropRightWhile = function(e2, t2) {
      return e2 && e2.length ? baseWhile(e2, getIteratee(t2, 3), true, true) : [];
    }, lodash.dropWhile = function(e2, t2) {
      return e2 && e2.length ? baseWhile(e2, getIteratee(t2, 3), true) : [];
    }, lodash.fill = function(t2, n2, o2, i2) {
      var a2 = null == t2 ? 0 : t2.length;
      return a2 ? (o2 && "number" != typeof o2 && isIterateeCall(t2, n2, o2) && (o2 = 0, i2 = a2), function(t3, n3, o3, i3) {
        var a3 = t3.length;
        for ((o3 = toInteger(o3)) < 0 && (o3 = -o3 > a3 ? 0 : a3 + o3), (i3 = i3 === e || i3 > a3 ? a3 : toInteger(i3)) < 0 && (i3 += a3), i3 = o3 > i3 ? 0 : toLength(i3); o3 < i3; ) t3[o3++] = n3;
        return t3;
      }(t2, n2, o2, i2)) : [];
    }, lodash.filter = function(e2, t2) {
      return (rr2(e2) ? arrayFilter : baseFilter)(e2, getIteratee(t2, 3));
    }, lodash.flatMap = function(e2, t2) {
      return baseFlatten(map2(e2, t2), 1);
    }, lodash.flatMapDeep = function(e2, t2) {
      return baseFlatten(map2(e2, t2), u2);
    }, lodash.flatMapDepth = function(t2, n2, o2) {
      return o2 = o2 === e ? 1 : toInteger(o2), baseFlatten(map2(t2, n2), o2);
    }, lodash.flatten = flatten, lodash.flattenDeep = function(e2) {
      return null != e2 && e2.length ? baseFlatten(e2, u2) : [];
    }, lodash.flattenDepth = function(t2, n2) {
      return null != t2 && t2.length ? baseFlatten(t2, n2 = n2 === e ? 1 : toInteger(n2)) : [];
    }, lodash.flip = function(e2) {
      return createWrap(e2, 512);
    }, lodash.flow = Fr2, lodash.flowRight = Nr2, lodash.fromPairs = function(e2) {
      for (var t2 = -1, n2 = null == e2 ? 0 : e2.length, o2 = {}; ++t2 < n2; ) {
        var i2 = e2[t2];
        o2[i2[0]] = i2[1];
      }
      return o2;
    }, lodash.functions = function(e2) {
      return null == e2 ? [] : baseFunctions(e2, keys(e2));
    }, lodash.functionsIn = function(e2) {
      return null == e2 ? [] : baseFunctions(e2, keysIn(e2));
    }, lodash.groupBy = Nn2, lodash.initial = function(e2) {
      return null != e2 && e2.length ? baseSlice(e2, 0, -1) : [];
    }, lodash.intersection = wn2, lodash.intersectionBy = Sn2, lodash.intersectionWith = _n2, lodash.invert = kr2, lodash.invertBy = xr2, lodash.invokeMap = Bn2, lodash.iteratee = iteratee, lodash.keyBy = Hn2, lodash.keys = keys, lodash.keysIn = keysIn, lodash.map = map2, lodash.mapKeys = function(e2, t2) {
      var n2 = {};
      return t2 = getIteratee(t2, 3), baseForOwn(e2, function(e3, o2, i2) {
        baseAssignValue(n2, t2(e3, o2, i2), e3);
      }), n2;
    }, lodash.mapValues = function(e2, t2) {
      var n2 = {};
      return t2 = getIteratee(t2, 3), baseForOwn(e2, function(e3, o2, i2) {
        baseAssignValue(n2, o2, t2(e3, o2, i2));
      }), n2;
    }, lodash.matches = function(e2) {
      return baseMatches(baseClone(e2, 1));
    }, lodash.matchesProperty = function(e2, t2) {
      return baseMatchesProperty(e2, baseClone(t2, 1));
    }, lodash.memoize = memoize, lodash.merge = Sr2, lodash.mergeWith = _r2, lodash.method = Br2, lodash.methodOf = Hr2, lodash.mixin = mixin, lodash.negate = negate, lodash.nthArg = function(e2) {
      return e2 = toInteger(e2), baseRest(function(t2) {
        return baseNth(t2, e2);
      });
    }, lodash.omit = Cr2, lodash.omitBy = function(e2, t2) {
      return pickBy(e2, negate(getIteratee(t2)));
    }, lodash.once = function(e2) {
      return before(2, e2);
    }, lodash.orderBy = function(t2, n2, o2, i2) {
      return null == t2 ? [] : (rr2(n2) || (n2 = null == n2 ? [] : [n2]), rr2(o2 = i2 ? e : o2) || (o2 = null == o2 ? [] : [o2]), baseOrderBy(t2, n2, o2));
    }, lodash.over = Wr2, lodash.overArgs = Xn2, lodash.overEvery = Ur2, lodash.overSome = $r2, lodash.partial = Qn2, lodash.partialRight = Zn2, lodash.partition = Wn2, lodash.pick = Er2, lodash.pickBy = pickBy, lodash.property = property, lodash.propertyOf = function(t2) {
      return function(n2) {
        return null == t2 ? e : baseGet(t2, n2);
      };
    }, lodash.pull = Cn2, lodash.pullAll = pullAll, lodash.pullAllBy = function(e2, t2, n2) {
      return e2 && e2.length && t2 && t2.length ? basePullAll(e2, t2, getIteratee(n2, 2)) : e2;
    }, lodash.pullAllWith = function(t2, n2, o2) {
      return t2 && t2.length && n2 && n2.length ? basePullAll(t2, n2, e, o2) : t2;
    }, lodash.pullAt = En2, lodash.range = Vr2, lodash.rangeRight = Gr2, lodash.rearg = Jn2, lodash.reject = function(e2, t2) {
      return (rr2(e2) ? arrayFilter : baseFilter)(e2, negate(getIteratee(t2, 3)));
    }, lodash.remove = function(e2, t2) {
      var n2 = [];
      if (!e2 || !e2.length) return n2;
      var o2 = -1, i2 = [], a2 = e2.length;
      for (t2 = getIteratee(t2, 3); ++o2 < a2; ) {
        var s2 = e2[o2];
        t2(s2, o2, e2) && (n2.push(s2), i2.push(o2));
      }
      return basePullAt(e2, i2), n2;
    }, lodash.rest = function(n2, o2) {
      if ("function" != typeof n2) throw new Ie3(t);
      return baseRest(n2, o2 = o2 === e ? o2 : toInteger(o2));
    }, lodash.reverse = reverse, lodash.sampleSize = function(t2, n2, o2) {
      return n2 = (o2 ? isIterateeCall(t2, n2, o2) : n2 === e) ? 1 : toInteger(n2), (rr2(t2) ? arraySampleSize : baseSampleSize)(t2, n2);
    }, lodash.set = function(e2, t2, n2) {
      return null == e2 ? e2 : baseSet(e2, t2, n2);
    }, lodash.setWith = function(t2, n2, o2, i2) {
      return i2 = "function" == typeof i2 ? i2 : e, null == t2 ? t2 : baseSet(t2, n2, o2, i2);
    }, lodash.shuffle = function(e2) {
      return (rr2(e2) ? arrayShuffle : baseShuffle)(e2);
    }, lodash.slice = function(t2, n2, o2) {
      var i2 = null == t2 ? 0 : t2.length;
      return i2 ? (o2 && "number" != typeof o2 && isIterateeCall(t2, n2, o2) ? (n2 = 0, o2 = i2) : (n2 = null == n2 ? 0 : toInteger(n2), o2 = o2 === e ? i2 : toInteger(o2)), baseSlice(t2, n2, o2)) : [];
    }, lodash.sortBy = Un2, lodash.sortedUniq = function(e2) {
      return e2 && e2.length ? baseSortedUniq(e2) : [];
    }, lodash.sortedUniqBy = function(e2, t2) {
      return e2 && e2.length ? baseSortedUniq(e2, getIteratee(t2, 2)) : [];
    }, lodash.split = function(t2, n2, o2) {
      return o2 && "number" != typeof o2 && isIterateeCall(t2, n2, o2) && (n2 = o2 = e), (o2 = o2 === e ? p2 : o2 >>> 0) ? (t2 = toString(t2)) && ("string" == typeof n2 || null != n2 && !lr2(n2)) && !(n2 = baseToString(n2)) && hasUnicode(t2) ? castSlice(stringToArray(t2), 0, o2) : t2.split(n2, o2) : [];
    }, lodash.spread = function(e2, n2) {
      if ("function" != typeof e2) throw new Ie3(t);
      return n2 = null == n2 ? 0 : Rt2(toInteger(n2), 0), baseRest(function(t2) {
        var o2 = t2[n2], i2 = castSlice(t2, 0, n2);
        return o2 && arrayPush(i2, o2), apply(e2, this, i2);
      });
    }, lodash.tail = function(e2) {
      var t2 = null == e2 ? 0 : e2.length;
      return t2 ? baseSlice(e2, 1, t2) : [];
    }, lodash.take = function(t2, n2, o2) {
      return t2 && t2.length ? baseSlice(t2, 0, (n2 = o2 || n2 === e ? 1 : toInteger(n2)) < 0 ? 0 : n2) : [];
    }, lodash.takeRight = function(t2, n2, o2) {
      var i2 = null == t2 ? 0 : t2.length;
      return i2 ? baseSlice(t2, (n2 = i2 - (n2 = o2 || n2 === e ? 1 : toInteger(n2))) < 0 ? 0 : n2, i2) : [];
    }, lodash.takeRightWhile = function(e2, t2) {
      return e2 && e2.length ? baseWhile(e2, getIteratee(t2, 3), false, true) : [];
    }, lodash.takeWhile = function(e2, t2) {
      return e2 && e2.length ? baseWhile(e2, getIteratee(t2, 3)) : [];
    }, lodash.tap = function(e2, t2) {
      return t2(e2), e2;
    }, lodash.throttle = function(e2, n2, o2) {
      var i2 = true, a2 = true;
      if ("function" != typeof e2) throw new Ie3(t);
      return isObject(o2) && (i2 = "leading" in o2 ? !!o2.leading : i2, a2 = "trailing" in o2 ? !!o2.trailing : a2), debounce(e2, n2, { leading: i2, maxWait: n2, trailing: a2 });
    }, lodash.thru = thru, lodash.toArray = toArray, lodash.toPairs = Or2, lodash.toPairsIn = Ir2, lodash.toPath = function(e2) {
      return rr2(e2) ? arrayMap(e2, toKey) : isSymbol(e2) ? [e2] : copyArray(bn2(toString(e2)));
    }, lodash.toPlainObject = toPlainObject, lodash.transform = function(e2, t2, n2) {
      var o2 = rr2(e2), i2 = o2 || ir2(e2) || cr2(e2);
      if (t2 = getIteratee(t2, 4), null == n2) {
        var a2 = e2 && e2.constructor;
        n2 = i2 ? o2 ? new a2() : [] : isObject(e2) && isFunction(a2) ? Jt2($e3(e2)) : {};
      }
      return (i2 ? arrayEach : baseForOwn)(e2, function(e3, o3, i3) {
        return t2(n2, e3, o3, i3);
      }), n2;
    }, lodash.unary = function(e2) {
      return ary(e2, 1);
    }, lodash.union = On2, lodash.unionBy = In2, lodash.unionWith = An2, lodash.uniq = function(e2) {
      return e2 && e2.length ? baseUniq(e2) : [];
    }, lodash.uniqBy = function(e2, t2) {
      return e2 && e2.length ? baseUniq(e2, getIteratee(t2, 2)) : [];
    }, lodash.uniqWith = function(t2, n2) {
      return n2 = "function" == typeof n2 ? n2 : e, t2 && t2.length ? baseUniq(t2, e, n2) : [];
    }, lodash.unset = function(e2, t2) {
      return null == e2 || baseUnset(e2, t2);
    }, lodash.unzip = unzip, lodash.unzipWith = unzipWith, lodash.update = function(e2, t2, n2) {
      return null == e2 ? e2 : baseUpdate(e2, t2, castFunction(n2));
    }, lodash.updateWith = function(t2, n2, o2, i2) {
      return i2 = "function" == typeof i2 ? i2 : e, null == t2 ? t2 : baseUpdate(t2, n2, castFunction(o2), i2);
    }, lodash.values = values, lodash.valuesIn = function(e2) {
      return null == e2 ? [] : baseValues(e2, keysIn(e2));
    }, lodash.without = Dn2, lodash.words = words, lodash.wrap = function(e2, t2) {
      return Qn2(castFunction(t2), e2);
    }, lodash.xor = Rn2, lodash.xorBy = Pn2, lodash.xorWith = Ln2, lodash.zip = Tn2, lodash.zipObject = function(e2, t2) {
      return baseZipObject(e2 || [], t2 || [], assignValue);
    }, lodash.zipObjectDeep = function(e2, t2) {
      return baseZipObject(e2 || [], t2 || [], baseSet);
    }, lodash.zipWith = zn2, lodash.entries = Or2, lodash.entriesIn = Ir2, lodash.extend = hr2, lodash.extendWith = gr2, mixin(lodash, lodash), lodash.add = Yr2, lodash.attempt = Mr2, lodash.camelCase = Ar2, lodash.capitalize = capitalize2, lodash.ceil = Xr2, lodash.clamp = function(t2, n2, o2) {
      return o2 === e && (o2 = n2, n2 = e), o2 !== e && (o2 = (o2 = toNumber(o2)) == o2 ? o2 : 0), n2 !== e && (n2 = (n2 = toNumber(n2)) == n2 ? n2 : 0), baseClamp(toNumber(t2), n2, o2);
    }, lodash.clone = function(e2) {
      return baseClone(e2, 4);
    }, lodash.cloneDeep = function(e2) {
      return baseClone(e2, 5);
    }, lodash.cloneDeepWith = function(t2, n2) {
      return baseClone(t2, 5, n2 = "function" == typeof n2 ? n2 : e);
    }, lodash.cloneWith = function(t2, n2) {
      return baseClone(t2, 4, n2 = "function" == typeof n2 ? n2 : e);
    }, lodash.conformsTo = function(e2, t2) {
      return null == t2 || baseConformsTo(e2, t2, keys(t2));
    }, lodash.deburr = deburr, lodash.defaultTo = function(e2, t2) {
      return null == e2 || e2 != e2 ? t2 : e2;
    }, lodash.divide = Qr2, lodash.endsWith = function(t2, n2, o2) {
      t2 = toString(t2), n2 = baseToString(n2);
      var i2 = t2.length, a2 = o2 = o2 === e ? i2 : baseClamp(toInteger(o2), 0, i2);
      return (o2 -= n2.length) >= 0 && t2.slice(o2, a2) == n2;
    }, lodash.eq = eq, lodash.escape = function(e2) {
      return (e2 = toString(e2)) && G2.test(e2) ? e2.replace($2, Ct2) : e2;
    }, lodash.escapeRegExp = function(e2) {
      return (e2 = toString(e2)) && te2.test(e2) ? e2.replace(ee2, "\\$&") : e2;
    }, lodash.every = function(t2, n2, o2) {
      var i2 = rr2(t2) ? arrayEvery : baseEvery;
      return o2 && isIterateeCall(t2, n2, o2) && (n2 = e), i2(t2, getIteratee(n2, 3));
    }, lodash.find = qn2, lodash.findIndex = findIndex, lodash.findKey = function(e2, t2) {
      return baseFindKey(e2, getIteratee(t2, 3), baseForOwn);
    }, lodash.findLast = Fn2, lodash.findLastIndex = findLastIndex, lodash.findLastKey = function(e2, t2) {
      return baseFindKey(e2, getIteratee(t2, 3), baseForOwnRight);
    }, lodash.floor = Zr2, lodash.forEach = forEach, lodash.forEachRight = forEachRight, lodash.forIn = function(e2, t2) {
      return null == e2 ? e2 : nn2(e2, getIteratee(t2, 3), keysIn);
    }, lodash.forInRight = function(e2, t2) {
      return null == e2 ? e2 : rn2(e2, getIteratee(t2, 3), keysIn);
    }, lodash.forOwn = function(e2, t2) {
      return e2 && baseForOwn(e2, getIteratee(t2, 3));
    }, lodash.forOwnRight = function(e2, t2) {
      return e2 && baseForOwnRight(e2, getIteratee(t2, 3));
    }, lodash.get = get, lodash.gt = er2, lodash.gte = tr2, lodash.has = function(e2, t2) {
      return null != e2 && hasPath(e2, t2, baseHas);
    }, lodash.hasIn = hasIn, lodash.head = head, lodash.identity = identity, lodash.includes = function(e2, t2, n2, o2) {
      e2 = isArrayLike(e2) ? e2 : values(e2), n2 = n2 && !o2 ? toInteger(n2) : 0;
      var i2 = e2.length;
      return n2 < 0 && (n2 = Rt2(i2 + n2, 0)), isString(e2) ? n2 <= i2 && e2.indexOf(t2, n2) > -1 : !!i2 && baseIndexOf(e2, t2, n2) > -1;
    }, lodash.indexOf = function(e2, t2, n2) {
      var o2 = null == e2 ? 0 : e2.length;
      if (!o2) return -1;
      var i2 = null == n2 ? 0 : toInteger(n2);
      return i2 < 0 && (i2 = Rt2(o2 + i2, 0)), baseIndexOf(e2, t2, i2);
    }, lodash.inRange = function(t2, n2, o2) {
      return n2 = toFinite(n2), o2 === e ? (o2 = n2, n2 = 0) : o2 = toFinite(o2), function(e2, t3, n3) {
        return e2 >= Pt2(t3, n3) && e2 < Rt2(t3, n3);
      }(t2 = toNumber(t2), n2, o2);
    }, lodash.invoke = wr2, lodash.isArguments = nr2, lodash.isArray = rr2, lodash.isArrayBuffer = or2, lodash.isArrayLike = isArrayLike, lodash.isArrayLikeObject = isArrayLikeObject, lodash.isBoolean = function(e2) {
      return true === e2 || false === e2 || isObjectLike(e2) && baseGetTag(e2) == m2;
    }, lodash.isBuffer = ir2, lodash.isDate = ar2, lodash.isElement = function(e2) {
      return isObjectLike(e2) && 1 === e2.nodeType && !isPlainObject2(e2);
    }, lodash.isEmpty = function(e2) {
      if (null == e2) return true;
      if (isArrayLike(e2) && (rr2(e2) || "string" == typeof e2 || "function" == typeof e2.splice || ir2(e2) || cr2(e2) || nr2(e2))) return !e2.length;
      var t2 = dn2(e2);
      if (t2 == x2 || t2 == E2) return !e2.size;
      if (isPrototype(e2)) return !baseKeys(e2).length;
      for (var n2 in e2) if (Te3.call(e2, n2)) return false;
      return true;
    }, lodash.isEqual = function(e2, t2) {
      return baseIsEqual(e2, t2);
    }, lodash.isEqualWith = function(t2, n2, o2) {
      var i2 = (o2 = "function" == typeof o2 ? o2 : e) ? o2(t2, n2) : e;
      return i2 === e ? baseIsEqual(t2, n2, e, o2) : !!i2;
    }, lodash.isError = isError, lodash.isFinite = function(e2) {
      return "number" == typeof e2 && It2(e2);
    }, lodash.isFunction = isFunction, lodash.isInteger = isInteger, lodash.isLength = isLength, lodash.isMap = sr2, lodash.isMatch = function(e2, t2) {
      return e2 === t2 || baseIsMatch(e2, t2, getMatchData(t2));
    }, lodash.isMatchWith = function(t2, n2, o2) {
      return o2 = "function" == typeof o2 ? o2 : e, baseIsMatch(t2, n2, getMatchData(n2), o2);
    }, lodash.isNaN = function(e2) {
      return isNumber(e2) && e2 != +e2;
    }, lodash.isNative = function(e2) {
      if (hn2(e2)) throw new we3("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");
      return baseIsNative(e2);
    }, lodash.isNil = function(e2) {
      return null == e2;
    }, lodash.isNull = function(e2) {
      return null === e2;
    }, lodash.isNumber = isNumber, lodash.isObject = isObject, lodash.isObjectLike = isObjectLike, lodash.isPlainObject = isPlainObject2, lodash.isRegExp = lr2, lodash.isSafeInteger = function(e2) {
      return isInteger(e2) && e2 >= -9007199254740991 && e2 <= c2;
    }, lodash.isSet = ur2, lodash.isString = isString, lodash.isSymbol = isSymbol, lodash.isTypedArray = cr2, lodash.isUndefined = function(t2) {
      return t2 === e;
    }, lodash.isWeakMap = function(e2) {
      return isObjectLike(e2) && dn2(e2) == A2;
    }, lodash.isWeakSet = function(e2) {
      return isObjectLike(e2) && "[object WeakSet]" == baseGetTag(e2);
    }, lodash.join = function(e2, t2) {
      return null == e2 ? "" : At2.call(e2, t2);
    }, lodash.kebabCase = Dr2, lodash.last = last, lodash.lastIndexOf = function(t2, n2, o2) {
      var i2 = null == t2 ? 0 : t2.length;
      if (!i2) return -1;
      var a2 = i2;
      return o2 !== e && (a2 = (a2 = toInteger(o2)) < 0 ? Rt2(i2 + a2, 0) : Pt2(a2, i2 - 1)), n2 == n2 ? function(e2, t3, n3) {
        for (var o3 = n3 + 1; o3--; ) if (e2[o3] === t3) return o3;
        return o3;
      }(t2, n2, a2) : baseFindIndex(t2, baseIsNaN, a2, true);
    }, lodash.lowerCase = Rr2, lodash.lowerFirst = Pr2, lodash.lt = fr2, lodash.lte = pr2, lodash.max = function(t2) {
      return t2 && t2.length ? baseExtremum(t2, identity, baseGt) : e;
    }, lodash.maxBy = function(t2, n2) {
      return t2 && t2.length ? baseExtremum(t2, getIteratee(n2, 2), baseGt) : e;
    }, lodash.mean = function(e2) {
      return baseMean(e2, identity);
    }, lodash.meanBy = function(e2, t2) {
      return baseMean(e2, getIteratee(t2, 2));
    }, lodash.min = function(t2) {
      return t2 && t2.length ? baseExtremum(t2, identity, baseLt) : e;
    }, lodash.minBy = function(t2, n2) {
      return t2 && t2.length ? baseExtremum(t2, getIteratee(n2, 2), baseLt) : e;
    }, lodash.stubArray = stubArray, lodash.stubFalse = stubFalse, lodash.stubObject = function() {
      return {};
    }, lodash.stubString = function() {
      return "";
    }, lodash.stubTrue = function() {
      return true;
    }, lodash.multiply = Jr2, lodash.nth = function(t2, n2) {
      return t2 && t2.length ? baseNth(t2, toInteger(n2)) : e;
    }, lodash.noConflict = function() {
      return ft2._ === this && (ft2._ = Fe3), this;
    }, lodash.noop = noop, lodash.now = $n2, lodash.pad = function(e2, t2, n2) {
      e2 = toString(e2);
      var o2 = (t2 = toInteger(t2)) ? stringSize(e2) : 0;
      if (!t2 || o2 >= t2) return e2;
      var i2 = (t2 - o2) / 2;
      return createPadding(gt3(i2), n2) + e2 + createPadding(dt3(i2), n2);
    }, lodash.padEnd = function(e2, t2, n2) {
      e2 = toString(e2);
      var o2 = (t2 = toInteger(t2)) ? stringSize(e2) : 0;
      return t2 && o2 < t2 ? e2 + createPadding(t2 - o2, n2) : e2;
    }, lodash.padStart = function(e2, t2, n2) {
      e2 = toString(e2);
      var o2 = (t2 = toInteger(t2)) ? stringSize(e2) : 0;
      return t2 && o2 < t2 ? createPadding(t2 - o2, n2) + e2 : e2;
    }, lodash.parseInt = function(e2, t2, n2) {
      return n2 || null == t2 ? t2 = 0 : t2 && (t2 = +t2), Tt2(toString(e2).replace(ne2, ""), t2 || 0);
    }, lodash.random = function(t2, n2, o2) {
      if (o2 && "boolean" != typeof o2 && isIterateeCall(t2, n2, o2) && (n2 = o2 = e), o2 === e && ("boolean" == typeof n2 ? (o2 = n2, n2 = e) : "boolean" == typeof t2 && (o2 = t2, t2 = e)), t2 === e && n2 === e ? (t2 = 0, n2 = 1) : (t2 = toFinite(t2), n2 === e ? (n2 = t2, t2 = 0) : n2 = toFinite(n2)), t2 > n2) {
        var i2 = t2;
        t2 = n2, n2 = i2;
      }
      if (o2 || t2 % 1 || n2 % 1) {
        var a2 = zt2();
        return Pt2(t2 + a2 * (n2 - t2 + st2("1e-" + ((a2 + "").length - 1))), n2);
      }
      return baseRandom(t2, n2);
    }, lodash.reduce = function(e2, t2, n2) {
      var o2 = rr2(e2) ? arrayReduce : baseReduce, i2 = arguments.length < 3;
      return o2(e2, getIteratee(t2, 4), n2, i2, en2);
    }, lodash.reduceRight = function(e2, t2, n2) {
      var o2 = rr2(e2) ? arrayReduceRight : baseReduce, i2 = arguments.length < 3;
      return o2(e2, getIteratee(t2, 4), n2, i2, tn2);
    }, lodash.repeat = function(t2, n2, o2) {
      return n2 = (o2 ? isIterateeCall(t2, n2, o2) : n2 === e) ? 1 : toInteger(n2), baseRepeat(toString(t2), n2);
    }, lodash.replace = function() {
      var e2 = arguments, t2 = toString(e2[0]);
      return e2.length < 3 ? t2 : t2.replace(e2[1], e2[2]);
    }, lodash.result = function(t2, n2, o2) {
      var i2 = -1, a2 = (n2 = castPath(n2, t2)).length;
      for (a2 || (a2 = 1, t2 = e); ++i2 < a2; ) {
        var s2 = null == t2 ? e : t2[toKey(n2[i2])];
        s2 === e && (i2 = a2, s2 = o2), t2 = isFunction(s2) ? s2.call(t2) : s2;
      }
      return t2;
    }, lodash.round = eo2, lodash.runInContext = runInContext, lodash.sample = function(e2) {
      return (rr2(e2) ? arraySample : baseSample)(e2);
    }, lodash.size = function(e2) {
      if (null == e2) return 0;
      if (isArrayLike(e2)) return isString(e2) ? stringSize(e2) : e2.length;
      var t2 = dn2(e2);
      return t2 == x2 || t2 == E2 ? e2.size : baseKeys(e2).length;
    }, lodash.snakeCase = Lr2, lodash.some = function(t2, n2, o2) {
      var i2 = rr2(t2) ? arraySome : baseSome;
      return o2 && isIterateeCall(t2, n2, o2) && (n2 = e), i2(t2, getIteratee(n2, 3));
    }, lodash.sortedIndex = function(e2, t2) {
      return baseSortedIndex(e2, t2);
    }, lodash.sortedIndexBy = function(e2, t2, n2) {
      return baseSortedIndexBy(e2, t2, getIteratee(n2, 2));
    }, lodash.sortedIndexOf = function(e2, t2) {
      var n2 = null == e2 ? 0 : e2.length;
      if (n2) {
        var o2 = baseSortedIndex(e2, t2);
        if (o2 < n2 && eq(e2[o2], t2)) return o2;
      }
      return -1;
    }, lodash.sortedLastIndex = function(e2, t2) {
      return baseSortedIndex(e2, t2, true);
    }, lodash.sortedLastIndexBy = function(e2, t2, n2) {
      return baseSortedIndexBy(e2, t2, getIteratee(n2, 2), true);
    }, lodash.sortedLastIndexOf = function(e2, t2) {
      if (null != e2 && e2.length) {
        var n2 = baseSortedIndex(e2, t2, true) - 1;
        if (eq(e2[n2], t2)) return n2;
      }
      return -1;
    }, lodash.startCase = Tr2, lodash.startsWith = function(e2, t2, n2) {
      return e2 = toString(e2), n2 = null == n2 ? 0 : baseClamp(toInteger(n2), 0, e2.length), t2 = baseToString(t2), e2.slice(n2, n2 + t2.length) == t2;
    }, lodash.subtract = to2, lodash.sum = function(e2) {
      return e2 && e2.length ? baseSum(e2, identity) : 0;
    }, lodash.sumBy = function(e2, t2) {
      return e2 && e2.length ? baseSum(e2, getIteratee(t2, 2)) : 0;
    }, lodash.template = function(t2, n2, o2) {
      var i2 = lodash.templateSettings;
      o2 && isIterateeCall(t2, n2, o2) && (n2 = e), t2 = toString(t2), n2 = gr2({}, n2, i2, customDefaultsAssignIn);
      var a2, s2, l3 = gr2({}, n2.imports, i2.imports, customDefaultsAssignIn), u3 = keys(l3), c3 = baseValues(l3, u3), f3 = 0, p3 = n2.interpolate || be2, d3 = "__p += '", h3 = Ee3((n2.escape || be2).source + "|" + p3.source + "|" + (p3 === X2 ? ce2 : be2).source + "|" + (n2.evaluate || be2).source + "|$", "g"), g3 = "//# sourceURL=" + (Te3.call(n2, "sourceURL") ? (n2.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++rt2 + "]") + "\n";
      t2.replace(h3, function(e2, n3, o3, i3, l4, u4) {
        return o3 || (o3 = i3), d3 += t2.slice(f3, u4).replace(ve2, escapeStringChar), n3 && (a2 = true, d3 += "' +\n__e(" + n3 + ") +\n'"), l4 && (s2 = true, d3 += "';\n" + l4 + ";\n__p += '"), o3 && (d3 += "' +\n((__t = (" + o3 + ")) == null ? '' : __t) +\n'"), f3 = u4 + e2.length, e2;
      }), d3 += "';\n";
      var m3 = Te3.call(n2, "variable") && n2.variable;
      if (m3) {
        if (le2.test(m3)) throw new we3("Invalid `variable` option passed into `_.template`");
      } else d3 = "with (obj) {\n" + d3 + "\n}\n";
      d3 = (s2 ? d3.replace(B2, "") : d3).replace(H2, "$1").replace(W2, "$1;"), d3 = "function(" + (m3 || "obj") + ") {\n" + (m3 ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (a2 ? ", __e = _.escape" : "") + (s2 ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + d3 + "return __p\n}";
      var y3 = Mr2(function() {
        return Se3(u3, g3 + "return " + d3).apply(e, c3);
      });
      if (y3.source = d3, isError(y3)) throw y3;
      return y3;
    }, lodash.times = function(e2, t2) {
      if ((e2 = toInteger(e2)) < 1 || e2 > c2) return [];
      var n2 = p2, o2 = Pt2(e2, p2);
      t2 = getIteratee(t2), e2 -= p2;
      for (var i2 = baseTimes(o2, t2); ++n2 < e2; ) t2(n2);
      return i2;
    }, lodash.toFinite = toFinite, lodash.toInteger = toInteger, lodash.toLength = toLength, lodash.toLower = function(e2) {
      return toString(e2).toLowerCase();
    }, lodash.toNumber = toNumber, lodash.toSafeInteger = function(e2) {
      return e2 ? baseClamp(toInteger(e2), -9007199254740991, c2) : 0 === e2 ? e2 : 0;
    }, lodash.toString = toString, lodash.toUpper = function(e2) {
      return toString(e2).toUpperCase();
    }, lodash.trim = function(t2, n2, o2) {
      if ((t2 = toString(t2)) && (o2 || n2 === e)) return baseTrim(t2);
      if (!t2 || !(n2 = baseToString(n2))) return t2;
      var i2 = stringToArray(t2), a2 = stringToArray(n2);
      return castSlice(i2, charsStartIndex(i2, a2), charsEndIndex(i2, a2) + 1).join("");
    }, lodash.trimEnd = function(t2, n2, o2) {
      if ((t2 = toString(t2)) && (o2 || n2 === e)) return t2.slice(0, trimmedEndIndex(t2) + 1);
      if (!t2 || !(n2 = baseToString(n2))) return t2;
      var i2 = stringToArray(t2);
      return castSlice(i2, 0, charsEndIndex(i2, stringToArray(n2)) + 1).join("");
    }, lodash.trimStart = function(t2, n2, o2) {
      if ((t2 = toString(t2)) && (o2 || n2 === e)) return t2.replace(ne2, "");
      if (!t2 || !(n2 = baseToString(n2))) return t2;
      var i2 = stringToArray(t2);
      return castSlice(i2, charsStartIndex(i2, stringToArray(n2))).join("");
    }, lodash.truncate = function(t2, n2) {
      var o2 = 30, i2 = "...";
      if (isObject(n2)) {
        var a2 = "separator" in n2 ? n2.separator : a2;
        o2 = "length" in n2 ? toInteger(n2.length) : o2, i2 = "omission" in n2 ? baseToString(n2.omission) : i2;
      }
      var s2 = (t2 = toString(t2)).length;
      if (hasUnicode(t2)) {
        var l3 = stringToArray(t2);
        s2 = l3.length;
      }
      if (o2 >= s2) return t2;
      var u3 = o2 - stringSize(i2);
      if (u3 < 1) return i2;
      var c3 = l3 ? castSlice(l3, 0, u3).join("") : t2.slice(0, u3);
      if (a2 === e) return c3 + i2;
      if (l3 && (u3 += c3.length - u3), lr2(a2)) {
        if (t2.slice(u3).search(a2)) {
          var f3, p3 = c3;
          for (a2.global || (a2 = Ee3(a2.source, toString(fe2.exec(a2)) + "g")), a2.lastIndex = 0; f3 = a2.exec(p3); ) var d3 = f3.index;
          c3 = c3.slice(0, d3 === e ? u3 : d3);
        }
      } else if (t2.indexOf(baseToString(a2), u3) != u3) {
        var h3 = c3.lastIndexOf(a2);
        h3 > -1 && (c3 = c3.slice(0, h3));
      }
      return c3 + i2;
    }, lodash.unescape = function(e2) {
      return (e2 = toString(e2)) && V2.test(e2) ? e2.replace(U2, Et2) : e2;
    }, lodash.uniqueId = function(e2) {
      var t2 = ++ze3;
      return toString(e2) + t2;
    }, lodash.upperCase = zr2, lodash.upperFirst = jr2, lodash.each = forEach, lodash.eachRight = forEachRight, lodash.first = head, mixin(lodash, (Kr2 = {}, baseForOwn(lodash, function(e2, t2) {
      Te3.call(lodash.prototype, t2) || (Kr2[t2] = e2);
    }), Kr2), { chain: false }), lodash.VERSION = "4.17.21", arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e2) {
      lodash[e2].placeholder = lodash;
    }), arrayEach(["drop", "take"], function(t2, n2) {
      LazyWrapper.prototype[t2] = function(o2) {
        o2 = o2 === e ? 1 : Rt2(toInteger(o2), 0);
        var i2 = this.__filtered__ && !n2 ? new LazyWrapper(this) : this.clone();
        return i2.__filtered__ ? i2.__takeCount__ = Pt2(o2, i2.__takeCount__) : i2.__views__.push({ size: Pt2(o2, p2), type: t2 + (i2.__dir__ < 0 ? "Right" : "") }), i2;
      }, LazyWrapper.prototype[t2 + "Right"] = function(e2) {
        return this.reverse()[t2](e2).reverse();
      };
    }), arrayEach(["filter", "map", "takeWhile"], function(e2, t2) {
      var n2 = t2 + 1, o2 = 1 == n2 || 3 == n2;
      LazyWrapper.prototype[e2] = function(e3) {
        var t3 = this.clone();
        return t3.__iteratees__.push({ iteratee: getIteratee(e3, 3), type: n2 }), t3.__filtered__ = t3.__filtered__ || o2, t3;
      };
    }), arrayEach(["head", "last"], function(e2, t2) {
      var n2 = "take" + (t2 ? "Right" : "");
      LazyWrapper.prototype[e2] = function() {
        return this[n2](1).value()[0];
      };
    }), arrayEach(["initial", "tail"], function(e2, t2) {
      var n2 = "drop" + (t2 ? "" : "Right");
      LazyWrapper.prototype[e2] = function() {
        return this.__filtered__ ? new LazyWrapper(this) : this[n2](1);
      };
    }), LazyWrapper.prototype.compact = function() {
      return this.filter(identity);
    }, LazyWrapper.prototype.find = function(e2) {
      return this.filter(e2).head();
    }, LazyWrapper.prototype.findLast = function(e2) {
      return this.reverse().find(e2);
    }, LazyWrapper.prototype.invokeMap = baseRest(function(e2, t2) {
      return "function" == typeof e2 ? new LazyWrapper(this) : this.map(function(n2) {
        return baseInvoke(n2, e2, t2);
      });
    }), LazyWrapper.prototype.reject = function(e2) {
      return this.filter(negate(getIteratee(e2)));
    }, LazyWrapper.prototype.slice = function(t2, n2) {
      t2 = toInteger(t2);
      var o2 = this;
      return o2.__filtered__ && (t2 > 0 || n2 < 0) ? new LazyWrapper(o2) : (t2 < 0 ? o2 = o2.takeRight(-t2) : t2 && (o2 = o2.drop(t2)), n2 !== e && (o2 = (n2 = toInteger(n2)) < 0 ? o2.dropRight(-n2) : o2.take(n2 - t2)), o2);
    }, LazyWrapper.prototype.takeRightWhile = function(e2) {
      return this.reverse().takeWhile(e2).reverse();
    }, LazyWrapper.prototype.toArray = function() {
      return this.take(p2);
    }, baseForOwn(LazyWrapper.prototype, function(t2, n2) {
      var o2 = /^(?:filter|find|map|reject)|While$/.test(n2), i2 = /^(?:head|last)$/.test(n2), a2 = lodash[i2 ? "take" + ("last" == n2 ? "Right" : "") : n2], s2 = i2 || /^find/.test(n2);
      a2 && (lodash.prototype[n2] = function() {
        var n3 = this.__wrapped__, l3 = i2 ? [1] : arguments, u3 = n3 instanceof LazyWrapper, c3 = l3[0], f3 = u3 || rr2(n3), interceptor = function(e2) {
          var t3 = a2.apply(lodash, arrayPush([e2], l3));
          return i2 && p3 ? t3[0] : t3;
        };
        f3 && o2 && "function" == typeof c3 && 1 != c3.length && (u3 = f3 = false);
        var p3 = this.__chain__, d3 = !!this.__actions__.length, h3 = s2 && !p3, g3 = u3 && !d3;
        if (!s2 && f3) {
          n3 = g3 ? n3 : new LazyWrapper(this);
          var m3 = t2.apply(n3, l3);
          return m3.__actions__.push({ func: thru, args: [interceptor], thisArg: e }), new LodashWrapper(m3, p3);
        }
        return h3 && g3 ? t2.apply(this, l3) : (m3 = this.thru(interceptor), h3 ? i2 ? m3.value()[0] : m3.value() : m3);
      });
    }), arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(e2) {
      var t2 = Ae3[e2], n2 = /^(?:push|sort|unshift)$/.test(e2) ? "tap" : "thru", o2 = /^(?:pop|shift)$/.test(e2);
      lodash.prototype[e2] = function() {
        var e3 = arguments;
        if (o2 && !this.__chain__) {
          var i2 = this.value();
          return t2.apply(rr2(i2) ? i2 : [], e3);
        }
        return this[n2](function(n3) {
          return t2.apply(rr2(n3) ? n3 : [], e3);
        });
      };
    }), baseForOwn(LazyWrapper.prototype, function(e2, t2) {
      var n2 = lodash[t2];
      if (n2) {
        var o2 = n2.name + "";
        Te3.call(Ut2, o2) || (Ut2[o2] = []), Ut2[o2].push({ name: t2, func: n2 });
      }
    }), Ut2[createHybrid(e, 2).name] = [{ name: "wrapper", func: e }], LazyWrapper.prototype.clone = function() {
      var e2 = new LazyWrapper(this.__wrapped__);
      return e2.__actions__ = copyArray(this.__actions__), e2.__dir__ = this.__dir__, e2.__filtered__ = this.__filtered__, e2.__iteratees__ = copyArray(this.__iteratees__), e2.__takeCount__ = this.__takeCount__, e2.__views__ = copyArray(this.__views__), e2;
    }, LazyWrapper.prototype.reverse = function() {
      if (this.__filtered__) {
        var e2 = new LazyWrapper(this);
        e2.__dir__ = -1, e2.__filtered__ = true;
      } else (e2 = this.clone()).__dir__ *= -1;
      return e2;
    }, LazyWrapper.prototype.value = function() {
      var e2 = this.__wrapped__.value(), t2 = this.__dir__, n2 = rr2(e2), o2 = t2 < 0, i2 = n2 ? e2.length : 0, a2 = function(e3, t3, n3) {
        for (var o3 = -1, i3 = n3.length; ++o3 < i3; ) {
          var a3 = n3[o3], s3 = a3.size;
          switch (a3.type) {
            case "drop":
              e3 += s3;
              break;
            case "dropRight":
              t3 -= s3;
              break;
            case "take":
              t3 = Pt2(t3, e3 + s3);
              break;
            case "takeRight":
              e3 = Rt2(e3, t3 - s3);
          }
        }
        return { start: e3, end: t3 };
      }(0, i2, this.__views__), s2 = a2.start, l3 = a2.end, u3 = l3 - s2, c3 = o2 ? l3 : s2 - 1, f3 = this.__iteratees__, p3 = f3.length, d3 = 0, h3 = Pt2(u3, this.__takeCount__);
      if (!n2 || !o2 && i2 == u3 && h3 == u3) return baseWrapperValue(e2, this.__actions__);
      var g3 = [];
      e: for (; u3-- && d3 < h3; ) {
        for (var m3 = -1, y3 = e2[c3 += t2]; ++m3 < p3; ) {
          var b3 = f3[m3], v3 = b3.iteratee, k3 = b3.type, x3 = v3(y3);
          if (2 == k3) y3 = x3;
          else if (!x3) {
            if (1 == k3) continue e;
            break e;
          }
        }
        g3[d3++] = y3;
      }
      return g3;
    }, lodash.prototype.at = jn2, lodash.prototype.chain = function() {
      return chain(this);
    }, lodash.prototype.commit = function() {
      return new LodashWrapper(this.value(), this.__chain__);
    }, lodash.prototype.next = function() {
      this.__values__ === e && (this.__values__ = toArray(this.value()));
      var t2 = this.__index__ >= this.__values__.length;
      return { done: t2, value: t2 ? e : this.__values__[this.__index__++] };
    }, lodash.prototype.plant = function(t2) {
      for (var n2, o2 = this; o2 instanceof baseLodash; ) {
        var i2 = wrapperClone(o2);
        i2.__index__ = 0, i2.__values__ = e, n2 ? a2.__wrapped__ = i2 : n2 = i2;
        var a2 = i2;
        o2 = o2.__wrapped__;
      }
      return a2.__wrapped__ = t2, n2;
    }, lodash.prototype.reverse = function() {
      var t2 = this.__wrapped__;
      if (t2 instanceof LazyWrapper) {
        var n2 = t2;
        return this.__actions__.length && (n2 = new LazyWrapper(this)), (n2 = n2.reverse()).__actions__.push({ func: thru, args: [reverse], thisArg: e }), new LodashWrapper(n2, this.__chain__);
      }
      return this.thru(reverse);
    }, lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = function() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }, lodash.prototype.first = lodash.prototype.head, Ze3 && (lodash.prototype[Ze3] = function() {
      return this;
    }), lodash;
  }();
  dt2 ? ((dt2.exports = Ot2)._ = Ot2, pt2._ = Ot2) : ft2._ = Ot2;
}.call(vn.exports);
const kn = getDefaultExportFromCjs(vn.exports);
var xn = { exports: {} }, wn = {}, Sn = {};
function createDefaultIsNestedEqual(e) {
  return function(t, n, o, i, a, s, l2) {
    return e(t, n, l2);
  };
}
function createIsCircular(e) {
  return function(t, n, o, i) {
    if (!t || !n || "object" != typeof t || "object" != typeof n) return e(t, n, o, i);
    var a = i.get(t), s = i.get(n);
    if (a && s) return a === n && s === t;
    i.set(t, n), i.set(n, t);
    var l2 = e(t, n, o, i);
    return i.delete(t), i.delete(n), l2;
  };
}
function merge(e, t) {
  var n = {};
  for (var o in e) n[o] = e[o];
  for (var o in t) n[o] = t[o];
  return n;
}
function isPlainObject(e) {
  return e.constructor === Object || null == e.constructor;
}
function isPromiseLike(e) {
  return "function" == typeof e.then;
}
function sameValueZeroEqual(e, t) {
  return e === t || e != e && t != t;
}
Object.defineProperty(Sn, "__esModule", { value: true });
var _n = Object.prototype.toString;
function createComparator(e) {
  var t = e.areArraysEqual, n = e.areDatesEqual, o = e.areMapsEqual, i = e.areObjectsEqual, a = e.areRegExpsEqual, s = e.areSetsEqual, l2 = (0, e.createIsNestedEqual)(comparator);
  function comparator(e2, u2, c2) {
    if (e2 === u2) return true;
    if (!e2 || !u2 || "object" != typeof e2 || "object" != typeof u2) return e2 != e2 && u2 != u2;
    if (isPlainObject(e2) && isPlainObject(u2)) return i(e2, u2, l2, c2);
    var f2 = Array.isArray(e2), p2 = Array.isArray(u2);
    if (f2 || p2) return f2 === p2 && t(e2, u2, l2, c2);
    var d2 = _n.call(e2);
    return d2 === _n.call(u2) && ("[object Date]" === d2 ? n(e2, u2, l2, c2) : "[object RegExp]" === d2 ? a(e2, u2, l2, c2) : "[object Map]" === d2 ? o(e2, u2, l2, c2) : "[object Set]" === d2 ? s(e2, u2, l2, c2) : "[object Object]" === d2 || "[object Arguments]" === d2 ? !isPromiseLike(e2) && !isPromiseLike(u2) && i(e2, u2, l2, c2) : ("[object Boolean]" === d2 || "[object Number]" === d2 || "[object String]" === d2) && sameValueZeroEqual(e2.valueOf(), u2.valueOf()));
  }
  return comparator;
}
function areArraysEqual(e, t, n, o) {
  var i = e.length;
  if (t.length !== i) return false;
  for (; i-- > 0; ) if (!n(e[i], t[i], i, i, e, t, o)) return false;
  return true;
}
var Cn = createIsCircular(areArraysEqual);
function areDatesEqual(e, t) {
  return sameValueZeroEqual(e.valueOf(), t.valueOf());
}
function areMapsEqual(e, t, n, o) {
  var i = e.size === t.size;
  if (!i) return false;
  if (!e.size) return true;
  var a = {}, s = 0;
  return e.forEach(function(l2, u2) {
    if (i) {
      var c2 = false, f2 = 0;
      t.forEach(function(i2, p2) {
        c2 || a[f2] || !(c2 = n(u2, p2, s, f2, e, t, o) && n(l2, i2, u2, p2, e, t, o)) || (a[f2] = true), f2++;
      }), s++, i = c2;
    }
  }), i;
}
var En = createIsCircular(areMapsEqual), On = Object.prototype.hasOwnProperty;
function areObjectsEqual(e, t, n, o) {
  var i, a = Object.keys(e), s = a.length;
  if (Object.keys(t).length !== s) return false;
  for (; s-- > 0; ) {
    if ("_owner" === (i = a[s])) {
      var l2 = !!e.$$typeof, u2 = !!t.$$typeof;
      if ((l2 || u2) && l2 !== u2) return false;
    }
    if (!On.call(t, i) || !n(e[i], t[i], i, i, e, t, o)) return false;
  }
  return true;
}
var In = createIsCircular(areObjectsEqual);
function areRegExpsEqual(e, t) {
  return e.source === t.source && e.flags === t.flags;
}
function areSetsEqual(e, t, n, o) {
  var i = e.size === t.size;
  if (!i) return false;
  if (!e.size) return true;
  var a = {};
  return e.forEach(function(s, l2) {
    if (i) {
      var u2 = false, c2 = 0;
      t.forEach(function(i2, f2) {
        u2 || a[c2] || !(u2 = n(s, i2, l2, f2, e, t, o)) || (a[c2] = true), c2++;
      }), i = u2;
    }
  }), i;
}
var An = createIsCircular(areSetsEqual), Dn = Object.freeze({ areArraysEqual, areDatesEqual, areMapsEqual, areObjectsEqual, areRegExpsEqual, areSetsEqual, createIsNestedEqual: createDefaultIsNestedEqual }), Rn = Object.freeze({ areArraysEqual: Cn, areDatesEqual, areMapsEqual: En, areObjectsEqual: In, areRegExpsEqual, areSetsEqual: An, createIsNestedEqual: createDefaultIsNestedEqual }), Pn = createComparator(Dn);
var Ln = createComparator(merge(Dn, { createIsNestedEqual: function() {
  return sameValueZeroEqual;
} }));
var Tn = createComparator(Rn);
var zn = createComparator(merge(Rn, { createIsNestedEqual: function() {
  return sameValueZeroEqual;
} }));
Sn.circularDeepEqual = function(e, t) {
  return Tn(e, t, /* @__PURE__ */ new WeakMap());
}, Sn.circularShallowEqual = function(e, t) {
  return zn(e, t, /* @__PURE__ */ new WeakMap());
}, Sn.createCustomCircularEqual = function(e) {
  var t = createComparator(merge(Rn, e(Rn)));
  return function(e2, n, o) {
    return void 0 === o && (o = /* @__PURE__ */ new WeakMap()), t(e2, n, o);
  };
}, Sn.createCustomEqual = function(e) {
  return createComparator(merge(Dn, e(Dn)));
}, Sn.deepEqual = function(e, t) {
  return Pn(e, t, void 0);
}, Sn.sameValueZeroEqual = sameValueZeroEqual, Sn.shallowEqual = function(e, t) {
  return Ln(e, t, void 0);
};
const jn = getDefaultExportFromNamespaceIfNotNamed(l);
var Mn = {};
Object.defineProperty(Mn, "__esModule", { value: true }), Mn.bottom = bottom, Mn.childrenEqual = function(e, t) {
  return (0, Fn.deepEqual)(Nn.default.Children.map(e, (e2) => e2?.key), Nn.default.Children.map(t, (e2) => e2?.key)) && (0, Fn.deepEqual)(Nn.default.Children.map(e, (e2) => e2?.props["data-grid"]), Nn.default.Children.map(t, (e2) => e2?.props["data-grid"]));
}, Mn.cloneLayout = cloneLayout, Mn.cloneLayoutItem = cloneLayoutItem, Mn.collides = collides, Mn.compact = compact, Mn.compactItem = compactItem, Mn.compactType = function(e) {
  const { verticalCompact: t, compactType: n } = e || {};
  return false === t ? null : n;
}, Mn.correctBounds = correctBounds, Mn.fastPositionEqual = function(e, t) {
  return e.left === t.left && e.top === t.top && e.width === t.width && e.height === t.height;
}, Mn.fastRGLPropsEqual = void 0, Mn.getAllCollisions = getAllCollisions, Mn.getFirstCollision = getFirstCollision, Mn.getLayoutItem = getLayoutItem, Mn.getStatics = getStatics, Mn.modifyLayout = modifyLayout, Mn.moveElement = moveElement, Mn.moveElementAwayFromCollision = moveElementAwayFromCollision, Mn.noop = void 0, Mn.perc = function(e) {
  return 100 * e + "%";
}, Mn.resizeItemInDirection = function(e, t, n, o) {
  const i = Hn[e];
  return i ? i(t, { ...t, ...n }, o) : n;
}, Mn.setTopLeft = function(e) {
  let { top: t, left: n, width: o, height: i } = e;
  return { top: `${t}px`, left: `${n}px`, width: `${o}px`, height: `${i}px`, position: "absolute" };
}, Mn.setTransform = function(e) {
  let { top: t, left: n, width: o, height: i } = e;
  const a = `translate(${n}px,${t}px)`;
  return { transform: a, WebkitTransform: a, MozTransform: a, msTransform: a, OTransform: a, width: `${o}px`, height: `${i}px`, position: "absolute" };
}, Mn.sortLayoutItems = sortLayoutItems, Mn.sortLayoutItemsByColRow = sortLayoutItemsByColRow, Mn.sortLayoutItemsByRowCol = sortLayoutItemsByRowCol, Mn.synchronizeLayoutWithChildren = function(e, t, n, o, i) {
  e = e || [];
  const a = [];
  Nn.default.Children.forEach(t, (t2) => {
    if (null == t2?.key) return;
    const n2 = getLayoutItem(e, String(t2.key)), o2 = t2.props["data-grid"];
    n2 && null == o2 ? a.push(cloneLayoutItem(n2)) : o2 ? a.push(cloneLayoutItem({ ...o2, i: t2.key })) : a.push(cloneLayoutItem({ w: 1, h: 1, x: 0, y: bottom(a), i: String(t2.key) }));
  });
  const s = correctBounds(a, { cols: n });
  return i ? s : compact(s, o, n);
}, Mn.validateLayout = function(e) {
  let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "Layout";
  const n = ["x", "y", "w", "h"];
  if (!Array.isArray(e)) throw new Error(t + " must be an array!");
  for (let o = 0, i = e.length; o < i; o++) {
    const i2 = e[o];
    for (let e2 = 0; e2 < n.length; e2++) {
      const a = n[e2], s = i2[a];
      if ("number" != typeof s || Number.isNaN(s)) throw new Error(`ReactGridLayout: ${t}[${o}].${a} must be a number! Received: ${s} (${typeof s})`);
    }
    if (void 0 !== i2.i && "string" != typeof i2.i) throw new Error(`ReactGridLayout: ${t}[${o}].i must be a string! Received: ${i2.i} (${typeof i2.i})`);
  }
}, Mn.withLayoutItem = function(e, t, n) {
  let o = getLayoutItem(e, t);
  return o ? (o = n(cloneLayoutItem(o)), [e = modifyLayout(e, o), o]) : [e, null];
};
var qn, Fn = Sn, Nn = (qn = Ge$1) && qn.__esModule ? qn : { default: qn };
function bottom(e) {
  let t, n = 0;
  for (let o = 0, i = e.length; o < i; o++) t = e[o].y + e[o].h, t > n && (n = t);
  return n;
}
function cloneLayout(e) {
  const t = Array(e.length);
  for (let n = 0, o = e.length; n < o; n++) t[n] = cloneLayoutItem(e[n]);
  return t;
}
function modifyLayout(e, t) {
  const n = Array(e.length);
  for (let o = 0, i = e.length; o < i; o++) t.i === e[o].i ? n[o] = t : n[o] = e[o];
  return n;
}
function cloneLayoutItem(e) {
  return { w: e.w, h: e.h, x: e.x, y: e.y, i: e.i, minW: e.minW, maxW: e.maxW, minH: e.minH, maxH: e.maxH, moved: Boolean(e.moved), static: Boolean(e.static), isDraggable: e.isDraggable, isResizable: e.isResizable, resizeHandles: e.resizeHandles, isBounded: e.isBounded };
}
function collides(e, t) {
  return e.i !== t.i && (!(e.x + e.w <= t.x) && (!(e.x >= t.x + t.w) && (!(e.y + e.h <= t.y) && !(e.y >= t.y + t.h))));
}
function compact(e, t, n, o) {
  const i = getStatics(e), a = sortLayoutItems(e, t), s = Array(e.length);
  for (let l2 = 0, u2 = a.length; l2 < u2; l2++) {
    let u3 = cloneLayoutItem(a[l2]);
    u3.static || (u3 = compactItem(i, u3, t, n, a, o), i.push(u3)), s[e.indexOf(a[l2])] = u3, u3.moved = false;
  }
  return s;
}
Mn.fastRGLPropsEqual = function(e, t, n) {
  return e === t || e.className === t.className && n(e.style, t.style) && e.width === t.width && e.autoSize === t.autoSize && e.cols === t.cols && e.draggableCancel === t.draggableCancel && e.draggableHandle === t.draggableHandle && n(e.verticalCompact, t.verticalCompact) && n(e.compactType, t.compactType) && n(e.layout, t.layout) && n(e.margin, t.margin) && n(e.containerPadding, t.containerPadding) && e.rowHeight === t.rowHeight && e.maxRows === t.maxRows && e.isBounded === t.isBounded && e.isDraggable === t.isDraggable && e.isResizable === t.isResizable && e.allowOverlap === t.allowOverlap && e.preventCollision === t.preventCollision && e.useCSSTransforms === t.useCSSTransforms && e.transformScale === t.transformScale && e.isDroppable === t.isDroppable && n(e.resizeHandles, t.resizeHandles) && n(e.resizeHandle, t.resizeHandle) && e.onLayoutChange === t.onLayoutChange && e.onDragStart === t.onDragStart && e.onDrag === t.onDrag && e.onDragStop === t.onDragStop && e.onResizeStart === t.onResizeStart && e.onResize === t.onResize && e.onResizeStop === t.onResizeStop && e.onDrop === t.onDrop && n(e.droppingItem, t.droppingItem) && n(e.innerRef, t.innerRef);
};
const Bn = { x: "w", y: "h" };
function resolveCompactionCollision(e, t, n, o) {
  const i = Bn[o];
  t[o] += 1;
  for (let a = e.map((e2) => e2.i).indexOf(t.i) + 1; a < e.length; a++) {
    const s = e[a];
    if (!s.static) {
      if (s.y > t.y + t.h) break;
      collides(t, s) && resolveCompactionCollision(e, s, n + t[i], o);
    }
  }
  t[o] = n;
}
function compactItem(e, t, n, o, i, a) {
  const s = "horizontal" === n;
  if ("vertical" === n) for (t.y = Math.min(bottom(e), t.y); t.y > 0 && !getFirstCollision(e, t); ) t.y--;
  else if (s) for (; t.x > 0 && !getFirstCollision(e, t); ) t.x--;
  let l2;
  for (; (l2 = getFirstCollision(e, t)) && (null !== n || !a); ) if (s ? resolveCompactionCollision(i, t, l2.x + l2.w, "x") : resolveCompactionCollision(i, t, l2.y + l2.h, "y"), s && t.x + t.w > o) for (t.x = o - t.w, t.y++; t.x > 0 && !getFirstCollision(e, t); ) t.x--;
  return t.y = Math.max(t.y, 0), t.x = Math.max(t.x, 0), t;
}
function correctBounds(e, t) {
  const n = getStatics(e);
  for (let o = 0, i = e.length; o < i; o++) {
    const i2 = e[o];
    if (i2.x + i2.w > t.cols && (i2.x = t.cols - i2.w), i2.x < 0 && (i2.x = 0, i2.w = t.cols), i2.static) for (; getFirstCollision(n, i2); ) i2.y++;
    else n.push(i2);
  }
  return e;
}
function getLayoutItem(e, t) {
  for (let n = 0, o = e.length; n < o; n++) if (e[n].i === t) return e[n];
}
function getFirstCollision(e, t) {
  for (let n = 0, o = e.length; n < o; n++) if (collides(e[n], t)) return e[n];
}
function getAllCollisions(e, t) {
  return e.filter((e2) => collides(e2, t));
}
function getStatics(e) {
  return e.filter((e2) => e2.static);
}
function moveElement(e, t, n, o, i, a, s, l2, u2) {
  if (t.static && true !== t.isDraggable) return e;
  if (t.y === o && t.x === n) return e;
  t.i, t.x, t.y;
  const c2 = t.x, f2 = t.y;
  "number" == typeof n && (t.x = n), "number" == typeof o && (t.y = o), t.moved = true;
  let p2 = sortLayoutItems(e, s);
  ("vertical" === s && "number" == typeof o ? f2 >= o : "horizontal" === s && "number" == typeof n && c2 >= n) && (p2 = p2.reverse());
  const d2 = getAllCollisions(p2, t), h2 = d2.length > 0;
  if (h2 && u2) return cloneLayout(e);
  if (h2 && a) return t.i, t.x = c2, t.y = f2, t.moved = false, e;
  for (let n2 = 0, o2 = d2.length; n2 < o2; n2++) {
    const o3 = d2[n2];
    log$2((t.i, t.x, t.y, o3.i, o3.x, o3.y)), o3.moved || (e = o3.static ? moveElementAwayFromCollision(e, o3, t, i, s) : moveElementAwayFromCollision(e, t, o3, i, s));
  }
  return e;
}
function moveElementAwayFromCollision(e, t, n, o, i, a) {
  const s = "horizontal" === i, l2 = "vertical" === i, u2 = t.static;
  if (o) {
    o = false;
    const a2 = { x: s ? Math.max(t.x - n.w, 0) : n.x, y: l2 ? Math.max(t.y - n.h, 0) : n.y, w: n.w, h: n.h, i: "-1" }, c3 = getFirstCollision(e, a2), f3 = c3 && c3.y + c3.h > t.y, p2 = c3 && t.x + t.w > c3.x;
    if (!c3) return n.i, a2.x, a2.y, moveElement(e, n, s ? a2.x : void 0, l2 ? a2.y : void 0, o, u2, i);
    if (f3 && l2) return moveElement(e, n, void 0, t.y + 1, o, u2, i);
    if (f3 && null == i) return t.y = n.y, n.y = n.y + n.h, e;
    if (p2 && s) return moveElement(e, t, n.x, void 0, o, u2, i);
  }
  const c2 = s ? n.x + 1 : void 0, f2 = l2 ? n.y + 1 : void 0;
  return null == c2 && null == f2 ? e : moveElement(e, n, s ? n.x + 1 : void 0, l2 ? n.y + 1 : void 0, o, u2, i);
}
const constrainWidth = (e, t, n, o) => e + n > o ? t : n, constrainHeight = (e, t, n) => e < 0 ? t : n, constrainLeft = (e) => Math.max(0, e), constrainTop = (e) => Math.max(0, e), resizeNorth = (e, t, n) => {
  let { left: o, height: i, width: a } = t;
  const s = e.top - (i - e.height);
  return { left: o, width: a, height: constrainHeight(s, e.height, i), top: constrainTop(s) };
}, resizeEast = (e, t, n) => {
  let { top: o, left: i, height: a, width: s } = t;
  return { top: o, height: a, width: constrainWidth(e.left, e.width, s, n), left: constrainLeft(i) };
}, resizeWest = (e, t, n) => {
  let { top: o, height: i, width: a } = t;
  const s = e.left - (a - e.width);
  return { height: i, width: s < 0 ? e.width : constrainWidth(e.left, e.width, a, n), top: constrainTop(o), left: constrainLeft(s) };
}, resizeSouth = (e, t, n) => {
  let { top: o, left: i, height: a, width: s } = t;
  return { width: s, left: i, height: constrainHeight(o, e.height, a), top: constrainTop(o) };
}, Hn = { n: resizeNorth, ne: function() {
  return resizeNorth(arguments.length <= 0 ? void 0 : arguments[0], resizeEast(...arguments));
}, e: resizeEast, se: function() {
  return resizeSouth(arguments.length <= 0 ? void 0 : arguments[0], resizeEast(...arguments));
}, s: resizeSouth, sw: function() {
  return resizeSouth(arguments.length <= 0 ? void 0 : arguments[0], resizeWest(...arguments));
}, w: resizeWest, nw: function() {
  return resizeNorth(arguments.length <= 0 ? void 0 : arguments[0], resizeWest(...arguments));
} };
function sortLayoutItems(e, t) {
  return "horizontal" === t ? sortLayoutItemsByColRow(e) : "vertical" === t ? sortLayoutItemsByRowCol(e) : e;
}
function sortLayoutItemsByRowCol(e) {
  return e.slice(0).sort(function(e2, t) {
    return e2.y > t.y || e2.y === t.y && e2.x > t.x ? 1 : e2.y === t.y && e2.x === t.x ? 0 : -1;
  });
}
function sortLayoutItemsByColRow(e) {
  return e.slice(0).sort(function(e2, t) {
    return e2.x > t.x || e2.x === t.x && e2.y > t.y ? 1 : -1;
  });
}
function log$2() {
}
Mn.noop = () => {
};
var Wn = {};
function calcGridColWidth(e) {
  const { margin: t, containerPadding: n, containerWidth: o, cols: i } = e;
  return (o - t[0] * (i - 1) - 2 * n[0]) / i;
}
function calcGridItemWHPx(e, t, n) {
  return Number.isFinite(e) ? Math.round(t * e + Math.max(0, e - 1) * n) : e;
}
function clamp(e, t, n) {
  return Math.max(Math.min(e, n), t);
}
Object.defineProperty(Wn, "__esModule", { value: true }), Wn.calcGridColWidth = calcGridColWidth, Wn.calcGridItemPosition = function(e, t, n, o, i, a) {
  const { margin: s, containerPadding: l2, rowHeight: u2 } = e, c2 = calcGridColWidth(e), f2 = {};
  a && a.resizing ? (f2.width = Math.round(a.resizing.width), f2.height = Math.round(a.resizing.height)) : (f2.width = calcGridItemWHPx(o, c2, s[0]), f2.height = calcGridItemWHPx(i, u2, s[1]));
  a && a.dragging ? (f2.top = Math.round(a.dragging.top), f2.left = Math.round(a.dragging.left)) : a && a.resizing && "number" == typeof a.resizing.top && "number" == typeof a.resizing.left ? (f2.top = Math.round(a.resizing.top), f2.left = Math.round(a.resizing.left)) : (f2.top = Math.round((u2 + s[1]) * n + l2[1]), f2.left = Math.round((c2 + s[0]) * t + l2[0]));
  return f2;
}, Wn.calcGridItemWHPx = calcGridItemWHPx, Wn.calcWH = function(e, t, n, o, i, a) {
  const { margin: s, maxRows: l2, cols: u2, rowHeight: c2 } = e, f2 = calcGridColWidth(e);
  let p2 = Math.round((t + s[0]) / (f2 + s[0])), d2 = Math.round((n + s[1]) / (c2 + s[1])), h2 = clamp(p2, 0, u2 - o), g2 = clamp(d2, 0, l2 - i);
  -1 !== ["sw", "w", "nw"].indexOf(a) && (h2 = clamp(p2, 0, u2));
  -1 !== ["nw", "n", "ne"].indexOf(a) && (g2 = clamp(d2, 0, l2));
  return { w: h2, h: g2 };
}, Wn.calcXY = function(e, t, n, o, i) {
  const { margin: a, containerPadding: s, cols: l2, rowHeight: u2, maxRows: c2 } = e, f2 = calcGridColWidth(e);
  let p2 = Math.round((n - s[0]) / (f2 + a[0])), d2 = Math.round((t - s[1]) / (u2 + a[1]));
  return p2 = clamp(p2, 0, l2 - o), d2 = clamp(d2, 0, c2 - i), { x: p2, y: d2 };
}, Wn.clamp = clamp;
var Un = {}, $n = { exports: {} };
function emptyFunction() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
$n.exports = function() {
  function shim(e2, t, n, o, i, a) {
    if ("SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED" !== a) {
      var s = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
      throw s.name = "Invariant Violation", s;
    }
  }
  function getShim() {
    return shim;
  }
  shim.isRequired = shim;
  var e = { array: shim, bigint: shim, bool: shim, func: shim, number: shim, object: shim, string: shim, symbol: shim, any: shim, arrayOf: getShim, element: shim, elementType: shim, instanceOf: getShim, node: shim, objectOf: getShim, oneOf: getShim, oneOfType: getShim, shape: getShim, exact: getShim, checkPropTypes: emptyFunctionWithReset, resetWarningCache: emptyFunction };
  return e.PropTypes = e, e;
}();
var Vn = $n.exports, Gn = { exports: {} }, Kn = {}, Yn = {}, Xn = {};
Object.defineProperty(Xn, "__esModule", { value: true }), Xn.dontSetMe = function(e, t, n) {
  if (e[t]) return new Error(`Invalid prop ${t} passed to ${n} - do not set this, set it on the child.`);
}, Xn.findInArray = function(e, t) {
  for (let n = 0, o = e.length; n < o; n++) if (t.apply(t, [e[n], n, e])) return e[n];
}, Xn.int = function(e) {
  return parseInt(e, 10);
}, Xn.isFunction = function(e) {
  return "function" == typeof e || "[object Function]" === Object.prototype.toString.call(e);
}, Xn.isNum = function(e) {
  return "number" == typeof e && !isNaN(e);
};
var Qn = {};
function getPrefix() {
  return "";
}
Object.defineProperty(Qn, "__esModule", { value: true }), Qn.browserPrefixToKey = function(e, t) {
  return t ? `${t}${function(e2) {
    let t2 = "", n = true;
    for (let o = 0; o < e2.length; o++) n ? (t2 += e2[o].toUpperCase(), n = false) : "-" === e2[o] ? n = true : t2 += e2[o];
    return t2;
  }(e)}` : e;
}, Qn.browserPrefixToStyle = function(e, t) {
  return t ? `-${t.toLowerCase()}-${e}` : e;
}, Qn.default = void 0, Qn.getPrefix = getPrefix, Qn.default = "", Object.defineProperty(Yn, "__esModule", { value: true }), Yn.addClassName = addClassName, Yn.addEvent = function(e, t, n, o) {
  if (!e) return;
  const i = { capture: true, ...o };
  e.addEventListener ? e.addEventListener(t, n, i) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n;
}, Yn.addUserSelectStyles = function(e) {
  if (!e) return;
  let t = e.getElementById("react-draggable-style-el");
  t || (t = e.createElement("style"), t.type = "text/css", t.id = "react-draggable-style-el", t.innerHTML = ".react-draggable-transparent-selection *::-moz-selection {all: inherit;}\n", t.innerHTML += ".react-draggable-transparent-selection *::selection {all: inherit;}\n", e.getElementsByTagName("head")[0].appendChild(t));
  e.body && addClassName(e.body, "react-draggable-transparent-selection");
}, Yn.createCSSTransform = function(e, t) {
  const n = getTranslation(e, t, "px");
  return { [(0, Jn.browserPrefixToKey)("transform", Jn.default)]: n };
}, Yn.createSVGTransform = function(e, t) {
  return getTranslation(e, t, "");
}, Yn.getTouch = function(e, t) {
  return e.targetTouches && (0, Zn.findInArray)(e.targetTouches, (e2) => t === e2.identifier) || e.changedTouches && (0, Zn.findInArray)(e.changedTouches, (e2) => t === e2.identifier);
}, Yn.getTouchIdentifier = function(e) {
  if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
  if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
}, Yn.getTranslation = getTranslation, Yn.innerHeight = function(e) {
  let t = e.clientHeight;
  const n = e.ownerDocument.defaultView.getComputedStyle(e);
  return t -= (0, Zn.int)(n.paddingTop), t -= (0, Zn.int)(n.paddingBottom), t;
}, Yn.innerWidth = function(e) {
  let t = e.clientWidth;
  const n = e.ownerDocument.defaultView.getComputedStyle(e);
  return t -= (0, Zn.int)(n.paddingLeft), t -= (0, Zn.int)(n.paddingRight), t;
}, Yn.matchesSelector = matchesSelector, Yn.matchesSelectorAndParentsTo = function(e, t, n) {
  let o = e;
  do {
    if (matchesSelector(o, t)) return true;
    if (o === n) return false;
    o = o.parentNode;
  } while (o);
  return false;
}, Yn.offsetXYFromParent = function(e, t, n) {
  const o = t === t.ownerDocument.body ? { left: 0, top: 0 } : t.getBoundingClientRect(), i = (e.clientX + t.scrollLeft - o.left) / n, a = (e.clientY + t.scrollTop - o.top) / n;
  return { x: i, y: a };
}, Yn.outerHeight = function(e) {
  let t = e.clientHeight;
  const n = e.ownerDocument.defaultView.getComputedStyle(e);
  return t += (0, Zn.int)(n.borderTopWidth), t += (0, Zn.int)(n.borderBottomWidth), t;
}, Yn.outerWidth = function(e) {
  let t = e.clientWidth;
  const n = e.ownerDocument.defaultView.getComputedStyle(e);
  return t += (0, Zn.int)(n.borderLeftWidth), t += (0, Zn.int)(n.borderRightWidth), t;
}, Yn.removeClassName = removeClassName, Yn.removeEvent = function(e, t, n, o) {
  if (!e) return;
  const i = { capture: true, ...o };
  e.removeEventListener ? e.removeEventListener(t, n, i) : e.detachEvent ? e.detachEvent("on" + t, n) : e["on" + t] = null;
}, Yn.scheduleRemoveUserSelectStyles = function(e) {
  window.requestAnimationFrame ? window.requestAnimationFrame(() => {
    removeUserSelectStyles(e);
  }) : removeUserSelectStyles(e);
};
var Zn = Xn, Jn = function(e, t) {
  if ("function" == typeof WeakMap) var n = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap();
  return function(e2, t2) {
    if (e2 && e2.__esModule) return e2;
    var i, a, s = { __proto__: null, default: e2 };
    if (null === e2 || "object" != typeof e2 && "function" != typeof e2) return s;
    if (i = n) {
      if (i.has(e2)) return i.get(e2);
      i.set(e2, s);
    }
    for (const t3 in e2) "default" !== t3 && {}.hasOwnProperty.call(e2, t3) && ((a = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, t3)) && (a.get || a.set) ? i(s, t3, a) : s[t3] = e2[t3]);
    return s;
  }(e);
}(Qn);
let er = "";
function matchesSelector(e, t) {
  return er || (er = (0, Zn.findInArray)(["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"], function(t2) {
    return (0, Zn.isFunction)(e[t2]);
  })), !!(0, Zn.isFunction)(e[er]) && e[er](t);
}
function getTranslation(e, t, n) {
  let { x: o, y: i } = e, a = `translate(${o}${n},${i}${n})`;
  if (t) {
    a = `translate(${`${"string" == typeof t.x ? t.x : t.x + n}`}, ${`${"string" == typeof t.y ? t.y : t.y + n}`})` + a;
  }
  return a;
}
function removeUserSelectStyles(e) {
  if (e) try {
    if (e.body && removeClassName(e.body, "react-draggable-transparent-selection"), e.selection) e.selection.empty();
    else {
      const t = (e.defaultView || window).getSelection();
      t && "Caret" !== t.type && t.removeAllRanges();
    }
  } catch (e2) {
  }
}
function addClassName(e, t) {
  e.classList ? e.classList.add(t) : e.className.match(new RegExp(`(?:^|\\s)${t}(?!\\S)`)) || (e.className += ` ${t}`);
}
function removeClassName(e, t) {
  e.classList ? e.classList.remove(t) : e.className = e.className.replace(new RegExp(`(?:^|\\s)${t}(?!\\S)`, "g"), "");
}
var tr = {};
Object.defineProperty(tr, "__esModule", { value: true }), tr.canDragX = function(e) {
  return "both" === e.props.axis || "x" === e.props.axis;
}, tr.canDragY = function(e) {
  return "both" === e.props.axis || "y" === e.props.axis;
}, tr.createCoreData = function(e, t, n) {
  const o = !(0, nr.isNum)(e.lastX), i = findDOMNode(e);
  return o ? { node: i, deltaX: 0, deltaY: 0, lastX: t, lastY: n, x: t, y: n } : { node: i, deltaX: t - e.lastX, deltaY: n - e.lastY, lastX: e.lastX, lastY: e.lastY, x: t, y: n };
}, tr.createDraggableData = function(e, t) {
  const n = e.props.scale;
  return { node: t.node, x: e.state.x + t.deltaX / n, y: e.state.y + t.deltaY / n, deltaX: t.deltaX / n, deltaY: t.deltaY / n, lastX: e.state.x, lastY: e.state.y };
}, tr.getBoundPosition = function(e, t, n) {
  if (!e.props.bounds) return [t, n];
  let { bounds: o } = e.props;
  o = "string" == typeof o ? o : function(e2) {
    return { left: e2.left, top: e2.top, right: e2.right, bottom: e2.bottom };
  }(o);
  const i = findDOMNode(e);
  if ("string" == typeof o) {
    const { ownerDocument: e2 } = i, t2 = e2.defaultView;
    let n2;
    if ("parent" === o) n2 = i.parentNode;
    else {
      n2 = i.getRootNode().querySelector(o);
    }
    if (!(n2 instanceof t2.HTMLElement)) throw new Error('Bounds selector "' + o + '" could not find an element.');
    const a = n2, s = t2.getComputedStyle(i), l2 = t2.getComputedStyle(a);
    o = { left: -i.offsetLeft + (0, nr.int)(l2.paddingLeft) + (0, nr.int)(s.marginLeft), top: -i.offsetTop + (0, nr.int)(l2.paddingTop) + (0, nr.int)(s.marginTop), right: (0, rr.innerWidth)(a) - (0, rr.outerWidth)(i) - i.offsetLeft + (0, nr.int)(l2.paddingRight) - (0, nr.int)(s.marginRight), bottom: (0, rr.innerHeight)(a) - (0, rr.outerHeight)(i) - i.offsetTop + (0, nr.int)(l2.paddingBottom) - (0, nr.int)(s.marginBottom) };
  }
  (0, nr.isNum)(o.right) && (t = Math.min(t, o.right));
  (0, nr.isNum)(o.bottom) && (n = Math.min(n, o.bottom));
  (0, nr.isNum)(o.left) && (t = Math.max(t, o.left));
  (0, nr.isNum)(o.top) && (n = Math.max(n, o.top));
  return [t, n];
}, tr.getControlPosition = function(e, t, n) {
  const o = "number" == typeof t ? (0, rr.getTouch)(e, t) : null;
  if ("number" == typeof t && !o) return null;
  const i = findDOMNode(n), a = n.props.offsetParent || i.offsetParent || i.ownerDocument.body;
  return (0, rr.offsetXYFromParent)(o || e, a, n.props.scale);
}, tr.snapToGrid = function(e, t, n) {
  const o = Math.round(t / e[0]) * e[0], i = Math.round(n / e[1]) * e[1];
  return [o, i];
};
var nr = Xn, rr = Yn;
function findDOMNode(e) {
  const t = e.findDOMNode();
  if (!t) throw new Error("<DraggableCore>: Unmounted during event!");
  return t;
}
var or = {}, ir = {};
Object.defineProperty(ir, "__esModule", { value: true }), ir.default = function() {
}, Object.defineProperty(or, "__esModule", { value: true }), or.default = void 0;
var ar = function(e, t) {
  if ("function" == typeof WeakMap) var n = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap();
  return function(e2, t2) {
    if (e2 && e2.__esModule) return e2;
    var i, a, s = { __proto__: null, default: e2 };
    if (null === e2 || "object" != typeof e2 && "function" != typeof e2) return s;
    if (i = n) {
      if (i.has(e2)) return i.get(e2);
      i.set(e2, s);
    }
    for (const t3 in e2) "default" !== t3 && {}.hasOwnProperty.call(e2, t3) && ((a = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, t3)) && (a.get || a.set) ? i(s, t3, a) : s[t3] = e2[t3]);
    return s;
  }(e);
}(Ge$1), sr = _interopRequireDefault$8(Vn), lr = _interopRequireDefault$8(St$1), ur = Yn, cr = tr, fr = Xn, pr = _interopRequireDefault$8(ir);
function _interopRequireDefault$8(e) {
  return e && e.__esModule ? e : { default: e };
}
function _defineProperty$7(e, t, n) {
  return (t = function(e2) {
    var t2 = function(e3, t3) {
      if ("object" != typeof e3 || !e3) return e3;
      var n2 = e3[Symbol.toPrimitive];
      if (void 0 !== n2) {
        var o = n2.call(e3, t3);
        if ("object" != typeof o) return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t3 ? String : Number)(e3);
    }(e2, "string");
    return "symbol" == typeof t2 ? t2 : t2 + "";
  }(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: true, configurable: true, writable: true }) : e[t] = n, e;
}
const dr = { start: "touchstart", move: "touchmove", stop: "touchend" }, hr = { start: "mousedown", move: "mousemove", stop: "mouseup" };
let gr = hr, mr = class extends ar.Component {
  constructor() {
    super(...arguments), _defineProperty$7(this, "dragging", false), _defineProperty$7(this, "lastX", NaN), _defineProperty$7(this, "lastY", NaN), _defineProperty$7(this, "touchIdentifier", null), _defineProperty$7(this, "mounted", false), _defineProperty$7(this, "handleDragStart", (e) => {
      if (this.props.onMouseDown(e), !this.props.allowAnyClick && "number" == typeof e.button && 0 !== e.button) return false;
      const t = this.findDOMNode();
      if (!t || !t.ownerDocument || !t.ownerDocument.body) throw new Error("<DraggableCore> not mounted on DragStart!");
      const { ownerDocument: n } = t;
      if (this.props.disabled || !(e.target instanceof n.defaultView.Node) || this.props.handle && !(0, ur.matchesSelectorAndParentsTo)(e.target, this.props.handle, t) || this.props.cancel && (0, ur.matchesSelectorAndParentsTo)(e.target, this.props.cancel, t)) return;
      "touchstart" !== e.type || this.props.allowMobileScroll || e.preventDefault();
      const o = (0, ur.getTouchIdentifier)(e);
      this.touchIdentifier = o;
      const i = (0, cr.getControlPosition)(e, o, this);
      if (null == i) return;
      const { x: a, y: s } = i, l2 = (0, cr.createCoreData)(this, a, s);
      (0, pr.default)("DraggableCore: handleDragStart: %j", l2), (0, pr.default)("calling", this.props.onStart);
      false !== this.props.onStart(e, l2) && false !== this.mounted && (this.props.enableUserSelectHack && (0, ur.addUserSelectStyles)(n), this.dragging = true, this.lastX = a, this.lastY = s, (0, ur.addEvent)(n, gr.move, this.handleDrag), (0, ur.addEvent)(n, gr.stop, this.handleDragStop));
    }), _defineProperty$7(this, "handleDrag", (e) => {
      const t = (0, cr.getControlPosition)(e, this.touchIdentifier, this);
      if (null == t) return;
      let { x: n, y: o } = t;
      if (Array.isArray(this.props.grid)) {
        let e2 = n - this.lastX, t2 = o - this.lastY;
        if ([e2, t2] = (0, cr.snapToGrid)(this.props.grid, e2, t2), !e2 && !t2) return;
        n = this.lastX + e2, o = this.lastY + t2;
      }
      const i = (0, cr.createCoreData)(this, n, o);
      (0, pr.default)("DraggableCore: handleDrag: %j", i);
      if (false !== this.props.onDrag(e, i) && false !== this.mounted) this.lastX = n, this.lastY = o;
      else try {
        this.handleDragStop(new MouseEvent("mouseup"));
      } catch (e2) {
        const t2 = document.createEvent("MouseEvents");
        t2.initMouseEvent("mouseup", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null), this.handleDragStop(t2);
      }
    }), _defineProperty$7(this, "handleDragStop", (e) => {
      if (!this.dragging) return;
      const t = (0, cr.getControlPosition)(e, this.touchIdentifier, this);
      if (null == t) return;
      let { x: n, y: o } = t;
      if (Array.isArray(this.props.grid)) {
        let e2 = n - this.lastX || 0, t2 = o - this.lastY || 0;
        [e2, t2] = (0, cr.snapToGrid)(this.props.grid, e2, t2), n = this.lastX + e2, o = this.lastY + t2;
      }
      const i = (0, cr.createCoreData)(this, n, o);
      if (false === this.props.onStop(e, i) || false === this.mounted) return false;
      const a = this.findDOMNode();
      a && this.props.enableUserSelectHack && (0, ur.scheduleRemoveUserSelectStyles)(a.ownerDocument), (0, pr.default)("DraggableCore: handleDragStop: %j", i), this.dragging = false, this.lastX = NaN, this.lastY = NaN, a && ((0, pr.default)("DraggableCore: Removing handlers"), (0, ur.removeEvent)(a.ownerDocument, gr.move, this.handleDrag), (0, ur.removeEvent)(a.ownerDocument, gr.stop, this.handleDragStop));
    }), _defineProperty$7(this, "onMouseDown", (e) => (gr = hr, this.handleDragStart(e))), _defineProperty$7(this, "onMouseUp", (e) => (gr = hr, this.handleDragStop(e))), _defineProperty$7(this, "onTouchStart", (e) => (gr = dr, this.handleDragStart(e))), _defineProperty$7(this, "onTouchEnd", (e) => (gr = dr, this.handleDragStop(e)));
  }
  componentDidMount() {
    this.mounted = true;
    const e = this.findDOMNode();
    e && (0, ur.addEvent)(e, dr.start, this.onTouchStart, { passive: false });
  }
  componentWillUnmount() {
    this.mounted = false;
    const e = this.findDOMNode();
    if (e) {
      const { ownerDocument: t } = e;
      (0, ur.removeEvent)(t, hr.move, this.handleDrag), (0, ur.removeEvent)(t, dr.move, this.handleDrag), (0, ur.removeEvent)(t, hr.stop, this.handleDragStop), (0, ur.removeEvent)(t, dr.stop, this.handleDragStop), (0, ur.removeEvent)(e, dr.start, this.onTouchStart, { passive: false }), this.props.enableUserSelectHack && (0, ur.scheduleRemoveUserSelectStyles)(t);
    }
  }
  findDOMNode() {
    return this.props?.nodeRef ? this.props?.nodeRef?.current : lr.default.findDOMNode(this);
  }
  render() {
    return ar.cloneElement(ar.Children.only(this.props.children), { onMouseDown: this.onMouseDown, onMouseUp: this.onMouseUp, onTouchEnd: this.onTouchEnd });
  }
};
or.default = mr, _defineProperty$7(mr, "displayName", "DraggableCore"), _defineProperty$7(mr, "propTypes", { allowAnyClick: sr.default.bool, allowMobileScroll: sr.default.bool, children: sr.default.node.isRequired, disabled: sr.default.bool, enableUserSelectHack: sr.default.bool, offsetParent: function(e, t) {
  if (e[t] && 1 !== e[t].nodeType) throw new Error("Draggable's offsetParent must be a DOM Node.");
}, grid: sr.default.arrayOf(sr.default.number), handle: sr.default.string, cancel: sr.default.string, nodeRef: sr.default.object, onStart: sr.default.func, onDrag: sr.default.func, onStop: sr.default.func, onMouseDown: sr.default.func, scale: sr.default.number, className: fr.dontSetMe, style: fr.dontSetMe, transform: fr.dontSetMe }), _defineProperty$7(mr, "defaultProps", { allowAnyClick: false, allowMobileScroll: false, disabled: false, enableUserSelectHack: true, onStart: function() {
}, onDrag: function() {
}, onStop: function() {
}, onMouseDown: function() {
}, scale: 1 }), function(e) {
  Object.defineProperty(e, "__esModule", { value: true }), Object.defineProperty(e, "DraggableCore", { enumerable: true, get: function() {
    return f2.default;
  } }), e.default = void 0;
  var t = function(e2, t2) {
    if ("function" == typeof WeakMap) var n2 = /* @__PURE__ */ new WeakMap(), o2 = /* @__PURE__ */ new WeakMap();
    return function(e3, t3) {
      if (e3 && e3.__esModule) return e3;
      var i, a, s2 = { __proto__: null, default: e3 };
      if (null === e3 || "object" != typeof e3 && "function" != typeof e3) return s2;
      if (i = n2) {
        if (i.has(e3)) return i.get(e3);
        i.set(e3, s2);
      }
      for (const t4 in e3) "default" !== t4 && {}.hasOwnProperty.call(e3, t4) && ((a = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e3, t4)) && (a.get || a.set) ? i(s2, t4, a) : s2[t4] = e3[t4]);
      return s2;
    }(e2);
  }(Ge$1), n = _interopRequireDefault2(Vn), o = _interopRequireDefault2(St$1), s = jn, l2 = Yn, u2 = tr, c2 = Xn, f2 = _interopRequireDefault2(or), p2 = _interopRequireDefault2(ir);
  function _interopRequireDefault2(e2) {
    return e2 && e2.__esModule ? e2 : { default: e2 };
  }
  function _extends2() {
    return _extends2 = Object.assign ? Object.assign.bind() : function(e2) {
      for (var t2 = 1; t2 < arguments.length; t2++) {
        var n2 = arguments[t2];
        for (var o2 in n2) ({}).hasOwnProperty.call(n2, o2) && (e2[o2] = n2[o2]);
      }
      return e2;
    }, _extends2.apply(null, arguments);
  }
  function _defineProperty2(e2, t2, n2) {
    return (t2 = function(e3) {
      var t3 = function(e4, t4) {
        if ("object" != typeof e4 || !e4) return e4;
        var n3 = e4[Symbol.toPrimitive];
        if (void 0 !== n3) {
          var o2 = n3.call(e4, t4);
          if ("object" != typeof o2) return o2;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === t4 ? String : Number)(e4);
      }(e3, "string");
      return "symbol" == typeof t3 ? t3 : t3 + "";
    }(t2)) in e2 ? Object.defineProperty(e2, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e2[t2] = n2, e2;
  }
  class Draggable extends t.Component {
    static getDerivedStateFromProps(e2, t2) {
      let { position: n2 } = e2, { prevPropsPosition: o2 } = t2;
      return !n2 || o2 && n2.x === o2.x && n2.y === o2.y ? null : ((0, p2.default)("Draggable: getDerivedStateFromProps %j", { position: n2, prevPropsPosition: o2 }), { x: n2.x, y: n2.y, prevPropsPosition: { ...n2 } });
    }
    constructor(e2) {
      super(e2), _defineProperty2(this, "onDragStart", (e3, t2) => {
        (0, p2.default)("Draggable: onDragStart: %j", t2);
        if (false === this.props.onStart(e3, (0, u2.createDraggableData)(this, t2))) return false;
        this.setState({ dragging: true, dragged: true });
      }), _defineProperty2(this, "onDrag", (e3, t2) => {
        if (!this.state.dragging) return false;
        (0, p2.default)("Draggable: onDrag: %j", t2);
        const n2 = (0, u2.createDraggableData)(this, t2), o2 = { x: n2.x, y: n2.y, slackX: 0, slackY: 0 };
        if (this.props.bounds) {
          const { x: e4, y: t3 } = o2;
          o2.x += this.state.slackX, o2.y += this.state.slackY;
          const [i, a] = (0, u2.getBoundPosition)(this, o2.x, o2.y);
          o2.x = i, o2.y = a, o2.slackX = this.state.slackX + (e4 - o2.x), o2.slackY = this.state.slackY + (t3 - o2.y), n2.x = o2.x, n2.y = o2.y, n2.deltaX = o2.x - this.state.x, n2.deltaY = o2.y - this.state.y;
        }
        if (false === this.props.onDrag(e3, n2)) return false;
        this.setState(o2);
      }), _defineProperty2(this, "onDragStop", (e3, t2) => {
        if (!this.state.dragging) return false;
        if (false === this.props.onStop(e3, (0, u2.createDraggableData)(this, t2))) return false;
        (0, p2.default)("Draggable: onDragStop: %j", t2);
        const n2 = { dragging: false, slackX: 0, slackY: 0 };
        if (Boolean(this.props.position)) {
          const { x: e4, y: t3 } = this.props.position;
          n2.x = e4, n2.y = t3;
        }
        this.setState(n2);
      }), this.state = { dragging: false, dragged: false, x: e2.position ? e2.position.x : e2.defaultPosition.x, y: e2.position ? e2.position.y : e2.defaultPosition.y, prevPropsPosition: { ...e2.position }, slackX: 0, slackY: 0, isElementSVG: false }, !e2.position || e2.onDrag || e2.onStop || console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element.");
    }
    componentDidMount() {
      void 0 !== window.SVGElement && this.findDOMNode() instanceof window.SVGElement && this.setState({ isElementSVG: true });
    }
    componentWillUnmount() {
      this.state.dragging && this.setState({ dragging: false });
    }
    findDOMNode() {
      return this.props?.nodeRef?.current ?? o.default.findDOMNode(this);
    }
    render() {
      const { axis: e2, bounds: n2, children: o2, defaultPosition: i, defaultClassName: a, defaultClassNameDragging: c3, defaultClassNameDragged: p3, position: d2, positionOffset: h2, scale: g2, ...m2 } = this.props;
      let y2 = {}, b2 = null;
      const v2 = !Boolean(d2) || this.state.dragging, k2 = d2 || i, x2 = { x: (0, u2.canDragX)(this) && v2 ? this.state.x : k2.x, y: (0, u2.canDragY)(this) && v2 ? this.state.y : k2.y };
      this.state.isElementSVG ? b2 = (0, l2.createSVGTransform)(x2, h2) : y2 = (0, l2.createCSSTransform)(x2, h2);
      const w2 = (0, s.clsx)(o2.props.className || "", a, { [c3]: this.state.dragging, [p3]: this.state.dragged });
      return t.createElement(f2.default, _extends2({}, m2, { onStart: this.onDragStart, onDrag: this.onDrag, onStop: this.onDragStop }), t.cloneElement(t.Children.only(o2), { className: w2, style: { ...o2.props.style, ...y2 }, transform: b2 }));
    }
  }
  e.default = Draggable, _defineProperty2(Draggable, "displayName", "Draggable"), _defineProperty2(Draggable, "propTypes", { ...f2.default.propTypes, axis: n.default.oneOf(["both", "x", "y", "none"]), bounds: n.default.oneOfType([n.default.shape({ left: n.default.number, right: n.default.number, top: n.default.number, bottom: n.default.number }), n.default.string, n.default.oneOf([false])]), defaultClassName: n.default.string, defaultClassNameDragging: n.default.string, defaultClassNameDragged: n.default.string, defaultPosition: n.default.shape({ x: n.default.number, y: n.default.number }), positionOffset: n.default.shape({ x: n.default.oneOfType([n.default.number, n.default.string]), y: n.default.oneOfType([n.default.number, n.default.string]) }), position: n.default.shape({ x: n.default.number, y: n.default.number }), className: c2.dontSetMe, style: c2.dontSetMe, transform: c2.dontSetMe }), _defineProperty2(Draggable, "defaultProps", { ...f2.default.defaultProps, axis: "both", bounds: false, defaultClassName: "react-draggable", defaultClassNameDragging: "react-draggable-dragging", defaultClassNameDragged: "react-draggable-dragged", defaultPosition: { x: 0, y: 0 }, scale: 1 });
}(Kn);
const { default: yr, DraggableCore: br } = Kn;
Gn.exports = yr, Gn.exports.default = yr, Gn.exports.DraggableCore = br;
var vr, kr = Gn.exports, xr = { exports: {} }, wr = {}, Sr = { cloneElement: function(e, t) {
  t.style && e.props.style && (t.style = _objectSpread$2(_objectSpread$2({}, e.props.style), t.style));
  t.className && e.props.className && (t.className = e.props.className + " " + t.className);
  return _r.default.cloneElement(e, t);
} }, _r = (vr = Ge$1) && vr.__esModule ? vr : { default: vr };
function ownKeys$2(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(t2) {
      return Object.getOwnPropertyDescriptor(e, t2).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function _objectSpread$2(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? ownKeys$2(Object(n), true).forEach(function(t2) {
      _defineProperty$6(e, t2, n[t2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ownKeys$2(Object(n)).forEach(function(t2) {
      Object.defineProperty(e, t2, Object.getOwnPropertyDescriptor(n, t2));
    });
  }
  return e;
}
function _defineProperty$6(e, t, n) {
  return (t = function(e2) {
    var t2 = function(e3, t3) {
      if ("object" != typeof e3 || null === e3) return e3;
      var n2 = e3[Symbol.toPrimitive];
      if (void 0 !== n2) {
        var o = n2.call(e3, t3);
        if ("object" != typeof o) return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t3 ? String : Number)(e3);
    }(e2, "string");
    return "symbol" == typeof t2 ? t2 : String(t2);
  }(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: true, configurable: true, writable: true }) : e[t] = n, e;
}
var Cr = { resizableProps: void 0 }, Er = function(e) {
  return e && e.__esModule ? e : { default: e };
}(Vn);
var Or = { axis: Er.default.oneOf(["both", "x", "y", "none"]), className: Er.default.string, children: Er.default.element.isRequired, draggableOpts: Er.default.shape({ allowAnyClick: Er.default.bool, cancel: Er.default.string, children: Er.default.node, disabled: Er.default.bool, enableUserSelectHack: Er.default.bool, offsetParent: Er.default.node, grid: Er.default.arrayOf(Er.default.number), handle: Er.default.string, nodeRef: Er.default.object, onStart: Er.default.func, onDrag: Er.default.func, onStop: Er.default.func, onMouseDown: Er.default.func, scale: Er.default.number }), height: function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  var o, i = t[0];
  return "both" === i.axis || "y" === i.axis ? (o = Er.default.number).isRequired.apply(o, t) : Er.default.number.apply(Er.default, t);
}, handle: Er.default.oneOfType([Er.default.node, Er.default.func]), handleSize: Er.default.arrayOf(Er.default.number), lockAspectRatio: Er.default.bool, maxConstraints: Er.default.arrayOf(Er.default.number), minConstraints: Er.default.arrayOf(Er.default.number), onResizeStop: Er.default.func, onResizeStart: Er.default.func, onResize: Er.default.func, resizeHandles: Er.default.arrayOf(Er.default.oneOf(["s", "w", "e", "n", "sw", "nw", "se", "ne"])), transformScale: Er.default.number, width: function() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  var o, i = t[0];
  return "both" === i.axis || "x" === i.axis ? (o = Er.default.number).isRequired.apply(o, t) : Er.default.number.apply(Er.default, t);
} };
Cr.resizableProps = Or, wr.__esModule = true, wr.default = void 0;
var Ir = function(e, t) {
  if (e && e.__esModule) return e;
  if (null === e || "object" != typeof e && "function" != typeof e) return { default: e };
  var n = _getRequireWildcardCache$1(t);
  if (n && n.has(e)) return n.get(e);
  var o = {}, i = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var a in e) if ("default" !== a && Object.prototype.hasOwnProperty.call(e, a)) {
    var s = i ? Object.getOwnPropertyDescriptor(e, a) : null;
    s && (s.get || s.set) ? Object.defineProperty(o, a, s) : o[a] = e[a];
  }
  o.default = e, n && n.set(e, o);
  return o;
}(Ge$1), Ar = kr, Dr = Sr, Rr = Cr, Pr = ["children", "className", "draggableOpts", "width", "height", "handle", "handleSize", "lockAspectRatio", "axis", "minConstraints", "maxConstraints", "onResize", "onResizeStop", "onResizeStart", "resizeHandles", "transformScale"];
function _getRequireWildcardCache$1(e) {
  if ("function" != typeof WeakMap) return null;
  var t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
  return (_getRequireWildcardCache$1 = function(e2) {
    return e2 ? n : t;
  })(e);
}
function _extends$3() {
  return _extends$3 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
  }, _extends$3.apply(this, arguments);
}
function ownKeys$1(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(t2) {
      return Object.getOwnPropertyDescriptor(e, t2).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function _objectSpread$1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? ownKeys$1(Object(n), true).forEach(function(t2) {
      _defineProperty$5(e, t2, n[t2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ownKeys$1(Object(n)).forEach(function(t2) {
      Object.defineProperty(e, t2, Object.getOwnPropertyDescriptor(n, t2));
    });
  }
  return e;
}
function _defineProperty$5(e, t, n) {
  return (t = function(e2) {
    var t2 = function(e3, t3) {
      if ("object" != typeof e3 || null === e3) return e3;
      var n2 = e3[Symbol.toPrimitive];
      if (void 0 !== n2) {
        var o = n2.call(e3, t3);
        if ("object" != typeof o) return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t3 ? String : Number)(e3);
    }(e2, "string");
    return "symbol" == typeof t2 ? t2 : String(t2);
  }(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: true, configurable: true, writable: true }) : e[t] = n, e;
}
function _setPrototypeOf$1(e, t) {
  return _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e2, t2) {
    return e2.__proto__ = t2, e2;
  }, _setPrototypeOf$1(e, t);
}
var Lr = function(e) {
  var t, n;
  function Resizable() {
    for (var t2, n2 = arguments.length, o2 = new Array(n2), i = 0; i < n2; i++) o2[i] = arguments[i];
    return (t2 = e.call.apply(e, [this].concat(o2)) || this).handleRefs = {}, t2.lastHandleRect = null, t2.slack = null, t2;
  }
  n = e, (t = Resizable).prototype = Object.create(n.prototype), t.prototype.constructor = t, _setPrototypeOf$1(t, n);
  var o = Resizable.prototype;
  return o.componentWillUnmount = function() {
    this.resetData();
  }, o.resetData = function() {
    this.lastHandleRect = this.slack = null;
  }, o.runConstraints = function(e2, t2) {
    var n2 = this.props, o2 = n2.minConstraints, i = n2.maxConstraints, a = n2.lockAspectRatio;
    if (!o2 && !i && !a) return [e2, t2];
    if (a) {
      var s = this.props.width / this.props.height, l2 = e2 - this.props.width, u2 = t2 - this.props.height;
      Math.abs(l2) > Math.abs(u2 * s) ? t2 = e2 / s : e2 = t2 * s;
    }
    var c2 = e2, f2 = t2, p2 = this.slack || [0, 0], d2 = p2[0], h2 = p2[1];
    return e2 += d2, t2 += h2, o2 && (e2 = Math.max(o2[0], e2), t2 = Math.max(o2[1], t2)), i && (e2 = Math.min(i[0], e2), t2 = Math.min(i[1], t2)), this.slack = [d2 + (c2 - e2), h2 + (f2 - t2)], [e2, t2];
  }, o.resizeHandler = function(e2, t2) {
    var n2 = this;
    return function(o2, i) {
      var a = i.node, s = i.deltaX, l2 = i.deltaY;
      "onResizeStart" === e2 && n2.resetData();
      var u2 = ("both" === n2.props.axis || "x" === n2.props.axis) && "n" !== t2 && "s" !== t2, c2 = ("both" === n2.props.axis || "y" === n2.props.axis) && "e" !== t2 && "w" !== t2;
      if (u2 || c2) {
        var f2 = t2[0], p2 = t2[t2.length - 1], d2 = a.getBoundingClientRect();
        if (null != n2.lastHandleRect) {
          if ("w" === p2) s += d2.left - n2.lastHandleRect.left;
          if ("n" === f2) l2 += d2.top - n2.lastHandleRect.top;
        }
        n2.lastHandleRect = d2, "w" === p2 && (s = -s), "n" === f2 && (l2 = -l2);
        var h2 = n2.props.width + (u2 ? s / n2.props.transformScale : 0), g2 = n2.props.height + (c2 ? l2 / n2.props.transformScale : 0), m2 = n2.runConstraints(h2, g2);
        h2 = m2[0], g2 = m2[1];
        var y2 = h2 !== n2.props.width || g2 !== n2.props.height, b2 = "function" == typeof n2.props[e2] ? n2.props[e2] : null;
        b2 && !("onResize" === e2 && !y2) && (null == o2.persist || o2.persist(), b2(o2, { node: a, size: { width: h2, height: g2 }, handle: t2 })), "onResizeStop" === e2 && n2.resetData();
      }
    };
  }, o.renderResizeHandle = function(e2, t2) {
    var n2 = this.props.handle;
    if (!n2) return Ir.createElement("span", { className: "react-resizable-handle react-resizable-handle-" + e2, ref: t2 });
    if ("function" == typeof n2) return n2(e2, t2);
    var o2 = _objectSpread$1({ ref: t2 }, "string" == typeof n2.type ? {} : { handleAxis: e2 });
    return Ir.cloneElement(n2, o2);
  }, o.render = function() {
    var e2 = this, t2 = this.props, n2 = t2.children, o2 = t2.className, i = t2.draggableOpts;
    t2.width, t2.height, t2.handle, t2.handleSize, t2.lockAspectRatio, t2.axis, t2.minConstraints, t2.maxConstraints, t2.onResize, t2.onResizeStop, t2.onResizeStart;
    var a = t2.resizeHandles;
    t2.transformScale;
    var s = function(e3, t3) {
      if (null == e3) return {};
      var n3, o3, i2 = {}, a2 = Object.keys(e3);
      for (o3 = 0; o3 < a2.length; o3++) n3 = a2[o3], t3.indexOf(n3) >= 0 || (i2[n3] = e3[n3]);
      return i2;
    }(t2, Pr);
    return (0, Dr.cloneElement)(n2, _objectSpread$1(_objectSpread$1({}, s), {}, { className: (o2 ? o2 + " " : "") + "react-resizable", children: [].concat(n2.props.children, a.map(function(t3) {
      var n3, o3 = null != (n3 = e2.handleRefs[t3]) ? n3 : e2.handleRefs[t3] = Ir.createRef();
      return Ir.createElement(Ar.DraggableCore, _extends$3({}, i, { nodeRef: o3, key: "resizableHandle-" + t3, onStop: e2.resizeHandler("onResizeStop", t3), onStart: e2.resizeHandler("onResizeStart", t3), onDrag: e2.resizeHandler("onResize", t3) }), e2.renderResizeHandle(t3, o3));
    })) }));
  }, Resizable;
}(Ir.Component);
wr.default = Lr, Lr.propTypes = Rr.resizableProps, Lr.defaultProps = { axis: "both", handleSize: [20, 20], lockAspectRatio: false, minConstraints: [20, 20], maxConstraints: [1 / 0, 1 / 0], resizeHandles: ["se"], transformScale: 1 };
var Tr = { default: void 0 }, zr = function(e, t) {
  if (e && e.__esModule) return e;
  if (null === e || "object" != typeof e && "function" != typeof e) return { default: e };
  var n = _getRequireWildcardCache(t);
  if (n && n.has(e)) return n.get(e);
  var o = {}, i = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var a in e) if ("default" !== a && Object.prototype.hasOwnProperty.call(e, a)) {
    var s = i ? Object.getOwnPropertyDescriptor(e, a) : null;
    s && (s.get || s.set) ? Object.defineProperty(o, a, s) : o[a] = e[a];
  }
  o.default = e, n && n.set(e, o);
  return o;
}(Ge$1), jr = _interopRequireDefault$5(Vn), Mr = _interopRequireDefault$5(wr), qr = Cr, Fr = ["handle", "handleSize", "onResize", "onResizeStart", "onResizeStop", "draggableOpts", "minConstraints", "maxConstraints", "lockAspectRatio", "axis", "width", "height", "resizeHandles", "style", "transformScale"];
function _interopRequireDefault$5(e) {
  return e && e.__esModule ? e : { default: e };
}
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
  return (_getRequireWildcardCache = function(e2) {
    return e2 ? n : t;
  })(e);
}
function _extends$2() {
  return _extends$2 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
  }, _extends$2.apply(this, arguments);
}
function ownKeys(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    t && (o = o.filter(function(t2) {
      return Object.getOwnPropertyDescriptor(e, t2).enumerable;
    })), n.push.apply(n, o);
  }
  return n;
}
function _objectSpread(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? ownKeys(Object(n), true).forEach(function(t2) {
      _defineProperty$4(e, t2, n[t2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ownKeys(Object(n)).forEach(function(t2) {
      Object.defineProperty(e, t2, Object.getOwnPropertyDescriptor(n, t2));
    });
  }
  return e;
}
function _defineProperty$4(e, t, n) {
  return (t = function(e2) {
    var t2 = function(e3, t3) {
      if ("object" != typeof e3 || null === e3) return e3;
      var n2 = e3[Symbol.toPrimitive];
      if (void 0 !== n2) {
        var o = n2.call(e3, t3);
        if ("object" != typeof o) return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t3 ? String : Number)(e3);
    }(e2, "string");
    return "symbol" == typeof t2 ? t2 : String(t2);
  }(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: true, configurable: true, writable: true }) : e[t] = n, e;
}
function _setPrototypeOf(e, t) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e2, t2) {
    return e2.__proto__ = t2, e2;
  }, _setPrototypeOf(e, t);
}
var Nr = function(e) {
  var t, n;
  function ResizableBox() {
    for (var t2, n2 = arguments.length, o = new Array(n2), i = 0; i < n2; i++) o[i] = arguments[i];
    return (t2 = e.call.apply(e, [this].concat(o)) || this).state = { width: t2.props.width, height: t2.props.height, propsWidth: t2.props.width, propsHeight: t2.props.height }, t2.onResize = function(e2, n3) {
      var o2 = n3.size;
      t2.props.onResize ? (null == e2.persist || e2.persist(), t2.setState(o2, function() {
        return t2.props.onResize && t2.props.onResize(e2, n3);
      })) : t2.setState(o2);
    }, t2;
  }
  return n = e, (t = ResizableBox).prototype = Object.create(n.prototype), t.prototype.constructor = t, _setPrototypeOf(t, n), ResizableBox.getDerivedStateFromProps = function(e2, t2) {
    return t2.propsWidth !== e2.width || t2.propsHeight !== e2.height ? { width: e2.width, height: e2.height, propsWidth: e2.width, propsHeight: e2.height } : null;
  }, ResizableBox.prototype.render = function() {
    var e2 = this.props, t2 = e2.handle, n2 = e2.handleSize;
    e2.onResize;
    var o = e2.onResizeStart, i = e2.onResizeStop, a = e2.draggableOpts, s = e2.minConstraints, l2 = e2.maxConstraints, u2 = e2.lockAspectRatio, c2 = e2.axis;
    e2.width, e2.height;
    var f2 = e2.resizeHandles, p2 = e2.style, d2 = e2.transformScale, h2 = function(e3, t3) {
      if (null == e3) return {};
      var n3, o2, i2 = {}, a2 = Object.keys(e3);
      for (o2 = 0; o2 < a2.length; o2++) n3 = a2[o2], t3.indexOf(n3) >= 0 || (i2[n3] = e3[n3]);
      return i2;
    }(e2, Fr);
    return zr.createElement(Mr.default, { axis: c2, draggableOpts: a, handle: t2, handleSize: n2, height: this.state.height, lockAspectRatio: u2, maxConstraints: l2, minConstraints: s, onResizeStart: o, onResize: this.onResize, onResizeStop: i, resizeHandles: f2, transformScale: d2, width: this.state.width }, zr.createElement("div", _extends$2({}, h2, { style: _objectSpread(_objectSpread({}, p2), {}, { width: this.state.width + "px", height: this.state.height + "px" }) })));
  }, ResizableBox;
}(zr.Component);
Tr.default = Nr, Nr.propTypes = _objectSpread(_objectSpread({}, qr.resizableProps), {}, { children: jr.default.element }), xr.exports = function() {
  throw new Error("Don't instantiate Resizable directly! Use require('react-resizable').Resizable");
}, xr.exports.Resizable = wr.default, xr.exports.ResizableBox = Tr.default;
var Br = xr.exports, Hr = {};
Object.defineProperty(Hr, "__esModule", { value: true }), Hr.resizeHandleType = Hr.resizeHandleAxesType = Hr.default = void 0;
var Wr = _interopRequireDefault$4(Vn), Ur = _interopRequireDefault$4(Ge$1);
function _interopRequireDefault$4(e) {
  return e && e.__esModule ? e : { default: e };
}
const $r = Hr.resizeHandleAxesType = Wr.default.arrayOf(Wr.default.oneOf(["s", "w", "e", "n", "sw", "nw", "se", "ne"])), Vr = Hr.resizeHandleType = Wr.default.oneOfType([Wr.default.node, Wr.default.func]);
Hr.default = { className: Wr.default.string, style: Wr.default.object, width: Wr.default.number, autoSize: Wr.default.bool, cols: Wr.default.number, draggableCancel: Wr.default.string, draggableHandle: Wr.default.string, verticalCompact: function(e) {
  e.verticalCompact;
}, compactType: Wr.default.oneOf(["vertical", "horizontal"]), layout: function(e) {
  var t = e.layout;
  void 0 !== t && Mn.validateLayout(t, "layout");
}, margin: Wr.default.arrayOf(Wr.default.number), containerPadding: Wr.default.arrayOf(Wr.default.number), rowHeight: Wr.default.number, maxRows: Wr.default.number, isBounded: Wr.default.bool, isDraggable: Wr.default.bool, isResizable: Wr.default.bool, allowOverlap: Wr.default.bool, preventCollision: Wr.default.bool, useCSSTransforms: Wr.default.bool, transformScale: Wr.default.number, isDroppable: Wr.default.bool, resizeHandles: $r, resizeHandle: Vr, onLayoutChange: Wr.default.func, onDragStart: Wr.default.func, onDrag: Wr.default.func, onDragStop: Wr.default.func, onResizeStart: Wr.default.func, onResize: Wr.default.func, onResizeStop: Wr.default.func, onDrop: Wr.default.func, droppingItem: Wr.default.shape({ i: Wr.default.string.isRequired, w: Wr.default.number.isRequired, h: Wr.default.number.isRequired }), children: function(e, t) {
  const n = e[t], o = {};
  Ur.default.Children.forEach(n, function(e2) {
    if (null != e2?.key) {
      if (o[e2.key]) throw new Error('Duplicate child key "' + e2.key + '" found! This will cause problems in ReactGridLayout.');
      o[e2.key] = true;
    }
  });
}, innerRef: Wr.default.any }, Object.defineProperty(Un, "__esModule", { value: true }), Un.default = void 0;
var Gr = _interopRequireDefault$3(Ge$1), Kr = St$1, Yr = _interopRequireDefault$3(Vn), Xr = kr, Qr = Br, Zr = Mn, Jr = Wn, eo = Hr, to = _interopRequireDefault$3(jn);
function _interopRequireDefault$3(e) {
  return e && e.__esModule ? e : { default: e };
}
function _defineProperty$3(e, t, n) {
  return (t = function(e2) {
    var t2 = function(e3, t3) {
      if ("object" != typeof e3 || !e3) return e3;
      var n2 = e3[Symbol.toPrimitive];
      if (void 0 !== n2) {
        var o = n2.call(e3, t3);
        if ("object" != typeof o) return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t3 ? String : Number)(e3);
    }(e2, "string");
    return "symbol" == typeof t2 ? t2 : t2 + "";
  }(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: true, configurable: true, writable: true }) : e[t] = n, e;
}
class GridItem extends Gr.default.Component {
  constructor() {
    super(...arguments), _defineProperty$3(this, "state", { resizing: null, dragging: null, className: "" }), _defineProperty$3(this, "elementRef", Gr.default.createRef()), _defineProperty$3(this, "onDragStart", (e, t) => {
      let { node: n } = t;
      const { onDragStart: o, transformScale: i } = this.props;
      if (!o) return;
      const a = { top: 0, left: 0 }, { offsetParent: s } = n;
      if (!s) return;
      const l2 = s.getBoundingClientRect(), u2 = n.getBoundingClientRect(), c2 = u2.left / i, f2 = l2.left / i, p2 = u2.top / i, d2 = l2.top / i;
      a.left = c2 - f2 + s.scrollLeft, a.top = p2 - d2 + s.scrollTop, this.setState({ dragging: a });
      const { x: h2, y: g2 } = (0, Jr.calcXY)(this.getPositionParams(), a.top, a.left, this.props.w, this.props.h);
      return o.call(this, this.props.i, h2, g2, { e, node: n, newPosition: a });
    }), _defineProperty$3(this, "onDrag", (e, t, n) => {
      let { node: o, deltaX: i, deltaY: a } = t;
      const { onDrag: s } = this.props;
      if (!s) return;
      if (!this.state.dragging) throw new Error("onDrag called before onDragStart.");
      let l2 = this.state.dragging.top + a, u2 = this.state.dragging.left + i;
      const { isBounded: c2, i: f2, w: p2, h: d2, containerWidth: h2 } = this.props, g2 = this.getPositionParams();
      if (c2) {
        const { offsetParent: e2 } = o;
        if (e2) {
          const { margin: t2, rowHeight: n2 } = this.props, o2 = e2.clientHeight - (0, Jr.calcGridItemWHPx)(d2, n2, t2[1]);
          l2 = (0, Jr.clamp)(l2, 0, o2);
          const i2 = (0, Jr.calcGridColWidth)(g2), a2 = h2 - (0, Jr.calcGridItemWHPx)(p2, i2, t2[0]);
          u2 = (0, Jr.clamp)(u2, 0, a2);
        }
      }
      const m2 = { top: l2, left: u2 };
      n ? this.setState({ dragging: m2 }) : (0, Kr.flushSync)(() => {
        this.setState({ dragging: m2 });
      });
      const { x: y2, y: b2 } = (0, Jr.calcXY)(g2, l2, u2, p2, d2);
      return s.call(this, f2, y2, b2, { e, node: o, newPosition: m2 });
    }), _defineProperty$3(this, "onDragStop", (e, t) => {
      let { node: n } = t;
      const { onDragStop: o } = this.props;
      if (!o) return;
      if (!this.state.dragging) throw new Error("onDragEnd called before onDragStart.");
      const { w: i, h: a, i: s } = this.props, { left: l2, top: u2 } = this.state.dragging, c2 = { top: u2, left: l2 };
      this.setState({ dragging: null });
      const { x: f2, y: p2 } = (0, Jr.calcXY)(this.getPositionParams(), u2, l2, i, a);
      return o.call(this, s, f2, p2, { e, node: n, newPosition: c2 });
    }), _defineProperty$3(this, "onResizeStop", (e, t, n) => this.onResizeHandler(e, t, n, "onResizeStop")), _defineProperty$3(this, "onResizeStart", (e, t, n) => this.onResizeHandler(e, t, n, "onResizeStart")), _defineProperty$3(this, "onResize", (e, t, n) => this.onResizeHandler(e, t, n, "onResize"));
  }
  shouldComponentUpdate(e, t) {
    if (this.props.children !== e.children) return true;
    if (this.props.droppingPosition !== e.droppingPosition) return true;
    const n = (0, Jr.calcGridItemPosition)(this.getPositionParams(this.props), this.props.x, this.props.y, this.props.w, this.props.h, this.state), o = (0, Jr.calcGridItemPosition)(this.getPositionParams(e), e.x, e.y, e.w, e.h, t);
    return !(0, Zr.fastPositionEqual)(n, o) || this.props.useCSSTransforms !== e.useCSSTransforms;
  }
  componentDidMount() {
    this.moveDroppingItem({});
  }
  componentDidUpdate(e) {
    this.moveDroppingItem(e);
  }
  moveDroppingItem(e) {
    const { droppingPosition: t } = this.props;
    if (!t) return;
    const n = this.elementRef.current;
    if (!n) return;
    const o = e.droppingPosition || { left: 0, top: 0 }, { dragging: i } = this.state, a = i && t.left !== o.left || t.top !== o.top;
    if (i) {
      if (a) {
        const e2 = t.left - i.left, o2 = t.top - i.top;
        this.onDrag(t.e, { node: n, deltaX: e2, deltaY: o2 }, true);
      }
    } else this.onDragStart(t.e, { node: n, deltaX: t.left, deltaY: t.top });
  }
  getPositionParams() {
    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.props;
    return { cols: e.cols, containerPadding: e.containerPadding, containerWidth: e.containerWidth, margin: e.margin, maxRows: e.maxRows, rowHeight: e.rowHeight };
  }
  createStyle(e) {
    const { usePercentages: t, containerWidth: n, useCSSTransforms: o } = this.props;
    let i;
    return o ? i = (0, Zr.setTransform)(e) : (i = (0, Zr.setTopLeft)(e), t && (i.left = (0, Zr.perc)(e.left / n), i.width = (0, Zr.perc)(e.width / n))), i;
  }
  mixinDraggable(e, t) {
    return Gr.default.createElement(Xr.DraggableCore, { disabled: !t, onStart: this.onDragStart, onDrag: this.onDrag, onStop: this.onDragStop, handle: this.props.handle, cancel: ".react-resizable-handle" + (this.props.cancel ? "," + this.props.cancel : ""), scale: this.props.transformScale, nodeRef: this.elementRef }, e);
  }
  curryResizeHandler(e, t) {
    return (n, o) => t(n, o, e);
  }
  mixinResizable(e, t, n) {
    const { cols: o, minW: i, minH: a, maxW: s, maxH: l2, transformScale: u2, resizeHandles: c2, resizeHandle: f2 } = this.props, p2 = this.getPositionParams(), d2 = (0, Jr.calcGridItemPosition)(p2, 0, 0, o, 0).width, h2 = (0, Jr.calcGridItemPosition)(p2, 0, 0, i, a), g2 = (0, Jr.calcGridItemPosition)(p2, 0, 0, s, l2), m2 = [h2.width, h2.height], y2 = [Math.min(g2.width, d2), Math.min(g2.height, 1 / 0)];
    return Gr.default.createElement(Qr.Resizable, { draggableOpts: { disabled: !n }, className: n ? void 0 : "react-resizable-hide", width: t.width, height: t.height, minConstraints: m2, maxConstraints: y2, onResizeStop: this.curryResizeHandler(t, this.onResizeStop), onResizeStart: this.curryResizeHandler(t, this.onResizeStart), onResize: this.curryResizeHandler(t, this.onResize), transformScale: u2, resizeHandles: c2, handle: f2 }, e);
  }
  onResizeHandler(e, t, n, o) {
    let { node: i, size: a, handle: s } = t;
    const l2 = this.props[o];
    if (!l2) return;
    const { x: u2, y: c2, i: f2, maxH: p2, minH: d2, containerWidth: h2 } = this.props, { minW: g2, maxW: m2 } = this.props;
    let y2 = a;
    i && (y2 = (0, Zr.resizeItemInDirection)(s, n, a, h2), (0, Kr.flushSync)(() => {
      this.setState({ resizing: "onResizeStop" === o ? null : y2 });
    }));
    let { w: b2, h: v2 } = (0, Jr.calcWH)(this.getPositionParams(), y2.width, y2.height, u2, c2, s);
    b2 = (0, Jr.clamp)(b2, Math.max(g2, 1), m2), v2 = (0, Jr.clamp)(v2, d2, p2), l2.call(this, f2, b2, v2, { e, node: i, size: y2, handle: s });
  }
  render() {
    const { x: e, y: t, w: n, h: o, isDraggable: i, isResizable: a, droppingPosition: s, useCSSTransforms: l2 } = this.props, u2 = (0, Jr.calcGridItemPosition)(this.getPositionParams(), e, t, n, o, this.state), c2 = Gr.default.Children.only(this.props.children);
    let f2 = Gr.default.cloneElement(c2, { ref: this.elementRef, className: (0, to.default)("react-grid-item", c2.props.className, this.props.className, { static: this.props.static, resizing: Boolean(this.state.resizing), "react-draggable": i, "react-draggable-dragging": Boolean(this.state.dragging), dropping: Boolean(s), cssTransforms: l2 }), style: { ...this.props.style, ...c2.props.style, ...this.createStyle(u2) } });
    return f2 = this.mixinResizable(f2, u2, a), f2 = this.mixinDraggable(f2, i), f2;
  }
}
Un.default = GridItem, _defineProperty$3(GridItem, "propTypes", { children: Yr.default.element, cols: Yr.default.number.isRequired, containerWidth: Yr.default.number.isRequired, rowHeight: Yr.default.number.isRequired, margin: Yr.default.array.isRequired, maxRows: Yr.default.number.isRequired, containerPadding: Yr.default.array.isRequired, x: Yr.default.number.isRequired, y: Yr.default.number.isRequired, w: Yr.default.number.isRequired, h: Yr.default.number.isRequired, minW: function(e, t) {
  const n = e[t];
  return "number" != typeof n ? new Error("minWidth not Number") : n > e.w || n > e.maxW ? new Error("minWidth larger than item width/maxWidth") : void 0;
}, maxW: function(e, t) {
  const n = e[t];
  return "number" != typeof n ? new Error("maxWidth not Number") : n < e.w || n < e.minW ? new Error("maxWidth smaller than item width/minWidth") : void 0;
}, minH: function(e, t) {
  const n = e[t];
  return "number" != typeof n ? new Error("minHeight not Number") : n > e.h || n > e.maxH ? new Error("minHeight larger than item height/maxHeight") : void 0;
}, maxH: function(e, t) {
  const n = e[t];
  return "number" != typeof n ? new Error("maxHeight not Number") : n < e.h || n < e.minH ? new Error("maxHeight smaller than item height/minHeight") : void 0;
}, i: Yr.default.string.isRequired, resizeHandles: eo.resizeHandleAxesType, resizeHandle: eo.resizeHandleType, onDragStop: Yr.default.func, onDragStart: Yr.default.func, onDrag: Yr.default.func, onResizeStop: Yr.default.func, onResizeStart: Yr.default.func, onResize: Yr.default.func, isDraggable: Yr.default.bool.isRequired, isResizable: Yr.default.bool.isRequired, isBounded: Yr.default.bool.isRequired, static: Yr.default.bool, useCSSTransforms: Yr.default.bool.isRequired, transformScale: Yr.default.number, className: Yr.default.string, handle: Yr.default.string, cancel: Yr.default.string, droppingPosition: Yr.default.shape({ e: Yr.default.object.isRequired, left: Yr.default.number.isRequired, top: Yr.default.number.isRequired }) }), _defineProperty$3(GridItem, "defaultProps", { className: "", cancel: "", handle: "", minH: 1, minW: 1, maxH: 1 / 0, maxW: 1 / 0, transformScale: 1 }), Object.defineProperty(wn, "__esModule", { value: true }), wn.default = void 0;
var no = function(e, t) {
  if ("function" == typeof WeakMap) var n = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap();
  return function(e2, t2) {
    if (e2 && e2.__esModule) return e2;
    var i, a, s = { __proto__: null, default: e2 };
    if (null === e2 || "object" != typeof e2 && "function" != typeof e2) return s;
    if (i = n) {
      if (i.has(e2)) return i.get(e2);
      i.set(e2, s);
    }
    for (const t3 in e2) "default" !== t3 && {}.hasOwnProperty.call(e2, t3) && ((a = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, t3)) && (a.get || a.set) ? i(s, t3, a) : s[t3] = e2[t3]);
    return s;
  }(e);
}(Ge$1), ro = Sn, oo = _interopRequireDefault$2(jn), io = Mn, ao = Wn, so = _interopRequireDefault$2(Un), lo = _interopRequireDefault$2(Hr);
function _interopRequireDefault$2(e) {
  return e && e.__esModule ? e : { default: e };
}
function _defineProperty$2(e, t, n) {
  return (t = function(e2) {
    var t2 = function(e3, t3) {
      if ("object" != typeof e3 || !e3) return e3;
      var n2 = e3[Symbol.toPrimitive];
      if (void 0 !== n2) {
        var o = n2.call(e3, t3);
        if ("object" != typeof o) return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t3 ? String : Number)(e3);
    }(e2, "string");
    return "symbol" == typeof t2 ? t2 : t2 + "";
  }(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: true, configurable: true, writable: true }) : e[t] = n, e;
}
const uo = "react-grid-layout";
let co = false;
try {
  co = /firefox/i.test(navigator.userAgent);
} catch (qn2) {
}
let fo = class extends no.Component {
  constructor() {
    super(...arguments), _defineProperty$2(this, "state", { activeDrag: null, layout: (0, io.synchronizeLayoutWithChildren)(this.props.layout, this.props.children, this.props.cols, (0, io.compactType)(this.props), this.props.allowOverlap), mounted: false, oldDragItem: null, oldLayout: null, oldResizeItem: null, resizing: false, droppingDOMNode: null, children: [] }), _defineProperty$2(this, "dragEnterCounter", 0), _defineProperty$2(this, "onDragStart", (e, t, n, o) => {
      let { e: i, node: a } = o;
      const { layout: s } = this.state, l2 = (0, io.getLayoutItem)(s, e);
      if (!l2) return;
      const u2 = { w: l2.w, h: l2.h, x: l2.x, y: l2.y, placeholder: true, i: e };
      return this.setState({ oldDragItem: (0, io.cloneLayoutItem)(l2), oldLayout: s, activeDrag: u2 }), this.props.onDragStart(s, l2, l2, null, i, a);
    }), _defineProperty$2(this, "onDrag", (e, t, n, o) => {
      let { e: i, node: a } = o;
      const { oldDragItem: s } = this.state;
      let { layout: l2 } = this.state;
      const { cols: u2, allowOverlap: c2, preventCollision: f2 } = this.props, p2 = (0, io.getLayoutItem)(l2, e);
      if (!p2) return;
      const d2 = { w: p2.w, h: p2.h, x: p2.x, y: p2.y, placeholder: true, i: e };
      l2 = (0, io.moveElement)(l2, p2, t, n, true, f2, (0, io.compactType)(this.props), u2, c2), this.props.onDrag(l2, s, p2, d2, i, a), this.setState({ layout: c2 ? l2 : (0, io.compact)(l2, (0, io.compactType)(this.props), u2), activeDrag: d2 });
    }), _defineProperty$2(this, "onDragStop", (e, t, n, o) => {
      let { e: i, node: a } = o;
      if (!this.state.activeDrag) return;
      const { oldDragItem: s } = this.state;
      let { layout: l2 } = this.state;
      const { cols: u2, preventCollision: c2, allowOverlap: f2 } = this.props, p2 = (0, io.getLayoutItem)(l2, e);
      if (!p2) return;
      l2 = (0, io.moveElement)(l2, p2, t, n, true, c2, (0, io.compactType)(this.props), u2, f2);
      const d2 = f2 ? l2 : (0, io.compact)(l2, (0, io.compactType)(this.props), u2);
      this.props.onDragStop(d2, s, p2, null, i, a);
      const { oldLayout: h2 } = this.state;
      this.setState({ activeDrag: null, layout: d2, oldDragItem: null, oldLayout: null }), this.onLayoutMaybeChanged(d2, h2);
    }), _defineProperty$2(this, "onResizeStart", (e, t, n, o) => {
      let { e: i, node: a } = o;
      const { layout: s } = this.state, l2 = (0, io.getLayoutItem)(s, e);
      l2 && (this.setState({ oldResizeItem: (0, io.cloneLayoutItem)(l2), oldLayout: this.state.layout, resizing: true }), this.props.onResizeStart(s, l2, l2, null, i, a));
    }), _defineProperty$2(this, "onResize", (e, t, n, o) => {
      let { e: i, node: a, size: s, handle: l2 } = o;
      const { oldResizeItem: u2 } = this.state, { layout: c2 } = this.state, { cols: f2, preventCollision: p2, allowOverlap: d2 } = this.props;
      let h2, g2, m2, y2 = false;
      const [b2, v2] = (0, io.withLayoutItem)(c2, e, (e2) => {
        let o2;
        if (g2 = e2.x, m2 = e2.y, -1 !== ["sw", "w", "nw", "n", "ne"].indexOf(l2) && (-1 !== ["sw", "nw", "w"].indexOf(l2) && (g2 = e2.x + (e2.w - t), t = e2.x !== g2 && g2 < 0 ? e2.w : t, g2 = g2 < 0 ? 0 : g2), -1 !== ["ne", "n", "nw"].indexOf(l2) && (m2 = e2.y + (e2.h - n), n = e2.y !== m2 && m2 < 0 ? e2.h : n, m2 = m2 < 0 ? 0 : m2), y2 = true), p2 && !d2) {
          o2 = (0, io.getAllCollisions)(c2, { ...e2, w: t, h: n, x: g2, y: m2 }).filter((t2) => t2.i !== e2.i).length > 0, o2 && (m2 = e2.y, n = e2.h, g2 = e2.x, t = e2.w, y2 = false);
        }
        return e2.w = t, e2.h = n, e2;
      });
      if (!v2) return;
      if (h2 = b2, y2) {
        const e2 = true;
        h2 = (0, io.moveElement)(b2, v2, g2, m2, e2, this.props.preventCollision, (0, io.compactType)(this.props), f2, d2);
      }
      const k2 = { w: v2.w, h: v2.h, x: v2.x, y: v2.y, static: true, i: e };
      this.props.onResize(h2, u2, v2, k2, i, a), this.setState({ layout: d2 ? h2 : (0, io.compact)(h2, (0, io.compactType)(this.props), f2), activeDrag: k2 });
    }), _defineProperty$2(this, "onResizeStop", (e, t, n, o) => {
      let { e: i, node: a } = o;
      const { layout: s, oldResizeItem: l2 } = this.state, { cols: u2, allowOverlap: c2 } = this.props, f2 = (0, io.getLayoutItem)(s, e), p2 = c2 ? s : (0, io.compact)(s, (0, io.compactType)(this.props), u2);
      this.props.onResizeStop(p2, l2, f2, null, i, a);
      const { oldLayout: d2 } = this.state;
      this.setState({ activeDrag: null, layout: p2, oldResizeItem: null, oldLayout: null, resizing: false }), this.onLayoutMaybeChanged(p2, d2);
    }), _defineProperty$2(this, "onDragOver", (e) => {
      if (e.preventDefault(), e.stopPropagation(), co && !e.nativeEvent.target?.classList.contains(uo)) return false;
      const { droppingItem: t, onDropDragOver: n, margin: o, cols: i, rowHeight: a, maxRows: s, width: l2, containerPadding: u2, transformScale: c2 } = this.props, f2 = n?.(e);
      if (false === f2) return this.state.droppingDOMNode && this.removeDroppingPlaceholder(), false;
      const p2 = { ...t, ...f2 }, { layout: d2 } = this.state, h2 = e.currentTarget.getBoundingClientRect(), g2 = e.clientX - h2.left, m2 = e.clientY - h2.top, y2 = { left: g2 / c2, top: m2 / c2, e };
      if (this.state.droppingDOMNode) {
        if (this.state.droppingPosition) {
          const { left: e2, top: t2 } = this.state.droppingPosition;
          (e2 != g2 || t2 != m2) && this.setState({ droppingPosition: y2 });
        }
      } else {
        const e2 = { cols: i, margin: o, maxRows: s, rowHeight: a, containerWidth: l2, containerPadding: u2 || o }, t2 = (0, ao.calcXY)(e2, m2, g2, p2.w, p2.h);
        this.setState({ droppingDOMNode: no.createElement("div", { key: p2.i }), droppingPosition: y2, layout: [...d2, { ...p2, x: t2.x, y: t2.y, static: false, isDraggable: true }] });
      }
    }), _defineProperty$2(this, "removeDroppingPlaceholder", () => {
      const { droppingItem: e, cols: t } = this.props, { layout: n } = this.state, o = (0, io.compact)(n.filter((t2) => t2.i !== e.i), (0, io.compactType)(this.props), t, this.props.allowOverlap);
      this.setState({ layout: o, droppingDOMNode: null, activeDrag: null, droppingPosition: void 0 });
    }), _defineProperty$2(this, "onDragLeave", (e) => {
      e.preventDefault(), e.stopPropagation(), this.dragEnterCounter--, 0 === this.dragEnterCounter && this.removeDroppingPlaceholder();
    }), _defineProperty$2(this, "onDragEnter", (e) => {
      e.preventDefault(), e.stopPropagation(), this.dragEnterCounter++;
    }), _defineProperty$2(this, "onDrop", (e) => {
      e.preventDefault(), e.stopPropagation();
      const { droppingItem: t } = this.props, { layout: n } = this.state, o = n.find((e2) => e2.i === t.i);
      this.dragEnterCounter = 0, this.removeDroppingPlaceholder(), this.props.onDrop(n, o, e);
    });
  }
  componentDidMount() {
    this.setState({ mounted: true }), this.onLayoutMaybeChanged(this.state.layout, this.props.layout);
  }
  static getDerivedStateFromProps(e, t) {
    let n;
    if (t.activeDrag) return null;
    if ((0, ro.deepEqual)(e.layout, t.propsLayout) && e.compactType === t.compactType ? (0, io.childrenEqual)(e.children, t.children) || (n = t.layout) : n = e.layout, n) {
      return { layout: (0, io.synchronizeLayoutWithChildren)(n, e.children, e.cols, (0, io.compactType)(e), e.allowOverlap), compactType: e.compactType, children: e.children, propsLayout: e.layout };
    }
    return null;
  }
  shouldComponentUpdate(e, t) {
    return this.props.children !== e.children || !(0, io.fastRGLPropsEqual)(this.props, e, ro.deepEqual) || this.state.activeDrag !== t.activeDrag || this.state.mounted !== t.mounted || this.state.droppingPosition !== t.droppingPosition;
  }
  componentDidUpdate(e, t) {
    if (!this.state.activeDrag) {
      const e2 = this.state.layout, n = t.layout;
      this.onLayoutMaybeChanged(e2, n);
    }
  }
  containerHeight() {
    if (!this.props.autoSize) return;
    const e = (0, io.bottom)(this.state.layout), t = this.props.containerPadding ? this.props.containerPadding[1] : this.props.margin[1];
    return e * this.props.rowHeight + (e - 1) * this.props.margin[1] + 2 * t + "px";
  }
  onLayoutMaybeChanged(e, t) {
    t || (t = this.state.layout), (0, ro.deepEqual)(t, e) || this.props.onLayoutChange(e);
  }
  placeholder() {
    const { activeDrag: e } = this.state;
    if (!e) return null;
    const { width: t, cols: n, margin: o, containerPadding: i, rowHeight: a, maxRows: s, useCSSTransforms: l2, transformScale: u2 } = this.props;
    return no.createElement(so.default, { w: e.w, h: e.h, x: e.x, y: e.y, i: e.i, className: "react-grid-placeholder " + (this.state.resizing ? "placeholder-resizing" : ""), containerWidth: t, cols: n, margin: o, containerPadding: i || o, maxRows: s, rowHeight: a, isDraggable: false, isResizable: false, isBounded: false, useCSSTransforms: l2, transformScale: u2 }, no.createElement("div", null));
  }
  processGridItem(e, t) {
    if (!e || !e.key) return;
    const n = (0, io.getLayoutItem)(this.state.layout, String(e.key));
    if (!n) return null;
    const { width: o, cols: i, margin: a, containerPadding: s, rowHeight: l2, maxRows: u2, isDraggable: c2, isResizable: f2, isBounded: p2, useCSSTransforms: d2, transformScale: h2, draggableCancel: g2, draggableHandle: m2, resizeHandles: y2, resizeHandle: b2 } = this.props, { mounted: v2, droppingPosition: k2 } = this.state, x2 = "boolean" == typeof n.isDraggable ? n.isDraggable : !n.static && c2, w2 = "boolean" == typeof n.isResizable ? n.isResizable : !n.static && f2, S2 = n.resizeHandles || y2, _2 = x2 && p2 && false !== n.isBounded;
    return no.createElement(so.default, { containerWidth: o, cols: i, margin: a, containerPadding: s || a, maxRows: u2, rowHeight: l2, cancel: g2, handle: m2, onDragStop: this.onDragStop, onDragStart: this.onDragStart, onDrag: this.onDrag, onResizeStart: this.onResizeStart, onResize: this.onResize, onResizeStop: this.onResizeStop, isDraggable: x2, isResizable: w2, isBounded: _2, useCSSTransforms: d2 && v2, usePercentages: !v2, transformScale: h2, w: n.w, h: n.h, x: n.x, y: n.y, i: n.i, minH: n.minH, minW: n.minW, maxH: n.maxH, maxW: n.maxW, static: n.static, droppingPosition: t ? k2 : void 0, resizeHandles: S2, resizeHandle: b2 }, e);
  }
  render() {
    const { className: e, style: t, isDroppable: n, innerRef: o } = this.props, i = (0, oo.default)(uo, e), a = { height: this.containerHeight(), ...t };
    return no.createElement("div", { ref: o, className: i, style: a, onDrop: n ? this.onDrop : io.noop, onDragLeave: n ? this.onDragLeave : io.noop, onDragEnter: n ? this.onDragEnter : io.noop, onDragOver: n ? this.onDragOver : io.noop }, no.Children.map(this.props.children, (e2) => this.processGridItem(e2)), n && this.state.droppingDOMNode && this.processGridItem(this.state.droppingDOMNode, true), this.placeholder());
  }
};
wn.default = fo, _defineProperty$2(fo, "displayName", "ReactGridLayout"), _defineProperty$2(fo, "propTypes", lo.default), _defineProperty$2(fo, "defaultProps", { autoSize: true, cols: 12, className: "", style: {}, draggableHandle: "", draggableCancel: "", containerPadding: null, rowHeight: 150, maxRows: 1 / 0, layout: [], margin: [10, 10], isBounded: false, isDraggable: true, isResizable: true, allowOverlap: false, isDroppable: false, useCSSTransforms: true, transformScale: 1, verticalCompact: true, compactType: "vertical", preventCollision: false, droppingItem: { i: "__dropping-elem__", h: 1, w: 1 }, resizeHandles: ["se"], onLayoutChange: io.noop, onDragStart: io.noop, onDrag: io.noop, onDragStop: io.noop, onResizeStart: io.noop, onResize: io.noop, onResizeStop: io.noop, onDrop: io.noop, onDropDragOver: io.noop });
var po = {}, ho = {};
Object.defineProperty(ho, "__esModule", { value: true }), ho.findOrGenerateResponsiveLayout = function(e, t, n, o, i, a) {
  if (e[n]) return (0, mo.cloneLayout)(e[n]);
  let s = e[o];
  const l2 = sortBreakpoints(t), u2 = l2.slice(l2.indexOf(n));
  for (let t2 = 0, n2 = u2.length; t2 < n2; t2++) {
    const n3 = u2[t2];
    if (e[n3]) {
      s = e[n3];
      break;
    }
  }
  return s = (0, mo.cloneLayout)(s || []), (0, mo.compact)((0, mo.correctBounds)(s, { cols: i }), a, i);
}, ho.getBreakpointFromWidth = function(e, t) {
  const n = sortBreakpoints(e);
  let o = n[0];
  for (let i = 1, a = n.length; i < a; i++) {
    const a2 = n[i];
    t > e[a2] && (o = a2);
  }
  return o;
}, ho.getColsFromBreakpoint = function(e, t) {
  if (!t[e]) throw new Error("ResponsiveReactGridLayout: `cols` entry for breakpoint " + e + " is missing!");
  return t[e];
}, ho.sortBreakpoints = sortBreakpoints;
var mo = Mn;
function sortBreakpoints(e) {
  return Object.keys(e).sort(function(t, n) {
    return e[t] - e[n];
  });
}
Object.defineProperty(po, "__esModule", { value: true }), po.default = void 0;
var yo = function(e, t) {
  if ("function" == typeof WeakMap) var n = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap();
  return function(e2, t2) {
    if (e2 && e2.__esModule) return e2;
    var i, a, s = { __proto__: null, default: e2 };
    if (null === e2 || "object" != typeof e2 && "function" != typeof e2) return s;
    if (i = n) {
      if (i.has(e2)) return i.get(e2);
      i.set(e2, s);
    }
    for (const t3 in e2) "default" !== t3 && {}.hasOwnProperty.call(e2, t3) && ((a = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, t3)) && (a.get || a.set) ? i(s, t3, a) : s[t3] = e2[t3]);
    return s;
  }(e);
}(Ge$1), bo = _interopRequireDefault$1(Vn), vo = Sn, ko = Mn, xo = ho, wo = _interopRequireDefault$1(wn);
function _interopRequireDefault$1(e) {
  return e && e.__esModule ? e : { default: e };
}
function _extends$1() {
  return _extends$1 = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
  }, _extends$1.apply(null, arguments);
}
function _defineProperty$1(e, t, n) {
  return (t = function(e2) {
    var t2 = function(e3, t3) {
      if ("object" != typeof e3 || !e3) return e3;
      var n2 = e3[Symbol.toPrimitive];
      if (void 0 !== n2) {
        var o = n2.call(e3, t3);
        if ("object" != typeof o) return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t3 ? String : Number)(e3);
    }(e2, "string");
    return "symbol" == typeof t2 ? t2 : t2 + "";
  }(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: true, configurable: true, writable: true }) : e[t] = n, e;
}
const type = (e) => Object.prototype.toString.call(e);
function getIndentationValue(e, t) {
  return null == e ? null : Array.isArray(e) ? e : e[t];
}
class ResponsiveReactGridLayout extends yo.Component {
  constructor() {
    super(...arguments), _defineProperty$1(this, "state", this.generateInitialState()), _defineProperty$1(this, "onLayoutChange", (e) => {
      this.props.onLayoutChange(e, { ...this.props.layouts, [this.state.breakpoint]: e });
    });
  }
  generateInitialState() {
    const { width: e, breakpoints: t, layouts: n, cols: o } = this.props, i = (0, xo.getBreakpointFromWidth)(t, e), a = (0, xo.getColsFromBreakpoint)(i, o), s = false === this.props.verticalCompact ? null : this.props.compactType;
    return { layout: (0, xo.findOrGenerateResponsiveLayout)(n, t, i, i, a, s), breakpoint: i, cols: a };
  }
  static getDerivedStateFromProps(e, t) {
    if (!(0, vo.deepEqual)(e.layouts, t.layouts)) {
      const { breakpoint: n, cols: o } = t;
      return { layout: (0, xo.findOrGenerateResponsiveLayout)(e.layouts, e.breakpoints, n, n, o, e.compactType), layouts: e.layouts };
    }
    return null;
  }
  componentDidUpdate(e) {
    this.props.width == e.width && this.props.breakpoint === e.breakpoint && (0, vo.deepEqual)(this.props.breakpoints, e.breakpoints) && (0, vo.deepEqual)(this.props.cols, e.cols) || this.onWidthChange(e);
  }
  onWidthChange(e) {
    const { breakpoints: t, cols: n, layouts: o, compactType: i } = this.props, a = this.props.breakpoint || (0, xo.getBreakpointFromWidth)(this.props.breakpoints, this.props.width), s = this.state.breakpoint, l2 = (0, xo.getColsFromBreakpoint)(a, n), u2 = { ...o };
    if (s !== a || e.breakpoints !== t || e.cols !== n) {
      s in u2 || (u2[s] = (0, ko.cloneLayout)(this.state.layout));
      let e2 = (0, xo.findOrGenerateResponsiveLayout)(u2, t, a, s, l2, i);
      e2 = (0, ko.synchronizeLayoutWithChildren)(e2, this.props.children, l2, i, this.props.allowOverlap), u2[a] = e2, this.props.onBreakpointChange(a, l2), this.props.onLayoutChange(e2, u2), this.setState({ breakpoint: a, layout: e2, cols: l2 });
    }
    const c2 = getIndentationValue(this.props.margin, a), f2 = getIndentationValue(this.props.containerPadding, a);
    this.props.onWidthChange(this.props.width, c2, l2, f2);
  }
  render() {
    const { breakpoint: e, breakpoints: t, cols: n, layouts: o, margin: i, containerPadding: a, onBreakpointChange: s, onLayoutChange: l2, onWidthChange: u2, ...c2 } = this.props;
    return yo.createElement(wo.default, _extends$1({}, c2, { margin: getIndentationValue(i, this.state.breakpoint), containerPadding: getIndentationValue(a, this.state.breakpoint), onLayoutChange: this.onLayoutChange, layout: this.state.layout, cols: this.state.cols }));
  }
}
po.default = ResponsiveReactGridLayout, _defineProperty$1(ResponsiveReactGridLayout, "propTypes", { breakpoint: bo.default.string, breakpoints: bo.default.object, allowOverlap: bo.default.bool, cols: bo.default.object, margin: bo.default.oneOfType([bo.default.array, bo.default.object]), containerPadding: bo.default.oneOfType([bo.default.array, bo.default.object]), layouts(e, t) {
  if ("[object Object]" !== type(e[t])) throw new Error("Layout property must be an object. Received: " + type(e[t]));
  Object.keys(e[t]).forEach((t2) => {
    if (!(t2 in e.breakpoints)) throw new Error("Each key in layouts must align with a key in breakpoints.");
    (0, ko.validateLayout)(e.layouts[t2], "layouts." + t2);
  });
}, width: bo.default.number.isRequired, onBreakpointChange: bo.default.func, onLayoutChange: bo.default.func, onWidthChange: bo.default.func }), _defineProperty$1(ResponsiveReactGridLayout, "defaultProps", { breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }, cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }, containerPadding: { lg: null, md: null, sm: null, xs: null, xxs: null }, layouts: {}, margin: [10, 10], allowOverlap: false, onBreakpointChange: ko.noop, onLayoutChange: ko.noop, onWidthChange: ko.noop });
var So = {}, _o = { exports: {} };
_o.exports = function() {
  var e = function() {
    if ("undefined" != typeof Map) return Map;
    function getIndex(e2, t2) {
      var n2 = -1;
      return e2.some(function(e3, o) {
        return e3[0] === t2 && (n2 = o, true);
      }), n2;
    }
    return function() {
      function class_1() {
        this.__entries__ = [];
      }
      return Object.defineProperty(class_1.prototype, "size", { get: function() {
        return this.__entries__.length;
      }, enumerable: true, configurable: true }), class_1.prototype.get = function(e2) {
        var t2 = getIndex(this.__entries__, e2), n2 = this.__entries__[t2];
        return n2 && n2[1];
      }, class_1.prototype.set = function(e2, t2) {
        var n2 = getIndex(this.__entries__, e2);
        ~n2 ? this.__entries__[n2][1] = t2 : this.__entries__.push([e2, t2]);
      }, class_1.prototype.delete = function(e2) {
        var t2 = this.__entries__, n2 = getIndex(t2, e2);
        ~n2 && t2.splice(n2, 1);
      }, class_1.prototype.has = function(e2) {
        return !!~getIndex(this.__entries__, e2);
      }, class_1.prototype.clear = function() {
        this.__entries__.splice(0);
      }, class_1.prototype.forEach = function(e2, t2) {
        void 0 === t2 && (t2 = null);
        for (var n2 = 0, o = this.__entries__; n2 < o.length; n2++) {
          var i2 = o[n2];
          e2.call(t2, i2[1], i2[0]);
        }
      }, class_1;
    }();
  }(), t = void 0 !== I$1 && I$1.Math === Math ? I$1 : "undefined" != typeof self && self.Math === Math ? self : Function("return this")(), n = "function" == typeof requestAnimationFrame ? requestAnimationFrame.bind(t) : function(e2) {
    return setTimeout(function() {
      return e2(Date.now());
    }, 1e3 / 60);
  }, i = 2;
  function throttle(e2, t2) {
    var o = false, a2 = false, s2 = 0;
    function resolvePending() {
      o && (o = false, e2()), a2 && proxy();
    }
    function timeoutCallback() {
      n(resolvePending);
    }
    function proxy() {
      var e3 = Date.now();
      if (o) {
        if (e3 - s2 < i) return;
        a2 = true;
      } else o = true, a2 = false, setTimeout(timeoutCallback, t2);
      s2 = e3;
    }
    return proxy;
  }
  var a = 20, s = ["top", "right", "bottom", "left", "width", "height", "size", "weight"], l2 = function() {
    function ResizeObserverController() {
      this.connected_ = false, this.mutationEventsAdded_ = false, this.mutationsObserver_ = null, this.observers_ = [], this.onTransitionEnd_ = this.onTransitionEnd_.bind(this), this.refresh = throttle(this.refresh.bind(this), a);
    }
    return ResizeObserverController.prototype.addObserver = function(e2) {
      ~this.observers_.indexOf(e2) || this.observers_.push(e2), this.connected_ || this.connect_();
    }, ResizeObserverController.prototype.removeObserver = function(e2) {
      var t2 = this.observers_, n2 = t2.indexOf(e2);
      ~n2 && t2.splice(n2, 1), !t2.length && this.connected_ && this.disconnect_();
    }, ResizeObserverController.prototype.refresh = function() {
      this.updateObservers_() && this.refresh();
    }, ResizeObserverController.prototype.updateObservers_ = function() {
      var e2 = this.observers_.filter(function(e3) {
        return e3.gatherActive(), e3.hasActive();
      });
      return e2.forEach(function(e3) {
        return e3.broadcastActive();
      }), e2.length > 0;
    }, ResizeObserverController.prototype.connect_ = function() {
    }, ResizeObserverController.prototype.disconnect_ = function() {
    }, ResizeObserverController.prototype.onTransitionEnd_ = function(e2) {
      var t2 = e2.propertyName, n2 = void 0 === t2 ? "" : t2;
      s.some(function(e3) {
        return !!~n2.indexOf(e3);
      }) && this.refresh();
    }, ResizeObserverController.getInstance = function() {
      return this.instance_ || (this.instance_ = new ResizeObserverController()), this.instance_;
    }, ResizeObserverController.instance_ = null, ResizeObserverController;
  }(), defineConfigurable = function(e2, t2) {
    for (var n2 = 0, o = Object.keys(t2); n2 < o.length; n2++) {
      var i2 = o[n2];
      Object.defineProperty(e2, i2, { value: t2[i2], enumerable: false, writable: false, configurable: true });
    }
    return e2;
  }, getWindowOf = function(e2) {
    return e2 && e2.ownerDocument && e2.ownerDocument.defaultView || t;
  }, u2 = createRectInit(0, 0, 0, 0);
  function getContentRect(e2) {
    return u2;
  }
  function createReadOnlyRect(e2) {
    var t2 = e2.x, n2 = e2.y, o = e2.width, i2 = e2.height, a2 = "undefined" != typeof DOMRectReadOnly ? DOMRectReadOnly : Object, s2 = Object.create(a2.prototype);
    return defineConfigurable(s2, { x: t2, y: n2, width: o, height: i2, top: n2, right: t2 + o, bottom: i2 + n2, left: t2 }), s2;
  }
  function createRectInit(e2, t2, n2, o) {
    return { x: e2, y: t2, width: n2, height: o };
  }
  var c2 = function() {
    function ResizeObservation(e2) {
      this.broadcastWidth = 0, this.broadcastHeight = 0, this.contentRect_ = createRectInit(0, 0, 0, 0), this.target = e2;
    }
    return ResizeObservation.prototype.isActive = function() {
      var e2 = getContentRect(this.target);
      return this.contentRect_ = e2, e2.width !== this.broadcastWidth || e2.height !== this.broadcastHeight;
    }, ResizeObservation.prototype.broadcastRect = function() {
      var e2 = this.contentRect_;
      return this.broadcastWidth = e2.width, this.broadcastHeight = e2.height, e2;
    }, ResizeObservation;
  }(), f2 = /* @__PURE__ */ function() {
    function ResizeObserverEntry(e2, t2) {
      var n2 = createReadOnlyRect(t2);
      defineConfigurable(this, { target: e2, contentRect: n2 });
    }
    return ResizeObserverEntry;
  }(), p2 = function() {
    function ResizeObserverSPI(t2, n2, o) {
      if (this.activeObservations_ = [], this.observations_ = new e(), "function" != typeof t2) throw new TypeError("The callback provided as parameter 1 is not a function.");
      this.callback_ = t2, this.controller_ = n2, this.callbackCtx_ = o;
    }
    return ResizeObserverSPI.prototype.observe = function(e2) {
      if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
      if ("undefined" != typeof Element && Element instanceof Object) {
        if (!(e2 instanceof getWindowOf(e2).Element)) throw new TypeError('parameter 1 is not of type "Element".');
        var t2 = this.observations_;
        t2.has(e2) || (t2.set(e2, new c2(e2)), this.controller_.addObserver(this), this.controller_.refresh());
      }
    }, ResizeObserverSPI.prototype.unobserve = function(e2) {
      if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
      if ("undefined" != typeof Element && Element instanceof Object) {
        if (!(e2 instanceof getWindowOf(e2).Element)) throw new TypeError('parameter 1 is not of type "Element".');
        var t2 = this.observations_;
        t2.has(e2) && (t2.delete(e2), t2.size || this.controller_.removeObserver(this));
      }
    }, ResizeObserverSPI.prototype.disconnect = function() {
      this.clearActive(), this.observations_.clear(), this.controller_.removeObserver(this);
    }, ResizeObserverSPI.prototype.gatherActive = function() {
      var e2 = this;
      this.clearActive(), this.observations_.forEach(function(t2) {
        t2.isActive() && e2.activeObservations_.push(t2);
      });
    }, ResizeObserverSPI.prototype.broadcastActive = function() {
      if (this.hasActive()) {
        var e2 = this.callbackCtx_, t2 = this.activeObservations_.map(function(e3) {
          return new f2(e3.target, e3.broadcastRect());
        });
        this.callback_.call(e2, t2, e2), this.clearActive();
      }
    }, ResizeObserverSPI.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    }, ResizeObserverSPI.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    }, ResizeObserverSPI;
  }(), d2 = "undefined" != typeof WeakMap ? /* @__PURE__ */ new WeakMap() : new e(), h2 = /* @__PURE__ */ function() {
    function ResizeObserver(e2) {
      if (!(this instanceof ResizeObserver)) throw new TypeError("Cannot call a class as a function.");
      if (!arguments.length) throw new TypeError("1 argument required, but only 0 present.");
      var t2 = l2.getInstance(), n2 = new p2(e2, t2, this);
      d2.set(this, n2);
    }
    return ResizeObserver;
  }();
  ["observe", "unobserve", "disconnect"].forEach(function(e2) {
    h2.prototype[e2] = function() {
      var t2;
      return (t2 = d2.get(this))[e2].apply(t2, arguments);
    };
  });
  var g2 = void 0 !== t.ResizeObserver ? t.ResizeObserver : h2;
  return g2;
}();
var Co = _o.exports;
Object.defineProperty(So, "__esModule", { value: true }), So.default = function(e) {
  var t;
  return t = class extends Eo.Component {
    constructor() {
      super(...arguments), _defineProperty(this, "state", { width: 1280 }), _defineProperty(this, "elementRef", Eo.createRef()), _defineProperty(this, "mounted", false), _defineProperty(this, "resizeObserver", void 0);
    }
    componentDidMount() {
      this.mounted = true, this.resizeObserver = new Io.default((e3) => {
        if (this.elementRef.current instanceof HTMLElement) {
          const t2 = e3[0].contentRect.width;
          this.setState({ width: t2 });
        }
      });
      const e2 = this.elementRef.current;
      e2 instanceof HTMLElement && this.resizeObserver.observe(e2);
    }
    componentWillUnmount() {
      this.mounted = false;
      const e2 = this.elementRef.current;
      e2 instanceof HTMLElement && this.resizeObserver.unobserve(e2), this.resizeObserver.disconnect();
    }
    render() {
      const { measureBeforeMount: t2, ...n } = this.props;
      return t2 && !this.mounted ? Eo.createElement("div", { className: (0, Ao.default)(this.props.className, Do), style: this.props.style, ref: this.elementRef }) : Eo.createElement(e, _extends({ innerRef: this.elementRef }, n, this.state));
    }
  }, _defineProperty(t, "defaultProps", { measureBeforeMount: false }), _defineProperty(t, "propTypes", { measureBeforeMount: Oo.default.bool }), t;
};
var Eo = function(e, t) {
  if ("function" == typeof WeakMap) var n = /* @__PURE__ */ new WeakMap(), o = /* @__PURE__ */ new WeakMap();
  return function(e2, t2) {
    if (e2 && e2.__esModule) return e2;
    var i, a, s = { __proto__: null, default: e2 };
    if (null === e2 || "object" != typeof e2 && "function" != typeof e2) return s;
    if (i = n) {
      if (i.has(e2)) return i.get(e2);
      i.set(e2, s);
    }
    for (const t3 in e2) "default" !== t3 && {}.hasOwnProperty.call(e2, t3) && ((a = (i = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, t3)) && (a.get || a.set) ? i(s, t3, a) : s[t3] = e2[t3]);
    return s;
  }(e);
}(Ge$1), Oo = _interopRequireDefault(Vn), Io = _interopRequireDefault(Co), Ao = _interopRequireDefault(jn);
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
    }
    return e;
  }, _extends.apply(null, arguments);
}
function _defineProperty(e, t, n) {
  return (t = function(e2) {
    var t2 = function(e3, t3) {
      if ("object" != typeof e3 || !e3) return e3;
      var n2 = e3[Symbol.toPrimitive];
      if (void 0 !== n2) {
        var o = n2.call(e3, t3);
        if ("object" != typeof o) return o;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === t3 ? String : Number)(e3);
    }(e2, "string");
    return "symbol" == typeof t2 ? t2 : t2 + "";
  }(t)) in e ? Object.defineProperty(e, t, { value: n, enumerable: true, configurable: true, writable: true }) : e[t] = n, e;
}
const Do = "react-grid-layout";
!function(e) {
  e.exports = wn.default, e.exports.utils = Mn, e.exports.calculateUtils = Wn, e.exports.Responsive = po.default, e.exports.Responsive.utils = ho, e.exports.WidthProvider = So.default;
}(xn);
var Ro = xn.exports;
const Po = getDefaultExportFromCjs(Ro);
var Lo = Object.defineProperty;
const To = Ro.WidthProvider(Po);
class BasicLayout extends Qe$1.Component {
  constructor(e) {
    super(e);
    const t = this.generateLayout();
    this.state = { layout: t };
  }
  generateDOM() {
    return kn.map(kn.range(this.props.items), function(e) {
      return ke$1.jsx("div", { style: { background: "grey", opacity: "0.5" }, children: ke$1.jsx("span", { className: "text", children: e }) }, e);
    });
  }
  generateLayout() {
    const e = this.props;
    return kn.map(new Array(e.items), function(t, n) {
      const o = kn.result(e, "y") || Math.ceil(4 * Math.random()) + 1;
      return { x: 2 * n % 6, y: Math.floor(n / 6) * o, w: 2, h: o, i: n.toString() };
    });
  }
  onLayoutChange(e) {
    this.props.onLayoutChange(e);
  }
  render() {
    return ke$1.jsx(To, { layout: this.state.layout, onLayoutChange: this.onLayoutChange, ...this.props, children: this.generateDOM() });
  }
}
((e, t, n) => {
  ((e2, t2, n2) => {
    t2 in e2 ? Lo(e2, t2, { enumerable: true, configurable: true, writable: true, value: n2 }) : e2[t2] = n2;
  })(e, t + "", n);
})(BasicLayout, "defaultProps", { className: "layout", items: 20, rowHeight: 30, onLayoutChange: function() {
}, cols: 6, isDraggable: false, isResizable: false });
export {
  BasicLayout as B,
  Markdown as M,
  remarkGfm as r
};
