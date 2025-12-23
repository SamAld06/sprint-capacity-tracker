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
    name TEXT,
    workAssigned INTEGER,
    workCompleted INTEGER,
    averagePerMd INTEGER
    )`);
  db.run(`
    CREATE TABLE IF NOT EXISTS availability (
    id INTEGER PRIMARY KEY ,
    name TEXT,
    working-days INTEGER,
    outOfOffice INTEGER,
    releases INTEGER,
    fridayProjects INTEGER,
    maintenance INTEGER,
    md INTEGER
    )`);
  db.run(`CREATE TABLE IF NOT EXISTS sprint (
    id INTEGER PRIMARY KEY ,
    planned TEXT,
    added INTEGER,
    removed INTEGER,
    totalCompleted INTEGER,
    totalMd INTEGER,
    plannedCompletedDifference
    )`);
});

app.get("/capacity", (req, res) => {
    db.all("SELECT * FROM capacity", (err, rows) => {
        if (err) return res.status(500).send(err.message)
            res.json(rows)
    })
})

app.post("/capacity", (req, res) => {
    const {name, workAssigned, workCompleted, averagePerMd} = req.body;
    db.run("INSERT INTO capacity (name, workAssigned, workCompleted, averagePerMd) VALUES (?, ?, ?, ?)" [name, workAssigned, workCompleted, averagePerMd], function(err) {
        if (err) return res.status(500).send(err.message);
        res.json({ id: this.lastID})
    });
});

app.listen(3001, () => {
    console.log("DB running on http://localhost:3001")
})