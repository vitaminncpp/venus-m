/**
 *  Route Mapping for /api/user/*
 */

import {Router} from "express";
import * as userController from "../controllers/user.controller.js";


const userRouter = Router();

userRouter.post("/profile", userController.profile)

// TODO Implements controllers
userRouter.post("/book", userController.test)
userRouter.post("/modifyBooking", userController.test)
userRouter.post("/cancelBooking", userController.test)

export default userRouter;