const puppeteer = require('puppeteer')
const chromeBin = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'

module.exports.scrapProduct = async (url) => {
  const screenshot = 'amazon_nyan_cat_pullover.png'
  try {
    (async () => {
      const browser = await puppeteer.launch({
        headless: false,
        executablePath: chromeBin
      })
      const page = await browser.newPage()

      await page.setViewport({
        width: 1280,
        height: 800
      })
      await page.goto(url)
      await page.screenshot({
        path: 'test.png'
      })
      await browser.close()
    })()
  } catch (err) {
    console.error(err)
  }
}