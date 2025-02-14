"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "../../components/navbar";
import styles from "../../styles/reportproblem.module.css";
import { PageLoading } from "../../components/pageLoading";
import emailjs from "@emailjs/browser";

export default function reportProblem() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const form = useRef<HTMLFormElement | null>(null); // Reference to the form
  const [userName, setUserName] = useState(""); 
  const [userEmail, setUserEmail] = useState(""); 
  const [userReport, setUserReport] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);



  const formFilled =
    userName.trim() !== "" &&
    userEmail.trim() !== "" &&
    userReport.trim() !== "";
  const emailFormat = userEmail.includes("@");
  const isFormValid = formFilled && emailFormat;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    setUserReport(e.target.value);
    resizeTextarea();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value); 
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value); 
  };

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to auto to allow it to shrink back
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the content
      textarea.style.overflow = "hidden"; // Ensure no scrollbar appears
    }
  };

  useEffect(() => {
    resizeTextarea(); // Ensure resizing on initial load
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    console.log("sendEmail: ");
    console.log(form.current);
    e.preventDefault();
    console.log(e);

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  return (
    <>
      <Navbar />
      {/* <PageLoading /> */}
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
                onChange={handleNameChange}
                required
                placeholder="John Smith"
              />
            </div>

            <div className={`mb-6 ${styles.inputContainer}`}>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="users_email" // This maps to the "from_email" placeholder in the EmailJS template
                className={styles.textBox}
                onChange={handleEmailChange}
                required
                placeholder="test@gmail.com"
              />
              { userEmail && !emailFormat && (
                <div style={{ color: "red" }}>Email must include '@'</div>
              )}
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
              <button
                type="button"
                className={`${styles.submitButton} btn btn-primary`}
                onClick={toggleModal}
                disabled={!isFormValid}
              >
                Send Email
              </button>
            </div>

            {/* Background Overlay */}
            {isModalOpen && (
              <div
                className="modal-overlay"
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 999,
                }}
                onClick={toggleModal}
              />
            )}

            {/* Modal */}
            <div
              className={`modal fade ${isModalOpen ? "show" : ""}`}
              id="exampleModal"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden={!isModalOpen}
              style={isModalOpen ? { display: "block", zIndex: 1000 } : {}}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Report Form Confirmation
                    </h5>
                  </div>
                  <div className="modal-body">
                    Are you sure you want to send the report form? This action
                    is final.
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={toggleModal}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={sendEmail}
                    >
                      Yes, send email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
