import { getCustomRepository } from "typeorm";
import { Cupom } from "../../entities/Cupom";
import { Product } from "../../entities/Product";
import { CupomRepositories } from "../../repositories/CupomRepositories";
import { ProductRepositories } from "../../repositories/ProductRepositories";


class ChangePriceCupomService {
    //cupom pode ser tanto id, como nome
    async execute(productIdOrName: string, cupomIdOrName: string) {
        const cupomRepository = getCustomRepository(CupomRepositories);
        const productRepository = getCustomRepository(ProductRepositories);
        let filterProduct: Product;
        let product: Product;
        let filterCupom: Cupom;
        let cupom: Cupom;
       
        if(productIdOrName) {
            product = await productRepository.findOne({ id: productIdOrName });
        }

        if(productIdOrName && !product) {
            product = await productRepository.findOne({ product_name: productIdOrName });
        }

        if(cupomIdOrName) {
            cupom = await cupomRepository.findOne({ id_cupom: cupomIdOrName });
        }

         if(cupomIdOrName && !cupom) {
            cupom = await cupomRepository.findOne({ name_cupom: cupomIdOrName });
        }

        if(productIdOrName){
            filterProduct = await productRepository.findOne({ product_name: productIdOrName });
        }
        if(productIdOrName && !filterProduct){
            filterProduct = await productRepository.findOne({ id: productIdOrName });
        }

        if(cupomIdOrName){
            filterCupom = await cupomRepository.findOne({ name_cupom: cupomIdOrName });
        }
        if(cupomIdOrName && !filterProduct){
            filterCupom = await cupomRepository.findOne({ id_cupom: cupomIdOrName });
        }

        if(!cupom) {
            throw new Error ("Sem cupom");
        }
        if(!product) {
            throw new Error ("Sem produto");
        }
        const { value } = product;
        const { discount } = cupom;
        const valueDiscount = value / 100 * discount;
        const finalValue = value - valueDiscount;
        return {
            product: {
                id_product: product.id,
                name_product: product.product_name,
                category_product: product.product_category,
                value: finalValue
        } };
    }

    async applicationCupomCart(id_cupom: string, totalPrice: number): Promise<number> {
        const cupomRepository = getCustomRepository(CupomRepositories);
        let cupom: Cupom;
        cupom = await cupomRepository.findOne({ id_cupom: id_cupom });
        const { discount } = cupom;
        const valueDiscount = totalPrice / 100 * discount;
        const finalValue = totalPrice - valueDiscount;
        return finalValue;
    }
}

export { ChangePriceCupomService }