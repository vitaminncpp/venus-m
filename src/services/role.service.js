import * as roleRepository from "../repository/role.repository.js";
import {genErrorResponse, genSuccessResponse} from "../utils/message.utils.js";
import {actions} from "../data/actions.data.js";
import {findOne} from "../repository/role.repository.js";
import {debugInfo} from "../utils/logger.utils.js";
import {getDefaultRoles} from "../data/role.data.js";

export async function getRole(name) {
  try {
    const data = await roleRepository.findOne(name);
    if (data) {
      return {
        name: data.name,
        permissions: data.permissions,
        description: data.description,
      }
    } else return null
  } catch (err) {
    throw err;
  }
}

export async function getRoles() {
  try {
    const data = await roleRepository.findAll();
    if (data) {
      return data.map((e, i) => {
        return {
          index: i,
          name: e.name,
          permissions: e.permissions,
          description: e.description,
        }
      })
    } else return null;
  } catch (err) {
    throw err;
  }
}


export async function updateRole(name, permissions, description) {
  try {
    if (permissions) {
      for (let i = 0; i < permissions.length; i++) {
        if (!actions[permissions[i]]) {
          let err = new Error("Invalid permission");
          err.status = 400;
          throw err;
        }
      }
    }

    const role = await roleRepository.updateRole(name, permissions, description);
    if (!role) {
      let err = new Error("Internal server error");
      err.status = 500;
      throw err;
    }
    return {
      name: role.name,
      permissions: role.permissions,
      description: role.description
    }
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    err.status = 500;
    throw err;
  }
}


export async function createRole(name, permissions, description) {
  try {
    for (let i = 0; i < permissions.length; i++) {
      if (!actions[permissions[i]]) {
        let err = new Error(`Permission ${permissions[i]} is not valid`);
        err.status = 400;
        throw err;
      }
    }
    const role = await roleRepository.saveRole(name, permissions, description);
    if (!role) {
      let err = new Error(`Error creating role`);
      err.status = 500;
      throw err;
    }
    return {
      name: role.name,
      permissions: role.permissions,
      description: role.description
    };
  } catch (err) {
    throw err;
  }
}

export async function deleteRole(name) {
  try {
    const role = await roleRepository.deleteRole(name);
    if (!role) {
      let err = new Error(`Error deleting role`);
      err.status = 500;
      throw err;
    }
    return {name: role.name, permissions: role.permissions, description: role.description};
  } catch (err) {
    throw err;
  }
}


export async function roleExists(role) {
  if (getDefaultRoles().includes(role)) {
    return true;
  }
  const data = await findOne(role);
  return !!data;
}
