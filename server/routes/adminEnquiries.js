const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const sgMail = require('@sendgrid/mail');
const { requireAdmin } = require('../middleware/auth');
const prisma = new PrismaClient();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Apply admin guard to all /api/admin/enquiries routes
router.use(requireAdmin);

// 1) List all enquiries
router.get('/', async (req, res) => {
  const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(enquiries);
});

// 2) Delete one
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.enquiry.delete({ where: { id } });
  res.json({ success: true });
});

// 3) Respond: send an email to the enquirer
router.post('/:id/respond', async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const enquiry = await prisma.enquiry.findUnique({ where: { id } });
  if (!enquiry) return res.status(404).json({ error: 'Enquiry not found' });

  // build your own template, or reuse enquiryConfirmationTemplate
  const msg = {
    to: enquiry.email,
    from: { email: process.env.SENDGRID_FROM_EMAIL, name: 'Vic Photography' },
    subject: `Re: your enquiry (${enquiry.event_type} on ${new Date(enquiry.event_date).toLocaleDateString()})`,
    html: `<p>Hi ${enquiry.first_name},</p>
           <p>${message}</p>
           <p>Cheers,<br/>Vic Photography</p>`
  };

  await sgMail.send(msg);
  res.json({ success: true });
});

module.exports = router;
