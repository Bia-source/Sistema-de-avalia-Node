import { getCustomRepository } from "typeorm";
import { Cupom } from "../../entities/Cupom";
import { Product } from "../../entities/Product";
import { CupomRepositories } from "../../repositories/CupomRepositories";
import { ProductRepositories } from "../../repositories/ProductRepositories";


class ChangePriceCupomService {
    //cupom pode ser tanto id, como nome
    async execute(id_product: string, cupom: string) {
        const cupomRepository = getCustomRepository(CupomRepositories);
        const productRepository = getCustomRepository(ProductRepositories);
        const productAlreadyExist = await productRepository.findOne({ id: id_product });
        const cupomAlreadyExist = await cupomRepository.findOne({ id_cupom: cupom });
        if(!cupomAlreadyExist) {
            throw new Error ("Sem cupom");
        }
        if(!productAlreadyExist) {
            throw new Error ("Sem produto");
        }
        const { value } = productAlreadyExist;
        const { discount } = cupomAlreadyExist;
        const valueDiscount = value / 100 * discount;
        const finalValue = value - valueDiscount;
        console.log(finalValue);
        return {
            product: {
                id_product: productAlreadyExist.id,
                name_product: productAlreadyExist.product_name,
                category_product: productAlreadyExist.product_category,
                value: finalValue
        } };
    }
}

export { ChangePriceCupomService }