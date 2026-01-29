import { getTeamEstimatedCompleted } from "../../src/helpers/getTeamEstimatedCompleted";
import { doubleCapacityTestData, doubleProgressTestData, doubleSprintId, doubleSprintTestData } from "../doubleSprintTestData";
import { singleProgressTestData, singleCapacityTestData, singleSprintId, singleSprintTestData } from "../singleSprintTestData";
import { capacityTestData, progressTestData, sprintId, sprintTestData } from "../testData";

describe('getTeamEstimatedCompleted', () => {
    it('Should correctly sum up all the data', () => {
        const result = getTeamEstimatedCompleted({
              progressData: progressTestData,
              capacityData: capacityTestData,
              sprintData: sprintTestData,
              nextSprintId: sprintId
            })

        expect(result).toBe(11);
    });
    it('should return Nan when calculating for 1st sprint', () => {
        

        const result = getTeamEstimatedCompleted({
              progressData: singleProgressTestData,
              capacityData: singleCapacityTestData,
              sprintData: singleSprintTestData,
              nextSprintId: singleSprintId
            });
        expect(result).toBe(NaN);
    })

    it('should return data when calculating for 2nd sprint', () => {
        const result = getTeamEstimatedCompleted({
              progressData: doubleProgressTestData,
              capacityData: doubleCapacityTestData,
              sprintData: doubleSprintTestData,
              nextSprintId: doubleSprintId
            });
        expect(result).toBe(9);
    })
})