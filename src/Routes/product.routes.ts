import { Router } from "express";
import { CreateProductController } from "../controllers/Product/CreateProductController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const productRoute = Router();
const createProductController = new CreateProductController();

productRoute.post("/", ensureAuthenticate, ensureAdmin, createProductController.handle);

export { productRoute }