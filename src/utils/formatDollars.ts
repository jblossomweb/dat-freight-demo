const formatDollars = (num: number): string => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0, // Strips decimals for crisp logistics flat rates
}).format(num);

export default formatDollars;
