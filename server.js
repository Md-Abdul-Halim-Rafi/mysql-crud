const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

// create db
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

// connect to mysql
db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Connected to mysql");
  }
});

const app = express();
const PORT = process.env.PORT || 3000;

// parse requests of content-type: application/json
app.use(bodyParser.json());

// create db
app.get("/create-db", (req, res) => {
  let sql = `CREATE DATABASE nodemysql`;
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Database created");
  });
});

// create user table
app.get("/create-user-table", (req, res) => {
  let sql = `CREATE TABLE users(id int AUTO_INCREMENT,name varchar(255),role varchar(255),PRIMARY KEY (id))`;
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("User table created");
  });
});

// insert user
app.get("/inset-user", (req, res) => {
  let post = { name: "Meefee", role: "admin" };
  let sql = `INSERT INTO users SET ?`;
  let query = db.query(sql, post, (err) => {
    if (err) {
      throw err;
    }
    res.send("User added");
  });
});

// select user
app.get("/select-user", (req, res) => {
  let sql = `SELECT * FROM users`;
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

// update user
app.get("/update-user/:id", (req, res) => {
  let updatedName = "MeeFee";
  let sql = `UPDATE users SET name = '${updatedName}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("User updated");
  });
});

// delete user
app.get("/delete-user/:id", (req, res) => {
  let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("User deleted");
  });
});

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
