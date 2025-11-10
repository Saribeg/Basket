import type { Product } from '../../models/Product.ts';
import type { DeliveryService } from '../delivery/DeliveryService.ts';
import type { ProductService } from '../product/ProductService.ts';
import type { PromotionService } from '../promotion/PromotionService.ts';
import type { BasketContext } from '../../models/BasketContext.js';
import { round } from '../../utils/money.js';

export class Basket {
  private readonly products: Product[] = [];

  constructor(
    private readonly productService: ProductService,
    private readonly deliveryService: DeliveryService,
    private readonly promotionService: PromotionService,
  ) {}

  add(productCode: string): void {
    const product = this.productService.findByCode(productCode);
    if (!product) throw new Error(`Product with code ${productCode} not found`);
    this.products.push(product);
  }

  total(): number {
    const subtotal = round(this.calculateSubtotal());

    const context: BasketContext = {
      products: this.products,
      subtotal,
    };

    const afterPromotions = round(this.applyPromotions(subtotal, context));
    const withDelivery = round(this.applyDelivery(afterPromotions));

    return withDelivery;
  }

  private calculateSubtotal(): number {
    return this.products.reduce((sum, p) => sum + p.price, 0);
  }

  private applyPromotions(subtotal: number, context: BasketContext): number {
    return this.promotionService.applyApplicablePromotions(subtotal, context);
  }

  private applyDelivery(total: number): number {
    return total + this.deliveryService.calculate(total);
  }
}
