import { DISCOUNT_RULES } from '../config/constants.js';

export const calculateDiscount = (quantity, totalAmount) => {
  let discount = 0;

  if (totalAmount > DISCOUNT_RULES.AMOUNT_THRESHOLD) {
    discount += totalAmount * DISCOUNT_RULES.AMOUNT_DISCOUNT_RATE;
  }

  if (quantity > DISCOUNT_RULES.QUANTITY_THRESHOLD) {
    discount += DISCOUNT_RULES.QUANTITY_DISCOUNT;
  }

  return discount;
};