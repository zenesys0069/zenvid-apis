import * as constants from '../constants/index.mjs'
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000)
}

export const getPictureFullPath = (path) => {
  if (!path) return null
  return `${constants.STATIC_AVATAR}/${path}`
}
