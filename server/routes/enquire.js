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
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const enquiry = await prisma.enquiry.create({
            data: { name, email, message },
        });

        // Email to Admin (you)
        const adminMsg = {
            to: process.env.SENDGRID_ADMIN_EMAIL,
            from: {
                email: process.env.SENDGRID_FROM_EMAIL,
                name: 'Vic Photography'
            },
            subject: `New Enquiry from ${name}`,
            replyTo: email,
            html: adminEmailTemplate(name, email, message),
        };

        // Confirmation Email to Enquirer
        const confirmationMsg = {
            to: email,
            from: {
                email: process.env.SENDGRID_FROM_EMAIL,
                name: 'Vic Photography'
            },
            subject: 'We received your enquiry!',
            html: enquiryConfirmationTemplate(name, message),
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