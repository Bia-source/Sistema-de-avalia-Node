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

interface ICart {
    id: string;
    itens: string[];
    totalPrice: number;
    id_cupom: string;
}

interface UpdateStock {
    quantity: number;
}

class InsertProductCartService {
    async execute({itens, id_cupom}: IRequest) {
        const cartRepository = getCustomRepository(CartRepositories);
        const productRepository = getCustomRepository(ProductRepositories);
        const cart: IItem[] = [];
        let total: number = 0;
        let nameProduct: string[] = [];
        let ids: string[] = [];
        let returnCart: ICart; 
        let quantidade: UpdateStock;
        
        itens.forEach(async (product) => {
            let product_id = await productRepository.findOne({ product_name: product.product_name });
            ids.push(product_id.id);
            quantidade = {
                quantity: product.quantity_stock
            }

            // atualizando quantidade em estoque
            let updateProduct = await productRepository.findOne({
                where: {
                    id: product_id.id
                }
            });
            
                let newProductStock;

                 newProductStock = {
                    id: updateProduct.id,
                    product_name: updateProduct.product_name,
                    product_category: updateProduct.product_category,
                    quantity_stock: updateProduct.quantity_stock - quantidade.quantity
                 }
            await productRepository.update(product_id.id, newProductStock);
        });
        
        setTimeout(async () => {
            itens.forEach(async (res) => {
                let numberItem = itens.indexOf(res);
                const newCart = {
                    id: ids[numberItem],
                    product_name: res.product_name,
                    product_category: res.product_category,
                    value: res.value
                }
                cart.push(newCart);
                total = total + res.value;
                nameProduct.push(res.product_name);
            
            });
    
            console.log(total, cart);
        
            // criando carrinho 
            const cartN = await cartRepository.create({
                value_total: total,
                itens: nameProduct[0],
                id_cupom: id_cupom
            });
            
            await cartRepository.save(cartN);
        
           
            // adicionando novos produtos no carrinho
            itens.forEach(async (res) => {
                let numberItem = itens.indexOf(res);
                let alreadyExistProduct = nameProduct.find((product) => product === res.product_name);
                if(!alreadyExistProduct) {
                    total = total + res.value;
                    nameProduct.push(res.product_name);
                }
    
                const cartUpdate = {
                    value_total: total,
                    itens: nameProduct[numberItem],
                    id_cupom: id_cupom
                };

                if(cartN.id && nameProduct.length > 0) {
                    await cartRepository.update(cartN.id, cartUpdate);
                }
            });
            returnCart = {
                id: cartN.id,
                itens: nameProduct,
                totalPrice: total,
                id_cupom: id_cupom || "Não possui"
            }
            //console.log(returnCart);
        }, 200);
        console.log(returnCart);
        return "ola";
    }

    private async getDataProduct(name: string) {
        const productRepository = getCustomRepository(ProductRepositories);
        const product = await productRepository.findOne({ product_name: name });
        return product.id;
    }
}

export { InsertProductCartService }