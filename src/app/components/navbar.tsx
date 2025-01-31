"use client";
import { useState, useEffect } from "react";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
  const initialNavigation = [
    { name: "Home", href: "/", current: false },
    { name: "New Event", href: "/new-event", current: false },
    { name: "Report Problem", href: "/report-problem", current: false },
  ];

  const [navigation, setNavigation] = useState(initialNavigation);
  const [loading, setLoading] = useState(true); // set loading to true on page load

  useEffect(() => {
    const currentPath = window.location.pathname;

    setNavigation((prevNavigation) =>
      prevNavigation.map((item) => ({
        ...item,
        current: item.href === currentPath, // set current to true if the href matches the current path
      }))
    );

    setLoading(false); // set loading to false
  }, []); 

  const handleTabClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    clickedTab: string
  ) => {
    e.preventDefault(); // prevent default anchor click behavior

    setNavigation((prevNavigation) =>
      prevNavigation.map((item) => ({
        ...item,
        current: item.name === clickedTab, // set current to true for clicked tab
      }))
    );

    // go to clicked tab href
    const clickedTabItem = navigation.find((item) => item.name === clickedTab);
    if (clickedTabItem) {
      window.location.href = clickedTabItem.href;
    }
  };

  function classNames(...classes: (string | undefined | boolean)[]) {
    return classes.filter(Boolean).join(" ");
  }

  // Only render the navigation when the page is no longer in the loading state
  if (loading) {
    return null; // add spinner later if needed
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Edureka</div>
        <div className={styles.tabs}>
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current ? styles.currentTab : styles.remainingTabs
              )}
              onClick={(e) => handleTabClick(e, item.name)} // Handle tab click with event
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
