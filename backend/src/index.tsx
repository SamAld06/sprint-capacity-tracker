import express from "express";
import cors from "cors";
import sqlite3  from "sqlite3";

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("mydatabase.db")

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS capacity (
    id INTEGER PRIMARY KEY,
    sprintId INTEGER,
    name TEXT,
    workAssigned INTEGER,
    workCompleted INTEGER,
    averagePerMd INTEGER
    FOREIGN KEY (sprintId) REFERENCES sprint(id)
    )`);
  db.run(`
    CREATE TABLE IF NOT EXISTS availability (
    id INTEGER PRIMARY KEY,
    sprintId INTEGER,
    name TEXT,
    working-days INTEGER,
    outOfOffice INTEGER,
    releases INTEGER,
    fridayProjects INTEGER,
    maintenance INTEGER,
    md INTEGER
    FOREIGN KEY (sprintId) REFERENCES sprint(id)
    )`);
  db.run(`CREATE TABLE IF NOT EXISTS sprint (
    id INTEGER PRIMARY KEY ,
    planned TEXT,
    added INTEGER,
    removed INTEGER,
    totalCompleted INTEGER,
    totalMd INTEGER,
    plannedCompletedDifference INTEGER
    )`);
});

app.get("/capacity", (req, res) => {
    db.all("SELECT capacity.* .* sprint.id AS sprintId", (err, rows) => {
        if (err) return res.status(500).send(err.message)
            res.json(rows)
    })
})

app.get("/availability", (req, res) => {
    db.all("SELECT availability.* sprint.id AS sprintId", (err, rows) => {
        if (err) return res.status(500).send(err.message)
            res.json(rows)
    })
})

app.get("/sprint", (req, res) => {
    db.all("SELECT * FROM sprint", (err, rows) => {
        if (err) return res.status(500).send(err.message)
            res.json(rows)
    })
})

app.post("/capacity", (req, res) => {
    const {id, sprintID, name, workAssigned, workCompleted, averagePerMd} = req.body;
    db.run("INSERT INTO capacity (id, sprintID, name, workAssigned, workCompleted, averagePerMd) VALUES (?, ?, ?, ?, ?, ?)", [id, sprintID, name, workAssigned, workCompleted, averagePerMd], function(err) {
        if (err) return res.status(500).send(err.message);
        res.json({ id: this.lastID})
    });
});

app.listen(3001, () => {
    console.log("DB running on http://localhost:3001")
})