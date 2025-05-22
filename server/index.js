const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const userRoute = require('./routes/userRoutes');


require('dotenv').config();

const app = express();

const session = require('express-session');

app.use(session({
  secret: 'joekarSecretKey', // You can use dotenv for this too
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true only if using HTTPS
}));


// Middleware to parse URL-encoded form data (must come before routes)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static frontend files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../client')));


// API routes
app.use('/', userRoute); // Routes starting from /
app.use('/api', routes);
// Routes
// app.use('api/', itemRoutes);

// Home API endpoint
// app.get('/api/home', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'home.html'));
// })

// // Optional: Root redirect to home
// app.get('/', (req, res) => {
//   res.redirect('/api/home');
// });

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('MongoDB error:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Joekar server running at http://localhost:${PORT}`);
});