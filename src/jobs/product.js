const puppeteer = require('puppeteer');
const axios = require('axios');
const commons = require('./commons/commons');
import {
  PRODUCT_STATUSES
} from '../config/constants'
const chromeBin = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
const isDev = (process.env.ENV === 'development') ? true : false
const settings = (isDev) ? {
  headless: false,
  executablePath: chromeBin,
  slowMo: 250,
  devtools: false
} : {}

const vendors = {
  "amazon": new RegExp("amazon"),
  "mercadolibre": new RegExp("mercado"),
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
      if (typeof passedVendor === "undefined") {
        passedVendor = Object.keys(vendors).filter((e) => {
          if (vendors[e].test(url)) {
            return e
          }
        })[0]
      }

      // init browser
      const browser = await puppeteer.launch(settings)
      const page = await browser.newPage()
      commons.setDebugViewPort(page, 1280, 800) // if debug mode is true 

      // open product 
      await page.goto(url)

      // TODO: introduce some noise here

      // get data
      const price = await commons.getPrice(passedVendor, page);
      const name = await commons.getName(passedVendor, page);
      const status = PRODUCT_STATUSES.UNPUBLISHED

      axios.post('http://localhost:3000/products/new', {
          name: name,
          link: url,
          image: "https://picsum.photos/200", // placeholder for now 
          currentPrice: parseInt(price), // this should be decimal
          status: status
        })
        .then(async (res) => {
          await browser.close()
          resolve(res)
        }).catch(async (err) => {
          // TODO: convert these into metrics of failure
          // https://github.com/getsentry/sentry
          console.log('API ERROR: ', err);

          await browser.close()
          reject(err)
        })
    } catch (error) {
      // TODO: convert these into metrics of failure
      // https://github.com/getsentry/sentry
      reject(error)
    }
  })
}