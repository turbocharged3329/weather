import type { Ref } from 'vue'
import {
  RAINY_WEATHER_KEY,
  SUNNY_WEATHER_KEY,
  CLOUDY_WEATHER_KEY,
  WINDY_WEATHER_KEY,
  WEATHER_TITLES,
} from '../constants/constants.ts'
import type { WeatherKey } from '../components/types/types.ts'
import { computed } from 'vue'

const HIGH_WIND_SPEED = 11

export const useWeather = (
  weatherCode: Ref<number | null>,
  windSpeed: Ref<number | null>
) => {
  const weatherKey = computed<WeatherKey | null>(() => {
    if (weatherCode.value) {
      const weatherKeyValue = getWeatherKey(weatherCode.value)

      if (windSpeed.value && windSpeed.value > HIGH_WIND_SPEED) {
        if (
          weatherKeyValue === SUNNY_WEATHER_KEY ||
          weatherKeyValue === CLOUDY_WEATHER_KEY
        ) {
          return WINDY_WEATHER_KEY
        }
      }

      return weatherKeyValue
    }

    return null
  })

  const weatherTitle = computed(() => {
    if (weatherKey.value) {
      return WEATHER_TITLES[weatherKey.value as WeatherKey]
    }

    return null
  })

  function getWeatherKey(weatherKey: number): WeatherKey | null {
    if (weatherKey) {
      if (weatherKey >= 80) {
        return RAINY_WEATHER_KEY
      }

      if (weatherKey === 0) {
        return SUNNY_WEATHER_KEY
      }

      if (weatherKey >= 1 && weatherKey <= 48) {
        return CLOUDY_WEATHER_KEY
      }
    }

    return null
  }

  return {
    weatherKey,
    weatherTitle,
  }
}
