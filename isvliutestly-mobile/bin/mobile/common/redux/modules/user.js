"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usernameChange = usernameChange;
exports.passwordChange = passwordChange;
exports.login = login;
exports.afterLogin = afterLogin;
exports.changeModalState = changeModalState;
exports.chooseAcc = chooseAcc;
exports.changeAcc = changeAcc;
exports.closeModal = closeModal;
exports.init = init;
exports.billingInit = billingInit;
exports.logout = logout;
exports.setAccountMsg = setAccountMsg;
exports.setAccountActiveKey = setAccountActiveKey;
exports.getLoginUser = getLoginUser;
exports.changeOrg = changeOrg;
exports.changeStore = changeStore;
exports.changeGrade = changeGrade;
exports.weChatLogin = weChatLogin;
exports.changeInterMode = changeInterMode;
exports.switchInterMode = switchInterMode;
exports.touchLogout = touchLogout;
exports.touchExit = touchExit;
exports.windowClose = windowClose;
exports.windowMinimize = windowMinimize;
exports.demoLogin = exports.getExperience = exports.proxyTool = exports.configConstructor = exports.initTouchLogin = exports.default = void 0;

var _immutable = _interopRequireDefault(require("immutable"));

var _cookiesJs = _interopRequireDefault(require("cookies-js"));

var _moment = _interopRequireDefault(require("moment"));

var _ActionStatus = _interopRequireDefault(require("@mdf/metaui-mobile/lib/constants/ActionStatus"));

var _env = _interopRequireDefault(require("@mdf/metaui-mobile/lib/env"));

var _util = require("@mdf/cube/lib/helpers/util");

var _tree = require("@mdf/metaui-mobile/lib/redux/tree");

var _tabs = require("@mdf/metaui-mobile/lib/redux/tabs");

var _home = require("./home");

var _canOpenBilling = require("../../helpers/canOpenBilling");

var _config = require("../../redux/modules/billing/config");

var _reserve = require("../../../../web/common/redux/modules/billing/reserve");

var _salesClerk = require("../../../../web/common/redux/modules/billing/salesClerk");

var _offLine = require("../../../../web/common/redux/modules/billing/offLine");

var _indexedDB = require("@mdf/metaui-mobile/lib/redux/indexedDB");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cacheLoginData = {};

var _loginData;

var _interMode;

var user = {
  usernameMsg: '',
  passwordMsg: '',
  errorMsg: '',
  id: null,
  username: '',
  password: '',
  corp_id: null,
  pubuts: null,
  bActivate: null,
  bEmailValid: null,
  bMobileValid: null,
  mobile: null,
  salt: null,
  iDeleted: null,
  bCorpRegister: false,
  dataSourceName: null,
  alias: null,
  token: null,
  accountCurrentKey: 'personalInfo',
  enableLogin: process.env.NODE_ENV === 'development',
  experienceList: [],
  loginModalVisible: null,
  userListData: []
};

var $$initialState = _immutable.default.fromJS(_objectSpread(_objectSpread({}, user), {}, {
  // 登陆状态
  loginStatus: _ActionStatus.default.READY
}));

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $$initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'PLATFORM_UI_USER_INIT':
      if (process.env.__CLIENT__) {
        var loginUserBackup = state.get('loginUserBackup');
        if (!loginUserBackup) return state;
        var loginUser = loginUserBackup.toJS();
        cb.rest.AppContext.tenant = loginUser.tenant;
        delete loginUser.tenant;
        cb.rest.AppContext.option = loginUser.option;
        (0, _offLine.perfectOption)();
        delete loginUser.option;
        cb.rest.AppContext.user = loginUser;

        if (cb.utils.getDevicesInfo) {
          var deviceInfo = cb.utils.getDevicesInfo();
          cb.rest.AppContext.device = deviceInfo;
        }

        return state;
      }

      buildUser(action.payload);
      return state.merge(action.payload);

    case 'PLATFORM_DATA_USER_LOGIN':
      return state.set('loginStatus', _ActionStatus.default.ING);

    case 'PLATFORM_DATA_USER_LOGIN_SUCCEED':
      buildUser(action.payload);
      return state.set('loginStatus', _ActionStatus.default.SUCCEED).set('errorMsg', '').merge(action.payload);

    case 'PLATFORM_DATA_USER_LOGIN_FAILURE':
      return state.set('loginStatus', _ActionStatus.default.FAILURE).merge(action.payload);

    case 'PLATFORM_DATA_LOGIN_OUT':
      {
        _cookiesJs.default.expire('user');

        var nullData = {
          id: null,
          username: '',
          password: '',
          corp_id: null,
          pubuts: null,
          bActivate: null,
          bEmailValid: null,
          bMobileValid: null,
          mobile: null,
          salt: null,
          iDeleted: null,
          bCorpRegister: null,
          dataSourceName: null,
          alias: null,
          token: null
        };
        return state.merge(_objectSpread(_objectSpread({}, nullData), {}, {
          loginStatus: _ActionStatus.default.READY
        }));
      }

    case 'PLATFORM_DATA_USER_ACCOUNT_SET_ACCOUNT_MSG':
      return state.merge(action.payload);

    case 'PLATFORM_DATA_USER_ACCOUNT_SET_ACCOUNT_ACTIVE_KEY':
      return state.set('accountCurrentKey', action.payload);

    case 'PLATFORM_DATA_USER_ACCOUNT_CHANGE_ORG':
      return state.merge(action.payload);

    case 'PLATFORM_DATA_USER_ACCOUNT_CHANGE_STORE':
      return state.merge(action.payload);

    case 'PLATFORM_DATA_USER_ACCOUNT_CHANGE_GRADE':
      return state.merge(action.payload);

    case 'PLATFORM_DATA_USER_ACCOUNT_MERGE_INFO':
      return state.merge(action.payload);

    case 'PLATFORM_DATA_CORP_SYSTEMSET_PASS_LOGO':
    case 'PLATFORM_DATA_SET_EXPERIENCE_ACCOUNT':
      return state.merge(action.payload);

    case 'LOGIN_SAVE_USERLIST':
      return state.set('userListData', action.payload);

    case 'LOGIN_SHOW_MODAL':
      return state.set('loginModalVisible', action.payload);

    case 'LOGIN_UPDATE_CALLBACK':
      return state.set('afterLoginCallBack', action.payload);

    default:
      return state;
  }
};

exports.default = _default;

var buildUser = function buildUser(user) {
  var userOrgs = user.userOrgs,
      userStores = user.userStores,
      orgId = user.orgId,
      storeId = user.storeId;
  var defaultOrgName, defaultStoreName;
  userOrgs && userOrgs.forEach(function (item) {
    if (item.org == orgId) defaultOrgName = item.org_name;
  });
  userStores && userStores.forEach(function (item) {
    if (item.store == storeId) defaultStoreName = item.store_name;
  });
  Object.assign(user, {
    defaultOrgName: defaultOrgName,
    defaultStoreName: defaultStoreName
  });
  user.loginUserBackup = JSON.parse(JSON.stringify(user));
};

function usernameChange(value, usernameMsg) {
  return function (dispatch) {
    var obj = {
      username: value
    };
    if (value && usernameMsg) obj.usernameMsg = '';
    dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_FAILURE', obj));
  };
}

function passwordChange(value, passwordMsg) {
  return function (dispatch) {
    var obj = {
      password: value
    };
    if (value && passwordMsg) obj.passwordMsg = '';
    dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_FAILURE', obj));
  };
}

var clearCache = function clearCache() {
  localStorage.removeItem('defaultGrade');
  localStorage.removeItem('billing_lastBill');
  localStorage.removeItem('billing_lastStatus');
  localStorage.removeItem('billing_lastBillId');
  localStorage.removeItem('billing_printTemplate');
};

