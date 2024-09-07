const { makeRunningConfig } = require('fc-config/config.utils')
const path = require('path')
const rootDir = path.resolve(__dirname, '../..')

const appList = [
  {
    name: 'puppeteer-open',
    script: `${rootDir}/packages/puppeteer-backend/dist/puppeteer-open.js`,
    error_file: '/data/logs/puppeteer/puppeteer-open-err.log',
    out_file: '/data/logs/puppeteer/puppeteer-open-out.log',
    exec_mode: 'fork',
    listen_timeout: 10000,
    log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
    env: {
      CODE_VERSION: 'COMMIT_SHA',
      NODE_ENV: 'development',
      NODE_CONFIG_ENV: 'development',
    },
    env_staging: {
      NODE_ENV: 'staging',
      NODE_CONFIG_ENV: 'staging',
    },
    env_production: {
      NODE_ENV: 'production',
      NODE_CONFIG_ENV: 'production',
    },
  },
]

module.exports = {
  apps: appList,
}
