module.exports =  (first_name, last_name, event_type, event_date, other_event_type, proposed_payment, additional_info) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enquiry Confirmation</title>
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
        <h1>Thank You for Your Enquiry, ${first_name} ${last_name}!</h1>
        <p>We have received your message and will get back to you shortly.</p>
        <p><strong>Event Type:</strong> ${event_type}</p>
        <p><strong>Event Date:</strong> ${event_date}</p>
        <p><strong>Proposed Payment:</strong> ${proposed_payment}</p>
        <p><strong>Your Message:</strong></p>
        <p>${additional_info}</p>
        <p>If you have any further questions, feel free to reply to this email.</p>
        <p>Best regards,<br>Vic Photography</p>
    </div>
    </body>
    </html>
`;