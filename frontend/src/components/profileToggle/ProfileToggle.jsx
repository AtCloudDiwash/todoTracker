import { useState } from "react";
import styles from "./ProfileToggle.module.css";

export default function ProfileToggle({ username = "Your Name", onToggle }) {
  const [isOn, setIsOn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
    onToggle?.(!isOn);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.username}>{`Hey, ${username}`}</div>
        <div
          className={styles.profileCircle}
          onClick={() => setShowModal(true)}
        ></div>
      </div>

      <div className={styles.toggleSection} onClick={handleToggle}>
        <div className={`${styles.toggle} ${isOn ? styles.on : ""}`}>
          <div
            className={`${styles.toggleKnob} ${
              isOn ? styles.toggleKnobActive : ""
            }`}
          ></div>
        </div>
        <span className={styles.label}>Switch to animation</span>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>Do you want to log out of ToDone?</p>
            <div className={styles.modalButtons}>
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
