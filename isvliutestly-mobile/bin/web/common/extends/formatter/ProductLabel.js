"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

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

var ProductLabel = /*#__PURE__*/function (_Component) {
  _inherits(ProductLabel, _Component);

  var _super = _createSuper(ProductLabel);

  function ProductLabel(props) {
    var _this;

    _classCallCheck(this, ProductLabel);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getlen", function (tagname) {
      // 计算字符串的长度
      return tagname.replace(/[\u0391-\uFFE5]/g, "aa").length * 6 + 15;
    });

    return _this;
  }

  _createClass(ProductLabel, [{
    key: "getControl",
    value: function getControl() {
      var _this2 = this;

      var width = this.props.rowInfo.width;
      var moreWidth = 27; // 三个点宽度

      var propsPaddingWidth = 24; // 容器padding

      var tags = this.props.rowData.tags || [];
      var showTags = []; // 外显标签

      var moreTags = []; // 三个点里面的标签

      var firstTags = []; // 第一行标签

      var morefirstTags = []; // 超过第一行的标签

      var secondTags = []; // 第二行标签

      var firstCountLength = 0; // tags width

      var liControl = [];
      tags.forEach(function (value, index, list) {
        firstCountLength += _this2.getlen(value.tagId_name);

        if (firstCountLength > width - propsPaddingWidth) {
          morefirstTags.push(value);
        } else {
          firstTags.push(value);
        }
      });
      var secondCountLength = 0; // tags width

      morefirstTags.length && morefirstTags.forEach(function (value, index, list) {
        secondCountLength += _this2.getlen(value.tagId_name);

        if (secondCountLength + moreWidth > width - propsPaddingWidth) {
          moreTags.push(value);
        } else {
          secondTags.push(value);
        }
      });
      showTags = [].concat(firstTags, secondTags);
      liControl = showTags.map(function (val, index) {
        return /*#__PURE__*/_react.default.createElement("li", {
          style: {
            background: val.tagId_tag_bgcolor,
            color: val.tagId_tag_fgcolor
          },
          title: val.tagId_name
        }, val.tagId_name);
      });
      var content;
      var contentInner = [];

      if (moreTags.length) {
        contentInner = moreTags.map(function (val, index) {
          return /*#__PURE__*/_react.default.createElement("p", null, val.tagId_name);
        });
        content = /*#__PURE__*/_react.default.createElement("div", {
          className: "product-tag-popover"
        }, contentInner);
        liControl.push( /*#__PURE__*/_react.default.createElement(_antd.Popover, {
          placement: "bottom",
          content: content,
          trigger: "click"
        }, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("i", {
          className: "anticon anticon-ellipsis"
        }))));
      }

      return liControl;
    }
  }, {
    key: "render",
    value: function render() {
      var tags = this.props.rowData.tags || [];
      var width = this.props.rowInfo.width;
      var Tags = this.getControl();
      return /*#__PURE__*/_react.default.createElement("ul", {
        className: "product-tag",
        title: "\u6807\u7B7E"
      }, Tags);
    }
  }]);

  return ProductLabel;
}(_react.Component);

exports.default = ProductLabel;