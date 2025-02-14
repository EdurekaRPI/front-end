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
              <div key={index} className={styles.day}>
                {day}
              </div>
            ))}
          </div>
          <div className={styles.body}>
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className={styles.cell}>
                {/* Render events for each day */}
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

      {/* <div className={styles.calendar}>
        <div className={styles.header}>
          <div className={styles.empty}></div> 
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
      </div> */}
    </>
  );
}
