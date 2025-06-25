import styles from "./Preloader.module.css";
import part1 from "../../assets/preloaderAssets/1.svg";
import part2 from "../../assets/preloaderAssets/2.svg";
import part3 from "../../assets/preloaderAssets/3.svg";
import part4 from "../../assets/preloaderAssets/4.svg";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Preloader({ title }) {
  const containerRef = useRef(null);
  const iconRefs = useRef([]);
  const loaderTitleRef = useRef(null);

  useGSAP(() => {
    // Rotate the whole wrapper (group)
    gsap.to(containerRef.current, {
      rotation: 360,
      duration: 0.9,
      ease: "power1.inOut",
      repeat: -1,
      scale: 1.2,
      yoyo: true,
    });

    gsap.to(iconRefs.current, {
      scale: -1,
      duration: 0.8,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    gsap.to(loaderTitleRef.current, {
      opacity: 0.2,
      duration: 0.8,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div className={styles.container}>
      <div ref={containerRef} className={styles.wrapper}>
        {[part1, part2, part3, part4].map((part, i) => (
          <img
            key={i}
            src={part}
            alt={`preloader-${i + 1}`}
            className={styles.icon}
            ref={(el) => (iconRefs.current[i] = el)}
          />
        ))}
      </div>

      <h2 className={styles.loaderTitle} ref={loaderTitleRef}>
        {title?title:"Loading..."}
      </h2>
    </div>
  );
}
