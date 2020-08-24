"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearLayOut = clearLayOut;
exports.getLayOut = getLayOut;
exports.setOptions = setOptions;
exports.saleTrendChangeShop = saleTrendChangeShop;
exports.getTaskListData = getTaskListData;
exports.getSaleRankData = getSaleRankData;
exports.getSaleTrendData = getSaleTrendData;
exports.getMessageData = getMessageData;
exports.markReaded = markReaded;
exports.getMyToDo = exports.default = void 0;

var _immutable = _interopRequireDefault(require("immutable"));

var _moment = _interopRequireDefault(require("moment"));

var _util = require("@mdf/cube/lib/helpers/util");

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var $$initialState = _immutable.default.fromJS({
  portalMessageData: [],

  /* 门户消息数据 */
  layOut: null,
  kanbans: [],
  showShops: [],
  // saleTrend 图表门店
  // shops: ['三里屯店', '西单店', '中关村店'], //saleTrend 表头门店 trend_showData的name的集合
  trend_showData: [{
    name: '三里屯店',
    data: [120, 132, 101, 134, 890, 230, 210, 100, 800]
  }, {
    name: '西单店',
    data: [220, 182, 191, 234, 290, 330, 310, 102, 109]
  }, {
    name: '中关村店',
    data: [320, 332, 301, 334, 390, 330, 320, 201, 100]
  }],
  trend_serviceData: [{
    name: '三里屯店',
    data: [120, 132, 101, 134, 890, 230, 210, 100, 800]
  }, {
    name: '西单店',
    data: [220, 182, 191, 234, 290, 330, 310, 102, 109]
  }, {
    name: '中关村店',
    data: [320, 332, 301, 334, 390, 330, 320, 201, 100]
  }]
});

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'PLATFORM_UI_HOME_GET_LAYOUT':
      return state.merge({
        layOut: action.payload
      });

    case 'PLATFORM_UI_HOME_GET_KANBAN':
      return state.merge({
        kanbans: action.payload
      });

    case 'PLATFORM_UI_HOME_SET_OPTIONS':
      return state.merge(action.payload);

    case 'PLATFORM_UI_HOME_SALE_TREND_CHANGE_SHOP_DATA':
      return state.merge({
        trend_showData: action.payload
      });

    default:
      return state;
  }
};

exports.default = _default;

var setLayOutJson = function setLayOutJson(data, json, showStore) {
  // fangqg: 根据hur支持问题，默认都给放开
  json = [JSON.stringify([{
    title: '营业概览',
    order: 0,
    showIcon: false,
    visible: true
  }, {
    title: '销售排行',
    order: 1,
    showIcon: false,
    visible: true
  }, {
    title: '门店销售趋势',
    order: 2,
    showIcon: false,
    visible: true
  }])];
  var layOutJson = data.row[0].col[0].row;
  var layOut = null;

  try {
    var components = {};
    json.forEach(function (role) {
      var roleLayout = JSON.parse(role);
      roleLayout.forEach(function (item) {
        if (!item.visible) return;
        if (!showStore && item.title === '门店销售趋势') return;
        components[item.title] = item;
      });
    });
    layOut = [];

    for (var attr in components) {
      layOut.push(components[attr]);
    }
  } catch (e) {
    console.error('门户组件布局' + json + '有错误：' + e.message);
  }

  if (layOut) {
    layOut.forEach(function (element) {
      var titleName;

      switch (element.title) {
        case '营业概览':
          titleName = 'TaskList';
          break;

        case '销售排行':
          titleName = 'SaleRank';
          break;

        case '门店销售趋势':
          titleName = 'SaleTrend';
          break;
      }

      layOutJson.push({
        col: [{
          span: 12,
          cControlType: titleName,
          title: element.title
        }]
      });
    }, _this);
    return data;
  } else {
    return '';
  }
};

function clearLayOut() {
  return (0, _util.genAction)('PLATFORM_UI_HOME_GET_LAYOUT', null);
}

