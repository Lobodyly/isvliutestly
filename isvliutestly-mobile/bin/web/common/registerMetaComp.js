"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _metauiWebNcc = _interopRequireDefault(require("@mdf/metaui-web-ncc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ncc扩展
var _webNcc$basic = _metauiWebNcc.default.basic,
    basic = _webNcc$basic === void 0 ? {} : _webNcc$basic,
    _webNcc$filter = _metauiWebNcc.default.filter,
    filter = _webNcc$filter === void 0 ? {} : _webNcc$filter,
    _webNcc$refer = _metauiWebNcc.default.refer,
    refer = _webNcc$refer === void 0 ? {} : _webNcc$refer; // 扩展 cControlType

var extendComp = {
  // 'basic': Object.assign({},{Input,Select,Refer,DatePicker,Filter,PageIcon,ReferToolbar,ReferModal,SearchTree}),
  'basic': Object.assign({}, basic),
  'filter': Object.assign({}, filter),
  'refer': Object.assign({}, refer)
}; // ys扩展风格扩展 cControlType
// const extendComp = {
//     'basic': {},
//     'meta': {
//         NCCTreeRefer: '',
//     }
// }

var _default = extendComp;
exports.default = _default;