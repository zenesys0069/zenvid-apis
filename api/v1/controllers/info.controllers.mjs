export const version = (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Successfully completed!',
    result: {
      version: 'v1.0.0',
    },
  })
}

export const software = (req, res) => {
  res.status(200).send({
    status: true,
    message: 'Successfully completed!',
    result: {
      host: req.get('host'),
      protocol: req.protocol,
      server: 'Express 4.x.x',
      environment: 'Node LTS 16.x.x',
      database: 'MongoDB 6.x.X',
    },
  })
}
