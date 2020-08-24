"use strict";

require('@babel/polyfill');

require('ignore-styles'); // node端虚拟window之类的数据 -- begin


var _require = require('jsdom'),
    JSDOM = _require.JSDOM;

var _JSDOM = new JSDOM('', {
  url: 'http://localhost/'
}),
    window = _JSDOM.window;

global.window = window;

for (var _i = 0, _arr = ['document', 'navigator', 'location', 'localStorage', 'sessionStorage']; _i < _arr.length; _i++) {
  var item = _arr[_i];
  global[item] = window[item];
}

Object.defineProperty(window, 'cb', {
  set: function set(val) {
    global.cb = val;
  },
  get: function get() {
    return global.cb;
  }
});

require('matchmedia-polyfill');

require('matchmedia-polyfill/matchMedia.addListener'); // node端虚拟window之类的数据 -- end


var envConfig = require("./env").default;

var extendConfig = require("../common/config.comp").default;

var _require2 = require('@mdf/cube/lib/extend'),
    setEnvConfig = _require2.setEnvConfig,
    setCompConfig = _require2.setCompConfig,
    setExtendComp = _require2.setExtendComp;

setEnvConfig(envConfig);
setCompConfig(extendConfig); // setExtendComp(extendComp)

require("./app.mobile");