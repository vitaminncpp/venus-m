import * as roleService from "../services/role.service.js"
import {genErrorResponse, genSuccessResponse} from "../utils/message.utils.js";
import {permission} from "../services/permission.service.js";
import {actions} from "../data/actions.data.js";


export async function createRole(req, res) {
  try {
    const user = req.authData;
    const result = await permission(user.username, actions.createRole)
    if (result === false) {
      const data = genErrorResponse(403, "Forbidden", "you are not allowed to create role")
      return res.status(data.code).send(data)
    }
    const {name, permissions, description} = req.body;
    if (await roleService.roleExists(name)) {
      const data = genErrorResponse(409, "Already Exists", "Role already Exists")
      return res.status(data.code).send(data)
    }

    const role = await roleService.createRole(name, permissions, description)
    if (!role) {
      const data = genErrorResponse(500, "Internal server error", "Cant process your request")
      return res.status(data.code).send(data)
    }
    const data = genSuccessResponse(201, "Role created successfully", role)
    return res.status(data.code).send(data);
  } catch (err) {
    if (!err.status)
      err.status = 500;
    return res.status(err.status).send(genErrorResponse(err.status, err.message, err));
  }
}

export async function deleteRole(req, res) {
  try {
    const user = req.authData;
    const {rolename} = req.params;
    const result = await permission(user.username, actions.removeRole);

    if (result === false) {
      const data = genErrorResponse(403, "Forbidden", "you are not allowed to delete role")
      return res.status(data.code).send(data)
    }
    if (!await roleService.roleExists(rolename)) {
      const data = genErrorResponse(404, "Role does not exist", "Cant process your request")
      return res.status(data.code).send(data)
    }
    const role = await roleService.deleteRole(rolename);
    if (!role) {
      let err = new Error("Error deleting role");
      err.status = 500;
      throw err;
    }
    const data = genSuccessResponse(200, "Role deleted successfully", role)
    return res.status(data.code).send(data);
  } catch (err) {
    if (!err.status)
      err.status = 500;
    return res.status(err.status).send(genErrorResponse(err.status, err.message, err));
  }
}

export async function updateRole(req, res) {
  try {
    const user = req.authData;
    const result = await permission(user.username, actions.createRole)

    if (result === false) {
      const data = genErrorResponse(403, "Forbidden", "You cannot update role")
      return res.status(data.code).send(data)
    }
    const {rolename} = req.params;
    if (!await roleService.roleExists(rolename)) {
      const data = genErrorResponse(404, "Invalid Role", "Role does not exist")
      return res.status(data.code).send(data)
    }
    const {permissions, description} = req.body;
    const role = await roleService.updateRole(rolename, permissions, description)

    if (!role) {
      const data = genErrorResponse(500, "Internal server error", "Can't process your request")
      return res.status(data.code).send(data)
    }
    const data = genSuccessResponse(201, "Role updated successfully", role)
    return res.status(data.code).send(data);

  } catch (err) {
    if (!err.status)
      err.status = 500;
    return res.status(err.status).send(genErrorResponse(err.status, err.message, err));
  }
}


export async function getRole(req, res) {
  try {
    const user = req.authData;
    const result = await permission(user.username, actions.seeRole);
    if (result === false) {
      const data = genErrorResponse(403, "Forbidden", "You are not allowed to see Roles")
      return res.status(data.code).send(data)
    }

    const {rolename} = req.params;
    const role = await roleService.getRole(rolename);
    if (!role) {
      const data = genErrorResponse(404, "Role not found", "Role does not exists")
      return res.status(data.code).send(data)
    }
    const data = genSuccessResponse(200, "Role Data", role)
    return res.status(data.code).send(data)
  } catch (err) {
    return res.status(500).send(genErrorResponse(500, "Internal Server Error", err));
  }
}


export async function getRoles(req, res) {
  try {
    const user = req.authData;
    const result = await permission(user.username, actions.seeRole);
    if (result === false) {
      const data = genErrorResponse(403, "Forbidden", "You are not allowed to see Roles")
      return res.status(data.code).send(data)
    }


    const roles = await roleService.getRoles();
    if (!roles) {
      const data = genErrorResponse(404, "Role not found", "Role does not exists")
      return res.status(data.code).send(data)
    }
    const data = genSuccessResponse(200, "Role Data", roles)
    return res.status(data.code).send(data)
  } catch (err) {
    return res.status(500).send(genErrorResponse(500, "Internal Server Error", err));
  }
}
