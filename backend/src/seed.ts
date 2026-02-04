import sqlite3 from "sqlite3";

const db = new sqlite3.Database("mydatabase.db");

db.serialize(() => {
  console.log("Seeding database");
  db.exec("DELETE FROM sprint;");
  db.exec("DELETE FROM workProgress");
  db.exec("DELETE FROM capacity");
  db.exec("DELETE FROM groupMember");
  db.exec("DELETE FROM account")

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
            ('t3stGr0up1', 1, 30, 0, 0, 15, 14, 0.5),
            ('t3stGr0up1', 2, 25, 1, 2, 14, 17, 0.44),
            ('t3stGr0up1', 3, 23, 1, 0, 17, 20, 0.26),
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
            ('t3stGr0up1', 1, 'tester1', 9, 7, 0.7),
            ('t3stGr0up1', 2, 'tester1', 7, 5, 0.625),
            ('t3stGr0up1', 3, 'tester1', 9, 7, 0.7),
            ('t3stGr0up1', 1, 'tester2', 7, 5, 1.25),
            ('t3stGr0up1', 2, 'tester2', 7, 5, 1),
            ('t3stGr0up1', 3, 'tester2', 7, 5, 0.625),
            ('t3stGr0up1', 1, 'tester3', 3, 3, 1.5),
            ('t3stGr0up1', 2, 'tester3', 5, 4, 1),
            ('t3stGr0up1', 3, 'tester3', 7, 5, 0.5),
            ('t3stGr0up2', 1, 'admin1', 8, 5, 0.5),
            ('t3stGr0up2', 1, 'admin2', 6, 3, 0.429),
            ('t3stGr0up2', 1, 'admin3', 6, 3, 0.429),
            ('t3stGr0up2', 2, 'admin1', 6, 3, 0.429),
            ('t3stGr0up2', 2, 'admin2', 6, 3, 0.429),
            ('t3stGr0up2', 2, 'admin3', 6, 3, 0.429),
            ('t3stGr0up2', 3, 'admin1', 2, 4, 0.667),
            ('t3stGr0up2', 3, 'admin2', 6, 3, 0.429),
            ('t3stGr0up2', 3, 'admin3', 6, 3, 0.429);`);

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
            ('t3stGr0up1', 1, 'tester3', 10, 8, 0, 0, 0, 2),
            ('t3stGr0up1', 2, 'tester1', 10, 2, 0, 0, 0, 8),
            ('t3stGr0up1', 2, 'tester2', 8, 0, 0, 1, 2, 5),
            ('t3stGr0up1', 2, 'tester3', 10, 6, 0, 0, 0, 4),
            ('t3stGr0up1', 3, 'tester1', 10, 0, 0, 0, 0, 10),
            ('t3stGr0up1', 3, 'tester2', 8, 0, 0, 0, 0, 8),
            ('t3stGr0up1', 3, 'tester3', 10, 0, 0, 0, 0, 10),
            ('t3stGr0up2', 1, 'admin1', 6, 0, 0, 0, 0, 6),
            ('t3stGr0up2', 1, 'admin2', 6, 0, 0, 0, 0, 6),
            ('t3stGr0up2', 1, 'admin3', 6, 0, 0, 0, 0, 6),
            ('t3stGr0up2', 2, 'admin1', 6, 4, 0, 0, 0, 2),
            ('t3stGr0up2', 2, 'admin2', 6, 0, 0, 0, 0, 6),
            ('t3stGr0up2', 2, 'admin3', 6, 0, 0, 0, 0, 6),
            ('t3stGr0up2', 3, 'admin1', 6, 1, 0, 0, 0, 5),
            ('t3stGr0up2', 3, 'admin2', 6, 0, 0, 0, 0, 6),
            ('t3stGr0up2', 3, 'admin3', 6, 0, 0, 0, 0, 6);`);

  db.exec(`INSERT INTO groupMember (
            groupCode,
            name
        ) VALUES
            ('t3stGr0up1', 'tester1'),
            ('t3stGr0up1', 'tester2'),
            ('t3stGr0up1', 'tester3'),
            ('t3stGr0up2', 'admin1'),
            ('t3stGr0up2', 'admin2'),
            ('t3stGr0up2', 'admin3');`);
  db.exec(`INSERT INTO account (
            username,
            passwordHashed
        ) VALUES
            ('tester1', '$2b$10$EvvrXeNBmZdjjIgBf1ed0OvFQ0n45OtZ820qnfrSRYhnncClVHB9O');`);
  console.log("Seeding complete");
});
