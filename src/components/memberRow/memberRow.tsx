import styles from "./styles.module.css"

export interface MemberRowProps {
    name: string;
}

export const MemberRow = ({ name }: MemberRowProps) => {
  return (
      <div className={styles.root}>
        <div className={styles.name}>
            <p>{name}</p>
        </div>
        <div className={styles.buttonHolder}>
            <button className={styles.button}>Remove</button>
            <button className={styles.button}>Edit name</button>
        </div>
      </div>
  );
};