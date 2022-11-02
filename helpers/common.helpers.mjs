export const getFullHost = (req) => {
  if (!req) return null
  return `${req.protocol}://${req.get('host')}`
}

export const errorHandler = (res, statusCode, message, information) =>
  res.status(statusCode || 500).json({
    status: false,
    message: message || 'Please try again!',
    result: information || {},
  })

export const successHandler = (res, statusCode, message, information) =>
  res.status(statusCode || 200).json({
    status: true,
    message: message || 'Successful!',
    result: information || {},
  })
