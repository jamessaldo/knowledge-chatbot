/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import MessageBubble from "./components/message-bubble";

const ENDPOINT = "http://127.0.0.1:5001";

const PopupChat = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [second, setSecond] = useState(300);
  const inputMessage = useRef(null);
  const containerMessages = useRef(null);
  const [socket, setSocket] = useState(null);

  const reconnectingSocket = () => {
    setSecond(300);
    setSocket(io(ENDPOINT));
  };

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    const seconds = second;
    const timer = setInterval(() => {
      if (second > 0) setSecond(seconds - 1);
    }, 1000);

    if (typeof second !== "undefined" && second <= 0) {
      socket.emit("disconnect_request");
    }

    return () => clearInterval(timer);
  }, [second]);
  console.log(second);
  const togglePopupChatbot = () => setIsPopupOpen(!isPopupOpen);

  useEffect(() => {
    containerMessages?.current?.scrollTo(
      0,
      containerMessages?.current?.scrollHeight
    );
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        setIsActive(true);
        socket.emit("connect_request", {
          data: "Selamat datang di Covidopedia! Mau tanya apa nih sama Copi?",
        });
      });

      socket.on("disconnect", (msg, cb) => {
        setIsActive(false);
        setMessages((messages) => [
          ...messages,
          {
            message: "Oops! Sepertinya anda terputus :(",
            isCurrentUser: false,
          },
        ]);
      });

      socket.on("message", (message) => {
        setMessages((messages) => [
          ...messages,
          {
            message: message.data,
            isCurrentUser: false,
          },
        ]);
      });
    }
  }, [socket]);

  useEffect(() => {
    const shouldScroll =
      containerMessages?.current?.scrollTop +
        containerMessages?.current?.clientHeight ===
      containerMessages?.current?.scrollHeight;

    if (!shouldScroll) {
      containerMessages?.current?.scrollTo(
        0,
        containerMessages?.current?.scrollHeight
      );
    }
  }, [messages]);

  const handleSubmitMessage = (e) => {
    e?.preventDefault();

    if (!currentMessage) return;

    setMessages((int) => [
      ...int,
      { message: currentMessage, isCurrentUser: true },
    ]);

    setSecond(300);

    socket.emit("question", {
      data: currentMessage,
    });

    inputMessage.current.value = "";
    inputMessage?.current?.focus();
    setCurrentMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmitMessage();
    }
  };

  return (
    <div className="position-fixed container-chatbot">
      {isPopupOpen ? (
        <div className="container-popup-chatbot position-relative">
          <div className="header-popup-chatbot">
            <h1 className="title-popup">
              Tanyakan pada Copi pertanyaan terkait Covid-19
            </h1>
            <button
              className="btn-close-popup"
              type="button"
              onClick={togglePopupChatbot}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div
            className={`messages-box ${!isActive ? "pb-85" : ""}`}
            ref={containerMessages}
          >
            {messages.map(({ isCurrentUser, message }, index) => {
              return (
                <MessageBubble
                  key={index}
                  message={message}
                  isCurrentUser={isCurrentUser}
                  hasSameSiblingAfter={
                    messages[index + 1]?.isCurrentUser === isCurrentUser
                  }
                  hasSameSiblingBefore={
                    messages[index - 1]?.isCurrentUser === isCurrentUser
                  }
                />
              );
            })}
          </div>
          {!isActive && (
            <div className="alert-disconnect">
              <div>
                <button
                  type="button"
                  className="btn-link-disconnect"
                  onClick={reconnectingSocket}
                >
                  Hubungkan kembali
                </button>
              </div>
            </div>
          )}
          <form
            onSubmit={handleSubmitMessage}
            className="position-absolute message-form"
          >
            <div className="child left">
              <textarea
                id="message"
                name="message"
                className="message-input"
                placeholder="Tuliskan pertanyaan..."
                ref={inputMessage}
                value={currentMessage}
                onKeyPress={handleKeyDown}
                onChange={(e) => setCurrentMessage(e.currentTarget.value)}
                disabled={!isActive}
              />
            </div>
            <div className="child right">
              <button
                type="submit"
                className="btn-send-message"
                disabled={!isActive}
              >
                <i className="fas fa-paper-plane" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          type="button"
          className="btn-chatbot-hero"
          onClick={togglePopupChatbot}
        >
          <i className="fas fa-robot" />
        </button>
      )}
    </div>
  );
};

export default PopupChat;
