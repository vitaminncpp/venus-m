import {Router} from "express";
import * as adminController from "../controllers/admin.controller.js"


const userControlRouter = Router();

userControlRouter.post("/create", adminController.createUser);
userControlRouter.delete("/remove", adminController.removeUser);

userControlRouter.post("/assignRole", adminController.assignRole);
userControlRouter.delete("/revokeRole", adminController.revokeRole);
export default userControlRouter;