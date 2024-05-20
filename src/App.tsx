import Weather from "./components/Weather/Weather";
import { imageUrls } from "./constants/strings";
import "./styles/tailwind.css";

function App() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${imageUrls.imageUrl1})`,
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-3xl mb-8 font-bold text-center">Weather Forecast App</h1>
      <Weather />
    </div>
  );
}

export default App;
