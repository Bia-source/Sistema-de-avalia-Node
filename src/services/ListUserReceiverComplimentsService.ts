import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";

// TODO criar uma lista filtrada por nome e outra por categoria
class ListUserReceiverComplimentsService{
   async execute(user_id: string){
      const complimentRepository = getCustomRepository(ComplimentRepositories);
      let compliments = await complimentRepository.find({
          where: {
              user_receiver:user_id
          },
          relations: ["userSender", "tag"]
      });
      //console.log(compliments);
     return mapCompliments(compliments);
   }
}

  async function mapCompliments(compli) {
    const compliments = await compli.map((item)=>{
        return  {
          user:{
            user_id:item.id,
            user_name:item.name
          },
          tag_name:{
            tag_name:item.tag.name,
            tag_id:item.tag.id
          },
          message:item.message,
          created_at:item.created_at,
          user_sender:{
              user_sender_id:item.userSender.id,
              user_sender_name:item.userSender.name
          },
        }
    });
    return compliments;
}

export { ListUserReceiverComplimentsService }