module.exports.getElektraPrice = async (page) => {
  const priceByClass = await page.$eval('.skuBestPrice', el => el.textContent);
  const response = parseFloat(priceByClass.replace('$', '').replace(',', ''))
  return response ? response : 0
}
module.exports.getElektraName = async (page) => {
  const nameByClass = await page.$eval('.productName', el => el.textContent);
  return nameByClass.trim();
}