import {getDefaultRoles} from "../data/role.data.js";
import {hashPassword} from "./password.service.js";
import * as userRepository from "../repository/user.repository.js";
import {genErrorResponse, genSuccessResponse} from "../utils/message.utils.js";
import {debugInfo} from "../utils/logger.utils.js";




export async function assignRoleToUser(username, role) {
  try {
    const data = await userRepository.addRoleToUser(username, role);
    debugInfo(data);
    if (data) {
      return genSuccessResponse(201, "Assigned Role to User", {
        username: data.username, roles: data.roles
      })
    }
  } catch (err) {
    return genErrorResponse(500, "Error Assigning Role to User", err);
  }
}

export async function revokeRoleFromUser(username, role) {
  try {
    const data = await userRepository.removeRoleFromUser(username, role);
    debugInfo(data);
    if (data) {
      return genSuccessResponse(200, "Revoked Role from User", {
        username: data.username, roles: data.roles
      })
    }
  } catch (err) {
    return genErrorResponse(500, "Error Revoking Role From User", err);
  }
}
