import { Request, Response } from "express";
import { CreateProductService } from "../../services/ProductService/CreateProductService";

class CreateProductController {
    async handle(request: Request, response: Response): Promise<Response>{
        try {
            const { name, category, quantity_stock, value } = request.body;
            const productService = new CreateProductService();
            const product = await productService.execute({ name, category, quantity_stock, value });
            return response.status(201).json({ product: product });
        } catch (error) {
            return response.json({ message: error.message });
        }
    }
}

export { CreateProductController }