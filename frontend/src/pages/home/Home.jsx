import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Preloader from "../../components/preloader/Preloader";
import ProfileToggle from "../../components/profileToggle/ProfileToggle";
import { useUserDetails } from "../../context/userDetailsContext";
import AddTaskView from "../addTodo/AddTaskView";
import TaskListView from "../taskList/TaskListView";
import CompletedTodoView from "../completedTodos/CompletedTodoView";
import NebulaParticle from "../../components/nebula/NebulaParticle";
import TodoCard from "../../components/todoCard/TodoCard";

export default function Home() {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState("add task");
  const { isLogged, isLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const { username } = useUserDetails();
  const [toggle, onToggle] = useState(false);

  useEffect(() => {
    if (isLoading) return; 
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, isLoading, navigate]);

  const renderContent = () => {
    switch (selectedView) {
      case "add task":
        return <AddTaskView />;
      case "get list":
        return <TaskListView />;
      case "completed list":
        return <CompletedTodoView />;
      default:
        return <div>Select something</div>;
    }
  };

  useEffect(() => {
    function handleLoad() {
      setLoading(false);
    }

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return !loading || isLoading ? (
    <>
      <Sidebar setSelectedView={setSelectedView} />
      <ProfileToggle username={username} onToggle={onToggle} />

      {toggle && (
        <>
          <div className={styles.nebulaWrapper}>
            <NebulaParticle />
          </div>

          <div className={styles}>{renderContent()}</div>
        </>
      )}

      {!toggle && <div className={styles}>{renderContent()}</div>}
    </>
  ) : (
    <Preloader />
  );
}
