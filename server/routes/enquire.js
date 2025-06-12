const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const adminEmailTemplate = require('../mail/adminEmail');
const enquiryConfirmationTemplate = require('../mail/enquiryConfirmation');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
router.use(express.json());

router.post('/', async (req, res) => {
  // 1) Grab the authenticated user’s ID
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  // 2) Only these fields now
  const { phone_number, how_you_heard, additional_info } = req.body;
  if ([phone_number, how_you_heard, additional_info].some(f => !f)) {
    return res.status(400).json({ error: 'phone_number, how_you_heard, additional_info are all required' });
  }

  try {
    // 3) Create the enquiry, linking it to that user
    const enquiry = await prisma.enquiry.create({
      data: { userId, phone_number, how_you_heard, additional_info },
    });

    // 4) Fetch the user’s name & email
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true },
    });
    const userName  = user?.name  ?? 'Valued Customer';
    const userEmail = user?.email ?? '';

    // 5) Send admin notification
    const adminMsg = {
      to: process.env.SENDGRID_ADMIN_EMAIL,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: 'Vic Photography',
      },
      subject: `New Enquiry from ${userName}`,
      replyTo: userEmail,
      html: adminEmailTemplate(userName, userEmail, phone_number, how_you_heard, additional_info),
    };
    await sgMail.send(adminMsg);

    // 6) Send confirmation back to the user
    const confirmationMsg = {
      to: userEmail,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL,
        name: 'Vic Photography',
      },
      subject: 'Thanks for your enquiry!',
      html: enquiryConfirmationTemplate(userName, userEmail, phone_number, how_you_heard, additional_info),
    };
    await sgMail.send(confirmationMsg);

    return res.status(201).json({ success: true, enquiry });
  } catch (error) {
    console.error('Error creating enquiry or sending mail:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
