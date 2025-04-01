"use client";
import React, { useState, useEffect } from "react";
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
import axios from "axios";
import isBetween from "dayjs/plugin/isBetween";

// Helper function to get the start of the week (Sunday) from a given date
const getStartOfWeek = (date: Dayjs): Dayjs => {
  const day = date.day();
  const diff = date.date() - day; // Get the difference from Sunday
  const sunday = date.set("date", diff); // Set the date to the start of the week (Sunday)
  return sunday.startOf("day"); // Set time to midnight
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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
  const [events, setEvents] = useState<any[]>([]); // State to store events
  const startOfWeek = getStartOfWeek(currentDate);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<{
    title: string;
    eventHost: string;
    location: string;
    club: string;
    image: string;
    description: string;
    startTime: string;
    endTime: string;
  } | null>(null);

  const daysOfWeek: DaysOfWeek[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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

  // // Calculate events by day for the selected week
  const eventsByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = events.filter((event) => {
      const eventDay = dayjs(event.startDateTime); 
      return eventDay.format("dddd") === day && isEventInSelectedWeek(event.startDateTime);
    });
    return acc;
  }, {} as Record<DaysOfWeek, any[]>);
  

  const toggleModal = (event: any) => {
    setIsModalOpen(!isModalOpen);
    setCurrentEvent(event);
  };

  // Fetch events from the API
  const getEvents = (selectedDate: Dayjs) => {
    const formattedDate = selectedDate.format("YYYY-MM-DD");
    const herokuApiUrl = process.env.NEXT_PUBLIC_HEROKU_API_URL;
  
    axios
      .get(`${herokuApiUrl}/api/frontend/week-of-events`, {
        params: { date: formattedDate },
      })
      .then((response) => {
        console.log("Fetched events: ", response.data);
  
        // Convert start and end time for each event to EST and update eventHost if needed
        const updatedEvents = response.data.map((event: any) => {
          // Update the eventHost if it's "Unknown Club"
          const updatedHost = event.eventHost === "Unknown Club" ? "Unknown Host" : event.eventHost;
  
          return {
            ...event,
            startTime: convertToEST(event.startDateTime),
            endTime: convertToEST(event.endDateTime),
            eventHost: updatedHost, // Set the updated eventHost
          };
        });
  
        // Set the events array state with the new events
        setEvents(updatedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events: ", error);
      });
  };

  // Fetch events when currentDate changes
  useEffect(() => {
    getEvents(currentDate);
  }, [currentDate]);
  
  const convertToEST = (utcDateString: string) => {
    if (!utcDateString) {
      return "Invalid date"; // Return an error message if the date is not provided
    }

    // Create a Date object from the UTC timestamp
    const utcDate = new Date(utcDateString);
  
    // Check if the date is valid
    if (isNaN(utcDate.getTime())) {
      return "Invalid date"; // Return a message if the date is invalid
    }
  
    // Convert to EST (America/New_York) and get the time in a readable format
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "America/New_York",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
  
    const estTime = new Intl.DateTimeFormat("en-US", options).format(utcDate);
  
    return estTime;
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
                {eventsByDay[day].map((event, eventIdx) => (
                  <Event
                    onClick={() => toggleModal(event)}
                    key={eventIdx}
                    title={event.title}
                    location={event.location}
                    startTime={event.startTime}
                    endTime={event.endTime}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Responsive Calendar */}
          <div className={styles.containerResponsive}>
            {daysOfWeek.map((day, index) => (
              <div key={index} className={styles.dayGroup}>
                {/* Day header */}
                <div className={styles.headerResponsive}>
                  <div>{day}</div>
                </div>

                {/* Events for the current day */}
                <div className={styles.bodyResponsive}>
                  <div key={index} className={styles.cell}>
                    {eventsByDay[day].map((event, eventIdx) => (
                      <Event
                        onClick={() => toggleModal(event)}
                        key={eventIdx}
                        title={event.title}
                        location={event.location}
                        startTime={event.startTime}
                        endTime={event.endTime}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Event Modal */}
          {isModalOpen && (
            <div
              className="modal-overlay"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
              }}
              onClick={toggleModal}
            />
          )}

          {/* Modal */}
          <div
            className={`modal fade ${isModalOpen ? "show" : ""}`}
            id="exampleModal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden={!isModalOpen}
            style={isModalOpen ? { display: "block", zIndex: 1000 } : {}}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Event Information
                  </h5>
                </div>
                <div className="modal-body">
                  {currentEvent ? (
                    <>
                      <div>
                        <strong>Title:</strong> {currentEvent.title}
                      </div>
                      <div>
                        <strong>Location:</strong> {currentEvent.location}
                      </div>
                      <div>
                        <strong>Time:</strong> {currentEvent.startTime} - {currentEvent.endTime}
                      </div>
                      <div>
                        <strong>Description:</strong> {currentEvent.description}
                      </div>
                      <div>
                        <strong>Event Host:</strong> {currentEvent.eventHost}
                      </div>
                      <div>
                        <strong>Club:</strong> {currentEvent.club}
                      </div>

                      <a href="URL">
                        <img
                          id="modalImage"
                          src={currentEvent.image}
                          alt="No image found"
                          width="100%"
                          height="auto"
                        ></img>
                      </a>
                    </>
                  ) : (
                    <div>No event selected</div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={toggleModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
