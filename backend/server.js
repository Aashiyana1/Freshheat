console.log('server.js is running');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const ordersRouter = require('./routes/orders');
const paymentsRouter = require('./routes/payments');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/orders', ordersRouter);
app.use('/api/payments', paymentsRouter);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT || 5000, () => console.log('Server running on port', process.env.PORT || 5000)))
  .catch(err => console.log(err)); 