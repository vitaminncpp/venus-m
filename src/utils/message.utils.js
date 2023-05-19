// message.js
import {debugInfo} from "./logger.utils.js";

export function genMessage(code, message, data) {
  return {code, message, data};
}

export function genSuccessResponse(code, success, data) {
  return {success, code, data}
}

export function genErrorResponse(code, error, err) {
  const trace = new Error().stack.split("\n").splice(2).map(e => e.trim());
  let description = err;
  if (typeof err !== "string") {
    try {
      description = {
        message: err.message,
        fileName: err.fileName,
        lineNumber: err.lineNumber,
        stack: err.stack.split("\n").splice(1).map((e) => e.trim())
      }
    } catch (err) {
      description = err.toString();
    }
  }
  return {code, error, description, trace}
}