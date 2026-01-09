import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("mydatabase.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS capacity (
    id INTEGER PRIMARY KEY,
    groupCode TEXT,
    sprintId INTEGER,
    name TEXT,
    workAssigned INTEGER,
    workCompleted INTEGER,
    averagePerMd INTEGER,
    FOREIGN KEY (sprintId) REFERENCES sprint(id)
    )`);
  db.run(`
    CREATE TABLE IF NOT EXISTS availability (
    id INTEGER PRIMARY KEY,
    groupCode TEXT,
    sprintId INTEGER,
    name TEXT,
    workingDays INTEGER,
    outOfOffice INTEGER,
    releases INTEGER,
    fridayProjects INTEGER,
    maintenance INTEGER,
    md INTEGER,
    FOREIGN KEY (sprintId) REFERENCES sprint(id)
    )`);
  db.run(`CREATE TABLE IF NOT EXISTS sprint (
    id INTEGER PRIMARY KEY,
    groupCode TEXT,
    planned INTEGER,
    added INTEGER,
    removed INTEGER,
    totalCompleted INTEGER,
    totalMd INTEGER,
    plannedCompletedDifference INTEGER
    )`);
});

app.get("/", (req, res) => {
    const result: any = {};

    db.all(
        "SELECT * FROM sprint", (err, sprint) => {
            if (err) return res.status(500).send(err.message)
            result.sprint = sprint
            
            db.all(
                "SELECT * FROM capacity", (err, capacity) => {
                    if (err) return res.status(500).send(err.message)
                    result.capacity = capacity

                    db.all(
                        "SELECT * FROM availability", (err, availability) => {
                            if (err) return res.status(500).send(err.message)
                            result.availability = availability

                res.json(result)
            });
        });
    });
});
app.get("/capacity", (req, res) => {
  db.all(
    "SELECT capacity.*, sprint.id AS sprintId FROM capacity JOIN sprint ON capacity.sprintID = sprint.id",
    (err, rows) => {
      if (err) return res.status(500).send(err.message);
      res.json(rows);
    }
  );
});

app.get("/availability", (req, res) => {
  db.all("SELECT availability.*, sprint.id AS sprintId FROM availability JOIN sprint ON availability.sprintID = sprint.id", (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

app.get("/sprint", (req, res) => {
  db.all("SELECT * FROM sprint", (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

app.post("/sprint", (req, res) => {
  const { groupCode, planned, added, removed, totalCompleted, totalMd, plannedCompletedDifference } =
    req.body;
  db.run(
    "INSERT INTO sprint (groupCode, planned, added, removed, totalCompleted, totalMd, plannedCompletedDifference) VALUES (?, ?, ?, ?, ?, ?)",
    [groupCode, planned, added, removed, totalCompleted, totalMd, plannedCompletedDifference],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.json({ id: this.lastID });
    }
  );
});

app.post("/capacity", (req, res) => {
  const { groupCode, sprintId, name, workAssigned, workCompleted, averagePerMd } =
    req.body;
  db.run(
    "INSERT INTO capacity (groupCode, sprintId, name, workAssigned, workCompleted, averagePerMd) VALUES (?, ?, ?, ?, ?, ?)",
    [groupCode, sprintId, name, workAssigned, workCompleted, averagePerMd],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.json({ id: this.lastID });
    }
  );
});

app.post("/availability", (req, res) => {
  const { groupCode, sprintId, name, workingDays, OutOfOffice, releases, fridayProjects, maintenance, md } =
    req.body;
  db.run(
    "INSERT INTO availability (groupCode, sprintId, name, workingDays, OutOfOffice, releases, fridayProjects, maintenance, md) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [groupCode, sprintId, name, workingDays, OutOfOffice, releases, fridayProjects, maintenance, md],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.json({ id: this.lastID });
    }
  );
});

app.listen(3001, () => {
  console.log("DB running on http://localhost:3001");
});
