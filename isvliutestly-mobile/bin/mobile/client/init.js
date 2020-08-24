"use strict";

var _antdMobile = require("antd-mobile");

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _util = require("@mdf/cube/lib/helpers/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// 兼容处理 safari无痕浏览模式禁用localStorage
try {
  localStorage.setItem('_storage_test', 'test');
  localStorage.removeItem('_storage_test');
} catch (exc) {
  var tmp_storage = {};
  var p = '__unique__'; // Prefix all keys to avoid matching built-ins

  Storage.prototype.setItem = function (k, v) {
    tmp_storage[p + k] = v;
  };

  Storage.prototype.getItem = function (k) {
    return tmp_storage[p + k] === undefined ? null : tmp_storage[p + k];
  };

  Storage.prototype.removeItem = function (k) {
    delete tmp_storage[p + k];
  };

  Storage.prototype.clear = function () {
    tmp_storage = {};
  };
}

cb.utils.scan = function (path, success, error) {
  if (!window.plus) return;
  var filters = [plus.barcode.QR, plus.barcode.EAN13, plus.barcode.EAN8, plus.barcode.ITF];
  plus.barcode.scan(path, success, error, filters);
};

cb.utils.confirm = function (msg, okFunc, cacelFunc) {
  _antdMobile.Modal.alert( /*#__PURE__*/_react.default.createElement("div", {
    className: "icon_wenhao"
  }), msg, [{
    text: '取消',
    onPress: function onPress() {
      if (cacelFunc) cacelFunc();
    }
  }, {
    text: '确定',
    onPress: function onPress() {
      return okFunc();
    }
  }]);
}; // 初始化公共方法


cb.utils.Toast = cb.utils.alert = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  // 兼容旧的写法，参数推荐使用语义对象(option)
  var option = {
    title: '',
    // type: info | success | error | warning | fail
    type: 'info',
    content: null,
    duration: 2,
    onClose: function onClose() {
      if (args[3]) {
        args[3]();
      }
    },
    mask: true
  };

  if (_lodash.default.isPlainObject(args[0]) && ! /*#__PURE__*/_react.default.isValidElement(args[0])) {
    option = _lodash.default.extend(option, args[0]);
  } else {
    option = _lodash.default.extendWith(option, {
      title: args[0],
      type: args[1],
      content: args[2]
    }, function (objValue, srcValue) {
      return _lodash.default.isUndefined(srcValue) ? objValue : srcValue;
    });
  }

  var _option = option,
      title = _option.title,
      type = _option.type,
      duration = _option.duration,
      onClose = _option.onClose,
      mask = _option.mask; // error -> fail

  if (type === 'error' || type === 'fail') {
    type = 'fail';
    title = /*#__PURE__*/_react.default.createElement("div", {
      className: "retail-toast"
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "icon icon-cuowutishi"
    }), /*#__PURE__*/_react.default.createElement("p", null, title));
  }

  if (type === 'success') {
    type = 'success';
    title = /*#__PURE__*/_react.default.createElement("div", {
      className: "retail-toast"
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "icon icon-chenggongtishi"
    }), /*#__PURE__*/_react.default.createElement("p", null, title));
  } // warning -> info


  if (type === 'warning' || type === 'info') {
    type = 'info';
    title = /*#__PURE__*/_react.default.createElement("div", {
      className: "retail-toast"
    }, /*#__PURE__*/_react.default.createElement("i", {
      className: "icon icon-tishi"
    }), /*#__PURE__*/_react.default.createElement("p", null, title));
  }

  return _antdMobile.Toast[type](title, duration, onClose, mask);
};

cb.utils.checkUpdate = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(device, version, callback, environment, alias) {
    var config, json;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            config = {
              url: 'package/checkUpdate',
              method: 'GET',
              options: {
                uniform: false,
                token: false
              },
              params: {
                terminal: 'mobile',
                device: device,
                version: version,
                environment: environment,
                alias: alias
              }
            };
            _context.next = 3;
            return (0, _util.proxy)(config);

          case 3:
            json = _context.sent;

            if (!(json.code !== 200)) {
              _context.next = 7;
              break;
            }

            cb.utils.alert(json.message, 'error');
            return _context.abrupt("return");

          case 7:
            callback && callback(json.data);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}(); // 设置状态栏背景颜色


