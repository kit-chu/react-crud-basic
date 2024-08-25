const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "employeeSystem",
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employee (name, age, country, position, Mage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.put("/update", (req, res) => {
  const id = req.body.id;
  const mage = req.body.Mage;
  if (!id || !mage) {
    return res.status(400).send("Missing id or Mage value");
  }
  db.query(
    "UPDATE employee SET Mage = ? WHERE id = ?",
    [mage, id],
    (err, result) => {
      if (err) {
        console.log("error connection: " + err);
      } else {
        res.send(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
