import Spline from "@splinetool/react-spline";
import styles from "./NebulaParticle.module.css";

export default function App() {
  return (
    <div className = {styles.wrapper}>
      <Spline scene="https://prod.spline.design/TZzg7TP9h0uWukYZ/scene.splinecode" />
    </div>
  );
}
