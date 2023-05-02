import dotenv from 'dotenv';
import * as authServices from "../services/auth.service.js"

dotenv.config()

export async function login(req, res) {
  const {username, password} = req.body;
  const data = await authServices.login(username, password);
  return res.status(data.code).send(data)
}

// user.controller.js
export async function register(req, res) {
  const {username, name, password} = req.body;
  const data = await authServices.register(username, name, password);
  return res.status(data.code).send(data);
}

export async function createAccessToken(req, res) {
  return res.send("test")
}