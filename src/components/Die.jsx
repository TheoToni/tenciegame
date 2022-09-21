import React from "react";
import styles from "./Die.module.css";

function Die(props) {
  return (
    <div className={styles.die}>
      <h2>{props.value}</h2>
    </div>
  );
}

export default Die;
