# Feature walkthrough

1. **Browse** - product grid, category filters, live search, low-stock and sold-out badges.
2. **Cart** - add/remove items, quantity limited by available stock, shipping calculated (free above Rs 2,999, else Rs 149).
3. **Login / Sign up** - client-side demo auth. A new email creates an account automatically.
4. **Checkout** - shipping address plus either card or QR payment (both simulated).
5. **Order confirmation** - order ID generated, stock reduced, order saved.
6. **My Orders** - order history for the logged-in user.
7. **Admin** (admin@drip.com / admin123) - **Stock** page (adjust stock, upload product photos) and **All Orders** page.

## Demo payment data
- Successful card: `4242 4242 4242 4242`, any valid expiry (MM/YY), any 3-digit CVV
- Declined card: `4000 0000 0000 0002`
- QR / UPI: scan the fake QR, then press the confirm button

## Data storage
Everything is stored in the browser's `localStorage` under the key `drip`.
Clear site data to reset the store.
