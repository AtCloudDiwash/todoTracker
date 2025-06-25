import styles from "./PageNotFound.module.css";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.notFoundContainer}>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.message}>
        Oops! The page you're looking for doesn't exist.
      </p>
      <button className={styles.homeButton} onClick={() => navigate("/landing")}>
        Go to Landing Page
      </button>
    </div>
  );
}
