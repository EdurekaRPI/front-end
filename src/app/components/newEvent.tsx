import React, { useState } from "react";
import styles from "../styles/newEvent.module.css"; // Ensure path is correct

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // You can handle form submission here, e.g., send the data to an API
    console.log(formData);
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
              name="description"
              value={formData.description}
              onChange={handleChange}
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
              Event Host
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
