import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";

// TODO criar uma lista filtrada por nome e outra por categoria
class ListUserReceiverComplimentsService{
    // Avaliação e quem enviou 
   async execute(user_id: string,admin?:boolean){
      const complimentRepository = getCustomRepository(ComplimentRepositories);
      let compliments;
      if(admin === true){
         compliments = await complimentRepository.find({relations:["userSender", "userReceiver", "tag"]});
      }else{
        compliments = await complimentRepository.find({
          where: {
              user_receiver:user_id
          },
          relations: ["userSender", "userReceiver", "tag"]
      });
      }
     return (admin) ? classToPlain(mapComplimentsReceiverComplete(compliments)) : mapComplimentsReceiver(compliments);
   }
}

  async function mapComplimentsReceiver(rating) {
    const compliments = await rating.map((item)=>{
        return  {
         user:{
            user_id:item.userReceiver.id,
            user_name:item.userReceiver.name
          },   
          message:{
            message_id:item.id,
            message_text:item.message,
            created_at:item.created_at,
            tag_name:{
                tag_name:item.tag.name,
                tag_id:item.tag.id
              },
          },
          user_sender:{
              user_sender_id:item.userSender.id,
              user_sender_name:item.userSender.name
          },
        }
    });
    return compliments;
}

async function mapComplimentsReceiverComplete(rating) {
  const compliments = await rating.map((item)=>{
      return  {  
        message:{
          message_id:item.id,
          message_text:item.message,
          created_at:item.created_at,
          tag_name:{
              tag_name:item.tag.name,
              tag_id:item.tag.id
            },
        },
        user_sender:{
          user_sender_id:item.userSender.id,
          user_sender_name:item.userSender.name,
          user_sender_created_at: item.userSender.created_at
        },
        user_receiver:{
          user_receiver_id:item.userReceiver.id,
          user_receiver_name:item.userReceiver.name,
          user_receiver_created_at: item.userReceiver.created_at
        },
      }
  });
  return compliments;
}

export { ListUserReceiverComplimentsService }