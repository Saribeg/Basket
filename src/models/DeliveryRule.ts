export class DeliveryRule {
  constructor(
    public readonly minTotal: number,
    public readonly maxTotal: number,
    public readonly cost: number,
  ) {}
}
