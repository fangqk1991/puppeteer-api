import { SwaggerDocItem } from '@fangcha/router'
import { PuppeteerInvokeSpecs } from './specs/PuppeteerInvokeSpecs'

export const PuppeteerSpecDocItems: SwaggerDocItem[] = [
  {
    name: 'Puppeteer Invoking',
    pageURL: '/api-docs/v1/puppeteer',
    specs: PuppeteerInvokeSpecs,
  },
]
