"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/navbar";
import styles from "../../styles/reportproblem.module.css";
import { PageLoading } from "../../components/pageLoading";
import { Button } from "@headlessui/react";
import emailjs from "@emailjs/browser";

export default function reportProblem() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const form = useRef<HTMLFormElement | null>(null); // Reference to the form

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
    console.log("Service ID from .env:", process.env.NEXT_PUBLIC_SERVICE_ID);
    console.log("Template ID from .env:", process.env.NEXT_PUBLIC_TEMPLATE_ID);
    console.log("User ID from .env:", process.env.NEXT_PUBLIC_USER_ID);
  }, []);

  useEffect(() => {
    resizeTextarea(); // Ensure resizing on initial load
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_SERVICE_ID as string,
          process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
          form.current,
          process.env.NEXT_PUBLIC_USER_ID as string
        )
        .then(
          () => {
            console.log("SUCCESS!");
            alert("Your message has been sent!");
          },
          (error) => {
            console.log("FAILED...", error.text);
            alert("Something went wrong. Please try again.");
          }
        );
    }
  };
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
            as quickly as possible. Otherwise, visit the FAQ page for more
            information.
          </div>
        </div>
        <div className={styles.report}>
          <span style={{ fontSize: "50px" }}>Need Help?</span>
          <form ref={form} onSubmit={sendEmail}>
            <div className={`mb-6 ${styles.inputContainer}`}>
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="users_name" // This maps to the "from_name" placeholder in the EmailJS template
                className={styles.textBox}
                required
              />
            </div>

            <div className={`mb-6 ${styles.inputContainer}`}>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="users_email" // This maps to the "from_email" placeholder in the EmailJS template
                className={styles.textBox}
                required
              />
            </div>

            <div className={`mb-6 ${styles.inputContainer}`}>
              <label htmlFor="email">Your Problem</label>
              <textarea
                name="user_report"
                ref={textareaRef}
                className={styles.textBox}
                value={value}
                onChange={handleInputChange}
                placeholder="Describe your problem..."
              />
            </div>

            <div>
              <Button
                type="submit"
                className={`rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700`}
              >
                Send Email
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}



