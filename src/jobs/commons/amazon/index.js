module.exports.getAmazonPrice = async (page) => {
  const price = (await page.$x("//*[starts-with(@id, 'priceblock_')]"))
  // FUCKING ISSUE HERE ...
  return price.filter(async (res) => {
    const final = await page.evaluate(el => {
      return parseFloat(el.textContent.replace('$', '').replace(',', ''));
    }, res);
    return final;
  })
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