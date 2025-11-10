import type { BasketContext } from '../../models/BasketContext.js';
import type { Promotion, PromotionParamsMap } from '../../models/Promotion.js';

export interface IPromotionRule<T extends keyof PromotionParamsMap = keyof PromotionParamsMap> {
  readonly promotion: Promotion<T>;

  apply(total: number, context: BasketContext): number;
  isApplicable(context: BasketContext): boolean;
}
