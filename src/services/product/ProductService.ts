import { products } from '../../dbmock/products.js';
import { Product } from '../../models/Product.js';

export class ProductService {
  findAll(): Product[] {
    return products.map((p) => new Product(p.code, p.name, p.price));
  }

  findByCode(code: string): Product | null {
    const data = products.find((p) => p.code === code);
    return data ? new Product(data.code, data.name, data.price) : null;
  }
}
