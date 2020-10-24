import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from '../actions/actionTypes';

//state không thay đổi, chỉ trả về giá trị cuối cùng
const loginReducers = (loginData = null, payload: any) => {
    //console.log(payload)
    switch (payload.type) {
        case LOGIN_FAIL:
            payload.callback()
            return null;
        case LOGIN_SUCCESS:
            payload.callback()
            return {
                token: payload.token,
            };
        default:
            return null;
    }
}

export default loginReducers;