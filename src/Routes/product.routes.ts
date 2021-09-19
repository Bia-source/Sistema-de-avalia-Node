import { Router } from "express";
import { CreateProductController } from "../controllers/Product/CreateProductController";
import { UpdateProductController } from "../controllers/Product/UpdateProductController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const productRoute = Router();
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();

productRoute.post("/", ensureAuthenticate, ensureAdmin, createProductController.handle);
productRoute.put("/update", ensureAuthenticate, ensureAdmin, updateProductController.handle);

export { productRoute }