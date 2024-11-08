'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import styles from './page.module.css';

interface FormData {
  location: string;
  roomNumber: string;
  capacity: number;
  time: string;
  applicant: string;
  club: string;
}

export default function HomePage() {
  const [formData, setFormData] = useState<FormData>({
    location: '',
    roomNumber: '',
    capacity: 0,
    time: '',
    applicant: '',
    club: '',
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'capacity' ? Number(value) : value,
    }));
  };

  const handleApprove = () => {
    //approve logic
    console.log('Approved:', formData);
  };

  const handleReject = () => {
    //reject logic
    console.log('Rejected:', formData);
  };

  const handleEdit = () => {
    //edit logic
    console.log('Edit:', formData);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
      <div className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}>
        {/* header */}
        <header className={styles.header}>
          <h1>Edureka</h1>
          {/* dark mode toggle */}
          <button className={styles.toggleButton} onClick={toggleDarkMode}>
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        {/* main */}
        <main className={styles.main}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
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
                />
              </div>

              {/* room number */}
              <div className={styles.formGroup}>
                <label htmlFor="roomNumber">Room Number</label>
                <input
                    type="text"
                    id="roomNumber"
                    name="roomNumber"
                    placeholder="Enter room number"
                    value={formData.roomNumber}
                    onChange={handleChange}
                />
              </div>

              {/* capacity */}
              <div className={styles.formGroup}>
                <label htmlFor="capacity">Capacity</label>
                <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    placeholder="Enter capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    min={0}
                />
              </div>

              {/* time */}
              <div className={styles.formGroup}>
                <label htmlFor="time">Time</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                />
              </div>

              {/* applicant */}
              <div className={styles.formGroup}>
                <label htmlFor="applicant">Applicant</label>
                <input
                    type="text"
                    id="applicant"
                    name="applicant"
                    placeholder="Enter applicant name"
                    value={formData.applicant}
                    onChange={handleChange}
                />
              </div>

              {/* club */}
              <div className={styles.formGroup}>
                <label htmlFor="club">Club</label>
                <input
                    type="text"
                    id="club"
                    name="club"
                    placeholder="Enter club name"
                    value={formData.club}
                    onChange={handleChange}
                />
              </div>
            </div>

            {/* buttons */}
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
