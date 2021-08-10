import { Router } from "express";
import { ComplimentByIdController } from "../controllers/Compliment/ComplimentByIdController";
import { CreateComplimentController } from "../controllers/Compliment/CreateComplimentController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const complimentRoute = Router();
const complimentController = new CreateComplimentController();
const complimentById = new ComplimentByIdController();

complimentRoute.post("/", ensureAuthenticate, complimentController.handle);
complimentRoute.get("/:id", complimentById.handle);

export { complimentRoute }