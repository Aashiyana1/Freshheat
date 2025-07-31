# Payment System Testing Guide

## 🚀 How to Test the Payment System

### Step 1: Start the Backend Server
1. Open Command Prompt/PowerShell
2. Navigate to the project folder: `cd C:\Users\aashi\OneDrive\Desktop\KDR`
3. Start the backend server:
   ```bash
   cd backend
   node test-server.js
   ```
4. You should see: "Test server running on port 5000"

### Step 2: Test the Payment System

#### Option A: Use Sample Items (Easiest)
1. Open `Freshfood/cart.html` in your browser
2. Click the **"Add Sample Items"** button (green button in top-right)
3. You should see items appear in the cart
4. Click **"Proceed to Payment"**
5. Fill in your details and select a payment method
6. Click **"Pay Now"**
7. You should see a success message!

#### Option B: Add Items from Shop
1. Open `Freshfood/index.html` in your browser
2. Scroll down to the **Shop section**
3. Click **"Add to Cart"** on any item (it will add directly to cart)
4. Click the cart icon in the header to go to cart
5. Follow steps 4-7 from Option A

### Step 3: Debug Tools Available

On the cart page, you'll see 3 debug buttons:
- **"Debug: Show Cart Contents"** - Shows current cart in console/alert
- **"Add Sample Items"** - Adds test items to cart
- **"Clear Cart"** - Removes all items from cart

### Step 4: Check Backend Logs

When you make a payment, check the terminal where the backend is running. You should see:
```
Order received: { items: [...], user: {...}, total: ... }
Payment received: { orderId: ..., amount: ..., method: ..., status: ... }
```

## 🔧 Troubleshooting

### If you see "Your cart is empty":
1. Make sure you've added items to cart first
2. Use the "Add Sample Items" button for testing
3. Check the browser console for any errors

### If payment fails:
1. Make sure the backend server is running (port 5000)
2. Check the browser console for error messages
3. Try the test page: `Freshfood/test-backend.html`

### If backend won't start:
1. Make sure Node.js is installed
2. Run `npm install` in the backend folder
3. Check if port 5000 is already in use

## ✅ Expected Results

**Successful Payment Messages:**
- **Cash on Delivery**: "Order placed! Please pay with cash on delivery."
- **UPI**: "UPI Payment Successful! Thank you for your order."
- **Credit/Debit Card**: "Payment Successful! Thank you for your order."

**After successful payment:**
- Cart gets cleared
- Form resets
- Payment section hides
- Success message appears in green 