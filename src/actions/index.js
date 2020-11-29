import { GET_MORE_DATA, LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, REFRESH_DATA, UPLOAD_FILE } from './actionTypes';

export const loginAction = (email, password, callback) => {
    return {
        type: LOGIN,
        email: email,
        password: password,
        callback: callback,
    }
}
export const loginSuccessAction = (token,callback) => {
    return {
        type: LOGIN_SUCCESS,
        token,
        callback: callback,
    }
}
export const loginFailAction = (callback) => {
    return {
        type: LOGIN_FAIL,
        callback: callback,
    }
}

export const refreshDataAction = (callback) => {
    return {
        type: REFRESH_DATA,
        callback
    }
}

export const getNextPageAction = (currPage: Number, callback) => {
    return {
        type: GET_MORE_DATA,
        currPage: currPage,
        callback: callback,
    }
}