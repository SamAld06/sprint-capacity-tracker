import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import next from "next";
import path from "path";


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

db.run("PRAGMA foreign_keys = ON");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS sprint (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    groupCode TEXT,
    sprintId INTEGER,
    planned INTEGER,
    added INTEGER,
    removed INTEGER,
    totalCompleted INTEGER,
    totalMd INTEGER,
    plannedCompletedDifference INTEGER,
    UNIQUE(groupCode, sprintId)
    )`);
  db.run(`
    CREATE TABLE IF NOT EXISTS workProgress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    groupCode TEXT,
    sprintId INTEGER,
    name TEXT,
    workAssigned INTEGER,
    workCompleted INTEGER,
    averagePerMd INTEGER,
    FOREIGN KEY (groupCode, sprintId)
    REFERENCES sprint(groupCode, sprintId)
    ON DELETE CASCADE
    )`);
  db.run(`
    CREATE TABLE IF NOT EXISTS capacity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    groupCode TEXT,
    sprintId INTEGER,
    name TEXT,
    workingDays INTEGER,
    outOfOffice INTEGER,
    releases INTEGER,
    fridayProjects INTEGER,
    maintenance INTEGER,
    md INTEGER,
    FOREIGN KEY (groupCode, sprintId)
    REFERENCES sprint(groupCode, sprintId)
    ON DELETE CASCADE
    )`);
  db.run(`
    CREATE TABLE IF NOT EXISTS groupMember (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    groupCode TEXT NOT NULL,
    name TEXT NOT NULL
    )`)
});

app.get("/", (req, res) => {
  const result: any = {};

  db.all("SELECT * FROM sprint", (err, sprint) => {
    if (err) return res.status(500).send(err.message);
    result.sprint = sprint;

    db.all("SELECT * FROM workProgress", (err, workProgress) => {
      if (err) return res.status(500).send(err.message);
      result.workProgress = workProgress;

      db.all("SELECT * FROM capacity", (err, capacity) => {
        if (err) return res.status(500).send(err.message);
        result.capacity = capacity;

        res.json(result);
      });
    });
  });
});

app.get("/workProgress", (req, res) => {
  //get all work progress info for a specific groupCode
  const groupCode = "t3stGr0up1";
  db.all(
    "SELECT * FROM workProgress WHERE groupCode = ? ORDER BY sprintId, groupCode, name",
    [groupCode],
    (err, rows) => {
      if (err) return res.status(500).send(err.message);
      res.json(rows);
    },
  );
});

app.get("/workProgress/all", (req, res) => {
  db.all(
    "SELECT workProgress.*, sprint.sprintId AS sprintId FROM workProgress JOIN sprint ON workProgress.sprintID = sprint.sprintId",
    (err, rows) => {
      if (err) return res.status(500).send(err.message);
      res.json(rows);
    }
  );
});

app.get("/capacity", (req, res) => {
  //get all capacity info where the groupcode is a specific one
  const groupCode = "t3stGr0up1";
  db.all(
    "SELECT * FROM capacity WHERE groupCode = ? ORDER BY sprintId, groupCode, name",
    [groupCode],
    (err, rows) => {
      if (err) return res.status(500).send(err.message);
      res.json(rows);
    },
  );
});

app.get("/capacity/all", (req, res) => {
  //Get specific capacity
  db.all(
    "SELECT capacity.*, sprint.sprintId AS sprintId FROM capacity JOIN sprint ON capacity.sprintID = sprint.sprintId",
    (err, rows) => {
      if (err) return res.status(500).send(err.message);
      res.json(rows);
    },
  );
});

app.get("/sprint", (req, res) => {
  const groupCode = "t3stGr0up1";
  db.all(
    "SELECT * FROM sprint WHERE groupCode = ? ORDER BY sprintId, groupCode",
    [groupCode],
    (err, rows) => {
      if (err) return res.status(500).send(err.message);
      res.json(rows);
    },
  );
});

app.get("/groupMember", (req, res) => {
  const groupCode = "t3stGr0up1";
  db.all(
    "SELECT * FROM groupMember WHERE groupCode = ? ORDER BY groupCode",
    [groupCode],
    (err, rows) => {
      if (err) return res.status(500).send(err.message);
      res.json(rows);
    },
  );
});

app.post("/sprint", (req, res) => {
  const {
    groupCode,
    sprintId,
    planned,
    added,
    removed,
    totalCompleted,
    totalMd,
    plannedCompletedDifference
  } = req.body;
  if (!groupCode|| !sprintId) {
    return res.status(400).send("groupCode / sprintId are missing",);
  }
  db.run(
    `UPDATE sprint
    SET planned=?, added=?, removed=?, totalCompleted=?, totalMd=?, plannedCompletedDifference=?
    WHERE sprintId=? AND groupCode=?`,
    [
      planned,
      added,
      removed,
      totalCompleted,
      totalMd,
      plannedCompletedDifference,
      sprintId,
      groupCode
    ],
    function (err) {
      if (err) return res.status(500).send(err.message);
      if (this.changes === 0)
        return res
          .status(404)
          .send("Could not find a row for the given details");
      res.json({ success: true });
    },
  );
});

app.post("/workProgress", (req, res) => {
  const {
    groupCode,
    sprintId,
    name,
    workAssigned,
    workCompleted,
    averagePerMd,
  } = req.body;
  if (!groupCode || !name || !sprintId) {
    return res.status(400).send("groupCode / name / sprintId are missing",);
  }
  db.run(
    `UPDATE workProgress
    SET workAssigned=?, workCompleted=?, averagePerMd=?
    WHERE sprintId=? AND groupCode=? AND name=?`,
    [
      workAssigned,
      workCompleted,
      averagePerMd,
      sprintId,
      groupCode,
      name,
    ],
    function (err) {
      if (err) return res.status(500).send(err.message);
      if (this.changes === 0)
        return res
          .status(404)
          .send("Could not find a row for the given details");
      res.json({ success: true });
    },
  );
});

app.post("/capacity", (req, res) => {
  //Updates the row for a specific user for a specific sprint
  //const groupCode = req.user.groupCode;
  const {
    groupCode,
    sprintId,
    name,
    workingDays,
    outOfOffice,
    releases,
    fridayProjects,
    maintenance,
    md,
  } = req.body;
  if (!groupCode || !name || !sprintId) {
    return res.status(400).send("groupCode / name / sprintId are missing");
  }
  db.run(
    `UPDATE capacity
    SET workingDays=?, outOfOffice=?, releases=?, fridayProjects=?, maintenance=?, md=?
    WHERE sprintId=? AND groupCode=? AND name=?`,
    [
      workingDays,
      outOfOffice,
      releases,
      fridayProjects,
      maintenance,
      md,
      sprintId,
      groupCode,
      name,
    ],
    function (err) {
      if (err) return res.status(500).send(err.message);
      if (this.changes === 0)
        return res
          .status(404)
          .send("Could not find a row for the given details");
      res.json({ success: true });
    },
  );
});

app.post("/new-sprint", (req, res) => {
  console.log("NEW SPRINT CALLED AT", new Date().toISOString())
  const groupCode = "t3stGr0up1"; //retrieve group code
  if (!groupCode) {
    return res.status(400).json({ error: "No group code could be found" });
  }
  db.get(
    "SELECT MAX(sprintId) as newestSprint FROM sprint WHERE groupCode = ?",
    [groupCode],
    (err, row: SprintDetailsRow) => {
      if (err) {
        return res.status(500).json(err.message);
      }
      const nextSprintId = (row?.newestSprint ?? 0) + 1;
      const previousSprintId = nextSprintId - 1
      db.run(
        "INSERT INTO sprint (groupCode, sprintId, planned, added, removed, totalCompleted, totalMd, plannedCompletedDifference) VALUES (?, ?, 0, 0, 0, 0, 0, 0)",
        [groupCode, nextSprintId],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });
          db.all(
            "SELECT DISTINCT name FROM capacity WHERE groupCode = ?",
            [groupCode],
            (err, capacityNames: UserDetailsRow[]) => {
              if (err) {
                return res.status(500).json(err.message);
              }
              if (capacityNames.length == 0) {
                return res
                  .status(400)
                  .json({ error: "Could not find any users in group" });
              }

              const capacityStmt = db.prepare(`
                INSERT INTO capacity (
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

              capacityNames.forEach((user) => {
                capacityStmt.run(groupCode, nextSprintId, user.name);
              });

              capacityStmt.finalize((err) => {
                if (err) return res.status(500).json(err.message);

                db.all(
                  "SELECT DISTINCT name FROM workProgress WHERE groupCode = ?",
                  [groupCode],
                  (err, workProgressNames: UserDetailsRow[]) => {
                    if (err) return res.status(500).json(err.message);

                    if (workProgressNames.length == 0) {
                      return res
                        .status(400)
                        .json({ error: "Could not find any users in group" });
                    }

                    const workProgressStmt = db.prepare(`
                      INSERT INTO workProgress (
                      groupCode,
                      sprintId,
                      name,
                      workAssigned,
                      workCompleted,
                      averagePerMd
                      ) VALUES (?, ?, ?, 0, 0, 0)
                    `);

                    workProgressNames.forEach((user) => {
                      workProgressStmt.run(groupCode, nextSprintId, user.name);
                    });

                    workProgressStmt.finalize((err) => {
                      if (err) return res.status(500).json(err.message);

                      res.json({
                        completed: true,
                        sprintId: nextSprintId,
                        capacityTableRowsCreated: capacityNames.length,
                        workProgressTableRowsCreated: workProgressNames.length,
                      });
                    });
                  },
                );
              });
            },
          );
        },
      );
    },
  );
});


