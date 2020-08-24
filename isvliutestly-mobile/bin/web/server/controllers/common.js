"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.doFetch = exports.getLoginUser = void 0;

var _env = _interopRequireDefault(require("../env"));

var _util = require("@mdf/cube/lib/helpers/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getLoginUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    var url, config, json, loginUser, option;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = (0, _util.combine)(_env.default.HTTP_SERVICE_BASEURL, "user/getOrgsAndStores?token=".concat(ctx.token));
            config = {
              url: url,
              method: 'GET'
            };
            _context.next = 4;
            return (0, _util.uniformProxy)(config);

          case 4:
            json = _context.sent;

            if (json.code !== 200) {
              ctx.logger.error("\u83B7\u53D6\u767B\u5F55\u7528\u6237\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011".concat(url, " \u3010\u5F02\u5E38\u3011").concat(json.message)); // ctx.redirect('/login');
              // return;
            }

            loginUser = json.data || {};
            url = (0, _util.combine)(_env.default.HTTP_SERVICE_BASEURL, "tenant/find?token=".concat(ctx.token));
            config = {
              url: url,
              method: 'GET'
            };
            _context.next = 11;
            return (0, _util.uniformProxy)(config);

          case 11:
            json = _context.sent;

            if (!(json.code !== 200)) {
              _context.next = 15;
              break;
            }

            ctx.logger.error("\u83B7\u53D6\u79DF\u6237\u4FE1\u606F\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011".concat(url, " \u3010\u5F02\u5E38\u3011").concat(json.message));
            return _context.abrupt("return");

          case 15:
            loginUser.logo = json.data.logo;
            loginUser.tenant = json.data;
            url = (0, _util.combine)(_env.default.HTTP_SERVICE_BASEURL, "option/getOptionData?token=".concat(ctx.token));
            config = {
              url: url,
              method: 'POST',
              params: {
                optionId: 'sys_option'
              }
            };
            _context.next = 21;
            return (0, _util.uniformProxy)(config);

          case 21:
            json = _context.sent;
            option = {};

            if (json.code !== 200) {
              ctx.logger.error("\u83B7\u53D6\u7CFB\u7EDF\u53C2\u6570\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011".concat(url, " \u3010\u5F02\u5E38\u3011").concat(json.message));
            } else {
              Object.assign(option, json.data);
            }

            url = (0, _util.combine)(_env.default.HTTP_SERVICE_BASEURL, "option/getOptionData?token=".concat(ctx.token));
            config = {
              url: url,
              method: 'POST',
              params: {
                optionId: 'business_option'
              }
            };
            _context.next = 28;
            return (0, _util.uniformProxy)(config);

          case 28:
            json = _context.sent;

            if (json.code !== 200) {
              ctx.logger.error("\u83B7\u53D6\u4E1A\u52A1\u53C2\u6570\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011".concat(url, " \u3010\u5F02\u5E38\u3011").concat(json.message));
            } else {
              Object.assign(option, json.data);
            }

            loginUser.option = option;
            return _context.abrupt("return", loginUser);

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getLoginUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getLoginUser = getLoginUser;

var doFetch = function doFetch(url) {
  var options = (0, _util.genFetchOptions)('get');
  return fetch(url, options).then(_util.toJSON, _util.catchException).then(function (json) {
    return {
      code: 200,
      data: json
    };
  });
};

exports.doFetch = doFetch;