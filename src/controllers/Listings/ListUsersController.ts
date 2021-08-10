import { Request, Response} from "express";
import { ListUsersSevice } from "../../services/ListingsService/ListUsersService";

class ListUsersController{
   async handle(request: Request, response: Response){
       const listUserService = new ListUsersSevice();
       const listUsers = await listUserService.execute();
       return response.json({list_users: listUsers})
   }
}

export { ListUsersController }