import { getCustomRepository } from "typeorm";
import { Product } from "../../entities/Product";
import { ProductRepositories } from "../../repositories/ProductRepositories";

interface IRequest{
    name: string;
    category: string;
    quantity_stock: number;
    value: number;
}

enum ErrorInsertProduct{
    nameInvalid = "Digite um nome de produto valido",
    categoryInvalid = "Digite uma categoria valida",
    errorRegister = "Erro ao efetuar o cadastro",
    productAlreadyExist = "Este produto já existe",
    dontAdm = "Você não pode adicionar um produto, porque não é Administrator!",
    dontValue = "Para salvar um novo produto é necessário definir um preço!"
}

class CreateProductService {
    async execute({name, category, quantity_stock, value}: IRequest): Promise<Product>{
        try {
            const productRepository = getCustomRepository(ProductRepositories);
            const productAlreadyExist = await productRepository.findOne({
               product_name: name
            });
    
            this.validation(name, category, productAlreadyExist, value);
            const newProduct = await productRepository.create({ product_name: name, product_category: category, quantity_stock, value });
            await productRepository.save(newProduct);
            return newProduct;
        } catch (error) {
            throw new Error(ErrorInsertProduct.errorRegister);
        }
    }

    private validation( name: string, category: string, productAlreadyExist:Product, value: number) {
        if(!name) {
              throw new Error(ErrorInsertProduct.nameInvalid);
            }

            if(!category) {
              throw new Error(ErrorInsertProduct.categoryInvalid);
            }

            if(productAlreadyExist) {
                throw new Error(ErrorInsertProduct.productAlreadyExist);
            }
        
            if(!value){
                throw new Error(ErrorInsertProduct.dontAdm);
            }
    }
}

export { CreateProductService }