import { getCustomRepository } from "typeorm";
import { Cupom } from "../../entities/Cupom";
import { CupomRepositories } from "../../repositories/CupomRepositories";

interface IRequest{
    name_cupom: string;
    discount: number;
}

enum ErrorCupom{
    name_cupom = "Digite um nome de cupom valido",
    discount = "Digite um valor de desconto!",
    alreadyExist = "Este cupom já existe, tente alterar o nome do cupom",
    erroRegister = "Erro ao tentar cadastrar um novo cupom de desconto, tente novamente mais tarde",
    dontAdm = "Você não é administrador para registrar um novo cupom de desconto"
}

class CreateCupomService {
    async execute({ name_cupom, discount }: IRequest): Promise<Cupom> {
         
            const cupomRepository = getCustomRepository(CupomRepositories);
            const cupomAlreadyExist = await cupomRepository.findOne({
                name_cupom
            });
            this.validation(name_cupom, discount, cupomAlreadyExist);
            const newCupom = await cupomRepository.create({ name_cupom, discount });
            await cupomRepository.save(newCupom);
            return newCupom;
    }

    private validation(name_cupom: string, discount: number, cupomAlreadyExist: Cupom) {
        if(!name_cupom) {
            throw new Error (ErrorCupom.name_cupom);
        }

        if(!discount) {
            throw new Error (ErrorCupom.discount);
        }

        if(cupomAlreadyExist) {
            throw new Error (ErrorCupom.alreadyExist);
        }
    }
}

export { CreateCupomService }