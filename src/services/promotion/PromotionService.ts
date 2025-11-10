import type { IPromotionRule } from './IPromotionRule.js';
import type { BasketContext } from '../../models/BasketContext.js';

export class PromotionService {
  constructor(private readonly rules: IPromotionRule[]) {}

  getApplicablePromotions(context: BasketContext): IPromotionRule[] {
    return this.rules.filter((rule) => {
      return typeof rule.isApplicable === 'function' ? rule.isApplicable(context) : true;
    });
  }

  applyApplicablePromotions(total: number, context: BasketContext): number {
    const applicablePromotions = this.getApplicablePromotions(context);

    return applicablePromotions.reduce((sum, rule) => {
      return rule.apply(sum, context);
    }, total);
  }
}
