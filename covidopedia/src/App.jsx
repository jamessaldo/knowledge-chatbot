import React from "react";
import Navigation from "./components/navigation";
import Header from "./components/headers";
import Charts from "./components/chart";
import Credits from "./components/credits";
import Advices from "./components/advices";
import Sidebar from "./components/sidebar";
import { LandingPageProvider } from "./pages/LandingPageContext";
import "./style/scss/style.scss";
import "./style/scss/navbar.scss";
import "./style/scss/headers.scss";
import "./style/scss/chart.scss";
import "./style/scss/credit.scss";
import "./style/scss/contact.scss";
import "./style/scss/sidebar.scss";

const App = () => {
  return (
    <div>
      <LandingPageProvider>
        <Navigation />
        <Sidebar />
        <div className="content" id="main">
          <Header />
          <Charts />
          <Credits />
          <Advices />
        </div>
      </LandingPageProvider>
    </div>
  );
};

export default App;
