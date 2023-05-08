import {Router} from "express";
import roleRoutes from "./role.router.js"
import userControlRoutes from "./userControl.router.js";

const adminRouter = Router();
adminRouter.use("/user", userControlRoutes)
adminRouter.use("/role", roleRoutes)

export default adminRouter;