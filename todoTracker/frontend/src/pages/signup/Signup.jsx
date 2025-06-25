import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import navbrandIcon from "../../assets/navbrand.svg";
import passwordVisibleIcon from "../../assets/eyeon.svg";
import passwordHiddenIcon from "../../assets/eyeclosed.svg";
import Preloader from "../../components/preloader/Preloader";
import {useAuth} from "../../context/AuthContext";
import NavBrandIcon from "../../components/navBrandIcon/NavBrandIcon";

export default function Signup() {
  const navigate = useNavigate();

  const {isLogged} = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [otherError, setOtherError] = useState("");

  const [userCreated, setUserCreated] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLogged) {
      navigate("/home");
    }
  }, [isLogged, navigate]);

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

  const handleSubmit = async (e) => {
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setOtherError("");
    setUserCreated(false);

    e.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password: confirmPassword }),
      });

      if (response.status === 400) {
        const data = await response.json();
        if (data.errors.username) setUsernameError(data.errors.username);
        if (data.errors.email) setEmailError(data.errors.email);
        if (data.errors.password) setPasswordError(data.errors.password);
      } else if (response.status === 200) {
        const data = await response.json();
        setUserCreated(true);
        setTimeout(()=>{
          navigate("/login");
        }, 1000)
        
      } else if (response.status === 409) {
        const data = await response.json();
        setOtherError(data.error);
      } else {
        const data = await response.json();
        setOtherError(data.error);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Preloader></Preloader>
  ) : (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <NavBrandIcon />
      </div>

      <div className={styles.formWrapper}>
        <div className={styles.formHeaders}>
          <img
            src={navbrandIcon}
            alt="ToDone logo"
            className={styles.headerIcon}
          />
          <h1>Signup</h1>
        </div>

        <form>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError ? (
            <span className={styles.inputError}>{usernameError}</span>
          ) : null}

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {emailError ? (
            <span className={styles.inputError}>{emailError}</span>
          ) : null}

          <label>Password</label>
          <div className={styles.passwordField} value={password}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? passwordVisibleIcon : passwordHiddenIcon}
              onClick={() => setShowPassword(!showPassword)}
              className={styles.toggleIcon}
              alt="toggle visibility"
            />
          </div>

          {passwordError ? (
            <span className={styles.inputError}>{passwordError}</span>
          ) : null}

          <label>Confirm Password</label>
          <div className={styles.passwordField}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <img
              src={
                showConfirmPassword ? passwordVisibleIcon : passwordHiddenIcon
              }
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={styles.toggleIcon}
              alt="toggle visibility"
            />
          </div>

          {confirmPassword ? (
            <span className={styles.inputError}>{confirmPasswordError}</span>
          ) : null}

          <p className={styles.forgot}>Forgot password?</p>

          <input
            type="submit"
            value="Signup"
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={password !== confirmPassword || loading}
            style={{
              opacity: (password !== confirmPassword || loading)? 0.5 : 1,
              cursor: (password !== confirmPassword || loading)? "not-allowed" : "pointer",
            }}
          />

          {otherError ? (
            <span className={styles.inputError}>{otherError}</span>
          ) : null}

          {userCreated ? (
            <span className={styles.inputSuccess}>{"User created"}</span>
          ) : null}

          <p className={styles.loginLink}>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
