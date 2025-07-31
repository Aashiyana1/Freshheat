const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Mock orders route
app.post('/api/orders', (req, res) => {
  console.log('Order received:', req.body);
  res.json({ 
    success: true, 
    order: { 
      _id: 'test-order-id-' + Date.now(),
      ...req.body 
    } 
  });
});

// Mock payments route
app.post('/api/payments', (req, res) => {
  console.log('Payment received:', req.body);
  res.json({ 
    success: true, 
    payment: { 
      _id: 'test-payment-id-' + Date.now(),
      ...req.body 
    } 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log('This server will work without MongoDB for testing');
}); 