cb.utils.setStatusBarBackground = function (color) {
  if (!window.plus || !window.plus.navigator) {
    return;
  }

  window.plus.navigator.setStatusBarBackground(color);
}; // 获取出厂商


cb.utils.getVerdor = function () {
  if (!window.plus || !window.plus.device) {
    return;
  }

  return window.plus.device.vendor;
}; // light 白色 dark 黑色


cb.utils.setStatusBarStyle = function (color) {
  if (!window.plus || !window.plus.navigator) {
    return;
  }

  window.plus.navigator.setStatusBarStyle(color);
}; // 设置是否全屏


cb.utils.setFullscreen = function (bl) {
  if (!window.plus || !window.plus.navigator) {
    return;
  }

  window.plus.navigator.setFullscreen(bl);
}; // 判断网络


cb.utils.network = function () {
  if (plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE) {
    return false;
  } else {
    return true;
  }
}; // 获取Wifi中的MAC地址


cb.utils.getWifiMac = function () {
  var mac = null;

  if (plus && plus.os && plus.os.name == 'Android') {// WifiManager
    // var Context = plus.android.importClass("android.content.Context");
    // var WifiManager = plus.android.importClass("android.net.wifi.WifiManager");
    // var wifiManager = plus.android.runtimeMainActivity().getSystemService(Context.WIFI_SERVICE);
    // var WifiInfo = plus.android.importClass("android.net.wifi.WifiInfo");
    // var wifiInfo = wifiManager.getConnectionInfo();
    // mac = wifiInfo.getMacAddress().replace(/\:+/g, '-');
  }

  return mac;
}; // 设备的国际移动设备身份码


cb.utils.getImei = function () {
  return plus.device.imei;
}; // 设备的国际移动用户识别码


cb.utils.getImsi = function () {
  return plus.device.imsi;
}; // 设备唯一标示


cb.utils.getUUid = function () {
  return plus.device.uuid;
}; // 退出应用


cb.utils.quit = function () {
  if (window.plus && window.plus.runtime) plus.runtime.quit();
}; // 设置提示音


cb.utils.cusAudio = function () {
  if (!window.plus || !window.plus.audio || window.isstop === false) {
    return;
  }

  if (window.isstop === undefined) {
    window.isstop = true;
  }

  if (window.isstop === true) {
    var plusCusAudio = plus.audio.createPlayer('http://uretailmobile.yonyouup.com/assets/5a5ef020133fb.mp3');
    plusCusAudio.play(function () {
      console.log('audio success');
      window.isstop = true;
    }, function (e) {
      plusCusAudio.stop();
      window.isstop = false;
      var audioTime = setTimeout(function () {
        clearTimeout(audioTime);
        window.isstop = true;
      }, 2000);
      console.log('audio fail');
    });
  }
};
/* add by jinzh1  判断IOS 还是android */


cb.utils.isIos = function () {
  var ua = navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) {
    return true;
  } else if (/android/.test(ua)) {
    return false;
  }
};
/** *打电话 */


cb.utils.callPhone = function (phone) {
  if (!window.plus || !window.plus.device || !window.plus.nativeUI) {
    return;
  }

  window.plus.nativeUI.confirm('确定拨打' + phone + '?', function (e) {
    if (e.index === 0) {
      plus.device.dial(phone, false);
    }
  });
}; // 获取App版本号


cb.utils.getVersionCode = function () {
  var code = '1.0.0';

  if (window.plus && window.plus.runtime) {
    code = window.plus.runtime.version;
  }

  return code;
}; // 判断是否支持工业扫码


cb.utils.IsIMScanBar = function () {
  if (window.plus && window.plus.JavaToJs && window.plus.JavaToJs.HardwareInterfaceSync) {
    return window.plus.JavaToJs.HardwareInterfaceSync(null, 'scanbarinit', 'cb.events.execute.onScanbar');
  }

  return false;
}; // 获取设备信息


