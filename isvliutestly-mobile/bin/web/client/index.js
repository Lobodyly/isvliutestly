"use strict";

require('@babel/polyfill');

var cb = require('@mdf/cube/lib/cube');

var envConfig = require("../common/config.env").default;

var extendConfig = require("../common/config.comp").default;

var _require = require('@mdf/cube/lib/extend'),
    setEnvConfig = _require.setEnvConfig,
    setCompConfig = _require.setCompConfig,
    setExtendComp = _require.setExtendComp;

var extendComp = require("../common/registerMetaComp").default;

var basicComponents = require("../common/extends").default;

require('@mdf/theme/theme-ncc/font_ncc/iconfont');

setEnvConfig(envConfig);
setCompConfig(extendConfig); // register extend components

setExtendComp(basicComponents);
setExtendComp(extendComp); // register businessContext

var businessContext = require.context('business');

cb.registerBusinessContext(businessContext);
cb.rest.nodeEnv = process.env.NODE_ENV;

require("./client");