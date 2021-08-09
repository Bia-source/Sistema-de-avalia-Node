import { Request, Response} from "express";
import { UserSearchService } from "../services/UserSearchService";

class UserSearchController{
   async handle(request: Request, response: Response){
       const { searchUser } = request.body;
       const { admin } = request;
       const userSearchService = new UserSearchService();
       const user = await userSearchService.execute(searchUser,admin);
       return response.json({user:user});
   }
}

export { UserSearchController }