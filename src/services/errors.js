import {
  ITEM_NOT_FOUND
} from '../config/constants';

export function malformedRequest(field, context) {
  return {
    message: `error malformed request`,
    details: `validation error on field ${field}`,
    context: context
  }
}

export function productNotFound() {
  return {
    message: ITEM_NOT_FOUND,
    details: `Id provided was not found in our records`,
  }
}