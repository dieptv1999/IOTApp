import { all, call } from 'redux-saga/effects';
import { control } from './ControlSagas';
import { login } from './LoginSagas';


export default function* rootSaga() {
    yield all([
        call(login),
        call(control),
    ]);
}