import {
  PRODUCT_STATUSES
} from "../../config/constants";
import {
  Types
} from 'mongoose';


/** newProductId
 * This method build an unique product id
 */
const newProductId = () => {
  return `prod_${Types.ObjectId()}`
};

/** buildProductObject
 * This method should build a valid product schema 
 * @param {object} body should be taken from req object.
 */
const buildProductObject = (body) => {
  return {
    id: newProductId(),
    mainImage: body.main,
    url: body.url,
    price: body.price,
    status: PRODUCT_STATUSES.CREATED
  };
}

module.exports = {
  buildProductObject
}