"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _reactCopyToClipboard = require("react-copy-to-clipboard");

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

var FormItem = _antd.Form.Item;

var BatchSKU = /*#__PURE__*/function (_Component) {
  _inherits(BatchSKU, _Component);

  var _super = _createSuper(BatchSKU);

  function BatchSKU(props) {
    var _this;

    _classCallCheck(this, BatchSKU);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleSave", function () {
      var isEmpty = false;
      Object.values(_this.state).forEach(function (val) {
        if (val !== null && val !== false && val !== true) {
          isEmpty = true;
        }
      });

      if (isEmpty) {
        _this.props.model.execute('click', _this.state);

        _this.setState({
          visible: false
        });
      } else {
        cb.utils.alert('请填写需要更改的值', 'warning');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancle", function () {
      _this.setState({
        visible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "showPopover", function () {
      _this.setState({
        visible: true
      });
    });

    _this.staticSKUData = {
      "productSKUDetail!weight": '重量',
      //重量
      "productSKUDetail!batchPrice": '批发价',
      //批发价
      "productSKUDetail!markPrice": '建议零售价',
      //建议零售价
      "productSKUDetail!salePrice": '线上零售价',
      //线上零售价
      "productSKUDetail!fMarketPrice": '市场价',
      //市场价
      "productSKUDetail!fPrimeCosts": '进货价格',
      //进货价格
      "productSKUDetail!fSettleAccountsRate": '结算费率',
      //结算费率
      "productSKUDetail!inventoryCount": '库存' //库存
      // SKU 扩展属性

    };
    _this.state = {
      "productSKUDetail!weight": null,
      "productSKUDetail!batchPrice": null,
      //批发价
      "productSKUDetail!markPrice": null,
      "productSKUDetail!salePrice": null,
      "productSKUDetail!fMarketPrice": null,
      //市场价
      "productSKUDetail!fPrimeCosts": null,
      "productSKUDetail!fSettleAccountsRate": null,
      "productSKUDetail!inventoryCount": null,
      "visible": false
    };
    return _this;
  }

  _createClass(BatchSKU, [{
    key: "handleConfirmBlur",
    value: function handleConfirmBlur(val, e) {
      if (e.target.value !== '') {
        this.setState(_defineProperty({}, val, Number(e.target.value)));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var formItemLayout = _defineProperty({
        wrapperCol: {
          offset: 1
        },
        labelCol: {
          span: 8
        }
      }, "wrapperCol", {
        span: 14
      });

      var SKUlist = Object.keys(this.staticSKUData).map(function (val, index) {
        return /*#__PURE__*/_react.default.createElement(FormItem, _extends({
          label: _this2.staticSKUData[val]
        }, formItemLayout, {
          key: index
        }), /*#__PURE__*/_react.default.createElement(_antd.InputNumber, {
          min: 0,
          placeholder: "\u8BF7\u8F93\u5165",
          size: 'default',
          onBlur: _this2.handleConfirmBlur.bind(_this2, val)
        }));
      });

      var content = /*#__PURE__*/_react.default.createElement(_antd.Form, {
        layout: "horizontal",
        style: {
          width: '300px'
        },
        className: "popover-form"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "popover-list"
      }, SKUlist), /*#__PURE__*/_react.default.createElement("div", {
        className: "filter-btn-1"
      }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
        type: "primary",
        htmlType: "submit",
        onClick: this.handleSave
      }, "\u4FDD\u5B58"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
        type: "default",
        style: {
          marginRight: '10px'
        },
        onClick: this.handleCancle
      }, "\u53D6\u6D88")));

      return /*#__PURE__*/_react.default.createElement(_antd.Popover, {
        content: content,
        visible: this.state.visible,
        onClick: this.showPopover,
        arrowPointAtCenter: true,
        autoAdjustOverflow: false,
        trigger: "click",
        placement: "left",
        className: "popover-form"
      }, this.props.children);
    }
  }]);

  return BatchSKU;
}(_react.Component);

exports.default = BatchSKU;