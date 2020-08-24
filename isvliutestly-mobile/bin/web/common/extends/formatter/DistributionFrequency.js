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

var Option = _antd.Select.Option;
process.env.__CLIENT__ && require("./producttpl.less");

var DistributionFrequency = /*#__PURE__*/function (_Component) {
  _inherits(DistributionFrequency, _Component);

  var _super = _createSuper(DistributionFrequency);

  function DistributionFrequency(props) {
    var _this;

    _classCallCheck(this, DistributionFrequency);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleFocus", function () {
      var _val = _this.props.model.getCellValue(0, 'values');

      var values = _this.props.model.getCellValue(4, 'values');

      _this.setState({
        _json: _this.getCycleValues(_val),
        values: values
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelect", function (value, option) {
      var _values = _this.state.values;
      _values = _values ? _values + '|' + value : value;

      _this.setState({
        values: _values
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleDeselect", function (value) {
      var _values = _this.state.values.split('|');

      var _index = _values.indexOf(value);

      _values.splice(_index, 1);

      _this.setState({
        values: _values.join('|')
      });
    });

    _this.state = {
      _json: {
        '1': '每天送',
        '2': '隔天送',
        '3': '工作日送',
        '4': '双休日送'
      },
      values: ''
    };
    _this._json = {};
    return _this;
  }

  _createClass(DistributionFrequency, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
      this.handleFocus();
    }
  }, {
    key: "getCycleValues",
    value: function getCycleValues(_val) {
      // 获取周期的值
      var json = {};

      switch (_val) {
        case '2':
          json = {
            '1': '周一',
            '2': '周二',
            '3': '周三',
            '4': '周四',
            '5': '周五',
            '6': '周六',
            '7': '周日'
          };
          break;

        case '3':
          Array.from(new Array(31)).forEach(function (val, index) {
            json[index + 1] = index + 1 + '号';
          });
          break;

        default:
          json = {
            '1': '每天送',
            '2': '隔天送',
            '3': '工作日送',
            '4': '双休日送'
          };
      }

      return json;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var mode = this.props.mode;

      var _values = this.props.model.getCellValue(4, 'values');

      var checkedList = !_values ? [] : this.state.values && this.state.values.split('|') || [];
      var children = Object.keys(this.state._json).map(function (val, index) {
        return /*#__PURE__*/_react.default.createElement(Option, {
          key: index,
          value: val
        }, _this2.state._json[val]);
      });

      if (mode == 'browse') {
        var browseValue = _values.split('|');

        var _val = this.props.model.getCellValue(0, 'values');

        return /*#__PURE__*/_react.default.createElement("span", null, browseValue.length && browseValue.map(function (v, index) {
          return _this2.getCycleValues(_val)[v];
        }).join('|'));
      }

      return /*#__PURE__*/_react.default.createElement(_antd.Select, {
        mode: "multiple",
        placeholder: "\u8BF7\u9009\u62E9\u914D\u9001\u9891\u6B21",
        defaultValue: checkedList,
        value: checkedList,
        onFocus: this.handleFocus,
        onChange: this.props.handleChange,
        onSelect: this.handleSelect,
        onDeselect: this.handleDeselect,
        className: "frequency"
      }, children);
    }
  }]);

  return DistributionFrequency;
}(_react.Component);

exports.default = DistributionFrequency;