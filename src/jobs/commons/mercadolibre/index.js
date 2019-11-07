import { getImageByPath } from "../shared";

module.exports.getMercadoPrice = async (page) => {
  const priceByClass = await page.$eval('.price-tag-fraction', el => el.textContent);
  const articlePath = (await page.$x('//*[@id="productInfo"]/fieldset[1]/span/span[2]'))[0];
  const priceByPath = await page.evaluate(el => {
    return el.textContent;
  }, articlePath);
  if (!priceByClass) {
    return parseFloat(priceByPath.replace('$', '').replace(',', ''));
  }
  return parseFloat(priceByClass.replace('$', '').replace(',', ''));
}

module.exports.getMercadoName = async (page) => {
  const nameByClass = await page.$eval('.item-title__primary', el => el.textContent);
  const articlePath = (await page.$x('//*[@id="short-desc"]/div/header/h1'))[0];
  const nameByPath = await page.evaluate(el => {
    return el.textContent;
  }, articlePath);
  if (!nameByClass) {
    return nameByPath.trim();
  }
  return nameByClass.trim();
}

module.exports.getMercadoImage = async (page) =>{
 const image  = await getImageByPath('//*[starts-with(@id,"gallery_")]/div/figure[1]/a/img', 0, page);
 return image;
};

module.exports.getMercadoMeta = async (page) => {
  const rankPath = (await page.$x('//*[starts-with(@id,"reviewsCard")]/div/div[1]/span[1]'))[0];
  const shippingPath = (await page.$x('//*[starts-with(@class,"payment-info")]'))[0];
  const installmentsPath = (await page.$x('//*[starts-with(@id,"productInfo")]/div[1]/fieldset[1]/article/div[2]/p[1]'))[0]
  let rank = await page.evaluate(el => {
    return el.textContent;
  }, rankPath);

  let shippingDetails = await page.evaluate(el => {
    return el.textContent;
  }, shippingPath);

  let installments = await page.evaluate(el => {
    return el.textContent;
  }, installmentsPath);

  installments = installments.replace(/\s+/g, " ").trim();

  return {
    vendorName: "mercado libre",
    vendorRank: rank || 0,
    shippingDetails: shippingDetails,
    installments: (installments.length > 0) ? installments : "no montly installments"
  }
}
