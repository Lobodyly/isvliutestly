"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _basic = require("@mdf/metaui-web/lib/components/basic");

var _HomeTitle = _interopRequireDefault(require("./HomeTitle"));

var _SaleRank = _interopRequireDefault(require("./SaleRank"));

var _MyToDo = _interopRequireDefault(require("./MyToDo"));

var _SaleTrend = _interopRequireDefault(require("./SaleTrend"));

var _TaskList = _interopRequireDefault(require("./TaskList"));

var _Card = _interopRequireDefault(require("./Card"));

var _CommonFunctions = _interopRequireDefault(require("./CommonFunctions"));

var homeActions = _interopRequireWildcard(require("../../redux/modules/home"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

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

var HomeControl = /*#__PURE__*/function (_React$Component) {
  _inherits(HomeControl, _React$Component);

  var _super = _createSuper(HomeControl);

  function HomeControl(props) {
    var _this;

    _classCallCheck(this, HomeControl);

    _this = _super.call(this, props);
    _this.rowKey = 0;
    _this.colKey = 0;
    return _this;
  }

  _createClass(HomeControl, [{
    key: "getControlByType",
    value: function getControlByType(ele) {
      var cControlType = ele.cControlType;
      var control;

      switch (cControlType) {
        case 'SaleRank':
          control = /*#__PURE__*/_react.default.createElement(_SaleRank.default, {
            title: ele.title,
            type: ele.type
          });
          break;

        case 'MyToDo':
          control = /*#__PURE__*/_react.default.createElement(_MyToDo.default, null);
          break;

        case 'SaleTrend':
          var clientWidth = document.documentElement.clientWidth;
          var width = (clientWidth - 150 - 20) * (2 / 3) * 0.5;
          width = width - 40;
          control = /*#__PURE__*/_react.default.createElement(_SaleTrend.default, {
            width: width
          });
          break;

        case 'TaskList':
          control = /*#__PURE__*/_react.default.createElement(_TaskList.default, null);
          break;

        case 'Card':
          control = /*#__PURE__*/_react.default.createElement(_Card.default, {
            title: ele.title,
            type: ele.type
          });
          break;

        case 'CommonFunctions':
          control = /*#__PURE__*/_react.default.createElement(_CommonFunctions.default, {
            title: ele.title
          });
          break;
        // case 'DistributionMap':
        //     control = (<DistributionMap title={ele.title} />);
        //     break;
      }

      return control;
    }
  }, {
    key: "getRowControl",
    value: function getRowControl(row) {
      var rowControl = [];
      row.forEach(function (ele) {
        var colControl = this.getColControl(ele.col);
        rowControl.push( /*#__PURE__*/_react.default.createElement(_basic.Row, {
          colCount: 12
        }, colControl));
      }, this);
      return rowControl;
    }
  }, {
    key: "getColControl",
    value: function getColControl(col) {
      var colControl = [];
      col.forEach(function (ele) {
        var colKey = "col".concat(this.colKey++);

        if (ele.row) {
          var row = this.getRowControl(ele.row);
          colControl.push( /*#__PURE__*/_react.default.createElement(_basic.Col, {
            span: ele.span
          }, row));
        } else {
          var control = this.getControlByType(ele);
          colControl.push( /*#__PURE__*/_react.default.createElement(_basic.Col, {
            span: ele.span
          }, control));
        }
      }, this);
      return colControl;
    }
  }, {
    key: "getControlByLayout",
    value: function getControlByLayout(layoutJson) {
      var row = layoutJson.row;
      var rowControl = this.getRowControl(row);
      return rowControl;
    }
  }, {
    key: "render",
    value: function render() {
      var layOut = this.props.home.layOut;
      if (!layOut) return null;
      var control = this.getControlByLayout(layOut);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "home-1"
      }, control);
    }
  }]);

  return HomeControl;
}(_react.default.Component);

function mapStateToProps(state) {
  return {
    home: state.home.toJS()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    homeActions: (0, _redux.bindActionCreators)(homeActions, dispatch)
  };
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(HomeControl);

exports.default = _default;