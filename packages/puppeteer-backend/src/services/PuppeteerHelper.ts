import puppeteer from 'puppeteer'
import { sleep } from '@fangcha/tools'

export class PuppeteerHelper {
  public static async executeCode(code: string) {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
    })

    const func = new Function(
      `{ browser, sleep }`,
      `
        const main = async () => {
          ${code}
        }
        return main
    `
    )
    const handler = func({ browser, sleep })
    const response = await handler()
    await browser.close()
    return response
  }
}
