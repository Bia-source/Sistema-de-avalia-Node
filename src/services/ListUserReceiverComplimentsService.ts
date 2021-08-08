import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";
import { UserRepositories } from "../repositories/UserRepositories";

// TODO criar uma lista filtrada por nome e outra por categoria
class ListUserReceiverComplimentsService{
   async execute(user_id: string){
      const complimentRepository = getCustomRepository(ComplimentRepositories);
      const userRepository = getCustomRepository(UserRepositories);
      let compliments = await complimentRepository.find({
          where: {
              user_receiver:user_id
          },
          relations: ["userSender"]
      });

      const mapCompliments = compliments.map((item)=>{
          let compliment = {
            id:item.id,
            tag_id:item.tag_id,
            message:item.message,
            created_at:item.created_at,
            user_sender:item.userSender.name
          }
          console.log(compliment)
          return compliment;
      })
     return mapCompliments;
   }
   
}

export { ListUserReceiverComplimentsService }