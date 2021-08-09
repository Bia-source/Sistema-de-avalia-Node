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
import { ListTagController } from "./controllers/ListTagController";
import { ComplimentByIdController } from "./controllers/ComplimentByIdController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUsersByAdmController } from "./controllers/ListUsersByAdmController";


const router = Router();
const userController = new CreateUserController();
const tagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const complimentController = new CreateComplimentController();
const listUserReceiverComplimentsController = new ListUserReceiverComplimentsController();
const listUserSenderComplimentsController = new ListUserSenderComplimentsController();
const listTagController = new ListTagController();
const complimentById = new ComplimentByIdController();
const listUsersController = new ListUsersController();
const listUsersByAdmController = new ListUsersByAdmController();

router.post("/users",  userController.handle);
router.post("/tags", ensureAuthenticate, ensureAdmin, tagController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments",  ensureAuthenticate, complimentController.handle);
router.get("/users/compliments/sender", ensureAuthenticate, listUserSenderComplimentsController.handle);
router.get("/users/compliments/receiver", ensureAuthenticate, listUserReceiverComplimentsController.handle);
router.get("/tags/all", listTagController.handle);
router.get("/users/compliment/:id", complimentById.handle);
router.get("/users", ensureAuthenticate, ensureAdmin, listUsersController.handle);
router.get("/users/filter/adm", ensureAuthenticate, ensureAdmin, listUsersByAdmController.handle);

export { router }