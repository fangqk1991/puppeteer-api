import { SpecFactory } from '@fangcha/router'
import puppeteer from 'puppeteer'
import { sleep } from '@fangcha/tools'

const PuppeteerInvokeApis = {
  Example: {
    method: 'POST',
    route: '/api/v1/puppeteer/example',
    description: '执行示例代码',
  },
  CodeExecute: {
    method: 'POST',
    route: '/api/v1/puppeteer/execute',
    description: '执行代码',
  },
}

const factory = new SpecFactory('执行代码')

factory.prepare(PuppeteerInvokeApis.Example, async (ctx) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage()
  await page.goto('https://xueqiu.com/S/SZ161125')
  await sleep(1000)
  const cookieData = await page.cookies('https://xueqiu.com')
  await browser.close()
  ctx.body = cookieData
})

factory.prepare(PuppeteerInvokeApis.CodeExecute, async (ctx) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage()
  await page.goto('https://xueqiu.com/S/SZ161125')
  await sleep(1000)
  const cookieData = await page.cookies('https://xueqiu.com')
  await browser.close()
  ctx.body = cookieData
})

export const PuppeteerInvokeSpecs = factory.buildSpecs()
