import styles from "./CompletedTodoView.module.css";
import { useState, useEffect } from "react";
import getTimeRemaining from "../../utils/getRemainingTime";
import TodoCard from "../../components/todoCard/TodoCard";
import dropdownIcon from "../../assets/filter.svg";
import {
  getCurrentMonthRange,
  getCurrentWeekRange,
} from "../../utils/filterTimeFrame";

export default function CompletedTodoView() {
  const [filterOption, setFilterOption] = useState(""); 
  const [userCompletedTodos, setUserCompletedTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setFilterOption(value);
    console.log("Selected:", value);
  };

  useEffect(() => {
    async function getTodos() {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_RENDERER_URL}/all/true`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setUserCompletedTodos(data.todos);
        } else if (response.status === 401) {
          const data = await response.json();
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } catch (err) {
        console.log(err);
      }
    }

    getTodos();
  }, []);

  const filterTasksByTimeframe = (tasks, filterOption) => {
    const { startOfWeek, endOfWeek } = getCurrentWeekRange();
    const { startOfMonth, endOfMonth } = getCurrentMonthRange();

    if (filterOption === "This Week") {
      return tasks.filter((task) => {
        const taskDeadline = new Date(task.deadline);
        return taskDeadline >= startOfWeek && taskDeadline <= endOfWeek;
      });
    } else if (filterOption === "This Month") {
      return tasks.filter((task) => {
        const taskDeadline = new Date(task.deadline);
        return taskDeadline >= startOfMonth && taskDeadline <= endOfMonth;
      });
    }

    return tasks;
  };

  useEffect(() => {

    const filteredTasks = filterTasksByTimeframe(
      userCompletedTodos,
      filterOption
    );
    setFilteredTodos(filteredTasks);
  }, [filterOption, userCompletedTodos]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>Completed</h1>
          </div>
          <div className={styles.dropDown}>
            <select
              value={filterOption}
              onChange={handleChange}
              className={styles.dropDownList}
            >
              <option value="">Filter</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
            <img
              src={dropdownIcon}
              alt="arrow"
              className={styles.dropdownArrow}
            />
          </div>
        </div>

        <div className={styles.taskListWrapper}>
          {filteredTodos.map((todo) => (
            <TodoCard
              key={todo._id}
              id={todo._id}
              title={todo.title}
              deadline={todo.deadline}
              endsIn={getTimeRemaining(todo.deadline)}
              expireThem={false}
            />
          ))}
        </div>
      </div>
    </>
  );
}
