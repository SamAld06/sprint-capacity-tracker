import { capacity } from "@/types/capacity";
import { useState } from "react";
import styles from "./styles.module.css";

export interface CapacityFormProps {
  isOpen: boolean;
  data: capacity[] | null;
  onSave: (newValue: string) => Promise<void>;
}

export const CapacityForm = ({ isOpen, data, onSave }: CapacityFormProps) => {
  const [loading, setLoading] = useState(true);
  const [formIsOpen, setFormIsOpen] = useState<boolean>(isOpen);
  const [currentSprint, setCurrentSprint] = useState<string>("");
  const [currentName, setCurrentName] = useState<string | null>(null);
  const [availableMds, setAvailableMds] = useState<string>("");
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
  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setLoading(false);
  };
  console.log("form:", data);
  console.log(currentName);
  console.log(getTeamMemberData);
  console.log(value);
  console.log(currentSprint);

  return (
    <div className={styles.root}>
      <div className={styles.modal}>
        <button
          onClick={() => setFormIsOpen(false)}
          className={styles.closeButton}
        >
          X
        </button>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputs}>
            <label>
              Sprint to edit:
              <input
                type="number"
                value={currentSprint}
                onChange={(e) => setCurrentSprint(e.target.value)}
              ></input>
            </label>
            <label>
              Team Member:
              <select
                value={currentName ?? ""}
                onChange={(e) => setCurrentName(e.target.value)}
              >
                {data && data
                  .filter((data) => data.sprintId === Number(currentSprint))
                  .map((data) => (
                    <option value={data.name}>{data.name}</option>
                  ))}
              </select>
            </label>
            <label>
              Available md's:
              <input
                type="number"
                value={availableMds}
                onChange={(e) => setAvailableMds(e.target.value)}
              ></input>
            </label>
            <label>
              Out of office:
              <input
                type="number"
                value={outOfOffice}
                onChange={(e) => setOutOfOffice(e.target.value)}
              ></input>
            </label>
            <label>
              Releases:
              <input
                type="number"
                value={releases}
                onChange={(e) => setReleases(e.target.value)}
              ></input>
            </label>
            <label>
              Friday project:
              <input
                type="number"
                value={fridayProject}
                onChange={(e) => setFridayProject(e.target.value)}
              ></input>
            </label>
            <label>
              Maintenance:
              <input
                type="number"
                value={maintenance}
                onChange={(e) => setMaintenance(e.target.value)}
              ></input>
            </label>
            <button type="submit" disabled={loading}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
