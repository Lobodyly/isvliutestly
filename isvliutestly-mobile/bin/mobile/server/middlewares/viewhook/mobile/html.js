"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = html;

var _env = _interopRequireDefault(require("../../../env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDev = process.env.NODE_ENV === "development";
var baseUrl = _env.default.HTTP_SCRIPT_BASEURL;
var suffix = _env.default.HTTP_SCRIPT_SUFFIX;
var random = isDev ? "" : "?_=".concat(_env.default.STATIC_RANDOM_SUFFIX); // 开发环境使用样式热更新, 不再用打包后的独立css文件

var loadCss = process.env.NODE_ENV === "development" ? "" : "<link href=\"".concat(baseUrl, "/styles/default/mobile.index.min.css\" rel=\"stylesheet\" type=\"text/css\" />");

function html() {
  return "<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n    <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui\">\n    <title>MDF-Mobile</title>\n    <script src=\"".concat(baseUrl, "/react/umd/react.production.min.js\"></script>\n    <script src=\"").concat(baseUrl, "/react-dom/umd/react-dom.production.min.js\"></script>\n    <script src=\"").concat(baseUrl, "/componentLib/index.js\"></script>\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"").concat(baseUrl, "/componentLib/index.css\" />\n    ").concat(loadCss, "\n    <script src=\"").concat(baseUrl, "/vconsole/vconsole.min.js\"></script>\n    <link\n    rel=\"stylesheet\"\n    type=\"text/css\"\n    href=\"").concat(baseUrl, "/styles/fonts/iconfont.css\"\n  />\n  </head>\n  <body>\n    <div id=\"container\"></div>\n    <div id=\"popup-container\"></div>\n    <script src=\"https://at.alicdn.com/t/font_304307_jezcocolkm.js\"></script>\n    <script>\n      (function(doc, win) {\n       window.__fontUnit = 0\n       var docEl = doc.documentElement,\n           recalc = function() {\n               var clientWidth = docEl.clientWidth;\n               if (!clientWidth) return;\n               if (clientWidth >= 750) { //750\u8FD9\u4E2A\u503C\uFF0C\u6839\u636E\u8BBE\u8BA1\u5E08\u7684psd\u5BBD\u5EA6\u6765\u4FEE\u6539\uFF0C\u662F\u591A\u5C11\u5C31\u5199\u591A\u5C11\uFF0C\u73B0\u5728\u624B\u673A\u7AEF\u4E00\u822C\u662F750px\u7684\u8BBE\u8BA1\u7A3F\uFF0C\u5982\u679C\u8BBE\u8BA1\u5E08\u7ED9\u76841920\u7684psd\uFF0C\u81EA\u5DF1\u7528Photoshop\u7B49\u6BD4\u4F8B\u7F29\u5C0F\n                   window.__fontUnit = 100;\n                   docEl.style.fontSize = window.__fontUnit + 'px';\n\n               } else {\n                   window.__fontUnit = 100 * (clientWidth / 750);\n                   docEl.style.fontSize = window.__fontUnit + 'px'; //750\u8FD9\u4E2A\u503C\uFF0C\u6839\u636E\u8BBE\u8BA1\u5E08\u7684psd\u5BBD\u5EA6\u6765\u4FEE\u6539\uFF0C\u662F\u591A\u5C11\u5C31\u5199\u591A\u5C11\uFF0C\u73B0\u5728\u624B\u673A\u7AEF\u4E00\u822C\u662F750px\u7684\u8BBE\u8BA1\u7A3F\uFF0C\u5982\u679C\u8BBE\u8BA1\u5E08\u7ED9\u76841920\u7684psd\uFF0C\u81EA\u5DF1\u7528Photoshop\u7B49\u6BD4\u4F8B\u7F29\u5C0F\n               }\n           };\n\n       if (!doc.addEventListener) return;\n    //   win.addEventListener(resizeEvt, recalc, false);\n       doc.addEventListener('DOMContentLoaded', recalc, false);\n\n   })(document, window);\n    </script>\n    <script>\n      // init vConsole\n      if (window.location.search.includes('debug=true')) {\n        var vConsole = new VConsole();\n      }\n    </script>\n    <script src=\"").concat(baseUrl, "/scripts/vendor").concat(suffix, ".js").concat(random, "\"></script>\n    <script src=\"").concat(baseUrl, "/javascripts/mobile.index").concat(suffix, ".js").concat(random, "\"></script>\n  </body>\n</html>");
}