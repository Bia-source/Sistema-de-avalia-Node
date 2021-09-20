import { Router } from "express";
import { CreateCupomController } from "../controllers/Cupom/CreateCupomController";
import { InsertCupomController } from "../controllers/Cupom/InsertCupomController";
import { UpdateCupomController } from "../controllers/Cupom/UpdateCupomController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const cupomRoute = Router();
const createCupomController = new CreateCupomController()
const applicationCupom = new InsertCupomController();
const updateCupomController = new UpdateCupomController();

cupomRoute.post("/", ensureAdmin, ensureAuthenticate, createCupomController.handle);
cupomRoute.post("/application", ensureAuthenticate, applicationCupom.handle);
cupomRoute.put("/update", ensureAdmin, ensureAuthenticate, updateCupomController.handle);

export { cupomRoute }