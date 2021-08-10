import { Request, Response } from "express";
import { ListUserReceiverComplimentsService } from "../../services/ListingsService/ListUserReceiverComplimentsService";

class ListUserReceiverComplimentsController{
   async handle(request:Request, response:Response){
       const { user_id, admin } = request;
       const { filter } = request.body;
       const listUserReceiveService = new ListUserReceiverComplimentsService();
        if(filter) {
            const compliments = await listUserReceiveService.execute(user_id,admin,filter);
            return response.json({listReceive: compliments});
        }
        const compliments = await listUserReceiveService.execute(user_id,admin);
        return response.json({listReceive: compliments});
   }
}

export { ListUserReceiverComplimentsController }