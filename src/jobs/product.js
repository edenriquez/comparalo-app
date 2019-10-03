const puppeteer = require('puppeteer')
const commons = require('./commons')
const chromeBin = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
const isDev = (process.env.ENV === 'development') ? true : false
const settings = (isDev) ? {
  headless: false,
  executablePath: chromeBin,
  // slowMo: 250,
  devtools: false
} : {}

const vendors = {
  "amazon": new RegExp("amazon"),
  "mercado": new RegExp("mercado"),
  "walmart": new RegExp("walmart"),
  "liverpool": new RegExp("liverpool"),
  "elektra": new RegExp("elektra"),
  "coopel": new RegExp("coopel"),
  "bestbuy": new RegExp("bestbuy")
};

module.exports.scrapProduct = async (url, passedVendor) => {
  return new Promise(async (resolve, reject) => {
    try {
      // get vendor if is not provided
      if (!passedVendor) {
        passedVendor = Object.entries(vendors).forEach(function (entry) {
          if (entry[1].test(url)) {
            return entry[0]
          }
        });
      }

      const browser = await puppeteer.launch(settings)

      const page = await browser.newPage()

      commons.setDebugViewPort(page, 1280, 800)

      await page.goto(url)
      // get price depends on vendor
      const element = await page.$eval('#priceblock_ourprice', el => el.textContent);
      const featureArticle = (await page.$x('//*[@id="priceblock_ourprice"]'))[0];

      const text = await page.evaluate(el => {
        return el.textContent;
      }, featureArticle);
      console.log(element, text);

      await browser.close()
      resolve(true);
    } catch (error) {
      reject(error)
    }
  })
}