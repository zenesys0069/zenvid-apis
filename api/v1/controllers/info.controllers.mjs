import os from 'os'
import helpers from '../../../helpers/index.mjs'
export const version = (req, res) => {
  const result = {
    version: 'v1.0.0',
  }
  helpers.common.successHandler(res, null, null, result)
}

export const software = (req, res) => {
  const result = {
    server: 'Express 4.x.x',
    environment: 'Node LTS 16.x.x',
    database: 'MongoDB 6.x.X',
  }
  helpers.common.successHandler(res, null, null, result)
}

export const hardware = (req, res) => {
  const result = {
    os: {
      type: os.type(),
      release: os.release(),
      platform: os.platform(),
    },
    cpu: os.cpus()[0].model,
  }
  helpers.common.successHandler(res, null, null, result)
}

export const status = (req, res) => {
  const seconds = Math.floor(process.uptime())
  const result = {
    protocol: req.protocol,
    host: req.get('host'),
    port: global.listener.address().port,
    family: global.listener.address().family,
    uptime: `${seconds}s`,
  }
  helpers.common.successHandler(res, null, null, result)
}
