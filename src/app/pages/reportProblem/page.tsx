"use client";
import Navbar from "../../components/navbar";
import styles from "../../styles/reportproblem.module.css";
import { PageLoading } from "../../components/pageLoading";

export default function reportProblem() {
  return (
    <>
      <Navbar />
      <PageLoading />
      <div className={styles.container}>
        <div className={styles.report}>
          <span style={{ fontSize: "50px" }}>Need Help?</span>
          <div className={`mb-6 ${styles.inputContainer}`}>
              <textarea
              className={styles.textBox}
              placeholder="Describe your problem..."
              rows={2}  
            />
          </div>
        </div>
      </div>
    </>
  );
}
