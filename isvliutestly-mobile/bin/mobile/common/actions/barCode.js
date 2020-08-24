"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scanReferReturn = scanReferReturn;
exports.updateCartInfo = updateCartInfo;
exports.repeatSn = exports.deleteBarCode = exports.modifyBarCode = exports.addBarCode = void 0;

var _reduxActions = require("redux-actions");

var barCodeActions = _interopRequireWildcard(require("../constants/barCode"));

var _util = require("@mdf/cube/lib/helpers/util");

var _immutable = _interopRequireDefault(require("immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addBarCode = (0, _reduxActions.createAction)(barCodeActions.ADD_BAR_CODE);
exports.addBarCode = addBarCode;
var modifyBarCode = (0, _reduxActions.createAction)(barCodeActions.MODIFY_BAR_CODE);
exports.modifyBarCode = modifyBarCode;
var deleteBarCode = (0, _reduxActions.createAction)(barCodeActions.DELETE_BAR_CODE);
exports.deleteBarCode = deleteBarCode;
var isTable = true;

function scanReferReturn(keyword, time, callback) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
      var billingStatus, isBack, tableOrTree, config, json, data, tempgoods;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              billingStatus = getState().uretailHeader.toJS().billingStatus;
              isBack = 0;
              if (billingStatus === 'FormerBackBill' || billingStatus === 'NoFormerBackBill') isBack = 1;
              tableOrTree = isTable ? 'Y' : 'N';
              config = {
                url: 'mall/bill/ref/getProducts.do',
                method: 'POST',
                params: {
                  keyword: keyword,
                  billDate: time,
                  isReturn: isBack,
                  // 非退货：0;退货：1
                  showType: tableOrTree
                }
              };
              _context.next = 7;
              return (0, _util.proxy)(config);

            case 7:
              json = _context.sent;

              if (!(json.code !== 200)) {
                _context.next = 11;
                break;
              }

              callback(null); // cb.utils.alert('未找到对应商品信息！', 'error');

              return _context.abrupt("return");

            case 11:
              if (!(json.code === 200)) {
                _context.next = 37;
                break;
              }

              if (json.data.type) {
                _context.next = 15;
                break;
              }

              callback(null); // cb.utils.alert('未找到对应商品信息！', 'error');

              return _context.abrupt("return");

            case 15:
              data = json.data.data.recordList;

              if (data[0]) {
                _context.next = 19;
                break;
              }

              callback(null); // cb.utils.alert('未找到对应商品信息！', 'error');

              return _context.abrupt("return");

            case 19:
              if (!(json.data.type === '1')) {
                _context.next = 37;
                break;
              }

              if (!json.data.multiCode) {
                _context.next = 25;
                break;
              }

              data.forEach(function (tempgoods) {
                tempgoods.fQuantity = 1;
                tempgoods.exactKey = tempgoods.id + '_' + tempgoods.skuId;
              });
              callback(data);
              _context.next = 37;
              break;

            case 25:
              if (!(data.length == 1)) {
                _context.next = 36;
                break;
              }

              if (!repeatSn(data, getState, '')) {
                _context.next = 30;
                break;
              }

              cb.utils.alert('已经存在该序列号商品！', 'error');
              callback('');
              return _context.abrupt("return");

            case 30:
              tempgoods = data[0];
              tempgoods.fQuantity = 1;
              tempgoods.exactKey = tempgoods.id + '_' + tempgoods.skuId;
              callback(data); // 只有一条sku
              // 把这条数据放到弹出的界面中渲染
              // row.fQuantity = 1,row.exactKey=`${row.id}_${row.skuId}`; 把数据渲染出来；加减数量把fQuantity改变；点确定更新完的row；     goodsRefer.cartInfo.cartData.push(row)  => goodsRefer.cartInfo.numObj=>{row.exactKey: row.fQuantity }

              _context.next = 37;
              break;

            case 36:
              callback(null); // 多条数据 抛出错误
              // cb.utils.alert('未找到对应商品信息！', 'error');

            case 37:
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
/* 更新cartInfo */


function updateCartInfo(row) {
  return function (dispatch, getState) {
    var _getState$goodsRefer$ = getState().goodsRefer.toJS(),
        cartInfo = _getState$goodsRefer$.cartInfo;

    var cartData = cartInfo.cartData,
        numObj = cartInfo.numObj;
    cartData.push(row);
    numObj[row.exactKey] = row.fQuantity;
    dispatch((0, _util.genAction)('URETAIL_MOBILE_GOODSREFER_SET_OPTIONS', {
      cartInfo: cartInfo
    }));
  };
}
/* 序列号判重lz */


var repeatSn = function repeatSn(data, getState, type) {
  if (!data || data.length < 1) return false;
  var row = data[0];

  if (row.sn) {
    if (!type) {
      var products = getState().product.get('products');
      if (!_immutable.default.Iterable.isIterable(products)) products = _immutable.default.fromJS(products);

      var _iterator = _createForOfIteratorHelper(products.values()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var oldRow = _step.value;

          if (row.sn == oldRow.get('cSerialNo')) {
            return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    if (type === 'temp') {
      var _iterator2 = _createForOfIteratorHelper(getState),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _oldRow = _step2.value;

          if (row.sn == _oldRow.sn) {
            return true;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }

  return false;
};

exports.repeatSn = repeatSn;