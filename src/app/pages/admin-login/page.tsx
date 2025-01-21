'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../styles/admin-login.module.css';

export default function Page() {
    const [isDarkMode, setIsDarkMode] = useState(false);

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

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <div className={`${styles.page} ${isDarkMode ? styles.dark : styles.light}`}>
            <div className={styles.header}>
                <h1>Admin Login</h1>
                <button className={styles.toggleButton} onClick={toggleDarkMode}>
                    {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
            </div>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className={styles.loginButton}>
                        Log In
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
