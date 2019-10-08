module.exports.getMercadoPrice = async (page) => {
  const priceByClass = await page.$eval('.price-tag-fraction', el => el.textContent);
  const articlePath = (await page.$x('//*[@id="productInfo"]/fieldset[1]/span/span[2]'))[0];
  const priceByPath = await page.evaluate(el => {
    return el.textContent;
  }, articlePath);
  if (!priceByClass) {
    return priceByPath;
  }
  return priceByClass;
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