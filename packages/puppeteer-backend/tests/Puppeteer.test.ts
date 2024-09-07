import puppeteer from 'puppeteer'
import { sleep } from '@fangcha/tools'
import { PuppeteerHelper } from '../src/services/PuppeteerHelper'

describe('Test Puppeteer.test.ts', () => {
  it(`example`, async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Set screen size.
    // await page.setViewport({ width: 1080, height: 1024 })

    // Navigate the page to a URL.
    await page.goto('https://xueqiu.com/S/SZ161125')

    await sleep(1000)

    console.info(await page.cookies('https://xueqiu.com'))

    await browser.close()
  })

  it(`PuppeteerHelper.executeCode`, async () => {
    const response = await PuppeteerHelper.executeCode(`
      const page = await browser.newPage()
      await page.goto('https://xueqiu.com/S/SZ161125')
      await sleep(1000)
      return await page.cookies('https://xueqiu.com')
    `)
    console.info(response)
  })
})
