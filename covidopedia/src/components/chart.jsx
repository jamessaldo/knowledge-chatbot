import React, { useEffect, useContext, useState } from "react";
import { LandingPageContext } from "../pages/LandingPageContext";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
/* eslint-disable */
const Charts = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  var days = ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"];
  var month = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const [vaccine, setVaccine, covidBar, setCovidBar, detailCovid, setDetail] =
    useContext(LandingPageContext);
  const [datenow, setDatenow] = useState(new Date());
  const [isLoading, setLoading] = useState({ loadVaccine: true, bar: true });

  var dayName = days[datenow.getDay()];
  var monthName = month[datenow.getMonth()];

  var options_bar = {
    maintainAspectRatio: false,
    type: "bar",
    responsive: true,
    legend: { display: false },
    title: {
      display: true,
      text: "Histogram 10 Negara dengan Covid-19 Terbanyak",
    },
  };

  const getDetailCountry = () => {
    axios({
      url: "https://corona.lmao.ninja/v3/covid-19/countries/indonesia",
      headers: { "content-type": "application/json" },
      method: "get",
    }).then((result) => {
      var covids = result.data;
      setDetail({
        cases: covids.cases,
        deaths: covids.deaths,
        recovered: covids.recovered,
      });
      setDatenow(new Date(covids.updated));
    });
  };

  const getBiggestCases = () => {
    axios({
      url: "https://corona.lmao.ninja/v3/covid-19/countries?sort=cases",
      headers: { "content-type": "application/json" },
      method: "get",
    }).then((result) => {
      var covidbar = result.data;
      var labels = [];
      var datas = [];

      for (var i = 0; i < 10; i = i + 1) {
        labels.push(covidbar[i].country);
        datas.push(covidbar[i].cases);
      }
      var dd = {
        labels: labels,
        datasets: [
          {
            label: "Jumlah",
            backgroundColor: [
              "#3e95cd",
              "#8e5ea2",
              "#3cba9f",
              "#e8c3b9",
              "#c45850",
              "#F4B93D",
              "#B4DDBF",
              "#4A4A4A",
              "#EABAD8",
            ],
            data: datas,
          },
        ],
      };
      setCovidBar(dd);
      setLoading({ bar: false });
    });
  };

  const getVaccinatedData = () => {
    axios({
      url:
        "https://data.covid19.go.id/public/api/pemeriksaan-vaksinasi.json?_=" +
        new Date().getTime(),
      headers: { "content-type": "application/json" },
      method: "get",
    }).then((result) => {
      setVaccine(result.data.vaksinasi);
      setLoading({ loadVaccine: false });
    });
  };

  useEffect(() => {
    if (detailCovid.cases === 0) {
      getDetailCountry();
    }
  }, [detailCovid]);

  useEffect(() => {
    if (!covidBar) {
      getBiggestCases();
    }
  }, [covidBar]);

  useEffect(() => {
    if (!vaccine) {
      getVaccinatedData();
    }
  }, [vaccine]);

  return (
    <div id="charts" className="text-center">
      <div className="container" style={{ maxWidth: "1200px" }}>
        <div className="section-title">
          <h2 className="text-center">Charts</h2>
        </div>
        <div className="panel-body">
          <div className="title-covid">
            <h2 className="head-title">
              COVID-19 Situation Report for Indonesia
            </h2>
            <h3 className="head-title">
              Terhitung sejak : {dayName}, {datenow.getDate()} {monthName}{" "}
              {datenow.getFullYear()}
            </h3>
          </div>
          <br />
          <div className="logo-chart">
            <div className="detail-logo konfirmasi">
              <div className="dot-logo">
                <i
                  className="fa fa-ambulance fa-2x"
                  style={{ color: "orange", marginTop: "15px" }}
                  aria-hidden="true"
                ></i>
              </div>
              <h4>{detailCovid.cases.toLocaleString("en-US")}</h4>
              <p className="detail">Konfirmasi</p>
            </div>
            <div className="detail-logo meninggal">
              <div className="dot-logo">
                <i
                  className="fa fa-bed fa-2x"
                  style={{ color: "red", marginTop: "15px" }}
                  aria-hidden="true"
                ></i>
              </div>
              <h4>{detailCovid.deaths.toLocaleString("en-US")}</h4>
              <p className="detail">Meninggal</p>
            </div>
            <div className="detail-logo sembuh">
              <div className="dot-logo">
                <i
                  className="fa fa-plus-square  fa-2x"
                  style={{ color: "green", marginTop: "15px" }}
                  aria-hidden="true"
                ></i>
              </div>
              <h4>{detailCovid.recovered.toLocaleString("en-US")}</h4>
              <p className="detail">Sembuh</p>
            </div>
          </div>
          <br />
          <div className="chartline">
            <h3>Perkembangan Vaksin di Indonesia</h3>
            {isLoading.loadVaccine ? (
              "Loading ..."
            ) : (
              <div className="logo-chart">
                <div className="row">
                  <div className="col">
                    <div
                      className="panel-body"
                      style={{ background: "#39CCCC", color: "white" }}
                    >
                      {vaccine?.total?.jumlah_vaksinasi_1.toLocaleString(
                        "en-US"
                      )}
                    </div>
                  </div>
                  <div className="col">
                    <div
                      className="panel-body"
                      style={{ background: "#39CCCC", color: "white" }}
                    >
                      {vaccine?.total?.jumlah_vaksinasi_2.toLocaleString(
                        "en-US"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="chartline">
            <h3>10 Negara dengan Kasus Covid-19 Terbanyak</h3>
            {isLoading.bar
              ? "Loading ..."
              : covidBar?.datasets && (
                  <Bar options={options_bar} data={covidBar} />
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
