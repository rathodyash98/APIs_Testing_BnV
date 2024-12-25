const validateOrder = (quantity, pricePerUnit) => {
    if (quantity <= 0) return 'Quantity must be greater than 0';
    if (pricePerUnit <= 0) return 'Price per unit must be greater than 0';
    return null;
};

module.exports = { validateOrder };
