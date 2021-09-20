import { getCustomRepository } from "typeorm";
import { Cupom } from "../../entities/Cupom";
import { CupomRepositories } from "../../repositories/CupomRepositories";

 
interface IRequest{
    cupomIdOrName?: string;
    discount?: number;
    name_cupom?: string;
}

class UpdateCupomService {
    async execute({discount,name_cupom, cupomIdOrName: cupomIdOrName}: IRequest): Promise<Cupom> {
        const cupomRepository = getCustomRepository(CupomRepositories);
        let cupom: Cupom;
        if(cupomIdOrName) { 
            cupom = await cupomRepository.findOne({
                where: {
                    id_cupom: cupomIdOrName
                }
            });
        }

        if(cupomIdOrName && !cupom) {
            cupom = await cupomRepository.findOne({
                where: {
                    name_cupom: cupomIdOrName
                }
            });
        }

        let updateCupom: Cupom = {
            id_cupom: cupom.id_cupom,
            discount: discount || cupom.discount,
            name_cupom: name_cupom || cupom.name_cupom
        }

        await cupomRepository.update(cupom.id_cupom, updateCupom);
        const newCupom = await cupomRepository.findOne(cupom.id_cupom);
        return newCupom;
    }
}

export { UpdateCupomService }