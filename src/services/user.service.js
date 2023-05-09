import * as userRepository from "../repository/user.repository.js";
import {genErrorResponse, genSuccessResponse} from "../utils/message.utils.js";
import {hashPassword} from "./password.service.js";
import * as roleService from "./role.service.js";
import {getDefaultRoles} from "./role.service.js";


export async function profile(username) {

  try {
    const user = await findByUsername(username);
    if (user) {
      return genSuccessResponse(200, "user info", {username: user.username, name: user.name, roles: user.roles})
    } else {
      return genErrorResponse(404, "user not found", {})
    }
  } catch (err) {
    return genErrorResponse(404, "user not found", err)
  }
}

export async function saveUser(username, name, password, roles = getDefaultRoles()) {
  const pHash = await hashPassword(password);
  try {
    const result = await userRepository.saveUser(username, name, pHash, roles)
    return genSuccessResponse(201, "user created successfully", {name: result.name, username: result.username});
  } catch (err) {
    return genErrorResponse(500, "error creating new user", err);
  }
}