import { Request, Response} from "express";
import { ListUserByAdmService } from "../../services/ListingsService/ListUsersByAdmService";

class ListUsersByAdmController{
    async handle(request: Request, response: Response){
        const { admin } = request;
        const listUsersService = new ListUserByAdmService();
        const listUsers = await listUsersService.execute(admin);
        return response.json({list_users:listUsers});
    }
}

export { ListUsersByAdmController }