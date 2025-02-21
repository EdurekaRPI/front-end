"use client";
import React, { useState } from "react";
import Navbar from "../../components/navbar";
import styles from "../../styles/home.module.css";
import Event from "../../components/event";

type DaysOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export default function Home() {
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

  return (
    <>
      <Navbar />
      <div className={styles.calendarContainer}>
        <div className={styles.calendar}>
          <div className={styles.header}>
            {daysOfWeek.map((day, index) => (
              <div key={index} >
                {day}
              </div>
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
