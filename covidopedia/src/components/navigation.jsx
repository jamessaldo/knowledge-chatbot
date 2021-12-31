import React, { useContext } from "react";
import { LandingPageContext } from "../pages/LandingPageContext";

const Navigation = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [, , , , , , sidebar, setSidebar] = useContext(LandingPageContext);
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            onClick={() => showSidebar()}
          >
            <span className="icon-bar">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </span>
          </button>
          <div className="navbar-brand" onClick={() => scrollToTop()}>
            Covidopedia
          </div>
        </div>

        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#charts" className="page-scroll">
                Charts
              </a>
            </li>
            <li>
              <a href="#credits" className="page-scroll">
                Credits
              </a>
            </li>
            <li>
              <a href="#advice" className="page-scroll">
                Advices
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
