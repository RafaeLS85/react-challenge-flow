import { City, RawWeather, Weather } from "./types";

const apiKey = import.meta.env.VITE_API_KEY;

export function kelvinToCelsius(temp: number): number {
  return Math.round(temp - 273.15)
}

export function formatWeather(weather: RawWeather): Weather{
  console.log(weather)
  const { 0: first, 8: second, 16: third, 24: fourth, 32: fifth, 39: sixth } = weather.list

  return {
    city: {
        id: String(weather.city.id),
        name: weather.city.name
    },
    forecast: [first, second, third, fourth, fifth, sixth].map(forecast => ({
        min: kelvinToCelsius(forecast.main.temp_min),
        max: kelvinToCelsius(forecast.main.temp_max),
        date: new Date(forecast.dt * 1000).toLocaleDateString('es-AR')
    }))
  }
}

const api = {
  weather: {
    fetch: async (city: City ): Promise<Weather> => {    
      console.log({city})

      //Call 5 day / 3 hour forecast data
      const request = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`)
      const response = await request.json()
      return formatWeather(response)     
    },
    fetchByGeo: async (lat: number | undefined, lon: number | undefined): Promise<Weather> => {

      if(!lat && !lon){
        return {} as Weather
      }

      const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      return await request.json()
    },
    fetchByName: async (name:string): Promise<Weather> => {
      const request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`)
      return await request.json()
    } 
  },
};

export default api;
