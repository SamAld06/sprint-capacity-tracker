import { getCapacitySummary } from "@/helpers/getCapacitySummary";
import { capacity } from "@/types/capacity";
import test from "node:test";

describe('getCapacitySummary', () => {
    it('Should correctlt sum up all the data', () => {
        const testData: capacity[] = [
            {groupCode: "test", name: "tester", sprintId: 1, workingDays: 10, md: 8, outOfOffice: 2, releases: 0, fridayProjects: 0, maintenance: 0,},
            {groupCode: "test", name: "tester2", sprintId: 1, workingDays: 8, md: 4, outOfOffice: 0, releases: 0, fridayProjects: 2, maintenance: 2,},
            {groupCode: "test", name: "tester3", sprintId: 1, workingDays: 10, md:2, outOfOffice: 8, releases: 0, fridayProjects: 0, maintenance: 0,}
        ];

        const result = getCapacitySummary(testData)

        expect(result.totalWorkingDays).toBe(28);
        expect(result.totalMd).toBe(14);
        expect(result.totalOutOfOffice).toBe(10);
        expect(result.totalReleases).toBe(0);
        expect(result.totalFridayProjects).toBe(2);
        expect(result.totalMaintenance).toBe(2);
    });
    it('should return zero for empty array', () => {
        const result = getCapacitySummary([]);
        expect(result.totalWorkingDays).toBe(0);
        expect(result.totalMd).toBe(0);
        expect(result.totalOutOfOffice).toBe(0);
        expect(result.totalReleases).toBe(0);
        expect(result.totalFridayProjects).toBe(0);
        expect(result.totalMaintenance).toBe(0);
    })
})