import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";

import NavBrandIcon from "./components/navBrandIcon/NavBrandIcon";
import SignupButton from "./components/buttons/SignupButton";
import LoginButton from "./components/buttons/LoginButton";
import GetStartedButton from "./components/buttons/GetStartedButton";
import Preloader from "./components/preloader/Preloader";
import bgVideo from "./assets/bgVideo.mp4";
import { useAuth } from "./context/AuthContext";

export default function Landing() {
  const navigate = useNavigate();
  const { isLogged } = useAuth();

  const [loading, setLoading] = useState(true);

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
  // useEffect(() => {
  //   if (isLogged) {
  //     navigate("/home");
  //   }
  // }, [isLogged, navigate]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className={styles.main}>
      <div className={styles.bgVideoWrapper}>
        <video
          className={styles.backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <nav className={styles.navbar}>
        <div className={styles.leftNavItems}>
          <NavBrandIcon />
        </div>
        <div className={styles.rightNavItems}>
          <SignupButton />
          <LoginButton />
        </div>
      </nav>

      <section className={styles.heroSection}>
        <div className={styles.heroText}>
          <h1>
            <span className={styles.fromText}>From</span> <br />
            <span className={styles.highlight}>To-Do </span>
            <span className={styles.highlight}> to </span>
            <span className={styles.highlight}>ToDone</span>
          </h1>
        </div>
        <div className={styles.subHeroText}>
          <p>Plan smarter, track progress, and crush deadlines with ease.</p>
        </div>
        <div className={styles.getStartedBtnWrapper}>
          <GetStartedButton />
        </div>
      </section>
    </div>
  );
}
