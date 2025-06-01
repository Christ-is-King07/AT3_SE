const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const sgMail = require('@sendgrid/mail');
require('dotenv').config(); // Load environment variables
const adminEmailTemplate = require('../mail/adminEmail'); // Assuming you have a template for admin email
const enquiryConfirmationTemplate = require('../mail/enquiryConfirmation'); // Assuming you have a template for confirmation email

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.use(express.json());

router.post('/', async (req, res) => {
    console.log("Received body:", req.body);
    const { first_name, last_name, email, phone_number, event_type, event_date, other_event_type, proposed_payment, how_you_heard, additional_info } = req.body;

    if (isNaN(Number(proposed_payment))) {
        return res.status(400).json({ error: 'Proposed payment must be a valid number' });
      }
      if ([first_name, last_name, email, phone_number, event_type, event_date, proposed_payment, how_you_heard, additional_info].some(field => typeof field === "undefined" || field === "")) {
        return res.status(400).json({ error: 'All required fields must be provided' });
      }
    

    try {
        const enquiry = await prisma.enquiry.create({
            data: { first_name, last_name, email, phone_number, event_type, event_date: new Date(event_date), other_event_type, proposed_payment, how_you_heard, additional_info },
        });

        // Email to Admin (you)
        const adminMsg = {
            to: process.env.SENDGRID_ADMIN_EMAIL,
            from: {
                email: process.env.SENDGRID_FROM_EMAIL,
                name: 'Vic Photography'
            },
            subject: `New Enquiry from ${first_name} ${last_name}`,
            replyTo: email,
            html: adminEmailTemplate(first_name, last_name, email, phone_number, event_type, event_date, other_event_type, proposed_payment, how_you_heard, additional_info ),
        };

        // Confirmation Email to Enquirer
        const confirmationMsg = {
            to: email,
            from: {
                email: process.env.SENDGRID_FROM_EMAIL,
                name: 'Vic Photography'
            },
            subject: 'We received your enquiry!',
            html: enquiryConfirmationTemplate(first_name, last_name, event_type, event_date, other_event_type, proposed_payment, additional_info),
        };


        await sgMail.send(adminMsg);
        await sgMail.send(confirmationMsg);

        res.status(201).json({ success: true, enquiry });
    } catch (error) {
        console.error('Email or DB Error:', error);
        res.status(500).json({ error: 'Failed to process enquiry' });
    }
});

module.exports = router;