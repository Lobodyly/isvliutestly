"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllDomainList = getAllDomainList;
exports.getAuthList = getAuthList;
exports.default = void 0;

var _immutable = _interopRequireDefault(require("immutable"));

var _util = require("@mdf/cube/lib/helpers/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var serviceData = {
  domainService: 'dataPermission/getAllDomain',
  authListService: 'dataPermission/getUserAuthReferListByUser'
};

var $$initialState = _immutable.default.fromJS({
  allDomain: [],
  //领域列表
  authList: [] //人员列表

});

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'DEMO_UI_GET_DOMAIN_LIST':
      return state.merge({
        allDomain: action.payload
      });

    case 'DEMO_UI_GET_AUTH_LIST':
      return state.merge({
        authList: action.payload
      });

    case 'PLATFORM_UI_HOME_SALE_TREND_CHANGE_SHOP_DATA':
      return state.merge({
        trend_showData: action.payload
      });

    default:
      return state;
  }
};

exports.default = _default;

function getAllDomainList(data) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
      var config, json;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              config = {
                url: serviceData.domainService,
                method: 'GET'
              };
              _context.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context.sent;
              console.log(json);

              if (json.code !== 200) {
                cb.utils.alert(json.message, 'error');
              } else {
                dispatch((0, _util.genAction)('DEMO_UI_GET_DOMAIN_LIST', json.data));
              }

            case 6:
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

function getAuthList(id) {
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
      var config, json;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              config = {
                url: serviceData.authListService,
                method: 'GET',
                param: {
                  userId: id
                }
              };
              _context2.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context2.sent;
              console.log(json);

              if (json.code !== 200) {
                cb.utils.alert(json.message, 'error');
              } else {
                dispatch((0, _util.genAction)('DEMO_UI_GET_AUTH_LIST', json.data));
              }

            case 6:
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
}