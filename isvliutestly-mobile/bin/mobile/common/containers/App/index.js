"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _react = _interopRequireWildcard(require("react"));

var _tinperBee = require("tinper-bee");

var _mdf_loading = _interopRequireDefault(require("../../../../../static/viewer/images/mdf_loading.gif"));

var _queryString = _interopRequireDefault(require("query-string"));

require("./style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require("@mdf/renderer"),
    render = _require.render;

var staterule = require("@mdf/cube/lib/staterule/rule");

function App(props) {
  var _props$match$params = props.match.params,
      billtype = _props$match$params.billtype,
      billno = _props$match$params.billno,
      tplid = _props$match$params.tplid;

  var _useState = (0, _react.useState)({
    isLoading: true
  }),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      isLoading = _useState4[0],
      setLoading = _useState4[1];

  (0, _react.useEffect)(function () {
    window.cb.invoker.subscribeLoadData(function (loading) {
      setLoading(loading);
    });
  });
  (0, _react.useEffect)(function () {
    if (billno !== state.billno) {
      var params = {}; // TODO:

      var _queryString$parse = _queryString.default.parse(props.location.search),
          _id = _queryString$parse._id,
          mode = _queryString$parse.mode,
          _queryString$parse$re = _queryString$parse.readOnly,
          readOnly = _queryString$parse$re === void 0 ? false : _queryString$parse$re,
          _tplid = _queryString$parse.tplid;

      params.metaType = billtype;
      params.mode = mode || "add";
      params.id = _id;
      params.readOnly = readOnly;
      params.tplid = _tplid;
      var data = {
        billtype: billtype,
        billno: billno,
        params: params,
        terminalType: 3
      };
      cb.loader.runCommandLine("bill", data, null, function (viewModel, uiData) {
        setLoading(false);
        setState({
          billno: billno,
          viewModel: viewModel,
          uiData: uiData
        }); // TODO: 现有逻辑，点击列表行会请求详情页的 ui 元数据，应改成直接跳转

        viewModel.addListener({
          communication: function communication(data) {
            if (billtype.toLowerCase() === "yylist") {
              var _data$payload = data.payload,
                  metaData = _data$payload.metaData,
                  vm = _data$payload.vm,
                  _data$payload$params = _data$payload.params,
                  _billno = _data$payload$params.billno,
                  _billtype = _data$payload$params.billtype,
                  _data$payload$params$ = _data$payload$params.params,
                  id = _data$payload$params$.id,
                  _readOnly = _data$payload$params$.readOnly,
                  _mode = _data$payload$params$.mode;
              var url = "/view/yyarchive/".concat(_billno, "?terminalType=3&mode=").concat(_mode === "edit" ? "browse" : _mode);

              if (id) {
                url += "&_id=" + id;
              }

              if (_readOnly) {
                url += "&readOnly=" + _readOnly;
              }

              cb.route.pushPage(url);
            }
          }
        }); // TODO: 审批状态存在时，监听审批状态的变化，控制按钮状态

        if (viewModel && viewModel.get("verifystate")) {
          viewModel.get("verifystate").addListener({
            setValue: function setValue() {
              // 当单据按钮存在时，通过 staterule 控制显示状态
              staterule.runState(viewModel); // 兼容其他状态变回开立态按钮显示问题

              if (viewModel.get("verifystate").getValue() === 0) {
                if (viewModel.get('btnSubmit')) {
                  viewModel.get('btnSubmit').setVisible(true);
                }

                if (viewModel.get('btnEdit')) {
                  viewModel.get('btnEdit').setVisible(true);
                }

                if (viewModel.get('btnSaveAndAdd')) {
                  viewModel.get('btnSaveAndAdd').setVisible(false);
                }

                if (viewModel.get('btnSave')) {
                  viewModel.get('btnSave').setVisible(false);
                }

                if (viewModel.get('btnAbandon')) {
                  viewModel.get('btnAbandon').setVisible(false);
                }
              }
            }
          });
        } else {
          // 无审批状态时，也要改变按钮状态 TODO staterule 需和PC同步
          if (billtype.toLowerCase() !== "yylist") {
            staterule.runState(viewModel);

            if (params.mode && params.mode == "browse" && viewModel.get("btnSubmit")) {
              viewModel.get("btnSubmit").setVisible(false);
            }
          }
        }
      });
    }
  }, [billno]);
  var uiData = state.uiData,
      viewModel = state.viewModel; // TODO:

  if (uiData && uiData.cBillName) {
    document.title = uiData.cBillName;
    mtl.upesn && mtl.upesn.settingNavBar && mtl.upesn.settingNavBar({
      centerItems: [{
        title: uiData.cBillName
      }]
    });
  }

  var beeIcon = /*#__PURE__*/_react.default.createElement("img", {
    src: _mdf_loading.default,
    className: "beeIcon"
  });

  var beeTip = /*#__PURE__*/_react.default.createElement("div", {
    className: "beeTip"
  }, "\u52A0\u8F7D\u4E2D...");

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_tinperBee.Loading, {
    className: "beeLoading",
    tip: beeTip,
    container: this,
    show: isLoading,
    loadingType: "custom" //启用自定义图标
    ,
    indicator: beeIcon //自定义图标的内容

  }), uiData && uiData.view && render(_objectSpread(_objectSpread({}, uiData.view), {}, {
    cControlType: "view"
  }), viewModel, props));
}