import { createClient } from "@supabase/supabase-js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

type Account = {
  id: number;
  username: string;
  passwordHashed: string;
};

dotenv.config();

const app = express();
const port: number = Number(process.env.PORT) || 3000;

const supabase = createClient(
  "https://wcyxqkhptsacqfcscwgt.supabase.co",
  process.env.SUPABASE_KEY,
);

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const [sprint, workProgress, capacity, groupMember, account] =
      await Promise.all([
        supabase.from("sprint").select("*"),
        supabase.from("workProgress").select("*"),
        supabase.from("capacity").select("*"),
        supabase.from("groupMember").select("*"),
        supabase.from("account").select("*"),
      ]);

    const errors = [
      sprint.error,
      workProgress.error,
      capacity.error,
      groupMember.error,
      account.error,
    ].filter(Boolean);

    if (errors.length > 0) {
      return res.status(500).json({
        error: errors[0]?.message,
      });
    }

    res.json({
      sprint: sprint.data,
      workProgress: workProgress.data,
      capacity: capacity.data,
      groupMember: groupMember.data,
      account: account.data,
    });
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

//SPRINT TABLE ROUTES

app.get("/sprint", async (req, res) => {
  try {
    //const groupCode = req.body
    const groupCode = "t3stGr0up1";
    const { data, error } = await supabase
      .from("sprint")
      .select("*")
      .eq("groupCode", groupCode)
      .order("groupCode", { ascending: true })
      .order("sprintId", { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

app.post("/sprint", async (req, res) => {
  try {
    const {
      groupCode,
      sprintId,
      planned,
      added,
      removed,
      totalCompleted,
      totalMd,
      plannedCompletedDifference,
    } = req.body;
    if (!groupCode || !sprintId) {
      return res.status(400).send("groupCode / sprintId are missing");
    }
    const { error } = await supabase.from("sprint").insert({
      groupCode,
      sprintId,
      planned: planned,
      added: added,
      removed: removed,
      totalCompleted: totalCompleted,
      totalMd: totalMd,
      plannedCompletedDifference: plannedCompletedDifference,
    });
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

//WORK PROGRESS TABLE ROUTES

app.get("/workProgress", async (req, res) => {
  try {
    //const groupCode = req.body
    const groupCode = "t3stGr0up1";
    const { data, error } = await supabase
      .from("workProgress")
      .select("*")
      .eq("groupCode", groupCode)
      .order("groupCode", { ascending: true })
      .order("name", { ascending: true })
      .order("sprintId", { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

app.post("/workProgress", async (req, res) => {
  try {
    const {
      groupCode,
      sprintId,
      name,
      workAssigned,
      workCompleted,
      averagePerMd,
    } = req.body;
    if (!groupCode || !sprintId || !name) {
      return res.status(400).send("groupCode / sprintId / name are missing");
    }
    const { error } = await supabase.from("workProgress").insert({
      groupCode,
      sprintId,
      name,
      workAssigned: workAssigned,
      workCompleted: workCompleted,
      averagePerMd: averagePerMd,
    });
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

//CAPACITY TABLE ROUTES

app.get("/capacity", async (req, res) => {
  try {
    //const groupCode = req.body
    const groupCode = "t3stGr0up1";
    const { data, error } = await supabase
      .from("capacity")
      .select("*")
      .eq("groupCode", groupCode)
      .order("groupCode", { ascending: true })
      .order("name", { ascending: true })
      .order("sprintId", { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

app.post("/capacity", async (req, res) => {
  try {
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
    if (!groupCode || !sprintId || !name) {
      return res.status(400).send("groupCode / sprintId / name are missing");
    }
    const { error } = await supabase.from("capacity").insert({
      groupCode,
      sprintId,
      name,
      workingDays: workingDays,
      outOfOffice: outOfOffice,
      releases: releases,
      fridayProjects: fridayProjects,
      maintenance: maintenance,
      md: md,
    });
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

//GROUPMEMBER TABLE ROUTES

app.get("/groupMember", async (req, res) => {
  try {
    //const groupCode = req.body
    const groupCode = "t3stGr0up1";
    const { data, error } = await supabase
      .from("groupMember")
      .select("*")
      .eq("groupCode", groupCode)
      .order("groupCode", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

app.post("/add-member", async (req, res) => {
  try {
    const { groupCode, name } = req.body;
    if (!groupCode || !name) {
      return res.status(400).send("groupCode / name are missing");
    }
    const { error } = await supabase.from("groupMember").insert({
      groupCode,
      name: name,
    });
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

app.post("/edit-member", async (req, res) => {
  try {
    const { groupCode, currentName, newName } = req.body;
    if (!groupCode || !currentName || !newName) {
      return res
        .status(400)
        .send("groupCode / current name / new name are missing");
    }
    const { error } = await supabase
      .from("groupMember")
      .update({
        name: newName,
      })
      .eq("groupCode", groupCode)
      .eq("name", currentName);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

app.delete("/delete-member", async (req, res) => {
  try {
    const { groupCode, name } = req.body;
    if (!groupCode || !name) {
      return res
        .status(400)
        .send("groupCode / current name / new name are missing");
    }
    const { error } = await supabase
      .from("groupMember")
      .delete()
      .eq("groupCode", groupCode)
      .eq("name", name);
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

//ACCOUNT TABLE ROUTES

app.get("/account", async (req, res) => {
  try {
    const { data, error } = await supabase.from("account").select("*");

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

app.post("/create-account", async (req, res) => {
  try {
    const { username, password } = req.body;
    const saltRounds = 10;
    if (!username || !password) {
      return res.status(400).json({
        error: "A username AND password are required",
        username: username,
        password: password,
      });
    }
    const passwordHashed = await bcrypt.hash(password, saltRounds);
    const { error } = await supabase.from("account").insert({
      username: username,
      passwordHashed: passwordHashed,
    });
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const JWT_SECRET = "thisisreallysecret";

    const { data, error } = await supabase
      .from<Account>("account")
      .select("*")
      .eq("username", username);
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(401).json({ error: "Invalid login details" });
    }
    const user = data[0];
    const validatePassword = await bcrypt.compare(
      password,
      user.passwordHashed,
    );
    if (!validatePassword) {
      return res.status(401).json({ error: "Invalid login details" });
    }
    const webToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ webToken });
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

//OTHER ROUTES (E.G. NEW SPRINT ROUTE THAT UPDATES MULTIPLE TABLES)
app.post("/new-sprint", async (req, res) => {
  try {
    const groupCode = "t3stGr0up1"; // retrieve group code

    if (!groupCode) {
      return res.status(400).json({
        error: "No group code could be found",
      });
    }

    const { data: latestSprint, error: sprintErr } = await supabase
      .from("sprint")
      .select("sprintId")
      .eq("groupCode", groupCode)
      .order("sprintId", { ascending: false })
      .limit(1)
      .single();

    if (sprintErr) {
      return res.status(500).json({ error: sprintErr.message });
    }

    const nextSprintId = (latestSprint?.sprintId ?? 0) + 1;

    const { error: insertSprintErr } = await supabase.from("sprint").insert({
      groupCode,
      sprintId: nextSprintId,
      planned: 0,
      added: 0,
      removed: 0,
      totalCompleted: 0,
      totalMd: 0,
      plannedCompletedDifference: 0,
    });

    if (insertSprintErr) {
      return res.status(500).json({ error: insertSprintErr.message });
    }
    const { data: members, error: membersErr } = await supabase
      .from("groupMember")
      .select("name")
      .eq("groupCode", groupCode);

    if (membersErr) {
      return res.status(500).json({ error: membersErr.message });
    }

    if (!members || members.length === 0) {
      return res.status(400).json({
        error: "Could not find any users in group",
      });
    }

    const capacityRows = members.map((user) => ({
      groupCode,
      sprintId: nextSprintId,
      name: user.name,
      workingDays: 0,
      outOfOffice: 0,
      releases: 0,
      fridayProjects: 0,
      maintenance: 0,
      md: 0,
    }));

    const { error: capacityErr } = await supabase
      .from("capacity")
      .insert(capacityRows);

    if (capacityErr) {
      return res.status(500).json({ error: capacityErr.message });
    }

    const workProgressRows = members.map((user) => ({
      groupCode,
      sprintId: nextSprintId,
      name: user.name,
      workAssigned: 0,
      workCompleted: 0,
      averagePerMd: 0,
    }));

    const { error: workProgressErr } = await supabase
      .from("workProgress")
      .insert(workProgressRows);

    if (workProgressErr) {
      return res.status(500).json({ error: workProgressErr.message });
    }

    res.json({
      success: true,
      sprintId: nextSprintId,
      capacityTableRowsCreated: capacityRows.length,
      workProgressTableRowsCreated: workProgressRows.length,
    });
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