function getLayOut(data) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
      var _getState$user$toJS, showStore, row, layoutJson, desktops, config, json, _json$data, layouts, kanbans;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _getState$user$toJS = getState().user.toJS(), showStore = _getState$user$toJS.showStore;
              row = showStore ? [{
                col: [{
                  span: 12,
                  cControlType: 'MyToDo'
                }]
              }] : [];
              layoutJson = {
                row: [{
                  col: [{
                    span: 8,
                    row: row
                  }, {
                    span: 4,
                    row: [{
                      col: [{
                        span: 12,
                        cControlType: 'CommonFunctions',
                        title: '常用功能'
                      }]
                    }, {
                      col: [{
                        span: 12,
                        cControlType: 'Card',
                        title: '通知公告',
                        type: 'knowledge'
                      }]
                    }]
                  }]
                }]
              };
              desktops = [];
              config = {
                url: 'layout/getLayoutByUserId.do',
                method: 'GET'
              };
              _context.next = 7;
              return (0, _util.proxy)(config);

            case 7:
              json = _context.sent;

              if (json.code !== 200) {
                cb.utils.alert(json.message, 'error');
              } else {
                _json$data = json.data, layouts = _json$data.layouts, kanbans = _json$data.kanbans;
                setLayOutJson(layoutJson, layouts, showStore);
                if (kanbans && kanbans.length) desktops = kanbans.filter(function (item) {
                  return item.type === 2;
                });
              }

              dispatch((0, _util.genAction)('PLATFORM_UI_HOME_GET_LAYOUT', layoutJson));
              dispatch((0, _util.genAction)('PLATFORM_UI_HOME_GET_KANBAN', desktops));
              dispatch(getMyToDo());

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
}

var getMyToDo = function getMyToDo() {
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
      var _getState$user$toJS2, showStore, storeId, data, config, json, billNumObj, otherWarehouse, warehouses, value1, todoList, attr;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _getState$user$toJS2 = getState().user.toJS(), showStore = _getState$user$toJS2.showStore, storeId = _getState$user$toJS2.storeId;

              if (showStore) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return");

            case 3:
              data = {
                preSell: {
                  caption: '预订待发',
                  icon: 'yudingdaifa1',
                  menuCode: 'RM0102',
                  condition: {
                    isExtend: true,
                    simpleVOs: [{
                      field: 'store',
                      op: 'eq',
                      value1: storeId
                    }, {
                      field: 'iPresellState',
                      op: 'eq',
                      value1: 1
                    }, {
                      field: 'iDeliveryState',
                      op: 'eq',
                      value1: 0
                    }, {
                      field: 'dPlanShipmentDate',
                      op: 'lt',
                      value1: (0, _moment.default)().add(cb.rest.AppContext.option.ordershipdate, 'days').format('YYYY-MM-DD HH:mm:ss')
                    }],
                    commonVOs: [{
                      itemName: 'iPresellState',
                      value1: 1
                    }, {
                      itemName: 'iDeliveryState',
                      value1: 0
                    }]
                  }
                },
                transferApply: {
                  caption: '调拨待出',
                  icon: 'tiaobodaichu',
                  menuCode: 'YH03',
                  condition: {
                    isExtend: true,
                    simpleVOs: [{
                      field: 'outstore',
                      op: 'eq',
                      value1: storeId
                    }, {
                      field: 'status',
                      op: 'eq',
                      value1: 1
                    }],
                    commonVOs: [{
                      itemName: 'status',
                      value1: ['1']
                    }]
                  }
                },
                returnApply: {
                  caption: '退货待出',
                  icon: 'tuihuodaichu',
                  menuCode: 'YH02',
                  condition: {
                    isExtend: true,
                    simpleVOs: [// { field: 'store', op: 'eq', value1: storeId },
                    {
                      field: 'bizstatus',
                      op: 'eq',
                      value1: 2
                    }],
                    commonVOs: [{
                      itemName: 'bizstatus',
                      value1: ['2']
                    }]
                  }
                },
                demandApply: {
                  caption: '要货待提交',
                  icon: 'yaohuodaiqueren1',
                  menuCode: 'YH04',
                  condition: {
                    isExtend: true,
                    simpleVOs: [// { field: 'store', op: 'eq', value1: storeId },
                    {
                      field: 'bizstatus',
                      op: 'eq',
                      value1: 0
                    }],
                    commonVOs: [{
                      itemName: 'bizstatus',
                      value1: ['0']
                    }]
                  }
                },
                storeNotice: {
                  caption: '待入库',
                  icon: 'dairuku2',
                  menuCode: 'YH01',
                  condition: {
                    isExtend: true,
                    simpleVOs: [{
                      field: 'bizstatus',
                      op: 'eq',
                      value1: 0
                    }],
                    commonVOs: [{
                      itemName: 'bizstatus',
                      value1: ['0']
                    }]
                  }
                }
              };
              config = {
                url: 'bill/portal/getBillNum',
                method: 'GET'
              };
              _context2.next = 7;
              return (0, _util.proxy)(config);

            case 7:
              json = _context2.sent;

              if (!(json.code !== 200)) {
                _context2.next = 11;
                break;
              }

              cb.utils.alert(json.message, 'error');
              return _context2.abrupt("return");

            case 11:
              billNumObj = json.data;
              config = {
                url: 'billTemplateSet/getCurrentStoreWarehouse',
                method: 'GET',
                params: {
                  storeId: storeId
                }
              };
              _context2.next = 15;
              return (0, _util.proxy)(config);

            case 15:
              json = _context2.sent;

              if (json.code === 200) {
                otherWarehouse = json.data.otherWarehouse;
                warehouses = otherWarehouse;
                value1 = [];
                warehouses && warehouses.forEach(function (item) {
                  value1.push(item.warehouse);
                });
                data.returnApply.condition.simpleVOs.push({
                  field: 'outwarehouse',
                  op: 'in',
                  value1: value1
                });
                data.demandApply.condition.simpleVOs.push({
                  field: 'demandWarehouse',
                  op: 'in',
                  value1: value1
                });
                data.storeNotice.condition.simpleVOs.push({
                  field: 'inWarehouse',
                  op: 'in',
                  value1: value1
                });
              }

              todoList = [];

              try {
                for (attr in data) {
                  todoList.push(Object.assign({
                    count: billNumObj[attr] || 0
                  }, data[attr]));
                }
              } catch (e) {}

              dispatch(setOptions({
                todoList: todoList
              }));

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();
};

