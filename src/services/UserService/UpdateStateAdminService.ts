import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../../repositories/UserRepositories"


class UpdateStateAdminService{
    async execute(id:string) {
        const userRepository = getCustomRepository(UserRepositories);
        const { name, email, created_at } = await userRepository.findOne(id);
        let changeUser = {
            id,
            name,
            email,
            admin: true,
            created_at,
            update_at: new Date()
        }
        await userRepository.update(id, changeUser);
        const user = await userRepository.findOne(id);
        return classToPlain(user);
   }
}

export { UpdateStateAdminService }