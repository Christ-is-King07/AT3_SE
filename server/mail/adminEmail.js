module.exports = (name, email, phone_number, how_you_heard, additional_info) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #007BFF;
        }
        p {
            line-height: 1.6;
        }
    </style>
</head>
<body>
<div class="container">
    <h1>New Enquiry from ${name}</h1>
    <p>You have received a new enquiry from your website.</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone Number:</strong> ${phone_number}</p>
    <p><strong>How You Heard About Us:</strong> ${how_you_heard}</p>
    <p><strong>Additional Information:</strong></p>
    <p>${additional_info}</p>
    <p>Please respond to the enquirer at their email address.</p>
    <p>Best regards,<br>Vic Photography</p>
</div>
</body>
</html>
`;