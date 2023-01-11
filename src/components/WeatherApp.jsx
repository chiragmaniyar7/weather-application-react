import React, { useState } from "react";
import axios from "axios";
import "../styles/Weather.css";
import CityComponent from "./CityComponent";
import WeatherComponent from "./WeatherComponent";

function WeatherApp() {
  const [city, setCity] = useState();
  const [weatherDetails, setWeatherDetails] = useState();
  const [validCity, setValidCity] = useState(true);
  function searchHandler() {
    const apiKey = process.env.REACT_APP_API_KEY
      ? process.env.REACT_APP_API_KEY
      : "4b672e398cd93187dee22c6e6d691906";
    city === JSON.parse(localStorage.getItem(city))?.name
      ? setWeatherDetails(JSON.parse(localStorage.getItem(city)))
      : axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
          )
          .then((res) => {
            localStorage.setItem(res.data.name, JSON.stringify(res.data));
            setValidCity(true);
            setWeatherDetails(JSON.parse(JSON.stringify(res.data)));
            console.log(res.data);
          })
          .catch((err) => {
            setValidCity(false);
            console.log(err);
          });
  }
  return (
    <>
      {city && weatherDetails ? (
        <WeatherComponent weatherDetails={weatherDetails} />
      ) : (
        <CityComponent
          setCity={setCity}
          searchHandler={searchHandler}
          validCity={validCity}
        />
      )}
    </>
  );
}

export default WeatherApp;
