import sqlite3  from "sqlite3"

const db = new sqlite3.Database("mydatabase.db");

db.serialize(() => {
    console.log("Seeding database")
    db.exec('DELETE FROM sprint;')
    db.exec(`INSERT INTO capacity (
            groupCode,
            sprintId,
            name,
            workAssigned,
            workCompleted,
            averagePerMd
        ) VALUES
            ('t3stGr0up1', 1, 'tester', 7, 5, 0.5),
            ('t3stGr0up1', 2, 'tester', 5, 3, 0.429),
            ('t3stGr0up1', 3, 'tester', 4, 4, 0.667);`);
    db.exec(`INSERT INTO availability (
            groupCode,
            sprintId,
            name,
            workingDays,
            outOfOffice,
            releases,
            fridayProjects,
            maintenance,
            md
        ) VALUES
            ('t3stGr0up1', 1, 'tester', 10, 0, 0, 0, 0, 10),
            ('t3stGr0up1', 1, 'tester2', 8, 4, 0, 0, 0, 4),
            ('t3stGr0up1', 1, 'tester3', 10, 1, 0, 0, 0, 9),
            ('t3stGr0up1', 2, 'tester', 10, 8, 0, 1, 0, 1),
            ('t3stGr0up1', 2, 'tester2', 8, 3, 0, 1, 0, 6),
            ('t3stGr0up1', 2, 'tester3', 10, 2, 0, 1, 0, 7),
            ('t3stGr0up1', 3, 'tester', 10, 1, 2, 0, 1, 6),
            ('t3stGr0up1', 3, 'tester2', 8, 3, 0, 0, 1, 4),
            ('t3stGr0up1', 3, 'tester3 ', 10, 3, 0, 1, 1, 5);`);
    db.exec(`INSERT INTO sprint (
            groupCode,
            planned,
            added,
            removed,
            totalCompleted,
            totalMd,
            plannedCompletedDifference
        ) VALUES
            ('t3stGr0up1', 28, 2, 1, 24, 18, 0.154),
            ('t3stGr0up1', 30, 0, 2, 25, 20, 0.182),
            ('t3stGr0up1', 35, 5, 0, 28, 22, 0.222);`);
    console.log("Seeding complete");
});