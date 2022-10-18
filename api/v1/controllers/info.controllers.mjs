export const version = (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Successfully completed!',
    result: {
      version: 'v1.0.0',
    },
  })
}
