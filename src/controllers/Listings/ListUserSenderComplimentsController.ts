import { Request, Response } from "express";
import { ListUserSenderComplimentsService } from "../../services/ListingsService/ListUserSenderComplimentsService";

class ListUserSenderComplimentsController{
    
    async handle(request: Request, response: Response){
        const { user_id } = request;
        const listUserSenderService = new ListUserSenderComplimentsService();
        const compliments = await listUserSenderService.execute(user_id);
        return response.json({listSender: compliments});
    }
}

export { ListUserSenderComplimentsController }