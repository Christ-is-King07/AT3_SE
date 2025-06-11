const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Name, email and password required' });
    }
  
    try {
      // hash the password
      const hash = await bcrypt.hash(password, 10);
      // create the user
      const user = await prisma.user.create({
        data: { name, email, password: hash },
      });
      res.status(201).json({ success: true, user: { id: user.id, email: user.email } });
    } catch (err) {
      if (err.code === 'P2002') {
        // unique constraint failed
        return res.status(400).json({ error: 'Email already in use' });
      }
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
    { userId: user.id, email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Option A: send token in HTTP-only cookie
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ success: true });

    // Option B (alternate): just send back JSON
    // res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// (Optional) a protected route example
// GET /api/auth/me
router.get('/me', async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).end();
  
    try {
      const { userId } = jwt.verify(token, JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true, isAdmin: true },
      });
      res.json(user);
    } catch {
      res.status(401).end();
    }
  });
  
// POST /api/auth/logout
router.post('/logout', (req, res) => {
    // Clear the HTTP-only cookie
    res
      .clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .json({ success: true });
  });

module.exports = router;
