import {genErrorResponse, genSuccessResponse} from "../utils/message.utils.js";
import {permission} from "../services/permission.service.js";
import {actions} from "../data/actions.data.js";
import * as userService from "../services/user.service.js";

export async function createUser(req, res) {
  try {
    const user = req.authData;
    const result = await permission(user.username, actions.createUser)
    if (result === true) {
      const {username, name, password, roles} = req.body;
      const data = await userService.saveUser(username, name, password, roles);
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

export async function test(req, res) {

}
