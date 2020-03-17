import {
  PRODUCT_STATUSES,
  USER_STATUSES
} from "../../config/constants";
import {
  Types
} from 'mongoose';


/** newId
 * This method build an unique id´s with custom given prefix
 */
const newId = (prefix) => {
  return `${prefix}_${Types.ObjectId()}`
};

const buildUserObject = (body) => {
  const firstEmail = body.emails ? body.emails[0].value : body.email
  const profilePhoto = body.photos ? body.photos[0].value : 'unknonw-profile.jpg'
  return {
    user_id: newId('user'),
    username: body.first_name,
    email: firstEmail,
    password: 'password1',
    photo: profilePhoto,
    status: USER_STATUSES.INACTIVE
  }
}


const updateProductObject = (body) => {
  return {
    name: body.name,
    image: body.image,
    link: body.link,
    currentPrice: body.currentPrice,
    status: PRODUCT_STATUSES.UNPUBLISHED
  };
}

/** buildProductObject
 * This method should build a valid product schema 
 * @param {object} body should be taken from req object.
 */

const buildProductObject = (body) => {
  // TODO: set category

  return {
    id: newId('prod'),
    name: body.name,
    image: body.image,
    link: body.link,
    currentPrice: body.currentPrice,
    category: body.category,
    status: PRODUCT_STATUSES.UNPUBLISHED
  };
}

const buildProductHistoryObjetc = (body) => {
  return {
    price: body.currentPrice,
    installments: body.meta.installments,
    shippingDetails: body.meta.shippingDetails,
    vendorRank: body.meta.vendorRank,
    vendorName: body.meta.vendorName,
    createdAt: Date.now()
  }
}

const buildSearchObject = (body) => {
  // TODO: set category
  // TODO: set vendor name
  // TODO: set brand
  // TODO: set attributes
  return {
    search_id: newId('search'),
    product_name: body.name,
    product_image: body.image,
    category: body.category,
    stats: 1
  }
}

module.exports = {
  updateProductObject,
  buildProductObject,
  buildSearchObject,
  buildProductHistoryObjetc,
  buildUserObject
}