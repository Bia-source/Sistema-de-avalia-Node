import { Request, Response } from "express";
import { InsertProductCartService } from "../../services/CartService/InsertProductCartService";

class InsertProductCartController{
    async handle(request: Request, response: Response): Promise<Response>{
        const { itens, id_cupom } = request.body;
        const cartInsertService = new InsertProductCartService();
        const cart = await cartInsertService.execute({ itens, id_cupom });
        console.log("INSERT ",cart);
        return response.json({ cart });
    }
}

export { InsertProductCartController }