import { Request, Response } from "express";
import { ListUserReceiverComplimentsService } from "../services/ListUserReceiverComplimentsService";

class ListUserReceiverComplimentsController{
   async handle(request:Request, response:Response){
       const {user_id} = request;
       const listUserReceiveService = new ListUserReceiverComplimentsService();
       const compliments = await listUserReceiveService.execute(user_id);
       return response.json({listReceive: compliments});
   }
}

export { ListUserReceiverComplimentsController }