import { Router } from "express";
import { InsertProductCartController } from "../controllers/Cart/InsertProductCartController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const cartRoute = Router();

const insertController = new InsertProductCartController();

cartRoute.post("/", ensureAuthenticate, insertController.handle);

export { cartRoute }