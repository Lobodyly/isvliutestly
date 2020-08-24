"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _immutable = _interopRequireDefault(require("immutable"));

var _reactRouter = require("react-router");

var _cube = _interopRequireDefault(require("@mdf/cube/lib/cube"));

require("@mdf/cube/lib/helpers/polyfill");

var _UretailNotice = require("@mdf/metaui-web/lib/components/common/UretailNotice");

var _Isomorph = _interopRequireDefault(require("../common/redux/Isomorph"));

var _util = require("@mdf/cube/lib/helpers/util");

var _routes = _interopRequireDefault(require("../common/routes"));

var _user = require("@mdf/metaui-web/lib/redux/user");

require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// import '@mdf/theme/theme-default/index.jsx'
_cube.default.rest.nodeEnv = process.env.NODE_ENV; // cb.register(RegisterComp);

var finalState = {};

var _ref = window.__INITIAL_STATE__ || {},
    routing = _ref.routing,
    reducers = _objectWithoutProperties(_ref, ["routing"]);

if (reducers) {
  for (var p in reducers) {
    var reducer = reducers[p];
    finalState[p] = _immutable.default.fromJS(reducer);
  }
}

var rootElement = document.getElementById('container');
var _window$location = window.location,
    pathname = _window$location.pathname,
    search = _window$location.search,
    hash = _window$location.hash;
var location = "".concat(pathname).concat(search).concat(hash);

var store = _Isomorph.default.createStore('index', finalState);

var history = _Isomorph.default.createHistory(store, pathname);

var render = function render() {
  (0, _reactRouter.match)({
    routes: _routes.default,
    location: location
  }, function (error, redirectLocation, renderProps) {
    _reactDom.default.render( /*#__PURE__*/_react.default.createElement(_Isomorph.default, {
      store: store,
      history: history,
      routes: _routes.default
    }), rootElement);
  });
};

_cube.default.utils.confirm = (0, _UretailNotice.UretailConfirm)();
_cube.default.utils.alert = (0, _UretailNotice.UretailAlert)();

_cube.default.route.redirectLoginPage = function (confirm) {
  if (confirm === false) {
    store.dispatch((0, _user.logout)(history));
    return;
  }

  _cube.default.utils.confirm('登录令牌失效，即将跳转登陆页面？', function () {
    store.dispatch((0, _user.logout)(history));
  }, function () {
    _cube.default.utils.loadingControl.end();
  });
};

_cube.default.route.pushPage = function (route) {
  history.push(route);
};

if (navigator.userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)) _cube.default.rest.device = 'android';
var config = {
  url: 'test/fetch',
  method: 'GET',
  options: {
    uniform: false,
    token: false
  }
};
(0, _util.proxy)(config).then(function (json) {
  if (json.code === 500) _cube.default.rest.mode = 'xhr';

  if (pathname !== '/login') {
    store.dispatch({
      type: 'PLATFORM_UI_USER_INIT'
    });
    store.dispatch((0, _user.init)());
  }

  render();
});