app.delete("/all/delete-sprint/:id", (req, res) => {
  const sprintId = Number(req.params.id);

  db.run(
    "DELETE FROM capacity WHERE sprintId = ?",
    [sprintId],
    function (err) {
      if (err) return res.status(500).json(err.message);

      db.run(
        "DELETE FROM sprint WHERE id = ?",
        [sprintId],
        function (err) {
          if (err) return res.status(500).json(err.message);

          db.run(
            "DELETE FROM workProgress WHERE sprintId = ?",
            [sprintId],
            function (err) {
              if (err) return res.status(500).json(err.message);
              res.json({ deleteSprintId: sprintId})
            }
          )
        }
      );
    }
  );
});

app.delete("/sprint/delete-sprint/:id", (req, res) => {
  const sprintId = Number(req.params.id);

  db.run(
    "DELETE FROM sprint WHERE sprintId = ?",
    [sprintId],
    function (err) {
      if (err) return res.status(500).json(err.message);
    }
  );
});

app.delete("/workProgress/delete-sprint/:id", (req, res) => {
  const sprintId = Number(req.params.id);

  db.run(
    "DELETE FROM workProgress WHERE sprintId = ?",
    [sprintId],
    function (err) {
      if (err) return res.status(500).json(err.message);
    }
  );
});

app.listen(3001, () => {
  console.log("DB running on http://localhost:3001");
});
