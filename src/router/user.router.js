import {Router} from "express";
import {login, profile} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js"

const userRouter = Router();


userRouter.post("/profile", authMiddleware, profile)


export default userRouter;