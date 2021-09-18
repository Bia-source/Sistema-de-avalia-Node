import { Router } from "express";
import { LoginUserController } from "../controllers/User/LoginUserController";
import { CreateUserController } from "../controllers/User/CreateUserController";
import { UpdateStatAdminController } from "../controllers/User/UpdateStateAdminController";
import { UpdateUserController } from "../controllers/User/UpdateUserController";
import { UserSearchController } from "../controllers/User/UserSearchController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const userRoute = Router();
const userCreateController = new CreateUserController();
const loginUserController = new LoginUserController();
const userSearchController = new UserSearchController();
const updateUserController = new UpdateUserController();
const updateStateAdminController = new UpdateStatAdminController();

userRoute.post("/", userCreateController.handle);
userRoute.post("/login", loginUserController.handle);
userRoute.get("/filter/idOrName", ensureAuthenticate, userSearchController.handle);
userRoute.put("/", ensureAuthenticate, updateUserController.handle);
userRoute.patch("/adm/updateAdm", ensureAuthenticate, ensureAdmin, updateStateAdminController.handle);

// EXEMPLO: http://localhost:3000/user/adm/updateAdm

export { userRoute };