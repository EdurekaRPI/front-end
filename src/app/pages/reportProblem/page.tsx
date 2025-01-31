"use client"
import Navbar from "../../components/navbar";
import styles from "../../styles/reportproblem.module.css";
import { useState, useEffect } from "react";

export default function reportProblem() {
  const [loading, setLoading] = useState(true); // set loading to true on page load

  useEffect(() => {
    setLoading(false); // set loading to false
  }, []);

  if (loading) {
    return null; // add spinner later if needed
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.report}>
            <span style={{ fontSize: '50px' }}>
                Need Help?
            </span>
            <div className={`mb-6 ${styles.input}`}>
                <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Describe your problem</label>
                <input type="text" id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
        </div>
      </div>
    </>
  );
}
