import sqlite3  from "sqlite3"

const db = new sqlite3.Database("mydatabase.db");

db.serialize(() => {
    console.log("Seeding database")
    db.run("DELETE FROM sprint")
    db.run(
        `
        INSERT INTO sprint (
            planned,
            added,
            removed,
            totalCompleted,
            totalMd,
            plannedCompletedDifference
        ) VALUES
            (28, 2, 1, 24, 18, 0.154),
            (30, 0, 2, 25, 20, 0.182),
            (35, 5, 0, 28, 22, 0.222)
        `
    );
    console.log("Seeding complete");
});