"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _App = _interopRequireDefault(require("../containers/App"));

var _axios = _interopRequireDefault(require("axios"));

var _mtlJsSdk = _interopRequireDefault(require("mtl-js-sdk"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getUrlParams = function getUrlParams() {
  var res = {};
  var serach = window.location.search;

  if (!serach) {
    serach = window.location.href.split("?").pop();
  }

  var str = decodeURIComponent(serach);
  str = str.trim().replace(/^[?#&]/, "");

  if (!str) {
    return res;
  }

  str.split("&").forEach(function (strItem) {
    if (strItem) {
      var parts = strItem.split("=");
      var partKey = parts[0],
          partValue = parts[1] || "";
      res[partKey] = partValue;
    }
  });
  return res;
};

var Router = /*#__PURE__*/function (_React$Component) {
  _inherits(Router, _React$Component);

  var _super = _createSuper(Router);

  function Router() {
    var _this;

    _classCallCheck(this, Router);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      loading: true
    });

    return _this;
  }

  _createClass(Router, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _getUrlParams = getUrlParams(),
          s = _getUrlParams.s;

      if (_mtlJsSdk.default.upesn && _mtlJsSdk.default.upesn.getUserYHTInfo) {
        _mtlJsSdk.default.upesn.settingNavBar({
          hide: s,
          success: function success(res) {
            if (s == 1) {
              _mtlJsSdk.default.upesn.settingNavBar = undefined;
            }
          },
          fail: function fail(err) {
            console.log("settingNavBar error", err.message);
          }
        });

        _mtlJsSdk.default.upesn.getUserYHTInfo({
          success: function success(result) {
            var yhtToken = result.yhtToken,
                yht_access_token = result.yht_access_token,
                yht_userid = result.yht_userid,
                tenant_id = result.tenant_id;
            var billno = window.location.pathname.split('/')[3]; //单据固定URL  view/billtype/billno

            var token = yhtToken || yht_access_token;

            if (token && yht_userid && tenant_id) {
              _axios.default.get("/mobile/app/index/yht/token/context", {
                params: {
                  yhtAccessTokenCipher: token,
                  userId: yht_userid,
                  tenantId: tenant_id,
                  billno: billno
                },
                withCredentials: true
              }).then(function (response) {
                var _response$data, _response$data$data;

                console.log(response);

                if (((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.mobileExists) || (response === null || response === void 0 ? void 0 : (_response$data$data = response.data.data) === null || _response$data$data === void 0 ? void 0 : _response$data$data.mobileExists)) {
                  //移动端返回结果多一层
                  _this2.setState({
                    loading: false
                  });
                } else {
                  cb.utils.confirm("暂无移动模版", function () {
                    return _mtlJsSdk.default.navigateBack();
                  }, function () {
                    return _mtlJsSdk.default.navigateBack();
                  });
                }
              }).catch(function (error) {
                console.log(error);

                _this2.setState({
                  loading: false
                });
              });
            } else {
              _this2.setState({
                loading: false
              });
            }
          },
          fail: function fail(err) {
            console.log(err);

            _this2.setState({
              loading: false
            });
          }
        });
      } else {
        var userAgent = window.navigator.userAgent;

        if (userAgent.indexOf("miniProgram") !== -1 || userAgent.indexOf("wxwork") !== -1 || userAgent.indexOf("mtlAndroid") !== -1 || userAgent.indexOf("Android_") !== -1 || userAgent.indexOf("mtlIOS") !== -1 || userAgent.indexOf("QYios") !== -1) {
          // TODO: 微信小程序演示用
          _axios.default.get("https://mock.yonyoucloud.com/mock/6672/mockcookie").then(function (response) {
            var data = response.data;
            Object.values(data).forEach(function (item) {
              document.cookie = item;
            });

            _this2.setState({
              loading: false
            });
          }).catch(function (error) {
            console.log(error);

            _this2.setState({
              loading: false
            });
          });
        } else {
          this.setState({
            loading: false
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.loading) return null;
      return /*#__PURE__*/_react.default.createElement(_reactRouter.Router, {
        history: this.props.history
      }, /*#__PURE__*/_react.default.createElement(_reactRouter.Route, {
        path: "/view/:billtype/:billno",
        component: _App.default
      }));
    }
  }]);

  return Router;
}(_react.default.Component);

exports.Router = Router;