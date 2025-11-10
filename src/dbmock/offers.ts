export const offers = [
  {
    name: 'Buy One Get Second Half Price',
    description: 'Buy one red widget (R01), get the second half price',
    type: 'buy_one_get_second_half',
    params: { productCode: 'R01' },
  },
  {
    name: 'Spend 100, Get $10 Off',
    description: 'Applies $10 discount for orders above $100',
    type: 'fixed_discount',
    params: { threshold: 100, discount: 10 },
  },
  {
    name: '10% Off Everything',
    description: 'Global storewide discount',
    type: 'percentage_discount',
    params: { threshold: 1000, percent: 10 },
  },
] as const;
