"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reactRouterRedux = require("react-router-redux");

var _portal = _interopRequireDefault(require("@mdf/metaui-web/lib/redux/portal"));

var _user = _interopRequireDefault(require("@mdf/metaui-web/lib/redux/user"));

var _tree = require("@mdf/metaui-web/lib/redux/tree");

var _tabs = require("@mdf/metaui-web/lib/redux/tabs");

var _userDefineArchives = _interopRequireDefault(require("@mdf/metaui-web/lib/redux/userDefineArchives"));

var _dynamicModal = _interopRequireDefault(require("@mdf/metaui-web/lib/redux/dynamicModal"));

var _print = _interopRequireDefault(require("@mdf/metaui-web/lib/redux/print"));

var _billDesign = _interopRequireDefault(require("@mdf/metaui-web/lib/redux/billDesign"));

var _loading = _interopRequireDefault(require("@mdf/metaui-web/lib/redux/loading"));

var _groupCondition = _interopRequireDefault(require("@mdf/metaui-web/lib/redux/groupCondition"));

var _formula = _interopRequireDefault(require("@mdf/metaui-web/lib/redux/formula"));

var _filterscheme = _interopRequireDefault(require("@mdf/metaui-web/lib/redux/filterscheme"));

var _newfilterscheme = _interopRequireDefault(require("@mdf/metaui-web-ncc/lib/redux/newfilterscheme"));

var _config = _interopRequireDefault(require("../routes/config.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*框架内置功能*/
//ncc
var mapReducer = function mapReducer(reducers) {
  var reducersMap = {};
  reducers.forEach(function (reducer) {
    if (reducer.moduleName && reducer.module) {
      var name = reducer.moduleName.toLowerCase();
      reducersMap[name] = reducer.module;
    }
  });
  return reducersMap;
};

var _default = (0, _redux.combineReducers)(Object.assign({
  portal: _portal.default,
  //meta渲染需要 暂时保留
  user: _user.default,
  //  src/client 有引用
  tree: _tree.tree,
  //meta渲染需要 暂时保留
  tabs: _tabs.tabs,
  //meta渲染需要 暂时保留
  userDefineArchives: _userDefineArchives.default,
  //自定义档案， 内置通用
  dynamicModal: _dynamicModal.default,
  //meta渲染需要
  print: _print.default,
  // 内置通用
  billDesign: _billDesign.default,
  // 内置通用
  routing: _reactRouterRedux.routerReducer,
  loading: _loading.default,
  // 内置通用
  groupCondition: _groupCondition.default,
  // meta渲染
  formula: _formula.default,
  // bill-design 模块
  filterscheme: _filterscheme.default,
  //filter 组件
  newfilterscheme: _newfilterscheme.default
}, mapReducer(_config.default)));

exports.default = _default;