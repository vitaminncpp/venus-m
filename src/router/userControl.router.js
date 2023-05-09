import {Router} from "express";
import auth from "../middleware/auth.middleware.js";
import * as adminController from "../controllers/admin.controller.js"


const userControlRouter = Router();

userControlRouter.post("/create", adminController.createUser);
export default userControlRouter;