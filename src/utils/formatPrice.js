/**
 * Formats a number as a price string with Indian Rupees symbol and 2 decimal places.
 * Uses 'en-IN' locale.
 * @param {number|string} amount - The amount to format.
 * @returns {string} - The formatted price string (e.g., "1,234.50").
 */
export const formatPrice = (amount) => {
    const numericAmount = Number(amount)
    if (isNaN(numericAmount)) return '0.00'

    return numericAmount.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
}
