import puppeteer from 'puppeteer'
import { sleep } from '@fangcha/tools'

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
})
