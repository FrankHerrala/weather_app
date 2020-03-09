import React from 'react';
import './App.css';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function WeatherTable(props) {

  let d = new Date(0);
  d.setUTCSeconds(props.city_weather.current_weather.dt)

  let day = d.getDate().toString()
  let hour = d.getHours().toString()
  let minute = d.getMinutes().toString()
  day.charAt(day.length-1) === "1"
    ? day = day + "st"
    : day.charAt(day.length-1) === "2"
      ? day = day + "nd"
      : day.charAt(day.length-1) === "3"
        ? day = day + "rd"
        : day = day +  "th"

  function addZero(time){
    if (time.length === 1){
      time = "0" + time
    };
    return time;
  }
  return (
    <div>
          {props.city_weather === undefined
            ? <div>City not selected</div>
            : <div className="main-table">
              <div key={props.city_weather.name} className="main-table-first-row">
                <span className="loc-desc" style={{width: "50%"}}>
                  <div className="location">{props.city_weather.current_weather.name}</div>
                  <div className="description">{props.city_weather.current_weather.weather[0].description}</div>
                </span>
                <span className="icon" style={{width: "25%"}}>
                  <img alt="Weather icon" src={`http://openweathermap.org/img/wn/${props.city_weather.current_weather.weather[0].icon}@2x.png`}/>
                </span>
                <span className="temp" style={{width: "25%"}}>
                  {Math.round(props.city_weather.current_weather.main.temp)} °C
                </span>
              </div>
              <div key="extra" className="main-table-second-row">
                <span className="date-time" style={{width: "50%"}}>
                  <div className="date">{months[d.getMonth()]} {day}</div>
                  <div className="time">{addZero(hour)}:{addZero(minute)}</div>
                </span>
                <span className="main-wind-hum-pre" style={{width: "50%"}}>
                  <div>Wind: {props.city_weather.current_weather.wind.speed} m/s</div>
                  <div>Humidity: {props.city_weather.current_weather.main.humidity} %</div>
                  <div>Precipitation (3h): {
                    props.city_weather.current_weather.rain === undefined
                    ? props.city_weather.current_weather.snow === undefined
                      ? "0 mm"
                      : Math.round(props.city_weather.current_weather.snow["3h"]) + " mm"
                    : Math.round(props.city_weather.current_weather.rain["3h"]) + " mm"
                  } </div>
                </span>
              </div>
              </div>
          }
        <div className="table">
          <div key="asd" className="table-row">
            {props.city_weather.forecast_weather === undefined
              ? <span style={{width: "20%"}}>City not selected</span>
              : props.city_weather.forecast_weather.map( (item, i) =>
                <span key={item.dt_txt} className="sub-weather" style={{width: "20%"}}><div className="sub-time">{item.dt_txt.slice(10,16)}</div>
                  <img alt="Weather icon" src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}/> <br />
                    <div className="sub-temp">{Math.round(item.main.temp)} °C</div>
                    <div className="wind-hum-pre">
                      {item.wind.speed} m/s<br />
                      {item.main.humidity} %<br />
                      {
                        item.rain === undefined
                        ? item.snow === undefined
                          ? "0 mm"
                          : Math.round(item.snow["3h"]) + " mm"
                        : Math.round(item.rain["3h"]) + " mm"
                      }
                    </div>
                </span>
            )}
          </div>
        </div>
      </div>
  );
}

export default WeatherTable;
