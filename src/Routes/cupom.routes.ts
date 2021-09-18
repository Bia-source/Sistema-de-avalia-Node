import { Router } from "express";
import { CreateCupomController } from "../controllers/Cupom/CreateCupomController";
import { InsertCupomController } from "../controllers/Cupom/InsertCupomController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const cupomRoute = Router();
const createCupomController = new CreateCupomController()
const applicationCupom = new InsertCupomController();

cupomRoute.post("/", ensureAdmin, ensureAuthenticate, createCupomController.handle);
cupomRoute.post("/application", ensureAuthenticate, applicationCupom.handle);

export { cupomRoute }