import { Request, Response } from "express";
import { UpdateProductService } from "../../services/ProductService/UpdateProductService";

class UpdateProductController {
    async handle(request: Request, response: Response): Promise<Response>{
        const { productIdOrName,
                product_name,
                product_category,
                quantity_stock,
                value
             } = request.body;
        const updateProductService = new UpdateProductService();
        const updateProduct = await updateProductService.execute({
            productIdOrName, productParam: {
                product_name,
                product_category,
                quantity_stock,
                value
            }
        });
        return response.status(200).json({ product: updateProduct });
    }
}

export { UpdateProductController }