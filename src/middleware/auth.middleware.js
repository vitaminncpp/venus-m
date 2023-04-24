import dotenv from "dotenv";
import {genError} from "../utils/error.js";

dotenv.config();
export default function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    if (token === process.env.JWT_SECRET) {
      next();
    } else {
      return res.status(401).send(genError("Unauthorized Access", 401, "Token is invalid"))
    }
  } catch (err) {
    return res.status(401).send(genError("Unauthorized Access", 401, err))
  }


}