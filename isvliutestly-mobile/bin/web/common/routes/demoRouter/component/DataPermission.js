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

var Icon = require('antd').Icon;

var Option = _antd.Select.Option;

if (process.env.__CLIENT__ === true) {
  require("./dataPermission.less");
}

var DataPermission = /*#__PURE__*/function (_Component) {
  _inherits(DataPermission, _Component);

  var _super = _createSuper(DataPermission);

  function DataPermission(props) {
    var _this;

    _classCallCheck(this, DataPermission);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleSelectChange", function (record, index, value) {
      var _this$props = _this.props,
          tableList = _this$props.tableList,
          referSortList = _this$props.referSortList,
          changeAuthList = _this$props.changeAuthList;
      var newTableList = JSON.parse(JSON.stringify(tableList));
      var selectedRefer = referSortList.find(function (item) {
        return item.id == value;
      });
      var newRecord = Object.assign({}, record, {
        managerRefer: value,
        controlEntityType: 1,
        "authControlEntitys": [{
          "fullnameDisplayName": "全部应用",
          "fullname": "all"
        }],
        "managerReferDisplayName": selectedRefer.name,
        authReferRules: [],
        managerReferInfo: {
          fullname: selectedRefer.fullname
        }
      });
      newTableList[index] = newRecord;
      changeAuthList(newTableList);
    });

    _defineProperty(_assertThisInitialized(_this), "changeRoleModle", function (record) {
      _this.setState({
        entityShow: true,
        selectedRecord: record
      });
    });

    _defineProperty(_assertThisInitialized(_this), "hideRoleModle", function () {
      _this.setState({
        entityShow: false,
        selectedRecord: {}
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleEntityPage", function (flag) {
      if (flag) {
        var selectedRecord = _this.state.selectedRecord;
        var _this$props2 = _this.props,
            tableList = _this$props2.tableList,
            changeAuthList = _this$props2.changeAuthList;
        var selectedIndex = tableList.findIndex(function (item) {
          return item.id == selectedRecord.id;
        });
        tableList.splice(selectedIndex, 1, selectedRecord);
        changeAuthList(tableList);
      }

      _this.setState({
        entityShow: false,
        selectedRecord: {}
      });
    });

    _this.state = {
      scopeShow: false,
      roleModelShow: false,
      clickedRecord: {},
      //记录选中项
      dataList: [],
      //维度列表
      creatData: {},
      //新增或者编辑维度获取的数据
      editType: '',
      //add 新建  edit 添加
      limitScopList: [],
      //权限范围弹窗数据
      selectedRecord: {},
      //编辑行 维度 范围 对象 要及时清空
      managerReferId: '',
      //管理维度筛选
      authManagerRefers: [],
      //权限维度
      referList: [] //点击列表权限范围，弹窗合并后的值

    };

    _this.columns = function (that) {
      return [{
        title: '权限管理维度',
        dataIndex: 'managerReferDisplayName',
        key: 'managerReferDisplayName',
        width: 300,
        className: 'weidu-select-box',
        render: function render(text, record, index) {
          var isEmpty = record.id && String(record.id).indexOf('emptyId') == 0;
          var referSortList = that.props.referSortList;
          var managerRefer = record.managerRefer;

          if (referSortList.length > 0 && isEmpty) {
            return /*#__PURE__*/_react.default.createElement("div", {
              className: ""
            }, /*#__PURE__*/_react.default.createElement(_antd.Select, {
              defaultValue: managerRefer,
              onChange: function onChange(value) {
                return that.handleSelectChange(record, index, value);
              }
            }, referSortList.map(function (item) {
              return /*#__PURE__*/_react.default.createElement(Option, {
                value: item.id,
                key: item.id
              }, item.name);
            })));
          }

          return /*#__PURE__*/_react.default.createElement("div", {
            className: "weidu-name"
          }, record.managerReferDisplayName);
        }
      }, {
        title: '权限范围',
        dataIndex: 'authReferRules',
        key: 'authReferRules',
        render: function render(text, record, index) {
          var roleAuthReferRules = record.authReferRules;
          var weiStr = '';

          if (roleAuthReferRules) {
            roleAuthReferRules.forEach(function (item) {
              var itemValues = item.values;
              weiStr += item.name;

              if (itemValues && itemValues.length > 0) {
                weiStr += '=[';
                itemValues.forEach(function (childItem, index) {
                  if (index == itemValues.length - 1) {
                    weiStr += childItem.name + '];';
                  } else if (index == 0) {
                    weiStr += childItem.name;
                  } else {
                    weiStr += ',' + childItem.name;
                  }
                });
              } else {
                weiStr += ';';
              }
            });
          }

          return /*#__PURE__*/_react.default.createElement("div", {
            className: "limite-scope"
          }, /*#__PURE__*/_react.default.createElement("span", null, weiStr), /*#__PURE__*/_react.default.createElement("div", {
            className: "icon-box"
          }, /*#__PURE__*/_react.default.createElement(Icon, {
            font: "classificationfenleieee",
            onClick: function onClick() {
              return that.showModal(record);
            }
          })));
        }
      }, {
        title: '受控对象',
        dataIndex: 'authControlEntitys',
        key: 'authControlEntitys',
        className: 'table-entity-row',
        width: 500,
        render: function render(text, record, index) {
          var controlEntityType = record.controlEntityType; //1 全部应用 2部分应用 3 高级设置

          var authControlEntitys = record.authControlEntitys;

          if (authControlEntitys && authControlEntitys.length > 0) {
            return /*#__PURE__*/_react.default.createElement("div", {
              className: "table-entity-box clearfix"
            }, /*#__PURE__*/_react.default.createElement("div", {
              className: "entity-name-container"
            }, authControlEntitys.map(function (item, index) {
              if (index == authControlEntitys.length - 1) {
                return /*#__PURE__*/_react.default.createElement("span", {
                  key: item.id
                }, item.fullnameDisplayName);
              } else {
                return /*#__PURE__*/_react.default.createElement("span", {
                  key: item.id
                }, "".concat(item.fullnameDisplayName, " ;"));
              }
            })), /*#__PURE__*/_react.default.createElement("div", {
              className: "icon-box"
            }, /*#__PURE__*/_react.default.createElement(Icon, {
              font: "classificationfenleieee",
              onClick: function onClick(e) {
                e.stopPropagation();
                that.changeRoleModle(record);
              }
            })));
          }
        }
      }, {
        title: '',
        width: 200,
        dataIndex: 'action',
        key: 'action',
        render: function render(text, record, index) {
          var id = record.id;
          return /*#__PURE__*/_react.default.createElement("div", {
            className: "action-btns-container clearfix"
          }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
            className: "action-btn",
            onClick: function onClick(e) {
              e.stopPropagation();
              that.askDelete(index);
            }
          }, "\u5220\u9664"));
        }
      }];
    }(_assertThisInitialized(_this));

    return _this;
  }

  _createClass(DataPermission, [{
    key: "componentWillMount",
    value: function componentWillMount() {//this.getManagerRefer();
    }
    /*========列表=========*/
    //切换行 权限维度

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var tableList = this.props.tableList;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "data-permission-container "
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "main-page-table",
        ref: function ref(node) {
          return _this2.mainPageTable = node;
        }
      }, /*#__PURE__*/_react.default.createElement(_antd.Table, {
        columns: this.columns,
        bordered: true,
        dataSource: tableList,
        pagination: false,
        rowKey: function rowKey(record, index) {
          return index;
        }
      })));
    }
  }]);

  return DataPermission;
}(_react.Component);

exports.default = DataPermission;