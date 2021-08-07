import { Router } from "express";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagService } from "./services/CreateTagService";
import { ensureAdmin } from './middlewares/ensureAdmin';
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";

const router = Router();
const userController = new CreateUserController();
const tagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const complimentController = new CreateComplimentController();

router.post("/users",  userController.handle);
router.post("/tags", ensureAdmin, tagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments", complimentController.handle);

export { router }