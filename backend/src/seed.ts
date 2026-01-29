import sqlite3 from "sqlite3";

const db = new sqlite3.Database("mydatabase.db");

db.serialize(() => {
  console.log("Seeding database");
  db.exec("DELETE FROM sprint;");
  db.exec("DELETE FROM capacity");
  db.exec("DELETE FROM availability");
  db.exec(`INSERT INTO sprint (
            groupCode,
            sprintId,
            planned,
            added,
            removed,
            totalCompleted,
            totalMd,
            plannedCompletedDifference
        ) VALUES
            ('t3stGr0up1', 1, 28, 2, 1, 24, 18, 0.154),
            ('t3stGr0up1', 2, 30, 0, 2, 25, 20, 0.182),
            ('t3stGr0up1', 3, 35, 5, 0, 28, 22, 0.222),
            ('t3stGr0up2', 1, 14, 2, 1, 12, 20, 0.154),
            ('t3stGr0up2', 2, 25, 0, 2, 25, 25, 0.182),
            ('t3stGr0up2', 3, 15, 0, 2, 25, 25, 0.182);`);
  db.exec(`INSERT INTO workProgress (
            groupCode,
            sprintId,
            name,
            workAssigned,
            workCompleted,
            averagePerMd
        ) VALUES
            ('t3stGr0up1', 1, 'tester1', 7, 5, 0.5),
            ('t3stGr0up1', 2, 'tester1', 5, 3, 0.429),
            ('t3stGr0up1', 3, 'tester1', 4, 4, 0.667),
            ('t3stGr0up1', 1, 'tester2', 2, 1, 0.5),
            ('t3stGr0up1', 2, 'tester2', 5, 3, 0.429),
            ('t3stGr0up1', 3, 'tester2', 4, 4, 0.667),
            ('t3stGr0up1', 1, 'tester3', 4, 2, 0.5),
            ('t3stGr0up1', 2, 'tester3', 0, 0, 0),
            ('t3stGr0up1', 3, 'tester3', 4, 4, 0.5),
            ('t3stGr0up2', 1, 'admin1', 8, 5, 0.5),
            ('t3stGr0up2', 2, 'admin1', 6, 3, 0.429),
            ('t3stGr0up2', 3, 'admin1', 2, 4, 0.667);`);
  db.exec(`INSERT INTO capacity (
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
            ('t3stGr0up1', 1, 'tester1', 10, 0, 0, 0, 0, 10),
            ('t3stGr0up1', 1, 'tester2', 8, 4, 0, 0, 0, 4),
            ('t3stGr0up1', 1, 'tester3', 10, 1, 0, 0, 0, 9),
            ('t3stGr0up1', 2, 'tester1', 0, 0, 0, 0, 0, 0),
            ('t3stGr0up1', 2, 'tester2', 0, 0, 0, 0, 0, 0),
            ('t3stGr0up1', 2, 'tester3', 0, 0, 0, 0, 0, 0),
            ('t3stGr0up1', 3, 'tester1', 10, 1, 2, 0, 1, 6),
            ('t3stGr0up1', 3, 'tester2', 7, 3, 0, 0, 1, 3),
            ('t3stGr0up1', 3, 'tester3', 10, 3, 0, 1, 1, 5),
            ('t3stGr0up2', 1, 'admin1', 6, 0, 0, 0, 0, 6),
            ('t3stGr0up2', 2, 'admin1', 6, 4, 0, 0, 0, 2),
            ('t3stGr0up2', 3, 'admin1', 6, 1, 0, 0, 0, 5);`);
  console.log("Seeding complete");
});
