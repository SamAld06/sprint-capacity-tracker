import Link from "next/link";
import styles from "./styles.module.css"
import { useSearchParams } from "next/navigation";

export const TabBar = () => {
  const searchParams = useSearchParams();
  const groupcode = searchParams.get("groupcode")

  const addCode = (path: string) => groupcode ? `${path}?groupcode=${groupcode}` : path
  return (
    <>
      <div className={styles.root}>
        <div className={styles.infoTabs}>
            <Link href={addCode("/group/dashboard")}>
              <button>Dashboard</button>
            </Link>
            <Link href={addCode("/group/sprint")}>
              <button>Sprint</button>
            </Link>
            <Link href={addCode("/group/capacity")}>
              <button>Capacity</button>
            </Link>
            <Link href={addCode("/group/members")}>
              <button>Members</button>
            </Link>
        </div>
        <Link href={addCode("/group/settings")}>
        <button className={styles.settings}>Settings</button>
        </Link>
      </div>
    </>
  );
};