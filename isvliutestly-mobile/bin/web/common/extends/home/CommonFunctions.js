"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _basic = require("@mdf/metaui-web/lib/components/basic");

var _antd = require("antd");

var common = _interopRequireWildcard(require("./HomeCommon"));

var _SvgIcon = _interopRequireDefault(require("@mdf/metaui-web/lib/components/common/SvgIcon"));

var _tree = require("@mdf/metaui-web/lib/redux/tree");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var CommonFunctions = /*#__PURE__*/function (_Component) {
  _inherits(CommonFunctions, _Component);

  var _super = _createSuper(CommonFunctions);

  function CommonFunctions(props) {
    var _this;

    _classCallCheck(this, CommonFunctions);

    _this = _super.call(this, props);
    _this.state = {
      dataSource: [],
      title: props.title || '常用功能',
      style: _this.props.style || {}
    };
    return _this;
  }

  _createClass(CommonFunctions, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var proxy = cb.rest.DynamicProxy.create({
        getCommon: {
          url: 'commonfuctions/list',
          method: 'GET'
        }
      });
      proxy.getCommon(function (err, result) {
        if (result) _this2.setState({
          dataSource: result
        });
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick(menuCode) {
      var execHandler = this.props.execHandler;
      execHandler(menuCode);
    }
  }, {
    key: "getControl",
    value: function getControl() {
      var _this3 = this;

      var dataSource = this.state.dataSource;
      if (!dataSource.length) return null;
      var items = [];
      dataSource.forEach(function (item, index) {
        var extraProps = {};
        if (index === 0) extraProps.color = 'red';
        items.push( /*#__PURE__*/_react.default.createElement(_basic.Col, {
          span: 6
        }, /*#__PURE__*/_react.default.createElement(_antd.Tag, _extends({}, extraProps, {
          onClick: function onClick() {
            return _this3.handleClick(item.code);
          }
        }), item.name)));
      });
      return /*#__PURE__*/_react.default.createElement(_basic.Row, null, items);
    }
  }, {
    key: "render",
    value: function render() {
      var control = this.getControl();
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "home-panel-5 home-panel-6"
      }, /*#__PURE__*/_react.default.createElement(_antd.Card, {
        title: this.state.title,
        bordered: false,
        style: this.state.style
      }, control));
    }
  }]);

  return CommonFunctions;
}(_react.Component);

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    execHandler: (0, _redux.bindActionCreators)(_tree.execHandler, dispatch)
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CommonFunctions);

exports.default = _default;