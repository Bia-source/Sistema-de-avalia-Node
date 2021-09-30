import { Router } from "express";
import { cartRoute } from "./cart.routes";
import { complimentRoute } from "./compliment.routes";
import { cupomRoute } from "./cupom.routes";
import { listingRoute } from "./listings.routes";
import { productRoute } from "./product.routes";
import { tagRoutes } from "./tag.routes";
import { userRoute } from "./user.routes";

const router = Router();
router.use("/user", userRoute);
router.use("/listing", listingRoute);
router.use("/tag", tagRoutes);
router.use("/compliment", complimentRoute);
router.use("/product", productRoute);
router.use("/cupom", cupomRoute);
router.use("/cart", cartRoute);

//const deleteUserController = new DeleteUserController();
// TODO ROUTE DELETE
// router.delete("/adm/user/delete", ensureAuthenticate, ensureAdmin, deleteUserController.handle);

export { router }