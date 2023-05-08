import RoleModel from "../models/role.model.js";
import {debugInfo} from "../utils/logger.utils.js";

export async function updateRole(name, permissions, description) {
  debugInfo({name, permissions, description})
  const role = await RoleModel.findOneAndUpdate(
    {name: name},
    {permissions: permissions, description: description},
    {new: true}
  ).exec();

  if (!role) {
    throw new Error(`Role '${name}' not found`);
  }
  return role;
}


export async function saveRole(name, permissions, description) {
  const role = new RoleModel({name, permissions, description})
  return await role.save();
}


export async function deleteRole(name) {
  const role = await RoleModel.findOne({name}).exec();
  if (!role) {
    throw new Error(`Role '${name}' not found`);
  }
  return RoleModel.findOneAndDelete({name}).exec();
}

export async function findActionsByRoles(roles) {
  const result = await RoleModel.find({name: {$in: roles}})
    .select("permissions")
    .exec();
  return result.flatMap(role => role.permissions);
}

export async function findOne(name) {
  return RoleModel.findOne({name});
}