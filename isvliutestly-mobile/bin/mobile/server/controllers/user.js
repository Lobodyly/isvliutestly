"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _env = _interopRequireDefault(require("../env"));

var _util = require("@mdf/cube/lib/helpers/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// import * as actions from '../../common/redux/modules/user';
function _default(router) {
  router.post('/user/registercorp', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
      var inform, options, userInform, accInform;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              inform = ctx.request.body;

              if (!(ctx.request.query.type != 'enable')) {
                _context.next = 15;
                break;
              }

              userInform = {
                user: {},
                corp: {},
                mobileFlag: true
              };
              userInform.user.username = inform.user;
              userInform.user.password = inform.pwd;
              userInform.user.email = inform.email;
              userInform.user.mobile = inform.mobile;
              userInform.user.fullname = inform.fullname ? inform.fullname : inform.user;
              userInform.corp.name = inform.corpname;
              userInform.corp.alias = inform.corpalias;
              options = (0, _util.genFetchOptions)('post', userInform);
              _context.next = 13;
              return fetch(_env.default.HTTP_USER_REG_CORP, options).then(function (response) {
                if (response.status === 200) {
                  return response.json();
                }

                return {
                  code: 500
                };
              }, _util.catchException).then(function (json) {
                ctx.body = json;
              });

            case 13:
              _context.next = 19;
              break;

            case 15:
              accInform = {
                alias: inform.corpalias
              };
              options = (0, _util.genFetchOptions)('post', accInform);
              _context.next = 19;
              return fetch(_env.default.HTTP_USER_CREATE_ACC, options).then(function (response) {
                if (response.status === 200) {
                  return response.json();
                }

                return {
                  code: 500
                };
              }, _util.catchException).then(function (json) {
                ctx.body = json;
              });

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  router.post('/user/login', /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
      var requestUrl, requestData, options, now;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              requestUrl = _env.default.HTTP_USER_AUTHENTICATION;
              requestData = ctx.request.body;
              ctx.logger.info("\u8BF7\u6C42\u5730\u5740\uFF1A".concat(requestUrl));
              ctx.logger.info("\u8BF7\u6C42\u53C2\u6570\uFF1A".concat(JSON.stringify(requestData)));
              options = (0, _util.genFetchOptions)('post', requestData);
              now = Date.now();
              _context2.next = 8;
              return fetch(requestUrl, options).then(_util.toJSON, _util.catchException).then(function (json) {
                ctx.logger.info("\u8FD4\u56DE\u6570\u636E\uFF1A".concat(JSON.stringify(json)));

                if (json.code === 200) {
                  // const host = ctx.host.split(':')[0]
                  var expires = new Date(now + 24 * 3600 * 1000); // ctx.cookies.set('user', encodeURIComponent(JSON.stringify(json.data)), {

                  ctx.cookies.set('token', json.data.token, {
                    // domain: host,
                    path: '/',
                    expires: expires,
                    httpOnly: false
                  });
                }

                ctx.body = json;
              });

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  router.post('/user/authorize', /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx) {
      var requestUrl, requestData, options, now;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              requestUrl = _env.default.HTTP_USER_AUTHENTICATION;
              requestData = ctx.request.body;
              ctx.logger.info("\u8BF7\u6C42\u5730\u5740\uFF1A".concat(requestUrl));
              ctx.logger.info("\u8BF7\u6C42\u53C2\u6570\uFF1A".concat(JSON.stringify(requestData)));
              options = (0, _util.genFetchOptions)('post', requestData);
              now = Date.now();
              _context3.next = 8;
              return fetch(requestUrl, options).then(_util.toJSON, _util.catchException).then(function (json) {
                ctx.logger.info("\u8FD4\u56DE\u6570\u636E\uFF1A".concat(JSON.stringify(json)));

                if (json.code === 200) {
                  // const host = ctx.host.split(':')[0]
                  var expires = new Date(now + 24 * 3600 * 1000); // ctx.cookies.set('user', encodeURIComponent(JSON.stringify(json.data)), {
                  // 过期商户不写入cookie

                  if (json.data.leftTime != -1) {
                    ctx.cookies.set('token', json.data.token, {
                      // domain: host,
                      path: '/',
                      expires: expires,
                      httpOnly: false
                    });
                  }
                }

                ctx.body = json;
              });

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());
  router.post('/user/getCorpAccounts', /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx) {
      var options;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              console.log(ctx.request.body);
              console.log(_env.default.HTTP_USER_COR_ACC);
              options = (0, _util.genFetchOptions)('post', ctx.request.body);
              _context4.next = 5;
              return fetch(_env.default.HTTP_USER_COR_ACC, options).then(function (response) {
                if (response.status === 200) {
                  return response.json();
                }

                return {
                  code: 500
                };
              }, _util.catchException).then(function (json) {
                if (json.code === 200) {
                  /* const host = ctx.host.split(':')[0]
                   const expires = new Date(now + 24 * 3600 * 1000)
                    ctx.cookies.set('user', encodeURIComponent(JSON.stringify(json.data)), {
                   // domain: host,
                   path: '/',
                   expires,
                   httpOnly: false,
                   }) */
                }

                ctx.body = json;
              });

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }());
  router.post('/user/getUserOrgs', /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx) {
      var options;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              console.log(ctx.request.body);
              console.log(_env.default.HTTP_USER_ORG);
              options = (0, _util.genFetchOptions)('post', ctx.request.body);
              _context5.next = 5;
              return fetch(_env.default.HTTP_USER_ORG, options).then(function (response) {
                if (response.status === 200) {
                  return response.json();
                }

                return {
                  code: 500
                };
              }, _util.catchException).then(function (json) {
                if (json.code === 200) {}

                ctx.body = json;
              });

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x5) {
      return _ref5.apply(this, arguments);
    };
  }());
  router.get('/weChat/callback', /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(ctx) {
      var _ctx$request, query, querystring;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _ctx$request = ctx.request, query = _ctx$request.query, querystring = _ctx$request.querystring;

              if (!query.debug) {
                _context6.next = 4;
                break;
              }

              ctx.redirect("http://fangqg.yonyouup.com/weChat/callbacktest?".concat(querystring));
              return _context6.abrupt("return");

            case 4:
              _context6.next = 6;
              return doWeChatCallback(ctx);

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x6) {
      return _ref6.apply(this, arguments);
    };
  }());
  router.get('/weChat/callbacktest', /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(ctx) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return doWeChatCallback(ctx);

            case 2:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x7) {
      return _ref7.apply(this, arguments);
    };
  }());

  var doWeChatCallback = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(ctx) {
      var url, config, json;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              url = (0, _util.combine)(_env.default.HTTP_SERVICE_BASEURL, "weChat/callback?".concat(ctx.request.querystring));
              config = {
                url: url,
                method: 'GET'
              };
              _context8.next = 4;
              return (0, _util.uniformProxy)(config);

            case 4:
              json = _context8.sent;

              if (!(json.code === 200)) {
                _context8.next = 9;
                break;
              }

              setCookie(ctx, json.data.token);
              ctx.redirect('/portal');
              return _context8.abrupt("return");

            case 9:
              if (!(json.code === 902)) {
                _context8.next = 13;
                break;
              }

              ctx.cookies.set('weChatRandom', json.data, {
                path: '/',
                expires: new Date(Date.now() + 24 * 3600 * 1000),
                httpOnly: true
              });
              ctx.redirect('/wechat');
              return _context8.abrupt("return");

            case 13:
              ctx.logger.error("\u5FAE\u4FE1\u56DE\u8C03\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011".concat(url, " \u3010\u5F02\u5E38\u3011").concat(json.message));
              ctx.body = json;

            case 15:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function doWeChatCallback(_x8) {
      return _ref8.apply(this, arguments);
    };
  }();

  var setCookie = function setCookie(ctx, token) {
    ctx.cookies.set('token', token, {
      path: '/',
      expires: new Date(Date.now() + 24 * 3600 * 1000),
      httpOnly: false
    });
  };

  router.post('/weChat/bindExistUser', /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(ctx) {
      var cookies, request, req, params, url, config, json;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              cookies = ctx.cookies, request = ctx.request, req = ctx.req;
              params = request.body;
              params.weChatRandom = cookies.get('weChatRandom');
              url = (0, _util.combine)(_env.default.HTTP_SERVICE_BASEURL, 'weChat/bindExistUser');
              config = {
                url: url,
                method: 'POST',
                params: params,
                headers: {
                  'content-type': _env.default.HTTP_CONTENT_TYPE.JSON,
                  origin: 'koa2 server',
                  cookie: req.headers.cookie
                }
              };
              _context9.next = 7;
              return (0, _util.uniformProxy)(config);

            case 7:
              json = _context9.sent;

              if (!(json.code === 200)) {
                _context9.next = 12;
                break;
              }

              setCookie(ctx, json.data.token);
              ctx.body = json;
              return _context9.abrupt("return");

            case 12:
              ctx.logger.error("\u5FAE\u4FE1\u56DE\u8C03\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011".concat(url, " \u3010\u5F02\u5E38\u3011").concat(json.message));
              ctx.body = json;

            case 14:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function (_x9) {
      return _ref9.apply(this, arguments);
    };
  }());
  router.get('/meta/voucherlist/aa_productlist', /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(ctx) {
      var query, url, config, json;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              query = ctx.request.query;
              url = (0, _util.combine)(_env.default.HTTP_SERVICE_BASEURL, "user/loginByYxyToken?yxyToken=".concat(query.yxyToken));
              config = {
                url: url,
                method: 'GET'
              };
              _context10.next = 5;
              return (0, _util.uniformProxy)(config);

            case 5:
              json = _context10.sent;

              if (json.code === 200) {
                setCookie(ctx, json.data.token);
                ctx.render({
                  title: '货品档案'
                });
              } else {
                ctx.logger.error("\u6839\u636EyxyToken\u83B7\u53D6token\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011".concat(url, " \u3010\u5F02\u5E38\u3011").concat(json.message));
                ctx.body = json;
              }

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function (_x10) {
      return _ref10.apply(this, arguments);
    };
  }());
  router.get('/demoAccount/login', /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(ctx) {
      var url, config, json;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              url = (0, _util.combine)(_env.default.HTTP_SERVICE_BASEURL, ctx.url);
              config = {
                url: url,
                method: 'GET'
              };
              _context11.next = 4;
              return (0, _util.uniformProxy)(config);

            case 4:
              json = _context11.sent;
              if (json.code === 200) setCookie(ctx, json.data.token);
              ctx.body = json;

            case 7:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x11) {
      return _ref11.apply(this, arguments);
    };
  }());
  router.get('/demo/:account', /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(ctx) {
      var account, url, config, json;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              account = ctx.params.account;
              url = (0, _util.combine)(_env.default.HTTP_SERVICE_BASEURL, "demoAccount/login?loginAccount=".concat(account));
              config = {
                url: url,
                method: 'GET'
              };
              _context12.next = 5;
              return (0, _util.uniformProxy)(config);

            case 5:
              json = _context12.sent;

              if (json.code === 200) {
                setCookie(ctx, json.data.token);
                ctx.redirect('/portal');
              } else {
                ctx.logger.error("\u6F14\u793A\u884C\u4E1A\u8D26\u53F7\u767B\u5F55\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011".concat(url, " \u3010\u5F02\u5E38\u3011").concat(json.message));
                ctx.body = json;
              }

            case 7:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function (_x12) {
      return _ref12.apply(this, arguments);
    };
  }());
  router.get('/demo/:username/:password', /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(ctx) {
      var _ctx$params, username, password, url, config, json;

      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _ctx$params = ctx.params, username = _ctx$params.username, password = _ctx$params.password;
              url = _env.default.HTTP_USER_AUTHENTICATION;
              config = {
                url: url,
                method: 'POST',
                params: {
                  username: username,
                  password: password
                }
              };
              _context13.next = 5;
              return (0, _util.uniformProxy)(config);

            case 5:
              json = _context13.sent;

              if (json.code === 200) {
                setCookie(ctx, json.data.token);
                ctx.redirect('/portal');
              } else {
                ctx.logger.error("\u6F14\u793A\u7528\u6237\u5BC6\u7801\u767B\u5F55\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011".concat(url, " \u3010\u5F02\u5E38\u3011").concat(json.message));
                ctx.body = json;
              }

            case 7:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function (_x13) {
      return _ref13.apply(this, arguments);
    };
  }());
  router.get('/thirdparty/check', /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(ctx) {
      var yxyToken, url, config, json;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              yxyToken = ctx.query.yxyToken;
              url = (0, _util.combine)(_env.default.HTTP_SERVICE_BASEURL, "user/loginByYxyToken?yxyToken=".concat(yxyToken));
              config = {
                url: url,
                method: 'GET'
              };
              _context14.next = 5;
              return (0, _util.uniformProxy)(config);

            case 5:
              json = _context14.sent;

              if (json.code === 200) {
                if (json.data) {
                  setCookie(ctx, json.data.token);
                  ctx.redirect('/portal');
                } else {
                  json.message = '登录失败，用户不存在';
                  ctx.logger.error("\u6839\u636EyxyToken\u83B7\u53D6token\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011".concat(url, " \u3010\u5F02\u5E38\u3011").concat(json.message));
                  ctx.body = json;
                }
              } else {
                ctx.logger.error("\u6839\u636EyxyToken\u83B7\u53D6token\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011".concat(url, " \u3010\u5F02\u5E38\u3011").concat(json.message));
                ctx.body = json;
              }

            case 7:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    return function (_x14) {
      return _ref14.apply(this, arguments);
    };
  }());
  router.get('/user/switchInterMode', function (ctx) {
    var mode = ctx.query.mode;
    ctx.cookies.set('interMode', mode, {
      path: '/',
      expires: new Date(Date.now() + 24 * 3600 * 1000),
      httpOnly: true
    });
    ctx.body = {
      code: 200,
      data: {
        redirectUrl: mode === 'pc' ? '/portal' : '/billing'
      }
    };
  });
  return router;
}