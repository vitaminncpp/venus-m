import dotenv from 'dotenv';
import * as userService from "../services/user.service.js"
import {genErrorResponse, genSuccessResponse} from "../utils/message.utils.js";

dotenv.config()

export async function profile(req, res) {
  const {username} = req.authData;
  const data = await userService.profile(username);
  return res.status(data.code).send(data)
}

export async function test(req, res) {
  return res.status(200).send(genSuccessResponse(200, "This is Just a Test from user Controller", null))
}

