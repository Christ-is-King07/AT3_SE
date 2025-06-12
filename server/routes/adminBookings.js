// routes/adminBookings.js
const express = require('express');
const router  = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/admin/bookings
router.get('/', async (req, res) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const bookings = await prisma.booking.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json(bookings);
});

// PATCH /api/admin/bookings/:id/status
router.patch('/:id/status', async (req, res) => {
    try {
      if (!req.user?.isAdmin) return res.status(403).json({ error: 'Forbidden' });
  
      const { id } = req.params;
      let { status } = req.body;
  
      console.log('📥 Raw status payload:', status, 'typeof:', typeof status);
  
      // 1) Require something was sent
      if (status == null) {
        return res.status(400).json({ error: 'Status is required' });
      }
  
      // 2) Cast to string and normalize
      status = status.toString().trim();
      const normalized =
        status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
      console.log('⚙️ Normalized status:', normalized);
  
      // 3) Validate against your enum
      const valid = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
      if (!valid.includes(normalized)) {
        return res.status(400).json({ error: `Invalid status: ${normalized}` });
      }
  
      // 4) Update the booking_status field
      const updated = await prisma.booking.update({
        where: { id },
        data: { booking_status: normalized },
      });
  
      console.log('✅ Booking status updated:', updated.id, updated.booking_status);
      return res.json(updated);
    } catch (err) {
      console.error('❌ Booking status update failed:', err);
      return res.status(500).json({ error: err.message || 'Server error' });
    }
});  

// DELETE /api/admin/bookings/:id
router.delete('/:id', async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const { id } = req.params;
    await prisma.booking.delete({ where: { id } });
    return res.json({ success: true });
  } catch (err) {
    console.error('❌ Error deleting booking:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
});

module.exports = router;
