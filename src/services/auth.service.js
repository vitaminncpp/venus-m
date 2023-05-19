import * as userRepository from "../repository/user.repository.js";
import { genSuccessResponse} from '../utils/message.utils.js';
import {createAccessToken, createRefreshToken} from "./token.service.js";
import {comparePassword} from "./password.service.js";


export async function login(username, password) {
  try {
    const user = await userRepository.findByUsername(username);
    if (!user) {
      throw new Error("User not found")
    }
    if (!await comparePassword(password, user.pHash)) {
      throw new Error("Password does not match")
    }
    const access = createAccessToken({username: user.username, name: user.name});
    const refresh = createRefreshToken({username: user.username, name: user.name});
    return {
      access,
      refresh,
      user: {username: username, name: user.name, roles: user.roles}
    }
  } catch (err) {
    throw err;
  }
}

// user.service.js


export async function refresh(username) {
  const token = createAccessToken({username});
  return genSuccessResponse(201, "successfully refreshed", {token})
}
