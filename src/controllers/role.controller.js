import * as roleService from "../services/role.service.js"
import {genErrorResponse, genSuccessResponse} from "../utils/message.utils.js";
import {permission} from "../services/permission.service.js";
import {actions} from "../data/actions.data.js";


export async function createRole(req, res) {
  try {
    const user = req.authData;
    const result = await permission(user.username, actions.createRole)
    if (result === true) {
      const {name, description, permissions} = req.body;
      const data = await roleService.createRole(name, permissions, description);
      return res.status(data.code).send(data)
    } else if (result === false) {
      return res.status(403).send(genErrorResponse(403, "Forbidden", "You are not allowed to perform Role Creation."));
    } else {
      return res.status(result.code).send(result);
    }
  } catch (err) {
    return res.status(500).send(genErrorResponse(500, "Internal Server Error", err));
  }
}

export async function deleteRole(req, res) {
  try {
    const user = req.authData;
    const {name} = req.body;
    const result = await permission(user.username, actions.removeRole);
    if (result === true) {
      const data = await roleService.deleteRole(name);
      return res.status(data.code).send(data)
    } else if (result === false) {
      return res.status(403).send(genErrorResponse(403, "Forbidden", "You are not allowed to perform Role Deletion."));
    } else {
      return res.status(result.code).send(result);
    }
  } catch (err) {
    return res.status(500).send(genErrorResponse(500, "Internal Server Error", err));
  }
}

export async function updateRole(req, res) {
  try {
    const user = req.authData;
    const result = await permission(user.username, actions.createRole)
    if (result === true) {
      const {name, description, permissions} = req.body;
      const data = await roleService.updateRole(name, permissions, description);
      return res.status(data.code).send(data)
    } else if (result === false) {
      return res.status(403).send(genErrorResponse(403, "Forbidden", "You are not allowed to perform Role Creation."));
    } else {
      return res.status(result.code).send(result);
    }
  } catch (err) {
    return res.status(500).send(genErrorResponse(500, "Internal Server Error", err));
  }
}


export async function getRole(req, res) {
  try {
    const user = req.authData;
    const result = await permission(user.username, actions.seeRole)
    if (result === true) {
      const {name} = req.body;
      const data = await roleService.getRole(name);
      return res.status(data.code).send(data)
    } else if (result === false) {
      return res.status(403).send(genErrorResponse(403, "Forbidden", "You are not allowed to perform Role Creation."));
    } else {
      return res.status(result.code).send(result);
    }
  } catch (err) {
    return res.status(500).send(genErrorResponse(500, "Internal Server Error", err));
  }
}

export async function test(req, res) {
  return res.status(200).send(genSuccessResponse(200, "This is Just a Test from Role controller", null))
}

