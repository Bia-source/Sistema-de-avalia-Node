import { getCustomRepository } from "typeorm"
import { Compliment } from "../entities/Compliment";
import { ComplimentRepositories } from "../repositories/ComplimentRepositories"


class ComplimentByIdService{
   async execute(id:string){
    const complimentRepository = getCustomRepository(ComplimentRepositories);
    const compliment = await complimentRepository.findOne({
       where: {
         id
       },
       relations: ["tag", "userSender", "userReceiver"]
    });  
    return mapCompliment(compliment);
   }
}

async function mapCompliment(rating) {
   const compliments = await {
      compliment_id:rating.id,
      user_sender: {
         user_id:rating.userSender.id,
         user_name:rating.userSender.name,
      },
      user_receive:  {
         user_id:rating.userReceiver.id,
         user_name:rating.userReceiver.name,
      },
      tag:  {
         tag_id:rating.tag.id,
         tag_name:rating.tag.name,
      },
      message: rating.message,
      created_at: rating.created_at
   };
   return compliments;
}

export { ComplimentByIdService }