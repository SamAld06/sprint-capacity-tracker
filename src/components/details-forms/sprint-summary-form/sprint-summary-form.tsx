import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { workProgress } from "../../../types/workProgress";
import { sprint } from "../../../types/sprint";
import { getSprintCompletionDifference } from "../../../helpers/getSprintCompletionDifference";

export interface SprintProgressFormProps {
  onClose: () => void;
  progressData: workProgress[] | null;
  summaryData: sprint[] | null;
  onSubmit: (data: sprint) => void;
}

export const SprintSummaryForm = ({
  onClose,
  progressData,
  summaryData,
  onSubmit,
}: SprintProgressFormProps) => {
  const currentGroup = "t3stGr0up1";
  const [loading, setLoading] = useState(true);
  const [currentSprint, setCurrentSprint] = useState<string>("");
  const [workPlanned, setworkPlanned] = useState<string>("");
  const [workAdded, setWorkAdded] = useState<string>("");
  const [workRemoved, setworkRemoved] = useState<string>("")
  const [averagePerMd, setAveragePerMd] = useState<string>("")
  const [totalMd,setTotalMd] = useState<string>("")
  const [workCompleted, setWorkCompleted] = useState<string>("")
  const [completionDifference, setCompletionDifference] = useState<string>("")
  const getTeamData =
    currentSprint
      ? summaryData?.find(
          (sprint) =>
            Number(currentSprint) === sprint.sprintId,
        )
      : undefined;

  useEffect(() => {
    if (!getTeamData) return;
    if (getTeamData.planned !== undefined) {
      setworkPlanned(String(getTeamData.planned));
    }

    if (getTeamData.added !== undefined) {
      setWorkAdded(String(getTeamData.added));
    }

    if (getTeamData.removed!== undefined) {
      setworkRemoved(String(getTeamData.removed));
    }

    if (getTeamData.totalCompleted!== undefined) {
      setWorkCompleted(String(getTeamData.totalCompleted));
    }

    if (getTeamData.totalMd!== undefined) {
      setTotalMd(String(getTeamData.totalMd));
    }

    if (getTeamData.plannedCompletedDifference!== undefined) {
      setCompletionDifference(String(getTeamData.plannedCompletedDifference));
    }
  }, [getTeamData]);
    const latestSprintProgressData = progressData?.filter(
        (sprintProgress) => sprintProgress.sprintId === Number(currentSprint)
    );
  const handleSubmit = async (e: React.FormEvent) => {
    const payload = {
      groupCode: currentGroup,
      sprintId: Number(currentSprint),
      planned: Number(workPlanned),
      added: Number(workAdded),
      removed: Number(workRemoved),
      totalCompleted: Number(workCompleted),
      totalMd: Number(totalMd),
      plannedCompletedDifference: getSprintCompletionDifference(Number(workCompleted), Number(workPlanned))
    };
    e.preventDefault();
    if (
      currentSprint == null ||
      workPlanned == null ||
      workAdded == null ||
      workRemoved == null ||
      workCompleted == null ||
      totalMd == null ||
      completionDifference == null 
    ) {
      alert("All fields must be filled");
      return;
    }
    await onSubmit(payload);
  };

  return (
    <div className={styles.root}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputs}>
            <div className={styles.inputRow}>
              <label>Sprint to edit:</label>
              <select
              className={styles.inputBox}
              value= {currentSprint}
              onChange={(e) => setCurrentSprint(e.target.value)}
              >
                <option value="">Select a sprint</option>
                {summaryData &&
                  summaryData
                    .filter((data) => data.sprintId)
                    .map((data) => (
                      <option value={data.sprintId}>{data.sprintId}</option>
                    ))}
              </select>
            </div>
            <div className={styles.inputRow}>
              <label>Work planned:</label>
              <input
                className={styles.inputBox}
                type="number"
                value={workPlanned}
                onChange={(e) => setworkPlanned(e.target.value)}
              ></input>
            </div>
            <div className={styles.inputRow}>
              <label>Work added:</label>
              <input
                className={styles.inputBox}
                type="number"
                value={workAdded}
                onChange={(e) => setWorkAdded(e.target.value)}
              ></input>
            </div>
            <div className={styles.inputRow}>
              <label>Work removed:</label>
              <input
                className={styles.inputBox}
                type="number"
                value={workRemoved}
                onChange={(e) => setworkRemoved(e.target.value)}
              ></input>
            </div>
            <div className={styles.inputRow}>
              <label>Work completed:</label>
              <input
                className={styles.inputBox}
                type="number"
                value={workCompleted}
                onChange={(e) => setWorkCompleted(e.target.value)}
              ></input>
            </div>
            <div className={styles.inputRow}>
              <label>Total md's:</label>
              <input
                className={styles.inputBox}
                type="number"
                value={totalMd}
                onChange={(e) => setTotalMd(e.target.value)}
              ></input>
            </div>
          </div>
          <button type="submit" disabled={false} className={styles.saveButton}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};