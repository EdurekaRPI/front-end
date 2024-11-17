'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import styles from './page.module.css';

interface FormData {
  name: string;
  type: string;
  hostingType: 'User' | 'Club';
  hostingId: string;
  location: string;
  date: string; // ISO string for date
  description: string;
  image?: string;
  classroomId?: string;
}

export default function EventPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    type: '',
    hostingType: 'User',
    hostingId: '',
    location: '',
    date: '',
    description: '',
    image: '',
    classroomId: '',
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [goingList, setGoingList] = useState<string[]>([]); // Assuming list of user names or IDs

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'capacity' ? Number(value) : value,
    }));
  };

  const handleApprove = () => {
    // Approve logic
    console.log('Approved:', formData);
    // Add API call to approve the event
  };

  const handleReject = () => {
    // Reject logic
    console.log('Rejected:', formData);
    // Add API call to reject the event
  };

  const handleEdit = () => {
    // Edit logic
    console.log('Edit:', formData);
    // Add API call to edit the event
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
      <div className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}>
        {/* Header */}
        <header className={styles.header}>
          <h1>Event Manager</h1>
          {/* Dark mode toggle */}
          <button className={styles.toggleButton} onClick={toggleDarkMode}>
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        {/* Main Content */}
        <main className={styles.main}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.section}>
              <h2>Event Details</h2>
              <div className={styles.grid}>
                {/* Name */}
                <div className={styles.formGroup}>
                  <label htmlFor="name">Event Name</label>
                  <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter event name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                  />
                </div>

                {/* Type */}
                <div className={styles.formGroup}>
                  <label htmlFor="type">Type</label>
                  <input
                      type="text"
                      id="type"
                      name="type"
                      placeholder="Enter event type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                  />
                </div>

                {/* Hosting Type */}
                <div className={styles.formGroup}>
                  <label htmlFor="hostingType">Hosting Type</label>
                  <select
                      id="hostingType"
                      name="hostingType"
                      value={formData.hostingType}
                      onChange={handleChange}
                      required
                  >
                    <option value="User">User</option>
                    <option value="Club">Club</option>
                  </select>
                </div>

                {/* Hosting ID */}
                <div className={styles.formGroup}>
                  <label htmlFor="hostingId">Hosting ID</label>
                  <input
                      type="text"
                      id="hostingId"
                      name="hostingId"
                      placeholder={`Enter ${formData.hostingType} ID`}
                      value={formData.hostingId}
                      onChange={handleChange}
                      required
                  />
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>Location & Time</h2>
              <div className={styles.grid}>
                {/* Location */}
                <div className={styles.formGroup}>
                  <label htmlFor="location">Location</label>
                  <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="Enter location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                  />
                </div>

                {/* Date */}
                <div className={styles.formGroup}>
                  <label htmlFor="date">Date & Time</label>
                  <input
                      type="datetime-local"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                  />
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>Description</h2>
              <div className={styles.formGroup}>
                <label htmlFor="description">Event Description</label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Enter event description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                ></textarea>
              </div>
            </div>

            <div className={styles.section}>
              <h2>Additional Information</h2>
              <div className={styles.grid}>
                {/* Image */}
                <div className={styles.formGroup}>
                  <label htmlFor="image">Event Image</label>
                  <input
                      type="url"
                      id="image"
                      name="image"
                      placeholder="Enter image URL (optional)"
                      value={formData.image}
                      onChange={handleChange}
                  />
                </div>

                {/* Classroom ID */}
                <div className={styles.formGroup}>
                  <label htmlFor="classroomId">Classroom ID</label>
                  <input
                      type="text"
                      id="classroomId"
                      name="classroomId"
                      placeholder="Enter classroom ID (optional)"
                      value={formData.classroomId}
                      onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Going List */}
            <div className={styles.section}>
              <h2>Attendees</h2>
              <div className={styles.formGroup}>
                <label>Going:</label>
                {goingList.length > 0 ? (
                    <ul>
                      {goingList.map((user, index) => (
                          <li key={index}>{user}</li>
                      ))}
                    </ul>
                ) : (
                    <p>No attendees yet.</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.buttonGroup}>
              <button
                  type="button"
                  className={`${styles.button} ${styles.approve}`}
                  onClick={handleApprove}
              >
                Approve
              </button>
              <button
                  type="button"
                  className={`${styles.button} ${styles.reject}`}
                  onClick={handleReject}
              >
                Reject
              </button>
              <button
                  type="button"
                  className={`${styles.button} ${styles.edit}`}
                  onClick={handleEdit}
              >
                Edit
              </button>
            </div>
          </form>
        </main>
      </div>
  );
}
