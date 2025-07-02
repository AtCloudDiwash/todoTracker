import { useRef, useEffect } from "react";
import gsap from "gsap";
import styles from "./RotatingClock.module.css";

export default function RotatingClock({ motion = true }) {
  const handRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    let handAnim, wrapperAnim;

    if (motion) {
      handAnim = gsap.to(handRef.current, {
        rotate: 360,
        duration: 0.6,
        repeat: -1,
        ease: "linear",
        transformOrigin: "bottom center",
      });

      wrapperAnim = gsap.to(wrapperRef.current, {
        scale: 1.1,
        duration: 0.6,
        repeat: -1,
        ease: "linear",
        yoyo: true,
      });
    }

    // Cleanup when motion turns false or on unmount
    return () => {
      handAnim?.kill();
      wrapperAnim?.kill();
      gsap.set(handRef.current, { rotate: 0 });
      gsap.set(wrapperRef.current, { scale: 1 });
    };
  }, [motion]);

  return (
    <div className={styles.clockWrapper} ref={wrapperRef}>
      <div className={styles.clockCenter}>
        <div className={styles.clockHand} ref={handRef}></div>
      </div>
    </div>
  );
}
