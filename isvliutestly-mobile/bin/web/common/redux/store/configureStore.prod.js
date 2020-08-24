"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reducers = _interopRequireDefault(require("../reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducerMap = {
  index: _reducers.default
};

function configureStore(entryPoint, initialState) {
  return (0, _redux.createStore)(reducerMap[entryPoint], initialState, (0, _redux.applyMiddleware)(_reduxThunk.default));
}