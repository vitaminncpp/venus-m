import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config()
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET


export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}


export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

export function createAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, {expiresIn: "2h"});
}

export function createRefreshToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, {expiresIn: "7d"});
}
