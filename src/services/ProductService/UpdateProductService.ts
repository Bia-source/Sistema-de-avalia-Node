import { getCustomRepository } from "typeorm";
import { Product } from "../../entities/Product";
import { ProductRepositories } from "../../repositories/ProductRepositories";

interface IUpdateProduct {
    product_name?: string;
    product_category?: string;
    quantity_stock?: number;
    value?: number;
}

interface IResquest {
    productIdOrName: string;
    productParam: IUpdateProduct;
}

class UpdateProductService {
    async execute({productIdOrName, productParam}: IResquest){
        const productRepository = getCustomRepository(ProductRepositories);
        const product = await this.getProduct(productRepository, productIdOrName);
        let updateProduct = {
            product_name: productParam?.product_name || product.product_name,
            product_category: productParam?.product_category || product.product_category,
            quantity_stock: productParam?.quantity_stock || product.quantity_stock,
            value: productParam?.value || product.value
        }
        await productRepository.update(product.id, updateProduct);
        const newProduct = await productRepository.findOne({where: { id: product.id}})
        return newProduct;
    }
    
    //implementar use case do repositorio 
    private async getProduct(productRepository:ProductRepositories, productIdOrName:string): Promise<Product> {
        let product: Product;
        if(productIdOrName) {
            product = await productRepository.findOne({
            where: {
                id: productIdOrName
            }
          })
        }

        if(productIdOrName && !product) {
            product = await productRepository.findOne({
            where: {
                product_name: productIdOrName
            }
          })
        }
        return product;
    }
}

export { UpdateProductService }