import type { Promotion, PromotionParamsMap } from '../../models/Promotion.js';
import type { IPromotionStrategy } from './IPromotionStrategy.js';
import { BuyOneGetSecondHalf } from './strategies/BuyOneGetSecondHalf.js';
import { FixedDiscount } from './strategies/FixedDiscount.js';
import { PercentageDiscount } from './strategies/PercentageDiscount.js';

export class PromotionStrategyFactory {
  static create(promotion: Promotion<keyof PromotionParamsMap>): IPromotionStrategy {
    switch (promotion.type) {
      case 'buy_one_get_second_half':
        return new BuyOneGetSecondHalf(promotion as Promotion<'buy_one_get_second_half'>);

      case 'fixed_discount':
        return new FixedDiscount(promotion as Promotion<'fixed_discount'>);

      case 'percentage_discount':
        return new PercentageDiscount(promotion as Promotion<'percentage_discount'>);

      default: {
        const _exhaustive: never = promotion.type;
        throw new Error(`Unknown promotion type: ${_exhaustive}`);
      }
    }
  }
}
