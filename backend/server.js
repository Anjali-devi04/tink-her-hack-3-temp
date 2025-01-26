const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Temporary storage for signup data
let tempSignUpData = {};

// Route to serve the SignUp page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// Handle signup form submission
app.post('/signup', (req, res) => {
    const { name, gender, dob, streetname, streetno, housename, pincode, district } = req.body;
    tempSignUpData = { name, gender, dob, streetname, streetno, housename, pincode, district };
    res.redirect('/verify');
});

// Serve the Verification page dynamically
app.get('/verify', (req, res) => {
    if (Object.keys(tempSignUpData).length === 0) {
        return res.redirect('/'); // Redirect to signup if no data exists
    }
    res.sendFile(path.join(__dirname, 'views', 'verify.html'));
});

// Handle verification form submission
app.post('/verify', (req, res) => {
    const { police_station } = req.body;
    const verifiedData = { ...tempSignUpData, police_station };

    // Process or save verifiedData to a database
    console.log('Verified Data:', verifiedData);

    tempSignUpData = {}; // Clear temp data
    res.send('<h1>Verification Successful</h1><p>Your data has been saved successfully.</p>');
});

// Start the server
app.listen(port, () => {
    console.log('Server running on http://localhost:${port}');
});