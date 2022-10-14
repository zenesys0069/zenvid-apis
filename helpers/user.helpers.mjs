import * as constants from '../constants/index.mjs'
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000)
}

export const getFullPath = (req, path) => {
  const protocol = req.protocol
  const host = req.get('host')
  if (!path) return null
  const fullPath = `${protocol}://${host}${constants.STATIC_AVATAR}/${path}`
  return fullPath
}
