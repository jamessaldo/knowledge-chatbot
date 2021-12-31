import React, { useState, createContext } from "react";

export const LandingPageContext = createContext();

export const LandingPageProvider = (props) => {
  const [vaccine, setVaccine] = useState(null);
  const [covidBar, setCovidBar] = useState(null);
  // const [datenow, setDatenow] = useState(new Date())
  const [sidebar, setSidebar] = useState(false);
  const [detailCovid, setDetail] = useState({
    cases: 0,
    deaths: 0,
    recovered: 0,
    last_update: new Date(),
  });

  return (
    <LandingPageContext.Provider
      value={[
        vaccine,
        setVaccine,
        covidBar,
        setCovidBar,
        detailCovid,
        setDetail,
        sidebar,
        setSidebar,
      ]}
    >
      {props.children}
    </LandingPageContext.Provider>
  );
};
