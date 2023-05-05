/**
 *  Route Mapping for /api/user/*
 */

import {Router} from "express";
import {profile} from "../controllers/user.controller.js";
import auth from "../middleware/auth.middleware.js";


const userRouter = Router();

userRouter.use(auth)
userRouter.post("/profile", profile)

export default userRouter;