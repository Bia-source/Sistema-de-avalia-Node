import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../../repositories/ComplimentRepositories";
import {
  MapComplimentsReceiverComplete,
  MapComplimentsReceiverFilterAdm,
  MapComplimentsReceiver,
  MapComplimentsReceiverFilterNotAdm
} from "./maps.index";

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
     if (admin && filter) return classToPlain(MapComplimentsReceiverFilterAdm(filterCompliments));
     if (admin && !filter) return classToPlain(MapComplimentsReceiverComplete(compliments));
     if (!admin && filter) return classToPlain(MapComplimentsReceiverFilterNotAdm(filterCompliments))
     return classToPlain(MapComplimentsReceiver(compliments));
   }
}




export { ListUserReceiverComplimentsService }