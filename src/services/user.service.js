import {findByUsername} from "../repository/user.repository.js";
import {genErrorResponse, genSuccessResponse} from "../utils/message.utils.js";


export async function profile(username) {

  try {
    const user = await findByUsername(username);
    if (user) {
      return genSuccessResponse(200, "user info", {username: user.username, name: user.name, roles: user.roles})
    } else {
      return genErrorResponse(404, "user not found", {})
    }
  } catch (err) {
    return genErrorResponse(404, "user not found", err)
  }
}