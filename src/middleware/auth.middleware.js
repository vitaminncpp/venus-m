import dotenv from "dotenv";
import {genErrorResponse} from "../utils/message.utils.js";
import {verifyAccessToken, verifyRefreshToken} from "../services/token.service.js";
import {debugInfo} from "../utils/logger.utils.js";

dotenv.config();
export default function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      /**
       *
       * @type {
       *   user:
       *   {
       *      username: String,
       *      name: String
       *    }
       * }
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