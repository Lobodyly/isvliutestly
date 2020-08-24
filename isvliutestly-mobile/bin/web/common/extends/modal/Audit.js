"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RadioGroup = _antd.Radio.Group;
var TextArea = _antd.Input.TextArea;

var Audit = /*#__PURE__*/function (_Component) {
  _inherits(Audit, _Component);

  var _super = _createSuper(Audit);

  function Audit(props) {
    var _this;

    _classCallCheck(this, Audit);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      _this.props.close();
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (e) {
      if (!_this.state.radioshow) {
        var _value = e.target.value;

        var _len = 255 - _value.length;

        if (_len >= 0) {
          _this.setState({
            value: _value,
            len: _len
          });
        } else {
          var arr = _value.split('');

          arr.length = 255;

          _this.setState({
            value: arr.join(''),
            len: 0
          });
        }
      }
    });

    _this.state = {
      value: '',
      radiovalue: 'pass',
      radioshow: true,
      len: 255
    };
    return _this;
  }

  _createClass(Audit, [{
    key: "handlePass",
    value: function handlePass(e) {
      e.stopPropagation();
      this.props.model.execute('handleAudit', {
        key: 'Audit',
        state: this.state.radiovalue,
        value: this.state.value
      });
      this.props.close();
    }
  }, {
    key: "radioChange",
    value: function radioChange(e) {
      this.setState({
        radioshow: !this.state.radioshow,
        radiovalue: e.target.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var TextareaType = _defineProperty({
        placeholder: '审核不通过原因',
        autosize: {
          minRows: 4,
          maxRows: 6
        }
      }, "placeholder", '原因');

      return /*#__PURE__*/_react.default.createElement(_antd.Modal, {
        width: 600,
        visible: true,
        maskClosable: false,
        title: "\u5546\u54C1\u5BA1\u6838",
        onOk: this.handlePass.bind(this),
        onCancel: this.handleCancel,
        className: "audit"
      }, /*#__PURE__*/_react.default.createElement(_antd.Row, null, /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: 24
      }, /*#__PURE__*/_react.default.createElement(RadioGroup, {
        onChange: this.radioChange.bind(this),
        value: this.state.radiovalue
      }, /*#__PURE__*/_react.default.createElement(_antd.Radio, {
        value: "pass"
      }, "\u901A\u8FC7"), /*#__PURE__*/_react.default.createElement(_antd.Radio, {
        value: "unpass"
      }, "\u9A73\u56DE"))), /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: 24,
        className: "audit-row"
      }, /*#__PURE__*/_react.default.createElement(TextArea, _extends({}, TextareaType, {
        disabled: this.state.radioshow,
        value: this.state.value,
        onChange: this.handleChange
      })), /*#__PURE__*/_react.default.createElement("p", {
        className: "audit-tips"
      }, "\u8FD8\u53EF\u4EE5\u8F93\u5165", /*#__PURE__*/_react.default.createElement("span", null, this.state.len), "\u4E2A\u5B57"))));
    }
  }]);

  return Audit;
}(_react.Component);

exports.default = Audit;