import React from "react";
import styles from "./styles/InstructionScreen.module.css";

interface InstructionScreenProps {
  text1: string;
  text2: string;
}

export default function InstructionScreen({ text1, text2 }) {
  return (
    <div className={styles.instructionContainer}>
      <h1>{text1}</h1>
      <h3>{text2}</h3>
    </div>
  );
}
