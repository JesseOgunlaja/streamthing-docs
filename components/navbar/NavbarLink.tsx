"use client";

import styles from "@/styles/navbar/side-navbar.module.css";
import { checkElementVisibility } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, MouseEvent, useEffect, useRef } from "react";

interface PropsType extends ComponentProps<typeof Link> {
  rewrite?: string;
  sections?: {
    link: string;
    name: string;
  }[];
}

const NavbarLink = (props: PropsType) => {
  const pathname = usePathname();
  const isActive = props.href === pathname || props.rewrite === pathname;
  const currentSectionBox = useRef<HTMLDivElement>(null);

  function onLinkClick(e: MouseEvent) {
    if (isActive) {
      e.preventDefault();
      window.scrollTo(0, 0);
    }
  }

  useEffect(() => {
    setInterval(() => {
      if (!props.sections || !isActive) return;

      const visibleSections = props.sections
        .reduce(
          (acc, section) => {
            const element = document.querySelector(section.link) as
              | HTMLElement
              | undefined;
            if (!element) return acc;

            const visibility = checkElementVisibility(element);

            if (acc.length === 0 || visibility > acc[0].visibility) {
              return [{ element, visibility }];
            } else if (visibility === acc[0].visibility) {
              return [...acc, { element, visibility }];
            }

            return acc;
          },
          [] as { element: HTMLElement; visibility: number }[]
        )
        .map((section) => `#${section.element.id}`);

      const start = props.sections.findIndex(
        (section) => section.link === visibleSections[0]
      );

      const currentSection = currentSectionBox.current;
      currentSection?.style.setProperty("--translateY", `${start * 28}px`);
      currentSection?.style.setProperty(
        "--height",
        `${visibleSections.length * 28}px`
      );
    }, 100);
  }, [pathname]);

  return (
    <div>
      <Link
        onClick={onLinkClick}
        data-show-background={props.sections == undefined}
        className={isActive ? styles.active : ""}
        {...props}
      >
        {props.children}
        <div
          data-active={isActive}
          ref={currentSectionBox}
          id={styles.currentSection}
        ></div>
      </Link>
      {isActive && (
        <>
          <div className={styles.sectionsContainer}>
            <div className={styles.sections}>
              {props.sections?.map((section) => (
                <a key={section.name} href={section.link}>
                  {section.name}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NavbarLink;
