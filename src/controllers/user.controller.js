import dotenv from 'dotenv';
import * as userService from "../services/user.service.js"
import * as roleService from "../services/role.service.js"
import {genErrorResponse, genSuccessResponse} from "../utils/message.utils.js";
import {permission} from "../services/permission.service.js";
import {actions} from "../data/actions.data.js";


dotenv.config()

export async function getUsers(req, res) {
  try {
    const usersData = await userService.getUsers();
    if (usersData) {
      const data = genSuccessResponse(200, "User found", usersData);
      return res.status(data.code).send(data)
    } else {
      const data = genErrorResponse(404, "User found", "User are not found")
      return res.status(data.code).send(data)
    }
  } catch (err) {
    const data = genErrorResponse(500, "Internal Server Error", err)
    return res.status(data.code).send(data)
  }
}

export async function createUser(req, res) {
  try {
    const user = req.authData;
    const result = await permission(user.username, actions.createUser)

    if (result === false) {
      const data = genErrorResponse(403, "Forbidden", "You are not allowed to create new User")
      return res.status(data.code).send(data)
    }

    const {username, name, password} = req.body;
    const userCreated = await userService.createUser(username, name, password)

    if (!userCreated) {
      const data = genErrorResponse(500, "Error Creating user", `Cant Process your request`)
      return res.status(data.code).send(data)
    }

    const data = genSuccessResponse(201, "User Created", userCreated)
    return res.status(data.code).send(data)

  } catch (err) {
    const data = genErrorResponse(500, "Internal Server Error", err);
    return res.status(data.code).send(data)
  }
}


export async function removeUser(req, res) {
  try {
    const user = req.authData;
    const result = await permission(user.username, actions.removeUser)

    if (result === false) {
      const data = genErrorResponse(403, "Forbidden", "You are not allowed to Delete User")
      return res.status(data.code).send(data)
    }

    const {username} = req.params;
    const userDeleted = await userService.removeUser(username)

    if (!userDeleted) {
      const data = genErrorResponse(500, "Error Deleting user", `Cant Process your request`)
      return res.status(data.code).send(data)
    }

    const data = genSuccessResponse(201, "User Deleted", userDeleted)
    return res.status(data.code).send(data)

  } catch (err) {
    const data = genErrorResponse(500, "Internal Server Error", err);
    return res.status(data.code).send(data)
  }
}

export async function updateUser(req, res) {
  try {
    const user = req.authData;
    const result = await permission(user.username, actions.updateUser)

    if (result === false) {
      const data = genErrorResponse(403, "Forbidden", "You are not allowed to update user data")
      return res.status(data.code).send(data)
    }

    const {username} = req.params;
    const {name, password, roles} = req.body;
    const userUpdated = await userService.updateUser(username, name, password, roles)

    if (!userUpdated) {
      const data = genErrorResponse(500, "Error Updating user", `Cant Process your request`)
      return res.status(data.code).send(data)
    }

    const data = genSuccessResponse(201, "User Data Updated", userUpdated)
    return res.status(data.code).send(data)

  } catch (err) {
    const data = genErrorResponse(500, "Internal Server Error", err);
    return res.status(data.code).send(data)
  }
}

export async function getUser(req, res) {
  try {
    const {username} = req.params;
    const authData = req.authData;
    const result = authData.username === username || await permission(authData.username, actions.seeUsers)

    if (result === false) {
      const data = genErrorResponse(403, "Forbidden", "You are not allowed to see user data")
      return res.status(data.code).send(data)
    }

    const user = await userService.getUser(username)
    if (!user) {
      const data = genErrorResponse(500, "Error getting user info", `Cant Process your request`)
      return res.status(data.code).send(data)
    }

    const data = genSuccessResponse(201, "User Data", user)
    return res.status(data.code).send(data)

  } catch (err) {
    const data = genErrorResponse(500, "Internal Server Error", err);
    return res.status(data.code).send(data)
  }
}

export async function assignRole(req, res) {
  try {
    const {username, rolename} = req.params;
    const authData = req.authData;
    const result = await permission(authData.username, actions.assignRole)

    if (result === false) {
      const data = genErrorResponse(403, "Forbidden", "You are not allowed to assign Role to user")
      return res.status(data.code).send(data)
    }
    if (!await userService.userExists(username)) {
      const data = genErrorResponse(404, "User not found", "User does not exists")
      return res.status(data.code).send(data)
    }

    if (!await roleService.roleExists(rolename)) {
      const data = genErrorResponse(404, "Role not found", "Role does not exists")
      return res.status(data.code).send(data)
    }

    if (await userService.roleExistForUser(username, rolename)) {
      const data = genErrorResponse(409, "Already assigned", "Role already associated with user")
      return res.status(data.code).send(data)
    }

    const user = await userService.assignRole(username, rolename)
    if (!user) {
      const data = genErrorResponse(500, "Error assigning role", `Cant process your request`)
      return res.status(data.code).send(data)
    }

    const data = genSuccessResponse(201, "Role Assigned Successfully", user)
    return res.status(data.code).send(data)

  } catch (err) {
    const data = genErrorResponse(500, "Internal Server Error", err);
    return res.status(data.code).send(data)
  }
}

export async function revokeRole(req, res) {
  try {
    const {username, rolename} = req.params;
    const authData = req.authData;
    const result = await permission(authData.username, actions.revokeRole)

    if (result === false) {
      const data = genErrorResponse(403, "Forbidden", "You are not allowed to Revoke Role")
      return res.status(data.code).send(data)
    }
    if (!await userService.userExists(username)) {
      const data = genErrorResponse(404, "user not found", "User does not exists")
      return res.status(data.code).send(data)
    }

    if (!await userService.roleExistForUser(username, rolename)) {
      const data = genErrorResponse(409, "Role Never assigned", "Role is not assigned to user")
      return res.status(data.code).send(data)
    }

    const user = await userService.revokeRole(username, rolename)
    if (!user) {
      const data = genErrorResponse(500, "Error revoking role", `Cant process your request`)
      return res.status(data.code).send(data)
    }
    const data = genSuccessResponse(201, "Role revoked Successfully", user)
    return res.status(data.code).send(data)

  } catch (err) {
    const data = genErrorResponse(500, "Internal Server Error", err);
    return res.status(data.code).send(data)
  }
}