var checkRegStatus = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
    var config, json;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = {
              url: 'register/checkRegStatus',
              method: 'GET'
            };
            _context.next = 3;
            return (0, _util.proxy)(config);

          case 3:
            json = _context.sent;

            if (json.data) {
              _context.next = 7;
              break;
            }

            setTimeout(function () {
              checkRegStatus(dispatch);
            }, 5000);
            return _context.abrupt("return");

          case 7:
            dispatch(login(_loginData));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkRegStatus(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _showModal = function _showModal(dispatch) {
  var modalVisible = true; // 弹出Modal

  dispatch(changeModalState(modalVisible));
}; // 触屏登录处理，取第一个userList的userId


var _chooseDefaultAcc = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch, loginData, defaultAcc) {
    var data, config, json;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            clearCache();
            data = {
              userId: defaultAcc
            };
            config = {
              url: '/user/loginByUserId',
              method: 'POST',
              params: data
            };
            _context2.next = 5;
            return (0, _util.proxy)(config);

          case 5:
            json = _context2.sent;

            if (json.code == 200) {
              localStorage.setItem('userId', defaultAcc);
              dispatch(afterLogin(loginData));
            }

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function _chooseDefaultAcc(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // 登录


function login(data) {
  return /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch) {
      var usernameMsg, passwordMsg, userId, config, json, regStatus, loginCallBack, touchUser, cacheUser, err;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _loginData = data;
              dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN'));

              if (!(process.env.NODE_ENV !== 'development' || data.username)) {
                _context3.next = 13;
                break;
              }

              usernameMsg = null;
              passwordMsg = null;
              if (!data.username) usernameMsg = '登录账号不能为空';
              if (!data.password) passwordMsg = '密码不能为空';

              if (!(usernameMsg || passwordMsg)) {
                _context3.next = 11;
                break;
              }

              dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_FAILURE', {
                usernameMsg: usernameMsg,
                passwordMsg: passwordMsg
              }));
              closeAwaitModal();
              return _context3.abrupt("return");

            case 11:
              _context3.next = 15;
              break;

            case 13:
              data.username = 'xmcs001';
              data.password = '123456';

            case 15:
              // 判断本地是否有userId
              if (localStorage.getItem('userId')) {
                userId = {
                  userId: localStorage.getItem('userId')
                };
                Object.assign(data, userId);
              }

              config = {
                url: _env.default.HTTP_USER_LOGIN,
                method: 'POST',
                options: {
                  uniform: false,
                  token: false
                },
                params: data
              };
              if (_env.default.INTERACTIVE_MODE === 'touch') config.options.timeout = 3000;
              _context3.next = 20;
              return (0, _util.proxy)(config);

            case 20:
              json = _context3.sent;

              if (!(json.code === 200)) {
                _context3.next = 56;
                break;
              }

              /** if (cb.rest.terminalType === 2 && window.plus && window.plus.JavaToJs) {
                plus.JavaToJs.HardwareInterface('startSystemInfo');
              } **/
              localStorage.setItem('token', json.data.token);
              cb.rest.ContextBuilder.construct();

              if (!(json.data.leftTime == -1)) {
                _context3.next = 28;
                break;
              }

              cb.route.pushPage('/expire');
              closeAwaitModal();
              return _context3.abrupt("return");

            case 28:
              regStatus = json.data.regStatus;

              if (!(!cb.utils.isEmpty(regStatus) && regStatus != '2')) {
                _context3.next = 33;
                break;
              }

              if (window.__getLoginTouchMask) window.__getLoginTouchMask.init();
              checkRegStatus(dispatch);
              return _context3.abrupt("return");

            case 33:
              if (!(_env.default.INTERACTIVE_MODE === 'pc' && _interMode === 'touch' || _env.default.INTERACTIVE_MODE === 'touch' && _interMode === 'pc')) {
                _context3.next = 36;
                break;
              }

              dispatch(switchInterMode(_interMode));
              return _context3.abrupt("return");

            case 36:
              // localStorage.setItem('token', json.data.token);
              // cb.rest.ContextBuilder.construct();
              loginCallBack = function loginCallBack() {
                dispatch(afterLogin(data));
              }; // 判断是否有多账号


              if (!json.data.userList) {
                _context3.next = 53;
                break;
              }

              dispatch((0, _util.genAction)('LOGIN_SAVE_USERLIST', json.data.userList));
              dispatch((0, _util.genAction)('LOGIN_UPDATE_CALLBACK', loginCallBack));

              if (!(_env.default.INTERACTIVE_MODE === 'pc')) {
                _context3.next = 49;
                break;
              }

              if (json.data.id) {
                _context3.next = 46;
                break;
              }

              _context3.next = 44;
              return _showModal(dispatch);

            case 44:
              _context3.next = 47;
              break;

            case 46:
              dispatch(afterLogin(data));

            case 47:
              _context3.next = 51;
              break;

            case 49:
              _context3.next = 51;
              return _chooseDefaultAcc(dispatch, data, json.data.userList[0].userId);

            case 51:
              _context3.next = 54;
              break;

            case 53:
              dispatch(afterLogin(data));

            case 54:
              _context3.next = 57;
              break;

            case 56:
              if (json.code === 500) {
                if (_env.default.INTERACTIVE_MODE === 'touch') {
                  touchUser = localStorage.getItem('touchUser');
                  cacheUser = touchUser && JSON.parse(touchUser);

                  if (cacheUser.username == data.username && cacheUser.password == data.password && cb.rest.cache.isOpenDBCache) {
                    cb.rest.ContextBuilder.construct();
                    dispatch((0, _util.genAction)('PLATFORM_UI_OFF_LINE_CHANGE_LINE_CONNECT', {
                      lineConnection: false
                    }));
                    (0, _indexedDB.IDB_getData)({
                      key: 'loginData',
                      dbTableName: 'offlineLogin'
                    }).then(function (dbData) {
                      initTouchLogin(dispatch, {
                        cacheLoginData: dbData
                      });
                    }).catch(function (e) {
                      console.error('离线登陆读取缓存数据错误' + e);
                    });
                  } else {
                    err = json.message;
                    if (cacheUser.username !== data.username && cb.rest.cache.isOpenDBCache) err = '网络不可用，必须使用上次登录的账号';
                    if (cacheUser.password !== data.password && cb.rest.cache.isOpenDBCache) err = '网络不可用，密码必须与上次登录相同';
                    closeAwaitModal();
                    dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_FAILURE', {
                      errorMsg: err
                    }));
                    console.error('错误代码：离线登录错误 ==>' + '错误信息：' + err);
                  }
                } else {
                  dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_FAILURE', {
                    errorMsg: json.message
                  }));
                  console.error('错误代码：' + json.code + '错误信息：' + json.message);
                }
              } else {
                closeAwaitModal();
                dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_FAILURE', {
                  errorMsg: json.message
                }));
                console.error('错误代码：' + json.code + '错误信息：' + json.message);
              }

            case 57:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5) {
      return _ref3.apply(this, arguments);
    };
  }();
}

