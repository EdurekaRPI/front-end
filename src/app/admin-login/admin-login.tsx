'use client';

import styles from './admin-login.module.css';

export default function AdminLogin() {
    return (
        <div className={styles.container}>
            <h1>Admin Login</h1>
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
        </div>
    );
}
