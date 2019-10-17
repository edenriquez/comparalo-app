module.exports.getWalmartPrice = async (page) => {
  const articlePath = (await page.$x('//*[@id="imagePickerZoomContainer"]/div[2]/div[1]/h4'))[0];
  const priceByPath = await page.evaluate(el => {
    return el.textContent;
  }, articlePath);
  const response = parseFloat(priceByPath.replace('$', '').replace(',', ''));

  return response ? response : 0
}
module.exports.getWalmartName = async (page) => {
  const articlePath = (await page.$x('//*[@id="imagePickerZoomContainer"]/div[1]/h1'))[0];
  const nameByPath = await page.evaluate(el => {
    return el.textContent;
  }, articlePath);

  return nameByPath.trim();
}