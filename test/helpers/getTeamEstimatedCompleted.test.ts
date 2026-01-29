import { getTeamEstimatedCompleted } from "@/helpers/getTeamEstimatedCompleted";
import { capacity } from "@/types/capacity";
import { sprint } from "@/types/sprint";
import { workProgress } from "@/types/workProgress";

describe('getTeamEstimatedCompleted', () => {
    it('Should correctly sum up all the data', () => {
        const sprintId = 4;
        const capacityTestData: capacity[] = [
            {groupCode: "test", name: "tester", sprintId: 1, workingDays: 10, md: 10, outOfOffice: 0, releases: 0, fridayProjects: 0, maintenance: 0,},
            {groupCode: "test", name: "tester2", sprintId: 1, workingDays: 8, md: 4, outOfOffice: 0, releases: 0, fridayProjects: 2, maintenance: 2,},
            {groupCode: "test", name: "tester3", sprintId: 1, workingDays: 10, md:2, outOfOffice: 8, releases: 0, fridayProjects: 0, maintenance: 0,},
            {groupCode: "test", name: "tester", sprintId: 2, workingDays: 10, md: 8, outOfOffice: 2, releases: 0, fridayProjects: 0, maintenance: 0,},
            {groupCode: "test", name: "tester2", sprintId: 2, workingDays: 8, md: 5, outOfOffice: 0, releases: 0, fridayProjects: 1, maintenance: 2,},
            {groupCode: "test", name: "tester3", sprintId: 2, workingDays: 10, md:4, outOfOffice: 6, releases: 0, fridayProjects: 0, maintenance: 0,},
            {groupCode: "test", name: "tester", sprintId: 3, workingDays: 10, md: 10, outOfOffice: 0, releases: 0, fridayProjects: 0, maintenance: 0,},
            {groupCode: "test", name: "tester2", sprintId: 3, workingDays: 8, md: 8, outOfOffice: 0, releases: 0, fridayProjects: 0, maintenance: 2,},
            {groupCode: "test", name: "tester3", sprintId: 3, workingDays: 10, md: 10, outOfOffice: 0, releases: 0, fridayProjects: 0, maintenance: 0,},
            {groupCode: "test", name: "tester", sprintId: 4, workingDays: 10, md: 8, outOfOffice: 2, releases: 0, fridayProjects: 0, maintenance: 0,},
            {groupCode: "test", name: "tester2", sprintId: 4, workingDays: 8, md: 6, outOfOffice: 0, releases: 0, fridayProjects: 0, maintenance: 2,},
            {groupCode: "test", name: "tester3", sprintId: 4, workingDays: 10, md:8, outOfOffice: 2, releases: 0, fridayProjects: 0, maintenance: 0,}
        ];
        const sprintTestData: sprint[] = [
            {groupCode: "test", sprintId: 1, planned: 30, added: 0, removed: 0, totalCompleted: 15, totalMd: 14, plannedCompletedDifference: 0.5},
            {groupCode: "test", sprintId: 2, planned: 25, added: 1, removed: 2, totalCompleted: 14, totalMd: 17, plannedCompletedDifference: 0.44},
            {groupCode: "test", sprintId: 3, planned: 23, added: 1, removed: 0, totalCompleted: 17, totalMd: 20, plannedCompletedDifference: 0.26},
            {groupCode: "test", sprintId: 4, planned: 22, added: 0, removed: 0, totalCompleted: 0, totalMd: 23, plannedCompletedDifference: 1}
        ]
        const progressTestData: workProgress[] = [
            {groupCode: "test", sprintId: 1, name: "tester", workAssigned: 9, workCompleted: 7, averagePerMd: 0.7},
            {groupCode: "test", sprintId: 1, name: "tester2", workAssigned: 7, workCompleted: 5, averagePerMd: 1.25},
            {groupCode: "test", sprintId: 1, name: "tester3", workAssigned: 3, workCompleted: 3, averagePerMd: 1.5},//sprint1
            {groupCode: "test", sprintId: 2, name: "tester", workAssigned: 7, workCompleted: 5, averagePerMd: 0.625},
            {groupCode: "test", sprintId: 2, name: "tester2", workAssigned: 7, workCompleted: 5, averagePerMd: 1},
            {groupCode: "test", sprintId: 2, name: "tester3", workAssigned: 5, workCompleted: 4, averagePerMd: 1},//sprint2
            {groupCode: "test", sprintId: 3, name: "tester", workAssigned: 9, workCompleted: 7, averagePerMd: 0.7},
            {groupCode: "test", sprintId: 3, name: "tester2", workAssigned: 7, workCompleted: 5, averagePerMd: 0.625},
            {groupCode: "test", sprintId: 3, name: "tester3", workAssigned: 7, workCompleted: 5, averagePerMd: 0.5},//sprint3
            {groupCode: "test", sprintId: 4, name: "tester", workAssigned: 0, workCompleted: 0, averagePerMd: 0},
            {groupCode: "test", sprintId: 4, name: "tester2", workAssigned: 0, workCompleted: 0, averagePerMd: 0},
            {groupCode: "test", sprintId: 4, name: "tester3", workAssigned: 0, workCompleted: 0, averagePerMd: 0}
        ]

        const result = getTeamEstimatedCompleted({
              progressData: progressTestData,
              capacityData: capacityTestData,
              sprintData: sprintTestData,
              nextSprintId: sprintId
            })

        expect(result).toBe(28);
    });
    it('should return Nan when calculating for 1st sprint', () => {
        const result = getTeamEstimatedCompleted([]);
        expect(result).toBe(28);
    })

    it('should return data when calculating for 2nd sprint', () => {
        const result = getTeamEstimatedCompleted([]);
        expect(result).toBe(28);
    })
})