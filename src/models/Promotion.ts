export type PromotionParamsMap = {
  buy_one_get_second_half: { productCode: string };
  fixed_discount: { threshold: number; discount: number };
  percentage_discount: { threshold: number; percent: number };
};

export class Promotion<T extends keyof PromotionParamsMap> {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly type: T,
    public readonly params: PromotionParamsMap[T],
  ) {}
}
