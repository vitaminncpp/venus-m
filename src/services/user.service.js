import * as userRepository from "../repository/user.repository.js";
import {getDefaultRoles} from "../data/role.data.js";
import {hashPassword} from "./password.service.js";

export async function getUser(username) {
  const user = await userRepository.findByUsername(username);
  if (user) {
    return {username: user.username, name: user.name, roles: user.roles}
  }
  return null;
}

export async function getUsers() {
  try {
    const users = await userRepository.findAll();
    if (users) {
      return users.map((user, index) => {
        return {index, username: user.username, name: user.name, roles: user.roles}
      })
    }
    return null;
  } catch (err) {
    throw err;
  }
}


export async function createUser(username, name, password, roles = getDefaultRoles()) {
  try {
    const pHash = await hashPassword(password);
    const user = await userRepository.createUser(username, name, pHash, roles)
    if (user) {
      return {username: user.username, name: user.name, roles: user.roles};
    } else return null;
  } catch (err) {
    throw err;
  }

}


export async function removeUser(username) {
  try {
    const user = await userRepository.removeUser(username);
    if (user) {
      return {username: user.username, name: user.name, roles: user.roles};
    } else return null;
  } catch (err) {
    throw err;
  }

}

export async function updateUser(username, name, password, roles) {
  try {
    let pHash = undefined;
    if (password) {
      pHash = hashPassword(password)
    }
    const user = await userRepository.updateUser(username, name, pHash, roles);
    if (user) {
      return {username: user.username, name: user.name, roles: user.roles};
    } else return null;
  } catch (err) {
    throw err;
  }
}

export async function assignRole(username, role) {
  try {
    const user = await userRepository.addRoleToUser(username, role)
    return {username: user.username, name: user.name, roles: user.roles}
  } catch (err) {
    throw err;
  }
}

export async function revokeRole(username, role) {
  try {
    const user = await userRepository.removeRoleFromUser(username, role)
    return {username: user.username, name: user.name, roles: user.roles}
  } catch (err) {
    throw err;
  }
}

export async function userExists(username) {
  try {
    return !!await userRepository.findByUsername(username);
  } catch (err) {
    throw err;
  }
}

export async function roleExistForUser(username, role) {
  try {
    const user = await userRepository.findByUsername(username);
    return user.roles.includes(role)
  } catch (err) {
    throw err;
  }
}