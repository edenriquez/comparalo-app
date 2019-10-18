module.exports.getElektraPrice = async (page) => {
  const prices = (await page.$x("//*[@id='buybox_price__1RdXu']/span"))[0]
  const textPrice = (await page.evaluate(el => {
    return el.textContent;
  }, prices));
  const response = parseFloat(textPrice.replace('$', '').replace(',', ''))
  return response ? response : 0
}
module.exports.getElektraName = async (page) => {
  const articlePath = (await page.$x('//*[@id="productName_nameProduct__31fQE"]'))[0];
  const nameByPath = await page.evaluate(el => {
    return el.textContent;
  }, articlePath);
  return nameByPath.trim();
}