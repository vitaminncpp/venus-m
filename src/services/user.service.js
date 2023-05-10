import * as userRepository from "../repository/user.repository.js";
import {genErrorResponse, genSuccessResponse} from "../utils/message.utils.js";
import {hashPassword} from "./password.service.js";
import * as roleService from "./role.service.js";
import {getDefaultRoles} from "./role.service.js";
import {debugInfo} from "../utils/logger.utils.js";


export async function profile(username) {

  try {
    const user = await userRepository.findByUsername(username);
    if (user) {
      return genSuccessResponse(200, "user info", {username: user.username, name: user.name, roles: user.roles})
    } else {
      return genErrorResponse(404, "user not found", {})
    }
  } catch (err) {
    return genErrorResponse(404, "user not found", err)
  }
}
