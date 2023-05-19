import dotenv from 'dotenv';
import * as authServices from "../services/auth.service.js"
import * as userService from "../services/user.service.js"
import {genErrorResponse, genSuccessResponse} from "../utils/message.utils.js";
import {test} from "../test/controller.test.js";

dotenv.config()

export async function login(req, res) {
  try {
    const {username, password} = req.body;
    const user = await authServices.login(username, password);
    const data = genSuccessResponse(200, "User Logged in successfully", user);
    return res.status(data.code).send(data)
  } catch (err) {
    const data = genErrorResponse(500, "Cannot Log in", err);
    return res.status(data.code).send(data)
  }
}

export async function register(req, res) {
  try {
    const {username, name, password} = req.body;
    const user = await userService.createUser(username, name, password);
    if (user) {
      const data = genSuccessResponse(201, "User Created Successfully", user);
      return res.status(data.code).send(data)
    } else {
      const data = genErrorResponse(400, "Can't Register", "Error While Registering User");
      return res.status(data.code).send(data);
    }
  } catch (err) {
    const data = genErrorResponse(500, "Internal Server Error", err)
    return res.status(data.code).send(data)
  }
}

export async function refresh(req, res) {
  try {
    const {username} = req.refreshData;
    const data = await authServices.refresh(username)
    return res.status(data.code).send(data)
  } catch (err) {

  }
}

export async function logout(req, res) {
  // TODO logout
  return test(req, res);
}