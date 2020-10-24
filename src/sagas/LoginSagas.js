import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from '../actions/actionTypes';

//takeEvery khi thực hiện một hành động nào đó nó sẻ gọi một hàm trước khi dispatch vào reducers
import { call, put, takeEvery } from 'redux-saga/effects';
import loginActions, { loginFailAction, loginSuccessAction } from '../actions/index'
import rf from '../requests/RequestFactory';


function* loginHandler(action) {
    try {
        const params = {
            "email": action.email,
            "password": action.password,
        };
        const resp = yield call((params) => rf.getRequest('LoginRequest').login(params), params);
        console.log(resp)
        if (resp) {
            yield put(loginSuccessAction(resp.token, action.callback));
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