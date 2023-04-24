export function genError(error, code, description) {
  const trace = new Error().stack.split("\n").map(e => e.trim());
  trace.splice(0,2);
  return {error, code, description, trace}
}