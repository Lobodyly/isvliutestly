"use strict";

var _env = _interopRequireDefault(require("../env"));

var _common = require("./common");

var _util = require("@mdf/cube/lib/helpers/util");

var _config = _interopRequireDefault(require("../../common/routes/config.route"));

var _router = _interopRequireDefault(require("../router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function renderPageContent(ctx, internals, title) {
  var pageInfo = {
    title: '核算服务'
  };

  if (title) {
    pageInfo.title = title;
  }

  try {
    ctx.render(pageInfo, internals);
  } catch (e) {
    ctx.logger.error(e);
  }
}

function RenderPageAndData(_x) {
  return _RenderPageAndData.apply(this, arguments);
}

function _RenderPageAndData() {
  _RenderPageAndData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx) {
    var user, url, config, json, orgMenus, storeMenus, device;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _common.getLoginUser)(ctx);

          case 2:
            user = _context2.sent;

            if (user) {
              _context2.next = 6;
              break;
            }

            ctx.redirect('/login');
            return _context2.abrupt("return");

          case 6:
            url = _env.default.HTTP_USER_FETCH_TREE.format(ctx.token, 1);
            config = {
              url: url,
              method: 'POST'
            };
            _context2.next = 10;
            return (0, _util.uniformProxy)(config);

          case 10:
            json = _context2.sent;

            if (!(json.code !== 200)) {
              _context2.next = 15;
              break;
            }

            ctx.logger.error("\u83B7\u53D6\u6811\u7ED3\u6784\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011".concat(url, " \u3010\u5F02\u5E38\u3011").concat(json.message));
            ctx.body = json;
            return _context2.abrupt("return");

          case 15:
            json.data = json.data || [];
            orgMenus = [], storeMenus = [];
            ctx.logger.error(ctx.entryPoint);
            (0, _util.rebuildTreeData)(json.data, orgMenus, storeMenus);
            user.showOrg = orgMenus.length ? true : false;
            user.showStore = storeMenus.length ? true : false;
            device = ctx.request.query.device;
            if (device) user.device = device;
            ctx.store.dispatch({
              type: 'PLATFORM_UI_USER_INIT',
              payload: user
            });
            ctx.store.dispatch({
              type: 'PLATFORM_UI_TREE_LOAD',
              TreeData: json.data
            });
            renderPageContent(ctx);

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _RenderPageAndData.apply(this, arguments);
}

var pageController = {
  page: RenderPageAndData,
  portal: RenderPageAndData,
  menu: function menu(ctx) {
    renderPageContent(ctx, null, '业务菜单');
  },
  login: function login(ctx) {
    renderPageContent(ctx);
  },
  register: function register(ctx) {
    renderPageContent(ctx, false);
  },
  wechat: function wechat(ctx) {
    renderPageContent(ctx);
  },
  forget: function forget(ctx) {
    renderPageContent(ctx, false);
  },
  expire: function expire(ctx) {
    renderPageContent(ctx);
  },
  extscripturls: function () {
    var _extscripturls = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
      var url, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = "".concat(_env.default.HTTP_SERVICE_BASEURL).concat(ctx.request.url);
              _context.next = 3;
              return fetch(url, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/javascript',
                  'Cookie': ctx.request.header.cookie
                },
                mode: 'cors',
                credentials: "include"
              }).then(function (response) {
                return response.text();
              }).then(function (data) {
                return data;
              });

            case 3:
              response = _context.sent;
              ctx.body = response;

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function extscripturls(_x2) {
      return _extscripturls.apply(this, arguments);
    }

    return extscripturls;
  }()
}; //TODO 用户自定义路由

var customController = {};
Array.isArray(_config.default) && _config.default.length > 0 && _config.default.forEach(function (route) {
  var path = route.path;

  if (path) {
    var controllerKey = '';
    var pathArr = path.split('/');

    if (pathArr.length == 1) {
      controllerKey = pathArr[0];
    } else if (pathArr.length > 1) {
      controllerKey = pathArr[1];
    }

    customController[controllerKey] = function (ctx) {
      renderPageContent(ctx, null, route.title);
    };
  }
});
Object.assign(pageController, customController);
module.exports = pageController;