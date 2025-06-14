const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');               // ← import jwt
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3500;

// 1) Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
);
app.use(express.json());

// 2) Auth middleware
const JWT_SECRET = process.env.JWT_SECRET;
function authenticate(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.userId, email: payload.email, isAdmin: payload.isAdmin, phone_number: payload.phone_number };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// 3) Routes
app.use('/api/auth', require('./routes/auth'));   // public auth routes

// protect only the enquiry route:
app.use('/api/enquire', authenticate, require('./routes/enquire'));
app.use('/api/admin/enquiries', require('./routes/adminEnquiries'));
app.use('/api/booking', authenticate, require('./routes/booking'));
app.use('/api/admin/bookings', authenticate, require('./routes/adminBookings'));

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
