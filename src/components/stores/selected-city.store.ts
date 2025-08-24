import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CityCoordinates } from '../types/types.ts'
import type { SelectedCityTodayWeatherData } from '../../interfaces/interfaces.ts'

export const useSelectedCityStore = defineStore('selected-city', () => {
  const selectedCityName = ref<string | null>(null)
  const selectedCityCoordinates = ref<CityCoordinates | null>(null)
  const selectedCityTodayWeather = ref<SelectedCityTodayWeatherData | null>(
    null
  )

  const weatherCode = computed(
    () => selectedCityTodayWeather.value?.weatherCode || null
  )
  const windSpeed = computed(
    () => selectedCityTodayWeather.value?.windSpeed || null
  )

  return {
    selectedCityName,
    selectedCityCoordinates,
    selectedCityTodayWeather,
    windSpeed,
    weatherCode,
  }
})
