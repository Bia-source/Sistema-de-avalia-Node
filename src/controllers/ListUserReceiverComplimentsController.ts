import { Request, Response } from "express";
import { ListUserReceiverComplimentsService } from "../services/ListUserReceiverComplimentsService";

class ListUserReceiverComplimentsController{
   async handle(request:Request, response:Response){
       const {user_id, admin} = request;
       const listUserReceiveService = new ListUserReceiverComplimentsService();
       if(admin === true){
        const compliments = await listUserReceiveService.execute(user_id,admin);
        return response.json({listReceive: compliments});
       }
       const compliments = await listUserReceiveService.execute(user_id);
       return response.json({listReceive: compliments});
       
       
       
   }
}

export { ListUserReceiverComplimentsController }