"use client";

import "@/styles/utils/toggle-theme.css";
import styles from "@/styles/utils/toggle-theme.module.css";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./StateProvider";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();

  function changeTheme() {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (document.startViewTransition) {
      document.startViewTransition(toggleTheme);
    } else {
      toggleTheme();
    }
  }

  return (
    <div id="toggle-theme-container" className={styles.container}>
      <input
        aria-label="Toggle theme"
        onChange={changeTheme}
        checked={theme === "dark"}
        type="checkbox"
        className={styles.checkbox}
      />
      <label
        aria-label="Toggle theme"
        onClick={changeTheme}
        className={styles["checkbox-label"]}
      >
        <span className={styles.ball}>
          <Sun id={styles.sun} />
          <Moon id={styles.moon} />
        </span>
      </label>
    </div>
  );
};

export default ToggleTheme;
