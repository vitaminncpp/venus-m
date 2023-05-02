import dotenv from 'dotenv';
import {genSuccessResponse} from "../utils/message.js";
import * as userService from "../services/user.service.js"

dotenv.config()

export async function profile(req, res) {
  const data = await userService.profile(req.username);
  return res.status(data.code).send(data)

}

