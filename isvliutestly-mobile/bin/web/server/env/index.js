"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../../common/config.env"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localPath = 'localhost';

if (process.env.IP === 'true') {
  (function () {
    //获取本机ip
    var os = require('os');

    var ifaces = os.networkInterfaces();
    var ips = [];

    var _loop = function _loop(dev) {
      var alias = 0;
      ifaces[dev].forEach(function (details) {
        if (details.family == 'IPv4') {
          //console.log(dev+(alias?':'+alias:''),details.address);
          ips.push(details.address);
          ++alias;
        }
      });
    };

    for (var dev in ifaces) {
      _loop(dev);
    }

    localPath = ips[1];
  })();
}

var parseUrl = function parseUrl(url) {
  if (!url) return url;
  if (url.substr(url.length - 1, 1) === '/') url = url.substr(0, url.length - 1);
  return url;
};

function combine(baseurl, pathname) {
  var separator = /\/$/.test(baseurl) === false && /^\//.test(pathname) === false ? '/' : '';
  return Array.prototype.slice.call(arguments, 0).join(separator);
}

var HTTP_SERVICE_BASEURL = _config.default.HTTP_SERVICE_BASEURL;
var PRINT_META = process.env.PRINT_META && JSON.parse(process.env.PRINT_META) || {
  domainCode: _config.default.domainCode,
  printDomain: _config.default.HTTP_PRINT_SERVER,
  printDownLoad: 'https://cdn.yonyoucloud.com/iprint/用友云打印助手.exe'
};
var env = {
  HTTP_PREFIX: process.env.PREFIX || '',
  HTTP_SCRIPT_BASEURL: "http://".concat(localPath, ":").concat(process.env.SCRIPT_PORT || 3004, "/static"),
  HTTP_SERVICE_BASEURL: HTTP_SERVICE_BASEURL,
  //后台服务地址，可修改
  HTTP_PRINT_SERVER: _config.default.HTTP_PRINT_SERVER,
  HTTP_WORKFLOW_SERVER: _config.default.HTTP_WORKFLOW_SERVER,
  HTTP_SERVER_PORT: process.env.SERVER_PORT || 3003,
  HTTP_SCRIPT_SUFFIX: '',
  HTTP_CONTENT_TYPE: Object.assign({
    //
    JSON: 'application/json',
    PDF: 'application/pdf',
    XLS: 'application/vnd.ms-excel',
    FORM: 'multipart/form-data'
  }, _config.default.HTTP_CONTENT_TYPE),
  //接口请求的content-type类型，不建议修改
  // 关于用户的ajax接口
  HTTP_USER_FETCH_OPTIONDATA: combine(HTTP_SERVICE_BASEURL, '/option/getOptionData'),
  HTTP_USER_FETCH_PROCESSMETA: combine(HTTP_SERVICE_BASEURL, '/billproc/vm'),
  HTTP_USER_FETCH_TPLLIST: combine(HTTP_SERVICE_BASEURL, '/billmeta/tpllist'),
  HTTP_USER_FETCH_BILLMETA: combine(HTTP_SERVICE_BASEURL, '/billmeta/group'),
  HTTP_USER_POST_BILLMETA: combine(HTTP_SERVICE_BASEURL, '/billmeta/groupset'),
  HTTP_USER_UPLOAD: combine(HTTP_SERVICE_BASEURL, '/pub/fileupload/upload'),
  HTTP_USER_UPLOAD2LOCAL: combine(HTTP_SERVICE_BASEURL, '/pub/fileupload/upload2Local'),
  HTTP_USER_VALIDCODE: combine(HTTP_SERVICE_BASEURL, '/register/validcode'),
  PRINT_META: PRINT_META
};

if (process.env.NODE_ENV === 'production') {
  var version, packageVersion;

  try {
    version = require("../../../../bin/version.json").version;
  } catch (e) {
    version = '';
  }

  try {
    packageVersion = require("../../package.version.json").version;
  } catch (e) {
    packageVersion = '';
  }

  Object.assign(env, {
    HTTP_SCRIPT_BASEURL: process.env.PREFIX || "",
    PORTAL_LOG_LEVEL: 'error',
    HTTP_SCRIPT_SUFFIX: '.min',
    STATIC_RANDOM_SUFFIX: version,
    PACKAGE_VERSION: packageVersion
  });
}

console.log();
console.log(_chalk.default.blue('MDF:局域网可访问地址>>>>>>>>>>> ' + _chalk.default.red.bold('http://' + localPath + ':' + env.HTTP_SERVER_PORT)));
console.log(_chalk.default.blue('MDF:后端服务接口地址>>>>>>>>>>> ' + _chalk.default.red.bold(env.HTTP_SERVICE_BASEURL)));
var _default = env;
exports.default = _default;