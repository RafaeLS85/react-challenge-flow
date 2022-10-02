import React, { useEffect, useState } from "react";
import api from "./api";
import { Weather, City } from "./types";

const CITIES: Record<string, City> = {
  "perez": {
    id: "perez",
    name: "Perez",
    lat: -32.9520457,
    lon: -60.7666791,
  },
  "perito-moreno": {
    id: "perito-moreno",
    name: "Perito Moreno",
    lat: -41.1282023,
    lon: -71.4099538,
  },
  "san-juan": {
    id: "san-juan",
    name: "San Juan",
    lat: -31.5317377,
    lon: -68.5501862,
  },
  "mendoza": {
    id: "mendoza",
    name: "Mendoza",
    lat: -32.8832979,
    lon: -68.8760287,
  },
  "rio-grande": {
    id: "rio-grande",
    name: "Rio Grande",
    lat: -53.8540532,
    lon: -67.322254,
  },
};

function App() {
  const [status, setStatus] = useState<"pending" | "resolved">("pending");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [city, setCity] = useState<City>(CITIES['perez']);

  function handleChangeCity(event: React.ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value as keyof typeof CITIES
    setCity(CITIES[city]); 
  }

  useEffect(() => {    
      api.weather.fetch(city).then((weather) => {
        setWeather(weather);
        setStatus("resolved");
      });    
  }, [city]);

  if (status === "pending") {
    return <div>Cargando...</div>;
  }

  if (!weather) {
    return <div>No se encontraron datos</div>;
  }

  console.log(weather.forecast.length)

  return (
    <main>
      <select value={city?.id} onChange={handleChangeCity}>
        {Object.values(CITIES).map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      <h2>{weather.city.name}</h2>
      <ul>
        {weather.forecast.map((forecast, index) => (
          <li key={index}>{forecast.date} Min: {forecast.min} °C, Max: {forecast.max} °C</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
