<template>
  <div>
    <TheHeader />

    <StatsHeading />

    <section class="w-main-stats">
      <SelectedCityCurrentWeatherStats />
      <SelectedCityHourlyWeatherStats />
    </section>

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
import SelectedCityHourlyWeatherStats from '@/components/SelectedCityHourlyWeatherStats.vue'

const selectedCityStore = useSelectedCityStore()
const {
  selectedCityCoordinates,
  selectedCityTodayWeather,
  selectedCityHourlyWeather,
} = storeToRefs(selectedCityStore)

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

    selectedCityHourlyWeather.value = {
      humidity: data.hourly.relative_humidity_2m,
      temperature: data.hourly.temperature_2m.map(temperature =>
        Math.round(temperature)
      ),
      weatherCode: data.hourly.weather_code,
      windSpeed: data.hourly.wind_speed_10m,
      time: data.hourly.time.map(
        timeString => timeString.split('T')[1] ?? timeString
      ),
    }
  }
}

watch(selectedCityCoordinates, setSelectedCityTodayWeather, { immediate: true })
</script>

<style lang="scss">
.w-main-stats {
  display: flex;
  align-items: flex-start;
  gap: 6vw;
  margin-bottom: 3.5rem;
}
</style>
