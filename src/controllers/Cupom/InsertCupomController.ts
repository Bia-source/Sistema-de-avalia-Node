import { Request, Response } from "express";
import { ChangePriceCupomService } from "../../services/CupomService/ChangePriceCupomService";


class InsertCupomController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id_product, id_cupom } = request.body;
        const cupomService = new ChangePriceCupomService();
        const applicationCupom = await cupomService.execute(id_product, id_cupom);
        return response.status(200).json({applicationCupom});
    }
}

export { InsertCupomController }