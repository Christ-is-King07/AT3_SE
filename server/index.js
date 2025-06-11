const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3500;

app.use(cookieParser());
app.use(
    cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
);

app.use(express.json());

app.use('/api/enquire', require('./routes/enquire'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin/enquiries', require('./routes/adminEnquiries'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});