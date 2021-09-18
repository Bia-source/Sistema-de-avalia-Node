import { getCustomRepository } from "typeorm";
import { Product } from "../../entities/Product";
import { ProductRepositories } from "../../repositories/ProductRepositories";


class ListProductService {
    async listAllProduct(): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductRepositories);
        const listProduct = await productRepository.find();
        return listProduct;
    }

    async listByCategory(category: string): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductRepositories);
        const listProduct = await productRepository.find({ product_category: category });
        return listProduct;
    }

    async listByPriceSort(product_name: string): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductRepositories);
        const listProduct = await productRepository.find({ product_name });
        const sortList = listProduct.sort();
        return sortList;
    }

    async searchByName(product_name: string): Promise<Product>{
        const productRepository = getCustomRepository(ProductRepositories);
        const product = await productRepository.findOne({ product_name });
        return product;
    }
}

export { ListProductService }