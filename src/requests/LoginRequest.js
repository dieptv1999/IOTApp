import BaseRequest from './BaseRequest';

const defaultConfig = {
    login: {
        headers: {
            "Content-Type": "application/json",
        }
    }
}

export default class LoginService extends BaseRequest {

    login(params, config = defaultConfig.login) {
        console.log(params)
        return this.post(`api/login`, params, config);
    }
}