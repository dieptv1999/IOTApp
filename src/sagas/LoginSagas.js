import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from '../actions/actionTypes';

//takeEvery khi thực hiện một hành động nào đó nó sẻ gọi một hàm trước khi dispatch vào reducers
import { call, put, takeEvery } from 'redux-saga/effects';
import loginActions, { loginFailAction, loginSuccessAction } from '../actions/index'
import rf from '../requests/RequestFactory';
import { sha256 } from 'react-native-sha256';


function* loginHandler(action) {
    const hash = yield sha256(action.email + action.password)
    console.log(hash)
    try {
        const params = {
            "email": action.email,
            "password": hash,
        };
        console.log(params)
        const resp = yield call((params) => rf.getRequest('LoginRequest').login(params), params);
        if (resp) {
            yield put(loginSuccessAction(resp.data.token, action.callback));
        } else {
            yield put(loginFailAction(action.callback));
        }
    } catch (e) {
        console.log("======== error")
        yield put(loginFailAction(action.callback))
    }
}

export function* login() {
    yield takeEvery(LOGIN, loginHandler);
}