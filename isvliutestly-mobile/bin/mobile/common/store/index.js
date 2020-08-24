"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureStore = configureStore;
exports.createHistory = void 0;

var _redux = require("redux");

var _reduxDevtoolsExtension = require("redux-devtools-extension");

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

var _reducers = require("../reducers");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _history = require("history");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { routerMiddleware, syncHistoryWithStore } from "react-router-redux";
var store;
var history = (0, _history.createBrowserHistory)(); // Build the middleware for intercepting and dispatching navigation actions
// const historyMiddleware = routerMiddleware(history);

function configureStore(initialState) {
  var middlewares = [_reduxThunk.default];

  if (process.env.NODE_ENV === "development") {
    middlewares.push((0, _reduxLogger.default)());
    store = (0, _redux.createStore)(_reducers.reducers, initialState, (0, _reduxDevtoolsExtension.composeWithDevTools)(_redux.applyMiddleware.apply(void 0, middlewares)));
  } else {
    store = (0, _redux.createStore)(_reducers.reducers, initialState, (0, _redux.compose)(_redux.applyMiddleware.apply(void 0, middlewares)));
  }

  if (module.hot) {
    module.hot.accept("../reducers", function () {
      var nextReducer = require("../reducers");

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

var createHistory = function createHistory(store, path) {
  // if (process.env.__CLIENT__)
  // return syncHistoryWithStore(history, store);
  return history; // return createMemoryHistory(path)
};

exports.createHistory = createHistory;