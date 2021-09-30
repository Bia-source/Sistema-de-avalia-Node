import { EntityRepository, Repository } from "typeorm";
import { Cart } from "../entities/Cart";

@EntityRepository(Cart)
class CartRepositories extends Repository<Cart>{

}

export { CartRepositories }