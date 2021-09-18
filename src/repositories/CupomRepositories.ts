import { EntityRepository, Repository } from "typeorm";
import { Cupom } from "../entities/Cupom";

@EntityRepository(Cupom)
class CupomRepositories extends Repository<Cupom>{ }

export { CupomRepositories }