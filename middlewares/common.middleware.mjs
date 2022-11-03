export const logPayload = (req, res, next) => {
  console.log({
    body: req.body,
    params: req.params,
    query: req.query,
  })
  next()
}
