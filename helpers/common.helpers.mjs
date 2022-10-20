export const getFullHost = (req) => {
  if (!req) return null
  return `${req.protocol}://${req.get('host')}`
}
