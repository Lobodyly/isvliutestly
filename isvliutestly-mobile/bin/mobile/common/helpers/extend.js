"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warpPromiseExecute = exports.execute1 = exports.promiseExecute1 = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var promiseExecute1 = function promiseExecute1(check, eventName) {
  var _arguments = arguments,
      _this = this;

  return new Promise(function (resolve, reject) {
    var name = check;
    var sliceStart = 1;

    if (typeof check === 'boolean') {
      name = eventName;
      sliceStart = 2;
    }

    if (!name) return;
    var args = Array.prototype.slice.call(_arguments, sliceStart);
    if (!args.length) return;
    args.unshift(name);

    var returnData = _this.execute1.apply(_this, args);

    if (returnData instanceof cb.promise) {
      returnData.then(function () {
        resolve.apply(void 0, arguments);
      }, function () {
        resolve('ABORT_PROCESS');
      });
    } else {
      if (returnData === 'ABORT_PROCESS') resolve('ABORT_PROCESS');
      resolve(returnData);
    }
  });
};

exports.promiseExecute1 = promiseExecute1;

var execute1 = function execute1(name) {
  if (!name) return;

  var events = this._get_data('events')[name];

  if (!events) return true;
  var result = true;
  var args = Array.prototype.slice.call(arguments, 1);
  events.forEach(function (event) {
    if (result === false) return;
    var returnData;

    if (cb.rest.nodeEnv === 'development') {
      returnData = event.callback.apply(event.context || this, args);
    } else {
      try {
        returnData = event.callback.apply(event.context || this, args);
      } catch (e) {
        console.error('execute[' + name + '] exception: ' + e.stack);
      }
    }

    result = returnData instanceof cb.promise ? returnData : returnData === false ? 'ABORT_PROCESS' : returnData;
  }, this);
  return result;
};

exports.execute1 = execute1;

var warpPromiseExecute = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(eventName, param) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return this.promiseExecute1(eventName, param);

          case 3:
            result = _context.sent;
            _context.next = 9;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            console.error('promiseExecute1内部出错：' + _context.t0);

          case 9:
            if (!(result === 'ABORT_PROCESS')) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", false);

          case 11:
            return _context.abrupt("return", {
              result: result
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 6]]);
  }));

  return function warpPromiseExecute(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.warpPromiseExecute = warpPromiseExecute;