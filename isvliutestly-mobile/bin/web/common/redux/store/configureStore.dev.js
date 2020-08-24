"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require("redux");

var _lodash = require("lodash");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

var _immutable = _interopRequireDefault(require("immutable"));

var _reducers = _interopRequireDefault(require("../reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducerMap = {
  index: _reducers.default
};

function configureStore(entryPoint, initialState) {
  var middlewares = [_reduxThunk.default];

  if (process.env.__CLIENT__) {
    var stateTransformer = function stateTransformer(states) {
      var finalStates = {};

      for (var key in states) {
        if (!states.hasOwnProperty(key)) continue;
        var state = states[key];

        if (_immutable.default.Iterable.prototype.isPrototypeOf(state) && (0, _lodash.isFunction)(state.toObject)) {
          finalStates[key] = state.toObject();
        } else if ((0, _lodash.isPlainObject)(state)) {
          finalStates[key] = key === 'routing' ? states : stateTransformer(state);
        }
      }

      return finalStates;
    };

    var args = {
      stateTransformer: stateTransformer,
      collapsed: true,
      colors: {
        title: function title() {
          return "red";
        },
        prevState: function prevState() {
          return "blue";
        },
        action: function action() {
          return "orange";
        },
        nextState: function nextState() {
          return "green";
        },
        error: function error() {
          return "#F20404";
        }
      }
    };
    middlewares.push((0, _reduxLogger.default)(args));
  }

  var store = (0, _redux.createStore)(reducerMap[entryPoint], initialState, (0, _redux.compose)(_redux.applyMiddleware.apply(void 0, middlewares), process.env.__CLIENT__ && window.devToolsExtension ? window.devToolsExtension() : function (f) {
    return f;
  }));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', function () {
      var nextRootReducer = require("../reducers").default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}