import { combineReducers } from 'redux';
import homeReducers from './HomeReducer';

const allReducers = combineReducers({
    homeReducers,
});
export default allReducers;