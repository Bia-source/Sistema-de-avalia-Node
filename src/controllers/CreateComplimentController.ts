import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

// TODO recuperar o usuario (username) ao invés do id do receiver(id do usuario)
// TODO recuperar usuario (username) ao invés do id do sender(id do criador da avaliação)

class CreateComplimentController{
   async handle(request: Request, response: Response){
      const { tag_id, user_receiver, message } = request.body;
      const { user_id } = request;
      const createComplimentService = new CreateComplimentService();
      const compliment = await createComplimentService.execute({
        tag_id, 
        user_receiver,
        user_sender: user_id,
        message
      });
      response.status(201).json(compliment);
   }
}

export { CreateComplimentController }