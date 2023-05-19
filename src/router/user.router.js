/**
 *  Route Mapping for /api/user/*
 */

import {Router} from "express";
import * as userController from "../controllers/user.controller.js";
import auth from "../middleware/auth.middleware.js";


const userRouter = Router();

userRouter.use(auth)

// Assigns a role to user
userRouter.post("/:username/roles/:rolename", userController.assignRole)

// Revokes a role from the user
userRouter.delete("/:username/roles/:rolename", userController.revokeRole)

// Get user info
userRouter.get("/:username", userController.getUser)

// Update user info
userRouter.put("/:username", userController.updateUser)

// Delete User
userRouter.delete("/:username", userController.removeUser)

// Get All the users
userRouter.get("/", userController.getUsers)

// Creates a new user
userRouter.post("/", userController.createUser)
export default userRouter;
