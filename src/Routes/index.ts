import { Router } from "express";
import { complimentRoute } from "./compliment.routes";
import { listingRoute } from "./listings.routes";
import { tagRoutes } from "./tag.routes";
import { userRoute } from "./user.routes";

const router = Router();
router.use("/user", userRoute);
router.use("/listing", listingRoute);
router.use("/tag", tagRoutes);
router.use("/compliment", complimentRoute);

//const deleteUserController = new DeleteUserController();
// TODO ROUTE DELETE
// router.delete("/adm/user/delete", ensureAuthenticate, ensureAdmin, deleteUserController.handle);

export { router }