import { EntityRepository, Repository } from "typeorm";
import { Cart } from "../entities/Cart";

@EntityRepository()
class CartRepositories extends Repository<Cart>{

}

export { CartRepositories }