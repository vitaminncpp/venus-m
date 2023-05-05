import {Router} from "express";
import * as roleController from "../controllers/role.controller.js"

const roleRouter = Router();

roleRouter.post("/create", roleController.createRole);


export default roleRouter;