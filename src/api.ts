import { City, RawWeather, Weather } from "./types";


export function kelvinToCelsius(temp: number): number {
  return Math.round(temp - 273.15)
}

export function formatWeather(weather: RawWeather): Weather{
  const { 0: first, 8: second, 16: third, 24: fourth, 32: fifth } = weather.list

  return {
    city: {
        id: String(weather.city.id),
        name: weather.city.name
    },
    forecast: [first, second, third, fourth, fifth].map(forecast => ({
        min: kelvinToCelsius(forecast.main.temp_min),
        max: kelvinToCelsius(forecast.main.temp_max),
        date: new Date(forecast.dt * 1000).toLocaleDateString('es-AR')
    }))
  }
}

const api = {
  weather: {
    fetch: async (city: City ): Promise<Weather> => {    

      const request = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${import.meta.env.VITE_API_KEY}`)

      const response = await request.json()

      return formatWeather(response)
     
    },
  },
};

export default api;