function afterLogin(data) {
  return /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(dispatch) {
      var callback, config, json, cacheTenantId, showOptions;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              callback = typeof data === 'function' ? data : null;
              cacheLoginData = {};
              config = {
                url: 'user/getOrgsAndStores',
                method: 'POST',
                options: {
                  autoLogin: false
                }
              };
              _context5.next = 5;
              return (0, _util.proxy)(config);

            case 5:
              json = _context5.sent;
              cacheLoginData.OrgStoreData = json;

              if (!(json.code !== 200)) {
                _context5.next = 11;
                break;
              }

              if (callback) callback(json);else dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_FAILURE', {
                errorMsg: json.message
              }));
              closeAwaitModal();
              return _context5.abrupt("return");

            case 11:
              cb.rest.AppContext.user = json.data;
              config = {
                url: 'tenant/find',
                method: 'GET'
              };
              _context5.next = 15;
              return (0, _util.proxy)(config);

            case 15:
              json = _context5.sent;
              cacheLoginData.TenantData = json;

              if (json.code === 200) {
                cb.rest.AppContext.user.logo = json.data.logo;
                cb.rest.AppContext.user.tenant = json.data;
                cacheTenantId = localStorage.getItem('tenantId');
                if (!cacheTenantId) localStorage.setItem('tenantId', json.data.id);else if (json.data.id != cacheTenantId) {
                  localStorage.setItem('tenantId', json.data.id);
                  localStorage.removeItem('billing_posCode');
                  localStorage.removeItem('billing_serialNo');
                }
              }

              if (_env.default.INTERACTIVE_MODE !== 'touch' && _env.default.INTERACTIVE_MODE !== 'self') {
                dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_SUCCEED', cb.rest.AppContext.user));

                if (cb.rest.terminalType === 3) {
                  if (callback) callback();else cb.route.replacePage('/');
                } else {
                  cb.route.pushPage('/portal');
                  closeAwaitModal();
                }
              }

              if (json.code === 200) cb.rest.AppContext.tenant = json.data; // config = {
              //   url: 'option/getOptionData',
              //   method: 'POST',
              //   params: {
              //     optionId: 'sys_option'
              //   }
              // };
              // json = await proxy(config);
              // const option = {};
              // if (json.code === 200)
              //   Object.assign(option, json.data);
              // config = {
              //   url: 'option/getOptionData',
              //   method: 'POST',
              //   params: {
              //     optionId: 'business_option'
              //   }
              // };
              // json = await proxy(config);
              // if (json.code === 200)
              //   Object.assign(option, json.data);
              // cb.rest.AppContext.option = option;

              _context5.next = 22;
              return (0, _tree.getMenuTree)(dispatch, {
                cacheDBData: cacheLoginData
              });

            case 22:
              showOptions = _context5.sent;
              Object.assign(cb.rest.AppContext.user, showOptions);
              dispatch(init(cb.rest.AppContext.user, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var rememberAccount, canOpen, _json, posCode, deviceInfo, posInfo, _json$data, _json$data$id, id, _json$data$cabinetgro, cabinetgroup, printSource, initConfigSource, touchRoutePC, routePortal, obj, templateOption, templateCode, _canOpen, _posCode, _deviceInfo, _templateOption, _templateCode, _canOpen2, _deviceInfo2;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        if (!callback) {
                          if (data) {
                            if (data.rememberUser) {
                              rememberAccount = {
                                username: data.username
                              };
                              localStorage.setItem('rememberAccount', JSON.stringify(rememberAccount));
                            } else {
                              if (localStorage.getItem('rememberAccount')) localStorage.removeItem('rememberAccount');
                            }

                            clearCache();
                          }
                        }

                        if (!(_env.default.INTERACTIVE_MODE === 'touch')) {
                          _context4.next = 142;
                          break;
                        }

                        if (!(cb.rest.AppContext.user.userType === 0)) {
                          _context4.next = 8;
                          break;
                        }

                        cb.route.pushPage('/portal');
                        closeAwaitModal();
                        cacheLoginData.attrKey = 1;
                        cb.events.execute('offlineLogin', cacheLoginData);
                        return _context4.abrupt("return");

                      case 8:
                        if (_env.default.INTERACTIVE_MODE === 'touch') localStorage.setItem('touchUser', JSON.stringify(data));

                        if (!showOptions.canBilling) {
                          _context4.next = 16;
                          break;
                        }

                        _context4.next = 12;
                        return (0, _canOpenBilling.judge)(cb.rest.AppContext.user);

                      case 12:
                        canOpen = _context4.sent;

                        if (canOpen) {
                          _context4.next = 16;
                          break;
                        }

                        closeAwaitModal();
                        return _context4.abrupt("return");

                      case 16:
                        config = {
                          url: 'billTemplateSet/getGradeAndEmployee',
                          method: 'GET'
                        };
                        _context4.next = 19;
                        return (0, _util.proxy)(config);

                      case 19:
                        _json = _context4.sent;
                        cacheLoginData.EmployeeData = _json;
                        if (_json.data && _json.data.operatorInfo) dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_SALES_CLERK_INIT', _json.data.operatorInfo));
                        posCode = localStorage.getItem('billing_posCode');
                        deviceInfo = cb.utils.getDevicesInfo();
                        cb.rest.AppContext.device = deviceInfo;

                        if (!(!posCode && deviceInfo)) {
                          _context4.next = 36;
                          break;
                        }

                        if (!(!deviceInfo.macaddress && !cb.utils.isIos())) {
                          _context4.next = 30;
                          break;
                        }

                        cb.utils.alert('mac地址未取到，请退出程序重新登录！');
                        closeAwaitModal();
                        return _context4.abrupt("return");

                      case 30:
                        config = {
                          url: 'bill/getposnum',
                          method: 'GET',
                          params: deviceInfo
                        };
                        _context4.next = 33;
                        return (0, _util.proxy)(config);

                      case 33:
                        _json = _context4.sent;
                        cacheLoginData.PosCodeData = _json;
                        processPosCode(_json);

                      case 36:
                        posInfo = null;
                        config = {
                          url: 'bill/getcabinetgroup',
                          method: 'GET',
                          params: {
                            posnum: localStorage.getItem('billing_posCode')
                          }
                        };
                        _context4.next = 40;
                        return (0, _util.proxy)(config);

                      case 40:
                        _json = _context4.sent;
                        cacheLoginData.CabinetgroupData = _json;

                        if (_json.code == 200) {
                          _json$data = _json.data, _json$data$id = _json$data.id, id = _json$data$id === void 0 ? '' : _json$data$id, _json$data$cabinetgro = _json$data.cabinetgroup, cabinetgroup = _json$data$cabinetgro === void 0 ? '' : _json$data$cabinetgro;
                          posInfo = cabinetgroup;
                          localStorage.setItem('pos_id', id);

                          _cookiesJs.default.set('pos_cabinetgroup', cabinetgroup, {
                            expires: Infinity
                          });
                        }

                        config = {
                          url: 'billTemplateSet/getBelongTemplate',
                          method: 'GET',
                          params: {
                            counterId: posInfo || ''
                          }
                        };
                        _context4.next = 46;
                        return (0, _util.proxy)(config);

                      case 46:
                        _json = _context4.sent;
                        cacheLoginData.TemplateData = _json;
                        printSource = _json; // 提供给放在最后的打印

                        initConfigSource = _json.data;

                        if (!(_json.code !== 200)) {
                          _context4.next = 54;
                          break;
                        }

                        alert("\u83B7\u53D6\u5F00\u5355\u8BBE\u7F6E\u5931\u8D25\uFF1A".concat(_json.message));
                        closeAwaitModal();
                        return _context4.abrupt("return");

                      case 54:
                        touchRoutePC = _json.data && _json.data.touchBillData && _json.data.touchBillData.basicSettingData && _json.data.touchBillData.basicSettingData.selectType === '2';
                        routePortal = !!(_json.data && _json.data.touchBillData && _json.data.touchBillData.touchSettingData && _json.data.touchBillData.touchSettingData.cLoginDefaultPage === '2');
                        dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_CONFIG_SET_OPTIONS', {
                          touchRoutePC: touchRoutePC
                        })); // if (env.INTERACTIVE_MODE === 'touch' && cb.rest.cache.isOpenDBCache === null)
                        //   cb.rest.cache.isOpenDBCache = {key: 'DEFAULT', value: !!cb.rest.AppContext.option.billCacheToApp}

                        _context4.next = 59;
                        return cb.rest.cache.changeVersion(process.env.SCRIPT_VERSION);

                      case 59:
                        _context4.next = 61;
                        return proxyTool('billMeta', 'rm_retailvouch', cacheLoginData);

                      case 61:
                        _context4.next = 63;
                        return proxyTool('billMeta', 'rm_gatheringvouch', cacheLoginData);

                      case 63:
                        config = {
                          url: 'billTemplateSet/getCurrentStoreWarehouse',
                          method: 'GET',
                          params: {
                            storeId: cb.rest.AppContext.user.storeId
                          }
                        };
                        if (posInfo) config.params.cabinetGroup = posInfo;

                        if (!cb.rest.AppContext.user.storeId) {
                          _context4.next = 71;
                          break;
                        }

                        _context4.next = 68;
                        return (0, _util.proxy)(config);

                      case 68:
                        _json = _context4.sent;
                        cacheLoginData.WarehouseData = _json;

                        if (_json.code !== 200) {
                          cb.utils.alert(_json.message, 'error');
                        }

                      case 71:
                        config = {
                          url: 'mall/bill/preferential/querylinemutexstrategy',
                          method: 'GET'
                        };
                        _context4.next = 74;
                        return (0, _util.proxy)(config);

                      case 74:
                        _json = _context4.sent;
                        cacheLoginData.PromotionMutexData = _json;

                        if (_json.code !== 200) {
                          cb.utils.alert(_json.message, 'error');
                        }

                        dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_CONFIG_INIT', {
                          jsonData: initConfigSource,
                          cacheData: cacheLoginData
                        })); // dispatch(genAction('PLATFORM_DATA_USER_LOGIN_SUCCEED', cb.rest.AppContext.user));

                        dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_SUCCEED', cb.rest.AppContext.user)); // dispatch(initConfig(json.data, {cacheDBData: cacheLoginData}));

                        config = {
                          url: 'membercenter/bill/getOperatorData',
                          method: 'GET',
                          params: {
                            iStoreId: cb.rest.AppContext.user.storeId
                          }
                        };
                        _context4.next = 82;
                        return (0, _util.proxy)(config);

                      case 82:
                        _json = _context4.sent;
                        cacheLoginData.SaleList = _json;

                        if (!(_json.code !== 200)) {
                          _context4.next = 88;
                          break;
                        }

                        cb.utils.alert(_json.message, 'error');
                        closeAwaitModal();
                        return _context4.abrupt("return");

                      case 88:
                        dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_SALES_SET_CACHEDATE', _json));
                        config = {
                          url: 'mall/bill/mobile/queryproductsku.do',
                          method: 'POST',
                          params: {
                            externalData: {
                              isPage: false,
                              showType: 'N'
                            }
                          }
                        };

                        if (touchRoutePC) {
                          _context4.next = 100;
                          break;
                        }

                        _context4.next = 93;
                        return (0, _util.proxy)(config);

                      case 93:
                        _json = _context4.sent;
                        cacheLoginData.ReferData = _json;

                        if (!(_json.code !== 200)) {
                          _context4.next = 99;
                          break;
                        }

                        cb.utils.alert(_json.message, 'error');
                        closeAwaitModal();
                        return _context4.abrupt("return");

                      case 99:
                        dispatch((0, _util.genAction)('PLATFORM_UI_TOUCH_RIGHT_LOGIN_CACHE_REFER_DATA', _json));

                      case 100:
                        config = {
                          url: 'region/getAllregion',
                          method: 'POST',
                          params: {}
                        };
                        _context4.next = 103;
                        return (0, _util.proxy)(config);

                      case 103:
                        _json = _context4.sent;
                        cacheLoginData.RegionData = _json;
                        dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_RESERVE_CACHE_REGION', _json));
                        config = (0, _reserve.touch_getDefaultBusinessTypeConfig)(cb.rest.AppContext.user, dispatch);
                        _context4.next = 109;
                        return (0, _util.proxy)(config);

                      case 109:
                        _json = _context4.sent;
                        cacheLoginData.DefaultBusinessTypeData = _json;
                        dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_CACHE_DEFAULT_BUSINESSTYPE', _json));
                        config = {
                          url: 'user/getUserListByStoreid',
                          method: 'POST',
                          params: {
                            storeid: cb.rest.AppContext.user.storeId
                          }
                        };
                        _context4.next = 115;
                        return (0, _util.proxy)(config);

                      case 115:
                        _json = _context4.sent;
                        cacheLoginData.OperatorsData = _json;
                        dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_PENDING_LOGIN_CACHE_DATA', _json));
                        config = {
                          url: 'intelPeripheral/getPosDeviceSetting',
                          method: 'GET',
                          params: {
                            billno: 'aa_posdevicesetting'
                          }
                        };
                        _context4.next = 121;
                        return (0, _util.proxy)(config);

                      case 121:
                        _json = _context4.sent;
                        cacheLoginData.DualScreenSettingData = _json;
                        localStorage.setItem('DualScreenSettingData', JSON.stringify(_json.data));
                        _context4.next = 126;
                        return (0, _offLine.autoDeleteDB)();

                      case 126:
                        /* 暂先放最后 */
                        window.__cacheLoginData = cacheLoginData;
                        obj = {
                          OptionData: cb.rest.AppContext.option
                        };
                        obj.DualScreenSettingData = cacheLoginData.DualScreenSettingData ? cacheLoginData.DualScreenSettingData.data : {};

                        if (window.plus && plus.JavaToJs) {
                          plus.JavaToJs.HardwareInterface('login', JSON.stringify({
                            token: cb.rest.AppContext.token,
                            data: obj
                          }));
                        } else if (cb.electron.getSharedObject()) {
                          cb.electron.sendOrder('refreshSecondaryScreen', {
                            type: 'login',
                            message: JSON.stringify({
                              token: cb.rest.AppContext.token,
                              data: obj
                            })
                          });
                        }

                        cb.route.pushPage(showOptions.canBilling ? routePortal ? '/portal' : '/billing' : '/portal'); // await cb.rest.cache.changeVersion(process.env.SCRIPT_VERSION || uuid())

                        closeAwaitModal();
                        cacheLoginData.attrKey = 'loginData';
                        cb.events.execute('offlineLogin', cacheLoginData);
                        templateOption = printSource.data.optionData.find(function (item) {
                          return item.name === 'billdefaulttype';
                        });
                        templateCode = templateOption && templateOption.value;

                        if (cb.utils.isEmpty(templateCode)) {
                          cb.utils.alert('没有设置打印模板，请检查', 'error');
                        }

                        config = {
                          url: 'print/getTemplateContent',
                          method: 'POST',
                          params: {
                            billno: 'rm_retailvouch',
                            templateCode: templateCode
                          }
                        };
                        _context4.next = 140;
                        return (0, _util.proxy)(config);

                      case 140:
                        _json = _context4.sent;

                        // cacheLoginData.PrintData = json
                        if (_json.code !== 200) {
                          cb.utils.alert("\u83B7\u53D6\u6253\u5370\u6A21\u677F\u5931\u8D25\uFF1A".concat(_json.message), 'error');
                        } else {
                          localStorage.setItem('billing_printTemplate', JSON.stringify(_json.data));
                        }

                      case 142:
                        if (!(_env.default.INTERACTIVE_MODE === 'self')) {
                          _context4.next = 196;
                          break;
                        }

                        if (!showOptions.canBilling) {
                          _context4.next = 149;
                          break;
                        }

                        _context4.next = 146;
                        return (0, _canOpenBilling.judge)(cb.rest.AppContext.user);

                      case 146:
                        _canOpen = _context4.sent;

                        if (_canOpen) {
                          _context4.next = 149;
                          break;
                        }

                        return _context4.abrupt("return");

                      case 149:
                        localStorage.setItem('selfUser', JSON.stringify({
                          username: data.username,
                          password: data.password
                        }));
                        dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_SUCCEED', cb.rest.AppContext.user));
                        config = {
                          url: 'billTemplateSet/getGradeAndEmployee',
                          method: 'GET'
                        };
                        _context4.next = 154;
                        return (0, _util.proxy)(config);

                      case 154:
                        json = _context4.sent;
                        if (json.data && json.data.operatorInfo) dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_SALES_CLERK_INIT', json.data.operatorInfo));
                        config = {
                          url: 'commonSetService/getSelfScreenTemplate.do',
                          method: 'GET'
                        };
                        _context4.next = 159;
                        return (0, _util.proxy)(config);

                      case 159:
                        json = _context4.sent;
                        if (json.code !== 200) cb.utils.alert("\u83B7\u53D6\u5927\u5C4F\u5F00\u5355\u8BBE\u7F6E\u5931\u8D25\uFF1A".concat(json.message), 'error');
                        dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_SELF_GET_SELF_TEMPLATE', {
                          selfOptionData: json.data
                        }));
                        config = {
                          url: 'billTemplateSet/getBelongTemplate',
                          method: 'GET'
                        };
                        _context4.next = 165;
                        return (0, _util.proxy)(config);

                      case 165:
                        json = _context4.sent;

                        if (!(json.code !== 200)) {
                          _context4.next = 169;
                          break;
                        }

                        alert("\u83B7\u53D6\u5F00\u5355\u8BBE\u7F6E\u5931\u8D25\uFF1A".concat(json.message));
                        return _context4.abrupt("return");

                      case 169:
                        dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_CONFIG_INIT', json.data));
                        dispatch((0, _config.initConfig)(json.data));
                        _posCode = localStorage.getItem('billing_posCode');
                        _deviceInfo = cb.utils.getDevicesInfo(); // let deviceInfo = { macaddress: '123456', uuid:'1248456543', imsi:'98789', imei:'56787789', model:'9879', vendor:'345678765' }

                        cb.rest.AppContext.device = _deviceInfo;

                        if (!(!_posCode && _deviceInfo)) {
                          _context4.next = 180;
                          break;
                        }

                        config = {
                          url: 'bill/getposnum',
                          method: 'GET',
                          params: _deviceInfo
                        };
                        _context4.next = 178;
                        return (0, _util.proxy)(config);

                      case 178:
                        json = _context4.sent;
                        processPosCode(json);

                      case 180:
                        // dispatch(initConfig(json.data));
                        // dispatch(genAction('PLATFORM_DATA_USER_LOGIN_SUCCEED', cb.rest.AppContext.user));
                        // /*add by jinzh1*/
                        // if (window.plus) plus.JavaToJs.HardwareInterface('onLogin', cb.rest.AppContext.token);
                        dispatch((0, _reserve.getDefaultBusinessType)(1));
                        cb.route.pushPage(showOptions.canBilling ? '/billing/self' : '/portal');
                        _templateOption = json.data.optionData.find(function (item) {
                          return item.name === 'billdefaulttype';
                        });
                        _templateCode = _templateOption && _templateOption.value;

                        if (!cb.utils.isEmpty(_templateCode)) {
                          _context4.next = 187;
                          break;
                        }

                        cb.utils.alert('没有设置打印模板，请检查', 'error');
                        return _context4.abrupt("return");

                      case 187:
                        config = {
                          url: 'print/getTemplateContent',
                          method: 'POST',
                          params: {
                            billno: 'rm_retailvouch',
                            templateCode: _templateCode
                          }
                        };
                        _context4.next = 190;
                        return (0, _util.proxy)(config);

                      case 190:
                        json = _context4.sent;

                        if (!(json.code !== 200)) {
                          _context4.next = 194;
                          break;
                        }

                        cb.utils.alert("\u83B7\u53D6\u6253\u5370\u6A21\u677F\u5931\u8D25\uFF1A".concat(json.message), 'error');
                        return _context4.abrupt("return");

                      case 194:
                        localStorage.setItem('billing_printTemplate', JSON.stringify(json.data));
                        dispatch((0, _salesClerk.getSalesList)(''));

                      case 196:
                        if (!(cb.rest.terminalType === 3)) {
                          _context4.next = 219;
                          break;
                        }

                        if (!showOptions.canBilling) {
                          _context4.next = 203;
                          break;
                        }

                        _context4.next = 200;
                        return (0, _canOpenBilling.judge)(cb.rest.AppContext.user);

                      case 200:
                        _canOpen2 = _context4.sent;

                        if (_canOpen2) {
                          _context4.next = 203;
                          break;
                        }

                        return _context4.abrupt("return");

                      case 203:
                        config = {
                          url: 'billTemplateSet/getGradeAndEmployee',
                          method: 'GET'
                        };
                        _context4.next = 206;
                        return (0, _util.proxy)(config);

                      case 206:
                        json = _context4.sent;
                        if (json.data && json.data.operatorInfo) dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_SALES_CLERK_INIT', json.data.operatorInfo));
                        config = {
                          url: 'billTemplateSet/getBelongTemplate',
                          method: 'GET'
                        };
                        _context4.next = 211;
                        return (0, _util.proxy)(config);

                      case 211:
                        json = _context4.sent;

                        if (!(json.code !== 200)) {
                          _context4.next = 215;
                          break;
                        }

                        alert("\u83B7\u53D6\u5F00\u5355\u8BBE\u7F6E\u5931\u8D25\uFF1A".concat(json.message));
                        return _context4.abrupt("return");

                      case 215:
                        _deviceInfo2 = cb.utils.getDevicesInfo();
                        cb.rest.AppContext.device = _deviceInfo2;
                        dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_CONFIG_INIT', json.data)); // dispatch(genAction('PLATFORM_DATA_USER_LOGIN_SUCCEED', cb.rest.AppContext.user));

                        dispatch((0, _config.initConfig)(json.data));

                      case 219:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }))));

            case 25:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x6) {
      return _ref4.apply(this, arguments);
    };
  }();
}

