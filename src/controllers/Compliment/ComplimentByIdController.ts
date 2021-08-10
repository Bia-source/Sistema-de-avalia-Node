import { Request, Response} from "express";
import { ComplimentByIdService } from "../../services/ComplimentService/ComplimentByIdService";

class ComplimentByIdController{
    async handle(request:Request, response: Response){
      const { id } = request.params;
      const complimentService = new ComplimentByIdService();
      const compliment = await complimentService.execute(id);
      return response.json({compliment:compliment});
    }
}

export { ComplimentByIdController }