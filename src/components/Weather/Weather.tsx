import React, { useState, ChangeEvent, FormEvent, useCallback,  } from "react";
import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";
import WeatherData from "../../Interfaces/weatherInterface";
import { userAxios } from "../../Constraints/axiosInterceptor";
import { showErrorToast } from "../../services/popups/popups";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Weather: React.FC = React.memo(() => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await userAxios.post("/weather", { data: city });
      setWeatherData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 500) {
        showErrorToast("City not found");
      } else {
        showErrorToast("Weather data fetching failed, please try again.");
      }
    }
  }, [city]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData();
  }, [fetchData]);

  const renderWeatherIcon = useCallback((description: string) => {
    switch (description) {
      case "clear sky":
        return <WiDaySunny size={64} />;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
        return <WiCloud size={64} />;
      case "shower rain":
      case "rain":
      case "thunderstorm":
        return <WiRain size={64} />;
      default:
        return <WiDaySunny size={64} />;
    }
  }, []);

  const handleHistoryClick = useCallback(() => {
    navigate('/history');
  }, [navigate]);

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleHistoryClick}
        className="absolute top-0 right-0 mt-4 mr-4 p-2 bg-blue-700 text-white rounded-lg shadow-md"
      >
        History
      </button>
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
      <ToastContainer/>
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
        <p className="text-white"></p>
      )}
    </div>
  );
});

export default Weather;