var processPosCode = function processPosCode(json) {
  if (json.code !== 200) {
    cb.utils.alert("\u83B7\u53D6POS\u7F16\u53F7\u5931\u8D25\uFF1A".concat(json.message), 'error');
  } else {
    if (json.data && _typeof(json.data) === 'object') {
      var _json$data2 = json.data,
          posnum = _json$data2.posnum,
          billnum = _json$data2.billnum;
      localStorage.setItem('billing_posCode', posnum);

      if (billnum) {
        var serialNoObj = {};
        var dateCode = (0, _moment.default)().format('YYMMDD');
        serialNoObj[dateCode] = billnum;
        localStorage.setItem('billing_serialNo', JSON.stringify(serialNoObj));
      }
    } else {
      localStorage.setItem('billing_posCode', json.data);
    }
  }
};

function changeModalState(modalVisible) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('LOGIN_SHOW_MODAL', modalVisible));
  };
}

function chooseAcc(currentId) {
  return function (dispatch) {
    dispatch(_chooseAcc(currentId));
  };
}

var _chooseAcc = function _chooseAcc(currentId) {
  return /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(dispatch, getState) {
      var data, config, json;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              data = {
                userId: currentId
              };
              config = {
                url: _env.default.HTTP_USER_SELECTACC,
                method: 'POST',
                params: data
              };
              _context6.next = 4;
              return (0, _util.proxy)(config);

            case 4:
              json = _context6.sent;

              if (!(json.code !== 200)) {
                _context6.next = 8;
                break;
              }

              cb.utils.alert(json.message, 'warning');
              return _context6.abrupt("return");

            case 8:
              localStorage.setItem('userId', currentId);
              getState().user.toJS().afterLoginCallBack();

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x7, _x8) {
      return _ref6.apply(this, arguments);
    };
  }();
};

