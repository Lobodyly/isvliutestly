"use strict";

require('@babel/polyfill');

var envConfig = require("./env").default;

var extendConfig = require("../common/config.comp").default;

var _require = require('@mdf/cube/lib/extend'),
    setEnvConfig = _require.setEnvConfig,
    setCompConfig = _require.setCompConfig; // const extendComp = require('../common/registerMetaComp').default;
// const basicComponents = require('../common/extends').default


setEnvConfig(envConfig);
setCompConfig(extendConfig);

require("./server");