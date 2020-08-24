"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _sourceMap = _interopRequireDefault(require("./controllers/sourceMap"));

var _ueditor = _interopRequireDefault(require("./controllers/ueditor"));

var _page = _interopRequireDefault(require("./controllers/page"));

var _fetch = _interopRequireDefault(require("./controllers/fetch"));

var _config = _interopRequireDefault(require("../common/routes/config.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _koaRouter.default)();

require('@mdf/plugin-meta/lib/router').default(router); //sourceMap


router.get('/sourcemap/:name/:pwd', _sourceMap.default.sourcemapByNamePwd);
router.get('/scripts/*.min.js.map', _sourceMap.default.scripts); //ueditor

router.get('/basictest', _ueditor.default.basictest);
router.all('/ueditor/ue', _ueditor.default.ue); // page

router.get('/login', _page.default.login);
router.get('/menu', _page.default.menu);
router.get('/register', _page.default.register);
router.get('/wechat', _page.default.wechat);
router.get('/forget', _page.default.forget);
router.get('/expire', _page.default.expire);
router.get('/page/**', _page.default.page);
router.get('/portal', _page.default.portal); //添加代理扩展脚本文件

router.get('/gentenextcode/getExtFileContent', _page.default.extscripturls); //TODO 用户配置的页面

Array.isArray(_config.default) && _config.default.length > 0 && _config.default.map(function (route) {
  var path = route.path;

  if (path) {
    var controllerKey = '';
    var pathArr = path.split('/');

    if (pathArr.length == 1) {
      controllerKey = pathArr[0];
    } else if (pathArr.length > 1) {
      controllerKey = pathArr[1];
    }

    return router.get(path, _page.default[controllerKey]);
  } else {
    return null;
  }
}); // 测试fetch是否可用

router.get('/test/fetch', _fetch.default.fetch); // 跳到门户页面

router.get('/', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var redirectUrl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            redirectUrl = ctx.host.indexOf('yonyoucloud') === -1 && ctx.host.indexOf('yonyouup') === -1 ? '/menu' : '/index.html';
            ctx.redirect(ctx.entryPoint === 'touch' ? '/billing' : redirectUrl);

          case 2:
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
var _default = router;
exports.default = _default;