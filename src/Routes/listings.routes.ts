import { Router } from "express";
import { ListTagController } from "../controllers/Listings/ListTagController";
import { ListUserReceiverComplimentsController } from "../controllers/Listings/ListUserReceiverComplimentsController";
import { ListUsersByAdmController } from "../controllers/Listings/ListUsersByAdmController";
import { ListUsersController } from "../controllers/Listings/ListUsersController";
import { ListUserSenderComplimentsController } from "../controllers/Listings/ListUserSenderComplimentsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const listingRoute = Router();

const listUserReceiverComplimentsController = new ListUserReceiverComplimentsController();
const listUserSenderComplimentsController = new ListUserSenderComplimentsController();
const listTagController = new ListTagController();
const listUsersController = new ListUsersController();
const listUsersByAdmController = new ListUsersByAdmController();

listingRoute.get("/users/compliments/sender", ensureAuthenticate, listUserSenderComplimentsController.handle);
listingRoute.get("/users/compliments/receiver", ensureAuthenticate, listUserReceiverComplimentsController.handle);
listingRoute.get("/tags", listTagController.handle);
listingRoute.get("/users", ensureAuthenticate, ensureAdmin, listUsersController.handle);
listingRoute.get("/users/filter/adm", ensureAuthenticate, listUsersByAdmController.handle);
// EXEMPLO: http://localhost:3000/listing/users/compliments/sender


export { listingRoute };