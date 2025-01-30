import styles from "@/styles/navbar/top-navbar.module.css";
import TitleLink from "../TitleLink";
import ToggleTheme from "../ToggleTheme";

const TopNavbar = async () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li id={styles.title}>
          <TitleLink />
        </li>
        <li>
          <ToggleTheme />
        </li>
      </ul>
    </nav>
  );
};

export default TopNavbar;
