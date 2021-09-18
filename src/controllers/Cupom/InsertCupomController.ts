import { Request, Response } from "express";
import { ChangePriceCupomService } from "../../services/CupomService/ChangePriceCupomService";


class InsertCupomController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { productIdOrName, cupomIdOrName } = request.body;
        const cupomService = new ChangePriceCupomService();
        const applicationCupom = await cupomService.execute(productIdOrName, cupomIdOrName);
        return response.status(200).json({applicationCupom});
    }
}

export { InsertCupomController }