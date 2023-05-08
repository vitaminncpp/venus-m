/**
 *  Route Mapping for /api/user/*
 */

import {Router} from "express";
import * as userController from "../controllers/user.controller.js";
import auth from "../middleware/auth.middleware.js";


const userRouter = Router();

userRouter.use(auth)
userRouter.post("/profile", userController.profile)

// TODO Implements controllers
userRouter.post("/book", userController.test)
userRouter.post("/modifyBooking", userController.test)
userRouter.post("/cancelBooking", userController.test)

export default userRouter;