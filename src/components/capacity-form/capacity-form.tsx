import { capacity } from "@/types/capacity";
import { useState } from "react";
import styles from "./styles.module.css";
import { getMdForUser } from "@/helpers/getMdForUser";

export interface CapacityFormProps {
  onClose: () => void
  data: capacity[] | null;
  onSubmit: (data: capacity) => void
}

export const CapacityForm = ({ onClose, data, onSubmit }: CapacityFormProps) => {
  const currentGroup = "t3stGr0up1"
  const [loading, setLoading] = useState(true);
  // const [formIsOpen, setFormIsOpen] = useState<boolean>(isOpen);
  const [currentSprint, setCurrentSprint] = useState<string>("");
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [workingDays, setWorkingDays] = useState<string>("");
  const [outOfOffice, setOutOfOffice] = useState<string>("");
  const [releases, setReleases] = useState<string>("");
  const [fridayProject, setFridayProject] = useState<string>("");
  const [maintenance, setMaintenance] = useState<string>("");
  const getTeamMemberData =
    currentName && currentSprint
      ? data?.filter(
          (data) =>
            currentName === data.name && Number(currentSprint) === data.sprintId
        )
      : [];
  // if (!isOpen) {
  //   return null;
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("fire away")
    console.log("name", currentName)
    const payload = {
      groupCode: String(currentGroup),
      sprintId: Number(currentSprint),
      name: currentName || "",
      workingDays: Number(workingDays),
      outOfOffice: Number(outOfOffice),
      releases: Number(releases),
      fridayProjects: Number(fridayProject),
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
      fridayProject== null ||
      maintenance == null
    ) {
      alert("All fields must be filled");
      return;
    }
    console.log(payload)
    await onSubmit(payload);
  };


  console.log("form:", data);
  console.log(currentName);
  console.log(getTeamMemberData);
  console.log(currentSprint);
  console.log("loading:", loading)

  return (
    <div className={styles.root}>
      <div className={styles.modal}>
        <button
          onClick={onClose}
          className={styles.closeButton}
        >
          X
        </button>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputs}>
            <div className={styles.inputRow}>
              <label>Sprint to edit:</label>
              <input
                className={styles.inputBox}
                type="number"
                value={currentSprint}
                onChange={(e) => setCurrentSprint(e.target.value)}
              ></input>
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
                    .filter((data) => data.sprintId === Number(currentSprint))
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
          <button
            type="submit"
            disabled={false}
            className={styles.saveButton}
            
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
