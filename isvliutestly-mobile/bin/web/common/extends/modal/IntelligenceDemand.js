"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var RadioGroup = _antd.Radio.Group;

var IntelligenceDemand = /*#__PURE__*/function (_Component) {
  _inherits(IntelligenceDemand, _Component);

  var _super = _createSuper(IntelligenceDemand);

  function IntelligenceDemand(props) {
    var _this;

    _classCallCheck(this, IntelligenceDemand);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleNumberChange", function (value) {
      _this.setState({
        number: value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleStartDateChange", function (value) {
      _this.startDate = value;
    });

    _defineProperty(_assertThisInitialized(_this), "handleEndDateChange", function (value) {
      _this.endDate = value;
    });

    _this.state = {
      number: 7
    };
    return _this;
  }

  _createClass(IntelligenceDemand, [{
    key: "handleOk",
    value: function handleOk() {
      var startDate = null,
          endDate = null;

      switch (this.radio.state.value) {
        case 1:
          endDate = (0, _moment.default)();
          startDate = (0, _moment.default)().subtract(this.state.number, 'days');
          break;

        case 2:
          startDate = this.startDate;
          endDate = this.endDate;
          break;
      }

      if (startDate || endDate) {
        var saleDate = {};
        if (startDate) saleDate.startDate = startDate.format('YYYY-MM-DD') + ' 00:00:00';
        if (endDate) saleDate.endDate = endDate.format('YYYY-MM-DD') + ' 23:59:59';
        this.props.model.execute('afterOkClick', {
          key: 'IntelligenceDemand',
          value: {
            saleDate: saleDate
          }
        });
      }

      this.handleCancel();
    }
  }, {
    key: "handleCancel",
    value: function handleCancel() {
      this.props.close();
    }
  }, {
    key: "renderContentNode",
    value: function renderContentNode() {
      var _this2 = this;

      var radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      };
      var numberStyle = {
        width: 40
      };
      var dateStyle = {
        width: 100
      };
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", {
        style: radioStyle
      }, "\u6309\u5386\u53F2\u9500\u91CF\u8865\u8D27"), /*#__PURE__*/_react.default.createElement("h4", {
        style: radioStyle
      }, "\u8865\u8D27\u6570\u91CF=\u6307\u5B9A\u65F6\u95F4\u6BB5\u5185\u7684\u9500\u91CF-\u5728\u9014\u6570\u91CF"), /*#__PURE__*/_react.default.createElement("h3", {
        style: radioStyle,
        className: "h3-margin"
      }, "\u9500\u552E\u65F6\u95F4"), /*#__PURE__*/_react.default.createElement(RadioGroup, {
        ref: function ref(radio) {
          return _this2.radio = radio;
        },
        onChange: this.onChange,
        defaultValue: 1
      }, /*#__PURE__*/_react.default.createElement(_antd.Radio, {
        style: radioStyle,
        value: 1
      }, "\u7EDF\u8BA1\u8FD1", /*#__PURE__*/_react.default.createElement(_antd.InputNumber, {
        style: numberStyle,
        value: this.state.number,
        min: 1,
        onChange: this.handleNumberChange
      }), "\u5929\uFF08\u4E0D\u542B\u5F53\u5929\uFF09\u7684\u9500\u552E\u6570\u91CF"), /*#__PURE__*/_react.default.createElement(_antd.Radio, {
        style: radioStyle,
        value: 2
      }, "\u7EDF\u8BA1\u6307\u5B9A\u65E5\u671F\u8303\u56F4\u5185\u7684\u9500\u91CF", /*#__PURE__*/_react.default.createElement(_antd.DatePicker, {
        style: dateStyle,
        onChange: this.handleStartDateChange
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "ant-time-color"
      }, "-"), /*#__PURE__*/_react.default.createElement(_antd.DatePicker, {
        style: dateStyle,
        onChange: this.handleEndDateChange
      }))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var contentNode = this.renderContentNode();
      return /*#__PURE__*/_react.default.createElement(_antd.Modal, {
        className: "modal-IntelligenceDemand",
        width: 710,
        visible: true,
        maskClosable: false,
        title: "\u667A\u80FD\u8865\u8D27\u89C4\u5219",
        onOk: function onOk(e) {
          return _this3.handleOk();
        },
        onCancel: function onCancel() {
          return _this3.handleCancel();
        }
      }, contentNode);
    }
  }]);

  return IntelligenceDemand;
}(_react.Component);

exports.default = IntelligenceDemand;