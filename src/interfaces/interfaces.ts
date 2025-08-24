import type { CityCoordinates } from '../components/types/types.ts'

export interface CitiesSelectListItem {
  id: number
  title: string
  coordinates: CityCoordinates
}

export interface PopularCitiesCoordinatesMap {
  [cityName: string]: CityCoordinates
}

export interface CityWeatherResponseData {
  relative_humidity_2m: number
  temperature_2m: number
  weather_code: number
  wind_speed_10m: number
}

export interface PopularCityWeatherResponseData {
  current: CityWeatherResponseData
  latitude?: number
  longitude?: number
}

export interface HourlyWeatherResponseData {
  relative_humidity_2m: number[]
  temperature_2m: number[]
  weather_code: number[]
  wind_speed_10m: number[]
  time: string[]
}

export interface SelectedCityTodayWeatherResponseData
  extends PopularCityWeatherResponseData {
  hourly: HourlyWeatherResponseData
}

export interface SelectedCityTodayWeatherData {
  humidity: number
  temperature: number
  weatherCode: number
  windSpeed: number
}

export interface SelectedCityHourlyWeatherData {
  humidity: number[]
  temperature: number[]
  weatherCode: number[]
  windSpeed: number[]
  time: string[]
}

export interface CityHourlyWeatherData {
  id: string
  humidity: number
  temperature: number
  weatherCode: number
  windSpeed: number
  time: string
}
