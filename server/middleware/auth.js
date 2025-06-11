const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.requireAdmin = (req, res, next) => {
  const token =
    req.cookies.token ||
    req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    const { userId, isAdmin } = jwt.verify(token, JWT_SECRET);
    if (!isAdmin) return res.status(403).json({ error: 'Forbidden' });
    req.userId = userId;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
