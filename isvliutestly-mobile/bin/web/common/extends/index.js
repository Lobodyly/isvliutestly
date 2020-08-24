"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var basic = _interopRequireWildcard(require("./basic"));

var formatter = _interopRequireWildcard(require("./formatter"));

var home = _interopRequireWildcard(require("./home"));

var meta = _interopRequireWildcard(require("./meta"));

var modal = _interopRequireWildcard(require("./modal"));

var popover = _interopRequireWildcard(require("./popover"));

var portal = _interopRequireWildcard(require("./portal"));

var toolbar = _interopRequireWildcard(require("./toolbar"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// home的代码中在引用 redux/modules/home，然而这个文件在web中找不到，之前应该也没引用，所以此处先注释掉
var _default = {
  basic: basic,
  formatter: formatter,
  home: home,
  meta: meta,
  modal: modal,
  popover: popover,
  portal: portal,
  toolbar: toolbar
};
exports.default = _default;