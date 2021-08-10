import { Request, Response} from "express";
import { UpdateUserService } from "../../services/UserService/UpdateUserService";

interface IRequest{
    id:string;
    name?:string;
    email?:string;
}

class UpdateUserController{
    async handle(request:Request, response:Response){
        const { name, email }: IRequest = request.body;
        const { user_id } = request;
        const updateUserService = new UpdateUserService();
        let paramsUpdate;
        if(name && !email){ paramsUpdate = {name, id:user_id} };
        if(!name && email){ paramsUpdate = {email, id:user_id} };
        if(name && email){ paramsUpdate = { name,email, id:user_id }};
        const updateUser = await updateUserService.execute(paramsUpdate);
        return response.json({user:updateUser});
    }
}

export { UpdateUserController }