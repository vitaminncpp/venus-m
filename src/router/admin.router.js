import {Router} from "express";
import auth from "../middleware/auth.middleware.js";
import roleRoutes from "./role.router.js"

const adminRouter = Router();
adminRouter.use(auth)
adminRouter.use("/role", roleRoutes)

export default adminRouter;