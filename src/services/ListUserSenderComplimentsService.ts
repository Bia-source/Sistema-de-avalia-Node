import { getCustomRepository } from "typeorm"
import { Compliment } from "../entities/Compliment";
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";

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
     return mapComplimentsSender(compliments);;
   }
}

async function mapComplimentsSender(rating) {
    const compliments = await rating.map((item)=>{
        return  {
         user:{
            user_id:item.userSender.id,
            user_name:item.userSender.name
          },  
          message:{
            message_id:item.id,
            message_text:item.message,
            created_at:item.created_at,
            tag:{
                tag_name:item.tag.name,
                tag_id:item.tag.id
              },
          },
          user_receiver:{
              user_receiver_id:item.userReceiver.id,
              user_receiver_name:item.userReceiver.name
          }
        }
    });
    return compliments;
}

export { ListUserSenderComplimentsService }