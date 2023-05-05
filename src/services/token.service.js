import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config()
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

const ACCESS_EXPIRATION = process.env.ACCESS_EXPIRATION
const REFRESH_EXPIRATION = process.env.REFRESH_EXPIRATION


export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}


export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

export function createAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, {expiresIn: ACCESS_EXPIRATION});
}

export function createRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET, {expiresIn: REFRESH_EXPIRATION});
}
