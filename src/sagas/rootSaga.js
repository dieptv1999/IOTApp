import { all, call } from 'redux-saga/effects';
import { login } from './LoginSagas';


export default function* rootSaga() {
    yield all([
        call(login),
    ]);
}