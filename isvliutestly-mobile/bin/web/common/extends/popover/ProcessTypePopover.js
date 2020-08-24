"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _SvgIcon = _interopRequireDefault(require("@mdf/metaui-web/lib/components/common/SvgIcon"));

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

process.env.__CLIENT__ && require("./ProcessTypePopover.less");

var ProcessTypePopover = /*#__PURE__*/function (_Component) {
  _inherits(ProcessTypePopover, _Component);

  var _super = _createSuper(ProcessTypePopover);

  function ProcessTypePopover(props) {
    var _this;

    _classCallCheck(this, ProcessTypePopover);

    _this = _super.call(this, props);
    _this.state = {
      icontype: 'wenhaomoren'
    };
    return _this;
  }

  _createClass(ProcessTypePopover, [{
    key: "handleEnter",
    value: function handleEnter() {
      this.setState({
        "icontype": 'wenhaolveguo'
      });
    }
  }, {
    key: "handleLeave",
    value: function handleLeave() {// this.setState({"icontype":'wenhaomoren'})
    }
  }, {
    key: "handelChange",
    value: function handelChange(visible) {
      if (!visible) {
        this.setState({
          "icontype": 'wenhaomoren'
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var title = /*#__PURE__*/_react.default.createElement("strong", null, "\u52A0\u5DE5\u65B9\u5F0F\u8BF4\u660E");

      var content = /*#__PURE__*/_react.default.createElement("div", {
        className: "after-popover-content"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "after-popover-arrow"
      }), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", null, "\u9884\u5236"), "\uFF1A\u6307\u9884\u5148\u52A0\u5DE5\u5165\u5E93\u5728\u9500\u552E\u7684\u52A0\u5DE5\u5546\u54C1\uFF0C\u5982\u9762\u5305\u3001\u997C\u5E72\u7B49\uFF1B\u9884\u5236\u5546\u54C1\u53D7\u4E1A\u52A1\u53C2\u6570\u201C\u5141\u8BB8\u8D1F\u51FA\u5E93\u201D\u63A7\u5236\u3002"), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", null, "\u73B0\u5236"), "\uFF1A\u6307\u9700\u8981\u73B0\u573A\u9500\u552E\u5236\u4F5C\u7684\u52A0\u5DE5\u5546\u54C1\uFF0C\u5982\uFF1A\u5496\u5561\u3001\u996E\u54C1\u7B49\uFF1B\u73B0\u5236\u5546\u54C1\u4E0D\u53D7\u4E1A\u52A1\u53C2\u6570\u201C\u5141\u8BB8\u8D1F\u51FA\u5E93\u201D\u63A7\u5236\u3002"), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", null, "\u5B9A\u5236"), "\uFF1A\u6307\u5148\u9884\u5B9A\u518D\u6839\u636E\u8BA2\u5355\u52A0\u5DE5\u3001\u5165\u5E93\u3001\u9500\u552E\u7684\u5546\u54C1\uFF0C\u5982\uFF1A\u86CB\u7CD5\u3001\u73E0\u5B9D\u3001\u5176\u5B83\u8BA2\u5236\u54C1\uFF1B\u5B9A\u5236\u5546\u54C1\u53D7\u4E1A\u52A1\u53C2\u6570\u2018\u5141\u8BB8\u8D1F\u51FA\u5E93\u2019\u63A7\u5236\uFF0C\u4F46\u5141\u8BB8\u8D1F\u53EF\u7528\u3002"));

      return /*#__PURE__*/_react.default.createElement(_antd.Popover, {
        placement: "leftTop",
        content: content,
        title: title,
        onVisibleChange: this.handelChange.bind(this),
        autoAdjustOverflow: false,
        onMouseEnter: this.handleEnter.bind(this),
        onMouseLeave: this.handleLeave.bind(this),
        overlayClassName: "after-popover"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: 'hoverhands'
      }, /*#__PURE__*/_react.default.createElement(_SvgIcon.default, {
        type: this.state.icontype
      })));
    }
  }]);

  return ProcessTypePopover;
}(_react.Component);

exports.default = ProcessTypePopover;