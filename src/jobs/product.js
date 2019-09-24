const puppeteer = require('puppeteer')

module.exports.scrapProduct = async (url) => {
  console.log('START...');

  const screenshot = 'amazon_nyan_cat_pullover.png'
  try {
    (async () => {
      const browser = await puppeteer.launch()
      console.log('LAUNCHING...');
      const page = await browser.newPage()
      await page.setViewport({
        width: 1280,
        height: 800
      })
      console.log('GOTO...');
      await page.goto('https://www.amazon.com')
      await page.type('#twotabsearchtextbox', 'nyan cat pullover')
      await page.click('input.nav-input')
      await page.waitForSelector('#resultsCol')
      await page.screenshot({
        path: 'amazon_nyan_cat_pullovers_list.png'
      })
      console.log('CLICK...');
      await page.click('#pagnNextString')
      await page.waitForSelector('#resultsCol')
      const pullovers = await page.$$('a.a-link-normal.a-text-normal')
      await pullovers[2].click()
      await page.waitForSelector('#ppd')
      await page.screenshot({
        path: screenshot
      })
      console.log('CLOSE...');
      await browser.close()
      console.log('See screenshot: ' + screenshot)
    })()
  } catch (err) {
    console.error(err)
  }
}