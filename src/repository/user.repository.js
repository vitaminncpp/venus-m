import UserModel from "../models/user.model.js"

export async function findByUsername(username) {
  return UserModel.findOne({username});
}


// user.repository.js
export async function saveUser(username, name, pHash, roles) {
  const user = new UserModel({username, name, pHash, roles});
  return await user.save()
}