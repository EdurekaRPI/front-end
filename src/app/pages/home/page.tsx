import React from "react";
import Navbar from "../../components/navbar";
import styles from "../../styles/home.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.calendar}>
        <div className={styles.header}>
          <div className={styles.empty}></div> {/* Empty cell for the top left corner */}
          <div className={styles.day}>Sunday</div>
          <div className={styles.day}>Monday</div>
          <div className={styles.day}>Tuesday</div>
          <div className={styles.day}>Wednesday</div>
          <div className={styles.day}>Thursday</div>
          <div className={styles.day}>Friday</div>
          <div className={styles.day}>Saturday</div>
        </div>

        <div className={styles.grid}>
          {[...Array(24)].map((_, index) => {
            const hour = 
            index === 0
              ? "12 AM" // 12 AM for midnight
              : index < 12
              ? `${index} AM` // 1 AM to 11 AM
              : index === 12
              ? "12 PM" // 12 PM for noon
              : `${index - 12} PM`; // 1 PM to 11 PM
            return (
              <React.Fragment key={hour}>
                <div className={styles.hour}>{hour}</div>
                {[...Array(7)].map((_, dayIndex) => (
                  <div
                    key={`${hour}-${dayIndex}`}
                    className={styles.cell}
                  ></div>
                ))}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </>
  );
}
