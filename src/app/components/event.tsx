import React from "react";
import styles from "../styles/event.module.css";

interface EventProps {
  title: string;
  eventHost: string;
  location: string;
  club: string;
  onClick?: () => void;
}

const Event: React.FC<EventProps> = ({ title, eventHost, location, club, onClick }) => {
  return (
    <div className={styles.eventContainer} onClick={onClick}>
      <div className={styles.eventHeader}>
        <h2 className={styles.eventName}>{title}</h2>
        <p className={styles.eventOrganizer}>{eventHost}</p>
      </div>
      <div className={styles.eventDetails}>
        <p className={styles.eventDate}>{location}</p>
        <p className={styles.eventTime}>{club}</p>
      </div>
    </div>
  );
};

export default Event;
