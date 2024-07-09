import './App.css'
import {fetchWeatherApi} from 'openmeteo'
import {useState} from 'react'

function Weather(lat, long, tzone){
  const params = {
    "latitude": lat,
    "longitude": long,
    "current": ["temperature_2m", "is_day", "precipitation", "rain", "showers", "wind_speed_10m"],
      "hourly": ["temperature_2m", "rain", "showers", "wind_speed_10m"],
      "timezone": tzone,
      "forecast_days": 1
  }
  const url = "https://api.open-meteo.com/v1/forecast"
  const responses = fetchWeatherApi(url, params)
  return responses[0]
  // const range = (start, stop, step) =>
  //   Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)
  // const  response = responses[0]
  // const utcOffsetSeconds = response.utcOffsetSeconds();
  // // const timezone = response.timezone()
  // // const timezoneAbbreviation = response.timezoneAbbreviation();
  // // const latitude = response.latitude()
  // // const longitude = response.longitude()

  // const current = response.current()
  // const hourly = response.hourly()

  // const weatherData = {
  //   current: {
  //     time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
  //     temperature2m: current.variables(0).value(),
  //     isDay: current.variables(1).value(),
  //     precipitation: current.variables(2).value(),
  //     rain: current.variables(3).value(),
  //     showers: current.variables(4).value(),
  //     windSpeed10m: current.variables(5).value(),
  //   },
  //   hourly: {
  //     time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
  //       (t) => new Date((t + utcOffsetSeconds) * 1000)
  //     ),
  //     temperature2m: hourly.variables(0).valuesArray(),
  //     rain: hourly.variables(1).valuesArray(),
  //     showers: hourly.variables(2).valuesArray(),
  //     windSpeed10m: hourly.variables(3).valuesArray(),
  //   },

  // };

  // for (let i = 0; i < weatherData.hourly.time.length; i++) {
  //   console.log(
  //     weatherData.hourly.time[i].toISOString(),
  //     weatherData.hourly.temperature2m[i],
  //     weatherData.hourly.rain[i],
  //     weatherData.hourly.showers[i],
  //     weatherData.hourly.windSpeed10m[i]
  //   );
  // }
  // return weatherData
}

export default function App() {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [timezone, setTimezone] = useState("auto")
  const [data, setData] = useState()
  const timezoneOptions = [
    'auto','America/Anchorage', 'America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York', 'America/Sao_Paulo', 
    'GMT','Europe/London', 'Europe/Berlin', 'Europe/Moscow','Africa/Cairo', 
    'Asia/Bangkok', 'Asia/Singapore', 'Asia/Tokyo', 'Australia/Sydney', 'Pacific/Auckland'
  ]
  const timezoneOptionsChange = (event) =>{
    setTimezone(event.target.value)
  }
  const handleSubmit = function(e){
    e.preventDefault()
    let x = Weather(latitude, longitude, timezone)
    setData(x)
    console.log(data)
  }
  return (
    <main>
      <h1>Weather Forecasting Application</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='input-item'>
            <label>Latitude</label>
            <input 
              type="number"
              value={latitude}
              placeholder='enter the latitude i.e. -1.2921'
              onChange={(e) => setLatitude(e.target.value)}
              max={90} min={-90} required
              />
          </div>
          <div className='input-item'>
            <label>Longitude</label>
            <input 
              type="number"
              value={longitude}
              placeholder='enter the longitude i.e 1.234'
              onChange={(e)=> setLongitude(e.target.value)}
              max={180} min={-180} required
              />
          </div>
          <div className='input-item'>
            <label>Timezone</label>
            <select onChange={timezoneOptionsChange}>
              <option disabled>Choose one the following</option>
              {timezoneOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>      
              ))}
            </select>
          </div>
          <input type="submit" value="Submit"/>
        </form>
      </div>
      <div>
        <p>{timezone} </p>
      </div>
    </main>
  )
}
