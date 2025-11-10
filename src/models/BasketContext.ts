import type { Product } from './Product.js';

export interface BasketContext {
  products: Product[];
  subtotal: number;
}
