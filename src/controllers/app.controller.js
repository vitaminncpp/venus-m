export async function statusCheck(req, res) {
  return res.status(200).send({success: "Everything works fine"})
}