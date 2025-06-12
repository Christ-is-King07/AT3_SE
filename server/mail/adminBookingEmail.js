// mail/adminBookingEmail.js

module.exports = (name, email, pkg, event_type, event_date, event_time) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>New Booking Notification</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; color: #333; padding: 20px; }
    .container { max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 5px; }
    h1 { color: #007BFF; }
    p { line-height: 1.6; }
    .details { margin-top: 20px; }
    .details p { margin: 4px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>New Booking from ${name}</h1>
    <p>You have received a new booking on your site. Details below:</p>
    <div class="details">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Package:</strong> ${pkg}</p>
      <p><strong>Event Type:</strong> ${event_type}</p>
      <p><strong>Event Date:</strong> ${event_date}</p>
      <p><strong>Event Time:</strong> ${event_time}</p>
    </div>
    <p>Please follow up with the client to confirm any further details.</p>
    <p>Best regards,<br>Vic Photography</p>
  </div>
</body>
</html>
`;
