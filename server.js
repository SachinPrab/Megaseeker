const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Change this to the desired port number

// Middleware to parse the body of incoming requests
app.use(bodyParser.urlencoded({ extended: false }));

// Serve HTML files
app.use(express.static('public'));

// Handle form submission
app.post('/signup', (req, res) => {
  const fullName = req.body.fullName;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  // Check if the terms checkbox is checked
  const acceptTerms = req.body.acceptTerms === 'on';

  // Perform validation and processing here
  // For simplicity, let's just log the data for now
  console.log('Full Name:', fullName);
  console.log('Username:', username);
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('Accept Terms:', acceptTerms);

  // Redirect to a success page or handle errors
  res.redirect('/success.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
