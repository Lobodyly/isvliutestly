"use strict";

var _path = _interopRequireDefault(require("path"));

var _koa = _interopRequireDefault(require("koa"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _koaLogger = _interopRequireDefault(require("koa-logger"));

var _koaCompress = _interopRequireDefault(require("koa-compress"));

var _koaBodyparser = _interopRequireDefault(require("koa-bodyparser"));

var _koaProxies = _interopRequireDefault(require("koa-proxies"));

var _chalk = _interopRequireDefault(require("chalk"));

var _mobile = _interopRequireDefault(require("./middlewares/viewhook/mobile"));

var _middlewaresAuth = _interopRequireDefault(require("@mdf/middlewares-auth/"));

var _middlewaresLog4js = _interopRequireDefault(require("@mdf/middlewares-log4js"));

var _env = _interopRequireDefault(require("./env"));

require("@mdf/cube/lib/helpers/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('isomorphic-fetch');

var router = require("./router").default;

new _koa.default().use((0, _middlewaresLog4js.default)()).use((0, _middlewaresAuth.default)({
  config: _env.default
})).use((0, _mobile.default)()).use((0, _koaLogger.default)()).use((0, _koaCompress.default)()).use((0, _koaBodyparser.default)({
  enableTypes: ['json'],
  jsonLimit: '10mb'
})).use(router.routes()).use(router.allowedMethods()).use((0, _koaStatic.default)(_path.default.join(process.cwd(), 'static', 'public'), {
  maxage: 365 * 24 * 60 * 60 * 1000
})).use((0, _koaStatic.default)(_path.default.join(process.cwd(), 'home'))).use((0, _koaStatic.default)(_path.default.join(process.cwd(), 'static'))) // , { maxage: 365 * 24 * 60 * 60 * 1000 }
.use((0, _koaProxies.default)('/mobile/app/index/yht/token/context', {
  target: _env.default.HTTP_SERVICE_BASEURL,
  changeOrigin: true
})).listen(_env.default.HTTP_SERVER_PORT);
console.log(_chalk.default.blue("listening on port ".concat(_env.default.HTTP_SERVER_PORT, " -- ").concat(process.env.NODE_ENV)));