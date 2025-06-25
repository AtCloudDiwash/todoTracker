import styles from "./SignupButton.module.css";
import { useNavigate } from "react-router-dom";

export default function SignupButton(){
    const navigate = useNavigate();

    return(

        <div className={styles.container}>
            <button className={styles.signupBtn} onClick={()=>navigate("/signup")}>Signup</button>
        </div>

    );
}