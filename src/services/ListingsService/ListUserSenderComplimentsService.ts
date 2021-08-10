import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../../repositories/ComplimentRepositories";
import { MapComplimentsSender } from "./maps.index";

class ListUserSenderComplimentsService{

    // Avaliação e quem vai recebe-la
   async execute(user_id: string){
      const complimentRepository = getCustomRepository(ComplimentRepositories);
      const compliments = await complimentRepository.find({
          where: {
              user_sender:user_id
          },
          relations: ["userReceiver", "userSender", "tag"]
      });
     return MapComplimentsSender(compliments);;
   }
}



export { ListUserSenderComplimentsService }