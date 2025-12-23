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
    id INTEGER PRIMARY KEY 
    name TEXT
    work-assigned INTEGER
    work-completed INTEGER
    average-per-md INTEGER
    )`);
  db.run(`
    CREATE TABLE IF NOT EXISTS availability (
    id INTEGER PRIMARY KEY 
    name TEXT
    working-days INTEGER
    out-of-office INTEGER
    releases INTEGER
    friday-projects INTEGER
    maintenance INTEGER
    md INTEGER
    )`);
  db.run(`CREATE TABLE IF NOT EXISTS sprint (
    id INTEGER PRIMARY KEY 
    planned TEXT
    added INTEGER
    removed INTEGER
    total-completed INTEGER
    total-md INTEGER
    planned-completed-difference
    )`);
});

app.get("/capacity", (req, res) => {
    db.all("SELECT * FROM capacity", (err, rows) => {
        if (err) return res.status(500).send(err.message)
            res.json(rows)
    })
})