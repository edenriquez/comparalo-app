const puppeteer = require('puppeteer')
const commons = require('./commons/commons')
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
            return entry[0];
          }
        });
      }

      // init browser
      const browser = await puppeteer.launch(settings)
      const page = await browser.newPage()
      commons.setDebugViewPort(page, 1280, 800) // if debug mode is true 

      // open product 
      await page.goto(url)

      // get data
      const price = commons.getPrice(passedVendor, page);
      const name = commons.getName(passedVendor, page);
      const status = PRODUCT_STATUSES.UNPUBLISHED


      console.log('PRODUCT DETAILS');
      console.log('PRICE', price);
      console.log('NAME', name);
      console.log('STATUS', status);
      console.log('LINK', url);

      await browser.close()
      resolve(true);
    } catch (error) {
      reject(error)
    }
  })
}