CREATE TABLE IF NOT EXISTS sprint (
    id SERIAL PRIMARY KEY,
    groupCode TEXT,
    sprintId INTEGER,
    planned INTEGER,
    added INTEGER,
    removed INTEGER,
    totalCompleted INTEGER,
    totalMd INTEGER,
    plannedCompletedDifference INTEGER,
    UNIQUE(groupCode, sprintId)
);

CREATE TABLE IF NOT EXISTS workProgress (
    id SERIAL PRIMARY KEY,
    groupCode TEXT,
    sprintId INTEGER,
    name TEXT,
    workAssigned INTEGER,
    workCompleted INTEGER,
    averagePerMd INTEGER,
    FOREIGN KEY (groupCode, sprintId)
    REFERENCES sprint(groupCode, sprintId)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS capacity (
    id SERIAL PRIMARY KEY,
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
);

CREATE TABLE IF NOT EXISTS groupMember (
    id SERIAL PRIMARY KEY,
    groupCode TEXT NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS account (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    passwordHashed TEXT NOT NULL
);