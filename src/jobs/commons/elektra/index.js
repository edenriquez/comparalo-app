module.exports.getElektraPrice = async (page) => {
  const priceByPath = (await page.$x('//*[starts-with(@id,"buybox_price")]'))[0]
  const price = await page.evaluate(el => {
    return el.textContent;
  }, priceByPath);
  const response = parseFloat(price.replace('$', '').replace(',', ''))
  return response ? response : 0
}
module.exports.getElektraName = async (page) => {
  const nameByPath = (await page.$x('//*[starts-with(@id,"productName_nameProduct")]'))[0]
  const name = await page.evaluate(el => {
    return el.textContent;
  }, nameByPath);
  return name.trim();
}

module.exports.getElektraMeta = async (page) => {
  const shippingPath = (await page.$x('//*[starts-with(@id,"information_productInfo")]/div[4]/div[2]/div/p[1]'))[0];
  const installmentsPath = (await page.$x('//*[starts-with(@id,"buybox_buy_installments")]'))[0]

  let shippingDetails = await page.evaluate(el => {
    return el.textContent;
  }, shippingPath);

  let installments = await page.evaluate(el => {
    return el.textContent;
  }, installmentsPath);

  installments = installments.replace(/\s+/g, " ").trim();

  return {
    vendorName: "elektra",
    vendorRank: 0,
    shippingDetails: shippingDetails,
    installments: (installments.length > 0) ? installments : "no montly installments"
  }
}