function changeAcc(currentId) {
  return function (dispatch) {
    cb.utils.confirm('确定要切换账号吗？该操作将重新刷新页面！', function () {
      dispatch(_changeAcc(currentId, function () {
        clearCache();
        localStorage.setItem('userId', currentId);
        location.reload();
      }));
    });
  };
}

var _changeAcc = function _changeAcc(currentId, callback) {
  return function (dispatch) {
    var data = {
      userId: currentId
    };
    var config = {
      url: _env.default.HTTP_USER_SELECTACC,
      method: 'POST',
      params: data
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert(json.message, 'warning');
        return;
      }

      localStorage.setItem('userId', currentId);
      callback();
    });
  };
};

function closeModal(visible) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('LOGIN_SHOW_MODAL', visible));
  };
}
/* 触屏登陆数据处理 */


var initTouchLogin = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(dispatch, _ref7) {
    var _ref7$cacheLoginData, cacheLoginData, json, showOptions, option, touchRoutePC, obj;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _ref7$cacheLoginData = _ref7.cacheLoginData, cacheLoginData = _ref7$cacheLoginData === void 0 ? {} : _ref7$cacheLoginData;

            /** *处理分发数据开始***/
            json = cacheLoginData.OrgStoreData;

            if (!(json.code !== 200)) {
              _context7.next = 6;
              break;
            }

            // callback未定义，因此将下面的代码注释
            // if (callback)
            // callback();
            // else
            dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_FAILURE', {
              errorMsg: json.message
            }));
            closeAwaitModal();
            return _context7.abrupt("return");

          case 6:
            cb.rest.AppContext.user = json.data;

            if (!(cb.rest.AppContext.user.userType === 0)) {
              _context7.next = 11;
              break;
            }

            cb.route.pushPage('/portal');
            closeAwaitModal();
            return _context7.abrupt("return");

          case 11:
            json = cacheLoginData.TenantData;

            if (json.code === 200) {
              cb.rest.AppContext.user.logo = json.data.logo;
              cb.rest.AppContext.tenant = json.data;
            }

            _context7.next = 15;
            return (0, _tree.getMenuTree)(dispatch, {
              cacheData: cacheLoginData.MenuTreeData
            });

          case 15:
            showOptions = _context7.sent;
            Object.assign(cb.rest.AppContext.user, showOptions); // dispatch(init(cb.rest.AppContext.user));

            json = cacheLoginData.OptionData;
            option = {};

            if (json.code === 200) {
              json.data.forEach(function (item) {
                var name = item.name,
                    value = item.value;
                option[name] = value;
              });
            }

            cb.rest.AppContext.option = option;
            json = cacheLoginData.EmployeeData;
            if (json.data && json.data.operatorInfo) dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_SALES_CLERK_INIT', json.data.operatorInfo));
            json = cacheLoginData.TemplateData;
            touchRoutePC = json.data && json.data.touchBillData && json.data.touchBillData.basicSettingData && json.data.touchBillData.basicSettingData.selectType === '2';
            dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_CONFIG_SET_OPTIONS', {
              touchRoutePC: touchRoutePC
            }));
            dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_CONFIG_INIT', {
              jsonData: json.data,
              cacheData: cacheLoginData
            }));
            dispatch((0, _util.genAction)('PLATFORM_DATA_USER_LOGIN_SUCCEED', cb.rest.AppContext.user));

            if (cb.rest.terminalType === 3) {
              dispatch((0, _config.initConfig)(json.data)); // cb.route.pushPage('/');

              cb.route.replacePage('/');
            } else {// dispatch(initConfig(json.data, {cacheData: cacheLoginData}))

              /* add by jinzh1 */
              // if (window.plus) plus.JavaToJs.HardwareInterface('onLogin', cb.rest.AppContext.token);
              // cb.route.pushPage(showOptions.canBilling ? '/billing' : '/portal');
              // json = cacheLoginData.PrintData
              // localStorage.setItem('billing_printTemplate', JSON.stringify(json.data));
            }

            json = cacheLoginData.SaleList;
            dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_SALES_SET_CACHEDATE', json));

            if (!touchRoutePC) {
              json = cacheLoginData.ReferData;
              dispatch((0, _util.genAction)('PLATFORM_UI_TOUCH_RIGHT_LOGIN_CACHE_REFER_DATA', json));
            }

            json = cacheLoginData.RegionData;
            dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_RESERVE_CACHE_REGION', json));
            json = cacheLoginData.DefaultBusinessTypeData;
            dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_CACHE_DEFAULT_BUSINESSTYPE', json));
            json = cacheLoginData.OperatorsData;
            dispatch((0, _util.genAction)('PLATFORM_UI_BILLING_PENDING_LOGIN_CACHE_DATA', json));

            if (cb.rest.terminalType !== 3) {
              // localStorage.setItem('billing_printTemplate', JSON.stringify(json.data));
              json = cacheLoginData.PosCodeData;
              if (json) processPosCode(json);
              window.__cacheLoginData = cacheLoginData;
              obj = {
                OptionData: cb.rest.AppContext.option
              };
              obj.DualScreenSettingData = cacheLoginData.DualScreenSettingData ? cacheLoginData.DualScreenSettingData.data : {};

              if (window.plus && plus.JavaToJs) {
                plus.JavaToJs.HardwareInterface('login', JSON.stringify({
                  token: cb.rest.AppContext.token,
                  data: obj
                }));
              } else if (cb.electron.getSharedObject()) {
                cb.electron.sendOrder('refreshSecondaryScreen', {
                  type: 'login',
                  message: JSON.stringify({
                    token: cb.rest.AppContext.token,
                    data: obj
                  })
                });
              }

              cb.route.pushPage(showOptions.canBilling ? '/billing' : '/portal');
              closeAwaitModal();
            }

          case 39:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function initTouchLogin(_x9, _x10) {
    return _ref8.apply(this, arguments);
  };
}();

