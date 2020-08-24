"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _router = _interopRequireDefault(require("@mdf/plugin-meta/lib/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _koaRouter.default)();
(0, _router.default)(router);
router.get("/view/:billtype/:billno", function (ctx) {
  ctx.render();
});
router.get("/", function (ctx) {
  ctx.render();
});
var _default = router;
exports.default = _default;