import React from "react";

const MessageBubble = ({
  message,
  isCurrentUser,
  hasSameSiblingBefore,
  hasSameSiblingAfter,
}) => {
  return (
    <div
      className={`bubble-message-container ${
        isCurrentUser ? "is-user" : "is-bot"
      }${hasSameSiblingAfter ? " pb-10" : ""}${
        hasSameSiblingBefore && !isCurrentUser ? " pl-60" : ""
      }`}
    >
      {!isCurrentUser && !hasSameSiblingBefore && (
        <div className="img-avatar">
          <i className="fas fa-robot" />
        </div>
      )}
      <div className="bubble-message">
        <span className="text-message">{message}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
