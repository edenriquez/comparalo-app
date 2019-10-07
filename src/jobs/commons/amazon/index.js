module.exports.getAmazonPrice = async (page) => {
  const priceById = await page.$eval('#priceblock_ourprice', el => el.textContent);
  const articlePath = (await page.$x('//*[@id="priceblock_ourprice"]'))[0];
  const priceByPath = await page.evaluate(el => {
    return el.textContent;
  }, articlePath);
  if (!priceById) {
    return priceByPath;
  }
  return priceById;
}

module.exports.getAmazonName = async (page) => {
  const nameById = await page.$eval('#productTitle', el => el.textContent);
  const articlePath = (await page.$x('//*[@id="productTitle"]'))[0];
  const nameByPath = await page.evaluate(el => {
    return el.textContent;
  }, articlePath);
  if (!nameById) {
    return nameByPath;
  }
  return nameById;

}