import {Router} from "express";
import {statusCheck} from "../controllers/app.controller.js";

const appRoutes = Router();

appRoutes.get("/check", statusCheck)

export default appRoutes;