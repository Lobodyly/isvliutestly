"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCompleted = exports.completeAll = exports.completeTodo = exports.deleteTodo = exports.editTodo = exports.addTodo = void 0;

var _reduxActions = require("redux-actions");

var Actions = _interopRequireWildcard(require("../constants/actions"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var addTodo = (0, _reduxActions.createAction)(Actions.ADD_TODO);
exports.addTodo = addTodo;
var editTodo = (0, _reduxActions.createAction)(Actions.EDIT_TODO);
exports.editTodo = editTodo;
var deleteTodo = (0, _reduxActions.createAction)(Actions.DELETE_TODO);
exports.deleteTodo = deleteTodo;
var completeTodo = (0, _reduxActions.createAction)(Actions.COMPLETE_TODO);
exports.completeTodo = completeTodo;
var completeAll = (0, _reduxActions.createAction)(Actions.COMPLETE_ALL);
exports.completeAll = completeAll;
var clearCompleted = (0, _reduxActions.createAction)(Actions.CLEAR_COMPLETED);
exports.clearCompleted = clearCompleted;