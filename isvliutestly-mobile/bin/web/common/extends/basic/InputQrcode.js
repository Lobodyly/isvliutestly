"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _label = _interopRequireDefault(require("@mdf/metaui-web/lib/components/basic/label"));

var _qrcode = _interopRequireDefault(require("qrcode.react"));

var _antd = require("antd");

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

var InputQrcode = /*#__PURE__*/function (_React$Component) {
  _inherits(InputQrcode, _React$Component);

  var _super = _createSuper(InputQrcode);

  function InputQrcode(props) {
    var _this;

    _classCallCheck(this, InputQrcode);

    _this = _super.call(this, props);
    var cStyle = props.cStyle,
        cFormatData = props.cFormatData;
    var config = null,
        format = null;

    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
    }

    if (cFormatData) {
      try {
        format = JSON.parse(cFormatData);
      } catch (e) {}
    }

    _this.state = Object.assign({
      visible: !props.bHidden,
      size: props.size || 110,
      value: props.defaultValue
    }, config);
    return _this;
  }

  _createClass(InputQrcode, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    } //render前

  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps, nextState) {} //render后

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: "baseControl",
    value: function baseControl() {
      var _this$state = this.state,
          value = _this$state.value,
          size = _this$state.size;

      var content = /*#__PURE__*/_react.default.createElement(_qrcode.default, {
        value: value,
        size: size
      });

      if (value) {
        return /*#__PURE__*/_react.default.createElement(_antd.Popover, {
          placement: "right",
          title: '',
          content: content,
          trigger: "hover",
          overlayClassName: "input-qrcode-img"
        }, /*#__PURE__*/_react.default.createElement("a", {
          className: "input-qrcode-name"
        }, "\u67E5\u770B\u4E8C\u7EF4\u7801"));
      } else {
        return /*#__PURE__*/_react.default.createElement(_antd.Input, {
          disabled: "disabled",
          placeholder: "\u672A\u751F\u6210"
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var cShowCaption = this.props.cShowCaption;
      var size = this.state.size;
      var control = cShowCaption ? /*#__PURE__*/_react.default.createElement(_label.default, {
        control: this.baseControl(),
        title: /*#__PURE__*/_react.default.createElement("label", null, cShowCaption)
      }) : this.baseControl();
      var style = this.state.visible ? {} : {
        display: "none"
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        style: style,
        className: "basic-input-qrcode"
      }, control);
    }
  }]);

  return InputQrcode;
}(_react.default.Component);

exports.default = InputQrcode;