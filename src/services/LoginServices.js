class LoginService {

    constructor() {
    }
    async login(username: string, password) {
        try {
            let response = await fetch(
                'http://10.113.1.134:8080/v1/user/' + username
            );
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
        }
    }
}
var loginServices = new LoginService();
export default loginServices;