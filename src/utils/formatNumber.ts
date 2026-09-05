const formatNumber = (num: number): string => new Intl.NumberFormat('en-US').format(num);

export default formatNumber;
