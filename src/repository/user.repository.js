import UserModel from "../models/user.model.js"

export async function findByUsername(username) {
  return UserModel.findOne({username});
}


// user.repository.js
export async function saveUser(username, name, pHash, roles) {
  const user = new UserModel({username, name, pHash, roles});
  return await user.save()
}

export async function removeUser(username) {
  const user = await UserModel.findOne({username}).exec();
  if (!user) {
    throw new Error(`User '${username}' not found`);
  }
  return UserModel.findOneAndDelete({username}).exec();
}