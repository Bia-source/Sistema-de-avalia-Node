import { classToPlain } from "class-transformer";
import { response } from "express";
import { getCustomRepository } from "typeorm"
import { User } from "../entities/User";
import { UserRepositories } from "../repositories/UserRepositories"

interface IRequest{
    id:string;
    name?:string;
    email?:string;
}
class UpdateUserService{
   async execute(requestUpdate:IRequest){
       const userRepository = getCustomRepository(UserRepositories);
       const { id } = requestUpdate;
       const { admin, created_at, email, name } = await userRepository.findOne({
           where: {id:id}
       });
    
       let changeUser= {
        id,   
        name:requestUpdate?.name || name,
        email:requestUpdate?.email || email,
        admin,
        created_at,
        update_at: new Date()
       }
       await userRepository.update(id, changeUser);
       const user = await userRepository.findOne({where: {id:id}});
       return classToPlain(user);
   }
}

export { UpdateUserService }