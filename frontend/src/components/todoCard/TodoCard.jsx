import RotatingClock from "../rotatingClock/RotatingClock";
import styles from "./TodoCard.module.css";
import { useState, useRef, useEffect } from "react";
import swooshSound from "../../assets/soundEffects/swoosh.mp3";
import { gsap } from "gsap";
import DatePicker from "react-datepicker";
import { FaTimes } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import getTimeRemaining from "../../utils/getRemainingTime";
import editIcon from "../../assets/edit.svg";

export default function TodoCard({ title, deadline, id, expireThem = true }) {
  const [isChecked, setIsChecked] = useState(false);
  const [remainingTime, setRemainingTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });
  const containerRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDeadline, setEditDeadline] = useState(deadline);
  const [updateError, setUpdateError] = useState(null);
  const [disableUpdate, setDisableUpdate] = useState(true);

  const deadlinePassed =
    deadline && !isNaN(new Date(deadline)) && new Date() > new Date(deadline);

  useEffect(() => {
    setRemainingTime(getTimeRemaining(deadline));
  }, [deadline]);

  useEffect(() => {
    if (expireThem === false) {
      setIsChecked(true);
    }
  }, [expireThem]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    const audio = new Audio(swooshSound);
    audio.currentTime = 0.09;
    audio.play();
  };

  useEffect(() => {
    const todoCompleted = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_RENDERER_URL}/todo-completed`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({ todoId: id }),
          }
        );

        if (response.status === 200) {
          console.log("Completed");
        }
      } catch (err) {
        console.error("Error marking todo complete:", err);
      }
    };

    if (isChecked) {
      todoCompleted();
    }
  }, [isChecked, id]);

  useEffect(() => {
    if (isChecked) return;

    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (!prevTime || typeof prevTime.hours === "undefined") {
          return { hours: 0, minutes: 0, seconds: 0, expired: true };
        }

        let totalSeconds =
          prevTime.hours * 3600 + prevTime.minutes * 60 + prevTime.seconds;

        if (totalSeconds <= 1) {
          clearInterval(intervalId);
          return { hours: 0, minutes: 0, seconds: 0, expired: true };
        }

        totalSeconds -= 1;

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return { hours, minutes, seconds, expired: false };
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isChecked, editDeadline, editTitle]);

  useEffect(() => {
    let animation;

    if (!isChecked && !deadlinePassed) {
      animation = gsap.to(containerRef.current, {
        scale: 1.03,
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        ease: "ease-in-out",
      });
    } else {
      gsap.killTweensOf(containerRef.current);
      gsap.set(containerRef.current, { scale: 1 });
    }

    return () => {
      if (animation) animation.kill();
    };
  }, [isChecked, deadlinePassed]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_RENDERER_URL}/edit`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            selectedTodoId: id,
            title: editTitle,
            deadline: new Date(editDeadline).toISOString(),
          }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setEditMode(false);
        setUpdateError(null);
      } else {
        setUpdateError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setUpdateError("Something went wrong, please try again.");
    }
  };

  useEffect(() => {
    if (editTitle !== title || editDeadline !== deadline) {
      setDisableUpdate(false);
    } else {
      setDisableUpdate(true);
    }
  }, [editTitle, editDeadline]);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_RENDERER_URL}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({ selectedTodoId: id }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        alert(data.msg);
        setUpdateError(data.msg);
      } else {
        setUpdateError(data.error);
      }
    } catch (err) {
      setUpdateError("Failed to delete. Try again.");
    }
  };

  return (
    <>
      {expireThem && (
        <button className={styles.editButton} onClick={() => setEditMode(true)}>
          <img src={editIcon} alt="Edit Icon" className={styles.editIcon} />
          <span>Edit</span>
        </button>
      )}

      <div
        className={styles.cardWrapper}
        style={{
          background: isChecked && "#353134",
          opacity: isChecked && ".60",
          boxShadow: isChecked && "none",
        }}
        ref={containerRef}
      >
        <div className={styles.leftSection}>
          <label className={styles.labelWrapper}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={isChecked}
              onChange={handleCheckboxChange}
              disabled={isChecked}
            />
            <div className={styles.textBlock}>
              <h1
                className={styles.taskTitle}
                style={{
                  textDecoration: isChecked && "line-through",
                }}
              >
                {title}
              </h1>
              <span className={styles.deadline}>
                Deadline: {new Date(deadline).toLocaleString() ?? "Unknown"}
              </span>
            </div>
          </label>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.clockWrapper}>
            <RotatingClock motion={!isChecked && !deadlinePassed} />
          </div>
          <p className={styles.remainingTime}>
            {deadlinePassed
              ? "Deadline passed"
              : remainingTime
              ? `Ends in ${remainingTime.hours ?? 0}h ${
                  remainingTime.minutes ?? 0
                }m ${remainingTime.seconds ?? 0}s`
              : "Calculating..."}
          </p>
        </div>
      </div>

      {editMode && expireThem && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div
              className={styles.closeButton}
              onClick={() => setEditMode(false)}
            >
              <FaTimes />
            </div>
            <h2>Edit Todo</h2>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Edit Title"
              className={styles.inputField}
            />
            <DatePicker
              selected={new Date(editDeadline)}
              onChange={(date) => setEditDeadline(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              className={styles.inputField}
            />
            {updateError && (
              <p className={styles.errorMessage}>{updateError}</p>
            )}
            <div className={styles.modalButtons}>
              <button
                onClick={handleUpdate}
                className={styles.updateButton}
                disabled={disableUpdate}
              >
                Update
              </button>
              <button onClick={handleDelete} className={styles.deleteButton}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
