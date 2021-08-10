import { getCustomRepository } from "typeorm"
import { TagRepositories } from "../../repositories/TagRepositories"

class ListTagService{
   async execute(){
       const tagsRepository = getCustomRepository(TagRepositories);
       const tags = await tagsRepository.find();
       return tags;
   }
}

export { ListTagService }