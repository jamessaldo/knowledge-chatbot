import React from "react";
import who1 from "../style/img/who1.png"
import who2 from "../style/img/who2.png"
import who3 from "../style/img/who3.png"

const Footer =()=> {
  const scrollToTop = ()=> {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
    return (
      <div>
        <div id="advice">
          <div className="container">
            <div className="col-md-8">
              <div className="row">
                <div className="section-title">
                  <h2>Advice for Public</h2>
                  <p>
                    Lindungilah diri anda dan juga orang lain dari penyakit!
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <img src={who1} className="img-responsive" alt=""/>
                </div>
                <div className="col">
                  <img src={who2} className="img-responsive" alt=""/>
                </div>
                <div className="col">
                  <img src={who3} className="img-responsive" alt=""/>
                </div>
              </div>
              <p>
                Source: <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public"><span style={{color:"#ffd000"}}>WHO</span></a>
              </p>
            </div>
          </div>
        </div>
        <div id="footer">
          <div className="container">
            <h3>Learn more about <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019">COVID-19(WHO)</a></h3>
            <p>
              <em>All data and information provided on this site is for informational purposes only. I make no representation as to accuracy, completeness, currentness, suitability, or validity of any information on this site and will not be liable for any errors, omissions, or delays in this information or any losses, injuries, or damages arising from its display or use. All information is provided on an as-is basis. </em>
            </p>
          </div>
          <br/>
          <h2 onClick={()=> scrollToTop()}>COVID-<span style={{color:"#ffd000"}}>19</span></h2>
        </div>
      </div>
    );
}

export default Footer;
