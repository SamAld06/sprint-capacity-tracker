DELETE FROM sprint;
DELETE FROM workProgress;
DELETE FROM capacity;
DELETE FROM groupMember;
DELETE FROM groups;

INSERT INTO groups (
            groupCode,
            groupName,
            creator,
            groupHashedPassword
        ) VALUES
            ('t3stGr0up1', 'Test Group 1', 'samgaldred@gmail.com', 'password1'),
            ('t3stGr0up2', 'Test Group 2', 'samgaldred@gmail.com', 'password2'),
            ('t3stGr0up3', 'Test Group 3', 'samgaldred@gmail.com', 'password3');

INSERT INTO sprint (
            groupCode,
            sprintId,
            planned,
            added,
            removed,
            totalCompleted,
            totalMd,
            plannedCompletedDifference
        ) VALUES
            ('t3stGr0up1', 1, 30, 0, 0, 15, 16, 0.5),
            ('t3stGr0up1', 2, 25, 1, 2, 14, 17, 0.44),
            ('t3stGr0up1', 3, 23, 1, 0, 17, 28, 0.26),
            ('t3stGr0up2', 1, 14, 2, 1, 12, 20, 0.154),
            ('t3stGr0up2', 2, 25, 0, 2, 25, 25, 0.182),
            ('t3stGr0up2', 3, 15, 0, 2, 25, 25, 0.182);

INSERT INTO workProgress (
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
            ('t3stGr0up2', 3, 'admin3', 6, 3, 0.429);

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
            ('t3stGr0up2', 3, 'admin3', 6, 0, 0, 0, 0, 6);

INSERT INTO groupMember (
            groupCode,
            name
        ) VALUES
            ('t3stGr0up1', 'tester1'),
            ('t3stGr0up1', 'tester2'),
            ('t3stGr0up1', 'tester3'),
            ('t3stGr0up2', 'admin1'),
            ('t3stGr0up2', 'admin2'),
            ('t3stGr0up2', 'admin3');
