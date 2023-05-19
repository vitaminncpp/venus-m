import UserModel from "../models/user.model.js"
import {getDefaultRoles} from "../data/role.data.js";

export async function findByUsername(username) {
  return UserModel.findOne({username});
}


// user.repository.js
export async function createUser(username, name, pHash, roles) {
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

export async function addRoleToUser(username, role) {

  return UserModel.findOneAndUpdate(
    {username: username},
    {$addToSet: {roles: role}},
    {new: true}
  );

}

export async function removeRoleFromUser(username, role) {
  return UserModel.findOneAndUpdate(
    {username: username},
    {$pull: {roles: role}},
    {new: true}
  );
}

export async function findAll() {
  return UserModel.find();
}

export async function updateUser(username, name, pHash, roles = getDefaultRoles()) {
  return UserModel.findOneAndUpdate(
    {username},
    {$set: {name, pHash, roles}},
    {new: true}
  );
}