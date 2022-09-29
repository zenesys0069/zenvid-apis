import * as constants from './../constants/index.js'
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000)
}

export const getFullPath = (req, path) => {
  const protocol = req.protocol
  const host = req.get('host')

  const fullPath = `${protocol}://${host}${constants.STATIC_AVATAR}/${path}`
  return fullPath
}
