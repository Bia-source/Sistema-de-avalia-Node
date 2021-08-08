import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";

class ListUserSenderComplimentsService{

   async execute(user_id: string){
      const complimentRepository = getCustomRepository(ComplimentRepositories);
      const compliments = await complimentRepository.find({
          where: {
              user_sender:user_id
          }
      });
     return compliments;
   }
}

export { ListUserSenderComplimentsService }