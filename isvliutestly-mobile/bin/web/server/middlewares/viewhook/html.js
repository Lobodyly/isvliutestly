"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = html;

var _invariant = _interopRequireDefault(require("invariant"));

var _env = _interopRequireDefault(require("../../env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isDev = process.env.NODE_ENV === 'development';
var baseUrl = _env.default.HTTP_SCRIPT_BASEURL;
var HTTP_PREFIX = _env.default.HTTP_PREFIX;
var suffix = _env.default.HTTP_SCRIPT_SUFFIX;
var random = isDev ? '' : "?_=".concat(_env.default.STATIC_RANDOM_SUFFIX);
var printMeta = _env.default.PRINT_META;
var serviceBaseUrl = _env.default.HTTP_SERVICE_BASEURL;

function html(pageInfo, content, state) {
  // 开发环境使用样式热更新, 不再用打包后的独立css文件
  var loadCss = isDev ? "<link href=\"".concat(baseUrl, "/styles/ncc-theme/vendor.css").concat(random, "\" rel=\"stylesheet\" type=\"text/css\" />") : "<link href=\"".concat(baseUrl, "/stylesheets/").concat(pageInfo.entryPoint).concat(suffix, ".css").concat(random, "\" rel=\"stylesheet\" type=\"text/css\" />"); // const loadCss = isDev ? '' : `<link href="${baseUrl}/stylesheets/${pageInfo.entryPoint}${suffix}.css${random}" rel="stylesheet" type="text/css" />`

  var yyyScript = isDev ? '' : "<script src=\"".concat(baseUrl, "/javascripts/yonyou-yyy.js").concat(random, "\"></script>");
  (0, _invariant.default)(_typeof(pageInfo) === 'object', "ctx.render\u51FD\u6570\u7684\u53C2\u6570\u683C\u5F0F\u4E3A\uFF1A".concat(JSON.stringify({
    title: 'html>head>title的值',
    keyword: 'html>head>keyword的值',
    description: 'html>head>description的值',
    baseUrl: '静态资源的根路径，如：static 目录',
    content: 'ReactDOMServer.renderToString|renderToStaticMarkup输出的字符串',
    state: 'ctx.store.getState()'
  }), "\uFF0C\u53EF\u4F20\u5165\u7A7A\u5BF9\u8C61\u3002"));
  return "<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\"/>\n    <title>".concat(pageInfo.title, "</title>\n    <meta httpEquiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\"/>\n    <meta name=\"referrer\" content=\"no-referrer\">\n    <link href=\"").concat(baseUrl, "/styles/tinper-bee.css\" rel=\"stylesheet\" type=\"text/css\" />\n    <link href=\"").concat(baseUrl, "/styles/antd.css\" rel=\"stylesheet\" type=\"text/css\" />\n    ").concat(loadCss, "\n  </head>\n  <body>\n    <div id=\"container\">").concat(content, "</div>\n    <div id=\"popup-container\"></div>\n    <script>\n      window.__INITIAL_STATE__ = ").concat(JSON.stringify(state), "\n      window._baseUrl = '").concat(HTTP_PREFIX, "' || ''\n      window.__PRINT_META__ = ").concat(JSON.stringify(printMeta), "\n      window.__SERVICE_BASEURL__ = \"").concat(serviceBaseUrl, "\"\n    </script>\n\n    <script src=\"").concat(_env.default.HTTP_WORKFLOW_SERVER, "/iform_web/s/tpl\"></script>\n    <script src=\"").concat(baseUrl, "/scripts/vendor").concat(suffix, ".js").concat(random, "\"></script>\n    <script src=\"").concat(baseUrl, "/javascripts/").concat(pageInfo.entryPoint).concat(suffix, ".js").concat(random, "\"></script>\n    <script src=\"").concat(baseUrl, "/scripts/font.js").concat(random, "\"></script>\n  </body>\n</html>");
}