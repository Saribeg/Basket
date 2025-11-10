import { deliveryRules } from './dbmock/deliveryRules.js';
import { DeliveryRule } from './models/DeliveryRule.js';
import { ProductService } from './services/product/ProductService.js';
import { DeliveryService } from './services/delivery/DeliveryService.js';
import { Basket } from './services/basket/Basket.js';

const deliveryService = new DeliveryService(
  deliveryRules.map((r) => new DeliveryRule(r.minTotal, r.maxTotal, r.cost)),
);
const productService = new ProductService();

function testBasket(codes: string[]): void {
  const basket = new Basket(productService, deliveryService);
  codes.forEach((code) => basket.add(code));
  console.log(`${codes.join(', ')} -> $${basket.total().toFixed(2)}`);
}

testBasket(['B01', 'G01']);
// testBasket(['R01', 'R01']);
testBasket(['R01', 'G01']);
// testBasket(['B01', 'B01', 'R01', 'R01', 'R01']);
