import { GET_MORE_DATA, LOGIN, LOGIN_FAIL, REFRESH_DATA, UPLOAD_FILE } from './actionTypes';

export const loginAction = (username: string, password: string, callback) => {
    return {
        type: LOGIN,
        username: username,
        password: password,
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

export const uploadFile = (uri: string, typeFile: string, name: string, size: number, callback: any) => {
    return {
        type: UPLOAD_FILE,
        uri,
        typeFile,
        name,
        size,
        callback: callback,
    }
}