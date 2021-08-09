import { Request, Response} from "express";
import { ListUserByAdmService } from "../services/ListUsersByAdmService";

class ListUsersByAdmController{
    async handle(request: Request, response: Response){
        const { admin } = request.body;
        const listUsersService = new ListUserByAdmService();
        const listUsers = await listUsersService.execute(admin);
        return response.json({list_users:listUsers});
    }
}

export { ListUsersByAdmController }