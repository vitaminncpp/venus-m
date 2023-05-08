import * as roleRepository from "../repository/role.repository.js";
import {genErrorResponse, genSuccessResponse} from "../utils/message.utils.js";
import {actions} from "../data/actions.data.js";

export async function getRole(name) {
  try {
    const data = await roleRepository.findOne(name);
    if (data) {
      return genSuccessResponse(201, "Role Fetched successfully", {
        name: data.name,
        permissions: data.permissions,
        description: data.description,
      })
    } else {
      return genErrorResponse(404, `Role '${name}' not found`, "There is no such role defined");
    }
  } catch (err) {
    return genErrorResponse(500, "Error Fetching Role Data", err)
  }
}


export async function updateRole(name, permissions, description) {
  try {
    try {
      for (let i = 0; i < permissions.length; i++) {
        if (!actions[permissions[i]]) {
          return genErrorResponse(400, "Invalid Permission", `Invalid Permission: ${permissions[i]}`);
        }
      }
    } catch (err) {
      permissions = undefined;
    }
    const role = await roleRepository.updateRole(name, permissions, description);
    return genSuccessResponse(201, "Role Updated successfully", {
      name: role.name,
      permissions: role.permissions,
      description: role.description
    })
  } catch (err) {
    return genErrorResponse(500, "Error Updating Role", err)
  }
}


export async function createRole(name, permissions, description) {
  try {
    for (let i = 0; i < permissions.length; i++) {
      if (!actions[permissions[i]]) {
        return genErrorResponse(400, "Invalid Permission", `Invalid Permission: ${permissions[i]}`);
      }
    }
    const role = await roleRepository.saveRole(name, permissions, description);
    return genSuccessResponse(201, "Role Created successfully", {
      name: role.name,
      permissions: role.permissions,
      description: role.description
    })
  } catch (err) {
    return genErrorResponse(500, "Error creating Role", err)
  }
}

export async function deleteRole(name) {
  try {
    const result = await roleRepository.deleteRole(name);
    return genSuccessResponse(200, "Role Deleted Successfully", result);
  } catch (err) {
    return genErrorResponse(500, "Error deleting Role", err)
  }
}


export function getDefaultRoles() {
  return ["user"];
}