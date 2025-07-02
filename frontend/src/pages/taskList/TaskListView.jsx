import styles from "./TaskListView.module.css";
import TodoCard from "../../components/todoCard/TodoCard";
import {useEffect, useState, useRef} from "react";
import refreshIcon from "../../assets/refresh.svg";
import gsap from "gsap";
import getTimeRemaining from "../../utils/getRemainingTime";

export default function TaskListView(){

  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [userTodos, setUserTodos] = useState([]);
  const [error, setError] = useState(null);
  const refreshButtonRef = useRef();

  const handleRefresh = () => {
    gsap.to(refreshButtonRef.current, {
      rotation: "+=360",
      duration: .8,
      ease: "power2.inOut",
    });
    setShouldRefresh(true);
  };

  useEffect(()=>{

    async function getTodos(){
      try {
        const response = await fetch("http://localhost:3000/all/false", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
          },
        });

        if(response.status === 200){
          const data = await response.json();
          setUserTodos(data.todos);
        } else if(response.status === 401) {
          const data = await response.json();
          localStorage.removeItem("token");
          window.location.href = "/login"
        } else {
          const data = await response.json();
          setError(data.error);
        }

      } catch (err) {
        console.log(err);
      } finally{
        setShouldRefresh(false);
      }
    }

    getTodos();

  }, [shouldRefresh])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>Your task list</h1>
          </div>
          <div className={styles.dropDown}>
            <span className={styles.refreshText}>Refresh</span>
            <img
              src={refreshIcon}
              alt="refresh-icon"
              className={styles.refreshButton}
              ref={refreshButtonRef}
              onClick={handleRefresh}
            />
          </div>
        </div>

        {error && (
          <div className={styles.errorBox}>
            <p>{error}</p>
          </div>
        )}

        <div className={styles.taskListWrapper}>
          {userTodos.map((todo) => (
            <TodoCard key={todo._id} id = {todo._id} title = {todo.title} deadline = {todo.deadline}/>
          ))}
        </div>
      </div>
    </>
  );
}