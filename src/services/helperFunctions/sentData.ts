// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sendWeatherDataToBackend = async (weatherData: unknown) => {
    try {
      const response = await fetch('/api/weather', {
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