exports.initTouchLogin = initTouchLogin;

var closeAwaitModal = function closeAwaitModal() {
  if (window.__getLoginTouchMask) {
    window.__getLoginTouchMask.destroy();

    window.__getLoginTouchMask = null;
  }
};
/* 构造config */


var configConstructor = function configConstructor(type, billNo) {
  switch (type) {
    case 'billMeta':
      return {
        url: 'billmeta/getbill',
        method: 'GET',
        params: {
          billno: billNo,
          bIncludeView: false,
          bIncludeViewModel: true
        }
      };
  }
};

exports.configConstructor = configConstructor;

var proxyTool = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(type, billNo, cacheLoginData) {
    var config, json;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            config = configConstructor(type, billNo);
            _context8.next = 3;
            return (0, _util.proxy)(config);

          case 3:
            json = _context8.sent;
            cacheLoginData["BillMetaData_".concat(billNo)] = json;

            if (json.code !== 200) {
              cb.utils.alert(json.message, 'error');
            }

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function proxyTool(_x11, _x12, _x13) {
    return _ref9.apply(this, arguments);
  };
}();

exports.proxyTool = proxyTool;

var loadOption = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
    var config, json, option;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            config = {
              url: 'option/getOptionsByParams',
              method: 'POST'
            };
            _context9.next = 3;
            return (0, _util.proxy)(config);

          case 3:
            json = _context9.sent;
            cacheLoginData.OptionData = json;
            localStorage.setItem('OptionData', JSON.stringify(json.data));
            option = {};

            if (json.code === 200) {
              json.data && json.data.forEach(function (item) {
                var name = item.name,
                    value = item.value;
                option[name] = value;
              });
            }

            cb.rest.AppContext.option = option;
            (0, _offLine.perfectOption)();

          case 10:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function loadOption() {
    return _ref10.apply(this, arguments);
  };
}();

var afterStoreLoaded = function afterStoreLoaded(callback, showStore) {
  return /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(dispatch) {
      var menuId;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              menuId = cb.rest.AppContext.user.menuId;
              if (!menuId) (0, _tree.getMenuTree)(dispatch);
              _context10.next = 4;
              return loadOption();

            case 4:
              if (showStore !== false) dispatch(getGrades(menuId));
              if (callback) callback();

              if (!(cb.rest.terminalType !== 1 || menuId)) {
                _context10.next = 8;
                break;
              }

              return _context10.abrupt("return");

            case 8:
              dispatch((0, _tabs.addItem)({
                key: 'PORTAL',
                title: '首页',
                closable: false,
                content: {
                  type: 'platform',
                  url: 'home'
                }
              }));
              dispatch((0, _home.getLayOut)());

            case 10:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x14) {
      return _ref11.apply(this, arguments);
    };
  }();
};

