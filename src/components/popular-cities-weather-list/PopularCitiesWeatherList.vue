<template>
  <div class="w-popular-cities-weather-list">
    <PopularCitiesWeatherListItem
      v-for="city in citiesList"
      :key="city.id"
      :data="city"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { WeatherService } from '@/services/weather-service.js'
import {
  POPULAR_CITIES_COORDINATES_MAP,
  ResponseStatus,
} from '@/constants/constants.js'
import { onMounted } from 'vue'
import type { PopularCityWeatherData } from '@/interfaces/interfaces.js'
import PopularCitiesWeatherListItem from '@/components/popular-cities-weather-list/PopularCitiesWeatherListItem.vue'

const weatherData = ref<Array<PopularCityWeatherData>>([])
const citiesList = computed(() => {
  if (!weatherData.value.length) {
    return []
  }

  const citiesNames = Object.keys(POPULAR_CITIES_COORDINATES_MAP)

  return weatherData.value
    .map((data, i) => {
      return {
        id: (String(data.latitude) + String(data.longitude)).replace('.', '-'),
        city: citiesNames[i] || null,
        temperature: Math.round(data.current.temperature_2m) || null,
        humidity: data.current.relative_humidity_2m || null,
        weatherCode: data.current.weather_code || null,
        windSpeed: data.current.wind_speed_10m || null,
      }
    })
    .filter(city => city !== null)
})

onMounted(async () => {
  try {
    const { data, status } = await WeatherService.getPopularCitiesWeather(
      POPULAR_CITIES_COORDINATES_MAP
    )

    if (status === ResponseStatus.SUCCESS && data) {
      weatherData.value = [...data]
    }
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped lang="scss">
.w-popular-cities-weather-list {
  display: flex;
  gap: 2.6vw;
}
</style>
