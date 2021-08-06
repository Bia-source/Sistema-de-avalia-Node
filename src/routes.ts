import { Router } from "express";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagService } from "./services/CreateTagService";
import { ensureAdmin } from './middlewares/ensureAdmin';

const router = Router();
const userController = new CreateUserController();
const tagController = new CreateTagController();

router.post("/users",  userController.handle);
router.post("/tags", ensureAdmin, tagController.handle);

export { router }