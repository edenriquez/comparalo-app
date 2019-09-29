const puppeteer = require('puppeteer')
const commons = require('./commons')
const chromeBin = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
const isDev = (process.env.ENV === 'development') ? true : false
const settings = (isDev) ? {
  headless: false,
  executablePath: chromeBin,
  slowMo: 250,
  devtools: true
} : {}

module.exports.scrapProduct = async (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch(settings)

      const page = await browser.newPage()

      commons.setDebugViewPort(page, 1280, 800)

      await page.goto(url)

      await browser.waitForTarget(() => false);
      resolve(true);
    } catch (error) {
      reject(error)
    }
  })
}