import { Repository, EntityRepository } from "typeorm";
import { Tag } from '../entities/Tag';

@EntityRepository(Tag)
class TagRepositories extends Repository<Tag>{

}

export { TagRepositories }