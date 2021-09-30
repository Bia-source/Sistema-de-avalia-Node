import { response } from "express";
import { getCustomRepository } from "typeorm";
import { Cart } from "../../entities/Cart";
import { Product } from "../../entities/Product";
import { CartRepositories } from "../../repositories/CartRepositories";
import { ProductRepositories } from "../../repositories/ProductRepositories";

interface IRequest {
    itens: Product[];
    id_cupom?: string; 
}

interface IItem {
    id: string;
    product_name: string;
    product_category: string;
    value: number;
}

class InsertProductCartService {
    async execute({itens, id_cupom}: IRequest) {
        const cartRepository = getCustomRepository(CartRepositories);
        const productRepository = getCustomRepository(ProductRepositories);
        const cart: IItem[] = [];
        let total: number = 0;
        let nameProduct: string[] = [];
        itens.forEach(async (res) => {
            //let idProduct = await productRepository.findOne({ product_name: res.product_name });
            //console.log(idProduct)
            cart.push({
                id: "idProduct.id",
                product_name: res.product_name,
                product_category: res.product_category,
                value: res.value
            });
            total = total + res.value;
            nameProduct.push(res.product_name);
        });  
       
        console.log(total, cart);
        const cartN = await cartRepository.create({
            value_total: total,
            id_cupom: id_cupom
        });
        console.log("Cart",cartN);

    }

    private async getDataProduct(name: string) {
        const productRepository = getCustomRepository(ProductRepositories);
        const product = await productRepository.findOne({ product_name: name });
        return product.id;
    }
}

export { InsertProductCartService }