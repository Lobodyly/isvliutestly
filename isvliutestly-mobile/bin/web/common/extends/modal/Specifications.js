"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _util = require("@mdf/cube/lib/helpers/util");

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

process.env.__CLIENT__ && require("./specifications.less");

var Specifications = /*#__PURE__*/function (_React$Component) {
  _inherits(Specifications, _React$Component);

  var _super = _createSuper(Specifications);

  function Specifications(props) {
    var _this;

    _classCallCheck(this, Specifications);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleOk", function (e) {
      var _specsCheckedData = _this.state.specs.filter(function (v) {
        return v.checked;
      });

      if (!_specsCheckedData.length) {
        cb.utils.alert('请选择' + _this.modelTitle[_this.props.childrenField] + '值', 'warning');
        return false;
      }

      if (_this.props.childrenField == 'SpecSums' && _specsCheckedData.length > 5) {
        cb.utils.alert('最多选择5个规格', 'warning');
        return false;
      }

      _this.props.model.execute('afterHandleOK', {
        key: 'Specifications',
        value: _specsCheckedData
      });

      _this.props.close();
    });

    _defineProperty(_assertThisInitialized(_this), "getspecitem", function (specs, index, isChecked) {
      // 是否改变 recordList 里面checked的值
      if (!isChecked) {
        _this.setState({
          loading: true
        });
      }

      var config = {
        "url": '/bill/ref/getRefData',
        "method": 'POST',
        "params": {
          "refCode": "pc_userdefref",
          "billnum": "pc_producttpl",
          "mapCondition": {
            "defineId": specs[index].defineId
          },
          "page": {
            "pageSize": 6000,
            "pageIndex": 1
          }
        }
      };
      (0, _util.proxy)(config).then(function (json) {
        if (json.code !== 200) return;
        var recordList = json.data.gridData.recordList;

        if (specs[index].default) {
          // 需要合并
          recordList.map(function (val) {
            specitemlist: for (var i = 0, len = specs[index].recordList.length; i < len; i++) {
              if (val.name == specs[index].recordList[i].name) {
                val.checked = true;
                break specitemlist;
              }
            }
          });
          specs[index].recordList = recordList;
          specs[index].default = 0;
        } else {
          specs[index].recordList = recordList;
        }

        if (isChecked) {
          isChecked = specs[index].checked;
          specs[index].recordList.map(function (v) {
            v.checked = isChecked;
          });
        }

        _this.setState({
          specs: specs,
          index: index,
          loading: false
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function (e) {
      _this.props.close();
    });

    _defineProperty(_assertThisInitialized(_this), "handleSpecsChange", function (index, e) {
      e.stopPropagation();
      var specs = _this.state.specs;

      if (_this.props.childrenField == 'SpecSums') {
        var _specsCheckedData = specs.filter(function (v) {
          return v.checked;
        });

        if (_specsCheckedData.length >= 5) {
          cb.utils.alert('最多选择5个规格', 'warning');
          return false;
        }
      }

      specs[index].checked = !specs[index].checked;

      if (!specs[index].recordList || specs[index].default) {
        //当没有子规格  ，发送请求
        // proxy 请求 当前的规格值
        _this.getspecitem(specs, index, true);
      } else {
        specs[index].recordList.map(function (v) {
          v.checked = specs[index].checked;
        });

        _this.setState({
          specs: specs,
          index: index,
          loading: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSpecsClick", function (index, e) {
      e.stopPropagation();
      var specs = _this.state.specs;

      if (!specs[index].recordList || specs[index].default) {
        // proxy 请求 当前的规格值
        _this.getspecitem(specs, index, false);
      } else {
        _this.setState({
          index: index,
          loading: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "changeSpecsItem", function (i, e) {
      e.stopPropagation();
      var _this$state = _this.state,
          specs = _this$state.specs,
          index = _this$state.index;
      specs[index].recordList[i].checked = !specs[index].recordList[i].checked;
      var checked = false;
      specs[index].checked = false;
      specs[index].recordList.forEach(function (val) {
        if (!checked && val.checked) {
          checked = true;
          specs[index].checked = true;
        }
      });

      _this.setState(specs);
    });

    _this.classId = {
      SpecSums: 'productSpec',
      PropertySums: 'productArchive',
      SKUPropertySums: 'productSku',
      OrderPropertySums: 'productOrder'
    };
    _this.modelTitle = {
      SpecSums: '商品规格',
      PropertySums: '商品属性',
      SKUPropertySums: 'SKU属性',
      OrderPropertySums: '订单属性'
    };
    _this.state = {
      specs: [],
      index: 0,
      isSpec: false,
      loading: true
    };
    return _this;
  }

  _createClass(Specifications, [{
    key: "ltrim",
    value: function ltrim(str) {
      return typeof str === 'string' ? str.replace(/(^\s*)/g, "") : '';
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var config = {
        url: '/bill/ref/getRefData',
        method: 'POST',
        params: {
          "refCode": "pc_userdefclassref",
          "billnum": "pc_producttpl",
          "mapCondition": {
            classId: this.classId[this.props.childrenField]
          },
          "page": {
            "pageSize": 6000,
            "pageIndex": 1
          }
        }
      };
      (0, _util.proxy)(config).then(function (json) {
        if (json.code !== 200) return;
        json.data.gridData.recordList.map(function (val) {
          return val['checked'] = false;
        });
        var specs = json.data.gridData.recordList;
        var _data = _this2.props.data;

        if (!specs.length) {
          _this2.setState({
            isSpec: true,
            loading: false
          });

          return false;
        }

        _data.length && specs.map(function (val) {
          val.default = 0; // 默认传过来的是否有值

          var _spec = _data.filter(function (v) {
            return val.id == v.specification || val.id == v.propertyType;
          });

          if (_spec.length) {
            val.checked = true;
            val.default = 1;
            var recordList;

            switch (_this2.props.childrenField) {
              case 'SpecSums':
                var specitemList = (_spec[0].specitem || '').split(';');
                var erpNameList = (_spec[0].erpName || '').split(';');
                recordList = specitemList.map(function (v, index) {
                  return {
                    name: _this2.ltrim(v),
                    checked: true,
                    erpName: _this2.ltrim(erpNameList[index])
                  };
                });
                break;

              case 'PropertySums':
              case 'SKUPropertySums':
              case 'OrderPropertySums':
                var _values = (_spec[0].values || '').split(';');

                recordList = _values.map(function (v) {
                  return {
                    name: _this2.ltrim(v),
                    checked: true
                  };
                }) || [];
                break;

              default:
            }

            val.recordList = recordList;
          }

          return val;
        });

        _this2.getspecitem(specs, 0, false);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state2 = this.state,
          specs = _this$state2.specs,
          index = _this$state2.index,
          isSpec = _this$state2.isSpec;
      var Specs = specs.length ? specs.map(function (val, index) {
        return /*#__PURE__*/_react.default.createElement("p", {
          className: "clearfix",
          key: index,
          onClick: _this3.handleSpecsClick.bind(_this3, index)
        }, /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
          style: {
            float: 'left'
          },
          onChange: _this3.handleSpecsChange.bind(_this3, index),
          checked: val.checked
        }), /*#__PURE__*/_react.default.createElement("span", {
          title: val.showItem || val.item
        }, val.showItem || val.item));
      }) : '';
      var Subspecs = specs.length && specs[index]['recordList'] && specs[index]['recordList'].length ? specs[index]['recordList'].map(function (val, i) {
        return /*#__PURE__*/_react.default.createElement("p", {
          key: i
        }, /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
          onChange: _this3.changeSpecsItem.bind(_this3, i),
          checked: val.checked
        }, val.name));
      }) : '';
      var IsSpec = isSpec ? /*#__PURE__*/_react.default.createElement("p", null, "\u6CA1\u6709", this.modelTitle[this.props.childrenField]) : '';
      var IsSubspec = specs.length && specs[index]['recordList'] && !specs[index]['recordList'].length ? /*#__PURE__*/_react.default.createElement("p", null, "\u6CA1\u6709", this.modelTitle[this.props.childrenField] + '值') : '';
      return /*#__PURE__*/_react.default.createElement(_antd.Modal, {
        visible: true,
        title: '选择' + this.modelTitle[this.props.childrenField],
        width: "600",
        height: "500",
        onCancel: this.handleCancel,
        footer: null
      }, /*#__PURE__*/_react.default.createElement(_antd.Spin, {
        spinning: this.state.loading
      }, /*#__PURE__*/_react.default.createElement(_antd.Row, {
        gutter: 24
      }, /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: 12
      }, /*#__PURE__*/_react.default.createElement("p", {
        className: "code-title"
      }, '选择' + this.modelTitle[this.props.childrenField], this.props.childrenField == 'SpecSums' ? /*#__PURE__*/_react.default.createElement("em", null, "(\u6700\u591A\u9009\u62E9", /*#__PURE__*/_react.default.createElement("i", null, "5"), "\u4E2A\u89C4\u683C)") : null), /*#__PURE__*/_react.default.createElement("div", {
        className: "code-box"
      }, Specs, IsSpec)), /*#__PURE__*/_react.default.createElement(_antd.Col, {
        span: 12
      }, /*#__PURE__*/_react.default.createElement("p", {
        className: "code-title"
      }, '选择' + this.modelTitle[this.props.childrenField] + '值'), /*#__PURE__*/_react.default.createElement("div", {
        className: "code-box"
      }, Subspecs, IsSubspec))), /*#__PURE__*/_react.default.createElement("div", {
        className: "ant-modal-footer",
        style: {
          borderTop: 'none',
          "paddingRight": 0,
          "paddingBottom": 0
        }
      }, /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: "ant-btn ant-btn-lg",
        onClick: this.handleCancel
      }, /*#__PURE__*/_react.default.createElement("span", null, "\u53D6 \u6D88")), /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: "ant-btn ant-btn-primary ant-btn-lg",
        onClick: this.handleOk.bind(this)
      }, /*#__PURE__*/_react.default.createElement("span", null, "\u786E \u5B9A")))));
    }
  }]);

  return Specifications;
}(_react.default.Component);

exports.default = Specifications;