import React from "react";

const Header = () => {
    return (
      <header id="header">
        <div className="intro">
          <div className="overlay">
            <div className="intro-text">
              <a
                href="#charts"
                className="btn-custom"
              >
                Learn More
              </a>{" "}
            </div>
          </div>
        </div>
      </header>
    );
}

export default Header;
