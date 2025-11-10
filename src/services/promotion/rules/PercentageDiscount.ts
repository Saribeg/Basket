import type { IPromotionRule } from '../IPromotionRule.js';
import type { BasketContext } from '../../../models/BasketContext.js';
import type { Promotion } from '../../../models/Promotion.js';
import { round } from '../../../utils/money.js';

export class PercentageDiscount implements IPromotionRule<'percentage_discount'> {
  constructor(public readonly promotion: Promotion<'percentage_discount'>) {}

  apply(total: number): number {
    const { threshold, percent } = this.promotion.params;
    return total >= threshold ? round(total - total * (percent / 100)) : total;
  }

  isApplicable(context: BasketContext): boolean {
    return context.subtotal >= this.promotion.params.threshold;
  }
}
