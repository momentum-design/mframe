"use strict";

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = _interopRequireDefault(require("../utiliy/core"));

var _browser = _interopRequireDefault(require("../utiliy/browser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Help = {
  support: {},
  regMsPrefix: /^-ms-/,
  regDashAlpha: /-([\da-z])/gi,
  cssProps: {},
  camelCase: function camelCase(string) {
    return string.replace(this.regMsPrefix, "ms-").replace(this.regDashAlpha, this.fcamelCase);
  },
  fcamelCase: function fcamelCase(all, letter) {
    return letter.toUpperCase();
  },
  upper1st: function upper1st(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  },
  // return a css property mapped to a potentially vendor prefixed property
  vendorPropName: function vendorPropName(style, name) {
    // shortcut for names that are not vendor prefixed
    if (name in style) {
      return name;
    } // check for vendor prefixed names


    var capName = this.upper1st(name),
        origName = name;
    name = _browser.default.CssPrefixes + capName;

    if (name in style) {
      return name;
    }

    return origName;
  },
  test: function test() {
    var div, a, style;
    div = document.createElement("div");
    div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
    a = div.getElementsByTagName("a")[0];
    style = a && a.style;

    if (!style) {
      return;
    }

    style.cssText = "float:left;opacity:.5"; // Verify style float existence
    // (IE uses styleFloat instead of cssFloat)

    this.support.cssFloat = !!style.cssFloat;
    this.support.clearCloneStyle = div.style.backgroundClip === "content-box";
    this.cssProps.float = this.support.cssFloat ? "cssFloat" : "styleFloat";
    this.getComputedStyle = typeof window.getComputedStyle === 'function' ? window.getComputedStyle : document.defaultView.getComputedStyle;
  },
  getPropName: function getPropName(style, origName) {
    return this.cssProps[origName] || (this.cssProps[origName] = this.vendorPropName(style, origName));
  },
  css: function css(dom, key, value) {
    //only deal with dom
    if (!dom || dom.nodeType === 3 || dom.nodeType === 8 || !dom.style) {
      return;
    }

    var origName = this.camelCase(key),
        style = dom.style,
        name = this.getPropName(style, origName);

    if (value !== undefined) {
      //return when null and NaN
      if (value == null || value !== value) {
        return;
      }

      try {
        style[name] = value;
      } catch (e) {}
    } else {
      var v = style[name],
          ret;

      if (v === undefined || v === '') {
        try {
          ret = document.defaultView.getComputedStyle(dom)[name];
        } catch (e) {
          return '';
        }

        return ret;
      } else {
        return style[name];
      }
    }
  }
};
Help.test();
var css = {
  _set: function _set(dom, key, val) {
    Help.css(dom, key, val);
  },
  set: function set(dom, key, val) {
    _core.default.access(dom, key, val, this._set);
  },
  _get: function _get(dom, key) {
    return Help.css(dom, key);
  },
  get: function get(dom, key) {
    return this._get(typeof dom.length === 'number' ? dom[0] : dom, key);
  }
};
var _default = css;
exports.default = _default;