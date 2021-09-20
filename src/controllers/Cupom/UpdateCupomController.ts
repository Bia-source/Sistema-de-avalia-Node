import { Request, Response } from "express";
import { UpdateCupomService } from "../../services/CupomService/UpdateCupomService";

class UpdateCupomController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { discount, name_cupom, cupomIdOrName } = request.body;
        const updateCupomService = new UpdateCupomService();
        const cupom = await updateCupomService.execute({ discount, name_cupom, cupomIdOrName });
        return response.status(200).json({ cupom: cupom });
    }
}

export { UpdateCupomController }