import React from "react";
import styles from "../styles/event.module.css";

interface EventProps {
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  onClick?: () => void;
}

const Event: React.FC<EventProps> = ({ title, location, startTime, endTime, onClick }) => {
  return (
    <div className={styles.eventContainer} onClick={onClick}>
      <div className={styles.eventHeader}>
        <h2 className={styles.eventName}>{title}</h2>
      </div>
      <div className={styles.eventDetails}>
        <p className={styles.eventComponent}>{location}</p>
        <p className={styles.eventComponent}>{startTime} - {endTime}</p>
      </div>
    </div>
  );
};

export default Event;
