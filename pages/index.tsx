import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import ChatMessage from "./components/ChatMessage";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: userInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      // stores each message and response to display chat history
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        { userMessage: userInput, botMessage: data.result },
      ]);
      setUserInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>FalsifyGPT</title>
        {/* <link rel="icon" href="/dog.png" /> */}
      </Head>

      <main className={styles.main}>
        <h1>FalsifyGPT</h1>
        <h3>Enter some information to be critically analysed</h3>
        <div className={styles.content}>
          {chatHistory.map((message, index) => (
            <div>
              <ChatMessage
                key={index}
                message={message.userMessage}
                isUserMessage={true}
              />
              <ChatMessage
                key={index}
                message={message.botMessage}
                isUserMessage={false}
              />
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="input"
            placeholder="Enter some information"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
      </main>
    </div>
  );
}
