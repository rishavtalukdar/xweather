import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [city, setcity] = useState("")
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);



  const apiKey = '3f5935386f5f4c718f1192703232709'

  const apicall = async (city) => {
    setLoading(true)
    try {

      let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
      if (!response.ok) {
        throw new Error("Failed to fetch weather data")
      }
      let data = await response.json()
      if (data.error) {
        throw new Error(data.error.message)
      }
      setWeatherData(data)
      setLoading(false)

    } catch (e) {
      console.error(e)
      alert(e.message)
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim() === "") {
      alert("Please enter a city name.");
      return;
    }
    if (city) {
      apicall(city)
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 >Weather Application</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" value={city} placeholder='Enter city name' onChange={(e) => setcity(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      {loading && (<p>Loading data ...</p>)}
      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c} °C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
      {/* {!loading && !weatherData && (
        <p>No weather data found for {city}.</p>
      )} */}
    </div>
  );
}

export default App;
