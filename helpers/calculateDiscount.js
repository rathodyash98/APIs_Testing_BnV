export function calculateDiscount(quantity, totalAmount) {
  let discount = 0;

  if (totalAmount > 10000) {
    discount += totalAmount * 0.1; // 10% discount
  }

  if (quantity > 5) {
    discount += 500; // Additional ₹500 flat discount
  }

  return discount;
}
