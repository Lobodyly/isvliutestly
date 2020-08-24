"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var env = require("../../web/common/config.env");

cb.define(function () {
  var common_VM_Extend = function () {
    // 云打印
    var print = function print(viewmodel, serverUrl, serverParams) {
      viewmodel.on('beforePrintpreview', function (params) {
        var cmdParameter = JSON.parse(params.cmdParameter); //动态的修改cmdParameter内容

        var _getSelectRowIds = function _getSelectRowIds(gridModel, para) {
          var distinct = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
          //默认去重
          if (!gridModel) return;
          var selectDatas = para && para.params && para.params.index != null ? [gridModel.getRow(para.params.index)] : gridModel.getSelectedRows();
          var ids = [];

          if (selectDatas && selectDatas.length > 0) {
            selectDatas.forEach(function (row) {
              if (row.id) {
                ids.push(row.id);
              }
            });
          }

          return distinct ? _toConsumableArray(new Set(ids)) : ids;
        };

        var ids = _getSelectRowIds(viewmodel.getGridModel());

        if (ids && ids.length > 0) {
          var url = "".concat(env.HTTP_SERVICE_BASEURL, "/uniform/bill/print");
          var billNo = viewmodel.getParams().cardKey;
          url = url + '?billnum=' + billNo + '&ids=' + ids.join(',');
          cmdParameter.serverUrl = encodeURIComponent(url);
        } else {
          cb.utils.alert("请先选择数据", 'warning');
          return false; // const condition = viewmodel.getCache('lastSearchCondition') ? JSON.stringify(viewmodel.getCache('lastSearchCondition').condition) : null;
          // params = Object.assign(params, {
          //   condition
          // })
        }

        console.log(JSON.stringify(cmdParameter)); //最后将修改后的内容赋值给params；

        params.cmdParameter = JSON.stringify(cmdParameter);
      });
    };

    return {
      print: print
    };
  }();

  try {
    module.exports = common_VM_Extend;
  } catch (error) {}

  return common_VM_Extend;
});