cb.utils.getDevicesInfo = function () {
  var mac = null;
  var uuid = null;
  var imsi = null;
  var imei = null;
  var model = null;
  var vendor = null;

  if (window.plus) {
    if (plus.device) {
      uuid = plus.device.uuid;
      imsi = plus.device.imsi;
      imei = plus.device.imei;
      model = plus.device.model;
      vendor = plus.device.vendor;
    } // WifiManager


    if (plus.JavaToJs && plus.JavaToJs.HardwareInterfaceSync && plus.os && plus.os.name == 'Android') {
      mac = plus.JavaToJs.HardwareInterfaceSync(null, 'macaddress');
    }
  } else {
    return null;
  }

  return {
    macaddress: mac,
    uuid: uuid,
    imsi: imsi,
    imei: imei,
    model: model,
    vendor: vendor
  };
};

cb.utils.nativeStorage = function (type, name, val) {
  if (window.plus && window.plus.JavaToJs && window.plus.JavaToJs.HardwareInterfaceSync) {
    return window.plus.JavaToJs.HardwareInterfaceSync(null, type, name, val);
  }

  return null;
};

cb.utils.IsURL = function (str_url) {
  var strRegex = '(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]';
  var re = new RegExp(strRegex);
  if (re.test(str_url)) return true;else return false;
};

cb.utils.localPrint = function (data) {
  if (window.plus) {
    var currentVersionNo = cb.utils.getVersionCode().replace(/\.+/g, '');

    if (parseInt(currentVersionNo) >= 205) {
      // eslint-disable-next-line no-undef
      printData(data, function (base64Image, isEndPrint) {
        plus.JavaToJs.HardwareInterface('print', base64Image, isEndPrint);
      });
    } else if (parseInt(currentVersionNo) >= 10 && parseInt(currentVersionNo) < 205) {
      // eslint-disable-next-line no-undef
      var _printData = getPrintData(data);

      if (_printData.code === 200) plus.JavaToJs.HardwareInterface('print', _printData.data);
    } else {
      plus.JavaToJs.HardwareInterface('print', JSON.stringify(data));
    }
    /** if (cb.utils.compareVersion(cb.utils.getVersionCode(), '1.0')) {
      const printData = getPrintData(data);
      if (printData.code === 200)
        plus.JavaToJs.HardwareInterface('print', printData.data);
    } else {
      plus.JavaToJs.HardwareInterface('print', JSON.stringify(data));
    }***/

  }
};

window.webViewEventHand = {
  addEvent: function addEvent(name, func) {
    if (!this.handle) this.handle = [];
    this.handle[name] = func;
    this.funcname = name;
  },
  emitEvent: function emitEvent() {
    return this.handle[this.funcname];
  },
  cancelEvent: function cancelEvent(name) {
    this.funcname = name;
  }
}; // 处理手机的返回键

