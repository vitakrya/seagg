import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const elplanetApp = combineReducers({
  todos,
  visibilityFilter
});

export default elplanetApp;