import { SpecFactory } from '@fangcha/router'
import puppeteer from 'puppeteer'
import { sleep } from '@fangcha/tools'
import { PuppeteerHelper } from '../../../services/PuppeteerHelper'
import { Api } from '@fangcha/swagger'

const PuppeteerInvokeApis = {
  Example: {
    method: 'POST',
    route: '/api/v1/puppeteer/example',
    description: '执行示例代码',
  },
  CodeExecute: {
    method: 'POST',
    route: '/api/v1/puppeteer/execute',
    description: '传递代码并执行',
    contentType: 'text/plain',
    parameters: [
      {
        name: 'code',
        type: 'string',
        in: 'body',
        description: '可执行代码',
        schema: {
          type: 'string',
          example: `const page = await browser.newPage();
await page.goto("https://xueqiu.com/S/SZ161125");
await sleep(1000);
return page.cookies("https://xueqiu.com");`,
        },
      },
    ],
  } as Api,
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
  const bodyText = ctx.request.body
  ctx.body = await PuppeteerHelper.executeCode(bodyText)
})

export const PuppeteerInvokeSpecs = factory.buildSpecs()
