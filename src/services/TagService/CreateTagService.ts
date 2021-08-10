import { getCustomRepository } from "typeorm";
import { TagRepositories } from "../../repositories/TagRepositories";

interface IRequest{
    name:string;
}

enum ErrorsParam{
    INVALID_NAME = "O nome não foi passado, digite um nome",
    TAG_EXIST = "Essa tag já foi registrada"
}

class CreateTagService {
   async execute({name}: IRequest){
      const tagsRepositories = getCustomRepository(TagRepositories);
      const tagAlreadyExist = await tagsRepositories.findOne({name});
      if(!name){
          throw new Error(ErrorsParam.INVALID_NAME);
      }
      if(tagAlreadyExist){
        throw new Error(ErrorsParam.TAG_EXIST);
      }

      const tag = tagsRepositories.create({name})
      await tagsRepositories.save(tag);
      return tag;
   }
}

export { CreateTagService }