var getGrades = function getGrades(menuId) {
  return /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(dispatch) {
      var config, json, userGrades, defaultGrade;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              config = {
                url: 'billTemplateSet/getGradeAndEmployee',
                method: 'GET'
              };
              _context11.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context11.sent;

              if (!(json.code !== 200)) {
                _context11.next = 7;
                break;
              }

              if (!menuId) cb.utils.alert(json.message, 'error');
              return _context11.abrupt("return");

            case 7:
              userGrades = json.data.gradeInfo; // if (!userGrades.length) return;

              dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_MERGE_INFO', {
                userGrades: userGrades
              }));
              defaultGrade = userGrades.find(function (item) {
                var startTime = item.startTime,
                    endTime = item.endTime,
                    bNextDay = item.bNextDay;

                if (startTime && endTime) {
                  // const endMoment = bNextDay ? moment(`${moment().add(1, 'days').format('YYYY-MM-DD')} ${endTime}`, 'YYYY-MM-DD HH:mm:ss') : moment(endTime, 'HH:mm:ss');
                  var startMoment = (0, _moment.default)(startTime, 'HH:mm:ss');
                  var endMoment = (0, _moment.default)(endTime, 'HH:mm:ss');
                  if (!bNextDay) return (0, _moment.default)().isBetween(startMoment, endMoment);
                  return (0, _moment.default)().isBetween(startMoment, (0, _moment.default)("".concat((0, _moment.default)().format('YYYY/MM/DD'), " 23:59:59"), 'YYYY/MM/DD HH:mm:ss')) || (0, _moment.default)().isBetween((0, _moment.default)("".concat((0, _moment.default)().format('YYYY/MM/DD'), " 00:00:00"), 'YYYY/MM/DD HH:mm:ss'), endMoment);
                }

                return false;
              });

              if (defaultGrade) {
                _context11.next = 13;
                break;
              }

              if (!menuId) cb.utils.alert('没有可用的班次', 'error');
              return _context11.abrupt("return");

            case 13:
              dispatch(changeGrade(defaultGrade.id, defaultGrade.name));

            case 14:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x15) {
      return _ref12.apply(this, arguments);
    };
  }();
};

function init(loginUser, callback) {
  return function (dispatch, getState) {
    var _ref13 = loginUser || getState().user.toJS(),
        userOrgs = _ref13.userOrgs,
        userStores = _ref13.userStores,
        orgId = _ref13.orgId,
        storeId = _ref13.storeId,
        showOrg = _ref13.showOrg,
        showStore = _ref13.showStore,
        menuId = _ref13.menuId;

    if (!userOrgs && !userStores && !orgId && !storeId && !showOrg && !showStore) return;
    if (menuId) return dispatch(afterStoreLoaded(callback, showStore));
    var defaultOrg, defaultStore;

    if (showStore) {
      var cacheStore = localStorage.getItem('defaultStore');

      if (cacheStore && cacheStore != storeId) {
        if (cacheStore === 'null') {
          defaultStore = {
            store: null
          };
        } else {
          defaultStore = userStores.find(function (item) {
            return item.store == cacheStore;
          });

          if (defaultStore) {
            var relatedOrgId = defaultStore.org_id;
            if (!relatedOrgId) localStorage.setItem('defaultOrg', null);else if (relatedOrgId != (localStorage.getItem('defaultOrg') || orgId)) localStorage.setItem('defaultOrg', relatedOrgId);
          } else {
            var stores = userStores.filter(function (item) {
              return item.store === storeId;
            });

            if (stores && stores.length) {
              var _relatedOrgId = stores[0].org_id;
              if (!_relatedOrgId) localStorage.setItem('defaultOrg', null);else if (_relatedOrgId != (localStorage.getItem('defaultOrg') || orgId)) localStorage.setItem('defaultOrg', _relatedOrgId);
            } else if (userStores.length) {
              defaultStore = userStores[0];
              localStorage.setItem('defaultStore', defaultStore.store);
              var _relatedOrgId2 = defaultStore.org_id;
              if (!_relatedOrgId2) localStorage.setItem('defaultOrg', null);else if (_relatedOrgId2 != (localStorage.getItem('defaultOrg') || orgId)) localStorage.setItem('defaultOrg', _relatedOrgId2);
            }
          }
        }
      } else {
        var _stores = userStores.filter(function (item) {
          return item.store === storeId;
        });

        if (_stores && _stores.length) {
          var _relatedOrgId3 = _stores[0].org_id;
          if (!_relatedOrgId3) localStorage.setItem('defaultOrg', null);else if (_relatedOrgId3 != (localStorage.getItem('defaultOrg') || orgId)) localStorage.setItem('defaultOrg', _relatedOrgId3);
        } else if (userStores.length) {
          defaultStore = userStores[0];
          localStorage.setItem('defaultStore', defaultStore.store);
          var _relatedOrgId4 = defaultStore.org_id;
          if (!_relatedOrgId4) localStorage.setItem('defaultOrg', null);else if (_relatedOrgId4 != (localStorage.getItem('defaultOrg') || orgId)) localStorage.setItem('defaultOrg', _relatedOrgId4);
        }
      }
    }

    if (showOrg || showStore) {
      var cacheOrg = localStorage.getItem('defaultOrg');

      if (cacheOrg && cacheOrg != orgId) {
        if (cacheOrg === 'null') {
          defaultOrg = {
            org: null
          };
        } else {
          defaultOrg = userOrgs.find(function (item) {
            return item.org == cacheOrg;
          });

          if (defaultOrg && showStore && !defaultStore) {
            var _stores2 = userStores.filter(function (item) {
              return item.store === storeId;
            });

            if (_stores2 && _stores2.length) {
              defaultStore = _stores2[0];
            } else if (userStores.length) {
              defaultStore = userStores[0];
              localStorage.setItem('defaultStore', defaultStore.store);
            }
          }
        }
      }
    }

    if (defaultOrg && defaultStore) return dispatch(_changeOrgAndStore(defaultOrg.org, defaultOrg.org_name, defaultStore.store, defaultStore.store_name, callback));
    if (defaultOrg) return dispatch(changeOrg(defaultOrg.org, defaultOrg.org_name, callback, showStore));
    if (defaultStore) return dispatch(changeStore(defaultStore.store, defaultStore.store_name, callback));
    dispatch(afterStoreLoaded(callback, showStore));
  };
}

function billingInit() {
  return function (dispatch, getState) {
    dispatch(getGrades());
  };
} // 登出


function logout(router) {
  return function (dispatch) {
    // dispatch({
    //   type: 'PLATFORM_DATA_LOGIN_OUT',
    // })
    if (cb.rest.interMode !== 'touch') {
      _cookiesJs.default.expire('token');

      localStorage.removeItem('token');
    }

    router.push('/login');
    dispatch((0, _util.genAction)('LOGIN_SAVE_USERLIST', []));
    dispatch((0, _tree.clearMenu)());
    dispatch((0, _tabs.clear)());
    dispatch((0, _home.clearLayOut)());
  };
} // 账户中心


function setAccountMsg(value) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_SET_ACCOUNT_MSG', value));
  };
}

function setAccountActiveKey(value) {
  return function (dispatch) {
    dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_SET_ACCOUNT_ACTIVE_KEY', value));
  };
}

function getLoginUser() {
  return function (dispatch) {
    var config = {
      url: 'user/getLoginUserByToken',
      method: 'GET'
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) return;
      dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_SET_INFO', json.data));
    });
  };
}

function changeOrg(value, name, inner, showStore) {
  return function (dispatch, getState) {
    if (inner) {
      dispatch(_changeOrg(value, name, function () {
        dispatch(afterStoreLoaded(inner, showStore));
      }));
    } else {
      cb.utils.confirm('确定要切换组织吗？该操作将重新刷新页面！', function () {
        dispatch(_changeOrg(value, name, function () {
          clearCache();

          var _getState$user$toJS = getState().user.toJS(),
              userStores = _getState$user$toJS.userStores;

          var stores = userStores.filter(function (item) {
            return item.org_id === value;
          });
          if (stores && stores.length) localStorage.setItem('defaultStore', stores[0].store);else localStorage.setItem('defaultStore', null);
          location.reload();
        }));
      });
    }
  };
}

