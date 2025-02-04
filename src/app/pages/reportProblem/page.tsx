"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/navbar";
import styles from "../../styles/reportproblem.module.css";
import { PageLoading } from "../../components/pageLoading";
import { Button } from "@headlessui/react";

export default function reportProblem() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    resizeTextarea();
  };

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to auto to allow it to shrink back
    }
  };

  useEffect(() => {
    resizeTextarea(); // Ensure resizing on initial load
  }, []);

  return (
    <>
      <Navbar />
      <PageLoading />
      <div className={styles.container}>
        <div className={styles.description}>
          <div className={styles.descriptionBody}>
            If you are experiencing any problems or need assistance with
            Edureka, please describe your issue in detail in the entry form to
            the left. Once the email is sent to
            rcos-leadership@googlegroups.com, Edureka staff will respond to you
            as quickly as possible. Otherwise, visit the FAQ page for more information.
          </div>
        </div>
        <div className={styles.report}>
          <span style={{ fontSize: "50px" }}>Need Help?</span>
          <div className={`mb-6 ${styles.inputContainer}`}>
            <textarea
              ref={textareaRef}
              className={styles.textBox}
              value={value}
              onChange={handleInputChange}
              placeholder="Describe your problem..."
            />
          </div>
          <div>
            <a href="/">
              <Button
                className={`rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700`}
              >
                Send Email
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
