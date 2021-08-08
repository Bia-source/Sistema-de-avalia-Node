import { Router } from "express";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagService } from "./services/CreateTagService";
import { ensureAdmin } from './middlewares/ensureAdmin';
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticate } from "./middlewares/ensureAuthenticated";
import { ListUserReceiverComplimentsController } from "./controllers/ListUserReceiverComplimentsController";
import { ListUserSenderComplimentsController } from "./controllers/ListUserSenderComplimentsController";

const router = Router();
const userController = new CreateUserController();
const tagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const complimentController = new CreateComplimentController();
const listUserReceiverComplimentsController = new ListUserReceiverComplimentsController();
const listUserSenderComplimentsController = new ListUserSenderComplimentsController();

router.post("/users",  userController.handle);
router.post("/tags", ensureAuthenticate, ensureAdmin, tagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments",  ensureAuthenticate, complimentController.handle);
router.get("/users/compliments/sender", ensureAuthenticate, listUserSenderComplimentsController.handle);
router.get("/users/compliments/receiver", ensureAuthenticate, listUserReceiverComplimentsController.handle);


export { router }