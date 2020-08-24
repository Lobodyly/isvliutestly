"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _basic = require("@mdf/metaui-web/lib/components/basic");

var _moment = _interopRequireDefault(require("moment"));

var common = _interopRequireWildcard(require("./HomeCommon"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var RangePicker = _antd.DatePicker.RangePicker;
var TabPane = _antd.Tabs.TabPane;

var HomeTitle = /*#__PURE__*/function (_React$Component) {
  _inherits(HomeTitle, _React$Component);

  var _super = _createSuper(HomeTitle);

  function HomeTitle(props) {
    var _this;

    _classCallCheck(this, HomeTitle);

    _this = _super.call(this, props);
    _this.state = {
      title: props.title || "我的待办",
      RangePickerValue: [],
      onlyTtile: props.onlyTtile || false,
      haveAddress: props.haveAddress || false,
      //门店
      haveRankTab: props.haveRankTab || false,
      addressMultiple: props.addressMultiple || false,
      dataSource: props.dataSource || [],
      defaultStore: props.defaultStore || '全部'
    };
    return _this;
  }

  _createClass(HomeTitle, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.dataSource != this.state.dataSource && nextProps.dataSource) this.setState({
        dataSource: nextProps.dataSource
      });
    }
  }, {
    key: "onTabClick",
    value: function onTabClick(e) {
      var startDate = common.getDate(e, '0');
      var endDate = common.getDate(e, '1');
      var lastStartDate = common.getDate('last' + e, '0');
      var lastEndDate = common.getDate('last' + e, '1');
      var date = [];
      date.push((0, _moment.default)(startDate, 'YYYY-MM-DD'));
      date.push((0, _moment.default)(endDate, 'YYYY-MM-DD'));

      if (this.props.onDateChange) {
        this.props.onDateChange([startDate, endDate, lastStartDate, lastEndDate], e);
      }

      this.setState({
        RangePickerValue: date
      });
    } // onDateChange(date, dateString) {
    //     let dateValue = [];
    //     if (dateString[0] !== "") {
    //         dateValue.push(moment(dateString[0], 'YYYY-MM-DD'));
    //         dateValue.push(moment(dateString[1], 'YYYY-MM-DD'));
    //     }
    //     if (this.props.onDateChange) {
    //         this.props.onDateChange([dateString[0], dateString[1]]);
    //     }
    //     this.setState({
    //         RangePickerValue: dateValue
    //     });
    // }

  }, {
    key: "onAddressChange",
    value: function onAddressChange(val) {
      if (this.props.onAddressChange) {
        this.props.onAddressChange(val);
      }
    }
  }, {
    key: "onRankTabClick",
    value: function onRankTabClick(val) {
      if (val == '店员') {
        this.setState({
          haveAddress: true
        });
      } else {
        this.setState({
          haveAddress: false
        });
      }

      if (this.props.onRankTabClick) {
        this.props.onRankTabClick(val);
      }
    }
  }, {
    key: "getStores",
    value: function getStores() {
      var storeArr = [];
      this.state.dataSource.unshift({
        store: '全部',
        store_name: '全部'
      });
      this.state.dataSource.forEach(function (ele) {
        storeArr.push( /*#__PURE__*/_react.default.createElement(_antd.Select.Option, {
          value: ele.store
        }, ele.store_name));
      });
      return storeArr;
    }
  }, {
    key: "getContent",
    value: function getContent() {
      var _this2 = this,
          _React$createElement;

      var title = this.state.title;
      var value = this.state.RangePickerValue;

      if (value.length <= 0) {
        var startDate = common.getDate('week', 0);
        var endDate = common.getDate('week', 1);
        value.push((0, _moment.default)(startDate, 'YYYY-MM-DD'));
        value.push((0, _moment.default)(endDate, 'YYYY-MM-DD'));
      }

      if (this.state.onlyTtile) {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "home-title"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "home-title-left"
        }, title));
      }

      var storeContent = this.getStores();
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "home-title"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "home-title-left"
      }, title), /*#__PURE__*/_react.default.createElement("div", {
        className: "home-title-right"
      }, /*#__PURE__*/_react.default.createElement("div", {
        style: {
          float: 'left'
        }
      }, this.state.haveRankTab ? /*#__PURE__*/_react.default.createElement(_antd.Tabs, {
        style: {
          float: 'left'
        },
        onTabClick: function onTabClick(e) {
          return _this2.onRankTabClick(e);
        },
        defaultActiveKey: "\u95E8\u5E97",
        size: "small"
      }, /*#__PURE__*/_react.default.createElement(TabPane, {
        tab: "\u95E8\u5E97",
        key: "\u95E8\u5E97"
      }), /*#__PURE__*/_react.default.createElement(TabPane, {
        tab: "\u5E97\u5458",
        key: "\u5E97\u5458"
      }), /*#__PURE__*/_react.default.createElement(TabPane, {
        tab: "\u5546\u54C1",
        key: "\u5546\u54C1"
      })) : '', this.state.haveAddress ? /*#__PURE__*/_react.default.createElement(_antd.Select, (_React$createElement = {
        multiple: this.state.addressMultiple ? true : false,
        style: {
          float: 'left'
        },
        defaultValue: this.state.defaultStore
      }, _defineProperty(_React$createElement, "style", {
        width: 120
      }), _defineProperty(_React$createElement, "onChange", function onChange(val) {
        return _this2.onAddressChange(val);
      }), _React$createElement), storeContent) : ''), /*#__PURE__*/_react.default.createElement("div", {
        className: "home-title-date"
      }, this.state.addressMultiple ? /*#__PURE__*/_react.default.createElement(_antd.Tabs, {
        onTabClick: function onTabClick(e) {
          return _this2.onTabClick(e);
        },
        defaultActiveKey: "seven",
        size: "small"
      }, /*#__PURE__*/_react.default.createElement(TabPane, {
        tab: "\u8FD17\u5929",
        key: "seven"
      }), /*#__PURE__*/_react.default.createElement(TabPane, {
        tab: "\u8FD130\u5929",
        key: "thirty"
      }), /*#__PURE__*/_react.default.createElement(TabPane, {
        tab: "\u8FD190\u5929",
        key: "ninety"
      })) : /*#__PURE__*/_react.default.createElement(_antd.Tabs, {
        onTabClick: function onTabClick(e) {
          return _this2.onTabClick(e);
        },
        defaultActiveKey: "yesterday",
        size: "small"
      }, /*#__PURE__*/_react.default.createElement(TabPane, {
        tab: "\u6628\u5929",
        key: "yesterday"
      }), /*#__PURE__*/_react.default.createElement(TabPane, {
        tab: "\u8FD17\u5929",
        key: "seven"
      }), /*#__PURE__*/_react.default.createElement(TabPane, {
        tab: "\u8FD130\u5929",
        key: "thirty"
      }), /*#__PURE__*/_react.default.createElement(TabPane, {
        tab: "\u66F4\u591A",
        key: "more"
      })))));
    }
  }, {
    key: "render",
    value: function render() {
      var content = this.getContent();
      return /*#__PURE__*/_react.default.createElement("div", null, content);
    }
  }]);

  return HomeTitle;
}(_react.default.Component);

exports.default = HomeTitle;