// message.js
export function genMessage(code, message, data) {
  return {code, message, data};
}

export function genSuccessResponse(code, success, data) {
  return {success, code, data}
}

export function genErrorResponse(code, error, err) {
  const trace = new Error().stack.split("\n").map(e => e.trim());
  trace.splice(0, 2);
  let description = err;
  if (typeof err !== "string") {
    try {
      description = {
        message: err.message,
        fileName: err.fileName,
        lineNumber: err.lineNumber,
        stack: err.stack.split("\n").map((e) => e.trim())
      }
    } catch (err) {
      description = err;
    }
  }
  return {error, code, description, trace}
}