import {Router} from "express";
import * as roleController from "../controllers/role.controller.js"
import {test} from "../test/controller.test.js";
import auth from "../middleware/auth.middleware.js";

const roleRouter = Router();

roleRouter.use(auth)

// Delete Permission
roleRouter.delete("/:rolename/permissions/:permission", test)

// Add Permission to Role
roleRouter.post("/:rolename/permissions", test);

// Delete Role
roleRouter.delete("/:rolename", roleController.deleteRole);

// Update a Role
roleRouter.put("/:rolename", roleController.updateRole);

// Get Role info
roleRouter.get("/:rolename", roleController.getRole);

// Get All roles
roleRouter.get("/", roleController.getRoles);

// Creates a new Role
roleRouter.post("/", roleController.createRole)

export default roleRouter;