import {getDefaultRoles} from "./role.service.js";
import {hashPassword} from "./password.service.js";
import * as userRepository from "../repository/user.repository.js";
import {genErrorResponse, genSuccessResponse} from "../utils/message.utils.js";

export async function saveUser(username, name, password, roles = getDefaultRoles()) {
  const pHash = await hashPassword(password);
  try {
    const result = await userRepository.saveUser(username, name, pHash, roles)
    return genSuccessResponse(201, "user created successfully", {name: result.name, username: result.username});
  } catch (err) {
    return genErrorResponse(500, "error creating new user", err);
  }
}


export async function removeUser(username) {
  try {
    const data = await userRepository.removeUser(username);
    return genSuccessResponse(200, "User Removed Successfully", {
      username: data.username,
      name: data.name,
      roles: data.roles
    })
  } catch (err) {
    return genErrorResponse(500, "Error Removing User", err);
  }
}

export async function assignRoleToUser(role, username) {

}

export async function revokeRoleFromUser(role, username) {

}
