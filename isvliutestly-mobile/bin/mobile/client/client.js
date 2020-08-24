"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

require("@babel/polyfill");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactRedux = require("react-redux");

var _cube = _interopRequireDefault(require("@mdf/cube/lib/cube"));

require("./init");

require("@mdf/cube/lib/helpers/polyfill");

var _store = require("../common/store");

var _route = require("../common/route");

var _env = _interopRequireDefault(require("@mdf/cube/lib/helpers/env"));

var _injectCache = require("@mdf/metaui-mobile/lib/helper/injectCache");

require("./client.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { push, replace, goBack } from "react-router-redux";
// import "@mdf/theme-mobile/theme";
var businessContext = require.context("business");

_cube.default.registerBusinessContext(businessContext);

var pathname = window.location.pathname;
var store = (0, _store.configureStore)();
exports.store = store;
var history = (0, _store.createHistory)(store, pathname);
(0, _injectCache.initCache)(_cube.default);
_env.default.INTERACTIVE_MODE = "mobile";
_cube.default.rest.nodeEnv = process.env.NODE_ENV;
_cube.default.rest.interMode = _env.default.INTERACTIVE_MODE;
_cube.default.rest.terminalType = 1; // TODO: 由于 terminalType == 3 (移动)，请求元数据时会丢失 toolbar，所以暂时使用 PC 的。

var getPathWith = function getPathWith(page) {
  var elements = history.location.pathname.split("/").slice(0, 4);

  if (page) {
    elements.push(page);
  }

  return elements.join("/");
};

_cube.default.route = {
  pushPage: function pushPage(route) {
    history.push(route);
  },
  push: function push(page) {
    history.push(getPathWith(page));
  },
  replacePage: function replacePage(route) {
    history.replace(route);
  },
  replace: function replace(page) {
    history.replace(getPathWith(page));
  },
  goBack: function goBack() {
    history.goBack();
  }
};

_cube.default.utils.loading = function (status) {
  store.dispatch({
    type: "PLATFORM_UI_TOGGLE_LOADING_BAR_STATUS",
    status: status
  });
}; // 兼容处理fetch问题


_cube.default.rest.mode = "xhr";

var renderDom = function renderDom() {
  _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_route.Router, {
    history: history
  }))), document.getElementById("container"));
};

renderDom();

if (module.hot) {
  module.hot.accept();
}