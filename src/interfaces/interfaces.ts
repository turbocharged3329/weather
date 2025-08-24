import type { CityCoordinates } from '../components/types/types.ts'

export interface City {
  id: number
  title: string
  name: string
}

export interface PopularCitiesCoordinatesMap {
  string: CityCoordinates
}

export interface PopularCityWeather {
  relative_humidity_2m: number
  temperature_2m: number
  weather_code: number
}

export interface PopularCityWeatherData {
  current: PopularCityWeather
}
