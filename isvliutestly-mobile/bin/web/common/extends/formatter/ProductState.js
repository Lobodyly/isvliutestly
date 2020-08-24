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

process.env.__CLIENT__ && require("./audit.less");

var ProductState = /*#__PURE__*/function (_Component) {
  _inherits(ProductState, _Component);

  var _super = _createSuper(ProductState);

  function ProductState(props) {
    _classCallCheck(this, ProductState);

    return _super.call(this, props);
  }

  _createClass(ProductState, [{
    key: "handelClick",
    value: function handelClick(state, e) {
      e.stopPropagation();
      var cPlatFormRemark = this.props.rowData['cPlatFormRemark'];

      if (state == 'audit') {
        _antd.Modal.info({
          title: '审核不通过原因',
          width: 600,
          height: 320,
          iconType: '',
          content: /*#__PURE__*/_react.default.createElement("div", {
            className: "audit-model"
          }, /*#__PURE__*/_react.default.createElement("div", null, cPlatFormRemark), /*#__PURE__*/_react.default.createElement("footer", null))
        });
      } else {
        _antd.Modal.info({
          title: '违规下架原因',
          width: 600,
          height: 320,
          iconType: '',
          content: /*#__PURE__*/_react.default.createElement("div", {
            className: "audit-model"
          }, /*#__PURE__*/_react.default.createElement("div", null, cPlatFormRemark), /*#__PURE__*/_react.default.createElement("footer", null))
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var platFormStaus = this.props.rowData['platFormStaus']; //审核状态 为1 的时候是 已审核

      var mallupcount = this.props.rowData['detail!mallupcount'] || 0;
      var malldowncount = this.props.rowData['detail!malldowncount'] || 0;
      var uorderupcount = this.props.rowData['detail!uorderupcount'] || 0;
      var uorderdowncount = this.props.rowData['detail!uorderdowncount'] || 0;
      var iStatus = this.props.rowData['detail!iStatus']; //商城上架 0 是未上架

      var iUOrderStatus = this.props.rowData["detail!iUOrderStatus"]; //U订货上架 0 是未上架

      var content;

      switch (platFormStaus.value) {
        case '1':
          content = /*#__PURE__*/_react.default.createElement("ul", {
            title: "\u72B6\u6001",
            className: "product-price product-state clearfix",
            style: {
              width: '200px'
            }
          }, /*#__PURE__*/_react.default.createElement("li", null, iStatus && iStatus.value != 'false' ? /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("span", {
            title: "\u5546\u57CE\u4E0A\u67B6\u6570"
          }, "\u5546\u57CE\u4E0A\u67B6\u6570 : "), /*#__PURE__*/_react.default.createElement("em", {
            title: mallupcount
          }, " ", mallupcount)) : /*#__PURE__*/_react.default.createElement("strong", null, "\u5546\u57CE\u672A\u4E0A\u67B6"), iStatus && iStatus.value != 'false' ? /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("span", {
            title: "\u7EBF\u4E0A\u96F6\u552E\u4EF7"
          }, "\u5546\u57CE\u4E0B\u67B6\u6570 : "), /*#__PURE__*/_react.default.createElement("em", {
            title: malldowncount
          }, " ", malldowncount)) : null), /*#__PURE__*/_react.default.createElement("li", null, iUOrderStatus && iUOrderStatus.value != 'false' ? /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("span", {
            title: "\u5EFA\u8BAE\u96F6\u552E\u4EF7"
          }, "U\u8BA2\u8D27\u4E0A\u67B6\u6570 : "), /*#__PURE__*/_react.default.createElement("em", {
            title: uorderupcount
          }, " ", uorderupcount)) : /*#__PURE__*/_react.default.createElement("strong", null, "U\u8BA2\u8D27\u672A\u4E0A\u67B6"), iUOrderStatus && iUOrderStatus.value != 'false' ? /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("span", {
            title: "\u8FDB\u8D27\u4EF7"
          }, "U\u8BA2\u8D27\u4E0B\u67B6\u6570 : "), /*#__PURE__*/_react.default.createElement("em", {
            title: uorderdowncount
          }, " ", uorderdowncount)) : null));
          break;

        case '2':
          content = /*#__PURE__*/_react.default.createElement("ul", {
            title: "\u72B6\u6001",
            className: "product-price product-state clearfix",
            style: {
              width: '200px'
            }
          }, /*#__PURE__*/_react.default.createElement("li", {
            onClick: this.handelClick.bind(this, 'audit'),
            className: "lower-frame"
          }, /*#__PURE__*/_react.default.createElement("strong", null, "\u5BA1\u6838\u4E0D\u901A\u8FC7 ", /*#__PURE__*/_react.default.createElement(_antd.Icon, {
            type: "info-circle"
          }))));
          break;

        case '3':
          content = /*#__PURE__*/_react.default.createElement("ul", {
            title: "\u72B6\u6001",
            className: "product-price product-state clearfix",
            style: {
              width: '200px'
            }
          }, /*#__PURE__*/_react.default.createElement("li", {
            onClick: this.handelClick.bind(this, 'forceDown'),
            className: "lower-frame"
          }, /*#__PURE__*/_react.default.createElement("strong", null, "\u8FDD\u89C4\u4E0B\u67B6 ", /*#__PURE__*/_react.default.createElement(_antd.Icon, {
            type: "info-circle"
          }))));
          break;

        default:
          content = /*#__PURE__*/_react.default.createElement("ul", {
            title: "\u72B6\u6001",
            className: "product-price product-state clearfix",
            style: {
              width: '200px'
            }
          }, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("strong", null, "\u672A\u5BA1\u6838")));
      }

      return content;
    }
  }]);

  return ProductState;
}(_react.Component);

exports.default = ProductState;