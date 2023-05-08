import {Router} from "express";
import * as roleController from "../controllers/role.controller.js"

const roleRouter = Router();

roleRouter.post("/create", roleController.createRole);
roleRouter.delete("/delete", roleController.deleteRole);
roleRouter.put("/update", roleController.updateRole);
roleRouter.post("/get", roleController.getRole);

export default roleRouter;