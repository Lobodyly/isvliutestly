"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _label = _interopRequireDefault(require("@mdf/metaui-web/lib/components/basic/label"));

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

process.env.__CLIENT__ && require("./radiocolor.less");

var radioColor = /*#__PURE__*/function (_React$Component) {
  _inherits(radioColor, _React$Component);

  var _super = _createSuper(radioColor);

  function radioColor(props) {
    var _this;

    _classCallCheck(this, radioColor);

    _this = _super.call(this, props);
    var cStyle = props.cStyle,
        cFormatData = props.cFormatData;
    var config = null,
        format = null;

    if (cStyle) {
      try {
        config = JSON.parse(cStyle);
      } catch (e) {
        config = {};
      }
    }

    if (cFormatData) {
      try {
        format = JSON.parse(cFormatData);
      } catch (e) {}
    }

    var value = {
      font: '#fff',
      bg: '#007CEF'
    };
    _this.state = Object.assign({
      visible: !props.bHidden,
      value: value
    }, config);

    _this.props.model.setValue(value, true);

    return _this;
  }

  _createClass(radioColor, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.model) this.props.model.removeListener(this);
    } //render前

  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps, nextState) {} //render后

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.model) this.props.model.addListener(this);
    }
  }, {
    key: "handelClick",
    value: function handelClick(value, e) {
      if (this.props.model) {
        this.props.model.setValue(value, true);
      }

      this.setState({
        value: value
      });
    }
  }, {
    key: "baseControl",
    value: function baseControl() {
      var _this2 = this;

      var _this$state = this.state,
          value = _this$state.value,
          size = _this$state.size;
      var _color = [{
        font: '#fff',
        bg: '#FF7301'
      }, {
        font: '#fff',
        bg: '#FF404C'
      }, {
        font: '#fff',
        bg: '#EE4D9F'
      }, {
        font: '#fff',
        bg: '#007CEF'
      }, {
        font: '#fff',
        bg: '#2DBC68'
      }, {
        font: '#FF404C',
        bg: '#FFDCDC'
      }, {
        font: '#EE4D9F',
        bg: '#FFDEF3'
      }, {
        font: '#FF7301',
        bg: '#FFE6C9'
      }, {
        font: '#286CED',
        bg: '#D9ECFF'
      }, {
        font: '#22A85A',
        bg: '#C0F8D5'
      }];

      var _index;

      if (value) {
        _color.forEach(function (v, index) {
          if (v.font == value.font && v.bg == value.bg) {
            _index = index;
          }
        });
      }

      var _li = _color.map(function (v, index) {
        return /*#__PURE__*/_react.default.createElement("li", {
          style: {
            color: v.font,
            backgroundColor: v.bg
          },
          className: _index == index ? 'on' : null,
          onClick: _this2.handelClick.bind(_this2, v)
        }, "\u6807\u7B7E", index + 1, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("i", null)));
      });

      var content = /*#__PURE__*/_react.default.createElement("ul", null, _li);

      return content;
    }
  }, {
    key: "render",
    value: function render() {
      var cShowCaption = this.props.cShowCaption;
      var control = cShowCaption ? /*#__PURE__*/_react.default.createElement(_label.default, {
        control: this.baseControl(),
        title: /*#__PURE__*/_react.default.createElement("label", null, cShowCaption)
      }) : this.baseControl();
      var style = this.state.visible ? {} : {
        display: "none"
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        style: style,
        className: "basic-input-radiocolor"
      }, control);
    }
  }]);

  return radioColor;
}(_react.default.Component);

exports.default = radioColor;