var _changeOrg = function _changeOrg(value, name, callback) {
  return function (dispatch) {
    var config = {
      url: 'user/changeOrgOrShop',
      method: 'POST',
      params: {
        orgId: value
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert(json.message, 'warning');
        return;
      }

      var info = {
        defaultOrgName: name,
        orgId: value
      };
      Object.assign(cb.rest.AppContext.user, info);
      dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_CHANGE_ORG', info));
      localStorage.setItem('defaultOrg', value);
      callback();
    });
  };
};

function changeStore(value, name, inner) {
  return function (dispatch, getState) {
    if (inner) {
      dispatch(_changeStore(value, name, function () {
        dispatch(afterStoreLoaded(inner));
      }));
    } else {
      if (cb.rest.terminalType == 3) {
        dispatch(_changeStore(value, name, function () {
          // dispatch(getGrades());
          // dispatch(genAction('PLATFORM_DATA_USER_ACCOUNT_STORE_CHANGED'));
          clearCache();

          var _getState$user$toJS2 = getState().user.toJS(),
              userStores = _getState$user$toJS2.userStores;

          var stores = userStores.filter(function (item) {
            return item.store === value;
          });
          if (stores && stores.length) localStorage.setItem('defaultOrg', stores[0].org_id);
          dispatch(afterLogin());
        }));
      } else {
        cb.utils.confirm('确定要切换门店吗？该操作将重新刷新页面！', function () {
          dispatch(_changeStore(value, name, function () {
            // dispatch(getGrades());
            // dispatch(genAction('PLATFORM_DATA_USER_ACCOUNT_STORE_CHANGED'));
            clearCache();

            var _getState$user$toJS3 = getState().user.toJS(),
                userStores = _getState$user$toJS3.userStores;

            var stores = userStores.filter(function (item) {
              return item.store === value;
            });
            if (stores && stores.length) localStorage.setItem('defaultOrg', stores[0].org_id);
            location.reload();
          }));
        });
      }
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

      var info = {
        defaultStoreName: name,
        storeId: value
      };
      Object.assign(cb.rest.AppContext.user, info);
      dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_CHANGE_STORE', info));
      localStorage.setItem('defaultStore', value);
      callback();
    });
  };
};

var _changeOrgAndStore = function _changeOrgAndStore(orgId, orgName, storeId, storeName, callback) {
  return function (dispatch) {
    var config = {
      url: 'user/changeOrgOrShop',
      method: 'POST',
      params: {
        orgId: orgId,
        storeId: storeId
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert(json.message, 'warning');
        return;
      }

      var info = {
        defaultOrgName: orgName,
        orgId: orgId,
        defaultStoreName: storeName,
        storeId: storeId
      };
      Object.assign(cb.rest.AppContext.user, info);
      dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_MERGE_INFO', info));
      dispatch(afterStoreLoaded(callback));
    });
  };
};

function changeGrade(value, name) {
  return function (dispatch) {
    var gradeInfo = {
      defaultGradeName: name,
      gradeId: value
    };
    dispatch((0, _util.genAction)('PLATFORM_DATA_USER_ACCOUNT_CHANGE_GRADE', gradeInfo));
    localStorage.setItem('defaultGrade', JSON.stringify(gradeInfo));
  };
}

function weChatLogin() {
  return function (dispatch) {
    var config = {
      url: '/weChat/getWechatQrCode',
      method: 'GET'
    };
    if (process.env.NODE_ENV === 'development') config.params = {
      debug: true
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert(json.message, 'warning');
        console.error(json.message);
        return;
      }

      window.open(json.data, '_self');
    });
  };
}

function changeInterMode(mode) {
  return function (dispatch) {
    _interMode = mode;
  };
}

function switchInterMode(mode) {
  return /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(dispatch) {
      var config, json;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              config = {
                url: 'user/switchInterMode',
                method: 'GET',
                options: {
                  uniform: false
                },
                params: {
                  mode: mode
                }
              };
              _context12.next = 3;
              return (0, _util.proxy)(config);

            case 3:
              json = _context12.sent;

              if (!(json.code !== 200)) {
                _context12.next = 7;
                break;
              }

              cb.utils.alert(json.message);
              return _context12.abrupt("return");

            case 7:
              if (location.pathname !== '/login') {
                location.href = json.data.redirectUrl;
              } else {
                location.reload();
              }

            case 8:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function (_x16) {
      return _ref14.apply(this, arguments);
    };
  }();
}

function touchLogout() {
  return function (dispatch) {
    cb.utils.logout();
    cb.route.redirectLoginPage(false);
    dispatch({
      type: 'PLATFORM_DATA_USER_ACCOUNT_SET_ACCOUNT_MSG',
      payload: {
        password: ''
      }
    });
    cb.events.execute('communication', {
      type: 'DUAL_SCREEN_CLEAR_SETTING'
    });
    dispatch({
      type: 'PLATFORM_UI_BILLING_CLEAR'
    });
    dispatch({
      type: 'PLATFORM_UI_BILLING_TOUCH_LOGOUT'
    });
    dispatch((0, _offLine.timeTask)('close'));
  };
}

function touchExit() {
  return function (dispatch) {
    if (typeof Electron === 'undefined') {
      cb.utils.logout(true);
      cb.route.redirectLoginPage(false);
      dispatch({
        type: 'PLATFORM_DATA_USER_ACCOUNT_SET_ACCOUNT_MSG',
        payload: {
          password: ''
        }
      });
      cb.events.execute('communication', {
        type: 'DUAL_SCREEN_CLEAR_SETTING'
      });
      dispatch({
        type: 'PLATFORM_UI_BILLING_CLEAR'
      });
      dispatch({
        type: 'PLATFORM_UI_BILLING_TOUCH_LOGOUT'
      });
    } else {
      _cookiesJs.default.expire('token'); // dispatch(clearMenu());
      // dispatch(clear());
      // dispatch(clearLayOut());
      // cb.events.execute('communication', {type: 'DUAL_SCREEN_CLEAR_SETTING'});
      // dispatch({type: 'PLATFORM_UI_BILLING_CLEAR'});
      // dispatch({type: 'PLATFORM_UI_BILLING_TOUCH_LOGOUT'});


      closeWindow();
    }
  };
}

function closeWindow() {
  setTimeout(function () {
    if (cb.utils.getCookie('token')) {
      closeWindow();
      return;
    }

    Electron.remote.getCurrentWindow().close();
  }, 1000);
}

function windowClose() {
  return function (dispatch) {
    if (typeof Electron === 'undefined') return;
    Electron.remote.getCurrentWindow().close();
  };
}

function windowMinimize() {
  return function (dispatch) {
    if (typeof Electron === 'undefined') return;
    Electron.remote.getCurrentWindow().minimize();
  };
}

var getExperience = function getExperience() {
  return function (dispatch) {
    var config = {
      url: 'demoAccount/industryList',
      method: 'GET'
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code != 200) {
        cb.utils.alert(json.message, 'error');
        return;
      }

      if (!json.data || !json.data.length) return;
      dispatch((0, _util.genAction)('PLATFORM_DATA_SET_EXPERIENCE_ACCOUNT', {
        experienceList: json.data
      }));
    });
  };
};

exports.getExperience = getExperience;

var demoLogin = function demoLogin(accout) {
  return function (dispatch) {
    var config = {
      url: "/demoAccount/login?loginAccount=".concat(accout),
      method: 'GET',
      options: {
        uniform: false
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code != 200) {
        cb.utils.alert(json.message, 'error');
        return;
      }

      location.href = location.origin; // location.href = '/refer';
    });
  };
};

exports.demoLogin = demoLogin;