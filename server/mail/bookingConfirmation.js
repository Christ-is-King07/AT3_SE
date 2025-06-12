// mail/bookingConfirmation.js

module.exports = (name, pkg, event_type, event_date, event_time) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Booking Confirmation</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; color: #333; padding: 20px; }
    .container { max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 5px; }
    h1 { color: #28A745; }
    p { line-height: 1.6; }
    .details { margin-top: 20px; }
    .details p { margin: 4px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Thank You for Your Booking, ${name}!</h1>
    <p>We’re thrilled you’ve chosen our <strong>${pkg}</strong> package. Here are your booking details:</p>
    <div class="details">
      <p><strong>Package:</strong> ${pkg}</p>
      <p><strong>Event Type:</strong> ${event_type}</p>
      <p><strong>Event Date:</strong> ${event_date}</p>
      <p><strong>Event Time:</strong> ${event_time}</p>
    </div>
    <p>If you need to make any changes, just reply to this email and we’ll be happy to help.</p>
    <p>Looking forward to capturing your special moments!<br>– Vic Photography</p>
  </div>
</body>
</html>
`;
