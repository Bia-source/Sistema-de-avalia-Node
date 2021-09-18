import { Request, Response } from "express";
import { CreateCupomService } from "../../services/CupomService/CreateCupomService";


class CreateCupomController {
    async handle(request: Request, response: Response): Promise<Response> {
            const { name_cupom, discount } = request.body;
            const cupomService = new CreateCupomService();
            const cupom = await cupomService.execute({ name_cupom, discount });
            return response.status(201).json({ cupom: cupom });
    }
}

export { CreateCupomController }