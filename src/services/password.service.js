import bcrypt from "bcrypt";
import {debugInfo} from "../utils/logger.utils.js";

const saltRounds = await bcrypt.genSalt(Number(process.env.SALT_FACTOR))


export async function hashPassword(password) {
  debugInfo(password)
  return await bcrypt.hash(password, saltRounds)
}

export async function comparePassword(password, pHash) {
  return await bcrypt.compare(password, pHash);
}