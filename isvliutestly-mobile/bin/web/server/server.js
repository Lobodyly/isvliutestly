"use strict";

require("ignore-styles");

var _path = _interopRequireDefault(require("path"));

var _koa = _interopRequireDefault(require("koa"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaCompress = _interopRequireDefault(require("koa-compress"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _chalk = _interopRequireDefault(require("chalk"));

var _viewhook = _interopRequireDefault(require("./middlewares/viewhook"));

var _middlewaresLog4js = _interopRequireDefault(require("@mdf/middlewares-log4js"));

var _middlewaresAuth = _interopRequireDefault(require("@mdf/middlewares-auth"));

var _router = _interopRequireDefault(require("./router"));

var _env = _interopRequireDefault(require("./env"));

require("@mdf/cube/lib/helpers/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('isomorphic-fetch');

new _koa.default().use((0, _middlewaresLog4js.default)()) // 日志不能删除@mdf/metaui-web有调用
.use((0, _middlewaresAuth.default)({
  config: _env.default
})) //token校验
.use((0, _viewhook.default)({
  beautify: _env.default.HTTP_HTML_BEAUTIFY
})) // 处理模板
.use((0, _koaCompress.default)()) // gzip
.use((0, _koaBodyparser.default)({
  enableTypes: ['json'],
  jsonLimit: '10mb'
})) // 上传
.use(_router.default.routes()) // 路由表
.use(_router.default.allowedMethods()) // 访问模式
.use((0, _koaStatic.default)(_path.default.join(process.cwd(), 'static', 'public'), {
  maxage: 365 * 24 * 60 * 60 * 1000
})).use((0, _koaStatic.default)(_path.default.join(process.cwd(), 'static'))) // , { maxage: 365 * 24 * 60 * 60 * 1000 }
.listen(_env.default.HTTP_SERVER_PORT); // 端口

console.log(_chalk.default.blue("MDF\u540E\u7AEFNode\u670D\u52A1\u542F\u52A8\u6210\u529F\uFF0C\u7AEF\u53E3\uFF1A".concat(_env.default.HTTP_SERVER_PORT, " \u5F53\u524D\u73AF\u5883\uFF1A").concat(process.env.NODE_ENV)));