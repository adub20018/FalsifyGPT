import React from "react";
import styles from "./styles/ChatMessage.module.css";

export default function ChatMessage({ message, isUserMessage }) {
  const messageClass = isUserMessage ? styles.right : styles.left;

  return (
    <div className={messageClass}>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
