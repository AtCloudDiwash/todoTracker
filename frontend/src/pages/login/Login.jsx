import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import navbrandIcon from "../../assets/navbrand.svg";
import eyeOn from "../../assets/eyeon.svg";
import eyeClosed from "../../assets/eyeclosed.svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Preloader from "../../components/preloader/Preloader";
import NavBrandIcon from "../../components/navBrandIcon/NavBrandIcon";

export default function Login() {
  const navigate = useNavigate();
  const { isLogged } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_RENDERER_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json(); 
        setSuccessMessage(data.msg);
        console.log("ran")
        setTimeout(()=>{
          window.location.href = "/home";
        }, 1000)
        localStorage.setItem("token", data.token);
      } else if (response.status === 500) {
        const data = await response.json();
        setError(data.error);
      } else if (response.status === 400) {
        const data = await response.json();
        if (data.errors.email) setEmailError(data.errors.email);
        if (data.errors.password) setPasswordError(data.errors.password);
      } else if (response.status === 401) {
        const data = await response.json();
        setError(data.error);
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (err) {
      setError("Couldn't login in. Try again.");
    }
  };
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

  return loading ? (
    <Preloader />
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
          <h1>Login</h1>
        </div>

        <form>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError ? (
            <span className={styles.danger}>{emailError}</span>
          ) : null}
          <label>Password</label>
          <div className={styles.passwordField}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? eyeOn : eyeClosed}
              onClick={() => setShowPassword(!showPassword)}
              className={styles.toggleIcon}
              alt="toggle visibility"
            />
          </div>

          {passwordError ? (
            <span className={styles.danger}>{passwordError}</span>
          ) : null}

          <p className={styles.forgot}>Forgot password?</p>

          {successMessage ? (
            <span className={styles.success}>{successMessage}</span>
          ) : null}

          {error ? <span className={styles.danger}>{error}</span> : null}
          <input
            type="submit"
            value="Login"
            className={styles.submitBtn}
            onClick={handleSubmit}
            styles={{
              opacity: loading ? 0.5 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          />

          <p className={styles.signupLink}>
            Don't have an account? <a href="/signup">Signup</a>
          </p>
        </form>
      </div>
    </div>
  );
}
