import { combineReducers } from 'redux';
import homeReducers from './HomeReducer';
import loginReducers from './LoginReducer';

const allReducers = combineReducers({
    homeReducers,
    loginReducers,
});
export default allReducers;