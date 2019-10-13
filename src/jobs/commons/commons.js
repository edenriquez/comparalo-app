const isDev = (process.env.ENV === 'development') ? true : false
import {
  VENDOR_NAMES
} from '../../config/constants';
import {
  getAmazonPrice,
  getAmazonName
} from './amazon'
import {
  getMercadoPrice,
  getMercadoName
} from './mercadolibre';

module.exports.setDebugViewPort = async (pageContext, width, height) => {
  if (!isDev) {
    return
  }
  await pageContext.setViewport({
    width: width,
    height: height
  })
}

module.exports.getPrice = (vendor, page) => {
  switch (vendor) {
    case VENDOR_NAMES.AMAZON:
      return getAmazonPrice(page)
    case VENDOR_NAMES.MERCADO_LIBRE:
      return getMercadoPrice(page)
    default:
      throw new Error('Unknown vendorname: ', vendor);
      break;
  };
};

module.exports.getName = (vendor, page) => {
  switch (vendor) {
    case VENDOR_NAMES.AMAZON:
      return getAmazonName(page)
    case VENDOR_NAMES.MERCADO_LIBRE:
      return getMercadoName(page)
    default:
      throw new Error('Unknown vendorname: ', vendor);
      break;
  }
}