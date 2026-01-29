export const singleSprintId = 1;

export const singleCapacityTestData = [
  {
    groupCode: "test",
    name: "tester",
    sprintId: 1,
    workingDays: 10,
    md: 10,
    outOfOffice: 0,
    releases: 0,
    fridayProjects: 0,
    maintenance: 0,
  },
  {
    groupCode: "test",
    name: "tester2",
    sprintId: 1,
    workingDays: 8,
    md: 4,
    outOfOffice: 0,
    releases: 0,
    fridayProjects: 2,
    maintenance: 2,
  },
  {
    groupCode: "test",
    name: "tester3",
    sprintId: 1,
    workingDays: 10,
    md: 2,
    outOfOffice: 8,
    releases: 0,
    fridayProjects: 0,
    maintenance: 0,
  }
];

export const singleSprintTestData = [
  {
    groupCode: "test",
    sprintId: 1,
    planned: 30,
    added: 0,
    removed: 0,
    totalCompleted: 15,
    totalMd: 14,
    plannedCompletedDifference: 0.5,
  }
];

export const singleProgressTestData = [
  {
    groupCode: "test",
    sprintId: 1,
    name: "tester",
    workAssigned: 9,
    workCompleted: 7,
    averagePerMd: 0.7,
  },
  {
    groupCode: "test",
    sprintId: 1,
    name: "tester2",
    workAssigned: 7,
    workCompleted: 5,
    averagePerMd: 1.25,
  },
  {
    groupCode: "test",
    sprintId: 1,
    name: "tester3",
    workAssigned: 3,
    workCompleted: 3,
    averagePerMd: 1.5,
  }
];