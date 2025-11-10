import type { IPromotionStrategy } from '../IPromotionStrategy.js';
import type { BasketContext } from '../../../models/BasketContext.js';
import type { Promotion } from '../../../models/Promotion.js';
import { round } from '../../../utils/money.js';

export class BuyOneGetSecondHalf implements IPromotionStrategy<'buy_one_get_second_half'> {
  constructor(public readonly promotion: Promotion<'buy_one_get_second_half'>) {}

  apply(total: number, context: BasketContext): number {
    const productCode = this.promotion.params.productCode;
    const matches = context.products.filter((p) => p.code === productCode);
    if (matches.length < 2) return total;

    const eligiblePairs = Math.floor(matches.length / 2);
    const price = matches[0].price;
    const discount = round(eligiblePairs * price * 0.5);

    return round(total - discount);
  }

  isApplicable(context: BasketContext): boolean {
    return context.products.some((p) => p.code === this.promotion.params.productCode);
  }
}
