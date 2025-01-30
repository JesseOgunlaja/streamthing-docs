"use client";

import styles from "@/styles/utils/title-link.module.css";
import Image from "next/image";
import Link from "next/link";

const TitleLink = () => {
  return (
    <Link id={styles.link} href="/">
      <Image
        id={styles["light-theme-logo"]}
        width={40}
        height={40}
        alt="Logo"
        src="/light-theme-logo.png"
        priority
      />{" "}
      <Image
        id={styles["dark-theme-logo"]}
        width={40}
        height={40}
        alt="Logo"
        src="/dark-theme-logo.png"
        priority
      />{" "}
      streamthing <span>Docs</span>
    </Link>
  );
};

export default TitleLink;
