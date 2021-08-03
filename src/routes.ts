import { Router } from "express";
import { CreateUserController } from './controllers/CreateUserController';

const router = Router();
const userController = new CreateUserController();

router.post("/users", userController.handle);

export { router }