import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/newEvent.module.css"; // Ensure path is correct
import axios from "axios";

interface EventFormData {
  title: string;
  description: string;
  typeOfEvent: string;
  eventCreator: string;
  eventHost: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  club: string;
}

export function NewEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    typeOfEvent: "",
    eventCreator: "",
    eventHost: "",
    startDateTime: "",
    endDateTime: "",
    location: "",
    club: "",
  });
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (e: any) => {
    resizeTextarea();
    handleChange(e);
  };

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to auto to allow it to shrink back
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content
      textarea.style.overflow = "hidden"; // Ensure no scrollbar appears
    }
  };

  useEffect(() => {
    resizeTextarea(); // Ensure resizing on initial load
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const apiUrl = process.env.NEXT_PUBLIC_HEROKU_API_URL;

    // Convert to ISO strings for the start and end times
    const formattedStartDateTime = new Date(
      formData.startDateTime
    ).toISOString();
    const formattedEndDateTime = new Date(formData.endDateTime).toISOString();

    const eventData = {
      ...formData,
      startDateTime: formattedStartDateTime,
      endDateTime: formattedEndDateTime,
    };

    console.log(eventData);

    const headers = {
      "Api-Key": `${process.env.NEXT_PUBLIC_ADMIN_API_KEY}`,
      "Content-Type": "application/json",
    };
    console.log(headers);
    axios
      .post(`${apiUrl}/api/admin/new-event`, eventData, { headers })
      .then((response) => {
        console.log("Event created successfully");
      })
      .catch((error) => {
        console.error("Error creating event:");
      });

  };

  return (
    <>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.formLabel}>
              Event Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={styles.inputText}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.formLabel}>
              Description
            </label>
            <textarea
              id="description"
              ref={textareaRef}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className={styles.textArea}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="typeOfEvent" className={styles.formLabel}>
              Event Type
            </label>
            <input
              type="text"
              id="typeOfEvent"
              name="typeOfEvent"
              value={formData.typeOfEvent}
              onChange={handleChange}
              required
              className={styles.inputText}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="eventCreator" className={styles.formLabel}>
              Event Creator
            </label>
            <input
              type="text"
              id="eventCreator"
              name="eventCreator"
              value={formData.eventCreator}
              onChange={handleChange}
              required
              className={styles.inputText}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="eventHost" className={styles.formLabel}>
              Event Club/Host
            </label>
            <input
              type="text"
              id="eventHost"
              name="eventHost"
              value={formData.eventHost}
              onChange={handleChange}
              required
              className={styles.inputText}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="startDateTime" className={styles.formLabel}>
              Start Date and Time
            </label>
            <input
              type="datetime-local"
              id="startDateTime"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleChange}
              required
              className={styles.inputDateTime}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="endDateTime" className={styles.formLabel}>
              End Date and Time
            </label>
            <input
              type="datetime-local"
              id="endDateTime"
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleChange}
              required
              className={styles.inputDateTime}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location" className={styles.formLabel}>
              Event Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className={styles.inputText}
            />
          </div>

          <div>
            <button type="submit" className={styles.submitButton}>
              Submit Event
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
