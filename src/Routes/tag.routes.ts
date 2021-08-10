import { Router } from "express";
import { CreateTagController } from "../controllers/Tag/CreateTagController";
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const tagRoutes = Router();
const tagController = new CreateTagController();

tagRoutes.post("/", ensureAuthenticate, ensureAdmin, tagController.handle);

export { tagRoutes };