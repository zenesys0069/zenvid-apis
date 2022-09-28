// upload watch / video controller
export const upload = (req, res) => {
  // handle chunk upload
  res.status(200).json({
    status: true,
    message: 'Successfully Posted',
  })
}
