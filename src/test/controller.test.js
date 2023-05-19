import {genErrorResponse} from "../utils/message.utils.js";


export async function test(req, res) {
  return res.status(200).send(genErrorResponse(200, "This is Just a Test", new Error()))
}