exports.getMyToDo = getMyToDo;

function setOptions(data) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_UI_HOME_SET_OPTIONS', data));
  };
}

function saleTrendChangeShop(shop) {
  return function (dispatch, getState) {
    var data = getState().home.toJS().trend_serviceData;
    var changeShopData = [];
    shop.forEach(function (element) {
      data.forEach(function (item) {
        if (element == item.name) {
          changeShopData.push(item);
        }
      });
    });
    dispatch((0, _util.genAction)('PLATFORM_UI_HOME_SALE_TREND_CHANGE_SHOP_DATA', changeShopData));
  };
} // 经营概览


function getTaskListData(options) {
  return /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
      var now, beginDate, endDate, compareBeginDate, compareEndDate, _getState$user$toJS3, storeId, showStore, store_id, config, json, sourceData;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // new Date(now.getTime() - 1000 * 60 * 60 * 24 * 15).format('yyyy-MM-dd');
              now = new Date();
              beginDate = options.beginDate || new Date(now.getTime() - 1000 * 60 * 60 * 24 * 1).format('yyyy-MM-dd');
              endDate = options.endDate || new Date(now.getTime() - 1000 * 60 * 60 * 24 * 1).format('yyyy-MM-dd');
              compareBeginDate = options.compareBeginDate || new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2).format('yyyy-MM-dd');
              compareEndDate = options.compareEndDate || new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2).format('yyyy-MM-dd');
              _getState$user$toJS3 = getState().user.toJS(), storeId = _getState$user$toJS3.storeId, showStore = _getState$user$toJS3.showStore;
              store_id = showStore === false ? '全部' : options.store_id || storeId || '全部';
              config = {
                url: '/report/getSaleAnalysisQueryData',
                // url: "/report/getSaleRankingQueryData",
                method: 'POST',
                params: {
                  storeId: store_id,
                  beginDate: beginDate,
                  endDate: endDate,
                  compareBeginDate: compareBeginDate,
                  compareEndDate: compareEndDate
                }
              };
              _context3.next = 10;
              return (0, _util.proxy)(config);

            case 10:
              json = _context3.sent;

              if (json.code === 200) {
                sourceData = json.data;
                dispatch((0, _util.genAction)('PLATFORM_UI_HOME_SET_OPTIONS', {
                  taskListData: sourceData
                }));
              } else {
                cb.utils.alert(json.message, 'error');
              }

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();
} // 销售排行


