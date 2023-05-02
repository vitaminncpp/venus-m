import {findByUsername} from "../repository/user.repository.js";
import {genErrorResponse, genSuccessResponse} from "../utils/message.js";


export async function profile(username) {

  try {
    const user = await findByUsername(username);
    console.log(user)
    if (user) {
      return genSuccessResponse(200, "user info", {username: user.username, name: user.name})
    } else {
      return genErrorResponse(404, "user not found", {})
    }
  } catch (err) {
    return genErrorResponse(404, "user not found", err)
  }
}