export interface functionProps {
  workingDays: string;
  outOfOffice: string;
  fridayProject: string;
  releases: string;
  maintenance: string;
}

export function getMdForUser({
  workingDays,
  outOfOffice,
  fridayProject,
  releases,
  maintenance,
}: functionProps) {
  console.log("working", workingDays)
  const availableMds =
    Number(workingDays) -
    (Number(outOfOffice) +
      Number(fridayProject) +
      Number(releases) +
      Number(maintenance));
  return availableMds;
}
