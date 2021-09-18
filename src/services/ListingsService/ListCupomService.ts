import { getCustomRepository } from "typeorm";
import { Cupom } from "../../entities/Cupom";
import { CupomRepositories } from "../../repositories/CupomRepositories";


class ListCupomService {
    async listAllCupons(): Promise<Cupom[]> {
        const cupomRepository = getCustomRepository(CupomRepositories);
        const listCupons = await cupomRepository.find();
        return listCupons;
    }

    async listCuponsByDiscount(value_discount: number): Promise<Cupom[]>{
        const cupomRepository = getCustomRepository(CupomRepositories);
        const listCupons = await cupomRepository.find({ discount: value_discount });
        return listCupons
    }
    
    async searchCupomByName(name_discount: string): Promise<Cupom>{
        const cupomRepository = getCustomRepository(CupomRepositories);
        const cupom = await cupomRepository.findOne({ name_cupom: name_discount });
        return cupom;
    }

}

export { ListCupomService }