import { getCustomRepository } from "typeorm"
import { MapComplimentById } from "./maps.index";
import { ComplimentRepositories } from "../../repositories/ComplimentRepositories"


class ComplimentByIdService{
   async execute(id:string){
    const complimentRepository = getCustomRepository(ComplimentRepositories);
    const compliment = await complimentRepository.findOne({
       where: {
         id
       },
       relations: ["tag", "userSender", "userReceiver"]
    });  
    return MapComplimentById(compliment);
   }
}

export { ComplimentByIdService }