import type { IPromotionStrategy } from '../IPromotionStrategy.js';
import type { BasketContext } from '../../../models/BasketContext.js';
import type { Promotion } from '../../../models/Promotion.js';
import { round } from '../../../utils/money.js';

export class FixedDiscount implements IPromotionStrategy<'fixed_discount'> {
  constructor(public readonly promotion: Promotion<'fixed_discount'>) {}

  apply(total: number): number {
    const { threshold, discount } = this.promotion.params;
    return total >= threshold ? round(total - discount) : total;
  }

  isApplicable(context: BasketContext): boolean {
    return context.subtotal >= this.promotion.params.threshold;
  }
}
