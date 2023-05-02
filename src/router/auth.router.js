import {Router} from "express";
import * as authController from "../controllers/auth.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js"


const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.post("/refresh", authMiddleware.authRefresh, authController.createAccessToken);

export default authRouter;