"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Mytodo = void 0;

var _react = _interopRequireWildcard(require("react"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _SvgIcon = _interopRequireDefault(require("@mdf/metaui-web/lib/components/common/SvgIcon"));

var _tree = require("@mdf/metaui-web/lib/redux/tree");

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

;

var Mytodo = /*#__PURE__*/function (_Component) {
  _inherits(Mytodo, _Component);

  var _super = _createSuper(Mytodo);

  function Mytodo() {
    _classCallCheck(this, Mytodo);

    return _super.apply(this, arguments);
  }

  _createClass(Mytodo, [{
    key: "getMytodo",
    value: function getMytodo() {
      var _this = this;

      var todoList = this.props.home.todoList;
      if (!todoList) return null;
      var todos = [];
      todoList.forEach(function (item) {
        var caption = item.caption,
            icon = item.icon,
            menuCode = item.menuCode,
            condition = item.condition,
            count = item.count;
        todos.push( /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("div", {
          onClick: function onClick() {
            return _this.handleClick(menuCode, condition);
          },
          className: "home-my-con"
        }, /*#__PURE__*/_react.default.createElement("i", null, /*#__PURE__*/_react.default.createElement(_SvgIcon.default, {
          type: icon
        })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h4", null, caption), /*#__PURE__*/_react.default.createElement("p", null, count)))));
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "home-panel home-my-panel"
      }, /*#__PURE__*/_react.default.createElement("ul", {
        className: "home-panel-1",
        style: {
          'cursor': 'pointer'
        }
      }, todos));
    }
  }, {
    key: "handleClick",
    value: function handleClick(menuCode, condition) {
      this.props.execHandler(menuCode, {
        condition: condition
      });
    }
  }, {
    key: "render",
    value: function render() {
      var control = this.getMytodo();
      return control;
    }
  }]);

  return Mytodo;
}(_react.Component);

exports.Mytodo = Mytodo;

function mapStateToProps(state) {
  return {
    home: state.home.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    execHandler: (0, _redux.bindActionCreators)(_tree.execHandler, dispatch)
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Mytodo);

exports.default = _default;