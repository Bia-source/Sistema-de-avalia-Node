import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"

class DeleteUserService{
    async execute(id:string) {
        const user = getCustomRepository(UserRepositories).delete(id);
        return classToPlain(user);
    }
}

export { DeleteUserService }