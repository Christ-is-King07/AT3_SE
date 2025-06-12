// routes/booking.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const prisma = new PrismaClient();
const adminBookingEmail = require('../mail/adminBookingEmail');
const bookingConfirmation = require('../mail/bookingConfirmation');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/', async (req, res) => {
  console.log('→ Booking body:', req.body);
  console.log('→ Authenticated user:', req.user);

  const userId = req.user?.id;
  if (!userId) {
    console.warn('Booking blocked: not authenticated');
    return res.status(401).json({ error: 'Not authenticated' });
  }

  let { package: rawPkg, event_type, event_date, event_time } = req.body;
  if (!rawPkg || !event_type || !event_date || !event_time) {
    console.warn('Booking blocked: missing field', { rawPkg, event_type, event_date, event_time });
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Normalize package to match your Prisma enum
  const pkg = rawPkg.charAt(0).toUpperCase() + rawPkg.slice(1).toLowerCase();

  // Parse date & time
  const parsedDate = new Date(event_date);
  const parsedTime = new Date(`${event_date}T${event_time}`);

  try {
    // 1) Create the booking record
    const booking = await prisma.booking.create({
      data: {
        userId,
        package: pkg,
        event_type,
        event_date: parsedDate,
        event_time: parsedTime,
      },
    });
    console.log('✔️ Booking created:', booking);

    // 2) Load user info
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true },
    });
    const userName  = user?.name  ?? 'Valued Customer';
    const userEmail = user?.email ?? '';

    // 3) Send Admin notification
    const adminHtml = adminBookingEmail(
      userName,
      userEmail,
      pkg,
      event_type,
      event_date,
      event_time
    );
    await sgMail.send({
      to:   process.env.SENDGRID_ADMIN_EMAIL,
      from: { email: process.env.SENDGRID_FROM_EMAIL, name: 'Vic Photography' },
      subject: `New Booking from ${userName}`,
      html: adminHtml,
    });

    // 4) Send Confirmation to customer
    const confirmHtml = bookingConfirmation(
      userName,
      pkg,
      event_type,
      event_date,
      event_time
    );
    await sgMail.send({
      to:   userEmail,
      from: { email: process.env.SENDGRID_FROM_EMAIL, name: 'Vic Photography' },
      subject: 'Your Booking is Confirmed!',
      html: confirmHtml,
    });

    // 5) Respond
    return res.status(201).json({ success: true, booking });
  } catch (err) {
    console.error('❌ Booking error:', err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
