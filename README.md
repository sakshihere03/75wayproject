# DRIP - Streetwear E-Commerce Website

A fully interactive front-end e-commerce store for a streetwear brand. Users can
browse products, manage a cart, sign up / log in, and place orders through a
**simulated payment system** (card or fake QR code). An admin view manages stock,
product photos and orders. No real payments, no external APIs.

> **Note:** This is an educational project. The payment and login systems are
> simulated and must not be used in production.

## Features
- Product catalogue with categories, search and stock indicators
- Shopping cart with quantity controls and stock limits
- Login / sign up (demo, stored in the browser)
- Fake checkout: card validation or generated QR code
- Order history for customers
- Admin panel: stock adjustment, photo upload, all orders
- Responsive layout with automatic light/dark mode

## Tech Stack
- HTML5, CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (ES6), no frameworks or libraries
- `localStorage` for persistence, Canvas API for the QR code

## Project Structure
```
drip-store/
├── index.html          # Main page
├── css/
│   └── style.css       # Styles and theme tokens
├── js/
│   └── app.js          # Products, cart, auth, payment, orders, admin
├── images/             # Product photos (product-1.jpg ... product-12.jpg)
│   └── README.md
├── docs/
│   └── FEATURES.md     # Feature walkthrough and demo data
├── .gitignore
├── LICENSE
└── README.md
```

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/drip-store.git
   cd drip-store
   ```
2. Open `index.html` in a browser (or use the VS Code "Live Server" extension).

No build step or installation is needed.

## Demo Credentials
| Role  | Email          | Password |
|-------|----------------|----------|
| Admin | admin@drip.com | admin123 |
| User  | any new email  | 4+ characters (auto-registers) |

**Test cards:** `4242 4242 4242 4242` succeeds; `4000 0000 0000 0002` is declined.
Use any future expiry (MM/YY) and any 3-digit CVV.

## Adding Product Images
Put photos in `images/` named `product-1.jpg` ... `product-12.jpg`, or log in as
admin, open **Stock** and use the **Upload** button. See `images/README.md`.

## Limitations
- No real backend or database: data lives in the browser only
- Passwords are stored unencrypted in `localStorage` (demo only)
- Payment is entirely simulated

## Future Improvements
- Node.js/Express backend with a real database
- Secure authentication (hashed passwords, JWT)
- Integration with a real payment gateway (Razorpay / Stripe test mode)
- Product detail pages, wishlist, reviews

## License
MIT - see [LICENSE](LICENSE).
