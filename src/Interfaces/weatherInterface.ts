export default interface WeatherData {
  name: string;
  createdAt:string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
}