"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.judge = judge;

var _util = require("@mdf/cube/lib/helpers/util");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function judge(user, ctx, baseUrl) {
  return process.env.__CLIENT__ ? clientJudge(user) : serverJudge(user, ctx, baseUrl);
}

var clientJudge = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
    var storeId, userStores, config, json;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            storeId = user.storeId, userStores = user.userStores;

            if (!(!storeId || !userStores.length)) {
              _context.next = 4;
              break;
            }

            cb.utils.alert('未登录到门店，不能开单', 'error');
            return _context.abrupt("return", false);

          case 4:
            // return true;
            config = {
              url: 'billTemplateSet/getEnterRetailAuth',
              method: 'GET'
            };
            _context.next = 7;
            return (0, _util.proxy)(config);

          case 7:
            json = _context.sent;

            if (!(json.code !== 200)) {
              _context.next = 11;
              break;
            }

            cb.utils.alert(json.message, 'error');
            return _context.abrupt("return", false);

          case 11:
            return _context.abrupt("return", true);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function clientJudge(_x) {
    return _ref.apply(this, arguments);
  };
}();

var serverJudge = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user, ctx, baseUrl) {
    var storeId, userStores, url, config, json;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            storeId = user.storeId, userStores = user.userStores;

            if (!(!storeId || !userStores.length)) {
              _context2.next = 5;
              break;
            }

            ctx.logger.error('零售开单校验失败：未登录到门店，不能开单');
            ctx.body = '未登录到门店，不能开单';
            return _context2.abrupt("return", false);

          case 5:
            url = (0, _util.combine)(baseUrl, "billTemplateSet/getEnterRetailAuth?token=".concat(ctx.token));
            config = {
              url: url,
              method: 'GET'
            };
            _context2.next = 9;
            return (0, _util.uniformProxy)(config);

          case 9:
            json = _context2.sent;

            if (!(json.code !== 200)) {
              _context2.next = 14;
              break;
            }

            ctx.logger.error("\u96F6\u552E\u5F00\u5355\u6821\u9A8C\u5931\u8D25\uFF1A\u3010\u63A5\u53E3\u3011".concat(url, " \u3010\u5F02\u5E38\u3011").concat(json.message));
            ctx.body = json;
            return _context2.abrupt("return", false);

          case 14:
            return _context2.abrupt("return", true);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function serverJudge(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();