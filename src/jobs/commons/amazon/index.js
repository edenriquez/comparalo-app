module.exports.getAmazonPrice = async (page) => {
  // TODO: fix this, temporal hack by getting value pointing to second index
  const prices = (await page.$x("//*[starts-with(@id, 'priceblock_')]"))[1]
  const textPrice = (await page.evaluate(el => {
    return el.textContent;
  }, prices));
  const response = parseFloat(textPrice.replace('$', '').replace(',', ''))
  return response ? response : 0
}

module.exports.getAmazonName = async (page) => {
  const nameById = await page.$eval('#productTitle', el => el.textContent);
  const articlePath = (await page.$x('//*[@id="productTitle"]'))[0];
  const nameByPath = await page.evaluate(el => {
    return el.textContent;
  }, articlePath);
  if (!nameById) {
    return nameByPath.trim();
  }
  return nameById.trim();

}