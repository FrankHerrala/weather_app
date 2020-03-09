import React,{useState} from 'react';
import './App.css';
import WeatherTable from "./WeatherTable.js";
import Arrow from "./arrow.png";

const city_info = [
  {"name": "Tampere",
  "code": [634964]},
  {"name": "Jyväskylä",
  "code": [655195]},
  {"name": "Kuopio",
  "code": [650225]},
  {"name": "Helsinki",
  "code": [658225]},
  {"name": "Kaikki kaupungit",
  "code": [634964, 655195, 650225, 658225]},
]

//Laita tähän oma api avaimesi
const apiKey = ""

function App() {
  const [weatherStatus, setWeatherStatus] = useState([]);
  const [citySelection, setCity] = useState("Valitse kaupunki");
  const [dropdownDisplay, setDropdownDisplay] = useState(false);

  async function getWeatherStatus(city){
    let weatherdata = Promise.all(city.code.map( async city_code => {
      let forecast_response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${city_code}&units=metric&appid=${apiKey}`)
      let forecast_data = await forecast_response.json()
      let current_response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${city_code}&units=metric&appid=${apiKey}`)
      let current_data = await current_response.json()
      return {
        "city": forecast_data.city.name,
        "forecast_weather": forecast_data.list.slice(0,5),
        "current_weather": current_data
      }
    }))
    return weatherdata
  };

  return (
    <div className="App">
      <header className="headline">Säätutka</header>
      <div className="dropdown-menu">
        <button className="city-button" onClick={() => setDropdownDisplay(!dropdownDisplay)}>
          {citySelection} <img alt="Arrow" className="arrow" align="right" src={Arrow} />
        </button>
        { dropdownDisplay === false
          ? null
          : <div className="dropdown">
              {city_info.map( city =>
                <div key={city.name}>
                  <button  className="city-button" onClick={() => {
                      getWeatherStatus(city).then(newWeatherStatuses => setWeatherStatus(newWeatherStatuses));
                      setDropdownDisplay(!dropdownDisplay);
                      setCity(city.name);
                    }
                  }>{city.name}</button>
                </div>
              )}
            </div>
        }
      </div>
      { weatherStatus.length === 0
        ? <div>Kaupunkia ei ole valittu</div>
        : weatherStatus.map( city_weather => {
          return <WeatherTable key={city_weather.city} city_weather={city_weather}/>
        })
      }
    </div>
  );
}

export default App;
