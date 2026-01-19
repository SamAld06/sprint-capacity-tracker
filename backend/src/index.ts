import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import next from "next";


interface UserDetailsRow {
  groupCode: string;
  name: string;
}

interface SprintDetailsRow {
  newestSprint: number;
}

const app = express();
const db = new sqlite3.Database("mydatabase.db");

app.use(cors());
app.use(express.json());

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

  db.all("SELECT * FROM sprint", (err, sprint) => {
    if (err) return res.status(500).send(err.message);
    result.sprint = sprint;

    db.all("SELECT * FROM capacity", (err, capacity) => {
      if (err) return res.status(500).send(err.message);
      result.capacity = capacity;

      db.all("SELECT * FROM availability", (err, availability) => {
        if (err) return res.status(500).send(err.message);
        result.availability = availability;

        res.json(result);
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
  //get all availabilitys that have a corresponding row in sprint table
  db.all(
    "SELECT availability.*, sprint.id AS sprintId FROM availability JOIN sprint ON availability.sprintID = sprint.id",
    (err, rows) => {
      if (err) return res.status(500).send(err.message);
      res.json(rows);
    }
  );
});

app.get("/availability/all", (req, res) => {
  db.all(
    "SELECT * FROM availability ORDER BY sprintId, groupCode, name", (err, rows) => {
      if (err) return res.status(500).send(err.message);
      res.json(rows);
    }
  )
})

app.get("/sprint", (req, res) => {
  db.all("SELECT * FROM sprint", (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

app.post("/sprint", (req, res) => {
  const {
    groupCode,
    planned,
    added,
    removed,
    totalCompleted,
    totalMd,
    plannedCompletedDifference,
  } = req.body;
  db.run(
    "INSERT INTO sprint (groupCode, planned, added, removed, totalCompleted, totalMd, plannedCompletedDifference) VALUES (?, ?, ?, ?, ?, ?)",
    [
      groupCode,
      planned,
      added,
      removed,
      totalCompleted,
      totalMd,
      plannedCompletedDifference,
    ],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.json({ id: this.lastID });
    }
  );
});

app.post("/capacity", (req, res) => {
  const {
    groupCode,
    sprintId,
    name,
    workAssigned,
    workCompleted,
    averagePerMd,
  } = req.body;
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
  //Updates the row for a specific user for a specific sprint
  //const groupCode = req.user.groupCode;
  const {
    sprintId,
    name,
    workingDays,
    OutOfOffice,
    releases,
    fridayProjects,
    maintenance,
    md,
  } = req.body;
  db.run(
    `UPDATE availability
    SET sprintId=?, workingDays=?, OutOfOffice=?, releases=?, fridayProjects=?, maintenance=?, md=?
    WHERE groupCode=? name=?`,
    [
      sprintId,
      name,
      workingDays,
      OutOfOffice,
      releases,
      fridayProjects,
      maintenance,
      md,
    ],
    function (err) {
      if (err) return res.status(500).send(err.message);
      if (this.changes === 0)
        return res
          .status(404)
          .send("Could not find a row for the given details");
      res.json({ success: true });
    }
  );
});

// app.post("/availability/new-sprint", (req, res) => {
//   console.log("✅ /availability/new-sprint hit");

//   // Example: return a dummy response for now
//   res.json({ success: true });
// });


app.post("/availability/new-sprint", (req, res) => {
  console.log("✅ /availability/new-sprint hit");
  db.get(
    "SELECT MAX(sprintId) as newestSprint FROM availability",
    (err, row: SprintDetailsRow) => {
      if (err) {
        return res.status(500).json(err.message);
      }
      const nextSprintId = (row?.newestSprint ?? 0) + 1;
      db.run(
        "INSERT INTO SPRINT (id, groupCode, planned, added, removed, totalCompleted, totalMd, plannedCompletedDifference) VALUES (?, ?, 0, 0, 0, 0, 0, 0)",
        [nextSprintId, groupCode]
      );

      db.all(
        "SELECT DISTINCT groupCode, name FROM availability",
        (err, users: UserDetailsRow[]) => {
          if (err) {
            return res.status(500).json(err.message);
          }
          if (users.length == 0) {
            return res
              .status(400)
              .json({ error: "Could not find any users in group" });
          }

          const stmt = db.prepare(`
            INSERT INTO availability (
              groupCode,
              sprintId,
              name,
              workingDays,
              outOfOffice,
              releases,
              fridayProjects,
              maintenance,
              md
            ) VALUES (?, ?, ?, 0, 0, 0, 0, 0, 0)
          `);

          users.forEach((user) => {
            stmt.run(user.groupCode, nextSprintId, user.name);
          });

          stmt.finalize((err) => {
            if (err) {
              return res.status(500).json(err.message);
            }

            res.json({
              completed: true,
              sprintId: nextSprintId,
              rowsCreated: users.length,
            });
          });
        }
      );
    }
  );
});

app.delete("/availability/delete-sprint/:id", (req, res) => {
  const sprintId = Number(req.params.id);

  db.run(
    "DELETE FROM availability WHERE sprintId = ?",
    [sprintId],
    function (err) {
      if (err) return res.status(500).json(err.message);

      db.run(
        "DELETE FROM sprint WHERE id = ?",
        [sprintId],
        function (err) {
          if (err) return res.status(500).json(err.message);
          res.json({ deleteSprintId: sprintId })
        }
      );
    }
  );
});

app.listen(3001, () => {
  console.log("DB running on http://localhost:3001");
});
