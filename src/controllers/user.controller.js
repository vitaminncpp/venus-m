import dotenv from 'dotenv';


dotenv.config()

export async function login(req, res) {
  const token = process.env.JWT_SECRET;
  res.status(200).send({success: "Login successful", token})
}


export async function profile(req, res) {
  res.status(200).send({info: "User Profile"})
}