function getSaleRankData(options) {
  return /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
      var now, beginDate, endDate, _getState$user$toJS4, storeId, showStore, store_id, config, json;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              now = new Date();
              beginDate = options.beginDate || new Date(now.getTime() - 1000 * 60 * 60 * 24 * 1).format('yyyy-MM-dd');
              endDate = options.endDate || new Date(now.getTime() - 1000 * 60 * 60 * 24 * 1).format('yyyy-MM-dd');
              _getState$user$toJS4 = getState().user.toJS(), storeId = _getState$user$toJS4.storeId, showStore = _getState$user$toJS4.showStore;
              store_id = showStore === false ? '全部' : options.store_id || storeId || '全部';
              config = {
                url: '/report/getSaleRankingQueryData',
                method: 'POST',
                params: {
                  storeId: store_id,
                  beginDate: beginDate,
                  endDate: endDate
                }
              };
              _context4.next = 8;
              return (0, _util.proxy)(config);

            case 8:
              json = _context4.sent;

              if (json.code === 200) {
                dispatch((0, _util.genAction)('PLATFORM_UI_HOME_SET_OPTIONS', {
                  saleRankData: json.data
                }));
              } else {
                cb.utils.alert(json.message, 'error');
              }

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();
} // 销售趋势


function getSaleTrendData(options) {
  return /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch, getState) {
      var now, beginDate, endDate, _getState$user$toJS5, storeId, showStore, store_id, config, json;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              now = new Date();
              beginDate = options.beginDate || new Date(now.getTime() - 1000 * 60 * 60 * 24 * 6).format('yyyy-MM-dd');
              endDate = options.endDate || now.format('yyyy-MM-dd');
              _getState$user$toJS5 = getState().user.toJS(), storeId = _getState$user$toJS5.storeId, showStore = _getState$user$toJS5.showStore;
              store_id = showStore === false ? ['全部'] : options.store_id || (storeId ? [storeId] : ['全部']);
              config = {
                url: '/report/getSaleTrendAnalysisQueryData',
                method: 'POST',
                params: {
                  storeId: store_id,
                  beginDate: beginDate,
                  endDate: endDate
                }
              };
              _context5.next = 8;
              return (0, _util.proxy)(config);

            case 8:
              json = _context5.sent;

              if (json.code === 200) {
                dispatch((0, _util.genAction)('PLATFORM_UI_HOME_SET_OPTIONS', {
                  saleTrendData: json.data.storeBizObjects
                }));
              } else {
                cb.utils.alert(json.message, 'error');
              }

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();
}
/* 门户消息 */


function getMessageData() {
  return /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(dispatch, getState) {
      var config, json, data;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              config = {
                url: 'bill/list.do',
                method: 'POST',
                params: {
                  billnum: 'aa_messagelist',
                  condition: {
                    simpleVOs: [{
                      field: 'status',
                      op: 'eq',
                      value1: false
                    }]
                  }
                }
              };
              _context6.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context6.sent;

              if (!(json.code !== 200)) {
                _context6.next = 7;
                break;
              }

              cb.utils.alert(json.message, 'error');
              return _context6.abrupt("return");

            case 7:
              data = [];
              if (json.data && json.data.recordList) data = json.data.recordList;
              dispatch((0, _util.genAction)('PLATFORM_UI_HOME_SET_OPTIONS', {
                portalMessageData: data
              }));

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();
}
/* 门户消息标记已读 */


function markReaded(ids) {
  return /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(dispatch) {
      var config, json, error;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (!(!ids || ids.length == 0)) {
                _context7.next = 2;
                break;
              }

              return _context7.abrupt("return");

            case 2:
              config = {
                url: '/bill/batchDo?action=batchread',
                method: 'POST',
                params: {
                  billnum: 'aa_messagelist',
                  data: JSON.stringify(ids)
                }
              };
              _context7.next = 5;
              return (0, _util.proxy)(config);

            case 5:
              json = _context7.sent;

              if (!(json.code !== 200)) {
                _context7.next = 9;
                break;
              }

              cb.utis.alert(json.message, 'error');
              return _context7.abrupt("return");

            case 9:
              if (!(json.data.failCount > 0)) {
                _context7.next = 13;
                break;
              }

              error = json.data.messages.toString();
              cb.utils.alert(error, 'error');
              return _context7.abrupt("return");

            case 13:
              // 后段服务若返回未读列表就不需要发取数服务
              dispatch(getMessageData());

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x13) {
      return _ref7.apply(this, arguments);
    };
  }();
}