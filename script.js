const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const port = 3000;

// Set up storage engine for Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configure Nodemailer transporter (using Gmail in this example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  }
});

// Endpoint to handle video upload and send email
app.post('/send-video', upload.single('video'), (req, res) => {
  const videoFile = req.file;

  if (!videoFile) {
    return res.status(400).send('No video file uploaded.');
  }

  // Create an email message
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'abdalahhhashesh@gmail.com',  // Send to the desired email
    subject: 'Educational Video Submission',
    text: 'Here is the video captured for educational purposes.',
    attachments: [
      {
        filename: 'recorded-video.webm',
        content: videoFile.buffer,
        encoding: 'base64',
      }
    ]
  };

  // Send email with attachment
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return res.status(500).send('Error sending email.');
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Video sent successfully!' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
