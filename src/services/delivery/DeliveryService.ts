import type { DeliveryRule } from '../../models/DeliveryRule.js';

export class DeliveryService {
  constructor(private readonly rules: DeliveryRule[]) {}

  calculate(total: number): number {
    const rule = this.rules.find((r) => total >= r.minTotal && total < r.maxTotal);
    return rule ? rule.cost : 0;
  }
}
