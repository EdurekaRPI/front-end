"use client";
import React, { useState } from "react";
import Navbar from "../../components/navbar";
import styles from "../../styles/home.module.css";
import Event from "../../components/event";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs"; // Import dayjs and Dayjs type


// Helper function to get the start of the week (Sunday) from a given date
const getStartOfWeek = (date: Dayjs): Dayjs => {
  const day = date.day();
  const diff = date.date() - day; // Get the difference from Sunday
  const sunday = date.set("date", diff); // Set the date to the start of the week (Sunday)
  return sunday.startOf("day"); // Set time to midnight
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Helper function to format a date to YYYY-MM-DD format
const formatDate = (date: Dayjs): string => {
  const year = date.year();
  const month = monthNames[date.month()].substring(0, 3); // Get the short name of the month
  const day = `0${date.date()}`.slice(-2);
  return `${month} ${day} ${year}`;
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
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
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
    const newDate = startOfWeek.add(direction * 7, "day"); // Move the date forward or backward by 1 week
    setCurrentDate(newDate);
  };

  // Calculate the current week's start and end dates
  const startOfCurrentWeek = getStartOfWeek(currentDate);
  const endOfCurrentWeek = startOfCurrentWeek.add(6, "day");

  const setToday = () => {
    setCurrentDate(dayjs()); // Set to today's date as a Dayjs object
  };
  
  return (
    <>
      <Navbar />
      <div className={styles.calendarContainer}>
        <div className={styles.calendar}>
          {/* Header with the current week and navigation arrows */}
          <div className={styles.weekHeader}>
            <div className={styles.currentWeek}>
              {formatDate(startOfCurrentWeek)} - {formatDate(endOfCurrentWeek)}
              <button
                className={styles.arrowButton}
                onClick={() => changeWeek(-1)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                className={styles.arrowButton}
                onClick={() => changeWeek(1)}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
              <button className={styles.arrowButton} onClick={() => setToday()}>
                <FontAwesomeIcon icon={faArrowsRotate} />
              </button>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Select Date"
                  value={currentDate}
                  onChange={(newDate) => newDate && setCurrentDate(newDate)} 
                />
              </DemoContainer>
            </LocalizationProvider>
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
