import React, { useState } from 'react';
import './Weather.css';
import FormattedDate from './FormattedDate';
import axios from 'axios';

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [ready, setReady] = useState(false);

  function displayWeather(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
     setReady(true);
  }
  

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function search() {
let apiKey = 'b400ae3b711a616262d18b0ca2cbe78f';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);
  }

  

  function updateCity(event) {
    setCity(event.target.value);
        
  }

  if (ready) {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city..."
                className="form-control"
                autoFocus="on"
                onChange={updateCity}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <h1>{weatherData.city }</h1>
        <ul>
          <li>
            <FormattedDate date={weatherData.date} />
          </li>
          <li>Scattered clouds</li>
        </ul>
        <div className="row mt-3">
          <div className="col-6">
            <img
              src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
              alt="weather-icon"
            />{' '}
            <span className="temperature">21</span>
            <span className="unit">°C</span>
          </div>
          <div className="col-6">
            <ul>
              <li>Precipitation : 61%</li>
              <li>Humidity: 61%</li>
              <li>Wind: 21 km/h</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
search();
    return 'Loading...';
  }
}
