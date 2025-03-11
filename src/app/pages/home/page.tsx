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
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween"; 


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

// Updated events data structure (no need for day, month, or year)
const events = [
  {
    name: "Tech Conference 2025",
    organizer: "Tech Inc.",
    date: "2025-05-18", // Use the actual date
    time: "10:00 AM",
  },
  {
    name: "Art Exhibition",
    organizer: "Creative Studios",
    date: "2025-05-19",
    time: "6:00 PM",
  },
  {
    name: "Art Exhibition",
    organizer: "Creative Studios",
    date: "2025-05-20",
    time: "6:00 PM",
  },
  {
    name: "Art Exhibition",
    organizer: "Creative Studios",
    date: "2025-05-21",
    time: "6:00 PM",
  },
  {
    name: "Art Exhibition",
    organizer: "Creative Studios",
    date: "2025-05-22",
    time: "6:00 PM",
  },
  {
    name: "Art Exhibition",
    organizer: "Creative Studios",
    date: "2025-05-23",
    time: "6:00 PM",
  },
  {
    name: "Art Exhibition",
    organizer: "Creative Studios",
    date: "2025-05-24",
    time: "6:00 PM",
  },
  {
    name: "blahhhh",
    organizer: "Tech Inc.",
    date: "2025-05-18", // Use the actual date
    time: "10:00 AM",
  },
];

export default function Home() {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const startOfWeek = getStartOfWeek(currentDate);

  const daysOfWeek: DaysOfWeek[] = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  ];

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

  // Filter events to only those in the selected week
  const isEventInSelectedWeek = (eventDate: string) => {
    const eventDay = dayjs(eventDate); 
    return eventDay.isBetween(startOfCurrentWeek, endOfCurrentWeek, null, "[]"); // Check if the event is within the range
  };

  // acc is {} at start
  const eventsByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = events.filter((event) => {
      const eventDay = dayjs(event.date); 
      return eventDay.format('dddd') === day && isEventInSelectedWeek(event.date); //check day of the week of event
    });
    return acc;
  }, {} as Record<DaysOfWeek, any[]>);
  

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
                {eventsByDay[day].map((event, eventIdx) => (
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
