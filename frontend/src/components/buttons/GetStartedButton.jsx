import styles from "./GetStartedButton.module.css";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import arrowupIcon from "../../assets/arrowup.svg";
import { useNavigate } from "react-router-dom";

export default function GetStartedButton() {
  const navigate = useNavigate();

  const getStartedBtnRef = useRef(null);
  const arrowUpRef = useRef(null);

  const handleGetStarted = () => {
    navigate("/signup");

    // const tl = gsap.timeline();

    // Button fade-out animation
    // tl.to(getStartedBtnRef.current, {
    //   opacity: 0,
    //   duration: 0.2,
    //   ease: "power1.inOut",
    //   delay: 0.1,
    // })
      // .to(arrowUpRef.current, {
      //   y: 100,
      //   duration: 0.5,
      //   ease: "power1.inOut",
      // })
      // .to(arrowUpRef.current, {
      //   y: "-100vh",
      //   duration: 0.5,
      //   ease: "power1.inOut",
      // });

  };

  useGSAP(()=>{
    gsap
      .to(arrowUpRef.current, {
        y: -12,
        repeat: -1,
        yoyo: true,
        duration: 0.6,
        ease: "power1.inOut",
      });
  });

  return (
    <div>
      <button
        className={styles.getStartedBtn}
        ref={getStartedBtnRef}
        onClick={handleGetStarted}
      >
        Get Started
      </button>

      <div ref={arrowUpRef}>
        <img src={arrowupIcon} alt="arrow up" className={styles.arrowUp}/>
      </div>
    </div>
  );
}
