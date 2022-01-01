import React, { useState, useRef, useEffect } from "react";
import MessageBubble from "./components/message-bubble";

const defaultMessages = [
  {
    message: "(like outside in the sun).",
    isCurrentUser: false,
  },
  {
    message: `Make sure the visual focus indicator can be seen by people with low
    vision. This will also benefit anyone use a screen in a brightly lit
    space (like outside in the sun).`,
    isCurrentUser: false,
  },
  {
    message: `This will also benefit anyone use a screen in a brightly lit
    space (like outside in the sun).`,
    isCurrentUser: true,
  },
  {
    message: "This will also",
    isCurrentUser: true,
  },
  {
    message: "(like outside in the sun).",
    isCurrentUser: false,
  },
];

const PopupChat = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [messages, setMessages] = useState(defaultMessages);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isActive, setIsActive] = useState(true);

  const inputMessage = useRef(null);
  const containerMessages = useRef(null);

  const togglePopupChatbot = () => setIsPopupOpen(!isPopupOpen);

  useEffect(() => {
    containerMessages?.current?.scrollTo(
      0,
      containerMessages?.current?.scrollHeight
    );
  }, []);

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

    /* pesan otomatis buat tes */
    if (messages[messages.length - 1]?.isCurrentUser) {
      setTimeout(() => {
        setMessages((int) => [
          ...int,
          {
            message: (Math.random() + 1).toString(36).substring(7),
            isCurrentUser: false,
          },
          {
            message: `Masih terlalu dini untuk mengetahui apakah vaksin-vaksin COVID-19 akan memberikan perlindungan jangka panjang. Jawaban pertanyaan ini perlu diteliti lebih lanjut. Namun, kabar baiknya adalah data yang ada mengindikasikan bahwa sebagian besar orang yang telah sembuh dari COVID-19 memiliki respons sistem imun yang memberikan setidaknya perlindungan tertentu terhadap infeksi ulang – meskipun kita masih mempelajari seberapa kuat perlindungan ini, dan seberapa lama perlindungan ini bertahan.\n\nBelum pasti juga berapa dosis dari suatu vaksin COVID-19 yang akan diperlukan. Sebagian besar vaksin COVID-19 yang sedang dites saat ini menggunakan dua dosis.`,
            isCurrentUser: false,
          },
        ]);
      }, 500);
    }
  }, [messages]);

  const handleSubmitMessage = (e) => {
    e?.preventDefault();

    if (!currentMessage) return;

    setMessages((int) => [
      ...int,
      { message: currentMessage, isCurrentUser: true },
    ]);

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
                <button type="button" className="btn-link-disconnect">
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
                placeholder="Tuliskan pesan..."
                ref={inputMessage}
                value={currentMessage}
                onKeyPress={handleKeyDown}
                onChange={(e) => setCurrentMessage(e.currentTarget.value)}
              />
            </div>
            <div className="child right">
              <button type="submit" className="btn-send-message">
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
