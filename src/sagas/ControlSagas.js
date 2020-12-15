import { SET_STATE_DEVICE } from '../actions/actionTypes';

//takeEvery khi thực hiện một hành động nào đó nó sẻ gọi một hàm trước khi dispatch vào reducers
import { call, put, takeEvery } from 'redux-saga/effects';
import rf from '../requests/RequestFactory';
import { isFunction } from 'lodash';
import { sign } from '../utils/sign';


function* setStateDevice(action) {
    try {
        data = JSON.stringify(action.json)
        console.log(data,"data")
        signature = sign(data)
        console.log(signature)
        const params = {
            "data": data,
            "signature": signature,
        };
        console.log(params)
        const resp = yield call((params) => rf.getRequest('ControlRequest').setStateDevice(params), params);
        if (resp) {
            if (isFunction(action.callback)) action.callback(true)
        } else {
            if (isFunction(action.callback)) action.callback(false)
        }
    } catch (e) {
        console.log("======== error")
        if (isFunction(action.callback)) action.callback(false)
    }
}

export function* control() {
    yield takeEvery(SET_STATE_DEVICE, setStateDevice);
}