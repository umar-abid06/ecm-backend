# ECM Marketplace: Backend API

REST API for a multi-vendor (B2B/B2C) e-commerce marketplace: buyers shop across many independent stores, sellers run their own shop with products, coupons, flash-sale events and payouts, and both sides talk through built-in messaging.

**Live app:** https://ecm-frontend.onrender.com · **Frontend repo:** [ecm-frontend](https://github.com/umar-abid06/ecm-frontend)

## Features
| Module | What it does |
|---|---|
| Auth | Registration with **email verification** (activation link via Nodemailer), login with bcrypt-hashed passwords, JWT in an httpOnly cookie |
| Shops | Seller onboarding and shop profiles |
| Products & categories | Product CRUD per shop, category catalogue |
| Orders | Order creation and order history for buyers and sellers |
| Payments | **Stripe** PaymentIntents for checkout |
| Coupons | Shop-level discount codes |
| Events | Time-limited flash-sale events |
| Conversations & messages | Buyer ↔ seller messaging |
| Withdrawals | Seller payout requests with email notification |
| Profile | User profile and address management |

## Architecture
```
React (Vite) client ──HTTPS + cookie──► Express API (/api/v1)
                                          ├─ routes/<module>/{router, controller}
                                          ├─ model/<module>/{*-model (data access), *-mongo (Mongoose schema)}
                                          ├─ services/ (error handling, email)
                                          └─ MongoDB (Mongoose)
External: Stripe (payments) · SMTP (activation + notification emails)
```
Each domain module is split into **router → controller → model (data-access functions) → Mongoose schema**, so controllers never touch the database directly.

## Tech
Node.js 20 · Express · MongoDB / Mongoose · JWT · bcrypt · Stripe · Nodemailer · Docker · GitHub Actions (Node 18/20 matrix with a MongoDB service) · deployed on Render

## Run locally
```bash
cp .env.sample .env      # fill in MONGO_URL, JWT_SECRET, SMTP_*, STRIPE_* …
yarn install
yarn watch               # dev server with nodemon on PORT (default 8000)
# or
docker build -t ecm-backend . && docker run --env-file .env -p 8000:8000 ecm-backend
```

## API overview
Base path `/api/v1`: `/auth/register`, `/auth/login`, `/products`, `/categories`, `/shop`, `/order`, `/coupon`, `/events`, `/conservation` (conversations), `/messages`, `/withdraws`, `/profile`, `/payment`.

## Roadmap
- [ ] Compute payment amounts server-side from the order (never trust client totals) and confirm payments via **Stripe webhooks** with idempotency keys
- [ ] Token expiry + refresh, generic auth error messages, rate limiting, input validation on every route
- [ ] TypeScript migration, Jest + Supertest integration tests in CI, OpenAPI docs
- [ ] Real-time messaging with Socket.io; Redis caching for catalogue endpoints
- [ ] AI features: semantic product search (embeddings) and AI-assisted product descriptions for sellers

## Author
Muhammad Umar Abid · [LinkedIn](https://linkedin.com/in/muhammad-umar-b3687a196) · built 10/2024 – 05/2025
