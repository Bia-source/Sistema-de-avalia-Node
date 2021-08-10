import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import { MapResponseUser } from "./maps.index";
import { UserRepositories } from "../../repositories/UserRepositories"

interface IRequestSearch{
    searchUser: {
        type:string;
        value:string;
    }
}

class UserSearchService{
   async execute(searchUser:string,admin:boolean){
     const userRepository = getCustomRepository(UserRepositories);
     let user;
     if(!user){
        user = await userRepository.findOne({
         where: {
         id:searchUser
        }
        });         
     }
     if(!user){
        user = await userRepository.findOne({
          where: {
          email:searchUser
        }
        });   
     }  
     if(!user){
        user = await userRepository.findOne({
          where: {
          name:searchUser
        }
        });   
     };
     return classToPlain(MapResponseUser(user,admin));
   }
}



export { UserSearchService }