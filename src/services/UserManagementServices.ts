import { User } from "../models/User";

class UserManagementService {

    constructor() {
    }
    async getUserByPage(page: number, size: number, type: string): Promise<User[]> {
        try {
            let response = await fetch(
                'http://10.113.1.134:8080/v1/user/by-page?page=' + page + "&size=" + size + "&type=" + type
            );
            let json = await response.json();
            return json as User[];
        } catch (error) {
            console.error(error);
            return []
        }
    }
}
var userManagementService = new UserManagementService();
export default userManagementService;