document.addEventListener('plusready', function () {
  if (!window.plus || !plus.key || !plus.storage) {
    return;
  }

  if (window.plus.device && window.plus.device.vendor.toLowerCase() === 'supoin') {
    var bodycls = document.body.className;
    document.body.className = bodycls + ' supoin';
  }

  console.error = function (oriLogFunc) {
    return function (str) {
      if (plus && plus.storage) {
        var _timeLog = arguments[0] + '  ' + JSON.stringify(arguments[2]) || '';

        if (_timeLog) {// plus.storage.setItem(key,'\r\n---------------'+new Date().toLocaleString()+'------------------\r\n');
          // plus.storage.setItem(key,(_storageLog || "")+"\r\n"+_timeLog);
        }
      }

      oriLogFunc.call(console, '监听中日志...');
      oriLogFunc.call(console, arguments);
    };
  }(console.error);

  var first = null;
  var webview = plus.webview.currentWebview(); // 监听返回键

  plus.key.addEventListener('backbutton', function () {
    webview.canBack(function (e) {
      var store = require("./index").store;

      var pathname = store ? store.getState().router.location && store.getState().router.location.pathname : '';

      if (e.canBack && pathname !== '/login' && pathname !== '/') {
        // 设置状态栏字体白色
        cb.utils.setStatusBarStyle('light');

        if (window.webViewEventHand.funcname) {
          window.webViewEventHand.emitEvent()(function () {
            webview.back();
          });
        } else {
          webview.back();
        }
      } else {
        // 首次按键，提示‘再按一次退出应用’
        if (!first) {
          first = new Date().getTime();

          _antdMobile.Toast.show('再按一次退出应用', 1);

          var firstyu = setTimeout(function () {
            clearTimeout(firstyu);
            first = null;
          }, 2000);
        } else {
          if (new Date().getTime() - first < 2000) {
            cb.utils.quit();
          }
        }
      }
    });
  }); // 监听网络链接
  // document.addEventListener('netchange', function () {
  //   if (plus.networkinfo.getCurrentType() === plus.networkinfo.CONNECTION_NONE) {
  //     // console.log("无网络");
  //   } else {
  //     // console.log("有网络");
  //   }
  // }, false);

  window.onresize = function () {
    document.activeElement.scrollIntoView(false);
  }; // 监听错误


  document.addEventListener('error', function (e) {
    console.log(e);
  }, false);

  if (!window.plus) {
    window.plus = {};
  }

  var _BARCODE = 'JavaToJs';
  var B = window.plus.bridge;
  var JavaToJs = {
    HardwareInterface: function HardwareInterface(Argus1, Argus2, Argus3, Argus4, successCallback, errorCallback) {
      var success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      };
      var fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
      var callbackID = B.callbackId(success, fail);
      return B.exec(_BARCODE, 'HardwareInterface', [callbackID, Argus1, Argus2, Argus3, Argus4]);
    },
    HardwareInterfaceArrayArgu: function HardwareInterfaceArrayArgu(Argus, successCallback, errorCallback) {
      var success = typeof successCallback !== 'function' ? null : function (args) {
        successCallback(args);
      };
      var fail = typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
      };
      var callbackID = B.callbackId(success, fail);
      return B.exec(_BARCODE, 'HardwareInterface', [callbackID, Argus]);
    },
    HardwareInterfaceSync: function HardwareInterfaceSync(Argus1, Argus2, Argus3, Argus4) {
      return B.execSync(_BARCODE, 'HardwareInterface', [Argus1, Argus2, Argus3, Argus4]);
    },
    HardwareInterfaceSyncArrayArgu: function HardwareInterfaceSyncArrayArgu(Argus) {
      return B.execSync(_BARCODE, 'HardwareInterface', [Argus]);
    }
  };
  if (!cb.utils.isIos()) window.plus.JavaToJs = JavaToJs; // 在非POS机设备禁用
}); // 兼容处理fetch问题

cb.rest.mode = 'xhr';
/* 微信环境 */

var ua = navigator.userAgent.toLowerCase();
cb.rest.weChatReady = false;

if (ua.match(/MicroMessenger/i) == 'micromessenger') {
  cb.rest.isWeChat = true;
} else {
  cb.rest.isWeChat = false;
}

if (cb.rest.isWeChat) {
  cb.utils.initWeChat = function () {
    var config = {
      url: 'bill/client/pay/getWeChatConfig',
      method: 'POST',
      params: {
        url: cb.rest.AppContext.serviceUrl + '/'
      }
    };
    (0, _util.proxy)(config).then(function (json) {
      if (json.code !== 200) {
        cb.utils.alert(json.message, 'error');
        return;
      }

      var obj = json.data;
      cb.rest.WeChatConfig = obj;
      wx.config({
        debug: false,
        // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: obj.appId,
        // 必填，公众号的唯一标识
        timestamp: obj.timestamp,
        // 必填，生成签名的时间戳
        nonceStr: obj.nonceStr,
        // 必填，生成签名的随机串
        signature: obj.signature,
        // 必填，签名
        jsApiList: ['scanQRCode', 'chooseImage', 'getLocation', 'getLocalImgData'] // 必填，需要使用的JS接口列表

      });
      wx.ready(function () {
        console.log('wx初始化----ready');
        cb.rest.weChatReady = true;
      });
      wx.error(function (res) {
        console.log('wx初始化----error' + JSON.stringify(res));
        cb.rest.weChatReady = false;
      });
    });
  };
}

var freshToken = function freshToken() {
  var config = {
    url: '/pub/fileupload/getFileServerUrl',
    method: 'GET',
    options: {
      token: true,
      timeout: 3000
    }
  };
  (0, _util.proxy)(config).then(function (json) {
    console.error('刷新token 成功！');
  });
};

if (window.__freshTokenTimer) clearInterval(window.__freshTokenTimer);else window.__freshTokenTimer = setInterval(freshToken, 3600000);