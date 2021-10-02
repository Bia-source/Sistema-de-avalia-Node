import { response } from "express";
import { getCustomRepository } from "typeorm";
import { Cart } from "../../entities/Cart";
import { Product } from "../../entities/Product";
import { CartRepositories } from "../../repositories/CartRepositories";
import { ProductRepositories } from "../../repositories/ProductRepositories";
import { ChangePriceCupomService } from "../CupomService/ChangePriceCupomService";

interface IItensRequest {
    product_name: string;
    product_category?: string;
    quantity_stock: number;
}
interface IRequest {
    itens: IItensRequest[];
    id_cupom?: string; 
}

interface IItem {
    id?: string;
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
    product_name?: string;
    quantity?: number;
}

class InsertProductCartService {
    async execute({itens, id_cupom}: IRequest) {
        const cartRepository = getCustomRepository(CartRepositories);
        const productRepository = getCustomRepository(ProductRepositories);
        const cart: IItem[] = [];
        let total: number = 0;
        let nameProduct: string[] = [];
        let returnCart; 
        const quantidade: UpdateStock[] = [];
        let id_cart: string;
        let productItem: any[] = [];
        let cartN;
        const productsPriceTotal: Product[] = [];
        
        itens.forEach(async product => {
            quantidade.push({
                product_name: product.product_name,
                quantity: product.quantity_stock,
            }); 

            nameProduct.push(product.product_name);

            let numberIndex = itens.indexOf(product);
            let getProduct = await productRepository.findOne({
                where: {
                    product_name: quantidade[numberIndex].product_name
                }
            });
            productItem.push(getProduct);

            // atualizando quantidade em estoque
            let newProductStock;

                 newProductStock = {
                    id: productItem[numberIndex].id,
                    product_name: productItem[numberIndex].product_name,
                    product_category: productItem[numberIndex].product_category,
                    quantity_stock: productItem[numberIndex].quantity_stock - quantidade[numberIndex].quantity
                 }
            console.log("newProductStock", newProductStock);
            await productRepository.update(productItem[numberIndex].id, newProductStock);
        });
        
        console.log("quantidade", quantidade);
        console.log("product_name", nameProduct);
        
        setTimeout(() => {
            console.log("productItem", productItem);
        },100)
       
     
        // itens.forEach(async (res) => {
        //     let numberItem = itens.indexOf(res);
        //     const newCart = {
        //         product_name: res.product_name,
        //         product_category: res.product_category,
        //         value: res.value
        //     }
        //     cart.push(newCart);
        //     total = total + res.value;
        //     nameProduct.push(res.product_name);
        //     });
        
        //     // criando carrinho 
        // if(id_cart) {
        //     console.log("entrei");
        //         const newCart = await cartRepository.create({
        //         value_total: total,
        //         itens: nameProduct[0],
        //         id_cupom: id_cupom
        //         });
        //         cartN = newCart;  
        //         id_cart = newCart.id;
        //         await cartRepository.save(newCart);
        //     }
    
        //     // adicionando novos produtos no carrinho
        //     itens.forEach(async (res) => {
        //         let numberItem = itens.indexOf(res);
        //         let alreadyExistProduct = nameProduct.find((product) => product === res.product_name);
        //         if(!alreadyExistProduct) {
        //             total = total + res.value;
        //             nameProduct.push(res.product_name);
        //         }
    
        //         const cartUpdate = {
        //             value_total: total,
        //             itens: nameProduct[numberItem],
        //             id_cupom: id_cupom
        //         };

        //         if(cartN.id && nameProduct.length > 0) {
        //             await cartRepository.update(cartN.id, cartUpdate);
        //         }
        //     });
        
        //     returnCart = {
        //         id: id_cart,
        //         itens: nameProduct,
        //         totalPrice: id_cupom ? await this.applicationCupom(id_cupom, total) : parseFloat(total.toFixed(2)),
        //         id_cupom: id_cupom || "Não possui"
        //     };

        // console.log("Total",total);
        // return returnCart;
    }

    private async getDataProduct(name: string) {
        const productRepository = getCustomRepository(ProductRepositories);
        const product = await productRepository.findOne({ product_name: name });
        return product.id;
    }

    private calculatorPrice(itens: Product[]): number{
        let priceTotal: number;
        let teste = itens.forEach((item) => {
           return priceTotal + item.value;
            //console.log("OSOSO", priceTotal);
        });
        
        return priceTotal;
    }

    private async applicationCupom(id_cupom: string, totalPrice:number): Promise<number>{
        const applicationCupom = new ChangePriceCupomService();
        const price = await applicationCupom.applicationCupomCart(id_cupom, totalPrice);
        return parseFloat(price.toFixed(2));
    }
}

export { InsertProductCartService }