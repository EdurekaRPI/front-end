"use client";
import React, { useState } from "react";
import Navbar from "../../components/navbar";
import styles from "../../styles/home.module.css";
import Event from "../../components/event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// Helper function to get the start of the week (Sunday) from a given date
const getStartOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const diff = date.getDate() - day; // Get the difference from Sunday
  const sunday = new Date(date.setDate(diff));
  sunday.setHours(0, 0, 0, 0); // Set the time to midnight
  return sunday;
};

// Helper function to format a date to YYYY-MM-DD format
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2); // Adding leading zero if necessary
  const day = `0${date.getDate()}`.slice(-2);
  return `${month}-${day}-${year}`;
};

type DaysOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export default function Home() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const startOfWeek = getStartOfWeek(currentDate);

  const daysOfWeek: DaysOfWeek[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const events = {
    Sunday: [
      {
        name: "Tech Conference 2025",
        organizer: "Tech Inc.",
        date: "June 15, 2025",
        time: "10:00 AM",
      },
    ],
    Monday: [
      {
        name: "Art Exhibition",
        organizer: "Creative Studios",
        date: "May 22, 2025",
        time: "6:00 PM",
      },
      {
        name: "Web Development Workshop",
        organizer: "DevHub",
        date: "May 22, 2025",
        time: "2:00 PM",
      },
    ],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  };

  // Function to handle week change (next or previous)
  const changeWeek = (direction: number) => {
    const newDate = new Date(startOfWeek);
    newDate.setDate(startOfWeek.getDate() + direction * 7); // Move the date forward or backward by 1 week
    setCurrentDate(newDate);
  };

  // Calculate the current week's start and end dates
  const startOfCurrentWeek = getStartOfWeek(currentDate);
  const endOfCurrentWeek = new Date(startOfCurrentWeek);
  endOfCurrentWeek.setDate(startOfCurrentWeek.getDate() + 6); // End is 6 days after the start of the week

  const setToday = () => {
    setCurrentDate(new Date());
  }

  return (
    <>
      <Navbar />
      <div className={styles.calendarContainer}>
        <div className={styles.calendar}>
          {/* Header with the current week and navigation arrows */}
          <div className={styles.weekHeader}>
            <button
              className={styles.arrowButton}
              onClick={() => changeWeek(-1)}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className={styles.currentWeek}>
              {formatDate(startOfCurrentWeek)} - {formatDate(endOfCurrentWeek)}
              <button
                className={styles.todayButton}
                onClick={() => setToday()}
              >
                Today
              </button>
            </div>
            <button
              className={styles.arrowButton}
              onClick={() => changeWeek(1)}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>

          <div className={styles.header}>
            {daysOfWeek.map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>
          <div className={styles.body}>
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className={styles.cell}>
                {events[day].map((event, eventIdx) => (
                  <Event
                    key={eventIdx}
                    name={event.name}
                    organizer={event.organizer}
                    date={event.date}
                    time={event.time}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
