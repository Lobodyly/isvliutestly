"use strict";

require("@babel/polyfill");

// import { addComponnets } from '../ys/convert-design/regist-ys-componnets';
var hoistNonReactStatic = require("hoist-non-react-statics");

var lodash = require("lodash");

var Sentry = require("@sentry/browser");

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN
  });
}

var cb = require("@mdf/cube/lib/cube");

var envConfig = require("../common/config.env").default;

var extendConfig = require("../common/config.comp").default;

var _require = require("@mdf/cube/lib/extend"),
    setEnvConfig = _require.setEnvConfig,
    setCompConfig = _require.setCompConfig,
    setExtendComp = _require.setExtendComp;

var _require2 = require("@mdf/renderer"),
    createConnect = _require2.createConnect; // 拦截器，调试用


function interceptor(transformer) {
  return function (props) {
    var nextProps = transformer(props); // if (nextProps.cControlType === "refer") {
    // console.log("log:", nextProps);
    // }

    return nextProps;
  };
}

var connect = createConnect({
  interceptors: [interceptor]
});
setEnvConfig(envConfig);
setCompConfig(extendConfig);
var library = window.__MetauiMobile__ || window.__TinperLibraui__;
/**
 * 组件二级状态通过修改 manifest 默认值来处理
 */

var setPropDefault = function setPropDefault(Component, propName, defaultValue) {
  Component.manifest = lodash.cloneDeep(Component.manifest);
  Component.manifest.props.some(function (prop) {
    if (prop.name === propName) {
      prop.defaultValue = defaultValue;
      return true;
    }

    return false;
  });
};

window.SERVER_ENV = process.env.SERVER_ENV; // TODO: 临时处理

library["Card"] = library["CardBox"]; // TODO: 原有的 Card 废弃，使用 CardBox 替代

library["toolbar"] = library["ToolBar"]; // TODO: 存在 _extend.extendComp.toolbar

library["inputmultilang"] = library["Language"];
library["map"] = library["Map"];
library["hyperlinks"] = library["Input"];
library["mobile"] = library["Mobile"];
library["inputidentity"] = library["Input"];
library["filelist"] = library["UploadFile"];
library["pictureupload"] = library["UploadPicture"];
library["number"] = library["Input"];
library["rate"] = library["Rate"];
library["numberwidget"] = library["InputNumber"];
var Radio = library["Radio"];
library["optionwidget"] = Radio;

var Select = function Select(props) {
  return /*#__PURE__*/React.createElement(Radio, props);
};

hoistNonReactStatic(Select, Radio);
setPropDefault(Select, "mode", "list");
library["Select"] = Select;
var DateTimePicker = library["DateTimePicker"];

var DatePicker = function DatePicker(props) {
  return /*#__PURE__*/React.createElement(DateTimePicker, props);
};

hoistNonReactStatic(DatePicker, DateTimePicker);
setPropDefault(DatePicker, "dateMode", "picker-date");
library["DatePicker"] = DatePicker;

var TimePicker = function TimePicker(props) {
  return /*#__PURE__*/React.createElement(DateTimePicker, props);
};

hoistNonReactStatic(TimePicker, DateTimePicker);
setPropDefault(TimePicker, "dateMode", "picker-time");
library["TimePicker"] = TimePicker; // const Search = library["Search"];
// library["convenientquery"] = Search;
// addComponnets(library);

var comps = {};
Object.keys(library).forEach(function (name) {
  var Comp = library[name];

  if (typeof Comp !== "string" && !Comp.manifest) {
    // 加个 name 好调试
    library[name].manifest = {
      name: name
    };
  }

  comps[name] = connect({
    manifest: Comp.manifest
  })(Comp);
});
setExtendComp(comps); // register businessContext

var businessContext = require.context("business");

cb.registerBusinessContext(businessContext);
cb.rest.nodeEnv = process.env.NODE_ENV;

require("./client");