import React from "react";
import CardLayout from "./UI/CardLayout";
import { weatherCodesMapping } from "../utils";
import moment from "moment";
import Temperature from "../assets/images/temperature.svg";
import Eye from "../assets/images/eye.svg";
import ThermoMini from "../assets/images/temperature-mini.svg";
import Water from "../assets/images/water.svg";
import Windy from "../assets/images/windy.svg";
import Location from "../assets/images/location.svg";
import DayForecastCard from "./UI/DayForecastCard";
export default function SearchResult({
  dailyForecast,
  forecastLocation,
  currentWeatherData,
}) {
  console.log(dailyForecast, forecastLocation, currentWeatherData);
  return (
    <div className="search-result-container-div">
      <p className="forecast-title text-capitalize">
        {currentWeatherData[0]?.values?.weatherCondition}
      </p>
      <CardLayout>
        <div className="flex-item-center justify-between">
          <div style={{ width: "30%" }}>
            <img
              src={
                weatherCodesMapping[currentWeatherData[0]?.values?.weatherCode]
                  ?.img
              }
              width={48}
              height={48}
              alt=""
            />
            <div className="flex items-center">
              <img src={Location} alt="" />
              <p className="city-name">{forecastLocation.label}</p>
            </div>
            <p className="text-blue" style={{ paddingLeft: "30px" }}>
              Today {moment(currentWeatherData[0]?.date).format("MMM DD")}
            </p>
          </div>

          <div className="temp-container" style={{ width: "auto" }}>
            <img
              src={Temperature}
              alt="temperature"
              className="thermometer-img"
            />

            <div>
              <p style={{ fontSize: "144px" }}>
                {parseFloat(
                  currentWeatherData[0]?.values?.temperature2m
                ).toFixed(0)}
              </p>
              <p className="text-capitalize">
                {currentWeatherData[0]?.values?.weatherCondition || "N/A"}
              </p>
            </div>
            <p
              style={{
                fontSize: "24px",
                alignSelf: "center",
                paddingTop: "45px",
              }}
            >
              °C
            </p>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "60px",
                width: "100%",
                columnGap: "16px",
              }}
            >
              <div className="weather-info-subtitle">
                <div className="flex">
                  <img src={Eye} alt="eye" />
                  <p className="weather-params-label">visibility</p>
                </div>
                <p>
                  {Math.floor(currentWeatherData[0].values?.visibility / 1000)}{" "}
                  km
                </p>
              </div>
              <p>|</p>
              <div className="weather-info-subtitle">
                <div className="flex">
                  <img src={ThermoMini} alt="" />
                  <p className="weather-params-label">feels like</p>
                </div>
                <p>
                  {Math.floor(
                    currentWeatherData[0].values?.apparentTemperature / 1000
                  )}
                  °C
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "60px",
                width: "100%",
                columnGap: "16px",
              }}
            >
              <div className="weather-info-subtitle">
                <div className="flex">
                  <img src={Water} alt="eye" />
                  <p className="weather-params-label">Humidity</p>
                </div>
                <p>
                  {Math.floor(currentWeatherData[0].values?.humidity / 1000)} %
                </p>
              </div>
              <p>|</p>
              <div className="weather-info-subtitle">
                <div className="flex">
                  <img src={Windy} alt="" />
                  <p className="weather-params-label">Wind</p>
                </div>
                <p>
                  {parseFloat(
                    currentWeatherData[0]?.values?.windSpeed || 0
                  ).toFixed(0)}{" "}
                  km/h
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardLayout>

      <div
        className="flex  justify-between daily-forecast-section"
        style={{ marginTop: "24px", columnGap: "12px" }}
      >
        {Object.keys(dailyForecast).length > 0 &&
          Object.entries(dailyForecast).map(([day, data]) => {
            return (
              <DayForecastCard
                key={day}
                date={day}
                data={data}
              ></DayForecastCard>
            );
          })}
      </div>
    </div>
  );
}
