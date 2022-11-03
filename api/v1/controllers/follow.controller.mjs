export const start = (req, res) => {
  res.status(200).json({
    message: 'Started following',
  })
}

export const stop = (req, res) => {
  res.status(200).json({
    message: 'Stopped following',
  })
}
