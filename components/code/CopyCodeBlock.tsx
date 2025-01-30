"use client";

import styles from "@/styles/page.module.css";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface PropsType {
  formattedCode: string;
}

const CopyCodeBlock = ({ formattedCode }: PropsType) => {
  const [copyHidden, setCopyHidden] = useState(false);
  const [checkHidden, setCheckHidden] = useState(true);

  function onClick() {
    setCopyHidden(true);
    setTimeout(() => {
      setCheckHidden(false);
      setTimeout(() => {
        setCheckHidden(true);
        setTimeout(() => {
          setCopyHidden(false);
        }, 200);
      }, 800);
    }, 200);
    navigator.clipboard.writeText(formattedCode);
  }

  return (
    <div className={styles.copyText}>
      <Copy className={copyHidden ? styles.hidden : ""} onClick={onClick} />
      <Check className={checkHidden ? styles.hidden : ""} />
    </div>
  );
};

export default CopyCodeBlock;
