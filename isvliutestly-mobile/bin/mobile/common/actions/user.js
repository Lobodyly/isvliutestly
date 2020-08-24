"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoginUserInfo = getLoginUserInfo;
exports.changeStore = changeStore;
exports.logOut = exports.userLogin = exports.userSetData = exports.userPasswdEdit = exports.userAccoutEdit = void 0;

var _reduxActions = require("redux-actions");

var Actions = _interopRequireWildcard(require("../constants/user"));

var _cookiesJs = _interopRequireDefault(require("cookies-js"));

var _util = require("@mdf/cube/lib/helpers/util");

var _reactRouterRedux = require("react-router-redux");

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userAccoutEdit = (0, _reduxActions.createAction)(Actions.USER_ACCOUNT_EDIT);
exports.userAccoutEdit = userAccoutEdit;
var userPasswdEdit = (0, _reduxActions.createAction)(Actions.USER_PASSWD_EDIT);
exports.userPasswdEdit = userPasswdEdit;
var userSetData = (0, _reduxActions.createAction)(Actions.USER_SET_DATA);
exports.userSetData = userSetData;

var userLogin = function userLogin(successCallback, errCallback) {
  return function (dispatch, getState) {
    dispatch({
      type: Actions.USER_LOGIN
    });

    var params = _lodash.default.pick(getState().user.toJS(), ['username', 'password']);

    var config = {
      url: 'user/login',
      method: 'POST',
      params: params,
      showLoading: false,
      options: {
        token: false,
        uniform: false
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        //  cb.utils.alert(json.message, 'error')
        dispatch({
          type: Actions.USER_LOGIN_FAILURE
        });
        errCallback(json.message);
        return;
      }

      if (json.data.leftTime == -1) {
        return; // return dispatch(push('/expire'))
      }

      clearCache();
      localStorage.setItem('token', json.data.token);
      cb.rest.AppContext.token = json.data.token;
      getLoginUserInfo(function (loginUser) {
        dispatch(userSetData(loginUser));
        successCallback();
      }, function (error) {
        /* dispatch({
          type: Actions.USER_LOGIN_FAILURE
        }) */
        cb.utils.alert(error, 'error');
      });
      /*   // cb.rest.ContextBuilder.construct();
         /!* 取组织门店 *!/
         let p = new Promise((resolve, reject) => {
           let arg = {
             url: 'user/getOrgsAndStores',
             method: 'GET',
           };
           proxy(arg)
             .then(json => {
               if (json.code !== 200) {
                 cb.utils.alert(json.message, 'error')
                 dispatch({
                   type: Actions.USER_LOGIN_FAILURE
                 })
                 return;
               }
               dispatch(userSetData(json.data))
               resolve();
             })
         })
         p.then(successCallback) */
    });
  };
};

exports.userLogin = userLogin;

var logOut = function logOut() {
  return function (dispatch) {
    // dispatch({
    //   type: 'PLATFORM_DATA_LOGIN_OUT',
    // })
    // todo 清理localstorage
    _cookiesJs.default.expire('token');

    localStorage.removeItem('loginUser');
    localStorage.removeItem('token');
    localStorage.removeItem('defaultOrg');
    localStorage.removeItem('defaultStore'); // dispatch(userSetData(null))

    dispatch((0, _reactRouterRedux.replace)('/login'));
    dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_DATASOURCE_REMOVE_CODE', ''));
    dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_CLEAR', '')); // dispatch(clearMenu());
    // dispatch(clear());
  };
};

exports.logOut = logOut;

function getLoginUserInfo(_x, _x2) {
  return _getLoginUserInfo.apply(this, arguments);
}

function _getLoginUserInfo() {
  _getLoginUserInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(onSuccess, onError) {
    var storeJson, gradesJson, userGrades, defaultGrade, loginUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _util.proxy)({
              url: 'user/getOrgsAndStores',
              method: 'GET'
            });

          case 2:
            storeJson = _context.sent;

            if (!(storeJson.code !== 200)) {
              _context.next = 6;
              break;
            }

            cb.utils.alert(storeJson.message, 'error');
            return _context.abrupt("return", onError(storeJson.message));

          case 6:
            _context.next = 8;
            return (0, _util.proxy)({
              url: 'billTemplateSet/getGradeAndEmployee',
              method: 'GET'
            });

          case 8:
            gradesJson = _context.sent;

            if (!(gradesJson.code !== 200)) {
              _context.next = 12;
              break;
            }

            cb.utils.alert(gradesJson.message, 'error');
            return _context.abrupt("return", onError(gradesJson.message));

          case 12:
            userGrades = gradesJson.data.gradeInfo; // 取默认班次

            defaultGrade = userGrades.find(function (item) {
              var startTime = item.startTime,
                  endTime = item.endTime;
              if (startTime && endTime) return (0, _moment.default)().isBetween((0, _moment.default)(startTime, 'HH:mm:ss'), (0, _moment.default)(endTime, 'HH:mm:ss'));
              return false;
            });

            if (!defaultGrade) {
              cb.utils.alert('没有可用的班次', 'error'); // return
            }

            loginUser = _lodash.default.assign({}, storeJson.data, {
              userGrades: userGrades,
              defaultGradeName: defaultGrade ? defaultGrade.name : null,
              gradeId: defaultGrade ? defaultGrade.id : null
            });
            return _context.abrupt("return", onSuccess(loginUser));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getLoginUserInfo.apply(this, arguments);
}

function changeStore(value, name, inner) {
  return function (dispatch, getState) {
    if (inner) {
      dispatch(_changeStore(value, name, function () {// dispatch(afterStoreLoaded());
      }));
    } else {
      dispatch(_changeStore(value, name, function () {
        // dispatch(getGrades());
        // dispatch(genAction('PLATFORM_DATA_USER_ACCOUNT_STORE_CHANGED'));
        clearCache();

        var _getState$user$toJS = getState().user.toJS(),
            userStores = _getState$user$toJS.userStores;

        var stores = userStores.filter(function (item) {
          return item.store === value;
        });
        if (stores && stores.length) localStorage.setItem('defaultOrg', stores[0].org_id);
        cb.route.refreshIndex();
      }));
    }
  };
}

var _changeStore = function _changeStore(value, name, callback) {
  return function (dispatch) {
    var config = {
      url: 'user/changeOrgOrShop',
      method: 'POST',
      params: {
        storeId: value
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert(json.message, 'warning');
        return;
      }

      dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_DATASOURCE_REMOVE_CODE', null));
      dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_CLEAR', null));
      var info = {
        defaultStoreName: name,
        storeId: value
      };
      Object.assign(cb.rest.AppContext.user || {}, info);
      dispatch((0, _util.genAction)('USER_ACCOUNT_CHANGE_STORE', value));
      localStorage.setItem('defaultStore', value);
      callback();
    });
  };
};

var clearCache = function clearCache() {
  localStorage.removeItem('defaultGrade');
  localStorage.removeItem('billing_lastBill');
  localStorage.removeItem('billing_lastBillId');
  localStorage.removeItem('billing_printTemplate');
};