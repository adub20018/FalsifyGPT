import React from "react";
import styles from "./styles/ChatMessage.module.css";

// dynamically sets css class for associated party (user or bot)
export default function ChatMessage({ message, isUserMessage }) {
  const messageClass = isUserMessage ? styles.user : styles.bot;

  return (
    <div className={messageClass}>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
