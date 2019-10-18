const puppeteer = require('puppeteer');
const axios = require('axios');
const commons = require('./commons/commons');
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_API
});


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
  "bestbuy": new RegExp("bestbuy")
};

module.exports.scrapProduct = async (url, passedVendor) => {
  return new Promise(async (resolve, reject) => {
    // init browser
    const browser = await puppeteer.launch(settings)
    try {
      const page = await browser.newPage()
      commons.setDebugViewPort(page, 1280, 800) // if debug mode is true 

      // open product 
      await page.goto(url)

      // get vendor if is not provided
      if (typeof passedVendor === "undefined") {
        passedVendor = Object.keys(vendors).filter((e) => {
          if (vendors[e].test(url)) {
            return e
          }
        })[0]
      }
      // TODO: introduce some noise here

      // get data
      const price = await commons.getPrice(passedVendor, page);
      const name = await commons.getName(passedVendor, page);
      const status = PRODUCT_STATUSES.UNPUBLISHED

      axios.defaults.baseURL = "http://localhost:3000"
      axios.post('products/new', {
          name: name,
          link: url,
          image: "https://picsum.photos/200", // placeholder for now 
          currentPrice: price, // this should be decimal
          status: status
        })
        .then(async (res) => {
          await browser.close()
          resolve(res)
        }).catch(async (err) => {
          await browser.close()
          Sentry.captureException(new Error(err));
          reject(err)
        })
    } catch (err) {
      await browser.close()
      Sentry.captureException(new Error(err));
      reject(err)
    }
  })
}