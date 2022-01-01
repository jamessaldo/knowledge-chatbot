import React from "react";
import data from "../data/data.json";
import creditswho from "../style/img/credits-who.png";

const Credits = () => {
  return (
    <div id="credits">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="credits-text">
              <h2>Credits</h2>
              <p>
                Inspired by{" "}
                <a href="https://iamcovid-19.netlify.app">
                  iamcovid-19.netlify.app
                </a>
              </p>
              <h3>Sources</h3>
              <div className="list-style">
                <div className="list">
                  <ul>
                    {data
                      ? data.Credits.sources.map((d, i) => (
                          <li key={`${d}-${i}`}>
                            <a href={data.Credits.links[i]}>{d}</a>
                          </li>
                        ))
                      : "loading"}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-12 col-lg-6">
            <img src={creditswho} className="img-responsive" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;
