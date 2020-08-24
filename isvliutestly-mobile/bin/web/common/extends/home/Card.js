"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CardControl = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _basic = require("@mdf/metaui-web/lib/components/basic");

var common = _interopRequireWildcard(require("./HomeCommon"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var format = _interopRequireWildcard(require("@mdf/cube/lib/helpers/formatDate"));

var tabsactions = _interopRequireWildcard(require("@mdf/metaui-web/lib/redux/tabs"));

var portalactions = _interopRequireWildcard(require("@mdf/metaui-web/lib/redux/portal"));

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

var CardControl = /*#__PURE__*/function (_React$Component) {
  _inherits(CardControl, _React$Component);

  var _super = _createSuper(CardControl);

  function CardControl(props) {
    var _this;

    _classCallCheck(this, CardControl);

    _this = _super.call(this, props);
    _this.state = {
      title: props.title || "通知公告",
      extra: props.extra || /*#__PURE__*/_react.default.createElement("a", {
        onClick: function onClick(e) {
          return _this.onClick(e, 'more');
        }
      }, "\u66F4\u591A"),
      dataSource: props.dataSource || [],
      style: props.style
    }; // this.getData(props.type);

    _this.onClick = _this.onClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CardControl, [{
    key: "onClick",
    value: function onClick(e) {// let activeKey = (this.props.type == 'notice') ? "AABS07" : "KL02";
      // var _props = this.props,
      //   tabsactions = _props.tabsactions,
      //   portalactions = _props.portalactions,
      //   tabs = _props.tabs,
      //   portal = _props.portal;
      // var index = tabs.panes.findIndex(function (pane) {
      //   return pane.key === activeKey;
      // });
      // if (index > -1) {
      //   tabsactions.activateItem(activeKey);
      //   var current = portal.tabs[activeKey];
      //   if (!current || !current.panes.length || current.panes.length === 1) return;
      //   var currentPanes = current.panes;
      //   var activeContent = currentPanes[currentPanes.length - 1].content;
      //   if (activeContent.vm) {
      //     activeContent.vm.promiseExecute('return', '返回', function () {
      //       portalactions.firstItem(activeKey);
      //     });
      //   } else if (activeContent.type && activeContent.url) {
      //     if (activeContent.checkReturn) {
      //       portalactions.refreshItem(activeKey, '返回', function () {
      //         portalactions.firstItem(activeKey);
      //       });
      //     } else {
      //       portalactions.firstItem(activeKey);
      //     }
      //   }
      //   return;
      // }
      // var params = {};
      // if (this.props.type == 'notice')
      //   params = { "level": 1, "name": "公告列表", "code": "AABS07", "isEnd": true, "parentCode": "AABS", "metaKey": "aa_noticelist", "id": 827, "subId": "AA", "authLevel": 1, "metaType": "voucherlist", "viewType": "meta", "userClick": true, "menuId": "AABS07" };
      // if (this.props.type == 'knowledge')
      //   params = { "level": 1, "name": "知识库", "code": "KL02", "isEnd": true, "parentCode": "KLB", "metaKey": "aa_informationlist", "id": 818, "subId": "KL", "authLevel": 3, "metaType": "voucherlist", "viewType": "meta", "userClick": true, "menuId": "KL02" };
      // cb.loader.runCommandLine('menu', params, null, tabsactions.addItem);
    }
  }, {
    key: "onRowClick",
    value: function onRowClick(e, data) {// let activeKey = (this.props.type == 'notice') ? "AABS07" : "KL02";
      // let title = (this.props.type == 'notice') ? "公告详情" : "文档详情";
      // let type = this.props.type;
      // var _props = this.props,
      //   tabsactions = _props.tabsactions,
      //   portalactions = _props.portalactions,
      //   tabs = _props.tabs,
      //   portal = _props.portal;
      // var index = tabs.panes.findIndex(function (pane) {
      //   return pane.key === activeKey;
      // });
      // if (index > -1) {
      //   tabsactions.activateItem(activeKey);
      //   let content = { title: title, type: 'platform', url: 'knowledgeBase/browseKnowledge', data: { params: { mode: 'browse', dataSource: data }, parentViewModel: tabs.panes[index].content.vm } };
      //   if (type == 'notice') content.url = 'noticeBase/browseNotice';
      //   portalactions.addItem(activeKey, { title: title, content: content });
      // } else {
      //   var callback = function (callbackData) {
      //     tabsactions.addItem(callbackData);
      //     let content = { title: title, type: 'platform', url: 'knowledgeBase/browseKnowledge', data: { params: { mode: 'browse', dataSource: data }, parentViewModel: callbackData.content.vm } };
      //     if (type == 'notice') content.url = 'noticeBase/browseNotice';
      //     portalactions.addItem(activeKey, { title: title, content: content });
      //   }
      //   var params = {};
      //   if (type == 'notice')
      //     params = { "level": 1, "name": "公告列表", "code": "AABS07", "isEnd": true, "parentCode": "AABS", "metaKey": "aa_noticelist", "id": 827, "subId": "AA", "authLevel": 1, "metaType": "voucherlist", "viewType": "meta", "userClick": true, "menuId": "AABS07" };
      //   if (type == 'knowledge')
      //     params = { "level": 1, "name": "知识库", "code": "KL02", "isEnd": true, "parentCode": "KLB", "metaKey": "aa_informationlist", "id": 818, "subId": "KL", "authLevel": 3, "metaType": "voucherlist", "viewType": "meta", "userClick": true, "menuId": "KL02" };
      //   cb.loader.runCommandLine('menu', params, null, callback);
      // }
    } // getData(type) {
    //   let renderData = {};
    //   var proxy = cb.rest.DynamicProxy.create({
    //     getlist: { url: 'bill/list.do', method: 'POST', options: { token: true } }
    //   });
    //   if (type == 'knowledge')
    //     renderData = { "page": { "pageSize": 8, "pageIndex": 1 }, "condition": { "commonVOs": [{ "itemName": "schemeName", "value1": "AA_aa_informationlist" }], "filtersId": "241490", "solutionId": 612 }, "billnum": "aa_informationlist" };
    //   if (type == 'notice')
    //     renderData = { "page": { "pageSize": 8, "pageIndex": 1 }, "condition": { "commonVOs": [{ "itemName": "schemeName", "value1": "AA_aa_noticelist" }], "filtersId": "248647", "solutionId": 640 }, "billnum": "aa_noticelist" };
    //   proxy.getlist(renderData, function (err, result) {
    //     if (err) {
    //       console.error(err.message);
    //       return;
    //     }
    //     if (!result) return
    //     this.setState({ dataSource: result.recordList });
    //   }, this);
    // }

  }, {
    key: "getCardContent",
    value: function getCardContent() {
      var _this2 = this;

      var dataSource = this.state.dataSource;
      var cardControl = [];
      dataSource.forEach(function (data) {
        var date = data.createTime;
        date = common.Format(new Date(date), 'MM-dd');
        cardControl.push( /*#__PURE__*/_react.default.createElement(_basic.Row, {
          key: data.id
        }, /*#__PURE__*/_react.default.createElement(_basic.Col, {
          className: 'textCol',
          span: 20
        }, /*#__PURE__*/_react.default.createElement("a", {
          onClick: function onClick(e) {
            return _this2.onRowClick(e, data);
          },
          title: data.name
        }, "[ \u516C\u544A ]", data.name)), /*#__PURE__*/_react.default.createElement(_basic.Col, {
          span: 4,
          style: {
            textAlign: 'right',
            color: '#999'
          }
        }, date)));
      }, this);
      return /*#__PURE__*/_react.default.createElement("div", null, cardControl);
    }
  }, {
    key: "render",
    value: function render() {
      // let content = this.getCardContent();
      var date = format.Format(new Date(), 'MM-dd');
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "home-panel-5 home-notice"
      }, /*#__PURE__*/_react.default.createElement(_antd.Card, {
        title: this.state.title,
        bordered: false,
        extra: this.state.extra,
        style: this.state.style
      }, /*#__PURE__*/_react.default.createElement(_basic.Row, {
        key: "1"
      }, /*#__PURE__*/_react.default.createElement(_basic.Col, {
        className: 'textCol',
        span: 24
      }, /*#__PURE__*/_react.default.createElement("a", null, "[\u516C\u544A] \u5173\u4E8E\u5341\u4E00\u4FC3\u9500\u6D3B\u52A8\u7684\u8BF4\u660E"), /*#__PURE__*/_react.default.createElement("div", null, date))), /*#__PURE__*/_react.default.createElement(_basic.Row, {
        key: "2"
      }, /*#__PURE__*/_react.default.createElement(_basic.Col, {
        className: 'textCol',
        span: 24
      }, /*#__PURE__*/_react.default.createElement("a", null, "[\u516C\u544A] \u5173\u4E8E\u95E8\u5E97\u7F8E\u89C2\u9648\u8BBE\u7684\u8BF4\u660E"), /*#__PURE__*/_react.default.createElement("div", null, date))), /*#__PURE__*/_react.default.createElement(_basic.Row, {
        key: "3"
      }, /*#__PURE__*/_react.default.createElement(_basic.Col, {
        className: 'textCol',
        span: 24
      }, /*#__PURE__*/_react.default.createElement("a", null, "[\u516C\u544A] \u95E8\u5E97\u65B0\u5458\u5DE5\u57F9\u8BAD\u5B66\u4E60"), /*#__PURE__*/_react.default.createElement("div", null, date))), /*#__PURE__*/_react.default.createElement(_basic.Row, {
        key: "4"
      }, /*#__PURE__*/_react.default.createElement(_basic.Col, {
        className: 'textCol',
        span: 24
      }, /*#__PURE__*/_react.default.createElement("a", null, "[\u516C\u544A] \u95E8\u5E97\u9500\u552E\u4E1A\u7EE9\u5927PK\u7684\u8BF4\u660E"), /*#__PURE__*/_react.default.createElement("div", null, date)))));
    }
  }]);

  return CardControl;
}(_react.default.Component);

exports.CardControl = CardControl;

function mapStateToProps(state) {
  return {
    tabs: state.tabs.toJS(),
    portal: state.portal.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tabsactions: (0, _redux.bindActionCreators)(tabsactions, dispatch),
    portalactions: (0, _redux.bindActionCreators)(portalactions, dispatch)
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CardControl);

exports.default = _default;