import puppeteer from 'puppeteer'
import { PuppeteerHelper } from '../src/services/PuppeteerHelper'

describe('Test Puppeteer.test.ts', () => {
  it(`example`, async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://ifconfig.co/json', { waitUntil: 'domcontentloaded' })
    // console.info(await page.cookies('https://xueqiu.com'))
    console.info(await page.content())
    await browser.close()
  })

  it(`PuppeteerHelper.executeCode`, async () => {
    const response = await PuppeteerHelper.executeCode({
      code: `
      const page = await browser.newPage()
      injectProxy(page)
      await page.goto('https://ifconfig.co/json')
      await sleep(1000)
      const content = await page.content()
      return content
      // return await page.cookies('https://xueqiu.com')
    `,
      // proxy: 'http://127.0.0.1:6152',
    })
    console.info(response)
  })
})
