import { deliveryRules } from './dbmock/deliveryRules.js';
import { offers } from './dbmock/offers.js';

import { DeliveryRule } from './models/DeliveryRule.js';
import { Promotion } from './models/Promotion.js';

import { ProductService } from './services/product/ProductService.js';
import { DeliveryService } from './services/delivery/DeliveryService.js';
import { PromotionService } from './services/promotion/PromotionService.js';
import { PromotionRuleFactory } from './services/promotion/PromotionRuleFactory.js';
import { Basket } from './services/basket/Basket.js';

const productService = new ProductService();

const deliveryService = new DeliveryService(
  deliveryRules.map((r) => new DeliveryRule(r.minTotal, r.maxTotal, r.cost)),
);

const promotionModels = offers.map((o) => new Promotion(o.name, o.description, o.type, o.params));
const promotionRules = promotionModels.map((promo) => PromotionRuleFactory.create(promo));
const promotionService = new PromotionService(promotionRules);

function testBasket(codes: string[]): void {
  const basket = new Basket(productService, deliveryService, promotionService);
  codes.forEach((code) => basket.add(code));
  console.log(`${codes.join(', ')} -> $${basket.total()}`);
}

testBasket(['B01', 'G01']);
testBasket(['R01', 'R01']);
testBasket(['R01', 'G01']);
testBasket(['B01', 'B01', 'R01', 'R01', 'R01']);
