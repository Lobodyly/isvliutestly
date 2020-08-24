"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _NotFound = _interopRequireDefault(require("@mdf/metaui-web/lib/components/errors/NotFound"));

var _DynamicView = _interopRequireDefault(require("@mdf/metaui-web/lib/components/portal/DynamicView"));

var _bussinessMenu = _interopRequireDefault(require("./bussinessMenu"));

var _DebugScript = _interopRequireDefault(require("./DebugScript"));

var _config = _interopRequireDefault(require("./config.route"));

var _axios = _interopRequireDefault(require("axios"));

var _config2 = require("../config.env");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var renderRoutes = function renderRoutes(routes) {
  if (process.env.PREFIX) console.log('process.env.PREFIX', process.env.PREFIX);
  return routes.map(function (route, index) {
    if (Array.isArray(route.routes) && route.routes.length > 0) {
      return /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
        key: index,
        exact: route.exact,
        component: route.component,
        path: route.path
      }, renderRoutes(route.routes));
    } else {
      return /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
        key: index,
        exact: route.exact,
        component: route.component,
        path: route.path
      });
    }
  });
};

var Router = /*#__PURE__*/function (_React$Component) {
  _inherits(Router, _React$Component);

  var _super = _createSuper(Router);

  function Router(props) {
    var _this;

    _classCallCheck(this, Router);

    _this = _super.call(this, props);
    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(Router, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var code = "hfihskfhkshfkjhkf";

      if (code) {
        _axios.default.get("".concat(_config2.HTTP_SERVICE_BASEURL, "/sso/auth/code"), {
          params: {
            yhtAccessTokenCipher: token,
            userId: yht_userid,
            tenantId: tenant_id
          },
          withCredentials: true
        }).then(function (response) {
          console.log(response);

          _this2.setState({
            visible: true
          });
        }).catch(function (error) {
          console.log(error);

          _this2.setState({
            visible: true
          });
        });
      } else {
        this.setState({
          visible: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.state.visible ? /*#__PURE__*/_react.default.createElement(_reactRouter.Route, null, /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
        path: process.env.__CLIENT__ ? window._baseUrl || '' : process.env.PREFIX || ''
      }, renderRoutes(_config.default), /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
        path: "menu",
        component: _bussinessMenu.default
      }), /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
        path: "platform/:menuurl",
        component: _DynamicView.default
      }), /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
        path: "meta",
        component: _DebugScript.default
      }, /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
        path: ":billtype/:billno",
        component: _DynamicView.default
      }), /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
        path: ":billtype/:billno/:billid",
        component: _DynamicView.default
      })), /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
        path: "*",
        component: _NotFound.default
      }))) : /*#__PURE__*/_react.default.createElement("div", null, "loading");
    }
  }]);

  return Router;
}(_react.default.Component);

exports.default = Router;