export const register = (req, res) => {
  res.status(201).json(req.body)
}

export const login = (req, res) => {
  res.status(200).json(req.body)
}
