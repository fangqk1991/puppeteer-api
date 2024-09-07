const envData = process.env || {}

module.exports = {
  Puppeteer: {
    configVersion: envData.configVersion,
    wecomBotKey: envData.wecomBotKey,
    openBaseURL: envData.openBaseURL,
    openPort: envData.openPort,
  },
}
