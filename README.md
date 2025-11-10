## How to Run

```bash
npm install
npm start
```

**Expected output:**

```
B01, G01 -> $37.85
R01, R01 -> $54.37
R01, G01 -> $60.85
B01, B01, R01, R01, R01 -> $98.27
```

## Overview

A simple TypeScript implementation of Acme Widget Co’s basket system from the coding test, demonstrating clean architecture, DI, and extensible discount rules.

## Folder Structure

```
src/
├── dbmock/               # Mock data: products, delivery rules, offers
├── models/               # Domain models (Product, Promotion, DeliveryRule, BasketContext)
├── services/
│   ├── basket/           # Basket logic
│   ├── delivery/         # Delivery rule service
│   ├── product/          # Product lookup service
│   └── promotion/        # Promotions system (rules, factory, service)
└── utils/                # Helper functions (e.g. rounding)
```

## Design Highlights

### Promotions System

The promotions layer is intentionally richer than required, to showcase extensibility.

- `Promotion` — the base model describing an offer (name, description, type, and params).
- `rules` (e.g. `BuyOneGetSecondHalf`, `FixedDiscount`, `PercentageDiscount`) — contain concrete business logic how to apply a promption.
- `PromotionRuleFactory` — maps promotion type to its corresponding rule class.
- `PromotionService` — orchestrates all promotion rules: checks which ones applicable and applies them to the basket subtotal.

This design allows adding new offer types without touching existing code.

### Product Access via Dependency Injection

The `Basket.add(code)` method only receives a product code according to requirements.
The basket itself does not know about the product catalog — instead it depends on a separate `ProductService`, injected at construction.
This enforces proper separation: basket logic vs. product data.
Ideally `ProductService` also should access product "db" through "Repository" classes rather than directly, but let's keep it simple as we don't have real DB.

### Discounts Before Delivery

Promotions are applied before delivery calculation.
This mirrors real‑world e‑commerce rules: usually delivery cost is based on the final payable subtotal, after discounts, not before.

### Money Handling

A small utility `round()` is used to round all monetary values to two decimals.

In a larger system, this would evolve into a dedicated `Money` class or value object with:

- currency support
- safe arithmetic (no floating‑point errors)
- proper formatting
