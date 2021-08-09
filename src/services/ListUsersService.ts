import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"

class ListUsersSevice{
   async execute(){
       const userRepository = getCustomRepository(UserRepositories);
       const users = await userRepository.find();
       return classToPlain(users);
   }
}

export { ListUsersSevice }