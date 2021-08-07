import { getCustomRepository } from "typeorm"
import { ComplimentRepositories } from "../repositories/ComplimentRepositories"
import { UserRepositories } from "../repositories/UserRepositories";

interface IComplimentRequest{
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService{
   async execute({ tag_id, user_receiver, user_sender, message}: IComplimentRequest){
     const complimentRepository = getCustomRepository(ComplimentRepositories);
     const userRepository = getCustomRepository(UserRepositories);
     const userReceiverExists = await userRepository.findOne(user_receiver);

     if(user_receiver === user_sender){
        throw new Error("Usuario nao pode enviar para si mesmo"); 
     }

     if(!userReceiverExists){
         throw new Error("Usuario nao existe"); 
     }

     const compliment = complimentRepository.create({
         tag_id, 
         user_receiver,
         user_sender,
         message
        });

        await complimentRepository.save(compliment);
        return compliment;
   }
}

export { CreateComplimentService }