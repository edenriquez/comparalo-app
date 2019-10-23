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

module.exports.getMercadoMeta = async (page) => {
  const rankPath = (await page.$x('//*[@id="root-app"]/div/div[2]/div[3]/div[1]/div[1]/div/section/header/div/div/h2'))[0];
  let rank = await page.evaluate(el => {
    return el.textContent;
  }, rankPath);

  return {
    vendorName: "mercado libre",
    vendorRank: rank || 0,
    shippingDetails: shippingDetails,
    installments: (installments > 0) ? installments : "no montly installments"
  }
}