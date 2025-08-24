<template>
  <div>
    <TheHeader />

    <StatsHeading />

    <SelectedCityCurrentWeatherStats />

    <PopularCitiesWeatherList />
  </div>
</template>

<script setup lang="ts">
import StatsHeading from '@/components/StatsHeading.vue'
import TheHeader from '@/components/TheHeader.vue'
import PopularCitiesWeatherList from '@/components/popular-cities-weather-list/PopularCitiesWeatherList.vue'
import { watch } from 'vue'
import { WeatherService } from '@/services/weather-service.ts'
import { useSelectedCityStore } from '@/components/stores/selected-city.store.ts'
import { storeToRefs } from 'pinia'
import { ResponseStatus } from '@/constants/constants.ts'
import SelectedCityCurrentWeatherStats from '@/components/SelectedCityCurrentWeatherStats.vue'

const selectedCityStore = useSelectedCityStore()
const { selectedCityCoordinates, selectedCityTodayWeather } =
  storeToRefs(selectedCityStore)

async function setSelectedCityTodayWeather() {
  if (!selectedCityCoordinates.value) {
    return
  }

  const { data, status } = await WeatherService.getSelectedCityTodayWeather(
    selectedCityCoordinates.value
  )

  if (status === ResponseStatus.SUCCESS && data) {
    selectedCityTodayWeather.value = {
      humidity: data.current.relative_humidity_2m,
      temperature: data.current.temperature_2m,
      windSpeed: data.current.wind_speed_10m,
      weatherCode: data.current.weather_code,
    }
  }
}

watch(selectedCityCoordinates, setSelectedCityTodayWeather, { immediate: true })
</script>
