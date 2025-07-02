import styles from "./Sidebar.module.css";
import { useEffect, useState } from "react";
import sidebarClosedIcon from "../../assets/sidebarAssets/sidebarClosed.svg";
import sidebarOpenIcon from "../../assets/sidebarAssets/sidebarOpen.svg";
import addTask from "../../assets/sidebarAssets/addTask.svg";
import addTaskActive from "../../assets/sidebarAssets/addTaskActive.svg";
import tasklist from "../../assets/sidebarAssets/tasklist.svg";
import tasklistActive from "../../assets/sidebarAssets/tasklistActive.svg";
import completed from "../../assets/sidebarAssets/completed.svg";
import completedActive from "../../assets/sidebarAssets/completedActive.svg";

import NavBrandIcon from "../navBrandIcon/NavBrandIcon";

export default function Sidebar({ setSelectedView }) {
  const [isOpen, setIsOpen] = useState(true);
  const [addActive, setAddActive] = useState(true);
  const [getList, setGetListActive] = useState(false);
  const [completedList, setCompletedListActive] = useState(false);
  const [histories, setHistories] = useState([]);
  const [fetchUpdateError, setFetchUpdateError] = useState(null);

  useEffect(() => {
    const getRecentHistories = async () => {
      try {
        const response = await fetch("http://localhost:3000/recent-updates", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setHistories(data.recentActivities);
          console.log(histories);

        } else if (response.status === 500) {
          const data = await response.json();
          setFetchUpdateError(data.error);
        }
      } catch (err) {
        console.log(err)
      }
    };
    getRecentHistories();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAdd = async () => {
    setAddActive(true);
    setGetListActive(false);
    setCompletedListActive(false);
    setSelectedView("add task");
  };

  const handleGetList = async () => {
    setGetListActive(true);
    setAddActive(false);
    setCompletedListActive(false);
    setSelectedView("get list");
  };

  const handleCompletedList = async () => {
    setCompletedListActive(true);
    setAddActive(false);
    setGetListActive(false);
    setSelectedView("completed list");
  };

  return (
    <div
      className={`${styles.sidebar} ${
        isOpen ? styles.expanded : styles.collapsed
      }`}
    >
      <div className={styles.topSection}>
        {isOpen ? <NavBrandIcon /> : null}
        <button className={styles.toggleBtn} onClick={toggleSidebar}>
          {isOpen ? (
            <img src={sidebarOpenIcon} alt="hamburger open" />
          ) : (
            <img src={sidebarClosedIcon} alt="hamburger closed" />
          )}
        </button>
      </div>

      {isOpen && (
        <>
          <div className={styles.menuItems}>
            <button
              className={styles.link}
              onClick={handleAdd}
              style={{
                background: addActive
                  ? "linear-gradient(20deg, var(--primary-color1) 0%, rgba(0, 0, 0, 1) 20%,rgba(201, 14, 255, 0.45) 100% )"
                  : "transparent",
              }}
            >
              {!addActive ? (
                <>
                  <img
                    src={addTask}
                    alt="Add task icon"
                    className={styles.sidebarIconSize}
                  />
                  <span>Add your task here</span>
                </>
              ) : (
                <>
                  <img
                    src={addTaskActive}
                    alt="Active add task icon"
                    className={styles.sidebarIconSize}
                  />
                  <span className={styles.linkItemActive}>
                    Add your task here
                  </span>
                </>
              )}
            </button>
            <button
              className={styles.link}
              onClick={handleGetList}
              style={{
                background: getList
                  ? "linear-gradient(20deg, var(--primary-color1) 0%, rgba(0, 0, 0, 1) 20%,rgba(201, 14, 255, 0.45) 100% )"
                  : "transparent",
              }}
            >
              {!getList ? (
                <>
                  <img src={tasklist} alt="Task list icon" />
                  <span>Your tasklists</span>
                </>
              ) : (
                <>
                  <img
                    src={tasklistActive}
                    alt="Task list Active
              icon"
                    style={{ width: "2.3rem" }}
                  />
                  <span className={styles.linkItemActive}>Your tasklists</span>
                </>
              )}
            </button>
            <button
              className={styles.link}
              onClick={handleCompletedList}
              style={{
                background: completedList
                  ? "linear-gradient(20deg, var(--primary-color1) 0%, rgba(0, 0, 0, 1) 20%,rgba(201, 14, 255, 0.45) 100% )"
                  : "transparent",
              }}
            >
              {!completedList ? (
                <>
                  <img src={completed} alt="Completed task icon" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <img
                    src={completedActive}
                    alt="Completed task active icon"
                    style={{ width: "2.3rem" }}
                  />
                  <span className={styles.linkItemActive}>Completed</span>
                </>
              )}
            </button>
          </div>

          <div className={styles.recentHistory}>
            <p className={styles.recentText}>Recent history</p>
            <hr style={{ opacity: 0.75 }} />
            {histories.length !== 0 ? (
              histories.map((todo) => (
                <div className={styles.historyItem} key={todo._id}>
                  <div className={styles.checkboxWrapper}>
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className={styles.customCheckbox}
                    />
                  </div>
                  <div className={styles.historyText}>
                    <p className={styles.historyTitle}>
                      <s>{todo.title}</s>
                    </p>
                    <p className={styles.historyTimestamp}>
                      Completed at{" "}
                      {new Date(todo.updatedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noHistory}>No histories</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
