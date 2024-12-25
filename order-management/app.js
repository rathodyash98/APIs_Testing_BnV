const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes'); // Import the routes

const app = express();
const PORT = 3000;


// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Attach routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
   
});
