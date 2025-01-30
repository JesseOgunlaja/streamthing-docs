import styles from "@/styles/page.module.css";
import { TriangleAlert } from "lucide-react";

type PropsType = {
  children?: React.ReactNode;
  text?: string;
};

const Warning = ({ children, text }: PropsType) => {
  return (
    <div className={styles.warning}>
      <span>
        <TriangleAlert /> Warning
      </span>
      <p>{children || text}</p>
    </div>
  );
};

export default Warning;
