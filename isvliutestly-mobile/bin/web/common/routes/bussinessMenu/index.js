"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _util = require("@mdf/cube/lib/helpers/util");

var _menu = _interopRequireDefault(require("@mdf/metaui-web/lib/components/basic/menu"));

var _treeData = _interopRequireDefault(require("./mock/treeData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

if (process.env.__CLIENT__) {
  require("./index.less");
}

var MenuTree = /*#__PURE__*/function (_Component) {
  _inherits(MenuTree, _Component);

  var _super = _createSuper(MenuTree);

  function MenuTree(props) {
    var _this;

    _classCallCheck(this, MenuTree);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getMenuTree", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var config, json, orgMenus, storeMenus, showOptions;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              config = {
                url: "getMenuTree",
                method: 'POST',
                options: {
                  uniform: false
                }
              };
              _context.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context.sent;

              if (!(json.code !== 200)) {
                _context.next = 9;
                break;
              }

              cb.utils.alert(json.message, 'error');
              console.log(_treeData.default);

              _this.setState({
                treeData: _treeData.default
              });

              return _context.abrupt("return");

            case 9:
              json.data = json.data || [];
              orgMenus = [], storeMenus = [];
              (0, _util.rebuildTreeData)(json.data, orgMenus, storeMenus);

              _this.setState({
                treeData: json.data
              }); //TODO 环境起不来，暂时不清楚以下代码的作用


              showOptions = {
                showOrg: orgMenus.length ? true : false,
                showStore: storeMenus.length ? true : false
              };

              if (showOptions.showStore) {
                showOptions.canBilling = storeMenus.find(function (item) {
                  return item.code.indexOf('RM0101') > -1;
                }) ? true : false;
              }

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "onClick", function (selectedKeys) {
      if (selectedKeys.length !== 1) return;
      var treeData = _this.state.treeData;
      var menuCode = selectedKeys[0];
      var returnData = [];

      _this.recursiveFind(treeData, menuCode, returnData);

      if (returnData.length !== 1) {
        cb.utils.alert("\u6CA1\u6709\u627E\u7740\u7F16\u7801\u4E3A".concat(menuCode, "\u7684\u83DC\u5355"), 'error');
        return;
      }

      var selectedNode = returnData[0];
      var menuId = selectedNode[_this.state.keyField];

      if (!menuId) {
        cb.utils.alert('menuId为空', 'warning');
        return;
      }

      var viewType = selectedNode.viewType;
      var path = ''; //拼接跳转的路径

      if (viewType) {
        if (viewType == 'meta') {
          path = viewType + '/' + selectedNode.metaType + '/' + selectedNode.metaKey;
        } else if (viewType == 'platform') {
          path = viewType + '/' + selectedNode.menuUrl;
        } else {
          cb.utils.alert('暂不支持其他类型', 'warning');
          returnl;
        }

        cb.route.pushPage(path);
      } else {
        return;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "recursiveFind", function (list, code, data) {
      if (!list.length) return;
      list.forEach(function (item) {
        if (item.children) {
          _this.recursiveFind(item.children, code, data);
        } else {
          if (item.code !== code) return;
          data.push(item);
        }
      });
    });

    _this.state = {
      treeData: [],
      keyField: 'code',
      titleField: 'name'
    };
    return _this;
  }

  _createClass(MenuTree, [{
    key: "componentWillMount",
    value: function componentWillMount() {//TODO 在这个位置请求，node端会报cb未定义错误
      //this.getMenuTree();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getMenuTree();
    }
  }, {
    key: "render",
    value: function render() {
      var treeData = this.state.treeData;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "menu-tree"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "menu-tree-container-title"
      }, "\u4E1A\u52A1\u529F\u80FD\u83DC\u5355(\u53EF\u8C03\u8BD5)"), /*#__PURE__*/_react.default.createElement("div", {
        className: "menu-tree-container"
      }, treeData.length > 0 && /*#__PURE__*/_react.default.createElement(_menu.default, {
        trigger: 'hover',
        defaultSelectedKeys: ['PORTAL'],
        titleField: this.state.titleField,
        keyField: this.state.keyField,
        dataSource: treeData,
        onSelect: this.onClick,
        id: 'menu2'
      })));
    }
  }]);

  return MenuTree;
}(_react.Component);

exports.default = MenuTree;