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
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("")
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
            Number(currentSprint) === sprint.sprintid,
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

    if (getTeamData.totalcompleted!== undefined) {
      setWorkCompleted(String(getTeamData.totalcompleted));
    }

    if (getTeamData.totalmd!== undefined) {
      setTotalMd(String(getTeamData.totalmd));
    }

    if (getTeamData.plannedcompleteddifference!== undefined) {
      setCompletionDifference(String(getTeamData.plannedcompleteddifference));
    }
  }, [getTeamData]);
    const latestSprintProgressData = progressData?.filter(
        (sprintProgress) => sprintProgress.sprintid === Number(currentSprint)
    );
  const handleSubmit = async (e: React.FormEvent) => {
    const params = new URLSearchParams(window.location.search);
    const groupcode = params.get("groupcode");
    if (!groupcode) {
      setErr("No group code could be retrieved");
      return;
    }
    const payload = {
      groupcode: groupcode,
      sprintid: Number(currentSprint),
      planned: Number(workPlanned),
      added: Number(workAdded),
      removed: Number(workRemoved),
      totalcompleted: Number(workCompleted),
      totalmd: Number(totalMd),
      plannedcompleteddifference: getSprintCompletionDifference(Number(workCompleted), Number(workPlanned))
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
                    .filter((data) => data.sprintid)
                    .map((data) => (
                      <option value={data.sprintid}>{data.sprintid}</option>
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
          {err && <p>{err}</p>}
        </form>
      </div>
    </div>
  );
};