import * as userRepository from "../repository/user.repository.js";
import * as roleRepository from "../repository/role.repository.js";

export async function permission(username, action) {
  const user = await userRepository.findByUsername(username);
  const actions = await roleRepository.findActionsByRoles(user.roles);
  return actions.includes("*") || actions.includes(action);
}
