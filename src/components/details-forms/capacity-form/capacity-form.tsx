import { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { capacity } from "../../../types/capacity";
import { getMdForUser } from "../../../helpers/getMdForUser";

export interface CapacityFormProps {
  onClose: () => void;
  data: capacity[] | null;
  onSubmit: (data: capacity) => void;
}

export const CapacityForm = ({
  onClose,
  data,
  onSubmit,
}: CapacityFormProps) => {
  const currentGroup = "t3stGr0up1";
  const [currentSprint, setCurrentSprint] = useState<string>("");
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [workingDays, setWorkingDays] = useState<string>("");
  const [outOfOffice, setOutOfOffice] = useState<string>("");
  const [releases, setReleases] = useState<string>("");
  const [fridayProject, setFridayProject] = useState<string>("");
  const [maintenance, setMaintenance] = useState<string>("");
  const getTeamMemberData =
    currentName && currentSprint
      ? data?.find(
          (user) =>
            currentName === user.name &&
            Number(currentSprint) === user.sprintid,
        )
      : undefined;


  useEffect(() => {
    if (!getTeamMemberData) return;
    if (getTeamMemberData.workingdays !== undefined) {
      setWorkingDays(String(getTeamMemberData.workingdays));
    }
    if (getTeamMemberData.outofoffice !== undefined) {
      setOutOfOffice(String(getTeamMemberData.outofoffice));
    }
    if (getTeamMemberData.releases !== undefined) {
      setReleases(String(getTeamMemberData.releases));
    }
    if (getTeamMemberData.fridayprojects !== undefined) {
      setFridayProject(String(getTeamMemberData.fridayprojects));
    }
    if (getTeamMemberData.maintenance !== undefined) {
      setMaintenance(String(getTeamMemberData.maintenance));
    }
  }, [getTeamMemberData]);

  const handleSubmit = async (e: React.FormEvent) => {
    const payload = {
      groupcode: currentGroup,
      sprintid: Number(currentSprint),
      name: currentName || "",
      workingdays: Number(workingDays),
      outofoffice: Number(outOfOffice),
      releases: Number(releases),
      fridayprojects: Number(fridayProject),
      maintenance: Number(maintenance),
      md: getMdForUser({
        workingDays,
        outOfOffice,
        fridayProject,
        releases,
        maintenance,
      }),
    };
    e.preventDefault();
    if (
      currentSprint == null ||
      currentName == "" ||
      workingDays == null ||
      outOfOffice == null ||
      releases == null ||
      fridayProject == null ||
      maintenance == null
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
              {/* <input
                className={styles.inputBox}
                type="number"
                value={currentSprint}
                onChange={(e) => setCurrentSprint(e.target.value)}
              ></input> */}
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
              <label>Working days:</label>
              <input
                className={styles.inputBox}
                type="number"
                value={workingDays}
                onChange={(e) => setWorkingDays(e.target.value)}
              ></input>
            </div>
            <div className={styles.inputRow}>
              <label>Out of office:</label>
              <input
                className={styles.inputBox}
                type="number"
                value={outOfOffice}
                onChange={(e) => setOutOfOffice(e.target.value)}
              ></input>
            </div>
            <div className={styles.inputRow}>
              <label>Releases:</label>
              <input
                className={styles.inputBox}
                type="number"
                value={releases}
                onChange={(e) => setReleases(e.target.value)}
              ></input>
            </div>
            <div className={styles.inputRow}>
              <label>Friday project:</label>
              <input
                className={styles.inputBox}
                type="number"
                value={fridayProject}
                onChange={(e) => setFridayProject(e.target.value)}
              ></input>
            </div>
            <div className={styles.inputRow}>
              <label>Maintenance:</label>
              <input
                className={styles.inputBox}
                type="number"
                value={maintenance}
                onChange={(e) => setMaintenance(e.target.value)}
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
