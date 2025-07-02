import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AddTaskView.module.css";
import TodoCard from "../../components/todoCard/TodoCard";

export default function AddTaskView() {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [userTodo, setUserTodo] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [titleError, setTitleError] = useState(true);
  const [otherError, setOtherError] = useState(null);
  const [currentTodos, setCurrentTodos] = useState([]);
  const [endsIn, setEndsIn] = useState(null);

  const handleAddTodo = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ title: userTodo, deadline: selectedDateTime }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setSuccessMessage(data.msg);
        setCurrentTodos((prev)=>[data.newTodo, ...prev]);
        console.log(currentTodos)
      } else if (response.status === 400) {
        const data = await response.json();
        setTitleError(data.error);
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else if (response.status === 500) {
        const data = await response.json();
        setOtherError(data.message || "Server error");
      }
    } catch (err) {
      setOtherError("Something went wrong");
      console.log(err);
    }
  };

  const closeModal = () => {
    setOtherError(null);
    setTitleError(true);
    setSuccessMessage(null);
  };

  return (
    <>
      <div className={styles.container}>
        {currentTodos.length === 0 ? (
          <div className={styles.displaySection}>
            <div className={styles.firstSection}>
              <h1 className={styles.addTaskTxt}>Add Your Task Here</h1>
              <ul className={styles.stepsList}>
                <li>Type your todo</li>
                <li>Set the deadline for the task</li>
                <li>Finally, go for your mission</li>
              </ul>
            </div>

            <div className={styles.secondSection}>
              <h1 className={styles.userGreet}>Welcome to ToDone</h1>
            </div>

            <div className={styles.thirdSection}>
              <ul className={styles.objectiveList}>
                <li>Sidebar helps you to keep track of your todos</li>
                <li>You can edit your tasklists until you've completed it</li>
                <li>
                  You'll not be able to modify the todos after you've completed
                  it
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className={styles.todoCardAppeared}>
            {currentTodos.map((todo, index) => (
            <TodoCard
              title={todo.title}
              deadline={todo.deadline}
              endsIn={todo.endsIn}
              key={index}
            />
            ))}
          </div>
        )}

        <div className={styles.inputSection}>
          <div className={styles.inputSectionText}>
            <DatePicker
              selected={selectedDateTime}
              onChange={(date) => setSelectedDateTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="📅 Set Deadline"
              className={styles.customDatePickerStyles}
            />
            <button
              onClick={() => setSelectedDateTime(null)}
              className={styles.clear}
            >
              Clear
            </button>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Enter your todo"
              className={styles.addTodoField}
              onChange={(e) => setUserTodo(e.target.value)}
              value={userTodo}
            />
            <input
              type="submit"
              value="Add Todo"
              className={styles.addTodoBtn}
              onClick={handleAddTodo}
            />
          </div>
        </div>
      </div>

      {(otherError || titleError !== true || successMessage) && (
        <div className={styles.modalOverlay}>
          <div
            className={`${styles.modal} ${
              otherError || titleError !== true
                ? styles.errorModal
                : styles.successModal
            }`}
          >
            <p>
              {otherError || titleError !== true
                ? otherError || titleError
                : successMessage}
            </p>
            <div className={styles.modalButtons}>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
