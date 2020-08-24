"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveInfo = saveInfo;
exports.getInfo = getInfo;
exports.detailInfo = detailInfo;
exports.changePwd = changePwd;
exports.departmentInfo = departmentInfo;
exports.departmentList = exports.modifyInfo = exports.modifyNickName = exports.modifyMineInfo = exports.pageDisplay = void 0;

var _reduxActions = require("redux-actions");

var MineActions = _interopRequireWildcard(require("../constants/mine"));

var _util = require("@mdf/cube/lib/helpers/util");

var _reactRouterRedux = require("react-router-redux");

var _immutable = _interopRequireDefault(require("immutable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var pageDisplay = (0, _reduxActions.createAction)(MineActions.MINE_MODIFY_DISPLAY);
exports.pageDisplay = pageDisplay;
var modifyMineInfo = (0, _reduxActions.createAction)(MineActions.MINE_MODIFY_INFO);
exports.modifyMineInfo = modifyMineInfo;
var modifyNickName = (0, _reduxActions.createAction)(MineActions.MINE_MODIFY_NICKNAME);
exports.modifyNickName = modifyNickName;
var modifyInfo = (0, _reduxActions.createAction)(MineActions.MINE_INFO);
exports.modifyInfo = modifyInfo;
var departmentList = (0, _reduxActions.createAction)(MineActions.DEPARTMENT_lIST);
exports.departmentList = departmentList;

function saveInfo(noBack) {
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch, getState) {
      var user, config, json, loginUser;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              user = getState().mine.get('user').toJS();
              config = {
                url: 'user/save',
                method: 'POST',
                params: user,
                options: {
                  token: true
                }
              };
              _context.next = 4;
              return (0, _util.proxy)(config);

            case 4:
              json = _context.sent;

              if (json.code !== 200) {
                cb.utils.Toast(json.message + '信息修改失败！！', 'error');
              } else {
                loginUser = _immutable.default.fromJS(getState().user).merge(user);
                dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_MERGE_INFO', loginUser));
                cb.utils.Toast('信息修改成功！！', 'success');

                if (!noBack) {
                  dispatch((0, _reactRouterRedux.goBack)());
                }
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

function getInfo() {
  return /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, getState) {
      var config, json, userInfo;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              config = {
                url: 'user/find',
                method: 'GET',
                options: {
                  token: true
                }
              };
              _context2.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context2.sent;

              if (json.code !== 200) {
                console.log(json.message + '信息获取出错...');
              } else {
                userInfo = json.data; // let tempUser = Immutable.fromJS({id:userInfo.id,nickName:userInfo.nickName,avatar:userInfo.avatar});

                dispatch((0, _util.genAction)(MineActions.MINE_MODIFY_INFO, getState().mine.get('user').merge(userInfo)));
              }

            case 5:
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

function detailInfo() {
  return /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch, getState) {
      var config, json, userInfo, tempUser;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              config = {
                url: 'membercenter/bill/detail',
                method: 'GET',
                options: {
                  token: true
                }
              };
              _context3.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context3.sent;

              if (json.code !== 200) {
                console.log(json.message + '信息获取出错...');
              } else {
                userInfo = json.data;
                tempUser = _immutable.default.fromJS({
                  id: userInfo.id,
                  nickName: userInfo.nickName,
                  avatar: userInfo.avatar
                });
                dispatch((0, _util.genAction)(MineActions.MINE_MODIFYSTORE_INFO, getState().mine.get('store').merge(tempUser)));
              }

            case 5:
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
}

function changePwd(data, callback) {
  return /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(dispatch, getState) {
      var config, json;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              config = {
                url: 'user/changepwd',
                method: 'POST',
                params: data,
                options: {
                  token: true
                }
              };
              _context4.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context4.sent;

              if (json.code !== 200) {
                // cb.utils.alert(json.message, 'error');
                callback(1, json);
              } else {
                // cb.utils.alert('修改密码成功!', 'success');
                callback(0, json);
              }

            case 5:
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
}

function departmentInfo(callback) {
  return /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch, getState) {
      var config, json, info, url, configs, jsons;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              config = {
                url: 'pub/ref/getRefMeta',
                method: 'GET',
                params: {
                  refCode: 'aa_department'
                },
                options: {
                  token: true
                }
              };
              _context5.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context5.sent;

              if (!(json.code !== 200)) {
                _context5.next = 9;
                break;
              }

              callback(1, json.message);
              console.log(json.message + '信息获取出错...');
              _context5.next = 17;
              break;

            case 9:
              info = json.data.refEntity;
              url = 'bill/ref/getRefData'; // if(info.cRefType==='aa_operator'){

              url = 'membercenter/bill/ref/getRefData'; // }

              configs = {
                url: url,
                method: 'POST',
                params: {
                  dataType: info.cTpltype.toLowerCase(),
                  refCode: info.refType
                },
                options: {
                  token: true
                }
              };
              _context5.next = 15;
              return (0, _util.proxy)(configs);

            case 15:
              jsons = _context5.sent;

              if (jsons.code !== 200) {
                callback(2, jsons.message);
                console.log(jsons.message + '信息获取出错...');
              } else {
                dispatch((0, _util.genAction)(MineActions.DEPARTMENT_lIST, jsons.data));
                callback(0, jsons);
              }

            case 17:
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