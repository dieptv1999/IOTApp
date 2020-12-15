import BaseRequest from './BaseRequest';

const defaultConfig = {
    login: {
        headers: {
            "Content-Type": "application/json",
        }
    }
}

export default class ControlRequest extends BaseRequest {

    setStateDevice(params, config = defaultConfig.login) {
        return this.post(`/api/device/control`, params, config);
    }
}