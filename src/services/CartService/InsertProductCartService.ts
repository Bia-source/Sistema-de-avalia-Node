import { getCustomRepository } from "typeorm";
import { Cart } from "../../entities/Cart";
import { Product } from "../../entities/Product";
import { CartRepositories } from "../../repositories/CartRepositories";

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
        let cart: IItem;
       
        let insertCart = itens.forEach((res) => {
            cart = {
                id: res.id,
                product_name: res.product_name,
                product_category: res.product_category,
                value: res.value
            };
        });
       
        console.log(insertCart);

        const cartN = await cartRepository.create({
            
        })

    }
}

export { InsertProductCartService }