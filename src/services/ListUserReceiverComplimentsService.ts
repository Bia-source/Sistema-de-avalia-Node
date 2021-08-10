import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";

// TODO criar uma lista filtrada por nome e outra por categoria
class ListUserReceiverComplimentsService{
    // Avaliação e quem enviou 
   async execute(user_id: string,admin?:boolean, filter?:string){
     const complimentRepository = getCustomRepository(ComplimentRepositories);
     let filterCompliments;
    if(filter){
       filterCompliments = await complimentRepository.findOne({
        where: {
        userReceiver:filter
         },
         relations: ["userSender", "userReceiver", "tag"]
       });  
    }
    if(filter){
       filterCompliments = await complimentRepository.findOne({
         where: {
         userSender:filter
       },
         relations: ["userSender", "userReceiver", "tag"]
       });   
    }  
    if(filter){
       filterCompliments = await complimentRepository.findOne({
         where: {
          message:filter
       },
         relations: ["userSender", "userReceiver", "tag"]
       });   
    };
    if(filter){
      filterCompliments = await complimentRepository.findOne({
        where: {
         id:filter
      },
         relations: ["userSender", "userReceiver", "tag"]
      });   
     };
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
     if (admin && filter) return classToPlain(mapComplimentsReceiverFilterAdm(filterCompliments));
     if (admin && !filter) return classToPlain(mapComplimentsReceiverComplete(compliments));
     if (!admin && filter) return classToPlain(mapComplimentsReceiverFilterNotAdm(filterCompliments))
     return classToPlain(mapComplimentsReceiver(compliments));
   }
}

  async function mapComplimentsReceiver(rating: [any]) {
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

async function mapComplimentsReceiverComplete(rating: [any]) {
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

async function mapComplimentsReceiverFilterAdm(rating) {
  const compliments = await {
      message: {
        message_id: rating.id,
        message_text: rating.message,
        created_at: rating.created_at,
        tag_name: {
          tag_name: rating.tag.name,
          tag_id: rating.tag.id
        },
      },
      user_sender: {
        user_sender_id: rating.userSender.id,
        user_sender_name: rating.userSender.name,
        user_sender_created_at: rating.userSender.created_at
      },
      user_receiver: {
        user_receiver_id: rating.userReceiver.id,
        user_receiver_name: rating.userReceiver.name,
        user_receiver_created_at: rating.userReceiver.created_at
      },
    }
  return compliments;
}

  async function mapComplimentsReceiverFilterNotAdm(rating) {
    const compliments = await {   
          message:{
            message_id:rating.id,
            message_text:rating.message,
            created_at:rating.created_at,
            tag_name:{
                tag_name:rating.tag.name,
                tag_id:rating.tag.id
              },
          },
          user_sender:{
              user_sender_id:rating.userSender.id,
              user_sender_name:rating.userSender.name
          },
        }
    return compliments;
}
export { ListUserReceiverComplimentsService }