import puppeteer, { Page } from 'puppeteer'
import { sleep } from '@fangcha/tools'

export class PuppeteerHelper {
  public static async executeCode(params: { code: string; proxy?: string }) {
    const args = ['--no-sandbox']
    let proxyUsername = ''
    let proxyPassword = ''
    if (params.proxy) {
      const matches = params.proxy.match(/^(http[s]:\/\/)([^:]+):([^@:]+)@(.*)$/)
      if (matches) {
        params.proxy = `${matches[1]}${matches[4]}`
        proxyUsername = matches[2]
        proxyPassword = matches[3]
      }
      args.push(`--proxy-server=${params.proxy}`)
    }

    const browser = await puppeteer.launch({
      args: args,
    })

    const func = new Function(
      `{ browser, sleep, injectProxy }`,
      `
        const main = async () => {
          ${params.code}
        }
        return main
    `
    )
    const injectProxy = async (page: Page) => {
      if (proxyUsername && proxyPassword) {
        await page.authenticate({
          username: proxyUsername,
          password: proxyPassword,
        })
      }
    }
    const handler = func({ browser, sleep, injectProxy })
    const response = await handler()

    await browser.close()
    return response
  }
}
