import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../../repositories/ComplimentRepositories"
import { UserRepositories } from "../../repositories/UserRepositories";
import { MapReturnCompliment } from "./maps.index";

interface IComplimentRequest{
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

// TODO recuperar o usuario (username) ao invés do id do receiver(id do usuario)
// TODO recuperar usuario (username) ao invés do id do sender(id do criador da avaliação)
class CreateComplimentService{
   async execute({ tag_id, user_receiver, user_sender, message}: IComplimentRequest){
     const complimentRepository = getCustomRepository(ComplimentRepositories);
     const userRepository = getCustomRepository(UserRepositories);
     const userReceiver = await userRepository.findOne(user_receiver);
    
     if(user_receiver === user_sender){
        throw new Error("Usuario nao pode enviar para si mesmo"); 
     }

     if(!userReceiver){
         throw new Error("Usuario nao existe"); 
     }

     const compliment = complimentRepository.create({
         tag_id, 
         user_receiver,
         user_sender,
         message
        });

    await complimentRepository.save(compliment);
    const { id } = compliment;
    const complimentReturn = await complimentRepository.findOne({
        where: {
            id
        },
        relations: [ "userReceiver", "userSender", "tag"]
    });
    
    return MapReturnCompliment(complimentReturn);
   }
}

export { CreateComplimentService }