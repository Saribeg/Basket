import type { IBasket } from './IBasket.ts';
import type { Product } from '../../models/Product.ts';
import type { DeliveryService } from '../delivery/DeliveryService.ts';
import type { ProductService } from '../product/ProductService.ts';

export class Basket implements IBasket {
  private readonly products: Product[] = [];

  constructor(
    private readonly productService: ProductService,
    private readonly deliveryService: DeliveryService,
  ) {}

  add(productCode: string): void {
    const product = this.productService.findByCode(productCode);

    if (!product) {
      throw new Error(`Product with code ${productCode} not found`);
    }

    this.products.push(product);
  }

  total(): number {
    const subtotal = this.calculateSubtotal();
    const afterPromotions = this.applyPromotions(subtotal);
    const withDelivery = this.applyDelivery(afterPromotions);
    return Number(withDelivery.toFixed(2));
  }

  private calculateSubtotal(): number {
    return this.products.reduce((sum, p) => sum + p.price, 0);
  }

  private applyPromotions(subtotal: number): number {
    return subtotal;
  }

  private applyDelivery(total: number): number {
    return total + this.deliveryService.calculate(total);
  }
}
