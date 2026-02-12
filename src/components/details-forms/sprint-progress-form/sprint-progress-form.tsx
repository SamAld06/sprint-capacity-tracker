import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { workProgress } from "../../../types/workProgress";
import { getUserAveragePerMd } from "../../../helpers/getUserAveragePerMd";
import { capacity } from "../../../types/capacity";

export interface SprintProgressFormProps {
  onClose: () => void;
  data: workProgress[] | null;
  capacityData: capacity[] | null
  onSubmit: (data: workProgress) => void;
}

export const SprintProgressForm = ({
  onClose,
  data,
  capacityData,
  onSubmit,
}: SprintProgressFormProps) => {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("")
  const [currentSprint, setCurrentSprint] = useState<string>("");
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [workAssigned, setworkAssigned] = useState<string>("");
  const [workCompleted, setWorkCompleted] = useState<string>("");
  const [md, setMd] = useState<string>("0")
  const [averagePerMd, setAveragePerMd] = useState<number>(getUserAveragePerMd(Number(workCompleted), Number(md)))
  const getTeamMemberData =
    currentName && currentSprint
      ? data?.find(
          (user) =>
            currentName === user.name &&
            Number(currentSprint) === user.sprintid,
        )
      : undefined;

  const getTeamMemberCapacityData = 
    currentName && currentSprint
      ? capacityData?.find(
          (user) =>
            currentName === user.name &&
            Number(currentSprint) === user.sprintid,
        )
      : undefined;

  useEffect(() => {
    if (!getTeamMemberData) return;
    if (!getTeamMemberCapacityData) return;

    if (getTeamMemberData.workassigned !== undefined) {
      setworkAssigned(String(getTeamMemberData.workassigned));
    }
    if (getTeamMemberData.workcompleted !== undefined) {
      setWorkCompleted(String(getTeamMemberData.workcompleted));
    }
    if (getTeamMemberCapacityData?.md !== undefined) {
      setMd(String(getTeamMemberCapacityData.md))
    }
  }, [getTeamMemberData, getTeamMemberCapacityData], );

  const handleSubmit = async (e: React.FormEvent) => {
    const params = new URLSearchParams(window.location.search);
    const groupcode = params.get("groupcode");
    if (!groupcode) {
      setErr("No group code could be retrieved");
      return;
    }

    const mdNum = Number(md) || 0;
    const mdAverage = getUserAveragePerMd(Number(workCompleted), mdNum);

    const payload = {
      groupcode: groupcode,
      sprintid: Number(currentSprint),
      name: currentName || "",
      workassigned: Number(workAssigned),
      workcompleted: Number(workCompleted),
      averagepermd: mdAverage
    };
    e.preventDefault();
    if (
      currentSprint == null ||
      currentName == "" ||
      workAssigned == null ||
      workCompleted == null ||
      averagePerMd == null 
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
                {data &&
                  [...new Set(data.map(data => data.sprintid))]
                    .filter(Boolean)
                    .map(sprint => (
                      <option value={sprint}>{sprint}</option>
                    ))}
              </select>
            </div>
            <div className={styles.inputRow}>
              <label>Team Member:</label>
              <select
                className={styles.inputBox}
                value={currentName ?? ""}
                onChange={(e) => setCurrentName(e.target.value)}
              >
                <option value="">Select a team member</option>
                {data &&
                  data
                    .filter((data) => data.sprintid === Number(currentSprint))
                    .map((data) => (
                      <option value={data.name}>{data.name}</option>
                    ))}
              </select>
            </div>
            <div className={styles.inputRow}>
              <label>Work assigned:</label>
              <input
                className={styles.inputBox}
                type="number"
                value={workAssigned}
                onChange={(e) => setworkAssigned(e.target.value)}
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
