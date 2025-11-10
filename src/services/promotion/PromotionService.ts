import type { IPromotionStrategy } from './IPromotionStrategy.js';
import type { BasketContext } from '../../models/BasketContext.js';

export class PromotionService {
  constructor(private readonly strategies: IPromotionStrategy[]) {}

  getApplicablePromotions(context: BasketContext): IPromotionStrategy[] {
    return this.strategies.filter((strategy) => {
      return typeof strategy.isApplicable === 'function' ? strategy.isApplicable(context) : true;
    });
  }

  applyApplicablePromotions(total: number, context: BasketContext): number {
    const applicablePromotions = this.getApplicablePromotions(context);

    return applicablePromotions.reduce((sum, strategy) => {
      return strategy.apply(sum, context);
    }, total);
  }
}
