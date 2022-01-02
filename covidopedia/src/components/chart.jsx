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
      headers: {
        "content-type": "application/json",
      },
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
    <div id="charts">
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
          <div className="logo-chart row">
            <div className="detail-logo konfirmasi col-12 col-sm-4">
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
            <div className="detail-logo meninggal col-12 col-sm-4">
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
            <div className="detail-logo sembuh col-12 col-sm-4">
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
          <div className="chartline h-auto pb-35">
            <h3 className="text-center">Perkembangan Vaksin di Indonesia</h3>
            {isLoading.loadVaccine ? (
              <div className="w-100 text-center m-auto">Loading ...</div>
            ) : (
              <div className="row mt-20">
                <div className="col-12 col-sm-5 card-detail-vaccine left d-flex flex-column">
                  <span>
                    {vaccine?.total?.jumlah_vaksinasi_1.toLocaleString(
                      "en-US"
                    ) ?? (165900887).toLocaleString("en-US")}
                  </span>
                  <span>Vaksinasi Ke-1</span>
                  <span>
                    +
                    {vaccine?.penambahan?.jumlah_vaksinasi_1?.toLocaleString(
                      "en-US"
                    ) ?? (4039665).toLocaleString("en-US")}
                  </span>
                  <i className="fa fa-syringe" />
                </div>
                <div className="col-12 col-sm-5 card-detail-vaccine right d-flex flex-column">
                  <span>
                    {vaccine?.total?.jumlah_vaksinasi_2.toLocaleString(
                      "en-US"
                    ) ?? (114103362).toLocaleString("en-US")}
                  </span>
                  <span>Vaksinasi Ke-2</span>
                  <span>
                    +
                    {vaccine?.penambahan?.jumlah_vaksinasi_2?.toLocaleString(
                      "en-US"
                    ) ?? (72924).toLocaleString("en-US")}
                  </span>
                  <i className="fa fa-syringe" />
                </div>
              </div>
            )}
          </div>
          <div className="chartline">
            <h3 className="text-center">
              10 Negara dengan Kasus Covid-19 Terbanyak
            </h3>
            {isLoading.bar ? (
              <div className="w-100 text-center m-auto">Loading ...</div>
            ) : (
              covidBar?.datasets && (
                <Bar options={options_bar} data={covidBar} />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
