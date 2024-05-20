import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi"; // Import necessary icons
import WeatherData from "../../Interfaces/weatherInterface";

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const weatherApi = import.meta.env.VITE_WEATHER_API;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApi}`
      );
      setWeatherData(response.data);
      console.log(response.data); 
      await sendWeatherDataToBackend(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendWeatherDataToBackend = async (weatherData: unknown) => {
    try {
      const response = await fetch('store/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weatherData }),
      });

      if (!response.ok) {
        console.error('Failed to send weather data to backend:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending weather data to backend:', error);
    }
  };

  useEffect(() => {
    if (city) {
      fetchData();
    }
  }, [city]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
  };

  const renderWeatherIcon = (description: string) => {
    switch (description) {
      case 'clear sky':
        return <WiDaySunny size={64} />;
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
        return <WiCloud size={64} />;
      case 'shower rain':
      case 'rain':
      case 'thunderstorm':
        return <WiRain size={64} />;
      default:
        return <WiDaySunny size={64} />;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          className="p-2 rounded-lg shadow-md border-none outline-none"
        />
        <button
          type="submit"
          className="mt-4 p-2 bg-blue-500 text-white rounded-lg shadow-md"
        >
          Get Weather
        </button>
      </form>
      {weatherData ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <h2 className="text-4xl font-bold">{weatherData.name}</h2>
            <div className="flex justify-center items-center mt-2">
              {renderWeatherIcon(weatherData.weather[0].description)}
              <p className="text-4xl ml-4">{weatherData.main.temp}°C</p>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {weatherData.weather[0].description}
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              Feels like: {weatherData.main.feels_like}°C
            </p>
            <p className="text-gray-700">
              Humidity: {weatherData.main.humidity}%
            </p>
            <p className="text-gray-700">
              Pressure: {weatherData.main.pressure} hPa
            </p>
            <p className="text-gray-700">
              Wind Speed: {weatherData.wind.speed} m/s
            </p>
          </div>
        </div>
      ) : (
        <p className="text-white">Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
