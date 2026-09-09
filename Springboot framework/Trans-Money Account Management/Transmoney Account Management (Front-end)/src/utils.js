export function formatCurrency(value) {
  const number = Number(value || 0)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(number)
}

export const ACCOUNT_TYPES = ['Checking', 'Savings', 'Business']
