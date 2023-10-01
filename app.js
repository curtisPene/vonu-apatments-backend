require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const cors = require("cors");
const app = express();
const chalk = require("chalk");
const port = process.env.PORT;
const corsOrigin = process.env.CORS_ORIGIN;
const sendGridApiKey = process.env.SEND_GRID_API_KEY;
// Middleware to parse JSON data
app.use(cors({ origin: corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: sendGridApiKey,
    },
  })
);

app.post("/reservations", (req, res) => {
  const {
    guestName,
    email,
    phoneContact,
    checkIn,
    checkOut,
    aptOne,
    aptTwo,
    numberOfGuests,
    purposeOfStay,
  } = req.body;

  console.log(req.body);
  transporter.sendMail(
    {
      to: ["curtispene92@gmail.com"],
      from: "huluwainvestments@gmail.com",
      subject: "New Reservation Request",
      html: `" <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
        <h1>!!!Test Email!!!</h1>
        <h2>New Reservation Request for Vonu Apartments</h2>
        <p>Hello,</p>
        <p>A new reservation request has been made from your Vonu Apartments website. Here are the details:</p>

        <h3>Guest Information:</h3>
        <ul>
            <li><strong>Guest Name:</strong> ${guestName}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone Contact:</strong> ${phoneContact}</li>
        </ul>

        <h3>Reservation Details:</h3>
        <ul>
            <li><strong>Check-In Time:</strong> ${checkIn}</li>
            <li><strong>Check-Out Time:</strong> ${checkOut}</li>
            <li><strong>Apartment Selection:</strong> ${
              aptOne ? "Apartment 1" : null
            } ${aptTwo ? "Apartment 2" : null}</li>
            <li><strong>Number of Guests:</strong> ${numberOfGuests}</li>
            <li><strong>Purpose of Stay:</strong> ${purposeOfStay}</li>
        </ul>

        <p>Best regards,<br>The Huluwa Team</p>
    </div>"`,
    },
    (error, response) => {
      if (error) {
        console.log(error);
        res.status(400).send(response);
      } else {
        console.log(response);
        res.status(200).send(response);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
