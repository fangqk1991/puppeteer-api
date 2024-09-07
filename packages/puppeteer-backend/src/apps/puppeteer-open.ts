import { GlobalAppConfig } from 'fc-config'
import { WebApp } from '@fangcha/backend-kit/lib/router'
import { PuppeteerConfig } from '../PuppeteerConfig'
import { PuppeteerSpecDocItems } from './open/PuppeteerSpecDocItems'

const app = new WebApp({
  env: GlobalAppConfig.Env,
  tags: GlobalAppConfig.Tags,
  appName: 'puppeteer-open',
  wecomBotKey: PuppeteerConfig.wecomBotKey,
  mainDocItems: PuppeteerSpecDocItems,
  routerOptions: {
    baseURL: PuppeteerConfig.openBaseURL,
    backendPort: PuppeteerConfig.openPort,
  },

  plugins: [],
  appDidLoad: async () => {},
})
app.launch()
