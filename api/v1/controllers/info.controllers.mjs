import os from 'os'
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
      server: 'Express 4.x.x',
      environment: 'Node LTS 16.x.x',
      database: 'MongoDB 6.x.X',
    },
  })
}

export const hardware = (req, res) => {
  res.status(200).send({
    status: true,
    message: 'Successfully completed!',
    result: {
      os: {
        type: os.type(),
        release: os.release(),
        platform: os.platform(),
      },
      cpu: os.cpus()[0].model,
    },
  })
}

export const status = (req, res) => {
  const seconds = Math.floor(process.uptime())

  res.status(200).send({
    status: true,
    message: 'Successfully completed!',
    result: {
      protocol: req.protocol,
      host: req.get('host'),
      port: global.listener.address().port,
      family: global.listener.address().family,
      uptime: `${seconds}s`,
    },
  })
}
