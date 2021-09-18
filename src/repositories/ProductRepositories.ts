import { EntityRepository, Repository } from "typeorm";
import { Product } from "../entities/Product";

@EntityRepository(Product)
class ProductRepositories extends Repository<Product>{ }

export { ProductRepositories }