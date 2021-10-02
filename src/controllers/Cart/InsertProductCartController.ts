import { Request, Response } from "express";
import { InsertProductCartService } from "../../services/CartService/InsertProductCartService";

class InsertProductCartController{
    async handle(request: Request, response: Response): Promise<Response>{
        const { itens, id_cupom } = request.body;
        try {
            const cartInsertService = new InsertProductCartService();
            const cart = await cartInsertService.execute({ itens, id_cupom });
            return response.json({ cart });
        } catch (error) {
            return response.status(400).json({ message: error });
        }
    }
}

export { InsertProductCartController }