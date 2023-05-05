import {saveRole} from "../repository/role.repository.js";
import {genErrorResponse, genSuccessResponse} from "../utils/message.utils.js";
import {actions} from "../data/actions.data.js";
import {debugInfo} from "../utils/logger.utils.js";

export async function createRole(name, permissions, description) {
  try {

    for (let i = 0; i < permissions.length; i++) {
      if (!actions[permissions[i]]) {
        return genErrorResponse(400, "Invalid Permission", `Invalid Permission: ${permissions[i]}`);
      }
    }
    const role = await saveRole(name, permissions, description);
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

}


export function getDefaultRoles() {
  return ["user"];
}