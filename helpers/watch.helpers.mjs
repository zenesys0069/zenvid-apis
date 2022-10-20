import * as constants from '../constants/index.mjs'

export const getWatchFullPath = (path) => {
  if (!path) return null
  return `${constants.STATIC_WATCH}/${path}`
}
