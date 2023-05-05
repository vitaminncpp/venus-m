import * as userRepository from "../repository/user.repository.js";
import * as roleRepository from "../repository/role.repository.js";
import {genErrorResponse} from "../utils/message.utils.js";
import log, {debugInfo} from "../utils/logger.utils.js";

export async function permission(username, action) {

  try {
    const user = await userRepository.findByUsername(username);
    const actions = await roleRepository.findActionsByRoles(user.roles);
    return actions.includes("*") || actions.includes(action);
  } catch (err) {
    return genErrorResponse(501, "Can't Process your request", err);
  }
}
