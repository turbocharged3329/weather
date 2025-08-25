<template>
  <div class="w-selected-city-main-stats">
    <transition name="fade">
      <div v-if="!isLoading" class="w-selected-city-main-stats__container">
        <SelectedCityCurrentWeatherStats />
        <SelectedCityHourlyWeatherStats />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SelectedCityCurrentWeatherStats from '@/components/SelectedCityCurrentWeatherStats.vue'
import SelectedCityHourlyWeatherStats from '@/components/selected-city-hourly-weather/SelectedCityHourlyWeatherStats.vue'
import { useSelectedCityStore } from '@/components/stores/selected-city.store.ts'
import { storeToRefs } from 'pinia'
import { WeatherService } from '@/services/weather-service.ts'
import { ResponseStatus } from '@/constants/constants.ts'
import { watch } from 'vue'

const selectedCityStore = useSelectedCityStore()
const {
  selectedCityCoordinates,
  selectedCityTodayWeather,
  selectedCityHourlyWeather,
} = storeToRefs(selectedCityStore)

const isLoading = ref<boolean>(false)

async function setSelectedCityTodayWeather() {
  try {
    isLoading.value = true

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
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

watch(selectedCityCoordinates, setSelectedCityTodayWeather, { immediate: true })
</script>

<style lang="scss">
.w-selected-city-main-stats {
  margin-bottom: 3.5rem;
  min-height: 30vw;

  &__container {
    display: flex;
    align-items: flex-start;
    gap: 6vw;
  }
}
</style>
