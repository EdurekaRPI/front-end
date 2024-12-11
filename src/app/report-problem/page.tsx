'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import styles from './report-problem.module.css';

export default function ReportProblemPage() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [dateValue, setDateValue] = useState('');
    const [problemDescription, setProblemDescription] = useState('');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDarkMode(false);
        } else {
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

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Submitted problem:', { date: dateValue, description: problemDescription });
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDateValue(e.target.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setProblemDescription(e.target.value);
    };

    return (
        <div className={`${styles.page} ${isDarkMode ? styles.dark : styles.light}`}>
            <div className={styles.header}>
                <h1>Report Problem</h1>
                <button className={styles.toggleButton} onClick={toggleDarkMode}>
                    {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
            </div>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={dateValue}
                            onChange={handleDateChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description">Describe Problem</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="describe problem"
                            value={problemDescription}
                            onChange={handleDescriptionChange}
                            required
                            rows={4}
                        ></textarea>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Submit
                    </button>
                </form>

                <Link href="/">
                    <button className={styles.returnButton}>
                        Return to Main Page
                    </button>
                </Link>
            </div>
        </div>
    );
}
