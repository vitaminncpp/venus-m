import {Router} from "express";
import {login} from "../controllers/user.controller.js";


const authRouter = Router();

authRouter.post("/login", login);

export default authRouter;