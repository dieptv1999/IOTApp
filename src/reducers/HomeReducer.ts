import { UPLOAD_FAIL, UPLOAD_SUCCESS } from "../actions/actionTypes";

//state không thay đổi, chỉ trả về giá trị cuối cùng
const homeReducers = (times = 0, payload: any) => {
    //console.log(payload)
    switch (payload.type) {
        case UPLOAD_FAIL:
            payload.action.callback()
            return "Fail";
        case UPLOAD_SUCCESS:
            payload.action.callback()
            return "success";
        default:
            return "";
    }
}

export default homeReducers;