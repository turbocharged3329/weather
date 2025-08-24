import { WEATHER_TITLES } from '../../constants/constants.ts'

export type CityCoordinates = [string, string]
export type WeatherKey = keyof typeof WEATHER_TITLES
