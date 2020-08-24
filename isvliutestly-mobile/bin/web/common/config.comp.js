"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("@mdf/metaui-web-ncc/lib/components/config.comp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ncc 配置
var extendConfig = Object.assign({
  iconfont: true
}, _config.default); // ys 默认配置
// let extendConfig = {};

var _default = extendConfig;
exports.default = _default;