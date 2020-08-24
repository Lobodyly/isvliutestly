"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _configureStore = _interopRequireDefault(require("./configureStore.dev"));

var _configureStore2 = _interopRequireDefault(require("./configureStore.prod"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = process.env.NODE_ENV === 'production' ? _configureStore2.default : _configureStore.default;
var _default = store;
exports.default = _default;