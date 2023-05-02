import dotenv from "dotenv";
import {genErrorResponse, genSuccessResponse} from "../utils/message.js";
import {verifyAccessToken} from "../services/token.service.js";

dotenv.config();
export default function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const data = verifyAccessToken(token);
      req.username = data.username;
      next();
    } else {
      return res.status(401).send(genErrorResponse(401, "Unauthorized Access", "Token is invalid"))
    }
  } catch (err) {
    return res.status(401).send(genErrorResponse(401, "Unauthorized Access", err))
  }
}

export function authRefresh(req, res, next) {

}