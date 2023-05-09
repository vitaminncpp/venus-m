import {findByUsername, saveUser} from "../repository/user.repository.js";
import {genErrorResponse, genSuccessResponse} from '../utils/message.utils.js';
import {hashPassword} from "./password.service.js";
import {createAccessToken, createRefreshToken} from "./token.service.js";
import * as roleService from "./role.service.js"


export async function login(username, password) {
  try {
    const user = await findByUsername(username);
    if (user.username) {
      const access = createAccessToken({username: user.username, name: user.name});
      const refresh = createRefreshToken({username: user.username, name: user.name});
      return genSuccessResponse(200, "Logged in successfully", {
        access,
        refresh,
        user: {username: username, name: user.name, roles: user.roles}
      })
    } else {
      return genErrorResponse(404, "user not found", {username})
    }

  } catch (err) {
    return genErrorResponse(404, "user not found", err);
  }
}

// user.service.js


export async function refresh(username) {
  const token = createAccessToken({username});
  return genSuccessResponse(201, "successfully refreshed", {token})
}
