export function calculateDiscount(quantity, totalAmount) {
  let discount = 0;

  if (totalAmount > 10000) {
    discount += totalAmount * 0.1;
  }

  if (quantity > 5) {
    discount += 500;
  }

  return discount;
}
