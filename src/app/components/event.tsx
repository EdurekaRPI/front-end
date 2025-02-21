import React from "react";
import styles from "../styles/event.module.css";

interface EventProps {
  name: string;
  organizer: string;
  date: string;
  time: string;
}

const Event: React.FC<EventProps> = ({ name, organizer, date, time }) => {
  return (
    <div className={styles.eventContainer}>
      <div className={styles.eventHeader}>
        <h2 className={styles.eventName}>{name}</h2>
        <p className={styles.eventOrganizer}>Organized by: {organizer}</p>
      </div>
      <div className={styles.eventDetails}>
        <p className={styles.eventDate}>Date: {date}</p>
        <p className={styles.eventTime}>Time: {time}</p>
      </div>
    </div>
  );
};

export default Event;
