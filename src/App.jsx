import './App.css'
import {useState} from 'react'

export default function App() {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [timezone, setTimezone] = useState()
  const timezoneOptions = [
    'auto','America/Anchorage', 'America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York', 'America/Sao_Paulo', 
    'GMT','Europe/London', 'Europe/Berlin', 'Europe/Moscow','Africa/Cairo', 
    'Asia/Bangkok', 'Asia/Singapore', 'Asia/Tokyo', 'Australia/Sydney', 'Pacific/Auckland'
  ]
  const timezoneOptionsChange = (event) =>{
    setTimezone(event.target.value)
  }
  return (
    <main>
      <h1>Weather Forecasting Application</h1>
      <div>
        <form>
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
        <p>{latitude}</p>
      </div>
    </main>
  )
}
