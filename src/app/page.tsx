'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import Link from 'next/link';
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
  const [goingList, setGoingList] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [originalData, setOriginalData] = useState<FormData | null>(null);

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

  const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleApprove = () => {
    console.log('Approved:', formData);
    // Add API call
  };

  const handleReject = () => {
    console.log('Rejected:', formData);
    // Add API call
  };

  const handleEdit = () => {
    setOriginalData(formData);
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log('Saved:', formData);
    // Add API call
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (originalData) {
      setFormData(originalData);
    }
    setIsEditing(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
      <div className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}>
        <header className={styles.header}>
          <h1>Event Manager</h1>
          <div className={styles.headerButtons}>
            <button className={styles.toggleButton} onClick={toggleDarkMode}>
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
            <Link href="/admin-login">
              <button className={styles.adminButton}>Admin Log In</button>
            </Link>
          </div>
        </header>
        <main className={styles.main}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.section}>
              <h2>Event Details</h2>
              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Event Name</label>
                  {isEditing ? (
                      <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Enter event name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                      />
                  ) : (
                      <p>{formData.name || 'N/A'}</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="type">Type</label>
                  {isEditing ? (
                      <input
                          type="text"
                          id="type"
                          name="type"
                          placeholder="Enter event type"
                          value={formData.type}
                          onChange={handleChange}
                          required
                      />
                  ) : (
                      <p>{formData.type || 'N/A'}</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="hostingType">Hosting Type</label>
                  {isEditing ? (
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
                  ) : (
                      <p>{formData.hostingType}</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="hostingId">Hosting ID</label>
                  {isEditing ? (
                      <input
                          type="text"
                          id="hostingId"
                          name="hostingId"
                          placeholder={`Enter ${formData.hostingType} ID`}
                          value={formData.hostingId}
                          onChange={handleChange}
                          required
                      />
                  ) : (
                      <p>{formData.hostingId || 'N/A'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>Location & Time</h2>
              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label htmlFor="location">Location</label>
                  {isEditing ? (
                      <input
                          type="text"
                          id="location"
                          name="location"
                          placeholder="Enter location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                      />
                  ) : (
                      <p>{formData.location || 'N/A'}</p>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="date">Date & Time</label>
                  {isEditing ? (
                      <input
                          type="datetime-local"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                      />
                  ) : (
                      <p>{formData.date ? new Date(formData.date).toLocaleString() : 'N/A'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2>Description</h2>
              <div className={styles.formGroup}>
                <label htmlFor="description">Event Description</label>
                {isEditing ? (
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter event description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                    ></textarea>
                ) : (
                    <p>{formData.description || 'N/A'}</p>
                )}
              </div>
            </div>

            <div className={styles.section}>
              <h2>Additional Information</h2>
              <div className={styles.grid}>
                <div className={styles.formGroup}>
                  <label htmlFor="image">Event Image</label>
                  {isEditing ? (
                      <input
                          type="url"
                          id="image"
                          name="image"
                          placeholder="Enter image URL (optional)"
                          value={formData.image || ''}
                          onChange={handleChange}
                      />
                  ) : formData.image ? (
                      <a href={formData.image} target="_blank" rel="noopener noreferrer">
                        View Image
                      </a>
                  ) : (
                      <p>N/A</p>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="classroomId">Classroom ID</label>
                  {isEditing ? (
                      <input
                          type="text"
                          id="classroomId"
                          name="classroomId"
                          placeholder="Enter classroom ID (optional)"
                          value={formData.classroomId || ''}
                          onChange={handleChange}
                      />
                  ) : (
                      <p>{formData.classroomId || 'N/A'}</p>
                  )}
                </div>
              </div>
            </div>

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

            <div className={styles.buttonGroup}>
              {isEditing ? (
                  <>
                    <button
                        type="button"
                        className={`${styles.button} ${styles.save}`}
                        onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                        type="button"
                        className={`${styles.button} ${styles.cancel}`}
                        onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
              ) : (
                  <>
                    <button
                        type="button"
                        className={`${styles.button} ${styles.modify}`}
                        onClick={handleEdit}
                    >
                      Modify
                    </button>
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
                  </>
              )}
            </div>
          </form>
        </main>
      </div>
  );
}
