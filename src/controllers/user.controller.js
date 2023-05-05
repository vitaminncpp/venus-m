import dotenv from 'dotenv';
import * as userService from "../services/user.service.js"

dotenv.config()

export async function profile(req, res) {
  const {username} = req.authData;
  const data = await userService.profile(username);
  return res.status(data.code).send(data)
}

