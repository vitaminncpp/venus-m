import bcrypt from "bcrypt";

const saltRounds = await bcrypt.genSalt(Number(process.env.SALT_FACTOR))


export async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds)
}

export async function comparePassword(password, pHash) {
  return await bcrypt.compare(password, pHash);
}