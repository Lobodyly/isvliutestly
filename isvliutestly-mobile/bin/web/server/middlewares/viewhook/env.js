"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var env = {
  HTTP_SCRIPT_BASEURL: "http://".concat(localPath, ":").concat(process.env.SCRIPT_PORT || 3004, "/static"),
  HTTP_SCRIPT_SUFFIX: '',
  STATIC_RANDOM_SUFFIX: Math.random()
};
var _default = env;
exports.default = _default;