import {genErrorResponse, genSuccessResponse} from "../utils/message.utils.js";
import {permission} from "../services/permission.service.js";
import {actions} from "../data/actions.data.js";
import * as adminServices from "../services/admin.services.js";

export async function createUser(req, res) {
  try {
    const user = req.authData;
    const result = await permission(user.username, actions.createUser)
    if (result === true) {
      const {username, name, password, roles} = req.body;
      const data = await adminServices.saveUser(username, name, password, roles);
      return res.status(data.code).send(data)
    } else if (result === false) {
      return res.status(403).send(genErrorResponse(403, "Forbidden", "You are not allowed to perform User Creation."));
    } else {
      return res.status(result.code).send(result);
    }
  } catch (err) {
    return res.status(500).send(genErrorResponse(500, "Internal Server Error", err));
  }
}

export async function removeUser(req, res) {
  try {
    const user = req.authData;
    const result = await permission(user.username, actions.createUser)
    if (result === true) {
      const {username} = req.body;
      const data = await adminServices.removeUser(username,);
      return res.status(data.code).send(data)
    } else if (result === false) {
      return res.status(403).send(genErrorResponse(403, "Forbidden", "You are not allowed to perform User Deletion."));
    } else {
      return res.status(result.code).send(result);
    }
  } catch (err) {
    return res.status(500).send(genErrorResponse(500, "Internal Server Error", err));
  }
}

export async function assignRole(req, res) {
  try {
    const user = req.authData;
    const result = await permission(user.username, actions.createUser)
    if (result === true) {
      const {username, role} = req.body;
      const data = await adminServices.removeUser(username,);
      return res.status(data.code).send(data)
    } else if (result === false) {
      return res.status(403).send(genErrorResponse(403, "Forbidden", "You are not allowed to perform User Deletion."));
    } else {
      return res.status(result.code).send(result);
    }
  } catch (err) {
    return res.status(500).send(genErrorResponse(500, "Internal Server Error", err));
  }
}

export async function revokeRole(req, res) {
  return test(req, res)
}


export async function test(req, res) {
  return res.status(200).send(genSuccessResponse(200, "This is Just a Test from user Controller", null))
}
