"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _basic = require("@mdf/metaui-web/lib/components/basic");

var _antd = require("antd");

var _HomeTitle = _interopRequireDefault(require("./HomeTitle"));

var _SvgIcon = _interopRequireDefault(require("@mdf/metaui-web/lib/components/common/SvgIcon"));

var homeActions = _interopRequireWildcard(require("../../redux/modules/home"));

var _tree = require("@mdf/metaui-web/lib/redux/tree");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var CompleteOrderControl = /*#__PURE__*/function (_React$Component) {
  _inherits(CompleteOrderControl, _React$Component);

  var _super = _createSuper(CompleteOrderControl);

  function CompleteOrderControl(props) {
    var _this;

    _classCallCheck(this, CompleteOrderControl);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onAddressChange", function (val) {
      var _this$props$home = _this.props.home,
          saleRankBegin = _this$props$home.saleRankBegin,
          saleRankEnd = _this$props$home.saleRankEnd;

      _this.props.homeActions.setOptions({
        saleRankStore: val
      });

      _this.props.homeActions.getSaleRankData({
        beginDate: saleRankBegin,
        endDate: saleRankEnd,
        store_id: val
      });
    });

    _this.state = {
      title: props.title || '销售排名',
      cControlType: props.cControlType || '',
      data: [{
        name: '三里屯店',
        value: 99999
      }, {
        name: '西单店',
        value: 88888
      }, {
        name: '西直门店',
        value: 77777
      }, {
        name: '昌平店',
        value: 66666
      }, {
        name: '同马店',
        value: 55555
      }, {
        name: '西二旗店',
        value: 44444
      }, {
        name: '王府井店',
        value: 33333
      }, {
        name: '回龙观店',
        value: 22222
      }]
    };
    _this.onDateChange = _this.onDateChange.bind(_assertThisInitialized(_this));

    _this.props.homeActions.getSaleRankData({});

    return _this;
  }

  _createClass(CompleteOrderControl, [{
    key: "onDateChange",
    value: function onDateChange(date, type) {
      var saleRankStore = this.props.home.saleRankStore;

      if (type === 'more') {
        var activeKey = 'SJ0103';
        var selectedNode = {
          "level": 2,
          "tenant": 516379152306432,
          "isShopRelated": false,
          "name": "销售排名",
          "code": "SJ0103",
          "isEnd": true,
          "authCode": "rm_salerankinglist",
          "parentCode": "SJ01",
          "_walkStatus": "Allow",
          "metaKey": "rm_saleranking",
          "id": 0,
          "subId": "SJ",
          "disabled": false,
          "authLevel": 3,
          "metaType": "voucherlist",
          "viewType": "meta"
        };
        this.props.moreButtonHandler(activeKey, selectedNode, null);
      } else {
        this.props.homeActions.setOptions({
          saleRankBegin: date[1],
          saleRankEnd: date[0]
        });
        this.props.homeActions.getSaleRankData({
          beginDate: date[1],
          endDate: date[0],
          store_id: saleRankStore
        });
      }
    }
  }, {
    key: "getrank",
    value: function getrank(data, type) {
      if (!data) return null;
      var progressColor, currentName, currentValue, accuracy;

      if (type === '门店') {
        progressColor = '6196FF';
        currentName = "store_name";
        currentValue = "fMoneySumTotal";
        accuracy = cb.rest.AppContext.option.amountofdecimal; //金额
      }

      if (type === '店员') {
        progressColor = '11D5A0';
        currentName = "iEmployeeid_name";
        currentValue = "fMoneyTotal";
        accuracy = cb.rest.AppContext.option.amountofdecimal; //金额
      }

      if (type === '商品') {
        progressColor = 'FFA768';
        currentName = "product_cName";
        currentValue = "fQuantityTotal";
        accuracy = cb.rest.AppContext.option.quantitydecimal; //数量
      }

      var maxValue = 0,
          okData;
      var rankArr = [];
      if (data && data.length < 7) okData = data;
      if (data && data.length >= 7) okData = data.slice(0, 6);
      okData.forEach(function (ele) {
        if (Math.abs(ele[currentValue]) > maxValue) maxValue = Math.abs(ele[currentValue]);
      });
      okData.forEach(function (element, index) {
        var ele;
        var rank = element.num;
        var percent = Math.ceil(Math.abs(element[currentValue]) / maxValue * 100);
        var isCurrentStore = element.isCurrentStore;
        var slef_name = element.isCurrentStore ? type === '门店' ? '(本门店)' : '(我自己)' : '';
        ele = /*#__PURE__*/_react.default.createElement("li", {
          key: rank
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: isCurrentStore ? 'saleRank_self' : ''
        }, /*#__PURE__*/_react.default.createElement("span", {
          title: "".concat(element[currentName]).concat(slef_name),
          className: "saleRank_name"
        }, "".concat(rank, ".").concat(element[currentName])), /*#__PURE__*/_react.default.createElement("span", {
          title: parseFloat(element[currentValue]).toFixed(accuracy),
          className: "saleRank_value"
        }, parseFloat(element[currentValue]).toFixed(accuracy))), /*#__PURE__*/_react.default.createElement(_antd.Progress, {
          percent: percent,
          showInfo: false
        }));
        rankArr.push(ele);
      }, this);
      if (rankArr.length == 0) rankArr.push( /*#__PURE__*/_react.default.createElement("li", {
        className: "saleRank_nodata"
      }, /*#__PURE__*/_react.default.createElement(_antd.Icon, {
        type: "anticon anticon-nodata"
      }), "\u6682\u65E0\u6570\u636E\u54E6~"));
      return rankArr;
    }
  }, {
    key: "getContent",
    value: function getContent() {
      var _ref = this.props.home.saleRankData || {},
          storeBizObjects = _ref.storeBizObjects,
          employeeBizObjects = _ref.employeeBizObjects,
          productBizObjects = _ref.productBizObjects;

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "home-rank clearfix"
      }, /*#__PURE__*/_react.default.createElement(_basic.Col, {
        span: 8
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "title"
      }, /*#__PURE__*/_react.default.createElement(_SvgIcon.default, {
        type: "shouye"
      }), "\u95E8\u5E97"), /*#__PURE__*/_react.default.createElement("ul", null, this.getrank(storeBizObjects, '门店'))), /*#__PURE__*/_react.default.createElement(_basic.Col, {
        span: 8
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "title"
      }, /*#__PURE__*/_react.default.createElement(_SvgIcon.default, {
        type: "huiyuanguanli"
      }), "\u8425\u4E1A\u5458"), /*#__PURE__*/_react.default.createElement("ul", null, this.getrank(employeeBizObjects, '店员'))), /*#__PURE__*/_react.default.createElement(_basic.Col, {
        span: 8
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "title"
      }, /*#__PURE__*/_react.default.createElement(_SvgIcon.default, {
        type: "lingshouguanli1"
      }), "\u5546\u54C1"), /*#__PURE__*/_react.default.createElement("ul", null, this.getrank(productBizObjects, '商品'))));
    }
  }, {
    key: "render",
    value: function render() {
      var content = this.getContent();
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "home-panel home-overview"
      }, /*#__PURE__*/_react.default.createElement(_basic.Row, null, /*#__PURE__*/_react.default.createElement(_HomeTitle.default, {
        defaultStore: this.props.user.showStore === false ? '' : this.props.user.storeId,
        dataSource: this.props.user.showStore === false ? null : this.props.user.userStores,
        haveAddress: true,
        title: this.state.title,
        onDateChange: this.onDateChange,
        onAddressChange: this.onAddressChange
      })), /*#__PURE__*/_react.default.createElement(_basic.Row, null, content));
    }
  }]);

  return CompleteOrderControl;
}(_react.default.Component);

function mapStateToProps(state) {
  return {
    home: state.home.toJS(),
    user: state.user.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    homeActions: (0, _redux.bindActionCreators)(homeActions, dispatch),
    moreButtonHandler: (0, _redux.bindActionCreators)(_tree.moreButtonHandler, dispatch)
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CompleteOrderControl);

exports.default = _default;