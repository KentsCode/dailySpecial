const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3000;
const db = mongoose.connection;
const cors = require('cors');
const path = require('path');
const secret = process.env.SECRET;
require("dotenv").config();

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));

// Add routes, both API and view
app.use(routes);

//adding cors per auth0 
app.use(cors());

app.get("*", (req, res) => {  
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Start the API server
app.listen(PORT, function() {
  console.log(`API Server now listening on PORT ${PORT}!`);
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dailySpecial");
//Checking database connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



