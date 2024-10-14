// server.js

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "brpas2iea9jom89b3qnr-mysql.services.clever-cloud.com",
  user: "uu19tu8hjb0q1yhz",
  password: "p1zXV4UJrwNSnVVVOtjW",
  database: "brpas2iea9jom89b3qnr",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected...");
});

// Endpoint to handle form submissions
app.post("/api/contactus", (req, res) => {
    const { name, email, message, contact_no } = req.body;  // Include contact_no
  
    const sql = "INSERT INTO contactus (name, email, message, contact_no) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, message, contact_no], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      res.status(201).json({ message: "Message sent!", id: result.insertId });
    });
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
