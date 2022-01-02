import React from "react";

const MessageBubble = ({
  data,
  isCurrentUser,
  hasSameSiblingBefore,
  hasSameSiblingAfter,
  handleRecommendation,
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
        <span className="text-message">
          {!isCurrentUser && data.score > 0.5 && data.score !== 2
            ? `Pertanyaan:\n\n${data.question} \n\nJawaban:\n\n${data.message}`
            : data.message}
        </span>
        {data.score <= 0.5 && (
          <>
            <br />
            <br />
            <div>
              <button
                type="button"
                className="btn-link recommendation"
                onClick={() => handleRecommendation(data.question)}
              >
                {data.question}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
