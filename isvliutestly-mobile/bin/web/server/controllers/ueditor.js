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

var fs = require('fs');

var path = require('path');

var request = require('request');

var defaultConfig = null;
fs.readFile(path.join(process.cwd(), 'static/ueditor/nodejs/config.json'), 'utf8', function (err, result) {
  try {
    defaultConfig = eval("(" + result + ")");
  } catch (e) {
    defaultConfig = {};
  }
}); // const doFetch = function (url) {
//   const options = genFetchOptions('get');
//   return fetch(url, options)
//     .then(toJSON, catchException)
//     .then(json => {
//       return json
//     })
// }

var newUpload = function newUpload(ctx) {
  return new Promise(function (resolve, reject) {
    var serviceUrl = _env.default.HTTP_USER_UPLOAD + '?token=' + ctx.token;
    var req = ctx.req;
    req.pipe(request(serviceUrl, function (err, response, body) {
      var json = JSON.parse(body);

      if (!err) {
        resolve({
          url: json.data,
          'state': 'SUCCESS'
        });
      } else {
        reject(err);
      }
    }));
  });
};

var batch = function batch(ctx, static_url, dir_url) {
  return new Promise(function (resolve, reject) {
    var str = '';
    var i = 0;
    var list = [];
    fs.readdir(static_url + dir_url, function (err, files) {
      if (err) throw err;
      var total = files.length;
      files.forEach(function (file) {
        var filetype = 'jpg,png,gif,ico,bmp';
        var tmplist = file.split('.');
        var _filetype = tmplist[tmplist.length - 1];

        if (filetype.indexOf(_filetype.toLowerCase()) >= 0) {
          var temp = {};

          if (list_dir === '/') {
            temp.url = list_dir + file;
          } else {
            temp.url = list_dir + "/" + file;
          }

          list[i] = temp;
        } else {}

        i++; // send file name string when all files was processed

        if (i === total) {
          resolve({
            "state": "SUCCESS",
            "list": list,
            "start": 1,
            "total": total
          });
        }
      });
    });
  });
};

var ueditorController = {
  basictest: function basictest(ctx) {
    ctx.render({
      title: '富文本编辑器'
    });
  },
  ue: function () {
    var _ue = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
      var req, token, actionType, static_url, dir_url, serviceUrl, json, config;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              req = ctx.req, token = ctx.token;
              actionType = ctx.request.query.action;

              if (!(actionType === 'uploadimage' || actionType === 'uploadfile' || actionType === 'uploadvideo')) {
                _context.next = 9;
                break;
              }

              _context.next = 5;
              return newUpload(ctx);

            case 5:
              ctx.body = _context.sent;
              return _context.abrupt("return");

            case 9:
              if (!(actionType === 'listimage')) {
                _context.next = 17;
                break;
              }

              static_url = path.join(process.cwd(), 'public');
              dir_url = '/images/ueditor/';
              _context.next = 14;
              return batch(ctx, static_url, dir_url);

            case 14:
              ctx.body = _context.sent;
              _context.next = 24;
              break;

            case 17:
              // ctx.redirect('/ueditor/nodejs/config.json');
              serviceUrl = (0, _util.combine)(_env.default.HTTP_SERVICE_BASEURL, "pub/fileupload/getFileServerUrl?token=".concat(token));
              _context.next = 20;
              return doFetch(serviceUrl);

            case 20:
              json = _context.sent;
              config = Object.assign({}, defaultConfig);
              if (json.code === 200 && json.data) config.imageUrlPrefix = json.data;
              ctx.body = config;

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function ue(_x) {
      return _ue.apply(this, arguments);
    }

    return ue;
  }()
};
module.exports = ueditorController;

function _default(router) {}