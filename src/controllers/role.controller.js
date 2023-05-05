import * as roleService from "../services/role.service.js"
import {genErrorResponse} from "../utils/message.utils.js";
import {permission} from "../services/permission.service.js";
import {actions} from "../data/actions.data.js";
import {debugInfo} from "../utils/logger.utils.js";

export async function createRole(req, res) {
  try {
    const user = req.authData;
    const result = await permission(user.username, actions.createRole)
    if (result === true) {
      const {name, description, permissions} = req.body;
      const data = await roleService.createRole(name, permissions, description);
      return res.status(data.code).send(data)
    } else {
      return res.status(403).send(genErrorResponse(403, "Forbidden", "You are not allowed to perform this actions."));
    }

  } catch (err) {
    return res.status(500).send(genErrorResponse(500, "Internal Server Error", err));
  }
}