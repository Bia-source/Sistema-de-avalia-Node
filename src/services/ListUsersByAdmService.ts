import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"

class ListUserByAdmService{
    async execute(value_filter:boolean){
       const userRepository = getCustomRepository(UserRepositories);
       let users;
        switch (value_filter)  {
           case true:
            users = await userRepository.find({
                where: {
                   admin: true 
                }
            });
            break;
            case false:
              users = await userRepository.find({
                where: {
                    admin: false 
                }
            });
            break;
            default:
                throw new Error("Insira um valor de admin(true or false)")
               break;
       }   
       return classToPlain(users);
    }
}

export { ListUserByAdmService }