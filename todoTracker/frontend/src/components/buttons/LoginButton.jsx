import styles from "./LoginButton.module.css";
import { useNavigate } from "react-router-dom";

export default function SignupButton() {
  const navigate = useNavigate();

  return (
    <div>
      <button className={styles.loginBtn} onClick={()=>navigate("/login")}>Login</button>
    </div>
  );
}
