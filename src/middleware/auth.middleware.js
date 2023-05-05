import dotenv from "dotenv";
import {genErrorResponse} from "../utils/message.utils.js";
import {verifyAccessToken, verifyRefreshToken} from "../services/token.service.js";

dotenv.config();
export default function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      /**
       *
       * @type {
       *         access:String,
       *         refresh:String,
       *         user: {username: String, name: String, roles: [String]}
       *       }
       */
      req.authData = verifyAccessToken(token);
      next();
    } else {
      return res.status(401).send(genErrorResponse(401, "Unauthorized Access", "Token is invalid"))
    }
  } catch (err) {
    return res.status(401).send(genErrorResponse(401, "Unauthorized Access", err))
  }
}

export function authRefresh(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      req.refreshData = verifyRefreshToken(token);
      next();
    } else {
      return res.status(401).send(genErrorResponse(401, "Unauthorized Access", "Token is invalid"))
    }
  } catch (err) {
    return res.status(401).send(genErrorResponse(401, "Unauthorized Access", err))
  }
}