export interface IBasket {
  add(productCode: string): void;
  total(): number;
}
