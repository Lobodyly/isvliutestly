"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _qrcode = _interopRequireDefault(require("qrcode.react"));

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

var Qrcode = /*#__PURE__*/function (_Component) {
  _inherits(Qrcode, _Component);

  var _super = _createSuper(Qrcode);

  function Qrcode(props) {
    var _this;

    _classCallCheck(this, Qrcode);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleVisibleChange", function (visible) {
      _this.setState({
        visible: visible
      });
    });

    _this.state = {
      visible: false,
      data: props.data || {}
    };
    return _this;
  }

  _createClass(Qrcode, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        data: nextProps.data,
        visible: false
      });
    }
  }, {
    key: "geturl",
    value: function geturl() {
      var url;
      var mall_url = localStorage.getItem('mall_url');
      var wid = localStorage.getItem('wid'); // let org_id = this.state.data.orgId;
      // let shop_id = this.state.data.shopId;
      // let customer_id = this.state.data.customerId;

      var goods_id = this.state.data.id; // let params=null;
      // if(org_id){
      //   // params=params?params+'&org_id='+org_id:'&org_id='+org_id
      // }else if(shop_id){
      //   params=params?params+'&shop_id='+shop_id:'&shop_id='+shop_id
      // }else if(customer_id){
      //   params=params?params+'&customer_id='+customer_id:'&customer_id='+customer_id
      // }

      var shopId = this.state.data.shopId;
      url = mall_url + '/detail?goods_id=' + goods_id + '&wid=' + wid;
      if (shopId) url += '&iShopId=' + shopId;
      return url;
    }
  }, {
    key: "render",
    value: function render() {
      var content = /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: '119px',
          height: '110px',
          padding: '5px',
          marginTop: '-8px'
        }
      }, /*#__PURE__*/_react.default.createElement(_qrcode.default, {
        value: this.geturl() || '没有商品地址',
        size: 109
      }));

      return /*#__PURE__*/_react.default.createElement(_antd.Popover, {
        content: content,
        trigger: "click",
        mouseLeaveDelay: 0.1,
        placement: "bottomRight",
        onVisibleChange: this.handleVisibleChange
      }, this.props.children);
    }
  }]);

  return Qrcode;
}(_react.Component);

exports.default = Qrcode;