
// message.js
export function genMessage(code, message, data) {
  return {code, message, data};
}

export function genSuccessResponse(code, success, data) {
  return {success, code, data}
}

export function genErrorResponse(code, error, description) {
  const trace = new Error().stack.split("\n").map(e => e.trim());
  trace.splice(0, 2);
  return {error, code, description, trace}
}