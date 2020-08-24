"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = viewhook;

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _jsBeautify = _interopRequireDefault(require("js-beautify"));

var _html = _interopRequireDefault(require("./html"));

var _Isomorph = _interopRequireDefault(require("../../../common/redux/Isomorph"));

var _routes = _interopRequireDefault(require("../../../common/routes"));

var _config = _interopRequireDefault(require("../../../common/routes/config.route"));

var _rebuildPaths;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var routesMap = {
  index: _routes.default
};
var rebuildPaths = ['/', '/portal', '/register', '/wechat', '/forget', '/menu']; //TODO 用户自定义

var customPaths = [];
Array.isArray(_config.default) && _config.default.length > 0 && _config.default.forEach(function (route) {
  var path = route.path;

  if (path) {
    customPaths.push(path);
  }
});
rebuildPaths = Array.from(new Set((_rebuildPaths = rebuildPaths).concat.apply(_rebuildPaths, customPaths)));

var directNext = function directNext(ctx) {
  if (rebuildPaths.indexOf(ctx.path) > -1 || ctx.path.startsWith('/login') || ctx.path.startsWith('/billing') || process.env.PREFIX && ctx.path.startsWith(process.env.PREFIX) || ctx.path.startsWith('/meta') || ctx.path.startsWith('/platform') || ctx.path.startsWith('/echartcarousel')) return false;
  return true;
};

function viewhook() {
  var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    beautify: true,
    internals: true
  };

  var options = Object.assign({}, _options);
  return /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
      var isTouch;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!ctx.path.includes('/json')) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              if (!directNext(ctx)) {
                _context.next = 6;
                break;
              }

              _context.next = 5;
              return next();

            case 5:
              return _context.abrupt("return");

            case 6:
              isTouch = ctx.header['user-agent'].match(/(Android);?[\s\/]+([\d.]+)?/) || ctx.path === '/billing/touch' || ctx.path === '/login/touch';
              if (isTouch) ctx.entryPoint = 'touch';else if (ctx.path === '/billing') ctx.entryPoint = 'billing';else ctx.entryPoint = 'index';
              ctx.store = _Isomorph.default.createStore(ctx.entryPoint);
              ctx.history = _Isomorph.default.createHistory(ctx.store, ctx.path);

              ctx.render = function (pageInfo) {
                var internals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : options.internals || true;
                var render = internals ? _server.default.renderToString : _server.default.renderToStaticMarkup;
                var markup = render( /*#__PURE__*/_react.default.createElement(_Isomorph.default, {
                  store: ctx.store,
                  history: ctx.history,
                  routes: routesMap[ctx.entryPoint]
                }));

                if (options.beautify) {
                  markup = _jsBeautify.default.html(markup);
                }

                ctx.type = 'html'; // 判断页面是否为billing, 传入html加载不同的依赖

                ctx.body = (0, _html.default)(Object.assign({
                  entryPoint: ctx.entryPoint
                }, pageInfo), markup, ctx.store.getState());
              };

              _context.next = 13;
              return next();

            case 13:
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