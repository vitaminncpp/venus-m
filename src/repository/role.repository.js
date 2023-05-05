import RoleModel from "../models/role.model.js";


export async function saveRole(name, permissions, description) {
  const role = new RoleModel({name, permissions, description})
  return await role.save();
}


export async function findActionsByRoles(roles) {
  const result = await RoleModel.find({name: {$in: roles}})
    .select("permissions")
    .exec();
  return result.flatMap(role => role.permissions);
}