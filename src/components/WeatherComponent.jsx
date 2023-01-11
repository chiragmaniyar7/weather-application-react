import React from "react";
import styled from "styled-components";
import { WeatherIcons } from "./weatherIcons";

export const WeatherInfoIcons = {
  sunset: "https://cdn-icons-png.flaticon.com/512/2924/2924900.png",
  sunrise: "https://cdn-icons-png.flaticon.com/512/7246/7246563.png",
  humidity: "https://cdn-icons-png.flaticon.com/512/728/728093.png",
  wind: "https://cdn-icons-png.flaticon.com/512/1506/1506761.png",
  pressure: "https://cdn-icons-png.flaticon.com/512/4115/4115904.png",
};
const Location = styled.span`
  margin: 15px auto;
  text-transform: capitalize;
  font-size: 28px;
  font-weight: bold;
`;
const Condition = styled.span`
  margin: 20px auto;
  text-transform: capitalize;
  font-size: 14px;
  & span {
    font-size: 28px;
  }
`;
const WeatherInfoLabel = styled.span`
  margin: 20px 25px 10px;
  text-transform: capitalize;
  text-align: start;
  width: 90%;
  font-weight: bold;
  font-size: 14px;
`;
const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px auto;
`;
const WeatherContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 30px auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WeatherInfoContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;
const InfoContainer = styled.div`
  display: flex;
  margin: 5px 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const InfoIcon = styled.img`
  width: 36px;
  height: 36px;
`;
const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin: 15px;
  & span {
    font-size: 12px;
    text-transform: capitalize;
  }
`;

const WeatherInfoComponent = (props) => {
  const { name, value } = props;
  return (
    <InfoContainer>
      <InfoIcon src={WeatherInfoIcons[name]} />
      <InfoLabel>
        {value}
        <span>{name}</span>
      </InfoLabel>
    </InfoContainer>
  );
};
const WeatherComponent = (props) => {
  const { weatherDetails } = props;
  const isDay = weatherDetails?.weather[0].icon?.includes("d");
  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };
  return (
    <>
      <div className="container">
        <WeatherContainer>
          <Condition>
            <span>{`${Math.floor(weatherDetails?.main?.temp)}°C`}</span>
            {`  |  ${weatherDetails?.weather[0].description}`}
          </Condition>
          <WeatherIcon src={WeatherIcons[weatherDetails?.weather[0].icon]} />
        </WeatherContainer>
        <Location>{`${weatherDetails?.name}, ${weatherDetails?.sys?.country}`}</Location>

        <WeatherInfoLabel>Weather Info</WeatherInfoLabel>
        <WeatherInfoContainer>
          <WeatherInfoComponent
            name={isDay ? "sunset" : "sunrise"}
            value={`${getTime(
              weatherDetails?.sys[isDay ? "sunset" : "sunrise"]
            )}`}
          />
          <WeatherInfoComponent
            name={"humidity"}
            value={weatherDetails?.main?.humidity}
          />
          <WeatherInfoComponent
            name={"wind"}
            value={weatherDetails?.wind?.speed}
          />
          <WeatherInfoComponent
            name={"pressure"}
            value={weatherDetails?.main?.pressure}
          />
        </WeatherInfoContainer>
        <button className="back-button" onClick={() => window.history.go()}>
          Go back
        </button>
      </div>
    </>
  );
};

export default WeatherComponent;
