import dotenv from 'dotenv';
import {findByUsername, saveUser} from "../repository/user.repository.js";
import logger from "../utils/logger.js";
import {genErrorResponse, genSuccessResponse} from "../utils/message.js";
import {hashPassword} from "./password.service.js";
import {createAccessToken} from "./token.service.js";


export async function login(username, password) {
  try {
    const user = await findByUsername(username);
    if (user.username) {
      const access = createAccessToken({username});
      const refresh = createAccessToken({username});
      return genSuccessResponse(200, "Logged in successfully", {access, refresh})
    } else {
      return genErrorResponse(404, "user not found", {username})
    }

  } catch (err) {
    return genErrorResponse(404, "user not found", err);
  }
}

// user.service.js
export async function register(username, name, password) {
  const pHash = await hashPassword(password);
  try {
    const result = await saveUser(username, name, pHash)
    return genSuccessResponse(201, "user created successfully", {name: result.name, username: result.username});
  } catch (err) {
    return genErrorResponse(500, "error creating new user", err);
  }
}


